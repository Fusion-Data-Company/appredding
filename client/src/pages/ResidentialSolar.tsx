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
  Sun, 
  Battery, 
  Award, 
  AlertTriangle, 
  Building, 
  TrendingUp
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

type ResidentialSolarFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const ResidentialSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Residential Solar";
  const slug = "residential-solar";
  const pageTitle = "Advance Power Redding – Residential Solar Installation";
  const pageDescription = "Professional residential solar installations in Redding, CA. Save money on energy bills with custom solar solutions designed for Northern California homes.";

  // Setup form for consultation form
  const form = useForm<ResidentialSolarFormValues>({
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
    mutationFn: async (data: ResidentialSolarFormValues) => {
      return await apiRequest("/api/fire-prevention/consultation", {
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

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };

  const onSubmit = (data: ResidentialSolarFormValues) => {
    consultationMutation.mutate(data);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Residential Solar Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Advance Power Redding",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Redding",
        "addressRegion": "CA"
      }
    },
    "description": pageDescription,
    "areaServed": "Redding, California"
  };

  return (
    <MainLayout>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-black">
        {/* SANDLER STAGE 0: OPENING - BLUE GLOW SECTION - Introduction */}
        <section className="relative z-10 pt-20 pb-12 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative">
              {/* Enhanced Blue glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-blue-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-blue-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-blue-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content within the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-blue-700/30 shadow-lg p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left column with text content */}
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300">
                          Residential Solar Installation
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-200">
                          Advance Power Redding
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          Professional solar installations for Northern California homes. Our founder brings decades of expertise in renewable energy systems, helping Redding families achieve energy independence with premium solar solutions.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-200">25-Year Warranty</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-200">Licensed & Insured</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Sun className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-200">Tier 1 Solar Panels</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-200">Local Expertise</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                          onClick={handleShowConsultationForm}
                        >
                          <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                            Get Free Quote
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
                    </motion.div>
                    
                    {/* Right column with image */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="lg:w-full"
                    >
                      <div className="relative">
                        {/* Premium image container with decorative elements */}
                        <div className="relative rounded-2xl overflow-hidden border border-blue-700/30 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/80 mix-blend-overlay z-10"></div>
                          
                          {/* Hero Image */}
                          <img 
                            src="/advance-power-logo.jpg" 
                            alt="Advance Power Redding - Professional solar installation company" 
                            className="w-full h-auto max-h-[500px] object-contain object-center bg-white p-8"
                          />
                          
                          {/* Premium overlay elements */}
                          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                          
                          {/* Image caption */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                            <p className="text-sm text-gray-300 text-center">Professional residential solar installation in Redding, CA</p>
                          </div>
                        </div>
                        
                        {/* Stats overlay */}
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                          <p className="text-blue-400 font-semibold">Average Savings</p>
                          <p className="text-3xl font-bold text-white">30-50%</p>
                          <p className="text-xs text-gray-400">*On monthly energy bills</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
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
                  Rising Energy Costs Are Crushing Homeowners
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Skyrocketing Utility Bills</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">California electricity rates increased 47% over the past 5 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Average Redding household pays $200+ monthly for electricity</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Peak hour rates can exceed $0.50/kWh during summer months</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Energy Dependency Risks</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Grid instability during extreme weather events</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Planned power shutoffs affecting thousands annually</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Limited control over energy costs and availability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="text-center bg-gradient-to-r from-red-900/20 to-red-800/20 p-6 rounded-lg border border-red-700/30">
                  <p className="text-xl font-semibold text-red-200 mb-2">The Average Redding Family Spends Over $2,400 Annually on Electricity</p>
                  <p className="text-gray-300">That's money leaving your pocket forever, with rates only getting higher each year.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 2: TECHNICAL - YELLOW GLOW SECTION - Solution Details */}
        <section className="relative z-10 pt-20 pb-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Yellow glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-yellow-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-yellow-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-yellow-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-transparent border border-yellow-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300">
                  Professional Solar Technology Solutions
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300">Premium Equipment & Installation</h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/40">
                        <h4 className="font-semibold text-yellow-200 mb-2">Tier 1 Solar Panels</h4>
                        <p className="text-gray-300">High-efficiency monocrystalline panels with 25-year manufacturer warranties</p>
                      </div>
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/40">
                        <h4 className="font-semibold text-yellow-200 mb-2">Smart Inverter Technology</h4>
                        <p className="text-gray-300">Optimized power conversion with real-time monitoring capabilities</p>
                      </div>
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/40">
                        <h4 className="font-semibold text-yellow-200 mb-2">Professional Installation</h4>
                        <p className="text-gray-300">Licensed electricians with specialized solar training and certification</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300">Custom System Design</h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/40">
                        <h4 className="font-semibold text-yellow-200 mb-2">Site Assessment</h4>
                        <p className="text-gray-300">Comprehensive evaluation of roof condition, shading, and energy needs</p>
                      </div>
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/40">
                        <h4 className="font-semibold text-yellow-200 mb-2">Engineering Design</h4>
                        <p className="text-gray-300">Custom layouts optimized for maximum energy production and efficiency</p>
                      </div>
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/40">
                        <h4 className="font-semibold text-yellow-200 mb-2">Permitting & Inspections</h4>
                        <p className="text-gray-300">Complete handling of all local permits and required inspections</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-500/15 p-6 rounded-lg border border-yellow-400/50">
                  <h3 className="text-xl font-bold text-yellow-200 mb-4 text-center">Why Choose Advance Power Redding?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-yellow-200 mb-2">Local Expertise</h4>
                      <p className="text-gray-300 text-sm">Deep understanding of Northern California climate and regulations</p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-yellow-200 mb-2">Quality Guarantee</h4>
                      <p className="text-gray-300 text-sm">Premium materials with comprehensive warranties and insurance</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-yellow-200 mb-2">Full Service</h4>
                      <p className="text-gray-300 text-sm">From initial consultation through post-installation support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 3: BENEFITS - GREEN GLOW SECTION - Savings & Benefits */}
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-green-300">Financial Benefits</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 p-4 rounded-lg border border-green-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-green-200">Monthly Savings</h4>
                          <span className="text-2xl font-bold text-green-400">$80-200</span>
                        </div>
                        <p className="text-gray-300">Typical reduction in monthly electricity bills</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 p-4 rounded-lg border border-green-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-green-200">25-Year Savings</h4>
                          <span className="text-2xl font-bold text-green-400">$40,000+</span>
                        </div>
                        <p className="text-gray-300">Total estimated savings over system lifetime</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 p-4 rounded-lg border border-green-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-green-200">Home Value Increase</h4>
                          <span className="text-2xl font-bold text-green-400">4-6%</span>
                        </div>
                        <p className="text-gray-300">Typical increase in property value</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-green-300">Additional Benefits</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-200 mb-1">30% Federal Tax Credit</h4>
                          <p className="text-gray-300">Significant reduction in system cost through federal incentives</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-200 mb-1">Net Energy Metering</h4>
                          <p className="text-gray-300">Sell excess power back to the grid for additional credits</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-200 mb-1">Energy Independence</h4>
                          <p className="text-gray-300">Reduce dependency on volatile utility rates and grid outages</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-200 mb-1">Environmental Impact</h4>
                          <p className="text-gray-300">Reduce carbon footprint equivalent to planting 150+ trees annually</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 p-6 rounded-lg border border-green-700/40 text-center">
                  <h3 className="text-2xl font-bold text-green-200 mb-3">ROI Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-green-400 mb-1">Year 1</p>
                      <p className="text-gray-300">Immediate 30-50% bill reduction</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-400 mb-1">6-8 Years</p>
                      <p className="text-gray-300">Complete system payback</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-400 mb-1">25+ Years</p>
                      <p className="text-gray-300">Continued free electricity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 4: REGISTRATION - PURPLE GLOW SECTION - Call to Action */}
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
                  Start Your Solar Journey Today
                </h2>
                
                {!showConsultationForm ? (
                  <div className="text-center space-y-6">
                    <p className="text-xl text-gray-300 mb-8">
                      Join hundreds of satisfied Redding homeowners who have made the switch to solar with Advance Power Redding.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-lg border border-purple-700/30">
                        <FileCheck className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-purple-200 mb-2">Free Consultation</h3>
                        <p className="text-gray-300">No-obligation assessment of your home's solar potential</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-lg border border-purple-700/30">
                        <Calculator className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-purple-200 mb-2">Custom Quote</h3>
                        <p className="text-gray-300">Personalized system design and accurate cost projections</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-lg border border-purple-700/30">
                        <Award className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-purple-200 mb-2">Professional Installation</h3>
                        <p className="text-gray-300">Expert installation with comprehensive warranty coverage</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleShowConsultationForm}
                      className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg"
                    >
                      <span className="relative z-10">Get Your Free Solar Quote</span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                    
                    <p className="text-gray-400 text-sm">
                      ✓ No sales pressure ✓ Custom system design ✓ Accurate savings projections
                    </p>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    {consultationRequestSuccess ? (
                      <div className="text-center space-y-4">
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
                        <h3 className="text-2xl font-bold text-green-300">Request Submitted Successfully!</h3>
                        <p className="text-gray-300">
                          Thank you for your interest in solar energy. An Advance Power Redding specialist will contact you within 24 hours to schedule your free consultation.
                        </p>
                        <Button 
                          onClick={() => {
                            setShowConsultationForm(false);
                            setConsultationRequestSuccess(false);
                          }}
                          variant="outline"
                          className="border-gray-600 text-purple-400 hover:text-purple-300 hover:border-purple-500"
                        >
                          Close
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-2xl font-bold text-purple-300 mb-6 text-center">Request Your Free Solar Consultation</h3>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Full Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                                    <FormLabel className="text-purple-200">Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                                    <FormLabel className="text-purple-200">Phone</FormLabel>
                                    <FormControl>
                                      <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                                    <FormLabel className="text-purple-200">Property Type</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Single Family, Townhome, etc." className="bg-gray-800 border-gray-700 text-white" />
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
                                  <FormLabel className="text-purple-200">Property Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                                  <FormLabel className="text-purple-200">Additional Information</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      {...field} 
                                      className="bg-gray-800 border-gray-700 text-white"
                                      placeholder="Tell us about your energy goals, current electricity bill, or any specific questions..."
                                      rows={4}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex gap-4">
                              <Button 
                                type="submit" 
                                disabled={consultationMutation.isPending}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white"
                              >
                                {consultationMutation.isPending ? "Submitting..." : "Request Free Consultation"}
                              </Button>
                              <Button 
                                type="button"
                                variant="outline"
                                onClick={() => setShowConsultationForm(false)}
                                className="border-gray-600 text-purple-400 hover:text-purple-300 hover:border-purple-500"
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ResidentialSolar;