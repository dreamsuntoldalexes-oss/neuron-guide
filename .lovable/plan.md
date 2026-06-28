# Neuron Guide — Rebrand, Appearance Panel & Polish

This is a large multi-area change. I'll group the work so each area ships clean.

## 1. Rebrand to "Neuron Guide"
Replace every "NEURON VIEW" / "Neuron View" reference with **Neuron Guide** across:
- `index.html` (title, meta, OG, JSON-LD)
- `src/components/Seo.tsx` (default site name)
- Splash, Login, Signup, Onboarding, Layout/Nav, WelcomeFooter, Profile, Settings, Pricing, Chatbot
- Per-page `<Seo>` titles
- `public/llms.txt`, `public/robots.txt` sitemap host stays the same domain
- Hero H1 changed to: **"Discover the Best AI Tools for Every Need"** (brand stays in nav/logo)

## 2. Appearance Customization Panel (new)
New floating button (right edge, all pages) → animated `Sheet` drawer.

New files:
- `src/context/AppearanceContext.tsx` — state + localStorage persistence + CSS variable application
- `src/components/AppearancePanel.tsx` — the drawer UI
- `src/components/AppearanceLauncher.tsx` — floating FAB
- Mounted globally in `src/App.tsx`

Controls (no border-radius option):
- Font family (16 Google Fonts, lazy-loaded via injected `<link>` on selection)
- Font size slider 12–24px (sets `html { font-size }`)
- Font weight (Thin → Extra Bold, sets `--app-font-weight`)
- Theme mode: Light / Dark / Auto
- Accent color presets (10 colors → overrides `--primary` HSL)
- Gradient theme presets (overrides `--gradient-primary` + hero glow)
- Background style (solid/gradient/glass/mesh/aurora/animated/minimal — body class)
- Shadow level (none/soft/medium/strong/floating — sets `--shadow-elegant`)
- Animation toggles (hover, glow, floating, transitions, cursor)
- Compact mode (body class shrinking padding)
- Reading width (narrow/medium/wide/full — sets `--reading-max`)
- Cursor style (default/glow/ai-dot/neon-ring — body class + custom cursor div)
- **Reset to Default** button

All values applied via CSS variables on `:root` so existing tokens (`hsl(var(--primary))`) automatically inherit accent/gradient/shadow changes — buttons, links, icons, nav, inputs all update for free.

## 3. Homepage AI image slider fix
- Verify `src/assets/aiGallery.ts` imports resolve; replace broken refs with bundled assets that exist
- Add `loading="lazy"`, `decoding="async"`, `onError` fallback to a known asset
- Keep auto-slide + manual dots; ensure responsive height

## 4. Auth persistence
- Audit Splash/Login/Signup — remove code that overwrites localStorage `user` with defaults on every load
- Use `supabase.auth.onAuthStateChange` + initial `getSession()` only; pull display data from `profiles` (extend table with `display_name`, `avatar_url`, `email` columns via migration)
- Profile edits write to `profiles` table, not just localStorage
- After login/signup, navigate without clearing user data; refresh restores session via Supabase's built-in `persistSession: true` (already enabled)

## 5. Tools — visit button, descriptions, pricing, logos
- `ToolDetail.tsx`: make "Visit Website" anchor with `tool.url` (or fallback `https://www.google.com/search?q=<name>`) `target="_blank" rel="noopener"`
- Add 3-paragraph generated description block (templated from category/name/features so it works for all 500+ tools without manual copy)
- Mark 75% of tools as paid: deterministic by `id` hash in `src/data/tools.ts` getter, badge shown on cards
- Ensure `<img src={tool.logo}>` with `onError` fallback to a generic AI icon — show on cards and detail

## 6. SEO findings
- A11y: add `aria-label` to icon-only buttons (search, favorite heart, modal close, slider dots)
- Add descriptor under H1s on Home/Chatbot
- Sitemap: extend `scripts/generate-sitemap.ts` to iterate `tools` and emit `/tools/:id` entries
- GSC: cannot auto-fix (requires user OAuth) — leave note in response

## 7. Layout polish
- `WelcomeFooter`: add `lg:px-16 xl:px-24` side padding
- `Profile.tsx`: add bottom padding + gap around action buttons
- Back arrow: shared `BackButton` component using `navigate(-1)` with history fallback to `/home`; ensure used in Chatbot and other inner pages
- Menu/nav bar: make `Layout` nav animated entrance (framer `motion.nav initial slide-down`) and visible on every page including Chatbot
- Page transitions: wrap route outlets in `AnimatePresence` with `initial={{y: 24, opacity: 0}} animate={{y:0, opacity:1}}` (drag-up feel)
- Chatbot math: render LaTeX via `react-katex` + system-prompt nudge to emit `$$ ... $$` for long division / equations; install `katex react-katex`
- Mobile: review key pages for `px-4`, stack grids, ensure FAB doesn't overlap content (`pb-24` on scroll containers)

## Technical notes
- New deps: `katex`, `react-katex` (small, used only in Chatbot)
- One migration: `alter table profiles add column display_name text, add column avatar_url text, add column email text;` + grants already in place
- All appearance state lives in one context; CSS variables it writes are scoped to `:root` so no component refactor required
- No removal of existing components — only extension

## What I won't do this turn
- Google Search Console connection (needs user OAuth) — I'll surface the connect action
- Custom email templates (none exist yet)
- Stripe (waiting for your key as previously agreed)

Approve and I'll ship it.