import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import neuronLogo from "@/assets/neuron-logo.png";

const messages = [
  "Welcome to NEURON VIEW...",
  "Getting everything ready ⚡",
  "Loading 500+ AI tools...",
  "Preparing your AI experience...",
  "Almost there... 🚀",
];

export default function Splash() {
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate("/welcome"), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--neon-cyan)/0.08),transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.img
          src={neuronLogo}
          alt="NEURON VIEW"
          className="w-36 h-36 sm:w-44 sm:h-44 mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <h1 className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-2">NEURON VIEW</h1>
        <p className="text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-10">AI Tools Directory</p>

        <div className="h-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-muted-foreground text-sm text-center"
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="w-48 h-1 rounded-full bg-muted overflow-hidden mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full gradient-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
