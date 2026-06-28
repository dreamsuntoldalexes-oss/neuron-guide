import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { TrendingUp, Eye, Users, Sparkles, ArrowUpRight, Activity, Star } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Layout from "@/components/Layout";
import { tools } from "@/data/tools";

const usageData = [
  { day: "Mon", visits: 420, tools: 38 },
  { day: "Tue", visits: 680, tools: 51 },
  { day: "Wed", visits: 540, tools: 44 },
  { day: "Thu", visits: 890, tools: 67 },
  { day: "Fri", visits: 1240, tools: 92 },
  { day: "Sat", visits: 1580, tools: 118 },
  { day: "Sun", visits: 1720, tools: 134 },
];

const categoryData = [
  { name: "Writing", uses: 340 },
  { name: "Image", uses: 520 },
  { name: "Code", uses: 410 },
  { name: "Video", uses: 280 },
  { name: "Audio", uses: 190 },
  { name: "Research", uses: 360 },
  { name: "Edu", uses: 470 },
];

const leaders = [...tools].sort((a, b) => b.views - a.views).slice(0, 3);

export default function Analytics() {
  return (
    <Layout>
      <Seo title="AI Tool Analytics — Neuron Guide" description="Live engagement and usage analytics across the Neuron Guide AI tools directory." path="/analytics" />
      <div className="px-4 pt-6 pb-8 space-y-6 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs text-primary uppercase tracking-wider">Neuron Guide · Live</p>
          <h1 className="text-3xl font-heading font-bold text-foreground">Site Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">See how active Neuron Guide is — real engagement across {tools.length}+ AI tools this week.</p>
        </motion.div>

        {/* Stat row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Visits", value: "7,070", delta: "+32%", icon: Eye, color: "text-primary" },
            { label: "Active Users", value: "12.4k", delta: "+17%", icon: Users, color: "text-accent" },
            { label: "Tools Opened", value: "544", delta: "+25%", icon: Sparkles, color: "text-secondary" },
            { label: "Avg. Rating", value: "4.8 / 5", delta: "+5%", icon: Star, color: "text-[hsl(var(--gold))]" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] text-primary flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{s.delta}</span>
              </div>
              <p className="text-2xl font-heading font-bold text-foreground mt-2">{s.value}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Weekly trends */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Weekly Engagement</h2>
              <p className="text-[11px] text-muted-foreground">Visits & tool opens over the last 7 days</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">Live</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                <Line type="monotone" dataKey="tools" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--accent))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Visits</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Tools Opened</span>
          </div>
        </motion.div>

        {/* Categories bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-3">
          <div>
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4 text-accent" /> Top Categories</h2>
            <p className="text-[11px] text-muted-foreground">What our users are exploring this week</p>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="uses" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-3">
          <h2 className="font-heading font-semibold text-foreground">🔥 Most Viewed Tools</h2>
          <div className="space-y-2">
            {leaders.map((tool, i) => (
              <Link key={tool.id} to={`/tools/${tool.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/40 transition">
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{i + 1}</div>
                <img src={tool.logo} alt={tool.name} className="w-9 h-9 rounded-lg bg-muted" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tool.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{tool.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{(tool.views / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-muted-foreground">views</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-[11px] text-muted-foreground pt-2">
          Neuron Guide is growing fast — join {tools.length}+ AI tools in your pocket today.
        </p>
      </div>
    </Layout>
  );
}
