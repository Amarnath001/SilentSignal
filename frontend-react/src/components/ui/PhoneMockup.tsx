export const PhoneMockup = () => {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative">
        <div className="w-72 h-[520px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2.5rem] p-4 overflow-hidden">
            {/* Phone Status Bar */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <div className="text-xs font-medium text-gray-600">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex flex-col justify-center h-full space-y-4">
              {/* First message bubble - manipulative message */}
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-pink-100 rounded-2xl rounded-bl-md p-3 shadow-sm">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    "Why didn't you respond immediately? You obviously don't care about me."
                  </p>
                </div>
              </div>
              
              {/* Second message bubble - response */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-gray-100 rounded-2xl rounded-br-md p-3 shadow-sm">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    "I was in a meeting, I do care about you"
                  </p>
                </div>
              </div>
              
              {/* Risk Detection Alert */}
              <div className="mt-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Risk Detected</span>
                  </div>
                  <p className="text-xs text-red-800 font-medium">
                    Guilt manipulation pattern identified
                  </p>
                </div>
              </div>
              
              {/* Additional analysis info */}
              <div className="mt-4 space-y-2">
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs font-semibold text-blue-600">Analysis</span>
                  </div>
                  <p className="text-xs text-blue-800">
                    Confidence: 87% • Severity: High
                  </p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs font-semibold text-green-600">Recommendation</span>
                  </div>
                  <p className="text-xs text-green-800">
                    Consider setting clear boundaries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
