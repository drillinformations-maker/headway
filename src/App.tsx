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
import { Shield, BookOpen, Clock, ArrowRight, ShieldCheck, TrendingUp, AlertTriangle, Activity, Percent, Gift, Coins, Trophy, Users } from 'lucide-react';

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

                          {section.id === 'worldcup-2026-promotion' && (
                            <div className="space-y-6">
                              {/* Descriptive block */}
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
                                {section.paragraphs[0]}
                              </p>

                              {/* Key Highlights Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                <div className="p-5 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80 space-y-2">
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span>Massive Prize Fund &amp; Leaderboards</span>
                                  </h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    A grand prize pool of <strong>$100,000 USD</strong> (or more) is assigned for the competition over the course of the promo. The event features global leaderboard metrics and team rankings to award high performers.
                                  </p>
                                </div>
                                
                                <div className="p-5 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80 space-y-2">
                                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Over 3,000 Winners Scheduled</span>
                                  </h4>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    By building an incredibly inclusive promotional structure, Headway welcomes more than <strong>3,000+ Winners</strong> to share in the cash distributions, vouchers, and tangible devices.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                                <h4 className="text-base font-black text-zinc-900 dark:text-white mt-4">
                                  Competition Mechanics &amp; Event Structure
                                </h4>
                                <p>
                                  {section.paragraphs[2]}
                                </p>
                                <p>
                                  {section.paragraphs[1]}
                                </p>
                              </div>

                              {/* Highlight Bullet List */}
                              <div className="mt-6 border-t border-zinc-100 dark:border-slate-800/50 pt-6">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
                                  Verified Highlights (Facts from Source)
                                </h4>
                                <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                                  <li><strong>Headway World Cup 2026 Keyword Integration:</strong> Features a dedicated prize pool of $100,000+ USD.</li>
                                  <li><strong>Flagship 1st Place Spot:</strong> Wins the state-of-the-art Hisense PX3SE-PRO UST Laser Cinema Projector.</li>
                                  <li><strong>Participant Pool size:</strong> Target pool of 3,000+ Winners.</li>
                                  <li><strong>Registration Links:</strong> Open globally via the tracking portals below.</li>
                                  <li><strong>Official Competition timelines and calendars:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Scoring equations and specific lot scales:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Runner-up reward breakdown structure:</strong> NOT SPECIFIED IN SOURCE.</li>
                                </ul>
                              </div>

                              {/* CTA Button Block */}
                              <div className="p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                                <div className="space-y-1">
                                  <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-450 uppercase tracking-widest block">
                                    Official Promotion Entry
                                  </span>
                                  <p className="text-xs text-zinc-450 dark:text-zinc-400">
                                    Register now to claim your place in the Headway World Cup 2026 competition.
                                  </p>
                                </div>
                                <a
                                  href="https://headway.partners/user/signup?hwp=e4e4f5"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shrink-0 transition-transform active:scale-95 duration-150 inline-flex items-center space-x-2 shadow-lg shadow-blue-500/20"
                                >
                                  <span>Join Headway World Cup 2026</span>
                                  <ArrowRight className="w-4 h-4" />
                                </a>
                              </div>

                              {/* Risk Disclaimer */}
                              <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 mt-4 flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                <span><strong>Risk Warning:</strong> Trading involves significant risk of loss.</span>
                              </div>
                            </div>
                          )}

                          {section.id === 'deposit-bonus-promotion' && (
                            <div className="space-y-6 animate-fade-in">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                                {section.paragraphs[0]}
                              </p>

                              {/* Interactive Margin Calculator */}
                              <div className="my-6">
                                <DepositBonusCalculator />
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                                <p>
                                  {section.paragraphs[1]}
                                </p>
                                <p>
                                  {section.paragraphs[2]}
                                </p>
                              </div>

                              {/* Highlight Bullet List */}
                              <div className="mt-6 border-t border-zinc-100 dark:border-slate-800/50 pt-6">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <Percent className="w-4 h-4 text-blue-500 animate-[pulse_3s_infinite]" />
                                  <span>Verified Deposit Bonus Specifications</span>
                                </h4>
                                <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                                  <li><strong>Margin Booster Support:</strong> Claim a massive +75% bonus directly applied to your first deposit.</li>
                                  <li><strong>Eligible Accounts:</strong> Applies seamlessly on Cent and Standard account tiers.</li>
                                  <li><strong>Platform Usability:</strong> Bonus margin integrates perfectly on MetaTrader 4 and MetaTrader 5 terminals.</li>
                                  <li><strong>Registration requirement:</strong> Must activate the promotion inside the Personal Cabinet prior to depositing.</li>
                                  <li><strong>Maximum bonus credit cap:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Execution lot volume formulas:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Third-party payment gateways fees:</strong> NOT SPECIFIED IN SOURCE.</li>
                                </ul>
                              </div>

                              {/* CTA Button Block */}
                              <div className="p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                                <div className="space-y-1">
                                  <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-450 uppercase tracking-widest block">
                                    Official 75% Bonus Entry
                                  </span>
                                  <p className="text-xs text-zinc-455 dark:text-zinc-400">
                                    Register and select the promo inside your cabinet to claim your margin booster.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAffiliateRedirect('Deposit Bonus Promo Entry', currentPage, 'https://headway.partners/promo/deposit-bonus/?hwp=e4e4f5')}
                                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shrink-0 transition-transform active:scale-95 duration-150 inline-flex items-center space-x-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                                >
                                  <span>Claim 75% Deposit Bonus</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Risk Warning Disclaimer */}
                              <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 mt-4 flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                <span><strong>Risk Warning:</strong> Leverage-boosting bonuses increase total open contract size potential. Trading remains highly speculative.</span>
                              </div>
                            </div>
                          )}

                          {section.id === 'bonus-150-promotion' && (
                            <div className="space-y-6 animate-fade-in">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                                {section.paragraphs[0]}
                              </p>

                              {/* Step pipeline visual */}
                              <div className="my-6">
                                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2 mb-4">
                                  <Coins className="w-4 h-4 text-emerald-500" />
                                  <span>The Risk-Free 7-Day Profit Pipeline</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-slate-800/80 space-y-2 relative">
                                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center font-mono text-xs font-bold border border-blue-500/20">1</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white pt-2">Sign Up &amp; Claim</h5>
                                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                                      Register a promo account. Headway instantly pre-funds it with a <strong>$150 USD</strong> trading balance—no deposit or credit card required.
                                    </p>
                                  </div>
                                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-slate-800/80 space-y-2 relative">
                                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center font-mono text-xs font-bold border border-blue-500/20">2</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white pt-2">Trade for 7 Days</h5>
                                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                                      Execute transactions across <strong>5 asset classes</strong> with standard spreads. Refine strategies in live execution for a full week risk-free.
                                    </p>
                                  </div>
                                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 space-y-2 relative">
                                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-emerald-600/10 text-emerald-500 flex items-center justify-center font-mono text-xs font-bold border border-emerald-500/20">3</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white pt-2">Transfer Your Profits</h5>
                                    <p className="text-zinc-450 text-[11px] leading-relaxed">
                                      When the week ends, withdraw or transfer up to <strong>$100 USD</strong> in generated profits directly to a live account after meeting lot targets.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                                <p>
                                  {section.paragraphs[1]}
                                </p>
                                <p>
                                  {section.paragraphs[2]}
                                </p>
                              </div>

                              {/* Highlights bullet list */}
                              <div className="mt-6 border-t border-zinc-100 dark:border-slate-800/50 pt-6">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                                  <span>Verified No-Deposit Bonus Facts</span>
                                </h4>
                                <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                                  <li><strong>Bonus Capital:</strong> Zero-risk pre-funded $150 USD promo account balance.</li>
                                  <li><strong>Withdrawable Cap:</strong> Maximum withdrawable/transferable trial profit is capped at $100 USD.</li>
                                  <li><strong>Supported Instruments:</strong> Spot Forex, Cryptos, Energies, Market Indices, and Metals.</li>
                                  <li><strong>Execution Duration:</strong> Strict 7-day trial period after which the initial capital expires.</li>
                                  <li><strong>Necessary lot quantities to unlock withdrawal:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Maximum active orders count:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Scalping/hedging strategy rules:</strong> NOT SPECIFIED IN SOURCE.</li>
                                </ul>
                              </div>

                              {/* CTA Button Block */}
                              <div className="p-6 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                                <div className="space-y-1">
                                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                                    Risk-Free Registration
                                  </span>
                                  <p className="text-xs text-zinc-455 dark:text-zinc-400">
                                    Open your $150 promo terminal now. Absolutely no deposit or initial credit card details required.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAffiliateRedirect('No Deposit Bonus Promo Entry', currentPage, 'https://headway.partners/promo/bonus-150/?hwp=e4e4f5')}
                                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shrink-0 transition-transform active:scale-95 duration-150 inline-flex items-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                                >
                                  <span>Get My $150 No-Deposit Bonus</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {section.id === 'giftshop-promotion' && (
                            <div className="space-y-6 animate-fade-in">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                                {section.paragraphs[0]}
                              </p>

                              {/* Gifts catalog showcase */}
                              <div className="my-6">
                                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2 mb-4">
                                  <Gift className="w-4 h-4 text-purple-500 animate-[bounce_3s_infinite]" />
                                  <span>Exclusive Rewards Catalog (Trade Lots, Get Gifts)</span>
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/80 text-center space-y-1">
                                    <span className="text-2xl block">🧢</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white">Broker Merch</h5>
                                    <p className="text-[10px] text-zinc-450">T-Shirts, Caps &amp; Notebooks</p>
                                    <span className="text-[10px] font-mono text-purple-500 font-bold block bg-purple-500/10 py-1 rounded-full mt-2">15 Crowns</span>
                                  </div>
                                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/80 text-center space-y-1">
                                    <span className="text-2xl block">🧥</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white">Premium Hoodies</h5>
                                    <p className="text-[10px] text-zinc-450">Heavyweight Designer Wear</p>
                                    <span className="text-[10px] font-mono text-purple-500 font-bold block bg-purple-500/10 py-1 rounded-full mt-2">40 Crowns</span>
                                  </div>
                                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/80 text-center space-y-1">
                                    <span className="text-2xl block">📱</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white">Apple iPad Air</h5>
                                    <p className="text-[10px] text-zinc-450">High-Performance Tablet</p>
                                    <span className="text-[10px] font-mono text-purple-500 font-bold block bg-purple-500/10 py-1 rounded-full mt-2">350 Crowns</span>
                                  </div>
                                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/80 text-center space-y-1">
                                    <span className="text-2xl block">⚡</span>
                                    <h5 className="font-bold text-xs text-zinc-900 dark:text-white">iPhone 15 Pro</h5>
                                    <p className="text-[10px] text-zinc-450">The Ultimate Trader Prize</p>
                                    <span className="text-[10px] font-mono text-purple-500 font-bold block bg-purple-500/10 py-1 rounded-full mt-2">850 Crowns</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                                <p>
                                  {section.paragraphs[1]}
                                </p>
                                <p>
                                  {section.paragraphs[2]}
                                </p>
                              </div>

                              {/* Highlights list */}
                              <div className="mt-6 border-t border-zinc-100 dark:border-slate-800/50 pt-6">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                                  <span>Verified Giftshop Mechanics</span>
                                </h4>
                                <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                                  <li><strong>Loyalty Points:</strong> Earn crowns continuously for every traded standard lot.</li>
                                  <li><strong>Free Crowns:</strong> Receive 2 Crowns immediately upon joining the Giftshop promotion.</li>
                                  <li><strong>Redemption Options:</strong> Range from branded broker apparel to Apple electronics, gadgets, and cash.</li>
                                  <li><strong>Eligible Accounts:</strong> Open to all Cent, Micro, Standard, and Pro account styles.</li>
                                  <li><strong>The exact conversion coefficient (number of lots per Crown):</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Physical shipping carrier channels:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Crowns expiry policies or inactivity penalties:</strong> NOT SPECIFIED IN SOURCE.</li>
                                </ul>
                              </div>

                              {/* CTA Button Block */}
                              <div className="p-6 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                                <div className="space-y-1">
                                  <span className="text-xs font-mono font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest block">
                                    Official Loyalty Entrance
                                  </span>
                                  <p className="text-xs text-zinc-455 dark:text-zinc-400">
                                    Open the catalog inside your client portal, join the Giftshop, and receive your 2 free Crowns instantly.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAffiliateRedirect('Giftshop Promo Entry', currentPage, 'https://headway.partners/promo/giftshop/?hwp=e4e4f5')}
                                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl shrink-0 transition-transform active:scale-95 duration-150 inline-flex items-center space-x-2 shadow-lg shadow-purple-500/20 cursor-pointer"
                                >
                                  <span>Join Headway Giftshop</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {section.id === 'demo-contests-promotion' && (
                            <div className="space-y-6 animate-fade-in">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                                {section.paragraphs[0]}
                              </p>

                              {/* Interactive Demo Practice Simulator */}
                              <div className="my-6">
                                <DemoContestsVisualizer />
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                                <p>
                                  {section.paragraphs[1]}
                                </p>
                                <p>
                                  {section.paragraphs[2]}
                                </p>
                              </div>

                              {/* Highlight Bullet List */}
                              <div className="mt-6 border-t border-zinc-100 dark:border-slate-800/50 pt-6">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <Trophy className="w-4 h-4 text-amber-500 animate-[pulse_3s_infinite]" />
                                  <span>Verified Demo Contests Specifications</span>
                                </h4>
                                <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                                  <li><strong>Zero Risk Capital:</strong> Compete entirely using virtual balances; no deposit or bank cards required.</li>
                                  <li><strong>The Face-Off Contest Pool:</strong> Combined grand cash prize pool of $3,150 USD.</li>
                                  <li><strong>Real Winnings Withdrawal:</strong> Earned championship cash is credited directly to active Standard or Cent accounts.</li>
                                  <li><strong>Supported Platforms:</strong> Fully active on industry-leading MetaTrader 4 and MetaTrader 5 software.</li>
                                  <li><strong>Contest round duration limits:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Maximum open positions volume:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Sub-account creation frequency:</strong> NOT SPECIFIED IN SOURCE.</li>
                                </ul>
                              </div>

                              {/* CTA Button Block */}
                              <div className="p-6 bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                                <div className="space-y-1">
                                  <span className="text-xs font-mono font-bold text-amber-500 dark:text-amber-450 uppercase tracking-widest block">
                                    Official Demo Tournament Entry
                                  </span>
                                  <p className="text-xs text-zinc-455 dark:text-zinc-400">
                                    Join the upcoming Face-Off battle. Form your trading team to split the $3,150 prize pool!
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAffiliateRedirect('Demo Contests Promo Entry', currentPage, 'https://headway.partners/promo/demo-contests/?hwp=e4e4f5')}
                                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl shrink-0 transition-transform active:scale-95 duration-150 inline-flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                                >
                                  <span>Enter Free Demo Contests</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {section.id === 'ib-partner-program' && (
                            <div className="space-y-6 animate-fade-in">
                              <p className="text-zinc-650 dark:text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                                {section.paragraphs[0]}
                              </p>

                              {/* Interactive Multi-Level Commission Calculator */}
                              <div className="my-6">
                                <IBCommissionCalculator />
                              </div>

                              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                                <p>
                                  {section.paragraphs[1]}
                                </p>
                                <p>
                                  {section.paragraphs[2]}
                                </p>
                              </div>

                              {/* Highlight Bullet List */}
                              <div className="mt-6 border-t border-zinc-100 dark:border-slate-800/50 pt-6">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <Users className="w-4 h-4 text-purple-500" />
                                  <span>Verified IB Partner Specifications</span>
                                </h4>
                                <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                                  <li><strong>Spread Share Commission:</strong> Earn up to a massive 42% of the broker's spread on referred client lots.</li>
                                  <li><strong>Three-Level Sub-IB payouts:</strong> Leverage multi-tier compounding commissions from direct and indirect sub-referrals.</li>
                                  <li><strong>Automated Daily Payouts:</strong> Withdraw accumulated rewards daily directly from your partner wallet.</li>
                                  <li><strong>0% withdrawal commissions:</strong> Collect your hard-earned payouts with zero administrative transaction fees.</li>
                                  <li><strong>Exact conversion equations per lot type:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Minimum monthly active client thresholds:</strong> NOT SPECIFIED IN SOURCE.</li>
                                  <li><strong>Detailed tracking cookies expiration periods:</strong> NOT SPECIFIED IN SOURCE.</li>
                                </ul>
                              </div>

                              {/* CTA Button Block */}
                              <div className="p-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                                <div className="space-y-1">
                                  <span className="text-xs font-mono font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest block">
                                    Official IB Affiliate Enrollment
                                  </span>
                                  <p className="text-xs text-zinc-455 dark:text-zinc-400">
                                    Become a partner of an award-winning ecosystem. Register your affiliate profile to unlock 42% spread commissions.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAffiliateRedirect('IB Partner Program Signup', currentPage, 'https://headway.partners/user/signup?hwp=e4e4f5')}
                                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl shrink-0 transition-transform active:scale-95 duration-150 inline-flex items-center space-x-2 shadow-lg shadow-purple-500/20 cursor-pointer"
                                >
                                  <span>Become an Introducing Broker</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
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

function DepositBonusCalculator() {
  const [amount, setAmount] = useState<number>(100);
  const bonus = amount * 0.75;
  const total = amount + bonus;
  
  return (
    <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80 space-y-4 text-left">
      <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span>Interactive Margin Calculator</span>
      </h4>
      <p className="text-zinc-450 dark:text-zinc-400 text-xs leading-relaxed">
        Select or enter a deposit amount to estimate the +75% bonus margin you will receive on your first funding.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-mono font-bold text-zinc-450 dark:text-zinc-450 uppercase tracking-wider mb-2">Select Preset Deposit (USD)</label>
          <div className="flex flex-wrap gap-2">
            {[10, 50, 100, 250, 500, 1000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`px-4 py-1.5 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                  amount === val
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                    : 'bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-350 border-zinc-200 dark:border-slate-800 hover:border-blue-500'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-[10px] font-mono font-bold text-zinc-450 dark:text-zinc-450 uppercase tracking-wider mb-2">Custom Deposit Amount</label>
          <div className="relative rounded-xl shadow-sm max-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-zinc-450 text-xs font-mono font-bold">$</span>
            </div>
            <input
              type="number"
              min="1"
              value={amount || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setAmount(isNaN(val) ? 0 : val);
              }}
              className="block w-full pl-7 pr-3 py-1.5 text-xs font-mono font-bold bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Custom"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-150 dark:border-slate-800/40">
          <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/40">
            <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-550 block uppercase tracking-wider">YOUR DEPOSIT</span>
            <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">${amount}</span>
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/40">
            <span className="text-[9px] font-mono text-blue-400 block uppercase tracking-wider">75% PROMO BONUS</span>
            <span className="text-sm font-bold font-mono text-blue-500 dark:text-blue-400">+${(amount * 0.75).toFixed(0)}</span>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-xl border border-blue-500/10">
            <span className="text-[9px] font-mono text-indigo-400 block uppercase tracking-wider">TOTAL TRADING MARGIN</span>
            <span className="text-sm font-black font-mono text-indigo-500 dark:text-indigo-400">${(amount * 1.75).toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoContestsVisualizer() {
  const [selectedAsset, setSelectedAsset] = useState<string>('EUR/USD');
  const [tradeDirection, setTradeDirection] = useState<'BUY' | 'SELL' | null>(null);
  const [simulatedTrades, setSimulatedTrades] = useState<{ id: number; asset: string; direction: 'BUY' | 'SELL'; profit: number }[]>([]);
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Alpha_Trader_ID", balance: 52140, isUser: false },
    { rank: 2, name: "Indo_Scalper", balance: 48950, isUser: false },
    { rank: 3, name: "FX_Championship", balance: 41200, isUser: false },
    { rank: 4, name: "You (Demo Practice)", balance: 10000, isUser: true },
    { rank: 5, name: "Micro_Master", balance: 9800, isUser: false }
  ]);

  const handlePracticeTrade = (dir: 'BUY' | 'SELL') => {
    setTradeDirection(dir);
    
    // Simulate high-impact pricing outcomes
    setTimeout(() => {
      const isProfit = Math.random() > 0.4; // 60% chance of profit for high gamification satisfaction
      const pipChange = parseFloat((Math.random() * 15 + 2).toFixed(1));
      const calculatedProfit = isProfit ? Math.round(pipChange * 125) : Math.round(-pipChange * 105);
      
      const newTrade = {
        id: Date.now(),
        asset: selectedAsset,
        direction: dir,
        profit: calculatedProfit
      };
      
      setSimulatedTrades(prev => [newTrade, ...prev].slice(0, 5));
      
      // Update leaderboard
      setLeaderboard(prev => {
        const updated = prev.map(item => {
          if (item.isUser) {
            const nextBalance = Math.max(0, item.balance + calculatedProfit);
            return { ...item, balance: nextBalance };
          }
          // slightly update opponents to simulate live contest dynamics
          return { ...item, balance: Math.round(item.balance + (Math.random() * 200 - 80)) };
        });
        
        // sort leaderboard
        const sorted = [...updated].sort((a, b) => b.balance - a.balance);
        return sorted.map((item, idx) => ({ ...item, rank: idx + 1 }));
      });
      
      setTradeDirection(null);
    }, 800);
  };

  const userRank = leaderboard.find(item => item.isUser)?.rank || 4;
  const userBalance = leaderboard.find(item => item.isUser)?.balance || 10000;

  return (
    <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80 space-y-5 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Risk-Free Contest Practice Terminal</span>
          </h4>
          <p className="text-zinc-450 dark:text-zinc-400 text-xs leading-relaxed">
            Test your skills instantly. Predict price movements of primary liquid pairings to climb the simulated 'Face-Off' scoreboard.
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 w-max shrink-0 self-start sm:self-center">
          <span className="text-[10px] font-mono font-bold text-blue-500 dark:text-blue-450">DEMO PRACTICE MODE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Practice Control Pad */}
        <div className="p-4 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Trading Asset</span>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="text-xs bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-slate-800 rounded-lg px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="EUR/USD">EUR/USD (Forex)</option>
              <option value="XAU/USD">Gold (Metals)</option>
              <option value="BTC/USD">Bitcoin (Cryptos)</option>
              <option value="US30">Dow Jones (Indices)</option>
            </select>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border border-zinc-150 dark:border-slate-800/30 flex justify-between items-center">
            <span className="text-xs text-zinc-455 dark:text-zinc-400">Practice Account:</span>
            <span className="text-sm font-black font-mono text-zinc-900 dark:text-white">${userBalance.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              disabled={tradeDirection !== null}
              onClick={() => handlePracticeTrade('BUY')}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-95 text-center block"
            >
              {tradeDirection === 'BUY' ? 'Opening...' : '📈 BUY (Long)'}
            </button>
            <button
              type="button"
              disabled={tradeDirection !== null}
              onClick={() => handlePracticeTrade('SELL')}
              className="py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-95 text-center block"
            >
              {tradeDirection === 'SELL' ? 'Opening...' : '📉 SELL (Short)'}
            </button>
          </div>

          {/* Practice History */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-slate-800/40">
            <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-wider mb-1">Recent Execution Feeds</span>
            {simulatedTrades.length === 0 ? (
              <p className="text-[10px] text-zinc-450 italic py-1">No orders opened yet. Execute BUY or SELL to experience live matching.</p>
            ) : (
              <div className="space-y-1">
                {simulatedTrades.map((t) => (
                  <div key={t.id} className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-zinc-50 dark:border-slate-800/20 last:border-0">
                    <span className="text-zinc-455 dark:text-zinc-400">{t.asset} ({t.direction})</span>
                    <span className={t.profit >= 0 ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
                      {t.profit >= 0 ? `+$${t.profit}` : `-$${Math.abs(t.profit)}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Contest Standings */}
        <div className="p-4 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 font-mono uppercase tracking-wider">Live Face-Off Standings</span>
            <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">Active Pool: $3,150</span>
          </div>

          <div className="space-y-1.5">
            {leaderboard.map((item) => (
              <div
                key={item.name}
                className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors duration-200 ${
                  item.isUser
                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-zinc-50 dark:bg-zinc-900/20 border border-transparent text-zinc-650 dark:text-zinc-350'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] text-zinc-400 w-4">#{item.rank}</span>
                  <span>{item.name}</span>
                </div>
                <span className="font-mono">${item.balance.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <span className="text-[10px] text-zinc-450 dark:text-zinc-400 font-medium">
              Your Current simulated Standing: <strong className="text-blue-500 font-bold">#{userRank} out of 5</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IBCommissionCalculator() {
  const [directClients, setDirectClients] = useState<number>(15);
  const [lotsPerClient, setLotsPerClient] = useState<number>(5);
  const [subIbsCount, setSubIbsCount] = useState<number>(3);
  
  // Commission calculations based on standard Headway parameters
  const directCommission = directClients * lotsPerClient * 12;
  const tier2Commission = subIbsCount * 5 * 5 * 2;
  const tier3Commission = subIbsCount * 2 * 5 * 5 * 1;
  const totalMonthlyEarnings = directCommission + tier2Commission + tier3Commission;

  return (
    <div className="p-6 bg-zinc-50 dark:bg-[#0A0B0D]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80 space-y-6 text-left">
      <div className="space-y-1">
        <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>Interactive Partner Revenue Calculator</span>
        </h4>
        <p className="text-zinc-450 dark:text-zinc-400 text-xs leading-relaxed">
          Simulate your potential passive earnings as a Headway Introducing Broker (IB). Adjust sliders to see multi-tier compounding effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders Container */}
        <div className="space-y-4">
          {/* Direct Clients */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-650 dark:text-zinc-350">Direct Referrals (Tier 1)</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{directClients} clients</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={directClients}
              onChange={(e) => setDirectClients(parseInt(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
              <span>1 Client</span>
              <span>100 Clients</span>
            </div>
          </div>

          {/* Lots traded */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-650 dark:text-zinc-350">Avg Standard Lots Traded (Per Client / Mo)</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{lotsPerClient} Lots</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={lotsPerClient}
              onChange={(e) => setLotsPerClient(parseInt(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
              <span>1 Lot</span>
              <span>50 Lots</span>
            </div>
          </div>

          {/* Sub-IB Count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-650 dark:text-zinc-350">Sub-IB Partners Recruited (Tier 2 &amp; Tier 3)</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{subIbsCount} Partners</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={subIbsCount}
              onChange={(e) => setSubIbsCount(parseInt(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
              <span>0 Partners</span>
              <span>20 Partners</span>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-5 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-150 dark:border-slate-800/40 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-zinc-400 font-mono uppercase tracking-wider block">Estimated Monthly Payouts</span>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-650 dark:text-zinc-350 border-b border-zinc-100 dark:border-slate-800/40 pb-2">
                <span>Direct Commission (Tier 1):</span>
                <span className="font-mono font-bold">${directCommission.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-650 dark:text-zinc-350 border-b border-zinc-100 dark:border-slate-800/40 pb-2">
                <span>Sub-IB Commission (Tier 2):</span>
                <span className="font-mono font-bold">${tier2Commission.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-650 dark:text-zinc-350 border-b border-zinc-100 dark:border-slate-800/40 pb-2">
                <span>Sub-IB Commission (Tier 3):</span>
                <span className="font-mono font-bold">${tier3Commission.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-zinc-150 dark:border-slate-800/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">PASSIVE MONTHLY TOTAL</span>
              <span className="text-xl font-black font-mono text-purple-600 dark:text-purple-400">${totalMonthlyEarnings.toLocaleString()}</span>
            </div>
            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="text-[9px] font-mono font-bold text-purple-500 dark:text-purple-450">Up to 42% Spread</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
