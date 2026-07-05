import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const jwt = authHeader.replace("Bearer ", "");
    const client = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: `Bearer ${jwt}` } } },
    );
    const { data: { user } } = await client.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { audio, mime } = await req.json().catch(() => ({ audio: "" }));
    if (!audio || typeof audio !== "string") return new Response(JSON.stringify({ error: "Missing audio" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Decode base64 payload from client
    const raw = audio.replace(/^data:[^;]+;base64,/, "");
    const bytes = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
    const type = mime || "audio/webm";
    const ext = type.includes("mp4") ? "mp4" : type.includes("wav") ? "wav" : type.includes("mpeg") ? "mp3" : "webm";

    const fd = new FormData();
    fd.append("model", "openai/gpt-4o-mini-transcribe");
    fd.append("file", new Blob([bytes], { type }), `recording.${ext}`);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: fd,
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("stt error", res.status, t);
      if (res.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (res.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: `Transcription failed: ${t.slice(0, 200)}` }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const data = await res.json();
    return new Response(JSON.stringify({ text: data?.text ?? "" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("stt server error", e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
