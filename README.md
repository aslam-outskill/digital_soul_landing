# Digital Soul Landing

A React + Vite app for creating and chatting with “Digital Soul” personas, including voice cloning and a live video avatar. Backend runs as Netlify Functions acting as a BFF (Backend-for-Frontend) over Supabase and media providers (Simli, Heygen, TTS).

Repo: https://github.com/swiftflowai/digital_soul_landing

## System diagram

<img width="769" height="771" alt="Screenshot 2025-08-26 at 2 16 14 PM" src="https://github.com/user-attachments/assets/ebddf16d-c250-49e8-a3ca-18f347f65acc" />


## Architecture

- Frontend (Vite + React + Tailwind)
  - Pages in `src/pages` (Chat, Settings, Persona Setup, Dashboard, etc.)
  - Components in `src/components` (`SimliFaceCreator`, `SimliAvatarPanel`, `PersonaAvatar`, marketing UI)
  - Routing: `react-router-dom` via `src/App.tsx`
  - State: `AuthRoleContext`; hooks: `useStreamedChat`, `useAudioRecorder`
  - Supabase browser client for session + signed URLs

- BFF (Netlify Functions, `netlify/functions`)
  - Auth/util: `_lib/auth.ts`, `_lib/supabase.ts`
  - Chat/TTS: `chat.ts`, `voice-chat.ts`, `tts.ts`, `tts-preview.ts`
  - Voice clone: `voice-clone-create.ts`, `voice-clone-status.ts`
  - Video avatar (Simli): `generate-faceid.ts`, `faceid-status.ts`, `simli-face-status.ts`, `simli-start-session.ts`, `simli-stop-session.ts`, `simli-face-create.ts`, `simli-face-watch-background.ts`
  - Heygen lipsync: `avatar-upload.ts`, `avatar-generate-lipsync.ts`, `avatar-status.ts`

- Data (Supabase)
  - Auth, Postgres (personas, memberships, contributions/memories, activities)
  - Storage bucket `persona-media` for avatar images; signed URL previews
  - Helpers in `src/services/supabaseHelpers.ts`

## Key flows

- Create video avatar (Simli)
  - Web uploads a headshot → `generate-faceid.ts` → Simli `generateFaceID`
  - BFF stores original image in `persona-media` and merges metadata (`simli_face_id`, `simli_face_image_path`)
  - Poll via `faceid-status.ts` / `simli-face-status.ts`; UI shows `face_id` and circular preview via signed URL

- Start live avatar session
  - Web → `simli-start-session.ts` (dev helper) → API key + persona-aware `face_id`
  - `SimliAvatarPanel` initializes `simli-client` for live video/audio and lip‑sync

- Voice cloning
  - Upload/record → `voice-clone-create.ts` → poll `voice-clone-status.ts` → store `voice_id`

- Voice-enabled chat
  - `useStreamedChat` streams assistant text; `tts.ts`/`tts-preview.ts` synthesize speech
  - If Simli active, audio is routed to avatar for lip‑sync; otherwise normal playback

## Configuration

- Client env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Server env (functions): `SIMLI_API_KEY`, optional `SIMLI_FACE_ID`, `SIMLI_EXPOSE_KEY=true` (dev only), provider keys for Heygen/TTS

## Local development

- Vite dev server (SPA) + Netlify functions
- For Simli local testing, set `SIMLI_EXPOSE_KEY=true` and use `simli-start-session.ts`
- Supabase Storage previews use short‑lived signed URLs; cache‑busting handled in UI
