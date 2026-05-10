# Accessibility & UX Agent — Top 5 Recommendations

**Agent**: Accessibility & UX Agent  
**Focus**: WCAG contrast, focus states, cognitive load, intuitive flow

| Rank | Issue | WCAG | Severity | Impact | Effort | Priority |
|------|-------|------|----------|--------|--------|----------|
| 1 | Missing Skip-to-Content Link & Landmark Gaps | 2.4.1, 1.3.1 | High | 8 | 2 | **4.00** |
| 2 | Invisible Keyboard Focus Indicators | 2.4.7 | Critical | 10 | 3 | **3.33** |
| 3 | Mobile Menu Lacks Focus Trap & Escape Key | 2.4.3, 2.1.1 | Critical | 8 | 3 | **2.67** |
| 4 | Contact Form Fails Screen Reader Users | 1.3.1, 3.3.1–3 | Critical | 9 | 4 | **2.25** |
| 5 | Pervasive Low-Contrast Muted Text (Stone on Creme) | 1.4.3 | High | 8 | 4 | **2.00** |

## Key Insight
Strong semantic HTML foundation, but **critical gaps in keyboard navigation, motion safety, and form accessibility**. 16 WCAG criteria fail, 8 partial. Hard WCAG AA failures: 7. For a portfolio targeting 40+ executives and recruiters, stone-on-creme is a significant business risk.

## Quick Wins (~2 hours combined)
1. Add `focus-visible` styles globally (~15 min)
2. Add skip-to-content link (~10 min)
3. Darken Stone color to `#8A8579` (~25 min)
4. Add `aria-invalid`, `aria-describedby`, required asterisks to contact form (~30 min)
5. Add Escape key + focus management to mobile menu (~30 min)
