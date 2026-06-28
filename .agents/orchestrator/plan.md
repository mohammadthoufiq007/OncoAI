# Plan — Cancer Intelligence Platform (CIP) v1.0

## Objective
Build the Cancer Intelligence Platform (CIP) v1.0, a React Vite web application with a 11-module dashboard, custom styling (Maritime Clinical Observatory theme), responsive animated UI, and strict medical integrity checks.

## Phase 1: Setup and Architecture Plan
1. Create `PROJECT.md` at project root with:
   - Overall architecture, technologies (React, Vite, Tailwind CSS, GSAP, Framer Motion, Recharts/Chart.js).
   - Theme configuration (Maritime Clinical Observatory: Deep cobalts `#0B192C`, cerulean accents `#1E3E62`, seafoam positives `#00D2C4`, text gold/gray accents `#F1F1F1` / `#B3B4B6`).
   - Code Layout and File Structure.
   - Milestone Decomposition (Milestones 1-11).
   - Core Interface Contracts.
2. Initialize Vite React TypeScript project using a Worker agent.
3. Configure Tailwind CSS, GSAP, Framer Motion, and Recharts.

## Phase 2: Dual Track Execution
### Track A: E2E Testing Track
1. Spawn E2E Testing Orchestrator.
2. Design and implement a robust mock-running script or node-based testing suite that does opaque-box verification of CLI/web elements.
3. Verify features, boundary cases, cross-features, and workloads (Tiers 1-4).
4. Publish `TEST_READY.md`.

### Track B: Implementation Track
1. Initialize the layout, sidebar navigation, disclaimer banner, and animated landing page (GSAP).
2. Sequentially build and verify the 11 modules:
   - Module 1: Cancer Detection (binary probability bar)
   - Module 2: Cancer Classification (subtype bar chart + togglable confusion matrix)
   - Module 3: Stage Prediction (gene expression + clinical features)
   - Module 4: Tumor Progression (gauge chart)
   - Module 5: Survival Prediction (Kaplan-Meier survival curve)
   - Module 6: Cancer Recurrence Prediction (percentage recurrence + badges)
   - Module 7: Biomarker Discovery (horizontal gene bar chart)
   - Module 8: Explainable AI SHAP (SHAP summary and waterfall plots)
   - Module 9: Genetic Risk Assessment (germline variant parser)
   - Module 10: Patient Similarity Engine (similarity search cards)
   - Module 11: Clinical Report Generator (PDF exporter UI)
3. Ensure no external API dependencies (use local mock JSON and logic).

## Phase 3: Integration & Gating
1. Connect all modules inside the dashboard shell.
2. Verify application compilation (`npm run build` succeeds).
3. Run E2E test suite published in Track A.
4. Run Forensic Audit checks (integrity verification).
5. Produce final completion report.
