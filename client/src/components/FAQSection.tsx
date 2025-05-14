import React from 'react';
import { Card } from "@/components/ui/card";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

// Simple interface for FAQ data
interface FAQProps {
  faqs: {
    category: string;
    questions: {
      question: string;
      answer: string;
    }[];
  }[];
}

const FAQSection = ({ faqs }: FAQProps) => {
  // State to track which questions are open
  const [openQuestions, setOpenQuestions] = React.useState<{[key: string]: boolean}>({});
  
  // Toggle function for questions
  const toggleQuestion = (categoryIdx: number, questionIdx: number) => {
    const key = `${categoryIdx}-${questionIdx}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section 
      className="py-24 relative" 
      id="faq"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,69,0,0.25)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-mixed">
              Frequently Asked Questions
            </h2>
            <p className="text-[#a0a0a0] max-w-2xl mx-auto">
              Find answers to common questions about our protective coating products and services.
            </p>
          </div>
        </div>

        {/* FAQ Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs.map((category, categoryIdx) => (
            <div key={categoryIdx} className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-xl p-6 border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,69,0,0.25)]">
              {/* Category Title */}
              <h3 className={`text-xl font-bold mb-6 pb-4 border-b border-gray-600/40 ${
                categoryIdx % 3 === 0 ? 'gradient-text-fire' : 
                categoryIdx % 3 === 1 ? 'gradient-text-blue' : 
                'gradient-text-mixed'
              }`}>
                {category.category}
              </h3>
              
              {/* Questions List */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIdx) => {
                  const isOpen = openQuestions[`${categoryIdx}-${questionIdx}`];
                  
                  return (
                    <div key={questionIdx} className="mb-4">
                      {/* Question Box with Gradient Border */}
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-lg blur-sm opacity-60"></div>
                        <button
                          onClick={() => toggleQuestion(categoryIdx, questionIdx)}
                          className="relative w-full bg-gray-800/70 backdrop-blur-sm rounded-lg px-5 py-3 text-left hover:bg-gray-700/80 transition-colors font-medium text-base border border-amber-500/30 flex justify-between items-center"
                        >
                          <span>{faq.question}</span>
                          <svg 
                            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Answer Content */}
                      {isOpen && (
                        <div className="px-5 pt-4 pb-2 text-gray-300 mt-2 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="mb-5 text-gray-300">Still have questions? We're here to help.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-orange-900/30 hover:shadow-xl hover:shadow-orange-900/40 hover:translate-y-[-2px]"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;