
import React from 'react';
import { Clock, ArrowDown, ArrowUp } from 'lucide-react';
import { useTimestampConverter } from './useTimestampConverter';

const TimestampConverter: React.FC = () => {
    const { now, epochInput, convertToHuman, humanInput, convertToEpoch, outputs } = useTimestampConverter();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Unix Timestamp</h3>
                    <p className="text-sm text-slate-500">Current Epoch: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{now}</span></p>
                </div>
            </div>

            <div className="flex flex-col gap-12">
                {/* Epoch to Human */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <ArrowDown size={16} /> Epoch to Date
                    </h4>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <input
                            type="text"
                            value={epochInput}
                            onChange={(e) => convertToHuman(e.target.value)}
                            placeholder={`e.g. ${now}`}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 w-full md:w-1/3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <span className="text-slate-400 hidden md:block">→</span>
                        <div className="flex-1 w-full bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[3rem] flex items-center text-slate-700 dark:text-slate-300 font-medium">
                            {outputs.toHuman}
                        </div>
                    </div>
                </div>

                {/* Human to Epoch */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <ArrowUp size={16} /> Date to Epoch
                    </h4>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <input
                            type="datetime-local"
                            value={humanInput}
                            onChange={(e) => convertToEpoch(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 w-full md:w-1/3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <span className="text-slate-400 hidden md:block">→</span>
                        <div className="flex-1 w-full bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[3rem] flex items-center text-slate-700 dark:text-slate-300 font-medium font-mono">
                            {outputs.toEpoch}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimestampConverter;
