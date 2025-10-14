import { Bell } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`py-16 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Column: SilentSignal Information */}
          <div className="space-y-4">
            {/* Logo and Name */}
            <div className="flex items-center space-x-3">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#analyzer" className="text-gray-300 hover:text-white transition-colors">Message Analyzer</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#warning-signs" className="text-gray-300 hover:text-white transition-colors">Warning Signs</a></li>
              <li><a href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Right Column: Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@silentsignal.com" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="mailto:contact@silentsignal.com" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><button className="text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer">Privacy Policy</button></li>
              <li><button className="text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SilentSignal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};