import { useState, useEffect } from 'react';

export const useHtmlEncoder = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [output, setOutput] = useState('');

    useEffect(() => {
        if (!input) {
            setOutput('');
            return;
        }

        if (mode === 'encode') {
            const textarea = document.createElement('textarea');
            textarea.textContent = input;
            setOutput(textarea.innerHTML);
        } else {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = input;
            setOutput(textarea.textContent);
        }
    }, [input, mode]);

    return {
        input,
        setInput,
        mode,
        setMode,
        output
    };
};
