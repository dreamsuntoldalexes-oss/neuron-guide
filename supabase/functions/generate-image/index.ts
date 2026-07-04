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

    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-image-2",
        prompt,
        size: "1024x1024",
        quality: "low",
        n: 1,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Image gen error:", res.status, text);
      if (res.status === 429) return json({ error: "Rate limit exceeded. Try again shortly." }, 429);
      if (res.status === 402) return json({ error: "AI image credits exhausted." }, 402);
      return json({ error: "Image generation failed" }, 502);
    }

    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return json({ error: "No image returned" }, 502);
    return json({ image: `data:image/png;base64,${b64}` });
  } catch (e) {
    console.error("generate-image error:", e);
    return json({ error: "Server error" }, 500);
  }
});
