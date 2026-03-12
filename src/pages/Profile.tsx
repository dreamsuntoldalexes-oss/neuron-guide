import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, LogOut, BookOpen, Info, Heart, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import { useFavorites } from "@/hooks/useFavorites";

export default function Profile() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const user = (() => {
    try {
      const stored = localStorage.getItem("ai-tools-user");
      return stored ? JSON.parse(stored) : { name: "Guest User", email: "guest@example.com" };
    } catch {
      return { name: "Guest User", email: "guest@example.com" };
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("ai-tools-user");
    navigate("/login");
  };

  const menuItems = [
    { icon: Heart, label: "Saved Tools", value: `${favorites.length} tools`, onClick: () => navigate("/favorites") },
    { icon: CreditCard, label: "Upgrade & Pay", value: "", onClick: () => navigate("/pricing") },
    { icon: BookOpen, label: "How It Works", value: "", onClick: () => navigate("/how-it-works") },
    { icon: Info, label: "About", value: "v1.0.0", onClick: undefined },
  ];

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-6 max-w-md mx-auto">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-heading font-bold text-foreground">
          Profile
        </motion.h1>

        {/* User Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</p>
          </div>
        </motion.div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={item.onClick}
                className="w-full glass-card p-4 flex items-center justify-between hover:border-primary/20 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
                {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="w-full glass-card p-4 flex items-center gap-3 text-destructive hover:border-destructive/30 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </motion.button>
      </div>
    </Layout>
  );
}
