import React, { useState } from 'react';
import { BlogPost } from '../types';
import { handleAffiliateRedirect } from '../utils/tracking';
import { Calendar, User, Tag, Search, ArrowLeft, ArrowUpRight, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface BlogSystemProps {
  blogs: BlogPost[];
  currentPage: string;
}

export default function BlogSystem({ blogs, currentPage }: BlogSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Forex Basics', 'Broker Reviews', 'Trading Strategies', 'Risk Management'];

  // Filter & Search Logic
  const filteredBlogs = blogs.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render Single Full Post View
  if (selectedPost) {
    return (
      <div className="py-12 bg-white dark:bg-zinc-950 transition-colors animate-fade-in" id="blog-reading-view">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedPost(null);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="inline-flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Article Index</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="px-3 py-1 bg-emerald-500/10 rounded-full">{selectedPost.category}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 inline" />
                <span>{Math.round(selectedPost.content.split(/\s+/).length / 200)} min read</span>
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author Summary Panel */}
            <div className="flex items-center space-x-3.5 py-4 border-t border-b border-zinc-150 dark:border-zinc-800">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 text-sm font-bold">
                {selectedPost.authorName.split(' ')[0][0]}{selectedPost.authorName.split(' ')[1]?.[0] || 'A'}
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{selectedPost.authorName}</p>
                <p className="text-xs text-zinc-450">{formatDate(selectedPost.publishedAt)}</p>
              </div>
            </div>

          </div>

          {/* Featured Image */}
          <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 border border-zinc-200 dark:border-zinc-800">
            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Content - Styled for visual perfection */}
          <article className="prose prose-emerald dark:prose-invert max-w-none mb-12 space-y-6 text-zinc-700 dark:text-zinc-200 text-base sm:text-lg leading-relaxed">
            {selectedPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-zinc-900 dark:text-white pt-4 pb-2 border-b dark:border-zinc-800">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-zinc-900 dark:text-white pt-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('* ')) {
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 text-sm text-zinc-650 dark:text-zinc-300">
                    {paragraph.split('\n').map((li, lIdx) => (
                      <li key={lIdx}>{li.replace('* ', '')}</li>
                    ))}
                  </ul>
                );
              }
              
              // Simulate active internal key linking to affiliate models
              let contentHtml = paragraph;
              const linkTerms = [
                { term: "Headway Broker", linkText: "Headway Broker" },
                { term: "Standard", linkText: "Standard Account" },
                { term: "Pro", linkText: "Pro Account" },
                { term: "Cent", linkText: "Cent Account" }
              ];
              
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* Educational Call to action inline */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 dark:from-zinc-900 dark:to-zinc-9050 text-white border border-zinc-850 mb-12 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Affiliate Operations Link</span>
              <AlertCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-extrabold text-lg sm:text-xl">Ready to apply these concepts in real market environments?</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Open a compliant micro account with Headway Broker. Support our expert analytical desks by utilizing our referral signup program. <strong>Trading involves risk of loss.</strong>
            </p>
            <button
              onClick={() => handleAffiliateRedirect(`Reading Viewcta - ${selectedPost.title}`, currentPage)}
              className="mt-2 inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm tracking-tight rounded-xl shadow cursor-pointer transition-all active:scale-95"
            >
              <span>Register Free Account ($1 Minimum)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-100" />
            </button>
          </div>

          {/* Author Bio Footer Callout */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-8050 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-lg text-zinc-600 dark:text-zinc-350 shrink-0">
              {selectedPost.authorName.split(' ')[0][0]}{selectedPost.authorName.split(' ')[1]?.[0] || 'A'}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-zinc-400 uppercase font-mono block">Review Author</span>
              <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">{selectedPost.authorName}</h4>
              <p className="text-zinc-550 dark:text-zinc-400 text-xs leading-relaxed">{selectedPost.authorBio}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-zinc-50 dark:bg-zinc-900 transition-colors" id="blog-system-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            SEO BLOG PORTAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1.5">
            Trading Educational Blog
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3.5">
            Advanced strategies, platform deepdives, and forex risk mitigation manuals. Fully powered by our CMS data models to rank high on global indexes.
          </p>
        </div>

        {/* Filter Toolbar + Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10 bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-800">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow shadow-emerald-500/10'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, pips, reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-150 placeholder-zinc-400 pl-10 pr-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        {/* Blog Post Cards Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-150 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="w-full h-48 overflow-hidden relative cursor-pointer" onClick={() => setSelectedPost(post)}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-zinc-900/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1.5 text-xs text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3
                      onClick={() => setSelectedPost(post)}
                      className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer transition-colors leading-tight"
                    >
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-350 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-850">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      <span>Read Full Guide</span>
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    </button>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Score: {post.seoScore}/100
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-150 dark:border-zinc-800 space-y-4">
            <Tag className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">No Articles Found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto">
              We couldn't match any blogs to your targets. Try search keywords like 'pips', 'spreads', or 'legit'.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
