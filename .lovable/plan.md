## Why the Tools page hangs

`src/data/tools.ts` generates **~11,400 tools**, and `src/pages/Tools.tsx` renders every filtered tool in one grid. Each `ToolCard` is a `motion.div` with an entry animation and an `<img>` that hits `google.com/s2/favicons` — so the browser tries to mount ~11,400 animated cards and fire ~11,400 favicon requests at once. That is what freezes the tab for minutes.

## Fix — three changes, frontend only

### 1. Paginate the Tools grid (biggest win)

In `src/pages/Tools.tsx`:
- Add `const PAGE_SIZE = 48` and a `visible` state.
- Slice `filtered.slice(0, visible)` for the grid; reset `visible` to `PAGE_SIZE` whenever `query`, `category`, `sortBy`, or `tierFilter` changes.
- Add a "Load more" button below the grid that adds `PAGE_SIZE` more, plus an `IntersectionObserver` sentinel so scrolling to the bottom auto-loads the next page.
- Debounce the search input (150ms) so typing doesn't re-filter 11k rows on every keystroke.

Result: first paint renders ~48 cards instead of ~11,400.

### 2. Make `ToolCard` cheap at scale

In `src/components/ToolCard.tsx`:
- Add `loading="lazy"` and `decoding="async"` to the logo `<img>`, plus explicit `width={36} height={36}`, so off-screen logos never fetch.
- Skip the framer entry animation past the first ~24 cards: only apply `initial`/`animate` when `index < 24`, otherwise render a plain `<div>`. Motion mount cost is the second-biggest hit after images.
- Keep the existing `onError` avatar fallback so every card still shows a logo.

### 3. Guard the other heavy pages

Same 3-second budget for `Home.tsx`, `Favorites.tsx`, and `Analytics.tsx`:
- Confirm each already caps its list (Home slices per section, Favorites is user-scoped, Analytics uses top-N). Add `loading="lazy"` to any `<img>` in those lists and drop framer entry animations past index 24 the same way.
- No changes to `src/data/tools.ts` — dataset stays at 11,400 tools, we just stop mounting them all at once.

## Out of scope

- Not touching backend, edge functions, or the tools dataset.
- Not virtualizing with `react-window` yet — pagination + lazy images will comfortably hit the 3-second target on mobile. Virtualization becomes worth the complexity only if the user later wants an infinite single-scroll view.

## Technical notes

- `IntersectionObserver` sentinel pattern: a hidden `<div ref={sentinelRef} />` after the grid; on `isIntersecting` call `setVisible(v => v + PAGE_SIZE)`.
- Debounce with a small `useEffect` + `setTimeout`, not a new dependency.
- `categoryCounts` is already memoized via `useMemo(getCategoryCounts, [])` — leave it.
