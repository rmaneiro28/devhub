import { useState } from 'react';

interface ContrastResult {
    ratio: number;
    aa: boolean;
    aaaLarge: boolean;
    aaa: boolean;
}

export const useAccessibilityChecker = () => {
    const [foreground, setForeground] = useState('#000000');
    const [background, setBackground] = useState('#FFFFFF');

    const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
    };

    const getLuminance = (r: number, g: number, b: number): number => {
        const [rs, gs, bs] = [r, g, b].map((c) => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const getContrastRatio = (fg: string, bg: string): number => {
        const fgRgb = hexToRgb(fg);
        const bgRgb = hexToRgb(bg);

        if (!fgRgb || !bgRgb) return 0;

        const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
        const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

        const lighter = Math.max(fgLum, bgLum);
        const darker = Math.min(fgLum, bgLum);

        return (lighter + 0.05) / (darker + 0.05);
    };

    const checkContrast = (): ContrastResult => {
        const ratio = getContrastRatio(foreground, background);

        return {
            ratio: Math.round(ratio * 100) / 100,
            aa: ratio >= 4.5,
            aaaLarge: ratio >= 3,
            aaa: ratio >= 7
        };
    };

    const result = checkContrast();

    const getGrade = (): string => {
        if (result.aaa) return 'AAA';
        if (result.aa) return 'AA';
        if (result.aaaLarge) return 'AA Large';
        return 'Fail';
    };

    const swapColors = () => {
        const temp = foreground;
        setForeground(background);
        setBackground(temp);
    };

    return {
        foreground,
        setForeground,
        background,
        setBackground,
        result,
        grade: getGrade(),
        swapColors
    };
};
