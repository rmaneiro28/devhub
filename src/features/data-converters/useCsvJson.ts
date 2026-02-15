import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useCsvJson = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'csv-to-json' | 'json-to-csv'>('csv-to-json');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!input) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            if (mode === 'csv-to-json') {
                const result = Papa.parse(input, { header: true });
                if (result.errors.length > 0) {
                    setError('Invalid CSV format');
                    setOutput('');
                } else {
                    setOutput(JSON.stringify(result.data, null, 2));
                    setError(null);
                }
            } else {
                const parsed = JSON.parse(input);
                const csv = Papa.unparse(parsed);
                setOutput(csv);
                setError(null);
            }
        } catch (err) {
            setError(`Invalid ${mode === 'csv-to-json' ? 'CSV' : 'JSON'} format`);
            setOutput('');
        }
    }, [input, mode]);

    return {
        input,
        setInput,
        output,
        mode,
        setMode,
        error
    };
};
