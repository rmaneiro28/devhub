
import { useState } from 'react';

export const useQrGenerator = () => {
    const [input, setInput] = useState('');
    const [size, setSize] = useState(256);
    const [qrValue, setQrValue] = useState('');

    const generate = () => {
        setQrValue(input);
    };

    const download = () => {
        const svg = document.getElementById("qr-code-svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            // Draw white background
            if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = "qr-code.png";
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return {
        input, setInput,
        size, setSize,
        qrValue,
        generate,
        download
    };
};
