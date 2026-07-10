import React from 'react';
import "remixicon/fonts/remixicon.css";

import FooterIcon from '../../assets/icons/cursor1.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#fafafa] dark:bg-[#0c0c0e] px-6 pb-12 transition-colors duration-500 relative overflow-visible select-none">
      <div className="max-w-4xl mx-auto relative overflow-visible">
        
        <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] relative overflow-visible">
          
          <img 
            src={FooterIcon} 
            alt="Cursor Icon" 
            className="absolute -left-5 -top-5 w-10 h-10 pointer-events-none z-10 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:drop-shadow-[3px_3px_0px_rgba(255,255,255,0.1)] animate-bounce"
            style={{ animationDuration: '3s' }}
          />

          <div className="flex flex-col items-center sm:items-start gap-1 font-mono">
            <div className="text-xs font-black uppercase text-zinc-950 dark:text-zinc-50 tracking-wider">
              © {currentYear} RAMA.EXE — ALL RIGHTS RESERVED.
            </div>
            <div className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              BUILD_STATUS: STABLE // ENV: PRODUCTION
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] font-black uppercase">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 border border-black/20 animate-pulse"></span>
              <span className="text-zinc-700 dark:text-zinc-300 tracking-wider">SYS_OK</span>
            </div>
            <a 
              href="#home" 
              className="px-3 py-1 bg-indigo-600 text-white border-2 border-zinc-950 dark:border-indigo-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1 hover:bg-indigo-700"
            >
              <i className="ri-arrow-up-line font-bold"></i> TOP
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}