import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const TrustYourInstincts = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleAnalyzeClick = () => {
    // Scroll to the message analyzer section
    const analyzerSection = document.getElementById('analyzer');
    if (analyzerSection) {
      analyzerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHelpClick = () => {
    // Scroll to the resources section
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={elementRef} className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-6">Trust Your Instincts</h2>
          <p className="text-xl mb-8 leading-relaxed">
            If something feels wrong in your relationship, it probably is. SilentSignal can help you recognize the patterns and take the first step toward safety and healing.
          </p>
        </div>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={handleAnalyzeClick}
            className="group bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="group-hover:animate-pulse">Analyze Your Messages</span>
          </button>
          <button 
            onClick={handleHelpClick}
            className="group bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-500 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="group-hover:animate-pulse">Get Immediate Help</span>
          </button>
        </div>
      </div>
    </section>
  );
};