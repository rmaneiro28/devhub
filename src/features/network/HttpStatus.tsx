import React, { useState } from 'react';
import { Search, Cat, Dog, ExternalLink } from 'lucide-react';

const HttpStatus: React.FC = () => {
    const [mode, setMode] = useState<'cat' | 'dog'>('cat');
    const [search, setSearch] = useState('');
    const [selectedCode, setSelectedCode] = useState<number | null>(null);

    const codes = [
        { code: 100, title: "Continue" }, { code: 101, title: "Switching Protocols" }, { code: 102, title: "Processing" },
        { code: 200, title: "OK" }, { code: 201, title: "Created" }, { code: 202, title: "Accepted" }, { code: 204, title: "No Content" }, { code: 206, title: "Partial Content" },
        { code: 300, title: "Multiple Choices" }, { code: 301, title: "Moved Permanently" }, { code: 302, title: "Found" }, { code: 304, title: "Not Modified" }, { code: 307, title: "Temporary Redirect" },
        { code: 400, title: "Bad Request" }, { code: 401, title: "Unauthorized" }, { code: 402, title: "Payment Required" }, { code: 403, title: "Forbidden" }, { code: 404, title: "Not Found" },
        { code: 405, title: "Method Not Allowed" }, { code: 406, title: "Not Acceptable" }, { code: 408, title: "Request Timeout" }, { code: 409, title: "Conflict" }, { code: 410, title: "Gone" }, { code: 418, title: "I'm a teapot" }, { code: 429, title: "Too Many Requests" },
        { code: 500, title: "Internal Server Error" }, { code: 501, title: "Not Implemented" }, { code: 502, title: "Bad Gateway" }, { code: 503, title: "Service Unavailable" }, { code: 504, title: "Gateway Timeout" }
    ];

    const filteredCodes = codes.filter(c =>
        c.code.toString().includes(search) || c.title.toLowerCase().includes(search.toLowerCase())
    );

    const getImage = (code: number) => `https://http.${mode}/${code}.jpg`;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                        {mode === 'cat' ? <Cat size={24} /> : <Dog size={24} />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">HTTP Status {mode === 'cat' ? 'Cats' : 'Dogs'}</h3>
                        <p className="text-sm text-slate-500">Visual API debugging... with pets</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search 404, OK..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex shrink-0">
                        <button onClick={() => setMode('cat')} className={`p-2 rounded ${mode === 'cat' ? 'bg-white dark:bg-slate-700 shadow text-amber-600' : 'text-slate-400'}`}><Cat size={18} /></button>
                        <button onClick={() => setMode('dog')} className={`p-2 rounded ${mode === 'dog' ? 'bg-white dark:bg-slate-700 shadow text-amber-600' : 'text-slate-400'}`}><Dog size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 flex-grow overflow-hidden">
                {/* Grid */}
                <div className="flex-grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto custom-scrollbar content-start">
                    {filteredCodes.map((item) => (
                        <button
                            key={item.code}
                            onClick={() => setSelectedCode(item.code)}
                            className={`flex flex-col items-center p-4 rounded-xl border transition-all ${selectedCode === item.code ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 ring-1 ring-amber-500' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700'}`}
                        >
                            <span className={`text-2xl font-black mb-1 ${item.code >= 500 ? 'text-red-500' : item.code >= 400 ? 'text-orange-500' : item.code >= 300 ? 'text-blue-500' : 'text-green-500'}`}>{item.code}</span>
                            <span className="text-xs font-bold text-slate-500 text-center">{item.title}</span>
                        </button>
                    ))}
                </div>

                {/* Preview */}
                <div className="hidden lg:flex w-1/3 flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative shadow-2xl">
                    {selectedCode ? (
                        <>
                            <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10">
                                {selectedCode} - {codes.find(c => c.code === selectedCode)?.title}
                            </div>
                            <img
                                src={getImage(selectedCode)}
                                alt={`HTTP ${selectedCode}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors" onClick={() => window.open(getImage(selectedCode), '_blank')}>
                                <ExternalLink size={16} className="text-white" />
                            </div>
                        </>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-slate-700 p-8 text-center">
                            <Cat size={48} className="mb-4 opacity-50" />
                            <p className="text-sm font-medium">Select a status code to view the {mode}.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Modal for Preview (Simplified as just replacement for now or omitted for speed) */}
        </div>
    );
};

export default HttpStatus;
