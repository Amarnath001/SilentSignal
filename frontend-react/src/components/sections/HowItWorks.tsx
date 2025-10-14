import { Upload, Search, Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const HowItWorks = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const steps = [
    {
      icon: Upload,
      title: "1. Upload Messages",
      description: "Paste your conversation or upload chat history. All processing happens locally on your device for complete privacy."
    },
    {
      icon: Search,
      title: "2. AI Analysis",
      description: "Our advanced AI analyzes patterns, language cues, and emotional manipulation techniques in real-time."
    },
    {
      icon: Shield,
      title: "3. Get Insights",
      description: "Receive detailed reports with risk levels, identified patterns, and actionable recommendations for your safety."
    }
  ];

  return (
    <section ref={elementRef} id="how-it-works" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How SilentSignal Works
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Three simple steps to protect yourself from emotional manipulation and abuse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`text-center hover-lift group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${200 + (index * 200)}ms` }}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 ${
                isDarkMode ? 'bg-purple-800 hover-glow' : 'bg-purple-100'
              }`}>
                <step.icon size={32} className={`group-hover:animate-bounce ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {step.title}
              </h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
