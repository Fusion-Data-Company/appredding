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
        {/* Premium card header styling matching Specialized Applications */}
        <div className="relative mb-20">
          {/* Atmospheric background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl">
            <div className="absolute -top-20 left-[10%] w-48 h-48 bg-orange-500/10 rounded-full filter blur-[80px]"></div>
            <div className="absolute -bottom-20 right-[10%] w-72 h-72 bg-orange-600/10 rounded-full filter blur-[100px]"></div>
          </div>
          
          {/* Card container */}
          <div className="relative mx-auto max-w-4xl bg-gradient-to-b from-gray-900/80 to-black/90 rounded-2xl overflow-hidden">
            {/* Premium gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 blur-[2px]"></div>
            
            {/* Inner border glow */}
            <div className="absolute inset-[1px] rounded-xl border border-orange-500/30 bg-black/50 z-0"></div>
            
            {/* Top glossy reflection */}
            <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/5 to-transparent rounded-t-xl"></div>
            
            {/* Corner accent squares - TOP RIGHT */}
            <div className="absolute top-4 right-4 w-12 h-12 z-10">
              <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
              <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-amber-500/30 rounded-tr-md"></div>
              <div className="absolute right-2 top-2 w-4 h-4 bg-gradient-to-br from-orange-500/30 to-amber-500/5 rounded-tr-sm filter blur-[1px]"></div>
            </div>
            
            {/* Corner accent squares - TOP LEFT */}
            <div className="absolute top-4 left-4 w-12 h-12 z-10">
              <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
              <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-amber-500/30 rounded-tl-md"></div>
              <div className="absolute left-2 top-2 w-4 h-4 bg-gradient-to-bl from-orange-500/30 to-amber-500/5 rounded-tl-sm filter blur-[1px]"></div>
            </div>
            
            {/* Corner accent squares - BOTTOM RIGHT */}
            <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
              <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
              <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
              <div className="absolute right-2 bottom-2 w-4 h-4 bg-gradient-to-tr from-orange-500/30 to-amber-500/5 rounded-br-sm filter blur-[1px]"></div>
            </div>
            
            {/* Corner accent squares - BOTTOM LEFT */}
            <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
              <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
              <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
              <div className="absolute left-2 bottom-2 w-4 h-4 bg-gradient-to-bl from-orange-500/30 to-amber-500/5 rounded-bl-sm filter blur-[1px]"></div>
            </div>
            
            {/* Content container with proper spacing */}
            <div className="relative z-20 px-8 py-12 md:px-12 md:py-16 text-center">            
              {/* Background blur text */}
              <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 pointer-events-none">
                Frequently Asked Questions
              </div>
              
              {/* Main text with premium gradient */}
              <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                text-4xl md:text-5xl font-bold relative z-30 mb-6">
                Frequently Asked Questions
              </h2>
              
              {/* Multiple text shadows for depth - reduced blur effects */}
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 z-10 transform scale-105 pointer-events-none">
                Frequently Asked Questions
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 z-10 pointer-events-none">
                Frequently Asked Questions
              </div>
              
              {/* Subtitle with enhanced styling */}
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed relative z-30 mt-6">
                Find answers to common questions about our protective coating products and services.
              </p>
              
              {/* Decorative accent line */}
              <div className="absolute left-[8%] bottom-6 transform group w-14 h-2.5 rounded-full overflow-hidden z-50 transition-all duration-700 hover:w-72">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 blur-md opacity-70"></div>
                
                {/* Pulsing dots */}
                <div className="absolute h-full w-4 bg-white/80 right-4 rounded-full blur-[1px] animate-pulse-slow"></div>
                <div className="absolute h-full w-3 bg-white/80 right-24 rounded-full blur-[1px] animate-pulse-slow-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              </div>
              
              {/* Premium badge with consistent styling */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex z-50">
                <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)] relative z-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span className="text-sm font-medium">Frequently Asked</span>
                </div>
              </div>
            </div>
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

        {/* Enhanced FAQ Categories Grid with premium styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {faqs.map((category, categoryIdx) => {
            // Theme configuration based on category index
            type ThemeConfig = {
              borderGradient: string;
              textGradient: string;
              iconGradient: string;
              iconShadow: string;
              ambientGlow: string;
              cornerAccent: string;
              questionBorder: string;
              answerGradient: string;
              answerBorder: string;
              hoverAccent: string;
            };
            
            // Define themes as an array instead of an object with numeric keys
            const themes: ThemeConfig[] = [
              { // Fire theme
                borderGradient: "from-orange-500/60 via-red-600/30 to-red-500/60",
                textGradient: "from-orange-400 via-amber-300 to-orange-400",
                iconGradient: "from-amber-400 via-orange-500 to-red-600",
                iconShadow: "0 0 30px rgba(251,113,36,0.7), 0 0 15px rgba(220,38,38,0.5)",
                ambientGlow: "radial-gradient(circle at center, rgba(251,113,36,0.2) 0%, rgba(220,38,38,0.1) 40%, transparent 70%)",
                cornerAccent: "from-orange-500/40 to-red-600/40",
                questionBorder: "from-orange-500/60 via-amber-600/30 to-red-500/60",
                answerGradient: "from-gray-900/90 to-gray-800/90",
                answerBorder: "from-orange-600/40 to-red-600/40",
                hoverAccent: "from-orange-500/30 to-red-500/30"
              },
              { // Blue theme
                borderGradient: "from-blue-500/60 via-cyan-500/30 to-blue-600/60",
                textGradient: "from-blue-400 via-cyan-300 to-blue-400",
                iconGradient: "from-cyan-400 via-blue-500 to-blue-700",
                iconShadow: "0 0 30px rgba(59,130,246,0.7), 0 0 15px rgba(14,165,233,0.5)",
                ambientGlow: "radial-gradient(circle at center, rgba(59,130,246,0.2) 0%, rgba(14,165,233,0.1) 40%, transparent 70%)",
                cornerAccent: "from-blue-500/40 to-cyan-600/40",
                questionBorder: "from-blue-500/60 via-cyan-600/30 to-blue-500/60",
                answerGradient: "from-gray-900/90 to-gray-800/90",
                answerBorder: "from-blue-600/40 to-cyan-600/40",
                hoverAccent: "from-blue-500/30 to-cyan-500/30"
              },
              { // Mixed theme
                borderGradient: "from-orange-500/50 via-transparent to-blue-400/50",
                textGradient: "from-amber-300 via-orange-400 to-blue-400",
                iconGradient: "from-amber-400 via-orange-500 to-blue-600",
                iconShadow: "0 0 30px rgba(251,113,36,0.5), 0 0 30px rgba(59,130,246,0.5)",
                ambientGlow: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)",
                cornerAccent: "from-orange-500/40 to-blue-500/40",
                questionBorder: "from-orange-500/50 via-transparent to-blue-400/50",
                answerGradient: "from-gray-900/90 to-gray-800/90",
                answerBorder: "from-orange-600/30 via-transparent to-blue-600/30",
                hoverAccent: "from-orange-500/20 via-transparent to-blue-500/20"
              }
            ];
            
            // Get theme based on index (safely access array)
            const theme = themes[categoryIdx % 3];
            
            return (
              <div key={categoryIdx} className="group relative transform hover:scale-[1.01] transition-all duration-700">
                {/* Premium Card Container with enhanced styling */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10">
                  {/* Premium dual-layer gradient border effect */}
                  <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${theme.borderGradient} opacity-80`}></div>
                  <div className={`absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none`}></div>
                  
                  {/* Corner accent decorations */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-red-600/40 rounded-tr-xl blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-red-600/40 rounded-bl-xl blur-[2px]"></div>
                  </div>
                  
                  {/* Ambient glow effect */}
                  <div className="absolute inset-0 rounded-xl opacity-30 group-hover:opacity-40 transition-opacity duration-1000" 
                       style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.2) 0%, rgba(220,38,38,0.1) 40%, transparent 70%)" }}>
                  </div>
                  
                  {/* Category Title with enhanced styling */}
                  <div className="mb-8 pb-4 relative">
                    <div className="relative inline-flex items-center mb-2">
                      {/* Premium category icon */}
                      <div className="relative flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-700"></div>
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.iconGradient} opacity-50`}></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {categoryIdx % 3 === 0 ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            ) : categoryIdx % 3 === 1 ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            )}
                          </svg>
                        </div>
                      </div>
                      
                      {/* Enhanced category heading */}
                      <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient}`}>
                        {category.category}
                      </h3>
                    </div>
                    
                    {/* Decorative line with gradient */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600/40 to-transparent"></div>
                  </div>
                  
                  {/* Enhanced Questions List with premium styling */}
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIdx) => {
                      const isOpen = openQuestions[`${categoryIdx}-${questionIdx}`];
                      
                      return (
                        <div key={questionIdx} className="mb-5 relative transform transition-all duration-500">
                          {/* Enhanced Question Box with Premium Styling */}
                          <div className={`relative group/question transform ${isOpen ? 'scale-[1.01]' : ''} transition-all duration-500`}>
                            {/* Premium gradient border effect */}
                            <div className={`absolute -inset-0.5 rounded-lg bg-gradient-to-r from-orange-500/60 via-amber-600/30 to-red-500/60 transition-all duration-500 ${isOpen ? 'opacity-70 blur-[1px]' : 'opacity-50 blur-[0.5px]'}`}></div>
                            
                            <button
                              onClick={() => toggleQuestion(categoryIdx, questionIdx)}
                              className={`relative w-full group bg-black backdrop-blur-sm rounded-lg px-6 py-4 text-left transition-all text-base border-2 border-orange-500/70 hover:shadow-[0_0_15px_rgba(255,106,0,0.4)] flex justify-between items-center overflow-hidden`}
                            >
                              {/* Hover accent effect with orange glow */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                              
                              {/* Corner accent points */}
                              <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* Enhanced question text */}
                              <span className={`pr-8 font-medium ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400' : 'text-gray-200'} transition-colors duration-500`}>
                                {faq.question}
                              </span>
                              
                              {/* Enhanced toggle icon with animation */}
                              <div className={`absolute right-6 transition-all duration-500 ${isOpen ? 'text-white' : 'text-gray-400'}`}>
                                <div className="relative w-6 h-6">
                                  {/* Animated background on active state */}
                                  {isOpen && (
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse"></div>
                                  )}
                                  <svg 
                                    className={`w-6 h-6 transition-transform duration-500 relative z-10 ${isOpen ? 'transform rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                          </div>
                          
                          {/* Enhanced Answer with premium styling and animation */}
                          {isOpen && (
                            <div className="mt-3 overflow-hidden transform transition-all duration-700 opacity-100 max-h-[1000px]">
                              <div className="relative">
                                {/* Premium gradient border effect */}
                                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-orange-600/40 to-red-600/40 opacity-30 blur-[0.5px]"></div>
                                
                                <div className="relative bg-black backdrop-blur-sm rounded-lg p-6 text-gray-300 text-base leading-relaxed border-2 border-orange-500/50 overflow-hidden">
                                  {/* Corner accent points */}
                                  <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-60"></div>
                                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-60"></div>
                                  
                                  {/* Subtle shimmer effect */}
                                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 -translate-x-full animate-shimmer-slow transform"></div>
                                  
                                  {/* Ambient glow that adds depth */}
                                  <div className="absolute -inset-[3px] rounded-lg bg-orange-500/5 blur-md opacity-40" 
                                       style={{ 
                                         boxShadow: 'inset 0 0 15px 0 rgba(251, 113, 36, 0.2)' 
                                       }}>
                                  </div>
                                  
                                  {faq.answer}
                                </div>
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

        {/* Enhanced Contact CTA with premium styling */}
        <div className="text-center mt-20">
          <div className="relative inline-block p-8 bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
            {/* Premium gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/60 via-amber-500/30 to-blue-500/60 opacity-80"></div>
            <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
            
            {/* Enhanced message */}
            <p className="text-xl text-gray-200 mb-6 max-w-xl mx-auto">
              <span className="inline-block relative mr-2">
                <span className="relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                <span className="absolute inset-0 rounded-full bg-orange-500/20 filter blur-[10px] opacity-50"></span>
              </span>
              Still have questions? Our protective coating experts are here to help.
            </p>
            
            {/* Elite enterprise-level button - Black with orange border and glow */}
            <a
              href="#contact"
              className="group relative inline-flex items-center px-8 py-4 rounded-lg bg-black text-white text-lg font-medium transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Premium 2px border with gradient */}
              <div className="absolute inset-0 rounded-lg border-2 border-orange-500 opacity-80"></div>
              
              {/* Enhanced orange glow effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                   style={{ boxShadow: '0 0 20px 3px rgba(251, 113, 36, 0.7), 0 0 10px 1px rgba(251, 113, 36, 0.9)' }}>
              </div>
              
              {/* Inner gradient highlight */}
              <div className="absolute inset-[2px] rounded-[6px] bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-80"></div>
              
              {/* Corner accent lights */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-gradient-to-br from-orange-400 to-transparent rounded-tl-lg opacity-60"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-tl from-orange-400 to-transparent rounded-br-lg opacity-60"></div>
              
              {/* Random reflection effect 1 - Diagonal slash */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                   style={{
                     clipPath: 'polygon(0 0, 30% 0, 20% 100%, 0% 100%)',
                     transform: 'translateX(-100%)',
                     animation: 'slideRightDiagonal 3.7s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                     animationPlayState: 'paused'
                   }}
                   onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                   onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
              </div>
              
              {/* Random reflection effect 2 - Vertical band */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                   style={{
                     clipPath: 'polygon(65% 100%, 85% 100%, 80% 0%, 70% 0%)',
                     transform: 'translateY(100%)',
                     animation: 'slideUp 2.9s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                     animationDelay: '0.3s',
                     animationPlayState: 'paused'
                   }}
                   onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                   onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
              </div>
              
              {/* Random reflection effect 3 - Horizontal sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                   style={{
                     clipPath: 'polygon(0 40%, 100% 35%, 100% 65%, 0 60%)',
                     transform: 'translateX(-100%)',
                     animation: 'slideRight 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                     animationDelay: '0.7s',
                     animationPlayState: 'paused'
                   }}
                   onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                   onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
              </div>
              
              {/* Button text with icon */}
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                </svg>
                Contact Our Experts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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