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
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with fire theme */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(154, 52, 18, 0.6) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-4] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(153, 27, 27, 0.5) 0%, rgba(15, 23, 42, 0) 70%)'
        }}></div>
        
        {/* Advanced multi-color ambient glow effects with fire accent */}
        <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none">
          {/* Blue glow */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          
          {/* Orange/Red glow for fire theme */}
          <div className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-orange-500/20 rounded-full blur-[150px] animate-pulse-slower"></div>
          <div className="absolute -bottom-10 left-1/3 w-[700px] h-[700px] bg-orange-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-red-700/5 rounded-full blur-[100px] animate-pulse-slower"></div>
          
          {/* Green accent glows for balance */}
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] bg-emerald-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          
          {/* Purple accent for depth */}
          <div className="absolute top-[70%] left-[50%] w-[20rem] h-[20rem] bg-purple-700/5 rounded-full blur-[90px] animate-pulse-slow"></div>
        </div>
        
        {/* Low-opacity subtle pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ff7700\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Section-specific ambient blue glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-blue-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-blue-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Ultra-premium Elite Enterprise Header Container - front layer with high z-index */}
              <div className="relative z-20 rounded-2xl overflow-hidden transform transition-all duration-700 group hover:scale-[1.005] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] border border-blue-700/30">
                {/* Premium multi-layered background with depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-blue-900/30 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>
                
                {/* Premium fire-themed background elements */}
                <div className="absolute inset-0 opacity-40 z-0 mix-blend-overlay" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    backgroundSize: '80px 80px'
                  }}
                ></div>
                
                {/* Fire-themed particles in header */}
                <div className="absolute inset-0 mix-blend-overlay opacity-10 z-0" 
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 0.5%)",
                    backgroundSize: "8px 8px"
                  }}>
                </div>
                
                {/* Advanced animated light sweep effects with multiple layers */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] animate-light-sweep" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-orange-300/20 to-transparent skew-x-[-25deg] animate-light-sweep" style={{ animationDelay: '4s' }}></div>
                </div>
                
                {/* 3D edge highlight effect for depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                
                {/* Enhanced Header content with premium homepage-style styling */}
                <div className="relative z-20 p-10 flex flex-col items-center text-center">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-md"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 left-1 w-18 h-18 border-t border-l border-blue-600/40 rounded-tl-lg"></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-md"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-400/70 rounded-tr-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 right-1 w-18 h-18 border-t border-r border-blue-600/40 rounded-tr-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-br-md"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/70 rounded-br-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 right-1 w-18 h-18 border-b border-r border-blue-600/40 rounded-br-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-400/70 rounded-bl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 left-1 w-18 h-18 border-b border-l border-blue-600/40 rounded-bl-lg"></div>
                  </div>
                
                  <div className="relative p-8 md:p-10 backdrop-blur-sm">
                    {/* Ultra-premium enterprise header with layered effects */}
                    <div className="relative mb-8">
                      {/* Premium Cinematic Enterprise Header Container */}
                      <div className="relative py-8 px-6 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 
                        border-b-2 border-orange-500/60 border-t border-t-orange-400/30 rounded-lg mb-4
                        shadow-[0_10px_50px_rgba(234,88,12,0.15),inset_0_1px_20px_rgba(234,88,12,0.05)]">
                        
                        {/* Metallic corner accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                          <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                          <div className="absolute top-0 left-0 h-12 w-1 bg-gradient-to-b from-orange-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                          <div className="absolute top-0 right-0 w-12 h-1 bg-gradient-to-l from-orange-500 to-transparent rounded-full"></div>
                          <div className="absolute top-0 right-0 h-12 w-1 bg-gradient-to-b from-orange-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                          <div className="absolute bottom-0 left-0 h-12 w-1 bg-gradient-to-t from-orange-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-l from-orange-500 to-transparent rounded-full"></div>
                          <div className="absolute bottom-0 right-0 h-12 w-1 bg-gradient-to-t from-orange-500 to-transparent rounded-full"></div>
                        </div>
                        
                        {/* Premium subtle glow effects */}
                        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-orange-500/5 rounded-full blur-xl"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
                        
                        {/* Cinematic metallic header with layered elements */}
                        <div className="relative z-10">
                          {/* Top badge */}
                          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 via-orange-600/20 to-orange-500/20 border border-orange-500/30 shadow-lg mb-4 backdrop-blur-sm">
                            <Shield className="h-5 w-5 mr-2 text-orange-400" />
                            <span className="text-orange-100 font-medium text-sm">Advanced Fire Protection Technology</span>
                          </div>
                          
                          {/* Enterprise-grade headline with gradient accent */}
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-white">
                            Ultimate Fire <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Prevention</span> Solutions
                          </h1>
                          
                          {/* Enhanced premium subheadline with vibrant color accent */}
                          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-blue-50/90 leading-relaxed">
                            Advanced ceramic coating technology protecting what matters most with <span className="text-orange-300 font-semibold">99.8% fire resistance</span>
                          </p>
                          
                          {/* Refined feature highlight row with premium styling */}
                          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Fireproof Protection</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Advanced Formula</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">15-Year Warranty</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Save on Insurance</span>
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
              {/* Section-specific ambient red glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-red-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-red-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  The High Cost of Being Unprepared
                </h2>
                
                {/* Fire statistics with dramatic styling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-red-950/30 border border-red-800/30">
                    <div className="text-4xl font-bold text-red-400 mb-2">$25.4B</div>
                    <div className="text-gray-300">Annual wildfire damage costs in the United States</div>
                  </div>
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-red-950/30 border border-red-800/30">
                    <div className="text-4xl font-bold text-red-400 mb-2">72,400+</div>
                    <div className="text-gray-300">Structures destroyed by wildfires in the last decade</div>
                  </div>
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-red-950/30 border border-red-800/30">
                    <div className="text-4xl font-bold text-red-400 mb-2">96%</div>
                    <div className="text-gray-300">Of homes with standard protection fail in wildfires</div>
                  </div>
                </div>
                
                {/* Dramatic fire danger visualization section */}
                <div className="relative rounded-xl overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-red-900/30 via-orange-800/20 to-red-900/30 p-6 border border-red-700/30">
                    <h3 className="text-2xl font-semibold mb-4 text-orange-100">Critical Fire Danger Zones</h3>
                    <p className="text-gray-300 mb-6">Homes in wildland-urban interface areas face up to <span className="text-red-400 font-semibold">70x higher risk</span> of total loss during fire events. Traditional building materials provide minimal protection against extreme heat conditions.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg">
                        <Home className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-orange-100">Structural Vulnerability</h4>
                          <p className="text-sm text-gray-400">Standard materials combust at 451°F, but wildfires reach 1,500°F+</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 bg-black/30 p-4 rounded-lg">
                        <Map className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-orange-100">Expanded Risk Areas</h4>
                          <p className="text-sm text-gray-400">Climate change has expanded high-risk zones by 46% in the last decade</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expert quote section */}
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-black/80 to-red-950/20 border border-red-700/20">
                  <div className="absolute -top-2 -left-2 text-4xl text-red-500 opacity-40">"</div>
                  <div className="absolute -bottom-2 -right-2 text-4xl text-red-500 opacity-40">"</div>
                  <p className="italic text-gray-300 mb-4">Without advanced protection, homeowners in fire-prone areas are essentially gambling with their life's investments. Modern protective technology is no longer optional - it's essential for survival.</p>
                  <div className="flex items-center">
                    <div className="ml-auto">
                      <p className="text-orange-200 font-medium">Dr. Michael Reynolds</p>
                      <p className="text-xs text-gray-400">Director, Fire Safety Research Institute</p>
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
              {/* Section-specific ambient green glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-green-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-emerald-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  Superior Return on Investment
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Cost savings breakdown */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">Financial Benefits</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Insurance Premium Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">15-28%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Energy Cost Savings</span>
                        </div>
                        <span className="text-emerald-400 font-bold">21-35%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Property Value Increase</span>
                        </div>
                        <span className="text-emerald-400 font-bold">8-12%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Tax Benefits/Credits</span>
                        </div>
                        <span className="text-emerald-400 font-bold">$2,500+</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* ROI calculator preview */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">Calculate Your ROI</h3>
                    
                    <div className="space-y-5">
                      <p className="text-gray-300">Our fire-resistant coating delivers an average <span className="text-emerald-400 font-bold">1,390% ROI</span> over 15 years when accounting for energy savings, insurance reductions, and property value increase.</p>
                      
                      <div className="relative">
                        <div className="p-5 rounded-lg bg-black/40">
                          <h4 className="font-medium text-emerald-100 mb-3">Sample ROI Analysis</h4>
                          
                          <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div className="text-gray-400">Initial Investment:</div>
                            <div className="text-gray-300 font-medium">$12,500</div>
                            
                            <div className="text-gray-400">Annual Savings:</div>
                            <div className="text-gray-300 font-medium">$2,680</div>
                            
                            <div className="text-gray-400">15-Year Returns:</div>
                            <div className="text-emerald-400 font-bold">$40,200</div>
                            
                            <div className="text-gray-400">ROI Percentage:</div>
                            <div className="text-emerald-400 font-bold">1,390%</div>
                          </div>
                        </div>
                        
                        {/* Pricing Indicator Badge */}
                        <div className="absolute -top-5 -right-5 w-20 h-20 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"></div>
                          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white w-14 h-14 rounded-full border-2 border-emerald-400/50 shadow-lg flex items-center justify-center text-sm font-bold">
                            Save<br/>23%
                          </div>
                        </div>
                      </div>
                      
                      {/* Call-to-action for ROI calculator */}
                      <div className="mt-5">
                        <Button 
                          onClick={handleShowRegistrationForm}
                          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white border border-emerald-500/50"
                        >
                          <Calculator className="mr-2 h-4 w-4" />
                          Calculate Your Custom ROI
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Certification and Trust Indicators */}
                <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                  <h3 className="text-xl font-semibold mb-4 text-center text-emerald-200">Trusted and Certified Protection</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <Shield className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">UL Fire Resistance Certified</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <FileCheck className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">EPA Approved Materials</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <Zap className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">Energy Star Partner</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <Home className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">Insurance Provider Approved</span>
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
              {/* Section-specific ambient purple glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-violet-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-purple-300">
                  Next Steps to Ultimate Protection
                </h2>
                
                {/* Decision facilitator */}
                <div className="mb-8">
                  <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">Implementing our premium fire protection is a simple process designed to provide maximum security with minimal disruption to your life.</p>
                  
                  {/* Process steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                      {/* Step indicator */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-200">Free Consultation</h3>
                      <p className="text-gray-400 mb-4">Schedule a personalized analysis of your property's specific fire risks and protection needs.</p>
                      <div className="flex items-center text-purple-400 text-sm">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>No obligation assessment</span>
                      </div>
                    </div>
                    
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                      {/* Step indicator */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-200">Customized Protection Plan</h3>
                      <p className="text-gray-400 mb-4">Receive a tailored solution based on your property's specific structure, environment, and budget considerations.</p>
                      <div className="flex items-center text-purple-400 text-sm">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>Detailed ROI analysis included</span>
                      </div>
                    </div>
                    
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                      {/* Step indicator */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-200">Professional Installation</h3>
                      <p className="text-gray-400 mb-4">Our certified technicians apply the revolutionary coating with minimal disruption to your daily routine.</p>
                      <div className="flex items-center text-purple-400 text-sm">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>Most installations complete in 1-2 days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Final CTA Section with Form Toggle */}
                {!showRegistrationForm ? (
                  <div className="rounded-xl p-8 bg-gradient-to-br from-black/80 to-purple-900/20 border border-purple-700/30 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-white">Ready to Protect What Matters Most?</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Take the first step toward complete fire protection and significant energy savings with our advanced ceramic coating technology.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <PremiumCartButton 
                        size="lg" 
                        onClick={handleShowRegistrationForm}
                        variant="gold"
                        className="relative group px-6 py-3"
                      >
                        <div className="flex items-center">
                          <Shield className="mr-2 h-5 w-5" />
                          <span>Schedule Free Consultation</span>
                        </div>
                      </PremiumCartButton>
                    </div>
                  </div>
                ) : registrationSuccess ? (
                  <div className="rounded-xl p-8 bg-gradient-to-br from-black/80 to-green-900/20 border border-green-700/30 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">Registration Successful!</h3>
                      <p className="text-gray-300 mb-6">Thank you for taking the first step toward ultimate fire protection. One of our fire prevention specialists will contact you within 24 hours to schedule your free consultation.</p>
                      <Button
                        onClick={() => setShowRegistrationForm(false)}
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                      >
                        Return to Fire Prevention Information
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="rounded-xl p-8 bg-gradient-to-br from-black/80 to-purple-900/20 border border-purple-700/30">
                    <h3 className="text-2xl font-bold mb-6 text-white text-center">Schedule Your Free Fire Protection Consultation</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Contact Information */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-purple-200 mb-3">Contact Information</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="First Name" {...field} />
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
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Email Address" {...field} />
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
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Phone Number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                      <Input placeholder="City" {...field} />
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
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                      <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          {/* Property Information */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-purple-200 mb-3">Property Information</h4>
                            
                            <FormField
                              control={form.control}
                              name="propertyType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Property Type</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Property Type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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
                                  <FormLabel>Property Size (sq ft)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Square Footage" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="vegetationDensity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Surrounding Vegetation</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Vegetation Density" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="low">Low (Urban Area)</SelectItem>
                                      <SelectItem value="medium">Medium (Suburban)</SelectItem>
                                      <SelectItem value="high">High (Rural/Wooded)</SelectItem>
                                      <SelectItem value="extreme">Extreme (Wildland Interface)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="previousFireDamage"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Previous Fire Damage</FormLabel>
                                    <p className="text-sm text-gray-400">
                                      Has your property experienced fire damage previously?
                                    </p>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        {/* Additional Information */}
                        <FormField
                          control={form.control}
                          name="additionalDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Information</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please share any specific concerns or questions about fire protection for your property."
                                  className="h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Terms and Agreement */}
                        <FormField
                          control={form.control}
                          name="agreesToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>I agree to the terms and privacy policy</FormLabel>
                                <p className="text-sm text-gray-400">
                                  By submitting this form, you agree to be contacted about fire protection solutions.
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        {/* Submit Button */}
                        <div className="flex justify-center">
                          <Button 
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-2 rounded-lg w-full md:w-auto"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? "Processing..." : "Schedule Free Consultation"}
                          </Button>
                        </div>
                      </form>
                    </Form>
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

export default FirePrevention;