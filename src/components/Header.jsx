import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import PillNav from './PillNav';

export default function Header({ onViewResume, isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);

      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold as needed
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      // Fallback: if at top, active might be empty, maybe default to first or keep empty.
      // If bottom of page is reached, highlight last
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          current = sections[sections.length - 1];
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <header className="fixed left-0 top-4 z-50 w-full px-4 md:px-8 pointer-events-none">
      <div
        className={`mx-auto flex max-w-[1420px] items-center justify-between transition-all duration-300 ${
          isScrolled ? 'translate-y-0' : ''
        }`}
      >
        <div className="pointer-events-auto w-full">
          <PillNav
            logo={portfolioData.personalInfo.nickname.slice(0, 1).toLowerCase()}
            items={navLinks.map(link => ({ label: link.name, href: link.href }))}
            activeHref={activeSection ? `#${activeSection}` : ''}
            className="border-none"
            pillColor="transparent"
            baseColor="#fff"
            pillTextColor="rgba(255,255,255,0.9)"
            hoveredPillTextColor="#000"
            onViewResume={onViewResume}
            rightContent={
              <button
                onClick={toggleTheme}
                className="h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all flex liquid-glass shadow-md"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            }
          />
        </div>
      </div>
    </header>
  );
}
