import React, { useState, useMemo } from 'react';
import { Search, AlertCircle, CheckCircle2, Copy, Trash2, Info, BookOpen } from 'lucide-react';

const COMMON_REGEXES = [
    { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', desc: 'Standard email format' },
    { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', desc: 'HTTP/HTTPS URLs' },
    { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', desc: 'ISO 8601 Date' },
    { label: 'Time (HH:MM)', pattern: '([01]?[0-9]|2[0-3]):[0-5][0-9]', desc: '24-hour format' },
    { label: 'IPv4 Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', desc: 'Standard IP address' },
    { label: 'Hex Color', pattern: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})', desc: 'Hexadecimal color code' },
    { label: 'Password (Strong)', pattern: '(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}', desc: 'Min 8 chars, 1 letter, 1 number' },
    { label: 'Slug', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$', desc: 'URL-friendly slug' },
];

const RegexTester: React.FC = () => {
    const [regexStr, setRegexStr] = useState('');
    const [flags, setFlags] = useState('gm');
    const [testString, setTestString] = useState('Hello world! contact@example.com\nVisit https://example.com for more info.\nDate: 2024-05-20');

    // Derived state for regex object and error
    const { regex, error } = useMemo(() => {
        if (!regexStr) return { regex: null, error: null };
        try {
            return { regex: new RegExp(regexStr, flags), error: null };
        } catch (err: any) {
            return { regex: null, error: err.message };
        }
    }, [regexStr, flags]);

    // Calculate matches
    const matches = useMemo(() => {
        if (!regex || !testString) return [];

        // Prevent infinite loops with empty matches if global flag is set
        // but 'g' is usually enforced or handled.

        const results = [];
        let match;

        // We need to clone the regex to ensure lastIndex is 0 if global
        const r = new RegExp(regex.source, regex.flags);

        if (!r.global) {
            match = r.exec(testString);
            if (match) results.push(match);
        } else {
            // Safety limit for very generic matches that might hang
            let safety = 0;
            while ((match = r.exec(testString)) !== null && safety < 1000) {
                results.push(match);
                if (match[0].length === 0) r.lastIndex++; // Avoid infinite loop on zero-length matches
                safety++;
            }
        }
        return results;
    }, [regex, testString]);

    // Highlight logic
    const renderHighlightedText = () => {
        if (!regex || matches.length === 0) return <span className="text-slate-500">{testString}</span>;

        const elements = [];
        let lastIndex = 0;

        matches.forEach((match, i) => {
            // Text before match
            if (match.index > lastIndex) {
                elements.push(<span key={`text-${i}`}>{testString.slice(lastIndex, match.index)}</span>);
            }
            // Match
            elements.push(
                <mark key={`match-${i}`} className="bg-teal-200 dark:bg-teal-900/50 text-teal-900 dark:text-teal-100 rounded px-0.5 border-b-2 border-teal-500 cursor-help" title={`Match ${i + 1}`}>
                    {match[0]}
                </mark>
            );
            lastIndex = match.index + match[0].length;
        });

        // Remaining text
        if (lastIndex < testString.length) {
            elements.push(<span key="text-end">{testString.slice(lastIndex)}</span>);
        }

        return <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">{elements}</div>;
    };

    const toggleFlag = (flag: string) => {
        setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag);
    };

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Tester Area */}
            <div className="lg:col-span-2 space-y-6">

                {/* Regex Input */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group focus-within:ring-2 ring-teal-500/20 transition-all">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Regular Expression</label>
                    <div className="flex items-center gap-2 font-mono text-lg text-slate-700 dark:text-slate-200">
                        <span className="text-slate-400 select-none">/</span>
                        <input
                            type="text"
                            value={regexStr}
                            onChange={(e) => setRegexStr(e.target.value)}
                            placeholder="Type your pattern..."
                            className="flex-grow bg-transparent border-none focus:ring-0 p-0 placeholder-slate-300 dark:placeholder-slate-700 font-medium"
                            spellCheck={false}
                        />
                        <span className="text-slate-400 select-none">/</span>
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-sm">
                            <button onClick={() => toggleFlag('g')} className={`px-2 py-0.5 rounded ${flags.includes('g') ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-600'}`} title="Global">g</button>
                            <button onClick={() => toggleFlag('i')} className={`px-2 py-0.5 rounded ${flags.includes('i') ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-600'}`} title="Case Insensitive">i</button>
                            <button onClick={() => toggleFlag('m')} className={`px-2 py-0.5 rounded ${flags.includes('m') ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold' : 'text-slate-400 hover:text-slate-600'}`} title="Multiline">m</button>
                        </div>
                    </div>
                    {error && (
                        <div className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {error}
                        </div>
                    )}
                </div>

                {/* Test String Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-500 uppercase">Test String</label>
                        <span className="text-xs text-slate-400">
                            {matches.length} match{matches.length !== 1 ? 'es' : ''} found
                        </span>
                    </div>

                    <div className="relative">
                        {/* Highlight Overlay (Rendered behind textarea if we were overlapping, but here we just show preview below/instead of textarea for interactive editing?) 
                             Actually, standard regex testers use a ContentEditable div or a backdrop.
                             Let's use a two-pane approach: One for editing, one for viewing results, OR just a big textarea for editing and a separate preview.
                             Better: Use a textarea for input, and render the highlighted text in a div that looks identical? Syncing scroll is hard.
                             Simpler approach: Textarea is the input. Below it is the "Result" view with highlighting.
                         */}
                        <textarea
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            className="w-full h-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm resize-y focus:ring-2 focus:ring-teal-500/50 outline-none text-slate-700 dark:text-slate-300"
                            placeholder="Paste your text here..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Match Result View */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <CheckCircle2 size={16} className={matches.length > 0 ? "text-teal-500" : "text-slate-400"} />
                        <span className="text-sm font-bold uppercase">Match Preview</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl min-h-[100px] overflow-auto max-h-[300px]">
                        {renderHighlightedText()}
                    </div>
                </div>

            </div>

            {/* Sidebar / Cheatsheet */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4">
                        <BookOpen size={18} className="text-teal-500" />
                        Common Patterns
                    </h3>
                    <div className="space-y-2">
                        {COMMON_REGEXES.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setRegexStr(item.pattern)}
                                className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group flex flex-col items-start border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            >
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                    {item.label}
                                </span>
                                <span className="text-xs text-slate-400 mt-0.5 truncate w-full" title={item.desc}>
                                    {item.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl p-6 border border-teal-100 dark:border-teal-800/30">
                    <h4 className="flex items-center gap-2 font-bold text-teal-800 dark:text-teal-400 mb-2">
                        <Info size={16} /> Quick Tips
                    </h4>
                    <ul className="text-xs space-y-2 text-teal-700 dark:text-teal-500 font-mono">
                        <li className="flex gap-2"><span className="font-bold text-teal-600">.</span> Any character except newline</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">\d</span> Digit (0-9)</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">\w</span> Word char (a-z, A-Z, 0-9, _)</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">\s</span> Whitespace (space, tab, newline)</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">^</span> Start of string</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">$</span> End of string</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">*</span> 0 or more</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">+</span> 1 or more</li>
                        <li className="flex gap-2"><span className="font-bold text-teal-600">?</span> 0 or 1</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default RegexTester;
