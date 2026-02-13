import React, { useState, useEffect, useRef } from 'react';
import { Activity, Globe, Zap, Clock, ShieldCheck, Terminal, Server, MapPin } from 'lucide-react';

interface Log {
  id: number;
  timestamp: string;
  message: string;
  status: 'success' | 'warning' | 'error';
  latency: number;
}

const HealthMonitor: React.FC = () => {
  const [url, setUrl] = useState('https://api.devhub.io');
  const [latency, setLatency] = useState(42);
  const [uptime, setUptime] = useState(99.99);
  const [history, setHistory] = useState<number[]>(Array(40).fill(40));
  const [logs, setLogs] = useState<Log[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Mock server regions
  const regions = ['US-East (N. Virginia)', 'EU-West (Ireland)', 'AP-Southeast (Singapore)', 'SA-East (São Paulo)'];
  const [region, setRegion] = useState(regions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        // Simulate jitter
        const delta = Math.floor(Math.random() * 30) - 10;
        const newVal = Math.max(15, Math.min(300, prev + delta));

        // Update History
        setHistory(h => [...h.slice(1), newVal]);

        // Add Log
        const newLog: Log = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: `Ping ${url} options={timeout: 5000}`,
          status: newVal > 150 ? 'warning' : 'success',
          latency: newVal
        };

        setLogs(prevLogs => {
          const newLogs = [...prevLogs, newLog].slice(-50); // Keep last 50
          return newLogs;
        });

        return newVal;
      });
    }, 2000); // 2 second interval

    return () => clearInterval(interval);
  }, [url]);

  // Auto-scroll removed as per user request

  const handleUrlChange = () => {
    if (newUrl) {
      setUrl(newUrl);
      setIsEditing(false);
      setLatency(Math.floor(Math.random() * 40) + 30);
      setHistory(Array(40).fill(0).map(() => Math.floor(Math.random() * 40) + 30));
      setLogs([{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: `Switching target to ${newUrl}...`, status: 'warning', latency: 0 }]);
      setRegion(regions[Math.floor(Math.random() * regions.length)]);
    }
  };

  const getStatusColor = (ms: number) => {
    if (ms < 100) return 'text-emerald-500';
    if (ms < 200) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getBarColor = (ms: number) => {
    if (ms < 100) return 'bg-emerald-500';
    if (ms < 200) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl animate-pulse">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                System Status
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Operational
                </span>
              </h3>
              <p className="text-sm text-slate-500">Real-time edge monitoring</p>
            </div>
          </div>

          {/* URL Control */}
          <div className="flex-grow max-w-md">
            {isEditing ? (
              <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-grow px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                  autoFocus
                />
                <button onClick={handleUrlChange} className="px-3 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-500">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-sm hover:opacity-90">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group cursor-pointer hover:border-emerald-500/50 transition-colors" onClick={() => { setIsEditing(true); setNewUrl(url); }}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <Globe size={16} className="text-slate-400" />
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300 truncate">{url}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-500 uppercase tracking-wider ml-2">Edit</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Metrics */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Zap size={64} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Zap size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Latency (Real)</span>
              </div>
              <div className={`text-3xl font-black ${getStatusColor(latency)} transition-colors duration-300`}>
                {latency}<span className="text-sm font-medium text-slate-400 ml-1">ms</span>
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500">
                Grade: <span className={`font-bold ${latency < 100 ? 'text-emerald-500' : latency < 300 ? 'text-amber-500' : 'text-rose-500'}`}>
                  {latency === 0 ? 'OFFLINE' : latency < 50 ? 'EXCELLENT' : latency < 150 ? 'GOOD' : latency < 400 ? 'FAIR' : 'POOR'}
                </span>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Clock size={64} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Uptime</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {uptime}<span className="text-sm font-medium text-slate-400 ml-1">%</span>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <MapPin size={64} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Server size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Region</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-tight">
                {region}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance History</span>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Avg: {Math.floor(history.reduce((a, b) => a + b, 0) / history.length)}ms</span>
            </div>
            <div className="h-40 flex items-end gap-1.5">
              {history.map((val, i) => (
                <div
                  key={i}
                  className={`flex-grow rounded-t-sm transition-all duration-500 ${getBarColor(val)}`}
                  style={{ height: `${Math.min(100, (val / 300) * 100)}%`, opacity: 0.6 + (i / history.length) * 0.4 }}
                ></div>
              ))}
            </div>
          </div>

        </div>

        {/* Terminal / Logs */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-0 overflow-hidden flex flex-col h-[500px] shadow-xl">
          <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Live Logs</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
            </div>
          </div>

          <div className="p-4 overflow-y-auto font-mono text-xs space-y-2 flex-grow scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {logs.length === 0 && <span className="text-slate-600 italic">Connecting to stream...</span>}
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 animate-in fade-in duration-300">
                <span className="text-slate-500 whitespace-nowrap">{log.timestamp}</span>
                <span className={`${log.status === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {log.status === 'success' ? '✓' : '⚠'}
                </span>
                <span className="text-slate-300 truncate flex-grow">
                  <span className={log.status === 'success' ? 'text-slate-300' : 'text-amber-300'}>{log.message}</span>
                </span>
                <span className={`whitespace-nowrap ${getStatusColor(log.latency)}`}>{log.latency}ms</span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HealthMonitor;
