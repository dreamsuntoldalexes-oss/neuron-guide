import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import neuronLogo from "@/assets/neuron-logo-new.png";
import aiBg from "@/assets/ai-fusion-bg.jpg";
import { supabase } from "@/integrations/supabase/client";
import NeuralBackground from "@/components/NeuralBackground";

const messages = [
  "Welcome to Neuron Guide ✨",
  "Igniting neural pathways…",
  "Awakening hundreds of AI minds 🧠",
  "Fusing human creativity with machine intelligence",
  "Where ideas meet infinite possibility",
  "Calibrating your AI universe…",
  "Empowering the next generation of creators",
  "Every great breakthrough starts with curiosity",
  "Unlocking tools that move the world forward 🚀",
  "Designed for dreamers. Built for doers.",
  "Your AI control center is almost ready",
  "Think bigger. Build faster. Create boldly.",
  "Loading inspiration… please hold the vision",
  "The future is not coming — it's loading ⚡",
  "Ready to change the world? Let's begin.",
];

const TOTAL_DURATION = 5000; // 5 seconds

export default function Splash() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [destination, setDestination] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Hydrate cache from DB profile — DO NOT overwrite user-edited name/avatar/email
        const { data: profile } = await supabase
          .from("profiles")
          .select("tier, credits, premium_expiry")
          .eq("id", session.user.id)
          .maybeSingle();
        const existing = (() => {
          try { return JSON.parse(localStorage.getItem("ai-tools-user") || "{}"); } catch { return {}; }
        })();
        const meta = (session.user.user_metadata || {}) as Record<string, string>;
        localStorage.setItem("ai-tools-user", JSON.stringify({
          name: existing.name || meta.full_name || meta.name || session.user.email?.split("@")[0] || "User",
          email: existing.email || session.user.email || "",
          avatar: existing.avatar || meta.avatar_url || "",
          tier: profile?.tier || "free",
          premiumExpiry: profile?.premium_expiry || null,
        }));
        localStorage.setItem("ai-tools-credits", String(profile?.credits ?? 3));
        setDestination("/home");
      } else {
        setDestination("/welcome");
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const perMessage = TOTAL_DURATION / messages.length;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, perMessage);

    const timeout = setTimeout(() => {
      navigate(destination || "/welcome");
    }, TOTAL_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, destination]);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Layered transparent backgrounds */}
      <img
        src={aiBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80" />
      <NeuralBackground opacity={0.5} nodeCount={70} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--neon-purple)/0.08),transparent_60%)]" />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full max-w-sm"
      >
        {/* Glassy logo container */}
        <motion.div
          className="relative mb-6 p-5 rounded-full backdrop-blur-xl bg-card/20 border border-border/30"
          style={{
            boxShadow:
              "0 0 60px -10px hsl(var(--primary) / 0.35), inset 0 1px 0 0 hsl(var(--foreground) / 0.06)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src={neuronLogo}
            alt="Neuron Guide"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-2 ring-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.2),transparent_70%)] pointer-events-none" />
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-heading font-bold gradient-text mb-2 text-center">
          Neuron Guide
        </h1>
        <p className="text-[11px] sm:text-sm text-muted-foreground tracking-[0.25em] uppercase mb-8 text-center">
          AI Tools Directory
        </p>

        {/* Rotating inspirational message */}
        <div className="h-14 flex items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="text-foreground/85 text-sm sm:text-base text-center font-medium"
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Glassy progress bar */}
        <div className="w-full max-w-[260px] h-1.5 rounded-full bg-muted/40 backdrop-blur-md border border-border/30 overflow-hidden mt-4">
          <motion.div
            className="h-full gradient-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
          />
        </div>

        <p className="mt-4 text-[10px] sm:text-xs text-muted-foreground/70 tracking-widest uppercase">
          Preparing your AI experience
        </p>
      </motion.div>
    </div>
  );
}
