import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { MagnifyingGlass as Search, User, Pulse as Activity, Calendar, Microscope } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

export const SimilarityView: React.FC = () => {
  const { patients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Memoize search results and similarity scoring
  const searchResults = useMemo(() => {
    if (!patients || patients.length === 0) return [];
    
    if (!searchTerm.trim()) {
      // Default: Top 5 by recurrence risk
      return [...patients]
        .sort((a, b) => b.recurrenceRisk - a.recurrenceRisk)
        .slice(0, 5)
        .map(p => ({ patient: p, similarity: null }));
    }

    const term = searchTerm.toLowerCase();
    
    // Calculate similarity based on seeded rules
    const scored = patients.map(p => {
      let similarity = 0;
      let matched = false;
      
      const idMatch = p.id.toLowerCase().includes(term);
      const nameMatch = p.name.toLowerCase().includes(term);
      const cancerTypeMatch = p.cancerType.toLowerCase().includes(term);
      const subtypeMatch = p.subtype.toLowerCase().includes(term);

      if (idMatch || nameMatch) {
        matched = true;
        similarity = 95 + Math.random() * 4; // 95-99
      } else if (cancerTypeMatch && subtypeMatch) {
        matched = true;
        similarity = 90 + Math.random() * 8; // 90-98
      } else if (cancerTypeMatch) {
        matched = true;
        similarity = 85 + Math.random() * 10; // 85-95
      } else if (subtypeMatch) {
        matched = true;
        similarity = 60 + Math.random() * 20; // 60-80
      }

      return { patient: p, similarity, matched };
    });

    return scored
      .filter(s => s.matched)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

  }, [searchTerm, patients]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'I': return '#00D2C4'; // Seafoam
      case 'II': return '#008DDA'; // Cerulean
      case 'III': return '#F59E0B'; // Amber
      case 'IV': return '#EF4444'; // Red
      default: return '#94A3B8';
    }
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Patient Similarity Engine</h2>
        </div>
        <EmptyState message="No patient data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Patient Similarity Engine</h2>
      </div>

      <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#008DDA]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, Name, Cancer Type, or Subtype..."
            className="block w-full pl-10 pr-3 py-3 bg-[#0B192C] border border-[#008DDA]/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#008DDA]/50 transition-shadow"
          />
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            {searchTerm ? `Top Matches (${searchResults.length})` : 'Default View: Highest Risk Cohort'}
          </div>

          <AnimatePresence>
            {searchResults.map(({ patient, similarity }) => {
              const isExpanded = expandedId === patient.id;
              const stageColor = getStageColor(patient.stage);
              
              return (
                <motion.div
                  key={patient.id}
                  layoutId={`card-${patient.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0B192C] border border-[#008DDA]/20 rounded-xl overflow-hidden cursor-pointer hover:border-[#00D2C4]/50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : patient.id)}
                >
                  <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#1E3E62] flex items-center justify-center shrink-0">
                        <User size={18} className="text-[#00D2C4]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold flex items-center gap-2">
                          {patient.name} 
                          <span className="text-[10px] text-slate-500 font-mono font-normal bg-[#1E3E62] px-2 py-0.5 rounded">
                            {patient.id}
                          </span>
                        </h4>
                        <div className="text-xs text-slate-400 mt-1">
                          {patient.age}yo {patient.sex} • {patient.cancerType} ({patient.subtype})
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Stage</div>
                        <div className="font-bold font-mono" style={{ color: stageColor }}>{patient.stage}</div>
                      </div>
                      
                      {similarity !== null && (
                        <div className="w-24 text-right">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex justify-end gap-1 items-center">
                            <Activity size={10} /> Match Score
                          </div>
                          <div className="w-full bg-[#1E3E62] h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${similarity}%` }}
                              className="h-full bg-gradient-to-r from-[#008DDA] to-[#00D2C4]"
                            />
                          </div>
                          <div className="text-[10px] text-[#00D2C4] font-mono mt-0.5">{similarity.toFixed(1)}%</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[#008DDA]/10 bg-[#0F2340]/50"
                      >
                        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase"><Microscope size={12}/> Tumor Size</div>
                            <div className="text-sm text-white font-mono">{patient.tumorSize} mm</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase"><Activity size={12}/> Proliferation</div>
                            <div className="text-sm text-white font-mono">Ki-67: {patient.ki67}%</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase"><Calendar size={12}/> Survival</div>
                            <div className="text-sm text-white font-mono">{patient.survivalMonths} mos ({patient.isAlive ? 'Alive' : 'Deceased'})</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase"><Target size={12}/> Recurrence Risk</div>
                            <div className={`text-sm font-bold font-mono ${patient.recurrenceRisk > 50 ? 'text-[#EF4444]' : 'text-[#00D2C4]'}`}>
                              {patient.recurrenceRisk}%
                            </div>
                          </div>
                        </div>
                        <div className="px-4 pb-4">
                          <div className="text-[10px] text-slate-500 uppercase mb-1">Treatment Line</div>
                          <div className="text-xs text-slate-300 bg-[#1E3E62]/50 p-2 rounded border border-[#008DDA]/10">
                            {patient.treatmentLine}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            
            {searchResults.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-500"
              >
                <Search size={32} className="mx-auto mb-4 opacity-20" />
                <p>No patients match the current search criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Simple Mock Icon for Target (lucide-react Target is missing in import above but we need it)
const Target = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

export default SimilarityView;
