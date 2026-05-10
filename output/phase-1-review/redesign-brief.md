# Redesign Brief — Diego Said Portfolio

**Date**: 2026-05-08  
**Status**: Phase 1 Review — Pending Approval  
**Swarm**: 6 specialized design agents  
**Scope**: Visual layer redesign (look & feel only) — preserve all functionality, routes, and content

---

## Executive Summary

The Diego Said portfolio is a **technically sophisticated site with excellent micro-interactions** (MechanicalButton, terminal panel, pan wipe dividers, typewriter eyebrows) but suffers from **systemic issues in accessibility, color logic, typography ergonomics, and brand expression**. The core brand promise — *"Where Symmetry Is Policy"* — is spoken but not shown. The site achieves "premium developer portfolio" (Stripe level) but falls short of "luxury real estate technologist" (RIMOWA/Aman level).

**This brief unifies the swarm's top 10 consensus changes into a single redesign direction.**

---

## Design Direction

### From → To

| Dimension | Current State | Target State |
|-----------|--------------|--------------|
| **Accessibility** | 16 WCAG failures, invisible focus states, no skip link | WCAG 2.1 AA compliant, cobalt focus rings, full keyboard nav |
| **Color Logic** | Erratic section rhythm, stone overuse, blush fatigue | State-machine mapping: Ink=Proof, Creme=Work, Blush=Identity |
| **Typography** | Courier Prime body (fatiguing), tight display line-heights, all-caps overload | Source Serif 4 body (editorial), safe line-heights, selective uppercase |
| **Texture** | Flat solid colors, no tactile depth | Subtle grid patterns, card top gradients, noise overlays |
| **Motion** | Monotonous `power2.out` everywhere, Lenis/GSAP drift, no reduced-motion | Signature/dramatic easing variety, synced scroll, accessible fallback |
| **Brand Expression** | Symmetry is verbal only; generic cards; diorama is copy-only | Symmetry in layout; museum-frame cards; diorama as visual language |
| **Luxury Positioning** | "Premium dev portfolio" — eager to delight | "Confident systems architect" — still, precise, material |

---

## Token System Changes

### Color Tokens

| Token | Current | New | Usage |
|-------|---------|-----|-------|
| `stone` | `#C4BFB5` | `#C4BFB5` (unchanged) | **Decorative only** — borders, dividers on dark sections |
| `stone-text` | *missing* | `#8A8579` | Muted text on creme (5.8:1) |
| `text-secondary` | *missing* | `text-ink/65` | All body copy, descriptions, metadata on light surfaces |
| `border-light` | *missing* | `border-ink/10` | Card borders on creme/parchment/blush |

### Surface Rules

```
DARK SECTIONS (ink bg)
├── Primary text:    creme
├── Secondary text:  stone (eyebrows only)
├── Accents:         cobalt (interactive), terracotta (CTA), sage (success)
├── Borders:         stone/30
└── Texture:         noise overlay + subtle cobalt glow orb

LIGHT SECTIONS (creme / parchment bg)
├── Primary text:    ink
├── Secondary text:  ink/65
├── Accents:         cobalt (links), oxblood (hover)
├── Borders:         ink/10
└── Texture:         pattern-grid at 3% + card top gradient

WARM SECTIONS (blush bg)
├── Primary text:    ink
├── Secondary text:  ink/65
├── Accents:         cobalt, terracotta
├── Borders:         ink/10
└── Texture:         noise overlay at 2%
```

### Typography Tokens

| Token | Current | New |
|-------|---------|-----|
| Body font | `Courier Prime` | `Source Serif 4` or `Inter` |
| Display-xl | 84px / 0.9em | 80px / 0.94em |
| Display-lg | 64px / 0.92em | 64px / 0.95em |
| Display-md | 42px / 1.0em | 48px / 1.05em |
| Body-lg | *missing* | 18px / 1.6em (new) |
| Mono-text | 13px / 1.6em | 13px / 1.7em |

### Easing Tokens (Use Them!)

| Name | Curve | Use For |
|------|-------|---------|
| `signature` | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary entrances, hero elements |
| `dramatic` | `cubic-bezier(0.87, 0, 0.13, 1)` | Awards, ADR-47, reveals with gravitas |
| `bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover lifts, playful interactions |
| `smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Subtle fades, opacity-only |
| `mechanical` | `cubic-bezier(0.68, -0.2, 0.265, 1.2)` | Button presses, toggle states |

**Rule**: Never use `power2.out` for more than 40% of animations on a single page.

---

## Component Library Spec Changes

### Card
- `rounded-xl` → `rounded-sm` or `rounded-none`
- `border-stone` → `border-ink/10`
- Add top gradient: `from-white/40 to-transparent`
- Hover: `border-cobalt` transition (not lift+shadow)

### Tag / Pill
- `rounded-full bg-ink text-creme` → `rounded-none border border-ink/20 text-ink/80 bg-transparent`
- Or: sharp rectangle with subtle fill

### SectionEyebrow
- On blush sections: pass `color="text-ink/50"` or `color="text-cobalt"`
- On creme sections: keep `text-stone` only if it's decorative (not functional)

### MechanicalButton
- Add `focus-visible:ring-2 focus-visible:ring-cobalt` to base classes

### Navbar
- Add `scroll-padding-top: 5rem` globally
- Add entrance animation: `translateY(-12px) → 0` on load

### Footer
- Add ScrollTrigger entrance: staggered column reveal

---

## Section-by-Section Changes

| # | Section | Background Change | Key Visual Change |
|---|---------|-------------------|-------------------|
| 1 | Hero | None | Add diamond watermark (low opacity). Safe line-heights. |
| 2 | Manifesto | None | Keep ink. Courier Prime → Source Serif 4 for manifesto words. |
| 3 | Projects | None (creme) | Sharper cards, border-only tags, diorama framing (inset shadow + glass gradient). Fix orphan grid. |
| 4 | ADR-47 | None | Fix label contrast: `text-terracotta` instead of `text-oxblood`. |
| 5 | Profile | None (blush) | Fix eyebrow contrast. Keep terminal panel. |
| 6 | Timeline | **creme → blush** | Sharper cards, remove bouncy dots, mobile: left-border accent instead of line. |
| 7 | Skills | None (ink) | Fix diamond contrast: `border-creme`. Keep constellation concept. |
| 8 | Awards | **blush → creme** | Sharper cards, replace trophy icon with geometric mark. |
| 9 | Contact | None (creme) | Replace submit with `MechanicalButton`. Add required asterisks. Fix focus states. |
| 10 | Social | None (ink) | None major. |
| 11 | Blog Preview | **blush → ink** | Cards become `bg-ink/50 border-cobalt/20` with creme text. Dramatic "reading room." |

---

## Accessibility Requirements

- [ ] Skip-to-content link (first focusable element)
- [ ] Global `:focus-visible` cobalt outline (2px, 2px offset)
- [ ] Mobile menu: focus trap, Escape key, `aria-controls`, focus return
- [ ] Contact form: `aria-invalid`, `aria-describedby`, required asterisks, `aria-live` success
- [ ] `prefers-reduced-motion`: zero durations, instant reveals, poster frames for videos
- [ ] Video controls: pause/stop for autoplaying videos
- [ ] Touch targets: minimum 44×44px for all interactive elements

---

## Recommended Tech Changes

| File | Change |
|------|--------|
| `index.html` | Add `Source Serif 4` or `Inter` to Google Fonts load. Add `&subset=latin`. Consider Outfit variable font. |
| `tailwind.config.js` | Update type scale. Add `text-secondary` and `border-light` colors. Add `will-change-transform-opacity` utility. |
| `src/index.css` | Add `:focus-visible` global styles. Add `@media (prefers-reduced-motion: reduce)`. Add `scroll-padding-top: 5rem` on `html`. |
| `src/components/Layout.tsx` | Bridge Lenis → `ScrollTrigger.update()`. Drive Lenis via `gsap.ticker`. |
| `src/components/Navbar.tsx` | Add skip link. Add focus trap & Escape. Add entrance animation. |
| `src/components/MechanicalButton.tsx` | Add `focus-visible:ring-2 focus-visible:ring-cobalt`. |
| `src/components/SectionEyebrow.tsx` | Accept `color` prop properly on all instances. |
| `src/sections/Section09Contact.tsx` | Replace raw submit button with `MechanicalButton`. Add ARIA attributes. Rewrite error messages. |

---

## Success Criteria

1. **Accessibility**: Lighthouse Accessibility score ≥ 95
2. **Contrast**: All text/background pairs ≥ 4.5:1 (AA)
3. **Brand Alignment**: Section average score ≥ 8.0/10
4. **Performance**: No layout thrashing on scroll. `will-change` applied and removed correctly.
5. **Motion**: `prefers-reduced-motion` fully supported. Lenis/GSAP synchronized.
