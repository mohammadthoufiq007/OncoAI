import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Pulse as Activity, Flask, Stack, TrendUp, Heartbeat,
  ArrowCounterClockwise, Dna, Brain, ShieldWarning, Users, FileText, House, Database
} from '@phosphor-icons/react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  group: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <House size={18} weight="light" />, group: 'Overview' },
  { path: '/data-upload', label: 'Data Management', icon: <Database size={18} weight="light" />, group: 'Overview' },
  { path: '/detection', label: 'Cancer Detection', icon: <Activity size={18} weight="light" />, group: 'Core Diagnostics' },
  { path: '/classification', label: 'Classification', icon: <Flask size={18} weight="light" />, group: 'Core Diagnostics' },
  { path: '/stage', label: 'Stage Prediction', icon: <Stack size={18} weight="light" />, group: 'Core Diagnostics' },
  { path: '/progression', label: 'Tumor Progression', icon: <TrendUp size={18} weight="light" />, group: 'Prognostics' },
  { path: '/survival', label: 'Survival Analysis', icon: <Heartbeat size={18} weight="light" />, group: 'Prognostics' },
  { path: '/recurrence', label: 'Recurrence Risk', icon: <ArrowCounterClockwise size={18} weight="light" />, group: 'Prognostics' },
  { path: '/biomarkers', label: 'Biomarker Discovery', icon: <Dna size={18} weight="light" />, group: 'Translational' },
  { path: '/shap', label: 'Explainable AI', icon: <Brain size={18} weight="light" />, group: 'Translational' },
  { path: '/genetic-risk', label: 'Genetic Risk', icon: <ShieldWarning size={18} weight="light" />, group: 'Translational' },
  { path: '/similarity', label: 'Patient Similarity', icon: <Users size={18} weight="light" />, group: 'Engines' },
  { path: '/report-generator', label: 'Clinical Report', icon: <FileText size={18} weight="light" />, group: 'Engines' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const groups = [...new Set(navItems.map(item => item.group))];

  return (
    <aside aria-label="Main Navigation" className="w-64 min-w-[256px] h-full bg-[#050505] border-r border-white/5 flex flex-col overflow-hidden relative z-50">
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Logo - Double Bezel Look */}
      <div className="relative z-10 px-6 py-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <Activity size={22} weight="duotone" className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
              Onco<span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-medium tracking-[0.15em] uppercase">Precision Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 overflow-y-auto py-6 px-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {groups.map(group => (
          <div key={group}>
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              {group}
            </p>
            <div className="space-y-1">
              {navItems
                .filter(item => item.group === group)
                .map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group"
                    >
                      {/* Active indicator inner core */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          aria-hidden="true"
                          className="absolute inset-0 bg-white/5 ring-1 ring-white/10 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        />
                      )}

                      <span className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}>
                        {item.icon}
                      </span>
                      <span className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="relative z-10 px-6 py-5 border-t border-white/5 text-center bg-[#050505]">
        <p className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">
          CIP v1.1 · Beta
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
