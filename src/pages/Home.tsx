import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, Crown, BarChart3, Users, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { categories, getUserTier, tools } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import neuronLogo from "@/assets/neuron-logo-new.png";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const { isFavorite, toggleFavorite } = useFavorites();
  const trending = [...tools].sort((a, b) => b.views - a.views).slice(0, 6);
  const recent = [...tools].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 6);
  const featured = (activeCat === "All" ? trending : tools.filter(t => t.category === activeCat)).slice(0, 8);
  const searchResults = query.length > 1 ? tools.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.shortDescription.toLowerCase().includes(query.toLowerCase())).slice(0, 10) : [];
  const tier = getUserTier();

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-8">
        {/* Header bar */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={neuronLogo} alt="NEURON VIEW" className="w-9 h-9 rounded-xl ring-1 ring-primary/30" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">NEURON VIEW</p>
              <p className="text-[10px] text-primary">Available for you</p>
            </div>
          </div>
          <Link to="/pricing" className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full gradient-primary text-primary-foreground font-medium shadow-lg shadow-primary/20">
            <Crown className="w-3 h-3" />
            <span className="capitalize whitespace-nowrap">{tier === "free" ? "Upgrade" : tier}</span>
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-center space-y-5 pt-2">
          <span className="inline-block text-[11px] tracking-wider uppercase px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {tools.length}+ AI Tools Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
            Discover the <span className="gradient-text">Best AI Tools</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Find the perfect AI tools for your workflow. Browse, compare, and discover cutting-edge AI solutions trusted by students and professionals worldwide.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full bg-muted/40 border border-border rounded-full py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition"
            />
          </div>
        </motion.div>

        {query.length > 1 ? (
          <div className="space-y-3">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Results for "{query}" ({searchResults.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {searchResults.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
              ))}
              {searchResults.length === 0 && (
                <p className="text-muted-foreground text-sm py-8 text-center col-span-full">No tools found.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Stats teaser → Analytics */}
            <Link to="/analytics" className="block">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-hover p-4 grid grid-cols-3 gap-2 text-center">
                <div className="space-y-0.5">
                  <p className="text-xl font-heading font-bold text-primary">{tools.length}+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">AI Tools</p>
                </div>
                <div className="space-y-0.5 border-x border-border/40">
                  <p className="text-xl font-heading font-bold text-accent">12k+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Active Users</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xl font-heading font-bold text-secondary">98%</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Satisfaction</p>
                </div>
                <p className="col-span-3 text-[10px] text-primary flex items-center justify-center gap-1 pt-1">
                  <BarChart3 className="w-3 h-3" /> View live analytics dashboard →
                </p>
              </motion.div>
            </Link>

            {/* Category chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {["All", ...categories.filter(c => c !== "All")].slice(0, 14).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition whitespace-nowrap border ${
                    activeCat === cat
                      ? "gradient-primary text-primary-foreground border-transparent shadow-md shadow-primary/20"
                      : "bg-muted/40 border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured */}
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Featured AI Tools
                  </h2>
                  <p className="text-xs text-muted-foreground">Discover the most innovative AI platforms trusted by modern teams.</p>
                </div>
                <Link to="/tools" className="text-xs text-primary hover:underline whitespace-nowrap">View All</Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {featured.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            </div>

            {/* Recent */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
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

