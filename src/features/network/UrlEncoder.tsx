
import React from 'react';
import { Network, ArrowRightLeft, Copy, Check, AlertCircle } from 'lucide-react';
import { useUrlEncoder } from './useUrlEncoder';

const UrlEncoder: React.FC = () => {
    const {
        input,
        setInput,
        output,
        mode,
        setMode,
        error,
        copyToClipboard
    } = useUrlEncoder();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        copyToClipboard();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                        <Network size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">URL Encoder / Decoder</h3>
                        <p className="text-sm text-slate-500">Encode or decode URL components</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'encode' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'decode' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 flex-grow">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">Input</label>
                    <textarea
                        className="flex-grow p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 custom-scrollbar"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Enter text to ${mode}...`}
                    />
                </div>

                <div className="hidden lg:flex items-center justify-center text-slate-300">
                    <ArrowRightLeft size={24} />
                </div>

                <div className="flex-1 flex flex-col relative group">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">Result</label>
                    <div className="flex-grow relative">
                        <textarea
                            className={`w-full h-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 custom-scrollbar ${error ? 'border-red-300 dark:border-red-900 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800'}`}
                            value={output}
                            readOnly
                            placeholder="Result will appear here..."
                        />
                        {input && !error && (
                            <button
                                onClick={handleCopy}
                                className="absolute right-4 top-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700 backdrop-blur-sm"
                                title="Copy result"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        )}
                        {error && (
                            <div className="absolute bottom-4 left-4 right-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2 text-sm font-medium animate-in slide-in-from-bottom-2 duration-200">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlEncoder;
