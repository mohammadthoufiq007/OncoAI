# Cancer Intelligence Platform (CIP) v1.0 — End-to-End (E2E) Testing Infrastructure

This document outlines the E2E testing strategy, features mapped, and the 161 designed test cases for the Cancer Intelligence Platform (CIP) v1.0. It also documents the testing infrastructure, environment checks, and the directory structure established for running these tests.

---

## 1. E2E Testing Strategy & Infrastructure

### 1.1 Executive Summary & Testing Objectives
The CIP v1.0 is an interactive, precision oncology React web application styled with a "Maritime Clinical Observatory" dark-themed layout. It integrates 11 specialized diagnostic and prognostic simulation modules. Because the application produces patient analytics based on mock algorithms, the primary QA objective is to guarantee **functional reliability, theme compliance, medical disclaimer prominence, and workflow integrity** from an end-user perspective.

The testing strategy is designed for **opaque-box E2E testing**, treating the application as a single package and asserting correctness based on DOM visibility, visual style parameters, data flow consistency, and user interaction loops.

### 1.2 E2E Testing Framework Decision
Following system environment inspection, **Playwright** has been selected as the automation framework.

**Environment Findings:**
- **Node.js**: `v24.14.0` (Available)
- **NPM**: `11.9.0` (Available)
- **Global Packages**: `@anthropic-ai/claude-code`, `openclaw`
- **Internet Connectivity**: Active (tested via ping/registry query). No offline restrictions apply, enabling dynamic package installation.
- **Framework Availability**: Playwright is fully supported, runnable via `npx playwright`, and has been installed as a development dependency.

**Rationale for Playwright selection:**
1. Native TypeScript support.
2. Robust auto-waiting and browser context isolation.
3. Excellent built-in API for style verification (asserting CSS class name patterns).
4. Direct console monitoring to detect background exceptions (`console.error`).
5. Out-of-the-box support for multi-browser rendering (Chromium, Firefox, WebKit).

---

### 1.3 Verification Channels
To ensure comprehensive verification, the test suite leverages six distinct verification channels:
1. **DOM Elements Verification (DOM)**: Asserts the presence, state, and text content of form fields, output badges, tables, and buttons.
2. **CSS & Styling Verification (STYLE)**: Verifies layout structure and strict compliance with the **Maritime Clinical Observatory** palette.
3. **Medical Disclaimer Integrity (DISC)**: Ensures that the banner is visible, contains the exact legal text, and remains non-dismissible.
4. **Behavioral & Interaction Verification (INT)**: Asserts correct event handling on clicks, scrolls, form submissions, and input changes.
5. **Animation & Transition Verification (ANIM)**: Checks page transitions (Framer Motion) and timeline sequence animations (GSAP) to prevent layout shifts or frozen states.
6. **Console & Error Log Monitoring (ERR)**: Subscribes to browser page errors and console output to verify that no TypeScript, JavaScript, or rendering exceptions occur.

---

### 1.4 Selectors & Theme Specifications
The application elements must conform to the **Maritime Clinical Observatory** theme:
- **Deep Cobalt Background**: Elements must resolve to `bg-[#0B192C]` (Hex `#0B192C`).
- **Card Slate Panels**: Elements must resolve to `bg-[#1E3E62]` (Hex `#1E3E62`).
- **Seafoam Accent (Positive)**: Elements must resolve to `text-[#00D2C4]` or `bg-[#00D2C4]` (Hex `#00D2C4`).
- **Cerulean Accent (Interactive)**: Elements must resolve to `text-[#008DDA]` or `bg-[#008DDA]` (Hex `#008DDA`).
- **Disclaimer Banner Locator**: `[data-testid="medical-disclaimer-banner"]` or text matching the verbatim disclaimer string.

---

## 2. Directory Structure & Execution

The following directory structure has been established for E2E testing:

```
c:\Users\Thoufiq\Downloads\OncoAI\
├── playwright.config.ts                     # Playwright configuration
├── package.json                             # Dependencies and test:e2e script
├── tests/
│   └── e2e/
│       ├── helpers/
│       │   ├── theme-helpers.ts             # Asserts theme palette compliance
│       │   └── disclaimer-helpers.ts        # Asserts medical disclaimer text
│       └── specs/
│           ├── tier1-feature-coverage.spec.ts # Feature coverage tests
│           ├── tier2-boundary-edge.spec.ts    # Boundary and edge case tests
│           ├── tier3-cross-feature.spec.ts    # Pairwise integration tests
│           └── tier4-real-world.spec.ts       # End-to-end clinical workflow scenarios
```

### 2.1 Test Scripts
The following script has been added to `package.json` to execute tests:
- **Run all E2E tests**: `npm run test:e2e`
- **Run in UI Mode**: `npx playwright test --ui`
- **Run specific tier**: `npx playwright test tests/e2e/specs/tier1-feature-coverage.spec.ts`

---

## 3. Feature Mapping (14 Target Features)

The test suite covers exactly 14 core features of the platform:
1. **Sidebar & Page Layout** (F01)
2. **Theme Styling** (F02)
3. **Medical Disclaimer Banner** (F03)
4. **Cancer Detection** - Module 1 (F04)
5. **Cancer Classification** - Module 2 (F05)
6. **Stage Prediction** - Module 3 (F06)
7. **Tumor Progression** - Module 4 (F07)
8. **Survival Prediction** - Module 5 (F08)
9. **Cancer Recurrence Prediction** - Module 6 (F09)
10. **Biomarker Discovery** - Module 7 (F10)
11. **Explainable AI SHAP** - Module 8 (F11)
12. **Genetic Risk Assessment** - Module 9 (F12)
13. **Patient Similarity Engine** - Module 10 (F13)
14. **Clinical Report Generator** - Module 11 (F14)

---

## 4. Test Suite Design: 4 Tiers (161 Test Cases)

### Tier 1: Feature Coverage (70 Test Cases)
*5 test cases per feature verifying core functionality.*

#### Feature 1: Sidebar & Page Layout
- **[TC-T1-F01-001] Sidebar Navigation Presence**: Verify sidebar displays all 11 modules and landing page links.
- **[TC-T1-F01-002] Active Link State**: Verify that clicking a navigation link styles it as active.
- **[TC-T1-F01-003] Smooth Route Transitions**: Verify route changes update browser URL without triggering full page reload.
- **[TC-T1-F01-004] Responsive Collapse Behaviour**: Verify sidebar collapses into a mobile menu at 768px viewport width.
- **[TC-T1-F01-005] Page Layout Regions**: Verify presence of Sidebar, Header, Main Panel, and Footer banner regions.

#### Feature 2: Theme Styling
- **[TC-T1-F02-001] Deep Cobalt Background**: Verify main dashboard layout background is styled with `bg-[#0B192C]`.
- **[TC-T1-F02-002] Card Slate Panels**: Verify module cards and panels use `bg-[#1E3E62]`.
- **[TC-T1-F02-003] Seafoam Positive Signals**: Verify low-risk/success badges are styled with seafoam `#00D2C4`.
- **[TC-T1-F02-004] Cerulean Focus Elements**: Verify primary buttons and active selections use cerulean `#008DDA`.
- **[TC-T1-F02-005] Global Dark Mode Classes**: Verify root element contains `dark` class on initial load.

#### Feature 3: Medical Disclaimer Banner
- **[TC-T1-F03-001] Disclaimer Presence on Home**: Verify medical disclaimer banner is rendered on initial app load.
- **[TC-T1-F03-002] Disclaimer Verbatim Text**: Assert disclaimer matches exactly: *"Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions."*
- **[TC-T1-F03-003] Disclaimer Persistence Across Pages**: Verify disclaimer is visible on all 11 module subpages.
- **[TC-T1-F03-004] Disclaimer Non-Dismissible**: Verify no close buttons are present on the banner.
- **[TC-T1-F03-005] Disclaimer Sticky Positioning**: Verify disclaimer is stickily positioned at the viewport edge.

#### Feature 4: Cancer Detection (Module 1)
- **[TC-T1-F04-001] Inputs Rendering**: Verify fields for tumor size, mitotic index, and age render correctly.
- **[TC-T1-F04-002] Prediction Trigger & Loader**: Verify click on 'Analyze' displays a visual loading sequence.
- **[TC-T1-F04-003] Binary Prediction Output**: Verify output resolves to either 'Malignant' or 'Benign'.
- **[TC-T1-F04-004] Animated Probability Bar**: Verify probability bar width animates to the calculated score.
- **[TC-T1-F04-005] Reset Inputs Functionality**: Verify 'Reset' clears outputs and returns inputs to default.

#### Feature 5: Cancer Classification (Module 2)
- **[TC-T1-F05-001] Molecular Marker Inputs**: Verify dropdowns for ER, PR, HER2, and Ki-67 render.
- **[TC-T1-F05-002] Subtype Distribution Outputs**: Verify output displays a probability breakdown of subtypes.
- **[TC-T1-F05-003] Subtype Recharts Bar Chart**: Verify Recharts bar chart rendering.
- **[TC-T1-F05-004] Confusion Matrix Toggle**: Verify confusion matrix overlay toggles on button click.
- **[TC-T1-F05-005] Chart Tooltips Hover**: Verify hovering chart elements triggers a detailed tooltip.

#### Feature 6: Stage Prediction (Module 3)
- **[TC-T1-F06-001] TNM Staging Inputs**: Verify select menus for T, N, M staging options.
- **[TC-T1-F06-002] Stage Calculation Trigger**: Verify calculated Stage matches standard AJCC TNM rules.
- **[TC-T1-F06-003] Stage Classification Display**: Verify stage (I-IV) prints in large typography with Cobalt/Cerulean colors.
- **[TC-T1-F06-004] Gene Expression Table**: Verify supporting gene expression table renders.
- **[TC-T1-F06-005] Diagnostic Limitation Disclaimer**: Verify view has dedicated warning on diagnostic limits.

#### Feature 7: Tumor Progression (Module 4)
- **[TC-T1-F07-001] Aggressiveness Parameters**: Verify inputs for mitotic rate, growth index, and necrosis percentage.
- **[TC-T1-F07-002] Aggressiveness Score Output**: Verify progression calculates a score from 0.0 to 10.0.
- **[TC-T1-F07-003] Animated Gauge Chart**: Verify gauge needle pivots to correct score value.
- **[TC-T1-F07-004] Theme Gauge Color Segments**: Verify gauge segments match theme colors.
- **[TC-T1-F07-005] Progression Risk Category**: Verify mapping of score to 'Indolent', 'Intermediate', or 'Aggressive'.

#### Feature 8: Survival Prediction (Module 5)
- **[TC-T1-F08-001] Survival Parameter Form**: Verify age, stage, and therapy checklist inputs.
- **[TC-T1-F08-002] Kaplan-Meier Curve Rendering**: Verify Recharts Kaplan-Meier curve is plotted.
- **[TC-T1-F08-003] Survival Curve Tooltips**: Verify hovering over line coordinates reveals survival rates.
- **[TC-T1-F08-004] Median Survival Estimate**: Verify estimated median survival months display.
- **[TC-T1-F08-005] KM Curve Dark Mode Theme**: Verify axes and labels are styled for dark mode legibility.

#### Feature 9: Cancer Recurrence Prediction (Module 6)
- **[TC-T1-F09-001] Recurrence Parameters Form**: Verify surgical margins and lymph nodes inputs.
- **[TC-T1-F09-002] Recurrence Percentage Output**: Verify recurrence probability calculates as percentage.
- **[TC-T1-F09-003] Risk Badge Tiering**: Verify display of Low/Medium/High Risk badge.
- **[TC-T1-F09-004] Risk Badge Color Mapping**: Verify badge uses seafoam for Low, cerulean for Medium, coral for High.
- **[TC-T1-F09-005] Risk Factor Breakdown**: Verify contributive factors list is rendered.

#### Feature 10: Biomarker Discovery (Module 7)
- **[TC-T1-F10-001] Cancer Type Dropdown Filter**: Verify cancer type dropdown allows filter selections.
- **[TC-T1-F10-002] Gene Contribution List**: Verify selection displays list of driving genes.
- **[TC-T1-F10-003] Gene Weight Bar Chart**: Verify horizontal bar chart renders contribution weights.
- **[TC-T1-F10-004] Gene List Sorting Options**: Verify sorting triggers list re-ordering.
- **[TC-T1-F10-005] Interactive Gene Cards**: Verify clicking a gene card expands its clinical details.

#### Feature 11: Explainable AI SHAP (Module 8)
- **[TC-T1-F11-001] Patient Case Selector**: Verify selector is loaded with pre-seeded clinical cases.
- **[TC-T1-F11-002] SHAP Summary Plot**: Verify summary plot renders feature impact distribution.
- **[TC-T1-F11-003] SHAP Waterfall Plot**: Verify waterfall plot renders step-wise contributions.
- **[TC-T1-F11-004] Textual SHAP Explanation**: Verify readable textual summary of key drivers is populated.
- **[TC-T1-F11-005] Raw Weights Table Toggle**: Verify user can toggle raw numeric weights table.

#### Feature 12: Genetic Risk Assessment (Module 9)
- **[TC-T1-F12-001] Sequence Variant Input Field**: Verify text area for sequence variants is visible.
- **[TC-T1-F12-002] Variant DB Parser List**: Verify sequence parses against mock variant database.
- **[TC-T1-F12-003] Predisposition Risk Level**: Verify parsed variant outputs clear risk label (Pathogenic/VUS/etc.).
- **[TC-T1-F12-004] High-Risk Genetic Alerts**: Verify pathogenic mutations trigger highlighted alert panel.
- **[TC-T1-F12-005] Clinical References Section**: Verify list of mock clinical references is displayed.

#### Feature 13: Patient Similarity Engine (Module 10)
- **[TC-T1-F13-001] Similarity Search Input**: Verify search input field accepts clinical queries.
- **[TC-T1-F13-002] Similarity Search Loader**: Verify search execution displays loading animations.
- **[TC-T1-F13-003] Top 5 Similar Cases List**: Verify search yields exactly 5 similar patient profiles.
- **[TC-T1-F13-004] Expandable Case Cards**: Verify clicking patient cards expands details.
- **[TC-T1-F13-005] Historic Treatment Profiles**: Verify expanded views print treatment timelines and outcomes.

#### Feature 14: Clinical Report Generator (Module 11)
- **[TC-T1-F14-001] Module Selector Checkboxes**: Verify checklists for all 11 modules render.
- **[TC-T1-F14-002] Select All Modules Toggle**: Verify 'Select All' and 'Clear All' change checkbox states.
- **[TC-T1-F14-003] Report Preview Panel**: Verify selected modules populate a live preview container.
- **[TC-T1-F14-004] Export PDF Execution**: Verify button transitions to generation/loading state.
- **[TC-T1-F14-005] PDF Download Event**: Verify completion displays a success toast message.

---

### Tier 2: Boundary & Edge Cases (70 Test Cases)
*5 test cases per feature verifying inputs, bounds, and stress conditions.*

#### Feature 1: Sidebar & Page Layout
- **[TC-T2-F01-001] Deep Link Routing Navigation**: Verify direct URL load renders correct module and sets link as active.
- **[TC-T2-F01-002] Extreme Viewport Resize (320px)**: Verify layout integrity and absence of horizontal overflow at 320px.
- **[TC-T2-F01-003] Rapid Double-Click Protection**: Verify rapid clicks on navigation links do not lock page routing.
- **[TC-T2-F01-004] Route Interruption Mid-Animation**: Verify navigating to a new route mid-animation completes safely.
- **[TC-T2-F01-005] Invalid Path Fallback Screen**: Verify loading non-existent path displays 404 page with redirect button.

#### Feature 2: Theme Styling
- **[TC-T2-F02-001] Ignore System Light Mode Prefs**: Verify system preference for light mode is ignored, maintaining dark theme.
- **[TC-T2-F02-002] Accessibility Color Contrast**: Verify text elements have a minimum contrast ratio of 4.5:1 on cobalt/slate.
- **[TC-T2-F02-003] Rapid Surface Switching Flashing**: Verify switching pages rapidly does not trigger brief white/light flashes.
- **[TC-T2-F02-004] Persistent Chart Theme Colors**: Verify charts maintain theme styling after updates.
- **[TC-T2-F02-005] Transparent Modals Contrast**: Verify backdrop overlays maintain contrast and modal text is readable.

#### Feature 3: Medical Disclaimer Banner
- **[TC-T2-F03-001] Keyboard Focus Escape Attempt**: Verify keyboard tab sequence does not bypass or hide the disclaimer.
- **[TC-T2-F03-002] Text Accessibility on Small Screen**: Verify disclaimer banner wraps text legibly at 360px width.
- **[TC-T2-F03-003] Text Injection Protection**: Verify script tags typed in form inputs do not execute or modify the disclaimer.
- **[TC-T2-F03-004] Modal Layering Precedence**: Verify modal dialog overlays do not obscure the disclaimer banner.
- **[TC-T2-F03-005] Long Scroll Viewport Sticky Test**: Verify disclaimer remains sticky at viewport edge during long page scrolls.

#### Feature 4: Cancer Detection
- **[TC-T2-F04-001] Negative Out-of-Bounds Input**: Verify typing negative numbers triggers form validation.
- **[TC-T2-F04-002] Empty Submission Validation**: Verify empty field submissions prompt inline required validations.
- **[TC-T2-F04-003] Sub-50% Probability Logic**: Verify low-risk values calculate < 50% probability and print 'Benign'.
- **[TC-T2-F04-004] Alphanumeric Input Rejection**: Verify alphabetic keys typed in numeric inputs are rejected.
- **[TC-T2-F04-005] Exact Threshold (50%) Check**: Verify boundary condition of exactly 50% probability resolves safely.

#### Feature 5: Cancer Classification
- **[TC-T2-F05-001] Conflicting Marker Combination**: Verify conflicting inputs calculate a fallback distribution without crashing.
- **[TC-T2-F05-002] Subtype Normalization to 100%**: Assert subtype probability outcomes sum to exactly 100%.
- **[TC-T2-F05-003] Rapid Toggle Stress Test**: Verify rapid clicking of confusion matrix toggle does not freeze UI.
- **[TC-T2-F05-004] Redraw Chart on Resize**: Verify Recharts bar chart redraws and fits containers on window resize.
- **[TC-T2-F05-005] Zero Probability Subtypes Rendering**: Verify subtypes with 0% contribution do not render bars.

#### Feature 6: Stage Prediction
- **[TC-T2-F06-001] Unknown TNM Stage Handling**: Verify select options for Tx/Nx/Mx yield indeterminate staging.
- **[TC-T2-F06-002] Missing Gene Expression Threshold**: Verify staging calculates with partial genomic data.
- **[TC-T2-F06-003] Metastasis Dominance Boundary**: Verify selecting 'M1' forces Stage IV regardless of T or N.
- **[TC-T2-F06-004] High Scale Gene Values**: Verify expression values formatting handles extreme scales safely.
- **[TC-T2-F06-005] Single Click Trigger Test**: Verify predict button is disabled during calculation.

#### Feature 7: Tumor Progression
- **[TC-T2-F07-001] Aggressiveness Score 0 (Min)**: Verify minimum parameter settings calculate score 0.0.
- **[TC-T2-F07-002] Aggressiveness Score 10 (Max)**: Verify maximum parameter settings calculate score 10.0.
- **[TC-T2-F07-003] Floating Point Rounding check**: Verify scores round correctly to one decimal place.
- **[TC-T2-F07-004] Realtime Needle Adjustment**: Verify needle slides smoothly using CSS transition properties.
- **[TC-T2-F07-005] Out-of-Bounds Progression Inputs**: Verify script-injected values are clamped to score range 0.0 - 10.0.

#### Feature 8: Survival Prediction
- **[TC-T2-F08-001] Extreme Age Inputs (120 YRS)**: Verify calculations complete for age 120, shortening survival timeline.
- **[TC-T2-F08-002] Negative Hazard Ratio Clamping**: Verify survival percentages do not exceed 100%.
- **[TC-T2-F08-003] Zero-Month Survival Boundary**: Verify KM curve starts at Time=0 with 100% survival probability.
- **[TC-T2-F08-004] Tooltip Viewport Clipping Prevention**: Verify chart tooltips at timeline edge reposition inside bounds.
- **[TC-T2-F08-005] Dynamic Path Transitions**: Verify curve updates morph SVG paths smoothly.

#### Feature 9: Cancer Recurrence Prediction
- **[TC-T2-F09-001] Recurrence Probability 0% Boundary**: Verify minimal parameters resolve to 0% recurrence.
- **[TC-T2-F09-002] Recurrence Probability 100% Boundary**: Verify maximum risk parameters resolve to 100% recurrence.
- **[TC-T2-F09-003] Contradictory Therapy inputs**: Verify choosing conflicting therapies evaluates to intermediate recurrence rates safely.
- **[TC-T2-F09-004] Risk Badge Threshold Transition**: Verify risk badge updates at boundary thresholds (e.g. 29% Low to 30% Medium).
- **[TC-T2-F09-005] Deterministic Computation Check**: Verify identical parameters calculate identical recurrence likelihoods.

#### Feature 10: Biomarker Discovery
- **[TC-T2-F10-001] Rare Cancer No Biomarkers Case**: Verify empty state message for rare subtype with no seeded data.
- **[TC-T2-F10-002] Rapid Hover Selection Performance**: Verify sweeping mouse across gene list does not backlog tooltips.
- **[TC-T2-F10-003] Long Gene Names Layout check**: Verify long gene names do not clip column layouts.
- **[TC-T2-F10-004] Zero Contribution Gene Weight**: Verify genes with 0.0 weight omit contribution bar rendering.
- **[TC-T2-F10-005] Continuous Sort Trigger Jitter**: Verify clicking sort button rapidly does not drop frames.

#### Feature 11: Explainable AI SHAP
- **[TC-T2-F11-001] Missing Patient Data Handling**: Verify missing profile fields fall back to average baseline values.
- **[TC-T2-F11-002] Extremely Long Explanation Text**: Verify explanation container wraps long descriptions.
- **[TC-T2-F11-003] Tiny Feature Weight Grouping**: Verify features with weights < 0.001 group into 'Other Features'.
- **[TC-T2-F11-004] Fast Profile Switch Synchronization**: Verify rapid case switching displays correct case data.
- **[TC-T2-F11-005] Negative Contributions Direction**: Verify negative drivers render bars extending left of axis.

#### Feature 12: Genetic Risk Assessment
- **[TC-T2-F12-001] Invalid Sequence Input Warning**: Verify non-genomic queries trigger variant format validation.
- **[TC-T2-F12-002] Empty Variant Search Submission**: Verify empty parsing requests prompt user inputs.
- **[TC-T2-F12-003] Multiple Mutation Parsing Priority**: Verify multi-variant queries rank risk by pathogenicity.
- **[TC-T2-F12-004] Unknown Variant Classification (VUS)**: Verify unrecognized mutation codes default to VUS.
- **[TC-T2-F12-005] Complex Mutation Code Parsing**: Verify brackets and punctuation parsing in mutation code queries.

#### Feature 13: Patient Similarity Engine
- **[TC-T2-F13-001] Empty Query Search Result**: Verify blank queries load top 5 baseline cases.
- **[TC-T2-F13-002] Special Characters Query Resilience**: Verify query sanitization on sql/script inputs.
- **[TC-T2-F13-003] Zero Matching Search Results**: Verify empty state prints 'No matching similar cases found'.
- **[TC-T2-F13-004] Simultaneous Expanded Cards Layout**: Verify expanding all cards increases layout height without overlap.
- **[TC-T2-F13-005] Collapse Active Card Check**: Verify clicking an expanded patient card collapses it.

#### Feature 14: Clinical Report Generator
- **[TC-T2-F14-001] Zero Selected Modules Validation**: Verify PDF generate button is disabled if zero modules are selected.
- **[TC-T2-F14-002] Empty Prediction Model Handling**: Verify uncalculated modules show 'Data Pending' warnings.
- **[TC-T2-F14-003] Rapid Double-Generate Prevention**: Verify generate click-spamming triggers only a single export event.
- **[TC-T2-F14-004] Canvas Render Dimensions**: Verify preview elements layout bounds adhere to A4 proportions.
- **[TC-T2-F14-005] Responsive Selection Scrolling**: Verify scrollbar access to modules checklist on low height displays.

---

### Tier 3: Cross-Feature Combinations (14 Test Cases)
*Integration and pairwise data-flow verifications between modules.*

- **[TC-T3-INT-001] M1 + M2 (Detection & Classification)**: Verify that high-risk binary detection results automatically pre-seed classification fields with matching malignant profiles.
- **[TC-T3-INT-002] M1 + M3 (Detection & Stage Prediction)**: Verify that a 'Benign' detection output disables advanced cancer staging select menus.
- **[TC-T3-INT-003] M2 + M5 (Classification & Survival)**: Verify that selecting aggressive subtypes (e.g., Small Cell Lung Cancer) shifts survival curve expectations downwards.
- **[TC-T3-INT-004] M3 + M4 (Stage & Tumor Progression)**: Verify that Stage IV predictions automatically default progression scores to High/Aggressive range.
- **[TC-T3-INT-005] M3 + M5 (Stage & Survival Prediction)**: Verify that selecting Stage IV shifts Kaplan-Meier curves downwards and reduces estimated median survival time.
- **[TC-T3-INT-006] M4 + M6 (Tumor Progression & Recurrence)**: Verify that setting tumor progression to aggressive (>= 8.0) defaults recurrence risk badge to High Risk.
- **[TC-T3-INT-007] M1 + M8 (Detection & Explainable AI SHAP)**: Verify that inputs submitted in Cancer Detection populate feature variables in SHAP waterfall plots.
- **[TC-T3-INT-008] M7 + M9 (Biomarkers & Genetic Risk)**: Verify that clicking 'Analyze Genetic Risk' on a BRCA1 biomarker card opens Genetic Risk Assessment pre-seeded with BRCA1.
- **[TC-T3-INT-009] M9 + M10 (Genetic Risk & Patient Similarity)**: Verify that parsing a pathogenic BRCA2 mutation enables a 'Find Similar Cases' link leading to BRCA2 carriers.
- **[TC-T3-INT-010] M8 + M11 (SHAP & Clinical Report Generator)**: Verify that generating a SHAP plot inserts explanation text and waterfall plot thumbnail in Report Generator previews.
- **[TC-T3-INT-011] M2 + M7 (Classification & Biomarkers)**: Verify that classifying an adenocarcinoma pre-filters Biomarker Discovery to genes relevant to adenocarcinoma.
- **[TC-T3-INT-012] M5 + M6 (Survival & Recurrence)**: Verify that predicting high recurrence risk (e.g., 90%) adjusts survival curve slope downwards.
- **[TC-T3-INT-013] M10 + M11 (Similarity & Clinical Report Generator)**: Verify that expanding similar patient profiles enables option to append that similar case to clinical reports.
- **[TC-T3-INT-014] M1 + M11 (Detection & Clinical Report Generator)**: Verify that changing detection outputs updates report preview outputs in real-time.

---

### Tier 4: Real-World Application Scenarios (7 Test Cases)
*Complex multi-step clinical workflows simulating actual usage patterns.*

- **[TC-T4-SCEN-001] Comprehensive Patient Workup Workflow**: Simulates a clinician's diagnostic journey: search similar patient -> run detection -> verify classification -> calculate staging -> review SHAP drivers -> plot survival curve -> select all in report generator -> export clinical summary PDF.
- **[TC-T4-SCEN-002] High-Risk Genomic Screen Scenario**: Simulates geneticist workflow: enter mutation ('BRCA1 c.5266dupC') -> verify 'Pathogenic' risk -> view similar cases carrying BRCA1 -> export specialized genetic report.
- **[TC-T4-SCEN-003] Early-Stage Surveillance Protocol Scenario**: Simulates early-stage checkup: detection (Benign) -> verify Stage I -> tumor progression (1.8/10 Indolent) -> recurrence (8% Low) -> generate surveillance report.
- **[TC-T4-SCEN-004] Aggressive Small Cell Lung Cancer (SCLC) Care Pathway**: Simulates assessment for highly aggressive disease: classify as SCLC -> set T3N2M1 (Stage IV) -> progression score (9.4/10) -> check KM curve (8 months median survival) -> export report.
- **[TC-T4-SCEN-005] Genomic Sensitivity Analysis Iteration**: Simulates researcher checking ERBB2 expression variations: toggle high ERBB2 -> check staging and SHAP waterfall values -> toggle low ERBB2 -> check changes in staging, SHAP, and recurrence levels.
- **[TC-T4-SCEN-006] Medical Disclaimer Compliance Audit**: Verifies compliance: navigate all 11 modules and landing pages -> verify disclaimer verbatim text visibility -> trigger highest-risk predictions -> verify zero prescriptive language or definite clinical diagnosis claims.
- **[TC-T4-SCEN-007] Offline Operations & Data Resilience Test**: Verifies offline capability: disconnect connections -> search similarity -> run stage prediction -> export PDF -> assert all calculations execute locally on client without API connection errors.
