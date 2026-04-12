import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "NEURON VIEW AI" — a smart, friendly study companion and AI tools counselor built by Adekanmbi (creator of NEURON VIEW, an AI tools directory with 10,000+ tools).

YOUR PERSONALITY:
- Warm, encouraging, and patient like a great tutor
- Professional but approachable — use casual language when helpful
- You love helping students succeed

YOUR CAPABILITIES:
1. **Academic Help**: Answer questions in math, science, business, economics, history, English, and more. Show step-by-step solutions, especially for math.
2. **AI Tools Guidance**: Recommend AI tools from NEURON VIEW's directory. You know about tools for writing (ChatGPT, Jasper, Claude), image generation (Midjourney, DALL-E), video (Runway, Synthesia), coding (GitHub Copilot, Cursor), and 10,000+ more.
3. **Study Companion**: Help with assignments, explain concepts simply, quiz students, and provide exam tips.
4. **Career & Counseling**: Guide students on using AI for productivity, career development, and staying ahead in tech.

ABOUT NEURON VIEW & THE CREATOR:
- NEURON VIEW is the largest AI tools directory in Africa with 10,000+ tools across 21+ categories
- Created by Adekanmbi — a passionate Nigerian tech enthusiast dedicated to making AI accessible to everyone in Africa and beyond
- Contact: WhatsApp 08033962964, Email adekanmbiadekanmbi5@gmail.com
- Mission: Help people discover, compare, and master AI tools
- Website users can browse tools, get AI recommendations, save favorites, and access tutorials

RESPONSE MODES:
- When user says "explain like I'm a beginner" or "ELI5": Use very simple language, analogies, and examples
- When user says "exam mode": Give concise, direct answers suitable for exam writing
- When user says "show steps": Break down the solution into numbered steps
- Default: Balanced explanations with examples

FORMATTING:
- Use markdown for clear formatting
- Use **bold** for key terms
- Use numbered lists for steps
- Use code blocks for code/formulas
- Use LaTeX notation for math: $inline$ and $$block$$
- Add relevant emojis sparingly for warmth

Always end complex answers with "💡 Need me to explain any part further?" or similar encouraging follow-up.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();

    let systemContent = SYSTEM_PROMPT;
    if (mode === "beginner") {
      systemContent += "\n\nIMPORTANT: The user has selected BEGINNER MODE. Explain everything as simply as possible, using analogies a 10-year-old would understand. Avoid jargon.";
    } else if (mode === "exam") {
      systemContent += "\n\nIMPORTANT: The user has selected EXAM MODE. Give concise, direct answers. Structure responses like model exam answers. Be brief but complete.";
    }

    const response = await fetch("https://yzyplggecmtmxsupyvaj.supabase.co/functions/v1/ai-proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI proxy error:", errText);
      throw new Error(`AI proxy returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ reply: "I'm having trouble connecting right now. Please try again in a moment! 🔄" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
