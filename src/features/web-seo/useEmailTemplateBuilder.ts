import { useState } from 'react';

export const useEmailTemplateBuilder = () => {
    const [subject, setSubject] = useState('');
    const [preheader, setPreheader] = useState('');
    const [heading, setHeading] = useState('Welcome!');
    const [body, setBody] = useState('Thank you for signing up.');
    const [buttonText, setButtonText] = useState('Get Started');
    const [buttonUrl, setButtonUrl] = useState('https://example.com');
    const [footerText, setFooterText] = useState('© 2026 Your Company');
    const [primaryColor, setPrimaryColor] = useState('#4F46E5');

    const generateHTML = (): string => {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { padding: 40px 20px; text-align: center; background-color: ${primaryColor}; color: #ffffff; }
        .content { padding: 40px 20px; }
        .button { display: inline-block; padding: 12px 24px; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${heading}</h1>
        </div>
        <div class="content">
            <p>${body}</p>
            <a href="${buttonUrl}" class="button">${buttonText}</a>
        </div>
        <div class="footer">
            <p>${footerText}</p>
        </div>
    </div>
</body>
</html>`;
    };

    return {
        subject,
        setSubject,
        preheader,
        setPreheader,
        heading,
        setHeading,
        body,
        setBody,
        buttonText,
        setButtonText,
        buttonUrl,
        setButtonUrl,
        footerText,
        setFooterText,
        primaryColor,
        setPrimaryColor,
        generateHTML
    };
};
