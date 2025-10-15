import { Bell, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const scrollToHero = () => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no hero ID, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-lg ${
      isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-purple-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer flex-shrink-0" onClick={scrollToHero}>
            <div className="relative group-hover:scale-125 transition-transform duration-300">
              <Shield size={32} className="text-purple-600 group-hover:animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Bell size={20} className={`${isDarkMode ? 'text-white' : 'text-purple-600'}`} />
                <div className="absolute -top-1 -right-1 w-2 h-0.5 bg-white transform rotate-45"></div>
              </div>
            </div>
            <div>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>
                SilentSignal
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 mr-8">
            <a href="#analyzer" className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
              isDarkMode ? 'text-purple-300 hover:text-purple-100' : 'text-purple-700 hover:text-purple-900'
            }`}>
              Analyzer
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isDarkMode ? 'bg-purple-100' : 'bg-purple-900'
              }`}></span>
            </a>
            <a href="#how-it-works" className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
              isDarkMode ? 'text-purple-300 hover:text-purple-100' : 'text-purple-700 hover:text-purple-900'
            }`}>
              How It Works
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isDarkMode ? 'bg-purple-100' : 'bg-purple-900'
              }`}></span>
            </a>
            <a href="#warning-signs" className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
              isDarkMode ? 'text-purple-300 hover:text-purple-100' : 'text-purple-700 hover:text-purple-900'
            }`}>
              Warning Signs
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isDarkMode ? 'bg-purple-100' : 'bg-purple-900'
              }`}></span>
            </a>
            <a href="#resources" className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
              isDarkMode ? 'text-purple-300 hover:text-purple-100' : 'text-purple-700 hover:text-purple-900'
            }`}>
              Resources
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isDarkMode ? 'bg-purple-100' : 'bg-purple-900'
              }`}></span>
            </a>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12 flex-shrink-0 ${
              isDarkMode ? 'bg-gray-800 hover:bg-blue-500 text-yellow-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/50' : 'bg-gray-100 hover:bg-purple-600 text-gray-600 hover:text-white hover:shadow-lg hover:shadow-purple-400/50'
            }`}
            aria-label="Toggle theme"
          >
            <span className="transition-transform duration-300">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};