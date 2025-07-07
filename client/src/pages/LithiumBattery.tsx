import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  CheckCircle, 
  Shield, 
  Home, 
  ChevronRight, 
  FileCheck, 
  Zap, 
  CircleDollarSign, 
  BarChart3, 
  Calculator, 
  Battery, 
  Sun, 
  Award, 
  AlertTriangle, 
  Building, 
  TrendingUp,
  Thermometer,
  Wrench,
  Settings,
  Layers,
  Power
} from "lucide-react";

// Import the lithium battery service images
import solarInstallImage from "@assets/13-500x500.jpg";
import batteryBankImage from "@assets/20210121_103322-400x400.jpg";
import inverterSystemImage from "@assets/98453708_3165453150160953_3940467511501258752_n-298x400.jpg";
import installationTeamImage from "@assets/400617335_882191187089939_3988264444007076062_n-500x375.jpg";
import solarFarmImage from "@assets/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-500x375.jpg";
import batteryStorageImage from "@assets/Batt-3-300x400.jpg";
import advancePowerLogo from "/advance-power-logo.jpg";
import technicianImage from "@assets/Greg-with-panel.jpg";
import solArkSystemImage from "@assets/491844865_1271014964874224_7004732250107002194_n.jpg";
import energyConservationImage from "@assets/Advance-Power-Redding-Energy-Conservation-Techniques.jpg";
import solarPanelsAerialImage from "@assets/guillherme-schneider-ecIS-bfYSG8-unsplash-300x400.jpg";
import forestSolarImage from "@assets/moritz-kindler-gD8IO0E4OZM-unsplash-267x400.jpg";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

type LithiumBatteryFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const LithiumBattery = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Lithium Battery";
  const slug = "lithium-battery";
  const pageTitle = "Advance Power Redding – Lithium Battery Services";
  const pageDescription = "Advanced lithium-ion battery technology offering efficient and long-lasting energy storage solutions. 10-year warranty, maintenance-free operation in all temperatures.";
  const heroImagePath = "/src/assets_dir/images/optimized/praetorian-background-new.png";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/lithium-battery-hero.jpg"
    ]);
  }, []);

  // Setup form for consultation form
  const form = useForm<LithiumBatteryFormValues>({
    resolver: zodResolver(insertFirePreventionHomeownerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      message: ""
    },
  });

  // Mutation for consultation form
  const consultationMutation = useMutation({
    mutationFn: async (data: LithiumBatteryFormValues) => {
      return await apiRequest("/api/lithium-battery/consultation", {
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
      setConsultationRequestSuccess(true);
      form.reset();
      toast({
        title: "Request Submitted",
        description: "We've received your consultation request and will contact you shortly.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LithiumBatteryFormValues) => {
    consultationMutation.mutate(data);
  };

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };

  return (
    <MainLayout fullWidth={true}>
      {/* Enhanced SEO Head with structured data and improved metadata */}
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry={industry}
        slug={slug}
        imagePath={heroImagePath}
        keywords={getIndustryKeywords(slug, [
          'lithium battery storage',
          'solar battery backup',
          'energy storage systems',
          'LiFePO4 batteries',
          'backup power solutions'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Lithium Battery Storage",
          "Solar Battery Systems",
          "Energy Storage Solutions",
          "Backup Power Systems"
        ])}
      />
      
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with battery theme */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.6) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-3] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 64, 175, 0.5) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        {/* Subtle animated grid overlay */}
        <div className="fixed inset-0 z-[-2] opacity-10 bg-[url('/src/assets_dir/images/grid-pattern.svg')] bg-repeat"></div>

        {/* SANDLER STAGE 0: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left column with text content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative">
                  {/* Blue glow effect with multi-layered design */}
                  <div className="absolute -inset-10 bg-blue-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
                  <div className="absolute -inset-20 bg-blue-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                  <div className="absolute -inset-30 bg-blue-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
                  
                  {/* Content card with premium effects */}
                  <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-blue-700/30 shadow-lg">
                    {/* Premium corner accents */}
                    <div className="absolute bottom-1 left-1 w-12 h-12 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                    <div className="absolute bottom-1 right-1 w-12 h-12 border-b border-r border-blue-500/30 rounded-br-md"></div>
                    <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                    <div className="absolute top-1 right-1 w-12 h-12 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">
                      Lithium Battery Services
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power Redding offers advanced lithium-ion battery technology delivering efficient and long-lasting energy storage solutions. Our lithium battery systems come with a 10-year warranty and require no maintenance, operating efficiently in all temperatures.
                      </p>
                      <p className="text-lg">
                        These systems are far superior to lead acid batteries - they're more efficient, last longer, and can be added to existing solar or new systems for reliable backup power storage.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Battery className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">10-Year Warranty</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">All-Temperature Operation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Maintenance-Free</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                          Get Battery Quote
                        </span>
                        <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-gray-600 text-blue-400 hover:text-blue-300 hover:border-blue-500"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right column with image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  {/* Premium image container with decorative elements */}
                  <div className="relative rounded-2xl overflow-hidden border border-blue-700/30 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/80 mix-blend-overlay z-10"></div>
                    
                    {/* Hero Image */}
                    <img 
                      src="/src/assets_dir/images/lithium-battery-hero.jpg" 
                      alt="Lithium battery storage system by Advance Power Redding" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/src/assets_dir/images/optimized/praetorian-background-new.png";
                      }}
                    />
                    
                    {/* Premium overlay elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                      <p className="text-sm text-gray-300 text-center">Advanced lithium battery system with intelligent management for reliable energy storage</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Cycle Life</p>
                    <p className="text-3xl font-bold text-white">10,000+<sup className="text-blue-300 text-xs">*</sup></p>
                    <p className="text-xs text-gray-400">*Charge cycles</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 1: PAIN - RED GLOW SECTION - Critical Problems */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Red glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-red-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-red-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-red-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-200 to-red-300">
                  Lead Acid Battery Problems & Failures
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Lead Acid Battery Issues</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Frequent corrosion problems requiring constant maintenance and water level checks</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Performance degrades dramatically in cold or hot weather conditions</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Short lifespan of 3-5 years requiring frequent expensive replacements</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Only 50% depth of discharge without damaging the battery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Poor Energy Storage Performance</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Low efficiency means you lose 20-30% of stored energy during charging/discharging</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Slow charging speeds can't keep up with solar production</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Heavy weight requires reinforced mounting and installation complications</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Toxic materials pose environmental and health risks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-red-300 text-center">The True Cost of Outdated Battery Technology</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CircleDollarSign className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-red-400 font-bold text-xl">$15,000+</p>
                      <p className="text-gray-300 text-sm">Replacement costs over 10 years</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-red-400 font-bold text-xl">30%</p>
                      <p className="text-gray-300 text-sm">Energy lost to inefficiency</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-red-400 font-bold text-xl">Monthly</p>
                      <p className="text-gray-300 text-sm">Maintenance required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
          
        {/* SANDLER STAGE 2: TECH SOLUTION - YELLOW GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Yellow/Amber glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-amber-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-amber-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-amber-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-amber-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                  Advanced Lithium Battery Technology
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">LiFePO4 Lithium Iron Phosphate Technology</h3>
                    <p className="text-gray-300 mb-6">
                      Our proprietary APR Battery systems use advanced lithium iron phosphate (LiFePO4) technology with intelligent Battery Management Systems (BMS). These batteries deliver superior performance, safety, and longevity compared to any other battery technology available today.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Battery className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">95%+</p>
                        <p className="text-center text-sm text-gray-400">Round-trip Efficiency</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Shield className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">100%</p>
                        <p className="text-center text-sm text-gray-400">Depth of Discharge</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Thermometer className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">-20°F to 140°F</p>
                        <p className="text-center text-sm text-gray-400">Operating Range</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">*Based on APR Battery System specifications with integrated BMS technology</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-amber-300">APR Battery System Features</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Battery Chemistry</span>
                      <span className="text-white font-medium">LiFePO4 Lithium Iron Phosphate</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Maintenance Required</span>
                      <span className="text-white font-medium">Zero - completely maintenance-free</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Cycle Life</span>
                      <span className="text-white font-medium">10,000+ cycles (20+ years)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Warranty</span>
                      <span className="text-white font-medium">10 years performance guarantee</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Safety Features</span>
                      <span className="text-white font-medium">Built-in BMS with thermal protection</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Installation</span>
                      <span className="text-white font-medium">Indoor/outdoor, any orientation</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Expandability</span>
                      <span className="text-white font-medium">Modular - add capacity anytime</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-300">Environmental Impact</span>
                      <span className="text-white font-medium">Non-toxic, fully recyclable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YELLOW SECTION - Lithium Battery Services Gallery */}
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Yellow glow effect */}
              <div className="absolute -inset-10 bg-yellow-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-yellow-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-yellow-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-yellow-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300">
                  Professional Lithium Battery Services
                </h2>
                
                {/* Solar Installation & Battery Integration */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">Ground-Mount Solar with Battery Storage</h3>
                      <p className="text-gray-300 mb-4">
                        Professional ground-mount solar installations designed to maximize energy production while integrating seamlessly with our advanced lithium battery storage systems. These installations provide optimal positioning for year-round energy generation.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Sun className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Optimized panel positioning for maximum efficiency</span>
                        </div>
                        <div className="flex items-center">
                          <Battery className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Integrated lithium battery backup systems</span>
                        </div>
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Professional engineering and installation</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={solarInstallImage} 
                        alt="Ground-mount solar installation with lithium battery integration" 
                        className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 text-yellow-300 px-2 py-1 rounded text-xs">
                        Professional Installation
                      </div>
                    </div>
                  </div>
                </div>

                {/* Battery Bank Systems */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <img 
                        src={batteryBankImage} 
                        alt="Lithium battery bank configuration and wiring" 
                        className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-yellow-300 px-2 py-1 rounded text-xs">
                        LiFePO4 Technology
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">Advanced Battery Bank Configuration</h3>
                      <p className="text-gray-300 mb-4">
                        Our lithium battery banks utilize advanced LiFePO4 technology with intelligent wiring configurations for optimal performance and safety. Each installation includes professional-grade battery management systems.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Layers className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Modular battery bank design</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Built-in safety management systems</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Professional installation and testing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inverter & System Integration */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">Inverter Systems & Grid Integration</h3>
                      <p className="text-gray-300 mb-4">
                        Advanced inverter systems that seamlessly integrate solar generation, battery storage, and grid connectivity. Our systems provide intelligent power management and backup capabilities during outages.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Power className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Grid-tie with battery backup capability</span>
                        </div>
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Intelligent load management</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Automatic transfer switch integration</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={inverterSystemImage} 
                        alt="Advanced inverter system with grid integration" 
                        className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-yellow-300 px-2 py-1 rounded text-xs">
                        Grid-Tie System
                      </div>
                    </div>
                  </div>
                </div>

                {/* Installation Team & Service */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <img 
                        src={installationTeamImage} 
                        alt="Professional installation team working on lithium battery system" 
                        className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-yellow-300 px-2 py-1 rounded text-xs">
                        Expert Installation
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">Professional Installation Services</h3>
                      <p className="text-gray-300 mb-4">
                        Our certified installation team brings years of experience in lithium battery system deployment. We handle every aspect from site preparation to final system commissioning and testing.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Certified installation technicians</span>
                        </div>
                        <div className="flex items-center">
                          <FileCheck className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Complete system testing and commissioning</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-300">Local permits and inspections handled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commercial Scale Projects */}
                <div className="mb-12">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-300">Commercial & Utility Scale Battery Integration</h3>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                      From residential installations to large-scale commercial and utility projects, our lithium battery solutions scale to meet any energy storage requirement. Our systems integrate seamlessly with existing solar farms and new installations.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <img 
                        src={solarFarmImage} 
                        alt="Commercial scale solar farm with battery integration capabilities" 
                        className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/80 text-yellow-300 px-2 py-1 rounded text-xs">
                        Utility Scale
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={solarPanelsAerialImage} 
                        alt="Aerial view of commercial solar installation with battery storage" 
                        className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-yellow-300 px-2 py-1 rounded text-xs">
                        Commercial Grade
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <Button 
                    className="relative group overflow-hidden bg-gradient-to-r from-yellow-600 to-yellow-700 border border-yellow-500 hover:border-yellow-400 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                    onClick={handleShowConsultationForm}
                  >
                    <span className="relative z-10 text-white group-hover:text-yellow-100 transition-colors duration-300">
                      Get Professional Battery Consultation
                    </span>
                    <span className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
          
        {/* SANDLER STAGE 3: BUDGET - GREEN GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Green glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-green-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-green-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-green-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-200 to-green-300">
                  Superior Value & Long-Term Savings
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Financial Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Lower Total Cost of Ownership</h4>
                            <p className="text-gray-300">20+ year lifespan means you buy once instead of replacing lead acid batteries 4-5 times over the same period.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Maximum Energy Utilization</h4>
                            <p className="text-gray-300">95%+ efficiency means virtually no energy loss during storage, maximizing your solar investment and reducing grid dependence.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Zero Maintenance Costs</h4>
                            <p className="text-gray-300">No water additions, corrosion cleaning, or regular maintenance visits - saving hundreds in annual service costs.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Performance Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Reliable Backup Power</h4>
                            <p className="text-gray-300">Instant response during outages with consistent power delivery regardless of weather conditions or temperature.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Future-Proof Technology</h4>
                            <p className="text-gray-300">Compatible with smart home systems, expandable capacity, and ready for emerging energy technologies.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Environmental Responsibility</h4>
                            <p className="text-gray-300">Non-toxic, fully recyclable materials with minimal environmental impact throughout the product lifecycle.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Real Customer Success Stories</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Off-Grid Cabin</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          APR 40kWh lithium system replacing failed lead acid bank. After 3 years, zero maintenance performed with 99.2% system availability. Owner saves $2,000 annually vs. previous lead acid replacement costs.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Uptime: 99.2%</span>
                          <span className="text-green-400">Maintenance: $0</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Marina Facility</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Commercial-scale APR battery system powering critical marina operations. System has operated flawlessly for 5 years with 98.8% efficiency maintained throughout all seasons.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Efficiency: 98.8%</span>
                          <span className="text-green-400">Years: 5+ trouble-free</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="relative group overflow-hidden bg-black border border-green-400 hover:border-green-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                    onClick={handleShowConsultationForm}
                  >
                    <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Battery Savings
                    </span>
                    <span className="absolute -inset-[3px] bg-green-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 4: DECISION - PURPLE GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Purple glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-purple-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-purple-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-purple-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
                  Upgrade to Premium Battery Technology
                </h2>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md max-w-3xl mx-auto mb-8">
                    <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Why Choose APR Lithium Battery Systems</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Proprietary APR Battery technology with integrated BMS</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">10-year performance warranty with local support</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Custom sizing for your specific energy needs</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Compatible with new or existing solar systems</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Professional installation and system integration</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Remote monitoring and diagnostic capabilities</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Modular expansion for future capacity needs</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">We don't quit until everything works perfectly</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300 flex items-center">
                          Get Lithium Battery Quote
                        </span>
                        <span className="absolute -inset-[3px] bg-purple-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GREEN SECTION - Additional Battery Services & Systems */}
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Green glow effect */}
              <div className="absolute -inset-10 bg-green-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-green-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-green-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-200 to-green-300">
                  Advanced Battery Storage Solutions
                </h2>
                
                {/* Battery Storage Systems */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-green-300">Modular Battery Storage Banks</h3>
                      <p className="text-gray-300 mb-4">
                        Our modular lithium battery storage systems provide scalable energy solutions that grow with your needs. These high-capacity storage banks deliver reliable backup power for residential and commercial applications.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Battery className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Stackable modular design for easy expansion</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Built-in safety and monitoring systems</span>
                        </div>
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">High-efficiency charge/discharge cycles</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={batteryStorageImage} 
                        alt="Modular lithium battery storage bank system" 
                        className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 text-green-300 px-2 py-1 rounded text-xs">
                        Modular Design
                      </div>
                    </div>
                  </div>
                </div>

                {/* Residential Solar Integration */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <img 
                        src={advancePowerLogo} 
                        alt="Advance Power Redding - Professional solar installation company" 
                        className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg bg-white p-4"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-green-300 px-2 py-1 rounded text-xs">
                        Residential Integration
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <h3 className="text-2xl font-bold mb-4 text-green-300">Residential Solar & Battery Integration</h3>
                      <p className="text-gray-300 mb-4">
                        Seamless integration of rooftop solar panels with lithium battery storage systems for maximum energy independence. Our residential solutions provide clean energy generation and reliable backup power.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Home className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Custom residential system design</span>
                        </div>
                        <div className="flex items-center">
                          <Sun className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Optimized solar panel placement</span>
                        </div>
                        <div className="flex items-center">
                          <Battery className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Integrated battery backup systems</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expert Installation Services */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-green-300">Expert Installation & Service</h3>
                      <p className="text-gray-300 mb-4">
                        Our certified technicians bring decades of experience in solar and battery installation. We handle complex installations including high-elevation work and specialized mounting systems for optimal performance.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Certified installation professionals</span>
                        </div>
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Specialized equipment and techniques</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Safety-first installation protocols</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={technicianImage} 
                        alt="Certified technician performing solar panel installation" 
                        className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-green-300 px-2 py-1 rounded text-xs">
                        Expert Service
                      </div>
                    </div>
                  </div>
                </div>

                {/* SolArk & Advanced Systems */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <img 
                        src={solArkSystemImage} 
                        alt="SolArk hybrid inverter system with lithium battery integration" 
                        className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-green-300 px-2 py-1 rounded text-xs">
                        SolArk System
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <h3 className="text-2xl font-bold mb-4 text-green-300">SolArk Hybrid Inverter Systems</h3>
                      <p className="text-gray-300 mb-4">
                        Advanced SolArk hybrid inverter systems that seamlessly manage solar generation, battery storage, and grid connectivity. These intelligent systems provide automatic switching and load management for maximum efficiency.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Power className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Hybrid grid-tie and off-grid capability</span>
                        </div>
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Intelligent load management</span>
                        </div>
                        <div className="flex items-center">
                          <Layers className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-gray-300">Integrated monitoring and control</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy Conservation Integration */}
                <div className="mb-12">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-green-300">Complete Energy Conservation Solutions</h3>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                      Our lithium battery systems integrate perfectly with comprehensive energy conservation techniques including radiant barrier installation, solar attic fans, and high-efficiency HVAC systems for maximum energy savings.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <img 
                        src={energyConservationImage} 
                        alt="Energy conservation techniques including radiant barrier and solar attic fans" 
                        className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/80 text-green-300 px-2 py-1 rounded text-xs">
                        Energy Conservation
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={forestSolarImage} 
                        alt="Sustainable solar installation integrated with natural environment" 
                        className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-green-300 px-2 py-1 rounded text-xs">
                        Sustainable Solutions
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <Button 
                    className="relative group overflow-hidden bg-gradient-to-r from-green-600 to-green-700 border border-green-500 hover:border-green-400 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                    onClick={handleShowConsultationForm}
                  >
                    <span className="relative z-10 text-white group-hover:text-green-100 transition-colors duration-300">
                      Schedule Battery System Consultation
                    </span>
                    <span className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Free Consultation Form */}
        {showConsultationForm && !consultationRequestSuccess && (
          <section className="relative z-10 py-12 overflow-hidden">
            <div className="container mx-auto mb-16">
              <div className="relative">
                {/* Blue glow for form */}
                <div className="absolute -inset-10 bg-blue-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
                <div className="absolute -inset-20 bg-blue-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                
                {/* Content card */}
                <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-blue-700/30 shadow-lg max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">
                    Get Your Battery Storage Consultation
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-center">
                    Complete the form below, and our energy storage specialists will contact you within 24 hours to discuss your battery needs and design the perfect storage solution.
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your name" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
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
                              <FormLabel className="text-gray-200">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your email" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your phone number" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
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
                              <FormLabel className="text-gray-200">Application Type</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Home, Business, Off-grid, etc." 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Installation Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Property address for battery system" 
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Current System & Storage Goals</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your existing solar system (if any), current battery setup, and what you hope to achieve with lithium battery storage" 
                                className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-center">
                        <Button 
                          type="submit"
                          className="relative group overflow-hidden bg-black border border-blue-400 hover:border-blue-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          disabled={consultationMutation.isPending}
                        >
                          <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                            {consultationMutation.isPending ? "Submitting..." : "Get Battery Storage Quote"}
                          </span>
                          <span className="absolute -inset-[3px] bg-blue-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Consultation Request Success */}
        {consultationRequestSuccess && (
          <section className="relative z-10 py-12 overflow-hidden">
            <div className="container mx-auto mb-16">
              <div className="relative">
                {/* Green success glow */}
                <div className="absolute -inset-10 bg-green-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
                <div className="absolute -inset-20 bg-green-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                
                {/* Content card */}
                <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-500/30 shadow-lg max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">
                    Battery Storage Quote Request Received!
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Thank you for your interest in lithium battery storage with Advance Power Redding. Our energy storage specialists will contact you within 24 hours to discuss your backup power needs and design the perfect battery solution.
                  </p>
                  <p className="text-gray-300 mb-8 text-center">
                    We'll analyze your energy usage and backup requirements to recommend the optimal APR Battery system for your needs.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400">
                      View Hybrid Systems
                    </Button>
                    <Button variant="outline" className="border-blue-500 text-blue-400 hover:text-blue-300 hover:border-blue-400">
                      Return to Home Page
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default LithiumBattery;