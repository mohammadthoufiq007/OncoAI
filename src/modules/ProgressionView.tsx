import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

export const ProgressionView: React.FC = () => {
  const [tumorSize, setTumorSize] = useState('');
  const [ki67, setKi67] = useState('');
  const [mitoticIndex, setMitoticIndex] = useState('');
  const [gradeScore, setGradeScore] = useState('1');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  
  const handleAnalyze = () => {
    if (!tumorSize || !ki67 || !mitoticIndex) return;
    
    setLoading(true);
    setTimeout(() => {
      const ts = parseFloat(tumorSize) || 0;
      const k = parseFloat(ki67) || 0;
      const mi = parseFloat(mitoticIndex) || 0;
      const gs = parseInt(gradeScore, 10) || 1;
      
      const raw = (ts / 80 * 3) + (k / 100 * 3) + (mi / 20 * 2) + (gs - 1);
      setScore(Math.min(10, Math.max(0, raw)));
      setLoading(false);
    }, 400);
  };

  const getRiskLevel = (s: number) => {
    if (s <= 3) return { label: 'Low Risk', color: '#00D2C4' };
    if (s <= 6) return { label: 'Moderate Risk', color: '#F59E0B' };
    if (s <= 8.5) return { label: 'High Risk', color: '#EF4444' };
    return { label: 'Critical Risk', color: '#991B1B' };
  };

  const gaugeRotation = score !== null ? (score / 10) * 180 : 0;
  const currentRisk = score !== null ? getRiskLevel(score) : null;

  const featureData = score !== null ? [
    { name: 'Size', val: (parseFloat(tumorSize) / 80 * 3) },
    { name: 'Ki-67', val: (parseFloat(ki67) / 100 * 3) },
    { name: 'Mitotic', val: (parseFloat(mitoticIndex) / 20 * 2) },
    { name: 'Grade', val: (parseInt(gradeScore) - 1) },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Tumor Progression</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-bold text-white mb-4">Progression Indicators</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Tumor Size (mm)
                </label>
                <input
                  type="number"
                  value={tumorSize}
                  onChange={(e) => setTumorSize(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Ki-67 (%)
                </label>
                <input
                  type="number"
                  value={ki67}
                  onChange={(e) => setKi67(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Mitotic Index
                </label>
                <input
                  type="number"
                  value={mitoticIndex}
                  onChange={(e) => setMitoticIndex(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Grade Score (1-3)
                </label>
                <select
                  value={gradeScore}
                  onChange={(e) => setGradeScore(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                >
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleAnalyze}
                disabled={!tumorSize || !ki67 || !mitoticIndex || loading}
                className="w-full bg-gradient-to-r from-[#008DDA] to-[#00D2C4] hover:opacity-90 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-sm transition-opacity"
              >
                Calculate Aggressiveness
              </button>
            </div>
          </div>
        </div>

        <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <h3 className="text-sm font-bold text-white mb-2 self-start">Aggressiveness Score (0-10)</h3>
          
          {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4 w-full">
               <div className="w-10 h-10 border-4 border-[#008DDA]/30 border-t-[#00D2C4] rounded-full animate-spin" />
             </div>
          ) : score !== null && currentRisk ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 w-full flex flex-col items-center justify-center pt-8"
            >
              {/* Custom SVG Gauge */}
              <div className="relative w-48 h-24 overflow-hidden mb-6">
                <svg viewBox="0 0 200 100" className="w-full h-full transform origin-bottom">
                  {/* Background Arc */}
                  <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#0B192C" strokeWidth="20" strokeLinecap="round" />
                  
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00D2C4" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>

                  {/* Foreground Animated Arc */}
                  <motion.path 
                    d="M 20 100 A 80 80 0 0 1 180 100" 
                    fill="none" 
                    stroke="url(#gaugeGradient)" 
                    strokeWidth="20" 
                    strokeLinecap="round"
                    strokeDasharray="251.2" // PI * 80
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * (score / 10)) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  
                  {/* Needle */}
                  <motion.g
                    initial={{ rotate: 0 }}
                    animate={{ rotate: gaugeRotation }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ originX: "100px", originY: "100px" }}
                  >
                    <polygon points="96,100 104,100 100,20" fill="#cbd5e1" />
                    <circle cx="100" cy="100" r="6" fill="#cbd5e1" />
                  </motion.g>
                </svg>
                
                <div className="absolute bottom-0 left-0 right-0 text-center font-mono text-2xl font-bold text-white">
                  {score.toFixed(1)}
                </div>
              </div>

              <div 
                className="px-4 py-1.5 rounded-full text-sm font-bold border mb-6"
                style={{ backgroundColor: `${currentRisk.color}20`, color: currentRisk.color, borderColor: `${currentRisk.color}50` }}
              >
                {currentRisk.label}
              </div>

              {/* Feature contributions */}
              <div className="w-full h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} width={50} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E3E62', border: 'none', borderRadius: '4px', fontSize: '10px', color: '#fff', padding: '4px' }}
                      cursor={{ fill: 'rgba(0,141,218,0.1)' }}
                      formatter={(val: any) => [Number(val).toFixed(2), 'Weight']}
                    />
                    <Bar dataKey="val" radius={[0, 4, 4, 0]} fill={currentRisk.color} animationDuration={1000} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-500 w-full text-center">
              Enter progression indicators to<br/>calculate tumor aggressiveness.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProgressionView;
