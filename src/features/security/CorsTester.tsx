import React from 'react';
import { Globe, Play, CheckCircle, XCircle } from 'lucide-react';
import { useCorsTester } from './useCorsTester';

const CorsTester: React.FC = () => {
    const { url, setUrl, method, setMethod, headers, setHeaders, result, loading, testCors } = useCorsTester();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-xl"><Globe size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">CORS Tester</h3>
                    <p className="text-sm text-slate-500">Test Cross-Origin Resource Sharing configurations</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <textarea value={headers} onChange={(e) => setHeaders(e.target.value)} placeholder="Custom headers (one per line)&#10;Content-Type: application/json&#10;Authorization: Bearer token" className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-sm resize-none" />
                    <button onClick={testCors} disabled={loading} className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2 disabled:opacity-50">
                        <Play size={20} /> {loading ? 'Testing...' : 'Test CORS'}
                    </button>
                </div>
                <div>
                    {result && (
                        <div className={`p-6 rounded-lg ${result.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                            <div className="flex items-center gap-2 mb-4">
                                {result.success ? <CheckCircle className="text-green-600" size={24} /> : <XCircle className="text-red-600" size={24} />}
                                <h4 className={`font-medium ${result.success ? 'text-green-600' : 'text-red-600'}`}>{result.message}</h4>
                            </div>
                            {result.details && (
                                <div className="mt-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Details</div>
                                    <pre className="p-3 bg-white dark:bg-slate-900 rounded-lg border font-mono text-xs overflow-auto max-h-[300px]">{JSON.stringify(result.details, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CorsTester;
