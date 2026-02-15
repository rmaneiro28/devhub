
import { useState } from 'react';

export type Mode = 'simple' | 'fancy';
export type Format = 'css' | 'jsx' | 'html';
export type Unit = 'px' | '%';

export const useBorderRadius = () => {
    const [mode, setMode] = useState<Mode>('simple');
    const [format, setFormat] = useState<Format>('css');
    const [copied, setCopied] = useState(false);

    // Simple Mode State
    const [tl, setTl] = useState(10);
    const [tr, setTr] = useState(10);
    const [br, setBr] = useState(10);
    const [bl, setBl] = useState(10);
    const [unit, setUnit] = useState<Unit>('px');

    // Fancy Mode State (8 values)
    const [topAxis, setTopAxis] = useState(50);
    const [rightAxis, setRightAxis] = useState(50);
    const [bottomAxis, setBottomAxis] = useState(50);
    const [leftAxis, setLeftAxis] = useState(50);

    const getSimpleRadius = () => `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`; // top-left top-right bottom-right bottom-left

    const getFancyRadius = () => {
        // Standard Fancy generator logic (8 values)
        return `${topAxis}% ${100 - topAxis}% ${100 - bottomAxis}% ${bottomAxis}% / ${leftAxis}% ${rightAxis}% ${100 - rightAxis}% ${100 - leftAxis}%`;
    };

    const borderRadiusValue = mode === 'simple' ? getSimpleRadius() : getFancyRadius();

    const getCode = () => {
        switch (format) {
            case 'css':
                return `border-radius: ${borderRadiusValue};`;
            case 'jsx':
                return `style={{ borderRadius: '${borderRadiusValue}' }}`;
            case 'html':
                return `style="border-radius: ${borderRadiusValue};"`;
            default:
                return `border-radius: ${borderRadiusValue};`;
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        mode,
        setMode,
        format,
        setFormat,
        copied,
        setCopied,
        tl, setTl,
        tr, setTr,
        br, setBr,
        bl, setBl,
        unit, setUnit,
        topAxis, setTopAxis,
        rightAxis, setRightAxis,
        bottomAxis, setBottomAxis,
        leftAxis, setLeftAxis,
        borderRadiusValue,
        copyToClipboard,
        getCode
    };
};
