import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { useData } from '../context/DataContext';
import { CaretDown as ChevronDown, CaretUp as ChevronUp, User } from '@phosphor-icons/react';
import { EmptyState } from '../components/EmptyState';

export const RecurrenceView: React.FC = () => {
  const { patients } = useData();
  const [filter, setFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getRiskLevel = (risk: number) => {
    if (risk <= 30) return { label: 'Low', color: '#00D2C4' };
    if (risk <= 60) return { label: 'Medium', color: '#F59E0B' };
    return { label: 'High', color: '#EF4444' };
  };

  const filteredPatients = useMemo(() => {
    if (!patients) return [];
    return patients.filter(p => {
      if (filter === 'All') return true;
      return getRiskLevel(p.recurrenceRisk).label === filter;
    }).sort((a, b) => b.recurrenceRisk - a.recurrenceRisk);
  }, [patients, filter]);

  // Generate histogram data for AreaChart
  const distribution = useMemo(() => {
    const dist = [
      { range: '0-10', count: 0 }, { range: '11-20', count: 0 }, { range: '21-30', count: 0 },
      { range: '31-40', count: 0 }, { range: '41-50', count: 0 }, { range: '51-60', count: 0 },
      { range: '61-70', count: 0 }, { range: '71-80', count: 0 }, { range: '81-90', count: 0 },
      { range: '91-100', count: 0 }
    ];
    if (patients) {
      patients.forEach(p => {
        const idx = Math.min(9, Math.floor(p.recurrenceRisk / 10));
        dist[idx].count += 1;
      });
    }
    return dist;
  }, [patients]);

  const avgRisk = patients && patients.length > 0
    ? Math.round(patients.reduce((acc, p) => acc + p.recurrenceRisk, 0) / patients.length)
    : 0;

  if (!patients || patients.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Recurrence Risk</h2>
        </div>
        <EmptyState message="No patient data found. Please upload a dataset in Data Management." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Recurrence Risk</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-sm font-bold text-white">Patient Risk Cohort</h3>
                <p className="text-xs text-slate-400 mt-1">Sort and filter by recurrence probability</p>
              </div>
              <div className="flex gap-2">
                {['All', 'Low', 'Medium', 'High'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
                      filter === f 
                        ? 'bg-[#008DDA]/20 border-[#008DDA] text-[#00D2C4]' 
                        : 'bg-[#0B192C] border-[#008DDA]/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {filteredPatients.map((patient) => {
                  const riskInfo = getRiskLevel(patient.recurrenceRisk);
                  const isExpanded = expandedId === patient.id;
                  
                  return (
                    <motion.div
                      key={patient.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="bg-[#0B192C] border border-[#008DDA]/15 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#0F2340] transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : patient.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#1E3E62] flex items-center justify-center">
                            <User size={14} className="text-[#008DDA]" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              {patient.name}
                              <span className="text-[10px] text-slate-500 font-mono">{patient.id}</span>
                            </div>
                            <div className="text-xs text-slate-400">
                              {patient.cancerType} • Stage {patient.stage}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div 
                            className="px-2 py-1 rounded text-xs font-bold flex items-center gap-2"
                            style={{ backgroundColor: `${riskInfo.color}15`, color: riskInfo.color, border: `1px solid ${riskInfo.color}30` }}
                          >
                            <span>{patient.recurrenceRisk}%</span>
                            <span className="opacity-70 font-normal">{riskInfo.label}</span>
                          </div>
                          {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Age</div>
                                <div className="text-sm text-slate-300">{patient.age}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Subtype</div>
                                <div className="text-sm text-slate-300">{patient.subtype}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Tumor Size</div>
                                <div className="text-sm text-slate-300">{patient.tumorSize} mm</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-slate-500 uppercase">Ki-67</div>
                                <div className="text-sm text-slate-300">{patient.ki67}%</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No patients match the selected filter.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div data-testid="module-card" className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-6">Risk Distribution</h3>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,141,218,0.08)" vertical={false} />
                  <XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E3E62', border: '1px solid rgba(0,141,218,0.2)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    cursor={{ fill: 'rgba(0,141,218,0.1)' }}
                    formatter={(val: any) => [`${val} Patients`, 'Count']}
                  />
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="count" stroke="#EF4444" fillOpacity={1} fill="url(#colorRisk)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1E3E62] border border-[#008DDA]/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-4">Cohort Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#0B192C] rounded-lg border border-[#008DDA]/10">
                <span className="text-xs text-slate-400">Average Risk Score</span>
                <span className="text-lg font-bold text-[#F59E0B]">{avgRisk}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0B192C] rounded-lg border border-[#008DDA]/10">
                <span className="text-xs text-slate-400">High Risk Patients</span>
                <span className="text-lg font-bold text-[#EF4444]">
                  {patients.filter(p => p.recurrenceRisk > 60).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0B192C] rounded-lg border border-[#008DDA]/10">
                <span className="text-xs text-slate-400">Low Risk Patients</span>
                <span className="text-lg font-bold text-[#00D2C4]">
                  {patients.filter(p => p.recurrenceRisk <= 30).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceView;
