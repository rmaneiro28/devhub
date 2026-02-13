import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Eye, Code, Download, Copy, Check } from 'lucide-react';

const MarkdownLive: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>(`# Welcome to Markdown Live

This is a **live preview** editor. Start typing to see your changes!

## Features
- [x] GitHub Flavored Markdown
- [x] Real-time preview
- [ ] Syntax highlighting (coming soon)

| Feature | Status |
| :--- | :--- |
| Tables | Supported |
| Task Lists | Supported |
| Auto-scroll | Planned |

\`\`\`javascript
console.log("Hello, DevHub!");
\`\`\`

> "Code is like humor. When you have to explain it, it’s bad." – Cory House
`);
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadMarkdown = () => {
        const element = document.createElement("a");
        const file = new Blob([markdown], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "README.md";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="h-[calc(100vh-12rem)] min-h-[500px] flex flex-col space-y-4">

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                        <FileText size={20} />
                    </div>
                    <h2 className="font-bold text-slate-900 dark:text-white hidden sm:block">Markdown Live</h2>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs rounded font-mono hidden sm:inline-block">v1.2</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab('editor')}
                        className={`md:hidden px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'editor' ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-slate-500'}`}
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`md:hidden px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'preview' ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-slate-500'}`}
                    >
                        Preview
                    </button>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block"></div>

                    <button
                        onClick={copyToClipboard}
                        className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="Copy Markdown"
                    >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                    <button
                        onClick={downloadMarkdown}
                        className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="Download .md"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Split View */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative">

                {/* Editor */}
                <div className={`h-full flex flex-col ${activeTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden focus-within:ring-2 ring-indigo-500/50 transition-shadow">
                        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <Code size={14} /> Editor
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="flex-grow w-full p-6 bg-transparent border-none resize-none focus:ring-0 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 outline-none"
                            placeholder="Type markdown here..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className={`h-full flex flex-col ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden">
                        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <Eye size={14} /> Preview (GitHub Style)
                        </div>
                        {/* 
                            Custom Typography matching GitHub's look roughly:
                            - prose-headings: darker/bolder
                            - prose-a: blue
                            - prose-pre: bg-slate-100/900
                        */}
                        <div className="flex-grow overflow-y-auto p-8 bg-white dark:bg-[#0d1117]">
                            <div className="prose dark:prose-invert max-w-none 
                                prose-headings:border-b prose-headings:border-slate-200 dark:prose-headings:border-slate-800 prose-headings:pb-2 prose-headings:mt-8 first:prose-headings:mt-0
                                prose-api:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                prose-pre:bg-slate-100 dark:prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700
                                prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                                prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 prose-blockquote:text-slate-500
                                prose-img:rounded-lg prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-700
                            ">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {markdown}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarkdownLive;
