import React from 'react';
import { GitBranch, Download, Copy, Check } from 'lucide-react';
import { useGitIgnoreGenerator } from './useGitIgnoreGenerator';

const GitIgnoreGenerator: React.FC = () => {
    const {
        templates,
        selectedTemplates,
        customEntries,
        setCustomEntries,
        output,
        toggleTemplate,
        generate,
        downloadFile,
        reset
    } = useGitIgnoreGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        generate();
    }, [selectedTemplates, customEntries]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                    <GitBranch size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">.gitignore Generator</h3>
                    <p className="text-sm text-slate-500">Create .gitignore files for your projects</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium mb-3">Select Templates</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {templates.map((template) => (
                                <button
                                    key={template.name}
                                    onClick={() => toggleTemplate(template.name)}
                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${selectedTemplates.includes(template.name)
                                            ? 'bg-red-600 text-white border-red-600'
                                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-red-300'
                                        }`}
                                >
                                    {template.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Custom Entries</label>
                        <textarea
                            value={customEntries}
                            onChange={(e) => setCustomEntries(e.target.value)}
                            placeholder="Add custom patterns (one per line)&#10;example.txt&#10;*.log&#10;temp/"
                            className="w-full h-[200px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                        />
                    </div>

                    <button
                        onClick={reset}
                        className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                    >
                        Reset
                    </button>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">.gitignore Content</label>
                        {output && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                                <button
                                    onClick={downloadFile}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    <Download size={16} />
                                    <span className="text-sm">Download</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm">
                            <code>{output}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitIgnoreGenerator;
