import React, { useState } from 'react';
import { Binary, ArrowRight, Copy, Check, RefreshCw } from 'lucide-react';

const Base64Encoder: React.FC = () => {
    const [input, setInput] = useState('Hello DevHub');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    React.useEffect(() => {
        try {
            setError('');
            if (mode === 'encode') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            setOutput('');
            setError('Invalid Input for Base64 Decoding');
        }
    }, [input, mode]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <Binary size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Base64 Converter</h3>
                    <p className="text-sm text-slate-500">Encode and decode text to Base64 format</p>
                </div>
            </div>

            <div className="flex justify-center mb-6">
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'encode'
                                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'decode'
                                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6 flex-grow">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">Input</label>
                    <textarea
                        className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? "Text to encode..." : "Base64 to decode..."}
                    />
                </div>

                <div className="flex-1 flex flex-col relative group">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">Output</label>
                    <div className={`flex-grow p-4 bg-slate-950 rounded-xl border ${error ? 'border-red-500/50' : 'border-slate-800'} font-mono text-sm text-blue-300 overflow-auto whitespace-pre-wrap`}>
                        {error ? <span className="text-red-400">{error}</span> : output}
                    </div>
                    {output && !error && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-4 top-10 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Base64Encoder;
