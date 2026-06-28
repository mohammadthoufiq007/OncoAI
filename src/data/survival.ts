// Mock survival analysis data — Kaplan-Meier curves per cancer type

export interface SurvivalPoint {
  month: number;
  probability: number;
}

export interface SurvivalCohort {
  name: string;
  color: string;
  medianSurvival: number;
  curve: SurvivalPoint[];
}

// Helper to generate a realistic declining survival curve
function generateCurve(median: number, points: number = 13): SurvivalPoint[] {
  const curve: SurvivalPoint[] = [{ month: 0, probability: 100 }];
  const lambda = Math.log(2) / median;
  for (let i = 1; i <= points; i++) {
    const month = i * 6; // every 6 months
    const prob = Math.max(0, Math.round(100 * Math.exp(-lambda * month)));
    curve.push({ month, probability: prob });
  }
  return curve;
}

export const survivalCohorts: Record<string, SurvivalCohort[]> = {
  'All Cancers': [
    { name: 'Stage I', color: '#00D2C4', medianSurvival: 84, curve: generateCurve(84) },
    { name: 'Stage II', color: '#008DDA', medianSurvival: 60, curve: generateCurve(60) },
    { name: 'Stage III', color: '#F59E0B', medianSurvival: 36, curve: generateCurve(36) },
    { name: 'Stage IV', color: '#EF4444', medianSurvival: 14, curve: generateCurve(14) },
  ],
  'Breast': [
    { name: 'Luminal A', color: '#00D2C4', medianSurvival: 120, curve: generateCurve(120) },
    { name: 'Luminal B', color: '#008DDA', medianSurvival: 72, curve: generateCurve(72) },
    { name: 'HER2+', color: '#F59E0B', medianSurvival: 54, curve: generateCurve(54) },
    { name: 'Triple Negative', color: '#EF4444', medianSurvival: 28, curve: generateCurve(28) },
  ],
  'Lung': [
    { name: 'EGFR Mutant (TKI)', color: '#00D2C4', medianSurvival: 48, curve: generateCurve(48) },
    { name: 'Adenocarcinoma', color: '#008DDA', medianSurvival: 24, curve: generateCurve(24) },
    { name: 'Squamous Cell', color: '#F59E0B', medianSurvival: 14, curve: generateCurve(14) },
    { name: 'Small Cell', color: '#EF4444', medianSurvival: 8, curve: generateCurve(8) },
  ],
  'Colorectal': [
    { name: 'MSI-High (ICI)', color: '#00D2C4', medianSurvival: 72, curve: generateCurve(72) },
    { name: 'MSS Stage II', color: '#008DDA', medianSurvival: 48, curve: generateCurve(48) },
    { name: 'KRAS Mutant', color: '#F59E0B', medianSurvival: 24, curve: generateCurve(24) },
    { name: 'BRAF V600E', color: '#EF4444', medianSurvival: 12, curve: generateCurve(12) },
  ],
  'Melanoma': [
    { name: 'BRAF+ (Targeted)', color: '#00D2C4', medianSurvival: 42, curve: generateCurve(42) },
    { name: 'ICI Responder', color: '#008DDA', medianSurvival: 36, curve: generateCurve(36) },
    { name: 'Uveal', color: '#F59E0B', medianSurvival: 18, curve: generateCurve(18) },
    { name: 'Acral (Advanced)', color: '#EF4444', medianSurvival: 10, curve: generateCurve(10) },
  ],
  'Pancreatic': [
    { name: 'Resectable', color: '#00D2C4', medianSurvival: 24, curve: generateCurve(24) },
    { name: 'Borderline Resectable', color: '#008DDA', medianSurvival: 15, curve: generateCurve(15) },
    { name: 'Locally Advanced', color: '#F59E0B', medianSurvival: 10, curve: generateCurve(10) },
    { name: 'Metastatic', color: '#EF4444', medianSurvival: 5, curve: generateCurve(5) },
  ],
};

// Overall survival statistics for dashboard summary
export const overallStats = {
  totalPatients: 20,
  medianFollowUp: '28 months',
  overallSurvivalRate: '75%',
  progressionFreeRate: '55%',
};
