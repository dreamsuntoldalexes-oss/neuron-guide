import { useState, useMemo, useEffect, useRef } from "react";
import Seo from "@/components/Seo";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Crown } from "lucide-react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { tools, categories, type Category, getUserTier, getCategoryCounts } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import neuronLogo from "@/assets/neuron-logo-new.png";

type SortBy = "rating" | "newest" | "popular" | "name";
type TierFilter = "all" | "free" | "pro" | "enterprise";

export default function Tools() {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category) || "All";
  const initialSort = (searchParams.get("sort") as SortBy) || "popular";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>(initialCategory);
  const [sortBy, setSortBy] = useState<SortBy>(initialSort);
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  // Debounce search so typing doesn't re-filter 11k rows per keystroke
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    let result = category === "All" ? [...tools] : tools.filter((t) => t.category === category);
    if (tierFilter !== "all") result = result.filter((t) => t.tier === tierFilter);
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break;
      case "popular": result.sort((a, b) => b.views - a.views); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [debouncedQuery, category, sortBy, tierFilter]);

  // Progressive rendering — never mount thousands of cards at once
  const PAGE_SIZE = 48;
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { setVisible(PAGE_SIZE); }, [debouncedQuery, category, sortBy, tierFilter]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length));
    }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  const pageTools = useMemo(() => filtered.slice(0, visible), [filtered, visible]);


  const sorts: { value: SortBy; label: string }[] = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Top Rated" },
    { value: "newest", label: "Newest" },
    { value: "name", label: "A-Z" },
  ];

  const tiers: { value: TierFilter; label: string }[] = [
    { value: "all", label: "All Tiers" },
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise" },
  ];

  return (
    <Layout>
      <Seo title="All AI Tools — Neuron Guide Directory" description="Browse the full directory of 500+ AI tools across 21+ categories. Filter, compare, and find the right tool fast." path="/tools" />
      <div className="px-4 pt-6 pb-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={neuronLogo} alt="Neuron Guide" className="w-7 h-7 rounded-lg" />
            <h1 className="text-2xl font-heading font-bold text-foreground">All AI Tools</h1>
          </div>
          <span className="text-xs text-muted-foreground">{tools.length} tools</span>
        </motion.div>

        {/* Search + Filter toggle */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools..."
              className="w-full bg-muted/50 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition ${showFilters ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/50 text-muted-foreground hover:text-foreground"}`}>
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Sort by</p>
              <div className="flex gap-2 flex-wrap">
                {sorts.map((s) => (
                  <button key={s.value} onClick={() => setSortBy(s.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition ${sortBy === s.value ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted/50 text-muted-foreground border border-border hover:text-foreground"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Plan tier</p>
              <div className="flex gap-2 flex-wrap">
                {tiers.map((t) => (
                  <button key={t.value} onClick={() => setTierFilter(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 ${tierFilter === t.value ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted/50 text-muted-foreground border border-border hover:text-foreground"}`}>
                    {t.value !== "all" && t.value !== "free" && <Crown className="w-3 h-3" />}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                category === cat ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted/50 text-muted-foreground border border-border hover:text-foreground"
              }`}>
              {cat}{cat !== "All" && categoryCounts[cat] ? ` (${categoryCounts[cat]})` : ""}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-xs text-muted-foreground">
          Showing {pageTools.length} of {filtered.length} tools
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {pageTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>

        <div ref={sentinelRef} aria-hidden className="h-1" />

        {visible < filtered.length && (
          <button
            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length))}
            className="w-full py-3 rounded-xl text-sm font-medium border border-border bg-muted/40 text-foreground hover:bg-muted/60 transition active:scale-[0.98]"
          >
            Load more tools
          </button>
        )}

      </div>
    </Layout>
  );
}
