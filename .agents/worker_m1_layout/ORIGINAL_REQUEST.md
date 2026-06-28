## 2026-06-25T17:22:41Z
Your task is to build the Layout Shell & Navigation for OncoAI:
1. Create a `src/components/Sidebar.tsx` displaying navigation links for all 11 modules plus the home/landing page. Use the theme colors (Cobalt: `#0B192C`, Slate Card: `#1E3E62`, Seafoam Green: `#00D2C4`, Cerulean Blue: `#008DDA`) and Lucide React icons for the links.
2. Create a `src/components/Header.tsx` displaying the platform title: "OncoAI - Cancer Intelligence Platform v1.0" and simple status badges.
3. Create a `src/components/DisclaimerBanner.tsx` displaying the persistent, non-dismissible medical disclaimer banner. Wording MUST BE VERBATIM: "Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions." Position it clearly at the top or bottom of every prediction module or dashboard view.
4. Create placeholder module files inside `src/modules/` for all 11 modules (e.g. `DetectionView.tsx`, `ClassificationView.tsx`, `StageView.tsx`, `ProgressionView.tsx`, `SurvivalView.tsx`, `RecurrenceView.tsx`, `BiomarkerView.tsx`, `ShapView.tsx`, `GeneticView.tsx`, `SimilarityView.tsx`, `ReportView.tsx`). Each file should export a React component that shows a header, some placeholder content, and renders the `DisclaimerBanner` component.
5. Create a simple client-side router in `src/App.tsx` that coordinates the layout: a Sidebar on the left, a Header at the top, and the main view rendering either the Landing Page (Home) or one of the 11 modules based on state.
6. Verify your layout works and has no typescript/vite issues by running `npm run build`.

MANDATORY INTEGRITY WARNING — DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your handoff report to c:\Users\Thoufiq\Downloads\OncoAI\.agents\worker_m1_layout\handoff.md and notify me when complete.
