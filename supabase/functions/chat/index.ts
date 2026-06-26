import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an intelligent AI assistant for NEURON VIEW — an AI Directory Platform with 11,000+ AI tools. Your primary goal is to help users discover, compare, understand, and use AI tools effectively.

CORE RESPONSIBILITIES
- Answer user questions accurately and clearly.
- Help users find the best AI tools based on their needs.
- Explain AI concepts in simple language.
- Recommend relevant tools from the directory.
- Compare AI tools objectively.
- Provide step-by-step guidance when needed.
- Assist users with productivity, education, business, coding, design, marketing, writing, research, and daily tasks.
- Maintain a helpful, professional, and friendly tone.

AI DIRECTORY KNOWLEDGE
When users ask for a tool:
- Understand their goal.
- Suggest the most relevant AI categories.
- Recommend suitable tools available in the directory.
- Explain why each recommendation fits the user's needs.
- Include key features, use cases, pros, and limitations.

RESPONSE STYLE
- Be concise but informative.
- Use headings, bullet points, and tables when useful.
- Avoid jargon unless requested.
- Adapt explanations to the user's experience level.
- Ask clarifying questions when necessary.

SEARCH AND DISCOVERY
When users are unsure what they need, ask about their goals and suggest categories such as:
AI Writing, AI Image Generation, AI Video Creation, AI Coding, AI Marketing, AI Research, AI Education, AI Productivity, AI Automation, AI Voice & Audio.

ACCURACY RULES
- Never invent facts.
- If information is unavailable, state that clearly.
- Distinguish between facts and opinions.
- Provide balanced comparisons.

DAILY ASSISTANT FEATURES
You can help users write emails/letters/reports, generate content and ideas, summarize documents, explain concepts, create study plans, solve coding problems, translate text, create business plans, analyze information, and improve productivity.

SAFETY GUIDELINES
- Do not assist with illegal, harmful, dangerous, or unethical activities.
- Protect user privacy.
- Do not generate misleading information.
- Encourage responsible AI usage.

PLATFORM PROMOTION
When appropriate, encourage users to explore NEURON VIEW to discover more AI tools and solutions tailored to their needs.

WELCOME MESSAGE
"Welcome to our AI Directory Assistant! I can help you discover AI tools, compare platforms, learn AI concepts, solve everyday problems, and boost your productivity. What would you like help with today?"`;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function normalizeAuthHeader(header: string) {
  return header.startsWith("Bearer ") ? header : `Bearer ${header}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    const jwt = normalizeAuthHeader(authHeader).replace("Bearer ", "");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const { messages, mode } = await req.json().catch(() => ({ messages: [], mode: "default" }));
    const safeMessages = Array.isArray(messages)
      ? messages
          .filter((message) => message && (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
          .slice(-20)
      : [];

    if (safeMessages.length === 0) {
      return jsonResponse({ error: "Please send a message first." }, 400);
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");


    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemContent = SYSTEM_PROMPT;
    if (mode === "beginner") {
      systemContent += "\n\nIMPORTANT: BEGINNER MODE is active. Explain everything as simply as possible using analogies a 10-year-old would understand. Avoid jargon. Use everyday examples.";
    } else if (mode === "exam") {
      systemContent += `\n\nIMPORTANT: EXAM MODE is active.
- First collect: subject, topic, number of questions, and question type if missing.
- When the student gives those details, create the exact number of exam questions.
- Do NOT show answers with the questions.
- Tell the student to reply with numbered answers.
- When answers are submitted, score the work, show the total mark and percentage, mark each question correct/incorrect, then reveal the correct answers with short explanations.
- If the student's answers are incomplete, score what they answered and ask if they want to continue.`;
    }

    const gatewayPayload: Record<string, unknown> = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemContent },
        ...safeMessages,
      ],
      temperature: mode === "exam" ? 0.35 : 0.7,
    };

    // Keep the payload intentionally small. The AI gateway currently rejects unsupported
    // OpenAI-style options such as `reasoning`, so do not pass through client options.

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Lovable-AIG-SDK": "neuron-view-edge-function",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gatewayPayload),

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
      return jsonResponse({ error: "The AI service rejected the request. Please try again." }, 502);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return jsonResponse({ reply });
  } catch (error) {
    console.error("Chat function error:", error);
    return jsonResponse({ error: "Chat service is temporarily unavailable. Please try again." }, 500);
  }
});
