import { useState, useEffect } from 'react';
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
import ResumeModal from './components/ResumeModal';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-theme font-sans">
        <Header onViewResume={() => setIsResumeOpen(true)} isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          <Hero onViewResume={() => setIsResumeOpen(true)} />
          <About onViewResume={() => setIsResumeOpen(true)} />
          <Journey />
          <Skills />
          <Achievements />
          <Process />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      </div>
    </>
  );
}

export default App;
