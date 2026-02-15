import React from 'react';
import { Key, Copy, Check, Shield, AlertCircle } from 'lucide-react';
import { useJwtGenerator } from './useJwtGenerator';

const JwtGenerator: React.FC = () => {
    const {
        mode,
        setMode,
        payload,
        setPayload,
        secret,
        setSecret,
        algorithm,
        setAlgorithm,
        token,
        setToken,
        decoded,
        error,
        generateToken,
        verifyToken,
        decodeWithoutVerify
    } = useJwtGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                    <Key size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">JWT Generator & Verifier</h3>
                    <p className="text-sm text-slate-500">Generate and verify JSON Web Tokens</p>
                </div>
            </div>

            {/* Mode Selection */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={() => setMode('generate')}
                    className={`px-6 py-3 rounded-lg font-medium ${mode === 'generate'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Generate JWT
                </button>
                <button
                    onClick={() => setMode('verify')}
                    className={`px-6 py-3 rounded-lg font-medium ${mode === 'verify'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Verify JWT
                </button>
            </div>

            {mode === 'generate' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Generate Mode */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Payload (JSON)</label>
                            <textarea
                                value={payload}
                                onChange={(e) => setPayload(e.target.value)}
                                className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Algorithm</label>
                                <select
                                    value={algorithm}
                                    onChange={(e) => setAlgorithm(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                >
                                    <option value="HS256">HS256</option>
                                    <option value="HS384">HS384</option>
                                    <option value="HS512">HS512</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Secret Key</label>
                                <input
                                    type="text"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={generateToken}
                            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                        >
                            <Shield size={20} />
                            Generate Token
                        </button>
                    </div>

                    {/* Output */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Generated JWT</label>
                            {token && (
                                <button
                                    onClick={() => handleCopy(token)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                            )}
                        </div>
                        <div className="h-[300px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                            {error ? (
                                <div className="flex items-start gap-2 text-red-500">
                                    <AlertCircle size={16} className="mt-1" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            ) : (
                                <pre className="font-mono text-sm break-all whitespace-pre-wrap">
                                    {token || 'Token will appear here...'}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Verify Mode */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">JWT Token</label>
                            <textarea
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Paste JWT token here..."
                                className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Secret Key (for verification)</label>
                            <input
                                type="text"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={verifyToken}
                                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Verify Token
                            </button>
                            <button
                                onClick={decodeWithoutVerify}
                                className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                            >
                                Decode Only
                            </button>
                        </div>
                    </div>

                    {/* Decoded Output */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Decoded Payload</label>
                        <div className="h-[300px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                            {error ? (
                                <div className="flex items-start gap-2 text-red-500">
                                    <AlertCircle size={16} className="mt-1" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            ) : (
                                <pre className="font-mono text-sm">
                                    {decoded || 'Decoded payload will appear here...'}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JwtGenerator;
