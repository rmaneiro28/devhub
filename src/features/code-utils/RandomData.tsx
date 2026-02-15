import React from 'react';
import { Shuffle, Copy, RefreshCw } from 'lucide-react';
import { useRandomData, DataType } from './useRandomData';

const RandomData: React.FC = () => {
    const { dataType, setDataType, count, setCount, results, generate, copyAll } = useRandomData();

    const dataTypes: { value: DataType; label: string }[] = [
        { value: 'name', label: 'Full Name' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'address', label: 'Address' },
        { value: 'company', label: 'Company' },
        { value: 'lorem', label: 'Lorem Ipsum' },
        { value: 'uuid', label: 'UUID' },
        { value: 'number', label: 'Number' }
    ];

    React.useEffect(() => {
        generate();
    }, []);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl">
                    <Shuffle size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Random Data Generator</h3>
                    <p className="text-sm text-slate-500">Generate fake data for testing</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Data Type</label>
                    <select
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value as DataType)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                    >
                        {dataTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Count: {count}</label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={generate}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center gap-2"
                >
                    <RefreshCw size={16} />
                    Generate
                </button>
                {results.length > 0 && (
                    <button
                        onClick={copyAll}
                        className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2"
                    >
                        <Copy size={16} />
                        Copy All
                    </button>
                )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex-1 overflow-auto custom-scrollbar">
                {results.length > 0 ? (
                    <ul className="space-y-2 font-mono text-sm">
                        {results.map((item, index) => (
                            <li key={index} className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-400 text-center">Click generate to create random data</p>
                )}
            </div>
        </div>
    );
};

export default RandomData;
