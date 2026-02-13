import React, { useState, useEffect } from 'react';
import { Clock, Check, AlertCircle } from 'lucide-react';
import cronstrue from 'cronstrue';
import 'cronstrue/locales/en';
import 'cronstrue/locales/es';

const CronParser: React.FC = () => {
    const [expression, setExpression] = useState('*/5 * * * *');
    const [description, setDescription] = useState('');
    const [nextRuns, setNextRuns] = useState<string[]>([]); // Future enhancement: Calculate next run dates (needs another lib usually, but we keep UI ready)
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            setError('');
            // Detect locale? For now force 'en' or 'es' based on context or user preference. defaulting to ES since user is ES
            const desc = cronstrue.toString(expression, { locale: "es" });
            setDescription(desc);
        } catch (e: any) {
            setDescription('');
            setError('Expresión Cron inválida');
        }
    }, [expression]);

    // Simple preset shortcuts
    const presets = [
        { label: 'Cada minuto', value: '* * * * *' },
        { label: 'Cada 5 min', value: '*/5 * * * *' },
        { label: 'Cada hora', value: '0 * * * *' },
        { label: 'Diario a media noche', value: '0 0 * * *' },
        { label: 'Semanal (Dom)', value: '0 0 * * 0' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[500px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Cron Job Parser</h3>
                    <p className="text-sm text-slate-500">Traduce expresiones Cron a lenguaje natural</p>
                </div>
            </div>

            <div className="w-full max-w-2xl mx-auto space-y-8">

                {/* Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Expresión Cron</label>
                    <input
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="w-full text-center text-3xl font-mono p-4 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl focus:border-red-500 outline-none transition-colors text-slate-800 dark:text-slate-200"
                        placeholder="* * * * *"
                    />
                </div>

                {/* Result */}
                <div className="text-center min-h-[100px] flex items-center justify-center">
                    {error ? (
                        <div className="flex items-center gap-2 text-rose-500 font-bold animate-pulse">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 animate-in fade-in slide-in-from-bottom-2">
                            "{description}"
                        </div>
                    )}
                </div>

                {/* Chips */}
                <div className="flex flex-wrap justify-center gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.value}
                            onClick={() => setExpression(preset.value)}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CronParser;
