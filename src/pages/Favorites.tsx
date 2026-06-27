import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { Heart, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const saved = tools.filter((t) => favorites.includes(t.id));

  return (
    <Layout>
      <Seo title="My Favorites — NEURON VIEW" description="Your saved AI tools, in one place." path="/favorites" />
      <div className="px-4 pt-6 pb-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-neon-pink" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Saved Tools</h1>
        </motion.div>

        {saved.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No saved tools yet.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Tap the heart icon on any tool to save it here.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{saved.length} tool{saved.length !== 1 ? "s" : ""} saved</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {saved.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
