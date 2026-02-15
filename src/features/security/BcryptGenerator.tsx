import React from 'react';
import { Lock, Copy, Check, Shield } from 'lucide-react';
import { useBcryptGenerator } from './useBcryptGenerator';

const BcryptGenerator: React.FC = () => {
    const {
        input,
        setInput,
        hash,
        rounds,
        setRounds,
        generateHash,
        compareInput,
        setCompareInput,
        compareHash: compareHashValue,
        setCompareHash,
        compareResult,
        compareHash
    } = useBcryptGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                    <Lock size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bcrypt Hash Generator</h3>
                    <p className="text-sm text-slate-500">Generate and verify bcrypt password hashes</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Generate Hash */}
                <div className="space-y-4">
                    <h4 className="font-medium">Generate Hash</h4>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Password</label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter password to hash"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Salt Rounds: {rounds}</label>
                        <input
                            type="range"
                            min="4"
                            max="12"
                            value={rounds}
                            onChange={(e) => setRounds(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <button
                        onClick={generateHash}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Generate Hash
                    </button>
                    {hash && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Hash</label>
                                <button onClick={handleCopy} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs break-all">
                                {hash}
                            </div>
                        </div>
                    )}
                </div>

                {/* Compare Hash */}
                <div className="space-y-4">
                    <h4 className="font-medium">Verify Hash</h4>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Password</label>
                        <input
                            type="text"
                            value={compareInput}
                            onChange={(e) => setCompareInput(e.target.value)}
                            placeholder="Enter password"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Hash to Compare</label>
                        <textarea
                            value={compareHashValue}
                            onChange={(e) => setCompareHash(e.target.value)}
                            placeholder="Paste hash here"
                            className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs resize-none"
                        />
                    </div>
                    <button
                        onClick={compareHash}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                    >
                        <Shield size={20} />
                        Verify
                    </button>
                    {compareResult !== null && (
                        <div className={`p-4 rounded-lg ${compareResult ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600'}`}>
                            {compareResult ? '✓ Password matches!' : '✗ Password does not match'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BcryptGenerator;
