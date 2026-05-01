import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Zap, BookOpen, Users, Star, MessageSquare, Search, Layers, RefreshCw, Bot, Compass, GitCompare, Rocket, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import neuronLogo from "@/assets/neuron-logo-new.png";
import heroImage from "@/assets/hero-person-money.png";
import aiBg from "@/assets/ai-fusion-bg.jpg";
import NeuralBackground from "@/components/NeuralBackground";
import WelcomeFooter from "@/components/WelcomeFooter";

const examplePrompts = [
  "Find the best AI writing tools",
  "Compare image generators",
  "What AI tools help with coding?",
  "Recommend tools for students",
];

const features = [
  { icon: Brain, title: "Smart Discovery", desc: "AI-powered tool recommendations tailored to your needs" },
  { icon: Zap, title: "Instant Compare", desc: "Side-by-side comparisons of 10,000+ AI tools" },
  { icon: BookOpen, title: "Study Companion", desc: "Get help with assignments, past questions & concepts" },
  { icon: Users, title: "Community Picks", desc: "See what tools students and professionals love" },
];

const stats = [
  { value: "10,000+", label: "AI Tools" },
  { value: "21+", label: "Categories" },
  { value: "50K+", label: "Students" },
  { value: "24/7", label: "AI Support" },
];

export default function Index() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim()) {
      navigate("/chatbot", { state: { initialPrompt: prompt } });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-background">
      {/* AI human + computer fusion background */}
      <img
        src={aiBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Neural network overlay */}
      <NeuralBackground opacity={0.25} nodeCount={45} />

      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--neon-purple)/0.05),transparent_70%)] pointer-events-none" />

      {/* Nav (glassmorphism) */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 bg-background/40 backdrop-blur-xl border-b border-border/30"
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={neuronLogo} alt="NEURON VIEW" className="w-10 h-10 drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
          <span className="font-heading font-bold text-lg text-foreground">NEURON VIEW</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-full btn-gradient text-primary-foreground hover:opacity-90 hover:scale-[1.03] transition shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
          >
            Sign Up
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-5 pt-6 pb-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center max-w-xl space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
            Discover the Best <span className="gradient-text">AI Tools</span> in One Place
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Explore, compare, and use powerful AI tools for productivity, creativity, and growth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient text-primary-foreground font-semibold text-sm hover:opacity-90 hover:scale-[1.03] transition shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
            >
              <Compass className="w-4 h-4" /> Explore Tools
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 text-foreground font-semibold text-sm hover:border-primary hover:bg-primary/10 transition"
            >
              <Rocket className="w-4 h-4 text-[#FACC15]" /> Get Started
            </Link>
          </div>
        </motion.div>

        {/* Prompt input card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 w-full max-w-lg"
        >
          <div className="glass-card p-4 shadow-lg">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Ask NEURON VIEW to find the perfect AI tool..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-none outline-none text-sm min-h-[60px] focus:ring-0"
              rows={2}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">Powered by AI</span>
              </div>
              <button
                onClick={handleSubmit}
                className="w-9 h-9 rounded-full btn-gradient text-primary-foreground flex items-center justify-center hover:opacity-80 transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Example prompts */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="px-3 py-1.5 text-xs rounded-full border border-border/50 bg-card/50 backdrop-blur text-muted-foreground hover:text-foreground hover:border-primary/30 transition"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 relative"
        >
          <div className="relative w-[300px] sm:w-[420px]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-3xl blur-2xl" />
            <img
              src={heroImage}
              alt="AI Assistant"
              className="w-full h-auto relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 w-full max-w-xl grid grid-cols-4 gap-2"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center py-3 px-2 rounded-xl glass-card">
              <p className="text-lg sm:text-xl font-heading font-bold text-primary">{s.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 w-full max-w-2xl"
        >
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground text-center mb-6">
            Why Students Love <span className="gradient-text">NEURON VIEW</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="glass-card-hover p-4 group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition">
                  <f.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-14 text-center space-y-4 pb-10"
        >
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Ready to explore?
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-full btn-gradient text-primary-foreground font-semibold text-sm hover:opacity-90 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/home"
              className="px-6 py-3 rounded-full border border-border/50 text-foreground font-medium text-sm hover:border-primary/30 transition"
            >
              Browse Tools
            </Link>
          </div>
        </motion.div>
      </div>

      <WelcomeFooter />
    </div>
  );
}
