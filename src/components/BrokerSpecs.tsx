import React from 'react';
import { staticBrokerData } from '../data/homepageCopy';
import { handleAffiliateRedirect } from '../utils/tracking';
import { Check, X, Shield, Star, Wallet, Globe, Zap, Coins } from 'lucide-react';

interface BrokerSpecsProps {
  currentPage: string;
}

export default function BrokerSpecs({ currentPage }: BrokerSpecsProps) {
  const specs = staticBrokerData;

  const demoAccounts = [
    {
      name: "Cent Account",
      minDep: "$1",
      spread: "From 1.0 pips",
      lev: "1:Unlimited",
      commission: "Zero",
      suitability: "Micro-lot sizing, EA script sandboxing & beginners",
      icon: Coins
    },
    {
      name: "Standard Account",
      minDep: "$10",
      spread: "From 0.9 pips",
      lev: "1:Unlimited",
      commission: "Zero",
      suitability: "Daily retail swing traders and typical asset portfolios",
      icon: Wallet
    },
    {
      name: "Pro Account",
      minDep: "$100",
      spread: "From 0.0 pips",
      lev: "Up to 1:2000",
      commission: "$3.00 / lot per side",
      suitability: "Professional scalpers, algorithmic agents & high volumes",
      icon: Zap
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-[#0A0B0D] transition-colors" id="broker-specs-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            Broker Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1.5">
            Technical Audit of Headway Broker
          </h2>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm mt-3.5">
            An structural lookup of operational specs. All specifications are compiled from official corporate directories to establish authoritative EEAT evaluation parameters.
          </p>
        </div>

        {/* Fact Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-5 bg-zinc-50 dark:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80">
            <span className="text-zinc-400 font-mono text-xs block uppercase">FIRM IDENTITY</span>
            <span className="text-zinc-900 dark:text-white font-extrabold text-base block mt-1">{specs.name}</span>
            <div className="flex items-center space-x-1 mt-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
              <span className="text-xs text-zinc-505 dark:text-zinc-450 ml-1">({specs.rating} / 5)</span>
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80">
            <span className="text-zinc-400 font-mono text-xs block uppercase">REGULATION &amp; TRUST</span>
            <span className="text-zinc-900 dark:text-white font-extrabold text-base block mt-1">{specs.regulation}</span>
            <p className="text-[11px] text-zinc-400 mt-1">International multi-jurisdictional compliance models</p>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80">
            <span className="text-zinc-400 font-mono text-xs block uppercase">MINIMUM DEPOSIT</span>
            <span className="text-zinc-900 dark:text-white font-extrabold text-base block mt-1">{specs.minDeposit}</span>
            <p className="text-[11px] text-zinc-400 mt-1">Enables micro accounts scaling</p>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80">
            <span className="text-zinc-400 font-mono text-xs block uppercase">AVAILABLE PLATFORMS</span>
            <span className="text-zinc-900 dark:text-white font-extrabold text-base block mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
              MetaTrader 4 &amp; 5
            </span>
            <p className="text-[11px] text-zinc-400 mt-1">Complete mobile cross-device integration</p>
          </div>

        </div>

        {/* Pros & Cons Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Pros Column */}
          <div className="p-8 rounded-2xl bg-blue-500/5 dark:bg-blue-400/5 border border-blue-500/10 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <Check className="w-5 h-5 block" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Validated Advantages (Pros)</h3>
            </div>
            <ul className="space-y-3">
              {specs.pros.map((pro, index) => (
                <li key={index} className="flex items-start space-x-2.5 text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
                  <Check className="w-4 h-4 text-blue-550 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons Column */}
          <div className="p-8 rounded-2xl bg-rose-500/5 dark:bg-rose-400/5 border border-rose-500/10 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg">
                <X className="w-5 h-5 block" />
              </div>
              <h3 className="text-lg font-bold text-zinc-905 dark:text-white">Technical Constraints (Cons)</h3>
            </div>
            <ul className="space-y-3">
              {specs.cons.map((con, index) => (
                <li key={index} className="flex items-start space-x-2.5 text-sm text-zinc-655 dark:text-zinc-300 leading-relaxed">
                  <X className="w-4 h-4 text-rose-550 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Dynamic Account Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Transparent Account Configurations</h3>
            <p className="text-zinc-505 dark:text-zinc-400 text-xs mt-1.5">
              Choose the layout that matches your operational experience. High leverage must always be navigated with total systemic control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoAccounts.map((account, index) => {
              const IconComp = account.icon;
              return (
                <div key={index} className="bg-zinc-50 dark:bg-[#14161C]/50 hover:bg-zinc-100 dark:hover:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80 p-6 flex flex-col justify-between transition-all group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-blue-400 transition-colors">
                        {account.name}
                      </h4>
                      <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-t border-b border-zinc-200 dark:border-slate-800/80 py-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-450">Minimum Deposit</span>
                        <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">{account.minDep}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-450">Spreads (Floating)</span>
                        <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{account.spread}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-450">Adjustable Leverage</span>
                        <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">{account.lev}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-450">Execution Commission</span>
                        <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">{account.commission}</span>
                      </div>
                    </div>

                    <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed">
                      <strong>Best For:</strong> {account.suitability}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAffiliateRedirect(`Signup trigger - ${account.name}`, currentPage)}
                    className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold text-center text-zinc-700 dark:text-zinc-300 hover:text-white bg-zinc-200 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 cursor-pointer transition-all"
                  >
                    Deploy {account.name} Setup
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
