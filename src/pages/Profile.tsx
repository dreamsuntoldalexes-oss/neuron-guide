import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, LogOut, BookOpen, Info, Heart, CreditCard, Pencil, Check, X, Camera, Phone, Settings as SettingsIcon, Bell } from "lucide-react";
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
      return stored ? JSON.parse(stored) : { name: "Guest User", email: "guest@example.com", avatar: "" };
    } catch {
      return { name: "Guest User", email: "guest@example.com", avatar: "" };
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

  const handleCancel = () => {
    setDraft({ name: user.name, email: user.email });
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

  const menuItems = [
    { icon: SettingsIcon, label: "Settings", value: "", onClick: () => navigate("/settings") },
    { icon: Bell, label: "Notifications", value: "Manage", onClick: () => navigate("/settings") },
    { icon: Heart, label: "Saved Tools", value: `${favorites.length} tools`, onClick: () => navigate("/favorites") },
    { icon: CreditCard, label: "Upgrade & Pay", value: "", onClick: () => navigate("/pricing") },
    { icon: BookOpen, label: "Video Tutorials", value: "", onClick: () => navigate("/tutorials") },
    { icon: BookOpen, label: "How It Works", value: "", onClick: () => navigate("/how-it-works") },
    { icon: Info, label: "About Us", value: "", onClick: () => window.open("https://wa.me/2348033962964?text=Hi%20NEURON%20VIEW!%20Tell%20me%20more%20about%20you.", "_blank") },
    { icon: Phone, label: "Call Us", value: "08033962964", onClick: () => window.open("tel:08033962964") },
  ];

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-6 max-w-md mx-auto">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-heading font-bold text-foreground">
          Profile
        </motion.h1>

        {/* User Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          {editing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Name</label>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Email</label>
                <input
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-medium gradient-primary text-primary-foreground flex items-center justify-center gap-1.5 hover:opacity-90 transition active:scale-[0.97]">
                  <Check className="w-4 h-4" /> Save
                </button>
                <button onClick={handleCancel} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-muted border border-border text-foreground flex items-center justify-center gap-1.5 hover:bg-muted/80 transition active:scale-[0.97]">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Avatar with upload */}
              <div className="relative group">
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
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-semibold text-lg text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</p>
              </div>
              <button onClick={() => setEditing(true)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}
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
