
import React, { useState } from 'react';
import { Type, Copy, Check, RefreshCw } from 'lucide-react';

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsum: React.FC = () => {
    const [paragraphs, setParagraphs] = useState(3);
    const [text, setText] = useState(LOREM_TEXT); // Simply repeat for now
    const [copied, setCopied] = useState(false);

    const generate = () => {
        let result = [];
        for (let i = 0; i < paragraphs; i++) {
            // Randomize slightly if possible, or just repeat
            result.push(LOREM_TEXT);
        }
        setText(result.join('\n\n'));
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl">
                    <Type size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lorem Ipsum</h3>
                    <p className="text-sm text-slate-500">Placeholder text generator</p>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-500">Paragraphs:</span>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={paragraphs}
                        onChange={(e) => setParagraphs(parseInt(e.target.value))}
                        className="w-16 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-bold"
                    />
                </div>
                <button
                    onClick={generate}
                    className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            <div className="relative group">
                <textarea
                    readOnly
                    value={text}
                    className="w-full h-64 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm leading-relaxed resize-none focus:outline-none"
                />
                <button
                    onClick={copyToClipboard}
                    className="absolute right-4 top-4 p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors shadow-sm"
                >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
            </div>
        </div>
    );
};

export default LoremIpsum;
