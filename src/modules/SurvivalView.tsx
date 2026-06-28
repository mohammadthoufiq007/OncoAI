import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import { EmptyState } from '../components/EmptyState';

export const SurvivalView: React.FC = () => {
  const { survivalCohorts, overallStats } = useData();
  const cancerTypes = Object.keys(survivalCohorts || {});
  const [selectedType, setSelectedType] = useState(cancerTypes.length > 0 ? cancerTypes[0] : 'All Cancers');
  const [loading, setLoading] = useState(false);
  
  const cohorts = survivalCohorts ? survivalCohorts[selectedType] : [];
  
  const chartData: any[] = [];
  if (cohorts && cohorts.length > 0) {
    const maxMonths = Math.max(...cohorts.map((c: any) => c.curve[c.curve.length - 1].month));
    
    for (let m = 0; m <= maxMonths; m += 6) {
      const dataPoint: any = { month: m };
      cohorts.forEach((cohort: any) => {
        const pt = cohort.curve.find((p: any) => p.month === m);
        if (pt) dataPoint[cohort.name] = pt.probability;
      });
      chartData.push(dataPoint);
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    setSelectedType(e.target.value);
    setTimeout(() => setLoading(false), 300);
  };

  if (!survivalCohorts || cancerTypes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Survival Analysis</h2>
        </div>
        <EmptyState message="No survival data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Survival Analysis</h2>
        <select
          value={selectedType}
          onChange={handleSelect}
          className="bg-[#1E3E62] border border-[#008DDA]/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#008DDA]"
        >
          {cancerTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-6">Kaplan-Meier Estimates: {selectedType}</h3>
        
        <div className="h-[350px]">
          {loading ? (
             <div className="w-full h-full flex items-center justify-center">
               <div className="w-10 h-10 border-4 border-[#008DDA]/30 border-t-[#00D2C4] rounded-full animate-spin" />
             </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  label={{ value: 'Months Post-Diagnosis', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 11 }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]}
                  label={{ value: 'Survival Probability (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${val}%`, 'Survival']}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#cbd5e1', paddingTop: '20px' }} />
                
                {cohorts.map((cohort: any) => (
                  <Line 
                    key={cohort.name}
                    type="stepAfter"
                    dataKey={cohort.name}
                    stroke={cohort.color}
                    strokeWidth={2}
                    dot={{ r: 3, fill: cohort.color, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#fff', stroke: cohort.color, strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', val: overallStats?.totalPatients || 0 },
          { label: 'Median Follow-Up', val: overallStats?.medianFollowUp || 0 },
          { label: 'Overall Survival', val: overallStats?.overallSurvivalRate || 0 },
          { label: 'Progression Free', val: overallStats?.progressionFreeRate || 0 },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="bg-[#1E3E62] border border-[#008DDA]/15 rounded-xl p-4 shadow-lg text-center"
          >
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-white font-mono">{stat.val}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SurvivalView;
