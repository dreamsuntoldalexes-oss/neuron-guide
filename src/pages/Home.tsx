import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, Sparkles, Crown } from "lucide-react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { categories, getUserTier, tools } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import neuronLogo from "@/assets/neuron-logo-new.png";

export default function Home() {
  const [query, setQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const trending = [...tools].sort((a, b) => b.views - a.views).slice(0, 6);
  const recent = [...tools].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 6);
  const searchResults = query.length > 1 ? tools.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.shortDescription.toLowerCase().includes(query.toLowerCase())).slice(0, 10) : [];
  const tier = getUserTier();

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={neuronLogo} alt="NEURON VIEW" className="w-8 h-8 rounded-lg" />
              <span className="text-sm text-primary font-medium">NEURON VIEW</span>
            </div>
            <Link to="/pricing" className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Crown className="w-3 h-3" />
              <span className="capitalize font-medium">{tier}</span>
            </Link>
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">NEURON VIEW — {tools.length}+ AI Tools</h1>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools..."
            className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition neon-border"
          />
        </motion.div>

        {/* Search Results */}
        {query.length > 1 ? (
          <div className="space-y-3">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Results for "{query}" ({searchResults.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {searchResults.slice(0, 20).map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
              ))}
              {searchResults.length === 0 && (
                <p className="text-muted-foreground text-sm py-8 text-center col-span-full">No tools found. Try a different search.</p>
              )}
              {searchResults.length > 20 && (
                <p className="text-xs text-muted-foreground text-center col-span-full">Showing 20 of {searchResults.length} results. Use filters for more.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Categories */}
            <div className="space-y-3">
              <h2 className="text-lg font-heading font-semibold text-foreground">Categories</h2>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {categories.filter(c => c !== "All").map((cat) => (
                  <Link
                    key={cat}
                    to={`/tools?category=${cat}`}
                    className="flex-shrink-0 px-4 py-2 rounded-xl bg-muted/50 border border-border text-xs text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all whitespace-nowrap"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-heading font-semibold text-foreground">Trending This Week</h2>
                </div>
                <Link to="/tools" className="text-xs text-primary hover:underline">View all</Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {trending.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            </div>

            {/* Recent */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neon-purple" />
                  <h2 className="text-lg font-heading font-semibold text-foreground">Recently Added</h2>
                </div>
                <Link to="/tools?sort=newest" className="text-xs text-primary hover:underline">View all</Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recent.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
