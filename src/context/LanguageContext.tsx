
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationStructure } from '../utils/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationStructure;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            setLanguageState(savedLang);
        } else {
            // Auto-detect? Optional. Defaulting to 'en' for now or 'es' if user preferred.
            // Given user request for ES support, we could default to browser lang
            const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
            setLanguageState(browserLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
