# Context — E2E Testing Track

## Cancer Intelligence Platform (CIP) v1.0 Spec

### Global Requirements
1. **Layout & Navigation**: Persistent sidebar navigation links all 11 modules.
2. **Theme Palette**:
   - Deep Cobalt Backgrounds: `bg-[#0B192C]` (dashboard main background)
   - Card Slate/Obsidian: `bg-[#1E3E62]` (cards, sidebar, header)
   - Seafoam Accent (Positive/Success): `text-[#00D2C4]` or `bg-[#00D2C4]`
   - Cerulean Accent (Focus/Interactive): `text-[#008DDA]` or `bg-[#008DDA]`
3. **Medical Disclaimer Banner**:
   - Exact text: *"Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions."*
   - Non-dismissible, persistent, visible on all prediction surfaces.

### 11 Interactive Modules
- **Module 1: Cancer Detection** — Binary probability indicator bar.
- **Module 2: Cancer Classification** — Subtype bar chart + confusion matrix toggle.
- **Module 3: Stage Prediction** — Gene expression + clinical features input.
- **Module 4: Tumor Progression** — Gauge chart.
- **Module 5: Survival Prediction** — Kaplan-Meier survival curves.
- **Module 6: Cancer Recurrence Prediction** — Percentage recurrence + badges.
- **Module 7: Biomarker Discovery** — Horizontal gene bar chart.
- **Module 8: Explainable AI SHAP** — SHAP summary & waterfall plots.
- **Module 9: Genetic Risk Assessment** — Germline variant parser.
- **Module 10: Patient Similarity Engine** — Similarity search cards.
- **Module 11: Clinical Report Generator** — Clinical report PDF exporter UI.

### Test Tier Counts (N = 14)
- **N = 14** (11 Modules + Layout + Palette + Disclaimer)
- **Tier 1 (Feature Coverage)**: >= 70 tests (5 per feature)
- **Tier 2 (Boundary/Edge)**: >= 70 tests (5 per feature)
- **Tier 3 (Cross-Feature Pairwise)**: >= 14 tests
- **Tier 4 (Real-world Workloads)**: >= 7 tests
- **Total Minimum**: 161 test cases
