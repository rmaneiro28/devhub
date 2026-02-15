import { useState } from 'react';

export const useSitemapGenerator = () => {
    const [urls, setUrls] = useState([
        { loc: '', changefreq: 'weekly', priority: '0.8' }
    ]);
    const [domain, setDomain] = useState('');

    const addUrl = () => {
        setUrls([...urls, { loc: '', changefreq: 'weekly', priority: '0.5' }]);
    };

    const updateUrl = (index: number, field: string, value: string) => {
        const newUrls = [...urls];
        newUrls[index] = { ...newUrls[index], [field]: value };
        setUrls(newUrls);
    };

    const removeUrl = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index));
    };

    const generate = (): string => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        urls.forEach(url => {
            if (url.loc) {
                const fullUrl = url.loc.startsWith('http') ? url.loc : `${domain}${url.loc}`;
                xml += '  <url>\n';
                xml += `    <loc>${fullUrl}</loc>\n`;
                xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
                xml += `    <priority>${url.priority}</priority>\n`;
                xml += '  </url>\n';
            }
        });

        xml += '</urlset>';
        return xml;
    };

    const downloadFile = () => {
        const content = generate();
        const blob = new Blob([content], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sitemap.xml';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        urls,
        domain,
        setDomain,
        addUrl,
        updateUrl,
        removeUrl,
        generate,
        downloadFile
    };
};
