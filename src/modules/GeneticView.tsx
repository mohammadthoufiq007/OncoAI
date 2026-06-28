import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { useData } from '../context/DataContext';
import { CaretDown as ChevronDown, CaretUp as ChevronUp, Warning as AlertTriangle } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

export const GeneticView: React.FC = () => {
  const { variants, riskLevels } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterClass, setFilterClass] = useState<string>('All');

  const classifications = ['All', 'Pathogenic', 'Likely Pathogenic', 'VUS', 'Likely Benign', 'Benign'];

  const filteredVariants = variants ? variants.filter(v => filterClass === 'All' || v.classification === filterClass) : [];

  const getClassColor = (classification: string) => {
    switch (classification) {
      case 'Pathogenic': return '#EF4444';
      case 'Likely Pathogenic': return '#F59E0B';
      case 'VUS': return '#EAB308';
      case 'Likely Benign': return '#3B82F6';
      case 'Benign': return '#10B981';
      default: return '#94A3B8';
    }
  };

  const getRiskColor = (mult: number) => {
    if (!riskLevels) return '#00D2C4';
    if (mult < 2) return riskLevels.low?.color || '#00D2C4';
    if (mult < 5) return riskLevels.moderate?.color || '#F59E0B';
    return riskLevels.high?.color || '#EF4444';
  };

  // Pie chart data for risk summary
  const summaryData = variants ? classifications.slice(1).map(cls => ({
    name: cls,
    value: variants.filter(v => v.classification === cls).length,
    color: getClassColor(cls)
  })).filter(d => d.value > 0) : [];

  if (!variants || variants.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Genetic Risk Assessment</h2>
        </div>
        <EmptyState message="No genetic variant data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Genetic Risk Assessment</h2>
        
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="bg-[#1E3E62] border border-[#008DDA]/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#008DDA]"
        >
          {classifications.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4">Detected Germline Variants</h3>
            
            <div className="space-y-3">
              <AnimatePresence>
                {filteredVariants.map(variant => {
                  const isExpanded = expandedId === variant.id;
                  const cColor = getClassColor(variant.classification);
                  const rColor = getRiskColor(variant.riskMultiplier);
                  
                  return (
                    <motion.div
                      key={variant.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="bg-[#0B192C] border border-[#008DDA]/15 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="px-4 py-3 cursor-pointer hover:bg-[#0F2340] transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : variant.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 grid grid-cols-12 gap-4 items-center text-sm">
                            <div className="col-span-3">
                              <span className="font-bold text-[#00D2C4] font-mono">{variant.gene}</span>
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5">{variant.id}</div>
                            </div>
                            <div className="col-span-4 font-mono text-xs text-slate-300">
                              {variant.variant}
                            </div>
                            <div className="col-span-3">
                              <span 
                                className="px-2 py-0.5 rounded text-[10px] font-bold border"
                                style={{ backgroundColor: `${cColor}15`, color: cColor, borderColor: `${cColor}30` }}
                              >
                                {variant.classification}
                              </span>
                            </div>
                            <div className="col-span-2 text-right">
                              <span 
                                className="text-xs font-bold"
                                style={{ color: rColor }}
                              >
                                {variant.riskMultiplier.toFixed(1)}x Risk
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 pt-2 border-t border-[#008DDA]/10"
                          >
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                              {variant.clinicalSignificance}
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Zygosity</div>
                                <div className="text-xs text-white font-medium">{variant.zygosity}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Population Freq</div>
                                <div className="text-xs text-white font-medium">{variant.populationFrequency}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Associated Cancers</div>
                                <div className="text-xs text-[#00D2C4] font-medium">{variant.associatedCancers.join(', ')}</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
                {filteredVariants.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No variants match the selected classification.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-2">Variant Classification</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {summaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    formatter={(val: any) => [`${val} Variants`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {summaryData.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                  <span className="text-slate-300">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#F59E0B]" />
              Risk Multiplier Assessment
            </h3>
            
            <div className="space-y-3">
              {filteredVariants.slice(0, 5).map(v => {
                const pct = Math.min(100, (v.riskMultiplier / 10) * 100);
                const rColor = getRiskColor(v.riskMultiplier);
                
                return (
                  <div key={`risk-${v.id}`}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-mono">{v.gene}</span>
                      <span style={{ color: rColor }} className="font-bold">{v.riskMultiplier.toFixed(1)}x</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0B192C] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: rColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneticView;
