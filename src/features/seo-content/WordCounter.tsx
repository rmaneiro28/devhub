import React from 'react';
import { FileText } from 'lucide-react';
import { useWordCounter } from './useWordCounter';

const WordCounter: React.FC = () => {
    const { text, setText, stats } = useWordCounter();

    const statCards = [
        { label: 'Characters', value: stats.characters, color: 'blue' },
        { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, color: 'cyan' },
        { label: 'Words', value: stats.words, color: 'green' },
        { label: 'Sentences', value: stats.sentences, color: 'purple' },
        { label: 'Paragraphs', value: stats.paragraphs, color: 'pink' },
        { label: 'Reading Time', value: `${stats.readingTime} min`, color: 'orange' }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                    <FileText size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Word Counter</h3>
                    <p className="text-sm text-slate-500">Count words, characters, and reading time</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            <textarea
                className="flex-1 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 custom-scrollbar"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
            />
        </div>
    );
};

export default WordCounter;
