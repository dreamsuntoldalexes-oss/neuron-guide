import { useState, useMemo } from "react";
import Seo from "@/components/Seo";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Search, ExternalLink, Flame, Youtube, ListVideo, Film } from "lucide-react";
import { playlists, featuredVideos, allCategories, type VideoPlaylist, type FeaturedVideo } from "@/data/videoTutorials";
import VideoPlayerModal from "@/components/VideoPlayerModal";

type Tab = "playlists" | "videos";

interface PlayerState {
  open: boolean;
  videoId?: string;
  searchQuery?: string;
  title?: string;
  fallbackUrl: string;
}

export default function VideoTutorial() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("playlists");
  const [selected, setSelected] = useState<VideoPlaylist>(playlists[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [player, setPlayer] = useState<PlayerState>({ open: false, fallbackUrl: "" });

  const playPlaylist = (p: VideoPlaylist) => {
    // Search pages can't embed; show fallback inside modal
    setPlayer({ open: true, searchQuery: p.query, title: p.title, fallbackUrl: p.searchUrl });
  };
  const playVideo = (v: FeaturedVideo) => {
    setPlayer({ open: true, videoId: v.videoId, title: `Featured · ${v.category}`, fallbackUrl: v.url });
  };
  const closePlayer = () => setPlayer((s) => ({ ...s, open: false }));
  const openOnYouTube = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const filteredPlaylists = useMemo(() => playlists.filter((v) => {
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  }), [activeCategory, searchQuery]);

  const filteredVideos = useMemo(() => featuredVideos.filter((v) => {
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = !searchQuery || v.videoId.toLowerCase().includes(searchQuery.toLowerCase()) || v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  }), [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Video Tutorials — Neuron Guide" description="Watch tutorials for the most popular AI tools and learn how to use them effectively." path="/tutorials" />
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/30">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-muted/50 transition" aria-label="Back">
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

        {/* Tab switcher */}
        <div className="flex gap-2 px-3 pb-2">
          <button
            onClick={() => setTab("playlists")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${tab === "playlists" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"}`}
          >
            <ListVideo className="w-3.5 h-3.5" /> Playlists ({playlists.length})
          </button>
          <button
            onClick={() => setTab("videos")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${tab === "videos" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"}`}
          >
            <Film className="w-3.5 h-3.5" /> Videos ({featuredVideos.length})
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-3 pb-2.5 overflow-x-auto scrollbar-hide">
          {allCategories.map((cat) => (
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

      {tab === "playlists" ? (
        <>
          {/* Featured hero */}
          <button onClick={() => playPlaylist(selected)} className="relative w-full aspect-video bg-black overflow-hidden group">
            <img src={selected.thumbnail} alt={selected.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
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

          <div className="px-3 py-3 border-b border-border/30">
            <h1 className="text-base font-semibold text-foreground leading-tight">{selected.title}</h1>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium whitespace-nowrap">{selected.badge}</span>
              <span>•</span>
              <span>{selected.category}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => playPlaylist(selected)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                <Play className="w-4 h-4 fill-current" /> Play Here
              </button>
              <button onClick={() => openOnYouTube(selected.searchUrl)} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition">
                <Youtube className="w-4 h-4" /> YouTube <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="px-3 py-3">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">All AI Playlists ({filteredPlaylists.length})</h2>
            </div>
            <div className="space-y-3">
              {filteredPlaylists.filter(v => v.id !== selected.id).map((video) => (
                <motion.button key={video.id} onClick={() => { setSelected(video); playPlaylist(video); }} whileTap={{ scale: 0.98 }} className="flex gap-3 w-full text-left group">
                  <div className="relative w-40 min-w-[10rem] aspect-video rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                      <Youtube className="w-2.5 h-2.5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition">{video.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-1">{video.category}</p>
                    <div className="flex items-center gap-1 text-[11px] text-primary mt-0.5">
                      <ExternalLink className="w-2.5 h-2.5" /> Open on YouTube
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Videos grid */
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 mb-3">
            <Film className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Featured Videos ({filteredVideos.length})</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredVideos.map((v) => (
              <motion.button key={v.id} onClick={() => playVideo(v)} whileTap={{ scale: 0.96 }} className="group text-left">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/30">
                  <img src={v.thumbnail} alt={v.category} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                    <Play className="w-7 h-7 text-white drop-shadow-lg fill-white" />
                  </div>
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                    <Youtube className="w-2.5 h-2.5" />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 truncate">{v.category}</p>
                <p className="text-[10px] text-primary truncate">{v.videoId}</p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <VideoPlayerModal
        open={player.open}
        videoId={player.videoId}
        searchQuery={player.searchQuery}
        title={player.title}
        fallbackUrl={player.fallbackUrl}
        onClose={closePlayer}
      />
    </div>
  );
}
