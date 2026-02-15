import { useState } from 'react';

export const useXmlJson = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'xml-to-json' | 'json-to-xml'>('xml-to-json');
    const [error, setError] = useState('');

    const parseXmlToJson = (xml: string): string => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');

            const parseError = xmlDoc.getElementsByTagName('parsererror');
            if (parseError.length > 0) {
                throw new Error('Invalid XML');
            }

            const xmlToJson = (node: Element | Document): any => {
                const obj: any = {};

                // Handle attributes
                if (node.nodeType === 1 && (node as Element).attributes) {
                    const attributes = (node as Element).attributes;
                    if (attributes.length > 0) {
                        obj['@attributes'] = {};
                        for (let i = 0; i < attributes.length; i++) {
                            obj['@attributes'][attributes[i].nodeName] = attributes[i].nodeValue;
                        }
                    }
                }

                // Handle child nodes
                if (node.hasChildNodes()) {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        const child = node.childNodes[i];

                        if (child.nodeType === 3) {
                            // Text node
                            const text = child.nodeValue?.trim();
                            if (text) {
                                return text;
                            }
                        } else if (child.nodeType === 1) {
                            // Element node
                            const nodeName = child.nodeName;
                            const childObj = xmlToJson(child as Element);

                            if (obj[nodeName]) {
                                if (!Array.isArray(obj[nodeName])) {
                                    obj[nodeName] = [obj[nodeName]];
                                }
                                obj[nodeName].push(childObj);
                            } else {
                                obj[nodeName] = childObj;
                            }
                        }
                    }
                }

                return obj;
            };

            const result = xmlToJson(xmlDoc);
            return JSON.stringify(result, null, 2);
        } catch (err) {
            throw new Error('Failed to parse XML');
        }
    };

    const parseJsonToXml = (json: string): string => {
        try {
            const obj = JSON.parse(json);

            const jsonToXml = (obj: any, rootName: string = 'root'): string => {
                let xml = '';

                if (typeof obj === 'object' && obj !== null) {
                    if (Array.isArray(obj)) {
                        obj.forEach(item => {
                            xml += `<item>${jsonToXml(item, 'item')}</item>`;
                        });
                    } else {
                        for (const key in obj) {
                            if (key === '@attributes') continue;

                            const value = obj[key];
                            const attributes = obj['@attributes'] || {};
                            const attrString = Object.entries(attributes)
                                .map(([k, v]) => `${k}="${v}"`)
                                .join(' ');

                            if (typeof value === 'object' && value !== null) {
                                xml += `<${key}${attrString ? ' ' + attrString : ''}>${jsonToXml(value, key)}</${key}>`;
                            } else {
                                xml += `<${key}${attrString ? ' ' + attrString : ''}>${value}</${key}>`;
                            }
                        }
                    }
                } else {
                    return String(obj);
                }

                return xml;
            };

            const rootKey = Object.keys(obj)[0];
            return `<?xml version="1.0" encoding="UTF-8"?>\n${jsonToXml(obj, rootKey)}`;
        } catch (err) {
            throw new Error('Failed to parse JSON');
        }
    };

    const convert = () => {
        setError('');
        try {
            if (mode === 'xml-to-json') {
                const result = parseXmlToJson(input);
                setOutput(result);
            } else {
                const result = parseJsonToXml(input);
                setOutput(result);
            }
        } catch (err: any) {
            setError(err.message);
            setOutput('');
        }
    };

    const swap = () => {
        setInput(output);
        setOutput('');
        setMode(mode === 'xml-to-json' ? 'json-to-xml' : 'xml-to-json');
    };

    const reset = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return {
        input,
        setInput,
        output,
        mode,
        setMode,
        error,
        convert,
        swap,
        reset
    };
};
