import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingView from './modules/LandingView';
import DetectionView from './modules/DetectionView';
import ClassificationView from './modules/ClassificationView';
import StageView from './modules/StageView';
import ProgressionView from './modules/ProgressionView';
import SurvivalView from './modules/SurvivalView';
import RecurrenceView from './modules/RecurrenceView';
import BiomarkerView from './modules/BiomarkerView';
import ShapView from './modules/ShapView';
import GeneticView from './modules/GeneticView';
import SimilarityView from './modules/SimilarityView';
import ReportView from './modules/ReportView';

import { DataProvider } from './context/DataContext';
import DataUploadView from './modules/DataUploadView';

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: "easeOut" as any } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.2 } },
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><LandingView /></AnimatedPage>} />
        <Route path="/data-upload" element={<AnimatedPage><DataUploadView /></AnimatedPage>} />
        <Route path="/detection" element={<AnimatedPage><DetectionView /></AnimatedPage>} />
        <Route path="/classification" element={<AnimatedPage><ClassificationView /></AnimatedPage>} />
        <Route path="/stage" element={<AnimatedPage><StageView /></AnimatedPage>} />
        <Route path="/progression" element={<AnimatedPage><ProgressionView /></AnimatedPage>} />
        <Route path="/survival" element={<AnimatedPage><SurvivalView /></AnimatedPage>} />
        <Route path="/recurrence" element={<AnimatedPage><RecurrenceView /></AnimatedPage>} />
        <Route path="/biomarkers" element={<AnimatedPage><BiomarkerView /></AnimatedPage>} />
        <Route path="/shap" element={<AnimatedPage><ShapView /></AnimatedPage>} />
        <Route path="/genetic-risk" element={<AnimatedPage><GeneticView /></AnimatedPage>} />
        <Route path="/similarity" element={<AnimatedPage><SimilarityView /></AnimatedPage>} />
        <Route path="/report-generator" element={<AnimatedPage><ReportView /></AnimatedPage>} />
        <Route path="*" element={
          <AnimatedPage>
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div data-testid="module-card" className="bg-[#1E3E62] border border-red-500/30 rounded-2xl p-10 max-w-md shadow-2xl">
                <h2 className="text-7xl font-extrabold text-red-500 font-mono tracking-widest mb-3">404</h2>
                <h3 className="text-xl font-bold text-white mb-3">Module Not Found</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  The requested clinical module path does not exist.
                </p>
                <a href="/" className="inline-flex items-center gap-2 bg-[#008DDA] hover:bg-[#008DDA]/80 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                  ← Return to Dashboard
                </a>
              </div>
            </div>
          </AnimatedPage>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="flex h-screen w-screen overflow-hidden text-slate-100 bg-[#0B192C] font-sans antialiased">
          {/* Sidebar navigation */}
          <Sidebar />

          {/* Main content container */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Global header bar */}
            <Header />

            {/* Dynamic view panel with page transitions */}
            <main className="flex-1 overflow-y-auto p-6 pb-24 bg-[#0B192C]">
              <div className="max-w-7xl mx-auto">
                <AnimatedRoutes />
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
