import { useState, useRef, useEffect, useCallback } from "react";
import Seo from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, User, Sparkles, Plus, Trash2, MessageSquare,
  ChevronLeft, ChevronRight, BookOpen, Zap, GraduationCap,
  Menu, X, Mic, Square, Volume2, Loader2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { supabase } from "@/integrations/supabase/client";
import neuronLogo from "@/assets/neuron-logo-new.png";
import { aiGalleryImages } from "@/assets/aiGallery";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ─── Types ───
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string; // data URL for generated images or video preview frames
  storyboard?: string; // for /video command
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  mode: "default" | "beginner" | "exam";
  questions?: string[]; // first user prompts, used to build title
}

type Mode = "default" | "beginner" | "exam";

const MODE_CONFIG: Record<Mode, { label: string; icon: typeof BookOpen; desc: string }> = {
  default: { label: "Standard", icon: BookOpen, desc: "Balanced explanations" },
  beginner: { label: "Beginner", icon: GraduationCap, desc: "Simple, easy to understand" },
  exam: { label: "Exam", icon: Zap, desc: "Create exams and score answers" },
};

function titleFromQuestions(qs: string[]): string {
  if (qs.length === 0) return "New Chat";
  const words = qs
    .slice(0, 3)
    .flatMap((q) => q.split(/\s+/).filter((w) => w.length > 3))
    .slice(0, 5)
    .join(" ");
  return (words || qs[0]).slice(0, 50);
}

const SUGGESTIONS = [
  "/image a futuristic cyberpunk city at night",
  "Solve 2x + 5 = 15",
  "Explain photosynthesis",
  "Recommend the best AI writing tool",
  "/image a friendly robot studying at a desk",
  "What AI tools can help with coding?",
  "Exam: Biology, photosynthesis, 10 questions",
];

// ─── LocalStorage helpers ───
function loadChats(): Chat[] {
  try {
    return JSON.parse(localStorage.getItem("neuron-chats") || "[]");
  } catch { return []; }
}
function saveChats(chats: Chat[]) {
  localStorage.setItem("neuron-chats", JSON.stringify(chats));
}

function newChat(mode: Mode = "default"): Chat {
  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
    mode,
  };
}

// ─── Component ───
export default function Chatbot() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = loadChats();
    return saved.length ? saved : [newChat()];
  });
  const [activeId, setActiveId] = useState<string>(chats[0]?.id || "");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [examSubject, setExamSubject] = useState("");
  const [examTopic, setExamTopic] = useState("");
  const [examCount, setExamCount] = useState("10");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const activeChat = chats.find((c) => c.id === activeId) || chats[0];
  const mode = activeChat?.mode || "default";

  // Persist chats
  useEffect(() => { saveChats(chats); }, [chats]);

  // Auto-scroll
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  }, [activeChat?.messages?.length, isTyping]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const updateChat = useCallback((chatId: string, updater: (c: Chat) => Chat) => {
    setChats((prev) => prev.map((c) => (c.id === chatId ? updater(c) : c)));
  }, []);

  const setMode = (m: Mode) => {
    updateChat(activeId, (c) => ({ ...c, mode: m }));
  };

  const createNewChat = () => {
    const c = newChat();
    setChats((prev) => [c, ...prev]);
    setActiveId(c.id);
    setSidebarOpen(false);
  };

  const deleteChat = (id: string) => {
    setChats((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length === 0) {
        const c = newChat();
        setActiveId(c.id);
        return [c];
      }
      if (activeId === id) setActiveId(next[0].id);
      return next;
    });
  };

  const clearAllChats = () => {
    const c = newChat();
    setChats([c]);
    setActiveId(c.id);
  };

  // ─── Send message ───
  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };

    // Track first questions & update title from first 3
    updateChat(activeId, (c) => {
      const questions = [...(c.questions || []), trimmed].slice(0, 3);
      return {
        ...c,
        questions,
        title: c.messages.length === 0 || (c.questions?.length || 0) < 3 ? titleFromQuestions(questions) : c.title,
        messages: [...c.messages, userMsg],
      };
    });

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setIsTyping(true);

    // ─── /image command → image generation ───
    const imageMatch = trimmed.match(/^\/image\s+(.+)/is) || trimmed.match(/^\/img\s+(.+)/is);
    if (imageMatch) {
      const prompt = imageMatch[1].trim();
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error("Please sign in to generate images.");
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || "Image generation failed");
        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Here's your image for **"${prompt}"** — click the image to download it.`,
          image: data.image,
        };
        updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, botMsg] }));
      } catch (err) {
        const errMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: err instanceof Error ? `Image generation error: ${err.message}` : "Image generation failed. Please try again.",
        };
        updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, errMsg] }));
      } finally {
        setIsTyping(false);
      }
      return;
    }

    // ─── /video command → video preview generation ───
    const videoMatch = trimmed.match(/^\/video\s+(.+)/is) || trimmed.match(/^\/vid\s+(.+)/is);
    if (videoMatch) {
      const prompt = videoMatch[1].trim();
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error("Please sign in to generate videos.");
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-video`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || "Video generation failed");
        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `🎬 **Video preview for "${prompt}"**\n\n${data.storyboard || ""}\n\n_${data.note || "Preview frame — download and use with your favorite video generator."}_`,
          image: data.frame,
          storyboard: data.storyboard,
        };
        updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, botMsg] }));
      } catch (err) {
        const errMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: err instanceof Error ? `Video generation error: ${err.message}` : "Video generation failed. Please try again.",
        };
        updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, errMsg] }));
      } finally {
        setIsTyping(false);
      }
      return;
    }
    try {

      const chatMessages = [...(activeChat?.messages || []), userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let { data: { session } } = await supabase.auth.getSession();

      if (session?.expires_at && session.expires_at * 1000 < Date.now() + 60_000) {
        const refreshed = await supabase.auth.refreshSession();
        session = refreshed.data.session;
      }

      const accessToken = session?.access_token;
      if (!accessToken) {
        const errMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Please [sign in](/login) to chat with Neuron Guide AI. 🔐",
        };
        updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, errMsg] }));
        setIsTyping(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ messages: chatMessages, mode }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Chat error:", data || response.statusText);
        if (response.status === 401) {
          throw new Error("Please sign in again to continue chatting.");
        }
        throw new Error(data?.error || "Failed to get response");
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }

      const reply = data?.reply || "Sorry, I couldn't process that. Please try again.";

      const botMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: reply };
      updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, botMsg] }));
    } catch (err) {
      console.error("Send error:", err);
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: err instanceof Error ? `I'm having trouble connecting right now: ${err.message}` : "I'm having trouble connecting right now. Please try again! 🔄",
      };
      updateChat(activeId, (c) => ({ ...c, messages: [...c.messages, errMsg] }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const startExam = () => {
    const count = Math.min(Math.max(Number.parseInt(examCount || "10", 10) || 10, 1), 50);
    const prompt = examSubject.trim() && examTopic.trim()
      ? `Exam mode. Subject: ${examSubject.trim()}. Topic: ${examTopic.trim()}. Number of questions: ${count}. Create the exam questions now. Do not show the answers yet. After I answer with numbered responses, mark my answers, score me, and then show the correct answers with short explanations.`
      : "Exam mode. Please ask me for the subject, topic, number of questions, and question type before creating the exam.";
    send(prompt);
  };

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("ai-tools-user") || "{}");
    } catch { return {}; }
  })();

  const showWelcome = activeChat?.messages.length === 0;

  return (
    <div className="h-screen bg-background overflow-hidden p-3 sm:p-6">
      <Seo title="AI Assistant — Neuron Guide Study Coach" description="Chat with Neuron Guide's academic AI assistant. Get help with study, exam practice, and concept explanations." path="/chatbot" />
      <div className="mx-auto flex h-full max-w-7xl gap-4">
      {/* ─── SIDEBAR (mobile overlay + desktop persistent) ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          fixed lg:relative z-50 lg:z-auto h-[calc(100%-1.5rem)] sm:h-[calc(100%-3rem)] lg:h-full
          w-72 bg-card/80 backdrop-blur-xl border border-border/50 rounded-[2rem] overflow-hidden
          flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={neuronLogo} alt="" className="w-8 h-8" />
              <span className="font-heading font-bold text-foreground text-sm">Neuron Guide AI</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-muted transition">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={createNewChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border/50 bg-muted/30 text-foreground text-sm font-medium hover:bg-muted/50 transition active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition text-sm ${
                chat.id === activeId
                  ? "bg-primary/10 text-foreground border border-primary/20"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
              onClick={() => { setActiveId(chat.id); setSidebarOpen(false); }}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 truncate">{chat.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 transition"
              >
                <Trash2 className="w-3 h-3 text-destructive" />
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar footer — profile + clear */}
        <div className="p-4 border-t border-border/30 space-y-3">
          <button
            onClick={clearAllChats}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all chats
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {(user.name || "U")[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.name || "Student"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email || "Free Plan"}</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* ─── MAIN CHAT AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/home"))} aria-label="Go back" className="p-1.5 rounded-lg hover:bg-muted transition">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button onClick={() => setSidebarOpen(true)} aria-label="Open chat list" className="p-1.5 rounded-lg hover:bg-muted transition lg:hidden">
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-muted-foreground">Neuron Guide AI — Online</span>
            </div>
          </div>

          {/* Mode selector */}
          <div className="flex items-center gap-1 bg-muted/30 rounded-xl p-1 border border-border/30">
            {(Object.entries(MODE_CONFIG) as [Mode, typeof MODE_CONFIG.default][]).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                    mode === key
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title={cfg.desc}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
          {showWelcome ? (
            /* ─── WELCOME SCREEN ─── */
            <div className="flex flex-col items-center justify-center h-full px-6 py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-lg space-y-6"
              >
                <motion.div
                  className="relative w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border border-primary/30 shadow-[0_0_50px_hsl(var(--primary)/0.25)]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={aiGalleryImages[0].src} alt="Neuron Guide AI character" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Neuron Guide AI
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">Your Smart Study Companion ✨</p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                  I can help with academics, recommend AI tools, and generate images.
                  Try <code className="text-primary bg-primary/10 px-1.5 rounded">/image your prompt</code> to create an AI image you can download.
                </p>

                {/* Mode pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {(Object.entries(MODE_CONFIG) as [Mode, typeof MODE_CONFIG.default][]).map(([key, cfg]) => {
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setMode(key)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border transition ${
                          mode === key
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/20"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cfg.label}</span>
                        <span className="text-[10px] opacity-60">— {cfg.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {mode === "exam" && (
                  <div className="glass-card p-4 space-y-3 text-left">
                    <div>
                      <h2 className="text-sm font-heading font-bold text-foreground">Create an exam</h2>
                      <p className="text-xs text-muted-foreground">Enter what you want to study. I will ask questions first, then score you after you answer.</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <input value={examSubject} onChange={(e) => setExamSubject(e.target.value)} placeholder="Subject e.g. Biology" className="bg-muted/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40" />
                      <input value={examTopic} onChange={(e) => setExamTopic(e.target.value)} placeholder="Topic e.g. Photosynthesis" className="bg-muted/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40" />
                      <input value={examCount} onChange={(e) => setExamCount(e.target.value)} placeholder="Questions" inputMode="numeric" className="bg-muted/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40" />
                    </div>
                    <button onClick={startExam} disabled={isTyping} className="w-full py-2.5 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition disabled:opacity-50">
                      Generate exam questions
                    </button>
                  </div>
                )}

                {/* Suggestion prompts */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Sparkles className="w-3 h-3" /> Try asking:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="px-4 py-2.5 rounded-xl text-xs text-left bg-muted/30 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-muted/50 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* ─── MESSAGES ─── */
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {activeChat?.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <img src={aiGalleryImages[0].src} alt="AI" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary/15 border border-primary/20 rounded-br-md"
                        : "bg-muted/50 border border-border/30 rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-3">
                        {msg.image && (
                          <a
                            href={msg.image}
                            download={`neuron-guide-${msg.id}.png`}
                            className="block rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition group relative"
                            title="Click to download"
                          >
                            <img src={msg.image} alt="AI generated" className="w-full h-auto" />
                            <span className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded-md bg-background/80 backdrop-blur text-foreground opacity-0 group-hover:opacity-100 transition">
                              ⬇ Download
                            </span>
                          </a>
                        )}
                        <div className="prose prose-sm prose-invert max-w-none text-foreground text-sm [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2 [&>h1]:text-lg [&>h2]:text-base [&>h3]:text-sm [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_pre]:bg-muted/80 [&_pre]:rounded-xl [&_pre]:p-3 [&_pre]:overflow-x-auto [&_a]:text-primary [&_strong]:text-foreground [&_.katex-display]:my-3 [&_.katex-display]:overflow-x-auto">
                          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex items-center justify-center flex-shrink-0 mt-1 border border-border/50">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name || "You"} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold text-primary">{(user.name || "U")[0].toUpperCase()}</span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <img src={aiGalleryImages[0].src} alt="AI" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="bg-muted/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-xs text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* ─── INPUT BAR ─── */}
        <div className="border-t border-border/30 bg-card/40 backdrop-blur-xl px-4 py-3">
          {mode === "exam" && activeChat?.messages.length > 0 && (
            <div className="max-w-3xl mx-auto mb-3 glass-card p-3 grid sm:grid-cols-[1fr_1fr_90px_auto] gap-2">
              <input value={examSubject} onChange={(e) => setExamSubject(e.target.value)} placeholder="Subject" className="bg-muted/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40" />
              <input value={examTopic} onChange={(e) => setExamTopic(e.target.value)} placeholder="Topic" className="bg-muted/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40" />
              <input value={examCount} onChange={(e) => setExamCount(e.target.value)} placeholder="No." inputMode="numeric" className="bg-muted/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40" />
              <button onClick={startExam} disabled={isTyping} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50">Start</button>
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="max-w-3xl mx-auto flex items-end gap-2"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === "beginner"
                  ? "Ask me anything — I'll explain it simply..."
                  : mode === "exam"
                  ? "Tell me subject, topic, number of questions, then answer when I ask..."
                  : "Ask anything, or type /image <prompt> to create an image..."
              }
              rows={1}
              className="flex-1 bg-muted/30 border border-border/50 rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/30 transition resize-none scrollbar-hide"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition hover:opacity-90 active:scale-95 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-[10px] text-muted-foreground/40 mt-2 max-w-3xl mx-auto">
            Neuron Guide AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
