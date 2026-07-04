import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, X, Phone, MessageCircle, Sparkles, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PHONE = "08120205800";
const WA = "2348120205800";
const contacts = [
  { icon: Phone, label: "Call Us", subtitle: PHONE, href: `tel:${PHONE}` },
  { icon: MessageCircle, label: "WhatsApp", subtitle: PHONE, href: `https://wa.me/${WA}` },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [medium, setMedium] = useState<"whatsapp" | "email" | "call">("whatsapp");
  const navigate = useNavigate();

  const contactText = encodeURIComponent(`Hi Neuron Guide, my name is ${name || "User"}. ${message || "I need support."}`);
  const sendHref =
    medium === "whatsapp"
      ? `https://wa.me/${WA}?text=${contactText}`
      : medium === "email"
      ? `mailto:adekanmbiadekanmbi5@gmail.com?subject=Neuron%20Guide%20Support&body=${contactText}`
      : `tel:${PHONE}`;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/55 backdrop-blur-sm z-[55]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 360 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 360 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[60] h-dvh w-[min(25rem,100vw)] rounded-l-[2rem] rounded-r-none border-y-0 border-r-0 bg-card/95 backdrop-blur-2xl p-5 shadow-2xl space-y-5 overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-heading font-bold text-foreground">Contact Neuron Guide</p>
                <p className="text-xs text-muted-foreground">Fill your name, message, and choose the medium to send instantly.</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-muted transition" aria-label="Close contact form">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                rows={4}
                className="w-full bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                  { value: "email", label: "Email", icon: Mail },
                  { value: "call", label: "Call", icon: Phone },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = medium === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setMedium(item.value as typeof medium)}
                      className={`px-2 py-2 rounded-xl border text-[11px] flex flex-col items-center gap-1 transition ${active ? "bg-primary/15 border-primary/30 text-primary" : "bg-muted/30 border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <a href={sendHref} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                <Send className="w-4 h-4" />
                {medium === "call" ? `Call ${PHONE}` : "Send message"}
              </a>
            </div>

            <button
              onClick={() => { setOpen(false); navigate("/chatbot"); }}
              className="w-full py-3.5 rounded-xl bg-primary/15 border border-primary/30 text-primary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/25 transition"
            >
              <Sparkles className="w-4 h-4" /> Open AI Assistant
            </button>

            <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/25 hover:bg-muted/50 transition"
                >
                  <Icon className="w-4 h-4 text-secondary" />
                  <div>
                    <p className="text-sm text-foreground font-medium">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground">{c.subtitle}</p>
                  </div>
                </a>
              );
            })}
            </div>
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
