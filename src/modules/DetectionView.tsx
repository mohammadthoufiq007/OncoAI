import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';

export const DetectionView: React.FC = () => {
  const [tumorSize, setTumorSize] = useState(localStorage.getItem('oncoai_tumor_size') || '');
  const [mitoticIndex, setMitoticIndex] = useState('');
  const [ki67, setKi67] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isMalignant: boolean; probability: number } | null>(null);

  const handleAnalyze = () => {
    if (!tumorSize || !mitoticIndex || !ki67 || !age) return;

    setLoading(true);
    setResult(null);
    localStorage.setItem('oncoai_tumor_size', tumorSize);

    setTimeout(() => {
      setLoading(false);
      const size = parseFloat(tumorSize);
      const mitotic = parseFloat(mitoticIndex);
      const isMalignant = size >= 25 || mitotic > 5;
      const probability = Math.min(99, Math.max(1, Math.round(size * 2)));
      setResult({ isMalignant, probability });
    }, 400);
  };

  const handleReset = () => {
    setTumorSize('');
    setMitoticIndex('');
    setKi67('');
    setAge('');
    setResult(null);
    localStorage.removeItem('oncoai_tumor_size');
  };

  const radarData = [
    { subject: 'Tumor Size', A: Math.min(100, (parseFloat(tumorSize) || 0) / 80 * 100) },
    { subject: 'Mitotic', A: Math.min(100, (parseFloat(mitoticIndex) || 0) / 20 * 100) },
    { subject: 'Ki-67', A: Math.min(100, parseFloat(ki67) || 0) },
    { subject: 'Age Factor', A: Math.min(100, (parseFloat(age) || 0) / 100 * 100) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Cancer Detection</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-bold text-white mb-4">Patient Parameters</h3>
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
                  placeholder="e.g. 25"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Mitotic Index
                </label>
                <input
                  type="number"
                  value={mitoticIndex}
                  onChange={(e) => setMitoticIndex(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                  placeholder="e.g. 6"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Ki-67 (%)
                </label>
                <input
                  type="number"
                  value={ki67}
                  onChange={(e) => setKi67(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Patient Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-[#0B192C] border border-[#008DDA]/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#008DDA]"
                  placeholder="e.g. 54"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAnalyze}
                disabled={!tumorSize || !mitoticIndex || !ki67 || !age || loading}
                className="flex-1 bg-gradient-to-r from-[#008DDA] to-[#00D2C4] hover:opacity-90 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-sm transition-opacity"
              >
                Analyze Target
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-[#0B192C] border border-slate-600 hover:bg-slate-800 text-white font-bold rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg min-h-[300px] flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4">Diagnostic Output</h3>
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#008DDA]/30 border-t-[#00D2C4] rounded-full animate-spin" />
              <p className="text-[#00D2C4] text-xs font-mono animate-pulse">COMPUTING PROBABILITY...</p>
            </div>
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-300">Classification:</span>
                <span className={`px-3 py-1 rounded-md text-sm font-bold ${
                  result.isMalignant ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-[#00D2C4]'
                }`}>
                  {result.isMalignant ? 'MALIGNANT' : 'BENIGN'}
                </span>
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-xs font-medium text-slate-300">
                  <span>Malignancy Probability</span>
                  <span className="font-mono">{result.probability}%</span>
                </div>
                <div className="h-2 w-full bg-[#0B192C] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.probability}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${result.isMalignant ? 'bg-red-500' : 'bg-[#00D2C4]'}`}
                  />
                </div>
              </div>

              <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="rgba(0,141,218,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Patient"
                      dataKey="A"
                      stroke="#00D2C4"
                      fill="#00D2C4"
                      fillOpacity={0.4}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                      formatter={(val: any) => [Number(val).toFixed(0) + '%', 'Contribution']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 text-sm text-center">
                Enter patient parameters and<br/>click Analyze to see results.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DetectionView;
