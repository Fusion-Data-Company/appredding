import React from 'react';
import { Card } from "@/components/ui/card";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";
import { PremiumBadge } from "@/components/ui/premium-badge";

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
      className="py-32 relative" 
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
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enterprise grade header card with premium styling */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            {/* Premium Header Badge */}
            <PremiumBadge>ENTERPRISE GRADE</PremiumBadge>
            
            {/* Premium Enterprise Header Card */}
            <div className="relative p-12 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.7)] mb-8 group">
              {/* Blue and orange outer glow effect */}
              <div className="absolute -inset-4 rounded-xl opacity-60 z-0 animate-glow-pulse" 
                style={{ boxShadow: '0 0 80px 20px rgba(59,130,246,0.4), 0 0 50px 20px rgba(249,115,22,0.4)' }}>
              </div>
              
              {/* Dual-layer border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-orange-500/40 animate-glowing-border"></div>
              <div className="absolute inset-[2px] rounded-xl border border-blue-500/30"></div>
              
              {/* Corner accent decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-70">
                <div className="absolute right-0 top-0 w-8 h-8 border-r-2 border-t-2 border-orange-500/60 rounded-tr-md"></div>
                <div className="absolute right-1 top-1 w-12 h-12 border-r border-t border-blue-500/50 rounded-tr-md"></div>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 opacity-70">
                <div className="absolute left-0 top-0 w-8 h-8 border-l-2 border-t-2 border-orange-500/60 rounded-tl-md"></div>
                <div className="absolute left-1 top-1 w-12 h-12 border-l border-t border-blue-500/50 rounded-tl-md"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 opacity-70">
                <div className="absolute right-0 bottom-0 w-8 h-8 border-r-2 border-b-2 border-blue-500/60 rounded-br-md"></div>
                <div className="absolute right-1 bottom-1 w-12 h-12 border-r border-b border-blue-500/50 rounded-br-md"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 opacity-70">
                <div className="absolute left-0 bottom-0 w-8 h-8 border-l-2 border-b-2 border-blue-500/60 rounded-bl-md"></div>
                <div className="absolute left-1 bottom-1 w-12 h-12 border-l border-b border-blue-500/50 rounded-bl-md"></div>
              </div>
              
              {/* Ambient glow effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-40 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 blur-[100px] rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-40 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 blur-[100px] rounded-full"></div>
              
              {/* Animated fading squares - appearing and disappearing */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-lg border border-orange-500/20 opacity-0 group-hover:opacity-70 rotate-12 transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 rounded-lg border border-blue-500/20 opacity-0 group-hover:opacity-70 -rotate-12 transition-all duration-1000 animate-pulse-slow-delayed"></div>
              <div className="absolute top-1/2 right-12 w-12 h-12 rounded-lg border border-purple-500/20 opacity-0 group-hover:opacity-60 rotate-45 transition-all duration-1000 animate-pulse"></div>
              <div className="absolute bottom-1/2 left-12 w-12 h-12 rounded-lg border border-orange-500/20 opacity-0 group-hover:opacity-60 -rotate-45 transition-all duration-1000 animate-pulse-slow"></div>

              {/* Heading with premium styling */}
              <div className="relative z-20">
                <h2 
                  className="text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight text-white"
                  style={{ 
                    textShadow: '0 0 8px rgba(255,255,255,0.3), 0 0 30px rgba(59,130,246,0.3), 0 0 30px rgba(249,115,22,0.2)'
                  }}
                >
                  Frequently Asked Questions
                </h2>
              </div>
                
              {/* Subtle top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
              {/* Bottom reflection effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
            </div>
              
            {/* Subtitle with premium styling */}
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed z-20 mt-8 text-center relative"
              style={{ 
                textShadow: '0 1px 1px rgba(0,0,0,0.7)',
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
              }}
            >
              Find answers to common questions about our protective coating products and services.
            </p>
          </div>
        </div>
        
        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {faqs.map((category, categoryIdx) => {
            return (
              <div key={categoryIdx} className="group relative h-full">
                {/* Premium styled FAQ category card */}
                <div className="p-4 bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 backdrop-blur-md rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden h-full flex flex-col justify-between">
                  {/* Enhanced outer glow effect */}
                  <div className="absolute -inset-1 rounded-xl opacity-70 z-0" 
                    style={{ boxShadow: '0 0 20px 2px rgba(59,130,246,0.3), 0 0 15px 2px rgba(249,115,22,0.3)' }}>
                  </div>
                  
                  {/* Inset glow effect */}
                  <div className="absolute inset-0 rounded-xl opacity-70 z-0" 
                    style={{ boxShadow: 'inset 0 0 30px 0 rgba(59,130,246,0.2), inset 0 0 20px 0 rgba(249,115,22,0.2)' }}>
                  </div>
                  
                  {/* Enhanced dual-edge border effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-orange-500/40 group-hover:border-orange-500/60 transition-all duration-700 animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-[2px] rounded-xl border border-blue-500/30 group-hover:border-blue-500/50 transition-all duration-700"></div>

                  {/* Corner accent decorations */}
                  <div className="absolute top-0 right-0 w-10 h-10 opacity-70">
                    <div className="absolute right-0 top-0 w-4 h-4 border-r-2 border-t-2 border-orange-500/60 rounded-tr-md"></div>
                    <div className="absolute right-1 top-1 w-6 h-6 border-r border-t border-blue-500/50 rounded-tr-md"></div>
                  </div>
                  <div className="absolute top-0 left-0 w-10 h-10 opacity-70">
                    <div className="absolute left-0 top-0 w-4 h-4 border-l-2 border-t-2 border-orange-500/60 rounded-tl-md"></div>
                    <div className="absolute left-1 top-1 w-6 h-6 border-l border-t border-blue-500/50 rounded-tl-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 opacity-70">
                    <div className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-blue-500/60 rounded-br-md"></div>
                    <div className="absolute right-1 bottom-1 w-6 h-6 border-r border-b border-blue-500/50 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 opacity-70">
                    <div className="absolute left-0 bottom-0 w-4 h-4 border-l-2 border-b-2 border-blue-500/60 rounded-bl-md"></div>
                    <div className="absolute left-1 bottom-1 w-6 h-6 border-l border-b border-blue-500/50 rounded-bl-md"></div>
                  </div>
                  
                  {/* Enhanced ambient glow */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-gradient-to-r from-orange-500/0 via-orange-500/15 to-orange-500/0 blur-[40px] rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-gradient-to-r from-blue-500/0 via-blue-500/15 to-blue-500/0 blur-[40px] rounded-full"></div>
                  
                  {/* Animated fading squares */}
                  <div className="absolute top-6 right-4 w-8 h-8 rounded-md border border-orange-500/20 opacity-0 group-hover:opacity-50 rotate-12 transition-all duration-1000 animate-pulse-slow"></div>
                  <div className="absolute bottom-6 left-4 w-7 h-7 rounded-md border border-blue-500/20 opacity-0 group-hover:opacity-50 -rotate-12 transition-all duration-1000 animate-pulse-slow-delayed"></div>
                  <div className="absolute top-1/3 right-6 w-6 h-6 rounded-md border border-purple-500/15 opacity-0 group-hover:opacity-40 rotate-45 transition-all duration-1000 animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-6 w-6 h-6 rounded-md border border-orange-500/15 opacity-0 group-hover:opacity-40 -rotate-45 transition-all duration-1000 animate-pulse-slow"></div>
                  
                  {/* Content container with proper spacing */}
                  <div className="flex flex-col h-full">
                    {/* Category title with premium styling */}
                    <h3 
                      className="text-xl font-bold mb-4 text-white relative z-10"
                      style={{ 
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                      }}
                    >
                      {category.category}
                    </h3>
                    
                    {/* FAQ Questions for this category */}
                    <div className="space-y-3 relative z-10 flex-grow">
                      {category.questions.map((faq, questionIdx) => {
                        // Create a unique key for this question
                        const questionKey = `${categoryIdx}-${questionIdx}`;
                        const isOpen = openQuestions[questionKey] || false;
                        
                        return (
                          <div 
                            key={questionIdx} 
                            className="group/faq"
                          >
                            {/* Premium styled question button with enhanced hover effects */}
                            <button
                              className="w-full text-left p-3 rounded-lg relative bg-gradient-to-br from-gray-800/60 via-gray-850/60 to-gray-900/60 backdrop-blur-sm group-hover/faq:from-gray-800/80 group-hover/faq:to-gray-900/80 transition-all duration-300"
                              onClick={() => toggleQuestion(categoryIdx, questionIdx)}
                            >
                              {/* Enhanced border glow */}
                              <div className="absolute -inset-px rounded-lg opacity-40 group-hover/faq:opacity-100 transition-opacity duration-500 z-0" 
                                style={{ boxShadow: '0 0 15px 2px rgba(59,130,246,0.3), 0 0 10px 2px rgba(249,115,22,0.3)' }}>
                              </div>
                              
                              {/* Enhanced dual-edge border effect */}
                              <div className="absolute inset-0 rounded-lg border border-orange-500/30 group-hover/faq:border-orange-500/50 transition-colors duration-500"></div>
                              <div className="absolute inset-[1px] rounded-lg border border-blue-500/20 group-hover/faq:border-blue-500/40 transition-colors duration-500"></div>
                              
                              {/* Corner accent decorations for questions */}
                              <div className="absolute top-0 right-0 w-8 h-8 opacity-60">
                                <div className="absolute right-0 top-0 w-3 h-3 border-r border-t border-orange-500/50 rounded-tr-sm"></div>
                                <div className="absolute right-0.5 top-0.5 w-5 h-5 border-r border-t border-blue-500/40 rounded-tr-sm"></div>
                              </div>
                              <div className="absolute top-0 left-0 w-8 h-8 opacity-60">
                                <div className="absolute left-0 top-0 w-3 h-3 border-l border-t border-orange-500/50 rounded-tl-sm"></div>
                                <div className="absolute left-0.5 top-0.5 w-5 h-5 border-l border-t border-blue-500/40 rounded-tl-sm"></div>
                              </div>
                              
                              {/* Subtle ambient glow */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-12 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 blur-[30px] rounded-full opacity-0 group-hover/faq:opacity-100 transition-opacity duration-700"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-12 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 blur-[30px] rounded-full opacity-0 group-hover/faq:opacity-100 transition-opacity duration-700"></div>
                              
                              <div className="flex items-center justify-between relative z-10">
                                <h4 
                                  className="font-medium text-white text-base md:text-lg"
                                  style={{ 
                                    textShadow: '0 1px 1px rgba(0,0,0,0.7)'
                                  }}
                                >
                                  {faq.question}
                                </h4>
                                <svg
                                  className={`w-5 h-5 text-gray-300 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  style={{
                                    filter: isOpen ? 'drop-shadow(0 0 3px rgba(59,130,246,0.4))' : 'none'
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </button>
                            
                            {/* Enhanced sliding answer panel with premium styling */}
                            <div 
                              className={`overflow-hidden transition-all duration-500 ${
                                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="relative p-5 text-gray-300 bg-gradient-to-br from-gray-900/80 via-gray-950/80 to-black/80 backdrop-blur-sm rounded-b-lg border-t border-t-gray-800/60 mt-1">
                                {/* Subtle answer glow effect */}
                                <div className="absolute inset-0 rounded-b-lg opacity-30" 
                                  style={{ boxShadow: 'inset 0 0 20px 0 rgba(59,130,246,0.1), inset 0 0 10px 0 rgba(249,115,22,0.1)' }}>
                                </div>
                                
                                {/* Corner accent decorations for answers */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 opacity-40">
                                  <div className="absolute right-0 bottom-0 w-3 h-3 border-r border-b border-blue-500/40 rounded-br-sm"></div>
                                  <div className="absolute right-0.5 bottom-0.5 w-5 h-5 border-r border-b border-blue-500/30 rounded-br-sm"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 opacity-40">
                                  <div className="absolute left-0 bottom-0 w-3 h-3 border-l border-b border-blue-500/40 rounded-bl-sm"></div>
                                  <div className="absolute left-0.5 bottom-0.5 w-5 h-5 border-l border-b border-blue-500/30 rounded-bl-sm"></div>
                                </div>
                                
                                <p className="relative z-10" dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br />') }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Bottom reflection effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium CTA Section */}
        <div className="text-center mt-24">
          <div className="relative mx-auto max-w-3xl">
            <div className="relative p-10 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.7)] overflow-hidden group hover:scale-[1.02] transition-transform duration-700">
              {/* Outer glow effects */}
              <div className="absolute -inset-2 rounded-xl opacity-50 group-hover:opacity-90 transition-opacity duration-700" 
                style={{ boxShadow: '0 0 30px 5px rgba(59,130,246,0.3), 0 0 20px 5px rgba(249,115,22,0.3)' }}>
              </div>
              
              {/* Dual-layer border */}
              <div className="absolute inset-0 rounded-xl border-2 border-orange-500/30 group-hover:border-orange-500/50 transition-colors duration-700"></div>
              <div className="absolute inset-[2px] rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-700"></div>
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-60">
                <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
              </div>
              <div className="absolute top-0 left-0 w-16 h-16 opacity-60">
                <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-60">
                <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-blue-500/40 rounded-br-md"></div>
                <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 opacity-60">
                <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-blue-500/40 rounded-bl-md"></div>
                <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
              </div>
              
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 blur-[80px] rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 blur-[80px] rounded-full"></div>
              
              {/* Text content */}
              <div className="relative flex items-center justify-center mb-8 z-10">
                <div className="relative h-12 w-12 mr-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-orange-500/50"></div>
                  <div className="absolute inset-[2px] rounded-full border border-blue-500/40"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                <p 
                  className="text-xl font-bold text-white"
                  style={{ 
                    textShadow: '0 1px 1px rgba(0,0,0,0.7)',
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
                  }}
                >
                  Still have questions? Our protective coating experts are here to help.
                </p>
              </div>
              
              {/* Button */}
              <div className="relative z-10">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center px-8 py-4 rounded-lg text-white text-lg font-medium transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-lg"></div>
                  <div className="absolute inset-0 rounded-lg border border-orange-500/40 group-hover:border-orange-500/60 transition-colors duration-500"></div>
                  <div className="absolute inset-[1px] rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-colors duration-500"></div>
                  
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ boxShadow: '0 0 15px 2px rgba(59,130,246,0.3), 0 0 15px 2px rgba(249,115,22,0.3)' }}>
                  </div>
                  
                  <span className="relative z-10 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                    Contact Our Experts
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;