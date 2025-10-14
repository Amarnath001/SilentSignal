import { useTheme } from '../../contexts/ThemeContext';
import { HeroContent } from './HeroContent';
import { PhoneMockup } from '../ui/PhoneMockup';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Hero = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} className={`py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 ${isDarkMode ? 'dark:from-purple-600 dark:via-purple-700 dark:to-purple-900' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <HeroContent />
          </div>
          
          {/* Right Column - Smartphone Mockup */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
