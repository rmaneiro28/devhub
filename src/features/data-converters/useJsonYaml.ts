import { useState, useEffect } from 'react';
import * as yaml from 'js-yaml';

export const useJsonYaml = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!input) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            if (mode === 'json-to-yaml') {
                const parsed = JSON.parse(input);
                const yamlStr = yaml.dump(parsed);
                setOutput(yamlStr);
                setError(null);
            } else {
                const parsed = yaml.load(input);
                const jsonStr = JSON.stringify(parsed, null, 2);
                setOutput(jsonStr);
                setError(null);
            }
        } catch (err) {
            setError(`Invalid ${mode === 'json-to-yaml' ? 'JSON' : 'YAML'} format`);
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
