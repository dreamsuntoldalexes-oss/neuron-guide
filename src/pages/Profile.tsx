import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User, Mail, LogOut, BookOpen, Info, Heart, CreditCard, Pencil, Check, X,
  Camera, Phone, Settings as SettingsIcon, Bell, BarChart3, Bookmark,
  Share2, Globe, MessageCircle, Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";

export default function Profile() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUser = () => {
    try {
      const stored = localStorage.getItem("ai-tools-user");
      return stored ? JSON.parse(stored) : { name: "User", email: "userr@gmail.com", avatar: "", tier: "free" };
    } catch {
      return { name: "User", email: "userr@gmail.com", avatar: "", tier: "free" };
    }
  };

  const [user, setUser] = useState(getUser);
  const [draft, setDraft] = useState({ name: user.name, email: user.email });

  const handleSave = () => {
    const updated = { ...user, name: draft.name, email: draft.email };
    localStorage.setItem("ai-tools-user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("ai-tools-user");
    navigate("/login");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const avatar = ev.target?.result as string;
      const updated = { ...user, avatar };
      localStorage.setItem("ai-tools-user", JSON.stringify(updated));
      setUser(updated);
    };
    reader.readAsDataURL(file);
  };

  const initial = (user.name || "U")[0].toUpperCase();

  const menuItems = [
    { icon: BarChart3, label: "Site Analytics", value: "Live", onClick: () => navigate("/analytics") },
    { icon: Heart, label: "Saved Tools", value: `${favorites.length} tools`, onClick: () => navigate("/favorites") },
    { icon: CreditCard, label: "Upgrade ($5/month)", value: "", onClick: () => navigate("/pricing") },
    { icon: Sparkles, label: "AI Assistant", value: "", onClick: () => navigate("/chatbot") },
    { icon: BookOpen, label: "Video Tutorials", value: "", onClick: () => navigate("/tutorials") },
    { icon: BookOpen, label: "How It Works", value: "", onClick: () => navigate("/how-it-works") },
    { icon: SettingsIcon, label: "Settings", value: "", onClick: () => navigate("/settings") },
    { icon: Bell, label: "Notifications", value: "Manage", onClick: () => navigate("/settings") },
    { icon: Info, label: "About Us", value: "", onClick: () => window.open("https://wa.me/2348033962964?text=Hi%20NEURON%20VIEW!%20Tell%20me%20more%20about%20you.", "_blank") },
    { icon: Phone, label: "Call Us", value: "08033962964", onClick: () => window.open("tel:08033962964") },
  ];

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-6 max-w-md mx-auto">
        {/* S25-style header card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 space-y-5"
        >
          {/* Top row: avatar + identity + Get in touch */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4 min-w-0">
              {/* Big avatar with overlay upload */}
              <div className="relative group flex-shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/40"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center ring-2 ring-primary/40 text-2xl font-heading font-bold text-primary-foreground">
                    {initial}
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  title="Change photo"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md ring-2 ring-background"
                  title="Change photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="min-w-0">
                <h2 className="font-heading font-bold text-lg text-foreground truncate">{user.name}</h2>
                <p className="text-xs text-primary flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Available for AI tools
                </p>
                <button
                  onClick={() => setEditing((s) => !s)}
                  className="text-[11px] text-muted-foreground hover:text-primary transition mt-0.5 inline-flex items-center gap-1"
                >
                  <Pencil className="w-3 h-3" /> Edit profile
                </button>
              </div>
            </div>

            <button
              onClick={() => window.open("https://wa.me/2348033962964?text=Hi%20NEURON%20VIEW!", "_blank")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-xs font-semibold shadow-md hover:opacity-90 transition whitespace-nowrap"
            >
              Get in touch
            </button>
          </div>

          {/* Links row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <a href="https://neuron-view.lovable.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition">
              <Globe className="w-3.5 h-3.5" /> neuron-view.lovable.app
            </a>
            <a href={`mailto:${user.email}`} className="flex items-center gap-1.5 hover:text-foreground transition truncate max-w-full">
              <Mail className="w-3.5 h-3.5" /> {user.email}
            </a>
          </div>

          {/* Action chips row (Saved / Bookmark / Analytics / Share / Get in touch on mobile) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => navigate("/favorites")} className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center hover:border-primary/30 transition" title="Saved">
              <Heart className="w-4 h-4 text-primary" />
            </button>
            <button onClick={() => navigate("/favorites")} className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center hover:border-primary/30 transition" title="Bookmarks">
              <Bookmark className="w-4 h-4 text-foreground" />
            </button>
            <button onClick={() => navigate("/analytics")} className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center hover:border-primary/30 transition" title="Analytics">
              <BarChart3 className="w-4 h-4 text-accent" />
            </button>
            <button
              onClick={() => navigator.share?.({ title: "NEURON VIEW", url: window.location.origin }).catch(() => {})}
              className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center hover:border-primary/30 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => window.open("https://wa.me/2348033962964?text=Hi%20NEURON%20VIEW!", "_blank")}
              className="sm:hidden flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full gradient-primary text-primary-foreground text-xs font-semibold shadow-md hover:opacity-90 transition whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Get in touch
            </button>
          </div>

          {editing && (
            <div className="space-y-3 pt-2 border-t border-border/40">
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Name</label>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Email</label>
                <input
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-medium gradient-primary text-primary-foreground flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" /> Save
                </button>
                <button onClick={() => { setDraft({ name: user.name, email: user.email }); setEditing(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-muted border border-border text-foreground flex items-center justify-center gap-1.5">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Menu list */}
        <div className="space-y-2">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={item.onClick}
                className="w-full glass-card p-4 flex items-center justify-between hover:border-primary/20 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
                {item.value && <span className="text-xs text-muted-foreground whitespace-nowrap">{item.value}</span>}
              </motion.button>
            );
          })}
        </div>

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
