import { useState } from 'react';

export type CitationStyle = 'apa' | 'mla' | 'chicago' | 'ieee' | 'vancouver' | 'harvard';
export type SourceType = 'book' | 'article' | 'website' | 'journal' | 'thesis';

interface CitationData {
    sourceType: SourceType;
    authors: string[];
    title: string;
    year: string;
    publisher?: string;
    journal?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    url?: string;
    accessDate?: string;
    doi?: string;
    city?: string;
}

export const useCitationGenerator = () => {
    const [style, setStyle] = useState<CitationStyle>('apa');
    const [sourceType, setSourceType] = useState<SourceType>('book');
    const [citation, setCitation] = useState('');
    const [extractUrl, setExtractUrl] = useState('');
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractError, setExtractError] = useState('');

    const [formData, setFormData] = useState<CitationData>({
        sourceType: 'book',
        authors: [''],
        title: '',
        year: '',
        publisher: '',
        journal: '',
        volume: '',
        issue: '',
        pages: '',
        url: '',
        accessDate: '',
        doi: '',
        city: ''
    });

    const updateField = (field: keyof CitationData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addAuthor = () => {
        setFormData(prev => ({ ...prev, authors: [...prev.authors, ''] }));
    };

    const updateAuthor = (index: number, value: string) => {
        const newAuthors = [...formData.authors];
        newAuthors[index] = value;
        setFormData(prev => ({ ...prev, authors: newAuthors }));
    };

    const removeAuthor = (index: number) => {
        setFormData(prev => ({ ...prev, authors: prev.authors.filter((_, i) => i !== index) }));
    };

    const formatAuthorsAPA = (authors: string[]) => {
        const validAuthors = authors.filter(a => a.trim());
        if (validAuthors.length === 0) return '';
        if (validAuthors.length === 1) return validAuthors[0];
        if (validAuthors.length === 2) return `${validAuthors[0]}, & ${validAuthors[1]}`;
        return validAuthors.slice(0, -1).join(', ') + `, & ${validAuthors[validAuthors.length - 1]}`;
    };

    const formatAuthorsMLA = (authors: string[]) => {
        const validAuthors = authors.filter(a => a.trim());
        if (validAuthors.length === 0) return '';
        if (validAuthors.length === 1) return validAuthors[0];
        return `${validAuthors[0]}, et al.`;
    };

    const generateCitation = () => {
        const { authors, title, year, publisher, journal, volume, issue, pages, url, doi, city } = formData;
        let result = '';

        switch (style) {
            case 'apa':
                if (sourceType === 'book') {
                    result = `${formatAuthorsAPA(authors)} (${year}). *${title}*. ${publisher}.`;
                } else if (sourceType === 'article' || sourceType === 'journal') {
                    result = `${formatAuthorsAPA(authors)} (${year}). ${title}. *${journal}*, *${volume}*(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ''}`;
                } else if (sourceType === 'website') {
                    result = `${formatAuthorsAPA(authors)} (${year}). *${title}*. Retrieved from ${url}`;
                }
                break;

            case 'mla':
                if (sourceType === 'book') {
                    result = `${formatAuthorsMLA(authors)}. *${title}*. ${publisher}, ${year}.`;
                } else if (sourceType === 'article' || sourceType === 'journal') {
                    result = `${formatAuthorsMLA(authors)}. "${title}." *${journal}*, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.`;
                } else if (sourceType === 'website') {
                    result = `${formatAuthorsMLA(authors)}. "${title}." *Website Name*, ${year}, ${url}.`;
                }
                break;

            case 'chicago':
                if (sourceType === 'book') {
                    result = `${authors[0]}. *${title}*. ${city}: ${publisher}, ${year}.`;
                } else if (sourceType === 'article' || sourceType === 'journal') {
                    result = `${authors[0]}. "${title}." *${journal}* ${volume}, no. ${issue} (${year}): ${pages}.`;
                }
                break;

            case 'ieee':
                if (sourceType === 'book') {
                    result = `${authors.map((a, i) => `[${i + 1}] ${a}`).join(', ')}, *${title}*. ${city}: ${publisher}, ${year}.`;
                } else if (sourceType === 'article' || sourceType === 'journal') {
                    result = `${authors.map((a, i) => `[${i + 1}] ${a}`).join(', ')}, "${title}," *${journal}*, vol. ${volume}, no. ${issue}, pp. ${pages}, ${year}.`;
                }
                break;

            case 'vancouver':
                if (sourceType === 'book') {
                    result = `${authors.map((a, i) => `${i + 1}. ${a}`).join(', ')}. ${title}. ${city}: ${publisher}; ${year}.`;
                } else if (sourceType === 'article' || sourceType === 'journal') {
                    result = `${authors.map((a, i) => `${i + 1}. ${a}`).join(', ')}. ${title}. ${journal}. ${year};${volume}(${issue}):${pages}.`;
                }
                break;

            case 'harvard':
                if (sourceType === 'book') {
                    result = `${authors[0]} (${year}) *${title}*. ${city}: ${publisher}.`;
                } else if (sourceType === 'article' || sourceType === 'journal') {
                    result = `${authors[0]} (${year}) '${title}', *${journal}*, ${volume}(${issue}), pp. ${pages}.`;
                }
                break;
        }

        setCitation(result);
    };

    const extractFromUrl = async () => {
        if (!extractUrl.trim()) {
            setExtractError('Please enter a URL');
            return;
        }

        setIsExtracting(true);
        setExtractError('');

        try {
            // Use a CORS proxy for client-side fetching
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(extractUrl)}`;
            const response = await fetch(proxyUrl);
            const html = await response.text();

            // Create a DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract metadata
            const getMetaContent = (name: string, property?: string) => {
                const metaName = doc.querySelector(`meta[name="${name}"]`);
                const metaProp = property ? doc.querySelector(`meta[property="${property}"]`) : null;
                return metaName?.getAttribute('content') || metaProp?.getAttribute('content') || '';
            };

            // Extract title
            const title =
                getMetaContent('citation_title', 'og:title') ||
                getMetaContent('DC.title') ||
                doc.querySelector('title')?.textContent ||
                '';

            // Extract authors
            const authorMeta =
                getMetaContent('citation_author') ||
                getMetaContent('author') ||
                getMetaContent('DC.creator') ||
                getMetaContent('article:author', 'article:author');

            const authors = authorMeta ? authorMeta.split(/[,;]/).map(a => a.trim()).filter(a => a) : [''];

            // Extract year
            const dateMeta =
                getMetaContent('citation_publication_date') ||
                getMetaContent('DC.date') ||
                getMetaContent('article:published_time', 'article:published_time');

            const year = dateMeta ? new Date(dateMeta).getFullYear().toString() : new Date().getFullYear().toString();

            // Extract publisher/journal
            const publisher =
                getMetaContent('citation_publisher') ||
                getMetaContent('DC.publisher') ||
                doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
                '';

            const journal = getMetaContent('citation_journal_title') || '';
            const volume = getMetaContent('citation_volume') || '';
            const issue = getMetaContent('citation_issue') || '';
            const doi = getMetaContent('citation_doi') || '';

            // Determine source type
            let detectedType: SourceType = 'website';
            if (journal) {
                detectedType = 'journal';
            } else if (getMetaContent('citation_book_title')) {
                detectedType = 'book';
            }

            // Update form data
            setFormData(prev => ({
                ...prev,
                title: title.trim(),
                authors: authors.length > 0 ? authors : [''],
                year,
                publisher: publisher.trim(),
                journal: journal.trim(),
                volume: volume.trim(),
                issue: issue.trim(),
                doi: doi.trim(),
                url: extractUrl,
                sourceType: detectedType
            }));

            setSourceType(detectedType);
            setExtractError('');
        } catch (error) {
            console.error('Extraction error:', error);
            setExtractError('Failed to extract metadata. The URL may not be accessible or may not contain citation metadata.');
        } finally {
            setIsExtracting(false);
        }
    };

    const reset = () => {
        setFormData({
            sourceType: 'book',
            authors: [''],
            title: '',
            year: '',
            publisher: '',
            journal: '',
            volume: '',
            issue: '',
            pages: '',
            url: '',
            accessDate: '',
            doi: '',
            city: ''
        });
        setCitation('');
    };

    return {
        style,
        setStyle,
        sourceType,
        setSourceType,
        formData,
        citation,
        extractUrl,
        setExtractUrl,
        isExtracting,
        extractError,
        updateField,
        addAuthor,
        updateAuthor,
        removeAuthor,
        generateCitation,
        extractFromUrl,
        reset
    };
};
