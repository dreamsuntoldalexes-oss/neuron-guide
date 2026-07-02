import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, RotateCcw, Search, Sun, Moon, Monitor, MousePointer2 } from "lucide-react";
import {
  useAppearance, FONT_OPTIONS, ACCENT_PRESETS, GRADIENT_PRESETS,
  ThemeMode, BgStyle, ShadowLevel, ReadingWidth, CursorStyle, FontWeight,
} from "@/context/AppearanceContext";

const WEIGHTS: { label: string; value: FontWeight }[] = [
  { label: "Thin", value: "100" },
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semi Bold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Extra Bold", value: "800" },
];

const BG_STYLES: BgStyle[] = ["solid","gradient","glass","mesh","aurora","animated","minimal"];
const SHADOWS: ShadowLevel[] = ["none","soft","medium","strong","floating"];
const WIDTHS: ReadingWidth[] = ["narrow","medium","wide","full"];
const CURSORS: CursorStyle[] = ["default","glow","ai-dot","neon"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default function AppearancePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, set, reset } = useAppearance();
  const [fontQuery, setFontQuery] = useState("");
  const filteredFonts = useMemo(() => {
    const q = fontQuery.trim().toLowerCase();
    const list = q ? FONT_OPTIONS.filter((f) => f.toLowerCase().includes(q)) : FONT_OPTIONS;
    return list.slice(0, 200);
  }, [fontQuery]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[81] w-full sm:w-[420px] bg-card/95 backdrop-blur-2xl border-l border-border/40 shadow-2xl overflow-y-auto"
          >
            <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border/30 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-bold text-foreground">Appearance</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={reset} aria-label="Reset to defaults" className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full border border-border hover:bg-muted transition">
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button onClick={onClose} aria-label="Close appearance panel" className="p-2 rounded-full hover:bg-muted transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            <div className="p-5 space-y-6">
              <Section title="Theme Mode">
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: "light", icon: Sun, label: "Light" },
                    { v: "dark", icon: Moon, label: "Dark" },
                    { v: "auto", icon: Monitor, label: "Auto" },
                  ] as { v: ThemeMode; icon: typeof Sun; label: string }[]).map(({ v, icon: Icon, label }) => (
                    <button key={v} onClick={() => set("themeMode", v)} className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition ${state.themeMode === v ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{label}</span>
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Font Family">
                <select
                  value={state.fontFamily}
                  onChange={(e) => set("fontFamily", e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: `"${state.fontFamily}"` }}>
                  The quick brown fox jumps over the lazy dog.
                </p>
              </Section>

              <Section title={`Font Size — ${state.fontSize}px`}>
                <input
                  type="range" min={12} max={24} step={1} value={state.fontSize}
                  onChange={(e) => set("fontSize", Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Font size"
                />
              </Section>

              <Section title="Font Weight">
                <div className="grid grid-cols-4 gap-2">
                  {WEIGHTS.map((w) => (
                    <button key={w.value} onClick={() => set("fontWeight", w.value)} className={`text-xs py-2 rounded-lg border transition ${state.fontWeight === w.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`} style={{ fontWeight: w.value }}>
                      {w.label}
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Accent Color">
                <div className="grid grid-cols-5 gap-2">
                  {ACCENT_PRESETS.map((a) => (
                    <button key={a.name} onClick={() => set("accent", a.name)} title={a.name} aria-label={`Accent ${a.name}`} className={`group relative aspect-square rounded-xl border-2 transition ${state.accent === a.name ? "border-foreground scale-105" : "border-transparent hover:scale-105"}`} style={{ background: `hsl(${a.hsl})` }}>
                      <span className="absolute inset-x-0 -bottom-5 text-[9px] text-muted-foreground text-center opacity-0 group-hover:opacity-100">{a.name}</span>
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Gradient Theme">
                <div className="grid grid-cols-3 gap-2">
                  {GRADIENT_PRESETS.map((g) => (
                    <button key={g.name} onClick={() => set("gradient", g.name)} className={`relative h-14 rounded-xl border-2 transition overflow-hidden ${state.gradient === g.name ? "border-foreground" : "border-transparent hover:border-border"}`} style={{ background: `linear-gradient(135deg, hsl(${g.from}), hsl(${g.to}))` }}>
                      <span className="absolute inset-x-0 bottom-1 text-[10px] text-white drop-shadow text-center font-medium">{g.name}</span>
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Background Style">
                <div className="grid grid-cols-4 gap-2">
                  {BG_STYLES.map((b) => (
                    <button key={b} onClick={() => set("bgStyle", b)} className={`text-xs py-2 rounded-lg border capitalize transition ${state.bgStyle === b ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>{b}</button>
                  ))}
                </div>
              </Section>

              <Section title="Shadows">
                <div className="grid grid-cols-5 gap-2">
                  {SHADOWS.map((s) => (
                    <button key={s} onClick={() => set("shadow", s)} className={`text-[11px] py-2 rounded-lg border capitalize transition ${state.shadow === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>{s}</button>
                  ))}
                </div>
              </Section>

              <Section title="Animation Effects">
                <div className="space-y-2">
                  {[
                    { k: "hoverFx" as const, label: "Hover effects" },
                    { k: "glowFx" as const, label: "Glow effects" },
                    { k: "floatFx" as const, label: "Floating cards" },
                    { k: "transitionsFx" as const, label: "Smooth transitions" },
                    { k: "cursorFx" as const, label: "Cursor effects" },
                  ].map((row) => (
                    <label key={row.k} className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-muted/30 border border-border/50">
                      <span className="text-sm text-foreground">{row.label}</span>
                      <input type="checkbox" checked={state[row.k]} onChange={(e) => set(row.k, e.target.checked)} className="accent-primary w-4 h-4" />
                    </label>
                  ))}
                </div>
              </Section>

              <Section title="Layout">
                <div className="space-y-3">
                  <label className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-sm text-foreground">Compact mode</span>
                    <input type="checkbox" checked={state.compact} onChange={(e) => set("compact", e.target.checked)} className="accent-primary w-4 h-4" />
                  </label>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Reading width</p>
                    <div className="grid grid-cols-4 gap-2">
                      {WIDTHS.map((w) => (
                        <button key={w} onClick={() => set("readingWidth", w)} className={`text-xs py-2 rounded-lg border capitalize transition ${state.readingWidth === w ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>{w}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Cursor Style">
                <div className="grid grid-cols-4 gap-2">
                  {CURSORS.map((c) => (
                    <button key={c} onClick={() => set("cursor", c)} className={`text-[11px] py-2 rounded-lg border capitalize transition ${state.cursor === c ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>
                      <MousePointer2 className="w-3 h-3 inline-block mr-1" />{c}
                    </button>
                  ))}
                </div>
              </Section>

              <button onClick={reset} className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                <RotateCcw className="w-4 h-4" /> Reset to Default
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function AppearanceLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open appearance customization"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-[60] w-11 h-11 rounded-full gradient-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)] flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Palette className="w-5 h-5" />
      </button>
      <AppearancePanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
