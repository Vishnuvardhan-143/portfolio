import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Header({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-beige/85 dark:bg-charcoal/85 backdrop-blur-md py-4 border-b border-zinc-900/5 dark:border-white/5 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 flex items-center justify-between">
        {/* Logo / Nickname */}
        <a 
          href="#home" 
          className="font-heading text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white group flex items-center gap-1"
        >
          <span>{portfolioData.personalInfo.nickname}</span>
          <span className="text-terracotta dark:text-orange-500 transition-transform group-hover:translate-x-1 duration-300">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            {navLinks.map(link => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-terracotta dark:after:bg-orange-500 hover:after:w-full after:transition-all after:duration-350"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Vertical Divider */}
          <div className="h-4 w-[1px] bg-zinc-900/10 dark:bg-white/10 ml-2" />

          {/* Theme Switch & Contacts */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 select-none">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">DARK</span>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 rounded-full bg-zinc-900/10 dark:bg-white/10 border border-zinc-900/20 dark:border-white/10 transition-colors duration-300 p-0.5 cursor-pointer flex items-center shrink-0"
                aria-label="Toggle Theme"
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-terracotta dark:bg-orange-500 flex items-center justify-center text-beige dark:text-charcoal shadow-sm transition-transform duration-300 ${
                    theme === 'dark' ? 'translate-x-[22px]' : 'translate-x-[2px]'
                  }`}
                >
                  {theme === 'light' ? <Moon size={8} className="fill-current" /> : <Sun size={8} className="fill-current" />}
                </div>
              </button>
            </div>
            
            <a 
              href="#contact" 
              className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-terracotta/40 dark:border-orange-500/40 text-terracotta dark:text-orange-500 hover:bg-terracotta hover:text-white dark:hover:bg-orange-500 dark:hover:text-zinc-950 transition-all duration-300 flex items-center gap-1.5"
            >
              Let's Talk
              <ArrowUpRight size={12} />
            </a>
          </div>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-1.5 select-none">
            <button
              onClick={toggleTheme}
              className="relative w-10 h-5 rounded-full bg-zinc-900/10 dark:bg-white/10 border border-zinc-900/20 dark:border-white/10 transition-colors duration-300 p-0.5 cursor-pointer flex items-center shrink-0"
              aria-label="Toggle Theme"
            >
              <div 
                className={`w-3.5 h-3.5 rounded-full bg-terracotta dark:bg-orange-500 flex items-center justify-center text-beige dark:text-charcoal shadow-sm transition-transform duration-300 ${
                  theme === 'dark' ? 'translate-x-[18px]' : 'translate-x-[2px]'
                }`}
              >
                {theme === 'light' ? <Moon size={6} className="fill-current" /> : <Sun size={6} className="fill-current" />}
              </div>
            </button>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)} 
            aria-label="Toggle Menu"
            className="p-2 rounded-full hover:bg-zinc-950/5 dark:hover:bg-white/5 text-zinc-900 dark:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-zinc-950/60 dark:bg-black/80 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 right-0 w-4/5 max-w-sm h-[calc(100vh-5rem)] bg-[#f5f1e8] dark:bg-[#0c0c0c] border-l border-zinc-900/10 dark:border-white/5 p-8 flex flex-col justify-between"
            onClick={e => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-8 pt-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">Navigation</span>
              <ul className="flex flex-col gap-6 text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                {navLinks.map((link, idx) => (
                  <li key={link.name} className="animate-[fade-in-up_0.3s_ease_both]" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <a 
                      href={link.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-terracotta dark:hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-4 border-t border-zinc-900/10 dark:border-white/5 pt-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">Connect</span>
              <a 
                href={`mailto:${portfolioData.personalInfo.email}`}
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-terracotta dark:hover:text-orange-500 transition-colors"
              >
                {portfolioData.personalInfo.email}
              </a>
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                © {new Date().getFullYear()} {portfolioData.personalInfo.nickname}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
