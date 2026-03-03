import { Link } from "react-router-dom";
import { Heart, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { AITool } from "@/data/tools";

interface ToolCardProps {
  tool: AITool;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function ToolCard({ tool, index = 0, isFavorite, onToggleFavorite }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card-hover p-4 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{tool.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {tool.category}
            </span>
          </div>
        </div>
        {onToggleFavorite && (
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

      <p className="text-sm text-muted-foreground line-clamp-2">{tool.shortDescription}</p>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-foreground">{tool.rating}</span>
        </div>
        <Link
          to={`/tools/${tool.id}`}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View Tool <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
