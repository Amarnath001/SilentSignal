import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const EducationalResources = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} id="resources" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Educational Resources</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn more about emotional abuse and find the support you need
          </p>
        </div>
        
        {/* Educational Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <a 
            href="https://www.thehotline.org/identify-abuse/domestic-abuse-warning-signs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block rounded-lg p-6 border hover:shadow-lg transition-all duration-300 hover-lift group ${
              isDarkMode 
                ? 'bg-purple-900/20 border-purple-700 hover:bg-purple-900/30' 
                : 'bg-purple-50 border-purple-100 hover:bg-purple-100'
            }`}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Understanding Emotional Abuse</h3>
            <p className={`leading-relaxed mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Learn about the different forms of emotional abuse, how to recognize them, and their impact on mental health and relationships.
            </p>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
              Visit The Hotline →
            </span>
          </a>

          <a 
            href="https://www.thehotline.org/resources/safety-planning/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block rounded-lg p-6 border hover:shadow-lg transition-all duration-300 hover-lift group ${
              isDarkMode 
                ? 'bg-blue-900/20 border-blue-700 hover:bg-blue-900/30' 
                : 'bg-blue-50 border-blue-100 hover:bg-blue-100'
            }`}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-blue-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Safety Planning</h3>
            <p className={`leading-relaxed mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Create a comprehensive safety plan to protect yourself and prepare for potential escalation or leaving an abusive relationship.
            </p>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Get Safety Plan Guide →
            </span>
          </a>

          <a 
            href="https://www.crisistextline.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block rounded-lg p-6 border hover:shadow-lg transition-all duration-300 hover-lift group ${
              isDarkMode 
                ? 'bg-green-900/20 border-green-700 hover:bg-green-900/30' 
                : 'bg-green-50 border-green-100 hover:bg-green-100'
            }`}
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-green-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Crisis Resources</h3>
            <p className={`leading-relaxed mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Immediate help and crisis intervention resources available 24/7 for those in dangerous or life-threatening situations.
            </p>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
              Get Crisis Support →
            </span>
          </a>
        </div>

        {/* Support Organizations */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Support Organizations</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional support is available 24/7 from these trusted organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* National Domestic Violence Hotline */}
          <div className={`rounded-lg p-6 border shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-red-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>National Domestic Violence Hotline</h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>24/7 confidential support</p>
                
                <div className="space-y-2">
                  <a 
                    href="tel:18007997233"
                    className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-800'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>1-800-799-7233</span>
                  </a>
                  <a 
                    href="sms:88788?body=START"
                    className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Text START to 88788</span>
                  </a>
                  <a 
                    href="https://www.thehotline.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span>thehotline.org</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Text Line */}
          <div className={`rounded-lg p-6 border shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Crisis Text Line</h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Free, 24/7 crisis support</p>
                
                  <div className="space-y-2">
                    <a 
                      href="sms:741741?body=HOME"
                      className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Text HOME to 741741</span>
                    </a>
                    <a 
                      href="https://www.crisistextline.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <span>crisistextline.org</span>
                    </a>
                  </div>
              </div>
            </div>
          </div>

          {/* RAINN */}
          <div className={`rounded-lg p-6 border shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>RAINN</h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sexual assault support</p>
                
                  <div className="space-y-2">
                    <a 
                      href="tel:18006564673"
                      className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>1-800-656-4673</span>
                    </a>
                    <a 
                      href="https://www.rainn.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <span>rainn.org</span>
                    </a>
                  </div>
              </div>
            </div>
          </div>

          {/* Love Is Respect */}
          <div className={`rounded-lg p-6 border shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-green-600 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Love Is Respect</h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Teen dating abuse support</p>
                
                  <div className="space-y-2">
                    <a 
                      href="tel:18663319474"
                      className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-800'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>1-866-331-9474</span>
                    </a>
                    <a 
                      href="sms:22522?body=LOVEIS"
                      className={`flex items-center space-x-2 text-sm hover:underline ${isDarkMode ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-800'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Text LOVEIS to 22522</span>
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};