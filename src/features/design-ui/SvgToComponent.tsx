import React from 'react';
import { Code, Copy, Check, FileCode } from 'lucide-react';
import { useSvgToComponent } from './useSvgToComponent';

const SvgToComponent: React.FC = () => {
    const {
        svgInput,
        setSvgInput,
        componentName,
        setComponentName,
        framework,
        setFramework,
        typescript,
        setTypescript,
        output,
        convert,
        reset
    } = useSvgToComponent();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        if (svgInput) {
            convert();
        }
    }, [svgInput, componentName, framework, typescript]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                    <FileCode size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">SVG to Component</h3>
                    <p className="text-sm text-slate-500">Convert SVG to React, Vue, or Angular components</p>
                </div>
            </div>

            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Component Name</label>
                    <input
                        type="text"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                        placeholder="MyIcon"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Framework</label>
                    <select
                        value={framework}
                        onChange={(e) => setFramework(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                    >
                        <option value="react">React</option>
                        <option value="vue">Vue 3</option>
                        <option value="angular">Angular</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={typescript}
                            onChange={(e) => setTypescript(e.target.checked)}
                            className="w-4 h-4 rounded"
                        />
                        <span className="text-sm font-medium">TypeScript</span>
                    </label>
                </div>
                <div className="flex items-end gap-2">
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">SVG Input</label>
                    </div>
                    <textarea
                        value={svgInput}
                        onChange={(e) => setSvgInput(e.target.value)}
                        placeholder="Paste your SVG code here..."
                        className="w-full h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                    />
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Component Output</label>
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
                        {output ? (
                            <pre className="font-mono text-sm">
                                <code>{output}</code>
                            </pre>
                        ) : (
                            <p className="text-slate-400 text-sm">Component code will appear here...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SvgToComponent;
