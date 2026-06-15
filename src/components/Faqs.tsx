import React, { useState, useEffect } from 'react';
import { faqsList } from '../data/homepageCopy';
import { handleAffiliateRedirect } from '../utils/tracking';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';

interface FaqsProps {
  currentPage: string;
}

export default function Faqs({ currentPage }: FaqsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // Dynamic Technical SEO Schema Injection
  useEffect(() => {
    const existingScript = document.getElementById('faq-jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const mSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqsList.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.id = 'faq-jsonld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(mSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById('faq-jsonld-schema');
      if (cleanup) cleanup.remove();
    };
  }, []);

  return (
    <div className="py-16 bg-zinc-50 dark:bg-[#0A0B0D] transition-colors" id="faqs-accordion-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            TECHNICAL DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1.5">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm mt-3.5">
            Quickly resolve technical issues. These answers have been audited by experienced trade operators and compliance specialists.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4 mb-12">
          {faqsList.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#14161C] rounded-2xl border border-zinc-150 dark:border-slate-800/80 shadow-sm overflow-hidden transition-all duration-300"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-zinc-655 dark:text-zinc-300 text-sm leading-relaxed border-t border-zinc-105 dark:border-slate-800/50 animate-fade-in">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call To Action Banner */}
        <div className="p-6 rounded-2xl bg-zinc-105 dark:bg-[#14161C] border border-zinc-200 dark:border-slate-800/85 text-center space-y-4">
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
            Have further operational questions about platform spreads and accounts?
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xl mx-auto">
            Headway Broker provides a round-the-clock responsive global support service. Open a free Cent, Standard, or Pro account today with as little as a $1 budget.
          </p>
          <button
            onClick={() => handleAffiliateRedirect('FAQ Bottom Redirect Button', currentPage)}
            className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow cursor-pointer transition-all"
          >
            <span>Access Official Headway Support Center</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
