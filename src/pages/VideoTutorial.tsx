import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, ArrowRight } from "lucide-react";

const tutorials = [
  {
    title: "Getting Started with NEURON VIEW",
    description: "Learn how to browse, search, and discover 10,000+ AI tools across 21+ categories.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:45",
  },
  {
    title: "How to Upgrade Your Account",
    description: "Step-by-step guide on how to pay and activate your premium access code.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2:30",
  },
  {
    title: "Using the AI Chatbot",
    description: "Get personalized AI tool recommendations from our smart chatbot.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:15",
  },
  {
    title: "Saving & Managing Favorites",
    description: "Learn how to bookmark and organize your favorite AI tools.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2:00",
  },
];

export default function VideoTutorial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={() => navigate("/profile")} className="px-4 py-2 rounded-xl text-sm font-medium gradient-primary text-primary-foreground hover:opacity-90 transition flex items-center gap-1.5">
            Go to Profile <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold gradient-text">Video Tutorials</h1>
            <p className="text-sm text-muted-foreground">Learn how to get the most out of NEURON VIEW</p>
          </div>

          <div className="space-y-4">
            {tutorials.map((tut, i) => (
              <motion.div
                key={tut.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <div className="aspect-video bg-muted/30 relative">
                  <iframe
                    src={tut.videoUrl}
                    title={tut.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-foreground text-sm">{tut.title}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Play className="w-3 h-3" /> {tut.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{tut.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
