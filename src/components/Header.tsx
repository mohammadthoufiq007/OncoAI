import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Gear as Settings, User, WifiHigh as Wifi } from '@phosphor-icons/react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 min-h-[56px] bg-[#0F2340]/80 backdrop-blur-xl border-b border-[#008DDA]/10 flex items-center justify-between px-6">
      {/* Left: Empty space to balance flex */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
      </div>

      {/* Right: Status + Actions */}
      <div className="flex items-center gap-4">
        {/* System status */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5 text-[10px] text-[#00D2C4] font-semibold"
        >
          <Wifi size={12} />
          <span>ENGINES ONLINE</span>
        </motion.div>

        {/* Clock */}
        <div className="text-[11px] text-slate-400 font-mono tabular-nums">
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </div>

        {/* Notification bell */}
        <button className="relative p-1.5 rounded-lg hover:bg-[#1E3E62] transition-colors text-slate-400 hover:text-white">
          <Bell size={16} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#00D2C4] rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-1.5 rounded-lg hover:bg-[#1E3E62] transition-colors text-slate-400 hover:text-white">
          <Settings size={16} />
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#008DDA] to-[#00D2C4] flex items-center justify-center shadow-lg shadow-[#008DDA]/20">
          <User size={14} className="text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
