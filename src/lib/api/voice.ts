export async function createVoiceClone(token: string, personaId: string, files: File[], personaName?: string) {
  const fd = new FormData();
  fd.set("persona_id", personaId);
  if (personaName) fd.set("persona_name", personaName);
  files.forEach(f => fd.append("samples", f));
  const res = await fetch("/.netlify/functions/voice-clone-create", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getCloneStatus(token: string, personaId: string) {
  const res = await fetch(`/.netlify/functions/voice-clone-status?persona_id=${encodeURIComponent(personaId)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ status: "ready" | "absent"; voice_id: string | null }>;
}

export async function speakText(token: string, personaId: string, text: string) {
  const res = await fetch("/.netlify/functions/tts", {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ persona_id: personaId, text })
  });
  if (!res.ok) throw new Error(await res.text());
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("audio/mpeg") || contentType.includes("audio/")) {
    const buf = await res.arrayBuffer();
    const blob = new Blob([buf], { type: contentType || "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    return { url, revoke: () => URL.revokeObjectURL(url) };
  }
  const b64 = await res.text();
  const audio = new Audio(`data:audio/mpeg;base64,${b64}`);
  audio.play();
  return { url: null, revoke: () => {} };
}

export async function speakTextPreview(invitation: string, personaId: string, text: string) {
  const res = await fetch("/.netlify/functions/tts-preview", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ invitation, persona_id: personaId, text })
  });
  if (!res.ok) throw new Error(await res.text());
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("audio/")) {
    const buf = await res.arrayBuffer();
    const blob = new Blob([buf], { type: contentType || "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    return { url, revoke: () => URL.revokeObjectURL(url) };
  }
  const b64 = await res.text();
  const audio = new Audio(`data:audio/mpeg;base64,${b64}`);
  audio.play();
  return { url: null, revoke: () => {} };
}

export async function voiceChat(token: string, personaId: string, audioBlob: Blob, chatId?: string) {
  const fd = new FormData();
  fd.set("persona_id", personaId);
  if (chatId) fd.set("chat_id", chatId);
  fd.set("audio", audioBlob, "input.webm");
  const res = await fetch("/.netlify/functions/voice-chat", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const audio = new Audio(`data:audio/mpeg;base64,${data.audio_base64}`);
  audio.play();
  return data as {
    chat_id: string;
    assistant_text: string;
    audio_base64: string;
    voice_id_used?: string;
    user_media_path?: string | null;
    user_media_signed_url?: string | null;
    user_text?: string | null;
  };
}


