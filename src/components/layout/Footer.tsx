
import React from 'react';
import { Github, Twitter, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-teal-600 rounded-lg text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DevHub</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/rmaneiro28/devhub" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-500 transition-colors"><Github size={20} /></a>
              <a href="https://twitter.com/devhub" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">{t.footer.platform}</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/tools" className="hover:text-teal-500 transition-colors">{t.footer.tools}</Link></li>
              <li><Link to="/docs" className="hover:text-teal-500 transition-colors">{t.footer.docs}</Link></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">{t.footer.desktop}</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">{t.footer.extension}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">{t.footer.company}</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-teal-500 transition-colors">{t.footer.about}</Link></li>
              <li><Link to="/blog" className="hover:text-teal-500 transition-colors">{t.footer.blog}</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-500 transition-colors">{t.footer.privacy}</Link></li>
              <li><a href="https://github.com/rmaneiro28/devhub/issues/new" target="_blank" rel="noreferrer" className="hover:text-teal-500 transition-colors">Report Issue</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">{t.footer.integrations}</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">React</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">Supabase</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">TypeScript</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">Next.js</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-8">
            <Link to="/terms" className="hover:text-teal-500">{t.footer.terms}</Link>
            <Link to="/status" className="hover:text-teal-500">{t.footer.status}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
