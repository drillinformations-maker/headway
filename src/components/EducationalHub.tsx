import React, { useState } from 'react';
import { handleAffiliateRedirect } from '../utils/tracking';
import { BookOpen, AlertCircle, HelpCircle, ArrowRight, Gauge, HelpCircle as QuestionIcon, Plus, Minus, Calculator } from 'lucide-react';

interface EducationalHubProps {
  currentPage: string;
}

export default function EducationalHub({ currentPage }: EducationalHubProps) {
  // Leveraged Sizing Simulator State
  const [lotSize, setLotSize] = useState<number>(0.1);
  const [leverage, setLeverage] = useState<number>(500);
  const [currencyPair, setCurrencyPair] = useState<'EURUSD' | 'GBPUSD' | 'USDJPY'>('EURUSD');

  // Hardcoded rates
  const pairRates = {
    EURUSD: 1.0850,
    GBPUSD: 1.2720,
    USDJPY: 156.40
  };

  // Sizing Math
  const rate = pairRates[currencyPair];
  const lotUnitValue = 100000; // Standard Lot unit size is 100,000 base
  const totalVolumeUSD = lotSize * lotUnitValue * (currencyPair === 'USDJPY' ? 1 : rate);
  const requiredMarginUSD = totalVolumeUSD / leverage;
  const pipValueUSD = lotSize * 10 * (currencyPair === 'USDJPY' ? (1 / rate) : 1);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="py-16 bg-white dark:bg-[#0A0B0D] transition-colors" id="educational-hub-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            EDUCATIONAL RESOURCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1.5">
            The Trading &amp; Leverage Academy
          </h2>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm mt-3.5">
            Independent educational masterclasses. Master forex trade mechanics, margin obligations, and portfolio risk ratios before deploying active standard capital.
          </p>
        </div>

        {/* 2-Column Educational Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column Left: Academic Core */}
          <div className="lg:col-span-7 space-y-8" id="edu-left">
            
            {/* Class 1 */}
            <div className="space-y-3.5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Forex Mechanics: What is a PIP and how does it value?</h3>
              </div>
              <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed">
                In currency trading, a **Pip** (Percentage in Point) is the standardized unit of measuring nominal exchange rate adjustments. For standard major currency pairs (such as EUR/USD and GBP/USD), a pip corresponds exactly to the 4th decimal decimal spot (expressed mathematically as <code>0.0001</code>). If the EUR/USD quote updates from <code>1.0850</code> to <code>1.0855</code>, that is a 5-pip shift.
              </p>
              <p className="text-zinc-655 dark:text-zinc-300 text-sm leading-relaxed">
                If you trade a standard lot ($100,000 base contract size), each single pip adjustment translates to a $10 gain or loss. Sizing your lot contracts appropriately is critical to keeping the monetary pip value proportional to your maximum daily risk tolerances.
              </p>
            </div>

            {/* Class 2 */}
            <div className="space-y-3.5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Gauge className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">The Dynamics of Margin and Rollover Swaps</h3>
              </div>
              <p className="text-zinc-655 dark:text-zinc-300 text-sm leading-relaxed">
                <strong>Margin</strong> represents the collateral deposit required to initiate and maintain active contract structures. The leverage multiplier determines your required margin. For instance, at <code>1:500</code> leverage, you only need to commit 0.2% of the contract's total nominal value as locked collateral.
              </p>
              <p className="text-zinc-655 dark:text-zinc-300 text-sm leading-relaxed">
                <strong>Overnight Rollover Swaps</strong> are interest rate credits or interest fees billed depending on underlying interbank interest rate differences of the held pairing. If you trade with Islamic Swap-free setups, Headway Broker removes these interest rollovers entirely, keeping execution perfectly compliant with ethical banking policies.
              </p>
            </div>

            {/* Warning card for EEAT/compliance */}
            <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-450/5 border border-rose-500/15">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-bold text-rose-800 dark:text-rose-400">Essential Sizing Guardrail</span>
                  <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed">
                    Higher leverage ratios magnify volatility impact on your equity. If your account equity falls past the 30% stop-out point relative to locked margin collateral, the system execution algorithms will instantly close your transactions of high risk. Manage positions with maximum discipline.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Column Right: Interactive Leverage Sizing Simulator */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-zinc-50 dark:bg-[#14161C] border border-zinc-150 dark:border-slate-800/80 space-y-6" id="edu-right">
            
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Margin &amp; Sizing Calculator</h3>
            </div>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Understand currency risk sizing. Adjust lot allocations and leverage thresholds below to instantly observe margin requirements and single-pip financial valuations.
            </p>

            {/* Inputs */}
            <div className="space-y-4 pt-2">
              
              {/* Currency Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block">Trading Asset</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['EURUSD', 'GBPUSD', 'USDJPY'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setCurrencyPair(p)}
                      className={`py-2 rounded-lg text-xs font-semibold cursor-pointer border ${
                        currencyPair === p
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-slate-800 border-zinc-200 dark:border-slate-800/80 text-zinc-650 dark:text-zinc-300'
                      }`}
                    >
                      {p} ({(pairRates[p]).toFixed(2)})
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizing Lot Allocation */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono font-bold uppercase tracking-wider text-zinc-400 block">Lot Allocation Size</span>
                  <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400">{lotSize.toFixed(2)} Lots</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLotSize(Math.max(0.01, lotSize - 0.05))}
                    className="p-2 border border-zinc-200 dark:border-slate-800/80 bg-white dark:bg-slate-800 hover:bg-zinc-100 rounded-lg text-zinc-655 dark:text-zinc-300 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="range"
                    min="0.01"
                    max="5.0"
                    step="0.05"
                    value={lotSize}
                    onChange={(e) => setLotSize(parseFloat(e.target.value))}
                    className="flex-1 accent-blue-500 h-1.5 rounded-lg cursor-pointer bg-zinc-200 dark:bg-slate-800"
                  />
                  <button
                    onClick={() => setLotSize(Math.min(10, lotSize + 0.05))}
                    className="p-2 border border-zinc-200 dark:border-slate-800/80 bg-white dark:bg-slate-800 hover:bg-zinc-100 rounded-lg text-zinc-655 dark:text-zinc-300 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  </button>
                </div>
              </div>

              {/* Leverage Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block">Leverage Multiplier</label>
                <select
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 text-sm text-zinc-705 dark:text-zinc-300 p-2.5 rounded-xl border border-zinc-200 dark:border-slate-800/80 focus:outline-none focus:border-blue-500"
                >
                  <option value={100}>1:100 Leverage</option>
                  <option value={200}>1:200 Leverage</option>
                  <option value={500}>1:500 Leverage</option>
                  <option value={1000}>1:1000 Leverage</option>
                  <option value={2000}>1:2000 Leverage</option>
                </select>
              </div>

            </div>

            {/* Calculations Output Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0A0B0D] border border-zinc-200 dark:border-slate-800/80 space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Total Nominal Exposure:</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{formatUSD(totalVolumeUSD)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Locked Profit Margin Collateral:</span>
                <span className="font-mono font-extrabold text-blue-500">{formatUSD(requiredMarginUSD)}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-zinc-100 dark:border-slate-800/80 pt-2">
                <span className="text-zinc-400">1-Pip Net Price Valuation:</span>
                <span className="font-mono font-extrabold text-blue-550">{formatUSD(pipValueUSD)}</span>
              </div>
            </div>

            {/* Simulated Redirect to signup */}
            <button
              onClick={() => handleAffiliateRedirect('Simulator CTA Button', currentPage)}
              className="w-full py-3 bg-zinc-900 group-hover:bg-zinc-800 text-white rounded-xl text-center text-xs font-bold font-mono uppercase tracking-wider inline-flex items-center justify-center space-x-1 hover:bg-blue-600 transition-all cursor-pointer"
            >
              <span>Test Sizing parameters on Cent Account</span>
              <ArrowRight className="w-3.5 h-3.5 inline ml-1.5" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
