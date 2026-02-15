import React from 'react';
import { Database, Copy } from 'lucide-react';
import { useSqlQueryBuilder } from './useSqlQueryBuilder';

const SqlQueryBuilder: React.FC = () => {
    const { table, setTable, operation, setOperation, columns, setColumns, whereClause, setWhereClause, orderBy, setOrderBy, limit, setLimit, generateQuery } = useSqlQueryBuilder();
    const [copied, setCopied] = React.useState(false);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl"><Database size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">SQL Query Builder</h3>
                    <p className="text-sm text-slate-500">Build SQL queries visually</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <select value={operation} onChange={(e) => setOperation(e.target.value as any)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm">
                        <option value="SELECT">SELECT</option>
                        <option value="INSERT">INSERT</option>
                        <option value="UPDATE">UPDATE</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input type="text" value={table} onChange={(e) => setTable(e.target.value)} placeholder="Table name" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    <input type="text" value={columns.join(', ')} onChange={(e) => setColumns(e.target.value.split(',').map(c => c.trim()))} placeholder="Columns (comma separated)" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    {(operation === 'SELECT' || operation === 'UPDATE' || operation === 'DELETE') && (
                        <input type="text" value={whereClause} onChange={(e) => setWhereClause(e.target.value)} placeholder="WHERE clause (e.g., id = 1)" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    )}
                    {operation === 'SELECT' && (
                        <>
                            <input type="text" value={orderBy} onChange={(e) => setOrderBy(e.target.value)} placeholder="ORDER BY (e.g., created_at DESC)" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                            <input type="text" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="LIMIT" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                        </>
                    )}
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Generated Query</label>
                        <button onClick={() => { navigator.clipboard.writeText(generateQuery()); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Copy size={16} /></button>
                    </div>
                    <div className="h-[400px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border overflow-auto"><pre className="font-mono text-sm">{generateQuery()}</pre></div>
                </div>
            </div>
        </div>
    );
};

export default SqlQueryBuilder;
