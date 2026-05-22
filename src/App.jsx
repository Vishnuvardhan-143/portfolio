import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Process from './components/Process';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-theme font-sans">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
        <About />
        <Journey />
        <Skills />
        <Achievements />
        <Process />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Chatbot />

      {/* Floating Theme Toggle - Bottom Right, above chatbot */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-20 right-6 z-50 p-3 rounded-full bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal hover:bg-terracotta dark:hover:bg-orange-500 shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center border border-zinc-900/10 dark:border-white/5"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
    </>
  );
}

export default App;
