import { Link, useLocation, useNavigate } from "react-router-dom";
// NEURON VIEW - Layout component
import { Home, Search, Heart, MessageCircle, User, ArrowLeft } from "lucide-react";
import ContactWidget from "./ContactWidget";

const navItems = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/tools", icon: Search, label: "Tools" },
  { to: "/favorites", icon: Heart, label: "Saved" },
  { to: "/chatbot", icon: MessageCircle, label: "Chat" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">{children}</main>
      <ContactWidget />

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-none border-t border-border/50 backdrop-blur-2xl">
        <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "drop-shadow-[0_0_8px_hsl(var(--neon-cyan)/0.6)]" : ""}`} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
