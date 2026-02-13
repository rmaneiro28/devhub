
import React, { useState, useEffect } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

const UnitConverter: React.FC = () => {
    const [baseSize, setBaseSize] = useState(16);
    const [px, setPx] = useState(16);
    const [rem, setRem] = useState(1);
    const [em, setEm] = useState(1);
    const [percent, setPercent] = useState(100);
    const [copied, setCopied] = useState<string | null>(null);

    const handlePxChange = (val: number) => {
        setPx(val);
        setRem(val / baseSize);
        setEm(val / baseSize);
        setPercent((val / baseSize) * 100);
    };

    const handleRemChange = (val: number) => {
        setRem(val);
        setPx(val * baseSize);
        setEm(val);
        setPercent(val * 100);
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <Hash size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Unit Converter</h3>
                    <p className="text-sm text-slate-500">PX ↔ REM ↔ EM ↔ %</p>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Base Font Size (px)</label>
                <input
                    type="number"
                    value={baseSize}
                    onChange={(e) => {
                        const newBase = Number(e.target.value);
                        setBaseSize(newBase);
                        setRem(px / newBase);
                        setEm(px / newBase);
                        setPercent((px / newBase) * 100);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { label: 'Pixels (px)', value: px, setter: handlePxChange, suffix: 'px' },
                    { label: 'REM', value: rem, setter: handleRemChange, suffix: 'rem' },
                    { label: 'EM', value: em, setter: (v: number) => handleRemChange(v), suffix: 'em' }, // EM usually same logic relative to parent, simplified here
                    { label: 'Percentage (%)', value: percent, setter: (v: number) => handleRemChange(v / 100), suffix: '%' }
                ].map((unit) => (
                    <div key={unit.suffix} className="relative group">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{unit.label}</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={parseFloat(unit.value.toFixed(4))}
                                onChange={(e) => unit.setter(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                            <span className="absolute right-12 top-3.5 text-slate-400 text-sm font-mono pointer-events-none">{unit.suffix}</span>
                            <button
                                onClick={() => copyToClipboard(`${parseFloat(unit.value.toFixed(4))}${unit.suffix}`, unit.suffix)}
                                className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                title="Copy"
                            >
                                {copied === unit.suffix ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnitConverter;
