import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ExternalLink, Lock, Crown, X, CreditCard, AlertCircle } from "lucide-react";
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
  free: { label: "Free", class: "bg-secondary/15 text-secondary border-secondary/20" },
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

  const closeAll = () => {
    setShowUpgrade(false);
    setShowCredits(false);
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
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                  {tool.category}
                </span>
                {tool.tier !== "free" && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 whitespace-nowrap ${badge.class}`}>
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

      {/* Upgrade / Credits Popup */}
      <AnimatePresence>
        {(showUpgrade || showCredits) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
            onClick={closeAll}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card p-6 max-w-sm w-full space-y-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeAll} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-muted transition">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${showCredits ? "bg-destructive/15 border border-destructive/20" : "bg-primary/15 border border-primary/20"}`}>
                  {showCredits ? <AlertCircle className="w-6 h-6 text-destructive" /> : <CreditCard className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground whitespace-nowrap">
                    {showCredits ? "Views Limit Reached" : "Pro Access Required"}
                  </h3>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    NEURON VIEW Pro is $5/month
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {showCredits
                  ? <>Subscribe for <span className="font-semibold text-foreground">$5/month</span> to unlock more AI tool views, analytics, saved tools, and AI assistant support.</>
                  : <><span className="font-semibold text-foreground">{tool.name}</span> is available with the $5/month Pro plan.</>
                }
              </p>
              <div className="glass-card p-3 space-y-1 text-xs text-muted-foreground">
                <p className="font-heading font-semibold text-foreground text-sm whitespace-nowrap">Simple Pro Plan</p>
                <p><span className="text-foreground font-medium">Price:</span> $5/month</p>
                <p><span className="text-foreground font-medium">Includes:</span> AI tools, analytics, favorites, and assistant access</p>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <Link to="/pricing" onClick={closeAll}
                  className="w-full py-3 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground text-center hover:opacity-90 transition active:scale-[0.97]">
                  Subscribe for $5/month
                </Link>
                <a href="https://wa.me/2348033962964?text=Hi%2C%20I%20want%20to%20subscribe%20to%20NEURON%20VIEW%20Pro%20for%20%245%2Fmonth."
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-sm font-medium border border-border bg-muted/30 text-foreground text-center hover:bg-muted/50 transition active:scale-[0.97]">
                  Ask support on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}