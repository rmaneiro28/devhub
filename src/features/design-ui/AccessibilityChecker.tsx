import React from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { useAccessibilityChecker } from './useAccessibilityChecker';

const AccessibilityChecker: React.FC = () => {
    const {
        foreground,
        setForeground,
        background,
        setBackground,
        result,
        grade,
        swapColors
    } = useAccessibilityChecker();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
                    <Eye size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Accessibility Checker</h3>
                    <p className="text-sm text-slate-500">Check color contrast for WCAG compliance</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Color Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Foreground Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={foreground}
                                onChange={(e) => setForeground(e.target.value)}
                                className="w-16 h-12 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={foreground}
                                onChange={(e) => setForeground(e.target.value)}
                                className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono uppercase"
                                placeholder="#000000"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={swapColors}
                            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                            title="Swap colors"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Background Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                className="w-16 h-12 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono uppercase"
                                placeholder="#FFFFFF"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800" style={{ backgroundColor: background }}>
                        <h4 className="text-2xl font-bold mb-2" style={{ color: foreground }}>
                            Sample Heading
                        </h4>
                        <p className="text-base" style={{ color: foreground }}>
                            The quick brown fox jumps over the lazy dog. This is sample text to preview the color contrast.
                        </p>
                        <p className="text-sm mt-2" style={{ color: foreground }}>
                            Small text example for testing readability.
                        </p>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="text-center mb-6">
                            <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">
                                {result.ratio}:1
                            </div>
                            <div className={`inline-block px-4 py-2 rounded-lg font-bold ${grade === 'AAA' ? 'bg-green-100 text-green-700' :
                                    grade === 'AA' ? 'bg-blue-100 text-blue-700' :
                                        grade === 'AA Large' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                }`}>
                                {grade}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg">
                                <span className="font-medium">WCAG AA (Normal Text)</span>
                                <span className={`px-3 py-1 rounded text-sm font-bold ${result.aa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {result.aa ? 'Pass' : 'Fail'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg">
                                <span className="font-medium">WCAG AA (Large Text)</span>
                                <span className={`px-3 py-1 rounded text-sm font-bold ${result.aaaLarge ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {result.aaaLarge ? 'Pass' : 'Fail'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg">
                                <span className="font-medium">WCAG AAA</span>
                                <span className={`px-3 py-1 rounded text-sm font-bold ${result.aaa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {result.aaa ? 'Pass' : 'Fail'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Guidelines */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium mb-2 text-sm">WCAG Guidelines:</h4>
                        <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                            <li>• <strong>AA Normal:</strong> 4.5:1 minimum (18px or smaller)</li>
                            <li>• <strong>AA Large:</strong> 3:1 minimum (24px+ or 19px+ bold)</li>
                            <li>• <strong>AAA:</strong> 7:1 minimum (enhanced contrast)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityChecker;
