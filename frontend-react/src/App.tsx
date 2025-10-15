import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { WhatWeAnalyze } from './components/sections/WhatWeAnalyze';
import { RecognizeWarningSigns } from './components/sections/RecognizeWarningSigns';
import { EducationalResources } from './components/sections/EducationalResources';
import { RealityOfAbuse } from './components/sections/RealityOfAbuse';
import { FAQ } from './components/sections/FAQ';
import { TrustYourInstincts } from './components/sections/TrustYourInstincts';
import { MessageAnalyzer } from './components/sections/MessageAnalyzer';
import { Footer } from './components/layout/Footer';

function App() {
  // Ensure page starts at top on every load/reload and clear any hash fragments
  useEffect(() => {
    // Clear hash fragment if present
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Header />
        <div className="pt-16">
        <Hero />
        <MessageAnalyzer />
        <HowItWorks />
        <WhatWeAnalyze />
        <RecognizeWarningSigns />
        <EducationalResources />
        <RealityOfAbuse />
        <FAQ />
        <TrustYourInstincts />
        <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;