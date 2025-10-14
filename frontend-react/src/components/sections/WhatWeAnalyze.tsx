import { Brain, Heart, MessageSquare, Shield, Users, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const WhatWeAnalyze = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const analysisTypes = [
    {
      icon: Brain,
      title: "Gaslighting",
      description: "Detecting attempts to make you question your own memory, perception, or sanity."
    },
    {
      icon: Heart,
      title: "Emotional Blackmail",
      description: "Identifying manipulation through guilt, fear, or obligation to control your behavior."
    },
    {
      icon: MessageSquare,
      title: "Guilt Trips",
      description: "Recognizing patterns of making you feel responsible for the manipulator's emotions."
    },
    {
      icon: Shield,
      title: "Isolation Tactics",
      description: "Spotting attempts to cut you off from friends, family, or support systems."
    },
    {
      icon: Users,
      title: "Love Bombing",
      description: "Detecting excessive attention and affection used to gain control over you."
    },
    {
      icon: AlertTriangle,
      title: "Threats & Intimidation",
      description: "Identifying subtle or overt threats designed to control your behavior."
    }
  ];

  return (
    <section ref={elementRef} id="what-we-analyze" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What We Analyze
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our AI detects various forms of emotional manipulation and abuse patterns in your conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {analysisTypes.map((type, index) => (
            <div key={index} className={`rounded-lg p-6 border hover:shadow-lg transition-all duration-1000 hover-lift group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`} style={{ transitionDelay: `${200 + (index * 100)}ms` }}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                isDarkMode ? 'bg-purple-800 hover-glow' : 'bg-purple-100'
              }`}>
                <type.icon size={24} className={`group-hover:animate-bounce ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {type.title}
              </h3>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
