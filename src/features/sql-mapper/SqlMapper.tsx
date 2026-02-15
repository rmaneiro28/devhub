import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Loader2, Database } from 'lucide-react';
import { useSqlMapper } from './useSqlMapper';

const InteractiveDemo: React.FC = () => {
  const [sqlInput, setSqlInput] = useState(`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const { generateCode, loading } = useSqlMapper();

  const handleGenerate = async () => {
    const result = await generateCode(sqlInput);
    if (result) {
      setOutput(result);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-xl">
          <Database size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">SQL to Fullstack Mapper</h3>
          <p className="text-sm text-slate-500">Generate type-safe code from schemas (Regex Powered)</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col">
          <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800 flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">input.sql</span>
            </div>
            <textarea
              className="flex-grow w-full bg-transparent text-teal-400 font-mono text-sm focus:outline-none resize-none custom-scrollbar"
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={16} fill="currentColor" />}
              {loading ? 'Processing...' : 'Transform Schema'}
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <div className="bg-slate-950 rounded-xl p-6 shadow-lg border border-slate-800 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-slate-500" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">output_bundle.ts</span>
              </div>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              )}
            </div>
            <div className="flex-grow overflow-auto custom-scrollbar">
              {output ? (
                <pre className="text-teal-300 font-mono text-xs leading-relaxed whitespace-pre font-mono">
                  {output}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 italic text-sm">
                  <p>Awaiting input...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
