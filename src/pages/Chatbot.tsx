import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, Sparkles, Plus, Trash2, MessageSquare,
  ChevronLeft, ChevronRight, BookOpen, Zap, GraduationCap,
  Menu, X
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import neuronLogo from "@/assets/neuron-logo-new.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ─── Types ───
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  mode: "default" | "beginner" | "exam";
}

type Mode = "default" | "beginner" | "exam";

const MODE_CONFIG: Record<Mode, { label: string; icon: typeof BookOpen; desc: string }> = {
  default: { label: "Standard", icon: BookOpen, desc: "Balanced explanations" },
  beginner: { label: "Beginner", icon: GraduationCap, desc: "Simple, easy to understand" },
  exam: { label: "Exam", icon: Zap, desc: "Short, direct answers" },
};

const SUGGESTIONS = [
  "Solve 2x + 5 = 15",
  "Explain photosynthesis",
  "What is demand in economics?",
  "Recommend the best AI writing tool",
  "Help me study for WAEC Biology",
  "What AI tools can help with coding?",
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim() };

    // Update title from first message
    updateChat(activeId, (c) => ({
      ...c,
      title: c.messages.length === 0 ? text.trim().slice(0, 40) : c.title,
      messages: [...c.messages, userMsg],
    }));

    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    setIsTyping(true);

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
          content: "Please [sign in](/login) to chat with NEURON VIEW AI. 🔐",
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
        content: "I'm having trouble connecting right now. Please try again! 🔄",
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

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("ai-tools-user") || "{}");
    } catch { return {}; }
  })();

  const showWelcome = activeChat?.messages.length === 0;

  return (
    <div className="h-screen bg-background flex overflow-hidden">
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
          fixed lg:relative z-50 lg:z-auto h-full
          w-72 bg-card/80 backdrop-blur-xl border-r border-border/50
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
              <span className="font-heading font-bold text-foreground text-sm">NEURON VIEW AI</span>
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted transition lg:hidden">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-muted transition lg:hidden">
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-muted-foreground">NEURON VIEW AI — Online</span>
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
                <motion.img
                  src={neuronLogo}
                  alt="NEURON VIEW"
                  className="w-20 h-20 mx-auto"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    NEURON VIEW AI
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">Your Smart Study Companion ✨</p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                  I can help with academics, recommend AI tools, explain concepts step-by-step, 
                  and guide you on using AI for productivity. Ask me anything!
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
                    <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
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
                      <div className="prose prose-sm prose-invert max-w-none text-foreground text-sm [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2 [&>h1]:text-lg [&>h2]:text-base [&>h3]:text-sm [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_pre]:bg-muted/80 [&_pre]:rounded-xl [&_pre]:p-3 [&_pre]:overflow-x-auto [&_a]:text-primary [&_strong]:text-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
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
                    <Bot className="w-4 h-4 text-primary" />
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
                  ? "Paste your exam question here..."
                  : "Ask about academics, AI tools, anything..."
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
            NEURON VIEW AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
