import React from 'react';
import { Database } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = "No dataset loaded. Please navigate to Data Management to upload your data." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center bg-slate-800/50 rounded-xl border border-dashed border-slate-700"
    >
      <Database className="w-12 h-12 text-slate-500 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Data Required</h3>
      <p className="text-slate-400 max-w-md">{message}</p>
    </motion.div>
  );
};
