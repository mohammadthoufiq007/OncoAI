import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { useData } from '../context/DataContext';
import type { Gene } from '../data/genes'; // keeping type import
import { Pill, Pulse as Activity, Dna, Target } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

export const BiomarkerView: React.FC = () => {
  const { genes, expressionHeatmap } = useData();
  const [expandedGene, setExpandedGene] = useState<Gene | null>(null);
  const [drugTargetsOnly, setDrugTargetsOnly] = useState(false);

  // Filter and sort genes
  const displayGenes = genes
    ? genes
        .filter(g => drugTargetsOnly ? g.drugTarget : true)
        .sort((a, b) => b.importance - a.importance)
    : [];

  const handleBarClick = (data: any) => {
    const gene = genes?.find(g => g.symbol === data.symbol);
    if (gene) {
      setExpandedGene(gene.symbol === expandedGene?.symbol ? null : gene);
    }
  };

  const getColorForHeatmap = (val: number) => {
    // 0 = #0B192C (dark), 10 = #00D2C4 (bright)
    const normalized = Math.max(0, Math.min(1, val / 10));
    // interpolate between #0F2340 and #00D2C4
    return `rgba(0, 210, 196, ${normalized})`;
  };

  if (!genes || genes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Biomarker Discovery</h2>
        </div>
        <EmptyState message="No gene biomarker data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Biomarker Discovery</h2>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={drugTargetsOnly}
            onChange={(e) => {
              setDrugTargetsOnly(e.target.checked);
              setExpandedGene(null);
            }}
            className="w-4 h-4 rounded border-[#008DDA] text-[#00D2C4] focus:ring-[#008DDA] bg-[#0B192C]"
          />
          <span className="text-sm font-medium text-slate-300">Drug Targets Only</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div data-testid="module-card" className="lg:col-span-2 bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg flex flex-col">
          <h3 className="text-sm font-bold text-white mb-2">Driver Gene Importance Ranking</h3>
          <p className="text-xs text-slate-400 mb-6">Click a bar to view detailed gene annotations.</p>
          
          <div className="flex-1 min-h-[400px]">
            {displayGenes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={displayGenes} 
                  layout="vertical" 
                  margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                  onClick={(data: any) => {
                    if (data && data.activePayload && data.activePayload.length > 0) {
                      handleBarClick(data.activePayload[0].payload);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 1]} />
                  <YAxis type="category" dataKey="symbol" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} width={60} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    cursor={{ fill: 'rgba(0,141,218,0.1)' }}
                    formatter={(val: any) => [Number(val).toFixed(3), 'Importance']}
                  />
                  <Bar dataKey="importance" radius={[0, 4, 4, 0]} animationDuration={1000} style={{ cursor: 'pointer' }}>
                    {displayGenes.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill="url(#colorBiomarker)" 
                        opacity={expandedGene ? (expandedGene.symbol === entry.symbol ? 1 : 0.3) : 1}
                      />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorBiomarker" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#008DDA" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#00D2C4" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                No genes match the filter criteria.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg min-h-[200px]">
            <h3 className="text-sm font-bold text-white mb-4">Gene Annotation</h3>
            <AnimatePresence mode="wait">
              {expandedGene ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-xl font-bold text-[#00D2C4] font-mono">{expandedGene.symbol}</h4>
                      {expandedGene.drugTarget && (
                        <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                          <Pill size={10} /> Druggable
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{expandedGene.fullName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#0B192C] p-2 rounded border border-[#008DDA]/10">
                      <span className="text-slate-500 block mb-0.5 flex items-center gap-1"><Dna size={12} /> Locus</span>
                      <span className="text-slate-200">{expandedGene.chromosome}</span>
                    </div>
                    <div className="bg-[#0B192C] p-2 rounded border border-[#008DDA]/10">
                      <span className="text-slate-500 block mb-0.5 flex items-center gap-1"><Target size={12} /> Pathway</span>
                      <span className="text-slate-200 truncate" title={expandedGene.pathway}>{expandedGene.pathway}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Associated Malignancies</span>
                    <div className="flex flex-wrap gap-1">
                      {expandedGene.associatedCancers.map(c => (
                        <span key={c} className="bg-[#008DDA]/10 text-[#008DDA] px-2 py-0.5 rounded text-[10px] font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[150px] text-center text-slate-500 space-y-2"
                >
                  <Activity size={24} className="opacity-20" />
                  <p className="text-sm">Select a biomarker from the chart<br/>to view annotations.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg overflow-x-auto">
            <h3 className="text-sm font-bold text-white mb-4">Expression Heatmap (Top 10)</h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr>
                  <th className="pb-2 text-slate-400 font-medium">Gene</th>
                  <th className="pb-2 text-slate-400 font-medium">BRCA</th>
                  <th className="pb-2 text-slate-400 font-medium">LUAD</th>
                  <th className="pb-2 text-slate-400 font-medium">COAD</th>
                  <th className="pb-2 text-slate-400 font-medium">SKCM</th>
                  <th className="pb-2 text-slate-400 font-medium">PAAD</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {expressionHeatmap && expressionHeatmap.map((row) => (
                  <tr key={row.gene} className="border-t border-[#008DDA]/10">
                    <td className="py-1.5 text-slate-200 font-sans font-medium">{row.gene}</td>
                    <td className="py-1.5"><div className="w-full h-4 rounded" style={{ backgroundColor: getColorForHeatmap(row.Breast) }} title={row.Breast?.toString()} /></td>
                    <td className="py-1.5"><div className="w-full h-4 rounded" style={{ backgroundColor: getColorForHeatmap(row.Lung) }} title={row.Lung?.toString()} /></td>
                    <td className="py-1.5"><div className="w-full h-4 rounded" style={{ backgroundColor: getColorForHeatmap(row.Colorectal) }} title={row.Colorectal?.toString()} /></td>
                    <td className="py-1.5"><div className="w-full h-4 rounded" style={{ backgroundColor: getColorForHeatmap(row.Melanoma) }} title={row.Melanoma?.toString()} /></td>
                    <td className="py-1.5"><div className="w-full h-4 rounded" style={{ backgroundColor: getColorForHeatmap(row.Pancreatic) }} title={row.Pancreatic?.toString()} /></td>
                  </tr>
                ))}
                {(!expressionHeatmap || expressionHeatmap.length === 0) && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-slate-500">No heatmap data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomarkerView;
