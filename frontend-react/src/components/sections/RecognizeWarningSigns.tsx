import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const RecognizeWarningSigns = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} id="warning-signs" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recognize the Warning Signs</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn to identify common patterns of emotional manipulation and abuse
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gaslighting */}
          <div className={`rounded-lg p-6 border shadow-sm group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-pink-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Gaslighting</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Making you question your reality.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-pink-900/20 border-pink-700 hover:bg-pink-900/30' : 'bg-pink-50 border-pink-200 hover:bg-pink-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-pink-200' : 'text-gray-900'}`}>"That never happened"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-pink-300' : 'text-gray-600'}`}>Denying events you clearly remember</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-pink-900/20 border-pink-700 hover:bg-pink-900/30' : 'bg-pink-50 border-pink-200 hover:bg-pink-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-pink-200' : 'text-gray-900'}`}>"You're imagining things"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-pink-300' : 'text-gray-600'}`}>Questioning your perception</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-pink-900/20 border-pink-700 hover:bg-pink-900/30' : 'bg-pink-50 border-pink-200 hover:bg-pink-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-pink-200' : 'text-gray-900'}`}>"You're being dramatic"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-pink-300' : 'text-gray-600'}`}>Minimizing your feelings</p>
              </div>
            </div>
          </div>

          {/* Guilt Manipulation */}
          <div className={`rounded-lg p-6 border shadow-sm group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-orange-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Guilt Manipulation</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Using guilt to control behavior.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-orange-900/20 border-orange-700 hover:bg-orange-900/30' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-orange-200' : 'text-gray-900'}`}>"If you loved me, you would..."</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-300' : 'text-gray-600'}`}>Conditional love statements</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-orange-900/20 border-orange-700 hover:bg-orange-900/30' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-orange-200' : 'text-gray-900'}`}>"You're so selfish"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-300' : 'text-gray-600'}`}>Personal attacks for boundaries</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-orange-900/20 border-orange-700 hover:bg-orange-900/30' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-orange-200' : 'text-gray-900'}`}>"I do so much for you"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-300' : 'text-gray-600'}`}>Keeping score to create debt</p>
              </div>
            </div>
          </div>

          {/* Control Tactics */}
          <div className={`rounded-lg p-6 border shadow-sm group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-red-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Control Tactics</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Attempts to control your life.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-red-900/20 border-red-700 hover:bg-red-900/30' : 'bg-red-50 border-red-200 hover:bg-red-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-red-200' : 'text-gray-900'}`}>"You can't see them anymore"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-red-300' : 'text-gray-600'}`}>Isolating you from friends</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-red-900/20 border-red-700 hover:bg-red-900/30' : 'bg-red-50 border-red-200 hover:bg-red-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-red-200' : 'text-gray-900'}`}>"Where are you going?"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-red-300' : 'text-gray-600'}`}>Constant monitoring</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-red-900/20 border-red-700 hover:bg-red-900/30' : 'bg-red-50 border-red-200 hover:bg-red-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-red-200' : 'text-gray-900'}`}>"You don't need that job"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-red-300' : 'text-gray-600'}`}>Undermining independence</p>
              </div>
            </div>
          </div>

          {/* Threats */}
          <div className={`rounded-lg p-6 border shadow-sm group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`} style={{ transitionDelay: '800ms' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Threats</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Direct or implied threats.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-purple-900/20 border-purple-700 hover:bg-purple-900/30' : 'bg-purple-50 border-purple-200 hover:bg-purple-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-900'}`}>"If you leave, I'll..."</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>Threats of harm or consequences</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-purple-900/20 border-purple-700 hover:bg-purple-900/30' : 'bg-purple-50 border-purple-200 hover:bg-purple-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-900'}`}>"No one else would want you"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>Threatening abandonment</p>
              </div>
              <div className={`border rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-purple-900/20 border-purple-700 hover:bg-purple-900/30' : 'bg-purple-50 border-purple-200 hover:bg-purple-100'}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-900'}`}>"You'll regret this"</p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-purple-300' : 'text-gray-600'}`}>Implied future harm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
