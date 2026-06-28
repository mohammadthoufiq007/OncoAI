// Mock patient database — 20 realistic oncology cases
export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  cancerType: string;
  subtype: string;
  stage: 'I' | 'II' | 'III' | 'IV';
  tumorSize: number; // mm
  mitoticIndex: number;
  ki67: number; // %
  gradeScore: number; // 1-3
  erStatus: boolean;
  prStatus: boolean;
  her2Status: boolean;
  smokingHistory: boolean;
  familyHistory: boolean;
  diagnosisDate: string;
  recurrenceRisk: number; // 0-100
  survivalMonths: number;
  isAlive: boolean;
  treatmentLine: string;
}

export const patients: Patient[] = [
  { id: 'PAT-0001', name: 'Sarah Chen', age: 52, sex: 'F', cancerType: 'Breast', subtype: 'Luminal A', stage: 'II', tumorSize: 22, mitoticIndex: 3, ki67: 14, gradeScore: 1, erStatus: true, prStatus: true, her2Status: false, smokingHistory: false, familyHistory: true, diagnosisDate: '2023-03-15', recurrenceRisk: 18, survivalMonths: 84, isAlive: true, treatmentLine: 'Tamoxifen + AI' },
  { id: 'PAT-0002', name: 'James Rivera', age: 67, sex: 'M', cancerType: 'Lung', subtype: 'Adenocarcinoma', stage: 'III', tumorSize: 45, mitoticIndex: 8, ki67: 55, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: true, familyHistory: false, diagnosisDate: '2022-11-02', recurrenceRisk: 72, survivalMonths: 14, isAlive: true, treatmentLine: 'Pembrolizumab + Pemetrexed' },
  { id: 'PAT-0003', name: 'Maria Gonzalez', age: 44, sex: 'F', cancerType: 'Breast', subtype: 'Triple Negative', stage: 'II', tumorSize: 31, mitoticIndex: 12, ki67: 78, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: true, diagnosisDate: '2023-07-20', recurrenceRisk: 61, survivalMonths: 36, isAlive: true, treatmentLine: 'AC-T Chemotherapy' },
  { id: 'PAT-0004', name: 'Robert Kim', age: 71, sex: 'M', cancerType: 'Colorectal', subtype: 'Microsatellite Stable', stage: 'III', tumorSize: 52, mitoticIndex: 6, ki67: 42, gradeScore: 2, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: true, diagnosisDate: '2022-06-10', recurrenceRisk: 48, survivalMonths: 28, isAlive: true, treatmentLine: 'FOLFOX' },
  { id: 'PAT-0005', name: 'Emily Zhang', age: 38, sex: 'F', cancerType: 'Breast', subtype: 'HER2+', stage: 'I', tumorSize: 15, mitoticIndex: 7, ki67: 35, gradeScore: 2, erStatus: false, prStatus: false, her2Status: true, smokingHistory: false, familyHistory: false, diagnosisDate: '2024-01-08', recurrenceRisk: 22, survivalMonths: 60, isAlive: true, treatmentLine: 'Trastuzumab + Docetaxel' },
  { id: 'PAT-0006', name: 'William Thompson', age: 63, sex: 'M', cancerType: 'Lung', subtype: 'Squamous Cell', stage: 'IV', tumorSize: 68, mitoticIndex: 15, ki67: 72, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: true, familyHistory: false, diagnosisDate: '2023-02-14', recurrenceRisk: 89, survivalMonths: 8, isAlive: false, treatmentLine: 'Nivolumab' },
  { id: 'PAT-0007', name: 'Aisha Patel', age: 55, sex: 'F', cancerType: 'Breast', subtype: 'Luminal B', stage: 'II', tumorSize: 28, mitoticIndex: 9, ki67: 32, gradeScore: 2, erStatus: true, prStatus: true, her2Status: true, smokingHistory: false, familyHistory: true, diagnosisDate: '2023-09-05', recurrenceRisk: 35, survivalMonths: 48, isAlive: true, treatmentLine: 'Trastuzumab + Letrozole' },
  { id: 'PAT-0008', name: 'David Okafor', age: 59, sex: 'M', cancerType: 'Colorectal', subtype: 'MSI-High', stage: 'II', tumorSize: 38, mitoticIndex: 4, ki67: 25, gradeScore: 2, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: true, diagnosisDate: '2023-04-22', recurrenceRisk: 15, survivalMonths: 72, isAlive: true, treatmentLine: 'Pembrolizumab' },
  { id: 'PAT-0009', name: 'Linda Nakamura', age: 48, sex: 'F', cancerType: 'Pancreatic', subtype: 'Ductal Adenocarcinoma', stage: 'III', tumorSize: 42, mitoticIndex: 11, ki67: 65, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2023-08-30', recurrenceRisk: 82, survivalMonths: 11, isAlive: true, treatmentLine: 'FOLFIRINOX' },
  { id: 'PAT-0010', name: 'Michael Torres', age: 45, sex: 'M', cancerType: 'Melanoma', subtype: 'BRAF V600E Mutant', stage: 'III', tumorSize: 18, mitoticIndex: 10, ki67: 48, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2023-05-17', recurrenceRisk: 55, survivalMonths: 30, isAlive: true, treatmentLine: 'Dabrafenib + Trametinib' },
  { id: 'PAT-0011', name: 'Catherine Lee', age: 62, sex: 'F', cancerType: 'Breast', subtype: 'Luminal A', stage: 'I', tumorSize: 12, mitoticIndex: 1, ki67: 8, gradeScore: 1, erStatus: true, prStatus: true, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2024-02-28', recurrenceRisk: 5, survivalMonths: 120, isAlive: true, treatmentLine: 'Letrozole' },
  { id: 'PAT-0012', name: 'Ahmed Hassan', age: 74, sex: 'M', cancerType: 'Lung', subtype: 'Small Cell', stage: 'IV', tumorSize: 72, mitoticIndex: 20, ki67: 90, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: true, familyHistory: true, diagnosisDate: '2022-09-12', recurrenceRisk: 95, survivalMonths: 6, isAlive: false, treatmentLine: 'Cisplatin + Etoposide' },
  { id: 'PAT-0013', name: 'Sofia Martinez', age: 41, sex: 'F', cancerType: 'Colorectal', subtype: 'KRAS Mutant', stage: 'IV', tumorSize: 55, mitoticIndex: 9, ki67: 50, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: true, diagnosisDate: '2023-01-25', recurrenceRisk: 78, survivalMonths: 18, isAlive: true, treatmentLine: 'FOLFIRI + Bevacizumab' },
  { id: 'PAT-0014', name: 'Thomas Wright', age: 58, sex: 'M', cancerType: 'Melanoma', subtype: 'Uveal', stage: 'II', tumorSize: 14, mitoticIndex: 5, ki67: 28, gradeScore: 2, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2023-11-08', recurrenceRisk: 38, survivalMonths: 42, isAlive: true, treatmentLine: 'Tebentafusp' },
  { id: 'PAT-0015', name: 'Priya Sharma', age: 36, sex: 'F', cancerType: 'Breast', subtype: 'Triple Negative', stage: 'III', tumorSize: 48, mitoticIndex: 14, ki67: 82, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: true, diagnosisDate: '2023-06-12', recurrenceRisk: 74, survivalMonths: 22, isAlive: true, treatmentLine: 'Sacituzumab Govitecan' },
  { id: 'PAT-0016', name: 'John Campbell', age: 69, sex: 'M', cancerType: 'Pancreatic', subtype: 'Acinar Cell', stage: 'IV', tumorSize: 61, mitoticIndex: 13, ki67: 70, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: true, familyHistory: false, diagnosisDate: '2022-12-03', recurrenceRisk: 92, survivalMonths: 5, isAlive: false, treatmentLine: 'Gemcitabine + nab-Paclitaxel' },
  { id: 'PAT-0017', name: 'Yuki Tanaka', age: 50, sex: 'F', cancerType: 'Lung', subtype: 'EGFR Mutant', stage: 'II', tumorSize: 25, mitoticIndex: 5, ki67: 30, gradeScore: 2, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2024-03-01', recurrenceRisk: 28, survivalMonths: 48, isAlive: true, treatmentLine: 'Osimertinib' },
  { id: 'PAT-0018', name: 'Marcus Johnson', age: 56, sex: 'M', cancerType: 'Colorectal', subtype: 'BRAF V600E', stage: 'III', tumorSize: 44, mitoticIndex: 7, ki67: 45, gradeScore: 2, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2023-10-15', recurrenceRisk: 58, survivalMonths: 24, isAlive: true, treatmentLine: 'Encorafenib + Cetuximab' },
  { id: 'PAT-0019', name: 'Hannah O\'Brien', age: 33, sex: 'F', cancerType: 'Breast', subtype: 'HER2+', stage: 'II', tumorSize: 20, mitoticIndex: 8, ki67: 40, gradeScore: 2, erStatus: true, prStatus: false, her2Status: true, smokingHistory: false, familyHistory: true, diagnosisDate: '2024-01-20', recurrenceRisk: 30, survivalMonths: 54, isAlive: true, treatmentLine: 'TDM-1' },
  { id: 'PAT-0020', name: 'Carlos Medina', age: 61, sex: 'M', cancerType: 'Melanoma', subtype: 'Acral Lentiginous', stage: 'IV', tumorSize: 35, mitoticIndex: 12, ki67: 60, gradeScore: 3, erStatus: false, prStatus: false, her2Status: false, smokingHistory: false, familyHistory: false, diagnosisDate: '2023-03-28', recurrenceRisk: 85, survivalMonths: 12, isAlive: true, treatmentLine: 'Ipilimumab + Nivolumab' },
];

// Aggregate cancer type distribution
export const cancerTypeDistribution = [
  { name: 'Breast', count: 7, color: '#E91E8C' },
  { name: 'Lung', count: 4, color: '#3B82F6' },
  { name: 'Colorectal', count: 4, color: '#F59E0B' },
  { name: 'Melanoma', count: 3, color: '#8B5CF6' },
  { name: 'Pancreatic', count: 2, color: '#EF4444' },
];

// Subtype distribution
export const subtypeDistribution = [
  { name: 'Luminal A', count: 2, cancerType: 'Breast' },
  { name: 'Luminal B', count: 1, cancerType: 'Breast' },
  { name: 'HER2+', count: 2, cancerType: 'Breast' },
  { name: 'Triple Negative', count: 2, cancerType: 'Breast' },
  { name: 'Adenocarcinoma', count: 1, cancerType: 'Lung' },
  { name: 'Squamous Cell', count: 1, cancerType: 'Lung' },
  { name: 'Small Cell', count: 1, cancerType: 'Lung' },
  { name: 'EGFR Mutant', count: 1, cancerType: 'Lung' },
  { name: 'MSS', count: 1, cancerType: 'Colorectal' },
  { name: 'MSI-High', count: 1, cancerType: 'Colorectal' },
  { name: 'KRAS Mutant', count: 1, cancerType: 'Colorectal' },
  { name: 'BRAF V600E', count: 1, cancerType: 'Colorectal' },
  { name: 'BRAF V600E Mutant', count: 1, cancerType: 'Melanoma' },
  { name: 'Uveal', count: 1, cancerType: 'Melanoma' },
  { name: 'Acral Lentiginous', count: 1, cancerType: 'Melanoma' },
  { name: 'Ductal Adenocarcinoma', count: 1, cancerType: 'Pancreatic' },
  { name: 'Acinar Cell', count: 1, cancerType: 'Pancreatic' },
];

// Stage distribution
export const stageDistribution = [
  { stage: 'I', count: 2, color: '#00D2C4' },
  { stage: 'II', count: 7, color: '#008DDA' },
  { stage: 'III', count: 7, color: '#F59E0B' },
  { stage: 'IV', count: 4, color: '#EF4444' },
];
