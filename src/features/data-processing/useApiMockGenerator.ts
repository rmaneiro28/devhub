import { useState } from 'react';

interface Field {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'email' | 'uuid' | 'date' | 'name' | 'phone';
}

export const useApiMockGenerator = () => {
    const [fields, setFields] = useState<Field[]>([
        { name: 'id', type: 'uuid' },
        { name: 'name', type: 'name' },
        { name: 'email', type: 'email' }
    ]);
    const [count, setCount] = useState(10);
    const [output, setOutput] = useState('');

    const addField = () => {
        setFields([...fields, { name: 'newField', type: 'string' }]);
    };

    const updateField = (index: number, field: Partial<Field>) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], ...field };
        setFields(newFields);
    };

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const generateValue = (type: Field['type']): any => {
        switch (type) {
            case 'string':
                return `Sample text ${Math.random().toString(36).substring(7)}`;
            case 'number':
                return Math.floor(Math.random() * 1000);
            case 'boolean':
                return Math.random() > 0.5;
            case 'email':
                const username = Math.random().toString(36).substring(7);
                return `${username}@example.com`;
            case 'uuid':
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                    const r = Math.random() * 16 | 0;
                    const v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            case 'date':
                const start = new Date(2020, 0, 1);
                const end = new Date();
                const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                return date.toISOString();
            case 'name':
                const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
                const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
                return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
            case 'phone':
                return `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
            default:
                return 'value';
        }
    };

    const generate = () => {
        const data = Array.from({ length: count }, () => {
            const obj: any = {};
            fields.forEach(field => {
                obj[field.name] = generateValue(field.type);
            });
            return obj;
        });
        setOutput(JSON.stringify(data, null, 2));
    };

    const downloadJson = () => {
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mock-data.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        fields,
        count,
        setCount,
        output,
        addField,
        updateField,
        removeField,
        generate,
        downloadJson
    };
};
