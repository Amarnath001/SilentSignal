import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const MessageAnalyzer = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} id="analyzer" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Message Analyzer
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Paste your conversation below for a private, comprehensive analysis. All processing happens locally on your device.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Conversation Input */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Conversation Input
              </h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Copy and paste your text messages, chat history, or conversation here.
              </p>
              <textarea
                className={`w-full h-96 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Paste your conversation here...

Example:
Person A: Why didn't you respond immediately? You obviously don't care about me.
Person B: I was in a meeting, I do care about you
Person A: That's just an excuse. If you really cared, you would have found a way to respond."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className={`group px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-yellow-500 hover:text-purple-900 hover:scale-105 hover:shadow-xl transition-all duration-300 ${
                isDarkMode ? 'shadow-lg' : ''
              }`}>
                <span className="group-hover:animate-pulse">Analyze Conversation</span>
              </button>
              <button className={`group px-6 py-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500'
                  : 'border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500'
              }`}>
                <span className="group-hover:animate-bounce">Clear Text</span>
              </button>
            </div>

            {/* Tips */}
            <div className={`border rounded-lg p-4 ${
              isDarkMode
                ? 'bg-blue-900/20 border-blue-700'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                Tips for Best Results:
              </h4>
              <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                <li>• Include full conversation context</li>
                <li>• Label speakers clearly (Person A, Person B, etc.)</li>
                <li>• Include timestamps when available</li>
                <li>• Paste the entire conversation thread</li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Analysis Results */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Analysis Preview
            </h3>
            
            {/* Risk Level */}
            <div className={`border rounded-lg p-4 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Risk Level</h4>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Overall manipulation score
              </p>
              <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-300'}`} style={{ width: '10%' }}></div>
              </div>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Analysis will appear here after you submit your conversation
              </p>
            </div>

            {/* Detected Patterns */}
            <div className={`border rounded-lg p-4 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Detected Patterns
              </h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" className="text-purple-600" disabled />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Gaslighting indicators
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" className="text-purple-600" disabled />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Guilt manipulation
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" className="text-purple-600" disabled />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Emotional blackmail
                  </span>
                </label>
              </div>
            </div>

            {/* Key Insights */}
            <div className={`border rounded-lg p-4 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Key Insights
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Detailed analysis will appear here after you submit your conversation for review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
