import { test, expect } from '@playwright/test';
import { assertMedicalDisclaimerBanner } from '../helpers/disclaimer-helpers';
import { assertDeepCobaltBackground, assertCardSlatePanel, assertSeafoamAccent, assertCeruleanAccent } from '../helpers/theme-helpers';

test.describe('Tier 1: Feature Coverage (70 Test Cases)', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto('/');
  });

  // Feature 1: Sidebar & Page Layout
  test.describe('Feature 1: Sidebar & Page Layout', () => {
    test('[TC-T1-F01-001] Sidebar Navigation Presence', async ({ page }) => {
      const sidebarLinks = page.locator('nav a');
      // Should show at least 11 module links plus dashboard/landing links
      await expect(sidebarLinks).toHaveCount(11);
    });

    test('[TC-T1-F01-002] Active Link State', async ({ page }) => {
      const secondLink = page.locator('nav a').nth(1); // Cancer Classification
      await secondLink.click();
      await expect(secondLink).toHaveClass(/active/);
    });

    test('[TC-T1-F01-003] Smooth Route Transitions', async ({ page }) => {
      const link = page.locator('nav a').nth(2); // Stage Prediction
      await link.click();
      await expect(page).toHaveURL(/.*stage/);
    });

    test('[TC-T1-F01-004] Responsive Collapse Behaviour', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const hamburger = page.locator('[data-testid="sidebar-hamburger"]');
      await expect(hamburger).toBeVisible();
    });

    test('[TC-T1-F01-005] Page Layout Regions', async ({ page }) => {
      await expect(page.locator('aside')).toBeVisible(); // Sidebar
      await expect(page.locator('header')).toBeVisible(); // Header
      await expect(page.locator('main')).toBeVisible(); // Main Panel
      await expect(page.locator('[data-testid="medical-disclaimer-banner"]')).toBeVisible(); // Footer banner
    });
  });

  // Feature 2: Theme Styling
  test.describe('Feature 2: Theme Styling (Maritime Clinical Observatory)', () => {
    test('[TC-T1-F02-001] Deep Cobalt Background', async ({ page }) => {
      const container = page.locator('main');
      await assertDeepCobaltBackground(container);
    });

    test('[TC-T1-F02-002] Card Slate Panels', async ({ page }) => {
      const card = page.locator('[data-testid="module-card"]').first();
      await assertCardSlatePanel(card);
    });

    test('[TC-T1-F02-003] Seafoam Positive Signals', async ({ page }) => {
      const seafoamElement = page.locator('[data-testid="success-badge"]').first();
      await assertSeafoamAccent(seafoamElement, 'text');
    });

    test('[TC-T1-F02-004] Cerulean Focus Elements', async ({ page }) => {
      const button = page.locator('button.btn-primary').first();
      await assertCeruleanAccent(button, 'bg');
    });

    test('[TC-T1-F02-005] Global Dark Mode Classes', async ({ page }) => {
      const htmlElement = page.locator('html');
      await expect(htmlElement).toHaveClass(/dark/);
    });
  });

  // Feature 3: Medical Disclaimer Banner
  test.describe('Feature 3: Medical Disclaimer Banner', () => {
    test('[TC-T1-F03-001] Disclaimer Presence on Home', async ({ page }) => {
      await assertMedicalDisclaimerBanner(page);
    });

    test('[TC-T1-F03-002] Disclaimer Verbatim Text', async ({ page }) => {
      await assertMedicalDisclaimerBanner(page);
    });

    test('[TC-T1-F03-003] Disclaimer Persistence Across Pages', async ({ page }) => {
      await assertMedicalDisclaimerBanner(page);
      await page.locator('nav a').nth(1).click(); // Click module 2
      await assertMedicalDisclaimerBanner(page);
      await page.locator('nav a').nth(2).click(); // Click module 3
      await assertMedicalDisclaimerBanner(page);
    });

    test('[TC-T1-F03-004] Disclaimer Non-Dismissible', async ({ page }) => {
      const banner = page.locator('[data-testid="medical-disclaimer-banner"]');
      const closeBtn = banner.locator('button, [role="button"]');
      await expect(closeBtn).toHaveCount(0); // Asserts no close button exists
    });

    test('[TC-T1-F03-005] Disclaimer Sticky Positioning', async ({ page }) => {
      const banner = page.locator('[data-testid="medical-disclaimer-banner"]');
      await expect(banner).toHaveCSS('position', 'fixed');
    });
  });

  // Feature 4: Cancer Detection (Module 1)
  test.describe('Feature 4: Cancer Detection', () => {
    test('[TC-T1-F04-001] Inputs Rendering', async ({ page }) => {
      await page.goto('/detection');
      await expect(page.locator('input[name="tumorSize"]')).toBeVisible();
      await expect(page.locator('input[name="mitoticIndex"]')).toBeVisible();
      await expect(page.locator('input[name="age"]')).toBeVisible();
    });

    test('[TC-T1-F04-002] Prediction Trigger & Loader', async ({ page }) => {
      await page.goto('/detection');
      await page.locator('input[name="tumorSize"]').fill('15');
      await page.locator('button:has-text("Analyze")').click();
      await expect(page.locator('[data-testid="prediction-loader"]')).toBeVisible();
    });

    test('[TC-T1-F04-003] Binary Prediction Output', async ({ page }) => {
      await page.goto('/detection');
      await page.locator('input[name="tumorSize"]').fill('35');
      await page.locator('button:has-text("Analyze")').click();
      await expect(page.locator('[data-testid="prediction-output-label"]')).toHaveText(/(Malignant|Benign)/);
    });

    test('[TC-T1-F04-004] Animated Probability Bar', async ({ page }) => {
      await page.goto('/detection');
      await page.locator('input[name="tumorSize"]').fill('20');
      await page.locator('button:has-text("Analyze")').click();
      await expect(page.locator('[data-testid="probability-bar"]')).toBeVisible();
    });

    test('[TC-T1-F04-005] Reset Inputs Functionality', async ({ page }) => {
      await page.goto('/detection');
      await page.locator('input[name="tumorSize"]').fill('20');
      await page.locator('button:has-text("Reset")').click();
      await expect(page.locator('input[name="tumorSize"]')).toHaveValue('');
    });
  });

  // Feature 5: Cancer Classification (Module 2)
  test.describe('Feature 5: Cancer Classification', () => {
    test('[TC-T1-F05-001] Molecular Marker Inputs', async ({ page }) => {
      await page.goto('/classification');
      await expect(page.locator('select[name="erStatus"]')).toBeVisible();
      await expect(page.locator('select[name="prStatus"]')).toBeVisible();
      await expect(page.locator('select[name="her2Status"]')).toBeVisible();
    });

    test('[TC-T1-F05-002] Subtype Distribution Outputs', async ({ page }) => {
      await page.goto('/classification');
      await page.locator('button:has-text("Classify")').click();
      await expect(page.locator('[data-testid="subtype-distributions"]')).toBeVisible();
    });

    test('[TC-T1-F05-003] Subtype Recharts Bar Chart', async ({ page }) => {
      await page.goto('/classification');
      await page.locator('button:has-text("Classify")').click();
      await expect(page.locator('.recharts-bar')).toBeVisible();
    });

    test('[TC-T1-F05-004] Confusion Matrix Toggle', async ({ page }) => {
      await page.goto('/classification');
      const matrixBtn = page.locator('button:has-text("Show Confusion Matrix")');
      await matrixBtn.click();
      await expect(page.locator('[data-testid="confusion-matrix-modal"]')).toBeVisible();
    });

    test('[TC-T1-F05-005] Chart Tooltips Hover', async ({ page }) => {
      await page.goto('/classification');
      await page.locator('button:has-text("Classify")').click();
      await page.locator('.recharts-bar-rectangle').first().hover();
      await expect(page.locator('.recharts-tooltip-wrapper')).toBeVisible();
    });
  });

  // Feature 6: Stage Prediction (Module 3)
  test.describe('Feature 6: Stage Prediction', () => {
    test('[TC-T1-F06-001] TNM Staging Inputs', async ({ page }) => {
      await page.goto('/stage');
      await expect(page.locator('select[name="tStage"]')).toBeVisible();
      await expect(page.locator('select[name="nStage"]')).toBeVisible();
      await expect(page.locator('select[name="mStage"]')).toBeVisible();
    });

    test('[TC-T1-F06-002] Stage Calculation Trigger', async ({ page }) => {
      await page.goto('/stage');
      await page.locator('select[name="tStage"]').selectOption('T2');
      await page.locator('select[name="nStage"]').selectOption('N0');
      await page.locator('select[name="mStage"]').selectOption('M0');
      await page.locator('button:has-text("Predict Stage")').click();
      await expect(page.locator('[data-testid="stage-output"]')).toContainText(/Stage/);
    });

    test('[TC-T1-F06-003] Stage Classification Display', async ({ page }) => {
      await page.goto('/stage');
      await page.locator('button:has-text("Predict Stage")').click();
      await expect(page.locator('[data-testid="stage-output"]')).toHaveCSS('color', 'rgb(0, 141, 218)'); // Cerulean
    });

    test('[TC-T1-F06-004] Gene Expression Table', async ({ page }) => {
      await page.goto('/stage');
      await expect(page.locator('[data-testid="gene-expression-table"]')).toBeVisible();
    });

    test('[TC-T1-F06-005] Diagnostic Limitation Disclaimer', async ({ page }) => {
      await page.goto('/stage');
      await expect(page.locator('text=educational/mock data only')).toBeVisible();
    });
  });

  // Feature 7: Tumor Progression (Module 4)
  test.describe('Feature 7: Tumor Progression', () => {
    test('[TC-T1-F07-001] Aggressiveness Parameters', async ({ page }) => {
      await page.goto('/progression');
      await expect(page.locator('input[name="mitoticRate"]')).toBeVisible();
      await expect(page.locator('input[name="growthIndex"]')).toBeVisible();
    });

    test('[TC-T1-F07-002] Aggressiveness Score Output', async ({ page }) => {
      await page.goto('/progression');
      await page.locator('button:has-text("Evaluate Aggressiveness")').click();
      await expect(page.locator('[data-testid="aggressiveness-score"]')).toBeVisible();
    });

    test('[TC-T1-F07-003] Animated Gauge Chart', async ({ page }) => {
      await page.goto('/progression');
      await page.locator('button:has-text("Evaluate Aggressiveness")').click();
      await expect(page.locator('[data-testid="gauge-needle"]')).toBeVisible();
    });

    test('[TC-T1-F07-004] Theme Gauge Color Segments', async ({ page }) => {
      await page.goto('/progression');
      await expect(page.locator('[data-testid="gauge-segment"]').first()).toBeVisible();
    });

    test('[TC-T1-F07-005] Progression Risk Category', async ({ page }) => {
      await page.goto('/progression');
      await page.locator('input[name="mitoticRate"]').fill('9');
      await page.locator('button:has-text("Evaluate Aggressiveness")').click();
      await expect(page.locator('[data-testid="progression-risk-badge"]')).toHaveText('Aggressive');
    });
  });

  // Feature 8: Survival Prediction (Module 5)
  test.describe('Feature 8: Survival Prediction', () => {
    test('[TC-T1-F08-001] Survival Parameter Form', async ({ page }) => {
      await page.goto('/survival');
      await expect(page.locator('input[name="patientAge"]')).toBeVisible();
      await expect(page.locator('select[name="clinicalStage"]')).toBeVisible();
    });

    test('[TC-T1-F08-002] Kaplan-Meier Curve Rendering', async ({ page }) => {
      await page.goto('/survival');
      await page.locator('button:has-text("Plot Survival Curve")').click();
      await expect(page.locator('.recharts-responsive-container')).toBeVisible();
    });

    test('[TC-T1-F08-003] Survival Curve Tooltips', async ({ page }) => {
      await page.goto('/survival');
      await page.locator('button:has-text("Plot Survival Curve")').click();
      await page.locator('.recharts-line-dot').first().hover();
      await expect(page.locator('.recharts-tooltip-wrapper')).toBeVisible();
    });

    test('[TC-T1-F08-004] Median Survival Estimate', async ({ page }) => {
      await page.goto('/survival');
      await page.locator('button:has-text("Plot Survival Curve")').click();
      await expect(page.locator('[data-testid="median-survival-estimate"]')).toContainText(/months/);
    });

    test('[TC-T1-F08-005] KM Curve Dark Mode Theme', async ({ page }) => {
      await page.goto('/survival');
      await page.locator('button:has-text("Plot Survival Curve")').click();
      const chartBackground = page.locator('.recharts-wrapper');
      await expect(chartBackground).toBeVisible();
    });
  });

  // Feature 9: Cancer Recurrence Prediction (Module 6)
  test.describe('Feature 9: Cancer Recurrence Prediction', () => {
    test('[TC-T1-F09-001] Recurrence Parameters Form', async ({ page }) => {
      await page.goto('/recurrence');
      await expect(page.locator('select[name="marginsStatus"]')).toBeVisible();
      await expect(page.locator('select[name="lymphNodesStatus"]')).toBeVisible();
    });

    test('[TC-T1-F09-002] Recurrence Percentage Output', async ({ page }) => {
      await page.goto('/recurrence');
      await page.locator('button:has-text("Predict Recurrence")').click();
      await expect(page.locator('[data-testid="recurrence-percentage"]')).toContainText(/%/);
    });

    test('[TC-T1-F09-003] Risk Badge Tiering', async ({ page }) => {
      await page.goto('/recurrence');
      await page.locator('button:has-text("Predict Recurrence")').click();
      await expect(page.locator('[data-testid="recurrence-risk-badge"]')).toHaveText(/(Low Risk|Medium Risk|High Risk)/);
    });

    test('[TC-T1-F09-004] Risk Badge Color Mapping', async ({ page }) => {
      await page.goto('/recurrence');
      await page.locator('select[name="marginsStatus"]').selectOption('Positive');
      await page.locator('button:has-text("Predict Recurrence")').click();
      await expect(page.locator('[data-testid="recurrence-risk-badge"]')).toHaveClass(/bg-red/);
    });

    test('[TC-T1-F09-005] Risk Factor Breakdown', async ({ page }) => {
      await page.goto('/recurrence');
      await page.locator('button:has-text("Predict Recurrence")').click();
      await expect(page.locator('[data-testid="risk-factor-breakdown"]')).toBeVisible();
    });
  });

  // Feature 10: Biomarker Discovery (Module 7)
  test.describe('Feature 10: Biomarker Discovery', () => {
    test('[TC-T1-F10-001] Cancer Type Dropdown Filter', async ({ page }) => {
      await page.goto('/biomarkers');
      await expect(page.locator('select[name="cancerType"]')).toBeVisible();
    });

    test('[TC-T1-F10-002] Gene Contribution List', async ({ page }) => {
      await page.goto('/biomarkers');
      await expect(page.locator('[data-testid="gene-contribution-card"]')).toHaveCount({ min: 1 });
    });

    test('[TC-T1-F10-003] Gene Weight Bar Chart', async ({ page }) => {
      await page.goto('/biomarkers');
      await expect(page.locator('.recharts-bar')).toBeVisible();
    });

    test('[TC-T1-F10-004] Gene List Sorting Options', async ({ page }) => {
      await page.goto('/biomarkers');
      const sortBtn = page.locator('button:has-text("Sort by Weight")');
      await expect(sortBtn).toBeVisible();
    });

    test('[TC-T1-F10-005] Interactive Gene Cards', async ({ page }) => {
      await page.goto('/biomarkers');
      const firstCard = page.locator('[data-testid="gene-contribution-card"]').first();
      await firstCard.click();
      await expect(firstCard.locator('[data-testid="gene-card-expanded-info"]')).toBeVisible();
    });
  });

  // Feature 11: Explainable AI SHAP (Module 8)
  test.describe('Feature 11: Explainable AI SHAP', () => {
    test('[TC-T1-F11-001] Patient Case Selector', async ({ page }) => {
      await page.goto('/shap');
      await expect(page.locator('select[name="patientCase"]')).toBeVisible();
    });

    test('[TC-T1-F11-002] SHAP Summary Plot', async ({ page }) => {
      await page.goto('/shap');
      await expect(page.locator('[data-testid="shap-summary-plot"]')).toBeVisible();
    });

    test('[TC-T1-F11-003] SHAP Waterfall Plot', async ({ page }) => {
      await page.goto('/shap');
      await expect(page.locator('[data-testid="shap-waterfall-plot"]')).toBeVisible();
    });

    test('[TC-T1-F11-004] Textual SHAP Explanation', async ({ page }) => {
      await page.goto('/shap');
      await expect(page.locator('[data-testid="shap-explanation-text"]')).toBeVisible();
    });

    test('[TC-T1-F11-005] Raw Weights Table Toggle', async ({ page }) => {
      await page.goto('/shap');
      const toggleBtn = page.locator('button:has-text("View Raw Data Table")');
      await toggleBtn.click();
      await expect(page.locator('[data-testid="raw-weights-table"]')).toBeVisible();
    });
  });

  // Feature 12: Genetic Risk Assessment (Module 9)
  test.describe('Feature 12: Genetic Risk Assessment', () => {
    test('[TC-T1-F12-001] Sequence Variant Input Field', async ({ page }) => {
      await page.goto('/genetic-risk');
      await expect(page.locator('textarea[name="variantInput"]')).toBeVisible();
    });

    test('[TC-T1-F12-002] Variant DB Parser List', async ({ page }) => {
      await page.goto('/genetic-risk');
      await page.locator('textarea[name="variantInput"]').fill('BRCA1 c.5266dupC');
      await page.locator('button:has-text("Parse Variant")').click();
      await expect(page.locator('[data-testid="parsed-variant-results"]')).toBeVisible();
    });

    test('[TC-T1-F12-003] Predisposition Risk Level', async ({ page }) => {
      await page.goto('/genetic-risk');
      await page.locator('textarea[name="variantInput"]').fill('BRCA1 c.5266dupC');
      await page.locator('button:has-text("Parse Variant")').click();
      await expect(page.locator('[data-testid="predisposition-risk-level"]')).toContainText(/(Pathogenic|Benign|VUS)/);
    });

    test('[TC-T1-F12-004] High-Risk Genetic Alerts', async ({ page }) => {
      await page.goto('/genetic-risk');
      await page.locator('textarea[name="variantInput"]').fill('BRCA1 c.5266dupC');
      await page.locator('button:has-text("Parse Variant")').click();
      await expect(page.locator('[data-testid="high-risk-alert"]')).toBeVisible();
    });

    test('[TC-T1-F12-005] Clinical References Section', async ({ page }) => {
      await page.goto('/genetic-risk');
      await page.locator('textarea[name="variantInput"]').fill('BRCA1 c.5266dupC');
      await page.locator('button:has-text("Parse Variant")').click();
      await expect(page.locator('[data-testid="clinical-references-list"]')).toBeVisible();
    });
  });

  // Feature 13: Patient Similarity Engine (Module 10)
  test.describe('Feature 13: Patient Similarity Engine', () => {
    test('[TC-T1-F13-001] Similarity Search Input', async ({ page }) => {
      await page.goto('/similarity');
      await expect(page.locator('input[placeholder*="search"]')).toBeVisible();
    });

    test('[TC-T1-F13-002] Similarity Search Loader', async ({ page }) => {
      await page.goto('/similarity');
      await page.locator('input[placeholder*="search"]').fill('adenocarcinoma');
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-testid="similarity-search-loader"]')).toBeVisible();
    });

    test('[TC-T1-F13-003] Top 5 Similar Cases List', async ({ page }) => {
      await page.goto('/similarity');
      await page.locator('input[placeholder*="search"]').fill('adenocarcinoma');
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-testid="similar-patient-card"]')).toHaveCount(5);
    });

    test('[TC-T1-F13-004] Expandable Case Cards', async ({ page }) => {
      await page.goto('/similarity');
      await page.locator('input[placeholder*="search"]').fill('adenocarcinoma');
      await page.keyboard.press('Enter');
      const firstCard = page.locator('[data-testid="similar-patient-card"]').first();
      await firstCard.click();
      await expect(firstCard.locator('[data-testid="patient-card-details"]')).toBeVisible();
    });

    test('[TC-T1-F13-005] Historic Treatment Profiles', async ({ page }) => {
      await page.goto('/similarity');
      await page.locator('input[placeholder*="search"]').fill('adenocarcinoma');
      await page.keyboard.press('Enter');
      const firstCard = page.locator('[data-testid="similar-patient-card"]').first();
      await firstCard.click();
      await expect(firstCard.locator('[data-testid="treatment-profile"]')).toBeVisible();
    });
  });

  // Feature 14: Clinical Report Generator (Module 11)
  test.describe('Feature 14: Clinical Report Generator', () => {
    test('[TC-T1-F14-001] Module Selector Checkboxes', async ({ page }) => {
      await page.goto('/report-generator');
      await expect(page.locator('input[type="checkbox"]')).toHaveCount(11);
    });

    test('[TC-T1-F14-002] Select All Modules Toggle', async ({ page }) => {
      await page.goto('/report-generator');
      const selectAllBtn = page.locator('button:has-text("Select All")');
      await selectAllBtn.click();
      const checkboxes = page.locator('input[type="checkbox"]');
      for (let i = 0; i < 11; i++) {
        await expect(checkboxes.nth(i)).toBeChecked();
      }
    });

    test('[TC-T1-F14-003] Report Preview Panel', async ({ page }) => {
      await page.goto('/report-generator');
      await page.locator('input[type="checkbox"]').first().check();
      await expect(page.locator('[data-testid="report-preview-panel"]')).toBeVisible();
    });

    test('[TC-T1-F14-004] Export PDF Execution', async ({ page }) => {
      await page.goto('/report-generator');
      await page.locator('input[type="checkbox"]').first().check();
      const exportBtn = page.locator('button:has-text("Export Report PDF")');
      await exportBtn.click();
      await expect(exportBtn).toContainText(/(Generating|Exporting)/);
    });

    test('[TC-T1-F14-005] PDF Download Event', async ({ page }) => {
      await page.goto('/report-generator');
      await page.locator('input[type="checkbox"]').first().check();
      await page.locator('button:has-text("Export Report PDF")').click();
      // Toast notification for download complete
      await expect(page.locator('text=Report successfully exported!')).toBeVisible();
    });
  });

});
