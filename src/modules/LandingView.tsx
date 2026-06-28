import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { patients, cancerTypeDistribution } from '../data/patients';

import {
  Pulse, Flask, Stack, TrendUp, Heartbeat,
  ArrowCounterClockwise, Dna, Brain, ShieldWarning, Users, FileText, MagnifyingGlass, Lightning
} from '@phosphor-icons/react';

// DNA Helix particle canvas
const DNACanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ['#0ea5e9', '#10B981', '#334155'];
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let t = 0;
    let animFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.005;

      // Draw helix strands
      const helixX = W * 0.8;
      const amplitude = 80;
      const points1: [number, number][] = [];
      const points2: [number, number][] = [];

      for (let y = -20; y < H + 20; y += 6) {
        const phase = y * 0.01 + t * 2;
        const x1 = helixX + Math.sin(phase) * amplitude;
        const x2 = helixX + Math.sin(phase + Math.PI) * amplitude;
        points1.push([x1, y]);
        points2.push([x2, y]);
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < points1.length; i += 6) {
        const alpha = 0.05 + 0.03 * Math.sin(i * 0.05 + t);
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(points1[i][0], points1[i][1]);
        ctx.lineTo(points2[i][0], points2[i][1]);
        ctx.stroke();
      }

      ctx.lineWidth = 1.5;
      [{ pts: points1, c: '16, 185, 129' }, { pts: points2, c: '14, 165, 233' }].forEach(({ pts, c }) => {
        ctx.beginPath();
        pts.forEach(([x, y], idx) => {
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = `rgba(${c}, 0.1)`;
        ctx.stroke();
      });

      // Update particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const modules = [
  { path: '/detection', label: 'Cancer Detection', desc: 'Binary classification with animated probability analysis', icon: <Pulse size={24} weight="light" />, color: '#10B981', colSpan: 'md:col-span-2' },
  { path: '/classification', label: 'Classification', desc: 'Molecular subtype identification and confusion matrix', icon: <Flask size={24} weight="light" />, color: '#0ea5e9', colSpan: 'md:col-span-1' },
  { path: '/stage', label: 'Stage Prediction', desc: 'Clinical stage I-IV combining multi-omics features', icon: <Stack size={24} weight="light" />, color: '#3b82f6', colSpan: 'md:col-span-1' },
  { path: '/progression', label: 'Tumor Progression', desc: 'Aggressiveness score on animated gauge chart', icon: <TrendUp size={24} weight="light" />, color: '#f59e0b', colSpan: 'md:col-span-2' },
  { path: '/survival', label: 'Survival Analysis', desc: 'Cox PH model with interactive Kaplan-Meier curves', icon: <Heartbeat size={24} weight="light" />, color: '#ef4444', colSpan: 'md:col-span-2' },
  { path: '/recurrence', label: 'Recurrence Risk', desc: 'Percentage recurrence with risk stratification', icon: <ArrowCounterClockwise size={24} weight="light" />, color: '#8b5cf6', colSpan: 'md:col-span-1' },
  { path: '/biomarkers', label: 'Biomarker Discovery', desc: 'Top driving genes ranked by feature importance', icon: <Dna size={24} weight="light" />, color: '#ec4899', colSpan: 'md:col-span-1' },
  { path: '/shap', label: 'Explainable AI', desc: 'SHAP summary and waterfall decision plots', icon: <Brain size={24} weight="light" />, color: '#06b6d4', colSpan: 'md:col-span-2' },
  { path: '/genetic-risk', label: 'Genetic Risk', desc: 'Germline variant parsing and predisposition levels', icon: <ShieldWarning size={24} weight="light" />, color: '#f97316', colSpan: 'md:col-span-1' },
  { path: '/similarity', label: 'Patient Similarity', desc: 'Top 5 similar historic cases with search', icon: <Users size={24} weight="light" />, color: '#14b8a6', colSpan: 'md:col-span-2' },
  { path: '/report-generator', label: 'Clinical Report', desc: 'Multi-module aggregated PDF report export', icon: <FileText size={24} weight="light" />, color: '#a855f7', colSpan: 'md:col-span-3' },
];

const LandingView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredModules = modules.filter(m => 
    m.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-12 font-sans overflow-x-hidden">
      
      {/* Asymmetrical Split Screen Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        
        {/* Left Typography Block */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-12 lg:pt-24 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-8 backdrop-blur-md">
              <Lightning size={14} weight="bold" /> Precision Oncology Intelligence Platform
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.05] mb-6">
              Vanguard <br/>
              <span className="text-slate-500 font-medium">Clinical Engine.</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-[50ch] leading-relaxed mb-10">
              An elite decision assistance system integrating multi-omics biomarker synthesis, explainable AI, and predictive survival analytics in a high-density, perpetually active dashboard.
            </p>

            {/* Typewriter Search Command Input */}
            <div className="relative max-w-xl group">
              <MagnifyingGlass size={20} weight="bold" className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                aria-label="Search modules"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search engine modules... (e.g. survival, biomarker)"
                className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 text-base text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 focus:bg-white/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] backdrop-blur-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Asset Block (DNA Canvas inside a Double-Bezel container) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative min-h-[400px] lg:min-h-full rounded-[2.5rem] bg-white/5 p-2 ring-1 ring-white/10"
        >
          <div className="absolute inset-2 bg-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
             <DNACanvas />
             {/* Gradient fade to blend edges */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 max-w-7xl">
        {[
          { label: 'Active Modules', value: 11, suffix: '', color: '#10B981' },
          { label: 'Patient Records', value: patients.length, suffix: '', color: '#0ea5e9' },
          { label: 'Cancer Types', value: cancerTypeDistribution.length, suffix: '', color: '#f59e0b' },
          { label: 'OS Rate', value: 75, suffix: '%', color: '#ef4444' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col py-6 border-l border-white/10 pl-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">{stat.label}</p>
            <p className="text-4xl font-light text-white font-mono tracking-tight">
              {stat.value}<span className="text-2xl" style={{ color: stat.color }}>{stat.suffix}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="max-w-7xl mb-32">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Clinical Modules Library</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredModules.map((mod) => (
            <motion.div
              key={mod.path}
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 20 } }
              }}
              whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
              onClick={() => navigate(mod.path)}
              className={`group relative cursor-pointer bg-white/5 rounded-[2rem] p-1.5 ring-1 ring-white/10 transition-colors hover:bg-white/10 ${mod.colSpan}`}
            >
              <div className="h-full w-full bg-[#0a0a0a] rounded-[1.6rem] p-8 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 relative overflow-hidden">
                
                {/* Perpetual subtle pulse background */}
                <motion.div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none"
                  style={{ backgroundColor: mod.color }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 ring-1 ring-white/10" style={{ color: mod.color }}>
                    {mod.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                    {mod.label}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-[40ch]">
                    {mod.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                    Initialize Module
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <TrendUp size={12} weight="bold" className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default LandingView;
