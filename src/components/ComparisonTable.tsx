import React, { useState } from 'react';
import { staticBrokerData } from '../data/homepageCopy';
import { handleAffiliateRedirect } from '../utils/tracking';
import { Check, ShieldCheck, Scale, Coins, Search, Zap } from 'lucide-react';

interface ComparisonTableProps {
  currentPage: string;
}

export default function ComparisonTable({ currentPage }: ComparisonTableProps) {
  const [filterType, setFilterType] = useState<'All' | 'Forex' | 'Metals' | 'Crypto'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const spreads = staticBrokerData.spreadsTable;

  const instrumentsData = [
    { name: 'EUR/USD', category: 'Forex', standardSpread: '1.0 pips', proSpread: '0.1 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
    { name: 'GBP/USD', category: 'Forex', standardSpread: '1.2 pips', proSpread: '0.2 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
    { name: 'USD/JPY', category: 'Forex', standardSpread: '1.1 pips', proSpread: '0.1 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
    { name: 'XAU/USD (Gold)', category: 'Metals', standardSpread: '18 pips', proSpread: '8 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
    { name: 'XAG/USD (Silver)', category: 'Metals', standardSpread: '1.5 pips', proSpread: '0.5 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
    { name: 'BTC/USD', category: 'Crypto', standardSpread: '150 pips', proSpread: '60 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
    { name: 'ETH/USD', category: 'Crypto', standardSpread: '12 pips', proSpread: '4 pips', standardCommission: 'Zero Fee', proCommission: '$3.00 / lot per side' },
  ];

  const filteredInstruments = instrumentsData.filter(inst => {
    const matchesFilter = filterType === 'All' || inst.category === filterType;
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-16 bg-zinc-50 dark:bg-[#0E1013] transition-colors" id="spreads-comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400">
            TRANSACTION CHECKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1.5 animate-fade-in">
            Interbank Spread &amp; Fee Matrices
          </h2>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm mt-3.5">
            Optimize your trading margin costs. Check how Headway Standard accounts compare directly to institutional-tier Pro spreads across core tradable systems.
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Filters */}
          <div className="flex space-x-1.5 self-start">
            {(['All', 'Forex', 'Metals', 'Crypto'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  filterType === type
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white dark:bg-slate-800 text-zinc-650 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ticker instrument (e.g., Gold, EUR)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 pl-10 pr-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Spreads Comparison Table */}
        <div className="bg-white dark:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-[#14161C] border-b border-zinc-150 dark:border-slate-800/80">
                  <th className="p-4 text-xs font-mono font-bold tracking-widest text-zinc-450 uppercase">Asset Instrument</th>
                  <th className="p-4 text-xs font-mono font-bold tracking-widest text-zinc-450 uppercase">Category</th>
                  <th className="p-4 text-xs font-mono font-bold tracking-widest text-zinc-450 uppercase text-blue-600 dark:text-blue-400">Standard Account Spread</th>
                  <th className="p-4 text-xs font-mono font-bold tracking-widest text-zinc-450 uppercase">Standard Commission</th>
                  <th className="p-4 text-xs font-mono font-bold tracking-widest text-zinc-450 uppercase text-blue-500">Pro Account Spread</th>
                  <th className="p-4 text-xs font-mono font-bold tracking-widest text-zinc-455 uppercase">Pro Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-slate-800/80">
                {filteredInstruments.map((inst, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-[#14161C]/50 transition-all text-xs sm:text-sm">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
                      <Zap className="w-3.5 h-3.5 text-blue-500" />
                      <span>{inst.name}</span>
                    </td>
                    <td className="p-4 ml-1.5">
                      <span className="px-2 py-0.5 bg-zinc-100 dark:bg-slate-800 text-zinc-500 dark:text-zinc-400 text-[10px] rounded font-semibold uppercase">
                        {inst.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {inst.standardSpread}
                    </td>
                    <td className="p-4 text-zinc-505 dark:text-zinc-400">
                      {inst.standardCommission}
                    </td>
                    <td className="p-4 font-mono font-bold text-blue-500">
                      {inst.proSpread}
                    </td>
                    <td className="p-4 text-zinc-505 dark:text-zinc-400">
                      {inst.proCommission}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Callout Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="space-y-2 max-w-2xl relative">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Optimized For Execution</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
              Deploy Your Execution Strategy on Real Interbank Feeds
            </h3>
            <p className="text-blue-50/80 text-xs sm:text-sm">
              Standard accounts feature zero commission. Swap-free Islamic models are fully deployable on request during sign-up operations.
            </p>
          </div>

          <button
            onClick={() => handleAffiliateRedirect('Affiliate link comparison banner', currentPage)}
            className="px-6 py-3.5 bg-zinc-[#0A0B0D] dark:bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-sm tracking-tight rounded-xl inline-flex items-center space-x-2 shadow-lg transition-transform active:scale-95 cursor-pointer self-start md:self-center"
          >
            <span>Activate Real Spreads</span>
            <Scale className="w-4 h-4 text-blue-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
