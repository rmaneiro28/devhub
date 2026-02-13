
import React, { useState } from 'react';
import { Key } from 'lucide-react';

const JwtDecoder: React.FC = () => {
    // A simplified JWT decode (base64 decode of parts)
    const [token, setToken] = useState('');
    const [header, setHeader] = useState('{}');
    const [payload, setPayload] = useState('{}');

    const decode = (t: string) => {
        setToken(t);
        try {
            const parts = t.split('.');
            if (parts.length !== 3) {
                setHeader('Invalid token format');
                setPayload('');
                return;
            }

            const decodePart = (str: string) => {
                const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                return decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            };

            setHeader(JSON.stringify(JSON.parse(decodePart(parts[0])), null, 2));
            setPayload(JSON.stringify(JSON.parse(decodePart(parts[1])), null, 2));
        } catch (e) {
            setHeader('Error decoding');
            setPayload('');
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                    <Key size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">JWT Decoder</h3>
                    <p className="text-sm text-slate-500">Client-side only. Your tokens never leave your browser.</p>
                </div>
            </div>

            <div className="mb-8">
                <label className="text-xs font-bold text-slate-400 uppercase mb-2">JWT Token</label>
                <textarea
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 break-all"
                    rows={3}
                    placeholder="eyJh..."
                    value={token}
                    onChange={(e) => decode(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">Header</label>
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[200px]">
                        <pre className="text-amber-500 font-mono text-xs whitespace-pre-wrap">{header}</pre>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">Payload</label>
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[200px]">
                        <pre className="text-blue-400 font-mono text-xs whitespace-pre-wrap">{payload}</pre>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default JwtDecoder;
