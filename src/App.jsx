import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="bg-bg min-h-screen text-text-primary selection:bg-[#89AACC]/30 selection:text-white">
          <Navbar />
          <Hero />
          <SelectedWorks />
          <Journal />
          <Explorations />
          <Stats />
          <Footer />
        </main>
      )}
    </>
  );
}

export default App;
