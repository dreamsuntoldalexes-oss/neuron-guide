import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Heart, ExternalLink, Check, X, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ToolCard from "@/components/ToolCard";
import ToolUsageChart from "@/components/ToolUsageChart";
import { tools, getSimilarTools } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";


export default function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = tools.find((t) => t.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!tool) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <p className="text-muted-foreground">Tool not found.</p>
          <Link to="/tools" className="text-primary mt-2 hover:underline">← Back to tools</Link>
        </div>
      </Layout>
    );
  }

  const similar = getSimilarTools(tool);

  return (
    <Layout>
      <Seo
        title={`${tool.name} — ${tool.category} AI Tool | NEURON VIEW`}
        description={tool.shortDescription}
        path={`/tools/${tool.id}`}
        image={tool.logo}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.shortDescription,
          applicationCategory: tool.category,
          operatingSystem: "Web",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.rating,
            ratingCount: Math.max(1, tool.views || 1),
          },
        }}
      />
      <div className="px-4 pt-4 pb-6 space-y-6 max-w-2xl mx-auto">

        {/* Back */}
        <button onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/tools"))}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img src={tool.logo} alt={tool.name} className="w-14 h-14 rounded-xl object-contain bg-muted/50 p-1.5" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=fff&size=64`; }} />
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">{tool.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{tool.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" /> {tool.views.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => toggleFavorite(tool.id)}
              className="p-2 rounded-xl border border-border hover:border-primary/30 transition">
              <Heart className={`w-5 h-5 ${isFavorite(tool.id) ? "fill-neon-pink text-neon-pink" : "text-muted-foreground"}`} />
            </button>
          </div>

          <p className="text-muted-foreground leading-relaxed">{tool.description}</p>

          <div className="flex flex-wrap gap-3">
            <div className="glass-card px-4 py-2 text-sm">
              <span className="text-muted-foreground">Pricing: </span>
              <span className="text-foreground font-medium">{tool.pricing}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl font-heading font-semibold text-primary-foreground gradient-primary flex items-center justify-center gap-2 hover:opacity-90 transition active:scale-[0.98]">
              Visit Website <ExternalLink className="w-4 h-4" />
            </a>
            <button onClick={() => toggleFavorite(tool.id)}
              className={`px-4 py-3 rounded-xl border font-medium text-sm transition ${
                isFavorite(tool.id) ? "border-neon-pink/30 bg-neon-pink/10 text-neon-pink" : "border-border bg-muted/50 text-foreground hover:border-primary/30"
              }`}>
              {isFavorite(tool.id) ? "Saved" : "Save"}
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-3">
          <h2 className="text-lg font-heading font-semibold text-foreground">Features</h2>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground">{f}</span>
            ))}
          </div>
        </motion.div>

        {/* Usage Chart */}
        <ToolUsageChart toolId={tool.id} toolName={tool.name} baseViews={tool.views} />

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-4 space-y-2">
            <h3 className="text-sm font-heading font-semibold text-primary flex items-center gap-1"><Check className="w-4 h-4" /> Pros</h3>
            <ul className="space-y-1.5">
              {tool.pros.map((p) => (
                <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 space-y-2">
            <h3 className="text-sm font-heading font-semibold text-destructive flex items-center gap-1"><X className="w-4 h-4" /> Cons</h3>
            <ul className="space-y-1.5">
              {tool.cons.map((c) => (
                <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <X className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Similar Tools */}
        {similar.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-heading font-semibold text-foreground">Similar Tools</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {similar.map((t, i) => (
                <ToolCard key={t.id} tool={t} index={i} isFavorite={isFavorite(t.id)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
