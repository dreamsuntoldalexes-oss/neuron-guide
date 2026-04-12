import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, X, Phone, MessageCircle } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    label: "Call Us",
    subtitle: "09029837829",
    href: "tel:09029837829",
    color: "text-secondary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    subtitle: "08033962964",
    href: "https://wa.me/2348033962964",
    color: "text-secondary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp 2",
    subtitle: "09029837829",
    href: "https://wa.me/2349029837829",
    color: "text-secondary",
  },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition group"
                >
                  <Icon className={`w-4 h-4 ${c.color}`} />
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
  );
}
