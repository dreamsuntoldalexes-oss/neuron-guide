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
  tier: "free" | "pro" | "enterprise";
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
  "Education",
  "Marketing",
  "Design",
  "Data",
  "Healthcare",
  "Finance",
  "Legal",
  "HR",
  "Customer Support",
  "Social Media",
  "E-commerce",
] as const;

export type Category = (typeof categories)[number];

// User tier system
export type UserTier = "free" | "pro" | "enterprise";

export function getUserTier(): UserTier {
  try {
    const stored = localStorage.getItem("ai-tools-user");
    if (stored) {
      const user = JSON.parse(stored);
      return user.tier || "free";
    }
  } catch {}
  return "free";
}

export function setUserTier(tier: UserTier) {
  try {
    const stored = localStorage.getItem("ai-tools-user");
    const user = stored ? JSON.parse(stored) : { name: "Guest", email: "" };
    user.tier = tier;
    localStorage.setItem("ai-tools-user", JSON.stringify(user));
  } catch {}
}

export function canAccessTool(toolTier: string, userTier: UserTier): boolean {
  if (toolTier === "free") return true;
  if (toolTier === "pro") return userTier === "pro" || userTier === "enterprise";
  if (toolTier === "enterprise") return userTier === "enterprise";
  return false;
}

export function getMaxFavorites(tier: UserTier): number {
  switch (tier) {
    case "free": return 5;
    case "pro": return 50;
    case "enterprise": return Infinity;
  }
}

// Helper to generate tool entries
function t(id: string, name: string, category: string, shortDesc: string, icon: string, rating: number, pricing: string, tier: "free" | "pro" | "enterprise" = "free", views?: number): AITool {
  return {
    id,
    name,
    category,
    shortDescription: shortDesc,
    description: `${name} is a powerful ${category.toLowerCase()} AI tool. ${shortDesc} It offers cutting-edge features for professionals and teams looking to leverage AI in their workflow.`,
    pricing,
    websiteUrl: `https://${id.replace(/-/g, "")}.com`,
    icon,
    rating,
    dateAdded: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    features: [`${category} automation`, "AI-powered analysis", "Team collaboration", "API access", "Custom templates"],
    pros: ["Easy to use", "Great AI quality", "Regular updates"],
    cons: ["Paid plans for full features", "Learning curve"],
    views: views || Math.floor(Math.random() * 15000) + 500,
    tier,
  };
}

export const tools: AITool[] = [
  // ===== WRITING (30 tools) =====
  { id: "chatgpt", name: "ChatGPT", category: "Writing", shortDescription: "Advanced AI chatbot for writing, brainstorming, and coding assistance.", description: "ChatGPT is a state-of-the-art AI language model developed by OpenAI. It excels at generating human-like text, answering questions, writing code, creating content, and engaging in meaningful conversations.", pricing: "Free / Plus $20/mo", websiteUrl: "https://chat.openai.com", icon: "🤖", rating: 4.8, dateAdded: "2024-01-15", features: ["Text generation", "Code writing", "Image analysis", "Web browsing", "Plugin ecosystem"], pros: ["Highly versatile", "Great for coding", "Regular updates", "Large community"], cons: ["Can hallucinate", "Paid for best models", "Rate limits on free tier"], views: 15420, tier: "free" },
  { id: "jasper", name: "Jasper AI", category: "Writing", shortDescription: "Enterprise-grade AI content platform for marketing teams.", description: "Jasper AI is a comprehensive AI content creation platform designed for businesses and marketing teams.", pricing: "Creator $49/mo / Pro $69/mo", websiteUrl: "https://jasper.ai", icon: "✍️", rating: 4.4, dateAdded: "2024-02-28", features: ["Blog writing", "Ad copy", "Brand voice", "Templates", "Team collaboration"], pros: ["Great for marketing", "Brand voice feature", "Many templates"], cons: ["Expensive", "Can be repetitive", "Learning curve"], views: 7650, tier: "pro" },
  t("copy-ai", "Copy.ai", "Writing", "AI-powered copywriting tool for marketing and sales.", "📄", 4.3, "Free / Pro $49/mo", "free", 6800),
  t("writesonic", "Writesonic", "Writing", "AI writer for blog posts, ads, and product descriptions.", "📝", 4.2, "Free / Pro $19/mo", "free", 5900),
  t("rytr", "Rytr", "Writing", "Affordable AI writing assistant with 30+ use cases.", "✏️", 4.1, "Free / Pro $9/mo", "free", 4500),
  t("wordtune", "Wordtune", "Writing", "AI-powered writing companion for rewriting and editing text.", "🔄", 4.3, "Free / Pro $10/mo", "free", 5200),
  t("quillbot", "QuillBot", "Writing", "AI paraphrasing and grammar checking tool.", "🪶", 4.2, "Free / Premium $10/mo", "free", 7100),
  t("grammarly", "Grammarly", "Writing", "AI writing assistant for grammar, clarity, and tone.", "📖", 4.6, "Free / Premium $12/mo", "free", 12000),
  t("peppertype", "Peppertype AI", "Writing", "AI content marketing platform for brands.", "🌶️", 4.0, "Starter $25/mo", "pro", 3200),
  t("sudowrite", "Sudowrite", "Writing", "AI writing partner for fiction and creative writing.", "📚", 4.3, "Hobby $10/mo / Pro $25/mo", "pro", 3800),
  t("anyword", "Anyword", "Writing", "AI copywriting platform with performance prediction.", "💬", 4.1, "Starter $39/mo", "pro", 2900),
  t("frase", "Frase", "Writing", "AI SEO content optimization and writing tool.", "🔎", 4.2, "Solo $15/mo / Team $25/mo", "pro", 4100),
  t("wordai", "WordAI", "Writing", "Advanced AI article rewriter and spinner.", "🔁", 4.0, "$57/mo", "pro", 2400),
  t("longshot", "LongShot AI", "Writing", "AI writing assistant for long-form blog content.", "🎯", 4.1, "Pro $19/mo", "pro", 2800),
  t("closerscopy", "ClosersCopy", "Writing", "AI copywriting with sales frameworks built in.", "💰", 4.0, "Power $50/mo", "pro", 2100),
  t("contentbot", "ContentBot", "Writing", "AI content generation for blogs and social media.", "🤖", 3.9, "Starter $19/mo", "free", 1900),
  t("hyperwrite", "HyperWrite", "Writing", "Personal AI writing assistant that learns your style.", "⚡", 4.2, "Free / Premium $20/mo", "free", 3600),
  t("textcortex", "TextCortex", "Writing", "AI writing assistant for multiple content formats.", "🧠", 4.1, "Free / Pro $10/mo", "free", 3100),
  t("ink-editor", "INK Editor", "Writing", "AI writing and SEO optimization tool.", "🖊️", 4.0, "Free / Pro $39/mo", "pro", 2600),
  t("simplified-write", "Simplified", "Writing", "All-in-one AI writing and design platform.", "✨", 4.2, "Free / Pro $18/mo", "free", 4200),
  t("scalenut", "Scalenut", "Writing", "AI-powered SEO and content marketing platform.", "📈", 4.1, "Essential $39/mo", "pro", 3400),
  t("paragraph-ai", "Paragraph AI", "Writing", "AI-powered writing tool for emails and messages.", "💌", 4.0, "Free / Pro $10/mo", "free", 2200),
  t("ai-writer", "AI Writer", "Writing", "Accurate AI article writer with source citations.", "📰", 4.1, "Basic $29/mo", "pro", 2500),
  t("kafkai", "Kafkai", "Writing", "AI writer specializing in niche blog content.", "☕", 3.9, "Writer $29/mo", "pro", 1800),
  t("articoolo", "Articoolo", "Writing", "AI article generator for short-form content.", "📃", 3.8, "Pay per article", "free", 1500),
  t("writecream", "Writecream", "Writing", "AI copywriting for cold emails and personalization.", "🍦", 4.0, "Free / Standard $49/mo", "pro", 2700),
  t("sassbook", "Sassbook", "Writing", "AI writing tools for authors and content creators.", "📕", 3.9, "Free / Pro $39/mo", "pro", 1600),
  t("lex-ai", "Lex", "Writing", "AI-powered writing editor for thoughtful content.", "📋", 4.3, "Free beta", "free", 4800),
  t("type-ai", "Type.ai", "Writing", "AI document editor with smart autocompletion.", "⌨️", 4.1, "Free / Pro $29/mo", "pro", 3000),
  t("moonbeam", "Moonbeam", "Writing", "AI writing assistant for long-form essays and blogs.", "🌙", 4.2, "Pro $49/mo", "pro", 2300),

  // ===== CODING (30 tools) =====
  { id: "github-copilot", name: "GitHub Copilot", category: "Coding", shortDescription: "AI-powered code completion and generation right in your editor.", description: "GitHub Copilot is an AI pair programmer that helps you write code faster with intelligent suggestions.", pricing: "Individual $10/mo / Business $19/mo", websiteUrl: "https://github.com/features/copilot", icon: "💻", rating: 4.6, dateAdded: "2024-01-20", features: ["Code completion", "Multi-language support", "IDE integration", "Chat mode", "Code explanation"], pros: ["Boosts productivity", "Great IDE integration", "Multi-language"], cons: ["Subscription required", "Sometimes suggests wrong code"], views: 11890, tier: "free" },
  { id: "cursor", name: "Cursor", category: "Coding", shortDescription: "AI-first code editor built for pair programming with AI.", description: "Cursor is a next-generation code editor built from the ground up with AI integration.", pricing: "Free / Pro $20/mo / Business $40/mo", websiteUrl: "https://cursor.sh", icon: "⚡", rating: 4.7, dateAdded: "2024-03-15", features: ["AI code completion", "Codebase chat", "Multi-file editing", "Terminal integration"], pros: ["Revolutionary coding experience", "Fast completions"], cons: ["Resource intensive", "Subscription for best features"], views: 13500, tier: "free" },
  t("tabnine", "Tabnine", "Coding", "AI code completion tool that runs locally for privacy.", "🔌", 4.3, "Free / Pro $12/mo", "free", 7200),
  t("replit-ai", "Replit AI", "Coding", "AI-powered cloud IDE for collaborative coding.", "💡", 4.4, "Free / Pro $7/mo", "free", 8100),
  t("codeium", "Codeium", "Coding", "Free AI code completion for 70+ languages.", "🆓", 4.5, "Free / Teams $12/mo", "free", 9300),
  t("amazon-codewhisperer", "Amazon CodeWhisperer", "Coding", "AI coding companion by AWS for cloud-native development.", "☁️", 4.2, "Free / Pro $19/mo", "free", 5600),
  t("sourcegraph-cody", "Sourcegraph Cody", "Coding", "AI coding assistant with codebase-wide context.", "🔍", 4.3, "Free / Pro $9/mo", "free", 4800),
  t("codex", "OpenAI Codex", "Coding", "AI system translating natural language to code.", "🧮", 4.4, "API pricing", "pro", 6700),
  t("devin-ai", "Devin AI", "Coding", "World's first fully autonomous AI software engineer.", "🤖", 4.6, "Enterprise pricing", "enterprise", 11200),
  t("v0-dev", "v0.dev", "Coding", "AI-powered UI component generator by Vercel.", "🎨", 4.5, "Free / Premium $20/mo", "free", 8900),
  t("bolt-new", "Bolt.new", "Coding", "AI full-stack app builder in the browser.", "⚡", 4.4, "Free / Pro $20/mo", "free", 7800),
  t("aider", "Aider", "Coding", "AI pair programming in your terminal.", "🖥️", 4.3, "Free / Open source", "free", 5400),
  t("codegen-ai", "CodeGen AI", "Coding", "AI code generation for enterprise applications.", "🏢", 4.1, "Enterprise pricing", "enterprise", 3200),
  t("phind", "Phind", "Coding", "AI search engine optimized for developers.", "🔎", 4.4, "Free / Pro $17/mo", "free", 6100),
  t("blackbox-ai", "Blackbox AI", "Coding", "AI code generation and search from any source.", "⬛", 4.2, "Free / Pro $12/mo", "free", 5000),
  t("cogram", "Cogram", "Coding", "AI assistant for data scientists and analysts.", "📊", 4.1, "Pro $15/mo", "pro", 2800),
  t("codium-ai", "CodiumAI", "Coding", "AI test generation for code quality.", "🧪", 4.3, "Free / Teams $19/mo", "free", 4500),
  t("what-the-diff", "What The Diff", "Coding", "AI-powered code review assistant.", "🔀", 4.0, "Free / Pro $19/mo", "pro", 2200),
  t("mutable-ai", "Mutable AI", "Coding", "AI-powered code refactoring and documentation.", "🔧", 4.1, "Free / Pro $15/mo", "pro", 2600),
  t("mintlify", "Mintlify", "Coding", "AI-powered documentation writer for code.", "📗", 4.3, "Free / Pro $20/mo", "free", 4200),
  t("pieces-ai", "Pieces for Developers", "Coding", "AI code snippet manager and copilot.", "🧩", 4.2, "Free / Pro $10/mo", "free", 3700),
  t("safurai", "Safurai", "Coding", "AI code assistant for Visual Studio Code.", "🛡️", 4.0, "Free / Pro $8/mo", "free", 2100),
  t("continue-dev", "Continue", "Coding", "Open-source AI code assistant for IDEs.", "➡️", 4.4, "Free / Open source", "free", 5800),
  t("sweep-ai", "Sweep AI", "Coding", "AI junior developer for GitHub issues.", "🧹", 4.1, "Free / Pro $480/mo", "enterprise", 3100),
  t("codebooga", "CodeBooga", "Coding", "Open-source AI coding model.", "👻", 4.0, "Free / Open source", "free", 1900),
  t("fig-ai", "Fig AI", "Coding", "AI-powered terminal autocomplete.", "🌳", 4.2, "Free", "free", 3400),
  t("jit-codes", "Jit.codes", "Coding", "AI security analysis for code.", "🔐", 4.1, "Free / Pro $25/mo", "pro", 2400),
  t("snyk-ai", "Snyk AI", "Coding", "AI-powered security vulnerability detection.", "🛡️", 4.3, "Free / Pro $25/mo", "pro", 4000),
  t("windsurf", "Windsurf", "Coding", "AI-powered IDE by Codeium for flow state coding.", "🏄", 4.5, "Free / Pro $15/mo", "free", 7500),
  t("lovable-dev", "Lovable", "Coding", "AI full-stack web app builder from prompts.", "💜", 4.7, "Free / Pro $20/mo", "free", 10500),

  // ===== VIDEO (30 tools) =====
  { id: "runway", name: "Runway ML", category: "Video", shortDescription: "AI-powered video generation and editing platform.", description: "Runway ML is a creative AI platform that offers powerful video generation and editing tools.", pricing: "Free / Standard $12/mo / Pro $28/mo", websiteUrl: "https://runwayml.com", icon: "🎬", rating: 4.5, dateAdded: "2024-03-05", features: ["Text-to-video", "Image-to-video", "Video editing", "Motion tracking"], pros: ["Revolutionary video AI", "Easy to use"], cons: ["Limited free credits", "Quality varies"], views: 9870, tier: "free" },
  { id: "synthesia", name: "Synthesia", category: "Video", shortDescription: "Create AI-generated videos with virtual avatars.", description: "Synthesia lets you create professional videos with AI avatars. No camera or studio needed.", pricing: "Starter $22/mo / Creator $67/mo", websiteUrl: "https://synthesia.io", icon: "🎥", rating: 4.4, dateAdded: "2024-03-01", features: ["AI avatars", "140+ languages", "Custom avatars", "Templates"], pros: ["No video production needed", "Many languages"], cons: ["Uncanny valley effect", "Expensive"], views: 7200, tier: "pro" },
  t("heygen", "HeyGen", "Video", "AI video generation platform with lifelike avatars.", "👤", 4.5, "Free / Creator $24/mo", "free", 8500),
  t("descript", "Descript", "Video", "AI-powered video and podcast editing with text-based editing.", "📹", 4.6, "Free / Pro $24/mo", "free", 9100),
  t("pictory", "Pictory", "Video", "AI video creation from long-form text content.", "🖼️", 4.2, "Starter $19/mo", "pro", 4300),
  t("invideo-ai", "InVideo AI", "Video", "AI-powered video creation from text prompts.", "🎞️", 4.3, "Free / Plus $25/mo", "free", 5600),
  t("colossyan", "Colossyan", "Video", "AI video platform for corporate training.", "🏛️", 4.1, "Starter $28/mo", "pro", 3200),
  t("elai", "Elai.io", "Video", "AI video generator with digital human presenters.", "🧑‍💼", 4.0, "Basic $23/mo", "pro", 2800),
  t("fliki", "Fliki", "Video", "AI text-to-video and text-to-speech creator.", "🎙️", 4.3, "Free / Standard $28/mo", "free", 5100),
  t("kapwing-ai", "Kapwing AI", "Video", "AI video editor with auto-subtitle and smart cut.", "✂️", 4.2, "Free / Pro $16/mo", "free", 6200),
  t("opus-clip", "Opus Clip", "Video", "AI tool for repurposing long videos into shorts.", "🎯", 4.5, "Free / Pro $15/mo", "free", 8800),
  t("veed-ai", "VEED.IO", "Video", "AI-powered online video editor.", "🎭", 4.3, "Free / Pro $18/mo", "free", 6700),
  t("lumen5", "Lumen5", "Video", "AI video maker for turning content into videos.", "💡", 4.1, "Free / Basic $29/mo", "free", 4600),
  t("deepbrain", "DeepBrain AI", "Video", "AI human video generation platform.", "🧠", 4.2, "Starter $30/mo", "pro", 3500),
  t("steve-ai", "Steve AI", "Video", "AI animated and live video creation tool.", "🎨", 4.0, "Starter $15/mo", "free", 2900),
  t("raw-shorts", "Raw Shorts", "Video", "AI-powered animated video creator.", "📽️", 3.9, "Free / Essential $25/mo", "pro", 2100),
  t("vidnoz", "Vidnoz AI", "Video", "Free AI video generator with 600+ avatars.", "🤖", 4.1, "Free / Starter $23/mo", "free", 4100),
  t("flexclip", "FlexClip", "Video", "AI video maker with templates and stock media.", "🎬", 4.0, "Free / Plus $10/mo", "free", 3600),
  t("nova-ai-video", "Nova AI", "Video", "AI video editor with auto-subtitles.", "🌟", 4.0, "Free / Pro $10/mo", "free", 3000),
  t("wondershare-filmora", "Filmora AI", "Video", "AI video editing software with smart tools.", "🎞️", 4.3, "Free / Annual $50", "free", 7400),
  t("topaz-video", "Topaz Video AI", "Video", "AI video upscaling and enhancement.", "💎", 4.5, "One-time $199", "pro", 5800),
  t("kling-ai", "Kling AI", "Video", "Chinese AI video generation model.", "🐉", 4.3, "Free / Pro pricing", "free", 6900),
  t("pika-labs", "Pika", "Video", "AI video generation from text and images.", "⚡", 4.4, "Free / Pro $8/mo", "free", 7600),
  t("stable-video", "Stable Video Diffusion", "Video", "Open-source AI video generation model.", "🎬", 4.2, "Free / API pricing", "free", 5200),
  t("vmake-ai", "VMake AI", "Video", "AI video enhancer and background remover.", "🖌️", 4.0, "Free / Pro $10/mo", "free", 2700),
  t("captions-ai", "Captions", "Video", "AI-powered video captions and editing.", "💬", 4.3, "Free / Pro $10/mo", "free", 5500),
  t("visla", "Visla", "Video", "AI video creation for business storytelling.", "📊", 4.1, "Free / Premium $24/mo", "pro", 3100),
  t("wisecut", "Wisecut", "Video", "AI auto-editing for video creators.", "✂️", 4.0, "Free / Pro $15/mo", "free", 2500),
  t("submagic", "Submagic", "Video", "AI-powered captions for short-form videos.", "✨", 4.2, "Starter $9/mo", "free", 4400),
  t("morphstudio", "Morph Studio", "Video", "AI text-to-video and storyboard tool.", "🎭", 4.1, "Free / Pro $20/mo", "pro", 3300),

  // ===== IMAGE (30 tools) =====
  { id: "midjourney", name: "Midjourney", category: "Image", shortDescription: "Create stunning AI art and images from text descriptions.", description: "Midjourney creates images from natural language prompts. Known for artistic and photorealistic outputs.", pricing: "Basic $10/mo / Standard $30/mo", websiteUrl: "https://midjourney.com", icon: "🎨", rating: 4.7, dateAdded: "2024-02-10", features: ["Text-to-image", "Style customization", "Upscaling", "Variations"], pros: ["Stunning art quality", "Active community"], cons: ["Discord-only interface", "No free tier"], views: 12300, tier: "pro" },
  { id: "dall-e", name: "DALL-E 3", category: "Image", shortDescription: "OpenAI's powerful image generation model.", description: "DALL-E 3 is OpenAI's latest image generation model, integrated into ChatGPT.", pricing: "Included with ChatGPT Plus $20/mo", websiteUrl: "https://openai.com/dall-e-3", icon: "🖼️", rating: 4.6, dateAdded: "2024-01-25", features: ["Text-to-image", "Image editing", "Style control", "High resolution"], pros: ["Excellent prompt understanding", "Integrated with ChatGPT"], cons: ["Content restrictions", "No free standalone access"], views: 10200, tier: "free" },
  { id: "canva-ai", name: "Canva AI", category: "Image", shortDescription: "AI-enhanced design platform for stunning graphics.", description: "Canva's AI features supercharge the popular design platform.", pricing: "Free / Pro $13/mo", websiteUrl: "https://canva.com", icon: "🎯", rating: 4.5, dateAdded: "2024-02-20", features: ["AI image generation", "Background removal", "Magic resize", "Text-to-design"], pros: ["Easy for beginners", "Huge template library"], cons: ["Limited free AI features"], views: 7800, tier: "free" },
  t("stable-diffusion", "Stable Diffusion", "Image", "Open-source AI image generation model.", "🎨", 4.5, "Free / API pricing", "free", 11000),
  t("leonardo-ai", "Leonardo AI", "Image", "AI art generation with fine-tuned models.", "🦁", 4.4, "Free / Apprentice $12/mo", "free", 8200),
  t("adobe-firefly", "Adobe Firefly", "Image", "Adobe's generative AI for creative professionals.", "🔥", 4.5, "Included with Creative Cloud", "pro", 9500),
  t("ideogram", "Ideogram", "Image", "AI image generator with excellent text rendering.", "💡", 4.4, "Free / Pro $7/mo", "free", 7300),
  t("playground-ai", "Playground AI", "Image", "Free AI image generation and editing.", "🎮", 4.2, "Free / Pro $15/mo", "free", 5600),
  t("nightcafe", "NightCafe", "Image", "AI art generator with multiple AI models.", "🌙", 4.1, "Free credits / Pro $10/mo", "free", 4800),
  t("artbreeder", "Artbreeder", "Image", "AI image blending and creation tool.", "🧬", 4.0, "Free / Pro $9/mo", "free", 3900),
  t("deepai-image", "DeepAI", "Image", "Free AI image generator with API access.", "🤖", 3.9, "Free / Pro $5/mo", "free", 3200),
  t("clipdrop", "ClipDrop", "Image", "AI-powered image editing and generation suite.", "✂️", 4.3, "Free / Pro $9/mo", "free", 5900),
  t("getimg-ai", "GetImg.ai", "Image", "AI image generation and editing tools.", "🖼️", 4.1, "Free / Basic $12/mo", "free", 3400),
  t("imagine-ai", "Imagine AI", "Image", "AI art generator with unique styles.", "💭", 4.0, "Free / Premium $8/mo", "free", 2800),
  t("bluewillow", "BlueWillow", "Image", "Free AI image generator via Discord.", "🌊", 3.9, "Free / Pro $5/mo", "free", 2500),
  t("lexica", "Lexica", "Image", "AI image search and generation engine.", "📚", 4.2, "Free / Pro $10/mo", "free", 4500),
  t("dreamstudio", "DreamStudio", "Image", "Official Stable Diffusion web interface.", "💫", 4.3, "Pay per generation", "free", 5200),
  t("craiyon", "Craiyon", "Image", "Free AI image generator (formerly DALL-E Mini).", "🖍️", 3.8, "Free / Pro $5/mo", "free", 4100),
  t("krea-ai", "KREA AI", "Image", "AI design tool for real-time image generation.", "🎨", 4.4, "Free / Pro $24/mo", "pro", 6100),
  t("remove-bg", "Remove.bg", "Image", "AI-powered background removal tool.", "🔲", 4.5, "Free / Pro from $9/mo", "free", 8700),
  t("photoroom", "PhotoRoom", "Image", "AI photo editor for product and portrait images.", "📸", 4.3, "Free / Pro $13/mo", "free", 6400),
  t("hotpot-ai", "Hotpot.ai", "Image", "AI tools for image editing and generation.", "🍲", 4.0, "Free / Pro $10/mo", "free", 2600),
  t("pixlr-ai", "Pixlr AI", "Image", "AI photo editor with smart tools.", "🎨", 4.1, "Free / Pro $8/mo", "free", 3800),
  t("fotor-ai", "Fotor AI", "Image", "AI image generator and photo enhancer.", "📷", 4.0, "Free / Pro $9/mo", "free", 3100),
  t("picwish", "PicWish", "Image", "AI photo editing and background removal.", "✨", 4.1, "Free / Pro $6/mo", "free", 2900),
  t("neural-love", "Neural.love", "Image", "AI art generator and image enhancer.", "❤️", 4.0, "Free / Pro $10/mo", "free", 2300),
  t("stockimg-ai", "StockImg AI", "Image", "AI stock image and logo generator.", "📸", 4.0, "Starter $19/mo", "pro", 2100),
  t("picsart-ai", "Picsart AI", "Image", "AI-powered photo and video editing app.", "🎨", 4.3, "Free / Gold $13/mo", "free", 6800),
  t("lensa-ai", "Lensa AI", "Image", "AI photo editor with magic avatar generation.", "✨", 4.1, "Free / Pro $8/mo", "free", 5400),
  t("flux-ai", "Flux AI", "Image", "Next-gen AI image model with photorealism.", "🌊", 4.6, "Free / Pro pricing", "free", 9200),

  // ===== BUSINESS (25 tools) =====
  { id: "otter", name: "Otter.ai", category: "Business", shortDescription: "AI meeting assistant for transcription and summaries.", description: "Otter.ai provides real-time transcription, automated meeting notes, and summaries.", pricing: "Free / Pro $17/mo", websiteUrl: "https://otter.ai", icon: "📋", rating: 4.3, dateAdded: "2024-01-30", features: ["Live transcription", "Meeting summaries", "Action items", "Speaker identification"], pros: ["Accurate transcription", "Great integrations"], cons: ["English-focused", "Storage limits"], views: 6500, tier: "free" },
  t("beautiful-ai", "Beautiful.ai", "Business", "AI-powered presentation design tool.", "📊", 4.3, "Pro $12/mo / Team $40/mo", "free", 5800),
  t("tome-ai", "Tome", "Business", "AI storytelling and presentation platform.", "📖", 4.2, "Free / Pro $16/mo", "free", 5200),
  t("gamma-ai", "Gamma", "Business", "AI presentation and document builder.", "🎯", 4.4, "Free / Plus $10/mo", "free", 7100),
  t("zia-zoho", "Zoho Zia", "Business", "AI assistant for Zoho business apps.", "🏢", 4.1, "Included with Zoho", "pro", 3400),
  t("fireflies", "Fireflies.ai", "Business", "AI meeting transcription and note-taking.", "🔥", 4.3, "Free / Pro $18/mo", "free", 5600),
  t("krisp", "Krisp", "Business", "AI noise cancellation for calls and meetings.", "🔇", 4.5, "Free / Pro $8/mo", "free", 6800),
  t("reclaim-ai", "Reclaim.ai", "Business", "AI calendar scheduling and time management.", "📅", 4.3, "Free / Starter $10/mo", "free", 4900),
  t("clockwise", "Clockwise", "Business", "AI-powered calendar optimization for teams.", "⏰", 4.2, "Free / Pro $7/mo", "free", 3700),
  t("gong-ai", "Gong", "Business", "AI revenue intelligence platform for sales.", "🔔", 4.5, "Enterprise pricing", "enterprise", 7900),
  t("salesforce-einstein", "Salesforce Einstein", "Business", "AI-powered CRM insights and automation.", "☁️", 4.4, "Enterprise pricing", "enterprise", 8200),
  t("hubspot-ai", "HubSpot AI", "Business", "AI tools for marketing, sales, and service.", "🟠", 4.3, "Free / Pro pricing", "pro", 6100),
  t("chorus-ai", "Chorus.ai", "Business", "AI conversation intelligence for sales teams.", "🎤", 4.2, "Enterprise pricing", "enterprise", 3800),
  t("x-ai-scheduling", "x.ai", "Business", "AI scheduling assistant for meetings.", "📧", 4.0, "Free / Pro $8/mo", "free", 2600),
  t("lavender-ai", "Lavender", "Business", "AI email coach for better outreach.", "💜", 4.2, "Free / Starter $27/mo", "pro", 3200),
  t("sembly-ai", "Sembly AI", "Business", "AI meeting assistant with team insights.", "📝", 4.1, "Free / Pro $10/mo", "free", 2900),
  t("brieflyai", "Briefly AI", "Business", "AI meeting summaries and action items.", "📋", 4.0, "Free / Pro $15/mo", "free", 2400),
  t("rationale-ai", "Rationale", "Business", "AI decision-making assistant.", "⚖️", 4.1, "Free trial / Pro pricing", "pro", 1800),
  t("alli-ai", "Alli AI", "Business", "AI SEO optimization for businesses.", "🔍", 4.0, "Business $299/mo", "enterprise", 2100),
  t("exceed-ai", "Exceed.ai", "Business", "AI conversational marketing for lead qualification.", "🎯", 4.1, "Enterprise pricing", "enterprise", 2500),
  t("people-ai", "People.ai", "Business", "AI revenue operations platform.", "👥", 4.2, "Enterprise pricing", "enterprise", 3000),
  t("drift-ai", "Drift AI", "Business", "AI-powered conversational marketing.", "💬", 4.2, "Premium pricing", "enterprise", 3500),
  t("smartlead", "Smartlead", "Business", "AI cold email outreach platform.", "📬", 4.1, "Basic $39/mo", "pro", 3100),
  t("apollo-ai", "Apollo.io", "Business", "AI-powered sales intelligence platform.", "🚀", 4.3, "Free / Basic $49/mo", "pro", 5400),
  t("clearbit-ai", "Clearbit", "Business", "AI data enrichment for B2B companies.", "🔮", 4.2, "Custom pricing", "enterprise", 4000),

  // ===== RESEARCH (25 tools) =====
  { id: "perplexity", name: "Perplexity AI", category: "Research", shortDescription: "AI-powered search engine with cited answers.", description: "Perplexity AI combines web search with AI for comprehensive, cited responses.", pricing: "Free / Pro $20/mo", websiteUrl: "https://perplexity.ai", icon: "🔍", rating: 4.5, dateAdded: "2024-02-01", features: ["AI search", "Source citations", "Follow-up questions", "Collections"], pros: ["Accurate with sources", "Great for research"], cons: ["Pro needed for best models"], views: 11200, tier: "free" },
  { id: "claude", name: "Claude", category: "Research", shortDescription: "Anthropic's helpful, harmless, and honest AI assistant.", description: "Claude by Anthropic is a powerful AI assistant known for thoughtful, nuanced responses.", pricing: "Free / Pro $20/mo", websiteUrl: "https://claude.ai", icon: "🧠", rating: 4.7, dateAdded: "2024-01-10", features: ["Long context", "Document analysis", "Code generation", "Vision"], pros: ["Excellent reasoning", "Huge context window"], cons: ["Sometimes overly cautious"], views: 14100, tier: "free" },
  t("consensus-ai", "Consensus", "Research", "AI search engine for scientific research.", "📑", 4.3, "Free / Premium $10/mo", "free", 5100),
  t("elicit", "Elicit", "Research", "AI research assistant for literature review.", "📚", 4.4, "Free / Plus $10/mo", "free", 6200),
  t("semantic-scholar", "Semantic Scholar", "Research", "AI-powered academic search engine.", "🎓", 4.5, "Free", "free", 8900),
  t("scite-ai", "Scite.ai", "Research", "AI citation analysis for research papers.", "📊", 4.2, "Free / Starter $10/mo", "free", 4300),
  t("research-rabbit", "Research Rabbit", "Research", "AI tool for discovering related research papers.", "🐰", 4.3, "Free", "free", 5500),
  t("scholarai", "ScholarAI", "Research", "AI assistant for reading academic papers.", "📖", 4.1, "Free / Pro $10/mo", "free", 3600),
  t("iris-ai", "Iris.ai", "Research", "AI platform for scientific research analysis.", "🌸", 4.0, "Enterprise pricing", "enterprise", 2400),
  t("scispace", "SciSpace", "Research", "AI tool for understanding research papers.", "🔬", 4.3, "Free / Pro $12/mo", "free", 4800),
  t("connected-papers", "Connected Papers", "Research", "AI visual tool for exploring connected research.", "🕸️", 4.4, "Free / Pro $6/mo", "free", 6700),
  t("paperpal", "Paperpal", "Research", "AI writing assistant for academic manuscripts.", "📝", 4.2, "Free / Pro $12/mo", "free", 3900),
  t("jenni-ai", "Jenni AI", "Research", "AI writing assistant for academic content.", "📋", 4.1, "Free / Pro $12/mo", "free", 3400),
  t("chatpdf", "ChatPDF", "Research", "AI chatbot for interacting with PDF documents.", "📄", 4.3, "Free / Plus $5/mo", "free", 5800),
  t("humata-ai", "Humata", "Research", "AI for summarizing and querying documents.", "📑", 4.2, "Free / Pro $15/mo", "free", 4100),
  t("you-com", "You.com", "Research", "AI search engine with privacy focus.", "🔎", 4.2, "Free / Pro $15/mo", "free", 4600),
  t("wolfram-alpha", "Wolfram Alpha", "Research", "Computational knowledge engine with AI.", "🐺", 4.6, "Free / Pro $7.25/mo", "free", 9400),
  t("explainpaper", "ExplainPaper", "Research", "AI tool for understanding complex papers.", "📰", 4.1, "Free", "free", 3000),
  t("typeset-ai", "Typeset.io", "Research", "AI-powered research discovery platform.", "📑", 4.0, "Free / Pro $10/mo", "free", 2700),
  t("keenious", "Keenious", "Research", "AI research recommendation engine.", "🔑", 4.0, "Free / Pro $10/mo", "free", 2200),
  t("litmaps", "Litmaps", "Research", "AI literature mapping for research.", "🗺️", 4.1, "Free / Pro $10/mo", "free", 2800),
  t("inciteful", "Inciteful", "Research", "AI tool for building citation networks.", "💡", 4.0, "Free", "free", 2000),
  t("notebook-lm", "NotebookLM", "Research", "Google's AI research notebook assistant.", "📓", 4.5, "Free", "free", 8100),
  t("gemini", "Gemini", "Research", "Google's most capable AI model.", "♊", 4.6, "Free / Advanced $20/mo", "free", 12500),
  t("meta-ai", "Meta AI", "Research", "Meta's conversational AI assistant.", "Ⓜ️", 4.3, "Free", "free", 7800),

  // ===== AUDIO (25 tools) =====
  { id: "elevenlabs", name: "ElevenLabs", category: "Audio", shortDescription: "AI voice synthesis and cloning with natural speech.", description: "ElevenLabs offers state-of-the-art AI voice synthesis technology.", pricing: "Free / Starter $5/mo / Creator $22/mo", websiteUrl: "https://elevenlabs.io", icon: "🎙️", rating: 4.7, dateAdded: "2024-03-10", features: ["Voice cloning", "Text-to-speech", "Multi-language", "Voice library"], pros: ["Most natural voices", "Voice cloning", "Great API"], cons: ["Expensive at scale", "Limited free tier"], views: 9100, tier: "free" },
  { id: "suno", name: "Suno AI", category: "Audio", shortDescription: "Create complete songs with AI — lyrics, melody, and vocals.", description: "Suno AI creates complete songs from text prompts.", pricing: "Free / Pro $10/mo / Premier $30/mo", websiteUrl: "https://suno.ai", icon: "🎵", rating: 4.4, dateAdded: "2024-03-20", features: ["Song generation", "Custom lyrics", "Multiple genres", "Download tracks"], pros: ["Amazing song quality", "Easy to use"], cons: ["Copyright concerns", "Limited customization"], views: 8900, tier: "free" },
  t("murf-ai", "Murf AI", "Audio", "AI voice generator for voiceovers and presentations.", "🗣️", 4.3, "Free / Creator $26/mo", "free", 5400),
  t("play-ht", "Play.ht", "Audio", "AI text-to-speech and voice cloning platform.", "▶️", 4.2, "Free / Pro $31/mo", "free", 4800),
  t("speechify", "Speechify", "Audio", "AI text-to-speech reader for any content.", "📖", 4.4, "Free / Premium $12/mo", "free", 7200),
  t("descript-audio", "Descript Audio", "Audio", "AI-powered podcast and audio editing.", "🎧", 4.5, "Free / Pro $24/mo", "free", 6100),
  t("audo-ai", "Audo AI", "Audio", "AI noise reduction and audio enhancement.", "🔊", 4.1, "Free / Pro $12/mo", "free", 3200),
  t("lalal-ai", "LALAL.AI", "Audio", "AI vocal and music separation tool.", "🎼", 4.3, "Free / Pro $15/mo", "free", 5600),
  t("soundraw", "Soundraw", "Audio", "AI music generator for content creators.", "🎹", 4.2, "Free / Creator $17/mo", "free", 4500),
  t("boomy", "Boomy", "Audio", "AI music creation and distribution platform.", "💥", 4.0, "Free / Pro $10/mo", "free", 3800),
  t("aiva", "AIVA", "Audio", "AI music composer for emotional soundtracks.", "🎻", 4.3, "Free / Pro $15/mo", "free", 5100),
  t("beatoven", "Beatoven.ai", "Audio", "AI royalty-free music for videos.", "🥁", 4.1, "Free / Pro $6/mo", "free", 3400),
  t("resemble-ai", "Resemble AI", "Audio", "AI voice cloning and synthesis platform.", "🎤", 4.2, "Pay-as-you-go / Enterprise", "pro", 3900),
  t("wellsaid-labs", "WellSaid Labs", "Audio", "Enterprise AI voiceover platform.", "🗣️", 4.3, "Enterprise pricing", "enterprise", 4200),
  t("lovo-ai", "LOVO AI", "Audio", "AI voice generator with 500+ voices.", "🔈", 4.1, "Free / Pro $24/mo", "free", 3600),
  t("podcast-ai", "Podcast.ai", "Audio", "AI-generated podcast conversations.", "🎙️", 4.0, "Free beta", "free", 2800),
  t("adobe-podcast", "Adobe Podcast", "Audio", "AI audio recording and editing by Adobe.", "🎧", 4.4, "Free beta", "free", 5800),
  t("cleanvoice", "Cleanvoice", "Audio", "AI audio cleaner for podcasts.", "🧹", 4.1, "Pay per hour", "free", 2600),
  t("udio-ai", "Udio", "Audio", "AI music generation with detailed prompting.", "🎶", 4.5, "Free / Pro $10/mo", "free", 7800),
  t("stable-audio", "Stable Audio", "Audio", "AI music and sound effect generator.", "🔊", 4.2, "Free / Pro $12/mo", "free", 4100),
  t("riffusion", "Riffusion", "Audio", "AI music generation from text using diffusion.", "🎸", 4.0, "Free / Open source", "free", 3300),
  t("voicemod-ai", "Voicemod AI", "Audio", "AI voice changer for gaming and streaming.", "🎭", 4.1, "Free / Pro $4/mo", "free", 5200),
  t("krisp-audio", "Krisp Audio", "Audio", "AI noise cancellation for any audio.", "🔇", 4.4, "Free / Pro $8/mo", "free", 6400),
  t("audacity-ai", "Audacity AI", "Audio", "Open-source audio editor with AI features.", "🎛️", 4.2, "Free / Open source", "free", 4700),
  t("listnr", "Listnr", "Audio", "AI voiceover and podcast hosting platform.", "📡", 4.0, "Individual $9/mo", "free", 2400),

  // ===== PRODUCTIVITY (25 tools) =====
  { id: "notion-ai", name: "Notion AI", category: "Productivity", shortDescription: "AI-powered workspace for notes, docs, and project management.", description: "Notion AI enhances the popular Notion workspace with AI capabilities.", pricing: "Add-on $10/member/mo", websiteUrl: "https://notion.so/product/ai", icon: "📝", rating: 4.3, dateAdded: "2024-02-15", features: ["Content generation", "Summarization", "Translation", "Q&A"], pros: ["Seamless Notion integration", "Context-aware"], cons: ["Requires Notion subscription", "Add-on cost"], views: 8430, tier: "free" },
  t("todoist-ai", "Todoist AI", "Productivity", "AI task management and smart scheduling.", "✅", 4.3, "Free / Pro $5/mo", "free", 6200),
  t("clickup-ai", "ClickUp AI", "Productivity", "AI-powered project management platform.", "📌", 4.4, "Free / Unlimited $7/mo", "free", 7100),
  t("motion-ai", "Motion", "Productivity", "AI calendar that auto-schedules your tasks.", "⚙️", 4.5, "Individual $19/mo", "pro", 5800),
  t("mem-ai", "Mem", "Productivity", "AI-powered note-taking and knowledge management.", "🧠", 4.2, "Free / Pro $15/mo", "free", 4300),
  t("taskade-ai", "Taskade AI", "Productivity", "AI-powered workspace for teams.", "📋", 4.1, "Free / Pro $8/mo", "free", 3900),
  t("otter-notes", "Otter Notes", "Productivity", "AI meeting notes and action items.", "📝", 4.2, "Free / Pro $17/mo", "free", 4100),
  t("clockify-ai", "Clockify AI", "Productivity", "AI time tracking and productivity insights.", "⏱️", 4.0, "Free / Pro $12/mo", "free", 3400),
  t("sunsama-ai", "Sunsama", "Productivity", "AI daily planner for focused work.", "☀️", 4.3, "$16/mo", "pro", 3200),
  t("akiflow", "Akiflow", "Productivity", "AI-powered task and calendar manager.", "📅", 4.1, "$15/mo", "pro", 2800),
  t("coda-ai", "Coda AI", "Productivity", "AI-enhanced collaborative documents.", "📄", 4.2, "Free / Pro $10/mo", "free", 4600),
  t("airtable-ai", "Airtable AI", "Productivity", "AI-powered database and automation.", "📊", 4.3, "Free / Pro $20/mo", "free", 5400),
  t("monday-ai", "Monday.com AI", "Productivity", "AI work management platform.", "📈", 4.2, "From $8/seat/mo", "pro", 5100),
  t("asana-ai", "Asana AI", "Productivity", "AI project management and workflow.", "🎯", 4.3, "Free / Premium $11/mo", "free", 6500),
  t("trello-ai", "Trello AI", "Productivity", "AI-powered Kanban boards and automation.", "📋", 4.1, "Free / Premium $5/mo", "free", 5800),
  t("linear-ai", "Linear AI", "Productivity", "AI project tracking for software teams.", "🔷", 4.5, "Free / Pro $8/mo", "free", 6900),
  t("craft-ai", "Craft AI", "Productivity", "AI document editor with smart features.", "✏️", 4.2, "Free / Pro $5/mo", "free", 3600),
  t("bear-ai", "Bear AI", "Productivity", "AI-enhanced markdown note-taking app.", "🐻", 4.1, "Free / Pro $3/mo", "free", 2900),
  t("reflect-ai", "Reflect", "Productivity", "AI-powered networked note-taking.", "🪞", 4.2, "Pro $10/mo", "pro", 2600),
  t("logseq-ai", "Logseq AI", "Productivity", "Open-source AI knowledge management.", "📒", 4.1, "Free / Pro $5/mo", "free", 3100),
  t("tana-ai", "Tana", "Productivity", "AI-powered supertag workspace.", "🌳", 4.3, "Free beta / Pro $10/mo", "pro", 3800),
  t("saga-ai", "Saga AI", "Productivity", "AI-powered workspace with automation.", "📙", 4.0, "Free / Standard $5/mo", "free", 2200),
  t("slite-ai", "Slite AI", "Productivity", "AI knowledge base for teams.", "📚", 4.1, "Free / Standard $8/mo", "free", 2800),
  t("nuclino-ai", "Nuclino AI", "Productivity", "AI-powered team knowledge hub.", "⚛️", 4.1, "Free / Standard $5/mo", "free", 2500),
  t("slab-ai", "Slab AI", "Productivity", "AI knowledge management for teams.", "📋", 4.0, "Free / Startup $7/mo", "free", 2100),

  // ===== EDUCATION (25 tools) =====
  t("khan-ai", "Khan Academy AI", "Education", "AI-powered tutoring with Khanmigo.", "🎓", 4.6, "Free / Premium $9/mo", "free", 9800),
  t("duolingo-ai", "Duolingo Max", "Education", "AI language learning with roleplay.", "🦉", 4.5, "Free / Max $30/mo", "free", 8900),
  t("quizlet-ai", "Quizlet AI", "Education", "AI-powered flashcards and study tools.", "📇", 4.3, "Free / Plus $8/mo", "free", 7200),
  t("photomath", "Photomath", "Education", "AI math solver from photos.", "📐", 4.4, "Free / Plus $10/mo", "free", 8100),
  t("socratic", "Socratic by Google", "Education", "AI homework helper with visual explanations.", "🏛️", 4.2, "Free", "free", 6500),
  t("brainly-ai", "Brainly AI", "Education", "AI-powered homework help community.", "🧠", 4.1, "Free / Plus $6/mo", "free", 5800),
  t("gradescope-ai", "Gradescope", "Education", "AI-assisted grading and assessment.", "📝", 4.3, "Institution pricing", "enterprise", 4200),
  t("turnitin-ai", "Turnitin AI", "Education", "AI writing detection and plagiarism check.", "🔎", 4.2, "Institution pricing", "enterprise", 5100),
  t("coursera-ai", "Coursera AI", "Education", "AI-enhanced online learning platform.", "🎯", 4.4, "Free / Plus $59/mo", "pro", 7600),
  t("skillshare-ai", "Skillshare AI", "Education", "AI-recommended creative learning paths.", "🎨", 4.1, "Premium $14/mo", "pro", 4800),
  t("synthesis-tutor", "Synthesis Tutor", "Education", "AI math tutoring for kids.", "🧮", 4.3, "From $35/mo", "pro", 3400),
  t("caktus-ai", "Caktus AI", "Education", "AI student assistant for essays and coding.", "🌵", 4.0, "Premium $10/mo", "pro", 3800),
  t("knowji", "Knowji", "Education", "AI vocabulary learning app.", "📖", 4.1, "$5 one-time", "free", 2200),
  t("fetchy-ai", "Fetchy", "Education", "AI assistant for teachers and educators.", "🐕", 4.0, "Free / Pro $5/mo", "free", 2600),
  t("quizizz-ai", "Quizizz AI", "Education", "AI-powered quiz and lesson creation.", "❓", 4.2, "Free / Super $6/mo", "free", 4500),
  t("century-tech", "Century Tech", "Education", "AI adaptive learning platform.", "🏫", 4.1, "Institution pricing", "enterprise", 2800),
  t("squirrel-ai", "Squirrel AI", "Education", "Adaptive AI tutoring system.", "🐿️", 4.0, "Custom pricing", "enterprise", 2100),
  t("ello-ai", "Ello", "Education", "AI reading tutor for children.", "📕", 4.3, "$15/mo", "pro", 3100),
  t("mathway", "Mathway", "Education", "AI math problem solver step by step.", "➗", 4.3, "Free / Premium $10/mo", "free", 6800),
  t("wolfram-ed", "Wolfram Education", "Education", "AI computational learning tools.", "🐺", 4.4, "Free / Pro $7/mo", "free", 5200),
  t("cramly", "Cramly AI", "Education", "AI essay writer and study assistant.", "📝", 3.9, "Free / Pro $5/mo", "free", 1900),
  t("studocu-ai", "StuDocu AI", "Education", "AI study document sharing and help.", "📄", 4.0, "Free / Premium $8/mo", "free", 3600),
  t("anki-ai", "Anki AI", "Education", "AI-enhanced spaced repetition flashcards.", "🃏", 4.3, "Free / Desktop $25", "free", 5600),
  t("revisely-ai", "Revisely", "Education", "AI revision and exam prep tool.", "📊", 4.0, "Free / Pro $7/mo", "free", 2400),
  t("classgpt", "ClassGPT", "Education", "AI classroom assistant for students.", "🏫", 4.1, "Free / Pro $10/mo", "free", 2900),

  // ===== MARKETING (25 tools) =====
  t("hubspot-mkt", "HubSpot Marketing AI", "Marketing", "AI-powered inbound marketing platform.", "🟠", 4.4, "Free / Starter $20/mo", "free", 7400),
  t("surfer-seo", "Surfer SEO", "Marketing", "AI-powered SEO content optimization.", "🏄", 4.3, "Essential $89/mo", "pro", 5800),
  t("semrush-ai", "Semrush AI", "Marketing", "AI SEO and competitive analysis suite.", "📊", 4.5, "Pro $130/mo", "pro", 8200),
  t("ahrefs-ai", "Ahrefs AI", "Marketing", "AI-powered SEO toolset and backlink analysis.", "🔗", 4.5, "Lite $99/mo", "pro", 7900),
  t("mailchimp-ai", "Mailchimp AI", "Marketing", "AI email marketing automation.", "📧", 4.2, "Free / Standard $13/mo", "free", 6100),
  t("phrasee", "Phrasee", "Marketing", "AI copywriting for email subject lines.", "💬", 4.1, "Enterprise pricing", "enterprise", 3200),
  t("persado", "Persado", "Marketing", "AI-generated marketing language.", "🎭", 4.2, "Enterprise pricing", "enterprise", 3800),
  t("albert-ai", "Albert AI", "Marketing", "AI digital advertising optimization.", "🤖", 4.1, "Enterprise pricing", "enterprise", 2900),
  t("adcreative-ai", "AdCreative.ai", "Marketing", "AI ad creative generation tool.", "🎨", 4.3, "Starter $29/mo", "pro", 5400),
  t("headlime", "Headlime", "Marketing", "AI landing page copy generator.", "📃", 4.0, "Pro $59/mo", "pro", 2600),
  t("smartly-io", "Smartly.io", "Marketing", "AI social media advertising platform.", "📱", 4.2, "Enterprise pricing", "enterprise", 3400),
  t("seventh-sense", "Seventh Sense", "Marketing", "AI email send time optimization.", "⏰", 4.0, "From $80/mo", "pro", 2100),
  t("optimove", "Optimove", "Marketing", "AI customer retention marketing.", "📈", 4.1, "Enterprise pricing", "enterprise", 2800),
  t("crayon-mkt", "Crayon", "Marketing", "AI competitive intelligence platform.", "🖍️", 4.2, "Custom pricing", "enterprise", 3100),
  t("brandwatch-ai", "Brandwatch AI", "Marketing", "AI social listening and analytics.", "👁️", 4.3, "Custom pricing", "enterprise", 4200),
  t("zapier-ai", "Zapier AI", "Marketing", "AI-powered workflow automation.", "⚡", 4.4, "Free / Starter $20/mo", "free", 8500),
  t("buffer-ai", "Buffer AI", "Marketing", "AI social media management.", "📊", 4.1, "Free / Essentials $6/mo", "free", 5200),
  t("hootsuite-ai", "Hootsuite AI", "Marketing", "AI social media scheduling and analytics.", "🦉", 4.2, "Professional $99/mo", "pro", 5600),
  t("later-ai", "Later AI", "Marketing", "AI social media scheduling and planning.", "📅", 4.1, "Starter $25/mo", "pro", 4100),
  t("sprout-social-ai", "Sprout Social AI", "Marketing", "AI social media management suite.", "🌱", 4.3, "Standard $249/mo", "enterprise", 4800),
  t("unbounce-ai", "Unbounce", "Marketing", "AI landing page builder and optimizer.", "📈", 4.2, "Launch $99/mo", "pro", 3600),
  t("convertkit-ai", "ConvertKit AI", "Marketing", "AI email marketing for creators.", "✉️", 4.1, "Free / Creator $9/mo", "free", 3900),
  t("beehiiv-ai", "Beehiiv AI", "Marketing", "AI newsletter platform with growth tools.", "🐝", 4.3, "Free / Scale $42/mo", "pro", 4500),
  t("manychat-ai", "ManyChat AI", "Marketing", "AI chatbot for Instagram and Messenger.", "💬", 4.2, "Free / Pro $15/mo", "free", 5100),
  t("tidio-ai", "Tidio AI", "Marketing", "AI customer service chatbot.", "🤖", 4.1, "Free / Starter $29/mo", "pro", 3700),

  // ===== DESIGN (25 tools) =====
  t("figma-ai", "Figma AI", "Design", "AI-powered design tools in Figma.", "🎨", 4.6, "Free / Pro $12/mo", "free", 9200),
  t("framer-ai", "Framer AI", "Design", "AI website builder with no-code design.", "🖥️", 4.5, "Free / Mini $5/mo", "free", 7800),
  t("relume", "Relume", "Design", "AI website wireframe and sitemap generator.", "📐", 4.3, "Free / Pro $38/mo", "pro", 5100),
  t("magician-figma", "Magician for Figma", "Design", "AI design tools plugin for Figma.", "🪄", 4.2, "Free / Pro $5/mo", "free", 4300),
  t("uizard", "Uizard", "Design", "AI-powered UI/UX design tool.", "🖌️", 4.1, "Free / Pro $12/mo", "free", 3800),
  t("khroma", "Khroma", "Design", "AI color palette generator.", "🌈", 4.3, "Free", "free", 5600),
  t("fontjoy", "Fontjoy", "Design", "AI font pairing generator.", "🔤", 4.1, "Free", "free", 4100),
  t("looka-ai", "Looka", "Design", "AI logo and brand identity designer.", "✨", 4.2, "Premium $96/year", "pro", 5400),
  t("designs-ai", "Designs.ai", "Design", "AI design suite for logos and mockups.", "🎯", 4.0, "Basic $29/mo", "pro", 3200),
  t("brandmark", "Brandmark", "Design", "AI-powered logo and brand design.", "🏷️", 4.1, "From $25 one-time", "free", 3600),
  t("haikei", "Haikei", "Design", "AI SVG background generator.", "🌊", 4.2, "Free / Pro $10/mo", "free", 4800),
  t("mokker-ai", "Mokker AI", "Design", "AI product photo background generator.", "📸", 4.1, "Free / Pro $9/mo", "free", 2900),
  t("booth-ai", "Booth.ai", "Design", "AI product photography generator.", "📷", 4.0, "From $15/mo", "pro", 2400),
  t("visily", "Visily", "Design", "AI wireframe and prototype tool.", "📝", 4.2, "Free / Pro $12/mo", "free", 3400),
  t("diagram-ai", "Diagram", "Design", "AI-powered design tools for Figma.", "📊", 4.3, "Free / Pro $12/mo", "free", 4600),
  t("muzli-ai", "Muzli AI", "Design", "AI design inspiration and color tools.", "🎨", 4.1, "Free", "free", 3100),
  t("designify", "Designify", "Design", "AI automatic photo editing and design.", "✂️", 4.0, "Free / Pro $7/mo", "free", 2700),
  t("wix-ai", "Wix AI", "Design", "AI website builder and designer.", "🌐", 4.2, "Free / Light $17/mo", "free", 6200),
  t("squarespace-ai", "Squarespace AI", "Design", "AI-powered website design and content.", "⬛", 4.1, "Personal $16/mo", "pro", 5100),
  t("webflow-ai", "Webflow AI", "Design", "AI features for no-code web design.", "🔷", 4.3, "Free / Basic $14/mo", "free", 5800),
  t("galileo-ai", "Galileo AI", "Design", "AI UI design generator from text.", "🔭", 4.4, "Beta / Waitlist", "pro", 6400),
  t("durable-ai", "Durable", "Design", "AI website builder in 30 seconds.", "🏗️", 4.0, "Starter $12/mo", "free", 3500),
  t("10web-ai", "10Web AI", "Design", "AI WordPress website builder.", "🔟", 4.1, "Personal $10/mo", "free", 3800),
  t("hostinger-ai", "Hostinger AI Builder", "Design", "AI website builder with hosting.", "🌐", 4.0, "Premium $3/mo", "free", 4200),
  t("mobirise-ai", "Mobirise AI", "Design", "AI offline website builder.", "📱", 3.9, "Free / Kit $1k one-time", "pro", 2100),

  // ===== DATA (20 tools) =====
  t("tableau-ai", "Tableau AI", "Data", "AI-powered data visualization and analytics.", "📊", 4.5, "Creator $75/mo", "pro", 8100),
  t("obviously-ai", "Obviously AI", "Data", "No-code AI for predictive analytics.", "🔮", 4.2, "Starter $75/mo", "pro", 3800),
  t("datarobot", "DataRobot", "Data", "Enterprise AI platform for data science.", "🤖", 4.4, "Enterprise pricing", "enterprise", 5600),
  t("h2o-ai", "H2O.ai", "Data", "Open-source AI platform for data scientists.", "💧", 4.3, "Free / Enterprise", "pro", 4200),
  t("knime-ai", "KNIME AI", "Data", "Open-source data analytics platform.", "🔧", 4.1, "Free / Hub $40/mo", "free", 3400),
  t("akkio", "Akkio", "Data", "No-code AI data analytics for businesses.", "📈", 4.2, "Starter $49/mo", "pro", 2900),
  t("polymer-ai", "Polymer", "Data", "AI-powered data analysis and dashboards.", "🧪", 4.1, "Starter $10/mo", "free", 2600),
  t("julius-ai", "Julius AI", "Data", "AI data analysis and visualization.", "📊", 4.3, "Free / Pro $20/mo", "free", 5100),
  t("rows-ai", "Rows AI", "Data", "AI spreadsheet with built-in data analysis.", "📋", 4.0, "Free / Pro $14/mo", "free", 3200),
  t("hex-ai", "Hex AI", "Data", "AI-powered collaborative data workspace.", "⬡", 4.3, "Free / Pro $28/mo", "pro", 4600),
  t("databricks-ai", "Databricks AI", "Data", "Unified analytics platform with AI.", "🧱", 4.5, "Pay-as-you-go", "enterprise", 7200),
  t("snowflake-ai", "Snowflake Cortex", "Data", "AI features for cloud data platform.", "❄️", 4.4, "Usage-based", "enterprise", 6800),
  t("bigquery-ai", "BigQuery ML", "Data", "Google's AI-powered data warehouse.", "☁️", 4.3, "Pay-per-query", "enterprise", 5400),
  t("monte-carlo", "Monte Carlo", "Data", "AI data observability platform.", "🎰", 4.2, "Enterprise pricing", "enterprise", 3600),
  t("atlan-ai", "Atlan", "Data", "AI-powered data catalog and governance.", "🗺️", 4.1, "Custom pricing", "enterprise", 3100),
  t("deepnote-ai", "Deepnote AI", "Data", "AI collaborative data science notebook.", "📓", 4.2, "Free / Pro $12/mo", "free", 3800),
  t("observable-ai", "Observable AI", "Data", "AI data visualization and notebooks.", "👀", 4.1, "Free / Pro $15/mo", "free", 3000),
  t("count-ai", "Count", "Data", "AI-powered collaborative data analysis.", "🔢", 4.0, "Free / Team $20/mo", "pro", 2400),
  t("arctype", "Arctype", "Data", "AI SQL editor and database management.", "🏛️", 4.1, "Free / Pro $10/mo", "free", 2800),
  t("evidence-ai", "Evidence", "Data", "AI-powered business intelligence from code.", "📊", 4.0, "Free / Teams $15/mo", "pro", 2200),

  // ===== HEALTHCARE (15 tools) =====
  t("ada-health", "Ada Health", "Healthcare", "AI-powered symptom checker and health guide.", "🏥", 4.3, "Free / Enterprise", "free", 5800),
  t("babylon-health", "Babylon Health", "Healthcare", "AI healthcare consultations and triage.", "⚕️", 4.1, "Per consultation", "pro", 4200),
  t("buoy-health", "Buoy Health", "Healthcare", "AI symptom checker with care navigation.", "🚢", 4.0, "Free / B2B pricing", "free", 3100),
  t("k-health", "K Health", "Healthcare", "AI-powered primary care platform.", "💊", 4.2, "Free / $29 per visit", "free", 4500),
  t("viz-ai", "Viz.ai", "Healthcare", "AI-powered clinical decision support.", "🔬", 4.5, "Hospital pricing", "enterprise", 5200),
  t("aidoc", "Aidoc", "Healthcare", "AI medical imaging analysis for radiology.", "🩻", 4.4, "Hospital pricing", "enterprise", 4800),
  t("tempus-ai", "Tempus", "Healthcare", "AI precision medicine platform.", "🧬", 4.3, "Enterprise pricing", "enterprise", 4100),
  t("paige-ai", "Paige AI", "Healthcare", "AI pathology and cancer detection.", "🔬", 4.5, "Hospital pricing", "enterprise", 3800),
  t("butterfly-med", "Butterfly Network", "Healthcare", "AI-powered handheld ultrasound.", "🦋", 4.2, "Device + $420/year", "pro", 3400),
  t("regard-ai", "Regard", "Healthcare", "AI clinical assistant for hospitals.", "🏨", 4.1, "Hospital pricing", "enterprise", 2600),
  t("nabla-ai", "Nabla", "Healthcare", "AI medical documentation assistant.", "📋", 4.2, "Pro $50/provider/mo", "pro", 2900),
  t("abridge-ai", "Abridge", "Healthcare", "AI medical conversation summarizer.", "🩺", 4.3, "Enterprise pricing", "enterprise", 3200),
  t("hippocratic-ai", "Hippocratic AI", "Healthcare", "AI for healthcare staffing and triage.", "⚕️", 4.1, "Enterprise pricing", "enterprise", 2100),
  t("medable-ai", "Medable", "Healthcare", "AI platform for clinical trials.", "🧪", 4.0, "Enterprise pricing", "enterprise", 1800),
  t("nuance-dax", "Nuance DAX", "Healthcare", "AI ambient clinical documentation.", "🎙️", 4.4, "Enterprise pricing", "enterprise", 4600),

  // ===== FINANCE (15 tools) =====
  t("alphasense", "AlphaSense", "Finance", "AI market intelligence platform.", "📈", 4.4, "Enterprise pricing", "enterprise", 5200),
  t("kensho-ai", "Kensho", "Finance", "AI analytics for financial markets by S&P.", "📊", 4.3, "Enterprise pricing", "enterprise", 4100),
  t("ayo-ai", "AYO AI", "Finance", "AI financial planning assistant.", "💰", 4.1, "Free / Pro $10/mo", "free", 2800),
  t("cleo-ai", "Cleo AI", "Finance", "AI personal finance chatbot.", "💳", 4.2, "Free / Plus $6/mo", "free", 5100),
  t("plaid-ai", "Plaid", "Finance", "AI financial data connectivity platform.", "🔗", 4.4, "Pay-per-connection", "enterprise", 6200),
  t("stripe-ai", "Stripe AI", "Finance", "AI-powered payment fraud detection.", "💳", 4.5, "Per-transaction", "pro", 7800),
  t("upstart-ai", "Upstart", "Finance", "AI lending and credit decisioning.", "🏦", 4.2, "B2B pricing", "enterprise", 3600),
  t("zest-ai", "Zest AI", "Finance", "AI credit underwriting platform.", "🍋", 4.1, "Enterprise pricing", "enterprise", 2400),
  t("kavout", "Kavout", "Finance", "AI stock analysis and trading signals.", "📉", 4.0, "Pro $30/mo", "pro", 3100),
  t("numerai", "Numerai", "Finance", "AI hedge fund powered by data scientists.", "🔢", 4.2, "Free to compete", "pro", 3800),
  t("betterment-ai", "Betterment", "Finance", "AI-powered robo-advisor for investing.", "📈", 4.3, "0.25% annual fee", "free", 5600),
  t("wealthfront-ai", "Wealthfront", "Finance", "AI automated investment management.", "💵", 4.3, "0.25% annual fee", "free", 5200),
  t("mint-ai", "Mint AI", "Finance", "AI personal finance tracking.", "🌿", 4.1, "Free", "free", 4800),
  t("ramp-ai", "Ramp", "Finance", "AI corporate card and spend management.", "💳", 4.4, "Free", "enterprise", 4200),
  t("brex-ai", "Brex AI", "Finance", "AI business finance platform.", "🏢", 4.2, "Essentials free / Premium", "enterprise", 3900),

  // ===== LEGAL (10 tools) =====
  t("harvey-ai", "Harvey AI", "Legal", "AI legal assistant for law firms.", "⚖️", 4.4, "Enterprise pricing", "enterprise", 5800),
  t("casetext", "Casetext", "Legal", "AI legal research and analysis.", "📖", 4.3, "From $65/mo", "pro", 4600),
  t("spellbook-ai", "Spellbook", "Legal", "AI contract drafting assistant.", "📜", 4.2, "Custom pricing", "pro", 3800),
  t("lawgeex", "LawGeex", "Legal", "AI contract review automation.", "📋", 4.1, "Enterprise pricing", "enterprise", 3200),
  t("kira-systems", "Kira Systems", "Legal", "AI contract analysis platform.", "🔎", 4.2, "Enterprise pricing", "enterprise", 2900),
  t("ironclad-ai", "Ironclad AI", "Legal", "AI contract lifecycle management.", "🛡️", 4.3, "Enterprise pricing", "enterprise", 3500),
  t("luminance", "Luminance", "Legal", "AI for legal document review.", "💡", 4.2, "Enterprise pricing", "enterprise", 2800),
  t("lexis-ai", "Lexis+ AI", "Legal", "AI legal research by LexisNexis.", "📚", 4.4, "Subscription pricing", "pro", 5100),
  t("westlaw-ai", "Westlaw Edge AI", "Legal", "AI-enhanced legal research platform.", "⚖️", 4.3, "Subscription pricing", "pro", 4800),
  t("docassemble-ai", "Docassemble", "Legal", "Open-source AI document automation.", "📄", 4.0, "Free / Open source", "free", 2100),

  // ===== HR (10 tools) =====
  t("eightfold-ai", "Eightfold AI", "HR", "AI talent intelligence platform.", "8️⃣", 4.3, "Enterprise pricing", "enterprise", 4200),
  t("hirevue-ai", "HireVue", "HR", "AI video interviewing and assessments.", "🎥", 4.1, "Enterprise pricing", "enterprise", 3600),
  t("pymetrics", "Pymetrics", "HR", "AI-based talent matching and assessment.", "🧩", 4.0, "Enterprise pricing", "enterprise", 2800),
  t("textio", "Textio", "HR", "AI-powered inclusive job posting writing.", "📝", 4.2, "Enterprise pricing", "enterprise", 3100),
  t("beamery-ai", "Beamery", "HR", "AI talent management platform.", "✨", 4.1, "Enterprise pricing", "enterprise", 2600),
  t("fetcher-ai", "Fetcher", "HR", "AI-powered recruiting automation.", "🐕", 4.0, "Startup $149/mo", "pro", 2200),
  t("seekout", "SeekOut", "HR", "AI talent search and diversity hiring.", "🔍", 4.2, "Custom pricing", "enterprise", 3200),
  t("paradox-ai", "Paradox AI", "HR", "AI recruiting assistant chatbot.", "💬", 4.1, "Enterprise pricing", "enterprise", 2400),
  t("humanly-ai", "Humanly", "HR", "AI screening and interview platform.", "🤝", 4.0, "Startup pricing", "pro", 1800),
  t("rippling-ai", "Rippling AI", "HR", "AI-powered HR and IT management.", "🌊", 4.3, "From $8/user/mo", "pro", 4800),

  // ===== CUSTOMER SUPPORT (15 tools) =====
  t("intercom-ai", "Intercom Fin", "Customer Support", "AI customer support chatbot.", "💬", 4.5, "Starter $39/mo + AI", "pro", 7200),
  t("zendesk-ai", "Zendesk AI", "Customer Support", "AI-powered customer service platform.", "🎫", 4.3, "Suite Team $55/mo", "pro", 6100),
  t("freshdesk-ai", "Freshdesk AI", "Customer Support", "AI customer support with Freddy AI.", "🍃", 4.2, "Free / Growth $15/mo", "free", 5400),
  t("ada-support", "Ada CX", "Customer Support", "AI-powered customer experience automation.", "🤖", 4.3, "Enterprise pricing", "enterprise", 4200),
  t("forethought", "Forethought", "Customer Support", "AI customer support automation.", "🧠", 4.1, "Custom pricing", "enterprise", 3400),
  t("helpscout-ai", "Help Scout AI", "Customer Support", "AI writing assistant for customer support.", "🛟", 4.2, "Standard $20/mo", "free", 3800),
  t("yuma-ai", "Yuma AI", "Customer Support", "AI ticket automation for e-commerce.", "🎯", 4.0, "Starter $39/mo", "pro", 2600),
  t("chatfuel-ai", "Chatfuel AI", "Customer Support", "AI chatbot builder for businesses.", "⛽", 4.1, "Business $15/mo", "free", 4100),
  t("drift-cs", "Drift", "Customer Support", "AI conversational platform for sales.", "💬", 4.2, "Premium pricing", "enterprise", 3600),
  t("kustomer-ai", "Kustomer AI", "Customer Support", "AI CRM and support platform.", "👤", 4.1, "Enterprise $89/mo", "enterprise", 2800),
  t("dixa-ai", "Dixa AI", "Customer Support", "AI conversational customer service.", "📞", 4.0, "Essential $49/mo", "pro", 2400),
  t("ultimate-ai", "Ultimate.ai", "Customer Support", "AI customer support automation.", "🏆", 4.1, "Enterprise pricing", "enterprise", 2200),
  t("verloop-ai", "Verloop.io", "Customer Support", "AI conversational support platform.", "🔄", 4.0, "Custom pricing", "pro", 1900),
  t("talkdesk-ai", "Talkdesk AI", "Customer Support", "AI cloud contact center.", "☁️", 4.2, "Essential $85/mo", "enterprise", 3200),
  t("five9-ai", "Five9 AI", "Customer Support", "AI-powered cloud contact center.", "5️⃣", 4.1, "Core $149/mo", "enterprise", 2900),

  // ===== SOCIAL MEDIA (15 tools) =====
  t("lately-ai", "Lately AI", "Social Media", "AI social media content generator.", "📱", 4.1, "Starter $49/mo", "pro", 3400),
  t("predis-ai", "Predis.ai", "Social Media", "AI social media post generator.", "🎯", 4.2, "Free / Starter $29/mo", "free", 4100),
  t("flick-ai", "Flick AI", "Social Media", "AI social media marketing assistant.", "📸", 4.1, "Solo $11/mo", "free", 3200),
  t("ocoya-ai", "Ocoya", "Social Media", "AI social media management platform.", "🐙", 4.0, "Bronze $19/mo", "free", 2800),
  t("publer-ai", "Publer AI", "Social Media", "AI social media scheduling with analytics.", "📊", 4.1, "Free / Pro $12/mo", "free", 3600),
  t("repurpose-io", "Repurpose.io", "Social Media", "AI content repurposing across platforms.", "♻️", 4.2, "Podcaster $25/mo", "pro", 4200),
  t("taplio", "Taplio", "Social Media", "AI LinkedIn content creation tool.", "🔷", 4.3, "Starter $39/mo", "pro", 4600),
  t("tweet-hunter", "Tweet Hunter", "Social Media", "AI Twitter/X growth and content tool.", "🐦", 4.2, "Individual $49/mo", "pro", 4800),
  t("socialbee-ai", "SocialBee AI", "Social Media", "AI social media management for growth.", "🐝", 4.1, "Bootstrap $29/mo", "pro", 3400),
  t("opus-social", "Opus Pro", "Social Media", "AI video to social clips converter.", "✂️", 4.4, "Free / Pro $15/mo", "free", 5200),
  t("vidyo-ai", "Vidyo.ai", "Social Media", "AI short-form video creator from long videos.", "🎬", 4.2, "Free / Pro $30/mo", "free", 4500),
  t("postwise", "Postwise", "Social Media", "AI Twitter ghostwriter and scheduler.", "🐦", 4.0, "Basic $37/mo", "pro", 2600),
  t("typefully-ai", "Typefully", "Social Media", "AI writing tool for Twitter threads.", "✍️", 4.2, "Free / Pro $13/mo", "free", 3800),
  t("canva-social", "Canva Social", "Social Media", "AI social media design and scheduling.", "🎨", 4.3, "Free / Pro $13/mo", "free", 5800),
  t("loomly-ai", "Loomly AI", "Social Media", "AI social media calendar and content ideas.", "📅", 4.0, "Base $26/mo", "pro", 2900),

  // ===== E-COMMERCE (15 tools) =====
  t("shopify-ai", "Shopify Magic", "E-commerce", "AI tools built into Shopify.", "🛍️", 4.4, "Included with Shopify", "free", 7200),
  t("amazon-ai", "Amazon AI", "E-commerce", "AI tools for Amazon sellers.", "📦", 4.2, "Various pricing", "pro", 5600),
  t("nosto-ai", "Nosto", "E-commerce", "AI-powered e-commerce personalization.", "🎯", 4.1, "Custom pricing", "enterprise", 3400),
  t("clerk-io", "Clerk.io", "E-commerce", "AI product recommendations for stores.", "🛒", 4.2, "From $99/mo", "pro", 3800),
  t("algolia-ai", "Algolia AI", "E-commerce", "AI-powered search for e-commerce.", "🔍", 4.4, "Free / Premium pricing", "pro", 5200),
  t("photoai-product", "ProductAI", "E-commerce", "AI product image enhancement.", "📸", 4.0, "From $15/mo", "pro", 2600),
  t("syte-ai", "Syte.ai", "E-commerce", "AI visual search for retail.", "👁️", 4.1, "Enterprise pricing", "enterprise", 2800),
  t("bloomreach-ai", "Bloomreach", "E-commerce", "AI commerce experience platform.", "🌸", 4.3, "Enterprise pricing", "enterprise", 4100),
  t("dynamic-yield", "Dynamic Yield", "E-commerce", "AI personalization for e-commerce.", "📈", 4.2, "Enterprise pricing", "enterprise", 3600),
  t("privy-ai", "Privy AI", "E-commerce", "AI email and pop-up marketing for stores.", "📧", 4.0, "Free / Starter $30/mo", "free", 3200),
  t("omnisend-ai", "Omnisend AI", "E-commerce", "AI email and SMS for e-commerce.", "📨", 4.1, "Free / Standard $16/mo", "free", 4200),
  t("gorgias-ai", "Gorgias AI", "E-commerce", "AI customer support for e-commerce.", "🎧", 4.2, "Starter $10/mo", "free", 4600),
  t("yotpo-ai", "Yotpo AI", "E-commerce", "AI reviews and UGC for e-commerce.", "⭐", 4.1, "Free / Growth pricing", "free", 3800),
  t("returngo-ai", "ReturnGO AI", "E-commerce", "AI-powered returns management.", "🔄", 4.0, "Starter $23/mo", "pro", 2100),
  t("rebuy-ai", "Rebuy AI", "E-commerce", "AI-powered product recommendations.", "🛒", 4.2, "From $99/mo", "pro", 3400),
];

export function getToolsByCategory(category: Category): AITool[] {
  if (category === "All") return tools;
  return tools.filter((t) => t.category === category);
}

export function getTrendingTools(): AITool[] {
  return [...tools].sort((a, b) => b.views - a.views).slice(0, 8);
}

export function getRecentTools(): AITool[] {
  return [...tools].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 8);
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

export function getToolsForTier(userTier: UserTier): AITool[] {
  return tools.filter((t) => canAccessTool(t.tier, userTier));
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  tools.forEach((t) => {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });
  return counts;
}
