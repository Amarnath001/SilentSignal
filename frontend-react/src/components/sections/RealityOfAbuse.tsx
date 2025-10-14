import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const RealityOfAbuse = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>The Reality of Emotional Abuse</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Understanding the scope of emotional manipulation and abuse in relationships
          </p>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className={`text-center hover-lift group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-red-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-red-600 mb-2">48%</div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              of women experience psychological aggression by an intimate partner
            </p>
          </div>

          <div className={`text-center hover-lift group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-orange-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              people will experience domestic violence in their lifetime
            </p>
          </div>

          <div className={`text-center hover-lift group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-purple-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              times on average someone returns to an abusive relationship before leaving
            </p>
          </div>

          <div className={`text-center hover-lift group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-blue-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              of domestic violence cases involve emotional and psychological abuse
            </p>
          </div>
        </div>

        {/* Impact of Emotional Abuse */}
        <div className={`rounded-lg p-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
          isDarkMode 
            ? 'bg-gray-800' 
            : 'bg-gray-50'
        }`}>
          <h3 className={`text-2xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Impact of Emotional Abuse</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Psychological Effects */}
            <div>
              <h4 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Psychological Effects</h4>
              <div className="space-y-6">
                {/* Depression */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Depression</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>78%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                {/* Anxiety */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Anxiety</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>72%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>

                {/* PTSD */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>PTSD</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>64%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>

                {/* Low Self-Esteem */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Low Self-Esteem</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>89%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Barriers to Leaving */}
            <div>
              <h4 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Common Barriers to Leaving</h4>
              <div className="space-y-6">
                {/* Fear of Escalation */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fear of Escalation</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>67%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>

                {/* Financial Dependence */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Financial Dependence</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>58%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>

                {/* Isolation from Support */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Isolation from Support</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>74%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                </div>

                {/* Hope for Change */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hope for Change</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>83%</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};