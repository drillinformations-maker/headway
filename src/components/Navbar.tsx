import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Menu, 
  X, 
  ArrowUpRight, 
  TrendingUp, 
  Sun, 
  Moon, 
  Home, 
  BookOpen, 
  Newspaper, 
  Scale 
} from 'lucide-react';
import { handleAffiliateRedirect } from '../utils/tracking';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ currentPage, setCurrentPage, darkMode, setDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'review', label: 'Analysis & Specs', icon: Shield },
    { id: 'forex', label: 'Trading Academy', icon: BookOpen },
    { id: 'blog', label: 'Market Insights', icon: Newspaper },
    { id: 'disclosure', label: 'Regulatory Hub', icon: Scale },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 bg-white/95 dark:bg-[#0E1013]/95 border-zinc-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => handleNavClick('home')} id="logo-nav">
            <div className="p-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl text-blue-600 dark:text-blue-405 group-hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-bold tracking-tight text-lg sm:text-xl text-zinc-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Headway<span className="text-blue-500 dark:text-blue-400 font-medium">Guide</span>
              </span>
              <p className="text-[9px] font-mono tracking-widest text-zinc-450 uppercase">Affiliate Authority</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" id="desktop-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border border-blue-500/10 dark:border-blue-400/20 font-bold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Widgets */}
          <div className="hidden sm:flex items-center space-x-3" id="right-actions">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-zinc-650 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-5a/50 dark:bg-slate-900 hover:bg-zinc-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-zinc-150 dark:border-slate-800/40"
              aria-label="Theme Toggle"
              id="theme-toggle"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Micro Compliance Tag */}
            <div className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-[#14161C] text-xs font-semibold text-zinc-500 dark:text-zinc-400 rounded-lg border border-zinc-200/40 dark:border-slate-850">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>Compliant Reviewer</span>
            </div>

            {/* Primary Outbound Link */}
            <button
              onClick={() => handleAffiliateRedirect('Navbar Primary CTA', currentPage)}
              className="relative inline-flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight text-white bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-500 active:scale-95 shadow-md shadow-blue-505/10 hover:shadow-blue-500/20 cursor-pointer transition-all"
              id="nav-affiliate-signup"
            >
              <span>Open Free Account</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Theme Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-zinc-650 dark:text-zinc-300 bg-zinc-50 dark:bg-slate-905 rounded-xl border border-zinc-200/40 dark:border-slate-850"
              id="mobile-theme-toggle"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-650 dark:text-zinc-300 bg-zinc-50 dark:bg-slate-905 rounded-xl border border-zinc-200/40 dark:border-slate-850"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-in fade-in slide-in-from-top duration-200 border-t border-zinc-150 dark:border-slate-800 bg-white dark:bg-[#0E1013] px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border border-blue-500/10 dark:border-blue-400/25'
                    : 'text-zinc-650 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'opacity-100 text-blue-500' : 'opacity-65'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-zinc-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 px-4 text-xs text-zinc-400">
              <Shield className="w-4 h-4 text-blue-500 animate-pulse" />
              <span>Independent Affiliate Partners Program</span>
            </div>
            <button
              onClick={() => handleAffiliateRedirect('Mobile Drawer CTA', currentPage)}
              className="w-full inline-flex justify-center items-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              id="mobile-nav-affiliate-signup"
            >
              <span>Get Started ($1 Min Deposit)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
