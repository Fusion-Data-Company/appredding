import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, ChevronRight, ChevronLeft, Mail, Phone, MessageSquare, Shield, Flame, Droplets, Zap, Building, Lightbulb, Activity } from 'lucide-react';
import PitchDeckSlide from './PitchDeckSlide';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const totalSlides = 7; // 6 content slides + 1 contact form

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setSlideDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setSlideDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Close the modal after submission
    onClose();
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="bg-gradient-to-br from-primary-950/95 to-blue-950/95 rounded-xl border border-blue-500/30 shadow-xl w-full max-w-4xl relative overflow-hidden">
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-20"
                onClick={onClose}
              >
                <XCircle className="h-6 w-6" />
              </button>
              
              {/* Navigation buttons */}
              {currentSlide > 0 && (
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-900/70 hover:bg-blue-800/90 text-white rounded-full p-2 z-20"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              
              {currentSlide < totalSlides - 1 && (
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-900/70 hover:bg-blue-800/90 text-white rounded-full p-2 z-20"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
              
              {/* Content area */}
              <div className="relative h-[875px] overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection}>
                  {/* Slide 1: Challenges & Solution Overview */}
                  <PitchDeckSlide 
                    title="Challenges & Solution Overview" 
                    current={currentSlide === 0}
                    index={0}
                    totalSlides={totalSlides}
                    icon={<Shield className="h-6 w-6 text-blue-300" />}
                    key="slide-0"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-xl font-bold text-red-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(248,113,113,0.4)]">
                          <div className="bg-red-900/30 p-1.5 rounded-lg shadow-inner">
                            <Flame className="h-5 w-5 text-red-400" />
                          </div>
                          Infrastructure at Risk
                        </h3>
                        <ul className="space-y-4">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Bridges, buildings, and critical assets face extreme heat, fire hazards, corrosion, and wear</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Traditional paints and coatings fail under high temperatures or harsh weather</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Structural damage and high maintenance costs result from inadequate protection</span>
                          </li>
                        </ul>
                        
                        <div className="mt-4 pt-4 border-t border-blue-700/30">
                          <div className="text-gray-300 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-red-400" />
                            <span className="text-sm">Traditional solutions provide incomplete protection</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(96,165,250,0.4)]">
                          <div className="bg-blue-900/30 p-1.5 rounded-lg shadow-inner">
                            <Shield className="h-5 w-5 text-blue-400" />
                          </div>
                          Our Solution
                        </h3>
                        <div className="space-y-4">
                          <p className="text-white font-bold text-lg">Praetorian Smart-Coat</p>
                          <ul className="space-y-4">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Ceramic-based smart coating that addresses these challenges head-on</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Recently rebranded from the proven Son-Shield formula</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Military-grade protection against fire, heat, and degradation</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Creates a defensive shield on any surface – keeping the heat out, the fire away, and the rust at bay</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-950/70 via-blue-900/40 to-blue-950/70 rounded-xl border border-blue-400/40 text-center shadow-[0_0_25px_rgba(29,78,216,0.15)]"
                      style={{
                        boxShadow: "0 5px 20px rgba(3, 7, 18, 0.5), 0 0 10px rgba(37, 99, 235, 0.2) inset"
                      }}
                    >
                      <p className="text-xl font-semibold text-blue-300 drop-shadow-[0_0_4px_rgba(147,197,253,0.5)]">
                        Next-generation protection for your most critical assets
                      </p>
                    </div>
                  </PitchDeckSlide>
                  
                  {/* Slide 2: What is Praetorian Smart-Coat? */}
                  <PitchDeckSlide 
                    title="What is Praetorian Smart-Coat?" 
                    current={currentSlide === 1}
                    index={1}
                    totalSlides={totalSlides}
                    icon={<Shield className="h-6 w-6 text-blue-300" />}
                    key="slide-1"
                  >
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-blue-300 mb-3 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)]">
                          High-Performance Ceramic Coating
                        </h3>
                        <p className="text-white">
                          A patented water-based coating filled with microscopic hollow ceramic beads for superior insulation. Appears like paint, but acts like an armored layer.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-blue-300 mb-3 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)]">
                          Rebranding Legacy
                        </h3>
                        <p className="text-white">
                          Formerly known as Son-Shield, this coating has been reimagined as Praetorian Smart-Coat to emphasize its role in safeguarding critical infrastructure. Same trusted formulation – now with an elevated mission and brand.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                          style={{
                            boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                          }}
                        >
                          <h3 className="text-lg font-bold text-blue-300 mb-3 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)]">
                            Key Properties
                          </h3>
                          <ul className="space-y-2">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Elastic, breathable membrane</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Adheres to metal, concrete, wood, fabric</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Flexible (won't crack)</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Eco-friendly (low-VOC, water cleanup)</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                          style={{
                            boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                          }}
                        >
                          <h3 className="text-lg font-bold text-blue-300 mb-3 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)]">
                            Industrial-Military Aesthetic
                          </h3>
                          <ul className="space-y-2">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Named "Praetorian" for a reason</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Ultimate guard for your assets</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>No-nonsense industrial look</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Field-tested resilience</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </PitchDeckSlide>
                  
                  {/* Slide 3: Core Capabilities & Benefits */}
                  <PitchDeckSlide 
                    title="Core Capabilities & Benefits" 
                    current={currentSlide === 2}
                    index={2}
                    totalSlides={totalSlides}
                    icon={<Activity className="h-6 w-6 text-blue-300" />}
                    key="slide-2"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-red-900/40 to-red-950/50 backdrop-blur-sm rounded-xl border border-red-500/30 p-5 shadow-[0_0_20px_rgba(220,38,38,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(239, 68, 68, 0.15) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(248,113,113,0.4)]">
                          <div className="bg-red-900/30 p-1.5 rounded-lg shadow-inner">
                            <Flame className="h-5 w-5 text-red-400" />
                          </div>
                          Fire Suppression
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Rated Class A for flame spread (zero flame propagation)</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>No fuel or smoke contribution in a fire</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Effectively smothers flame spread on surfaces</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Withstood direct 2700°F torch fire for 20 minutes</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)]">
                          <div className="bg-blue-900/30 p-1.5 rounded-lg shadow-inner">
                            <Zap className="h-5 w-5 text-blue-400" />
                          </div>
                          Thermal Insulation
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Outstanding heat barrier – blocks radiant heat</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Slows conduction dramatically</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Metal surfaces become cool to the touch</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Lowers interior temps, cuts HVAC costs</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)]">
                          <div className="bg-blue-900/30 p-1.5 rounded-lg shadow-inner">
                            <Droplets className="h-5 w-5 text-blue-400" />
                          </div>
                          Waterproof & Anti-Corrosion
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Forms a seamless waterproof seal</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Prevents water ingress and rust on steel</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Proven on bridge beams – significantly less corrosion</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Ideal for roofs and tanks – no leaks</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/50 backdrop-blur-sm rounded-xl border border-purple-500/30 p-5 shadow-[0_0_20px_rgba(147,51,234,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(168, 85, 247, 0.2) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(216,180,254,0.4)]">
                          <div className="bg-purple-900/30 p-1.5 rounded-lg shadow-inner">
                            <Zap className="h-5 w-5 text-purple-400" />
                          </div>
                          Electrical Insulation
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-purple-400 text-lg leading-6">•</span>
                            <span>Non-conductive ceramic layer insulates against electricity</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-purple-400 text-lg leading-6">•</span>
                            <span>Helps safeguard structures from lightning</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-purple-400 text-lg leading-6">•</span>
                            <span>Blocks heat radiation and reduces thermal signatures</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-purple-400 text-lg leading-6">•</span>
                            <span>"Stealth" benefit in defense applications</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-5 bg-gradient-to-br from-green-900/40 to-green-950/50 backdrop-blur-sm rounded-xl border border-green-500/30 p-5 shadow-[0_0_20px_rgba(34,197,94,0.15)]" 
                      style={{
                        boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(74, 222, 128, 0.2) inset"
                      }}
                    >
                      <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2 drop-shadow-[0_0_4px_rgba(134,239,172,0.4)]">
                        <div className="bg-green-900/30 p-1.5 rounded-lg shadow-inner">
                          <Activity className="h-5 w-5 text-green-400" />
                        </div>
                        Flexibility & Durability
                      </h3>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <li className="text-white flex items-start gap-2">
                          <span className="text-green-400 text-lg leading-6">•</span>
                          <span>Elastic coating that expands/contracts with substrate</span>
                        </li>
                        <li className="text-white flex items-start gap-2">
                          <span className="text-green-400 text-lg leading-6">•</span>
                          <span>No cracking or peeling</span>
                        </li>
                        <li className="text-white flex items-start gap-2">
                          <span className="text-green-400 text-lg leading-6">•</span>
                          <span>Withstands structural movement and vibrations</span>
                        </li>
                        <li className="text-white flex items-start gap-2">
                          <span className="text-green-400 text-lg leading-6">•</span>
                          <span>Long-lasting – 10+ years with no recoat needed</span>
                        </li>
                      </ul>
                    </div>
                  </PitchDeckSlide>
                  
                  {/* Slide 4: Technical Validation & Compliance */}
                  <PitchDeckSlide 
                    title="Technical Validation & Compliance" 
                    current={currentSlide === 3}
                    index={3}
                    totalSlides={totalSlides}
                    icon={<Shield className="h-6 w-6 text-blue-300" />}
                    key="slide-3"
                  >
                    <div className="space-y-5">
                      <div className="bg-gradient-to-br from-red-900/40 to-red-950/50 backdrop-blur-sm rounded-xl border border-red-500/30 p-5 shadow-[0_0_20px_rgba(220,38,38,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(239, 68, 68, 0.15) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-red-300 mb-3 drop-shadow-[0_0_4px_rgba(248,113,113,0.4)] flex items-center gap-2">
                          <div className="bg-red-900/30 p-1.5 rounded-lg shadow-inner">
                            <Flame className="h-5 w-5 text-red-400" />
                          </div>
                          Certified Fire Performance
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Class A rating in ASTM E84 tests (Flame Spread 0; Smoke 0)</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Far exceeds building code requirements (only ~7% of allowed smoke produced)</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>UL 94 V-0, UL 94 5VA compliant (self-extinguishing, no dripping)</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>ASTM D6413 and ISO 14116 flame spread standards compliant</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                          style={{
                            boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                          }}
                        >
                          <h3 className="text-lg font-bold text-blue-300 mb-3 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)] flex items-center gap-2">
                            <div className="bg-blue-900/30 p-1.5 rounded-lg shadow-inner">
                              <Zap className="h-5 w-5 text-blue-400" />
                            </div>
                            Thermal & Electrical Tests
                          </h3>
                          <ul className="space-y-2">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>U.S. Army field-tested – eliminated thermal IR detection</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Reduced radar signature</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Zero electrical conduction through coated layer</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-900/40 to-green-950/50 backdrop-blur-sm rounded-xl border border-green-500/30 p-5 shadow-[0_0_20px_rgba(34,197,94,0.15)]" 
                          style={{
                            boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(74, 222, 128, 0.2) inset"
                          }}
                        >
                          <h3 className="text-lg font-bold text-green-300 mb-3 drop-shadow-[0_0_4px_rgba(134,239,172,0.4)] flex items-center gap-2">
                            <div className="bg-green-900/30 p-1.5 rounded-lg shadow-inner">
                              <Activity className="h-5 w-5 text-green-400" />
                            </div>
                            Weathering & Endurance
                          </h3>
                          <ul className="space-y-2">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-green-400 text-lg leading-6">•</span>
                              <span>Exceptional longevity under intense UV and heat</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-green-400 text-lg leading-6">•</span>
                              <span>Maintained integrity in 110°F heat for years</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-green-400 text-lg leading-6">•</span>
                              <span>Fire resistance intact after abrasion and washing</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-[0_0_20px_rgba(29,78,216,0.15)]" 
                        style={{
                          boxShadow: "0 5px 15px rgba(3, 7, 18, 0.5), 0 0 5px rgba(59, 130, 246, 0.2) inset"
                        }}
                      >
                        <h3 className="text-lg font-bold text-blue-300 mb-3 drop-shadow-[0_0_4px_rgba(147,197,253,0.4)] flex items-center gap-2">
                          <div className="bg-blue-900/30 p-1.5 rounded-lg shadow-inner">
                            <Shield className="h-5 w-5 text-blue-400" />
                          </div>
                          Environmental Safety
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="space-y-2">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Water-based formula, low VOC</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Meets environmental regulations</span>
                            </li>
                          </ul>
                          <ul className="space-y-2">
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>No toxic smoke or off-gassing in fires</span>
                            </li>
                            <li className="text-white flex items-start gap-2">
                              <span className="text-blue-400 text-lg leading-6">•</span>
                              <span>Safe for occupied facilities</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </PitchDeckSlide>
                  
                  {/* Slide 5: Key Use Cases */}
                  <PitchDeckSlide 
                    title="Key Use Cases" 
                    current={currentSlide === 4}
                    index={4}
                    totalSlides={totalSlides}
                    icon={<Building className="h-6 w-6 text-blue-300" />}
                    key="slide-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-400" />
                          Bridges & Infrastructure
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Coat steel bridges, overpasses, and highway structures</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Prevents rust and decay</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Extends repaint cycles significantly</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Lightning-insulating shield for tall structures</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-400" />
                          Commercial Buildings
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Apply on exteriors and roofs for "cool roof" effect</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Cuts AC usage in summer dramatically</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Comfortable indoor temps without AC even at 110°F</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Meets safety codes and efficiency targets</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-400" />
                          Industrial & Energy Facilities
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Oil & gas tanks, power plant equipment</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Battery storage enclosures</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Passive fire protection, thermal control</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Contains lithium battery fires</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 backdrop-blur-sm rounded-xl border border-red-500/30 p-5">
                        <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
                          <Flame className="h-5 w-5 text-red-400" />
                          Wildfire Defense
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Spray on homes in wildfire-prone areas</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Makes wood and siding virtually fireproof</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Protects against flying embers and brush fires</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Ideal for wildfire prevention programs</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-400" />
                          Defense & Military
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Forward-operating bases, fuel depots, vehicles</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Reduces heat signatures (thermal camouflage)</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-blue-400 text-lg leading-6">•</span>
                            <span>Fire/impact resistance for critical structures</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 backdrop-blur-sm rounded-xl border border-green-500/30 p-5">
                        <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-green-400" />
                          Agriculture
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-white flex items-start gap-2">
                            <span className="text-green-400 text-lg leading-6">•</span>
                            <span>Reduces poultry mortality by 75%</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-green-400 text-lg leading-6">•</span>
                            <span>30°F attic temperature reduction</span>
                          </li>
                          <li className="text-white flex items-start gap-2">
                            <span className="text-green-400 text-lg leading-6">•</span>
                            <span>Extends insulation lifespan by 4X</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </PitchDeckSlide>
                  
                  {/* Slide 6: The Praetorian Advantage */}
                  <PitchDeckSlide 
                    title="The Praetorian Advantage" 
                    current={currentSlide === 5}
                    index={5}
                    totalSlides={totalSlides}
                    icon={<Shield className="h-6 w-6 text-blue-300" />}
                    key="slide-5"
                    titleColor="bg-gradient-to-r from-blue-300 via-white to-orange-300"
                  >
                    <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 mb-5">
                      <h3 className="text-center text-xl font-bold text-white mb-3">
                        "Guarding What Matters"
                      </h3>
                      <p className="text-center text-blue-200 italic">
                        The next generation of building armor
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                        <h3 className="text-lg font-bold text-blue-300 mb-2">
                          Same Trusted Shield, New Mission
                        </h3>
                        <p className="text-white text-sm">
                          Praetorian Smart-Coat is the rebranded Son-Shield – carrying forward a legacy of protection into new arenas. You get the exact same proven chemistry trusted on bridges and buildings worldwide, now under a brand that reflects its protective prowess.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                        <h3 className="text-lg font-bold text-blue-300 mb-2">
                          Holistic Protection
                        </h3>
                        <p className="text-white text-sm">
                          It's not just paint, it's a multi-functional armor for your assets – fire retardant, insulator, weatherproof barrier, and force multiplier for durability. One product addresses multiple failure points (fire, heat, moisture, corrosion), simplifying your asset protection strategy.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                          <h3 className="text-lg font-bold text-blue-300 mb-2">
                            Strategic Value
                          </h3>
                          <p className="text-white text-sm">
                            For C-level and government decision-makers, Praetorian Smart-Coat offers high ROI through extended asset life, reduced energy costs, and improved safety compliance. Hardening critical infrastructure against disasters, avoiding catastrophic losses and downtime.
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5">
                          <h3 className="text-lg font-bold text-blue-300 mb-2">
                            Proven & Ready
                          </h3>
                          <p className="text-white text-sm">
                            Backed by real-world case studies and stringent testing, Praetorian Smart-Coat is ready for deployment in your most demanding projects. This smart coating has the credentials and pedigree to perform when it counts.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-5 bg-gradient-to-r from-blue-950/50 to-blue-900/20 rounded-xl border border-blue-500/30 text-center">
                      <h3 className="text-xl font-bold text-blue-300 mb-2">
                        Join the Mission
                      </h3>
                      <p className="text-white">
                        By choosing Praetorian Smart-Coat, you're equipping your organization with cutting-edge defensive technology – effectively putting a Praetorian guard on duty to watch over your investments. Secure your assets with the ceramic shield that's battle-tested and built for the future.
                      </p>
                    </div>
                  </PitchDeckSlide>
                  
                  {/* Slide 7: Contact Form */}
                  <PitchDeckSlide 
                    title="Request More Information" 
                    current={currentSlide === 6}
                    index={6}
                    totalSlides={totalSlides}
                    icon={<Mail className="h-6 w-6 text-blue-300" />}
                    key="slide-6"
                  >
                    <div className="max-w-lg mx-auto">
                      <p className="text-white text-center mb-6">
                        Interested in learning more about how Praetorian Smart-Coat can protect your assets? Fill out the form below and our team will contact you with detailed information.
                      </p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-blue-400" />
                            <label className="text-blue-300 font-medium">Your Name (Required)</label>
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-blue-950/70 border border-blue-500/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-blue-400" />
                            <label className="text-blue-300 font-medium">Email Address (Required)</label>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-blue-950/70 border border-blue-500/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Enter your email address"
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="h-4 w-4 text-blue-400" />
                            <label className="text-blue-300 font-medium">Phone Number (Optional)</label>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-blue-950/70 border border-blue-500/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-blue-400" />
                            <label className="text-blue-300 font-medium">Comment (Optional)</label>
                          </div>
                          <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 rounded-lg bg-blue-950/70 border border-blue-500/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Tell us about your project or specific interests"
                          ></textarea>
                        </div>
                        
                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                          >
                            <Shield className="h-5 w-5" />
                            <span>Submit Request</span>
                          </button>
                        </div>
                      </form>
                      
                      <div className="mt-6 text-center text-gray-400 text-sm">
                        Your information is kept confidential and will only be used to respond to your inquiry.
                      </div>
                    </div>
                  </PitchDeckSlide>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PitchDeckModal;