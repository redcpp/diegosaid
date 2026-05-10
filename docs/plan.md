# Diego Anaya Portfolio — Execution Plan

## Overview
Build a whimsical, meticulously symmetrical, video-centric professional portfolio landing page for Diego Said Anaya Mancilla. Every visual element is video — zero static photographs. Wes Anderson-inspired symmetry with academic engineering elegance.

## User-Requested Tech Stack
- Vue 3 + Vite + TypeScript (user explicitly mentioned Astro or Vue; we use Vue)
- Tailwind CSS v3
- GSAP for scroll animations
- Lenis for smooth scrolling

## Design Direction (from user)
- **Symmetry**: Perfect center alignment everywhere — "Where Symmetry Is Policy"
- **Color Grade**: Fuji Pro 400H — lifted shadows, elegant tones, slightly desaturated warm highlights, academic engineering palette
- **Typography**: Futura Bold for headlines, Courier Prime for body text
- **Hero**: Full-viewport looping cinematic video — symmetrical dolly tracking shot through miniature project dioramas
- **Micro-interactions**: Horizontal pan wipes, mechanical click buttons, futuristic scroll indicator
- **Style**: Whimsical, Anderson-style chapter introductions with title cards

## Stages

### Stage 1 — Init Project
- Read webapp-building-swarm SKILL.md
- Run init-webapp.sh with Vue template
- Gather research from resume (already done)

### Stage 2 — Design (Pro_Designer)
- Create Pro_Designer subagent
- Designer reads design-guide.md
- Designer creates design.md + per-page designs
- Asset manifest with video descriptions for hero + sections

### Stage 3 — Read Design & Plan Grouping
- Read design.md
- Decide page grouping for parallel agents
- Create scaffold branch

### Stage 4 — Scaffold (Single Subagent)
- Generate ALL video assets (hero video, section videos)
- Implement landing/home page with hero video
- Create shared components (Navbar, Footer, Layout)
- Set up Vue Router with route stubs
- Configure Tailwind theme, global CSS, Google Fonts

### Stage 5 — Merge Scaffold & Create Branches

### Stage 6 — Parallel Page Subagents
- Group 1: Projects/Experience section + Skills section
- Group 2: Publications + Contact/Footer section
- Group 3: About/Bio section + micro-interactions system

### Stage 7 — Merge, Build & Deploy
- Octopus merge all branches
- Wire routes in App.vue
- Build and deploy

## Content Sources
- Resume PDF: /mnt/agents/upload/Diego_Anaya_Resume_May_2026 (2).pdf
- All professional details extracted and available
