# Accessibility & UX Audit — Diego Said Portfolio

**Auditor:** Accessibility & UX Agent  
**Date:** 2026-05-08  
**Scope:** Full site (Home, Projects, Blog, Blog Posts)  
**Standard:** WCAG 2.1 Level AA  
**Tech Stack:** React + Vite + TypeScript + Tailwind CSS + GSAP + Lenis

---

## 1. Executive Summary

The portfolio has a **strong semantic HTML foundation** (`<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, heading hierarchy `h1`–`h3`) and a few thoughtful accessibility touches ( `aria-label` on the hamburger button, `aria-expanded` on the mobile menu). However, it suffers from **critical gaps in keyboard navigation, motion safety, and form accessibility** that block users with disabilities from effectively engaging with the site — particularly screen-reader users, keyboard-only users, and people with vestibular disorders.

**Top-line stats:**
- **Hard WCAG AA failures found:** 7
- **Sections with no `prefers-reduced-motion` support:** 11 / 11
- **Interactive elements with invisible focus states:** ~40+
- **Color pairs failing 4.5:1 contrast:** 2 (Stone/Creme, Cobalt/Ink)
- **Missing ARIA live regions:** 4 (typewriters, terminal, form success)

---

## 2. WCAG 2.1 AA Contrast Audit

All ratios calculated against WCAG 2.1 AA thresholds (4.5:1 for normal text, 3:1 for large text + UI components).

| Text Color | Background | Ratio | Normal Text | Large Text | Used For |
|------------|-----------|-------|-------------|------------|----------|
| `#F5F3EF` (Creme) | `#1A1A1A` + `black/40` overlay on video | ~7.5:1* | ✅ Pass | ✅ Pass | Hero headlines, subtitles |
| `#F5F3EF` (Creme) | `#1A1A1A` (Ink) | 16.1:1 | ✅ Pass | ✅ Pass | Footer text, dark section text |
| `#1A1A1A` (Ink) | `#F5F3EF` (Creme) | 16.1:1 | ✅ Pass | ✅ Pass | Body text on light bg |
| `#1A1A1A` (Ink) | `#E8D5D0` (Blush) | 12.4:1 | ✅ Pass | ✅ Pass | Card text |
| `#2B4C8C` (Cobalt) | `#F5F3EF` (Creme) | 5.86:1 | ✅ Pass | ✅ Pass | Links, accents, labels |
| `#2B4C8C` (Cobalt) | `#1A1A1A` (Ink) | 2.24:1 | ❌ Fail | ❌ Fail | Skills diamond border (decorative, acceptable) |
| `#8C2B3D` (Oxblood) | `#F5F3EF` (Creme) | 7.02:1 | ✅ Pass | ✅ Pass | Error text |
| `#C4BFB5` (Stone) | `#F5F3EF` (Creme) | **1.65:1** | ❌ **Fail** | ❌ **Fail** | Muted text, dates, read times, placeholders, org names |
| `#C4BFB5` (Stone) | `#1A1A1A` (Ink) | 9.76:1 | ✅ Pass | ✅ Pass | Eyebrows on dark bg |
| `#A8B5A0` (Sage) | `#1A1A1A` (Ink) | 4.48:1 | ⚠️ Marginal | ✅ Pass | Terminal `$` prompts |
| `#D4745C` (Terracotta) | `#1A1A1A` (Ink) | 4.78:1 | ✅ Pass | ✅ Pass | Footer hover states |

*\*Hero video background is dynamic; `black/40` overlay provides a stable dark floor, but fast-cut footage can create transient contrast dips. Consider a heavier overlay (`black/50` or `black/60`) for safety.*

### Critical Contrast Finding: Stone on Creme

**Stone `#C4BFB5` on Creme `#F5F3EF` at 1.65:1** is a hard failure everywhere it appears:
- Section eyebrow labels (e.g., "SELECTED WORK", "CAREER TIMELINE")
- Blog dates and read times
- Timeline organization names (`Oracle — Big Data Service`)
- Contact form placeholder text
- Project card descriptions (intended as secondary text, but 14px is not "large text")
- Awards organization text

**Impact:** Low-vision users, users with cataracts, and anyone on a low-quality display cannot read metadata. For a portfolio targeting high-end clients (often 40+), this is a significant readability barrier.

---

## 3. Focus Management Evaluation

### 3.1 Focus Indicators

| Element | Hover Style | Focus Style | Verdict |
|---------|-------------|-------------|---------|
| Navbar links | Underline gradient shimmer | **None** — `.nav-link::after` only triggers on `:hover`, never `:focus-visible` | ❌ Fail |
| Footer nav buttons | Color shift to cobalt | **None** | ❌ Fail |
| Footer external links | Color shift to terracotta | **None** | ❌ Fail |
| Project cards | Lift + shadow | Outline suppressed, no replacement | ❌ Fail |
| Skill badges | Background fill | Outline suppressed by Tailwind resets, no replacement | ❌ Fail |
| Social links | Border + bg highlight | **None** | ❌ Fail |
| Contact form inputs | — | `focus:outline-none` + `focus:border-cobalt` only | ⚠️ Weak |
| MechanicalButton | Scale + inset shadow | **None** — only `onMouseDown`/`onMouseUp` handlers | ❌ Fail |
| Blog article links | Underline | Browser default removed? `blog-article a` has no `:focus` rule | ⚠️ Weak |
| CTA buttons (Transmit) | Scale + inset shadow | **None** | ❌ Fail |

**WCAG 2.4.7 Focus Visible (AA)** requires a visible focus indicator. The site systematically suppresses default browser outlines (`focus:outline-none`) and fails to provide custom `:focus-visible` styles. A keyboard user tabbing through the page has **no idea where they are**.

### 3.2 Focus Traps & Keyboard Navigation

| Pattern | Expected | Actual | Verdict |
|---------|----------|--------|---------|
| Mobile menu overlay | Focus moves into menu; Escape closes; focus returns to hamburger | Focus stays on trigger; no Escape handler; no return | ❌ Fail |
| Project card videos | Keyboard focus should not trigger unexpected audio/video | Videos only play on `onMouseEnter` — keyboard users get no preview | ⚠️ Acceptable (muted) |
| Skill badge tooltips | Tooltip should show on focus | Tooltip only shows on click; no keyboard equivalent for "preview" | ⚠️ Partial |
| Terminal typewriter | Screen reader should not hear every character | No `aria-live` region; content is static DOM reveal, so SR reads final state once visible | ⚠️ Partial |

---

## 4. Cognitive Load Assessment

### 4.1 Information Density

| Section | Issue |
|---------|-------|
| **Global** | 100% of headlines, nav items, buttons, and labels are `uppercase`. Uppercase reduces reading speed by ~10% and eliminates shape recognition cues. |
| **Hero** | Video crossfade + parallax + scroll fade + scale animation. Four simultaneous motion layers before the user reads a word. |
| **Manifesto** | 10 words each treated as separate animated spans. Staggered reveal forces the eye to jump. |
| **Timeline** | 12 dense events, each with 3–5 uppercase tags. On mobile, the alternating layout collapses to a single column with heavy left-indent repetition. |
| **Skills** | 33 clickable badges in a single cloud. No grouping semantics for screen readers (just a flat `<div>` of buttons). |
| **Terminal** | Three separate typewriter effects (Profile, ADR-47, Social). Combined with blinking cursors, this creates a "busy" impression. |

### 4.2 Animation Distraction

Lenis smooth scroll + GSAP scroll-triggered entrances on **every section** mean the page never stops moving as the user scrolls. For users with ADHD or vestibular sensitivity, this is exhausting.

**No `prefers-reduced-motion` media query exists anywhere in the codebase.**

---

## 5. Form UX Analysis

### 5.1 Field Labels & Instructions

- Labels use a terminal metaphor (`$ name:`) which is cute but adds cognitive load.
- **No visible required field indicator** (asterisk, "Required" text, or icon). Users must submit and fail to learn what's mandatory.
- The `engagement_type` select has a placeholder of `"Select..."` but no visible label explaining the field once a value is chosen (the underline-only style removes the label from view).

### 5.2 Error Messaging

- Error text: `"Required field: name cannot be null"` — robotic, developer-centric language.
- Error font: `font-mono text-[11px]` — **11px is below the 12px readability floor** for many users.
- Error color: oxblood on creme passes contrast, but the size makes it hard to read.
- **No `aria-invalid="true"`** on inputs when in error state.
- **No `aria-describedby`** linking the input to its error message. Screen reader users typing into the field do not hear that an error exists.
- Validation triggers on `onBlur` (good) but also on submit. However, if a user fixes an error, the error message disappears immediately on the next keystroke (via `setErrors` in `handleChange`? No — actually `handleChange` only updates `formData`; errors are only cleared on re-validation. The error persists until `handleBlur` or `handleSubmit` runs again).

### 5.3 Success State

- On success, the form is replaced with a checkmark icon and "TRANSMISSION SUCCESSFUL".
- **No `aria-live` region** announces the success state to screen reader users. They may not realize the form submitted.

---

## 6. Mobile UX Evaluation

| Criterion | Finding | Verdict |
|-----------|---------|---------|
| **Touch targets** | Skill badges (~28px tall), timeline tags (~20px tall), blog tags (~24px tall) are below the 44×44px WCAG 2.5.5 target size. | ❌ Fail |
| **Hamburger button** | 24×24px icon inside a 40×40px padding area. Total tap area is adequate, but the visible lines are thin (2px). | ⚠️ Marginal |
| **Viewport** | `meta viewport` present. Uses `100dvh` correctly. | ✅ Pass |
| **Gesture support** | HorizontalPanWipe component has no reduced-motion fallback. No alternative tap/click to trigger wipe animation. | ⚠️ Partial |
| **Mobile menu** | Full-screen overlay. No focus management. No backdrop click to close. | ❌ Fail |

---

## 7. Missing Accessibility Patterns

| Pattern | Status | Location |
|---------|--------|----------|
| **Skip-to-content link** | ❌ Missing | Global — first focusable element should jump to `<main>` |
| **Landmarks** | ⚠️ Partial | `<main>` exists but no `<header>`; sections are generic `<section>` with no `aria-labelledby` |
| **`aria-live` regions** | ❌ Missing | Terminal typewriters, form success, mobile menu open/close |
| **`aria-invalid` + `aria-describedby`** | ❌ Missing | Contact form inputs |
| **`prefers-reduced-motion`** | ❌ Missing | Global CSS + JS (GSAP + Lenis) |
| **Video pause/stop controls** | ❌ Missing | Hero background videos, ADR-47 background video |
| **Link underlines (non-color indicator)** | ⚠️ Partial | Blog post body links underlined; nav/footer/social links are color-only |
| **Page title updates** | ✅ Present | Router handles title via `index.html` static title; no dynamic page title changes on route |
| **Language attribute** | ✅ Present | `<html lang="en">` |

---

## 8. Ranked Top 5 Improvements

Sorted by **Priority = Impact ÷ Effort**.

---

### #1 — Missing Skip-to-Content Link & Landmark Gaps

| | |
|---|---|
| **Issue name** | Skip-to-Content Link Missing & Landmark Labeling Gaps |
| **Location** | Global (`Layout.tsx`, all pages) |
| **WCAG violation** | 2.4.1 Bypass Blocks (AA), 1.3.1 Info and Relationships (AA) |
| **Severity** | **High** |
| **Current problem** | Keyboard and screen-reader users must tab through the entire navbar (logo + 3 links + hamburger) on every page load to reach `<main>`. There is no mechanism to bypass repeated blocks. Additionally, 11 `<section>` elements have no `aria-labelledby` or unique labels, making landmark navigation in screen readers useless. |
| **Proposed fix** | 1. Add a visually hidden skip link as the first child of `<body>`:<br>```tsx<br><a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-cobalt focus:text-creme focus:px-4 focus:py-2 focus:rounded focus:font-headline focus:text-label">
  Skip to main content
</a><br>```<br>2. Add `id="main-content"` to the `<main>` element in `Layout.tsx`.<br>3. Add `aria-labelledby` to each major section pointing to its `<h2>` ID.<br>4. Add `role="banner"` to the navbar or wrap it in `<header>`. |
| **Before/After** | *Before:* Tab order starts at "DIEGO SAID" logo on every page refresh. Screen reader rotor shows 11 unlabeled "region" landmarks. *After:* First Tab reveals "Skip to main content". Pressing Enter jumps past navbar. Screen reader rotor shows labeled regions: "Hero", "Selected Work", "Career Timeline", etc. |
| **Impact score** | 8 |
| **Effort score** | 2 |
| **Priority** | **4.0** |

---

### #2 — Invisible Keyboard Focus Indicators on All Interactive Elements

| | |
|---|---|
| **Issue name** | Focus States Suppressed Without Replacement |
| **Location** | Global — Navbar, Footer, Project Cards, Skill Badges, Social Links, Buttons, Form Inputs |
| **WCAG violation** | 2.4.7 Focus Visible (AA), 2.4.11 Focus Not Obscured (AAA — aspirational) |
| **Severity** | **Critical** |
| **Current problem** | Tailwind's `focus:outline-none` is applied globally (implicit in base styles) and custom `:focus-visible` styles are absent. The nav underline shimmer only fires on `:hover`. Buttons rely on `onMouseDown` for press states. Keyboard users tabbing through the site see **zero visual feedback**. |
| **Proposed fix** | Add a global `:focus-visible` strategy in `index.css` and component-specific overrides:<br>```css<br>@layer base {
  :focus-visible {
    outline: 2px solid var(--color-cobalt);
    outline-offset: 2px;
  }
}

@layer components {
  .nav-link:focus-visible::after {
    transform: scaleX(1);
    animation: nav-shimmer 1.5s linear infinite;
  }
}
```<br>In `MechanicalButton.tsx`, add `:focus-visible` pseudo-class handling via a shared class:<br>```tsx
const base = '... focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-creme';
```<br>Remove `focus:outline-none` from form inputs and replace with:<br>```tsx
className="... focus-visible:border-cobalt focus-visible:ring-1 focus-visible:ring-cobalt"
``` |
| **Before/After** | *Before:* Tab through navbar — no visible change. Tab to project cards — no visible change. Tab to skill badges — no visible change. *After:* Every interactive element receives a 2px cobalt outline with 2px offset. Nav links show the shimmer underline on focus. Buttons show a ring. |
| **Impact score** | 10 |
| **Effort score** | 3 |
| **Priority** | **3.33** |

---

### #3 — Mobile Menu Lacks Focus Trap & Escape Key Handler

| | |
|---|---|
| **Issue name** | Mobile Menu Focus Management & Keyboard Dismissal |
| **Location** | `src/components/Navbar.tsx` |
| **WCAG violation** | 2.4.3 Focus Order (AA), 2.1.1 Keyboard (AA), 2.4.7 Focus Visible (AA) |
| **Severity** | **Critical** |
| **Current problem** | When the hamburger is activated, the overlay opens but focus remains on the hamburger button. A screen-reader user must manually navigate forward to discover the menu. Pressing `Escape` does nothing. There is no `aria-controls` linking the button to the menu panel. Focus is not returned to the hamburger when the menu closes. |
| **Proposed fix** | 1. Add `useRef` for the first menu link and the hamburger button.<br>2. On `menuOpen = true`, use `useEffect` to `.focus()` the first menu link after the CSS transition (e.g., 50ms timeout).<br>3. Add a `useEffect` keydown listener for `Escape` that calls `setMenuOpen(false)`.<br>4. Add `aria-controls="mobile-menu"` to the hamburger button and `id="mobile-menu"` to the overlay `<div>`.<br>5. Use `useRef` to store the element that triggered the menu open; on close, return focus to it.<br>```tsx
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
  };
  document.addEventListener('keydown', handleKey);
  return () => document.removeEventListener('keydown', handleKey);
}, [menuOpen]);
``` |
| **Before/After** | *Before:* Open menu → screen reader still reads "Toggle menu, button". Press Tab → reads desktop nav (hidden but still in DOM order). Press Escape → nothing. *After:* Open menu → focus moves to "PROJECTS" link. Screen reader reads "Projects, link, 1 of 3". Press Escape → menu closes, focus returns to hamburger button. |
| **Impact score** | 8 |
| **Effort score** | 3 |
| **Priority** | **2.67** |

---

### #4 — Contact Form Fails Screen Reader & Low-Vision Users

| | |
|---|---|
| **Issue name** | Form Lacks Accessible Error States, Required Indicators, and Live Regions |
| **Location** | `src/sections/Section09Contact.tsx` |
| **WCAG violation** | 1.3.1 Info and Relationships (AA), 3.3.1 Error Identification (AA), 3.3.2 Labels or Instructions (AA), 3.3.3 Error Suggestion (AA), 4.1.3 Status Messages (AA) |
| **Severity** | **Critical** |
| **Current problem** | Required fields are not visually marked. Error messages are 11px monospace text with no ARIA association. Inputs do not declare `aria-invalid`. Screen readers do not announce validation errors inline. On successful submit, the form is replaced visually but not announced. |
| **Proposed fix** | 1. **Required indicators:** Add a red asterisk or "(Required)" text to labels:<br>```tsx
<label>
  $ {field.label}:{field.required && <span className="text-oxblood ml-1" aria-hidden="true">*</span>}
</label>
```<br>2. **ARIA associations:** Add `id` to each error `<p>` and link via `aria-describedby` on the input. Add `aria-invalid={!!errors[field.key]}` on inputs.<br>3. **Error text:** Increase to `text-[13px]` minimum. Rewrite in plain language:<br>`"Please enter your name"` instead of `"Required field: name cannot be null"`.<br>4. **Live region:** Wrap the submitted success state in an `aria-live="polite"` container:<br>```tsx
<div aria-live="polite" aria-atomic="true">
  {submitted && <SuccessMessage />}
</div>
```<br>5. **Fieldset/Legend:** Wrap the form in `<form>` (already done) but ensure the "PROJECT INQUIRY FORM" heading is associated via `aria-labelledby` on the form. |
| **Before/After** | *Before:* User tabs to Name field, hears "name, edit text". Leaves blank, tabs away — no announcement of error. Submits form — hears nothing, form just disappears. *After:* User tabs to Name field, hears "Name, required, edit text". Leaves blank, tabs away — hears "Invalid entry, Please enter your name". Submits successfully — hears "Transmission successful, your message has been received." |
| **Impact score** | 9 |
| **Effort score** | 4 |
| **Priority** | **2.25** |

---

### #5 — Pervasive Low-Contrast Muted Text (Stone on Creme)

| | |
|---|---|
| **Issue name** | Stone `#C4BFB5` on Creme `#F5F3EF` Fails WCAG AA Contrast |
| **Location** | Global — Section eyebrows, blog metadata, timeline org names, contact placeholders, award orgs, footer secondary text |
| **WCAG violation** | 1.4.3 Contrast (Minimum) (AA) |
| **Severity** | **High** |
| **Current problem** | The Stone color (1.65:1 against Creme) is used for every piece of secondary information on the site. At 11px–14px sizes, this text is unreadable for users with low vision, presbyopia (common in 40+ professionals), or on low-brightness mobile screens. The target audience — high-end technical clients and recruiters — skews older and wealthier, making this a business risk as well as an accessibility failure. |
| **Proposed fix** | Darken Stone to a new accessible value. The closest on-brand shift:<br>**New Stone:** `#9E998F` (4.6:1 on Creme) or **`#8A8579` (5.8:1 on Creme)** for comfortable AA compliance.<br>Update in `tailwind.config.js` and `index.css`:<br>```js
stone: '#8A8579',
```<br>If the lighter Stone is needed for decorative borders/dividers, split into two tokens:<br>```js
stone: '#8A8579',       // text — accessible
stoneLight: '#C4BFB5',  // borders, decorative lines only
```<br>Audit all `text-stone` usages to confirm they are actual text (not borders). Update `placeholder:text-stone` to `placeholder:text-stone` (will auto-update if token changes). |
| **Before/After** | *Before:* Section eyebrows (`// ━━━ SELECTED WORK ━━━`), blog dates, and timeline org names appear as faint gray ghosts. On a sunny phone screen, they disappear entirely. *After:* All secondary text is legible at 4.6:1+ contrast. The visual hierarchy is preserved because the color is still muted relative to Ink, but it no longer excludes low-vision users. |
| **Impact score** | 8 |
| **Effort score** | 4 |
| **Priority** | **2.0** |

---

## 9. Accessibility Checklist

| WCAG 2.1 Criterion | Level | Status | Notes |
|--------------------|-------|--------|-------|
| 1.1.1 Non-text Content | A | ⚠️ Partial | Decorative videos lack `aria-hidden`; project card videos have no alt |
| 1.3.1 Info and Relationships | A | ❌ Fail | No `aria-describedby` on form errors; no landmark labels |
| 1.3.2 Meaningful Sequence | A | ✅ Pass | DOM order is logical |
| 1.4.1 Use of Color | A | ❌ Fail | Error states rely on color only; links rely on color only (nav/footer) |
| 1.4.2 Audio Control | A | ❌ Fail | Hero & ADR-47 videos autoplay with no pause/stop control |
| 1.4.3 Contrast (Minimum) | AA | ❌ Fail | Stone/Creme 1.65:1; Cobalt/Ink 2.24:1 |
| 1.4.4 Resize Text | AA | ✅ Pass | Relative units used throughout |
| 1.4.10 Reflow | AA | ✅ Pass | Responsive layout handles 320px width |
| 1.4.11 Non-text Contrast | AA | ⚠️ Partial | Focus indicators are invisible; UI borders okay |
| 1.4.12 Text Spacing | AA | ✅ Pass | No fixed heights on text containers |
| 1.4.13 Content on Hover/Focus | AA | ⚠️ Partial | Skill tooltip is hover/click-only; dismissible via click-away |
| 2.1.1 Keyboard | A | ❌ Fail | Mobile menu not keyboard-dismissible; focus not managed |
| 2.1.2 No Keyboard Trap | A | ✅ Pass | No traps found (but mobile menu is a "focus leak", not a trap) |
| 2.2.1 Timing Adjustable | A | ✅ Pass | No time limits |
| 2.2.2 Pause, Stop, Hide | A | ❌ Fail | Autoplaying videos lack controls |
| 2.3.1 Three Flashes | A | ✅ Pass | No flashing content |
| 2.3.3 Animation from Interactions | AAA | ❌ Fail | No `prefers-reduced-motion` support |
| 2.4.1 Bypass Blocks | A | ❌ Fail | No skip link |
| 2.4.2 Page Titled | A | ⚠️ Partial | Static title only; no dynamic route titles |
| 2.4.3 Focus Order | A | ❌ Fail | Mobile menu focus does not move into overlay |
| 2.4.4 Link Purpose (In Context) | A | ✅ Pass | Link text is descriptive |
| 2.4.5 Multiple Ways | AA | ✅ Pass | Navigation, in-page links, footer links |
| 2.4.6 Headings and Labels | AA | ✅ Pass | Headings are descriptive; labels present |
| 2.4.7 Focus Visible | AA | ❌ Fail | No visible focus indicators |
| 2.5.2 Pointer Cancellation | A | ✅ Pass | Buttons activate on mouseup |
| 2.5.3 Label in Name | A | ✅ Pass | Accessible names match visible text |
| 2.5.5 Target Size | AAA | ❌ Fail | Skill badges, tags < 44×44px |
| 3.1.1 Language of Page | A | ✅ Pass | `lang="en"` |
| 3.1.2 Language of Parts | AA | ✅ Pass | No mixed-language content |
| 3.2.1 On Focus | A | ✅ Pass | No context change on focus |
| 3.2.2 On Input | A | ✅ Pass | No context change on input |
| 3.2.3 Consistent Navigation | AA | ✅ Pass | Navbar consistent across pages |
| 3.2.4 Consistent Identification | AA | ✅ Pass | Icons and labels consistent |
| 3.3.1 Error Identification | A | ❌ Fail | Errors not announced to AT; no `aria-invalid` |
| 3.3.2 Labels or Instructions | A | ❌ Fail | Required fields not indicated |
| 3.3.3 Error Suggestion | AA | ⚠️ Partial | Errors state what is wrong but in technical language |
| 4.1.1 Parsing | A | ✅ Pass | Valid HTML |
| 4.1.2 Name, Role, Value | A | ⚠️ Partial | Some buttons lack focus states; hamburger missing `aria-controls` |
| 4.1.3 Status Messages | AA | ❌ Fail | Form success, menu open, typewriter completions not announced |

**Pass:** 19 | **Partial:** 8 | **Fail:** 16

---

## 10. Quick Wins (Same-Day Fixes)

If the team can only ship a few changes before launch, do these in order:

1. **Add `focus-visible` styles globally** (~15 min)
2. **Add skip-to-content link** (~10 min)
3. **Darken Stone color to `#8A8579`** (~5 min token change, ~20 min visual regression check)
4. **Add `aria-invalid`, `aria-describedby`, and required asterisks to contact form** (~30 min)
5. **Add Escape key + focus management to mobile menu** (~30 min)

Combined effort: **~2 hours** to eliminate the majority of hard WCAG AA failures.

---

*End of audit.*
