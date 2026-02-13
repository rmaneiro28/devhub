import React, { useState, useEffect } from 'react';
import { Keyboard, Command, Delete, ArrowUp } from 'lucide-react';

const KeycodeInfo: React.FC = () => {
    const [eventInfo, setEventInfo] = useState<KeyboardEvent | null>(null);
    const [history, setHistory] = useState<KeyboardEvent[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            setEventInfo(e);
            setHistory(prev => [e, ...prev].slice(0, 10));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Initial dummy event for visual check if none
    const displayedEvent = eventInfo || { key: 'Press a Key', keyCode: 0, code: 'Waiting...', which: 0, location: 0 } as any;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-lime-100 dark:bg-lime-900/30 text-lime-600 rounded-xl">
                    <Keyboard size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">JavaScript Keycodes</h3>
                    <p className="text-sm text-slate-500">Press any key to get its JS event info</p>
                </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center relative bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {!eventInfo && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-800 font-black text-6xl md:text-9xl uppercase tracking-tighter opacity-20 pointer-events-none select-none">
                        Press Any Key
                    </div>
                )}

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl p-6">

                    {/* Main Key Card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 aspect-square md:aspect-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center group transition-all hover:scale-[1.02]">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">event.key</span>
                        <div className="text-8xl md:text-9xl font-black text-slate-900 dark:text-white mb-4">
                            {displayedEvent.key === ' ' ? 'Space' : displayedEvent.key}
                        </div>
                        <div className="text-slate-400 font-mono text-sm">{displayedEvent.code}</div>
                    </div>

                    {/* Meta Cards */}
                    <Card label="event.which" value={displayedEvent.which} sub="Deprecated but used" />
                    <Card label="event.code" value={displayedEvent.code} sub="Physical Key" />
                    <Card label="event.location" value={displayedEvent.location} sub="Standard = 0" />

                    {/* Modifiers */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modifiers</span>
                        <div className="flex gap-2 mt-4">
                            <ModifierKey label="Shift" active={eventInfo?.shiftKey} />
                            <ModifierKey label="Ctrl" active={eventInfo?.ctrlKey} />
                            <ModifierKey label="Alt" active={eventInfo?.altKey} />
                            <ModifierKey label="Meta" active={eventInfo?.metaKey} />
                        </div>
                    </div>
                </div>

                {/* History */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent p-6 flex items-center justify-center gap-4 overflow-hidden mask-linear-fade">
                    {history.slice(1).map((e, i) => (
                        <div key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 font-mono text-sm font-bold opacity-60">
                            {e.key === ' ' ? 'Space' : e.key}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Card = ({ label, value, sub }: { label: string, value: string | number, sub?: string }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
        <div className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-1">{value}</div>
        {sub && <span className="text-[10px] text-slate-400 font-medium">{sub}</span>}
    </div>
);

const ModifierKey = ({ label, active }: { label: string, active?: boolean }) => (
    <div className={`px-2 py-1 rounded text-xs font-bold border ${active ? 'bg-lime-500 text-white border-lime-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'}`}>
        {label}
    </div>
);

export default KeycodeInfo;
