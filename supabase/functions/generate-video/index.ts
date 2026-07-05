import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);
    const jwt = authHeader.replace("Bearer ", "");
    const client = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: `Bearer ${jwt}` } } },
    );
    const { data: { user } } = await client.auth.getUser();
    if (!user) return json({ error: "Unauthorized" }, 401);

    const { prompt } = await req.json().catch(() => ({ prompt: "" }));
    if (!prompt || typeof prompt !== "string") return json({ error: "Missing prompt" }, 400);

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return json({ error: "LOVABLE_API_KEY not configured" }, 500);

    // Video generation via Lovable AI Gateway. We ask the chat model to describe a
    // short visual storyboard, then generate a hero image frame for it — the closest
    // available approximation on the gateway today (dedicated text-to-video is not
    // exposed on /v1/videos/generations for user apps yet).
    const imgRes = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        prompt: `Cinematic hero frame for a short video: ${prompt}. Ultra detailed, dynamic motion blur, dramatic lighting, 16:9.`,
        size: "1536x1024",
        n: 1,
      }),
    });

    if (!imgRes.ok) {
      const text = await imgRes.text();
      console.error("video/frame error:", imgRes.status, text);
      if (imgRes.status === 429) return json({ error: "Rate limit exceeded. Try again shortly." }, 429);
      if (imgRes.status === 402) return json({ error: "AI credits exhausted." }, 402);
      return json({ error: "Video generation failed" }, 502);
    }
    const imgData = await imgRes.json();
    const b64 = imgData?.data?.[0]?.b64_json;
    if (!b64) return json({ error: "No frame returned" }, 502);

    // Also ask the chat model for a short storyboard/script the user can read.
    const chatRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You write short cinematic video storyboards. Reply with 4-6 numbered shots, one line each, no preamble." },
          { role: "user", content: `Storyboard for: ${prompt}` },
        ],
      }),
    });
    let storyboard = "";
    if (chatRes.ok) {
      const chatData = await chatRes.json();
      storyboard = chatData?.choices?.[0]?.message?.content ?? "";
    }

    return json({
      frame: `data:image/png;base64,${b64}`,
      storyboard,
      note: "Preview frame + storyboard. Full motion video generation is coming soon on Lovable AI.",
    });
  } catch (e) {
    console.error("generate-video error:", e);
    return json({ error: "Server error" }, 500);
  }
});
