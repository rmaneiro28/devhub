
import React from 'react';
import { Github, Twitter, Linkedin, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16">
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
              Precision tools for high-performance engineering teams. Built by developers, for developers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-teal-500 transition-colors">Tools Library</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Desktop App</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Extension</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-teal-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Integrations</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">React</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">Supabase</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">TypeScript</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">Next.js</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">Gemini AI</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© 2024 DevHub Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-teal-500">Terms of Service</a>
            <a href="#" className="hover:text-teal-500">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
