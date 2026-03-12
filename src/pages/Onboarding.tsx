import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BarChart3, MessageCircle, Play, ChevronRight, ChevronLeft } from "lucide-react";
import aiHero1 from "@/assets/ai-hero-1.jpg";
import aiHero2 from "@/assets/ai-hero-2.jpg";
import aiHero3 from "@/assets/ai-hero-3.jpg";
import aiHero4 from "@/assets/ai-hero-4.jpg";

const slides = [
  {
    icon: Sparkles,
    title: "Discover the Best AI Tools",
    description: "Explore a curated collection of the most powerful AI tools across every category.",
    gradient: "from-neon-cyan/20 to-neon-purple/20",
    image: aiHero1,
  },
  {
    icon: BarChart3,
    title: "Track, Compare & Save",
    description: "Compare features, pricing, and ratings. Save your favorites for quick access.",
    gradient: "from-neon-purple/20 to-neon-pink/20",
    image: aiHero2,
  },
  {
    icon: MessageCircle,
    title: "Ask Our AI Chatbot",
    description: "Get personalized recommendations and answers about any AI tool instantly.",
    gradient: "from-neon-pink/20 to-neon-cyan/20",
    image: aiHero3,
  },
  {
    icon: Play,
    title: "Watch Tutorials & Learn",
    description: "Step-by-step guides and video tutorials to master every tool faster.",
    gradient: "from-neon-cyan/20 to-neon-purple/20",
    image: aiHero4,
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigate("/login");
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background image with left-to-right fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Left-to-right gradient fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Top fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-[1]" />

      {/* Left Arrow */}
      {current > 0 && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-muted/60 border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Right Arrow */}
      {current < slides.length - 1 && (
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-muted/60 border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center max-w-md z-10"
        >
          <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slides[current].gradient} flex items-center justify-center mb-8 border border-border/50 backdrop-blur-md`}>
            {(() => {
              const Icon = slides[current].icon;
              return <Icon className="w-12 h-12 text-primary" />;
            })()}
          </div>

          <h1 className="text-3xl font-heading font-bold text-foreground mb-4 drop-shadow-lg">
            {slides[current].title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed drop-shadow-md">
            {slides[current].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mt-12 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center gap-3 z-10 w-full max-w-sm">
        <button
          onClick={next}
          className="w-full py-3.5 rounded-xl font-heading font-semibold text-primary-foreground gradient-primary flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {current < slides.length - 1 ? "Next" : "Get Started"}
          <ChevronRight className="w-4 h-4" />
        </button>
        {current < slides.length - 1 && (
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
