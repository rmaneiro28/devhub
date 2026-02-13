import React from 'react';
import { Terminal, Github, Globe } from 'lucide-react';
import { Theme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onHomeClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
            <div className="bg-teal-600 p-2 rounded-lg">
              <Terminal className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              DevHub
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/tools" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {t.nav.features}
            </Link>
            <a href="#about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {t.nav.about}
            </a>
            <a href="https://github.com/rmaneiro28/devhub" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="p-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
              title="Switch Language"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => navigate('/tools')}
              className="hidden sm:block px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-all shadow-lg shadow-teal-500/20 active:scale-95"
            >
              Workspace
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
