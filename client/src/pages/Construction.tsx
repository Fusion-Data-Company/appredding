import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { HardHat, ShieldCheck, Building, Hammer, CheckCircle, Warehouse, CircleDollarSign, TrendingUp } from "lucide-react";
import { insertConstructionDistributorSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { z } from "zod";

type ConstructionDistributorFormValues = z.infer<typeof insertConstructionDistributorSchema>;

const Construction = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Form setup for construction distributor registration
  const form = useForm({
    resolver: zodResolver(insertConstructionDistributorSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      businessType: "retailer", // Default value
      foundedYear: 0,
      employeeCount: 0,
      annualRevenue: "",
      coverageAreas: [],
      productCategories: [],
      certifications: [],
      distributionCapabilities: "",
      marketingPreference: "",
      additionalNotes: ""
    },
  });

  // Submit handler
  const onSubmit = (data: ConstructionDistributorFormValues) => {
    registrationMutation.mutate(data);
  };

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: async (data: ConstructionDistributorFormValues) => {
      const response = await apiRequest("POST", "/api/constructiondistributors", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your distributor application has been submitted.",
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

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Premium background */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0d0d15 0%, #131930 30%, #182240 60%, #101b2c 100%)'
        }}></div>
        
        {/* Background glow elements */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Section glow */}
              <div className="absolute -inset-10 bg-blue-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Header container */}
              <div className="relative z-20 rounded-2xl overflow-hidden shadow-lg border border-blue-700/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                
                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-lg"></div>
                  <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-blue-600/40 rounded-tl-md"></div>
                </div>
                
                <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
                  {/* Multi-layered glowing corner effect */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-md"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-400/70 rounded-tr-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <div className="absolute top-1 right-1 w-18 h-18 border-t border-r border-blue-600/40 rounded-tr-lg"></div>
                  
                  {/* Animated corner accent with pulsing glow */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '4.2s' }}></div>
                  
                  {/* Animated light ray accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-lg">
                    <div className="absolute top-0 right-0 w-[200%] h-[1px] bg-gradient-to-l from-transparent via-blue-400/80 to-transparent translate-x-full animate-shimmer-slow"></div>
                    <div className="absolute top-0 right-0 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-blue-400/80 to-transparent -translate-y-full animate-shimmer-slow" style={{ animationDelay: '1.2s' }}></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 w-20 h-20 z-20 pointer-events-none">
                  {/* Multi-layered glowing corner effect */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-br-md"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/70 rounded-br-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <div className="absolute bottom-1 right-1 w-18 h-18 border-b border-r border-blue-600/40 rounded-br-lg"></div>
                  
                  {/* Animated corner accent with pulsing glow */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '4s' }}></div>
                  
                  {/* Animated light ray accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden rounded-br-lg">
                    <div className="absolute bottom-0 right-0 w-[200%] h-[1px] bg-gradient-to-l from-transparent via-blue-400/80 to-transparent translate-x-full animate-shimmer-slow"></div>
                    <div className="absolute bottom-0 right-0 h-[200%] w-[1px] bg-gradient-to-t from-transparent via-blue-400/80 to-transparent translate-y-full animate-shimmer-slow" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
                  {/* Multi-layered glowing corner effect */}
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-bl-md"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-400/70 rounded-bl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <div className="absolute bottom-1 left-1 w-18 h-18 border-b border-l border-blue-600/40 rounded-bl-lg"></div>
                  
                  {/* Animated corner accent with pulsing glow */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '3.2s' }}></div>
                  
                  {/* Animated light ray accent */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 overflow-hidden rounded-bl-lg">
                    <div className="absolute bottom-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer-slow"></div>
                    <div className="absolute bottom-0 left-0 h-[200%] w-[1px] bg-gradient-to-t from-transparent via-blue-400/80 to-transparent translate-y-full animate-shimmer-slow" style={{ animationDelay: '0.7s' }}></div>
                  </div>
                </div>
                
                {/* Ultra-premium multilayered border effect with dynamic lighting */}
                <div className="absolute inset-0 rounded-xl border border-blue-600/20 shadow-[inset_0_0_30px_rgba(59,130,246,0.1)] pointer-events-none"></div>
                <div className="absolute inset-[3px] rounded-lg border border-blue-500/10 pointer-events-none"></div>
                <div className="absolute inset-[6px] rounded-md border border-white/5 pointer-events-none"></div>
                
                {/* Advanced dynamic glass shimmer effects for ultra-premium look */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  {/* Multiple layered shimmer effects with varying speeds and angles */}
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute" style={{ animationDuration: '3s' }}></div>
                  <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent skew-x-[-15deg] animate-shimmer-slow absolute" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                  <div className="h-full w-1/5 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent skew-x-[-25deg] animate-shimmer-slow absolute" style={{ animationDuration: '3.5s', animationDelay: '2s' }}></div>
                </div>
                
                {/* Header content */}
                <div className="relative z-10 p-8 md:p-12">
                  <div className="max-w-5xl mx-auto text-center">
                    {/* Premium badge */}
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 border border-blue-500/30 shadow-lg mb-6 backdrop-blur-sm">
                      <HardHat className="h-5 w-5 mr-2 text-blue-400" />
                      <span className="text-blue-100 font-medium text-sm">CONSTRUCTION DISTRIBUTION</span>
                    </div>
                    
                    {/* Title */}
                    <div className="mb-8">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                        Praetorian For Construction Professionals
                      </h1>
                      <p className="text-xl text-blue-200/90 max-w-3xl mx-auto">
                        Advanced ceramic protective coatings for construction applications with breakthrough performance and profit margins
                      </p>
                    </div>
                    
                    {/* Feature list */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <ShieldCheck className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Premium Performance</h3>
                          <p className="text-gray-300">Ceramic-based coating technology that delivers exceptional durability, fire resistance and energy efficiency in a single system.</p>
                        </div>
                      </div>
                      
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <Building className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Commercial-Grade</h3>
                          <p className="text-gray-300">Formulated specifically for commercial construction with extreme adhesion to concrete, metal, EIFS, and composite materials.</p>
                        </div>
                      </div>
                      
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <Hammer className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Contractor-Friendly</h3>
                          <p className="text-gray-300">Single-component system with straightforward application that integrates into existing contractor workflows without specialized equipment.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 2: PAIN - RED GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Red glow */}
              <div className="absolute -inset-10 bg-red-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-lg">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  Construction Industry Challenges
                </h2>
                
                {/* Pain points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center border border-red-600/30">
                          <TrendingUp className="h-6 w-6 text-red-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Rising Material Costs</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Construction material costs have increased 26% in the last year</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Traditional protective coating systems require multiple products</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center border border-red-600/30">
                          <CircleDollarSign className="h-6 w-6 text-red-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Project Timeline Pressure</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Traditional coatings require multiple applications with long cure times</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Weather delays impact project timelines with seasonal application limits</span>
                          </li>
                        </ul>
                      </div>
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
              {/* Green glow */}
              <div className="absolute -inset-10 bg-green-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-lg">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  Distributor Benefits
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Margin and Revenue benefits */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-green-900/70 rounded-lg border border-green-700/40 mr-3">
                          <CircleDollarSign className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Exceptional Profit Margins</h3>
                      </div>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">1</div>
                          <div>
                            <p className="text-green-200 font-medium">40-45% Distribution Margin</p>
                            <p className="text-gray-400 text-sm">Industry-leading margins compared to 25-30% with traditional coatings</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">2</div>
                          <div>
                            <p className="text-green-200 font-medium">Exclusive Territory Rights</p>
                            <p className="text-gray-400 text-sm">Protected geographic exclusivity with minimum annual purchase requirements</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Statistics */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative">
                      <h3 className="text-xl font-semibold text-white mb-4 text-center">Distribution Network</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-4 bg-black/40 rounded-lg">
                          <Warehouse className="h-10 w-10 text-green-400 mb-2" />
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">28+</p>
                            <p className="text-gray-400 text-sm">Exclusive Distributors</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 bg-black/40 rounded-lg">
                          <Building className="h-10 w-10 text-green-400 mb-2" />
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">1.2M+</p>
                            <p className="text-gray-400 text-sm">Square Feet Covered</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 bg-black/40 rounded-lg">
                          <TrendingUp className="h-10 w-10 text-green-400 mb-2" />
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">42%</p>
                            <p className="text-gray-400 text-sm">Annual Growth Rate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 4: DECISION - PURPLE GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto pb-16">
            <div className="relative">
              {/* Purple glow */}
              <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-lg">
                <div className="max-w-4xl mx-auto">
                  {showRegistrationForm ? (
                    registrationSuccess ? (
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20 blur-xl animate-pulse-slow"></div>
                          <div className="relative h-24 w-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">Distributor Application Submitted</h3>
                        <p className="text-lg text-gray-300 mb-6">Thank you for your interest in becoming a Praetorian Smart-Coat construction distributor. Our team will review your information and contact you shortly.</p>
                        
                        <div className="mt-6">
                          <div className="rounded-lg p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 mb-6">
                            <h4 className="text-green-400 font-semibold mb-2">What happens next?</h4>
                            <ul className="space-y-3 text-left">
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">1</span>
                                <span className="text-gray-300">A Praetorian Distribution Manager will contact you within 24 hours</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">2</span>
                                <span className="text-gray-300">We'll schedule a virtual meeting to discuss distributor benefits and requirements</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <PremiumCartButton 
                            onClick={() => setRegistrationSuccess(false)} 
                            size="lg"
                          >
                            Return to Construction Page
                          </PremiumCartButton>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center mb-8">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                            Register as a Construction Distributor
                          </h2>
                          <p className="text-purple-200 mb-2">Join our growing network of high-performance building solution providers</p>
                        </div>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Company Information */}
                              <div>
                                <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Company Information</h3>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Company Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Acme Construction Solutions" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="businessType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Business Type</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="bg-gray-900/70 border-purple-800/30">
                                              <SelectValue placeholder="Select business type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="retailer">Retailer</SelectItem>
                                            <SelectItem value="distributor">Distributor</SelectItem>
                                            <SelectItem value="contractor">Contractor</SelectItem>
                                            <SelectItem value="manufacturer">Manufacturer</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Contact Information */}
                              <div>
                                <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="contactName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Contact Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="John Smith" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                        <FormLabel className="text-gray-300">Email</FormLabel>
                                        <FormControl>
                                          <Input placeholder="john@acmeconstruction.com" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                                <Button
                                  type="button"
                                  onClick={() => setShowRegistrationForm(false)}
                                  className="w-full md:w-auto order-2 md:order-1 border border-purple-500/30 hover:bg-purple-900/20 text-purple-200"
                                  variant="outline"
                                >
                                  Cancel
                                </Button>
                                
                                <PremiumCartButton
                                  type="submit"
                                  className="w-full md:w-auto order-1 md:order-2"
                                  disabled={registrationMutation.isPending}
                                >
                                  {registrationMutation.isPending ? (
                                    <>
                                      <span className="animate-spin mr-2">⟳</span>
                                      Processing...
                                    </>
                                  ) : "Submit Distributor Application"}
                                </PremiumCartButton>
                              </div>
                            </div>
                          </form>
                        </Form>
                      </div>
                    )
                  ) : (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                        Become a Praetorian Distributor Today
                      </h2>
                      
                      <div className="relative group bg-gradient-to-br from-black/80 to-gray-900/80 border border-purple-700/30 rounded-xl p-6 mb-8">
                        <div className="absolute -inset-px bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        <div className="relative">
                          <h3 className="text-xl text-center font-semibold text-white mb-6">Join Our Industry-Leading Network</h3>
                          
                          <div className="text-center mt-6">
                            <PremiumCartButton 
                              size="lg" 
                              onClick={() => setShowRegistrationForm(true)}
                              className="text-lg"
                            >
                              Apply to Become a Distributor
                            </PremiumCartButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Construction;