import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "auto";
export type BgStyle = "solid" | "gradient" | "glass" | "mesh" | "aurora" | "animated" | "minimal";
export type ShadowLevel = "none" | "soft" | "medium" | "strong" | "floating";
export type ReadingWidth = "narrow" | "medium" | "wide" | "full";
export type CursorStyle = "default" | "glow" | "ai-dot" | "neon";
export type FontWeight = "100" | "300" | "400" | "500" | "600" | "700" | "800";

export const FONT_OPTIONS = [
  "Poppins","Inter","Outfit","Space Grotesk","Plus Jakarta Sans","Sora",
  "Manrope","DM Sans","Urbanist","Lexend","Montserrat","Rubik","Nunito",
  "Work Sans","Lato","Raleway",
] as const;

export const ACCENT_PRESETS: { name: string; hsl: string; glow: string }[] = [
  { name: "Emerald", hsl: "152 76% 48%", glow: "152 76% 60%" },
  { name: "Blue",    hsl: "217 91% 60%", glow: "217 91% 70%" },
  { name: "Purple",  hsl: "262 83% 65%", glow: "262 83% 75%" },
  { name: "Cyan",    hsl: "189 94% 55%", glow: "189 94% 70%" },
  { name: "Orange",  hsl: "24 95% 60%",  glow: "24 95% 70%"  },
  { name: "Pink",    hsl: "330 81% 65%", glow: "330 81% 75%" },
  { name: "Red",     hsl: "0 84% 60%",   glow: "0 84% 70%"   },
  { name: "Indigo",  hsl: "239 84% 67%", glow: "239 84% 77%" },
  { name: "Violet",  hsl: "271 91% 65%", glow: "271 91% 75%" },
  { name: "Gold",    hsl: "45 93% 55%",  glow: "45 93% 65%"  },
];

export const GRADIENT_PRESETS: { name: string; from: string; to: string }[] = [
  { name: "AI Ocean",    from: "199 89% 48%", to: "189 94% 43%" },
  { name: "Aurora",      from: "152 76% 48%", to: "189 94% 55%" },
  { name: "Galaxy",      from: "262 83% 58%", to: "330 81% 60%" },
  { name: "Cyber Purple",from: "271 91% 65%", to: "217 91% 60%" },
  { name: "Royal",       from: "239 84% 67%", to: "262 83% 58%" },
  { name: "Neon",        from: "152 76% 48%", to: "189 94% 55%" },
  { name: "Matrix",      from: "142 71% 45%", to: "152 76% 48%" },
  { name: "Midnight",    from: "224 71% 25%", to: "262 83% 35%" },
  { name: "Sunset",      from: "24 95% 60%",  to: "330 81% 65%" },
];

export interface AppearanceState {
  fontFamily: string;
  fontSize: number;        // 12-24
  fontWeight: FontWeight;
  themeMode: ThemeMode;
  accent: string;          // preset name
  gradient: string;        // preset name
  bgStyle: BgStyle;
  shadow: ShadowLevel;
  hoverFx: boolean;
  glowFx: boolean;
  floatFx: boolean;
  transitionsFx: boolean;
  cursorFx: boolean;
  compact: boolean;
  readingWidth: ReadingWidth;
  cursor: CursorStyle;
}

const DEFAULT_STATE: AppearanceState = {
  fontFamily: "Space Grotesk",
  fontSize: 16,
  fontWeight: "400",
  themeMode: "dark",
  accent: "Emerald",
  gradient: "Aurora",
  bgStyle: "gradient",
  shadow: "medium",
  hoverFx: true,
  glowFx: true,
  floatFx: true,
  transitionsFx: true,
  cursorFx: false,
  compact: false,
  readingWidth: "wide",
  cursor: "default",
};

const STORAGE_KEY = "neuron-guide-appearance";

interface AppearanceCtx {
  state: AppearanceState;
  set: <K extends keyof AppearanceState>(key: K, value: AppearanceState[K]) => void;
  reset: () => void;
}

const Ctx = createContext<AppearanceCtx | null>(null);

function loadedFonts() {
  const set = new Set<string>();
  document.head.querySelectorAll<HTMLLinkElement>("link[data-appearance-font]").forEach((l) => {
    const f = l.getAttribute("data-appearance-font");
    if (f) set.add(f);
  });
  return set;
}

function loadFont(family: string) {
  if (loadedFonts().has(family)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@100;300;400;500;600;700;800&display=swap`;
  link.setAttribute("data-appearance-font", family);
  document.head.appendChild(link);
}

function applyTheme(state: AppearanceState) {
  const root = document.documentElement;
  const body = document.body;

  // Theme mode
  const useDark =
    state.themeMode === "dark" ||
    (state.themeMode === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", useDark);

  // Font
  loadFont(state.fontFamily);
  root.style.setProperty("--app-font-family", `"${state.fontFamily}"`);
  body.style.fontFamily = `"${state.fontFamily}", sans-serif`;
  root.style.fontSize = `${state.fontSize}px`;
  body.style.fontWeight = state.fontWeight;

  // Accent
  const accent = ACCENT_PRESETS.find((a) => a.name === state.accent) || ACCENT_PRESETS[0];
  root.style.setProperty("--primary", accent.hsl);
  root.style.setProperty("--ring", accent.hsl);
  root.style.setProperty("--accent", accent.hsl);
  root.style.setProperty("--sidebar-primary", accent.hsl);
  root.style.setProperty("--neon-purple", accent.glow);

  // Gradient
  const grad = GRADIENT_PRESETS.find((g) => g.name === state.gradient) || GRADIENT_PRESETS[0];
  root.style.setProperty("--gradient-from", grad.from);
  root.style.setProperty("--gradient-to", grad.to);

  // Shadow scale
  const shadows: Record<ShadowLevel, string> = {
    none: "0 0 0 0 transparent",
    soft: "0 4px 16px -8px hsl(var(--primary) / 0.18)",
    medium: "0 10px 30px -10px hsl(var(--primary) / 0.3)",
    strong: "0 20px 50px -10px hsl(var(--primary) / 0.45)",
    floating: "0 30px 70px -10px hsl(var(--primary) / 0.55), 0 0 40px hsl(var(--primary) / 0.2)",
  };
  root.style.setProperty("--shadow-elegant", shadows[state.shadow]);

  // Reading width
  const widths: Record<ReadingWidth, string> = {
    narrow: "640px",
    medium: "768px",
    wide: "1024px",
    full: "100%",
  };
  root.style.setProperty("--reading-max", widths[state.readingWidth]);

  // Body classes
  const classes: string[] = [];
  classes.push(`bg-style-${state.bgStyle}`);
  classes.push(`cursor-style-${state.cursor}`);
  if (state.compact) classes.push("ui-compact");
  if (!state.hoverFx) classes.push("no-hover-fx");
  if (!state.glowFx) classes.push("no-glow-fx");
  if (!state.floatFx) classes.push("no-float-fx");
  if (!state.transitionsFx) classes.push("no-transitions-fx");

  // remove previous appearance classes
  body.className = body.className
    .split(" ")
    .filter((c) => !/^(bg-style-|cursor-style-|ui-compact|no-(hover|glow|float|transitions)-fx)/.test(c))
    .concat(classes)
    .join(" ");
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppearanceState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    applyTheme(state);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  useEffect(() => {
    if (state.themeMode !== "auto") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(state);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [state]);

  const value = useMemo<AppearanceCtx>(() => ({
    state,
    set: (key, value) => setState((s) => ({ ...s, [key]: value })),
    reset: () => setState(DEFAULT_STATE),
  }), [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppearance() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppearance must be used inside <AppearanceProvider>");
  return v;
}
