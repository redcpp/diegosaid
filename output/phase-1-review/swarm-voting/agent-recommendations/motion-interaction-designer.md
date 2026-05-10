# Motion & Interaction Designer — Top 5 Recommendations

**Agent**: Motion & Interaction Designer  
**Focus**: Animations, transitions, hover states, scroll behavior

| Rank | Issue | Severity | Impact | Effort | Priority |
|------|-------|----------|--------|--------|----------|
| 1 | Lenis ↔ GSAP ScrollTrigger Desynchronization | Critical | 9 | 3 | **3.00** |
| 2 | Missing `prefers-reduced-motion` Support | High | 8 | 4 | **2.00** |
| 3 | Monotonous Entrance Rhythm (The `power2.out` Problem) | High | 7 | 6 | **1.17** |
| 4 | Missing GPU Compositing & Layer Promotion | Medium | 6 | 2 | **3.00** |
| 5 | Static Footer & Navbar, No Page Transitions | Medium | 6 | 4 | **1.50** |

## Key Insight
Overall Grade: **B−** — Good execution, missed integrations, repetitive choreography. Six sections use virtually identical `y: 40/60→0, opacity: 0→1, power2.out` entrances. Custom CSS easing curves are defined but almost never used.

## Critical Finding
Lenis is initialized but **never connected to GSAP ScrollTrigger** (`lenis.on('scroll', ScrollTrigger.update)` is missing). Native `scrollIntoView({ behavior: 'smooth' })` conflicts with Lenis. This causes scrub animations to feel "rubbery."

## Motion Spec Highlights
- **Signature easing**: `cubic-bezier(0.22, 1, 0.36, 1)` — primary entrances
- **Dramatic easing**: `cubic-bezier(0.87, 0, 0.13, 1)` — Awards, ADR-47 reveals
- **Rule**: Never use `power2.out` for more than 40% of animations on a single page
- **Duration**: Hero 0.5–0.8s; section entrances 0.6–0.9s; hover 0.2–0.35s
