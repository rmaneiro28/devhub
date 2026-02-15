import React from 'react';
import { Bot, Download, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { useRobotsTxtGenerator } from './useRobotsTxtGenerator';

const RobotsTxtGenerator: React.FC = () => {
    const {
        userAgents,
        sitemapUrl,
        setSitemapUrl,
        crawlDelay,
        setCrawlDelay,
        addUserAgent,
        updateAgent,
        updateRules,
        removeAgent,
        generate,
        downloadFile
    } = useRobotsTxtGenerator();

    const [copied, setCopied] = React.useState(false);
    const output = generate();

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">robots.txt Generator</h3>
                    <p className="text-sm text-slate-500">Control search engine crawlers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">User Agents</h4>
                        <button
                            onClick={addUserAgent}
                            className="px-3 py-1 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2 text-sm"
                        >
                            <Plus size={16} />
                            Add Agent
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-auto custom-scrollbar">
                        {userAgents.map((ua, index) => (
                            <div key={index} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={ua.agent}
                                        onChange={(e) => updateAgent(index, e.target.value)}
                                        placeholder="User-agent (e.g., *)"
                                        className="flex-1 p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                    {userAgents.length > 1 && (
                                        <button
                                            onClick={() => removeAgent(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={ua.rules.join('\n')}
                                    onChange={(e) => updateRules(index, e.target.value)}
                                    placeholder="Rules (one per line)&#10;Allow: /&#10;Disallow: /admin/&#10;Disallow: /private/"
                                    className="w-full p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono resize-none"
                                    rows={4}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Sitemap URL</label>
                            <input
                                type="text"
                                value={sitemapUrl}
                                onChange={(e) => setSitemapUrl(e.target.value)}
                                placeholder="https://example.com/sitemap.xml"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Crawl Delay (seconds)</label>
                            <input
                                type="number"
                                value={crawlDelay}
                                onChange={(e) => setCrawlDelay(e.target.value)}
                                placeholder="10"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">robots.txt</label>
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
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm whitespace-pre-wrap">
                            {output}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RobotsTxtGenerator;
