# Scope: Milestone 1 - Platform Foundation & Core Diagnostics

## Architecture
- React + Vite + TypeScript.
- Tailwind CSS styling with Maritime theme (Deep Cobalt, Cerulean, Seafoam).
- GSAP center search & landing page animations.
- Framer Motion dashboard and route transitions.
- Recharts for data plotting.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Setup & Base Dependencies | Install & configure React, Vite, Tailwind CSS, GSAP, Framer Motion, Recharts | none | DONE |
| 2 | Layout Shell & Navigation | Sidebar for 11 modules, Header, medical disclaimer banner, client routing | M1.1 | IN_PROGRESS |
| 3 | Animated Landing Page | Hero section with GSAP animated layout and central search input | M1.2 | PLANNED |
| 4 | Module 1: Cancer Detection | Binary classification UI, simulation logic, animated probability bar | M1.2 | PLANNED |
| 5 | Module 2: Cancer Classification | Subtype classification UI, dynamic bar chart, togglable confusion matrix | M1.2 | PLANNED |
| 6 | Module 3: Stage Prediction | Stage I-IV classifier with clinical and gene expression inputs | M1.2 | PLANNED |

## Interface Contracts
### Medical Disclaimer Banner
- Verbatim: "Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions."
- Non-dismissible, persistent, visible on all prediction surfaces.

### Theme Colors
- Deep Cobalt: bg-[#0B192C]
- Card Obsidian: bg-[#1E3E62]
- Seafoam Green: text-[#00D2C4] / bg-[#00D2C4]
- Cerulean Blue: text-[#008DDA] / bg-[#008DDA]
