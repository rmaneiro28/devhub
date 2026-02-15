import { useState } from 'react';
import { format } from 'sql-formatter';

export const useSqlFormatter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const formatSql = () => {
        if (!input) {
            setOutput('');
            return;
        }

        try {
            const formatted = format(input, {
                language: 'sql',
                tabWidth: 2,
                keywordCase: 'upper'
            });
            setOutput(formatted);
            setError(null);
        } catch (err) {
            setError('Invalid SQL syntax');
            console.error(err);
        }
    };

    const minify = () => {
        if (!input) return;
        const minified = input.replace(/\s+/g, ' ').trim();
        setOutput(minified);
        setError(null);
    };

    return {
        input,
        setInput,
        output,
        error,
        formatSql,
        minify
    };
};
