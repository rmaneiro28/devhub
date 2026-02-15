import { useState } from 'react';

interface MetaTags {
    title: string;
    description: string;
    keywords: string;
    author: string;
    viewport: string;
    charset: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogUrl: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
}

export const useMetaTagsGenerator = () => {
    const [tags, setTags] = useState<MetaTags>({
        title: '',
        description: '',
        keywords: '',
        author: '',
        viewport: 'width=device-width, initial-scale=1.0',
        charset: 'UTF-8',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        ogUrl: '',
        twitterCard: 'summary_large_image',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: ''
    });

    const updateTag = (field: keyof MetaTags, value: string) => {
        setTags({ ...tags, [field]: value });
    };

    const syncToOG = () => {
        setTags({
            ...tags,
            ogTitle: tags.title,
            ogDescription: tags.description
        });
    };

    const syncToTwitter = () => {
        setTags({
            ...tags,
            twitterTitle: tags.title,
            twitterDescription: tags.description
        });
    };

    const generate = (): string => {
        let html = '<!-- Basic Meta Tags -->\n';
        html += `<meta charset="${tags.charset}">\n`;
        html += `<meta name="viewport" content="${tags.viewport}">\n`;
        if (tags.title) html += `<title>${tags.title}</title>\n`;
        if (tags.description) html += `<meta name="description" content="${tags.description}">\n`;
        if (tags.keywords) html += `<meta name="keywords" content="${tags.keywords}">\n`;
        if (tags.author) html += `<meta name="author" content="${tags.author}">\n`;

        if (tags.ogTitle || tags.ogDescription || tags.ogImage || tags.ogUrl) {
            html += '\n<!-- Open Graph / Facebook -->\n';
            html += '<meta property="og:type" content="website">\n';
            if (tags.ogUrl) html += `<meta property="og:url" content="${tags.ogUrl}">\n`;
            if (tags.ogTitle) html += `<meta property="og:title" content="${tags.ogTitle}">\n`;
            if (tags.ogDescription) html += `<meta property="og:description" content="${tags.ogDescription}">\n`;
            if (tags.ogImage) html += `<meta property="og:image" content="${tags.ogImage}">\n`;
        }

        if (tags.twitterTitle || tags.twitterDescription || tags.twitterImage) {
            html += '\n<!-- Twitter -->\n';
            html += `<meta property="twitter:card" content="${tags.twitterCard}">\n`;
            if (tags.twitterTitle) html += `<meta property="twitter:title" content="${tags.twitterTitle}">\n`;
            if (tags.twitterDescription) html += `<meta property="twitter:description" content="${tags.twitterDescription}">\n`;
            if (tags.twitterImage) html += `<meta property="twitter:image" content="${tags.twitterImage}">\n`;
        }

        return html;
    };

    return {
        tags,
        updateTag,
        syncToOG,
        syncToTwitter,
        generate
    };
};
