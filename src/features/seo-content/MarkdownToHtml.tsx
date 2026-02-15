import React, { useEffect } from 'react';
import { FileCode, Copy, Check, Eye, Code } from 'lucide-react';
import { useMarkdownToHtml } from './useMarkdownToHtml';
import 'highlight.js/styles/github-dark.css';

const MarkdownToHtml: React.FC = () => {
    const { markdown, setMarkdown, html } = useMarkdownToHtml();
    const [copied, setCopied] = React.useState(false);
    const [view, setView] = React.useState<'split' | 'preview' | 'code'>('split');

    const handleCopy = () => {
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                        <FileCode size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Markdown to HTML</h3>
                        <p className="text-sm text-slate-500">GitHub-flavored markdown with syntax highlighting</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setView('split')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'split'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        Split
                    </button>
                    <button
                        onClick={() => setView('preview')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${view === 'preview'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        <Eye size={14} />
                        Preview
                    </button>
                    <button
                        onClick={() => setView('code')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${view === 'code'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        <Code size={14} />
                        HTML
                    </button>
                </div>
            </div>

            <div className={`grid ${view === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6 flex-1`}>
                {/* Markdown Input */}
                {(view === 'split' || view === 'code') && view !== 'preview' && (
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2">
                            {view === 'code' ? 'HTML Output' : 'Markdown Input'}
                        </label>
                        {view === 'code' ? (
                            <div className="relative flex-1">
                                <textarea
                                    readOnly
                                    className="w-full h-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs resize-none focus:outline-none custom-scrollbar"
                                    value={html}
                                />
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-3 right-3 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                            </div>
                        ) : (
                            <textarea
                                className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 custom-scrollbar"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                placeholder="# Start typing markdown..."
                            />
                        )}
                    </div>
                )}

                {/* Preview */}
                {(view === 'split' || view === 'preview') && (
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2">Preview</label>
                        <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                            {html ? (
                                <div
                                    className="markdown-body"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'inherit',
                                        fontSize: '16px',
                                        lineHeight: '1.6'
                                    }}
                                />
                            ) : (
                                <p className="text-slate-400 text-center py-20">Preview will appear here...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Markdown Styles */}
            <style>{`
                .markdown-body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                
                .markdown-body h1,
                .markdown-body h2 {
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 0.3em;
                }
                
                .dark .markdown-body h1,
                .dark .markdown-body h2 {
                    border-bottom-color: #334155;
                }
                
                .markdown-body h1 {
                    font-size: 2em;
                    font-weight: 600;
                    margin-top: 24px;
                    margin-bottom: 16px;
                }
                
                .markdown-body h2 {
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 24px;
                    margin-bottom: 16px;
                }
                
                .markdown-body h3 {
                    font-size: 1.25em;
                    font-weight: 600;
                    margin-top: 24px;
                    margin-bottom: 16px;
                }
                
                .markdown-body p {
                    margin-top: 0;
                    margin-bottom: 16px;
                }
                
                .markdown-body code {
                    background-color: rgba(175, 184, 193, 0.2);
                    padding: 0.2em 0.4em;
                    border-radius: 6px;
                    font-size: 85%;
                    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
                }
                
                .markdown-body pre {
                    background-color: #0d1117;
                    padding: 16px;
                    border-radius: 6px;
                    overflow: auto;
                    margin-bottom: 16px;
                }
                
                .dark .markdown-body pre {
                    background-color: #0d1117;
                }
                
                .markdown-body pre code {
                    background-color: transparent;
                    padding: 0;
                    border-radius: 0;
                    font-size: 85%;
                }
                
                .markdown-body table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-bottom: 16px;
                }
                
                .markdown-body table th,
                .markdown-body table td {
                    padding: 6px 13px;
                    border: 1px solid #e5e7eb;
                }
                
                .dark .markdown-body table th,
                .dark .markdown-body table td {
                    border-color: #334155;
                }
                
                .markdown-body table th {
                    font-weight: 600;
                    background-color: #f3f4f6;
                }
                
                .dark .markdown-body table th {
                    background-color: #1e293b;
                }
                
                .markdown-body table tr:nth-child(even) {
                    background-color: #f9fafb;
                }
                
                .dark .markdown-body table tr:nth-child(even) {
                    background-color: #0f172a;
                }
                
                .markdown-body ul,
                .markdown-body ol {
                    padding-left: 2em;
                    margin-bottom: 16px;
                }
                
                .markdown-body li {
                    margin-top: 0.25em;
                }
                
                .markdown-body blockquote {
                    padding: 0 1em;
                    border-left: 0.25em solid #e5e7eb;
                    margin-bottom: 16px;
                    color: #6b7280;
                }
                
                .dark .markdown-body blockquote {
                    border-left-color: #334155;
                    color: #9ca3af;
                }
                
                .markdown-body a {
                    color: #3b82f6;
                    text-decoration: none;
                }
                
                .markdown-body a:hover {
                    text-decoration: underline;
                }
                
                .markdown-body img {
                    max-width: 100%;
                    height: auto;
                }
                
                .markdown-body hr {
                    height: 0.25em;
                    padding: 0;
                    margin: 24px 0;
                    background-color: #e5e7eb;
                    border: 0;
                }
                
                .dark .markdown-body hr {
                    background-color: #334155;
                }

                /* Task list styles */
                .markdown-body input[type="checkbox"] {
                    margin-right: 0.5em;
                }
            `}</style>
        </div>
    );
};

export default MarkdownToHtml;
