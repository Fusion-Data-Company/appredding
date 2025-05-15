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
      {/* Enhanced overlay with better gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/85"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 filter blur-[120px] animate-pulse-slow" style={{ zIndex: 1 }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 filter blur-[120px] animate-pulse-slow-delayed" style={{ zIndex: 1 }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium enterprise header styling */}
        <div className="relative mb-20 group">
          {/* Ambient glow effects with animation */}
          <div className="absolute inset-0 max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 blur-[100px] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 blur-[100px] rounded-full"></div>
          </div>
          
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* Premium header text with effects */}
            <div className="relative mb-2">
              {/* Shimmer effect container */}
              <div className="relative overflow-hidden">
                <h2 
                  className="text-white font-extrabold tracking-tight py-3 text-center z-10 text-4xl md:text-5xl"
                  style={{ 
                    textShadow: '0 0 8px rgba(59,130,246,0.25), 0 0 15px rgba(59,130,246,0.15), 0 0 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.7)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 2px rgba(255,255,255,0.6))'
                  }}
                >
                  Frequently Asked Questions
                </h2>
                
                {/* Shimmer effect overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform ease-in-out pointer-events-none"
                  style={{ transitionDuration: '1.5s', transitionDelay: '0.3s' }}
                />
              </div>
              
              {/* Animated gradient underline */}
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full mx-auto transition-all duration-1000 opacity-80"></div>
            </div>
            
            {/* Subtitle with premium styling */}
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed z-10 mt-4 mb-8 text-center">
              Find answers to common questions about our protective coating products and services.
            </p>
          </div>
        </div>
        
        {/* Add keyframes for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          
          @keyframes pulse-slow-delayed {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
            animation-delay: 1s;
          }
          
          @keyframes slideRightDiagonal {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(500%); }
          }
          
          @keyframes slideUp {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}} />

        {/* Enterprise grade FAQ Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs.map((category, categoryIdx) => {
            // Card color variations based on index
            const isFirstCard = categoryIdx === 0;
            const isSecondCard = categoryIdx === 1;
            const isThirdCard = categoryIdx === 2;
            
            // Define accent colors based on position
            const borderAccentColor = isFirstCard ? "border-orange-500/40" 
                                    : isSecondCard ? "border-blue-500/40" 
                                    : "border-blue-500/30";
            
            const glowColor = isFirstCard ? "bg-orange-500/15" 
                             : isSecondCard ? "bg-blue-500/15" 
                             : "bg-purple-500/15";
            
            const gradientFrom = isFirstCard ? "from-orange-500/10" 
                                : isSecondCard ? "from-blue-500/10" 
                                : "from-purple-500/10";
                                
            const gradientVia = isFirstCard ? "via-amber-500/15" 
                               : isSecondCard ? "via-cyan-500/15" 
                               : "via-indigo-500/15";
                               
            const gradientTo = isFirstCard ? "to-blue-500/10" 
                              : isSecondCard ? "to-indigo-500/10" 
                              : "to-blue-500/10";
            
            return (
              <div key={categoryIdx} className="group relative">
                {/* Enterprise-grade card container */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-lg h-full border-0 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                  {/* Subtle top highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  
                  {/* Fire/water effect borders */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} animate-pulse z-10`} style={{ animationDuration: '3s' }}></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-blue-600/20 animate-pulse z-10" style={{ animationDuration: '4s' }}></div>
                  
                  {/* Premium glassmorphism effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-lg"></div>
                  
                  {/* Corner accent decorations */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
                    <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute top-0 left-0 w-16 h-16 opacity-40">
                    <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-40">
                    <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-blue-500/40 rounded-br-md"></div>
                    <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 opacity-40">
                    <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-blue-500/40 rounded-bl-md"></div>
                    <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
                  </div>
                  
                  {/* Ambient glow effect */}
                  <div className="absolute inset-0 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-1000" 
                       style={{ background: `radial-gradient(circle at center, ${isFirstCard ? 'rgba(249,115,22,0.15)' : isSecondCard ? 'rgba(59,130,246,0.15)' : 'rgba(139,92,246,0.15)'} 0%, transparent 70%)` }}>
                  </div>
                  
                  {/* Enterprise grade category title */}
                  <div className="relative pt-8 px-6 group/heading">
                    <div className="flex items-center mb-4">
                      {/* Icon with premium enterprise styling */}
                      <div className="relative mr-3 h-10 w-10 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95"></div>
                        <div className="absolute inset-0 rounded-full border border-orange-500/30 group-hover/heading:border-orange-500/50 transition-colors duration-500 opacity-80"></div>
                        <div className="absolute inset-[1px] rounded-full border border-blue-500/20 group-hover/heading:border-blue-500/40 transition-colors duration-500"></div>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {categoryIdx % 3 === 0 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          ) : categoryIdx % 3 === 1 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          )}
                        </svg>
                        
                        {/* Subtle glow behind icon */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/20 to-blue-500/10 blur-lg opacity-80 group-hover/heading:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Category title with white text and subtle shadow */}
                      <h3 
                        className="text-xl lg:text-2xl font-bold text-white relative z-10 group-hover/heading:scale-105 transition-transform duration-500"
                        style={{ 
                          textShadow: '0 0 8px rgba(59,130,246,0.25), 0 0 15px rgba(59,130,246,0.15), 0 0 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.7)',
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))'
                        }}
                      >
                        {category.category}
                      </h3>
                    </div>
                    
                    {/* Animated gradient underline */}
                    <div className="h-0.5 w-16 group-hover/heading:w-32 bg-gradient-to-r from-orange-500/60 via-blue-600/30 to-orange-500/60 rounded-full transition-all duration-1000"></div>
                  </div>
                  
                  {/* Enterprise grade questions and answers list */}
                  <div className="space-y-2 mt-6 px-6 pb-8">
                    {category.questions.map((faq, questionIdx) => {
                      const isOpen = openQuestions[`${categoryIdx}-${questionIdx}`];
                      
                      return (
                        <div key={questionIdx} className="group/question">
                          {/* Question container with enterprise styling */}
                          <div className="relative rounded-lg overflow-hidden">
                            {/* Question button */}
                            <button
                              onClick={() => toggleQuestion(categoryIdx, questionIdx)}
                              className="relative w-full text-left rounded-lg py-4 px-5 flex justify-between items-center bg-gradient-to-br from-gray-900/70 via-gray-950/70 to-black/70 border border-transparent group-hover/question:border-blue-500/20 transition-all duration-300 z-10"
                              style={{ backdropFilter: 'blur(5px)' }}
                            >
                              {/* Ambient glow effect on hover */}
                              <div className="absolute inset-0 opacity-0 group-hover/question:opacity-100 transition-opacity duration-700" 
                                  style={{ background: `radial-gradient(circle at center, ${isFirstCard ? 'rgba(249,115,22,0.1)' : isSecondCard ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)'} 0%, transparent 70%)` }}>
                              </div>
                              
                              <span className="font-medium text-white text-base">
                                {faq.question}
                              </span>
                              
                              {/* Modern toggle icon with animation */}
                              <div className="relative h-6 w-6 flex items-center justify-center">
                                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-100 bg-blue-500/10' : 'opacity-0'}`}></div>
                                <svg 
                                  className={`h-5 w-5 text-gray-300 transition-transform duration-500 ${isOpen ? 'transform rotate-180' : ''}`} 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>
                          </div>
                          
                          {/* Answer with enterprise styling */}
                          {isOpen && (
                            <div className="overflow-hidden transition-all duration-500 rounded-lg mt-1">
                              <div className="relative bg-gradient-to-br from-gray-900/60 via-gray-950/60 to-black/60 rounded-lg p-5 pl-10 border border-blue-500/20">
                                {/* Side accent line */}
                                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/40 via-blue-500/20 to-orange-500/40"></div>
                                
                                {/* Answer text */}
                                <p className="text-gray-300">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Bottom reflection effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            );
          })}
        </div>

        {/* Enterprise grade CTA with premium styling */}
        <div className="text-center mt-20 group/cta">
          <div className="relative inline-block p-8 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            {/* Subtle top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            {/* Fire/water effect borders */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500/20 via-amber-500/30 to-orange-500/20 animate-pulse z-10" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-blue-600/20 animate-pulse z-10" style={{ animationDuration: '4s' }}></div>
            
            {/* Premium glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-lg"></div>
            
            {/* Corner accent decorations */}
            <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
              <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
              <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
            </div>
            <div className="absolute top-0 left-0 w-16 h-16 opacity-40">
              <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
              <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-40">
              <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-blue-500/40 rounded-br-md"></div>
              <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 opacity-40">
              <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-blue-500/40 rounded-bl-md"></div>
              <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
            </div>
            
            {/* Ambient glow effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-orange-500/0 via-orange-500/15 to-orange-500/0 blur-[100px] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-500/0 via-blue-500/15 to-blue-500/0 blur-[100px] rounded-full"></div>
            
            {/* Enterprise message with white drop shadow */}
            <p 
              className="text-xl text-white mb-8 max-w-xl mx-auto" 
              style={{ 
                textShadow: '0 0 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.7)',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))'
              }}
            >
              <span className="inline-block relative mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Still have questions? Our protective coating experts are here to help.
            </p>
            
            {/* Enterprise-grade button with animation effects */}
            <a
              href="#contact"
              className="group relative inline-flex items-center px-8 py-4 rounded-lg text-white text-lg font-medium transition-all duration-500 overflow-hidden"
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-lg"></div>
              
              {/* Border with dual-layer effect */}
              <div className="absolute inset-0 rounded-lg border border-orange-500/40 group-hover:border-orange-500/60 transition-colors duration-500"></div>
              <div className="absolute inset-[1px] rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-colors duration-500"></div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                 style={{ boxShadow: '0 0 15px 2px rgba(59,130,246,0.3), 0 0 15px 2px rgba(249,115,22,0.3)' }}>
              </div>
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform ease-in-out pointer-events-none"
                style={{ transitionDuration: '1s' }}
              ></div>
              
              {/* Button text with premium styling */}
              <span 
                className="relative z-10 font-medium tracking-wider group-hover:scale-105 transition-transform duration-500 flex items-center"
                style={{ 
                  textShadow: '0 0 8px rgba(59,130,246,0.25), 0 0 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.7)',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))'
                }}
              >
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
    </section>
  );
};

export default FAQSection;