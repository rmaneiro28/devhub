import { useState } from 'react';

export const useDaxFormatter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [indentSize, setIndentSize] = useState(4);
    const [uppercaseKeywords, setUppercaseKeywords] = useState(true);

    const DAX_KEYWORDS = [
        'CALCULATE', 'FILTER', 'ALL', 'ALLEXCEPT', 'SUMX', 'AVERAGEX', 'COUNTX',
        'IF', 'SWITCH', 'AND', 'OR', 'NOT', 'TRUE', 'FALSE',
        'VAR', 'RETURN', 'DEFINE', 'MEASURE', 'COLUMN', 'TABLE',
        'RELATED', 'RELATEDTABLE', 'USERELATIONSHIP', 'CROSSFILTER',
        'EARLIER', 'EARLIEST', 'HASONEVALUE', 'HASONEFILTER',
        'SELECTEDVALUE', 'VALUES', 'DISTINCT', 'DISTINCTCOUNT',
        'SUM', 'AVERAGE', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTROWS',
        'MIN', 'MAX', 'DIVIDE', 'BLANK', 'ISBLANK', 'IFERROR',
        'FORMAT', 'CONCATENATE', 'LEFT', 'RIGHT', 'MID', 'LEN',
        'YEAR', 'MONTH', 'DAY', 'DATE', 'TODAY', 'NOW',
        'DATEADD', 'DATEDIFF', 'DATESBETWEEN', 'DATESINPERIOD',
        'TOTALYTD', 'TOTALQTD', 'TOTALMTD', 'SAMEPERIODLASTYEAR',
        'PARALLELPERIOD', 'PREVIOUSMONTH', 'PREVIOUSQUARTER', 'PREVIOUSYEAR',
        'RANKX', 'TOPN', 'SAMPLE', 'ADDCOLUMNS', 'SELECTCOLUMNS',
        'SUMMARIZE', 'GROUPBY', 'ROLLUP', 'NATURALINNERJOIN', 'NATURALLEFTOUTERJOIN'
    ];

    const formatDax = () => {
        let formatted = input.trim();

        // Uppercase keywords if enabled
        if (uppercaseKeywords) {
            DAX_KEYWORDS.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                formatted = formatted.replace(regex, keyword);
            });
        }

        // Add line breaks and indentation
        let indentLevel = 0;
        const indent = ' '.repeat(indentSize);
        const lines: string[] = [];

        // Split by common DAX patterns
        const tokens = formatted.split(/(\(|\)|,|\n)/g);
        let currentLine = '';

        tokens.forEach(token => {
            if (token === '(') {
                currentLine += token;
                lines.push(indent.repeat(indentLevel) + currentLine.trim());
                indentLevel++;
                currentLine = '';
            } else if (token === ')') {
                if (currentLine.trim()) {
                    lines.push(indent.repeat(indentLevel) + currentLine.trim());
                }
                indentLevel = Math.max(0, indentLevel - 1);
                currentLine = token;
            } else if (token === ',') {
                currentLine += token;
                lines.push(indent.repeat(indentLevel) + currentLine.trim());
                currentLine = '';
            } else if (token === '\n') {
                if (currentLine.trim()) {
                    lines.push(indent.repeat(indentLevel) + currentLine.trim());
                    currentLine = '';
                }
            } else {
                currentLine += token;
            }
        });

        if (currentLine.trim()) {
            lines.push(indent.repeat(indentLevel) + currentLine.trim());
        }

        // Handle VAR and RETURN specially
        const finalLines = lines.map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('VAR ')) {
                return line;
            } else if (trimmed.startsWith('RETURN')) {
                return line;
            }
            return line;
        });

        setOutput(finalLines.join('\n'));
    };

    const minify = () => {
        let minified = input
            .replace(/\s+/g, ' ')
            .replace(/\s*\(\s*/g, '(')
            .replace(/\s*\)\s*/g, ')')
            .replace(/\s*,\s*/g, ',')
            .trim();

        if (uppercaseKeywords) {
            DAX_KEYWORDS.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                minified = minified.replace(regex, keyword);
            });
        }

        setOutput(minified);
    };

    const reset = () => {
        setInput('');
        setOutput('');
    };

    return {
        input,
        setInput,
        output,
        indentSize,
        setIndentSize,
        uppercaseKeywords,
        setUppercaseKeywords,
        formatDax,
        minify,
        reset
    };
};
