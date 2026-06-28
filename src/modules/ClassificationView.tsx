import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import { useData } from '../context/DataContext';
import { CaretDown as ChevronDown, CaretUp as ChevronUp } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

const cancerTypes = ['Breast', 'Lung', 'Colorectal', 'Melanoma', 'Pancreatic'];

export const ClassificationView: React.FC = () => {
  const { patients, confusionMatrix, modelMetrics } = useData();
  const [selectedCancer, setSelectedCancer] = useState(cancerTypes[0]);
  const [showConfusion, setShowConfusion] = useState(false);
  const [loading, setLoading] = useState(false);

  // Compute subtype distribution dynamically from patients
  const dynamicSubtypeDistribution = useMemo(() => {
    const filtered = patients.filter(p => p.cancerType === selectedCancer);
    const counts = filtered.reduce((acc, curr) => {
      acc[curr.subtype] = (acc[curr.subtype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, count]) => ({
      name, count, cancerType: selectedCancer
    }));
  }, [patients, selectedCancer]);

  const [displayData, setDisplayData] = useState(dynamicSubtypeDistribution);

  useEffect(() => {
    if (!loading) {
      setDisplayData(dynamicSubtypeDistribution);
    }
  }, [dynamicSubtypeDistribution, loading]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedCancer(type);
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const getMetricValue = (val: number) => `${(val * 100).toFixed(1)}%`;

  if (!patients || patients.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Subtype Classification</h2>
        <EmptyState message="No patient data found to compute classifications. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Subtype Classification</h2>
        
        <select
          value={selectedCancer}
          onChange={handleSelect}
          className="bg-[#1E3E62] border border-[#008DDA]/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#008DDA]"
        >
          {cancerTypes.map(type => (
            <option key={type} value={type}>{type} Cancer</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div data-testid="module-card" className="lg:col-span-2 bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-bold text-white mb-6">Subtype Distribution: {selectedCancer}</h3>
          
          <div className="h-[300px]">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#008DDA]/30 border-t-[#00D2C4] rounded-full animate-spin" />
                <p className="text-[#00D2C4] text-xs font-mono animate-pulse">QUERYING MODEL...</p>
              </div>
            ) : displayData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} angle={-45} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    cursor={{ fill: 'rgba(0,141,218,0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1000}>
                    {displayData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#008DDA' : '#00D2C4'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-slate-400 text-sm">No data available for {selectedCancer}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4">Model Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Accuracy', val: modelMetrics?.accuracy || 0 },
                { label: 'AUROC', val: modelMetrics?.auroc || 0 },
                { label: 'Sensitivity', val: modelMetrics?.sensitivity || 0 },
                { label: 'Specificity', val: modelMetrics?.specificity || 0 },
              ].map((metric) => (
                <motion.div
                  key={metric.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#0B192C] rounded-lg p-3 border border-[#008DDA]/10"
                >
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{metric.label}</div>
                  <div className="text-lg font-bold text-[#00D2C4] font-mono">{getMetricValue(metric.val)}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <button
              onClick={() => setShowConfusion(!showConfusion)}
              className="w-full flex items-center justify-between text-sm font-bold text-white"
            >
              <span>Confusion Matrix</span>
              {showConfusion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {showConfusion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                      <div className="text-slate-400 mb-1">True Positive</div>
                      <div className="text-xl font-bold text-green-400">{confusionMatrix?.truePositive || 0}</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                      <div className="text-slate-400 mb-1">False Positive</div>
                      <div className="text-xl font-bold text-red-400">{confusionMatrix?.falsePositive || 0}</div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-2">
                      <div className="text-slate-400 mb-1">False Negative</div>
                      <div className="text-xl font-bold text-amber-400">{confusionMatrix?.falseNegative || 0}</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                      <div className="text-slate-400 mb-1">True Negative</div>
                      <div className="text-xl font-bold text-green-400">{confusionMatrix?.trueNegative || 0}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationView;
