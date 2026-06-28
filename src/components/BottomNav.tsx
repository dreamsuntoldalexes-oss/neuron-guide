import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, Heart, MessageCircle, User } from "lucide-react";

const navItems = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/tools", icon: Search, label: "Tools" },
  { to: "/favorites", icon: Heart, label: "Saved" },
  { to: "/chatbot", icon: MessageCircle, label: "Chat" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 220 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-none border-t border-border/50 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" : ""}`} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
