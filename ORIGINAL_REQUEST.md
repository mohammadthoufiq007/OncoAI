# Original User Request

## Initial Request — 2026-06-25T17:14:14Z

Build a Cancer Intelligence Platform (CIP) v1.0, which is a highly interactive, animated precision oncology AI React web application with a dashboard containing 11 medical modules and default dark mode.

Working directory: c:\Users\Thoufiq\Downloads\OncoAI
Integrity mode: benchmark

## Requirements

### R1. Technology Stack and Setup
- Build the web application using React initialized via Vite.
- Use Tailwind CSS for styling.
- Implement GSAP for complex sequence animations in the hero section and Framer Motion for smooth page transitions and micro-interactions.
- Render charts (survival curves, features, probability metrics) using Recharts or Chart.js.

### R2. UI/UX and Theme
- Apply a "Maritime Clinical Observatory" theme (deep cobalts, cerulean accents, seafoam positive signals) with default dark mode.
- Build a persistent dashboard layout containing a sidebar navigation, header, and a non-dismissible medical disclaimer banner on every prediction surface stating: *"Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions."*
- Create a striking animated landing page using GSAP with a dynamic search/input component at the center.

### R3. Core Modules (11 Modules)
Create dedicated interactive views with mock JSON data representing the following oncology modules (no external API/backend is required; all logic must be simulated on the client side using mock structures):
1. **Cancer Detection:** Binary classification with an animated probability bar.
2. **Cancer Classification:** Subtype classification with a dynamic subtype bar chart and togglable confusion matrix.
3. **Stage Prediction:** Predict Stage I-IV combining gene expression and clinical features.
4. **Tumor Progression:** Aggressiveness score (0-10) on an animated gauge chart.
5. **Survival Prediction:** Cox Proportional Hazards rendering an interactive Kaplan-Meier survival curve.
6. **Cancer Recurrence Prediction:** Percentage recurrence likelihood with low/medium/high risk badges.
7. **Biomarker Discovery:** Sorted, animated horizontal bar chart of top driving genes.
8. **Explainable AI (SHAP):** Render SHAP summary and waterfall plots.
9. **Genetic Risk Assessment:** Germline variant parser showing predisposition risk levels for specific cancers.
10. **Patient Similarity Engine:** Search component yielding top 5 similar historic cases as expandable cards.
11. **Clinical Report Generator:** UI to select specific modules and export findings as a formatted PDF.

### R4. Verification and Validation
- The application must compile successfully without TypeScript/JavaScript errors.
- A dev server must spin up successfully.

## Acceptance Criteria

### Technical Compilation & Build
- [ ] React project successfully initialized with Vite and Tailwind CSS.
- [ ] No compilation errors when building (`npm run build` succeeds).

### UI/UX & Design
- [ ] Persistent sidebar navigation links all 11 modules.
- [ ] Medical disclaimer banner is visible on all prediction surfaces.
- [ ] Maritime Clinical Observatory colors (cobalt, cerulean, seafoam) and dark mode styling applied globally.
- [ ] Animated elements (GSAP and Framer Motion transitions) function smoothly without layout shifts.

### Medical Integrity
- [ ] Disclaimer text matches precisely.
- [ ] No diagnostic certainty claims or treatment recommendations are present.
