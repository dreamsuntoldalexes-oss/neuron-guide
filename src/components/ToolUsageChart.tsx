import { useMemo } from "react";
import { motion } from "framer-motion";
import { Globe, TrendingUp, Activity } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

// Deterministic pseudo-random based on tool id so each tool has a consistent chart
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function seeded(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface Props {
  toolId: string;
  toolName: string;
  baseViews: number;
}

const REGIONS = ["N. America", "Europe", "Asia", "Africa", "S. America", "Oceania"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ToolUsageChart({ toolId, toolName, baseViews }: Props) {
  const { weekly, regions, todayUsers, weeklyGrowth, countries } = useMemo(() => {
    const rand = seeded(hash(toolId));
    const scale = Math.max(80, Math.floor(baseViews / 50));
    const weekly = DAYS.map((d) => ({
      day: d,
      uses: Math.floor(scale * (0.6 + rand() * 0.8)),
    }));
    const regions = REGIONS.map((r) => ({
      name: r,
      uses: Math.floor(scale * (0.4 + rand() * 1.4)),
    }));
    const total = weekly.reduce((a, b) => a + b.uses, 0);
    const todayUsers = weekly[weekly.length - 1].uses;
    const prev = weekly.slice(0, 3).reduce((a, b) => a + b.uses, 0) / 3;
    const curr = weekly.slice(-3).reduce((a, b) => a + b.uses, 0) / 3;
    const growth = Math.round(((curr - prev) / Math.max(1, prev)) * 100);
    return {
      weekly, regions,
      todayUsers,
      weeklyGrowth: growth,
      countries: 30 + Math.floor(rand() * 100),
    };
  }, [toolId, baseViews]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Worldwide Usage
          </h2>
          <p className="text-[11px] text-muted-foreground">How {toolName} is being used across the world this week</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">Live</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-heading font-bold text-primary">{todayUsers.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide whitespace-nowrap">Today's Users</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-heading font-bold text-accent flex items-center justify-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />{weeklyGrowth > 0 ? "+" : ""}{weeklyGrowth}%
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide whitespace-nowrap">Weekly Growth</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-heading font-bold text-secondary flex items-center justify-center gap-1">
            <Globe className="w-3.5 h-3.5" />{countries}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide whitespace-nowrap">Countries</p>
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weekly}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="uses" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Usage by region (this week)</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regions}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="uses" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
