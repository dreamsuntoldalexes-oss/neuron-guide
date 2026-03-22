import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles, Zap, Brain, MessageCircle, Heart, ArrowRight, Crown,
  Shield, Lock, BellOff, Star, Users, TrendingUp, Play,
  CheckCircle2, Cpu, Database, Globe, Layers, Rocket,
  Award, BookOpen, Lightbulb, Target, BarChart3, Phone, Mail
} from "lucide-react";
import { useRef, useState } from "react";
import neuronLogo from "@/assets/neuron-logo.png";
import landingHero from "@/assets/landing-hero.jpg";
import heroPerson from "@/assets/hero-person.png";
import demoScreenshot1 from "@/assets/demo-screenshot-1.jpg";
import demoScreenshot2 from "@/assets/demo-screenshot-2.jpg";

const features = [
  { icon: Brain, title: "500+ AI Tools", desc: "Curated collection across 21+ categories" },
  { icon: Zap, title: "Compare & Rate", desc: "Side-by-side ratings, pricing & features" },
  { icon: MessageCircle, title: "AI Chatbot", desc: "Get personalized recommendations instantly" },
  { icon: Heart, title: "Save Favorites", desc: "Bookmark tools you love for quick access" },
  { icon: Crown, title: "Pro & Enterprise", desc: "Unlock premium tools and unlimited saves" },
  { icon: Target, title: "Smart Filters", desc: "Find the perfect tool in seconds" },
];

const stats = [
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "500+", label: "AI Tools", icon: Cpu },
  { value: "4.9★", label: "User Rating", icon: Star },
  { value: "21+", label: "Categories", icon: Layers },
];

const testimonials = [
  { name: "Adewale O.", role: "Student", text: "This site helped me discover AI tools that improved my grades! Passed my WAEC with flying colors thanks to the study tools here.", avatar: "AO" },
  { name: "Chioma N.", role: "Content Creator", text: "I found the best video editing AI here. Neuron View saved me hours of research. The chatbot recommended exactly what I needed!", avatar: "CN" },
  { name: "Emeka J.", role: "Developer", text: "As a developer, I use 10+ AI tools daily. Neuron View helps me compare pricing and features all in one place. Absolutely essential.", avatar: "EJ" },
  { name: "Fatima A.", role: "Business Owner", text: "My business runs on AI now. Neuron View showed me tools I never knew existed. Revenue up 40% since I started using their recommendations.", avatar: "FA" },
  { name: "David K.", role: "Designer", text: "The design AI tools section is incredible. Found Midjourney alternatives that fit my budget perfectly. 5 stars!", avatar: "DK" },
  { name: "Grace M.", role: "Teacher", text: "I recommend this to all my colleagues. The education category has tools that make lesson planning so much easier.", avatar: "GM" },
];

const howItWorks = [
  { step: "01", title: "Browse & Discover", desc: "Explore 500+ AI tools organized by category, use case, and pricing.", icon: Globe },
  { step: "02", title: "Compare & Rate", desc: "View side-by-side comparisons of features, pricing, and user ratings.", icon: BarChart3 },
  { step: "03", title: "Ask AI Chatbot", desc: "Get personalized tool recommendations based on your specific needs.", icon: MessageCircle },
  { step: "04", title: "Save & Master", desc: "Bookmark favorites, access tutorials, and become an AI power user.", icon: Rocket },
];

const categories = [
  "Writing", "Image Generation", "Code Assistant", "Video Editing",
  "Music & Audio", "Data Analysis", "Marketing", "Education",
  "Productivity", "Research", "Design", "Business"
];

const trustItems = [
  { icon: Shield, title: "Your Data is Safe", desc: "We use industry-standard encryption to protect all your information." },
  { icon: Lock, title: "Secure Login", desc: "Multi-factor authentication and encrypted sessions keep your account safe." },
  { icon: BellOff, title: "No Spam Ever", desc: "We respect your inbox. Only useful updates, unsubscribe anytime." },
];

const whyChooseUs = [
  { icon: Award, title: "Largest AI Directory in Africa", desc: "500+ verified tools — more than any other platform. Updated weekly with the latest AI innovations." },
  { icon: Lightbulb, title: "AI That Understands You", desc: "Our chatbot doesn't just list tools — it learns your workflow and recommends what actually fits your needs." },
  { icon: BookOpen, title: "Learn While You Discover", desc: "Every tool comes with guides, tutorials, and real user reviews so you can master it faster." },
  { icon: TrendingUp, title: "Stay Ahead of the Curve", desc: "While others search Google for hours, Neuron View users find the right AI tool in seconds." },
];

const fascinatingFacts = [
  "🧠 97% of our users discover tools they never knew existed",
  "⚡ Save 10+ hours per week by finding the right AI tool instantly",
  "🏆 Rated #1 AI directory by students, creators, and developers",
  "🌍 Users in 30+ countries trust NEURON VIEW daily",
  "🔥 New tools added every single week — never fall behind",
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [upgradeTooltip, setUpgradeTooltip] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* ───── HERO ───── */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <img src={landingHero} alt="" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
        </motion.div>

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5"
        >
          <div className="flex items-center gap-1.5">
            <img src={neuronLogo} alt="NEURON VIEW" className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="font-heading font-bold text-sm sm:text-lg text-foreground">NEURON VIEW</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                onMouseEnter={() => setUpgradeTooltip(true)}
                onMouseLeave={() => setUpgradeTooltip(false)}
                onClick={() => setShowUpgradePopup(true)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-[hsl(38,92%,50%)] to-[hsl(25,95%,53%)] text-primary-foreground hover:opacity-90 transition active:scale-[0.97] flex items-center gap-1"
              >
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Upgrade</span>
              </button>
              {upgradeTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 w-52 p-3 glass-card text-xs text-muted-foreground z-50"
                >
                  🔓 Unlock 500+ premium AI tools, unlimited saves, and priority chatbot access!
                </motion.div>
              )}
            </div>
            <Link to="/login" className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors">Log In</Link>
            <Link to="/signup" className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition active:scale-[0.97]">Sign Up</Link>
          </div>
        </motion.nav>

        {/* Hero content — side-by-side with person image */}
        <div className="relative z-10 px-6 pt-8 pb-16 flex items-center justify-between max-w-6xl mx-auto gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 flex-1 max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Trusted by 50,000+ users worldwide
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-foreground leading-[1.1]">
              Your Ultimate<br />AI Tools Hub
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Discover, compare, and master 500+ AI tools — all in one beautifully curated directory.
            </p>
            <div className="flex gap-3 pt-2">
              <Link to="/onboarding" className="px-6 py-3.5 rounded-xl font-heading font-semibold gradient-primary text-primary-foreground flex items-center gap-2 hover:opacity-90 transition active:scale-[0.97]">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="px-6 py-3.5 rounded-xl font-medium border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition active:scale-[0.97]">
                Log In
              </Link>
            </div>
          </motion.div>

          {/* Person image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block flex-shrink-0"
          >
            <img src={heroPerson} alt="Person working with AI tools" className="w-72 lg:w-96 drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <section className="relative z-10 px-6 -mt-10">
        <FadeIn>
          <div className="glass-card p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center space-y-1">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-2xl font-heading font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* ───── FASCINATING FACTS (no boxes) ───── */}
      <section className="relative z-10 px-6 py-16 max-w-3xl mx-auto">
        <FadeIn className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">Why 50,000+ Users Choose Us</h2>
        </FadeIn>
        <div className="space-y-4">
          {fascinatingFacts.map((fact, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed text-center py-2 border-b border-border/30 last:border-0">
                {fact}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ───── BOLD STATEMENT (unboxed) ───── */}
      <section className="relative z-10 px-6 py-20 text-center">
        <FadeIn>
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">The difference is clear</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Stop Wasting Hours Searching for AI Tools.<br />
            <span className="gradient-text">Let NEURON VIEW Do It in Seconds.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Other directories give you lists. We give you <span className="text-foreground font-semibold">intelligence</span> — 
            smart recommendations, real reviews, and a chatbot that actually understands what you need.
          </p>
        </FadeIn>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Everything you need</p>
          <h2 className="text-3xl font-heading font-bold text-foreground">Powerful Features Built for You</h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="glass-card-hover p-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-heading font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="relative z-10 px-6 py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Simple & Powerful</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">How It Works</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {howItWorks.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.step} delay={i * 0.1}>
                  <div className="glass-card p-6 flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-primary font-mono mb-1">Step {item.step}</p>
                      <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── QUOTE BANNER (unboxed) ───── */}
      <section className="relative z-10 px-6 py-16 text-center">
        <FadeIn>
          <p className="text-xl sm:text-2xl font-heading italic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            "The future belongs to those who learn to use AI before everyone else."
          </p>
          <p className="text-primary text-sm font-medium mt-3">— NEURON VIEW</p>
        </FadeIn>
      </section>

      {/* ───── CATEGORIES PREVIEW ───── */}
      <section className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <FadeIn className="text-center mb-10">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Explore</p>
          <h2 className="text-3xl font-heading font-bold text-foreground">21+ Categories to Explore</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">From writing assistants to video editors, find the perfect AI tool for any task.</p>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <span key={cat} className="px-4 py-2.5 rounded-xl glass-card text-sm text-foreground hover:border-primary/30 transition cursor-default">
                {cat}
              </span>
            ))}
            <span className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
              +9 More
            </span>
          </div>
        </FadeIn>
      </section>

      {/* ───── DEMO / PREVIEW ───── */}
      <section className="relative z-10 px-6 py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">See it in action</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">Preview the Experience</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="glass-card overflow-hidden rounded-2xl">
                <img src={demoScreenshot1} alt="AI Tools Dashboard" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground text-sm">Browse 500+ Tools</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Search, filter, and compare AI tools with detailed ratings and pricing info.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass-card overflow-hidden rounded-2xl">
                <img src={demoScreenshot2} alt="AI Chatbot" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground text-sm">AI-Powered Chatbot</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Ask questions and get personalized AI tool recommendations instantly.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───── COMPELLING STATEMENT (unboxed) ───── */}
      <section className="relative z-10 px-6 py-20 text-center">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground max-w-2xl mx-auto">
            Don't Just Use AI. <span className="gradient-text">Master It.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Whether you're a student acing exams, a creator building content, or an entrepreneur scaling your business — 
            NEURON VIEW is the only platform that gives you <span className="text-foreground font-medium">every AI tool</span> at your fingertips.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {["✅ Free to start", "✅ No credit card needed", "✅ Cancel anytime"].map((item) => (
              <span key={item} className="text-sm text-foreground/80">{item}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ───── SOCIAL PROOF / TESTIMONIALS ───── */}
      <section className="relative z-10 px-6 py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Loved by thousands</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">What Our Users Say</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="glass-card-hover p-5 space-y-3">
                  <div className="flex items-center gap-1 text-[hsl(38,92%,50%)]">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TRUST & SECURITY (unboxed text + icons) ───── */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Your privacy matters</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">Trust & Security</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-8">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── WHY CHOOSE US ───── */}
      <section className="relative z-10 px-6 py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">Stand out</p>
            <h2 className="text-3xl font-heading font-bold text-foreground">Why Choose NEURON VIEW?</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-8">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── POWER STATEMENT (unboxed) ───── */}
      <section className="relative z-10 px-6 py-16 text-center">
        <FadeIn>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            🚀 Every week, <span className="text-foreground font-semibold">thousands of new users</span> sign up. 
            Every day, new AI tools are added. If you're not on NEURON VIEW yet, you're already behind.
          </p>
        </FadeIn>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="relative z-10 px-6 py-24">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center glass-card p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <img src={neuronLogo} alt="" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-heading font-bold text-foreground mb-3">Ready to Explore 500+ AI Tools?</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Join 50,000+ users who discover, compare, and master AI tools with NEURON VIEW.</p>
              <div className="flex gap-3 justify-center">
                <Link to="/signup" className="px-8 py-3.5 rounded-xl font-heading font-semibold gradient-primary text-primary-foreground flex items-center gap-2 hover:opacity-90 transition active:scale-[0.97]">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="relative z-10 border-t border-border/50 bg-card/40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img src={neuronLogo} alt="NEURON VIEW" className="w-7 h-7" />
                <span className="font-heading font-bold text-foreground">NEURON VIEW</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Your ultimate AI tools directory. Discover, compare, and master 500+ tools.</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-3">Product</h4>
              <div className="space-y-2">
                <Link to="/tools" className="block text-xs text-muted-foreground hover:text-primary transition">Browse Tools</Link>
                <Link to="/chatbot" className="block text-xs text-muted-foreground hover:text-primary transition">AI Chatbot</Link>
                <Link to="/pricing" className="block text-xs text-muted-foreground hover:text-primary transition">Pricing</Link>
                <Link to="/how-it-works" className="block text-xs text-muted-foreground hover:text-primary transition">How It Works</Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-3">Support</h4>
              <div className="space-y-2">
                <a href="tel:08033962964" className="block text-xs text-muted-foreground hover:text-primary transition">📞 Call: 08033962964</a>
                <a href="https://wa.me/2348033962964" target="_blank" rel="noopener noreferrer" className="block text-xs text-muted-foreground hover:text-primary transition">💬 WhatsApp: 08033962964</a>
                <a href="mailto:adekanmbiadekanmbi5@gmail.com" className="block text-xs text-muted-foreground hover:text-primary transition">✉️ adekanmbiadekanmbi5@gmail.com</a>
              </div>
              <div className="flex gap-2 mt-3">
                <a href="https://wa.me/2348033962964?text=Hello%20NEURON%20VIEW!" target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium gradient-primary text-primary-foreground hover:opacity-90 transition active:scale-95">
                  Chat on WhatsApp
                </a>
                <a href="mailto:adekanmbiadekanmbi5@gmail.com?subject=Hello%20NEURON%20VIEW"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition active:scale-95">
                  Send Email
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm mb-3">Legal</h4>
              <div className="space-y-2">
                <span className="block text-xs text-muted-foreground">Privacy Policy</span>
                <span className="block text-xs text-muted-foreground">Terms of Service</span>
                <span className="block text-xs text-muted-foreground">Cookie Policy</span>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2025 NEURON VIEW. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Secured & Encrypted</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ───── UPGRADE POPUP ───── */}
      {showUpgradePopup && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowUpgradePopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-card p-6 max-w-sm w-full space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowUpgradePopup(false)} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-muted transition">
              <span className="text-muted-foreground text-lg">✕</span>
            </button>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(25,95%,53%)] flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground">Upgrade to Premium</h3>
              <p className="text-sm text-muted-foreground">Unlock unlimited access to 500+ AI tools, priority chatbot, and exclusive features.</p>
            </div>
            <div className="space-y-2 text-sm">
              {["Unlimited tool views", "Priority AI chatbot access", "Exclusive premium tools", "No ads, ever"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <a href="https://wa.me/2348033962964?text=Hi%2C%20I%20want%20to%20upgrade%20my%20NEURON%20VIEW%20plan%20to%20premium"
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground text-center hover:opacity-90 transition active:scale-[0.97]">
                💬 Upgrade via WhatsApp
              </a>
              <a href="mailto:adekanmbiadekanmbi5@gmail.com?subject=I%20want%20to%20upgrade%20my%20NEURON%20VIEW%20plan"
                className="w-full py-3 rounded-xl text-sm font-medium border border-border bg-muted/30 text-foreground text-center hover:bg-muted/50 transition active:scale-[0.97]">
                ✉️ Upgrade via Email
              </a>
              <Link to="/pricing" onClick={() => setShowUpgradePopup(false)}
                className="w-full py-2 text-sm text-primary text-center hover:underline">
                View All Plans
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
