
import React, { useState } from 'react';
import { Code, Copy, Check, ArrowRight } from 'lucide-react';

const JsonToTs: React.FC = () => {
    const [input, setInput] = useState('{"name": "DevHub", "active": true, "version": 1}');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Very basic JSON to TS conversion for demo purposes
    // In a real app, use a library like 'json-to-ts'
    const convert = () => {
        try {
            const obj = JSON.parse(input);
            let ts = 'interface RootObject {\n';

            for (const [key, value] of Object.entries(obj)) {
                let type = typeof value as string;
                if (value === null) type = 'any';
                else if (Array.isArray(value)) type = 'any[]'; // Simplified

                ts += `  ${key}: ${type};\n`;
            }

            ts += '}';
            setOutput(ts);
        } catch (e) {
            setOutput('// Invalid JSON');
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
                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-xl">
                    <Code size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">JSON to TypeScript</h3>
                    <p className="text-sm text-slate-500">Instant interface generation</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 h-[500px]">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">JSON Input</label>
                    <textarea
                        className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={convert}
                        className="p-3 bg-sky-600 hover:bg-sky-500 text-white rounded-full shadow-lg hover:shadow-sky-500/25 transition-all"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col relative group">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">TypeScript interfaces</label>
                    <div className="flex-grow p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 overflow-auto">
                        <pre>{output}</pre>
                    </div>
                    {output && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-4 top-10 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JsonToTs;
