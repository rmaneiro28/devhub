import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
    title: string;
    description?: string;
    keywords?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({
    title,
    description = "DevHub - Developer Productivity Tools & Utilities",
    keywords = "developer tools, sql formatter, json converter, css generator, regex tester"
}) => {
    const fullTitle = `${title} | DevHub`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SeoHead;
