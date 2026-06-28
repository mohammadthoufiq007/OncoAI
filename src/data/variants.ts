// Mock genetic variant database for germline risk assessment

export interface GeneticVariant {
  id: string;
  gene: string;
  variant: string;
  chromosome: string;
  position: string;
  classification: 'Pathogenic' | 'Likely Pathogenic' | 'VUS' | 'Likely Benign' | 'Benign';
  zygosity: 'Heterozygous' | 'Homozygous';
  associatedCancers: string[];
  riskMultiplier: number;
  populationFrequency: number;
  clinicalSignificance: string;
}

export const variants: GeneticVariant[] = [
  { id: 'VAR-001', gene: 'BRCA1', variant: 'c.5266dupC (5382insC)', chromosome: '17', position: 'q21.31', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Ovarian'], riskMultiplier: 5.2, populationFrequency: 0.001, clinicalSignificance: 'Founder mutation in Ashkenazi Jewish population. Confers 60-80% lifetime breast cancer risk.' },
  { id: 'VAR-002', gene: 'BRCA2', variant: 'c.6174delT', chromosome: '13', position: 'q13.1', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Ovarian', 'Pancreatic'], riskMultiplier: 4.1, populationFrequency: 0.0012, clinicalSignificance: 'Loss-of-function variant. Confers 45-65% lifetime breast cancer risk, elevated pancreatic risk.' },
  { id: 'VAR-003', gene: 'TP53', variant: 'c.742C>T (p.R248W)', chromosome: '17', position: 'p13.1', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Sarcoma', 'Brain', 'Adrenocortical'], riskMultiplier: 8.5, populationFrequency: 0.00005, clinicalSignificance: 'Li-Fraumeni syndrome hotspot. Near 100% lifetime cancer risk across multiple organs.' },
  { id: 'VAR-004', gene: 'CHEK2', variant: 'c.1100delC', chromosome: '22', position: 'q12.1', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Colorectal'], riskMultiplier: 2.3, populationFrequency: 0.005, clinicalSignificance: 'Moderate-penetrance variant. 2-3x elevated breast cancer risk, particularly in Northern European descent.' },
  { id: 'VAR-005', gene: 'PALB2', variant: 'c.3113G>A (p.W1038*)', chromosome: '16', position: 'p12.2', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Pancreatic'], riskMultiplier: 3.5, populationFrequency: 0.0008, clinicalSignificance: 'BRCA2 partner. Confers 35-58% lifetime breast cancer risk. Actionable for PARP inhibitor therapy.' },
  { id: 'VAR-006', gene: 'ATM', variant: 'c.7271T>G (p.V2424G)', chromosome: '11', position: 'q22.3', classification: 'Likely Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Pancreatic'], riskMultiplier: 2.8, populationFrequency: 0.002, clinicalSignificance: 'Missense in PI3K domain. Associated with moderate breast cancer risk and enhanced radiosensitivity.' },
  { id: 'VAR-007', gene: 'MLH1', variant: 'c.350C>T (p.T117M)', chromosome: '3', position: 'p22.2', classification: 'VUS', zygosity: 'Heterozygous', associatedCancers: ['Colorectal', 'Endometrial'], riskMultiplier: 1.5, populationFrequency: 0.003, clinicalSignificance: 'Variant of Uncertain Significance in mismatch repair gene. Functional studies inconclusive.' },
  { id: 'VAR-008', gene: 'MSH2', variant: 'c.942+3A>T', chromosome: '2', position: 'p21-p16', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Colorectal', 'Endometrial', 'Ovarian'], riskMultiplier: 6.1, populationFrequency: 0.0003, clinicalSignificance: 'Lynch Syndrome. 52-82% lifetime colorectal cancer risk. Annual colonoscopy from age 20-25 recommended.' },
  { id: 'VAR-009', gene: 'CDKN2A', variant: 'c.225_243del19', chromosome: '9', position: 'p21.3', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Melanoma', 'Pancreatic'], riskMultiplier: 4.8, populationFrequency: 0.0002, clinicalSignificance: 'Familial melanoma gene. 28-67% lifetime melanoma risk. Semi-annual dermatological screening recommended.' },
  { id: 'VAR-010', gene: 'APC', variant: 'c.3927_3931delAAAGA', chromosome: '5', position: 'q22.2', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Colorectal'], riskMultiplier: 15.0, populationFrequency: 0.00008, clinicalSignificance: 'Familial Adenomatous Polyposis. Near 100% lifetime CRC risk without prophylactic colectomy.' },
  { id: 'VAR-011', gene: 'RAD51C', variant: 'c.905-2A>G', chromosome: '17', position: 'q22', classification: 'Likely Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Breast', 'Ovarian'], riskMultiplier: 2.0, populationFrequency: 0.001, clinicalSignificance: 'Splice-site variant. Emerging evidence for moderate ovarian cancer risk. PARP inhibitor eligible.' },
  { id: 'VAR-012', gene: 'STK11', variant: 'c.862C>T (p.Q288*)', chromosome: '19', position: 'p13.3', classification: 'Pathogenic', zygosity: 'Heterozygous', associatedCancers: ['Colorectal', 'Breast', 'Lung', 'Pancreatic'], riskMultiplier: 5.5, populationFrequency: 0.0001, clinicalSignificance: 'Peutz-Jeghers Syndrome. Multi-organ cancer predisposition. Comprehensive surveillance protocol required.' },
];

// Risk level thresholds
export const riskLevels = {
  low: { min: 0, max: 2, label: 'Low Risk', color: '#00D2C4', description: 'Population-level risk. Standard screening guidelines apply.' },
  moderate: { min: 2, max: 5, label: 'Moderate Risk', color: '#F59E0B', description: 'Enhanced surveillance recommended. Consider genetic counseling.' },
  high: { min: 5, max: 20, label: 'High Risk', color: '#EF4444', description: 'Significantly elevated risk. Specialized monitoring and prophylactic measures advised.' },
};
