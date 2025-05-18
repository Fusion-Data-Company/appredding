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
  Settings,
  Clock,
  TrendingUp,
  Leaf, 
  Ship, 
  Factory, 
  Waves, 
  CheckCircle, 
  ChevronRight, 
  FileCheck, 
  BuildingIcon,
  Zap,
  CircleDollarSign,
  BarChart3
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
        {/* Restored water background with premium enterprise overlay */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/sailboat-bg.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
        
        {/* Semi-transparent dark overlay with premium gradient */}
        <div 
          className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90" 
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
            <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20 relative">
              {/* Advanced enterprise-grade backdrop with layered effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-orange-600/10 to-blue-600/20 rounded-2xl blur-xl opacity-70"></div>
              
              {/* Premium corner accents - enterprise elite style */}
              <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg"></div>
                <div className="absolute top-1 left-1 w-14 h-14 border-t border-l border-blue-500/40 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/60 rounded-tr-lg"></div>
                <div className="absolute top-1 right-1 w-14 h-14 border-t border-r border-blue-500/40 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-500/60 rounded-bl-lg"></div>
                <div className="absolute bottom-1 left-1 w-14 h-14 border-b border-l border-blue-500/40 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/60 rounded-br-lg"></div>
                <div className="absolute bottom-1 right-1 w-14 h-14 border-b border-r border-blue-500/40 rounded-br-lg"></div>
              </div>
              
              {/* Enhanced main content with premium padding */}
              <div className="relative p-8 md:p-10 backdrop-blur-sm">
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
                  <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10 drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]">
                    411% Marine ROI Certification
                  </h1>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                {/* Enhanced ROI-focused stats with premium green styling */}
                <div className="relative mb-6">
                  {/* Enhanced green ambient glow for ROI section */}
                  <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                  <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                  
                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="bg-gray-900/60 rounded-lg p-3 text-center border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <CircleDollarSign className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">$1.84M</span>
                      <span className="text-blue-200 text-xs">Lifecycle Savings</span>
                    </div>
                    <div className="bg-gray-900/60 rounded-lg p-3 text-center border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <Settings className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">74%</span>
                      <span className="text-blue-200 text-xs">Maintenance Reduction</span>
                    </div>
                    <div className="bg-gray-900/60 rounded-lg p-3 text-center border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <Clock className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">30+</span>
                      <span className="text-blue-200 text-xs">Years Protection</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-white mb-4">
                  Our <span className="text-orange-300 font-semibold">high-performance ceramic coating systems</span> provide <span className="text-blue-300 font-semibold">excellent protection</span> in harsh saltwater environments with documented <span className="text-green-400 font-semibold">ASTM B117 salt spray resistance exceeding 2,000 hours</span>.
                </p>
                
                <div className="bg-black/30 border border-blue-600/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-100 italic">Previously classified ceramic microsphere technology, formerly exclusive to military and government vessels, now available to commercial marine applications</p>
                </div>
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
                  
                  <p className="mb-6 text-white text-lg">Find the right marine coating specification for your vessel or marine structure based on environmental exposure factors and operational requirements. Our Marine-Grade Certified coatings are engineered for optimal performance in the most demanding marine environments.</p>
                  
                  <div className="bg-gradient-to-br from-blue-900/20 via-blue-950/20 to-black/20 border border-blue-500/30 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-700/50 rounded-full p-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-blue-200 font-semibold">Marine-Grade Certified</h4>
                        <p className="text-white text-sm mt-1">Our coatings meet or exceed all marine certification requirements for marine applications, including salt spray resistance testing (ASTM B117, 2,000+ hours), adhesion, and impact resistance.</p>
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
                            Marine-Grade Certified
                            <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                          </span>
                        </h3>
                        <p className="text-white leading-relaxed">Our ceramic microsphere technology (US Patent <span className="text-blue-300 font-medium">#10,738,214</span>) is specifically formulated for marine applications, meeting stringent industry standards and all requirements for the harshest marine environments.</p>
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
                        <div className="relative group mb-6">
                          {/* Advanced layered glow effects */}
                          {/* Enhanced green ambient glow for ROI calculator section */}
                          <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                          <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                          
                          <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 border border-green-500/30 rounded-lg p-5 backdrop-blur-sm z-10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-2 
                                border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_10px_rgba(74,222,128,0.4)]">
                                <CircleDollarSign className="h-5 w-5 text-green-100" />
                              </div>
                              <h4 className="text-xl font-semibold">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                  Advanced Marine ROI Calculator
                                </span>
                              </h4>
                            </div>
                            
                            <p className="text-blue-100 mb-4">Calculate your 411% ROI potential with our government-grade marine protection system</p>
                            
                            <div className="grid grid-cols-1 gap-5 mb-6">
                              <div className="relative group">
                                <div className="absolute -inset-4 bg-green-500/20 rounded-xl blur-lg opacity-40 z-0"></div>
                                <div className="relative bg-gray-900/60 rounded-lg p-4 border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] z-10">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-300 font-semibold">Annual Maintenance Cost</span>
                                    <span className="text-green-400 font-semibold">$376,000</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-300 font-semibold">Cost After Coating</span>
                                    <span className="text-green-400 font-semibold">$98,000</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-300 font-semibold">Annual Savings</span>
                                    <span className="text-green-400 font-semibold">$278,000</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-blue-300 font-semibold">5-Year Savings</span>
                                    <span className="text-green-400 font-semibold">$1.39M</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="relative group">
                                <div className="absolute -inset-4 bg-green-500/20 rounded-xl blur-lg opacity-40 z-0"></div>
                                <div className="relative bg-gray-900/60 rounded-lg p-4 border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] z-10">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-300 font-semibold">Original Asset Lifespan</span>
                                    <span className="text-green-400 font-semibold">14 Years</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-300 font-semibold">Extended Lifespan</span>
                                    <span className="text-green-400 font-semibold">26.4 Years</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-300 font-semibold">Additional Service Life</span>
                                    <span className="text-green-400 font-semibold">+12.4 Years</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-blue-300 font-semibold">Lifecycle Savings</span>
                                    <span className="text-green-400 font-semibold">$1.84M</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="relative group">
                              <div className="absolute -inset-4 bg-green-500/20 rounded-xl blur-lg opacity-40 z-0"></div>
                              <div className="relative bg-gray-900/60 rounded-lg p-4 border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] z-10">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-blue-200 font-semibold">Total Investment</span>
                                  <span className="text-green-400 font-semibold">$450,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-blue-200 font-semibold">Total 5-Year Return</span>
                                  <span className="text-green-400 font-semibold">$1.84M</span>
                                </div>
                                <div className="mt-3 flex justify-center items-center">
                                  <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.5)] border border-green-400/40">
                                    <span className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}>411% ROI</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-green-600/40 via-green-500/30 to-green-600/40 rounded-lg blur-md opacity-80"></div>
                          <div className="relative">
                            <PremiumCartButton 
                              onClick={handleShowRegistrationForm} 
                              size="lg" 
                              className="w-full relative group border border-green-500/50"
                              variant="default"
                            >
                              <div className="flex items-center justify-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                <span>Calculate 411% ROI For Your Marina</span>
                              </div>
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
                            <div className="flex items-center justify-center gap-2">
                              <CircleDollarSign className="h-5 w-5" />
                              <span>{registerMutation.isPending ? "Submitting..." : "Get Your 411% ROI Analysis"}</span>
                            </div>
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
        
        {/* Marina Business ROI Analysis Section */}
        <section className="py-16 relative z-10">
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
                  Marina Business Investment Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Marina Industry Challenges</h3>
                    
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 p-6 rounded-lg border border-red-500/20 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Critical Business Issues
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Constant environmental exposure</span> - Marina structures face extreme UV, salt water corrosion, and moisture 24/7/365
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Frequent repainting cycles</span> - Traditional marine coatings require full reapplication every 2-5 years
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Operational disruption</span> - Each maintenance cycle requires dock closures, lost slip revenue, and customer inconvenience
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Environmental compliance costs</span> - Traditional marine paints have high VOC levels requiring special handling and disposal
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian Marina Solutions
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">20+ year performance longevity</span> - Verified resistance to salt spray for 10,000+ hours with 156% elastomeric flexibility
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Lower total application cost</span> - Single application system replaces multiple primer/marine paint layers
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Reduced operational downtime</span> - Up to 75% less maintenance-related closure days over 20-year lifecycle
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Zero VOC environmental compliance</span> - Qualifies for green marina certifications with water-based formulation
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                      <Ship className="h-5 w-5 text-blue-400 mr-2" />
                      Marina Operation Profitability Analysis
                    </h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Medium Size Marina <span className="text-sm text-blue-300">(100 slips, 15,000 sq ft of structures)</span></h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">20-Year Lifecycle Comparison</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Traditional coating lifecycle cost:</span>
                            <span className="text-white font-medium">$783,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Praetorian system lifecycle cost:</span>
                            <span className="text-white font-medium">$185,200</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Direct maintenance savings:</span>
                            <span className="text-green-400 font-semibold">$598,300</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Operational Revenue Impact</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Reduced downtime revenue gain:</span>
                            <span className="text-white font-medium">$412,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Customer satisfaction premium:</span>
                            <span className="text-white font-medium">$128,000</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Total 20-Year Business Impact:</span>
                            <span className="text-green-400 font-semibold">$1,138,300</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center text-blue-300 text-sm">
                          <span className="font-semibold">Annualized ROI: 307%</span> | Payback period: 3.1 years
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Competitive Advantages <span className="text-sm text-blue-300">(Business Impact)</span></h4>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Maintenance staff allocation reduction:</span>
                          <span className="text-white font-semibold">62.5%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" style={{ width: "62.5%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Slip availability rate increase:</span>
                          <span className="text-white font-semibold">8.3%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" style={{ width: "8.3%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Environmental certification impact:</span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/20">
                          <div className="flex items-center">
                            <Anchor className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-200">
                              <span className="font-semibold text-white">Premium positioning:</span> Marinas with Praetorian systems command 12-15% higher slip rates and maintain higher occupancy
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
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Request Marina Business Analysis</span>
                        <span className="relative invisible">Request Marina Business Analysis</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    Our marina coating systems are engineered to withstand all marine environments from tropical to northern waters. Schedule a free consultation to receive a customized business impact report for your specific facility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            {/* NEW SECTION: Marina-Specific Comfort Benefits */}
            <div className="relative mb-20">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 via-orange-500/10 to-blue-500/15 rounded-2xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
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
              
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg blur-sm"></div>
                  <h2 className="text-3xl font-bold text-white relative drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                    <span className="inline-block relative">
                      Superior Marina Comfort & Performance
                      <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"></div>
                    </span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                          <span className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-2 mt-1 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                            <Sun className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                            <span className="relative inline-block">
                              Cool-to-Touch Technology
                              <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                            </span>
                          </h3>
                          <p className="text-white leading-relaxed">
                            Our coatings reduce surface temperatures by <span className="text-blue-300 font-medium">up to 40°F</span> compared to untreated surfaces, preventing the scorching heat that can burn bare feet on docks and marina surfaces. This revolutionary thermal regulation creates comfortable walking surfaces even in the most intense direct sunlight.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                          <span className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-2 mt-1 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                            <Waves className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                            <span className="relative inline-block">
                              Anti-Slip Surface Technology
                              <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                            </span>
                          </h3>
                          <p className="text-white leading-relaxed">
                            Our specialized formula creates a textured, non-slip surface with a <span className="text-blue-300 font-medium">coefficient of friction exceeding 0.6</span> even when wet, significantly reducing slip-and-fall accidents while maintaining comfort for bare feet. The proprietary ceramic microtexture provides maximum grip without the rough, abrasive feeling of traditional non-slip coatings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-orange-600/20 rounded-full blur-md"></div>
                          <span className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-full p-2 mt-1 relative border border-orange-400/30 shadow-lg shadow-orange-900/20">
                            <ShieldCheck className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                            <span className="relative inline-block">
                              Prevents Splinter Formation
                              <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent"></div>
                            </span>
                          </h3>
                          <p className="text-white leading-relaxed">
                            Our coating creates a durable membrane that seals wooden dock surfaces, preventing splinter formation while preserving the natural wood texture. This protective barrier <span className="text-orange-300 font-medium">extends the lifespan of wooden docks by 300%</span> while providing a smooth, comfortable walking surface for marina visitors.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-orange-600/20 rounded-full blur-md"></div>
                          <span className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-full p-2 mt-1 relative border border-orange-400/30 shadow-lg shadow-orange-900/20">
                            <Zap className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                            <span className="relative inline-block">
                              Marina Electrical Safety
                              <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent"></div>
                            </span>
                          </h3>
                          <p className="text-white leading-relaxed">
                            Our ceramic-based coatings provide protective properties for marina components, offering an additional layer against environmental exposure. This protective barrier is especially valuable in wet environments where infrastructure is exposed to saltwater and harsh weather conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-blue-800/30 pt-8">
                  <p className="text-white text-center">
                    Our specialized marina coatings have been independently tested and verified by the <span className="text-blue-300 font-medium">Marine Safety Institute</span> to provide unmatched comfort and safety in commercial and recreational marine environments.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70"></div>
                      <div className="relative">
                        <PremiumCartButton 
                          size="lg"
                          className="px-10 py-6 text-lg"
                        >
                          Request Marina-Specific Consultation
                        </PremiumCartButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Marina Solutions Section Title */}
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

                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg blur-sm"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white relative drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                      <span className="inline-block relative">
                        Marine Application Solutions
                        <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"></div>
                      </span>
                    </h2>
                  </div>
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
                  <p className="text-gray-300 mb-6 flex-grow">Engineered for commercial vessels and marine structures with heavy use patterns. Our Marine-Grade Certified coatings extend maintenance cycles and reduce downtime while cutting operational costs.</p>
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