import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine
} from 'recharts';
import { useData } from '../context/DataContext';
import { EmptyState } from '../components/EmptyState';

export const ShapView: React.FC = () => {
  const { shapWaterfallData, shapSummaryData, modelMetrics } = useData();
  const [activeTab, setActiveTab] = useState<'waterfall' | 'summary'>('waterfall');

  const getMetricValue = (val: number) => `${(val * 100).toFixed(1)}%`;

  if (!shapWaterfallData || shapWaterfallData.length === 0 || !shapSummaryData || shapSummaryData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Explainable AI</h2>
        </div>
        <EmptyState message="No SHAP data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Explainable AI</h2>
      </div>

      <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white">SHAP Force Plots</h3>
          <div className="flex bg-[#0B192C] rounded-lg p-1 border border-[#008DDA]/20">
            <button
              onClick={() => setActiveTab('waterfall')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === 'waterfall' ? 'bg-[#008DDA]/30 text-[#00D2C4]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Waterfall Plot (Local)
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === 'summary' ? 'bg-[#008DDA]/30 text-[#00D2C4]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Summary Plot (Global)
            </button>
          </div>
        </div>

        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeTab === 'waterfall' && (
              <motion.div
                key="waterfall"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-[450px] flex flex-col"
              >
                <div className="flex justify-between text-xs text-slate-400 mb-2 px-2">
                  <span>← Pushes toward Benign</span>
                  <span>Pushes toward Malignant →</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shapWaterfallData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" horizontal={true} vertical={true} />
                    <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[-0.3, 0.5]} />
                    <YAxis type="category" dataKey="feature" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} width={100} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                      cursor={{ fill: 'rgba(0,141,218,0.1)' }}
                      formatter={(val: any, _name: any, props: any) => [
                        `${val > 0 ? '+' : ''}${Number(val).toFixed(3)} (Val: ${props.payload.featureValue})`,
                        'SHAP Value'
                      ]}
                    />
                    <ReferenceLine x={0} stroke="#cbd5e1" strokeDasharray="3 3" />
                    <Bar dataKey="shapValue" radius={[0, 4, 4, 0]} animationDuration={1000}>
                      {shapWaterfallData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.shapValue > 0 ? '#EF4444' : '#3B82F6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {activeTab === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-[450px] flex flex-col"
              >
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-2 px-2">
                  <span>Directionality:</span>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Positive</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> Negative</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Mixed</div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shapSummaryData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 0.4]} />
                    <YAxis type="category" dataKey="feature" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} width={110} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                      cursor={{ fill: 'rgba(0,141,218,0.1)' }}
                      formatter={(val: any, _name: any, props: any) => [
                        `Mean |SHAP|: ${Number(val).toFixed(3)} (${props.payload.percentPositive}% pos)`,
                        'Impact'
                      ]}
                    />
                    <Bar dataKey="meanAbsShap" radius={[0, 4, 4, 0]} animationDuration={1000}>
                      {shapSummaryData.map((entry, index) => {
                        const pct = entry.percentPositive;
                        const color = pct > 80 ? '#EF4444' : pct < 20 ? '#3B82F6' : '#F59E0B';
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Accuracy', val: modelMetrics?.accuracy || 0 },
          { label: 'AUROC', val: modelMetrics?.auroc || 0 },
          { label: 'Sensitivity', val: modelMetrics?.sensitivity || 0 },
          { label: 'Specificity', val: modelMetrics?.specificity || 0 },
          { label: 'F1 Score', val: modelMetrics?.f1 || 0 },
        ].map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{ y: -4 }}
            className="bg-[#1E3E62] border border-[#008DDA]/15 rounded-xl p-4 shadow-lg text-center"
          >
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{metric.label}</div>
            <div className="text-xl font-bold text-[#00D2C4] font-mono">{getMetricValue(metric.val)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShapView;
