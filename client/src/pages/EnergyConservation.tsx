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
  Leaf, 
  Lightbulb, 
  Award, 
  AlertTriangle, 
  Building, 
  TrendingUp,
  ThermometerSun
} from "lucide-react";
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

type EnergyConservationFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const EnergyConservation = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Energy Conservation";
  const slug = "energy-conservation";
  const pageTitle = "Advance Power Redding – Energy Conservation Services";
  const pageDescription = "Help reduce energy costs and boost efficiency with customized solar solutions and system upgrades. Comprehensive energy audits, LED lighting, HVAC optimization and more.";
  const heroImagePath = "/src/assets_dir/images/optimized/praetorian-background-new.png";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/energy-conservation-hero.jpg"
    ]);
  }, []);

  // Setup form for consultation form
  const form = useForm<EnergyConservationFormValues>({
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
    mutationFn: async (data: EnergyConservationFormValues) => {
      return await apiRequest("/api/energy-conservation/consultation", {
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

  const onSubmit = (data: EnergyConservationFormValues) => {
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
          'energy efficiency services',
          'energy conservation consulting',
          'LED lighting upgrades',
          'HVAC optimization',
          'energy audits'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Energy Efficiency Services",
          "Energy Conservation Consulting",
          "LED Lighting Upgrades",
          "HVAC Optimization"
        ])}
      />
      
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with conservation theme */}
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
                      Energy Conservation Services
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power Redding helps reduce energy costs and boost efficiency with customized solar solutions and comprehensive system upgrades. Our energy conservation services include home energy audits, LED lighting upgrades, HVAC optimizations, and other measures to dramatically cut usage.
                      </p>
                      <p className="text-lg">
                        We position ourselves not just as a solar installer but a comprehensive energy solutions provider dedicated to maximizing your energy savings and efficiency.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Energy Audits</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">LED Upgrades</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ThermometerSun className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">HVAC Optimization</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                          Get Energy Audit
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
                      src="/src/assets_dir/images/energy-conservation-hero.jpg" 
                      alt="Energy conservation and efficiency services by Advance Power Redding" 
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
                      <p className="text-sm text-gray-300 text-center">Comprehensive energy efficiency upgrades reducing consumption and costs</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Efficiency Gain</p>
                    <p className="text-3xl font-bold text-white">30-50%<sup className="text-blue-300 text-xs">*</sup></p>
                    <p className="text-xs text-gray-400">*Energy savings</p>
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
                  Energy Waste Is Draining Your Budget
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Inefficient Energy Systems</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Outdated HVAC systems waste 20-40% of energy through poor efficiency</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Old incandescent and CFL lighting consumes 5x more energy than LED alternatives</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Poor insulation allows 30-50% of heating and cooling energy to escape</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Phantom loads from electronics can add $200+ annually to electric bills</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Hidden Energy Drains</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Inefficient water heating accounts for 18% of home energy consumption</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Air leaks and drafts force HVAC systems to work overtime year-round</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Outdated appliances use 40-60% more energy than Energy Star certified models</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Poor energy habits waste thousands of dollars annually without awareness</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-red-300 text-center">The Real Cost of Energy Inefficiency</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CircleDollarSign className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-red-400 font-bold text-xl">$2,000+</p>
                      <p className="text-gray-300 text-sm">Annual waste typical home</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-red-400 font-bold text-xl">40%</p>
                      <p className="text-gray-300 text-sm">Energy lost to inefficiency</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-red-400 font-bold text-xl">10+ Years</p>
                      <p className="text-gray-300 text-sm">Until typical upgrades</p>
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
                  Comprehensive Energy Conservation Solutions
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">Complete Energy Efficiency Services</h3>
                    <p className="text-gray-300 mb-6">
                      Our comprehensive energy conservation program combines advanced diagnostics with proven efficiency upgrades. We start with detailed energy audits to identify waste, then implement targeted solutions that deliver immediate and long-term savings while improving comfort and performance.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Leaf className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">30-50%</p>
                        <p className="text-center text-sm text-gray-400">Energy Reduction</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Lightbulb className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">80%</p>
                        <p className="text-center text-sm text-gray-400">LED Efficiency Gain</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <ThermometerSun className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">25%</p>
                        <p className="text-center text-sm text-gray-400">HVAC Optimization</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">*Based on comprehensive energy efficiency upgrade programs and industry standards</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-amber-300">Energy Conservation Services</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Energy Audits</span>
                      <span className="text-white font-medium">Comprehensive home energy assessment</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">LED Lighting</span>
                      <span className="text-white font-medium">Complete LED conversion & smart controls</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">HVAC Optimization</span>
                      <span className="text-white font-medium">System tuning & efficiency upgrades</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Insulation Upgrades</span>
                      <span className="text-white font-medium">Attic, wall & air sealing improvements</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Smart Controls</span>
                      <span className="text-white font-medium">Programmable thermostats & automation</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Water Heating</span>
                      <span className="text-white font-medium">Efficient water heater upgrades</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Appliance Consulting</span>
                      <span className="text-white font-medium">Energy Star appliance recommendations</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-300">Monitoring</span>
                      <span className="text-white font-medium">Energy usage tracking & optimization</span>
                    </div>
                  </div>
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
                  Immediate Savings & Long-Term Benefits
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Financial Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Immediate Bill Reduction</h4>
                            <p className="text-gray-300">Most efficiency upgrades show immediate results, reducing monthly electric bills by 30-50% right away.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Fast Payback Period</h4>
                            <p className="text-gray-300">Energy conservation upgrades typically pay for themselves in 2-4 years through reduced utility costs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Rebates & Incentives</h4>
                            <p className="text-gray-300">Utility rebates and tax credits can cover 30-70% of efficiency upgrade costs, accelerating your return on investment.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Comfort & Performance Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Improved Comfort</h4>
                            <p className="text-gray-300">Better insulation and HVAC efficiency eliminate hot/cold spots and maintain consistent temperatures year-round.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Enhanced Home Value</h4>
                            <p className="text-gray-300">Energy efficient homes sell faster and for higher prices, with efficiency upgrades adding significant resale value.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Environmental Impact</h4>
                            <p className="text-gray-300">Reduce your carbon footprint by 20-40% while contributing to cleaner air and a healthier environment.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Real Energy Conservation Success Stories</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Redding Family Home</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Complete efficiency upgrade including LED conversion, HVAC optimization, and smart controls. Family reduced electric bills from $380 to $180 monthly while improving comfort.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Monthly Savings: $200</span>
                          <span className="text-green-400">Payback: 2.8 years</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Anderson Office Building</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          LED lighting retrofit and HVAC controls upgrade reduced energy consumption by 45% while improving workspace lighting quality and employee comfort.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Energy Reduction: 45%</span>
                          <span className="text-green-400">Annual Savings: $8,400</span>
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
                      Calculate Efficiency Savings
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
                  Start Saving Energy Today
                </h2>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md max-w-3xl mx-auto mb-8">
                    <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Why Choose Advance Power Redding for Energy Conservation</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Comprehensive energy solutions provider since 1999</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Certified energy auditors and efficiency specialists</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Custom solutions designed for your specific needs</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Professional installation and project management</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Help securing rebates and incentive programs</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Ongoing monitoring and optimization services</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Integration with solar and battery systems</span>
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
                          Get Energy Conservation Quote
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
                    Get Your Energy Conservation Consultation
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-center">
                    Complete the form below, and our energy efficiency specialists will contact you within 24 hours to discuss your conservation goals and schedule your energy audit.
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
                              <FormLabel className="text-gray-200">Property Type</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Home, Business, etc." 
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
                            <FormLabel className="text-gray-200">Property Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Property address for energy audit" 
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
                            <FormLabel className="text-gray-200">Current Energy Bills & Efficiency Goals</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your current electric bills, energy usage concerns, and what you hope to achieve with energy conservation services" 
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
                            {consultationMutation.isPending ? "Submitting..." : "Get Energy Audit Quote"}
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
                    Energy Conservation Quote Request Received!
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Thank you for your interest in energy conservation with Advance Power Redding. Our efficiency specialists will contact you within 24 hours to discuss your energy savings goals and schedule your comprehensive energy audit.
                  </p>
                  <p className="text-gray-300 mb-8 text-center">
                    We'll identify the most cost-effective improvements to reduce your energy consumption and costs.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400">
                      View Solar Solutions
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

export default EnergyConservation;