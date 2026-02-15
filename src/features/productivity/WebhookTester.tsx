import React from 'react';
import { Webhook, RefreshCw, Trash2 } from 'lucide-react';
import { useWebhookTester } from './useWebhookTester';

const WebhookTester: React.FC = () => {
    const { webhookUrl, requests, selectedRequest, setSelectedRequest, generateWebhookUrl, clearRequests, simulateWebhook } = useWebhookTester();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl"><Webhook size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Webhook Tester</h3>
                    <p className="text-sm text-slate-500">Test and debug webhook requests</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <button onClick={generateWebhookUrl} className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Generate Webhook URL</button>
                    {webhookUrl && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border">
                            <div className="text-xs font-medium text-slate-500 mb-1">Your Webhook URL:</div>
                            <div className="font-mono text-sm break-all">{webhookUrl}</div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button onClick={simulateWebhook} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Simulate Request</button>
                        <button onClick={clearRequests} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><Trash2 size={16} /></button>
                    </div>
                    <div className="space-y-2 max-h-[400px] overflow-auto">
                        <div className="text-sm font-medium">Requests ({requests.length})</div>
                        {requests.map(r => (
                            <div key={r.id} onClick={() => setSelectedRequest(r)} className={`p-3 rounded-lg border cursor-pointer ${selectedRequest?.id === r.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-50 dark:bg-slate-950'}`}>
                                <div className="flex justify-between items-start">
                                    <span className="font-medium text-sm">{r.method}</span>
                                    <span className="text-xs text-slate-500">{new Date(r.timestamp).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {selectedRequest ? (
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Headers</div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-xs">{JSON.stringify(selectedRequest.headers, null, 2)}</div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Body</div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-xs max-h-[300px] overflow-auto">{selectedRequest.body}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">Select a request to view details</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebhookTester;
