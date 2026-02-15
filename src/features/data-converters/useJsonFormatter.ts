
import { useState, useCallback } from 'react';

export const useJsonFormatter = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const format = useCallback(() => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (e: any) {
            setError('Invalid JSON: ' + e.message);
        }
    }, [input]);

    const minify = useCallback(() => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (e: any) {
            setError('Invalid JSON: ' + e.message);
        }
    }, [input]);

    const validate = useCallback(() => {
        try {
            if (!input.trim()) {
                setError('Empty input');
                return;
            }
            JSON.parse(input);
            setError(null);
            // Optionally could set a success message state, but clearing error implies valid
        } catch (e: any) {
            setError('Invalid JSON: ' + e.message);
        }
    }, [input]);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [input]);

    return {
        input,
        setInput,
        error,
        setError,
        format,
        minify,
        validate,
        copied,
        copyToClipboard
    };
};
