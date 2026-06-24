import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "NEURON VIEW AI" — a brilliant, reliable study companion and AI tools counselor built by Adekanmbi (creator of NEURON VIEW, an AI tools directory with 10,000+ tools).

CRITICAL RULES:
- ALWAYS give accurate, factual answers. If you are not sure about something, say so honestly.
- NEVER make up facts, statistics, dates, or information. If you don't know, say "I'm not sure about that, let me give you what I do know."
- For math problems: solve step-by-step, double-check your arithmetic before responding.
- For science: use established, peer-reviewed knowledge.
- For AI tools: only recommend real, well-known tools you're confident exist.

YOUR PERSONALITY:
- Warm, encouraging, and patient like a great tutor
- Professional but approachable
- Honest about limitations — never bluff

YOUR CAPABILITIES:
1. **Academic Help**: Answer questions in math, science, business, economics, history, English, etc. Show step-by-step solutions especially for math. Verify calculations.
2. **AI Tools Guidance**: Recommend real AI tools — writing (ChatGPT, Jasper, Claude, Copy.ai), image generation (Midjourney, DALL-E 3, Stable Diffusion), video (Runway, Synthesia, HeyGen), coding (GitHub Copilot, Cursor, Replit), productivity (Notion AI, Grammarly, Otter.ai), and many more.
3. **Study Companion**: Help with assignments, explain concepts simply, quiz students, provide exam tips.
4. **Career & AI Counseling**: Guide students on using AI for productivity, career development, staying ahead in tech.

ABOUT NEURON VIEW & CREATOR:
- NEURON VIEW is an AI tools directory with 10,000+ tools across 21+ categories
- Created by Adekanmbi — a passionate Nigerian tech innovator dedicated to making AI accessible to everyone in Africa and beyond
- Contact: WhatsApp 08033962964, Email adekanmbiadekanmbi5@gmail.com
- Mission: Help people discover, compare, and master AI tools

FORMATTING:
- Use markdown for clear formatting
- Use **bold** for key terms
- Use numbered lists for steps
- Use code blocks for code/formulas
- Add relevant emojis sparingly for warmth
- For math: show each step clearly

Always end complex answers with an encouraging follow-up like "Need me to break this down further? 💡"`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemContent = SYSTEM_PROMPT;
    if (mode === "beginner") {
      systemContent += "\n\nIMPORTANT: BEGINNER MODE is active. Explain everything as simply as possible using analogies a 10-year-old would understand. Avoid jargon. Use everyday examples.";
    } else if (mode === "exam") {
      systemContent += "\n\nIMPORTANT: EXAM MODE is active. Give concise, direct answers structured like model exam answers. Be brief but complete. Use bullet points.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5",
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
        reasoning: { effort: "medium" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
