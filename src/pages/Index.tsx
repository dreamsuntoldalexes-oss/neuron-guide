import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import neuronLogo from "@/assets/neuron-logo-new.png";

const examplePrompts = [
  "Find the best AI writing tools",
  "Compare image generators",
  "What AI tools help with coding?",
  "Recommend tools for students",
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
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,30%,96%)] via-[hsl(200,60%,92%)] to-[hsl(330,70%,88%)] dark:from-background dark:via-background dark:to-background" />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[hsl(340,80%,75%)] via-[hsl(280,50%,80%)] to-transparent opacity-60 dark:opacity-20" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-2">
          <img src={neuronLogo} alt="NEURON VIEW" className="w-10 h-10" />
          <span className="font-heading font-bold text-lg text-foreground">NEURON VIEW</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-full"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-full bg-foreground text-background hover:opacity-90 transition"
          >
            Get started
          </Link>
        </div>
      </motion.nav>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center max-w-xl space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
            Discover AI Tools,{" "}
            <span className="bg-gradient-to-r from-[hsl(200,80%,55%)] to-[hsl(330,70%,60%)] bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Browse, compare, and master 10,000+ AI tools — all in one place
          </p>
        </motion.div>

        {/* Prompt input card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 w-full max-w-lg"
        >
          <div className="bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-lg">
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
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-none outline-none text-sm min-h-[60px]"
              rows={2}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Powered by AI</span>
              </div>
              <button
                onClick={handleSubmit}
                className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition"
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
                onClick={() => {
                  setPrompt(p);
                }}
                className="px-3 py-1.5 text-xs rounded-full border border-border/50 bg-card/50 backdrop-blur text-muted-foreground hover:text-foreground hover:border-foreground/20 transition"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
