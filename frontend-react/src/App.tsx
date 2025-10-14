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
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
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