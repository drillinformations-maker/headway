import React from 'react';
import { handleAffiliateRedirect } from '../utils/tracking';
import { ShieldCheck, ArrowRight, Activity, TrendingUp, AlertCircle, HelpCircle, BookOpen } from 'lucide-react';

interface HeroProps {
  currentPage: string;
}

export default function Hero({ currentPage }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-[#0A0B0D] py-16 lg:py-24 border-b border-zinc-150 dark:border-slate-800/80 transition-all duration-500">
      
      {/* Cinematic Animated Orbiting Gradients & Radial Glows */}
      <div className="absolute inset-0 bg-[#0A0B0D] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-blue-600/20 to-indigo-600/5 rounded-full blur-[140px] animate-[pulse_10s_infinite_alternate] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[550px] h-[550px] bg-gradient-to-tr from-indigo-600/15 to-purple-600/5 rounded-full blur-[130px] animate-[pulse_8s_infinite_alternate] pointer-events-none" />
      
      {/* Decorative High-fidelity Grid Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      
      {/* Ambient subtle light streak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8" id="hero-left">
            
            {/* Affiliate Indicator Tag with animated accent */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/15 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Independent Promotional &amp; Educational Guide</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-1" />
            </div>
 
            {/* Display Typography */}
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-[58px] leading-[1.05] tracking-tight text-white">
              Unlock Elite Interbank Trading with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Headway Broker</span>
            </h1>

            {/* Explanatory description */}
            <p className="text-zinc-350 text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
              An authoritative, transparent review and educational academy. Compare STP liquidity matching speeds, swap-free accounts, and deploy <strong>fractional $1 Cent bounds</strong> on native MetaTrader terminals.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl">
              <button
                onClick={() => handleAffiliateRedirect('Hero Main CTA Button', currentPage)}
                className="inline-flex justify-center items-center space-x-2.5 px-8 py-4.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-505 transition-all shadow-xl shadow-blue-500/20 active:scale-98 cursor-pointer hover:shadow-blue-500/30 font-sans"
                id="hero-affiliate-cta"
              >
                <span>Access Headway Sign-up Portal</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('broker-specs-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    handleAffiliateRedirect('Hero Secondary Fallback Specs CTA', currentPage);
                  }
                }}
                className="inline-flex justify-center items-center space-x-2.5 px-7 py-4.5 rounded-2xl text-base font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-98 cursor-pointer"
              >
                <span>Read Technical Specs</span>
                <BookOpen className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Transparent Compliance Disclosure Accordion */}
            <div className="p-4.5 bg-amber-500/5 border border-amber-500/15 rounded-2xl space-y-2 backdrop-blur-md">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-4.5 h-4.5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-0.5">
                    Mandatory Financial Risk Disclaimer
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    <strong>Trading involves risk of loss.</strong> Highly leveraged derivative instruments are complex and carry a significant danger of fast capital depletion. Past performance is not indicative of future market outcomes. Never risk capital you cannot afford to completely lose. This platform is independently operated and supported by client referral partnerships.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column - Custom Bento Card Layout */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative" id="hero-right">
            
            {/* Stat Card 1 */}
            <div className="p-6 rounded-2xl bg-[#14161C]/80 border border-slate-800/80 shadow-lg transition-all hover:border-blue-500/30 backdrop-blur-md group hover:-translate-y-1 hover:shadow-blue-500/5 duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Micro Accounts</span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-bold">ENTRY</span>
              </div>
              <span className="text-3xl font-black text-white">$1.00</span>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Start live market executions with a fractional deposit. Low-barrier sandboxing for algorithmic EA testing.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-2xl bg-[#14161C]/80 border border-slate-800/80 shadow-lg transition-all hover:border-blue-500/30 backdrop-blur-md group hover:-translate-y-1 hover:shadow-blue-500/5 duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Speed STP</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold">STABLE</span>
              </div>
              <span className="text-3xl font-black text-white">&lt; 0.16s</span>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Zero-requote processing via rapid electronic interbank liquidity hubs and straight routing maps.
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-2xl bg-[#14161C]/80 border border-slate-800/80 shadow-lg transition-all hover:border-blue-500/30 backdrop-blur-md group hover:-translate-y-1 hover:shadow-blue-500/5 duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Leverage Limits</span>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono font-bold">MAX</span>
              </div>
              <span className="text-3xl font-black text-white">1:Unlimited</span>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Extreme capital scaling to optimize margin buffers. Automatic ratio adjustment guards active equity.
              </p>
            </div>

            {/* Quick custody indicator card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#14161C] to-[#0A0B0D] text-white border border-slate-800/80 flex flex-col justify-between hover:border-zinc-750 transition-colors duration-300">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Vault Protections</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-lg font-bold block mb-1">Segregated Capital</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">
                Operational funds are kept isolated from client custody accounts in international Tier-1 institutions.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
