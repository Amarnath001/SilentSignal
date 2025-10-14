import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const FAQ = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} id="faq" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Common questions about SilentSignal and emotional manipulation detection
          </p>
        </div>
        
        <div className="space-y-4">
          {/* FAQ Item 1 */}
          <div className={`rounded-lg p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How accurate is the analysis?</h3>
            <svg className={`w-6 h-6 group-hover:animate-bounce ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* FAQ Item 2 */}
          <div className={`rounded-lg p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Is my data really private?</h3>
            <svg className={`w-6 h-6 group-hover:animate-bounce ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* FAQ Item 3 */}
          <div className={`rounded-lg p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What should I do if the analysis shows high risk?</h3>
            <svg className={`w-6 h-6 group-hover:animate-bounce ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* FAQ Item 4 */}
          <div className={`rounded-lg p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Can this tool be used as evidence?</h3>
            <svg className={`w-6 h-6 group-hover:animate-bounce ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* FAQ Item 5 */}
          <div className={`rounded-lg p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What types of conversations work best?</h3>
            <svg className={`w-6 h-6 group-hover:animate-bounce ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};