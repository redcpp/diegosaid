# Visual Audit — Diego Said Portfolio

**Auditor**: Visual Auditor Agent  
**Date**: 2026-05-08  
**Scope**: Full-page layout, hierarchy, whitespace, alignment, and visual noise across all 11 sections + global chrome  
**Method**: Static code analysis of component structure, spacing tokens, color logic, typographic scale, and responsive breakpoints.

---

## Executive Summary

The portfolio exhibits a strong conceptual foundation — the "symmetry" brand is well-expressed through the color system, type pairing, and motion language. However, **five recurring issues** undermine the high-end positioning: (1) a critical contrast failure renders section labels invisible on blush backgrounds, (2) the fixed navbar obscures anchored content with no offset compensation, (3) back-to-back blush sections collapse the carefully curated color rhythm, (4) the project grid breaks its own symmetry with an orphaned card and 21 high-contrast tag pills, and (5) the timeline collapses into a left-heavy, vertically unbalanced stack on mobile.

Each issue is scored by **Impact** (visual/brand severity, 1–10) and **Effort** (development cost, 1–10). **Priority = Impact ÷ Effort** — higher values are quick wins.

---

## Ranked Improvements

### 1. Section Eyebrow Contrast Failure on Blush Backgrounds

| | |
|---|---|
| **Location** | Profile (`Section05Profile`), Awards (`Section08Awards`), Blog Preview (`Section11BlogPreview`) |
| **Severity** | **Critical** |
| **Impact** | 7 |
| **Effort** | 2 |
| **Priority** | **3.50** |

#### Current Problem
`SectionEyebrow` defaults to `color: var(--color-stone)` (#C4BFB5). When rendered on `bg-blush` (#E8D5D0), the contrast ratio is approximately **1.2:1** — well below WCAG AA (4.5:1) and effectively invisible to most users. Three of eleven sections have unreadable eyebrow labels. In `Profile`, the centered eyebrow also misaligns with the left-justified heading beneath it, creating internal column drift.

#### Proposed Fix
- Pass an explicit `color` prop to `SectionEyebrow` on all blush sections: `text-ink/50` or `text-cobalt` for visibility that stays within the brand palette.
- In `Profile`, add `className="text-left"` (or use a left-aligned eyebrow variant) so the eyebrow aligns with the heading below it.

#### Before / After
- **Before**: `// ━━━ ABOUT ━━━` appears as a faint gray whisper against pink-blush. Users skip past the section label entirely.
- **After**: `// ━━━ ABOUT ━━━` renders in muted ink (`text-ink/50`) or cobalt, maintaining hierarchy while remaining legible. In Profile, the eyebrow and heading share a left edge, reinforcing the grid.

---

### 2. Navbar Anchor Offset — Content Hidden Under Fixed Chrome

| | |
|---|---|
| **Location** | Global (`Navbar`, `index.css`, `Section09Contact` anchor) |
| **Severity** | **High** |
| **Impact** | 6 |
| **Effort** | 2 |
| **Priority** | **3.00** |

#### Current Problem
The navbar is `fixed top-0 h-16` (64 px) with `z-50`, yet the document has **no `scroll-padding-top`** set. When a user clicks "Contact" in the nav (or arrives via `/#contact`), the section title and first form field are hidden behind the navbar. The same problem affects any future in-page anchors (e.g., `#projects`). Lenis smooth scroll makes the overlap feel intentional rather than broken, which is worse — users may not realize content is obscured.

#### Proposed Fix
- Add `scroll-padding-top: 5rem;` (80 px) to the `html` element in `index.css`, giving the fixed navbar breathing room plus a small optical cushion.
- Verify the Contact section `id="contact"` is on the `<section>` tag (it is) so the offset applies correctly.

#### Before / After
- **Before**: Clicking "Contact" scrolls to the section with its eyebrow and heading tucked under the navbar — users see the middle of the form, missing the section header and first input.
- **After**: The section lands with ~16 px of space below the navbar, presenting the full "SEND A MESSAGE" eyebrow and "PROJECT INQUIRY FORM" heading.

---

### 3. Back-to-Back Blush Sections Break Color Rhythm

| | |
|---|---|
| **Location** | Awards (`Section08Awards`) → Blog Preview (`Section11BlogPreview`) |
| **Severity** | **High** |
| **Impact** | 8 |
| **Effort** | 3 |
| **Priority** | **2.67** |

#### Current Problem
The page follows a deliberate color cadence — video/dark → ink → creme → video/dark → blush → creme → ink → blush → **blush** → creme → ink. The only adjacent repetition is Awards into Blog Preview, both `bg-blush`. Because both sections are long (`py-32 lg:py-40` and `pt-32 pb-24`) and share identical backgrounds with no divider, border, or transition, they visually fuse into one massive blush block. The user loses the sense of crossing a section boundary, and the "symmetry is policy" brand promise is undermined by this rhythmic asymmetry.

#### Proposed Fix
- **Option A (preferred)**: Change `Section11BlogPreview` to `bg-parchment` or `bg-creme` to restore the alternating cadence.
- **Option B**: Keep blush but insert a thin cobalt accent divider (e.g., a 2 px full-bleed line or the existing `HorizontalPanWipe` in cobalt) between the sections.
- **Option C**: Reduce Blog Preview padding to `py-24` and add a subtle top border (`border-t border-stone/20`) to create a seam.

#### Before / After
- **Before**: Scrolling from Awards into Blog Preview feels like remaining in the same section — no visual cue signals the topic shift from "Honors" to "Latest Writing."
- **After**: A clean background shift (or a cobalt seam) re-establishes the page's breathing rhythm. The user perceives two distinct, equally intentional content blocks.

---

### 4. Project Grid Orphan & Tag Visual Overload

| | |
|---|---|
| **Location** | Projects (`Section03Projects`) |
| **Severity** | **High** |
| **Impact** | 8 |
| **Effort** | 5 |
| **Priority** | **1.60** |

#### Current Problem
Two interrelated issues:

1. **Grid Orphan**: Seven project cards in a `lg:grid-cols-2` grid leaves a single card on the final row. On desktop, this orphan is left-aligned, creating a severe visual imbalance that contradicts the "symmetry" brand. The headline even emphasizes the odd number ("SEVEN PROJECTS. SEVEN DIORAMAS."), which the layout cannot gracefully accommodate.

2. **Tag Noise**: Each card carries 3 tags rendered as `bg-ink text-creme` pills — 21 total high-contrast black dots on the page. These pills are visually heavier than the project descriptions and compete with the `text-display-md` titles for attention. At `text-[11px]` uppercase with tight tracking, they also feel cramped and medicinal rather than luxurious.

#### Proposed Fix
- **Grid**: Either (a) promote the featured project (CAM GRUPO or ADR-47) to a full-width hero card spanning both columns, leaving 6 cards in a perfect 3×2 grid below; or (b) center the orphan via `justify-items: center` on the last row using a pseudo-class or subgrid workaround.
- **Tags**: Restyle to a subtle outline treatment: `border border-ink/15 text-ink/80 bg-transparent` (or `bg-ink/5`), removing the visual "holes." Keep `rounded-full` if desired, but reduce the weight.

#### Before / After
- **Before**: The bottom-left cell is occupied by the lone "Harvard CORe" card while the bottom-right cell is empty white space. Twenty-one black pills pepper the grid, pulling the eye away from project names.
- **After**: A 1+6 asymmetric layout (or centered orphan) restores compositional balance. Tags become quiet metadata — readable on hover but no longer shouting across the section.

---

### 5. Timeline Mobile Layout Collapse & Alignment Drift

| | |
|---|---|
| **Location** | Timeline (`Section06Timeline`) |
| **Severity** | **High** |
| **Impact** | 8 |
| **Effort** | 5 |
| **Priority** | **1.60** |

#### Current Problem
On viewports below `lg`, the alternating left/right timeline collapses into a uniform left-aligned stack. The vertical line is positioned at `left-6` (24 px from the inner container edge), while the dot + card flex row starts at the container's left edge. The dot center (~32 px from viewport left) does not align with the line (~48 px from viewport left), creating a subtle but perceptible **alignment drift** — the line sits to the right of the dot rather than passing through it. All 12 cards are crammed to the left half of the screen, leaving the right half empty and the overall composition lopsided. The `space-y-12` gap also feels tight for 12 items on a narrow viewport, accelerating scroll fatigue.

#### Proposed Fix
- **Mobile Restructure**: Below `lg`, convert to a single-column card list with the line and dot removed entirely, OR place the dot inside the card as a left border accent (`border-l-2 border-cobalt`) with the year as a floating badge.
- **Alignment**: If keeping the line, wrap the timeline in a flex column with explicit left padding (`pl-12`) so the line can run through the dot center, matching the desktop geometry.
- **Density**: Reduce mobile gap to `space-y-8` to tighten the rhythm.

#### Before / After
- **Before**: A tall, left-heavy column of cards with a misaligned center line and redundant dot markers. The right 50% of the viewport is unused dead space on mobile.
- **After**: Cards read as a clean vertical stack with cobalt left-edge accents marking milestones. The layout uses the full viewport width, and the alignment drift is eliminated.

---

## Secondary Observations (Not in Top 5)

| Issue | Location | Severity | Notes |
|-------|----------|----------|-------|
| Contact submit button breaks button language | `Section09Contact` | Medium | Raw `<button>` with `rounded-lg` instead of `MechanicalButton` (`rounded-full`). Effort 2, but lower visual impact than grid/orphan issues. |
| Footer hover color inconsistency | `Footer.tsx` | Low | Social links use `hover:text-terracotta`; nav links use `hover:text-cobalt`. Should unify to cobalt. |
| Inconsistent heading scale | Multiple sections | Medium | ADR-47 uses `display-xl` (84 px); Profile/Contact/Social use `display-md` (42 px). A formalized heading tier system (Primary/Secondary/Tertiary) would help. |
| Skills constellation is a tag cloud | `Section07Skills` | Medium | Title promises a constellation; delivers a flat flex-wrap list. Ring data is unused. Requires redesign, so effort is high. |
| `HorizontalPanWipe` widths vary arbitrarily | Multiple | Low | 60%, 100%, and 40% containers appear with no clear hierarchy rule. |

---

## Scoring Methodology

- **Impact (1–10)**: Rated on brand consistency, readability, accessibility, and the degree to which the issue contradicts the "symmetry" positioning. A score of 8+ indicates the issue is visible to a casual user within 10 seconds of scrolling.
- **Effort (1–10)**: Rated on file touch count, CSS/structural complexity, and regression risk. A score of 2–3 means a single-token or single-prop change; 5+ requires layout restructuring or new components.
- **Priority**: `Impact ÷ Effort`. Values above 2.5 are "quick wins" — high visual return for minimal engineering cost.
