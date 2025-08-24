/*
  POST /.netlify/functions/simli-start-session

  Development-only helper to bootstrap a Simli client session.
  In production, implement a proper token exchange with Simli (do NOT expose API keys).

  Env:
  - SIMLI_API_KEY (required)
  - SIMLI_FACE_ID (optional)
  - SIMLI_EXPOSE_KEY ("true" to return api_key for local testing only)
*/
import type { Handler } from "@netlify/functions";
import { getUserFromRequest } from "./_lib/auth";

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    const req = new Request(new URL(event.rawUrl), { method: "POST", headers: event.headers as any, body: event.body });
    const { SIMLI_EXPOSE_KEY } = process.env;
    // Require auth unless explicitly in expose mode (dev/test)
    if (SIMLI_EXPOSE_KEY !== "true") {
      const user = await getUserFromRequest(req);
      if (!user) return { statusCode: 401, body: "Unauthorized" };
    }

    const { SIMLI_API_KEY, SIMLI_FACE_ID, SIMLI_EXPOSE_KEY } = process.env;
    if (!SIMLI_API_KEY) return { statusCode: 500, body: "Missing SIMLI_API_KEY" };

    // For development only: allow returning the API key to the browser
    if (SIMLI_EXPOSE_KEY === "true") {
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, api_key: SIMLI_API_KEY, face_id: SIMLI_FACE_ID || null })
      };
    }

    // In production, this endpoint should instead create an ephemeral session/token using Simli server APIs
    // and return that token to the client. Leaving unimplemented to avoid exposing keys.
    return { statusCode: 501, body: "Simli server token exchange not configured. Set SIMLI_EXPOSE_KEY=true for local dev only." };
  } catch (e: any) {
    return { statusCode: 500, body: e?.message || "Server error" };
  }
};


