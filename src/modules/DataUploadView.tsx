import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CloudArrowUp, Trash, CheckCircle, Warning, FileText, Database } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

export default function DataUploadView() {
  const {
    patients, setPatients,
    genes, setGenes,
    variants, setVariants,
    survivalCohorts, setSurvivalCohorts,
    shapWaterfallData, setShapWaterfallData,
    shapSummaryData, setShapSummaryData,
    clearAllData
  } = useData();

  const [error, setError] = useState<string | null>(null);

  const processCsvData = (type: string, data: any[]) => {
    switch (type) {
      case 'patients':
        setPatients(data);
        break;
      case 'genes':
        const parsedGenes = data.map(g => ({
          ...g,
          associatedCancers: typeof g.associatedCancers === 'string' 
            ? g.associatedCancers.split(',').map((s: string) => s.trim()) 
            : g.associatedCancers,
          drugTarget: String(g.drugTarget).toLowerCase() === 'true'
        }));
        setGenes(parsedGenes);
        break;
      case 'variants':
        const parsedVariants = data.map(v => ({
          ...v,
          associatedCancers: typeof v.associatedCancers === 'string'
            ? v.associatedCancers.split(',').map((s: string) => s.trim())
            : v.associatedCancers
        }));
        setVariants(parsedVariants);
        break;
      case 'survival':
        const cohortMap: Record<string, Record<string, any>> = {};
        data.forEach(row => {
          if (!cohortMap[row.cancerType]) {
            cohortMap[row.cancerType] = {};
          }
          if (!cohortMap[row.cancerType][row.name]) {
            cohortMap[row.cancerType][row.name] = {
              name: row.name,
              color: row.color,
              medianSurvival: row.medianSurvival,
              curve: []
            };
          }
          if (row.month !== undefined && row.probability !== undefined) {
            cohortMap[row.cancerType][row.name].curve.push({ month: row.month, probability: row.probability });
          }
        });
        
        const finalSurvival: Record<string, any[]> = {};
        for (const [cancerType, cohorts] of Object.entries(cohortMap)) {
          finalSurvival[cancerType] = Object.values(cohorts).map(c => ({
            ...c,
            curve: c.curve.sort((a: any, b: any) => a.month - b.month)
          }));
        }
        setSurvivalCohorts(finalSurvival);
        break;
      case 'shap_waterfall':
        setShapWaterfallData(data);
        break;
      case 'shap_summary':
        setShapSummaryData(data);
        break;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isCsv = file.name.toLowerCase().endsWith('.csv');

    if (isCsv) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError(`Failed to parse CSV for ${type}. Check format.`);
            return;
          }
          try {
            processCsvData(type, results.data);
            setError(null);
          } catch (err) {
            setError(`Failed to process CSV for ${type}.`);
          }
        },
        error: (err) => {
          setError(`Failed to parse CSV for ${type}: ${err.message}`);
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          switch (type) {
            case 'patients': setPatients(json); break;
            case 'genes': setGenes(json); break;
            case 'variants': setVariants(json); break;
            case 'survival': setSurvivalCohorts(json); break;
            case 'shap_waterfall': setShapWaterfallData(json); break;
            case 'shap_summary': setShapSummaryData(json); break;
          }
          setError(null);
        } catch (err) {
          setError(`Failed to parse JSON for ${type}. Please ensure it's a valid JSON array or object.`);
        }
      };
      reader.readAsText(file);
    }
    
    e.target.value = '';
  };

  const loadDemoData = async () => {
    try {
      const p = await import('../data/patients');
      const g = await import('../data/genes');
      const v = await import('../data/variants');
      const s = await import('../data/survival');
      const sh = await import('../data/shap');
      
      setPatients(p.patients);
      setGenes(g.genes);
      setVariants(v.variants);
      setSurvivalCohorts(s.survivalCohorts);
      setShapWaterfallData(sh.shapWaterfallData);
      setShapSummaryData(sh.shapSummaryData);
    } catch (e) {
      setError("Failed to load demo data.");
    }
  };

  const uploadSections = [
    { id: 'patients', title: 'Patient Registry', count: patients.length, desc: 'Patient profiles (JSON/CSV)' },
    { id: 'genes', title: 'Gene Expression', count: genes.length, desc: 'Expression data (JSON/CSV)' },
    { id: 'variants', title: 'Genetic Variants', count: variants.length, desc: 'Variant data (JSON/CSV)' },
    { id: 'survival', title: 'Survival Cohorts', count: Object.keys(survivalCohorts).length, desc: 'Survival data (JSON/CSV)' },
    { id: 'shap_waterfall', title: 'SHAP Waterfall', count: shapWaterfallData.length, desc: 'SHAP local explainability' },
    { id: 'shap_summary', title: 'SHAP Summary', count: shapSummaryData.length, desc: 'SHAP global explainability' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 max-w-[1400px] mx-auto min-h-[100dvh]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4">
            <Database size={12} weight="fill" /> Data Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            System Infrastructure
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadDemoData}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            Load Defaults
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-px transition-transform">
              <CloudArrowUp size={12} weight="bold" />
            </div>
          </button>
          <button
            onClick={clearAllData}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-semibold text-red-400 hover:bg-red-500/20 active:scale-[0.98] transition-all"
          >
            Purge Cache
            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <Trash size={12} weight="bold" />
            </div>
          </button>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-300 text-sm font-medium backdrop-blur-md"
        >
          <Warning size={20} weight="fill" className="text-red-400" />
          <p>{error}</p>
        </motion.div>
      )}

      {/* Cockpit Density Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadSections.map((section, i) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 p-1 rounded-[1.5rem] border border-white/5 group"
          >
            <div className="bg-[#0a0a0a] rounded-[1.25rem] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 relative h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-base font-bold text-white tracking-tight">{section.title}</h3>
                {section.count > 0 ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    <CheckCircle size={12} weight="fill" /> Active
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 text-slate-500 rounded-full border border-white/10">
                    Empty
                  </span>
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-center py-4">
                <p className="text-3xl font-mono font-light tracking-tight text-white mb-1">
                  {section.count}
                </p>
                <p className="text-xs text-slate-500">{section.desc}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 relative">
                <input
                  type="file"
                  aria-label={`Upload ${section.title} data`}
                  accept=".json,.csv"
                  onChange={(e) => handleFileUpload(e, section.id)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                  <span>Import via CSV/JSON</span>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <CloudArrowUp size={14} weight="bold" className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white/5 p-1 rounded-[2rem] border border-white/5">
         <div className="bg-[#0a0a0a] rounded-[1.75rem] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <FileText size={16} weight="duotone" className="text-emerald-400" />
              CSV Dataset Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h4 className="text-emerald-400 font-semibold mb-2 text-sm">Patients (patients.csv)</h4>
                <ul className="text-xs text-slate-400 space-y-1.5 font-mono">
                  <li>id: string</li>
                  <li>name: string</li>
                  <li>age: number</li>
                  <li>sex: "Male" | "Female"</li>
                  <li>cancerType: string</li>
                  <li>subtype: string</li>
                  <li>stage: "I" | "II" | "III" | "IV"</li>
                  <li>tumorSize: number</li>
                  <li>survivalMonths: number</li>
                  <li>isAlive: boolean (true/false)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold mb-2 text-sm">Survival (survival.csv)</h4>
                <ul className="text-xs text-slate-400 space-y-1.5 font-mono">
                  <li>cancerType: string</li>
                  <li>name: string (cohort name)</li>
                  <li>color: string (hex)</li>
                  <li>medianSurvival: number</li>
                  <li>month: number (0 to 120)</li>
                  <li>probability: number (0 to 1)</li>
                </ul>
              </div>
            </div>
         </div>
      </div>

    </motion.div>
  );
}
