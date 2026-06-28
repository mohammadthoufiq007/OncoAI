import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useData } from '../context/DataContext';
import { Info } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

const stageDescriptions: Record<string, string> = {
  'I': 'Localized, excellent prognosis. Tumor is small and has not spread to lymph nodes.',
  'II': 'Regional involvement, good prognosis. Tumor is larger or has spread to nearby lymph nodes.',
  'III': 'Locally advanced, guarded prognosis. Tumor has spread to multiple lymph nodes or nearby tissues.',
  'IV': 'Metastatic, intensive treatment required. Cancer has spread to distant organs.'
};

const STAGE_COLORS: Record<string, string> = {
  'I': '#00D2C4',
  'II': '#008DDA',
  'III': '#F59E0B',
  'IV': '#EF4444'
};

export const StageView: React.FC = () => {
  const { patients, genes } = useData();
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const dynamicStageDistribution = useMemo(() => {
    if (!patients) return [];
    const counts = patients.reduce((acc, curr) => {
      acc[curr.stage] = (acc[curr.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([stage, count]) => ({
      stage,
      count,
      color: STAGE_COLORS[stage] || '#8884d8'
    }));
  }, [patients]);
  
  const topGenes = useMemo(() => {
    if (!genes) return [];
    return [...genes].sort((a, b) => b.importance - a.importance).slice(0, 8).map(g => ({
      name: g.symbol,
      importance: g.importance * 100
    }));
  }, [genes]);

  const onPieClick = (data: any) => {
    setSelectedStage(data.stage === selectedStage ? null : data.stage);
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Stage Prediction</h2>
        <EmptyState message="No patient data found to compute stage distribution. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Stage Prediction</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg flex flex-col">
          <h3 className="text-sm font-bold text-white mb-2">Cohort Stage Distribution</h3>
          <p className="text-xs text-slate-400 mb-6">Click a slice to view stage details.</p>
          
          <div className="flex-1 h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dynamicStageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  onClick={onPieClick}
                  style={{ cursor: 'pointer' }}
                >
                  {dynamicStageDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={selectedStage === entry.stage ? '#fff' : 'transparent'}
                      strokeWidth={2}
                      opacity={selectedStage && selectedStage !== entry.stage ? 0.4 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${val} Patients`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="min-h-[100px] mt-4">
            <AnimatePresence mode="wait">
              {selectedStage ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0B192C] rounded-lg p-4 border border-[#008DDA]/20 flex items-start gap-3"
                >
                  <Info size={16} className="text-[#00D2C4] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Stage {selectedStage} Details</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {stageDescriptions[selectedStage]}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full text-sm text-slate-500"
                >
                  Select a stage in the chart to see clinical details.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-bold text-white mb-6">Stage Feature Importance</h3>
          
          <div className="h-[350px]">
            {topGenes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topGenes} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={60} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    formatter={(val: any) => [`${Number(val).toFixed(1)}%`, 'Importance']}
                  />
                  <Bar dataKey="importance" radius={[0, 4, 4, 0]} animationDuration={1000}>
                    {topGenes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#colorGradient-${index})`} />
                    ))}
                  </Bar>
                  
                  <defs>
                    {topGenes.map((_, index) => (
                      <linearGradient key={`colorGradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#008DDA" />
                        <stop offset="100%" stopColor="#00D2C4" />
                      </linearGradient>
                    ))}
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                No gene importance data available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageView;
