
import React from 'react';
import { KeyRound, RefreshCw, Copy, Check, Sliders } from 'lucide-react';
import { usePasswordGenerator } from './usePasswordGenerator';

const PasswordGenerator: React.FC = () => {
    const {
        length, setLength,
        lowercase, setLowercase,
        uppercase, setUppercase,
        numbers, setNumbers,
        symbols, setSymbols,
        password,
        generate,
        error
    } = usePasswordGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        generate();
    }, []);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                    <KeyRound size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Password Generator</h3>
                    <p className="text-sm text-slate-500">Create secure, random passwords</p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {/* Display */}
                <div className="relative group">
                    <div className="w-full p-6 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-2xl text-center text-slate-800 dark:text-slate-100 break-all min-h-[5rem] flex items-center justify-center">
                        {password || <span className="text-slate-400 text-lg">Click generate</span>}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-green-500 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors"
                            title="Copy Password"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <button
                            onClick={generate}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-colors"
                            title="Generate New"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white font-medium">
                        <Sliders size={18} />
                        <h4>Configuration</h4>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Length</label>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Lowercase (a-z)</span>
                                <input
                                    type="checkbox"
                                    checked={lowercase}
                                    onChange={(e) => setLowercase(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Uppercase (A-Z)</span>
                                <input
                                    type="checkbox"
                                    checked={uppercase}
                                    onChange={(e) => setUppercase(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
                                <input
                                    type="checkbox"
                                    checked={numbers}
                                    onChange={(e) => setNumbers(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Symbols (!@#$)</span>
                                <input
                                    type="checkbox"
                                    checked={symbols}
                                    onChange={(e) => setSymbols(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </label>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm font-medium text-center">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
