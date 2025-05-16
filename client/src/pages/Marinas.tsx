import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Anchor, 
  ShieldCheck, 
  Sun, 
  Leaf, 
  Ship, 
  Factory, 
  Waves, 
  CheckCircle, 
  ChevronRight, 
  FileCheck, 
  BuildingIcon,
  Zap
} from "lucide-react";
import { insertMarinaProfessionalSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Marinas = () => {
  const [vesselType, setVesselType] = useState("");
  const [waterType, setWaterType] = useState("");
  const [material, setMaterial] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for marina professional registration
  const form = useForm({
    resolver: zodResolver(insertMarinaProfessionalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      jobTitle: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      licenseNumber: "",
      yearsInBusiness: 0,
      vesselTypes: "",
      specialties: "",
      experienceDescription: "",
      serviceAreas: "",
      isPremiumMember: false,
      agreesToTerms: false,
      notes: ""
    },
  });

  // Marina Professional registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/professionals/marina-professionals", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your marina professional profile has been created",
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

  const handleFindCoatings = () => {
    setShowResults(true);
  };
  
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Premium enterprise background styling */}
        <div 
          className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black" 
        />
        
        {/* Premium ambient glow effects - enhanced for elite enterprise appearance */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[5%] right-[10%] w-[45rem] h-[45rem] bg-orange-600/15 rounded-full blur-[150px] animate-pulse-slow-delayed"></div>
          <div className="absolute top-[30%] right-[25%] w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-[30%] left-[25%] w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-[100px] animate-pulse-slow-delayed"></div>
          
          {/* Edge lighting effect */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"></div>
        </div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            {/* Premium styled title card */}
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              {/* Ambient glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.3)]">
                {/* Corner accents - premium enterprise style */}
                <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                </div>
              
                {/* Premium ultra header with layered effects */}
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10 rounded-lg blur-md"></div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10 drop-shadow-[0_3px_10px_rgba(59,130,246,0.7)]">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">ABS-Certified Marine Protection</span>
                  </h1>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                <p className="text-xl text-white mb-8 leading-relaxed relative">
                  <span className="relative">
                    Our American Bureau of Shipping (ABS) certified ceramic coating systems (certification <span className="text-blue-300 font-medium">#MC-1372</span>) provide unmatched protection in harsh saltwater environments up to 3.5% NaCl concentration. The technology combines perfect Class A (0/100) fire rating with superior thermal insulation (R-value 16.8/inch), solar reflectance (89%), and corrosion resistance under ASTM B117 salt spray testing (2,000+ hours). This NASA-derived vacuum-filled ceramic microsphere technology delivers documented <span className="text-blue-300 font-medium">30+ year protection</span> for marine vessels and structures.
                  </span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Left Column: Marine Application Configurator */}
              <div className="relative">
                {/* Premium ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
                  {/* Corner accents - premium enterprise style */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>
                
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full mr-4"></div>
                    <h2 className="text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">Marine Application Configurator</h2>
                  </div>
                  
                  <p className="mb-6 text-white text-lg">Find the right marine coating specification for your vessel or marine structure based on environmental exposure factors and operational requirements. Our ABS-certified coatings are engineered for optimal performance in the most demanding marine environments.</p>
                  
                  <div className="bg-gradient-to-br from-blue-900/20 via-blue-950/20 to-black/20 border border-blue-500/30 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-700/50 rounded-full p-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-blue-200 font-semibold">ABS Certification #MC-1372</h4>
                        <p className="text-white text-sm mt-1">Our coatings meet or exceed all American Bureau of Shipping requirements for marine applications, including salt spray resistance testing (ASTM B117, 2,000+ hours), adhesion, and impact resistance.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-300" htmlFor="vessel-type">
                        Vessel Type
                      </label>
                      <Select onValueChange={(value) => setVesselType(value)}>
                        <SelectTrigger id="vessel-type" className="w-full bg-gray-900/80 border-blue-500/30">
                          <SelectValue placeholder="Select vessel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pleasure-craft">Pleasure Craft</SelectItem>
                          <SelectItem value="commercial">Commercial Vessel</SelectItem>
                          <SelectItem value="sailboat">Sailboat</SelectItem>
                          <SelectItem value="dock">Dock/Marina Structure</SelectItem>
                          <SelectItem value="offshore">Offshore Platform</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-300" htmlFor="water-type">
                        Water Type
                      </label>
                      <Select onValueChange={(value) => setWaterType(value)}>
                        <SelectTrigger id="water-type" className="w-full bg-gray-900/80 border-blue-500/30">
                          <SelectValue placeholder="Select water type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">Saltwater</SelectItem>
                          <SelectItem value="freshwater">Freshwater</SelectItem>
                          <SelectItem value="brackish">Brackish</SelectItem>
                          <SelectItem value="tropical">Tropical Waters</SelectItem>
                          <SelectItem value="arctic">Arctic Waters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-300" htmlFor="surface-material">
                        Surface Material
                      </label>
                      <Select onValueChange={(value) => setMaterial(value)}>
                        <SelectTrigger id="surface-material" className="w-full bg-gray-900/80 border-blue-500/30">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fiberglass">Fiberglass</SelectItem>
                          <SelectItem value="aluminum">Aluminum</SelectItem>
                          <SelectItem value="steel">Steel</SelectItem>
                          <SelectItem value="wood">Wood</SelectItem>
                          <SelectItem value="concrete">Concrete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Enterprise premium button with ambient glow */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70"></div>
                      <div className="relative">
                        <PremiumCartButton 
                          onClick={handleFindCoatings}
                          size="lg"
                          className="w-full"
                        >
                          Find Recommended Coatings
                        </PremiumCartButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: NASA-Derived Marine Benefits */}
              <div className="relative">
                {/* Premium ambient glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] h-full">
                  {/* Corner accents - premium enterprise style */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>
                
                  {/* Enhanced title with advanced styling */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg blur-sm"></div>
                    <h2 className="text-3xl font-bold text-white relative drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                      <span className="inline-block relative">
                        NASA-Derived Marine Benefits
                        <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"></div>
                      </span>
                    </h2>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                        <span className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-2 mt-1 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                          <Anchor className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="relative">
                        <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                          <span className="relative inline-block">
                            American Bureau of Shipping (ABS) Certified
                            <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                          </span>
                        </h3>
                        <p className="text-white leading-relaxed">Our ceramic microsphere technology (US Patent <span className="text-blue-300 font-medium">#10,738,214</span>) is specifically certified for marine applications by the American Bureau of Shipping under certification <span className="text-blue-300 font-medium">#MC-1372</span>, meeting all requirements for the harshest marine environments.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="bg-blue-600 rounded-full p-2 mt-1">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Class A (0/0) Fire Rating & SOLAS Compliance</h3>
                        <p className="text-white">Perfect 0/0 scores in ASTM E84-23 testing for both Flame Spread Index and Smoke-Developed Index, exceeding SOLAS requirements and providing superior fire protection.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="bg-blue-600 rounded-full p-2 mt-1">
                        <Ship className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Proven Long-Term Saltwater Resistance</h3>
                        <p className="text-white">Our ceramic coating technology has demonstrated exceptional longevity in extreme marine environments, as evidenced by the landmark Korean coastal bridge project with 30+ years of protection.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="bg-blue-600 rounded-full p-2 mt-1">
                        <Sun className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">89% Solar Reflection & 89% Thermal Emittance</h3>
                        <p className="text-white">Verified by the Cool Roof Rating Council, our coatings deliver a Solar Reflectance Index (SRI) of 113, reducing hull/cabin temperatures by 15-20°F and improving energy efficiency.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section (Conditional Render) */}
            {showResults && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] mb-16">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>
                
                  <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">Recommended Coating System</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white mb-4">SmartCoat MarineSeal System</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                          <p className="text-white font-medium">Base Coat: SmartCoat MarineBase (2 coats)</p>
                        </div>
                        <p className="text-gray-300 ml-7">Provides foundational adhesion and initial corrosion barrier</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                          <p className="text-white font-medium">Middle Coat: SmartCoat CeramicGuard (1 coat)</p>
                        </div>
                        <p className="text-gray-300 ml-7">Core thermal and UV protection layer with ceramic microspheres</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                          <p className="text-white font-medium">Top Coat: SmartCoat MarineFinish (2 coats)</p>
                        </div>
                        <p className="text-gray-300 ml-7">Final UV and chemical resistant layer with non-slip texture</p>
                      </div>
                      
                      <div className="mt-6 relative">
                        <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70"></div>
                        <div className="relative">
                          <PremiumCartButton size="lg" className="w-full font-medium">
                            Request Quote
                          </PremiumCartButton>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white mb-4">System Specifications</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-600 rounded-full p-2 mt-1">
                            <Waves className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Salt Spray Resistance: 3,500+ hours (ASTM B117)</p>
                            <p className="text-gray-300 text-sm">Exceeds commercial marine standards by 75%</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-600 rounded-full p-2 mt-1">
                            <Sun className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">UV Protection: 89% reflection rate</p>
                            <p className="text-gray-300 text-sm">Prevents color fading and material degradation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-600 rounded-full p-2 mt-1">
                            <FileCheck className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Warranty: 15 Year Performance Guarantee</p>
                            <p className="text-gray-300 text-sm">Transferable warranty with annual inspection</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-blue-900/50">
                        <h4 className="text-xl font-semibold text-white mb-3">Need Professional Application?</h4>
                        <div className="relative">
                          <div className="absolute -inset-1 bg-orange-500/30 rounded-lg blur-md opacity-70"></div>
                          <div className="relative">
                            <PremiumCartButton onClick={handleShowRegistrationForm} size="lg" className="w-full">
                              Register as Marina Professional
                            </PremiumCartButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Registration Form (Conditional Render) */}
            {showRegistrationForm && !registrationSuccess && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] mb-16">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>

                  <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">Marina Professional Registration</h2>
                  <p className="text-white mb-8">Join our network of certified marine application professionals. Complete the form below to register for training and certification.</p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-300">First Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="First name" {...field} className="bg-gray-900/80 border-blue-500/30" />
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
                              <FormLabel className="text-blue-300">Last Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Last name" {...field} className="bg-gray-900/80 border-blue-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-300">Email*</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Your email" {...field} className="bg-gray-900/80 border-blue-500/30" />
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
                              <FormLabel className="text-blue-300">Phone*</FormLabel>
                              <FormControl>
                                <Input placeholder="Phone number" {...field} className="bg-gray-900/80 border-blue-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-300">Company Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} className="bg-gray-900/80 border-blue-500/30" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="licenseNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-300">License Number</FormLabel>
                              <FormControl>
                                <Input placeholder="License number" {...field} className="bg-gray-900/80 border-blue-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="yearsInBusiness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-300">Years in Business*</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Years" 
                                  className="bg-gray-900/80 border-blue-500/30"
                                  {...field} 
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="specialties"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-300">Specialties*</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your marine service specialties"
                                className="bg-gray-900/80 border-blue-500/30 min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vesselTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-300">Vessel Types Experience</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Types of vessels you work with"
                                className="bg-gray-900/80 border-blue-500/30"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="agreesToTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gradient-to-br from-blue-900/20 via-blue-950/20 to-black/20 border border-blue-500/20">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-blue-200 font-medium">
                                I agree to the terms and conditions*
                              </FormLabel>
                              <p className="text-gray-400 text-sm">
                                By submitting this form, you agree to our terms of service and privacy policy.
                              </p>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 relative">
                        <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70"></div>
                        <div className="relative">
                          <PremiumCartButton 
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                          </PremiumCartButton>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            )}
            
            {/* Registration Success Message */}
            {registrationSuccess && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] mt-12 text-center">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>

                  <div className="inline-flex items-center justify-center bg-blue-600 rounded-full p-3 mb-4 relative z-50">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                    Registration Successful!
                  </h2>
                  <p className="text-white text-lg mb-6">
                    Thank you for registering as a Marina Professional with Praetorian SmartCoat Solutions. Our team will review your information and contact you shortly.
                  </p>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70"></div>
                    <div className="relative">
                      <PremiumCartButton 
                        onClick={() => setRegistrationSuccess(false)} 
                        size="lg"
                        className="bg-blue-600/40 hover:bg-blue-600/60 text-white"
                      >
                        Return to Marina Page
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-8 px-6 md:px-10 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] mx-auto max-w-3xl mb-8 inline-block">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>

                  <h2 className="text-3xl md:text-4xl mb-4 font-bold text-white drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">Marine Application Solutions</h2>
                  <p className="text-white max-w-2xl mx-auto">
                    Specialized coatings for every marine application, from personal watercraft to commercial vessels
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-6 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] h-full flex flex-col transform transition-all duration-300 group-hover:translate-y-[-5px]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>

                  <div className="inline-flex items-center justify-center bg-blue-600 rounded-full p-3 mb-4 w-16 h-16">
                    <Ship className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Pleasure Craft Protection</h3>
                  <p className="text-gray-300 mb-6 flex-grow">Our marine-grade ceramic coating provides superior protection against UV damage, salt water corrosion, and temperature fluctuations - extending the life of your vessel while reducing maintenance costs.</p>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <PremiumCartButton size="sm" className="w-full">
                        Learn More
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-6 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] h-full flex flex-col transform transition-all duration-300 group-hover:translate-y-[-5px]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>

                  <div className="inline-flex items-center justify-center bg-blue-600 rounded-full p-3 mb-4 w-16 h-16">
                    <Factory className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Commercial Marine Applications</h3>
                  <p className="text-gray-300 mb-6 flex-grow">Engineered for commercial vessels and marine structures with heavy use patterns. Our ABS-certified coatings extend maintenance cycles and reduce downtime while cutting operational costs.</p>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <PremiumCartButton size="sm" className="w-full">
                        Learn More
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-6 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)] h-full flex flex-col transform transition-all duration-300 group-hover:translate-y-[-5px]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                  </div>

                  <div className="inline-flex items-center justify-center bg-blue-600 rounded-full p-3 mb-4 w-16 h-16">
                    <BuildingIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Marina Infrastructure</h3>
                  <p className="text-gray-300 mb-6 flex-grow">Protect docks, piers, and marina facilities from the harsh marine environment. Our coatings create a durable barrier against saltwater, UV, and microbial growth while extending infrastructure lifespan.</p>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <PremiumCartButton size="sm" className="w-full">
                        Learn More
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Marinas;