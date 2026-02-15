import { useState } from 'react';

export const usePlaceholderGenerator = () => {
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(300);
    const [bgColor, setBgColor] = useState('#cccccc');
    const [textColor, setTextColor] = useState('#333333');
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(24);

    const generatePlaceholder = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) return '';

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Text
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const displayText = text || `${width} × ${height}`;
        ctx.fillText(displayText, width / 2, height / 2);

        return canvas.toDataURL('image/png');
    };

    const download = () => {
        const dataUrl = generatePlaceholder();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `placeholder-${width}x${height}.png`;
        a.click();
    };

    return {
        width, setWidth,
        height, setHeight,
        bgColor, setBgColor,
        textColor, setTextColor,
        text, setText,
        fontSize, setFontSize,
        generatePlaceholder,
        download
    };
};
