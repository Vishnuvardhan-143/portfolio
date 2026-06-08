import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import ResumeModal from './ResumeModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ['home', 'work', 'resume'];
      let current = 'Home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section.charAt(0).toUpperCase() + section.slice(1);
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Work', 'Resume'];
  
  // Use user's initials
  const initials = portfolioData.personalInfo.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div 
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <a 
          href="#home" 
          className="relative flex items-center justify-center w-9 h-9 rounded-full group transition-transform hover:scale-110"
        >
          <div className="absolute inset-0 rounded-full accent-gradient group-hover:bg-gradient-to-l transition-all duration-300" />
          <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary leading-none mt-0.5">
              {initials}
            </span>
          </div>
        </a>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Links */}
        <div className="flex items-center">
          {navLinks.map((link) => {
            if (link === 'Resume') {
              return (
                <button
                  key={link}
                  onClick={() => setIsResumeOpen(true)}
                  className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                    activeSection === link
                      ? 'text-text-primary bg-stroke/50'
                      : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                  }`}
                >
                  {link}
                </button>
              );
            }
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                  activeSection === link
                    ? 'text-text-primary bg-stroke/50'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* CTA Button */}
        <a 
          href={`mailto:vishnuvardhan5770648@gmail.com`}
          className="relative group text-xs sm:text-sm rounded-full"
        >
          {/* Animated gradient border behind */}
          <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Inner content */}
          <div className="relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-surface rounded-full backdrop-blur-md text-text-primary">
            Say hi
            <span className="text-muted group-hover:text-text-primary transition-colors">↗</span>
          </div>
        </a>
      </div>
    </nav>
    <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
