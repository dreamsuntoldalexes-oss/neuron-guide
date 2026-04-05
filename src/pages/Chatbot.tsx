import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import neuronLogo from "@/assets/neuron-logo-new.png";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const suggestions = [
  "Recommend the best AI video generator",
  "Which AI tool is best for writing?",
  "What's the best free AI image tool?",
  "Compare ChatGPT vs Claude",
];

const botResponses: Record<string, string> = {
  video: "For AI video generation, I'd recommend **Runway ML** — it's the most versatile option with text-to-video, image-to-video, and powerful editing tools. **Synthesia** is great if you need avatar-based videos for training or marketing.",
  writing: "For writing, **ChatGPT** is the most versatile all-rounder. If you need marketing-specific content, **Jasper AI** excels at brand-consistent copy. For research-backed writing, try **Claude** — it handles long documents exceptionally well.",
  image: "**Midjourney** produces the most artistic results, while **DALL-E 3** is best for prompt accuracy since it's integrated with ChatGPT. **Canva AI** is perfect if you need quick designs without a learning curve.",
  compare: "**ChatGPT** excels at versatility, coding, and plugins. **Claude** shines at reasoning, safety, and handling very long documents. Both are excellent — ChatGPT is better for coding, Claude for analysis and writing.",
  default: "That's a great question! I can help you find the perfect AI tool. Try asking about specific categories like writing, coding, video, or image generation tools. I can also compare tools or suggest options based on your needs.",
};

function getBotResponse(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("video")) return botResponses.video;
  if (m.includes("writ")) return botResponses.writing;
  if (m.includes("image") || m.includes("art") || m.includes("design")) return botResponses.image;
  if (m.includes("compare") || m.includes("vs")) return botResponses.compare;
  return botResponses.default;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "bot", content: "Hey! 👋 I'm your AI Tools assistant. Ask me anything about AI tools, and I'll help you find the perfect one for your needs." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: getBotResponse(text) };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-heading font-semibold text-foreground">AI Assistant</h1>
              <p className="text-[10px] text-primary">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}>
                <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <div className="chat-bubble-bot flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Sparkles className="w-3 h-3" /> Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border/50">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI tools..."
              className="flex-1 bg-muted/50 border border-border rounded-xl py-2.5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition"
            />
            <button type="submit" disabled={!input.trim()}
              className="p-2.5 rounded-xl gradient-primary text-primary-foreground disabled:opacity-50 transition hover:opacity-90 active:scale-95">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
