import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Search, ThumbsUp, Eye, Clock, ChevronRight, TrendingUp, Flame } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views: string;
  channel: string;
  uploadedAgo: string;
  category: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Getting Started with NEURON VIEW - Complete Guide",
    description: "Learn how to browse, search, and discover 10,000+ AI tools across 21+ categories. This tutorial covers everything you need to know.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "8:45",
    views: "12.4K",
    channel: "NEURON VIEW",
    uploadedAgo: "2 days ago",
    category: "Getting Started",
  },
  {
    id: "2",
    title: "How to Upgrade Your Account & Activate Premium",
    description: "Step-by-step guide on how to pay via WhatsApp or Email and activate your premium access code.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "5:30",
    views: "8.2K",
    channel: "NEURON VIEW",
    uploadedAgo: "5 days ago",
    category: "Account",
  },
  {
    id: "3",
    title: "Using the AI Chatbot for Smart Recommendations",
    description: "Get personalized AI tool recommendations from our smart chatbot. Ask questions and get instant answers.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "6:15",
    views: "15.7K",
    channel: "NEURON VIEW",
    uploadedAgo: "1 week ago",
    category: "Features",
  },
  {
    id: "4",
    title: "Top 10 AI Tools You MUST Try in 2025",
    description: "Our curated list of the absolute best AI tools across writing, coding, design, and video categories.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "12:20",
    views: "45.3K",
    channel: "NEURON VIEW",
    uploadedAgo: "3 days ago",
    category: "Top Picks",
  },
  {
    id: "5",
    title: "Save & Manage Your Favorite AI Tools",
    description: "Learn how to bookmark, organize, and quickly access your favorite AI tools from any device.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "4:00",
    views: "6.1K",
    channel: "NEURON VIEW",
    uploadedAgo: "1 week ago",
    category: "Features",
  },
  {
    id: "6",
    title: "AI Tools for Students - Study Smarter Not Harder",
    description: "Discover AI tools that can help you ace your exams, write better essays, and manage your time.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "9:55",
    views: "22.8K",
    channel: "NEURON VIEW",
    uploadedAgo: "4 days ago",
    category: "Education",
  },
  {
    id: "7",
    title: "Free vs Pro vs Enterprise - Which Plan is Right for You?",
    description: "A detailed comparison of all NEURON VIEW plans to help you choose the best value.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "7:10",
    views: "9.5K",
    channel: "NEURON VIEW",
    uploadedAgo: "6 days ago",
    category: "Account",
  },
  {
    id: "8",
    title: "How to Make Money Using AI Tools in Nigeria",
    description: "Real strategies to earn income using AI tools found on NEURON VIEW. Freelancing, content creation, and more.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "15:30",
    views: "67.2K",
    channel: "NEURON VIEW",
    uploadedAgo: "1 day ago",
    category: "Top Picks",
  },
];

const categoryFilters = ["All", "Getting Started", "Features", "Account", "Top Picks", "Education"];

export default function VideoTutorial() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = videos.filter((v) => {
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const relatedVideos = videos.filter((v) => v.id !== selectedVideo.id);

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
              placeholder="Search tutorials..."
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

      {/* Main video player */}
      <div className="w-full aspect-video bg-black">
        <iframe
          src={selectedVideo.videoUrl}
          title={selectedVideo.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video info */}
      <div className="px-3 py-3 border-b border-border/30">
        <h1 className="text-base font-semibold text-foreground leading-tight">{selectedVideo.title}</h1>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {selectedVideo.views} views</span>
          <span>{selectedVideo.uploadedAgo}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{selectedVideo.description}</p>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mt-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium text-foreground hover:bg-muted transition">
            <ThumbsUp className="w-3.5 h-3.5" /> Like
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium text-foreground hover:bg-muted transition">
            <Clock className="w-3.5 h-3.5" /> Watch Later
          </button>
        </div>

        {/* Channel info */}
        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-border/20">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">NV</div>
          <div>
            <p className="text-sm font-medium text-foreground">{selectedVideo.channel}</p>
            <p className="text-[10px] text-muted-foreground">Official Channel</p>
          </div>
        </div>
      </div>

      {/* Related / Up Next */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Up Next</h2>
        </div>

        <div className="space-y-3">
          {(searchQuery || activeCategory !== "All" ? filtered : relatedVideos).map((video) => (
            <motion.button
              key={video.id}
              onClick={() => {
                setSelectedVideo(video);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileTap={{ scale: 0.98 }}
              className="flex gap-3 w-full text-left group"
            >
              {/* Thumbnail */}
              <div className="relative w-40 min-w-[10rem] aspect-video rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded font-medium">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
                  <Play className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 py-0.5">
                <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition">
                  {video.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">{video.channel}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadedAgo}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
