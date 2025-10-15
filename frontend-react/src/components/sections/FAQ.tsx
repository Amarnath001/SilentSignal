import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const FAQ = () => {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqs = [
    {
      question: "How accurate is the analysis?",
      answer: "SilentSignal uses advanced AI models combined with pattern recognition to detect emotional manipulation. While no system is 100% accurate, our analysis provides valuable insights into communication patterns that may indicate manipulation. The tool is designed to help you recognize concerning behaviors and should be used alongside your own judgment and, when appropriate, professional support."
    },
    {
      question: "Is my data really private?",
      answer: "Yes, your privacy is our top priority. We do not permanently store your conversation content. Your text is temporarily processed for analysis and then securely deleted. We use encryption for all data transmission and follow strict privacy practices. This is a hackathon project focused on helping people, not collecting data."
    },
    {
      question: "What should I do if the analysis shows high risk?",
      answer: "If the analysis indicates concerning patterns, trust your instincts and prioritize your safety. Consider reaching out to trusted friends or family, seeking professional counseling, or contacting support organizations. For immediate help, you can call the National Domestic Violence Hotline at 1-800-799-7233 or text HOME to 741741 for the Crisis Text Line. Remember, you are not alone and help is available."
    },
    {
      question: "Can this tool be used as evidence?",
      answer: "SilentSignal is a hackathon project designed for awareness and support, not as legal evidence. If you need to document concerning behavior for legal purposes, consider consulting with a lawyer or domestic violence advocate who can guide you on proper documentation methods. Keep screenshots, save messages, and maintain records according to your local laws and legal advice."
    },
    {
      question: "What types of conversations work best?",
      answer: "SilentSignal works best with text conversations that include context and multiple exchanges. Include the full conversation thread, label speakers clearly (Person A, Person B, etc.), and add timestamps when available. The more context you provide, the more accurate the analysis will be. The tool can analyze various communication platforms including text messages, chat apps, and social media conversations."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, SilentSignal is completely free to use. This is a hackathon project created to help people recognize emotional manipulation and abuse. There are no hidden fees, subscriptions, or premium features. Our goal is to make this resource accessible to anyone who needs it."
    },
    {
      question: "What if I disagree with the analysis?",
      answer: "Your feelings and experiences are valid. SilentSignal provides insights based on AI analysis, but you know your situation best. If the analysis doesn't match your experience or feelings, trust your judgment. The tool is meant to support your awareness, not replace your instincts. Consider talking to trusted friends, family, or professionals about your concerns."
    },
    {
      question: "Can I use this for friends or family?",
      answer: "While you can use SilentSignal to analyze conversations involving others, always respect privacy and consent. If you're concerned about someone else's relationship, the best approach is often to support them directly, listen without judgment, and encourage them to seek professional help if needed. Focus on being a supportive presence rather than making decisions for them."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section ref={elementRef} id="faq" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Common questions about SilentSignal and emotional manipulation detection
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              {/* Question Header */}
              <div 
                onClick={() => toggleItem(index)}
                className={`p-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover-lift group ${
                  isDarkMode 
                    ? 'hover:bg-gray-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openItems.has(index) ? 'rotate-180' : 'rotate-0'
                  } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Answer Content */}
              <div className={`overflow-hidden transition-all duration-300 ${
                openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`px-6 pb-6 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-lg leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};