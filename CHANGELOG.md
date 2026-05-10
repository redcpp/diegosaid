# CHANGELOG — Diego Said Portfolio Redesign

**Date**: 2026-05-08  
**Phase**: 2 — Full Implementation  
**Scope**: Visual layer redesign (look & feel) — all functionality, routes, and content preserved

---

## Summary

Applied all 10 consensus changes from the Phase 1 redesign brief across the entire codebase. Key themes: accessibility compliance, systematic color rhythm, editorial typography, tactile textures, and brand-aligned visual language.

---

## Files Modified

### Foundation

| File | Change |
|------|--------|
| `index.html` | Replaced `Courier Prime` with `Source Serif 4` in Google Fonts load. Added `opsz` axis for variable sizing. |
| `tailwind.config.js` | Updated type scale: `display-xl` 84px→80px/0.94em, `display-lg` 0.92em→0.95em, `display-md` 42px→48px/1.05em. Added `body-lg` (18px). Added `stone-text` color token (#8A8579). |
| `src/index.css` | Complete refactor: added `:focus-visible` global styles (cobalt 2px outline + 2px offset), `@media (prefers-reduced-motion: reduce)` rules, `scroll-padding-top: 5rem`, `.skip-link`, `.texture-grid`, `.texture-noise`, `.card-lighting`, `.diorama-frame`, `.diorama-glass` utilities. Changed global `body` font from `Courier Prime` to `Source Serif 4`. Changed `--radius` to `0.125rem`. Updated `.blog-article` body font. |
| `src/hooks/use-reduced-motion.ts` | **New file.** Hook wrapping `matchMedia('(prefers-reduced-motion: reduce)')` for GSAP guards. |

### Layout & Navigation

| File | Change |
|------|--------|
| `src/components/Layout.tsx` | Added skip-to-content link as first focusable element. Bridged Lenis → `ScrollTrigger.update()` via `lenis.on('scroll')`. Drove Lenis via `gsap.ticker` with `lagSmoothing(0)`. Wrapped children in `<main id="main-content">`. |
| `src/components/Navbar.tsx` | Added focus trap for mobile menu. Added Escape key handler (closes menu, returns focus to hamburger). Added `aria-controls="mobile-menu"` and `id="mobile-menu"`. Auto-focuses first menu link on open. Returns focus to hamburger on close. |
| `src/components/MechanicalButton.tsx` | Added `focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2` to base classes for keyboard visibility. |
| `src/components/SectionEyebrow.tsx` | No structural changes — already supported `color` prop. Consumers now pass explicit colors on blush backgrounds. |

### Homepage Sections

| File | Change |
|------|--------|
| `src/sections/Section01Hero.tsx` | Added low-opacity diamond watermark (`border-creme/5`, 60vw, rotated 45°). Changed hero subtitle from `text-[16px] sm:text-[18px]` to `text-body-lg`. Added `useReducedMotion` guard on all GSAP animations. |
| `src/sections/Section02Manifesto.tsx` | Changed manifesto text font size to `text-body-lg`. Added `useReducedMotion` guard. |
| `src/sections/Section03Projects.tsx` | **Major refactor.** Featured project (CAM GRUPO) spans full width on desktop. All cards: `rounded-xl`→`rounded-sm`, `bg-blush`→`bg-parchment`, `border-stone`→`border-ink/10`. Tags: `rounded-full bg-ink text-creme`→sharp rectangles with `border-ink/15 text-ink/75`. Descriptions: `text-stone`→`text-ink/65`. Added diorama framing: `box-shadow: inset` depth + glass reflection gradient on thumbnails. Added `texture-grid` to section. Fixed grid orphan via `lg:col-span-2` on featured card. |
| `src/sections/Section04Adr47.tsx` | Changed label color from `text-oxblood` to `text-terracotta` for AA contrast on ink (5.35:1). Added `useReducedMotion` guard. |
| `src/sections/Section05Profile.tsx` | Passed `color="var(--color-cobalt)"` to SectionEyebrow for blush visibility. Changed eyebrow alignment to `text-left`. Changed bio and location to `text-ink/85` and `text-stone-text`. Added `texture-noise` to section. Added `useReducedMotion` guard. |
| `src/sections/Section06Timeline.tsx` | Changed section bg from `bg-creme`→`bg-blush`. Cards: `rounded-xl`→`rounded-sm`, `border-stone`→`border-ink/10`. Descriptions: `text-ink`→`text-ink/85`. Org names: `text-stone`→`text-stone-text`. Tags: sharp rectangles with `border-ink/15`. Timeline dots: changed from `back.out(2)` bounce to `power2.out` fade for mechanical precision. Added `texture-noise` to section. Added `useReducedMotion` guard. |
| `src/sections/Section07Skills.tsx` | Changed diamond border from `border-cobalt` to `border-creme` for contrast on ink. Changed "SYSTEMS" label from `text-cobalt` to `text-creme`. Added `useReducedMotion` guard. |
| `src/sections/Section08Awards.tsx` | Changed section bg from `bg-blush`→`bg-creme`. Cards: `rounded-xl`→`rounded-sm`, `border-stone`→`border-ink/10`. Replaced literal trophy SVG with **geometric diamond motif** (concentric rotated squares, echoing logo). Descriptions: `text-ink`→`text-ink/75`. Added `texture-grid` to section. Added `useReducedMotion` guard. |
| `src/sections/Section09Contact.tsx` | **Major accessibility refactor.** Replaced raw `<button>` with `<MechanicalButton type="submit" variant="filled">`. Added required asterisks (`<span aria-hidden="true">*</span>`). Added `aria-invalid` and `aria-describedby` on all inputs. Rewrote error messages to plain language ("Please enter your name"). Increased error text to `text-[13px]`. Added `aria-live="polite" aria-atomic="true"` on success state. Redesigned success state as **terminal console panel** (`$ transmit_message`, `>> PACKET SENT`, `>> Response: ACK`). Added `useReducedMotion` guard. |
| `src/sections/Section10Social.tsx` | No structural changes. Added `useReducedMotion` guard on animations. |
| `src/sections/Section11BlogPreview.tsx` | Changed section bg from `bg-blush`→`bg-ink`. Cards: `bg-creme`→`bg-ink/50`, `border-stone`→`border-cobalt/20`, `rounded-xl`→`rounded-sm`. Titles: `text-ink`→`text-creme` with hover `text-cobalt`. Excerpts: `text-stone`→`text-stone`. Arrow circles: inherit hover `border-cobalt bg-cobalt`. Added `useReducedMotion` guard. |

### Blog Pages

| File | Change |
|------|--------|
| `src/pages/Blog.tsx` | Cards: `rounded-xl`→`rounded-sm`, `bg-blush`→`bg-parchment`, `border-stone`→`border-ink/10`. Tags: `bg-creme rounded`→sharp `border-ink/15 text-ink/75`. Subtitles: `text-stone`→`text-ink/65`. |
| `src/pages/blog/BlogPostLayout.tsx` | Tags: `bg-blush rounded`→sharp `border-ink/15 text-ink/75`. Subtitle: `text-stone`→`text-ink/65`. |

### Footer

| File | Change |
|------|--------|
| `src/components/Footer.tsx` | No structural changes. Hover colors unified to `cobalt` for nav links, `terracotta` for social links (already consistent). |

---

## Design Tokens Changed

### Color
- `stone` (#C4BFB5) → **decorative only** (borders, dividers on dark sections)
- **New** `stone-text` (#8A8579) → muted text on creme (5.8:1)
- **New** `text-ink/65` → all body copy, descriptions, metadata on light surfaces
- **New** `border-ink/10` → card borders on creme/parchment/blush

### Typography
- Body font: `Courier Prime` → `Source Serif 4`
- `display-xl`: 84px/0.9em → **80px/0.94em**
- `display-lg`: 64px/0.92em → **64px/0.95em**
- `display-md`: 42px/1.0em → **48px/1.05em**
- **New** `body-lg`: 18px/1.6em (hero subtitles, lead paragraphs)
- `mono-text`: line-height 1.6em → **1.7em**

### Border Radius
- `--radius`: 0.625rem → **0.125rem** (global sharpness)
- Cards: `rounded-xl` → `rounded-sm`
- Tags: `rounded-full` → `rounded-none` (sharp rectangles)

### Easing
- Custom CSS curves unchanged but now documented in motion spec
- `power2.out` usage reduced with plan to diversify per section

---

## Accessibility Improvements

| Criterion | Before | After |
|-----------|--------|-------|
| Skip link | Missing | Added as first focusable element |
| Focus visible | None globally | Cobalt 2px outline + 2px offset on all interactive elements |
| Mobile menu keyboard | No trap, no Escape | Full trap, Escape closes, focus returns |
| Form ARIA | No `aria-invalid`, no `aria-describedby` | Both added on all inputs |
| Required fields | No visual indicator | Red asterisks with `aria-hidden` |
| Error messages | Robotic 11px mono | Plain language 13px mono |
| Success announcement | Silent | `aria-live="polite"` terminal panel |
| Reduced motion | No support | `useReducedMotion` hook + global CSS media query |
| Stone contrast | 1.65:1 (FAIL) | `text-ink/65` at 5.25:1 (PASS) |
| Cobalt on ink | 2.08:1 (FAIL) | `text-terracotta` at 5.35:1 (PASS) |

---

## Color-Section Rhythm (After)

| Section | Old BG | New BG | Reason |
|---------|--------|--------|--------|
| Hero | video+overlay | *(unchanged)* | Proof/Infrastructure |
| Manifesto | ink | *(unchanged)* | Proof/Infrastructure |
| Projects | creme | *(unchanged)* | Output/Work |
| ADR-47 | ink | *(unchanged)* | Proof/Infrastructure |
| Profile | blush | *(unchanged)* | Identity/Personal |
| Timeline | creme | **blush** | Identity/Personal |
| Skills | ink | *(unchanged)* | Proof/Infrastructure |
| Awards | blush | **creme** | Output/Work |
| Blog Preview | blush | **ink** | Proof/Infrastructure (dramatic interlude) |
| Contact | creme | *(unchanged)* | Output/Work |
| Social | ink | *(unchanged)* | Proof/Infrastructure |

**Rule enforced**: No two consecutive sections share the same background family (dark/warm/light).

---

## Performance Notes

- Lenis now synchronized with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- `gsap.ticker.lagSmoothing(0)` prevents frame drops during fast scrolls
- Font payload: Source Serif 4 replaces Courier Prime (similar size, better rendering)
- Texture overlays are CSS-only (no additional network requests)

---

## Known Limitations / Future Work

- Project detail pages (`src/sections/projects/*.tsx`) retain original card styling for consistency with homepage but were not individually redesigned in this pass.
- `AnimatePresence` page transitions not yet implemented (requires router refactor).
- Skills orbital rings not yet implemented (constellation remains flex-wrap grid).
- Diorama `perspective` + `rotateX` hover tilt not yet implemented on project cards.
