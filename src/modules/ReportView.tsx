import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useData } from '../context/DataContext';
import { FileText, DownloadSimple as Download, CheckCircle, Pulse as Activity, Stethoscope } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

const availableModules = [
  { id: 'm1', name: 'Detection & Diagnostics' },
  { id: 'm2', name: 'Molecular Classification' },
  { id: 'm3', name: 'Stage Prediction' },
  { id: 'm4', name: 'Tumor Progression' },
  { id: 'm5', name: 'Survival Analysis' },
  { id: 'm6', name: 'Recurrence Risk' },
  { id: 'm7', name: 'Biomarker Discovery' },
  { id: 'm8', name: 'Explainable AI (SHAP)' },
  { id: 'm9', name: 'Genetic Risk Assessment' },
  { id: 'm10', name: 'Patient Similarity' },
];

export const ReportView: React.FC = () => {
  const { patients } = useData();
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedModules, setSelectedModules] = useState<string[]>(['m1', 'm3', 'm5']);
  const [isExporting, setIsExporting] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (patients && patients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patients[0].id);
    }
  }, [patients, selectedPatientId]);

  if (!patients || patients.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Clinical Report Generator</h2>
        </div>
        <EmptyState message="No patient data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleToggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#0B192C',
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`OncoAI_Report_${selectedPatient.id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("Failed to generate PDF. Check console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  // Generate deterministic mock findings based on patient data
  const getFindingForModule = (modId: string) => {
    const p = selectedPatient;
    switch(modId) {
      case 'm1': return { finding: `Malignant neoplasm detected with high confidence based on size (${p.tumorSize}mm) and Ki-67 (${p.ki67}%).`, metric: '94% Confidence' };
      case 'm2': return { finding: `Confirmed ${p.cancerType}, ${p.subtype} subtype. Correlates with reference cohort metrics.`, metric: 'Subtype Confirmed' };
      case 'm3': return { finding: `Clinical Stage ${p.stage} predicted. Regional involvement noted.`, metric: `Stage ${p.stage}` };
      case 'm4': return { finding: `Aggressiveness score elevated due to high mitotic index (${p.mitoticIndex}).`, metric: 'High Risk' };
      case 'm5': return { finding: `Median survival projected at ${p.survivalMonths} months based on Kaplan-Meier cohort matching.`, metric: `${p.survivalMonths} mo Est.` };
      case 'm6': return { finding: `Probability of recurrence post-treatment is estimated at ${p.recurrenceRisk}%.`, metric: `${p.recurrenceRisk}% Risk` };
      case 'm7': return { finding: `Key driver mutations identified in standard somatic panel. Drug targets present.`, metric: 'Actionable' };
      case 'm8': return { finding: `SHAP analysis indicates tumor size and Ki-67 as primary positive predictors of malignancy.`, metric: 'Size dominant' };
      case 'm9': return { finding: `No pathogenic germline variants detected in BRCA1/2 or TP53.`, metric: 'Negative' };
      case 'm10': return { finding: `Patient profile aligns tightly with historical cohort cluster A (94% match).`, metric: '94% Match' };
      default: return { finding: 'Analysis complete. Normal limits observed.', metric: 'Normal' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Clinical Report Generator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Stethoscope size={16} className="text-[#00D2C4]" /> Patient Selection
            </h3>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.id}) - {p.cancerType}</option>
              ))}
            </select>
          </div>

          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText size={16} className="text-[#008DDA]" /> Sections to Include
              </h3>
              <span className="text-xs text-slate-400">{selectedModules.length} selected</span>
            </div>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {availableModules.map(mod => (
                <label key={mod.id} className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(mod.id)}
                      onChange={() => handleToggleModule(mod.id)}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 border border-[#008DDA]/50 rounded bg-[#0B192C] peer-checked:bg-[#008DDA] peer-checked:border-[#008DDA] transition-colors" />
                    <CheckCircle size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  <span className={`text-sm transition-colors ${selectedModules.includes(mod.id) ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    {mod.name}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={handleExportPDF}
              disabled={selectedModules.length === 0 || isExporting}
              className="w-full mt-6 bg-gradient-to-r from-[#008DDA] to-[#00D2C4] hover:opacity-90 disabled:opacity-50 text-white font-bold px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating PDF...</>
              ) : (
                <><Download size={16} /> Export as PDF</>
              )}
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8">
          <div className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-2 shadow-lg overflow-hidden">
            <div className="bg-[#0B192C]/50 px-4 py-2 border-b border-[#008DDA]/10 flex justify-between items-center text-xs text-slate-400">
              <span>Report Preview</span>
              <span>A4 / Portrait</span>
            </div>
            
            {/* The actual div to be captured by html2canvas */}
            <div className="p-4 md:p-8 bg-[#0B192C] overflow-x-auto">
              <div 
                ref={reportRef} 
                className="w-full max-w-[800px] mx-auto bg-[#0B192C] text-white"
                style={{ minHeight: '842px', padding: '40px' }} // Approx A4 ratio
              >
                {/* PDF Header */}
                <div className="border-b-2 border-[#008DDA] pb-6 mb-8 flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">CIP Clinical Report</h1>
                    <div className="text-sm text-[#00D2C4] font-mono">Cancer Intelligence Platform v1.0</div>
                  </div>
                  <div className="text-right text-xs text-slate-400 font-mono">
                    Date: {new Date().toLocaleDateString()}<br/>
                    ID: REP-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </div>
                </div>

                {/* Patient Demographics */}
                <div className="bg-[#1E3E62] rounded-lg p-5 mb-8 border border-[#008DDA]/30">
                  <h3 className="text-xs font-bold text-[#008DDA] uppercase tracking-wider mb-4 border-b border-[#008DDA]/20 pb-2">Patient Demographics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">Name</span>
                      <span className="font-bold">{selectedPatient.name}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">Patient ID</span>
                      <span className="font-mono">{selectedPatient.id}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">Age / Sex</span>
                      <span>{selectedPatient.age}y {selectedPatient.sex}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">Primary Diagnosis</span>
                      <span>{selectedPatient.cancerType}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Modules Findings */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-[#008DDA] uppercase tracking-wider mb-2 border-b border-[#008DDA]/20 pb-2">Computational Findings</h3>
                  
                  {selectedModules.length === 0 ? (
                    <div className="text-slate-500 text-sm italic">No modules selected for inclusion.</div>
                  ) : (
                    availableModules.filter(m => selectedModules.includes(m.id)).map(mod => {
                      const analysis = getFindingForModule(mod.id);
                      return (
                        <div key={mod.id} className="flex gap-4 items-start">
                          <div className="mt-1 bg-[#1E3E62] p-2 rounded text-[#00D2C4]">
                            <Activity size={16} />
                          </div>
                          <div className="flex-1 border-b border-slate-800 pb-4">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-bold text-sm text-slate-200">{mod.name}</h4>
                              <span className="text-[10px] bg-[#008DDA]/20 text-[#008DDA] px-2 py-0.5 rounded font-mono font-bold">
                                {analysis.metric}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {analysis.finding}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
