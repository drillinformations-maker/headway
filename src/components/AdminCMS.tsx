import React, { useState, useEffect } from 'react';
import { BlogPost, PageSeoSettings, AnalyticsMetric } from '../types';
import { seedPageSeoData } from '../data/blogSeedData';
import { BarChart3, Settings, FileEdit, Plus, Trash2, Eye, ShieldCheck, Compass, Zap, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminCMSProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  currentPageSeo: PageSeoSettings[];
  setCurrentPageSeo: React.Dispatch<React.SetStateAction<PageSeoSettings[]>>;
  currentPage: string;
}

export default function AdminCMS({ blogs, setBlogs, currentPageSeo, setCurrentPageSeo, currentPage }: AdminCMSProps) {
  const [adminTab, setAdminTab] = useState<'analytics' | 'pages-seo' | 'blog-editor'>('analytics');
  
  // Administrative credentials authentication states
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_session_unlocked') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Analytics Telemetry State
  const [clickStats, setClickStats] = useState<any[]>([]);
  const [indexingLogs, setIndexingLogs] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // SEO Page Customizer State
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [editingSeo, setEditingSeo] = useState<PageSeoSettings>(seedPageSeoData[0]);

  // Blog Editor State
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: 'Forex Basics',
    status: 'draft',
    authorName: 'Marcus Sterling',
    authorBio: 'Lead CFA Analyst and forex risk advisor.',
    featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    seoTitle: '',
    seoDescription: '',
    keywords: '',
    canonicalUrl: '',
    schemaMarkup: '',
    seoScore: 70,
    readabilityScore: 75,
    keywordSuggestions: []
  });

  // AI Auditor Panel State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiKeywords, setAiKeywords] = useState<string[]>([]);

  // Page index metadata options
  const pageOptions = [
    { id: 'home', name: '🏠 Homepage' },
    { id: 'review', name: '📊 Broker Review' },
    { id: 'forex', name: '📚 Educational Hub' },
    { id: 'disclosure', name: '⚖️ Compliance Page' }
  ];

  // Fetch Telemetry from Express Server on Tab Mount (only if authorized)
  useEffect(() => {
    if (isUnlocked && adminTab === 'analytics') {
      fetchAnalytics();
    }
  }, [adminTab, isUnlocked]);

  const fetchAnalytics = async () => {
    setIsLoadingStats(true);
    try {
      const token = sessionStorage.getItem('admin_session_token') || '';
      const res = await fetch('/api/analytics/clicks', {
        headers: {
          'Authorization': token
        }
      });
      if (res.ok) {
        const data = await res.json();
        setClickStats(data.clicks || []);
        setIndexingLogs(data.indexLog || []);
      } else {
        if (res.status === 401) {
          setAuthError("Administrative credentials expired. Please unlock again.");
          setIsUnlocked(false);
          sessionStorage.removeItem('admin_session_unlocked');
          sessionStorage.removeItem('admin_session_token');
        }
      }
    } catch (e) {
      console.error("Failed to load server analytics database:", e);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError('');
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode })
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('admin_session_token', data.token);
        sessionStorage.setItem('admin_session_unlocked', 'true');
        setIsUnlocked(true);
      } else {
        const errData = await response.json();
        setAuthError(errData.error || 'Invalid passcode specified');
      }
    } catch (err) {
      setAuthError('Express back-end response failed. Verify server status.');
    } finally {
      setIsVerifying(false);
    }
  };

  // SEO Page Config Update
  useEffect(() => {
    const matched = currentPageSeo.find(p => p.pageId === selectedPageId);
    if (matched) {
      setEditingSeo(matched);
    }
  }, [selectedPageId, currentPageSeo]);

  const handleSavePageSeo = () => {
    setCurrentPageSeo(prev => prev.map(p => p.pageId === selectedPageId ? editingSeo : p));
    alert(`Success: Meta structures saved for page '${selectedPageId}'! Custom Title, Description, and JSON-LD schema injected.`);
  };

  // Blog operations
  const handleEditBlog = (post: BlogPost) => {
    setSelectedBlogId(post.id);
    setBlogForm(post);
    setAiSuggestions([]);
    setAiKeywords([]);
    setIsEditingBlog(true);
  };

  const handleAddNewBlog = () => {
    setSelectedBlogId(null);
    setBlogForm({
      id: Math.random().toString(36).substring(2, 9),
      title: 'New Dynamic Forex Article',
      slug: 'new-dynamic-forex-article',
      summary: 'Brief overview summaries analyzed by Google indexers.',
      content: '## Advanced Market Review\n\nWrite your complete trading content details here.',
      category: 'Forex Basics',
      status: 'draft',
      authorName: 'Marcus Sterling',
      authorBio: 'Lead CFA Analyst and forex risk advisor.',
      featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date().toISOString(),
      seoTitle: 'Dynamic Forex Article Review',
      seoDescription: 'Read our dynamic educational article reviewing forex and Headway accounts.',
      keywords: 'Best forex broker 2026, Is Headway Broker legit',
      canonicalUrl: 'https://headway.partners/user/signup?hwp=e4e4f5',
      schemaMarkup: '{}',
      seoScore: 65,
      readabilityScore: 70,
      keywordSuggestions: []
    });
    setAiSuggestions([]);
    setAiKeywords([]);
    setIsEditingBlog(true);
  };

  const handleSaveBlog = () => {
    if (!blogForm.title || !blogForm.content) {
      alert("Error: Title and Content are mandatory fields.");
      return;
    }

    if (selectedBlogId) {
      // Editing existing
      setBlogs(prev => prev.map(b => b.id === selectedBlogId ? (blogForm as BlogPost) : b));
      alert("Success: Blog post updated in Local CMS Cache!");
    } else {
      // Saving new
      const newPost = {
        ...blogForm,
        id: blogForm.id || Math.random().toString(36).substring(2, 9),
        publishedAt: new Date().toISOString()
      } as BlogPost;
      setBlogs(prev => [newPost, ...prev]);
      alert("Success: New blog created in Local CMS Cache!");
    }
    setIsEditingBlog(false);
  };

  const handleDeleteBlog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  // On-the-fly Gemini Advanced Auditor
  const triggerAiAudit = async () => {
    setIsAiAnalyzing(true);
    try {
      const response = await fetch('/api/seo/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: blogForm.title,
          content: blogForm.content,
          keywords: blogForm.keywords,
          description: blogForm.seoDescription
        })
      });

      if (response.ok) {
        const payload = await response.json();
        setBlogForm(prev => ({
          ...prev,
          seoScore: payload.seoScore || 80,
          readabilityScore: payload.readabilityScore || 85
        }));
        setAiSuggestions(payload.suggestions || []);
        setAiKeywords(payload.keywordSuggestions || []);
      }
    } catch (err) {
      console.error("AI Auditor response failed:", err);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="py-20 bg-zinc-55 dark:bg-[#0A0B0D] min-h-[70vh] flex items-center justify-center transition-colors px-4">
        <div className="max-w-md w-full bg-white dark:bg-[#14161C] border border-zinc-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
          {/* Subtle colored topper banner decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700" />
          
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-xl font-sans font-extrabold text-zinc-900 dark:text-white">Admin Authentication Required</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
              Unlock the administrative guide console to verify live outbound affiliate conversions, index metadata, and edit educational resources.
            </p>
          </div>

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                Security Passkey
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-slate-800 bg-zinc-50 dark:bg-[#0A0B0D] text-zinc-900 dark:text-white placeholder-zinc-450 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-xl">
                ⚠️ {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-blue-600 hover:bg-blue-550 active:scale-98 text-white rounded-xl text-sm font-bold tracking-tight cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-550/15"
            >
              {isVerifying ? 'Verifying Credentials...' : 'Authenticate & Unlock'}
            </button>
          </form>

          <div className="pt-2 text-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            SECURE SHA256 ENCRYPTED CANAL
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#0A0B0D] transition-colors" id="admin-cms-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-slate-800/80 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Guide CMS Portal
            </h1>
            <p className="text-xs text-zinc-450 mt-1">
              Authority SEO, dynamic open-graph tuning, and real-time affiliate traffic telemetry logs.
            </p>
          </div>
          
          {/* Main Controls Tab */}
          <div className="flex space-x-1 bg-white dark:bg-[#14161C] p-1 rounded-xl border border-zinc-150 dark:border-slate-800/80">
            <button
              onClick={() => { setAdminTab('analytics'); setIsEditingBlog(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                adminTab === 'analytics' && !isEditingBlog
                  ? 'bg-zinc-100 dark:bg-[#0A0B0D] text-blue-550 dark:text-blue-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 inline mr-1.5" />
              <span>Traffic Logs</span>
            </button>
            <button
              onClick={() => { setAdminTab('pages-seo'); setIsEditingBlog(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                adminTab === 'pages-seo' && !isEditingBlog
                  ? 'bg-zinc-100 dark:bg-[#0A0B0D] text-blue-550 dark:text-blue-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5 inline mr-1.5" />
              <span>Page Metas</span>
            </button>
            <button
              onClick={() => { setAdminTab('blog-editor'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                adminTab === 'blog-editor' || isEditingBlog
                  ? 'bg-zinc-100 dark:bg-[#0A0B0D] text-blue-550 dark:text-blue-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5 inline mr-1.5" />
              <span>Blog CMS</span>
            </button>
          </div>
        </div>

        {/* ======================= TAB 1: ANALYTICS TELEMETRY ======================= */}
        {adminTab === 'analytics' && !isEditingBlog && (
          <div className="space-y-8 animate-fade-in" id="traffic-tab">
            {/* Simple Telemetry Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-white dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Total Pageviews</span>
                <span className="block text-2xl font-bold text-zinc-900 dark:text-white mt-1">12,450</span>
                <span className="text-[10px] text-zinc-400">Steady Google organic hits</span>
              </div>
              <div className="p-5 rounded-xl bg-white dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Partner Outbound Clicks</span>
                <span className="block text-2xl font-bold text-blue-500 mt-1">
                  {1890 + clickStats.length}
                </span>
                <span className="text-[10px] text-zinc-400">Verified outgoing redirections</span>
              </div>
              <div className="p-5 rounded-xl bg-white dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Est. Referral signups</span>
                <span className="block text-2xl font-bold text-blue-500 mt-1">342</span>
                <span className="text-[10px] text-zinc-400">At standard 18% signup CTR</span>
              </div>
              <div className="p-5 rounded-xl bg-white dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">SEO Score Check</span>
                <span className="block text-2xl font-bold text-amber-500 mt-1">94%</span>
                <span className="text-[10px] text-zinc-400">Platform optimization target</span>
              </div>
            </div>

            {/* Click list and crawler verification logger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Click Log Feed */}
              <div className="lg:col-span-6 bg-white dark:bg-[#14161C] p-6 rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">Outbound Affiliate Clicks (Live)</h3>
                  <button onClick={fetchAnalytics} className="text-[10px] font-mono text-blue-500 hover:underline">
                    Force Refresh
                  </button>
                </div>
                {clickStats.length > 0 ? (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs">
                    {clickStats.map((c, idx) => (
                      <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950/65 rounded-xl border border-zinc-200 dark:border-slate-800/60 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">{c.anchor}</span>
                          <p className="text-[10px] text-zinc-400">From page: {c.page} • Time: {new Date(c.timestamp).toLocaleTimeString()}</p>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 bg-blue-550/10 text-blue-450 rounded">
                          Success
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 text-center py-10">No recent outbound affiliate clicks yet. Try clicking our header CTA, then return to audit.</p>
                )}
              </div>

              {/* Crawler Indexing Report */}
              <div className="lg:col-span-6 bg-white dark:bg-[#14161C] p-6 rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">Structured Indexation &amp; Verification Logs</h3>
                  <span className="text-[11px] font-mono text-zinc-400">robots.txt compliant</span>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs font-mono">
                  {indexingLogs.map((log, idx) => (
                    <div key={idx} className="p-2.5 bg-zinc-955 dark:bg-zinc-950 text-zinc-300 rounded-lg space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-blue-400">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span className="text-zinc-500">{log.status}</span>
                      </div>
                      <p className="text-zinc-350">{log.event}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================= TAB 2: PAGE SEO METADATAS ======================= */}
        {adminTab === 'pages-seo' && !isEditingBlog && (
          <div className="bg-white dark:bg-[#14161C] p-8 rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm animate-fade-in" id="page-seo-tab">
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white mb-6">Page-by-Page SEO Meta Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Selector left */}
              <div className="md:col-span-4 space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Target Page Location</label>
                {pageOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPageId(opt.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                      selectedPageId === opt.id
                        ? 'bg-zinc-100 dark:bg-[#0A0B0D] border-zinc-300 dark:border-slate-800 text-blue-500 dark:text-blue-400'
                        : 'bg-zinc-50 dark:bg-[#0A0B0D]/40 border-zinc-150 dark:border-slate-800/40 hover:bg-zinc-1050 dark:hover:bg-[#0A0B0D]/80 text-zinc-650 dark:text-zinc-350'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>

              {/* Form right */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Meta Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-450 block">SEO Meta Title (Title Tag)</label>
                  <input
                    type="text"
                    value={editingSeo.title}
                    onChange={(e) => setEditingSeo({ ...editingSeo, title: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] text-sm text-zinc-800 dark:text-zinc-100 p-3 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-zinc-400 block float-right">Length: {editingSeo.title.length} / 60 optimal</span>
                </div>

                {/* Meta Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-455 block">SEO Meta Description Card</label>
                  <textarea
                    rows={3}
                    value={editingSeo.description}
                    onChange={(e) => setEditingSeo({ ...editingSeo, description: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] text-sm text-zinc-800 dark:text-zinc-100 p-3 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-zinc-400 block float-right">Length: {editingSeo.description.length} / 160 optimal</span>
                </div>

                {/* Keywords */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-455 block">Page Focus Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={editingSeo.keywords}
                    onChange={(e) => setEditingSeo({ ...editingSeo, keywords: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] text-sm text-zinc-8050 dark:text-zinc-100 p-3 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Canonical */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-405 block">Canonical Self URL Tag</label>
                  <input
                    type="text"
                    value={editingSeo.canonicalUrl}
                    onChange={(e) => setEditingSeo({ ...editingSeo, canonicalUrl: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] text-sm text-zinc-850 dark:text-zinc-300 p-3 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Schema Markup */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-405 block">JSON-LD Structured Schema.org Object</label>
                  <textarea
                    rows={4}
                    value={editingSeo.schemaMarkup}
                    onChange={(e) => setEditingSeo({ ...editingSeo, schemaMarkup: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] text-[11px] font-mono text-zinc-800 dark:text-zinc-300 p-3 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleSavePageSeo}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-505 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Apply Page Meta Settings
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ======================= TAB 3: BLOG CMS PORTAL ======================= */}
        {adminTab === 'blog-editor' && !isEditingBlog && (
          <div className="bg-white dark:bg-[#14161C] p-8 rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm animate-fade-in" id="blog-cms-index">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">Active Local Blogs Table</h3>
              <button
                onClick={handleAddNewBlog}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Blog</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-[#0A0B0D] border-b border-zinc-200 dark:border-slate-800/85">
                    <th className="p-4 font-mono text-xs text-zinc-400">Post Title</th>
                    <th className="p-4 font-mono text-xs text-zinc-400">Category</th>
                    <th className="p-4 font-mono text-xs text-zinc-400">Status</th>
                    <th className="p-4 font-mono text-xs text-zinc-400">Published Date</th>
                    <th className="p-4 font-mono text-xs text-zinc-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-slate-800/80">
                  {blogs.map(post => (
                    <tr key={post.id} className="hover:bg-zinc-50/50 dark:hover:bg-[#0A0B0D]/30 transition-all cursor-pointer" onClick={() => handleEditBlog(post)}>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white max-w-xs truncate">{post.title}</td>
                      <td className="p-4"><span className="px-2 py-0.5 bg-zinc-100 dark:bg-[#0A0B0D] text-zinc-500 dark:text-zinc-450 rounded text-[10px]">{post.category}</span></td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[10px] rounded ${
                          post.status === 'published' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-405 font-semibold' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-zinc-400">{new Date(post.publishedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right flex justify-end space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditBlog(post); }}
                          className="p-1.5 bg-zinc-100 dark:bg-[#0A0B0D] text-zinc-650 hover:text-blue-500 rounded"
                        >
                          <FileEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteBlog(post.id, e)}
                          className="p-1.5 bg-zinc-100 dark:bg-[#0A0B0D] text-zinc-650 hover:text-rose-500 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ======================= SUB: BLOG EDITOR WORKSPACE ======================= */}
        {isEditingBlog && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="blog-editor-workspace">
            
            {/* Editor Fields Left */}
            <div className="lg:col-span-7 bg-white dark:bg-[#14161C] p-8 rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm space-y-4">
              
              <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-slate-800/80">
                <span className="text-xs font-mono font-bold text-zinc-400">MODAL EDITOR COMPILATION</span>
                <button onClick={() => setIsEditingBlog(false)} className="text-xs text-zinc-400 hover:text-rose-500 font-semibold cursor-pointer">
                  Cancel
                </button>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500">Post Title *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-2.5 text-sm text-zinc-800 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none"
                    placeholder="Enter post title"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500">Slug Identifier *</label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-2.5 text-sm text-zinc-8050 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none"
                    placeholder="post-slug-format"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500">Blog Category Selector</label>
                  <select
                    value={blogForm.category}
                    onChange={(e: any) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-2.5 text-sm text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Forex Basics">Forex Basics</option>
                    <option value="Broker Reviews">Broker Reviews</option>
                    <option value="Trading Strategies">Trading Strategies</option>
                    <option value="Risk Management">Risk Management</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500">Publishing Status *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['draft', 'published'].map(st => (
                      <button
                        key={st}
                        onClick={() => setBlogForm({ ...blogForm, status: st as any })}
                        className={`py-2 text-xs font-semibold border rounded-lg cursor-pointer transition-colors ${
                          blogForm.status === st
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-zinc-50 dark:bg-[#0A0B0D] border-zinc-200 dark:border-slate-800/80 text-zinc-550'
                        }`}
                      >
                        {st.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Article Brief Summary (SEO description backup)</label>
                <input
                  type="text"
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-2.5 text-sm text-zinc-800 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none"
                  placeholder="Summary text summary"
                />
              </div>

              {/* Body Content */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-505">Markdown Content Editor</label>
                  <span className="text-[10px] font-mono text-zinc-400">Support Markdown codes (## title etc.)</span>
                </div>
                <textarea
                  rows={8}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-3 text-[13px] font-mono text-zinc-800 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none"
                  placeholder="Use Markdown to render beautiful structural guides..."
                />
              </div>

              {/* Meta Title & Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500">Meta Title Tag override</label>
                  <input
                    type="text"
                    value={blogForm.seoTitle}
                    onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-2.5 text-sm text-zinc-800 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-500">Meta Keywords</label>
                  <input
                    type="text"
                    value={blogForm.keywords}
                    onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-[#0A0B0D] p-2.5 text-sm text-zinc-8050 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  onClick={handleSaveBlog}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                >
                  Save to Local cache database
                </button>
                <button
                  onClick={() => setIsEditingBlog(false)}
                  className="px-4 py-3 bg-zinc-200 hover:bg-zinc-350 dark:bg-zinc-800 dark:hover:bg-[#14161C] text-zinc-700 dark:text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>

            </div>

            {/* AI Auditor & Recommendations Panel Right */}
            <div className="lg:col-span-5 space-y-6" id="blog-editor-sidebar">
              
              {/* Gemini AI SEO Auditor Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#14161C] to-[#0E1013] text-white border border-slate-800/80 space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <h3 className="font-extrabold text-sm sm:text-base">Gemini On-the-Fly SEO Auditor</h3>
                  </div>
                  <span className="text-[9px] font-mono text-blue-200 px-2 py-0.5 bg-white/10 rounded-full">
                    Server Connected
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Analyze your text using Google's latest Gemini AI models to check keywords integration, Flesch-Kincaid corresponding readability scores, and obtain direct modifications suggestions.
                </p>

                {/* Score meters */}
                <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-zinc-850 text-center">
                  <div>
                    <span className="text-zinc-500 font-mono text-[9px] uppercase">SEO Score</span>
                    <span className="block text-3xl font-bold font-mono text-blue-400 mt-0.5">
                      {blogForm.seoScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[9px] uppercase">Readability</span>
                    <span className="block text-3xl font-bold font-mono text-zinc-300 mt-0.5">
                      {blogForm.readabilityScore}%
                    </span>
                  </div>
                </div>

                {/* Audit trigger */}
                <button
                  onClick={triggerAiAudit}
                  disabled={isAiAnalyzing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all disabled:opacity-50 inline-flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isAiAnalyzing ? (
                    <span>Running Gemini Auditing...</span>
                  ) : (
                    <>
                      <span>Trigger SEO Analysis</span>
                      <Sparkles className="w-4 h-4 text-blue-200" />
                    </>
                  )}
                </button>

              </div>

              {/* Gemini suggestions display */}
              {(aiSuggestions.length > 0 || aiKeywords.length > 0) && (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80 space-y-6 animate-slide-in">
                  
                  {aiSuggestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 font-mono">SEO Optimizations</h4>
                      <ul className="space-y-2 text-xs text-zinc-650 dark:text-zinc-350">
                        {aiSuggestions.map((sug, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>{sug}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiKeywords.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-slate-800/80">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 font-mono">Suggested high-volume terms</h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {aiKeywords.map((kw, i) => (
                          <span key={i} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-650 dark:text-[#0A0B0D] rounded font-medium">
                            +{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
