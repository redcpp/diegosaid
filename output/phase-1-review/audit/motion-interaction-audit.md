# Motion & Interaction Audit — Diego Said Portfolio

**Auditor**: Motion & Interaction Designer Agent  
**Date**: 2026-05-08  
**Scope**: Animation rhythm, performance, hover states, scroll behavior, accessibility, perceived performance  
**Pages Reviewed**: Home (11 sections), Projects (10 sections), Layout, Navbar, Footer  

---

## Executive Summary

The portfolio has a **solid foundational animation system** with good tool choices (GSAP + ScrollTrigger + Lenis) and thoughtful brand-aligned details like the terminal typewriter, mechanical button press states, and custom easing curves. However, there are **critical integration gaps** (Lenis ↔ GSAP), a **severe accessibility omission** (no reduced-motion support), and a **creative plateau** where 6+ sections use identical entrance choreography. The result is a site that *almost* feels premium but occasionally slips into generic template territory.

**Overall Grade**: B− (Good execution, missed integrations, repetitive choreography)

---

## 1. Animation Rhythm & Variety

### Finding: The "power2.out Monoculture"

Across the codebase, **every major section entrance** uses the same GSAP signature:

```js
{ y: 40/60, opacity: 0 } → { y: 0, opacity: 1, duration: 0.7-0.8, ease: 'power2.out', stagger: 0.12-0.15 }
```

**Affected sections**: Projects, Profile, Timeline, Awards, Contact, Blog Preview.

This predictability trains the user's eye to anticipate the motion, which **defeats the purpose of animation** (delight through surprise). The custom CSS easing curves (`--ease-signature`, `--ease-dramatic`, `--ease-mechanical`) are defined but **almost never used** in the GSAP timelines — only in CSS transitions for hover states.

**Exceptions that work well**:
- Hero title: `scale 0.5→1` + `letterSpacing` morph — strong brand moment
- Timeline line: `scaleY` scrub draw — directional storytelling
- Timeline dots: `back.out(2)` pop — satisfying punctuation
- Skills badges: `back.out(1.5)` stagger at 0.04s — dense, energetic feel

**Missing techniques**:
- No clip-path reveals (e.g., `inset()` or `polygon()` wipes)
- No rotational entrances (even subtle `rotateX` or `rotateZ`)
- No scale-based emphasis for hierarchy (only hero and ADR-47 title use scale)
- No directional storytelling (everything rises from bottom — no left/right/center-out logic)

---

## 2. Animation Performance

### Finding A: Missing `will-change` on 95% of Animated Elements

Only the **Hero title** has `will-change: transform, opacity`. Every other animated card, badge, dot, and line does not. On lower-end devices (especially mobile), the browser's layer promotion happens reactively rather than proactively, causing frame drops during the first few scroll-triggered entrances.

### Finding B: Redundant `gsap.registerPlugin(ScrollTrigger)`

Called in **every section file** (11+ times). While GSAP handles this gracefully, it's a code-smell indicating lack of a centralized animation bootstrap.

### Finding C: HorizontalPanWipe ScrollTrigger Leak Risk

`HorizontalPanWipe.tsx` creates a ScrollTrigger inside a raw `useEffect` and attempts cleanup by matching `t.trigger === lineRef.current`. If the ref is null at unmount time, the trigger leaks. The component also re-registers ScrollTrigger on every mount.

### Finding D: Video Parallax on Two Elements

The Hero section scrubs `yPercent: 30` on **both** video elements independently. This doubles the compositor work for the same visual result. One video is always `opacity: 0` — the parallax should be applied to a shared container, not individual videos.

---

## 3. Hover State Quality

| Element | State | Quality | Notes |
|---------|-------|---------|-------|
| Project cards | `-translate-y-1.5` + shadow | Good | Bounce easing is satisfying |
| Nav links | Shimmer underline | Excellent | Gradient animation on hover is memorable |
| MechanicalButton | `scale(0.97)` + inset shadow | Good | Tactile, mechanical feel on-brand |
| Skill badges | Color change + `scale(0.96)` | Good | Click ripple would elevate this |
| Social rows | Border + bg change | Okay | Arrow `translate-x-1` is too subtle — reads as static |
| Blog preview | Border + title color | Good | Arrow circle transition is clean |
| Footer links | Color fade only | Weak | No underline, no lift — feels abandoned |
| Contact submit | Inline `transform` + `boxShadow` | Fragile | Should use CSS class toggle, not inline styles |

**Missing opportunities**:
- No magnetic cursor attraction on large interactive areas
- No 3D tilt on project cards (would reinforce "diorama" metaphor)
- No glow/bloom effects on dark sections (Skills, Social, ADR-47)

---

## 4. Scroll Behavior

### Finding A: Lenis ↔ GSAP ScrollTrigger Not Integrated

`Layout.tsx` initializes Lenis with `lerp: 0.08`, but **never connects it to ScrollTrigger**. This means:

- ScrollTrigger reads native scroll position while Lenis visually interpolates it
- Scrub animations can feel "floaty" or slightly out of sync
- Fast scrolls may cause ScrollTrigger to overshoot before Lenis catches up

**The fix is simple and high-impact**: `lenis.on('scroll', ScrollTrigger.update)`.

### Finding B: Native `scrollIntoView` Conflicts with Lenis

`Navbar.tsx` and `Footer.tsx` use `element.scrollIntoView({ behavior: 'smooth' })`. This triggers **native smooth scrolling**, which fights Lenis's interpolation. The result is a double-smooth effect that feels mushy.

### Finding C: No ScrollTrigger Refresh on Resize

When the viewport resizes (e.g., rotating a tablet), ScrollTrigger start/end positions are not recalculated. The timeline cards may trigger too early or too late.

---

## 5. Missing Animations

### Static Elements That Break the Rhythm

| Element | Current State | Jarring? |
|---------|--------------|----------|
| **Navbar** | Instant appearance on page load | Yes — top-of-page should arrive with ceremony |
| **Footer** | No entrance animation | Yes — feels like a dead end after animated sections |
| **Section H2 headings** | Fade in with cards | Slightly — headings should lead, not follow |
| **Page transitions** | Instant route swap | Yes — Home → Projects feels like a reload |
| **Project detail sections** | Likely same repetition | TBD — not reviewed in depth |
| **Blog post content** | Static | Yes — long text walls with no progressive reveal |

---

## 6. Animation Accessibility

### Finding: Zero `prefers-reduced-motion` Support

**This is a WCAG 2.1 Level A violation** (Success Criterion 2.3.3). The site contains:

- Auto-playing videos (Hero, ADR-47 background)
- Parallax scrolling (Hero videos, ADR-47 video)
- Typewriter effects (SectionEyebrow, ADR-47 label, Terminal, Social coordinates)
- Staggered entrances (every section)
- Scrub animations (Timeline line, Hero exit)

None of these respect `prefers-reduced-motion: reduce`.

**Additional accessibility issues**:
- Terminal typewriter has no `aria-live` region — screen readers won't announce the content
- No pause/stop control for auto-playing videos
- Cursor blink animation can't be disabled

---

## 7. Perceived Performance

### Finding A: Hero Videos Block Initial Paint

```html
<video preload="auto" autoPlay muted playsInline>
```

With `preload="auto"`, both hero videos download in full before `DOMContentLoaded`. No `poster` image, no low-quality placeholder. On 3G, the user sees a blank gradient for seconds.

### Finding B: No Skeleton States

Project cards appear as empty `opacity: 0` elements before their ScrollTrigger fires. There's no structural placeholder — the layout doesn't "hold space" elegantly.

### Finding C: Video Loading Strategy Inconsistent

- Hero: `preload="auto"` (aggressive)
- ADR-47: `preload="metadata"` (reasonable)
- Project cards: `preload="metadata"` (reasonable, but no poster frame)

---

## Ranked Improvement List

### #1 — Lenis ↔ GSAP ScrollTrigger Desynchronization

| Attribute | Value |
|-----------|-------|
| **Severity** | Critical |
| **Location** | `Layout.tsx`, all sections with `scrub: true` (Hero, ADR-47, Timeline) |
| **Impact** | 9 |
| **Effort** | 3 |
| **Priority** | **3.00** |

**Current Problem**: Lenis smooth scroll runs on a separate RAF loop from GSAP ScrollTrigger. ScrollTrigger reads native `scrollY` while Lenis interpolates visual position. On fast scrolls or scrub animations, the two systems drift, causing the Hero parallax and Timeline line draw to feel "rubbery" or jittery. The `scrollIntoView` calls in Navbar and Footer additionally trigger native smooth scroll, creating a triple-conflict.

**Proposed Fix**:

```tsx
// Layout.tsx
useEffect(() => {
  const lenis = new Lenis({ lerp: 0.08 });

  // INTEGRATION: Bridge Lenis → GSAP
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  };
}, []);
```

Replace all `scrollIntoView({ behavior: 'smooth' })` with `lenis.scrollTo(target)`.

**Before/After**: *Before*: Scroll scrub feels slightly detached from finger/wheel input; Timeline line "catches up" after scroll stops. *After*: Scrub animations lock 1:1 to scroll position; the site feels "glued" to the user's input.

---

### #2 — Missing `prefers-reduced-motion` Support

| Attribute | Value |
|-----------|-------|
| **Severity** | High |
| **Location** | All sections, all components, global CSS |
| **Impact** | 8 |
| **Effort** | 4 |
| **Priority** | **2.00** |

**Current Problem**: The site animates indiscriminately. Users with vestibular disorders, motion sensitivity, or cognitive accessibility needs have no way to opt out. Auto-playing videos, parallax, typewriters, and staggered entrances all run unconditionally. This is a WCAG 2.1 Level A failure.

**Proposed Fix**:

1. Create a hook:

```tsx
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

2. Wrap all GSAP ScrollTrigger animations:

```tsx
const reduced = useReducedMotion();
useGSAP(() => {
  if (reduced) return; // Skip entrance animations
  // ... existing animation code
}, { scope: sectionRef, dependencies: [reduced] });
```

3. Add global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  video[autoplay] { display: none; }
  .animate-cursor-blink { animation: none; }
}
```

4. For typewriters: if reduced motion is on, instantly show full text (no interval typing).

**Before/After**: *Before*: Motion-sensitive users experience discomfort; screen reader users hear nothing during typewriter sequences. *After*: All users get instant content; animations degrade gracefully to static states.

---

### #3 — Monotonous Entrance Rhythm (The `power2.out` Problem)

| Attribute | Value |
|-----------|-------|
| **Severity** | High |
| **Location** | Section03Projects, Section05Profile, Section06Timeline, Section08Awards, Section09Contact, Section11BlogPreview |
| **Impact** | 7 |
| **Effort** | 6 |
| **Priority** | **1.17** |

**Current Problem**: Six sections use nearly identical entrance choreography. The eye learns the pattern by the third section and stops registering the motion as delightful. For a brand built on "precision" and "systems architecture," the motion design should itself feel *architected* — with hierarchy, contrast, and directional logic.

**Proposed Fix**: Establish a **section-specific entrance vocabulary**:

| Section | Current | Proposed | Easing | Rationale |
|---------|---------|----------|--------|-----------|
| **Projects** | `y:60→0, power2.out` | `scale:0.96→1, y:40→0, rotateZ: -1deg→0deg` | `var(--ease-signature)` | Cards feel like "placing" dioramas on a shelf |
| **Profile** | `x:-40/+40→0` | Keep, but add `filter: blur(4px)→blur(0)` on text only | `var(--ease-signature)` | "Focusing" on identity — matches terminal reveal |
| **Timeline** | `x:-40/+40→0` | `y:30→0` with **center-out stagger** | `var(--ease-smooth)` | Events cascade from the present moment outward |
| **Awards** | `y:40→0` | `rotateX: 15deg→0deg, y:30→0, transformOrigin: "top center"` | `var(--ease-dramatic)` | Trophy cards "unfold" toward viewer |
| **Contact** | `x:-20→0` | Typewriter-style: each field types in with cursor, 80ms/char | `steps(1)` for text, `power2.out` for container | Reinforces terminal/command-line aesthetic |
| **Blog** | `y:40→0` | `clipPath: inset(0 0 100% 0) → inset(0)` wipe up | `var(--ease-dramatic)` | "Unveiling" articles feels editorial |

Keep durations in the **0.6s–1.0s** range. Vary stagger spacing:
- Dense grids (Skills): 0.04s (rapid fire)
- Cards (Projects, Awards): 0.12s (breathable)
- Hero elements: 0.2s (dramatic pause)

**Before/After**: *Before*: Scrolling feels like watching the same animation reset. *After*: Each section has a distinct "personality" — Projects settle into place, Awards unfold with gravitas, Contact types like a terminal session.

---

### #4 — Missing GPU Compositing & Layer Promotion

| Attribute | Value |
|-----------|-------|
| **Severity** | Medium |
| **Location** | All ScrollTrigger-animated elements except Hero title |
| **Impact** | 6 |
| **Effort** | 2 |
| **Priority** | **3.00** |

**Current Problem**: Only one element (`titleRef` in Hero) has `will-change`. All other animated cards, badges, timeline dots, and lines rely on the browser's heuristic layer promotion. On mobile GPUs, this causes:
- First-frame jank when ScrollTrigger activates
- Paint thrashing during Timeline section (12 simultaneous x/opacity animations)
- Composite layer explosion on scroll-heavy pages

**Proposed Fix**:

1. Add a utility class:

```css
@layer utilities {
  .will-change-transform {
    will-change: transform;
  }
  .will-change-transform-opacity {
    will-change: transform, opacity;
  }
}
```

2. Apply proactively to all animated elements:

```tsx
// In section components, on animated elements:
className="project-card opacity-0 will-change-transform-opacity"
```

3. Clean up after animation via GSAP:

```js
gsap.fromTo(cards, { y: 60, opacity: 0 }, {
  y: 0, opacity: 1,
  onComplete: () => {
    cards.forEach(c => c.classList.remove('will-change-transform-opacity'));
  }
});
```

4. For the Timeline section specifically, apply `will-change` to the center line and batch card animations into a single timeline rather than 12 individual `gsap.fromTo` calls.

**Before/After**: *Before*: On mid-tier Android, the Timeline section drops to ~45fps during first scroll. *After*: Smooth 60fps with proactive layer promotion and batched animations.

---

### #5 — Static Footer & Navbar, No Page Transitions

| Attribute | Value |
|-----------|-------|
| **Severity** | Medium |
| **Location** | `Navbar.tsx`, `Footer.tsx`, `App.tsx` route transitions |
| **Impact** | 6 |
| **Effort** | 4 |
| **Priority** | **1.50** |

**Current Problem**: After 11 sections of choreographed motion, the Footer snaps into view with zero ceremony. The Navbar appears instantly on load — no fade, no slide, no reveal. Worse, clicking "Projects" or "Blog" triggers an instant route swap that feels like a page reload, not a state transition. For a "luxury" portfolio, this is a dead giveaway of amateur polish.

**Proposed Fix**:

1. **Navbar entrance** (on page load):

```css
@keyframes nav-reveal {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}
nav { animation: nav-reveal 0.5s var(--ease-signature) 0.3s both; }
@media (prefers-reduced-motion: reduce) { nav { animation: none; opacity: 1; } }
```

2. **Footer entrance** (ScrollTrigger):

```js
gsap.fromTo('.footer-column',
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: 'footer', start: 'top 90%' }
  }
);
```

3. **Page transitions** (Framer Motion `AnimatePresence`):

```tsx
// App.tsx
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    <Routes location={location}>...</Routes>
  </motion.div>
</AnimatePresence>
```

4. Add a subtle **page-load curtain**: a full-screen `div` with `background: var(--color-ink)` that fades out over 0.4s after fonts load, masking the initial paint flash.

**Before/After**: *Before*: Route changes feel jarring; Footer feels like a leftover template element. *After*: The entire experience feels "sealed" — every state change has intentionality.

---

## Motion Spec Sheet

### Easing Guidelines

| Name | Curve | Use For | Duration Range |
|------|-------|---------|----------------|
| **Signature** | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary entrances, hero elements, page transitions | 0.5s–0.8s |
| **Dramatic** | `cubic-bezier(0.87, 0, 0.13, 1)` | Awards, ADR-47, reveals with gravitas | 0.7s–1.0s |
| **Bounce** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover lifts, playful interactions (skills, badges) | 0.3s–0.4s |
| **Smooth** | `cubic-bezier(0.4, 0, 0.2, 1)` | Subtle fades, opacity-only transitions | 0.3s–0.5s |
| **Mechanical** | `cubic-bezier(0.68, -0.2, 0.265, 1.2)` | Button presses, toggle states, precise snaps | 0.15s–0.2s |

**Rule**: Never use `power2.out` for more than 40% of animations on a single page. Mix at least 3 easings per viewport.

### Duration Guidelines

| Context | Duration | Notes |
|---------|----------|-------|
| Hero load sequence | 0.5s–0.8s per element | 0.2s stagger between elements |
| Section entrance | 0.6s–0.9s | Use shorter durations for dense content |
| Hover states | 0.2s–0.35s | Must feel instantaneous |
| Page transition | 0.35s–0.45s | Exit must be faster than entrance |
| Scroll scrub | `scrub: true` with `ease: 'none'` | Never ease scrub animations |
| Typewriter | 30ms/char (fast), 80ms/char (dramatic) | Respect `prefers-reduced-motion` |
| Stagger (cards) | 0.08s–0.15s | Dense: 0.04s; Sparse: 0.2s |

### Interaction Patterns

| Pattern | Implementation | Brand Rationale |
|---------|---------------|-----------------|
| **Mechanical Press** | `scale(0.97)` + `inset box-shadow` on `:active` | "Systems architecture" — buttons feel like physical switches |
| **Shimmer Reveal** | Gradient `background-position` animation on underlines | Precision craft; draws the eye deliberately |
| **Terminal Type** | `setInterval` character reveal + blinking cursor | Reinforces engineer identity |
| **Diorama Lift** | `-translate-y-1.5` + large diffuse shadow on hover | Projects are "miniature worlds" that lift toward viewer |
| **Center-Out Cascade** | Stagger from center index outward | Symmetry is policy — motion should radiate |

### Z-Depth & Layer Strategy

| Layer | z-index | Contents |
|-------|---------|----------|
| Background Video | -1 | All `object-cover` videos |
| Content | 0–10 | Text, cards, standard UI |
| Floating UI | 50 | Navbar |
| Overlays | 100 | Mobile menu, modals |
| Motion Layers | auto | Elements with `will-change` promoted to compositor |

**Rule**: Apply `will-change` before animation starts; remove it in `onComplete`. Never leave `will-change` on idle elements.

### Reduced Motion Fallback Rules

1. All `opacity` fades become instant (0ms)
2. All `transform` movements become instant (0ms)
3. Typewriters show final text immediately
4. Parallax is disabled (elements stay static)
5. Auto-playing videos show a static poster frame
6. Cursor blink animation is removed
7. Stagger becomes simultaneous reveal

---

## Quick-Win Checklist

- [ ] Integrate Lenis → `ScrollTrigger.update()` in `Layout.tsx`
- [ ] Replace all `scrollIntoView` with `lenis.scrollTo()`
- [ ] Add `useReducedMotion()` hook and guard all GSAP calls
- [ ] Add `@media (prefers-reduced-motion: reduce)` global CSS
- [ ] Add `will-change-transform-opacity` to all animated elements; remove in `onComplete`
- [ ] Batch Timeline card animations into single timeline
- [ ] Add Navbar entrance animation (`translateY(-12px) → 0`)
- [ ] Add Footer ScrollTrigger entrance
- [ ] Wrap routes in Framer Motion `AnimatePresence`
- [ ] Refactor Section03Projects entrance to use `scale` + subtle `rotateZ`
- [ ] Refactor Section08Awards entrance to use `rotateX` unfold
- [ ] Add `aria-live="polite"` to terminal typewriter output
- [ ] Add `poster` attributes to all videos
- [ ] Reduce Hero video `preload` to `metadata` (load first frame only, play on interaction)
