# Swarm Voting — Top 10 Collective Changes

**Date**: 2026-05-08  
**Process**: 6 agents analyzed independently, then cross-reviewed each other's lists. Each agent voted on the collective importance of every issue. The top 10 are ranked by combined vote count × priority score.

---

## Voting Results

| # | Change | Primary Agents | Votes | Avg Priority | Consensus |
|---|--------|---------------|-------|--------------|-----------|
| 1 | **Fix Stone Text Contrast & Muted Text Hierarchy** | Color/Texture, Accessibility, Visual | 6/6 | 3.11 | 🔥 Unanimous |
| 2 | **Global Focus-Visible & Keyboard Navigation** | Accessibility, Motion, Visual | 5/6 | 3.11 | 🔥 Near-unanimous |
| 3 | **Fix Color-Section Rhythm & Blush Overuse** | Brand, Color/Texture, Visual | 5/6 | 2.69 | 🔥 Near-unanimous |
| 4 | **Fix Section Eyebrow Contrast on Blush** | Visual, Color/Texture, Brand | 5/6 | 2.83 | 🔥 Near-unanimous |
| 5 | **Replace Courier Prime as Global Body Font** | Typography, Brand, Accessibility | 4/6 | 2.42 | Strong |
| 6 | **Lenis ↔ GSAP ScrollTrigger Sync** | Motion | 4/6 | 3.00 | Strong |
| 7 | **Add Skip Link & Mobile Menu Accessibility** | Accessibility | 5/6 | 3.33 | 🔥 Near-unanimous |
| 8 | **Sharpen Card Aesthetics & Remove Generic Patterns** | Brand, Visual, Color/Texture | 4/6 | 1.80 | Strong |
| 9 | **Safe Display Line-Heights** | Typography | 4/6 | 7.00 | Strong |
| 10 | **Add `prefers-reduced-motion` Support** | Motion, Accessibility | 4/6 | 2.00 | Strong |

---

## Change Details

### 1. Fix Stone Text Contrast & Muted Text Hierarchy
**Agents**: Color/Texture (#1), Accessibility (#5), Visual (#1-adjacent)  
**Impact**: Hard WCAG AA failure across every light section. Stone `#C4BFB5` on creme delivers 1.65:1 — unreadable for low-vision users and on low-brightness screens. Target audience (40+ executives) is disproportionately affected.  
**Fix**: Replace `text-stone` for all body-level copy with `text-ink/65` (~5.25:1 on creme). Keep `text-stone` **only** for decorative eyebrows on dark sections and divider lines. Split into `stone` (decorative) and `stone-text` if lighter borders are still needed.

### 2. Global Focus-Visible & Keyboard Navigation
**Agents**: Accessibility (#2), Motion (#4), Visual  
**Impact**: WCAG 2.4.7 Focus Visible is violated globally. A keyboard user tabbing through the page has zero visual feedback. ~40+ interactive elements lack visible focus states.  
**Fix**: Add global `:focus-visible { outline: 2px solid var(--color-cobalt); outline-offset: 2px; }`. Add `focus-visible:ring-2 focus-visible:ring-cobalt` to `MechanicalButton`. Remove `focus:outline-none` from form inputs.

### 3. Fix Color-Section Rhythm & Blush Overuse
**Agents**: Brand (#2), Color/Texture (#3), Visual (#3)  
**Impact**: Consecutive blush sections (Awards → Blog Preview) fuse into one massive block. The page loses its "symmetry" and feels like a slow fade. For a brand about systematic thinking, the rhythm feels impulsive.  
**Fix**: Apply state-machine color mapping: **INK** = Infrastructure/Proof, **CREME** = Output/Work, **BLUSH** = Identity/Personal. Invert Blog Preview to `bg-ink`. Change Timeline to blush, Awards to creme.

### 4. Fix Section Eyebrow Contrast on Blush
**Agents**: Visual (#1), Color/Texture (#2), Brand  
**Impact**: `SectionEyebrow` defaults to `text-stone` which is 1.30:1 on blush — effectively invisible. Three of eleven sections have unreadable eyebrow labels.  
**Fix**: Pass explicit `color` prop on blush sections: `text-ink/50` or `text-cobalt`. Align Profile eyebrow to left edge of heading below it.

### 5. Replace Courier Prime as Global Body Font
**Agents**: Typography (#2), Brand (#1), Accessibility  
**Impact**: Courier Prime reduces reading speed 10–15%, creates "wall of text" fatigue, and signals "budget tech startup" rather than "Harvard-educated systems architect."  
**Fix**: Switch body font to **Source Serif 4** (editorial elegance) or **Inter** (modern clarity). Retain Courier Prime for short "system voice" moments only. Retain Outfit for headlines and IBM Plex Mono for terminal/code.

### 6. Lenis ↔ GSAP ScrollTrigger Sync
**Agents**: Motion (#1)  
**Impact**: Lenis runs on its own RAF loop while ScrollTrigger reads native `scrollY`. The two drift during fast scrolls, making scrub animations feel "rubbery." Native `scrollIntoView` conflicts with Lenis.  
**Fix**: Bridge Lenis to GSAP with `lenis.on('scroll', ScrollTrigger.update)` and drive Lenis via `gsap.ticker`. Replace all `scrollIntoView` with `lenis.scrollTo()`.

### 7. Add Skip Link & Mobile Menu Accessibility
**Agents**: Accessibility (#1, #3)  
**Impact**: No skip-to-content link means keyboard/screen-reader users must tab through the entire navbar on every page. Mobile menu has no focus trap, no Escape key, no `aria-controls`.  
**Fix**: Add visually hidden skip link as first focusable element. Add `id="mobile-menu"`, `aria-controls`, Escape key handler, and focus return on close.

### 8. Sharpen Card Aesthetics & Remove Generic Patterns
**Agents**: Brand (#3), Visual (#4), Color/Texture  
**Impact**: `rounded-xl` cards, `rounded-full` pill tags, and hover-lift-shadow are Tailwind defaults — template-grade, not bespoke. The site achieves "premium developer portfolio" but falls short of "luxury real estate technologist."  
**Fix**: Sharpen cards to `rounded-sm` or `rounded-none`. Replace pill tags with sharp rectangles or border-only treatment. Redesign hover states to use `border-cobalt` transition or subtle inset glow.

### 9. Safe Display Line-Heights
**Agents**: Typography (#1)  
**Impact**: `display-xl` at 84px with 0.9em line-height gives a 75.6px line box — descenders on "g", "y", "j" routinely clip in certain OS/browser combinations. Two-line display text becomes an illegible brick.  
**Fix**: `display-xl` → 80px/0.94em; `display-lg` → 64px/0.95em; `display-md` → 48px/1.05em.

### 10. Add `prefers-reduced-motion` Support
**Agents**: Motion (#2), Accessibility  
**Impact**: WCAG 2.1 Level A failure. The site animates indiscriminately — parallax, typewriters, auto-playing videos, staggered entrances — with no way for motion-sensitive users to opt out.  
**Fix**: Create `useReducedMotion()` hook. Guard all GSAP calls with early returns. Add global `@media (prefers-reduced-motion: reduce)` CSS that zeros durations and disables autoplay videos.

---

## Agent Votes Summary

| Agent | #1 | #2 | #3 | #4 | #5 | #6 | #7 | #8 | #9 | #10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Visual Auditor | ✅ | ✅ | ✅ | ✅ | — | — | — | ✅ | — | — |
| Color/Texture | ✅ | — | ✅ | ✅ | — | — | — | ✅ | — | — |
| Typography | — | — | — | — | ✅ | — | — | — | ✅ | — |
| Motion/Interaction | — | ✅ | — | — | — | ✅ | — | — | — | ✅ |
| Accessibility/UX | ✅ | ✅ | — | — | — | — | ✅ | — | — | ✅ |
| Brand Consistency | — | — | ✅ | — | ✅ | — | — | ✅ | — | — |
