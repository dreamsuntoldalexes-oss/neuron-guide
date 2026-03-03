export interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  pricing: string;
  websiteUrl: string;
  icon: string;
  rating: number;
  dateAdded: string;
  features: string[];
  pros: string[];
  cons: string[];
  views: number;
}

export const categories = [
  "All",
  "Writing",
  "Coding",
  "Video",
  "Image",
  "Business",
  "Research",
  "Audio",
  "Productivity",
] as const;

export type Category = (typeof categories)[number];

export const tools: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Writing",
    shortDescription: "Advanced AI chatbot for writing, brainstorming, and coding assistance.",
    description: "ChatGPT is a state-of-the-art AI language model developed by OpenAI. It excels at generating human-like text, answering questions, writing code, creating content, and engaging in meaningful conversations. With its latest models, it supports image understanding, browsing, and advanced reasoning capabilities.",
    pricing: "Free / Plus $20/mo / Team $25/mo",
    websiteUrl: "https://chat.openai.com",
    icon: "🤖",
    rating: 4.8,
    dateAdded: "2024-01-15",
    features: ["Text generation", "Code writing", "Image analysis", "Web browsing", "Plugin ecosystem"],
    pros: ["Highly versatile", "Great for coding", "Regular updates", "Large community"],
    cons: ["Can hallucinate", "Paid for best models", "Rate limits on free tier"],
    views: 15420,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Image",
    shortDescription: "Create stunning AI art and images from text descriptions.",
    description: "Midjourney is a generative AI tool that creates images from natural language prompts. Known for its artistic and photorealistic outputs, it has become the go-to tool for designers, marketers, and creatives looking to generate unique visual content.",
    pricing: "Basic $10/mo / Standard $30/mo / Pro $60/mo",
    websiteUrl: "https://midjourney.com",
    icon: "🎨",
    rating: 4.7,
    dateAdded: "2024-02-10",
    features: ["Text-to-image", "Style customization", "Upscaling", "Variations", "Blend mode"],
    pros: ["Stunning art quality", "Active community", "Fast generation"],
    cons: ["Discord-only interface", "No free tier", "Learning curve for prompts"],
    views: 12300,
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "Coding",
    shortDescription: "AI-powered code completion and generation right in your editor.",
    description: "GitHub Copilot is an AI pair programmer that helps you write code faster. It suggests whole lines or entire functions based on context, supports dozens of languages, and integrates directly into VS Code, JetBrains, and other popular editors.",
    pricing: "Individual $10/mo / Business $19/mo",
    websiteUrl: "https://github.com/features/copilot",
    icon: "💻",
    rating: 4.6,
    dateAdded: "2024-01-20",
    features: ["Code completion", "Multi-language support", "IDE integration", "Chat mode", "Code explanation"],
    pros: ["Boosts productivity", "Great IDE integration", "Multi-language"],
    cons: ["Subscription required", "Sometimes suggests wrong code", "Privacy concerns"],
    views: 11890,
  },
  {
    id: "runway",
    name: "Runway ML",
    category: "Video",
    shortDescription: "AI-powered video generation and editing platform.",
    description: "Runway ML is a creative AI platform that offers powerful video generation and editing tools. From text-to-video generation to advanced video editing with AI, Runway is used by filmmakers, content creators, and marketers worldwide.",
    pricing: "Free / Standard $12/mo / Pro $28/mo",
    websiteUrl: "https://runwayml.com",
    icon: "🎬",
    rating: 4.5,
    dateAdded: "2024-03-05",
    features: ["Text-to-video", "Image-to-video", "Video editing", "Motion tracking", "Green screen"],
    pros: ["Revolutionary video AI", "Easy to use", "Regular new features"],
    cons: ["Limited free credits", "Generation can be slow", "Quality varies"],
    views: 9870,
  },
  {
    id: "jasper",
    name: "Jasper AI",
    category: "Writing",
    shortDescription: "Enterprise-grade AI content platform for marketing teams.",
    description: "Jasper AI is a comprehensive AI content creation platform designed for businesses and marketing teams. It helps create blog posts, social media content, ads, emails, and more with brand voice consistency.",
    pricing: "Creator $49/mo / Pro $69/mo / Business Custom",
    websiteUrl: "https://jasper.ai",
    icon: "✍️",
    rating: 4.4,
    dateAdded: "2024-02-28",
    features: ["Blog writing", "Ad copy", "Brand voice", "Templates", "Team collaboration"],
    pros: ["Great for marketing", "Brand voice feature", "Many templates"],
    cons: ["Expensive", "Can be repetitive", "Learning curve"],
    views: 7650,
  },
  {
    id: "dall-e",
    name: "DALL-E 3",
    category: "Image",
    shortDescription: "OpenAI's powerful image generation model with natural language control.",
    description: "DALL-E 3 is OpenAI's latest image generation model, integrated directly into ChatGPT. It understands nuanced prompts and generates highly detailed, creative images with impressive accuracy.",
    pricing: "Included with ChatGPT Plus $20/mo",
    websiteUrl: "https://openai.com/dall-e-3",
    icon: "🖼️",
    rating: 4.6,
    dateAdded: "2024-01-25",
    features: ["Text-to-image", "Image editing", "Style control", "High resolution", "ChatGPT integration"],
    pros: ["Excellent prompt understanding", "Integrated with ChatGPT", "High quality"],
    cons: ["Content restrictions", "No free standalone access", "Limited control"],
    views: 10200,
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    category: "Productivity",
    shortDescription: "AI-powered workspace for notes, docs, and project management.",
    description: "Notion AI enhances the popular Notion workspace with AI capabilities. It can summarize pages, generate content, translate text, fix grammar, and help organize information across your workspace.",
    pricing: "Add-on $10/member/mo",
    websiteUrl: "https://notion.so/product/ai",
    icon: "📝",
    rating: 4.3,
    dateAdded: "2024-02-15",
    features: ["Content generation", "Summarization", "Translation", "Q&A", "Writing assistance"],
    pros: ["Seamless Notion integration", "Context-aware", "Great for teams"],
    cons: ["Requires Notion subscription", "Limited compared to ChatGPT", "Add-on cost"],
    views: 8430,
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "Audio",
    shortDescription: "AI voice synthesis and cloning platform with natural-sounding speech.",
    description: "ElevenLabs offers state-of-the-art AI voice synthesis technology. Create natural-sounding voiceovers, clone voices, and generate speech in multiple languages with incredible realism.",
    pricing: "Free / Starter $5/mo / Creator $22/mo / Pro $99/mo",
    websiteUrl: "https://elevenlabs.io",
    icon: "🎙️",
    rating: 4.7,
    dateAdded: "2024-03-10",
    features: ["Voice cloning", "Text-to-speech", "Multi-language", "Voice library", "API access"],
    pros: ["Most natural voices", "Voice cloning", "Great API"],
    cons: ["Expensive at scale", "Ethical concerns", "Limited free tier"],
    views: 9100,
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "Research",
    shortDescription: "AI-powered search engine with cited, accurate answers.",
    description: "Perplexity AI is an AI-powered search and research tool that provides accurate, cited answers to complex questions. It combines web search with AI to deliver comprehensive responses with source attribution.",
    pricing: "Free / Pro $20/mo",
    websiteUrl: "https://perplexity.ai",
    icon: "🔍",
    rating: 4.5,
    dateAdded: "2024-02-01",
    features: ["AI search", "Source citations", "Follow-up questions", "Collections", "File analysis"],
    pros: ["Accurate with sources", "Great for research", "Clean interface"],
    cons: ["Pro needed for best models", "Sometimes shallow answers", "Limited file types"],
    views: 11200,
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    shortDescription: "AI-first code editor built for pair programming with AI.",
    description: "Cursor is a next-generation code editor built from the ground up with AI integration. It offers intelligent code completion, natural language editing, and codebase-aware chat to dramatically accelerate development.",
    pricing: "Free / Pro $20/mo / Business $40/mo",
    websiteUrl: "https://cursor.sh",
    icon: "⚡",
    rating: 4.7,
    dateAdded: "2024-03-15",
    features: ["AI code completion", "Codebase chat", "Multi-file editing", "Terminal integration", "Custom models"],
    pros: ["Revolutionary coding experience", "Fast completions", "Great UI"],
    cons: ["Resource intensive", "Subscription for best features", "VS Code fork limitations"],
    views: 13500,
  },
  {
    id: "suno",
    name: "Suno AI",
    category: "Audio",
    shortDescription: "Create complete songs with AI — lyrics, melody, and vocals.",
    description: "Suno AI is a groundbreaking music generation platform that creates complete songs from text prompts. It generates lyrics, melodies, and vocals in various genres and styles.",
    pricing: "Free / Pro $10/mo / Premier $30/mo",
    websiteUrl: "https://suno.ai",
    icon: "🎵",
    rating: 4.4,
    dateAdded: "2024-03-20",
    features: ["Song generation", "Custom lyrics", "Multiple genres", "Extend songs", "Download tracks"],
    pros: ["Amazing song quality", "Easy to use", "Multiple genres"],
    cons: ["Copyright concerns", "Limited customization", "Songs can sound repetitive"],
    views: 8900,
  },
  {
    id: "canva-ai",
    name: "Canva AI",
    category: "Image",
    shortDescription: "AI-enhanced design platform for stunning graphics and presentations.",
    description: "Canva's AI features supercharge the popular design platform with magic tools for image generation, background removal, design suggestions, and smart resizing across all your creative projects.",
    pricing: "Free / Pro $13/mo / Teams $15/mo",
    websiteUrl: "https://canva.com",
    icon: "🎯",
    rating: 4.5,
    dateAdded: "2024-02-20",
    features: ["AI image generation", "Background removal", "Magic resize", "Text-to-design", "Brand kit"],
    pros: ["Easy for beginners", "Huge template library", "AI features integrated"],
    cons: ["Limited free AI features", "Less control than Photoshop", "Templates can look generic"],
    views: 7800,
  },
  {
    id: "otter",
    name: "Otter.ai",
    category: "Business",
    shortDescription: "AI meeting assistant for transcription, notes, and summaries.",
    description: "Otter.ai is an AI-powered meeting assistant that provides real-time transcription, automated meeting notes, and intelligent summaries. It integrates with Zoom, Google Meet, and Microsoft Teams.",
    pricing: "Free / Pro $17/mo / Business $30/mo",
    websiteUrl: "https://otter.ai",
    icon: "📋",
    rating: 4.3,
    dateAdded: "2024-01-30",
    features: ["Live transcription", "Meeting summaries", "Action items", "Speaker identification", "Integrations"],
    pros: ["Accurate transcription", "Great integrations", "Action item extraction"],
    cons: ["English-focused", "Accuracy varies with accents", "Storage limits"],
    views: 6500,
  },
  {
    id: "synthesia",
    name: "Synthesia",
    category: "Video",
    shortDescription: "Create AI-generated videos with virtual avatars and voiceovers.",
    description: "Synthesia lets you create professional videos with AI avatars. Simply type your script and choose an avatar to generate a video — no camera, studio, or actors needed.",
    pricing: "Starter $22/mo / Creator $67/mo / Enterprise Custom",
    websiteUrl: "https://synthesia.io",
    icon: "🎥",
    rating: 4.4,
    dateAdded: "2024-03-01",
    features: ["AI avatars", "140+ languages", "Custom avatars", "Screen recording", "Templates"],
    pros: ["No video production needed", "Many languages", "Professional results"],
    cons: ["Uncanny valley effect", "Limited customization", "Expensive"],
    views: 7200,
  },
  {
    id: "claude",
    name: "Claude",
    category: "Research",
    shortDescription: "Anthropic's helpful, harmless, and honest AI assistant.",
    description: "Claude by Anthropic is a powerful AI assistant known for its thoughtful, nuanced responses and strong safety measures. It excels at analysis, writing, coding, and handling long documents with its massive context window.",
    pricing: "Free / Pro $20/mo / Team $30/mo",
    websiteUrl: "https://claude.ai",
    icon: "🧠",
    rating: 4.7,
    dateAdded: "2024-01-10",
    features: ["Long context", "Document analysis", "Code generation", "Vision", "Artifacts"],
    pros: ["Excellent reasoning", "Huge context window", "Very safe"],
    cons: ["Sometimes overly cautious", "Limited availability", "No plugins"],
    views: 14100,
  },
];

export function getToolsByCategory(category: Category): AITool[] {
  if (category === "All") return tools;
  return tools.filter((t) => t.category === category);
}

export function getTrendingTools(): AITool[] {
  return [...tools].sort((a, b) => b.views - a.views).slice(0, 6);
}

export function getRecentTools(): AITool[] {
  return [...tools].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 6);
}

export function getSimilarTools(tool: AITool): AITool[] {
  return tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);
}

export function searchTools(query: string): AITool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}
