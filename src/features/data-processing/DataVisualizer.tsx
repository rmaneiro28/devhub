import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useDataVisualizer, ChartType } from './useDataVisualizer';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const DataVisualizer: React.FC = () => {
    const {
        input,
        setInput,
        data,
        chartType,
        setChartType,
        error,
        keys,
        selectedXKey,
        setSelectedXKey,
        selectedYKey,
        setSelectedYKey,
        parseData,
        reset
    } = useDataVisualizer();

    const chartTypes: { value: ChartType; label: string }[] = [
        { value: 'bar', label: 'Bar Chart' },
        { value: 'line', label: 'Line Chart' },
        { value: 'pie', label: 'Pie Chart' },
        { value: 'area', label: 'Area Chart' }
    ];

    const renderChart = () => {
        if (data.length === 0) return null;

        const commonProps = {
            data,
            margin: { top: 5, right: 30, left: 20, bottom: 5 }
        };

        switch (chartType) {
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={selectedXKey} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={selectedYKey} fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={selectedXKey} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey={selectedYKey} stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey={selectedYKey}
                                nameKey={selectedXKey}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'area':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={selectedXKey} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey={selectedYKey} stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        </AreaChart>
                    </ResponsiveContainer>
                );
        }
    };

    React.useEffect(() => {
        if (input) {
            parseData();
        }
    }, [input]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl">
                    <BarChart3 size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Data Visualizer</h3>
                    <p className="text-sm text-slate-500">Create charts from JSON or CSV data</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                            Paste JSON or CSV Data
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`JSON: [{"name": "A", "value": 100}, ...]\nCSV: name,value\\nA,100\\nB,200`}
                            className="w-full h-[300px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    {data.length > 0 && (
                        <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                    Chart Type
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {chartTypes.map(({ value, label }) => (
                                        <button
                                            key={value}
                                            onClick={() => setChartType(value)}
                                            className={`px-3 py-2 rounded-lg text-sm ${chartType === value
                                                    ? 'bg-cyan-600 text-white'
                                                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                        X-Axis
                                    </label>
                                    <select
                                        value={selectedXKey}
                                        onChange={(e) => setSelectedXKey(e.target.value)}
                                        className="w-full p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    >
                                        {keys.map(key => (
                                            <option key={key} value={key}>{key}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                        Y-Axis
                                    </label>
                                    <select
                                        value={selectedYKey}
                                        onChange={(e) => setSelectedYKey(e.target.value)}
                                        className="w-full p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    >
                                        {keys.map(key => (
                                            <option key={key} value={key}>{key}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={reset}
                                className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </div>

                {/* Chart Display */}
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                        Visualization
                    </label>
                    <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[400px] flex items-center justify-center">
                        {data.length > 0 ? (
                            renderChart()
                        ) : (
                            <p className="text-slate-400 text-sm">Paste data to visualize...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataVisualizer;
