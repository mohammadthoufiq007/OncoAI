// Mock gene/biomarker database for oncology analytics

export interface Gene {
  symbol: string;
  fullName: string;
  chromosome: string;
  importance: number; // 0-1 normalized feature importance
  expressionLevel: 'High' | 'Medium' | 'Low';
  associatedCancers: string[];
  pathway: string;
  drugTarget: boolean;
}

export const genes: Gene[] = [
  { symbol: 'TP53', fullName: 'Tumor Protein P53', chromosome: '17p13.1', importance: 0.94, expressionLevel: 'High', associatedCancers: ['Breast', 'Lung', 'Colorectal', 'Pancreatic'], pathway: 'Cell Cycle Regulation', drugTarget: false },
  { symbol: 'BRCA1', fullName: 'BRCA1 DNA Repair Associated', chromosome: '17q21.31', importance: 0.91, expressionLevel: 'High', associatedCancers: ['Breast', 'Ovarian'], pathway: 'DNA Damage Response', drugTarget: true },
  { symbol: 'EGFR', fullName: 'Epidermal Growth Factor Receptor', chromosome: '7p11.2', importance: 0.88, expressionLevel: 'High', associatedCancers: ['Lung', 'Colorectal'], pathway: 'RTK/RAS Signaling', drugTarget: true },
  { symbol: 'KRAS', fullName: 'KRAS Proto-Oncogene', chromosome: '12p12.1', importance: 0.86, expressionLevel: 'High', associatedCancers: ['Lung', 'Colorectal', 'Pancreatic'], pathway: 'RTK/RAS Signaling', drugTarget: true },
  { symbol: 'HER2', fullName: 'Erb-B2 Receptor Tyrosine Kinase 2', chromosome: '17q12', importance: 0.84, expressionLevel: 'High', associatedCancers: ['Breast'], pathway: 'RTK/RAS Signaling', drugTarget: true },
  { symbol: 'BRAF', fullName: 'B-Raf Proto-Oncogene', chromosome: '7q34', importance: 0.82, expressionLevel: 'Medium', associatedCancers: ['Melanoma', 'Colorectal', 'Lung'], pathway: 'MAPK Signaling', drugTarget: true },
  { symbol: 'PIK3CA', fullName: 'PI3K Catalytic Subunit Alpha', chromosome: '3q26.32', importance: 0.78, expressionLevel: 'Medium', associatedCancers: ['Breast', 'Colorectal'], pathway: 'PI3K/AKT/mTOR', drugTarget: true },
  { symbol: 'PTEN', fullName: 'Phosphatase And Tensin Homolog', chromosome: '10q23.31', importance: 0.75, expressionLevel: 'Low', associatedCancers: ['Breast', 'Lung', 'Melanoma'], pathway: 'PI3K/AKT/mTOR', drugTarget: false },
  { symbol: 'MYC', fullName: 'MYC Proto-Oncogene', chromosome: '8q24.21', importance: 0.72, expressionLevel: 'High', associatedCancers: ['Breast', 'Lung', 'Colorectal'], pathway: 'Cell Cycle Regulation', drugTarget: false },
  { symbol: 'CDK4', fullName: 'Cyclin Dependent Kinase 4', chromosome: '12q14.1', importance: 0.68, expressionLevel: 'Medium', associatedCancers: ['Breast', 'Melanoma'], pathway: 'Cell Cycle Regulation', drugTarget: true },
  { symbol: 'ALK', fullName: 'ALK Receptor Tyrosine Kinase', chromosome: '2p23.2-p23.1', importance: 0.65, expressionLevel: 'Low', associatedCancers: ['Lung'], pathway: 'RTK/RAS Signaling', drugTarget: true },
  { symbol: 'RB1', fullName: 'RB Transcriptional Corepressor 1', chromosome: '13q14.2', importance: 0.62, expressionLevel: 'Low', associatedCancers: ['Breast', 'Lung'], pathway: 'Cell Cycle Regulation', drugTarget: false },
  { symbol: 'VEGFA', fullName: 'Vascular Endothelial Growth Factor A', chromosome: '6p21.1', importance: 0.58, expressionLevel: 'Medium', associatedCancers: ['Colorectal', 'Lung'], pathway: 'Angiogenesis', drugTarget: true },
  { symbol: 'APC', fullName: 'APC Regulator Of WNT Signaling', chromosome: '5q22.2', importance: 0.55, expressionLevel: 'Low', associatedCancers: ['Colorectal'], pathway: 'WNT Signaling', drugTarget: false },
  { symbol: 'CDKN2A', fullName: 'Cyclin Dependent Kinase Inhibitor 2A', chromosome: '9p21.3', importance: 0.52, expressionLevel: 'Low', associatedCancers: ['Melanoma', 'Pancreatic', 'Lung'], pathway: 'Cell Cycle Regulation', drugTarget: false },
  { symbol: 'BRCA2', fullName: 'BRCA2 DNA Repair Associated', chromosome: '13q13.1', importance: 0.48, expressionLevel: 'Medium', associatedCancers: ['Breast', 'Pancreatic'], pathway: 'DNA Damage Response', drugTarget: true },
  { symbol: 'NRAS', fullName: 'NRAS Proto-Oncogene', chromosome: '1p13.2', importance: 0.45, expressionLevel: 'Medium', associatedCancers: ['Melanoma'], pathway: 'RTK/RAS Signaling', drugTarget: false },
  { symbol: 'MLH1', fullName: 'MutL Homolog 1', chromosome: '3p22.2', importance: 0.42, expressionLevel: 'Low', associatedCancers: ['Colorectal'], pathway: 'Mismatch Repair', drugTarget: false },
  { symbol: 'PDL1', fullName: 'Programmed Death-Ligand 1', chromosome: '9p24.1', importance: 0.38, expressionLevel: 'Medium', associatedCancers: ['Lung', 'Melanoma'], pathway: 'Immune Checkpoint', drugTarget: true },
  { symbol: 'FGFR2', fullName: 'Fibroblast Growth Factor Receptor 2', chromosome: '10q26.13', importance: 0.35, expressionLevel: 'Low', associatedCancers: ['Breast'], pathway: 'RTK/RAS Signaling', drugTarget: true },
];

// Gene expression heatmap data (top 10 genes x 5 cancer types)
export const expressionHeatmap = [
  { gene: 'TP53', Breast: 8.2, Lung: 9.1, Colorectal: 7.5, Melanoma: 6.8, Pancreatic: 8.8 },
  { gene: 'BRCA1', Breast: 9.4, Lung: 3.2, Colorectal: 2.1, Melanoma: 1.8, Pancreatic: 2.5 },
  { gene: 'EGFR', Breast: 4.5, Lung: 9.2, Colorectal: 7.8, Melanoma: 3.4, Pancreatic: 5.1 },
  { gene: 'KRAS', Breast: 2.1, Lung: 7.8, Colorectal: 8.5, Melanoma: 2.2, Pancreatic: 9.1 },
  { gene: 'HER2', Breast: 8.8, Lung: 2.5, Colorectal: 1.5, Melanoma: 1.2, Pancreatic: 1.8 },
  { gene: 'BRAF', Breast: 1.8, Lung: 3.5, Colorectal: 6.2, Melanoma: 9.5, Pancreatic: 2.1 },
  { gene: 'PIK3CA', Breast: 7.2, Lung: 4.1, Colorectal: 5.8, Melanoma: 2.8, Pancreatic: 3.2 },
  { gene: 'PTEN', Breast: 3.5, Lung: 4.8, Colorectal: 3.2, Melanoma: 6.5, Pancreatic: 2.8 },
  { gene: 'MYC', Breast: 6.8, Lung: 7.5, Colorectal: 5.5, Melanoma: 4.2, Pancreatic: 6.1 },
  { gene: 'CDK4', Breast: 5.5, Lung: 3.8, Colorectal: 2.5, Melanoma: 7.8, Pancreatic: 2.2 },
];
