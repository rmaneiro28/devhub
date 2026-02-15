import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { usePomodoroTimer } from './usePomodoroTimer';

const PomodoroTimer: React.FC = () => {
    const {
        minutes,
        seconds,
        isActive,
        mode,
        workDuration,
        setWorkDuration,
        breakDuration,
        setBreakDuration,
        toggle,
        reset
    } = usePomodoroTimer();

    const progress = mode === 'work'
        ? ((workDuration * 60 - (minutes * 60 + seconds)) / (workDuration * 60)) * 100
        : ((breakDuration * 60 - (minutes * 60 + seconds)) / (breakDuration * 60)) * 100;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pomodoro Timer</h3>
                    <p className="text-sm text-slate-500">Stay focused with the Pomodoro Technique</p>
                </div>
            </div>

            <div className="max-w-md mx-auto space-y-8">
                {/* Timer Display */}
                <div className="text-center">
                    <div className={`text-sm font-medium mb-4 ${mode === 'work' ? 'text-red-600' : 'text-green-600'}`}>
                        {mode === 'work' ? '🎯 Work Time' : '☕ Break Time'}
                    </div>
                    <div className="text-8xl font-bold text-slate-900 dark:text-white mb-4">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all ${mode === 'work' ? 'bg-red-600' : 'bg-green-600'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={toggle}
                        className={`p-6 rounded-full ${isActive
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : 'bg-red-600 hover:bg-red-700'
                            } text-white shadow-lg`}
                    >
                        {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                    <button
                        onClick={reset}
                        className="p-6 rounded-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg"
                    >
                        <RotateCcw size={32} />
                    </button>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Work Duration (min)</label>
                        <input
                            type="number"
                            value={workDuration}
                            onChange={(e) => setWorkDuration(Number(e.target.value))}
                            disabled={isActive}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Break Duration (min)</label>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={(e) => setBreakDuration(Number(e.target.value))}
                            disabled={isActive}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
