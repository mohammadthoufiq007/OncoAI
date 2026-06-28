# Cancer Intelligence Platform (CIP) v1.0 — E2E Testing Strategy & Design

This document details a comprehensive, requirement-driven, opaque-box end-to-end (E2E) testing strategy for the Cancer Intelligence Platform (CIP) v1.0. It defines the verification channels, testing architecture, and outlines **exactly 161 test cases** divided across 4 testing tiers.

---

## 1. Executive Summary & Testing Objectives
The Cancer Intelligence Platform (CIP) v1.0 is an interactive, precision oncology React web application styled with a "Maritime Clinical Observatory" dark-themed layout. It integrates 11 specialized diagnostic/prognostic simulation modules.
Because CIP outputs simulated patient analytics and risk tiers based on mock algorithms, the primary QA objective is to guarantee **functional reliability, theme compliance, medical disclaimer prominence, and workflow integrity** from an end-user perspective.

This suite is designed for **opaque-box E2E testing**, treating the application as a single package. We assert correctness based on DOM visibility, visual style parameters, data flow consistency, and user interaction loops.

---

## 2. E2E Testing Architecture & Verification Channels
The testing strategy utilizes **Playwright** as the automation framework due to its strong support for modern single-page applications (SPAs), multi-browser execution, and robust assertion library.

### 2.1 Verification Channels
To ensure comprehensive verification, the test suite leverages six distinct verification channels:
1. **DOM Elements Verification (DOM)**: Asserts the presence, state, and text content of form fields, output badges, tables, and buttons.
2. **CSS & Styling Verification (STYLE)**: Verifies layout structure and strict compliance with the **Maritime Clinical Observatory** palette.
3. **Medical Disclaimer Integrity (DISC)**: Ensures that the banner is visible, contains the exact legal text, and remains non-dismissible.
4. **Behavioral & Interaction Verification (INT)**: Asserts correct event handling on clicks, scrolls, form submissions, and input changes.
5. **Animation & Transition Verification (ANIM)**: Checks page transitions (Framer Motion) and timeline sequence animations (GSAP) to prevent layout shifts or frozen states.
6. **Console & Error Log Monitoring (ERR)**: Subscribes to browser page errors and console output to verify that no TypeScript, JavaScript, or rendering exceptions occur.

### 2.2 Selectors & Theme Specifications
- **Deep Cobalt Background**: Elements must resolve to `bg-[#0B192C]` (Hex `#0B192C`).
- **Card Slate Panels**: Elements must resolve to `bg-[#1E3E62]` (Hex `#1E3E62`).
- **Seafoam Accent (Positive)**: Elements must resolve to `text-[#00D2C4]` or `bg-[#00D2C4]` (Hex `#00D2C4`).
- **Cerulean Accent (Interactive)**: Elements must resolve to `text-[#008DDA]` or `bg-[#008DDA]` (Hex `#008DDA`).
- **Disclaimer Banner Locator**: `[data-testid="medical-disclaimer-banner"]` or text matching the verbatim disclaimer string.

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
This tier contains at least 5 test cases per feature (14 features × 5 = 70 test cases) verifying core functional requirements.


#### Feature 1: Sidebar & Page Layout

**[TC-T1-F01-001] Sidebar Navigation Presence**
- **Objective**: Verify that the sidebar renders correctly and displays all 11 modules and landing page links.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Load app.
2. Locate sidebar nav.
- **Expected Outcome**: Sidebar contains 11 distinct navigation links with matching module names.

**[TC-T1-F01-002] Active Link State**
- **Objective**: Verify that clicking a navigation link marks that link as active in the UI.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click 'Cancer Classification'.
2. Observe styling.
- **Expected Outcome**: The clicked link is styled with a distinct active indicator classes.

**[TC-T1-F01-003] Smooth Route Transitions**
- **Objective**: Verify that navigation does not trigger a full page reload but updates URL.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click different sidebar links.
2. Check browser URL.
- **Expected Outcome**: URL updates via React Router path hash/path, page transition animates smoothly.

**[TC-T1-F01-004] Responsive Collapse Behaviour**
- **Objective**: Verify that the layout adjusts correctly when viewport is resized to mobile.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Resize viewport to 768px.
2. Observe sidebar.
- **Expected Outcome**: Sidebar collapses into a mobile hamburger menu or drawer.

**[TC-T1-F01-005] Page Layout Regions**
- **Objective**: Verify that the application layout consists of Sidebar, Header, Main Panel, and footer banner.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Open dashboard.
2. Check regions.
- **Expected Outcome**: All four layout regions are correctly aligned and visible on the page.

#### Feature 2: Theme Styling (Maritime Clinical Observatory color classes)

**[TC-T1-F02-001] Deep Cobalt Background**
- **Objective**: Verify that the main dashboard layout background color matches `#0B192C`.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect the main container layout.
2. Verify CSS background color.
- **Expected Outcome**: Main container class includes `bg-[#0B192C]`.

**[TC-T1-F02-002] Card Slate Panels**
- **Objective**: Verify that individual module cards and sidebar panels match the `#1E3E62` color.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect module cards and sidebar elements.
- **Expected Outcome**: Card panels include background utility classes like `bg-[#1E3E62]`.

**[TC-T1-F02-003] Seafoam Positive Signals**
- **Objective**: Verify that successful metrics, low-risk badges, and positive alerts use seafoam `#00D2C4`.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Look at success alerts or low risk outputs.
2. Verify text/bg colors.
- **Expected Outcome**: Color classes applied use `text-[#00D2C4]` or `bg-[#00D2C4]`.

**[TC-T1-F02-004] Cerulean Focus Elements**
- **Objective**: Verify that interactive buttons, selected states, and active items use cerulean `#008DDA`.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect interactive primary buttons and focus states.
- **Expected Outcome**: Classes applied use `text-[#008DDA]` or `bg-[#008DDA]`.

**[TC-T1-F02-005] Global Dark Mode Classes**
- **Objective**: Verify that dark mode classes are active globally on load.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect html/body elements on initialization.
- **Expected Outcome**: Root element contains 'dark' class and default dark-mode styling is active.

#### Feature 3: Medical Disclaimer Banner (Verbatim text, persistent, non-dismissible, visible on all prediction surfaces)

**[TC-T1-F03-001] Disclaimer Presence on Home**
- **Objective**: Verify that the medical disclaimer banner is rendered on initial app load.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to landing page.
2. Search for disclaimer text.
- **Expected Outcome**: Medical disclaimer banner is visible at the bottom or top of the viewport.

**[TC-T1-F03-002] Disclaimer Verbatim Text**
- **Objective**: Verify that the disclaimer matches the exact requested text.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Read text content of the disclaimer banner.
2. Assert equality.
- **Expected Outcome**: Text matches exactly: 'Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions.'

**[TC-T1-F03-003] Disclaimer Persistence Across Pages**
- **Objective**: Verify that the banner remains visible during page transitions.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate through all 11 modules.
2. Check disclaimer visibility on each.
- **Expected Outcome**: The disclaimer banner is present and visible on every single prediction surface.

**[TC-T1-F03-004] Disclaimer Non-Dismissible**
- **Objective**: Verify that the disclaimer banner cannot be closed or dismissed.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect banner for 'X' or dismiss buttons.
2. Attempt swipe gestures.
- **Expected Outcome**: No close button is present; swipe gestures do not hide the banner.

**[TC-T1-F03-005] Disclaimer Sticky Positioning**
- **Objective**: Verify that scrolling the module contents keeps the disclaimer visible in the viewport.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Scroll down long content pages.
2. Check disclaimer position.
- **Expected Outcome**: Banner remains fixed or sticky at the edge of the viewport, never scrolling out of sight.

#### Feature 4: Cancer Detection (Module 1)

**[TC-T1-F04-001] Inputs Rendering**
- **Objective**: Verify that Cancer Detection inputs (tumor size, mitotic index, patient age) are visible.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Go to Cancer Detection module.
2. Observe input form.
- **Expected Outcome**: Form fields for inputs are correctly rendered and editable.

**[TC-T1-F04-002] Prediction Trigger & Loader**
- **Objective**: Verify that clicking predict starts calculations with a visual loading sequence.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Fill fields.
2. Click 'Analyze'.
3. Observe loader.
- **Expected Outcome**: An animated loading probability sequence is displayed during prediction.

**[TC-T1-F04-003] Binary Prediction Output**
- **Objective**: Verify that prediction outputs either 'Malignant' or 'Benign' based on input values.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Trigger calculation with malignant inputs.
2. Observe output label.
- **Expected Outcome**: Outputs correctly show 'Malignant' (or 'Benign' for low risk inputs).

**[TC-T1-F04-004] Animated Probability Bar**
- **Objective**: Verify that the probability bar animates to the correct percentage.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run prediction.
2. Check progress bar width/value.
- **Expected Outcome**: The probability bar smoothly animates using Framer Motion/Tailwind to correct percentage.

**[TC-T1-F04-005] Reset Inputs Functionality**
- **Objective**: Verify that the reset button clears the prediction output and inputs.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run prediction.
2. Click 'Reset'.
- **Expected Outcome**: Inputs are reset to defaults, and the prediction output is cleared.

#### Feature 5: Cancer Classification (Module 2)

**[TC-T1-F05-001] Molecular Marker Inputs**
- **Objective**: Verify that subtype classification molecular markers dropdowns/inputs render.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Go to Cancer Classification.
2. Check markers list.
- **Expected Outcome**: Inputs for ER, PR, HER2, and Ki-67 are visible and interactive.

**[TC-T1-F05-002] Subtype Distribution Outputs**
- **Objective**: Verify that subtype classification outputs probabilities for Adenocarcinoma, Squamous, etc.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Enter markers.
2. Click Classify.
- **Expected Outcome**: The UI displays a breakdown of subtype probabilities.

**[TC-T1-F05-003] Subtype Recharts Bar Chart**
- **Objective**: Verify that a dynamic bar chart displays the subtype probabilities.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Classify subtype.
2. Observe Recharts bar chart.
- **Expected Outcome**: Horizontal/vertical bar chart renders with appropriate color codings.

**[TC-T1-F05-004] Confusion Matrix Toggle**
- **Objective**: Verify that the confusion matrix overlay toggles visibility on button click.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click 'Show Confusion Matrix'.
2. Toggle it off.
- **Expected Outcome**: Confusion matrix card displays on click, and collapses on second click.

**[TC-T1-F05-005] Chart Tooltips Hover**
- **Objective**: Verify that hovering over bar chart elements displays details in tooltips.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Hover mouse pointer over a bar in the chart.
2. Inspect tooltip.
- **Expected Outcome**: A tooltip containing the exact percentage and subtype name becomes visible.

#### Feature 6: Stage Prediction (Module 3)

**[TC-T1-F06-001] TNM Staging Inputs**
- **Objective**: Verify that TNM staging drop-downs are visible and select values.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Go to Stage Prediction.
2. Inspect T, N, M select boxes.
- **Expected Outcome**: Select boxes contain options (T0-T4, N0-N3, M0-M1).

**[TC-T1-F06-002] Stage Calculation Trigger**
- **Objective**: Verify that clicking predict triggers Stage I-IV calculation.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Select inputs.
2. Click Predict Stage.
- **Expected Outcome**: Calculated Stage matches standard AJCC TNM rules (e.g. M1 is Stage IV).

**[TC-T1-F06-003] Stage Classification Display**
- **Objective**: Verify that Stage I, II, III, or IV renders with specific styling.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run staging prediction.
2. Check stage label.
- **Expected Outcome**: Stage label is rendered using large typography with Cerulean/Seafoam colors.

**[TC-T1-F06-004] Gene Expression Table**
- **Objective**: Verify that a supporting gene expression profiles table renders next to prediction.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Predict stage.
2. Observe gene table.
- **Expected Outcome**: Table displaying levels of BRCA1, TP53, EGFR, etc. is populated.

**[TC-T1-F06-005] Diagnostic Limitation Disclaimer**
- **Objective**: Verify that stage prediction view has a dedicated text warning on diagnostic limits.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Scroll to stage output area.
2. Look for warning label.
- **Expected Outcome**: Dedicated message reinforces that staging is educational/mock data only.

#### Feature 7: Tumor Progression (Module 4)

**[TC-T1-F07-001] Aggressiveness Parameters**
- **Objective**: Verify that inputs for mitotic rate, growth index, and necrosis percentage render.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Tumor Progression module.
2. Observe parameters form.
- **Expected Outcome**: Inputs are present with sliders ranging from 0-10 or 0-100%.

**[TC-T1-F07-002] Aggressiveness Score Output**
- **Objective**: Verify that tumor progression calculates a score from 0-10.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Drag sliders.
2. Click Evaluate Aggressiveness.
- **Expected Outcome**: A numerical score between 0.0 and 10.0 is calculated and displayed.

**[TC-T1-F07-003] Animated Gauge Chart**
- **Objective**: Verify that the gauge chart needle pivots to the calculated score.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run evaluation.
2. Check SVG dial rotation angle.
- **Expected Outcome**: The gauge chart needle animates to point to the correct score position.

**[TC-T1-F07-004] Theme Gauge Color Segments**
- **Objective**: Verify that the gauge segments use cobalt/cerulean/seafoam styling.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect gauge chart visual components.
- **Expected Outcome**: Segments are colored: Seafoam (low), Cerulean (medium), Coral/Cobalt (high).

**[TC-T1-F07-005] Progression Risk Category**
- **Objective**: Verify that the progression is grouped into 'Indolent', 'Intermediate', or 'Aggressive'.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Trigger high score.
2. Observe textual risk badge.
- **Expected Outcome**: Risk badge matches category: score >= 8 displays 'Aggressive'.

#### Feature 8: Survival Prediction (Module 5)

**[TC-T1-F08-001] Survival Parameter Form**
- **Objective**: Verify that patient age, stage, and therapy checkboxes are visible.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Survival Prediction.
2. Review form.
- **Expected Outcome**: Age field, Stage select, and therapy checkboxes are present.

**[TC-T1-F08-002] Kaplan-Meier Curve Rendering**
- **Objective**: Verify that an interactive Kaplan-Meier survival curve renders using Recharts.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Fill form.
2. Click Plot Survival Curve.
- **Expected Outcome**: An SVG line chart showing survival probability over time renders.

**[TC-T1-F08-003] Survival Curve Tooltips**
- **Objective**: Verify that hovering over the survival curve displays survival rates at specific months.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Hover over a coordinate on the KM curve.
2. Check tooltip.
- **Expected Outcome**: Tooltip displays 'Time: X months, Survival: Y%'.

**[TC-T1-F08-004] Median Survival Estimate**
- **Objective**: Verify that the median survival estimate in months is calculated and displayed.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run prediction.
2. Inspect summary card.
- **Expected Outcome**: Estimated median survival is displayed (e.g. 'Estimated Median Survival: 42 months').

**[TC-T1-F08-005] KM Curve Dark Mode Theme**
- **Objective**: Verify that axes, grid lines, and labels are clearly legible in dark mode.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect Recharts theme classes/properties.
- **Expected Outcome**: Grid lines use semi-transparent whites/slates, axes text is legible cobalt/cerulean.

#### Feature 9: Cancer Recurrence Prediction (Module 6)

**[TC-T1-F09-001] Recurrence Parameters Form**
- **Objective**: Verify that margins status, lymph nodes status, and grade fields render.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Cancer Recurrence Prediction.
2. Review form.
- **Expected Outcome**: Selects/radios for surgical margin and node status are interactive.

**[TC-T1-F09-002] Recurrence Percentage Output**
- **Objective**: Verify that recurrence likelihood is calculated as a percentage.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Set inputs.
2. Click Predict Recurrence.
- **Expected Outcome**: A percentage value (e.g. '34% Recurrence Probability') displays.

**[TC-T1-F09-003] Risk Badge Tiering**
- **Objective**: Verify that a risk tier badge (Low/Medium/High) renders.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run prediction.
2. Observe risk badge text.
- **Expected Outcome**: A risk badge (Low Risk, Medium Risk, or High Risk) is displayed in UI.

**[TC-T1-F09-004] Risk Badge Color Mapping**
- **Objective**: Verify that badge colors map correctly (Low = Seafoam, Med = Cerulean, High = Red/Coral).
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Run high recurrence prediction.
2. Verify badge class name.
- **Expected Outcome**: High Risk badge contains red/coral class; Low Risk badge uses seafoam.

**[TC-T1-F09-005] Risk Factor Breakdown**
- **Objective**: Verify that a breakdown list of contributing recurrence risk factors is displayed.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Predict recurrence.
2. Read breakdown card details.
- **Expected Outcome**: A detailed list outlines factors like 'Positive Margins (+15%)' etc.

#### Feature 10: Biomarker Discovery (Module 7)

**[TC-T1-F10-001] Cancer Type Dropdown Filter**
- **Objective**: Verify that the dropdown filter allows selection of different cancer types.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Go to Biomarker Discovery.
2. Click cancer type selector.
- **Expected Outcome**: Dropdown options include Lung, Breast, Colon, Prostate, etc.

**[TC-T1-F10-002] Gene Contribution List**
- **Objective**: Verify that selecting a cancer type renders a list of top driving genes.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Select 'Breast Cancer'.
2. Inspect gene contribution cards.
- **Expected Outcome**: List is populated with genes like BRCA1, TP53, HER2.

**[TC-T1-F10-003] Gene Weight Bar Chart**
- **Objective**: Verify that an animated horizontal bar chart renders the gene contribution weights.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Observe Recharts bar chart next to list.
2. Inspect weights.
- **Expected Outcome**: Horizontal bars are sized according to gene importance values.

**[TC-T1-F10-004] Gene List Sorting Options**
- **Objective**: Verify that sorting options (frequency, contribution weight) change list order.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click 'Sort by Weight'.
2. Click 'Sort by Frequency'.
- **Expected Outcome**: Gene list and horizontal bars rearrange dynamically based on selection.

**[TC-T1-F10-005] Interactive Gene Cards**
- **Objective**: Verify that clicking a gene card expands details about its clinical implication.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click a gene card (e.g., TP53).
2. Read expanded content.
- **Expected Outcome**: Card expands showing mutation type, target therapeutics, and clinical significance.

#### Feature 11: Explainable AI SHAP (Module 8)

**[TC-T1-F11-001] Patient Case Selector**
- **Objective**: Verify that a dropdown is available to select different patient clinical profiles.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Explainable AI SHAP.
2. Click patient selector.
- **Expected Outcome**: Dropdown contains multiple pre-seeded clinical cases.

**[TC-T1-F11-002] SHAP Summary Plot**
- **Objective**: Verify that the SHAP summary plot renders showing feature impact distributions.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Select patient.
2. Observe SHAP summary plot panel.
- **Expected Outcome**: Recharts summary plot showing dots/bars for features is visible.

**[TC-T1-F11-003] SHAP Waterfall Plot**
- **Objective**: Verify that the SHAP waterfall plot renders showing individual feature contributions.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. View SHAP panel.
2. Inspect waterfall plot.
- **Expected Outcome**: Waterfall chart showing step-wise changes from base value is rendered.

**[TC-T1-F11-004] Textual SHAP Explanation**
- **Objective**: Verify that a clear, readable textual summary of key drivers is rendered.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Read explanation text below charts.
- **Expected Outcome**: A dynamic text explaining the top positive and negative features is displayed.

**[TC-T1-F11-005] Raw Weights Table Toggle**
- **Objective**: Verify that the user can toggle a tabular view of raw feature SHAP weights.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click 'View Raw Data Table'.
2. Toggle table visibility.
- **Expected Outcome**: Tabular view showing exact numeric values displays on click.

#### Feature 12: Genetic Risk Assessment (Module 9)

**[TC-T1-F12-001] Sequence Variant Input Field**
- **Objective**: Verify that a text area or search field for germline sequence variants is visible.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Genetic Risk Assessment.
2. Inspect input area.
- **Expected Outcome**: A variant input text area/search bar with placeholder text renders.

**[TC-T1-F12-002] Variant DB Parser List**
- **Objective**: Verify that submitting a mutation code parses it against the mock genetic database.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Type 'BRCA1 c.5266dupC'.
2. Click Parse Variant.
- **Expected Outcome**: Parsed variant details appear in a results panel.

**[TC-T1-F12-003] Predisposition Risk Level**
- **Objective**: Verify that parsed variants show clear predisposition risk levels.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Inspect results panel risk indicators.
- **Expected Outcome**: Risk levels like 'Pathogenic', 'Likely Pathogenic', or 'Benign' are displayed.

**[TC-T1-F12-004] High-Risk Genetic Alerts**
- **Objective**: Verify that pathogenic/high-risk mutations trigger distinct alert highlights.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Parse a known pathogenic mutation.
2. Look at alert panel.
- **Expected Outcome**: A warning card with Cerulean/Coral border and prominent icon displays.

**[TC-T1-F12-005] Clinical References Section**
- **Objective**: Verify that a references section with literature citations renders for the parsed variant.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Scroll variant results.
2. Locate citations list.
- **Expected Outcome**: A list of mock clinvar/pubmed references is displayed for the variant.

#### Feature 13: Patient Similarity Engine (Module 10)

**[TC-T1-F13-001] Similarity Search Input**
- **Objective**: Verify that search input field is visible and accepts clinical criteria queries.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Patient Similarity Engine.
2. Type criteria (e.g. 'adenocarcinoma').
- **Expected Outcome**: Search text is typed and shown in the input box.

**[TC-T1-F13-002] Similarity Search Loader**
- **Objective**: Verify that searching triggers a visual loading animation.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Press Enter/click Search icon.
2. Observe similarity results panel.
- **Expected Outcome**: A search loader/spinner renders while similarity calculations run.

**[TC-T1-F13-003] Top 5 Similar Cases List**
- **Objective**: Verify that search outputs exactly 5 similar patient cases.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Observe search results.
2. Count patient card elements.
- **Expected Outcome**: Exactly 5 patient cards are displayed in the results list.

**[TC-T1-F13-004] Expandable Case Cards**
- **Objective**: Verify that clicking a similar patient case card toggles its expanded view.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click on patient card #1.
2. Click again.
- **Expected Outcome**: Card expands to reveal details, and collapses on second click.

**[TC-T1-F13-005] Historic Treatment Profiles**
- **Objective**: Verify that expanded patient cards display clinical history, treatment, and outcome.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Expand a patient card.
2. Check details.
- **Expected Outcome**: Information about clinical staging, chemotherapy regimen, and outcome renders.

#### Feature 14: Clinical Report Generator (Module 11)

**[TC-T1-F14-001] Module Selector Checkboxes**
- **Objective**: Verify that checkboxes for all 11 prediction modules are rendered.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Navigate to Clinical Report Generator.
2. Review module selection list.
- **Expected Outcome**: Checkboxes representing all 11 modules are present.

**[TC-T1-F14-002] Select All Modules Toggle**
- **Objective**: Verify that clicking 'Select All' updates all module checkboxes.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Click 'Select All' button.
2. Click 'Clear All'.
- **Expected Outcome**: All checkboxes are checked, and then all are unchecked.

**[TC-T1-F14-003] Report Preview Panel**
- **Objective**: Verify that selected modules populate a live report preview layout.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Check 'Cancer Detection' and 'Stage Prediction'.
2. Look at preview panel.
- **Expected Outcome**: Preview panel shows structured summaries of selected predictions.

**[TC-T1-F14-004] Export PDF Execution**
- **Objective**: Verify that clicking 'Export Report PDF' triggers report generation process.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Select modules.
2. Click 'Export Report PDF'.
3. Check state.
- **Expected Outcome**: Button transitions to generating state with progress spinner.

**[TC-T1-F14-005] PDF Download Event**
- **Objective**: Verify that the mock PDF export triggers a file download event or success notice.
- **Verification Channel**: DOM / STYLE / INT
- **Steps**:
1. Let generation complete.
2. Observe toast notification.
- **Expected Outcome**: A success toast ('Report successfully exported!') is displayed.

---

### Tier 2: Boundary & Edge Cases (70 Test Cases)
This tier contains at least 5 test cases per feature (14 features × 5 = 70 test cases) verifying boundaries, input limits, and edge conditions.

#### Feature 1: Sidebar & Page Layout (Edge Cases)

**[TC-T2-F01-001] Deep Link Routing Navigation**
- **Objective**: Verify that navigating directly to a deep URL hash/path loads that module directly.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Load app with URL '/classification'.
2. Check active view.
- **Expected Outcome**: Classification module is loaded directly and sidebar link is active.

**[TC-T2-F01-002] Extreme Viewport Resize (320px)**
- **Objective**: Verify layout integrity on ultra-small viewports (e.g., iPhone SE screen width).
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Resize viewport width to 320px.
2. Verify text and button layouts.
- **Expected Outcome**: No text clipping, sidebar collapses, and horizontal scrolling is absent.

**[TC-T2-F01-003] Rapid Double-Click Protection**
- **Objective**: Verify that rapidly double-clicking a sidebar link does not break page animation state.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Double-click 'Stage Prediction' link fast.
2. Verify page state.
- **Expected Outcome**: Module loads once, and page transitions execute smoothly without locking.

**[TC-T2-F01-004] Route Interruption Mid-Animation**
- **Objective**: Verify that navigating to a different page mid-transition updates URL and page content safely.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click 'Biomarker' then immediately click 'SHAP' mid-animation.
2. Check view.
- **Expected Outcome**: Navigation updates to SHAP safely; no animation freezes occur.

**[TC-T2-F01-005] Invalid Path Fallback Screen**
- **Objective**: Verify that entering an invalid route displays a fallback page with return to dashboard link.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Navigate to URL '/invalid-module-path'.
2. Observe viewport.
- **Expected Outcome**: 404/Not Found view renders with a clear button to go back to dashboard.

#### Feature 2: Theme Styling (Maritime Clinical Observatory color classes) (Edge Cases)

**[TC-T2-F02-001] Ignore System Light Mode Prefs**
- **Objective**: Verify that light mode system preferences are overridden by the dark theme.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Set browser system preference to light mode.
2. Load CIP app.
- **Expected Outcome**: The page maintains deep cobalt and slate theme backgrounds.

**[TC-T2-F02-002] Accessibility Color Contrast**
- **Objective**: Verify that text elements meet WCAG AA contrast standards against cobalt/slate backgrounds.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Check contrast ratios of text on cobalt/slate.
2. Assert ratio >= 4.5:1.
- **Expected Outcome**: Contrast ratios meet WCAG AA requirements for text legibility.

**[TC-T2-F02-003] Rapid Surface Switching Flashing**
- **Objective**: Verify that switching rapidly between different prediction pages does not cause white flashes.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Speed click between modules.
2. Observe screen background transitions.
- **Expected Outcome**: All transitions blend within dark theme colors; no bright/white flash.

**[TC-T2-F02-004] Persistent Chart Theme Colors**
- **Objective**: Verify that charts retain correct color mappings even after data updates.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Change input parameters to force chart redraw.
2. Verify svg stroke/fill colors.
- **Expected Outcome**: Redrawn elements maintain Maritime Clinical Observatory palette.

**[TC-T2-F02-005] Transparent Modals Contrast**
- **Objective**: Verify that overlay modals and dialog backdrops retain contrast and readability.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Open confusion matrix modal.
2. Inspect background overlay classes.
- **Expected Outcome**: Overlay backdrop applies dark translucent styling (`bg-opacity-50` or similar).

#### Feature 3: Medical Disclaimer Banner (Verbatim text, persistent, non-dismissible, visible on all prediction surfaces) (Edge Cases)

**[TC-T2-F03-001] Keyboard Focus Escape Attempt**
- **Objective**: Verify that keyboard tab navigation cannot bypass or hide the disclaimer banner.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Tab through all focusable components.
2. Verify focus indicator highlights disclaimer.
- **Expected Outcome**: Disclaimer is included in tab sequence or visible; focus outline does not cover text.

**[TC-T2-F03-002] Text Accessibility on Small Screen**
- **Objective**: Verify that the disclaimer remains fully readable on a small screen.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Resize screen to 360px.
2. Read disclaimer text.
- **Expected Outcome**: Text sizes down or wraps without layout overflow or text truncation.

**[TC-T2-F03-003] Text Injection Protection**
- **Objective**: Verify that injecting HTML characters into form fields does not alter disclaimer text.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Type script/HTML into variant parser.
2. Check disclaimer text.
- **Expected Outcome**: Disclaimer text remains verbatim; no script execution or DOM modification.

**[TC-T2-F03-004] Modal Layering Precedence**
- **Objective**: Verify that opening a modal dialog does not cover or hide the disclaimer banner.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Open Confusion Matrix modal.
2. Check if disclaimer is visible.
- **Expected Outcome**: Disclaimer remains on top or visible; z-index layout prevents occlusion.

**[TC-T2-F03-005] Long Scroll Viewport Sticky Test**
- **Objective**: Verify that the banner remains stuck to the viewport during page scroll.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Navigate to a module with a long form (e.g. Report Generator).
2. Scroll to bottom.
- **Expected Outcome**: The disclaimer banner is fixed and stays visible at the viewport edge.

#### Feature 4: Cancer Detection (Module 1) (Edge Cases)

**[TC-T2-F04-001] Negative Out-of-Bounds Input**
- **Objective**: Verify that inputting negative numbers triggers validation warning.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Type '-5' in tumor size field.
2. Click Analyze.
- **Expected Outcome**: Validation message ('Value must be positive') is displayed next to field.

**[TC-T2-F04-002] Empty Submission Validation**
- **Objective**: Verify that submitting the form with empty fields displays validation errors.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Clear all inputs.
2. Click Analyze.
- **Expected Outcome**: Inline validation errors alert the user that fields are required.

**[TC-T2-F04-003] Sub-50% Probability Logic**
- **Objective**: Verify that a low probability (e.g. 15%) renders a clear 'Benign' output.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Input low-risk parameters.
2. Run prediction.
- **Expected Outcome**: Output shows 'Benign' and probability bar displays a small seafoam length.

**[TC-T2-F04-004] Alphanumeric Input Rejection**
- **Objective**: Verify that typing letters in numeric fields is prevented or rejected.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Attempt to type 'abc' in tumor size.
2. Check field value.
- **Expected Outcome**: The field remains empty or triggers input format errors.

**[TC-T2-F04-005] Exact Threshold (50%) Check**
- **Objective**: Verify that an exact 50.0% probability handles the boundary state correctly.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Input parameters leading to 50% probability.
2. Run prediction.
- **Expected Outcome**: System resolves boundary state safely (typically Benign or Malignant with a neutral color).

#### Feature 5: Cancer Classification (Module 2) (Edge Cases)

**[TC-T2-F05-001] Conflicting Marker Combination**
- **Objective**: Verify that contradictory markers (e.g., ER+, PR+, HER2+ but Ki67 0%) render safely.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select ER+, PR+, HER2+, Ki67 0%.
2. Run classification.
- **Expected Outcome**: Calculates a composite subtype with a fallback distribution; does not crash.

**[TC-T2-F05-002] Subtype Normalization to 100%**
- **Objective**: Verify that subtype probabilities sum to exactly 100% despite floating-point math.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Trigger classification.
2. Read subtype percentages and sum them.
- **Expected Outcome**: Sum of all subtype probabilities equals exactly 100%.

**[TC-T2-F05-003] Rapid Toggle Stress Test**
- **Objective**: Verify that clicking confusion matrix toggle 10 times rapidly does not freeze the panel.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click the toggle rapidly 10 times.
2. Observe panel state.
- **Expected Outcome**: Panel ends in correct open/closed state corresponding to final click count.

**[TC-T2-F05-004] Redraw Chart on Resize**
- **Objective**: Verify that the subtype Recharts bar chart adjusts dimensions on window resize.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Run classification.
2. Resize viewport by 200px.
- **Expected Outcome**: The SVG chart updates its width parameter and redraws to fit container.

**[TC-T2-F05-005] Zero Probability Subtypes Rendering**
- **Objective**: Verify that subtypes with 0% probability are handled gracefully without rendering issues.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Input markers that exclude 'Small Cell'.
2. Check chart.
- **Expected Outcome**: Small Cell subtype shows 0% and does not render visual bar/marker.

#### Feature 6: Stage Prediction (Module 3) (Edge Cases)

**[TC-T2-F06-001] Unknown TNM Stage Handling**
- **Objective**: Verify that staging handles Tx/Nx/Mx cases by showing baseline estimates.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select 'Tx', 'Nx', 'M0'.
2. Run Stage Prediction.
- **Expected Outcome**: System renders a 'Stage Indeterminate' or baseline staging with warning.

**[TC-T2-F06-002] Missing Gene Expression Threshold**
- **Objective**: Verify that Stage Prediction functions when gene expression data is partially missing.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Simulate empty gene expression input database fields.
2. Run staging.
- **Expected Outcome**: Calculates staging based on clinical features; ignores missing gene weights safely.

**[TC-T2-F06-003] Metastasis Dominance Boundary**
- **Objective**: Verify that any M1 selection forces Stage IV regardless of T and N values.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select T1, N0, M1.
2. Predict Stage.
- **Expected Outcome**: Calculated output is Stage IV.

**[TC-T2-F06-004] High Scale Gene Values**
- **Objective**: Verify that extremely high gene expression values do not break layout tables.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select patient with high genomic expressions.
2. Check gene table.
- **Expected Outcome**: Values format correctly (e.g. scientific notation or truncated digits).

**[TC-T2-F06-005] Single Click Trigger Test**
- **Objective**: Verify that clicking predict button once disables it until calculation finishes.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click Predict.
2. Check button active state immediately.
- **Expected Outcome**: Button is disabled during processing to prevent multiple simultaneous staging jobs.

#### Feature 7: Tumor Progression (Module 4) (Edge Cases)

**[TC-T2-F07-001] Aggressiveness Score 0 (Min)**
- **Objective**: Verify that setting all inputs to minimum values yields a score of 0.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Set mitotic rate and necrosis to 0.
2. Run evaluation.
- **Expected Outcome**: Aggressiveness score displays 0.0, indicator points to leftmost gauge edge.

**[TC-T2-F07-002] Aggressiveness Score 10 (Max)**
- **Objective**: Verify that setting all inputs to maximum values yields a score of 10.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Set mitotic rate and necrosis to max.
2. Run evaluation.
- **Expected Outcome**: Aggressiveness score displays 10.0, needle points to rightmost gauge edge.

**[TC-T2-F07-003] Floating Point Rounding check**
- **Objective**: Verify that fractional scores are correctly rounded to 1 decimal place.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Input values yielding fractional score (e.g. 4.673).
2. Observe score.
- **Expected Outcome**: Aggressiveness score displays rounded value: 4.7.

**[TC-T2-F07-004] Realtime Needle Adjustment**
- **Objective**: Verify that the gauge needle adjusts position smoothly without jumping.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click evaluate, then click different values.
2. Check animation path.
- **Expected Outcome**: The gauge needle uses CSS transition/GSAP to slide smoothly to new value.

**[TC-T2-F07-005] Out-of-Bounds Progression Inputs**
- **Objective**: Verify that manually injected out-of-bounds input values are clamped to limits.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Attempt to inject score value 15 via form script.
2. Verify output.
- **Expected Outcome**: Calculated score is clamped to maximum limit of 10.0.

#### Feature 8: Survival Prediction (Module 5) (Edge Cases)

**[TC-T2-F08-001] Extreme Age Inputs (120 YRS)**
- **Objective**: Verify survival curve calculation with extreme age input.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Enter 120 in Age input.
2. Plot survival curve.
- **Expected Outcome**: Calculations complete successfully; survival curve shows shortened timeline.

**[TC-T2-F08-002] Negative Hazard Ratio Clamping**
- **Objective**: Verify that negative clinical hazard conditions clamp to 100% survival baseline.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Input extreme positive treatments.
2. Plot curve.
- **Expected Outcome**: The survival curve flatlines at 100% survival probability (does not exceed 100%).

**[TC-T2-F08-003] Zero-Month Survival Boundary**
- **Objective**: Verify that the Kaplan-Meier curve correctly initiates at Time=0 with 100% survival.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Inspect the start of the KM curve.
2. Hover over start coordinate.
- **Expected Outcome**: First coordinate tooltip reads 'Time: 0 months, Survival: 100%'.

**[TC-T2-F08-004] Tooltip Viewport Clipping Prevention**
- **Objective**: Verify tooltips remain inside the chart viewport boundary at the far right edge.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Hover over the curve at 120+ months.
2. Verify tooltip is fully visible.
- **Expected Outcome**: Tooltip is repositioned to render inside container bounds; no clipping.

**[TC-T2-F08-005] Dynamic Path Transitions**
- **Objective**: Verify that changing parameters causes the KM curve SVG path to morph smoothly.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select different clinical options.
2. Watch line morph.
- **Expected Outcome**: SVG path transitions using animated transition styles.

#### Feature 9: Cancer Recurrence Prediction (Module 6) (Edge Cases)

**[TC-T2-F09-001] Recurrence Probability 0% Boundary**
- **Objective**: Verify that minimal risk parameters yield exactly 0% recurrence likelihood.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select negative margin, N0, Grade 1.
2. Click predict.
- **Expected Outcome**: Recurrence is 0% (or baseline minimum), and Low Risk badge displays.

**[TC-T2-F09-002] Recurrence Probability 100% Boundary**
- **Objective**: Verify that maximum risk parameters yield exactly 100% recurrence likelihood.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select positive margin, N3, Grade 3.
2. Click predict.
- **Expected Outcome**: Recurrence is 100% (or baseline maximum), and High Risk badge displays.

**[TC-T2-F09-003] Contradictory Therapy inputs**
- **Objective**: Verify that choosing surgery + radiation but selecting poor clinical response handles predictions.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Toggle contradictory treatment parameters.
2. Observe recurrence output.
- **Expected Outcome**: The module calculates intermediate likelihood safely without NaN values.

**[TC-T2-F09-004] Risk Badge Threshold Transition**
- **Objective**: Verify transition of risk badge at the exact threshold boundary (e.g. 30%).
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Set inputs to calculate 29% recurrence.
2. Observe badge.
3. Increase to 30%.
- **Expected Outcome**: Badge transitions from Low Risk (29%) to Medium Risk (30%) instantly.

**[TC-T2-F09-005] Deterministic Computation Check**
- **Objective**: Verify that identical inputs evaluate to identical recurrence percentages.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click predict 5 times with identical parameters.
2. Compare output percentages.
- **Expected Outcome**: Percentage remains identical across all trials.

#### Feature 10: Biomarker Discovery (Module 7) (Edge Cases)

**[TC-T2-F10-001] Rare Cancer No Biomarkers Case**
- **Objective**: Verify response when selecting a cancer type with no seeded biomarkers.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select 'Rare Cancer Subtype' from dropdown.
2. Check results list.
- **Expected Outcome**: A message 'No biomarkers matching search criteria' is displayed.

**[TC-T2-F10-002] Rapid Hover Selection Performance**
- **Objective**: Verify that rapidly hovering over multiple gene cards does not queue tooltip animations.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Sweep mouse pointer quickly across 10 gene cards.
2. Observe tooltip overlays.
- **Expected Outcome**: Tooltips display and hide instantly; no backlog of lagging tooltips.

**[TC-T2-F10-003] Long Gene Names Layout check**
- **Objective**: Verify that extremely long gene names do not overflow the chart boundaries.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Load data containing mock gene 'FAM175A-AS1' or similar.
2. Verify layout.
- **Expected Outcome**: Text fits within the labels column without overlap or ellipsis clipping.

**[TC-T2-F10-004] Zero Contribution Gene Weight**
- **Objective**: Verify that a gene with zero contribution weight is omitted or styled minimally.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Load genes with 0.0 importance score.
2. Verify chart display.
- **Expected Outcome**: The gene bar has 0px width and is clearly labeled as neutral contribution.

**[TC-T2-F10-005] Continuous Sort Trigger Jitter**
- **Objective**: Verify that clicking the sort button continuously does not cause UI lag.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Toggle sort buttons repeatedly.
2. Observe animation smoothness.
- **Expected Outcome**: Sorting transitions update without lag, drop-frames, or visual glitches.

#### Feature 11: Explainable AI SHAP (Module 8) (Edge Cases)

**[TC-T2-F11-001] Missing Patient Data Handling**
- **Objective**: Verify SHAP rendering when a selected patient profile has empty clinical weights.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select 'Patient Profile X' with empty weights.
2. Observe SHAP charts.
- **Expected Outcome**: Charts fall back to average dataset baseline SHAP values; no crash.

**[TC-T2-F11-002] Extremely Long Explanation Text**
- **Objective**: Verify that long SHAP explanations are wrapped and scrollable.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Load profile with long clinical notes.
2. Check explanation box.
- **Expected Outcome**: Text container uses Tailwind scroll/wrap; does not push layout elements off-screen.

**[TC-T2-F11-003] Tiny Feature Weight Grouping**
- **Objective**: Verify that features with weights under 0.001 are grouped into 'Other Features'.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select patient with many small feature weights.
2. Check waterfall plot.
- **Expected Outcome**: Features are grouped; plot maintains high readability with <= 8 lines.

**[TC-T2-F11-004] Fast Profile Switch Synchronization**
- **Objective**: Verify that switching profiles rapidly updates SHAP and waterfall plots synchronously.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select Patient A then quickly select Patient B.
2. Observe chart data.
- **Expected Outcome**: Waterfall and summary plots update to Patient B; no A/B data mismatch.

**[TC-T2-F11-005] Negative Contributions Direction**
- **Objective**: Verify that negative SHAP features draw bars towards the left from centerline.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Select patient with negative driver weights.
2. Verify bar direction.
- **Expected Outcome**: Negative feature bars extend left of the 0.0 axis using negative coordinates.

#### Feature 12: Genetic Risk Assessment (Module 9) (Edge Cases)

**[TC-T2-F12-001] Invalid Sequence Input Warning**
- **Objective**: Verify sequence parser behavior when pasting non-genomic text strings.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Paste 'HELLO WORLD' in DNA text area.
2. Click Parse Variant.
- **Expected Outcome**: Validation alert displays 'Invalid variant format: Must be DNA sequence or standard notation'.

**[TC-T2-F12-002] Empty Variant Search Submission**
- **Objective**: Verify search behavior when clicking parse variant with an empty field.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Clear input.
2. Click Parse Variant.
- **Expected Outcome**: The app shows a prompt to select a gene or paste a sequence.

**[TC-T2-F12-003] Multiple Mutation Parsing Priority**
- **Objective**: Verify that entering multiple mutations displays risk ranked by pathogenicity.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Type 'BRCA1 Pathogenic + APC VUS'.
2. Click Parse.
- **Expected Outcome**: The pathogenic BRCA1 variant is ranked at the top with prominent alerts.

**[TC-T2-F12-004] Unknown Variant Classification (VUS)**
- **Objective**: Verify that an unrecognized mutation code defaults to 'Variant of Uncertain Significance'.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Enter 'MUT-X-999'.
2. Click Parse Variant.
- **Expected Outcome**: The variant is successfully parsed and risk level is listed as 'VUS (Uncertain)'.
No crash.

**[TC-T2-F12-005] Complex Mutation Code Parsing**
- **Objective**: Verify that variant names containing brackets and dots parse correctly.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Input 'c.[5266dupC;5267_5268delinsTG]'.
2. Click Parse.
- **Expected Outcome**: Parser isolates components, linking to corresponding BRCA database fields.

#### Feature 13: Patient Similarity Engine (Module 10) (Edge Cases)

**[TC-T2-F13-001] Empty Query Search Result**
- **Objective**: Verify search output when submitting an empty search string.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Clear search input.
2. Click Search.
- **Expected Outcome**: Results list is populated with the top 5 general cases from mock database.

**[TC-T2-F13-002] Special Characters Query Resilience**
- **Objective**: Verify that searching with symbols/SQL injection snippets does not crash filters.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Type "' OR 1=1 --" or '<script>' in search.
2. Execute search.
- **Expected Outcome**: No crash occurs; search safely displays 'No matching similar cases found'.

**[TC-T2-F13-003] Zero Matching Search Results**
- **Objective**: Verify empty state illustration when search finds no match.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Search 'non-existent-condition-xyz'.
2. Observe results panel.
- **Expected Outcome**: A clean empty state with 'No matching similar cases found' displays.

**[TC-T2-F13-004] Simultaneous Expanded Cards Layout**
- **Objective**: Verify that expanding all 5 cards does not break container bounds.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click expand on all 5 similar patient cards.
2. Verify page layout.
- **Expected Outcome**: The container expands vertically; no card content overlaps other cards.

**[TC-T2-F13-005] Collapse Active Card Check**
- **Objective**: Verify that clicking an expanded card collapses it fully.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Expand Card #1.
2. Click Card #1 header.
- **Expected Outcome**: Card collapses to its original compact size.

#### Feature 14: Clinical Report Generator (Module 11) (Edge Cases)

**[TC-T2-F14-001] Zero Selected Modules Validation**
- **Objective**: Verify that the PDF export is disabled when no modules are checked.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Uncheck all module boxes.
2. Observe 'Generate Report PDF' button.
- **Expected Outcome**: Button is disabled and styled with `cursor-not-allowed` class.

**[TC-T2-F14-002] Empty Prediction Model Handling**
- **Objective**: Verify that report generator flags uncalculated modules in the preview.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Navigate to report generator without running Stage Prediction.
2. View preview.
- **Expected Outcome**: Stage Prediction section displays 'Data Pending: Run Staging prediction'.

**[TC-T2-F14-003] Rapid Double-Generate Prevention**
- **Objective**: Verify that click-spamming the generate button does not trigger multiple downloads.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Click 'Generate PDF' button 5 times in rapid succession.
2. Monitor downloads.
- **Expected Outcome**: Only a single PDF export process starts; button state is locked.

**[TC-T2-F14-004] Canvas Render Dimensions**
- **Objective**: Verify that report elements wrap properly on the PDF page layout.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Check all modules.
2. Review preview formatting.
- **Expected Outcome**: All text and tables fit within the standard A4 aspect ratio preview canvas.

**[TC-T2-F14-005] Responsive Selection Scrolling**
- **Objective**: Verify scrollbar availability for module checklist on low height viewports.
- **Verification Channel**: DOM / STYLE / INT / ERR
- **Steps**:
1. Resize screen height to 400px.
2. Inspect checklist container.
- **Expected Outcome**: A vertical scrollbar appears allowing access to all checkboxes.

---

### Tier 3: Cross-Feature Combinations (14 Test Cases)
This tier evaluates pairwise integration and data flows between multiple modules (14 test cases).


**[TC-T3-INT-001] M1 + M2 (Detection & Classification)**
- **Objective**: Verify that running a malignant prediction in Cancer Detection updates classification options.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Run Cancer Detection with high-risk parameters.
2. Navigate to Cancer Classification.
- **Expected Outcome**: Classification module inputs are pre-selected to malignant subtypes matching detection profile.

**[TC-T3-INT-002] M1 + M3 (Detection & Stage Prediction)**
- **Objective**: Verify that Benign detection output disables advanced cancer staging inputs.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Run Cancer Detection and get 'Benign' result.
2. Navigate to Stage Prediction.
- **Expected Outcome**: Staging controls are locked or prompt a 'Malignant diagnosis required' message.

**[TC-T3-INT-003] M2 + M5 (Classification & Survival)**
- **Objective**: Verify that subtype selection adjusts baseline survival curve expectations.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. In Cancer Classification select 'Small Cell Lung Cancer'.
2. Navigate to Survival Prediction.
- **Expected Outcome**: Survival curve updates showing steeper initial decline (typical of Small Cell subtype).

**[TC-T3-INT-004] M3 + M4 (Stage & Tumor Progression)**
- **Objective**: Verify that Stage IV prediction spikes the Tumor Progression aggressiveness score.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Predict 'Stage IV' in Stage Prediction.
2. Go to Tumor Progression.
- **Expected Outcome**: Progression score defaults to high range (>= 8.0) and gauge needle points to 'Aggressive' segment.

**[TC-T3-INT-005] M3 + M5 (Stage & Survival Prediction)**
- **Objective**: Verify that Stage IV classification shifts survival curves downwards.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Predict 'Stage IV' in Stage Prediction.
2. Go to Survival Prediction.
- **Expected Outcome**: Kaplan-Meier curve shifts significantly downwards, lowering estimated median survival time.

**[TC-T3-INT-006] M4 + M6 (Tumor Progression & Recurrence)**
- **Objective**: Verify that high aggressiveness score triggers high recurrence warnings.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Set Tumor Progression aggressiveness to 9.2.
2. Navigate to Cancer Recurrence.
- **Expected Outcome**: Recurrence risk defaults to High Risk badge, showing elevated recurrence probability.

**[TC-T3-INT-007] M1 + M8 (Detection & Explainable AI SHAP)**
- **Objective**: Verify that Cancer Detection inputs sync with SHAP case features.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Run Cancer Detection with specific clinical parameters.
2. Go to SHAP Explainable AI.
- **Expected Outcome**: SHAP waterfall plot features match the input values submitted in Cancer Detection.

**[TC-T3-INT-008] M7 + M9 (Biomarkers & Genetic Risk)**
- **Objective**: Verify that clicking a discovered biomarker gene links directly to its genetic risk profile.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. In Biomarker Discovery, click on the expanded card for 'BRCA1'.
2. Click 'Analyze Genetic Risk'.
- **Expected Outcome**: Genetic Risk Assessment opens with BRCA1 mutation sequence pre-populated in parser.

**[TC-T3-INT-009] M9 + M10 (Genetic Risk & Patient Similarity)**
- **Objective**: Verify that high genetic risk triggers similarity search for matching mutations.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. In Genetic Risk, parse a pathogenic BRCA2 mutation.
2. Click 'Find Similar Cases'.
- **Expected Outcome**: Patient Similarity Engine displays similar historic cases who carry the BRCA2 germline variant.

**[TC-T3-INT-010] M8 + M11 (SHAP & Clinical Report Generator)**
- **Objective**: Verify that SHAP plots are compiled into the PDF report preview.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Select and generate a SHAP explanation for Case #4.
2. Navigate to Clinical Report Generator.
3. Check 'SHAP Explainable AI'.
- **Expected Outcome**: Preview panel renders the SHAP explanation text and waterfall plot thumbnail in report draft.

**[TC-T3-INT-011] M2 + M7 (Classification & Biomarkers)**
- **Objective**: Verify that selecting a subtype filters corresponding biomarkers.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. In Cancer Classification, choose 'Adenocarcinoma'.
2. Navigate to Biomarker Discovery.
- **Expected Outcome**: Biomarker list is pre-filtered to show driving genes relevant to Adenocarcinoma.

**[TC-T3-INT-012] M5 + M6 (Survival & Recurrence)**
- **Objective**: Verify that high recurrence risk shifts survival curves downwards.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. In Recurrence, predict a 90% recurrence likelihood.
2. Navigate to Survival Prediction.
- **Expected Outcome**: Kaplan-Meier survival curve renders with steeper slope indicating shortened progression-free survival.

**[TC-T3-INT-013] M10 + M11 (Similarity & Clinical Report Generator)**
- **Objective**: Verify that expanded similar cases can be appended to report.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. Search similar cases in Patient Similarity.
2. Select Case ID #3829.
3. Navigate to Report Generator.
- **Expected Outcome**: Checklist includes option to append 'Similar Case Profile #3829' to the clinical report.

**[TC-T3-INT-014] M1 + M11 (Detection & Clinical Report Generator)**
- **Objective**: Verify that changing detection results updates report preview in real-time.
- **Verification Channel**: DOM / INT / FLOW
- **Steps**:
1. In Cancer Detection, run malignant prediction.
2. Go to Report Generator and check 'Cancer Detection'.
3. Go back to Detection, change parameters to benign, rerun.
4. Re-check Report Generator preview.
- **Expected Outcome**: The report preview updates from 'Malignant (92%)' to 'Benign (8%)' dynamically.

---

### Tier 4: Real-World Application Scenarios (7 Test Cases)
This tier contains end-to-end multi-step workload scenarios simulating actual clinical or research tasks (7 test cases).


**[TC-T4-SCEN-001] Comprehensive Patient Workup Workflow**
- **Objective**: Simulate a full clinician workflow starting from patient search to final report generation.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Search similar case in Patient Similarity Engine.
2. Navigate to Cancer Detection, input case metrics and analyze.
3. Navigate to Cancer Classification, verify molecular subtype.
4. Go to Stage Prediction, calculate AJCC Stage.
5. View Biomarkers and SHAP plots to understand drivers.
6. Plot Survival Curve.
7. Go to Clinical Report Generator, select all modules, and generate report PDF.
- **Expected Outcome**: Clinician completes the entire diagnostic analysis flow, and exports a comprehensive multi-module clinical summary PDF containing all computed values without application crashes.

**[TC-T4-SCEN-002] High-Risk Genomic Screen Scenario**
- **Objective**: Simulate a geneticist analyzing a patient with a family history of BRCA1 mutations.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Go to Genetic Risk Assessment.
2. Input 'BRCA1 c.5266dupC' variant and click Parse.
3. Verify risk level is 'Pathogenic'.
4. Click 'Find Similar Patients' link.
5. In Patient Similarity, review the treatment profiles of the top 5 similar historic cases.
6. Select Module 11 (Report Generator) and export a specialized genetic risk report.
- **Expected Outcome**: System parses the sequence correctly, redirects to similar case files containing identical mutations, and exports a customized genetic risk report detailing preventive pathways.

**[TC-T4-SCEN-003] Early-Stage Surveillance Protocol Scenario**
- **Objective**: Simulate a surveillance consultation for a patient with an indolent tumor.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Navigate to Cancer Detection, run analysis (Malignant Probability 12% -> Benign).
2. Navigate to Stage Prediction, verify Stage I classification.
3. Go to Tumor Progression, observe Aggressiveness Score of 1.8/10 ('Indolent').
4. Navigate to Cancer Recurrence, calculate recurrence risk (8% -> Low Risk badge).
5. Export a report including Detection, Progression, and Recurrence summaries.
- **Expected Outcome**: The patient's low-risk clinical profile is successfully mapped across all diagnostic surfaces, culminating in a low-intensity surveillance report.

**[TC-T4-SCEN-004] Aggressive Small Cell Lung Cancer (SCLC) Care Pathway**
- **Objective**: Simulate staging and prognosis assessment for an aggressive lung tumor.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Go to Cancer Classification, input lung indicators and classify as 'Small Cell Lung Cancer'.
2. In Stage Prediction, select T3, N2, M1 -> Calculate Stage IV.
3. In Tumor Progression, run evaluation -> Aggressiveness Score 9.4/10 ('Aggressive').
4. Navigate to Survival Prediction, verify estimated median survival drops to 8 months on KM curve.
5. Check Biomarkers list showing TP53/RB1 driving mutations.
6. Export report for clinical advisory board.
- **Expected Outcome**: The system aggregates indicators of highly aggressive disease, recalculates prognosis models accordingly, and outputs consistent prognostic predictions ready for review.

**[TC-T4-SCEN-005] Genomic Sensitivity Sensitivity Analysis Iteration**
- **Objective**: Simulate a researcher testing the sensitivity of the AI models to varying gene expression levels.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Go to Stage Prediction.
2. Set ERBB2 expression value to 'High' and run staging.
3. Note stage and SHAP waterfall values.
4. Adjust ERBB2 to 'Low' and re-run staging.
5. Observe shifts in Stage Prediction, SHAP feature rankings, and Recurrence probability.
- **Expected Outcome**: Staging, SHAP feature importance, and recurrence likelihood adjust dynamically, demonstrating models' sensitivity to genomic parameter variations in real-time.

**[TC-T4-SCEN-006] Medical Disclaimer Compliance Audit**
- **Objective**: Verify that all views adhere to the strict medical disclaimer and non-prescriptive rules.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Navigate through all 11 modules and landing surfaces.
2. Confirm medical disclaimer text is visible and identical.
3. Trigger maximum-risk outputs in all modules.
4. Check output text for any prescriptive terms (e.g. 'prescribe chemotherapy', 'should take Tamoxifen').
- **Expected Outcome**: Disclaimer is persistently visible on all views. Output text contains zero diagnostic certainty claims or treatment prescriptions, framing all results as 'educational mock scores'.

**[TC-T4-SCEN-007] Offline Operations & Data Resilience Test**
- **Objective**: Verify system operations when running without network access.
- **Verification Channel**: DOM / INT / FLOW / SCENARIO
- **Steps**:
1. Disable mock server connection (operate in isolated offline frontend state).
2. Go to Patient Similarity Engine and search for a patient.
3. Go to Stage Prediction and run calculations.
4. Export a Clinical Report.
- **Expected Outcome**: All interactive widgets, chart components, and local mock database queries execute immediately on the client side without throwing API connectivity errors.

---

## 5. Automation Implementation Guidelines

When translating this test design into Playwright test code, developers should follow these practices:
1. **Mocking Data**: Ensure that the seed database (`src/data/`) is consistently loaded. The E2E tests should not rely on external networks.
2. **Animation Handling**:
   - For GSAP landing page transitions, use `page.waitForTimeout()` or coordinate checks.
   - For Framer Motion dashboard animations, test using `{ transitions: { duration: 0 } }` or wait for transitions to complete using locator visibility assertions (e.g. `expect(locator).toBeVisible()`).
3. **Strict Disclaimer Validations**: Ensure that any test checking prediction pages explicitly asserts that `[data-testid="medical-disclaimer-banner"]` exists, is visible, and matches the exact verbatim string.
4. **Theme Assertion Helpers**:
   Create a helper function to inspect background and text colors:
   ```typescript
   async function assertObsidianCard(locator: Locator) {
     await expect(locator).toHaveClass(/bg-\[#1E3E62\]/);
   }
   ```
