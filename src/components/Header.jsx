import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Header({ onViewResume, isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="fixed left-0 top-4 z-50 w-full px-4 md:px-8">
      <div
        className={`mx-auto flex max-w-[1420px] items-center justify-between transition-all duration-300 ${
          isScrolled ? 'translate-y-0' : ''
        }`}
      >
        <a
          href="#home"
          className="liquid-glass grid h-12 w-12 place-items-center rounded-full font-heading text-2xl font-black italic text-foreground"
          aria-label="Back to home"
        >
          {portfolioData.personalInfo.nickname.slice(0, 1).toLowerCase()}
        </a>

        <nav className="liquid-glass hidden items-center rounded-full p-1.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === link.href.substring(1)
                  ? 'bg-accent/20 text-accent shadow-sm'
                  : 'text-foreground/80 hover:bg-accent/10 hover:text-accent'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onViewResume}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform hover:scale-[1.02]"
          >
            Resume
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </nav>

        <button
          onClick={toggleTheme}
          className="hidden h-12 w-12 items-center justify-center rounded-full text-foreground/60 hover:text-accent hover:bg-accent/10 transition-colors md:flex"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-foreground md:hidden hover:text-accent"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="liquid-glass-strong mx-4 mt-4 rounded-[1.5rem] p-5 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'bg-accent/20 text-accent'
                    : 'text-foreground/80 hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onViewResume();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              View Resume
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
