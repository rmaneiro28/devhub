import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Blog: React.FC = () => {
    const { t } = useLanguage();

    // Static data that doesn't need translation or is mixed with translations
    const staticPostData = [
        {
            id: 1,
            date: "Oct 15, 2025",
            author: "Rúbel Maneiro",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            date: "Nov 02, 2025",
            author: "Rúbel Maneiro",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            date: "Dec 10, 2025",
            author: "Rúbel Maneiro",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    // Merge translation data with static data
    const posts = t.blog.posts.map((post, index) => ({
        ...post,
        ...staticPostData[index]
    }));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        {t.blog.title}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.blog.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        {post.author}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-500 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <a href="#" className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm hover:underline">
                                    {t.blog.readArticle} <ArrowRight size={16} className="ml-1" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-20 bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500"></div>
                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">{t.blog.stayInLoop}</h2>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
                        {t.blog.subscribeText}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                        <input
                            type="email"
                            placeholder={t.blog.placeholder}
                            className="flex-grow px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors">
                            {t.blog.subscribe}
                        </button>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
