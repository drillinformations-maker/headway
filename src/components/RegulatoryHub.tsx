import React, { useState } from 'react';
import { ShieldAlert, BookOpen, UserCheck, AlertOctagon, Heart, Scale, Feather } from 'lucide-react';

export default function RegulatoryHub() {
  const [activeTab, setActiveTab] = useState<'ethics' | 'authors' | 'affiliate' | 'warnings'>('ethics');

  const authors = [
    {
      name: "Marcus Sterling",
      title: "Lead CFA Analyst",
      bio: "Marcus has spent over 14 years within interbank investment banking and digital brokerage desks. He holds a CFA certification and models macro-economic liquidity systems.",
      specialty: "Macro Liquidities, Liquidity Aggregating Systems, Currency Sizing Mechanics"
    },
    {
      name: "Sarah Thorne",
      title: "Chief Regulatory Counsel",
      bio: "Sarah served as primary legal advisor for several major retail financial authorities before pivoting into private consulting. She ensures full transparency on brokerage reviews.",
      specialty: "Corporate Compliance, Segregated Trust Banking, Anti-Money Laundering Frameworks"
    },
    {
      name: "Dr. Elizabeth Vance",
      title: "Cognitive Finance PhD",
      bio: "Elizabeth runs psychological training models for prop trading houses, focusing on eliminating anxiety, fear, greed, and general confirmation bias.",
      specialty: "Trading Psychology, Margin depletion mitigation, Leverage hazards"
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-[#0A0B0D] transition-colors" id="compliance-eeat-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
            REGULATORY STRUCTURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1.5 animate-fade-in">
            EEAT Compliance &amp; Editorial Standards
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3">
            In retail speculative writing, transparency is non-negotiable. Explore our foundational guidelines, certified financial authors, and corporate affiliate disclosures.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center border-b border-zinc-200 dark:border-slate-800 gap-1 mb-10">
          {[
            { id: 'ethics', label: 'Editorial Principles', icon: BookOpen },
            { id: 'authors', label: 'Expert Author Showcase', icon: UserCheck },
            { id: 'affiliate', label: 'Affiliate Transparency', icon: Scale },
            { id: 'warnings', label: 'Leverage Risk warnings', icon: ShieldAlert }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-zinc-555 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-zinc-50 dark:bg-[#14161C]/50 rounded-2xl border border-zinc-150 dark:border-slate-800/80 p-8 min-h-[300px]">
          
          {/* Panel 1: Editorial Principles */}
          {activeTab === 'ethics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Feather className="w-5 h-5 block" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Our Rigorous Editorial Standards</h3>
              </div>
              
              <p className="text-zinc-640 dark:text-zinc-300 text-sm leading-relaxed">
                Our guide serves a global audience with educational analysis of margin contract trading platforms. To ensure maximum impartiality, all product assessments abide by five absolute principles:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5 p-4 bg-white dark:bg-[#0A0B0D] rounded-xl border border-zinc-200 dark:border-slate-800/80">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1. Math-First Evaluation</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Every spread width, commission charge, and margin constraint is checked against real interbank feed tickers. We reject subjective brokerage claims.
                  </p>
                </div>
                <div className="space-y-1.5 p-4 bg-white dark:bg-[#0A0B0D] rounded-xl border border-zinc-200 dark:border-slate-800/80">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2. No Guaranteed Gains</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    We strictly prohibit the publishing of income guarantees or unverified earnings assertions. Speculative margin transactions constantly carry risk of capital loss.
                  </p>
                </div>
                <div className="space-y-1.5 p-4 bg-white dark:bg-[#0A0B0D] rounded-xl border border-zinc-200 dark:border-slate-800/80">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3. Verified Author Audits</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    All published files must be approved by financial compliance specialists with certified histories inside multi-jurisdictional financial boards.
                  </p>
                </div>
                <div className="space-y-1.5 p-4 bg-white dark:bg-[#0A0B0D] rounded-xl border border-zinc-200 dark:border-slate-800/80">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">4. Transparent Funding disclosures</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Referral arrangements are clearly declared to guarantee our audience is fully aware of corporate click funding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Panel 2: Author Showcase */}
          {activeTab === 'authors' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                  <UserCheck className="w-5 h-5 block" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Author Profiles &amp; Technical Backings</h3>
              </div>
              <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                Our educational materials are researched, written, and cross-examined by seasoned certified analytical profiles:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {authors.map((author, idx) => (
                  <div key={idx} className="p-5 bg-white dark:bg-[#0A0B0D] border border-zinc-200 dark:border-slate-800/80 rounded-xl space-y-3">
                    <div>
                      <h4 className="font-bold text-base text-zinc-900 dark:text-white">{author.name}</h4>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-mono font-medium">{author.title}</span>
                    </div>
                    <p className="text-zinc-650 dark:text-zinc-350 text-xs leading-relaxed">{author.bio}</p>
                    <div className="text-[10px] bg-zinc-50 dark:bg-[#14161C] p-2 rounded border dark:border-slate-805 text-zinc-400">
                      <strong>Focus areas:</strong> {author.specialty}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Panel 3: Affiliate Transparency */}
          {activeTab === 'affiliate' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Scale className="w-5 h-5 block" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Independent Affiliate Relationship Disclosure</h3>
              </div>
              <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed space-y-4">
                This platform is an independent educational and promotional website. We are not owned by, run by, or directly controlled by Headway Broker itself. Instead, we operate as members of the Headway Broker affiliate marketing program.
              </p>
              <p className="text-zinc-655 dark:text-zinc-350 text-sm leading-relaxed">
                When you click dynamic links across this website—including buttons linking to <code>https://headway.partners/user/signup?hwp=e4e4f5</code>—and register an active trading account, we receive a financial commission rebate paid directly from the brokerage's marketing reserves. This commissions modeling permits us to run these platforms, maintain expert author desks, and perform research without charging subscription fees to read our content.
              </p>
              <div className="p-4 bg-blue-500/5 dark:bg-blue-400/5 border border-blue-500/15 rounded-xl">
                <p className="text-zinc-550 dark:text-zinc-400 text-xs leading-relaxed">
                  <strong>Rebates Security:</strong> The presence of our referral rebate DOES NOT expand your spread costs or trading fee models. Headway Broker provides matching pricing structures to all users.
                </p>
              </div>
            </div>
          )}

          {/* Panel 4: Warnings & Stop-outs */}
          {activeTab === 'warnings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-500/10 text-rose-500 rounded-xl">
                  <AlertOctagon className="w-5 h-5 block" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Critical Volatility &amp; Stop-Out warnings</h3>
              </div>
              <p className="text-zinc-650 dark:text-zinc-350 text-sm leading-relaxed">
                The high leverage margins configured within retail Forex derivatives can move extremely fast against open coordinates. We demand all retail participants review these warnings:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 bg-rose-500/5 dark:bg-rose-455/5 border border-rose-500/10 rounded-xl">
                  <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 block uppercase">1. Stop-Out Risk Limits</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
                    If account equity drops below 30% of locked margin, open transactions are closed instantly at current market feeds. High margin exposures increase stop-out probabilities.
                  </p>
                </div>
                <div className="p-4 bg-rose-500/5 dark:bg-rose-455/5 border border-rose-500/10 rounded-xl">
                  <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 block uppercase">2. Margin Call thresholds</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
                    When equity values drop to 100% or less of margins utilized, the broker issues warnings. Immediate action (funding or trade reduction) is suggested.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
