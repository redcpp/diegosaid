# Color & Texture Audit — Diego Said Portfolio

**Auditor:** Color & Texture Specialist Agent  
**Date:** 2026-05-08  
**Scope:** Full-site palette, WCAG contrast, emotional tone, texture usage, color rhythm  
**Tech Stack:** React + Vite + Tailwind CSS + GSAP  

---

## Executive Summary

The portfolio possesses a strong foundational palette that successfully communicates **precision, editorial luxury, and technical authority**. The ink/creme dichotomy is elegant, cobalt is a trustworthy enterprise accent, and the limited use of oxblood adds gravitas. However, **three critical patterns are undermining the premium positioning:**

1. **WCAG text-contrast failures** on every light section due to `stone` (#C4BFB5) being used for body copy.
2. **Blush overuse** creating a "pink wall" across four sections, diluting visual hierarchy.
3. **A collapsed dark/light rhythm** in the final third of the page (Awards → Blog → Contact).

The good news: all fixes are CSS-only, low-effort, and high-impact.

---

## 1. WCAG Contrast Matrix

All ratios calculated using the WCAG 2.1 relative-luminance formula.

| Foreground | Background | Ratio | Grade | Used For |
|------------|------------|-------|-------|----------|
| `#1A1A1A` (ink) | `#F5F3EF` (creme) | **15.70:1** | AAA | Primary text |
| `#F5F3EF` (creme) | `#1A1A1A` (ink) | **15.70:1** | AAA | Dark-section text |
| `#1A1A1A` (ink) | `#E8D5D0` (blush) | **12.32:1** | AAA | Text on blush |
| `#2B4C8C` (cobalt) | `#F5F3EF` (creme) | **7.53:1** | AAA | Accents on light |
| `#8C2B3D` (oxblood) | `#F5F3EF` (creme) | **7.50:1** | AAA | Semantic accent |
| `#A8B5A0` (sage) | `#1A1A1A` (ink) | **8.11:1** | AAA | Terminal prompt |
| `#C4BFB5` (stone) | `#1A1A1A` (ink) | **9.50:1** | AAA | Decorative text on dark |
| `#D4745C` (terracotta) | `#1A1A1A` (ink) | **5.35:1** | AA | Footer hover links |
| `#2B4C8C` (cobalt) | `#E8D5D0` (blush) | **5.91:1** | AA | Accents on blush |
| `#C4BFB5` (stone) | `#F5F3EF` (creme) | **1.65:1** | **FAIL** | Body copy, subtitles |
| `#C4BFB5` (stone) | `#E8D5D0` (blush) | **1.30:1** | **FAIL** | Body copy on cards |
| `#C4BFB5` (stone) | `#FAF8F4` (parchment) | **1.73:1** | **FAIL** | Body copy |
| `#2B4C8C` (cobalt) | `#1A1A1A` (ink) | **2.08:1** | **FAIL** | Skills diamond, label |
| `#8C2B3D` (oxblood) | `#1A1A1A` (ink) | **2.10:1** | **FAIL** | ADR-47 label |
| `#D4745C` (terracotta) | `#F5F3EF` (creme) | **2.94:1** | **FAIL** | (Not currently used) |

### Key Finding
**`stone` is doing double-duty as both a decorative border color and a text color.** As a border it is subtle and acceptable on dark backgrounds, but as body copy it fails WCAG everywhere. This is the single largest accessibility liability on the site.

---

## 2. Emotional Tone Evaluation

| Brand Pillar | Target Emotion | Current Delivery | Score |
|--------------|----------------|------------------|-------|
| Precision / Systems | Clinical, exact, measured | **Strong.** Monospace body, ink/creme duality, grid-pattern usage on projects page. | 9/10 |
| Luxury Real Estate | Expensive, editorial, tactile | **Weak.** Flat solid colors feel digital rather than material. No paper grain, foil stamping, or canvas texture. Blush reads "spa/wedding" more than "architectural gallery." | 5/10 |
| DeFi / Technical Authority | Trustworthy, rigorous, contrarian | **Strong.** Cobalt signals enterprise trust. Oxblood adds intellectual gravity. Terminal motif in Profile is excellent. | 8/10 |
| "Where Symmetry Is Policy" | Balanced, rhythmic, intentional | **Medium.** Section layouts are symmetrical, but the **color rhythm is broken** in the bottom half of the page. | 6/10 |

**Overall Tone Score: 7/10** — The palette is 80% there. It needs textural refinement and color-rhythm discipline to fully land the luxury-technical positioning.

---

## 3. Color Consistency & Fatigue Analysis

### Surface Usage Map

| Section | Background | Card Surface | Border | Accent |
|---------|-----------|--------------|--------|--------|
| Hero | Video + overlay | — | — | Creme text |
| Manifesto | Ink | — | — | Creme text |
| Projects | Creme | **Blush** | Stone | Ink tags |
| ADR-47 | Ink + video | — | — | Cobalt btn |
| Profile | **Blush** | Ink (terminal) | — | Sage prompt |
| Timeline | Creme | **Blush** | Stone | Cobalt year |
| Skills | Ink | — | Stone | Cobalt badges |
| Awards | **Blush** | **Blush** | Stone | Cobalt icon |
| Blog Preview | **Blush** | Creme | Stone | Cobalt link |
| Contact | Creme | — | Stone | Cobalt focus |
| Social | Ink | — | Stone | Cobalt hover |
| Footer | Ink | — | — | Terracotta hover |

### Fatigue Diagnosis
- **Blush appears 5 times** across 4 sections (Profile bg, Projects cards, Timeline cards, Awards cards, Blog Preview bg). It becomes invisible through repetition.
- **Parchment is defined but unused** as a primary surface. A wasted opportunity to create tonal hierarchy.
- **Sage and Terracotta are under-utilized.** Sage reads as "validated/success" (terminal `$` prompt). Terracotta reads as "warm warning/action" (footer hover). Both have strong semantic potential but are confined to single micro-interactions.
- **Stone is over-extended:** borders, divider lines, subtitles, metadata, descriptions, and org names all share the same color. There is no gradation between "decorative line" and "readable text."

---

## 4. Dark / Light Alternation Rhythm

Current sequence (section backgrounds):

```
Hero      ████  (dark video)
Manifesto ████  (ink)
Projects  ░░░░  (creme)
ADR-47    ████  (ink + video)
Profile   ▒▒▒▒  (blush)
Timeline  ░░░░  (creme)
Skills    ████  (ink)
Awards    ▒▒▒▒  (blush)
Blog      ▒▒▒▒  (blush)  ← SAME AS ABOVE
Contact   ░░░░  (creme)
Social    ████  (ink)
Footer    ████  (ink)
```

### Rhythm Issues
1. **Awards → Blog Preview** are consecutive blush surfaces. The eye receives no "reset" cue.
2. **Blog Preview → Contact** are consecutive warm surfaces (blush → creme). The contrast is too low to signal a new chapter.
3. **Hero → Manifesto** are both dark, but this is acceptable because Hero is viewport-locked immersive media and Manifesto is a brief typographic interstitial.

**Recommended sequence after fixes:**

```
Hero      ████  (dark video)
Manifesto ████  (ink)
Projects  ░░░░  (creme)
ADR-47    ████  (ink + video)
Profile   ▒▒▒▒  (blush)
Timeline  ░░░░  (creme)
Skills    ████  (ink)
Awards    ▒▒▒▒  (blush)
Blog      ████  (ink)    ← INVERTED: dramatic reading room
Contact   ░░░░  (creme)
Social    ████  (ink)
Footer    ████  (ink)
```

This yields the pattern: **dark, dark, light, dark, warm, light, dark, warm, dark, light, dark, dark** — a much more musical progression with clear chapter boundaries.

---

## 5. Texture Assessment

| Texture | Location | Effectiveness | Recommendation |
|---------|----------|---------------|----------------|
| `pattern-grid.svg` | Projects Page Hero, Harvard Core | Good. Adds architectural precision. | **Scale to main site.** Use at 2-3% opacity on all creme/blush sections. |
| Noise SVG (fractal) | CTA Banner | Excellent. Adds film-grain depth to dark surfaces. | **Reuse on Manifesto, Skills, Social.** |
| Video backgrounds | Hero, ADR-47 | Excellent. Provides motion and depth. | Keep. |
| `pulse-slow` + `noise` keyframes | Defined in Tailwind, rarely used | Wasted. | Either deploy or remove. |
| Flat solids | Projects, Profile, Timeline, Awards, Contact | Generic. Reads as "template." | **Add subtle paper grain + top-edge gradients to cards.** |

### Missing Textures
1. **Paper/canvas grain on light sections** — editorial portfolios (Aesop, Kinfolk, The Gentlewoman) use subtle off-white noise to signal "printed matter."
2. **Gradient lift on cards** — a `from-white/40 to-transparent` gradient at the top edge of cards simulates directional studio lighting and makes surfaces feel tactile.
3. **Ambient glow on dark sections** — the cobalt blur on the Projects Page Hero is excellent. Replicate a smaller version on Manifesto and Skills to prevent "flat void" syndrome.

---

## 6. Ranked Improvements (Top 5)

### #1 — Stone Text Contrast Failure
| Attribute | Value |
|-----------|-------|
| **Severity** | Critical |
| **Location** | Projects, Timeline, Awards, Contact, Blog Preview, Social, Footer |
| **Impact** | 10 / 10 |
| **Effort** | 3 / 10 |
| **Priority** | **3.33** |

**Current Problem**  
`text-stone` (#C4BFB5) is used for subtitles, descriptions, metadata, org names, and placeholder text across every light section. It delivers **1.65:1 on creme** and **1.30:1 on blush** — both catastrophic failures of WCAG 1.4.3. For a portfolio targeting high-end technical clients, illegible body copy is a credibility killer.

**Proposed Fix**  
Replace `text-stone` for all body-level copy with **`text-ink/65`** (Tailwind arbitrary opacity). This yields:
- **5.25:1 on creme** (AA ✅)
- **4.70:1 on blush** (AA ✅)

Retain `text-stone` **only** for:
- Decorative eyebrows on **dark** sections (where it passes at 9.5:1)
- Divider lines and pan wipes
- Inactive/non-essential metadata where `aria-label` or semantic HTML provides accessibility

**Files to change:**
- `src/sections/Section03Projects.tsx` — description, subtitle
- `src/sections/Section06Timeline.tsx` — org, description
- `src/sections/Section08Awards.tsx` — org, description
- `src/sections/Section09Contact.tsx` — subtitle, placeholder text, success message
- `src/sections/Section11BlogPreview.tsx` — excerpt, date, read time
- `src/sections/Section10Social.tsx` — platform labels, location subtext
- `src/components/Footer.tsx` — tagline, copyright

**Before/After**  
*Before:* Project descriptions are a faint whisper; visitors squint to read the Oxford Bioinformatics citation.  
*After:* Descriptions snap into focus at a comfortable 65% ink density, preserving the editorial hierarchy while remaining fully legible.

---

### #2 — Cobalt & Oxblood on Ink Fail Contrast
| Attribute | Value |
|-----------|-------|
| **Severity** | High |
| **Location** | Skills (diamond + "SYSTEMS"), ADR-47 ("FEATURED ANALYSIS" label) |
| **Impact** | 8 / 10 |
| **Effort** | 2 / 10 |
| **Priority** | **4.00** |

**Current Problem**  
`text-cobalt` (#2B4C8C) on `bg-ink` (#1A1A1A) is **2.08:1** — FAIL. The Skills section center diamond and "SYSTEMS" label disappear into the background. Similarly, `text-oxblood` on ink in ADR-47 is **2.10:1** — FAIL. These are key focal points rendered nearly invisible.

**Proposed Fix**  
- **Skills diamond border:** `border-creme` instead of `border-cobalt`.  
- **Skills "SYSTEMS" label:** `text-creme` instead of `text-cobalt`.  
- **ADR-47 "FEATURED ANALYSIS" label:** `text-terracotta` (#D4745C) instead of `text-oxblood`. Terracotta on ink is **5.35:1 (AA)** and semantically warmer for a "warning/analysis" label. It also activates an otherwise dormant palette color.

**Files to change:**
- `src/sections/Section07Skills.tsx` — diamond div, SYSTEMS span
- `src/sections/Section04Adr47.tsx` — label span

**Before/After**  
*Before:* The Skills constellation has a void at its center; the ADR-47 label is a murky bruise against the video.  
*After:* The diamond becomes a bright beacon. The ADR-47 label glows with terracotta urgency, drawing the eye exactly where the narrative demands.

---

### #3 — Blush Overuse & Card Surface Monotony
| Attribute | Value |
|-----------|-------|
| **Severity** | High |
| **Location** | Projects cards, Timeline cards, Awards cards, Blog Preview section bg |
| **Impact** | 8 / 10 |
| **Effort** | 4 / 10 |
| **Priority** | **2.00** |

**Current Problem**  
Blush (#E8D5D0) is the default card surface for **4 out of 5 card-based sections**. By the time a visitor reaches Awards, blush has become visual white noise. The color loses its emotional charge and the sections blur together.

**Proposed Fix**  
Assign distinct surfaces to each card context:

| Section | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| Projects | Blush cards | **Parchment cards** (`bg-parchment border-ink/10`) | Clean, gallery-like, lets project thumbnails dominate. |
| Timeline | Blush cards | **Alternate:** odd = blush, even = parchment | Creates rhythm along the vertical scroll. |
| Awards | Blush cards | **Keep blush** (`bg-blush`) | Honors deserve warmth and emotional resonance. |
| Blog Preview | Blush section | **Parchment section** (`bg-parchment`) | Editorial "newsprint" feel. Cards stay `bg-creme`. |

**Border update:** Replace `border-stone` on all light cards with **`border-ink/10`** to ensure UI-component contrast (≥3:1 equivalent) while maintaining subtlety.

**Files to change:**
- `src/sections/Section03Projects.tsx` — card bg, border
- `src/sections/Section06Timeline.tsx` — card bg, border (add index-based alternation)
- `src/sections/Section11BlogPreview.tsx` — section bg, card border

**Before/After**  
*Before:* Scrolling feels like flipping through identical pink folders.  
*After:* Each section has a distinct material identity — gallery white for work, warm pink for honors, newsprint for writing.

---

### #4 — Collapsed Dark/Light Rhythm (Awards → Blog → Contact)
| Attribute | Value |
|-----------|-------|
| **Severity** | Medium |
| **Location** | Awards, Blog Preview, Contact |
| **Impact** | 7 / 10 |
| **Effort** | 5 / 10 |
| **Priority** | **1.40** |

**Current Problem**  
Awards (blush) → Blog Preview (blush) → Contact (creme) creates a **3000px+ stretch of warm, low-contrast surfaces** with no dark "reset." The bottom of the page feels like a slow fade rather than a composed finale. For a brand built on "symmetry," the rhythm is lopsided.

**Proposed Fix**  
Invert **Blog Preview** to a dark section:
- Section: `bg-ink`
- Eyebrow: `text-stone`
- Headline: `text-creme`
- "VIEW ALL" link: `text-cobalt hover:text-terracotta`
- Cards: `bg-ink/50 border-cobalt/20` with `text-creme` headlines, `text-ink/65`→`text-creme/60` excerpts
- Date/read-time: `text-stone`
- Arrow circles: `border-cobalt hover:bg-cobalt`

This transforms the Blog Preview into a **"reading room"** — a deliberately quiet, dark space that signals intellectual depth. It also restores the alternation:

`Skills(ink) → Awards(blush) → Blog(ink) → Contact(creme) → Social(ink)`

**Files to change:**
- `src/sections/Section11BlogPreview.tsx` — full section color inversion

**Before/After**  
*Before:* The final third of the page is a warm, hazy blur. Visitors may not even notice the blog section is there.  
*After:* A dramatic dark interlude pulls the eye toward the articles, followed by a bright Contact section that feels like stepping back out into daylight.

---

### #5 — Flat Surfaces Lack Tactile Premium Texture
| Attribute | Value |
|-----------|-------|
| **Severity** | Medium |
| **Location** | Projects, Profile, Timeline, Awards, Contact (all light sections) |
| **Impact** | 6 / 10 |
| **Effort** | 3 / 10 |
| **Priority** | **2.00** |

**Current Problem**  
Every light section is a perfectly flat, uniform color. There is no paper grain, no light bounce, no material depth. For a portfolio competing for attention against Awwwards-level personal sites, this reads as "Bootstrap template" rather than "bespoke atelier."

**Proposed Fix**  
Deploy three texture layers via CSS only:

1. **Subtle grid on light sections** (Projects, Timeline, Contact)
   ```css
   background-image: url(/pattern-grid.svg);
   background-size: 40px 40px;
   opacity: 0.03;
   ```
   Already proven on the Projects Page Hero. Scaling it site-wide at 3% opacity adds subliminal architectural structure without visual noise.

2. **Top-edge gradient on all cards** (Projects, Timeline, Awards, Blog)
   Add to card class:
   ```
   bg-gradient-to-b from-white/40 to-transparent
   ```
   Simulates a light source from above. Makes cards feel physically lifted.

3. **Noise overlay on Profile section**
   Reuse the existing fractal-noise SVG from CTA Banner at `opacity: 0.02` on the Profile section. The blush + noise combination evokes handmade paper — perfect for a personal bio.

**Files to change:**
- `src/sections/Section03Projects.tsx` — section wrapper, card classes
- `src/sections/Section05Profile.tsx` — section wrapper
- `src/sections/Section06Timeline.tsx` — section wrapper, card classes
- `src/sections/Section08Awards.tsx` — card classes
- `src/sections/Section09Contact.tsx` — section wrapper
- `src/sections/Section11BlogPreview.tsx` — card classes

**Before/After**  
*Before:* Surfaces feel like CSS rectangles in a wireframe.  
*After:* Surfaces feel like museum placards, letterpress paper, and architectural drawings. The difference is subliminal but decisive in communicating luxury.

---

## 7. Revised Palette & Usage Rules

### Core Colors (unchanged hexes)

| Token | Hex | Role |
|-------|-----|------|
| `ink` | `#1A1A1A` | Primary text, dark surfaces, authority |
| `creme` | `#F5F3EF` | Primary light surface, dark-section text |
| `cobalt` | `#2B4C8C` | Primary accent — trust, enterprise, links |
| `oxblood` | `#8C2B3D` | Semantic accent — risk, gravity, error states |
| `blush` | `#E8D5D0` | Warm emotional surface — honors, personal |
| `sage` | `#A8B5A0` | Semantic accent — success, validation, terminal |
| `parchment` | `#FAF8F4` | Secondary light surface — gallery, editorial |
| `stone` | `#C4BFB5` | **Decorative only** — borders on dark, dividers |
| `terracotta` | `#D4745C` | CTA accent — warmth, action, warning |

### New / Modified Tokens

| Token | Value | Role |
|-------|-------|------|
| `text-secondary` | `text-ink/65` | Body copy, descriptions, metadata on ALL light surfaces |
| `border-light` | `border-ink/10` | Card borders on creme, parchment, blush |
| `cobalt-glow` | `#2B4C8C` at `opacity: 0.06` | Ambient blur orbs on dark sections |

### Surface Usage Rules

```
DARK SECTIONS (ink bg)
├── Primary text:        creme
├── Secondary text:      stone (eyebrows, metadata)
├── Accents:             cobalt (interactive), terracotta (CTA), sage (success)
├── Borders:             stone/30
└── Texture:             noise overlay + cobalt glow orb

LIGHT SECTIONS (creme / parchment bg)
├── Primary text:        ink
├── Secondary text:      ink/65
├── Accents:             cobalt (links), oxblood (hover)
├── Borders:             ink/10
└── Texture:             pattern-grid at 3% opacity + card top gradient

WARM SECTIONS (blush bg)
├── Primary text:        ink
├── Secondary text:      ink/65
├── Accents:             cobalt (icons), terracotta (CTA)
├── Borders:             ink/10
└── Texture:             noise overlay at 2% opacity
```

### Semantic Color Mapping

| Meaning | Color | Example |
|---------|-------|---------|
| Primary action | Cobalt | Buttons, focus rings, active states |
| Destructive / warning | Oxblood | Form errors, risk labels |
| Success / validation | Sage | Terminal prompts, checkmarks |
| Warm CTA | Terracotta | Footer social links, featured labels |
| Interactive hover | Cobalt → Terracotta | Link hover transitions |

### Dark/Light Rhythm Rule

> **No two consecutive sections may share the same background family (dark / warm / light).**  
> Exception: Hero → Manifesto (immersive → interstitial).  
> Warm (blush) sections should be separated by at least one dark or light section.

---

## 8. Implementation Checklist

- [ ] Replace `text-stone` body copy with `text-ink/65` in Sections 03, 06, 08, 09, 10, 11, Footer
- [ ] Change Skills diamond + "SYSTEMS" to `border-creme` / `text-creme`
- [ ] Change ADR-47 label to `text-terracotta`
- [ ] Diversify card surfaces: Projects → parchment, Timeline → alternate, Awards → keep blush, Blog section → parchment
- [ ] Replace card borders with `border-ink/10`
- [ ] Invert Blog Preview section to `bg-ink` with adapted card styles
- [ ] Add `pattern-grid.svg` overlay to light sections at 3% opacity
- [ ] Add `from-white/40 to-transparent` gradient to all cards
- [ ] Add noise overlay to Profile section at 2% opacity
- [ ] Update `tailwind.config.js` comments or Storybook docs to reflect new usage rules (if applicable)

---

*End of Audit*
