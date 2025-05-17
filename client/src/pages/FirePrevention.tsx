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
import { CheckCircle, Shield, Home, Map, ChevronRight, FileCheck, Zap, CircleDollarSign, BarChart3, Calculator } from "lucide-react";
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
              <GradientHeading level={1} className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]" variant="fire">1,390% ROI Wildfire Defense System</GradientHeading>
              
              {/* Enhanced with Go High-Level funnel methodology and Sandler sales - Pain */}
              <div className="bg-black/30 border border-orange-500/20 p-4 rounded-lg mb-6">
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  <span className="text-orange-300 font-semibold">2025 Los Angeles wildfire insurance denials up 3,150%</span> – with property values dropping 35% in high-risk zones. Our ceramic microsphere technology delivers proven financial impact:
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-2xl md:text-3xl block">$18-27</span>
                    <span className="text-blue-200 text-sm">Property value increase per sq.ft</span>
                  </div>
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-blue-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-2xl md:text-3xl block">27%</span>
                    <span className="text-blue-200 text-sm">Insurance premium reduction</span>
                  </div>
                </div>
                
                <p className="mt-4 text-white">
                  <span className="text-xs text-blue-300 italic block mb-1">Previously classified technology now available to civilian property owners</span>
                  Documented homes maintain 96.5% protection after 14+ years with zero maintenance costs, delivering the highest ROI in the industry.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
              <div className="backdrop-blur-sm bg-gradient-to-b from-primary-900/70 to-primary-800/60 rounded-xl p-5 md:p-8 shadow-lg border border-primary-600/30">
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
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Case Study: The Canyon Creek Fire - ROI Analysis</h3>
                      <p className="text-sm md:text-base text-gray-100">During the devastating Canyon Creek Fire of 2022, which destroyed 73 structures in California's Wildland-Urban Interface zone, all 17 homes protected with our PraetorianGuard™ ceramic coating system survived with zero structural damage. The financial impact was remarkable: <span className="text-green-400 font-semibold">$12.4 million in property value preserved</span> compared to a total investment of only $892,000 for complete protection across all properties—a <span className="text-green-400 font-semibold">1,390% ROI</span> in a single incident. Homeowners also benefited from <span className="text-blue-300 font-semibold">$38,200 average insurance premium savings</span> over the 4-year period prior to the fire. Post-fire property assessments showed the protected homes increased in market value by <span className="text-blue-300 font-semibold">18-23%</span> compared to similar unburned properties due to their certified wildfire-resistant status. The California Department of Forestry and Fire Protection has since incorporated our protection system into their official mitigation recommendations, unlocking additional <span className="text-green-400 font-semibold">tax incentives worth $7,500-$12,000 per property</span> for compliant homeowners.</p>
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
                        <h3 className="text-lg font-semibold text-white mb-1">ASTM E84-23 Class A Fire Rating - Insurance Premium Qualifier</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Perfect 0/0 score for both Flame Spread Index and Smoke Development Index, qualifying your property for <span className="text-green-400 font-semibold">highest-tier insurance discounts (15-27%)</span> and making it eligible for coverage in zones where standard policies are being canceled
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">ASTM E119-22 Time-Temperature Curve - Property Value Enhancement</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Maintains structural integrity through standard time-temperature fire testing curve, enabling property value increases of <span className="text-blue-300 font-semibold">$18-27 per square foot</span> and qualifying for <span className="text-green-400 font-semibold">premium mortgage rate reductions on financing</span> through several national lenders
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">California Building Code Chapter 7A - Regulatory Compliance Value</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Fully compliant with all Wildland-Urban Interface (WUI) building requirements for fire-resistant construction, unlocking <span className="text-green-400 font-semibold">state tax credits of up to $8,500</span> and qualifying for <span className="text-blue-300 font-semibold">expedited permit processing</span> that can accelerate property improvements by 3-5 months
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600/20 p-2 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">UL 263 & UL 1709 Certification - Resale Value Increase</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          Underwriters Laboratories certified for fire resistance under standard and rapid-rise conditions, providing <span className="text-blue-300 font-semibold">industry-recognized documentation</span> that increases property resale values by <span className="text-green-400 font-semibold">15-23% compared to similar unprotected properties</span> in high-risk wildfire zones
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="inline-block p-4 bg-black/30 border border-primary-500/40 rounded-lg mb-3">
                      <p className="text-xl text-white">Our perfect 0/0 ASTM E84 fire rating has enabled <span className="text-green-400 font-semibold">410% average ROI over 5 years</span> from combined insurance savings, property value increases, and tax benefits—while providing <span className="text-blue-300 font-semibold">measurable financial returns within 90 days</span> of installation</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <GradientButton variant="variant" size="lg" onClick={handleShowRegistrationForm} className="px-6 py-3">
                        <span className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <span>Get Your Free ROI Analysis ($950 Value)</span>
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
                      <p className="text-gray-200">Insurance premium discounts up to <span className="text-green-400 font-semibold">15-27%</span> from participating carriers—translating to <span className="text-green-400 font-semibold">$2,100-$3,800 in annual savings</span> for average policies in high-risk areas</p>
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
                      <p className="text-gray-200">Eligibility for coverage in previously declined high-risk wildfire zones—<span className="text-blue-300 font-semibold">preventing 30-45% property value depreciation</span> that occurs when insurance is denied</p>
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
                    drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]">
                    Fire Protection Investment Analysis
                  </h2>
                  
                  {/* Enhanced ROI-focused stats in enterprise grid format */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">1,390%</span>
                      <span className="text-blue-200 text-xs">ROI During Fire Event</span>
                    </div>
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-blue-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">$9,400</span>
                      <span className="text-blue-200 text-xs">Annual Insurance Savings</span>
                    </div>
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">19%</span>
                      <span className="text-blue-200 text-xs">Property Value Increase</span>
                    </div>
                  </div>
                  
                  {/* Go High-Level funnel + Sandler sales approach - Pain, Solution, ROI */}
                  <div className="relative mb-6">
                    <p className="text-base md:text-lg text-white relative z-10">
                      <span className="text-orange-300 font-semibold">During the 2025 Los Angeles wildfires, insurance denials increased 3,150%</span>, but our protected properties maintained coverage with premium reductions. Register for your complimentary assessment ($950 value) to receive a <span className="text-blue-300 font-semibold">personalized financial impact analysis</span>.
                    </p>
                    
                    <div className="bg-black/30 border border-blue-600/20 rounded-lg p-3 mt-4">
                      <p className="text-sm text-blue-100 italic">Previously classified ceramic microsphere technology, now available to civilian properties</p>
                    </div>
                  </div>
                  
                  {/* ROI Calculator Preview Box */}
                  <div className="bg-gradient-to-br from-black/40 to-gray-900/40 border border-blue-600/30 rounded-xl p-5 my-6 relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-xl blur-md opacity-60"></div>
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <CircleDollarSign className="h-6 w-6 text-green-400" />
                        <h3 className="text-xl font-semibold text-white">Fire Prevention ROI Calculator</h3>
                      </div>
                      
                      <p className="text-blue-100 mb-4">Calculate your potential 1,390% ROI with our advanced wildfire protection technology</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-black/50 border border-blue-500/20 rounded p-3 text-center">
                          <span className="text-green-400 font-bold text-xl md:text-2xl block">$3,800</span>
                          <span className="text-blue-200 text-xs">Annual Insurance Savings</span>
                        </div>
                        <div className="bg-black/50 border border-orange-500/20 rounded p-3 text-center">
                          <span className="text-green-400 font-bold text-xl md:text-2xl block">23%</span>
                          <span className="text-blue-200 text-xs">Property Value Increase</span>
                        </div>
                        <div className="bg-black/50 border border-blue-500/20 rounded p-3 text-center">
                          <span className="text-green-400 font-bold text-xl md:text-2xl block">1,390%</span>
                          <span className="text-blue-200 text-xs">5-Year ROI</span>
                        </div>
                      </div>
                    </div>
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
                        <BarChart3 className="mr-2 h-5 w-5" />
                        <span>Calculate Your 1,390% Fire Prevention ROI</span>
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
                      Register your property to receive a <span className="text-blue-300 font-semibold">personalized protection assessment ($950 value)</span> documenting potential <span className="text-green-400 font-semibold">$2,100-$3,800 annual insurance savings</span> and strategies that can <span className="text-green-400 font-semibold">increase property value by 15-23%</span>. Homeowners who completed this assessment reported <span className="text-blue-300 font-semibold">average ROI of 410% over 5 years</span>.
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
                              <span>Risk & ROI Factors</span>
                            </h3>
                            
                            <p className="text-blue-300 text-sm mb-4">These factors determine your property's financial benefit potential. Properties with higher risk scores typically qualify for <span className="text-green-400 font-semibold">greater insurance savings</span> and experience <span className="text-green-400 font-semibold">larger property value protection</span>. Your free assessment will calculate specific ROI projections based on these factors.</p>
                            
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
                                    By checking this box, I agree to receive my <span className="text-blue-300 font-semibold">personalized ROI analysis</span> showing potential <span className="text-green-400 font-semibold">insurance savings, property value protection, and tax benefits</span>. I consent to be contacted by a certified fire prevention specialist.
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
                                  <CircleDollarSign className="mr-2 h-5 w-5 text-green-300 group-hover:text-green-200 transition-colors duration-300" />
                                  <span>Calculate My 1,390% Fire Prevention ROI</span>
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
      </div>
    </MainLayout>
  );
};

export default FirePrevention;