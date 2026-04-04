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
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [codeError, setCodeError] = useState("");

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

  const handleActivate = () => {
    if (activationCode.trim() === "GARUBA001002KLOVE") {
      const user = JSON.parse(localStorage.getItem("ai-tools-user") || '{"name":"Guest","email":""}');
      user.tier = "pro";
      user.premiumExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
      localStorage.setItem("ai-tools-user", JSON.stringify(user));
      localStorage.setItem("ai-tools-credits", "9999");
      setShowUpgrade(false);
      setShowCredits(false);
      setShowCodeInput(false);
      setActivationCode("");
      setCodeError("");
      window.location.reload();
    } else {
      setCodeError("Invalid code. Pay ₦500 and get the code via WhatsApp.");
    }
  };

  const closeAll = () => {
    setShowUpgrade(false);
    setShowCredits(false);
    setShowCodeInput(false);
    setCodeError("");
    setActivationCode("");
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

              {!showCodeInput ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${showCredits ? "bg-destructive/15 border border-destructive/20" : "bg-neon-purple/15 border border-neon-purple/20"}`}>
                      {showCredits ? <AlertCircle className="w-6 h-6 text-destructive" /> : <Zap className="w-6 h-6 text-neon-purple" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground whitespace-nowrap">
                        {showCredits ? "0 Credits Left" : "Upgrade Required"}
                      </h3>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {showCredits ? "You've used all your free views" : `${tool.tier} plan needed`}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {showCredits
                      ? <>Pay <span className="font-semibold text-foreground">₦500 for 3 days</span> to unlock unlimited access to <span className="font-semibold text-foreground">500+ AI tools</span>.</>
                      : <><span className="font-semibold text-foreground">{tool.name}</span> requires an upgrade. Pay ₦500 for 3 days of unlimited access.</>
                    }
                  </p>
                  <div className="glass-card p-3 space-y-1 text-xs text-muted-foreground">
                    <p className="font-heading font-semibold text-foreground text-center text-sm whitespace-nowrap">Pay ₦500 via Bank Transfer</p>
                    <p className="whitespace-nowrap"><span className="text-foreground font-medium">Bank:</span> PalmPay</p>
                    <p className="whitespace-nowrap"><span className="text-foreground font-medium">Account:</span> 8033962964</p>
                    <p className="whitespace-nowrap"><span className="text-foreground font-medium">Name:</span> MARIAM AINA ADEKANMBI</p>
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <a href="https://wa.me/2348033962964?text=Hi%2C%20I%20want%20to%20pay%20%E2%82%A6500%20for%20NEURON%20VIEW%20Premium%20(3%20days).%20Please%20send%20me%20the%20activation%20code."
                      target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground text-center hover:opacity-90 transition active:scale-[0.97]">
                      💬 Pay via WhatsApp
                    </a>
                    <a href="mailto:adekanmbiadekanmbi5@gmail.com?subject=NEURON%20VIEW%20Premium%20Payment&body=Hi%2C%20I%20want%20to%20pay%20%E2%82%A6500%20for%20NEURON%20VIEW%20Premium%20(3%20days).%20Please%20send%20me%20the%20activation%20code."
                      className="w-full py-3 rounded-xl text-sm font-medium border border-border bg-muted/30 text-foreground text-center hover:bg-muted/50 transition active:scale-[0.97]">
                      ✉️ Pay via Email
                    </a>
                    <button onClick={() => setShowCodeInput(true)}
                      className="w-full py-3 rounded-xl text-sm font-semibold bg-green-500/15 text-green-400 border border-green-500/20 text-center hover:bg-green-500/25 transition active:scale-[0.97]">
                      🔑 I Have an Activation Code
                    </button>
                    <Link to="/pricing" onClick={closeAll}
                      className="w-full py-2 text-sm text-primary text-center hover:underline">
                      View Plans & Pricing
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/20 flex items-center justify-center mx-auto">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground">Enter Activation Code</h3>
                    <p className="text-xs text-muted-foreground">Enter the code you received after payment.</p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={activationCode}
                      onChange={(e) => { setActivationCode(e.target.value); setCodeError(""); }}
                      placeholder="Enter activation code"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {codeError && <p className="text-xs text-destructive">{codeError}</p>}
                    <button onClick={handleActivate}
                      className="w-full py-3 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground text-center hover:opacity-90 transition active:scale-[0.97]">
                      Activate Premium
                    </button>
                    <button onClick={() => { setShowCodeInput(false); setCodeError(""); }}
                      className="w-full py-2 text-sm text-muted-foreground text-center hover:text-foreground transition">
                      ← Back
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}