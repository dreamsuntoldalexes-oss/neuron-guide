import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, X, Phone, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contacts = [
  {
    icon: Phone,
    label: "Call Us",
    subtitle: "08033962964",
    href: "tel:08033962964",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    subtitle: "08033962964",
    href: "https://wa.me/2348033962964",
  },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-card p-3 mb-2 w-56 space-y-1"
          >
            <p className="text-xs text-muted-foreground font-medium px-2 pb-1">Contact Support</p>
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition"
                >
                  <Icon className="w-4 h-4 text-secondary" />
                  <div>
                    <p className="text-sm text-foreground font-medium">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground">{c.subtitle}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <AnimatePresence>
          {open && (
            <motion.button
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              onClick={() => { setOpen(false); navigate("/chatbot"); }}
              className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shadow-lg hover:bg-primary/25 transition active:scale-95"
              title="Open AI Assistant"
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg hover:opacity-90 transition active:scale-95"
        >
          {open ? (
            <X className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Headphones className="w-5 h-5 text-primary-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
