import React from 'react';
import { Code, Copy, Check, RefreshCw } from 'lucide-react';
import { useXmlJson } from './useXmlJson';

const XmlJson: React.FC = () => {
    const {
        input,
        setInput,
        output,
        mode,
        setMode,
        error,
        convert,
        swap,
        reset
    } = useXmlJson();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        if (input) {
            convert();
        }
    }, [input, mode]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                    <Code size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">XML ↔ JSON Converter</h3>
                    <p className="text-sm text-slate-500">Bidirectional conversion between XML and JSON</p>
                </div>
            </div>

            {/* Mode Selector */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={() => setMode('xml-to-json')}
                    className={`px-6 py-3 rounded-lg font-medium ${mode === 'xml-to-json'
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    XML → JSON
                </button>
                <button
                    onClick={swap}
                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Swap"
                >
                    <RefreshCw size={20} />
                </button>
                <button
                    onClick={() => setMode('json-to-xml')}
                    className={`px-6 py-3 rounded-lg font-medium ${mode === 'json-to-xml'
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    JSON → XML
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                            {mode === 'xml-to-json' ? 'XML Input' : 'JSON Input'}
                        </label>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'xml-to-json' ? 'Paste XML here...' : 'Paste JSON here...'}
                        className="w-full h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                    />
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                            {mode === 'xml-to-json' ? 'JSON Output' : 'XML Output'}
                        </label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        )}
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        {error ? (
                            <div className="text-red-500 text-sm">{error}</div>
                        ) : output ? (
                            <pre className="font-mono text-sm">
                                <code>{output}</code>
                            </pre>
                        ) : (
                            <p className="text-slate-400 text-sm">
                                {mode === 'xml-to-json' ? 'JSON' : 'XML'} output will appear here...
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={reset}
                    className="px-6 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default XmlJson;
