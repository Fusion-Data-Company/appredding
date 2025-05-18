import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { GradientButton } from '@/components/ui/gradient-button';
import { ChevronLeft, ChevronRight, X, ArrowRight, Shield, Building, Flame, Ship, Droplets, Home, Landmark } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from 'wouter';

type Slide = {
  id: number;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

const PitchDeckSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const totalSlides = slides.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  // Auto-rotate through slides
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      }
    }, 12000); // Change slide every 12 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, currentSlide, totalSlides]);

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleIndustrySelect = (value: string) => {
    setSelectedIndustry(value);
    
    // Add a slight delay before navigating to make animation smoother
    setTimeout(() => {
      setIsOpen(false);
      
      // Navigate to the appropriate industry page after closing
      setTimeout(() => {
        switch(value) {
          case "fire-prevention":
            setLocation("/fire-prevention");
            break;
          case "marinas":
            setLocation("/marinas");
            break;
          case "pools":
            setLocation("/pools");
            break;
          case "construction":
            setLocation("/construction");
            break;
          case "mobile-home":
            setLocation("/mobile-home");
            break;
          case "municipality":
            setLocation("/municipality");
            break;
          default:
            setLocation("/contact");
        }
      }, 500);
    }, 300);
  };

  const togglePitchDeck = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentSlide(0);
    }
  };

  return (
    <>
      {/* Trigger button fixed at bottom left - styled to match premium enterprise theme */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="fixed bottom-6 left-6 z-[1000]"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Premium styled button with layered effects */}
            <div className="group relative">
              {/* Ambient blue-to-orange gradient glow effect behind button */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
              
              {/* Button with premium styling */}
              <GradientButton 
                onClick={togglePitchDeck}
                className="relative bg-black rounded-full py-3 px-6 z-10 border border-gray-800 overflow-hidden group-hover:shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all duration-500 flex items-center gap-3 intro-button-shimmer transform group-hover:scale-105"
                variant="default"
                size="lg"
              >
                {/* Inner subtle animated glow */}
                <div className="absolute inset-0 opacity-30 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjI1KSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                </div>
                
                {/* Corner accent lines - using dark theme */}
                <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] border-gray-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-gray-500/50 rounded-full blur-[1px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-5 h-5 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] border-gray-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gray-500/50 rounded-full blur-[1px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] border-gray-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-gray-500/50 rounded-full blur-[1px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] border-gray-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gray-500/50 rounded-full blur-[1px]"></div>
                </div>
                
                {/* Icon with premium styling */}
                <div className="relative mr-1 z-10 group/icon">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden">
                    {/* Icon background with gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/30 via-gray-600/30 to-gray-600/30 opacity-80"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black"></div>
                    
                    {/* Subtle gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-400/10 rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Icon with premium styling */}
                    <Shield className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-1000 animate-pulse-slow-delayed relative z-10" />
                    
                    {/* Add subtle animated ripple effect */}
                    <div className="absolute inset-0 rounded-full border border-gray-500/20 scale-0 group-hover:scale-[1.2] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -inset-1 rounded-full border border-gray-500/20 scale-0 group-hover:scale-[1.4] opacity-0 group-hover:opacity-70 transition-all duration-1000 delay-100"></div>
                  </div>
                </div>
                
                {/* Text with premium styling and gradient effect */}
                <span className="relative z-10">
                  <span className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent text-lg font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    Introduction
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
                </span>
                
                {/* Animated arrow with enhanced styling */}
                <ArrowRight className="w-5 h-5 ml-1 text-gray-300 relative z-10 group-hover:translate-x-1 transition-all duration-500 group-hover:text-white" />
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The pitch deck slider */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePitchDeck}
            />

            {/* Main pitch deck container */}
            <motion.div
              className="fixed bottom-0 left-0 w-full lg:w-3/4 xl:w-2/3 max-h-[90vh] bg-gradient-to-br from-gray-900 to-black z-[999] rounded-t-xl border-0 premium-gradient-border overflow-hidden"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              ref={sliderRef}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-500 mr-3" />
                  <GradientHeading level={3} className="text-xl" variant="blue">
                    PRAETORIAN SMART-COAT
                  </GradientHeading>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={togglePitchDeck}
                  className="rounded-full text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Slide content */}
              <div className="relative overflow-hidden" style={{ minHeight: '600px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="py-12 px-6 lg:px-12"
                  >
                    {/* Slide indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {slides[currentSlide].icon || <Shield className="w-6 h-6 text-blue-500 mr-2" />}
                        <h3 className="text-blue-500 font-bold text-lg">
                          {slides[currentSlide].title}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-400">
                        Slide {currentSlide + 1} of {totalSlides}
                      </div>
                    </div>

                    {/* Current slide content */}
                    <div className="prose prose-invert max-w-none mb-8">
                      {slides[currentSlide].content}
                    </div>

                    {/* Industry selector appears on the last slide */}
                    {currentSlide === totalSlides - 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-lg p-6 border-0 premium-gradient-border shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                      >
                        <h4 className="text-white font-semibold mb-4 text-center">What industry are you interested in?</h4>
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                          <Select value={selectedIndustry} onValueChange={handleIndustrySelect}>
                            <SelectTrigger className="w-full md:w-[300px] bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 text-white focus:ring-blue-500 h-12">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white">
                              <SelectItem value="fire-prevention" className="focus:bg-gray-800 focus:text-blue-400">
                                <div className="flex items-center">
                                  <Flame className="w-4 h-4 mr-2 text-blue-500" />
                                  Fire Prevention
                                </div>
                              </SelectItem>
                              <SelectItem value="marinas" className="focus:bg-gray-800 focus:text-blue-400">
                                <div className="flex items-center">
                                  <Ship className="w-4 h-4 mr-2 text-blue-500" />
                                  Marinas
                                </div>
                              </SelectItem>
                              <SelectItem value="pools" className="focus:bg-gray-800 focus:text-blue-400">
                                <div className="flex items-center">
                                  <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                                  Pools
                                </div>
                              </SelectItem>
                              <SelectItem value="construction" className="focus:bg-gray-800 focus:text-blue-400">
                                <div className="flex items-center">
                                  <Building className="w-4 h-4 mr-2 text-blue-500" />
                                  Construction
                                </div>
                              </SelectItem>
                              <SelectItem value="mobile-home" className="focus:bg-gray-800 focus:text-blue-400">
                                <div className="flex items-center">
                                  <Home className="w-4 h-4 mr-2 text-blue-500" />
                                  Mobile Home
                                </div>
                              </SelectItem>
                              <SelectItem value="municipality" className="focus:bg-gray-800 focus:text-blue-400">
                                <div className="flex items-center">
                                  <Landmark className="w-4 h-4 mr-2 text-blue-500" />
                                  Municipality
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <div className="relative inline-block">
                            {/* Ambient blue-to-orange gradient glow effect behind button */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                            <GradientButton 
                              onClick={() => selectedIndustry && handleIndustrySelect(selectedIndustry)}
                              disabled={!selectedIndustry}
                              className="relative min-w-[150px] bg-black border border-gray-700"
                              variant="default"
                            >
                              Continue
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </GradientButton>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation controls */}
                <div className="absolute bottom-4 right-6 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevSlide}
                    disabled={currentSlide === 0}
                    className="rounded-full border-gray-600 bg-black/30 backdrop-blur-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className="rounded-full border-gray-600 bg-black/30 backdrop-blur-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-gray-600"
                    initial={{ width: `${(currentSlide / (totalSlides - 1)) * 100}%` }}
                    animate={{ width: `${(currentSlide / (totalSlides - 1)) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Slide content
const slides: Slide[] = [
  {
    id: 1,
    title: "Opening the Gates",
    icon: <Shield className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <div className="text-xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4 py-1">
          "For decades, this elite ceramic paint formula has been used in government, military, and infrastructure projects. It was never built for shelves. Until now."
        </div>
        
        <ul className="space-y-3 list-disc pl-6 text-gray-300">
          <li>Praetorian Smart-Coat was formerly known as Son-Shield — a private-label ceramic coating tested, evaluated, and fielded in environments where failure isn't an option.</li>
          <li>After years of exclusive use by engineering and procurement departments from top-tier public institutions and international projects, this classified-grade protection is now available directly to you.</li>
          <li>It's not sold in hardware chains. They won't stock it. As a national distributor told us:</li>
        </ul>
        
        <div className="mt-4 p-4 bg-black/40 border-l-4 border-blue-600 italic text-blue-100">
          "Paints that never fail? That's bad for business."
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: "Meet the Team",
    icon: <Building className="w-6 h-6 text-blue-500 mr-2" />,
    content: (
      <>
        <p className="text-gray-300 mb-6">You're not dealing with layers of corporate tape. You're getting product from the lab to the loading dock.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 p-4 rounded-lg border border-gray-800 hover:border-blue-600 transition-all flex flex-col">
            <h4 className="text-blue-500 font-bold">Joe Raver</h4>
            <p className="text-white mb-2">Inventor & Owner of the Formula</p>
            <p className="text-gray-400 mt-auto">
              <a href="mailto:Joe@praetoriansmartcoat.com" className="text-blue-400 hover:underline">
                Joe@praetoriansmartcoat.com
              </a>
            </p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-gray-800 hover:border-blue-600 transition-all flex flex-col">
            <h4 className="text-blue-500 font-bold">Greg Tomsik</h4>
            <p className="text-white mb-2">Inventory & Fulfillment Manager</p>
            <p className="text-gray-400 mt-auto">
              <a href="mailto:Greg@praetoriansmartcoat.com" className="text-blue-400 hover:underline">
                Greg@praetoriansmartcoat.com
              </a>
            </p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-gray-800 hover:border-blue-600 transition-all flex flex-col">
            <h4 className="text-blue-500 font-bold">Rob Yeager</h4>
            <p className="text-white mb-2">Chief of Marketing, Sales & Distribution</p>
            <p className="text-gray-400 mt-auto">
              <a href="mailto:Rob@praetoriansmartcoat.com" className="text-blue-400 hover:underline">
                Rob@praetoriansmartcoat.com
              </a>
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: "The Legacy — 20+ Years of Silent Service",
    icon: <Shield className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <p className="text-gray-300 mb-6">This coating has protected bridges in Korea, facilities in Japan, homes in wildfire zones, and military assets in the American Southwest.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <h4 className="text-white font-bold">Bridges</h4>
              <p className="text-gray-300">13+ years no repainting, salt water and vibration tested</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h4 className="text-white font-bold">Military</h4>
              <p className="text-gray-300">Infrared-blocking stealth tests passed</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h4 className="text-white font-bold">Poultry</h4>
              <p className="text-gray-300">Reduced mortality by 75%, attic heat drop of 30°F</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h4 className="text-white font-bold">Desert Structures</h4>
              <p className="text-gray-300">Uncoated metal 180°F+, coated interior 85°F with no A/C</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h4 className="text-white font-bold">Fire Events</h4>
              <p className="text-gray-300">Mobile home coated withstood a wildfire, while homes next door burned</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 4,
    title: "Why You've Never Heard of It",
    icon: <Shield className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 mt-1">
              <span className="text-white font-bold text-xs">1</span>
            </div>
            <div>
              <p className="text-gray-300">Engineered for institutional buying, not shelves or influencers</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 mt-1">
              <span className="text-white font-bold text-xs">2</span>
            </div>
            <div>
              <p className="text-gray-300">Outperformed the business model of major retailers (paint that lasts decades)</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 mt-1">
              <span className="text-white font-bold text-xs">3</span>
            </div>
            <div>
              <p className="text-gray-300">Never mass-marketed — used by the kind of organizations that test before they buy</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center mr-3 mt-1">
              <span className="text-white font-bold text-xs">4</span>
            </div>
            <div>
              <p className="text-gray-300">Distribution was managed through government bidding, direct supply agreements, and infrastructure contracts</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center mr-3 mt-1">
              <span className="text-white font-bold text-xs">5</span>
            </div>
            <div>
              <p className="text-gray-300">Now ready for: homes, contractors, builders, fire zones, ranchers, solar operators</p>
            </div>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    title: "Performance Specs",
    icon: <Shield className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-lg border border-gray-800 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-amber-500 flex items-center justify-center mr-3">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-amber-400 font-bold">Class A Fire Rated</h4>
            </div>
            <p className="text-gray-300">ASTM E84 – 0/0 spread & smoke</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-lg border border-gray-800 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              </div>
              <h4 className="text-amber-400 font-bold">Solar Reflection</h4>
            </div>
            <p className="text-gray-300">Reflects 89-95% solar radiation – CRRC verified</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-lg border border-gray-800 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-amber-600 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-blue-400 font-bold">Thermal Emittance</h4>
            </div>
            <p className="text-gray-300">89% – keeps surfaces cool</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-lg border border-gray-800 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-blue-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h4 className="text-blue-400 font-bold">Acoustic Dampening</h4>
            </div>
            <p className="text-gray-300">50%+ sound reduction</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-lg border border-gray-800 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-blue-400 font-bold">Durability</h4>
            </div>
            <p className="text-gray-300">10–30 years – with real-world visual proof</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-lg border border-gray-800 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h4 className="text-blue-400 font-bold">Resistance</h4>
            </div>
            <p className="text-gray-300">Resists salt, UV, corrosion, mold, and cracking</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 6,
    title: "Strategic Rollout",
    icon: <Building className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h4 className="text-amber-400 font-bold mb-4">Product Lines</h4>
            <ul className="space-y-3 list-disc pl-5 text-gray-300">
              <li>5-gallon professional-grade pails</li>
              <li>1-gallon consumer touch-up kits</li>
              <li>Specialized packages for:
                <ul className="pl-6 mt-2 space-y-1 list-circle">
                  <li>Pool deck cooling</li>
                  <li>Wildfire perimeter defense</li>
                  <li>Roof & HVAC energy reduction</li>
                  <li>Marine & dock protection</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div className="flex-1">
            <h4 className="text-amber-400 font-bold mb-4">Sales Channels</h4>
            <ul className="space-y-3 list-disc pl-5 text-gray-300">
              <li>Direct-to-contractor</li>
              <li>National wildfire and preparedness networks</li>
              <li>Private label opportunities</li>
              <li>Franchise/retail dealership onboarding</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 7,
    title: "What Makes This Different",
    icon: <Shield className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 shadow-lg flex items-start">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Thinner than a credit card</h4>
              <p className="text-gray-300">Outperforms traditional insulation despite minimal thickness</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 shadow-lg flex items-start">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Applied like paint, performs like armor</h4>
              <p className="text-gray-300">Ceramic microsphere technology creates a complete thermal barrier</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 shadow-lg flex items-start">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Eliminates need for multiple products</h4>
              <p className="text-gray-300">Replaces insulation, fire barrier, roof sealant, and reflective coating</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 shadow-lg flex items-start">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Professional Endorsements</h4>
              <p className="text-gray-300">Endorsed by engineers, fire professionals, and military evaluators</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 8,
    title: "Get In Now — Early Market Advantage",
    icon: <Building className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <p className="text-gray-300 mb-6">Join the revolution in protective coatings and secure your early market advantage.</p>
        
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-lg p-6 border border-amber-600/30 shadow-[0_0_15px_rgba(251,113,36,0.25)]">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-amber-500 mr-3" />
            <h4 className="text-white font-bold text-xl">Be First to Market</h4>
          </div>
          
          <ul className="space-y-3 pl-5 list-disc text-gray-300">
            <li>Be first to stock, apply, or install the Praetorian Smart-Coat system</li>
            <li>Regional licensing & wholesale available</li>
            <li>Agencies, prepper networks, roofing companies, contractors — this product changes the rules</li>
          </ul>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-amber-400 font-semibold text-center italic">
              "The paint industry doesn't want you to know coatings like this exist. So we're bringing it to the people ourselves."
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white font-bold text-xl mb-2">Welcome to Praetorian</p>
          <p className="text-amber-500 text-lg">No recoat. No nonsense. Just results.</p>
        </div>
      </>
    ),
  },
  {
    id: 9,
    title: "Select Your Industry",
    icon: <Building className="w-6 h-6 text-amber-500 mr-2" />,
    content: (
      <>
        <p className="text-gray-300 mb-6">Now that you've seen what Praetorian Smart-Coat is capable of, tell us which industry you're interested in so we can show you the specific applications and benefits for your needs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-950/40 to-red-950/40 p-4 rounded-lg border border-amber-700/30 flex flex-col items-center">
            <Flame className="w-8 h-8 text-red-500 mb-2" />
            <h4 className="text-amber-400 font-bold mb-1">Fire Prevention</h4>
            <p className="text-gray-300 text-sm text-center">Protect your property from wildfires with advanced thermal barriers</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-950/40 to-amber-950/40 p-4 rounded-lg border border-orange-700/30 flex flex-col items-center">
            <Ship className="w-8 h-8 text-blue-500 mb-2" />
            <h4 className="text-blue-400 font-bold mb-1">Marinas</h4>
            <p className="text-gray-300 text-sm text-center">Superior protection against salt water, UV damage, and marine conditions</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 p-4 rounded-lg border border-cyan-700/30 flex flex-col items-center">
            <Droplets className="w-8 h-8 text-cyan-500 mb-2" />
            <h4 className="text-cyan-400 font-bold mb-1">Pools</h4>
            <p className="text-gray-300 text-sm text-center">Cool deck surfaces and protect pool areas from damage</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-950/40 to-amber-950/40 p-4 rounded-lg border border-yellow-700/30 flex flex-col items-center">
            <Building className="w-8 h-8 text-yellow-500 mb-2" />
            <h4 className="text-yellow-400 font-bold mb-1">Construction</h4>
            <p className="text-gray-300 text-sm text-center">Enhance building performance and durability with advanced coating technology</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 p-4 rounded-lg border border-green-700/30 flex flex-col items-center">
            <Home className="w-8 h-8 text-green-500 mb-2" />
            <h4 className="text-green-400 font-bold mb-1">Mobile Home</h4>
            <p className="text-gray-300 text-sm text-center">Energy efficiency and weather protection for manufactured housing</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-950/40 to-orange-900/40 p-4 rounded-lg border border-amber-700/30 flex flex-col items-center">
            <Landmark className="w-8 h-8 text-amber-500 mb-2" />
            <h4 className="text-amber-400 font-bold mb-1">Municipality</h4>
            <p className="text-gray-300 text-sm text-center">Infrastructure protection and energy savings for public facilities</p>
          </div>
        </div>
      </>
    ),
  },
];

export default PitchDeckSlider;