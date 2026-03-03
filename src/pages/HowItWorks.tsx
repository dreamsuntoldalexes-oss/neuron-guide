import { motion } from "framer-motion";
import { BookOpen, Play, Lightbulb, ChevronRight, Search, Heart, MessageCircle, Star } from "lucide-react";
import Layout from "@/components/Layout";

const steps = [
  { icon: Search, title: "Browse & Search", description: "Use the search bar or browse categories to discover AI tools that match your needs." },
  { icon: Star, title: "Compare & Rate", description: "View detailed tool pages with features, pricing, pros & cons to make informed decisions." },
  { icon: Heart, title: "Save Favorites", description: "Tap the heart icon to save tools you like. Access them anytime from your Saved page." },
  { icon: MessageCircle, title: "Ask the AI Chatbot", description: "Not sure which tool to pick? Ask our AI assistant for personalized recommendations." },
];

const tips = [
  "Start with free tiers to test tools before committing to paid plans.",
  "Use the chatbot to compare multiple tools in the same category.",
  "Save tools to your favorites to build your personal AI toolkit.",
  "Check the 'Recently Added' section regularly for new discoveries.",
  "Look at the pros & cons section for honest assessments of each tool.",
];

export default function HowItWorks() {
  return (
    <Layout>
      <div className="px-4 pt-6 pb-4 space-y-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-medium">Guide</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">How It Works</h1>
          <p className="text-muted-foreground mt-1">Everything you need to know to get the most out of AI Tools Directory.</p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Video Tutorials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-3">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-neon-purple" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Video Tutorials</h2>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
              <Play className="w-8 h-8 text-neon-purple" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">We're preparing video tutorials to help you master AI tools faster. Stay tuned!</p>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Tips & Best Practices</h2>
          </div>
          <div className="glass-card p-4 space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
