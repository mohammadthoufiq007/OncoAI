# Project: Cancer Intelligence Platform (CIP) v1.0

## Architecture
- Frontend: React + TypeScript initialized via Vite.
- Styling: Tailwind CSS.
- Theme: "Maritime Clinical Observatory" (cobalt backgrounds, cerulean details, seafoam accents).
- Animation: GSAP for hero/landing transitions, Framer Motion for dashboard micro-interactions.
- Charts: Recharts for survival curves, subtype distributions, SHAP summary plots, and gene lists.
- Mock Engine: Seeded mock databases inside `src/data/` providing stable, interactive data flow.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Platform Foundation & Core Diagnostics | Vite/Tailwind setup, Sidebar/Header Layout, GSAP Landing, Modules 1, 2, 3 | none | IN_PROGRESS |
| 2 | Prognostics & Biomarkers | Modules 4, 5, 6, 7 (Progression, Survival, Recurrence, Biomarkers) | M1 | PLANNED |
| 3 | Interpretability & Risk Genomics | Modules 8, 9 (Explainable AI/SHAP, Genetic Risk Assessment) | M2 | PLANNED |
| 4 | Search & Reporting Engines | Modules 10, 11 (Patient Similarity, Clinical Report PDF Export) | M3 | PLANNED |
| 5 | E2E Integration & Hardening | Final integration, verify build, E2E tests, adversarial coverage | M4 | PLANNED |

## Interface Contracts
### Medical Disclaimer Banner
- Content verbatim: *"Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions."*
- Position: Persistent, non-dismissible, visible on all prediction surfaces.

### Theme Palette (Tailwind Config)
- Deep Cobalt Backgrounds: `bg-[#0B192C]` (main dashboard background)
- Card Slate/Obsidian: `bg-[#1E3E62]` (cards, sidebar, header)
- Seafoam Accent (Positive/Success): `text-[#00D2C4]` or `bg-[#00D2C4]`
- Cerulean Accent (Focus/Interactive): `text-[#008DDA]` or `bg-[#008DDA]`

## Code Layout
- `/src/components` — Sidebar, Header, Disclaimer, Layout shell
- `/src/modules` — Modules 1-11 interactive components
- `/src/data` — Seeded mock databases (cases, gene expression, survival models)
- `/src/App.tsx` — App entry point & router
- `/src/main.tsx` — Vite React entry point
