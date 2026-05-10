# Implementation Roadmap — Diego Said Portfolio Redesign

**Date**: 2026-05-08  
**Status**: Phase 1 Review — Pending Approval  
**Scope**: Visual layer redesign (look & feel only) — preserve all functionality, routes, and content

---

## Quick Wins (Day 1 — ~4 hours)

These changes deliver maximum visual and accessibility impact with minimal risk.

| # | Change | Files | Effort | Impact |
|---|--------|-------|--------|--------|
| 1 | **Fix Stone text contrast** — Replace `text-stone` body copy with `text-ink/65` | `tailwind.config.js`, `index.css`, all section files | 45 min | Critical |
| 2 | **Add global focus-visible styles** — Cobalt outline, 2px offset | `src/index.css` | 15 min | Critical |
| 3 | **Add skip-to-content link** | `src/components/Layout.tsx`, `src/components/Navbar.tsx` | 15 min | High |
| 4 | **Fix eyebrow contrast on blush** — Pass explicit color prop | `src/sections/Section05Profile.tsx`, `Section08Awards.tsx`, `Section11BlogPreview.tsx` | 15 min | High |
| 5 | **Fix navbar anchor offset** — `scroll-padding-top: 5rem` | `src/index.css` | 5 min | High |
| 6 | **Safe display line-heights** — Update tailwind tokens | `tailwind.config.js` | 10 min | High |
| 7 | **Fix mobile menu** — Escape key, focus trap, `aria-controls` | `src/components/Navbar.tsx` | 45 min | Critical |
| 8 | **Contact form ARIA** — `aria-invalid`, `aria-describedby`, required asterisks | `src/sections/Section09Contact.tsx` | 30 min | Critical |
| 9 | **Replace Contact submit with MechanicalButton** | `src/sections/Section09Contact.tsx` | 15 min | Medium |
| 10 | **Fix Cobalt/Oxblood on ink contrast** — Use terracotta for labels | `src/sections/Section04Adr47.tsx`, `Section07Skills.tsx` | 15 min | High |

**Day 1 Deliverable**: All hard WCAG AA failures eliminated. Lighthouse Accessibility score ≥ 90.

---

## Short-Term Redesigns (Week 1 — ~8 hours)

These changes restructure the visual language without new components.

| # | Change | Files | Effort | Impact |
|---|--------|-------|--------|--------|
| 11 | **Body font swap** — Add Source Serif 4, replace Courier Prime globally | `index.html`, `src/index.css`, all sections | 2 hrs | High |
| 12 | **Color-section rhythm fix** — Blog Preview → ink, Timeline → blush, Awards → creme | `src/sections/Section06Timeline.tsx`, `Section08Awards.tsx`, `Section11BlogPreview.tsx` | 45 min | High |
| 13 | **Sharpen card aesthetics** — `rounded-xl` → `rounded-sm` or `rounded-none`, border-only tags | `src/sections/Section03Projects.tsx`, `Section06Timeline.tsx`, `Section08Awards.tsx`, `Section11BlogPreview.tsx` | 2 hrs | High |
| 14 | **Diorama framing** — Inset shadow + glass gradient on project thumbnails | `src/sections/Section03Projects.tsx` | 1 hr | Medium |
| 15 | **Texture layers** — Grid pattern on light sections, noise on blush, card top gradients | `src/index.css`, section CSS | 1.5 hrs | Medium |
| 16 | **Geometric award icon** — Replace trophy with diamond motif | `src/sections/Section08Awards.tsx` | 30 min | Medium |
| 17 | **Add `prefers-reduced-motion`** — Hook + global CSS + GSAP guards | `src/hooks/use-reduced-motion.ts`, `src/index.css`, all sections | 1.5 hrs | Critical |

**Week 1 Deliverable**: Cohesive visual language established. Brand alignment score ≥ 7.5/10.

---

## Deep Redesigns (Week 2–3 — ~16 hours)

These changes require structural or architectural work.

| # | Change | Files | Effort | Impact |
|---|--------|-------|--------|--------|
| 18 | **Lenis ↔ GSAP sync** — Bridge RAF loops, replace `scrollIntoView` | `src/components/Layout.tsx`, `src/components/Navbar.tsx`, `src/sections/Section09Contact.tsx` | 3 hrs | Critical |
| 19 | **Animation rhythm variety** — Section-specific entrance vocabularies | All 11 section files | 4 hrs | Medium |
| 20 | **GPU compositing** — `will-change` utility, batch Timeline animations | `tailwind.config.js`, `src/sections/Section06Timeline.tsx` | 2 hrs | Medium |
| 21 | **Navbar/Footer entrance animations** — ScrollTrigger + CSS | `src/components/Navbar.tsx`, `src/components/Footer.tsx` | 1.5 hrs | Low |
| 22 | **Page transitions** — Framer Motion `AnimatePresence` | `src/App.tsx` | 2 hrs | Medium |
| 23 | **Skills constellation** — Orbital rings instead of flex-wrap | `src/sections/Section07Skills.tsx` | 4 hrs | High |
| 24 | **Symmetry in layout** — Diamond watermark, centered compositions | `src/sections/Section01Hero.tsx`, `Section03Projects.tsx`, `Section08Awards.tsx` | 3 hrs | High |
| 25 | **Font loading optimization** — Subsetting, variable font for Outfit | `index.html` | 1 hr | Medium |

**Week 2–3 Deliverable**: Production-ready motion system. Lighthouse Performance ≥ 90.

---

## Testing Checklist

### Accessibility
- [ ] Keyboard-only navigation works end-to-end
- [ ] Screen reader rotor shows labeled landmarks
- [ ] All interactive elements have visible focus states
- [ ] Mobile menu: Escape closes, focus returns to trigger
- [ ] Contact form errors announced via `aria-live`
- [ ] `prefers-reduced-motion`: all animations disabled, text visible immediately
- [ ] Video pause/stop controls available
- [ ] Touch targets ≥ 44×44px

### Visual
- [ ] All text/background pairs ≥ 4.5:1 contrast
- [ ] Color rhythm: no consecutive same-family sections
- [ ] Cards have consistent sharp corners and border treatments
- [ ] Tags are border-only (not pill shapes)
- [ ] Display line-heights don't clip descenders
- [ ] Body font reads comfortably for 5+ paragraphs

### Motion
- [ ] Lenis smooth scroll + GSAP ScrollTrigger synchronized
- [ ] No jank on fast scroll (60fps)
- [ ] `will-change` applied before animation, removed after
- [ ] Entrance animations varied per section (not all `power2.out`)
- [ ] Hover states feel instantaneous (< 350ms)

### Responsive
- [ ] Mobile: timeline is single-column with left-border accents
- [ ] Mobile: project grid is single column
- [ ] Tablet: 2-column grids behave correctly
- [ ] Desktop: no orphaned grid items
- [ ] `100dvh` works correctly on iOS Safari

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Font swap causes layout shift | Medium | Use `font-display: swap`, preload critical fonts |
| Color changes break existing screenshots/marketing | Low | Palette hexes unchanged; only usage rules change |
| `rounded-sm` feels too harsh | Medium | A/B test `rounded-sm` vs `rounded-md` on Projects cards |
| Source Serif 4 not available in all weights | Low | Fallback to Georgia/serif stack |
| Lenis sync refactor breaks scroll behaviors | Medium | Test all `scrub: true` sections after change |
| `prefers-reduced-motion` kills all delight | Low | Keep opacity fades (0ms duration = instant) |

---

## Post-Launch Metrics

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Lighthouse Accessibility | ~65 | ≥ 95 |
| Lighthouse Performance | ~75 | ≥ 90 |
| Lighthouse Best Practices | ~80 | ≥ 95 |
| Brand Alignment Score | 6.8/10 | ≥ 8.5/10 |
| WCAG 2.1 AA Pass Rate | 19/43 | ≥ 40/43 |
| Avg. Time on Page | Unknown | +20% |
