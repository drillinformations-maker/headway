import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrokerSpecs from './components/BrokerSpecs';
import ComparisonTable from './components/ComparisonTable';
import EducationalHub from './components/EducationalHub';
import Faqs from './components/Faqs';
import RegulatoryHub from './components/RegulatoryHub';
import BlogSystem from './components/BlogSystem';
import AdminCMS from './components/AdminCMS';

import { BlogPost, PageSeoSettings } from './types';
import { homepageSEOSections } from './data/homepageCopy';
import { seedBlogsData, seedPageSeoData } from './data/blogSeedData';
import { handleAffiliateRedirect } from './utils/tracking';
import { Shield, BookOpen, Clock, ArrowRight, ShieldCheck, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to a gorgeous dark fintech theme

  // CMS dynamic database states (persisted inside localStorage)
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const cached = localStorage.getItem('headway_cms_blogs');
    return cached ? JSON.parse(cached) : seedBlogsData;
  });

  const [pageSeoData, setPageSeoData] = useState<PageSeoSettings[]>(() => {
    const cached = localStorage.getItem('headway_cms_seo');
    return cached ? JSON.parse(cached) : seedPageSeoData;
  });

  // Sync state modifications to local persistence
  useEffect(() => {
    localStorage.setItem('headway_cms_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('headway_cms_seo', JSON.stringify(pageSeoData));
  }, [pageSeoData]);

  // Apply dark mode stylesheet indicators
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Hidden admin entry triggers (Ctrl + Alt + A, URL query param ?admin=true, or copyright double click)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('cms') === 'true' || params.get('auth') === 'admin') {
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow lowercase or uppercase a
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // DYNAMIC HEADER SEO INJECTION ENGINE (Simulates dynamic server-headers)
  useEffect(() => {
    // Determine SEO configuration for active route context
    const currentSeoConfig = pageSeoData.find(item => item.pageId === currentPage) || pageSeoData[0];
    
    if (currentSeoConfig) {
      // 1. Inject Page Title
      document.title = currentSeoConfig.title;

      // 2. Inject Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', currentSeoConfig.description);

      // 3. Inject Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', currentSeoConfig.keywords);

      // 4. Inject Canonical Link Tag
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', currentSeoConfig.canonicalUrl);

      // 5. Inject Structured JSON-LD JSON schema marker
      let schemaScript = document.getElementById('route-jsonld-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
      try {
        const script = document.createElement('script');
        script.id = 'route-jsonld-schema';
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(JSON.parse(currentSeoConfig.schemaMarkup), null, 2);
        document.head.appendChild(script);
      } catch (err) {
        console.warn("Invalid JSON schema syntax specified in CMS:", err);
      }
    }
  }, [currentPage, pageSeoData]);

  return (
    <div className="min-h-screen font-sans bg-[#0A0B0D] dark:bg-[#0A0B0D] text-zinc-850 dark:text-zinc-100 transition-colors duration-350 flex flex-col justify-between">
      
      {/* Dynamic Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Page Swapper */}
      <main className="flex-grow">
        
        {/* ===================== VIEW 1: HOMEPAGE (5000+ words Educational & Review Center) ===================== */}
        {currentPage === 'home' && (
          <div className="animate-fade-in" id="home-view">
            {/* Banner Hero */}
            <Hero currentPage={currentPage} />

            {/* Introductory statement */}
            <div className="py-12 bg-white dark:bg-[#0A0B0D] transition-colors border-b border-zinc-150 dark:border-slate-800/80">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-500 uppercase block mb-1">
                  PREMIUM FINTECH CONTEXT
                </span>
                <p className="text-zinc-650 dark:text-zinc-200 text-lg leading-relaxed font-normal">
                  Welcome to the ultimate directory for HeadwayBroker. This portal houses over 5,000 words of analyzed educational material. Use this independent analysis to inspect account spreads, overnight swap parameters, copy trading, and capital leverage restrictions to master the global market structure.
                </p>
              </div>
            </div>

            {/* 5000+ Words SEO Master Corpus Section (Highly Editorial, pristine layouts) */}
            <div className="py-16 bg-zinc-50 dark:bg-[#0E1013] transition-colors border-b border-zinc-150 dark:border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left Column: Semantic Quick Menu Indicator */}
                  <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80 space-y-4">
                      <span className="text-xs font-mono font-bold text-zinc-400 block uppercase">SEO Corpus Handbook</span>
                      <div className="space-y-1 text-xs">
                        {homepageSEOSections.map((sec, idx) => (
                          <a
                            key={idx}
                            href={`#${sec.id}`}
                            className="block py-2 px-3 hover:text-blue-400 rounded hover:bg-zinc-50 dark:hover:bg-[#0A0B0D] text-zinc-550 dark:text-zinc-300 font-semibold"
                          >
                            {idx + 1}. {sec.title.split(':')[0]}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-[#14161C] to-[#0E1013] rounded-2xl border border-slate-800 text-white text-xs space-y-4 shadow">
                      <span className="font-mono text-blue-400 block uppercase text-[10px]">Affiliate Portal</span>
                      <p className="text-[11px] leading-relaxed text-zinc-400">
                        Maximize your trade execution with standard swap-free Islamic accounts or cent parameters on Metatrader platforms.
                      </p>
                      <button
                        onClick={() => handleAffiliateRedirect('Sidebar Quick Signup CTA', currentPage)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-505 font-bold rounded-lg text-white transition-colors cursor-pointer"
                      >
                        Register Account Now
                      </button>
                    </div>
                  </div>

                  {/* Right Column: 5000+ Words of Editorial Excellence */}
                  <div className="lg:col-span-9 space-y-12">
                    {homepageSEOSections.map((section, sIdx) => (
                      <section
                        key={section.id}
                        id={section.id}
                        className="bg-white dark:bg-[#14161C]/50 border border-zinc-150 dark:border-slate-800/50 p-8 sm:p-10 rounded-3xl space-y-6 shadow-sm hover:border-blue-500/15 duration-300 transition-all scroll-mt-24"
                      >
                        <div>
                          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                            {section.subtitle}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                            {section.title}
                          </h3>
                        </div>

                        {/* Article body paragraphs - parsed & visually enriched */}
                        <div className="space-y-6 text-sm leading-relaxed">
                          
                          {section.id === 'executive-summary' && (
                            <div className="space-y-6">
                              {/* Highlight Lead Paragraph */}
                              <p className="text-[#2563EB] dark:text-blue-400 font-medium text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                                {section.paragraphs[0]}
                              </p>
                              
                              {/* Premium Editorial Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80">
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-2 flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Legitimacy &amp; Custody checks</span>
                                  </h4>
                                  <p className="text-zinc-405 text-xs leading-relaxed">
                                    {section.paragraphs[1]}
                                  </p>
                                </div>
                                <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80">
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-2 flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-550" />
                                    <span>STP Liquidity matching</span>
                                  </h4>
                                  <p className="text-zinc-405 text-xs leading-relaxed">
                                    {section.paragraphs[2]}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Remaining copy for completeness */}
                              <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed mt-4">
                                {section.paragraphs[3]}
                              </p>
                              <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed font-normal">
                                {section.paragraphs[4]}
                              </p>
                            </div>
                          )}

                          {section.id === 'technical-specifications' && (
                            <div className="space-y-6">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
                                {section.paragraphs[0]}
                              </p>
                              
                              {/* Interactive Bento Spec Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/10">
                                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full font-mono font-black uppercase mb-3 inline-block">EA SANDBOXING</span>
                                  <h4 className="font-bold text-base text-zinc-900 dark:text-white mb-1">Cent System</h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    Offers fractional exposure parameters enabling real-time Expert Advisor auditing.
                                  </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10">
                                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full font-mono font-black uppercase mb-3 inline-block">STABILIZED BALANCES</span>
                                  <h4 className="font-bold text-base text-zinc-900 dark:text-white mb-1">Standard System</h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    Optimized floating spreads starting from 1.0 pips under zero dynamic brokerage commissions.
                                  </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10">
                                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full font-mono font-black uppercase mb-3 inline-block">RAW FEES</span>
                                  <h4 className="font-bold text-base text-zinc-900 dark:text-white mb-1">Pro System</h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    Raw institutional pricing starting directly from 0.0 pips for professional order scalping.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
                                <p>{section.paragraphs[1]}</p>
                                <p>{section.paragraphs[2]}</p>
                                <p>{section.paragraphs[3]}</p>
                                <p>{section.paragraphs[4]}</p>
                              </div>
                            </div>
                          )}

                          {section.id === 'trading-mechanics' && (
                            <div className="space-y-6">
                              {/* Split Layout: text + mock trading chart visualization */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                <div className="lg:col-span-7 space-y-4 text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed">
                                  <p>{section.paragraphs[0]}</p>
                                  <p>{section.paragraphs[1]}</p>
                                </div>
                                
                                <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0A0B0D] border border-slate-800 space-y-4">
                                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                                    <span>DYNAMIC INTERBANK SPREAD</span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-850 text-center">
                                      <span className="text-[10px] font-mono text-zinc-400 block mb-1">EURUSD BID</span>
                                      <span className="text-xl font-bold font-mono text-emerald-400">1.085<span className="text-2xl font-black">42</span></span>
                                    </div>
                                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-850 text-center">
                                      <span className="text-[10px] font-mono text-zinc-400 block mb-1">EURUSD ASK</span>
                                      <span className="text-xl font-bold font-mono text-rose-450">1.085<span className="text-2xl font-black">44</span></span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 px-1 border-t border-zinc-800/80 pt-2.5">
                                    <span>Floating Spread Sizing:</span>
                                    <span className="font-bold text-blue-400">0.2 Pips</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
                                <p>{section.paragraphs[2]}</p>
                                <p>{section.paragraphs[3]}</p>
                              </div>
                            </div>
                          )}

                          {section.id === 'platform-ecosystem' && (
                            <div className="space-y-6">
                              <p className="text-indigo-400 font-medium text-base leading-relaxed bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10">
                                {section.paragraphs[0]}
                              </p>
                              
                              {/* Infographic block of platform terminals */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                                <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/85">
                                  <h4 className="font-bold text-base text-zinc-900 dark:text-white mb-2">MetaTrader 4 Legacy Core</h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                                    {section.paragraphs[1]}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] bg-zinc-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-semibold">9 TIMEFRAMES</span>
                                    <span className="text-[10px] bg-zinc-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-semibold">MQL4 SCRIPTING</span>
                                    <span className="text-[10px] bg-zinc-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-semibold">STABLE</span>
                                  </div>
                                </div>
                                <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/85">
                                  <h4 className="font-bold text-base text-zinc-900 dark:text-white mb-2">MetaTrader 5 Multi-Asset Ultra</h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                                    {section.paragraphs[2]}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-semibold">21 TIMEFRAMES</span>
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-semibold">DOM GRAPHING</span>
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-semibold">MULTI-THREADED</span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-zinc-650 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed p-4 bg-zinc-50 dark:bg-zinc-950/20 rounded-xl border border-zinc-800/60">
                                <strong>Social Strategy CopyTrading:</strong> {section.paragraphs[3]}
                              </p>
                            </div>
                          )}

                          {section.id === 'safeguards-and-deposits' && (
                            <div className="space-y-6">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
                                {section.paragraphs[0]}
                              </p>
                              
                              {/* Deposit / Withdrawal channels grid */}
                              <div className="p-6 bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent rounded-3xl border border-blue-500/10 my-6">
                                <span className="text-[10px] font-mono tracking-widest text-[#2563EB] dark:text-blue-400 font-bold uppercase block mb-3 animate-[pulse_12s_infinite]">ACCEPTED FUNDING CHANNELS</span>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                                  <div className="p-3 bg-white dark:bg-[#14161C] rounded-xl border border-zinc-150 dark:border-slate-800/60 text-xs font-bold text-zinc-850 dark:text-zinc-200">
                                    🏦 BANK WIRE INFRA
                                  </div>
                                  <div className="p-3 bg-white dark:bg-[#14161C] rounded-xl border border-zinc-150 dark:border-slate-800/60 text-xs font-bold text-zinc-850 dark:text-zinc-200">
                                    💳 VISA / MASTERCARD
                                  </div>
                                  <div className="p-3 bg-white dark:bg-[#14161C] rounded-xl border border-zinc-150 dark:border-slate-800/60 text-xs font-bold text-zinc-850 dark:text-zinc-200">
                                    🪙 USDT / BITCOIN / ETH
                                  </div>
                                  <div className="p-3 bg-white dark:bg-[#14161C] rounded-xl border border-zinc-150 dark:border-slate-800/60 text-xs font-bold text-zinc-850 dark:text-zinc-200">
                                    📱 LOCAL ASIA E-WALLETS
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
                                <p>{section.paragraphs[1]}</p>
                                <p>{section.paragraphs[2]}</p>
                                <p>{section.paragraphs[3]}</p>
                              </div>
                            </div>
                          )}

                          {section.id === 'trading-strategies' && (
                            <div className="space-y-6">
                              <p className="text-zinc-[650] dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
                                {section.paragraphs[0]}
                              </p>

                              {/* Educational FX Strategies blocks with icons */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#14161C]/60 hover:bg-zinc-100 dark:hover:bg-[#14161C] border border-zinc-150 dark:border-slate-800/60 transition-colors">
                                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl w-max mb-3">
                                    <TrendingUp className="w-5 h-5 block" />
                                  </div>
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1.5">Trend-Following</h4>
                                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                                    {section.paragraphs[1]}
                                  </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#14161C]/60 hover:bg-zinc-100 dark:hover:bg-[#14161C] border border-zinc-150 dark:border-slate-800/60 transition-colors">
                                  <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl w-max mb-3">
                                    <Activity className="w-5 h-5 block" />
                                  </div>
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1.5">Swing Positions</h4>
                                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                                    {section.paragraphs[2]}
                                  </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#14161C]/60 hover:bg-zinc-100 dark:hover:bg-[#14161C] border border-zinc-150 dark:border-slate-800/60 transition-colors">
                                  <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl w-max mb-3">
                                    <Shield className="w-5 h-5 block" />
                                  </div>
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1.5">Micro-Lot Scalping</h4>
                                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                                    {section.paragraphs[3]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Semantic keyword metrics footnotes - increases search crawl value */}
                        {section.keyTerms && (
                          <div className="pt-4 border-t border-zinc-100 dark:border-slate-800/50">
                            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-3">
                              Index Keyword Footnotes
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {section.keyTerms.map((kt, kIdx) => (
                                <div key={kIdx} className="p-3 bg-zinc-50 dark:bg-[#0A0B0D]/40 rounded-xl border border-zinc-100 dark:border-slate-800/40">
                                  <span className="font-bold text-xs text-zinc-855 dark:text-zinc-250 block font-mono">
                                    &ldquo;{kt.term}&rdquo;
                                  </span>
                                  <p className="text-[11px] text-zinc-450 leading-relaxed mt-1">
                                    {kt.definition}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Injected Sign up Call To Action for maximum convert conversions */}
                        {sIdx % 2 === 1 && (
                          <div className="p-6 bg-blue-600/5 dark:bg-blue-400/5 border border-blue-500/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                            <div className="space-y-1">
                              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                                Sizing Execution Anchor
                              </span>
                              <p className="text-xs text-zinc-505 dark:text-zinc-350">
                                Deploy standard or cent accounts under $1 leverage settings with the official Headway application.
                              </p>
                            </div>
                            <button
                              onClick={() => handleAffiliateRedirect(`Corpus CTA section - ${section.id}`, currentPage)}
                              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-505 text-white font-bold text-xs tracking-tight rounded-xl shrink-0 cursor-pointer transition-transform duration-200"
                            >
                              Register Managed Account
                            </button>
                          </div>
                        )}

                      </section>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Interactive Spread Matrices (ComparisonTable) */}
            <ComparisonTable currentPage={currentPage} />

            {/* Technical Broker Attributes Grid (BrokerSpecs) */}
            <BrokerSpecs currentPage={currentPage} />

            {/* Leverage Sizing Simulator Academy (EducationalHub) */}
            <EducationalHub currentPage={currentPage} />

            {/* Advanced Schema-Linked Accordion FAQS */}
            <Faqs currentPage={currentPage} />

          </div>
        )}

        {/* ===================== VIEW 2: FULL PRODUCT TECHNICAL ANALYSIS ===================== */}
        {currentPage === 'review' && (
          <div className="animate-fade-in" id="review-view">
            <div className="py-12 bg-zinc-50 dark:bg-[#0E1013] border-b border-zinc-200 dark:border-slate-800/80 transition-colors">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#2563EB] dark:text-blue-400 bg-blue-500/10 uppercase">
                  Technical Specifications Audit
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-zinc-900 dark:text-white leading-none tracking-tight pt-1">
                  Headway Broker: Analytical Feature Review
                </h1>
                <p className="text-zinc-500 dark:text-zinc-350 text-sm max-w-2xl mx-auto leading-relaxed">
                  Deep analyze interbank Straight-Through Processing, available leverage bounds, fee directories, and deposit processors.
                </p>
              </div>
            </div>

            {/* Attributes Matrix */}
            <BrokerSpecs currentPage={currentPage} />

            {/* Cost Tables */}
            <ComparisonTable currentPage={currentPage} />
          </div>
        )}

        {/* ===================== VIEW 3: EDUCATIONAL HUB & SIMULATORS ===================== */}
        {currentPage === 'forex' && (
          <div className="animate-fade-in" id="education-view">
            <div className="py-12 bg-zinc-50 dark:bg-[#0E1013] border-b border-zinc-200 dark:border-slate-800/80 transition-colors">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">
                  Academic Portals
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Forex Trading Academy &amp; Risks
                </h1>
                <p className="text-zinc-500 dark:text-zinc-350 text-sm max-w-xl mx-auto font-normal">
                  Independent educational masterclass explaining pips values, rollover swap mechanics, and leverages risk management calculations.
                </p>
              </div>
            </div>

            {/* Sizing Simulators */}
            <EducationalHub currentPage={currentPage} />
            
            {/* Display Reviews Specs inline inside education */}
            <div className="py-12 bg-zinc-50 dark:bg-[#0E1013] transition-colors border-t border-zinc-200 dark:border-slate-800/80">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
                <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Ready to begin trading with a compliant Cent or Standard set?</h3>
                <p className="text-xs text-zinc-500 max-w-lg mx-auto">
                  Practice sizing with direct risk warnings. Open your live contract settings utilizing the $1 minimum deposit parameters.
                </p>
                <button
                  onClick={() => handleAffiliateRedirect('Middle Education Banner CTA', currentPage)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-505 text-white font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
                >
                  Configure My Trading Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW 4: SEO SYSTEM BLOG ===================== */}
        {currentPage === 'blog' && (
          <div className="animate-fade-in" id="blog-view">
            <BlogSystem blogs={blogs} currentPage={currentPage} />
          </div>
        )}

        {/* ===================== VIEW 5: ETHICS & EEAT DOCUMENTATION ===================== */}
        {currentPage === 'disclosure' && (
          <div className="animate-fade-in" id="disclosure-view">
            <RegulatoryHub />
          </div>
        )}

        {/* ===================== VIEW 6: ADMINISTRATIVE CMS DASHBOARD ===================== */}
        {currentPage === 'admin' && (
          <div className="animate-fade-in" id="admin-view">
            <AdminCMS
              blogs={blogs}
              setBlogs={setBlogs}
              currentPageSeo={pageSeoData}
              setCurrentPageSeo={setPageSeoData}
              currentPage={currentPage}
            />
          </div>
        )}

      </main>

      {/* Structured Legal and Risk Warnings Footer Section */}
      <footer className="bg-zinc-950 text-zinc-500 py-12 border-t border-zinc-900 text-xs sm:text-sm font-sans transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-6 border-b border-zinc-900">
            {/* Title */}
            <div className="md:col-span-8 space-y-2">
              <span className="font-sans font-black text-white text-lg tracking-tight">
                Headway<span className="text-blue-500 font-medium">Guide</span>
              </span>
              <p className="text-zinc-450 leading-relaxed text-xs">
                An expert-led independent promotional and educational directory. We provide technical evaluation, cost matrices reviews, and trading simulators for the retail market sector.
              </p>
            </div>
            {/* Links */}
            <div className="md:col-span-4 flex flex-wrap gap-x-4 gap-y-2 text-xs md:justify-end">
              <button onClick={() => { setCurrentPage('disclosure'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="hover:text-blue-400 transition-colors">Editorial Principles</button>
              <span>|</span>
              <button onClick={() => { setCurrentPage('disclosure'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="hover:text-blue-400 transition-colors">Affiliate Disclosures</button>
              <span>|</span>
              <button onClick={() => { setCurrentPage('disclosure'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="hover:text-blue-400 transition-colors">Risk Warnings</button>
            </div>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-zinc-500 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-900">
            <div className="flex items-center space-x-2 text-amber-500">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="font-black uppercase tracking-wider text-[11px]">Strict Leverage &amp; Stop-Out Margin Warning</span>
            </div>
            
            <p className="text-zinc-450 font-normal">
              <strong>Trading involves risk of loss.</strong> Leveraged margin contracts, including Foreign Exchange derivatives, indices, and metals CFDs are highly volatile speculative structures. They expose your capital principal to immediate Drawdowns. High adjustable leverage up to 1:Unlimited multiplies both paper profits and actual total deficits fast. 
            </p>
            
            <p className="text-zinc-500 font-normal">
              If account equity drops below interest limits, order books execute Stop-Out automatic liquidations immediately, closing transactions at active interbank spreads. Never fund speculative configurations using capital reserves you cannot afford to completely lose.
            </p>

            <span 
              className="block text-[11px] font-mono text-zinc-400 cursor-help hover:text-blue-400/80 select-none transition-colors"
              title="Double-click to verify administrator environment"
              onDoubleClick={() => {
                setCurrentPage('admin');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              © 2026 Headway Guide Affiliate Network. Independent partner guide. Referrals signify commercial marketing support.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
