import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ExternalLink, Lock, Crown, X, Zap, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AITool } from "@/data/tools";
import { getUserTier, canAccessTool, getCredits, useCredit } from "@/data/tools";

interface ToolCardProps {
  tool: AITool;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const tierBadge: Record<string, { label: string; class: string }> = {
  free: { label: "Free", class: "bg-green-500/15 text-green-400 border-green-500/20" },
  pro: { label: "Pro", class: "bg-primary/15 text-primary border-primary/20" },
  enterprise: { label: "Enterprise", class: "bg-neon-purple/15 text-neon-purple border-neon-purple/20" },
};

export default function ToolCard({ tool, index = 0, isFavorite, onToggleFavorite }: ToolCardProps) {
  const userTier = getUserTier();
  const locked = !canAccessTool(tool.tier, userTier);
  const badge = tierBadge[tool.tier];
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowUpgrade(true);
  };

  const handleViewTool = (e: React.MouseEvent) => {
    const credits = getCredits();
    if (credits <= 0) {
      e.preventDefault();
      setShowCredits(true);
      return;
    }
    useCredit();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.03 }}
        className={`glass-card-hover p-4 flex flex-col gap-3 relative ${locked ? "opacity-70 cursor-pointer" : ""}`}
        onClick={locked ? handleLockedClick : undefined}
      >
        {locked && (
          <div className="absolute top-3 right-3 z-10">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-9 h-9 rounded-lg object-contain bg-muted/50 p-1"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=fff&size=64`; }}
            />
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm">{tool.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tool.category}
                </span>
                {tool.tier !== "free" && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.class}`}>
                    <Crown className="w-2.5 h-2.5" />
                    {badge.label}
                  </span>
                )}
              </div>
            </div>
          </div>
          {onToggleFavorite && !locked && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(tool.id); }}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isFavorite
                    ? "fill-neon-pink text-neon-pink drop-shadow-[0_0_6px_hsl(var(--neon-pink)/0.5)]"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{tool.shortDescription}</p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-foreground">{tool.rating}</span>
          </div>
          {locked ? (
            <button
              onClick={handleLockedClick}
              className="flex items-center gap-1 text-xs font-medium text-neon-purple hover:underline"
            >
              Upgrade <Crown className="w-3 h-3" />
            </button>
          ) : (
            <Link
              to={`/tools/${tool.id}`}
              onClick={handleViewTool}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View Tool <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </motion.div>

      {/* Upgrade Popup */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowUpgrade(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card p-6 max-w-sm w-full space-y-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowUpgrade(false)} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-muted transition">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground">Upgrade Required</h3>
                  <p className="text-xs text-muted-foreground capitalize">{tool.tier} plan needed</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{tool.name}</span> is a {tool.tier}-tier tool. Upgrade your plan to unlock it and many more premium tools.
              </p>
              <div className="glass-card p-3 space-y-1 text-xs text-muted-foreground">
                <p className="font-heading font-semibold text-foreground text-center text-sm">Pay via Bank Transfer</p>
                <p><span className="text-foreground font-medium">Bank:</span> PalmPay</p>
                <p><span className="text-foreground font-medium">Account:</span> 8033962964</p>
                <p><span className="text-foreground font-medium">Name:</span> MARIAM AINA ADEKANMBI</p>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <a href="https://wa.me/2348033962964?text=Hi%2C%20I%20just%20paid%20for%20NEURON%20VIEW%20Premium.%20Here%20is%20my%20receipt.%20Please%20activate%20my%20account."
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("ai-tools-user") || '{"name":"Guest","email":""}');
                    user.tier = "pro";
                    user.premiumExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
                    localStorage.setItem("ai-tools-user", JSON.stringify(user));
                    localStorage.setItem("ai-tools-credits", "9999");
                  }}
                  className="w-full py-3 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground text-center hover:opacity-90 transition active:scale-[0.97]">
                  💬 Send Receipt via WhatsApp
                </a>
                <a href="mailto:adekanmbiadekanmbi5@gmail.com?subject=NEURON%20VIEW%20Premium%20Payment%20Receipt&body=Hi%2C%20I%20just%20made%20payment%20for%20NEURON%20VIEW%20Premium.%20Please%20activate%20my%20account."
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("ai-tools-user") || '{"name":"Guest","email":""}');
                    user.tier = "pro";
                    user.premiumExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
                    localStorage.setItem("ai-tools-user", JSON.stringify(user));
                    localStorage.setItem("ai-tools-credits", "9999");
                  }}
                  className="w-full py-3 rounded-xl text-sm font-medium border border-border bg-muted/30 text-foreground text-center hover:bg-muted/50 transition active:scale-[0.97]">
                  ✉️ Send Receipt via Email
                </a>
                <Link to="/pricing" onClick={() => setShowUpgrade(false)}
                  className="w-full py-2 text-sm text-primary text-center hover:underline">
                  View Plans & Pricing
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 0 Credits Popup */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCredits(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card p-6 max-w-sm w-full space-y-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowCredits(false)} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-muted transition">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-destructive/15 border border-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground">0 Credits Left</h3>
                  <p className="text-xs text-muted-foreground">You've used all your free views</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                You've reached your <span className="font-semibold text-foreground">free limit of 3 tool views</span>. Upgrade now to enjoy unlimited access to <span className="font-semibold text-foreground">500+ AI tools</span> and premium features.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a href="https://wa.me/2348033962964?text=Hi%2C%20I%20want%20to%20upgrade%20my%20plan%20to%20get%20unlimited%20AI%20tool%20access"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground text-center hover:opacity-90 transition active:scale-[0.97]">
                  💬 Upgrade via WhatsApp
                </a>
                <Link to="/pricing" onClick={() => setShowCredits(false)}
                  className="w-full py-3 rounded-xl text-sm font-medium border border-border bg-muted/30 text-foreground text-center hover:bg-muted/50 transition active:scale-[0.97]">
                  View Plans & Pricing
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
