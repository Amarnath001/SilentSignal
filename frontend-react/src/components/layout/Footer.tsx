import { Bell } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Footer = () => {
  const { isDarkMode } = useTheme();


  return (
    <footer className={`py-16 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
          {/* Left Column: SilentSignal Information */}
          <div className="space-y-4 text-center md:text-left">
            {/* Logo and Name */}
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">SilentSignal</span>
                <div className="text-sm text-gray-400">Emotional Manipulation Detection</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-white leading-relaxed">
              Empowering people to recognize emotional manipulation and abuse through private, AI-powered conversation analysis.
            </p>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#analyzer" className="text-gray-300 hover:text-white transition-colors">Message Analyzer</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#warning-signs" className="text-gray-300 hover:text-white transition-colors">Warning Signs</a></li>
              <li><a href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Right Column: Resources */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="tel:1-800-799-7233" className="text-gray-300 hover:text-white transition-colors">National DV Hotline: 1-800-799-7233</a></li>
              <li><a href="https://www.thehotline.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">National Domestic Violence Hotline</a></li>
              <li><a href="sms:741741&body=HOME" className="text-gray-300 hover:text-white transition-colors">Crisis Text Line: Text HOME to 741741</a></li>
              <li><a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Crisis Text Line Resources</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-sm text-center">
              SilentSignal - Hackathon Project 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};