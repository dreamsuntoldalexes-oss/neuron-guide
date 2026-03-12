import { Link } from "react-router-dom";
import { Heart, Star, ExternalLink, Lock, Crown } from "lucide-react";
import { motion } from "framer-motion";
import type { AITool } from "@/data/tools";
import { getUserTier, canAccessTool } from "@/data/tools";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={`glass-card-hover p-4 flex flex-col gap-3 relative ${locked ? "opacity-70" : ""}`}
    >
      {locked && (
        <div className="absolute top-3 right-3 z-10">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
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
            onClick={(e) => { e.preventDefault(); onToggleFavorite(tool.id); }}
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
          <Link
            to="/pricing"
            className="flex items-center gap-1 text-xs font-medium text-neon-purple hover:underline"
          >
            Upgrade <Crown className="w-3 h-3" />
          </Link>
        ) : (
          <Link
            to={`/tools/${tool.id}`}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View Tool <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
