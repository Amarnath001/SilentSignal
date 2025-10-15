import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useAnalysis } from '../../hooks/useAnalysis';

export const MessageAnalyzer = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { isAnalyzing, result, error, isBackendAvailable, analyzeConversation, clearResult, checkBackendHealth } = useAnalysis();
  const [conversation, setConversation] = useState('');

  // Check backend health on component mount
  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  const handleAnalyze = async () => {
    if (!conversation.trim()) {
      return;
    }
    await analyzeConversation(conversation);
  };

  const handleClear = () => {
    setConversation('');
    clearResult();
  };

  return (
    <section ref={elementRef} id="analyzer" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Message Analyzer
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-slate-200' : 'text-gray-600'}`}>
            Paste your conversation below for a comprehensive AI-powered analysis of emotional manipulation patterns.
          </p>
          {/* Backend Status Indicator */}
          <div className={`mt-4 flex items-center justify-center space-x-2 ${isBackendAvailable ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${isBackendAvailable ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-sm font-medium">
              {isBackendAvailable ? 'AI Analysis Ready' : 'Backend Unavailable'}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Conversation Input */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Conversation Input
              </h3>
              <p className={`mb-4 ${isDarkMode ? 'text-slate-200' : 'text-gray-600'}`}>
                Copy and paste your text messages, chat history, or conversation here.
              </p>
              <textarea
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                disabled={isAnalyzing}
                className={`w-full h-96 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Paste your conversation here...

Example:
Person A: Why didn't you respond immediately? You obviously don't care about me.
Person B: I was in a meeting, I do care about you
Person A: That's just an excuse. If you really cared, you would have found a way to respond."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !conversation.trim() || !isBackendAvailable}
                className={`group px-6 py-3 rounded-lg transition-all duration-300 ${
                  isAnalyzing || !conversation.trim() || !isBackendAvailable
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-yellow-500 hover:text-purple-900 hover:scale-105 hover:shadow-xl'
                } ${isDarkMode ? 'shadow-lg' : ''}`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  <span className="group-hover:animate-pulse">Analyze Conversation</span>
                )}
              </button>
              <button 
                onClick={handleClear}
                disabled={isAnalyzing}
                className={`group px-6 py-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ${
                  isAnalyzing
                    ? 'border-gray-400 text-slate-300 cursor-not-allowed'
                    : isDarkMode
                      ? 'border-gray-600 text-slate-200 hover:bg-red-500 hover:text-white hover:border-red-500'
                      : 'border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500'
                }`}
              >
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

            {/* Emergency Help Section - Only show for abuse risk level */}
            {result && result.risk_level === 'abuse' && (
              <div className={`border-2 border-red-500 rounded-lg p-6 bg-red-50 dark:bg-red-900/30 animate-pulse`}>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🚨</span>
                  <h4 className={`text-xl font-bold ${isDarkMode ? 'text-red-200' : 'text-red-900'}`}>
                    Emergency Support Available
                  </h4>
                </div>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                  This conversation shows signs of emotional abuse. Your safety is important - help is available 24/7.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Immediate Help */}
                  <div className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-red-800/40 border-red-600' : 'bg-white border-red-300'
                  }`}>
                    <h5 className={`font-semibold mb-2 ${isDarkMode ? 'text-red-200' : 'text-red-900'}`}>
                      Immediate Help
                    </h5>
                    <div className="space-y-2">
                      <a 
                        href="tel:1-800-799-7233" 
                        className={`block p-2 rounded bg-red-600 text-white text-center hover:bg-red-700 transition-colors font-semibold ${
                          isDarkMode ? 'hover:bg-red-500' : ''
                        }`}
                      >
                        📞 National Domestic Violence Hotline: 1-800-799-7233
                      </a>
                      <a 
                        href="sms:741741&body=HOME" 
                        className={`block p-2 rounded bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors font-semibold ${
                          isDarkMode ? 'hover:bg-blue-500' : ''
                        }`}
                      >
                        💬 Crisis Text Line: Text HOME to 741741
                      </a>
                    </div>
                  </div>

                  {/* Online Resources */}
                  <div className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-red-800/40 border-red-600' : 'bg-white border-red-300'
                  }`}>
                    <h5 className={`font-semibold mb-2 ${isDarkMode ? 'text-red-200' : 'text-red-900'}`}>
                      Online Resources
                    </h5>
                    <div className="space-y-2">
                      <a 
                        href="https://www.thehotline.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block p-2 rounded border text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          isDarkMode ? 'border-red-400 text-red-200' : 'border-red-300 text-red-800'
                        }`}
                      >
                        🌐 The National Domestic Violence Hotline
                      </a>
                      <a 
                        href="https://www.crisistextline.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block p-2 rounded border text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          isDarkMode ? 'border-red-400 text-red-200' : 'border-red-300 text-red-800'
                        }`}
                      >
                        💬 Crisis Text Line Resources
                      </a>
                    </div>
                  </div>
                </div>

                <div className={`mt-4 p-3 rounded-lg ${
                  isDarkMode ? 'bg-red-800/60' : 'bg-red-100'
                }`}>
                  <p className={`text-xs ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                    <strong>Remember:</strong> You are not alone. These resources are confidential and available 24/7. 
                    Trust your instincts - if you feel unsafe, reach out for help immediately.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Analysis Results */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {result ? 'Analysis Results' : 'Analysis Preview'}
            </h3>
            
            {/* Error State */}
            {error && (
              <div className="border border-red-500 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-red-700 dark:text-red-300">
                    Analysis Error
                  </span>
                </div>
                <p className="text-sm mt-2 text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Results */}
            {result ? (
              <>
                {/* Risk Level */}
                <div className={`border rounded-lg p-4 ${
                  result.risk_level === 'safe' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                  result.risk_level === 'concerning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      result.risk_level === 'safe' ? 'bg-green-500' :
                      result.risk_level === 'concerning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className={`font-medium ${
                      result.risk_level === 'safe' ? 'text-green-700 dark:text-green-300' :
                      result.risk_level === 'concerning' ? 'text-yellow-700 dark:text-yellow-300' :
                      'text-red-700 dark:text-red-300'
                    }`}>
                      Risk Level: {result.risk_level.charAt(0).toUpperCase() + result.risk_level.slice(1)}
                    </span>
                    <span className={`text-sm ${
                      result.risk_level === 'safe' ? 'text-green-600 dark:text-green-400' :
                      result.risk_level === 'concerning' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {result.risk_level === 'safe' ? 'Safe' : result.risk_level === 'concerning' ? 'Concerning' : 'Abuse'}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${
                    result.risk_level === 'safe' ? 'text-green-600 dark:text-green-400' :
                    result.risk_level === 'concerning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {result.reasoning}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Placeholder when no analysis */}
                <div className={`border rounded-lg p-4 ${
                  isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Risk Level: Not Analyzed
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-600'}`}>
                    Enter a conversation above to get AI-powered analysis results.
                  </p>
                </div>
              </>
            )}

        {/* Detected Patterns with Keywords */}
        {result?.patterns_detected && result.patterns_detected.length > 0 && (
          <div className={`border rounded-lg p-4 ${
            isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <h4 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🔍 Detected Patterns ({result.patterns_detected.length})
            </h4>
            <div className="space-y-4">
              {result.patterns_detected.map((pattern, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 shadow-sm ${
                  pattern.severity === 'critical' ? 'border-l-red-500 bg-red-50 dark:border-l-red-400 dark:bg-red-900/50 dark:border-red-400/50' :
                  pattern.severity === 'high' ? 'border-l-red-500 bg-red-50 dark:border-l-red-400 dark:bg-red-800/40 dark:border-red-400/50' :
                  pattern.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50 dark:border-l-yellow-400 dark:bg-yellow-800/40 dark:border-yellow-400/50' :
                  'border-l-blue-500 bg-blue-50 dark:border-l-blue-400 dark:bg-blue-800/40 dark:border-blue-400/50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-xl capitalize text-gray-900 dark:text-white">
                        {pattern.name.replace('_', ' ')}
                      </span>
                      <span className={`ml-2 text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
                        pattern.severity === 'critical' ? 'bg-red-200 text-red-900 dark:bg-red-500 dark:text-white dark:shadow-red-500/25' :
                        pattern.severity === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-400 dark:text-white dark:shadow-red-400/25' :
                        pattern.severity === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-400 dark:text-white dark:shadow-yellow-400/25' :
                        'bg-blue-200 text-blue-800 dark:bg-blue-400 dark:text-white dark:shadow-blue-400/25'
                      }`}>
                        {pattern.severity}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ✓ Detected
                    </span>
                  </div>
                  <p className="text-sm mb-2 text-gray-700 dark:text-slate-200">
                    <strong>What this means:</strong> {pattern.description}
                  </p>
                  <div className="text-sm">
                    <strong className="text-gray-700 dark:text-slate-200">How it affects you:</strong>
                    <p className="text-gray-600 dark:text-slate-300 mt-1">
                      {pattern.severity === 'critical' && 'This is extremely dangerous behavior that can cause serious psychological harm. Immediate action is needed.'}
                      {pattern.severity === 'high' && 'This behavior is harmful and can significantly impact your mental health and wellbeing over time.'}
                      {pattern.severity === 'medium' && 'This behavior is concerning and may indicate unhealthy relationship patterns that should be addressed.'}
                      {pattern.severity === 'low' && 'This behavior shows some warning signs that should be monitored.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Red Flags - Contextual Evidence */}
        {result && (result.risk_level === 'abuse' || result.risk_level === 'concerning') && (
          <div className={`border rounded-lg p-4 ${
            isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🚩 Red Flags Found
            </h4>
            
            {/* Show detected patterns if available */}
            {result.patterns_detected && result.patterns_detected.length > 0 ? (
              <div className="space-y-4">
                {result.patterns_detected.map((pattern, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 shadow-sm ${
                    pattern.severity === 'critical' ? 'border-l-red-500 bg-red-50 dark:border-l-red-400 dark:bg-red-900/50 dark:border-red-400/50' :
                    pattern.severity === 'high' ? 'border-l-red-500 bg-red-50 dark:border-l-red-400 dark:bg-red-800/40 dark:border-red-400/50' :
                    pattern.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50 dark:border-l-yellow-400 dark:bg-yellow-800/40 dark:border-yellow-400/50' :
                    'border-l-blue-500 bg-blue-50 dark:border-l-blue-400 dark:bg-blue-800/40 dark:border-blue-400/50'
                  }`}>
                    <div className="mb-3">
                      <span className="font-bold text-xl capitalize text-gray-900 dark:text-white">
                        {pattern.name.replace('_', ' ')}
                      </span>
                      <span className={`ml-2 text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
                        pattern.severity === 'critical' ? 'bg-red-200 text-red-900 dark:bg-red-500 dark:text-white dark:shadow-red-500/25' :
                        pattern.severity === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-400 dark:text-white dark:shadow-red-400/25' :
                        pattern.severity === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-400 dark:text-white dark:shadow-yellow-400/25' :
                        'bg-blue-200 text-blue-800 dark:bg-blue-400 dark:text-white dark:shadow-blue-400/25'
                      }`}>
                        {pattern.severity}
                      </span>
                    </div>
                    <div className="text-sm space-y-3">
                      <p className={`${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                        <strong>What was detected:</strong> {pattern.description}
                      </p>
                      <p className={`${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                        <strong>Why this is concerning:</strong> {
                          pattern.severity === 'critical' ? 'This language indicates extreme manipulation or threats that can cause serious psychological harm. This is dangerous behavior that requires immediate attention.' :
                          pattern.severity === 'high' ? 'This type of language is designed to manipulate your emotions and control your behavior. It can significantly damage your mental health over time.' :
                          pattern.severity === 'medium' ? 'This language shows unhealthy communication patterns that can erode trust and create emotional distress in relationships.' :
                          'This language shows some warning signs that should be monitored for escalation.'
                        }
                      </p>
                      {pattern.evidence && (
                        <p className={`${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                          <strong>Specific evidence:</strong> <span className="font-mono bg-gray-200 dark:bg-slate-700 dark:text-slate-100 px-1 rounded">"{pattern.evidence}"</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Show AI-detected concerns when no specific patterns are found */
              <div className="space-y-2">
                <p className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                  <strong>What was detected:</strong> The AI analysis identified concerning patterns in this conversation that indicate {result.risk_level === 'abuse' ? 'emotional abuse or manipulation' : 'unhealthy communication patterns'}.
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                  <strong>Why this is concerning:</strong> {
                    result.risk_level === 'abuse' ? 'This conversation contains language that can cause serious psychological harm. This behavior is dangerous and requires immediate attention.' :
                    'This conversation shows unhealthy communication patterns that may indicate manipulation or emotional abuse. Trust your instincts about how this makes you feel.'
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* No Red Flags Message - only show for safe conversations */}
        {result && result.risk_level === 'safe' && (
          <div className={`border rounded-lg p-4 ${
            isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ✅ No Red Flags Detected
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-600'}`}>
              No concerning patterns were found in this conversation. The language appears to be healthy and respectful.
            </p>
          </div>
        )}

        {/* Safety Suggestions */}
        {result && result.suggestions && result.suggestions.length > 0 && (
          <div className={`border rounded-lg p-4 ${
            isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              💡 What You Should Do Next
            </h4>
            <div className="space-y-2">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className={`flex items-start space-x-3 p-2 rounded ${
                  isDarkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                  <span className={`text-sm font-medium mt-0.5 ${
                    isDarkMode ? 'text-yellow-400' : 'text-purple-600'
                  }`}>
                    {index + 1}.
                  </span>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

          </div>
        </div>
      </div>
    </section>
  );
};
