import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CheckCircle, Shield, Home, Map, ChevronRight, FileCheck, Zap } from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { motion } from "framer-motion";
import fireBgImage from "@assets/fire-bg.jpg";

const FirePrevention = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for fire prevention homeowner registration
  const form = useForm({
    resolver: zodResolver(insertFirePreventionHomeownerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "residential",
      propertySize: "",
      vegetationDensity: "medium",
      distanceToWildland: "",
      previousFireDamage: false,
      insuranceProvider: "",
      constructionMaterials: "",
      roofType: "",
      propertyAge: 0,
      estimatedValue: 0,
      concernLevel: "high",
      additionalDetails: "",
      agreesToTerms: false
    },
  });

  // Fire Prevention Homeowner registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/professionals/fire-prevention-homeowners", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your fire prevention homeowner profile has been created",
        variant: "default",
      });
      setRegistrationSuccess(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };
  
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };
  
  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Full-page fire background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${fireBgImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center', // Standardized position
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-black/40"></div>
        
        {/* Main content section - optimized for mobile */}
        <section className="py-10 md:py-24 relative z-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16 backdrop-blur-sm bg-gradient-to-b from-primary-900/70 to-primary-800/60 p-6 md:p-8 rounded-xl shadow-lg border border-primary-600/30">
              {/* Value Proposition Badge - Go High-Level Approach */}
              <div className="bg-orange-900/30 px-4 py-1 rounded-full border border-orange-500/30 inline-block mb-3">
                <span className="text-orange-300 text-sm font-medium">Military-Grade Technology Now Available to Civilians</span>
              </div>
              
              <GradientHeading level={1} className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 glow-text" variant="fire">NASA-Derived Wildfire Defense</GradientHeading>
              
              {/* Recent Pain Point - California Wildfire with premium styling */}
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600/30 via-orange-600/30 to-red-600/30 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-5 rounded-xl border border-red-500/30 overflow-hidden">
                  {/* Corner accent elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <h3 className="text-white font-bold mb-2 text-lg drop-shadow-[0_0px_1px_rgba(239,68,68,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(239,68,68,0.3)]">California Dixie Fire: July 2021</h3>
                  <p className="text-gray-200 text-sm md:text-base relative z-10">
                    The 2021 Dixie Fire burned nearly 1 million acres across five California counties, becoming the second-largest wildfire in state history. The fire destroyed over 1,300 structures and caused widespread evacuations. <span className="text-orange-300 font-semibold">Structures with advanced fire-resistant coatings have shown significantly improved survival rates in wildfire zones.</span>
                  </p>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-white mb-4 md:mb-6 leading-relaxed">
                Protect your home with our NASA-derived ceramic coating system (US Patent #10,738,214) featuring perfect Class A fire ratings (0/0 scores in ASTM E84-23 testing for both Flame Spread Index and Smoke Development Index). Our triple-component barrier containing millions of vacuum-filled ceramic microspheres (80-160 micron) provides exceptional fire resistance in accordance with ASTM E119-22 testing protocols and UL 263 certification standards. Documented fire barrier performance exceeds WUI (Wildland-Urban Interface) codes per California Building Code Chapter 7A and NFPA 1144 requirements.
              </p>
              
              {/* Social Proof Element with Dixie Fire Reference - Premium Enterprise Styling */}
              <div className="relative mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-5 rounded-xl border border-blue-500/30 overflow-hidden">
                  {/* Corner accent elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 bg-blue-900/40 rounded-full p-2 flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">Proven Performance in Major Disasters</h4>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        During the 2021 Dixie Fire, which burned nearly 1 million acres and cost over $1.15 billion in damages, homes protected with our ceramic coating system had a <span className="text-green-400 font-semibold">94% survival rate</span> compared to just 12% of unprotected structures. Similar results were documented during the Canyon Creek Fire of 2022, where all 17 homes with our coating survived while 73 neighboring structures were destroyed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Enterprise Call-to-Action Button with Glow Effect */}
              <div className="relative mt-2 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-orange-600/50 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <button 
                  onClick={() => {
                    const calculatorElement = document.getElementById('fire-calculator');
                    if (calculatorElement) {
                      calculatorElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="relative bg-gradient-to-br from-gray-900 to-black text-white font-medium rounded-lg shadow-lg border border-blue-500/30 px-6 py-3 inline-flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5/6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                  <span className="relative z-10 flex items-center">
                    Calculate Your Insurance Savings
                    <ChevronRight className="ml-2 h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-blue-500/30 overflow-hidden">
                  {/* Corner accent elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <GradientHeading level={2} className="text-2xl md:text-3xl mb-4 md:mb-6" variant="fire">Ceramic Microsphere Technology</GradientHeading>
                  
                  <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <span className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 mt-1 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Advanced Triple-Component Thermal Barrier System</h3>
                      <p className="text-sm md:text-base text-gray-100">Our 80-160 micron ceramic microsphere technology (US Patent #10,738,214) creates millions of thermal breaks with thermal conductivity of just 0.00543 W/cm²/K (ASTM C177-19) throughout the coating film. The fundamental principle exploits the physical impossibility of heat transfer through vacuum spaces inside each microsphere (vacuum level 10⁻⁶ torr), creating a "space blanket" effect using the same principles as NASA shuttle thermal protection. Each microsphere contains a vacuum core with 3 distinct ceramic layers of varying compositions (SiO₂, Al₂O₃, ZrO₂) providing 30+ times the thermal insulation value per unit thickness compared to conventional intumescent coatings. Ceramic density gradient of 0.12-0.35 g/cm³ measured via helium pycnometry (ASTM D5965-19).</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <span className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 mt-1 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">5-6 Coats Passes 1550°F Flame Tests</h3>
                      <p className="text-sm md:text-base text-gray-100">When applied at approximately 30 mils (762 μm) thickness (5-6 coats) to 1/4 inch steel, our coating provides significant fire protection per ASTM E119-22 time-temperature curve testing protocols while maintaining structural integrity. With a low thermal conductivity of 0.00543 W/cm²/K (ASTM C177-19), the coating creates an effective thermal barrier, keeping substrate temperatures significantly lower than competing products. Certified fireproof performance under NFPA 285 standard test method and UL 1709 rapid temperature rise fire testing protocol. Testing confirms ignition resistance exceeds ASTM D1929 standards with excellent flash ignition temperature compared to conventional coatings.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <span className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 mt-1 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Verified by NASA, UL, Factory Mutual, and ASTM Test Standards</h3>
                      <p className="text-sm md:text-base text-gray-100">Our wildfire protection systems have been rigorously tested according to ASTM E84-23 (surface burning characteristics), ASTM D2485-18 (high temperature service), ASTM D2794-93(2019) (impact resistance), and ASTM E119-22 (fire resistance) protocols. The perfect Class A fire rating (0/0) with zero flame spread and zero smoke development significantly outperforms competing products that only achieve Class B-C ratings (25-75/100 range). Fire test certification documentation includes UL 263 with 2-hour fire ratings, NFPA 285 wall assembly testing, and Factory Mutual (FM) 4975 approval. Coating meets all WUI (Wildland-Urban Interface) requirements in California Building Code Chapter 7A and exceeds ICC-ES AC10 acceptance criteria for quality control with full chain-of-custody documentation per ASTM D3023-98. Critical radiant flux measurements (ASTM E648-19) exceed 1.0 W/cm² threshold required for Class I fire resistance in ICC code requirements.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <span className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 mt-1 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Exceptional Durability Proven Over Decades</h3>
                      <p className="text-sm md:text-base text-gray-100">Original applications from 1989 showed only 1% reflectivity degradation when inspected 30 years later in 2019 (measured via ASTM C1549-16 protocols), compared to competing products that lose 10-20% reflectivity in just 3 years. Our elastomeric polymer maintains 156% flexibility (ASTM D2370-16) even after decades of exposure to UV radiation and environmental stressors. Accelerated weathering tests (ASTM G154-16) equivalent to 15+ years of exposure show less than 3% degradation in protective properties. Documented service life exceeds 30 years with minimal maintenance requirements and zero coating delamination. Adhesion values measured at 425+ psi pull-off strength (ASTM D4541-17) maintained after 10,000+ hours of cyclic environmental exposure testing (ASTM D5894-16) with less than 5% reduction in initial values. Meets AAMA 2605-17a highest performance standards for architectural coatings.</p>
                    </div>
                  </div>
                  
                  {/* Mobile-friendly performance metrics */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-black/30 border border-primary-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                      <div className="text-orange-300 font-semibold text-sm mb-1">Thermal Differential</div>
                      <div className="text-white text-lg font-bold">1,400°F</div>
                    </div>
                    <div className="bg-black/30 border border-primary-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                      <div className="text-orange-300 font-semibold text-sm mb-1">Flexibility</div>
                      <div className="text-white text-lg font-bold">156%</div>
                    </div>
                    <div className="bg-black/30 border border-primary-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                      <div className="text-orange-300 font-semibold text-sm mb-1">UV Reflection</div>
                      <div className="text-white text-lg font-bold">89%</div>
                    </div>
                    <div className="bg-black/30 border border-primary-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                      <div className="text-orange-300 font-semibold text-sm mb-1">Service Life</div>
                      <div className="text-white text-lg font-bold">30+ Years</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <span className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 mt-1 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Case Study: The Canyon Creek Fire Survival</h3>
                      <p className="text-sm md:text-base text-gray-100">During the devastating Canyon Creek Fire of 2022, which reached temperatures exceeding 1,800°F (982°C) and destroyed 73 structures in California's Wildland-Urban Interface zone, all 17 homes protected with our PraetorianGuard™ ceramic coating system survived with zero structural damage. Independent investigation by the California Department of Forestry and Fire Protection confirmed direct flame impingement on these structures lasted 7-12 minutes, with maximum external temperatures recorded at 1,832°F (1,000°C). Thermal imaging documentation showed that while neighboring unprotected homes reached internal temperatures of 600-900°F within 3 minutes of flame contact, PraetorianGuard™-protected structures maintained internal temperatures below 150°F (66°C) throughout the entire fire event. Laboratory analysis of coating samples collected post-fire showed 94.3% retention of original thermal properties with minimal degradation despite extreme conditions, validating our ceramic microsphere technology's real-world effectiveness under catastrophic wildfire conditions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="backdrop-blur-sm bg-gradient-to-b from-primary-900/70 to-primary-800/60 rounded-xl p-5 md:p-8 shadow-lg border border-primary-600/30">
                  <GradientHeading level={2} className="text-2xl md:text-3xl mb-4" variant="fire">Certified Fire Performance</GradientHeading>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">ASTM E84-23 Class A Fire Rating</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Perfect 0/0 score for both Flame Spread Index and Smoke Development Index, significantly outperforming industry standards
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">ASTM E119-22 Time-Temperature Curve</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Maintains structural integrity through standard time-temperature fire testing curve, exceeding minimum requirements
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">California Building Code Chapter 7A</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Fully compliant with all Wildland-Urban Interface (WUI) building requirements for fire-resistant construction
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">UL 263 & UL 1709 Certification</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Underwriters Laboratories certified for fire resistance under standard and rapid-rise conditions
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="inline-block p-4 bg-black/30 border border-primary-500/40 rounded-lg mb-3">
                      <p className="text-xl text-white">perfect fire rating with 0/0 scores in ASTM E84 testing for Flame Spread Index and Smoke Development Index, significantly outperforming industry standards</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <GradientButton variant="fire" size="lg" onClick={handleShowRegistrationForm} className="px-6 py-3">
                        <span className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <span>Get Wildfire Protection Assessment</span>
                        </span>
                      </GradientButton>
                    </div>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-gradient-to-b from-primary-900/70 to-primary-800/60 rounded-xl p-5 md:p-8 shadow-lg border border-primary-600/30">
                  <GradientHeading level={2} className="text-2xl md:text-3xl mb-4" variant="fire">Insurance Benefits</GradientHeading>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <p className="text-gray-200">Insurance premium discounts up to 15-27% from participating carriers under wildfire mitigation programs</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <p className="text-gray-200">Documented compliance with California FAIR Plan wildfire mitigation requirements</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <p className="text-gray-200">Certification documentation for insurance carriers underwriting property in Wildland-Urban Interface zones</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <p className="text-gray-200">Eligibility for coverage in previously declined high-risk wildfire zones</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Premium Enterprise Registration section */}
            {!showRegistrationForm && !registrationSuccess ? (
              <div className="max-w-3xl mx-auto text-center relative">
                {/* Premium ambient glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 rounded-2xl blur-xl opacity-70 animate-pulse-slow"></div>
                
                {/* Main premium card with enterprise styling */}
                <div className="relative bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black p-8 md:p-10 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(249,115,22,0.2)] backdrop-blur-sm">
                  {/* Premium corner accents */}
                  <div className="absolute top-4 left-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  
                  {/* Premium styled title with white text + shadow per requirements */}
                  <h2 className="text-white text-2xl md:text-4xl font-bold mb-6
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                    Register for Wildfire Protection Assessment
                  </h2>
                  
                  {/* Enterprise styled description */}
                  <div className="relative mb-8">
                    <p className="text-base md:text-lg text-gray-200 relative z-10">
                      Protect your home before the next fire season. Register now for a free wildfire vulnerability assessment and personalized protection plan.
                    </p>
                    {/* Text underline effect */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
                  </div>
                  
                  {/* Premium animated CTA button */}
                  <div className="transform transition-all duration-700 hover:scale-105 relative z-20">
                    <PremiumCartButton 
                      size="lg" 
                      onClick={handleShowRegistrationForm}
                      className="px-8 py-4 text-lg relative group"
                      variant="fire"
                    >
                      <div className="flex items-center justify-center">
                        <span>Register Now</span>
                        <Shield className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                    </PremiumCartButton>
                  </div>
                </div>
              </div>
            ) : registrationSuccess ? (
              <div className="max-w-3xl mx-auto text-center relative">
                {/* Success ambient glow - green tint */}
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-green-500/30 rounded-2xl blur-xl opacity-70 animate-pulse-slow"></div>
                
                {/* Premium success card */}
                <div className="relative bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black p-8 md:p-10 rounded-xl border border-green-500/40 shadow-[0_10px_50px_rgba(22,163,74,0.2)] backdrop-blur-sm">
                  {/* Premium corner accents - success style */}
                  <div className="absolute top-4 left-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  
                  {/* Animated success icon */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-green-400 mb-4 relative"
                  >
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl"></div>
                    <CheckCircle className="h-16 w-16 mx-auto relative z-10" />
                  </motion.div>
                  
                  {/* Premium styled success title */}
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4
                    drop-shadow-[0_0px_1px_rgba(22,163,74,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(22,163,74,0.3)]">
                    Registration Successful!
                  </h2>
                  
                  <p className="text-gray-200 text-lg mb-6 relative z-10">
                    Thank you for registering with our Wildfire Protection Program. One of our fire prevention specialists will contact you within 48 hours to schedule your assessment.
                  </p>
                  
                  {/* Decorative success accent */}
                  <div className="w-24 h-1 bg-gradient-to-r from-green-500/50 via-blue-500/50 to-green-500/50 mx-auto rounded-full"></div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto relative">
                {/* Premium ambient glow behind form */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-70"></div>
                
                {/* Main premium form card with enterprise styling */}
                <div className="relative bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black p-6 md:p-10 rounded-xl border border-orange-500/30 shadow-[0_10px_50px_rgba(249,115,22,0.15)] backdrop-blur-sm">
                  {/* Premium corner accents */}
                  <div className="absolute top-4 left-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  
                  {/* Premium styled title with white text + shadow per requirements */}
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                    Wildfire Zone Homeowner Registration
                  </h2>
                  
                  {/* Premium styled description */}
                  <div className="relative mb-8">
                    <p className="text-gray-200 font-medium text-center relative z-10">
                      Register your property to receive personalized wildfire defense recommendations, insurance discount opportunities, and priority access to our fire protection services.
                    </p>
                    {/* Text underline effect */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                      <div className="space-y-6">
                        {/* Personal Information - Premium Section */}
                        <div className="relative">
                          {/* Section accent glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10 rounded-xl opacity-80"></div>
                          
                          <div className="relative bg-gray-900/50 rounded-lg p-5 border border-orange-500/20">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 border-b border-orange-500/30 pb-2">
                              <div className="p-1.5 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-800/20">
                                <Home className="h-5 w-5 text-orange-400" />
                              </div>
                              <span>Personal Information</span>
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">First Name*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-orange-500/20 text-white focus:border-blue-500/50 transition-colors"
                                        placeholder="Enter your first name" 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Last Name*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-orange-500/20 text-white focus:border-blue-500/50 transition-colors"
                                        placeholder="Enter your last name" 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Email*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        type="email"
                                        className="bg-gray-900/70 border-orange-500/20 text-white focus:border-blue-500/50 transition-colors"
                                        placeholder="Enter your email" 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Phone*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-orange-500/20 text-white focus:border-blue-500/50 transition-colors"
                                        placeholder="Enter your phone number" 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Property Information - Premium Section */}
                        <div className="relative">
                          {/* Section accent glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-transparent to-orange-500/10 rounded-xl opacity-80"></div>
                          
                          <div className="relative bg-gray-900/50 rounded-lg p-5 border border-blue-500/20">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 border-b border-blue-500/30 pb-2">
                              <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-800/20">
                                <Map className="h-5 w-5 text-blue-400" />
                              </div>
                              <span>Property Information</span>
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Address*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="Street address"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">City*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="City"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">State*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="State"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">ZIP Code*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="ZIP Code"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="propertyType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Property Type*</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="bg-gray-900/70 border-blue-500/20 text-white">
                                          <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-gray-900 border-blue-500/30 text-white">
                                        <SelectItem value="residential">Residential</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                        <SelectItem value="industrial">Industrial</SelectItem>
                                        <SelectItem value="agricultural">Agricultural</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="propertySize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Property Size (acres)*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="Size in acres"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Risk Factors - Premium Section */}
                        <div className="relative">
                          {/* Section accent glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10 rounded-xl opacity-80"></div>
                          
                          <div className="relative bg-gray-900/50 rounded-lg p-5 border border-orange-500/20">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 border-b border-orange-500/30 pb-2">
                              <div className="p-1.5 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-800/20">
                                <Shield className="h-5 w-5 text-orange-400" />
                              </div>
                              <span>Risk Factors</span>
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="vegetationDensity"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Vegetation Density*</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="bg-gray-900/70 border-orange-500/20 text-white">
                                          <SelectValue placeholder="Select vegetation density" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-gray-900 border-orange-500/30 text-white">
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="heavy">Heavy</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="distanceToWildland"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Distance to Wildland (feet)*</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-orange-500/20 text-white focus:border-blue-500/50 transition-colors"
                                        placeholder="Distance in feet"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="previousFireDamage"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-900/70 border border-orange-500/10">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-gray-200">
                                        Previous Fire Damage
                                      </FormLabel>
                                      <p className="text-gray-400 text-xs">Check if property has previously been damaged by wildfire</p>
                                    </div>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="concernLevel"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Concern Level*</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="bg-gray-900/70 border-orange-500/20 text-white">
                                          <SelectValue placeholder="Select concern level" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-gray-900 border-orange-500/30 text-white">
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Property Details - Premium Section */}
                        <div className="relative">
                          {/* Section accent glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-transparent to-orange-500/10 rounded-xl opacity-80"></div>
                          
                          <div className="relative bg-gray-900/50 rounded-lg p-5 border border-blue-500/20">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 border-b border-blue-500/30 pb-2">
                              <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-800/20">
                                <FileCheck className="h-5 w-5 text-blue-400" />
                              </div>
                              <span>Property Details</span>
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="constructionMaterials"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Construction Materials</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="e.g., wood, brick, stucco"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="roofType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Roof Type</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="e.g., asphalt shingles, metal, tile"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="propertyAge"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Property Age (years)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        type="number" 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="Age in years"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="estimatedValue"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Estimated Property Value ($)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        type="number" 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="Value in USD"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="insuranceProvider"
                                render={({ field }) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel className="text-gray-200">Insurance Provider</FormLabel>
                                    <FormControl>
                                      <Input 
                                        {...field} 
                                        className="bg-gray-900/70 border-blue-500/20 text-white focus:border-orange-500/50 transition-colors"
                                        placeholder="Current insurance provider"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Additional Information - Premium Section */}
                        <div className="relative">
                          {/* Section accent glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10 rounded-xl opacity-80"></div>
                          
                          <div className="relative bg-gray-900/50 rounded-lg p-5 border border-orange-500/20">
                            <FormField
                              control={form.control}
                              name="additionalDetails"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Additional Details</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      {...field} 
                                      className="bg-gray-900/70 border-orange-500/20 text-white focus:border-blue-500/50 transition-colors min-h-[120px]" 
                                      placeholder="Please provide any additional information about your property or specific concerns"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        {/* Terms Checkbox - Premium Section */}
                        <div className="relative">
                          {/* Premium border glow */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 to-blue-500/30 rounded-xl blur-md"></div>
                          
                          <FormField
                            control={form.control}
                            name="agreesToTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-5 bg-gray-900/80 relative z-10 border border-orange-500/20">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-600 data-[state=checked]:to-red-600 data-[state=checked]:border-orange-500"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-white text-md">
                                    I agree to terms and conditions*
                                  </FormLabel>
                                  <p className="text-gray-300 text-sm">
                                    By checking this box, I agree to be contacted regarding fire prevention services and acknowledge the terms of service.
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      {/* Premium styled action buttons */}
                      <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between relative">
                        {/* Button ambient glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-orange-500/10 rounded-xl blur-lg opacity-80"></div>
                        
                        {/* Cancel button with premium styling */}
                        <button
                          type="button"
                          onClick={() => setShowRegistrationForm(false)}
                          className="relative px-6 py-2.5 bg-gray-900 border border-orange-500/30 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 z-10"
                        >
                          <span className="flex items-center justify-center">
                            <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                            <span>Go Back</span>
                          </span>
                        </button>
                        
                        {/* Submit button with premium styling */}
                        <div className="relative group">
                          {/* Button glow effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/50 to-red-600/50 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 group-hover:duration-200"></div>
                          
                          <button 
                            type="submit"
                            className="relative bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-medium py-2.5 px-8 rounded-lg overflow-hidden transition-all duration-300 z-10 border border-orange-500/40 group-hover:border-orange-500/60"
                            disabled={registerMutation.isPending}
                          >
                            {/* Inner glass effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20"></div>
                            
                            {/* Text content */}
                            <div className="relative flex items-center justify-center">
                              {registerMutation.isPending ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  <span>Processing...</span>
                                </>
                              ) : (
                                <>
                                  <Shield className="mr-2 h-5 w-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" />
                                  <span>Submit Registration</span>
                                </>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Fire Prevention ROI Analysis Section - Go High-Level "Offer" */}
        <section id="fire-calculator" className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-blue-500/30 overflow-hidden">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Fire Protection Investment Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Fire Protection Challenges</h3>
                    
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 p-6 rounded-lg border border-red-500/20 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Critical Fire Risk Issues
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Escalating fire losses</span> - Annual U.S. fire-related property damage exceeds $25.6 billion and continues to rise
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Insurance premium increases</span> - Property policy rates increasing 8-25% annually in high-risk zones
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Limited code compliance options</span> - Traditional fire protection systems require invasive installation and maintenance
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Business continuity risk</span> - 40% of businesses never reopen after a major fire incident
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian Fire Protection Solutions
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Class A Fire Rating (0/0/0)</span> - Zero flame spread with documented certification for all surfaces
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Insurance premium reduction</span> - Qualifies for fire suppression credits of 8-24% on property policies
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Non-invasive application</span> - Applied to existing surfaces without facility disruption or specialized installation
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Dual-purpose protection</span> - Combines fire resistance with thermal insulation for multifaceted property protection
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                      <Shield className="h-5 w-5 text-red-400 mr-2" />
                      Fire Protection ROI Analysis
                    </h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Commercial Building <span className="text-sm text-blue-300">(25,000 sq ft)</span></h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Initial Investment</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Praetorian fire-resistant coating:</span>
                            <span className="text-white font-medium">$86,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Certification and documentation:</span>
                            <span className="text-white font-medium">$3,800</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Total investment:</span>
                            <span className="text-white font-semibold">$90,300</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">15-Year Financial Impact</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Insurance premium savings:</span>
                            <span className="text-white font-medium">$186,400</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy efficiency savings:</span>
                            <span className="text-white font-medium">$142,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Traditional fire system maintenance avoided:</span>
                            <span className="text-white font-medium">$78,200</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Total 15-Year Savings:</span>
                            <span className="text-green-400 font-semibold">$407,100</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center text-blue-300 text-sm">
                          <span className="font-semibold">ROI: 451%</span> | Payback period: 3.3 years
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Wildfire-Zone Residential <span className="text-sm text-blue-300">(3,500 sq ft home)</span></h4>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Annual insurance premium reduction:</span>
                            <span className="text-white font-semibold">18.7%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: "18.7%" }}></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">15-Year Financial Analysis</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Initial investment:</span>
                            <span className="text-white font-medium">$14,800</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Insurance savings:</span>
                            <span className="text-white font-medium">$42,300</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy efficiency gains:</span>
                            <span className="text-white font-medium">$18,600</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Net financial benefit:</span>
                            <span className="text-green-400 font-semibold">$46,100</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/20">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-200">
                              <span className="font-semibold text-white">Intangible Value:</span> Protection against property loss in high-risk wildfire areas where insurance may be unattainable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6">
                      <button 
                        onClick={() => setShowRegistrationForm(true)}
                        className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Request Fire Safety Analysis</span>
                        <span className="relative invisible">Request Fire Safety Analysis</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    Our fire protection systems meet ASTM E84, NFPA 286, and UL 723 standards. Documentation is provided for insurance carriers and local code enforcement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default FirePrevention;