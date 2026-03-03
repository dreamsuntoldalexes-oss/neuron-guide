import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { tools, categories, type Category } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";

type SortBy = "rating" | "newest" | "popular" | "name";

export default function Tools() {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category) || "All";
  const initialSort = (searchParams.get("sort") as SortBy) || "popular";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>(initialCategory);
  const [sortBy, setSortBy] = useState<SortBy>(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = useMemo(() => {
    let result = category === "All" ? [...tools] : tools.filter((t) => t.category === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break;
      case "popular": result.sort((a, b) => b.views - a.views); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [query, category, sortBy]);

  const sorts: { value: SortBy; label: string }[] = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Top Rated" },
    { value: "newest", label: "Newest" },
    { value: "name", label: "A-Z" },
  ];

  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-heading font-bold text-foreground">
          All AI Tools
        </motion.h1>

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
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-sm transition-all ${
                category === cat ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted/50 text-muted-foreground border border-border hover:text-foreground"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-xs text-muted-foreground">{filtered.length} tools found</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} isFavorite={isFavorite(tool.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
