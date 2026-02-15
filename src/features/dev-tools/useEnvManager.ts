import { useState } from 'react';

interface EnvVariable {
    key: string;
    value: string;
    comment?: string;
}

export const useEnvManager = () => {
    const [variables, setVariables] = useState<EnvVariable[]>([
        { key: '', value: '', comment: '' }
    ]);
    const [format, setFormat] = useState<'.env' | 'json' | 'yaml'>('.env');

    const addVariable = () => {
        setVariables([...variables, { key: '', value: '', comment: '' }]);
    };

    const updateVariable = (index: number, field: keyof EnvVariable, value: string) => {
        const newVars = [...variables];
        newVars[index] = { ...newVars[index], [field]: value };
        setVariables(newVars);
    };

    const removeVariable = (index: number) => {
        setVariables(variables.filter((_, i) => i !== index));
    };

    const generate = (): string => {
        const validVars = variables.filter(v => v.key);

        if (format === '.env') {
            return validVars.map(v => {
                const comment = v.comment ? `# ${v.comment}\n` : '';
                return `${comment}${v.key}=${v.value}`;
            }).join('\n\n');
        } else if (format === 'json') {
            const obj: Record<string, string> = {};
            validVars.forEach(v => {
                obj[v.key] = v.value;
            });
            return JSON.stringify(obj, null, 2);
        } else {
            return validVars.map(v => {
                const comment = v.comment ? `# ${v.comment}\n` : '';
                return `${comment}${v.key}: "${v.value}"`;
            }).join('\n');
        }
    };

    const downloadFile = () => {
        const content = generate();
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = format === '.env' ? '.env' : format === 'json' ? 'env.json' : 'env.yaml';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        variables,
        format,
        setFormat,
        addVariable,
        updateVariable,
        removeVariable,
        generate,
        downloadFile
    };
};
