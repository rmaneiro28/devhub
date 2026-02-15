
import { useState, useCallback } from 'react';

export type Mode = 'encode' | 'decode';

export const useUrlEncoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<Mode>('encode');
    const [error, setError] = useState<string | null>(null);

    const process = useCallback((text: string, currentMode: Mode) => {
        try {
            if (!text) {
                setOutput('');
                setError(null);
                return;
            }

            if (currentMode === 'encode') {
                setOutput(encodeURIComponent(text));
                setError(null);
            } else {
                setOutput(decodeURIComponent(text));
                setError(null);
            }
        } catch (e: any) {
            setOutput('');
            setError('Error: ' + e.message);
        }
    }, []);

    const handleInput = (text: string) => {
        setInput(text);
        process(text, mode);
    };

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode);
        process(input, newMode);
    };

    const copyToClipboard = useCallback(() => {
        if (output) {
            navigator.clipboard.writeText(output);
        }
    }, [output]);

    return {
        input,
        setInput: handleInput,
        output, // Output is derived/calculated but stored in state for simplicity with error handling
        mode,
        setMode: handleModeChange,
        error,
        copyToClipboard
    };
};
