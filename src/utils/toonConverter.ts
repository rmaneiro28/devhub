export const toToon = (obj: any, indentLevel = 0): string => {
    const indent = '  '.repeat(indentLevel);

    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';

    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';

        // Check if array is uniform (array of objects with same keys) for table format
        const isUniformObjectArray = obj.length > 0 && obj.every(item =>
            typeof item === 'object' && item !== null && !Array.isArray(item)
        );

        if (isUniformObjectArray) {
            const allKeys = Array.from(new Set(obj.flatMap(Object.keys)));
            // Simple check: if objects are too complex (nested objects), fallback to list
            const hasComplexValues = obj.some(item => Object.values(item).some(v => typeof v === 'object' && v !== null));

            if (!hasComplexValues && allKeys.length > 0) {
                // Render as Table
                const header = `| ${allKeys.join(' | ')} |`;
                // const separator = `| ${allKeys.map(() => '---').join(' | ')} |`; // Optional for strictly markdown, often omitted in raw TOON for tokens
                const rows = obj.map((item: any) => {
                    const values = allKeys.map(key => {
                        const val = item[key];
                        return val === undefined ? '' : String(val);
                    });
                    return `| ${values.join(' | ')} |`;
                }).join('\n' + indent);

                return `\n${indent}${header}\n${indent}${rows}`;
            }
        }

        // Standard Array List
        return obj.map(item => `\n${indent}- ${toToon(item, indentLevel + 1).trim()}`).join('');
    }

    if (typeof obj === 'object') {
        if (Object.keys(obj).length === 0) return '{}';

        return Object.entries(obj).map(([key, value]) => {
            const formattedValue = toToon(value, indentLevel + 1);
            // If value is an object/array starting with newline, don't add extra space
            const separator = (typeof value === 'object' && value !== null) ? '' : ' ';
            return `\n${indent}${key}:${separator}${formattedValue}`;
        }).join('');
    }

    // Primitives
    if (typeof obj === 'string') {
        // Only quote if necessary (contains special chars or is strictly needed). 
        // For TOON/LLM optimization, we often skip quotes unless it breaks syntax.
        // Simple heuristic: quote if contains space or special chars.
        if (/[\s:,]/.test(obj)) return `"${obj}"`;
        return obj;
    }

    return String(obj);
};
