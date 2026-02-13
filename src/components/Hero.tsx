
import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            New: SQL-to-CRUD with Gemini 3 Pro
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            DevHub: Your Development <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Swiss Army Knife</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminate context-switching. A minimalist dashboard that handles your SQL transformations, asset optimizations, and health checks in one high-performance interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartClick}
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-xl shadow-teal-500/30 flex items-center justify-center gap-2 group"
            >
              Enter Workspace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center justify-center gap-2">
              View Documentation <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 3D Clay Style Mockup Representation */}
        <div className="relative mx-auto max-w-5xl">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-[2rem] blur-2xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-100 dark:bg-slate-900 rounded-[2rem] p-4 clay-shadow border border-slate-200 dark:border-slate-800 transform rotate-x-2 transition-transform duration-700 hover:rotate-x-0">
              <div className="bg-white dark:bg-slate-950 rounded-[1.5rem] overflow-hidden shadow-inner aspect-video flex flex-col">
                {/* Mock Browser Header */}
                <div className="h-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-grow flex justify-center">
                    <div className="w-64 h-5 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  </div>
                </div>
                {/* Mock Content */}
                <div className="flex-grow flex p-6 gap-6 overflow-hidden">
                  <div className="w-48 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-4">
                    <div className="w-full h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg"></div>
                    <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                  <div className="flex-grow grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 flex flex-col justify-between">
                       <div className="space-y-2">
                        <div className="w-1/3 h-4 bg-teal-500/20 rounded"></div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="w-2/3 h-2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                       </div>
                       <div className="h-20 bg-teal-500/5 rounded-lg border border-teal-500/10"></div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-4">
                      <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
