export const HeroContent = () => {
  return (
    <div className="text-center lg:text-left">
      {/* Privacy Badge */}
      <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-700">Secure & Private</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
        Detect <span className="text-yellow-400 drop-shadow-lg animate-pulse">Emotional</span> Manipulation
      </h1>
      
      {/* Description */}
      <p className="text-xl text-white/90 mb-8 drop-shadow-lg max-w-2xl mx-auto lg:mx-0">
        Protect yourself from emotional abuse with AI-powered conversation analysis. 
        Get instant insights into manipulation patterns—completely private and secure.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <button className="group px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out shadow-lg">
          <span className="group-hover:animate-bounce">Analyze Messages Now</span>
        </button>
        <button className="group px-8 py-4 bg-purple-800 text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-purple-900 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out border border-purple-700">
          <span className="group-hover:animate-pulse">Learn More</span>
        </button>
      </div>
    </div>
  );
};
