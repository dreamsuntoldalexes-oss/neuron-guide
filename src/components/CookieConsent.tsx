import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "neuron-view-cookie-choice";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(localStorage.getItem(COOKIE_KEY) !== "accepted");
    }, 700);
    return () => window.clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed left-4 right-4 bottom-24 z-[70] mx-auto max-w-xl glass-card p-4 shadow-2xl"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-3 p-1 rounded-full hover:bg-muted transition"
            aria-label="Close cookie notice"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-start gap-3 pr-7">
            <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-sm font-heading font-bold text-foreground">Cookies on NEURON VIEW</h2>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  We use cookies to remember your choices, improve the AI tools directory experience, and keep the app working smoothly.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={accept} className="px-4 py-2 rounded-full gradient-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition">
                  Accept cookies
                </button>
                <button onClick={() => setVisible(false)} className="px-4 py-2 rounded-full bg-muted/50 border border-border text-foreground text-xs font-medium hover:bg-muted transition">
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}