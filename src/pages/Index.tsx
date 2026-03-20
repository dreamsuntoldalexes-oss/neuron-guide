import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Zap, Brain, MessageCircle, Heart, ArrowRight, Crown } from "lucide-react";
import landingHero from "@/assets/landing-hero.jpg";

const features = [
  { icon: Brain, title: "400+ AI Tools", desc: "Curated collection across 20+ categories" },
  { icon: Zap, title: "Compare & Rate", desc: "Side-by-side ratings, pricing & features" },
  { icon: MessageCircle, title: "AI Chatbot", desc: "Get personalized recommendations instantly" },
  { icon: Heart, title: "Save Favorites", desc: "Bookmark tools you love for quick access" },
  { icon: Crown, title: "Pro & Enterprise", desc: "Unlock premium tools and unlimited saves" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero image with left-to-right fade */}
      <div className="absolute inset-0 z-0">
        <img src={landingHero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
      </div>

      {/* Top bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 py-5"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-lg text-foreground">Uthzee AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition active:scale-[0.97]"
          >
            Sign Up
          </Link>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 px-6 pt-8 pb-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-5"
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground leading-[1.1]">
            Your Ultimate<br />AI Tools Hub
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Discover, compare, and master 400+ AI tools — all in one beautifully curated directory.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              to="/onboarding"
              className="px-6 py-3.5 rounded-xl font-heading font-semibold gradient-primary text-primary-foreground flex items-center gap-2 hover:opacity-90 transition active:scale-[0.97]"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl font-medium border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition active:scale-[0.97]"
            >
              Log In
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features grid */}
      <div className="relative z-10 px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-medium text-primary uppercase tracking-wider mb-6"
        >
          Everything you need
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="glass-card p-4 space-y-2 hover:border-primary/20 transition"
              >
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-heading font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
