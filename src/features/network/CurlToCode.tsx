import React, { useState, useEffect } from 'react';
import { Terminal, Code, Copy, Check, ArrowRight } from 'lucide-react';

const CurlToCode: React.FC = () => {
    const [curl, setCurl] = useState('curl -X POST https://api.devhub.com/v1/users -H "Content-Type: application/json" -d \'{"name":"John"}\'');
    const [language, setLanguage] = useState<'fetch' | 'axios' | 'python'>('fetch');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Basic parser for demonstration. In a real app, use 'curl-to-json' or similar.
    const parseCurl = (cmd: string) => {
        try {
            // Very naive parsing logic for typical copy-pasted simple curls
            const urlMatch = cmd.match(/['"](https?:\/\/[^'"]+)['"]/) || cmd.match(/(https?:\/\/[^\s]+)/);
            const url = urlMatch ? urlMatch[1] : '';

            const methodMatch = cmd.match(/-X\s+([A-Z]+)/) || cmd.match(/--request\s+([A-Z]+)/);
            const method = methodMatch ? methodMatch[1] : 'GET';

            const headers: Record<string, string> = {};
            const headerMatches = cmd.matchAll(/-H\s+['"]([^'"]+)['"]/g);
            for (const match of headerMatches) {
                const [key, value] = match[1].split(/:\s?/);
                headers[key] = value;
            }

            const dataMatch = cmd.match(/-d\s+['"]([^'"]+)['"]/) || cmd.match(/--data\s+['"]([^'"]+)['"]/);
            let body = dataMatch ? dataMatch[1] : null;

            // Generate Code
            if (language === 'fetch') {
                return `fetch('${url}', {
  method: '${method}',
  headers: ${JSON.stringify(headers, null, 2).replace(/\n/g, '\n  ')},
  ${body ? `body: JSON.stringify(${body})` : ''}
})
.then(response => response.json())
.then(data => console.log(data));`;
            } else if (language === 'axios') {
                return `axios({
  method: '${method.toLowerCase()}',
  url: '${url}',
  headers: ${JSON.stringify(headers, null, 2).replace(/\n/g, '\n  ')},
  ${body ? `data: ${body}` : ''}
})
.then(response => console.log(response.data));`;
            } else if (language === 'python') {
                return `import requests

url = "${url}"
headers = ${JSON.stringify(headers, null, 2).replace(/\n/g, '\n')}
${body ? `data = ${body}` : ''}

response = requests.${method.toLowerCase()}(url, headers=headers${body ? ', json=data' : ''})
print(response.json())`;
            }
            return '// Parsing failed or unsupported format';
        } catch (e) {
            return '// Error parsing CURL command';
        }
    };

    useEffect(() => {
        setOutput(parseCurl(curl));
    }, [curl, language]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                    <Terminal size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">CURL to Code</h3>
                    <p className="text-sm text-slate-500">Convert CURL commands to Fetch, Axios, or Python</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
                <div className="flex-1 flex flex-col gap-4">
                    <label className="text-xs font-bold text-slate-400 uppercase">CURL Command</label>
                    <textarea
                        className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar"
                        value={curl}
                        onChange={(e) => setCurl(e.target.value)}
                        placeholder="Paste your CURL command here..."
                    />
                </div>

                <div className="flex-1 flex flex-col gap-4 relative group">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase">Generated Code</label>
                        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex text-xs font-bold">
                            {(['fetch', 'axios', 'python'] as const).map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`px-3 py-1 rounded transition-colors uppercase ${language === lang ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-grow p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-auto custom-scrollbar whitespace-pre">
                        {output}
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="absolute right-4 bottom-4 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CurlToCode;
