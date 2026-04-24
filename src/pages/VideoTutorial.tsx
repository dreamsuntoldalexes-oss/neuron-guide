import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Search, ExternalLink, Flame, Youtube } from "lucide-react";

interface VideoCollection {
  id: string;
  title: string;
  description: string;
  query: string;
  searchUrl: string;
  thumbnail: string;
  category: string;
  badge: string;
}

const collections: VideoCollection[] = [
  {
    id: "1",
    title: "Artificial Intelligence Tutorial",
    description: "Hand-picked YouTube tutorials covering AI fundamentals, neural networks, and real-world applications.",
    query: "artificial intelligence tutorial",
    searchUrl: "https://www.youtube.com/results?search_query=artificial+intelligence+tutorial",
    thumbnail: "https://img.youtube.com/vi/JMUxmLyrhSk/hqdefault.jpg",
    category: "AI Basics",
    badge: "Beginner → Pro",
  },
  {
    id: "2",
    title: "Machine Learning for Beginners",
    description: "Step-by-step introductions to ML algorithms, supervised vs unsupervised learning, and Python workflows.",
    query: "machine learning for beginners",
    searchUrl: "https://www.youtube.com/results?search_query=machine+learning+for+beginners",
    thumbnail: "https://img.youtube.com/vi/i_LwzRVP7bg/hqdefault.jpg",
    category: "Machine Learning",
    badge: "Beginner",
  },
  {
    id: "3",
    title: "ChatGPT Tutorial",
    description: "Master ChatGPT — prompt engineering, custom GPTs, automation, and pro productivity workflows.",
    query: "chatgpt tutorial",
    searchUrl: "https://www.youtube.com/results?search_query=chatgpt+tutorial",
    thumbnail: "https://img.youtube.com/vi/JTxsNm9IdYU/hqdefault.jpg",
    category: "ChatGPT",
    badge: "Trending",
  },
  {
    id: "4",
    title: "Deep Learning Course",
    description: "Full-length deep learning courses covering CNNs, RNNs, transformers, and PyTorch / TensorFlow.",
    query: "deep learning course",
    searchUrl: "https://www.youtube.com/results?search_query=deep+learning+course",
    thumbnail: "https://img.youtube.com/vi/VyWAvY2CF9c/hqdefault.jpg",
    category: "Deep Learning",
    badge: "Advanced",
  },
  {
    id: "5",
    title: "AI App Development",
    description: "Build real AI-powered apps — from idea to launch using modern frameworks, APIs, and deployment tools.",
    query: "ai app development",
    searchUrl: "https://www.youtube.com/results?search_query=ai+app+development",
    thumbnail: "https://img.youtube.com/vi/mJwPvyc4-rk/hqdefault.jpg",
    category: "App Building",
    badge: "Hot",
  },
];

const categoryFilters = ["All", "AI Basics", "Machine Learning", "ChatGPT", "Deep Learning", "App Building"];

export default function VideoTutorial() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<VideoCollection>(collections[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = collections.filter((v) => {
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const others = collections.filter((v) => v.id !== selected.id);

  const openOnYouTube = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/30">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-muted/50 transition">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search AI tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-muted/40 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-3 pb-2.5 overflow-x-auto scrollbar-hide">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured collection hero */}
      <button
        onClick={() => openOnYouTube(selected.searchUrl)}
        className="relative w-full aspect-video bg-black overflow-hidden group"
      >
        <img src={selected.thumbnail} alt={selected.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold flex items-center gap-1">
          <Youtube className="w-3 h-3" /> LIVE PLAYLIST
        </div>
      </button>

      {/* Selected info */}
      <div className="px-3 py-3 border-b border-border/30">
        <h1 className="text-base font-semibold text-foreground leading-tight">{selected.title}</h1>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
          <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">{selected.badge}</span>
          <span>•</span>
          <span>{selected.category}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{selected.description}</p>

        <button
          onClick={() => openOnYouTube(selected.searchUrl)}
          className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
        >
          <Youtube className="w-4 h-4" /> Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* All collections */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">More AI Playlists</h2>
        </div>

        <div className="space-y-3">
          {(searchQuery || activeCategory !== "All" ? filtered : others).map((video) => (
            <motion.button
              key={video.id}
              onClick={() => {
                setSelected(video);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileTap={{ scale: 0.98 }}
              className="flex gap-3 w-full text-left group"
            >
              <div className="relative w-40 min-w-[10rem] aspect-video rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <Play className="w-8 h-8 text-white drop-shadow-lg fill-white" />
                </div>
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                  <Youtube className="w-2.5 h-2.5" />
                </div>
              </div>

              <div className="flex-1 min-w-0 py-0.5">
                <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition">
                  {video.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">{video.category}</p>
                <div className="flex items-center gap-1 text-[11px] text-primary mt-0.5">
                  <ExternalLink className="w-2.5 h-2.5" /> Open on YouTube
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
