// Mock SHAP (SHapley Additive exPlanations) data for Explainable AI module

export interface ShapFeature {
  feature: string;
  shapValue: number; // positive = pushes toward malignant, negative = pushes toward benign
  featureValue: number | string;
  category: 'Clinical' | 'Genomic' | 'Demographic';
}

// SHAP waterfall data — explains a single prediction
export const shapWaterfallData: ShapFeature[] = [
  { feature: 'TP53 Mutation', shapValue: 0.42, featureValue: 'Yes', category: 'Genomic' },
  { feature: 'Tumor Size (mm)', shapValue: 0.31, featureValue: 45, category: 'Clinical' },
  { feature: 'Ki-67 Index (%)', shapValue: 0.25, featureValue: 78, category: 'Clinical' },
  { feature: 'Stage', shapValue: 0.18, featureValue: 'III', category: 'Clinical' },
  { feature: 'EGFR Expression', shapValue: 0.15, featureValue: 'High', category: 'Genomic' },
  { feature: 'Mitotic Index', shapValue: 0.12, featureValue: 12, category: 'Clinical' },
  { feature: 'Age', shapValue: 0.08, featureValue: 58, category: 'Demographic' },
  { feature: 'Smoking History', shapValue: 0.06, featureValue: 'Yes', category: 'Demographic' },
  { feature: 'ER Status', shapValue: -0.22, featureValue: 'Positive', category: 'Genomic' },
  { feature: 'PR Status', shapValue: -0.15, featureValue: 'Positive', category: 'Genomic' },
  { feature: 'Family History', shapValue: -0.05, featureValue: 'No', category: 'Demographic' },
  { feature: 'BMI', shapValue: -0.03, featureValue: 24.5, category: 'Demographic' },
];

// SHAP summary data — feature importance across many predictions
export interface ShapSummaryPoint {
  feature: string;
  meanAbsShap: number;
  direction: 'positive' | 'negative' | 'mixed';
  percentPositive: number;
}

export const shapSummaryData: ShapSummaryPoint[] = [
  { feature: 'TP53 Mutation', meanAbsShap: 0.38, direction: 'positive', percentPositive: 85 },
  { feature: 'Tumor Size', meanAbsShap: 0.32, direction: 'positive', percentPositive: 78 },
  { feature: 'Ki-67 Index', meanAbsShap: 0.28, direction: 'positive', percentPositive: 82 },
  { feature: 'Stage', meanAbsShap: 0.24, direction: 'positive', percentPositive: 90 },
  { feature: 'ER Status', meanAbsShap: 0.21, direction: 'negative', percentPositive: 22 },
  { feature: 'EGFR Expression', meanAbsShap: 0.19, direction: 'mixed', percentPositive: 55 },
  { feature: 'PR Status', meanAbsShap: 0.16, direction: 'negative', percentPositive: 18 },
  { feature: 'Mitotic Index', meanAbsShap: 0.14, direction: 'positive', percentPositive: 75 },
  { feature: 'Lymph Node Count', meanAbsShap: 0.12, direction: 'positive', percentPositive: 88 },
  { feature: 'Age', meanAbsShap: 0.10, direction: 'mixed', percentPositive: 52 },
  { feature: 'BRCA1 Mutation', meanAbsShap: 0.08, direction: 'positive', percentPositive: 68 },
  { feature: 'Smoking History', meanAbsShap: 0.07, direction: 'positive', percentPositive: 62 },
  { feature: 'BMI', meanAbsShap: 0.05, direction: 'mixed', percentPositive: 48 },
  { feature: 'Family History', meanAbsShap: 0.04, direction: 'mixed', percentPositive: 50 },
  { feature: 'Alcohol Consumption', meanAbsShap: 0.03, direction: 'mixed', percentPositive: 45 },
];

// Model performance metrics
export const modelMetrics = {
  accuracy: 0.942,
  auroc: 0.968,
  sensitivity: 0.935,
  specificity: 0.948,
  f1Score: 0.941,
  precision: 0.947,
};

// Confusion matrix
export const confusionMatrix = {
  truePositive: 187,
  falsePositive: 10,
  trueNegative: 189,
  falseNegative: 13,
  total: 399,
};
