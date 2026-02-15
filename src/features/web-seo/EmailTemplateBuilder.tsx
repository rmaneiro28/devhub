import React from 'react';
import { Mail, Download, Copy, Eye } from 'lucide-react';
import { useEmailTemplateBuilder } from './useEmailTemplateBuilder';

const EmailTemplateBuilder: React.FC = () => {
    const { subject, setSubject, heading, setHeading, body, setBody, buttonText, setButtonText, buttonUrl, setButtonUrl, footerText, setFooterText, primaryColor, setPrimaryColor, generateHTML } = useEmailTemplateBuilder();
    const [copied, setCopied] = React.useState(false);
    const [preview, setPreview] = React.useState(false);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl"><Mail size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Email Template Builder</h3>
                    <p className="text-sm text-slate-500">Create responsive HTML email templates</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email Subject" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Heading" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Email body..." className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm resize-none" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} placeholder="Button Text" className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                        <input type="text" value={buttonUrl} onChange={(e) => setButtonUrl(e.target.value)} placeholder="Button URL" className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    </div>
                    <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="Footer text" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    <div>
                        <label className="text-sm font-medium mb-2 block">Primary Color</label>
                        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-lg border" />
                    </div>
                    <button onClick={() => setPreview(!preview)} className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2"><Eye size={20} /> {preview ? 'Show Code' : 'Preview'}</button>
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">{preview ? 'Preview' : 'HTML'}</label>
                        {!preview && (
                            <div className="flex gap-2">
                                <button onClick={() => { navigator.clipboard.writeText(generateHTML()); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Copy size={16} /></button>
                                <button onClick={() => { const blob = new Blob([generateHTML()], { type: 'text/html' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'email-template.html'; link.click(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Download size={16} /></button>
                            </div>
                        )}
                    </div>
                    <div className="h-[500px] bg-slate-50 dark:bg-slate-950 rounded-xl border overflow-auto">
                        {preview ? <iframe srcDoc={generateHTML()} className="w-full h-full" /> : <pre className="p-4 font-mono text-xs">{generateHTML()}</pre>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplateBuilder;
