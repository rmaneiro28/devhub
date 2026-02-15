import { useState } from 'react';

const SCALE_RATIOS = {
    'Minor Second': 1.067,
    'Major Second': 1.125,
    'Minor Third': 1.2,
    'Major Third': 1.25,
    'Perfect Fourth': 1.333,
    'Augmented Fourth': 1.414,
    'Perfect Fifth': 1.5,
    'Golden Ratio': 1.618
};

const SCALE_STEPS = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];

export const useTypographyScale = () => {
    const [baseSize, setBaseSize] = useState(16);
    const [ratio, setRatio] = useState<keyof typeof SCALE_RATIOS>('Perfect Fourth');
    const [unit, setUnit] = useState<'px' | 'rem'>('rem');

    const generateScale = () => {
        const ratioValue = SCALE_RATIOS[ratio];
        const baseIndex = SCALE_STEPS.indexOf('base');

        return SCALE_STEPS.map((step, index) => {
            const power = index - baseIndex;
            const size = baseSize * Math.pow(ratioValue, power);
            const value = unit === 'rem' ? (size / 16).toFixed(3) : Math.round(size).toString();

            return {
                step,
                size: parseFloat(value),
                unit,
                formatted: `${value}${unit}`
            };
        });
    };

    const scale = generateScale();

    const generateCSS = () => {
        return scale.map(({ step, formatted }) =>
            `  --font-size-${step}: ${formatted};`
        ).join('\n');
    };

    const generateTailwind = () => {
        const config = scale.reduce((acc, { step, size }) => {
            acc[step] = `${size}${unit}`;
            return acc;
        }, {} as Record<string, string>);

        return `fontSize: ${JSON.stringify(config, null, 2)}`;
    };

    return {
        baseSize,
        setBaseSize,
        ratio,
        setRatio,
        unit,
        setUnit,
        scale,
        generateCSS,
        generateTailwind,
        ratios: Object.keys(SCALE_RATIOS) as (keyof typeof SCALE_RATIOS)[]
    };
};
