import React, { createContext, useContext, useState } from 'react';

// Re-use types from the old data files
import type { Patient } from '../data/patients';
import type { Gene } from '../data/genes';
import type { GeneticVariant } from '../data/variants';
import type { SurvivalCohort } from '../data/survival';
import type { ShapFeature, ShapSummaryPoint } from '../data/shap';

interface DataContextType {
  patients: Patient[];
  genes: Gene[];
  variants: GeneticVariant[];
  survivalCohorts: Record<string, SurvivalCohort[]>;
  shapWaterfallData: ShapFeature[];
  shapSummaryData: ShapSummaryPoint[];
  modelMetrics: { accuracy: number; auroc: number; sensitivity: number; specificity: number; f1: number };
  confusionMatrix: { truePositive: number; falsePositive: number; falseNegative: number; trueNegative: number };
  overallStats: { totalPatients: string; medianFollowUp: string; overallSurvivalRate: string; progressionFreeRate: string };
  expressionHeatmap: any[];
  riskLevels: any;
  
  // Update functions
  setPatients: (data: Patient[]) => void;
  setGenes: (data: Gene[]) => void;
  setVariants: (data: GeneticVariant[]) => void;
  setSurvivalCohorts: (data: Record<string, SurvivalCohort[]>) => void;
  setShapWaterfallData: (data: ShapFeature[]) => void;
  setShapSummaryData: (data: ShapSummaryPoint[]) => void;
  setModelMetrics: (data: any) => void;
  setConfusionMatrix: (data: any) => void;
  setOverallStats: (data: any) => void;
  setExpressionHeatmap: (data: any[]) => void;
  setRiskLevels: (data: any) => void;
  
  clearAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage or empty
  const loadStored = <T,>(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  const [patients, setPatientsState] = useState<Patient[]>(() => loadStored('cip_patients', []));
  const [genes, setGenesState] = useState<Gene[]>(() => loadStored('cip_genes', []));
  const [variants, setVariantsState] = useState<GeneticVariant[]>(() => loadStored('cip_variants', []));
  const [survivalCohorts, setSurvivalCohortsState] = useState<Record<string, SurvivalCohort[]>>(() => loadStored('cip_survival', {}));
  const [shapWaterfallData, setShapWaterfallDataState] = useState<ShapFeature[]>(() => loadStored('cip_shap_waterfall', []));
  const [shapSummaryData, setShapSummaryDataState] = useState<ShapSummaryPoint[]>(() => loadStored('cip_shap_summary', []));
  const [modelMetrics, setModelMetricsState] = useState<any>(() => loadStored('cip_model_metrics', { accuracy: 0.92, auroc: 0.95, sensitivity: 0.89, specificity: 0.94, f1: 0.91 }));
  const [confusionMatrix, setConfusionMatrixState] = useState<any>(() => loadStored('cip_confusion_matrix', { truePositive: 450, falsePositive: 32, falseNegative: 55, trueNegative: 500 }));
  const [overallStats, setOverallStatsState] = useState<any>(() => loadStored('cip_overall_stats', { totalPatients: '24,592', medianFollowUp: '48 mos', overallSurvivalRate: '68.4%', progressionFreeRate: '54.2%' }));
  const [expressionHeatmap, setExpressionHeatmapState] = useState<any[]>(() => loadStored('cip_expression_heatmap', []));
  const [riskLevels, setRiskLevelsState] = useState<any>(() => loadStored('cip_risk_levels', {
    low: { threshold: 1, color: '#00D2C4' },
    moderate: { threshold: 2.5, color: '#F59E0B' },
    high: { threshold: 5, color: '#EF4444' }
  }));

  // Wrappers to update state and localStorage together
  const setPatients = (data: Patient[]) => { setPatientsState(data); localStorage.setItem('cip_patients', JSON.stringify(data)); };
  const setGenes = (data: Gene[]) => { setGenesState(data); localStorage.setItem('cip_genes', JSON.stringify(data)); };
  const setVariants = (data: GeneticVariant[]) => { setVariantsState(data); localStorage.setItem('cip_variants', JSON.stringify(data)); };
  const setSurvivalCohorts = (data: Record<string, SurvivalCohort[]>) => { setSurvivalCohortsState(data); localStorage.setItem('cip_survival', JSON.stringify(data)); };
  const setShapWaterfallData = (data: ShapFeature[]) => { setShapWaterfallDataState(data); localStorage.setItem('cip_shap_waterfall', JSON.stringify(data)); };
  const setShapSummaryData = (data: ShapSummaryPoint[]) => { setShapSummaryDataState(data); localStorage.setItem('cip_shap_summary', JSON.stringify(data)); };
  const setModelMetrics = (data: any) => { setModelMetricsState(data); localStorage.setItem('cip_model_metrics', JSON.stringify(data)); };
  const setConfusionMatrix = (data: any) => { setConfusionMatrixState(data); localStorage.setItem('cip_confusion_matrix', JSON.stringify(data)); };
  const setOverallStats = (data: any) => { setOverallStatsState(data); localStorage.setItem('cip_overall_stats', JSON.stringify(data)); };
  const setExpressionHeatmap = (data: any[]) => { setExpressionHeatmapState(data); localStorage.setItem('cip_expression_heatmap', JSON.stringify(data)); };
  const setRiskLevels = (data: any) => { setRiskLevelsState(data); localStorage.setItem('cip_risk_levels', JSON.stringify(data)); };

  const clearAllData = () => {
    setPatients([]);
    setGenes([]);
    setVariants([]);
    setSurvivalCohorts({});
    setShapWaterfallData([]);
    setShapSummaryData([]);
    localStorage.removeItem('cip_patients');
    localStorage.removeItem('cip_genes');
    localStorage.removeItem('cip_variants');
    localStorage.removeItem('cip_survival');
    localStorage.removeItem('cip_shap_waterfall');
    localStorage.removeItem('cip_shap_summary');
  };

  return (
    <DataContext.Provider value={{
      patients, setPatients,
      genes, setGenes,
      variants, setVariants,
      survivalCohorts, setSurvivalCohorts,
      shapWaterfallData, setShapWaterfallData,
      shapSummaryData, setShapSummaryData,
      modelMetrics, setModelMetrics,
      confusionMatrix, setConfusionMatrix,
      overallStats, setOverallStats,
      expressionHeatmap, setExpressionHeatmap,
      riskLevels, setRiskLevels,
      clearAllData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
