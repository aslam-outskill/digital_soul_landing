import type { Handler } from "@netlify/functions";
import { supabaseService } from "./_lib/supabase";
import { getUserFromRequest } from "./_lib/auth";
import { parseMultipart } from "./_lib/form";
import OpenAI from "openai";

const ELEVEN_BASE = "https://api.elevenlabs.io/v1";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    const req = new Request(new URL(event.rawUrl), {
      method: "POST",
      headers: event.headers as any,
      body: event.isBase64Encoded && event.body ? Buffer.from(event.body, "base64") : (event.body as any)
    });
    const user = await getUserFromRequest(req);
    if (!user) return { statusCode: 401, body: "Unauthorized" };
    const { fields, files } = await parseMultipart(req);
    const persona_id = fields["persona_id"];
    const chat_id = fields["chat_id"] || null;
    const audioFile = files.find(f => f.fieldname === "audio");
    if (!persona_id || !audioFile) return { statusCode: 400, body: "persona_id and audio required" };

    const { data: pm } = await supabaseService
      .from("persona_memberships")
      .select("role")
      .eq("persona_id", persona_id)
      .eq("user_id", user.id)
      .maybeSingle();
    if (!pm) return { statusCode: 403, body: "Forbidden" };

    const { data: persona } = await supabaseService
      .from("personas")
      .select("id, name, description, voice_model_url")
      .eq("id", persona_id)
      .single();
    if (!persona) return { statusCode: 404, body: "Persona not found" };

    const transcription: any = await openai.audio.transcriptions.create({
      // @ts-ignore File available in Node 18+ runtimes
      file: new File([audioFile.buffer], audioFile.filename || "audio.webm", { type: audioFile.mime }),
      model: "gpt-4o-transcribe",
      // Force English (or set dynamically based on persona preferences)
      language: "en"
    });
    const userText: string = (transcription.text || "").trim();
    if (!userText) return { statusCode: 200, body: JSON.stringify({ chat_id: chat_id, assistant_text: "", audio_base64: null, voice_id_used: null, note: "empty_transcription" }) };

    let history: { role: "system" | "user" | "assistant"; content: string }[] = [];
    if (chat_id) {
      const { data: past } = await supabaseService
        .from("chat_messages")
        .select("role, content")
        .eq("chat_id", chat_id)
        .order("created_at", { ascending: true });
      if (past) history = past.map(m => ({ role: m.role.toLowerCase() as any, content: m.content }));
    }

    const system = `You are the digital soul of ${persona.name}. Speak with their tone. Keep responses concise and empathetic. Facts/Notes: ${persona.description || ""}`;
    const messages = [{ role: "system" as const, content: system }, ...history, { role: "user" as const, content: userText }];
    const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", temperature: 0.7, messages });
    const assistantText = completion.choices?.[0]?.message?.content || "I’m here.";

    // Persist the raw recording to Supabase Storage under this persona
    const ext = (audioFile.filename || "webm").split(".").pop() || "webm";
    const storagePath = `voice-recordings/${persona_id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    await (supabaseService.storage as any)
      .from("persona-media")
      .upload(storagePath, audioFile.buffer, { contentType: audioFile.mime, upsert: false });

    const fallbackVoiceId = process.env.ELEVENLABS_DEFAULT_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // ElevenLabs default voice
    const effectiveVoiceId = persona.voice_model_url || fallbackVoiceId;
    const ttsResp = await fetch(`${ELEVEN_BASE}/text-to-speech/${effectiveVoiceId}`, {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, accept: "audio/mpeg", "content-type": "application/json" } as any,
      body: JSON.stringify({ text: assistantText, model_id: "eleven_monolingual_v1" })
    });
    if (!ttsResp.ok) return { statusCode: 500, body: `TTS error: ${await ttsResp.text()}` };
    const audioBufOut = Buffer.from(await ttsResp.arrayBuffer());

    let effectiveChatId = chat_id as string | null;
    if (!effectiveChatId) {
      const { data: newChat } = await supabaseService
        .from("chats")
        .insert({ persona_id, created_by: user.id, title: null })
        .select("id")
        .single();
      effectiveChatId = newChat?.id ?? null;
    }

    if (effectiveChatId) {
      await supabaseService.from("chat_messages").insert([
        { id: crypto.randomUUID(), chat_id: effectiveChatId, content: userText, role: "USER", media_url: storagePath, metadata: { source: "voice", bucket: "persona-media" } },
        { id: crypto.randomUUID(), chat_id: effectiveChatId, content: assistantText, role: "ASSISTANT", media_url: null, metadata: { persona_id } }
      ]);
    }

    // Create a signed URL for the user's uploaded audio clip so the client can show it
    const { data: signedUserClip } = await (supabaseService.storage as any)
      .from("persona-media")
      .createSignedUrl(storagePath, 60 * 60);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: effectiveChatId,
        assistant_text: assistantText,
        audio_base64: audioBufOut.toString("base64"),
        voice_id_used: effectiveVoiceId,
        user_media_path: storagePath,
        user_media_signed_url: signedUserClip?.signedUrl || null,
        user_text: userText
      })
    };
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
};


