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
        {/* Full-page fire background with advanced styling */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${fireBgImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Premium enterprise-elite gradient overlay with enhanced depth */}
        <div className="fixed inset-0 z-0 opacity-90" style={{ 
          background: 'linear-gradient(130deg, rgba(0,0,0,0.85) 0%, rgba(20,5,0,0.95) 45%, rgba(30,10,0,0.92) 70%, rgba(50,20,2,0.85) 100%)',
          mixBlendMode: 'multiply'
        }}></div>
        
        {/* Dynamic ember particle effect - subtle fire particles */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute -bottom-10 left-1/3 w-[700px] h-[700px] bg-orange-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-red-700/3 rounded-full blur-[100px] animate-pulse-slower"></div>
        </div>
        
        {/* Low-opacity carbon pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ff7700\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Main content section - optimized for mobile */}
        <section className="py-10 md:py-24 relative z-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20 relative">
              {/* Advanced enterprise-grade backdrop with layered effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-2xl border border-orange-500/30 shadow-[0_0_30px_rgba(234,88,12,0.15)]"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 via-blue-600/10 to-orange-600/20 rounded-2xl blur-xl opacity-70"></div>
              
              {/* Premium corner accents - enterprise elite style */}
              <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/60 rounded-tl-lg"></div>
                <div className="absolute top-1 left-1 w-14 h-14 border-t border-l border-blue-500/40 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-orange-500/60 rounded-tr-lg"></div>
                <div className="absolute top-1 right-1 w-14 h-14 border-t border-r border-blue-500/40 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-orange-500/60 rounded-bl-lg"></div>
                <div className="absolute bottom-1 left-1 w-14 h-14 border-b border-l border-blue-500/40 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-orange-500/60 rounded-br-lg"></div>
                <div className="absolute bottom-1 right-1 w-14 h-14 border-b border-r border-blue-500/40 rounded-br-lg"></div>
              </div>
              
              {/* Enhanced main content with premium padding */}
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
                      <div className="relative mb-3 inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-700/20 to-red-700/20 blur-sm rounded-full"></div>
                        <span className="relative inline-block px-4 py-1 rounded-full 
                          bg-gradient-to-r from-black/80 to-gray-900/80
                          border border-orange-500/40 text-sm font-semibold text-orange-300
                          shadow-[0_2px_10px_rgba(234,88,12,0.2)]">
                          PREVIOUSLY A GOVERNMENT RESOURCE
                        </span>
                      </div>
                      
                      {/* Main title with layered metal effect */}
                      <div className="overflow-hidden relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent rounded-lg"></div>
                        
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight
                          bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-300
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          Advanced Ceramic Fire-Resistant Coating System
                        </h1>
                        
                        {/* Multiple shimmer animations */}
                        <div className="absolute -inset-3/4 w-1/4 h-full bg-gradient-to-r from-transparent via-orange-500/20 to-transparent skew-x-[-20deg] animate-[shimmer_2.5s_infinite] pointer-events-none"></div>
                        <div className="absolute -inset-1/2 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite_0.5s] pointer-events-none"></div>
                      </div>
                    
                      {/* Premium metallic divider */}
                      <div className="relative h-2 max-w-xl mx-auto mb-6 overflow-hidden">
                        <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                        <div className="absolute inset-y-0 left-0 right-0 h-px top-0 bg-gradient-to-r from-transparent via-orange-500/90 to-transparent"></div>
                        <div className="absolute inset-y-0 left-0 right-0 h-px bottom-0 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"></div>
                      </div>
                      
                      {/* Tagline with premium styling */}
                      <p className="text-xl md:text-2xl mb-2 relative">
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                          Now available for civilian structures.
                        </span>
                      </p>
                      
                      {/* Subtle animated flame accent */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-6 pointer-events-none opacity-40">
                        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-orange-500/10 via-orange-400/5 to-transparent 
                          rounded-t-3xl animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sophisticated divider accents */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                {/* Enhanced Sandler Pain/Problem section with premium styling */}
                <div className="relative mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-red-600/20 rounded-xl blur-md opacity-80"></div>
                  
                  <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm">
                    {/* Pain point with enhanced typography and visual hierarchy */}
                    <p className="text-xl md:text-2xl text-white leading-relaxed font-medium mb-6">
                      <span className="text-orange-300 font-bold">California wildfire insurance challenges continue to increase</span> – with property values affected in high-risk zones and <span className="text-red-400">traditional fire protection methods requiring supplementation</span>. Our ceramic-based coating offers documented protection benefits:
                    </p>
                    
                    <div className="flex items-center mb-6">
                      <div className="h-6 w-1 bg-gradient-to-b from-orange-600 to-red-600 rounded-full mr-3"></div>
                      <p className="text-base text-gray-300">
                        The ceramic-based coating system has been used in <span className="text-blue-300">various industrial applications and infrastructure projects</span>. This advanced thermal protection technology is now available for residential and commercial property owners.
                      </p>
                    </div>
                    
                    {/* Enterprise-grade 4-column metrics with advanced styling */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-orange-600/40 rounded-lg p-4 text-center">
                          <span className="text-green-400 font-bold text-2xl md:text-3xl block mb-1">$18-27</span>
                          <span className="text-blue-100 text-sm">Per Sq.Ft. Value Gain</span>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-800/30 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-blue-600/40 rounded-lg p-4 text-center">
                          <span className="text-green-400 font-bold text-2xl md:text-3xl block mb-1">27%</span>
                          <span className="text-blue-100 text-sm">Insurance Premium Cut</span>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-orange-600/40 rounded-lg p-4 text-center">
                          <span className="text-green-400 font-bold text-2xl md:text-3xl block mb-1">85%</span>
                          <span className="text-blue-100 text-sm">Higher Survival Rate</span>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-800/30 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-blue-600/40 rounded-lg p-4 text-center">
                          <span className="text-green-400 font-bold text-2xl md:text-3xl block mb-1">1,390%</span>
                          <span className="text-blue-100 text-sm">5-Year ROI</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Wildfire Case Study */}
                    <div className="mt-6 bg-gradient-to-br from-gray-850/80 to-gray-900/80 border border-orange-500/30 rounded-lg p-6 relative overflow-hidden">
                      {/* Premium corner accents */}
                      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                      </div>
                      
                      {/* Background glow effect */}
                      <div className="absolute top-1/2 left-20 w-[250px] h-[250px] bg-orange-600/10 rounded-full blur-[90px] opacity-40 z-0"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-5">
                          <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-8 w-1 rounded-full mr-3"></div>
                          <h3 className="text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                            Case Study: California Wildfire Protection
                          </h3>
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            California has experienced numerous destructive wildfires in recent history, causing property damage in vulnerable areas. Our coating technology is designed to provide a layer of protection by meeting Class A fire rating standards (ASTM E108/UL 790) for exterior building surfaces in high-risk zones.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-900/50 rounded p-3">
                            <h5 className="text-orange-400 text-sm font-medium mb-1">Surface Temperature</h5>
                            <p className="text-2xl font-bold text-white">30°F</p>
                            <p className="text-xs text-gray-400">Average reduction</p>
                          </div>
                          <div className="bg-gray-900/50 rounded p-3">
                            <h5 className="text-blue-400 text-sm font-medium mb-1">Protection</h5>
                            <p className="text-xl font-bold text-white">Class A</p>
                            <p className="text-xs text-gray-400">Fire rating</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-900/50 rounded p-3">
                            <h5 className="text-blue-400 text-sm font-medium mb-1">Water Resistance</h5>
                            <p className="text-xl font-bold text-white">&lt; 0.5%</p>
                            <p className="text-xs text-gray-400">Water absorption</p>
                          </div>
                          <div className="bg-gray-900/50 rounded p-3">
                            <h5 className="text-green-400 text-sm font-medium mb-1">Property Protection</h5>
                            <p className="text-xl font-bold text-white">Improved</p>
                            <p className="text-xs text-gray-400">Building envelope</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-gradient-to-br from-blue-900/20 to-gray-900/20 border border-blue-600/10 rounded p-3 flex items-start">
                          <div className="text-blue-400 mr-2 mt-0.5 bg-gradient-to-br from-blue-700/90 to-blue-900/90 rounded-full p-1.5
                            border border-blue-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_3px_rgba(59,130,246,0.4)]">
                            <Shield className="w-4 h-4" />
                          </div>
                          <p className="text-xs text-gray-300">
                            Adding fire-resistant features to properties in high-risk zones is a recommended practice for comprehensive property protection and safety.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Government technology disclaimer with enhanced styling */}
                    <div className="mt-4 bg-gradient-to-br from-blue-900/20 to-gray-900/20 border border-blue-600/20 rounded-lg p-3">
                      <p className="text-blue-100 text-sm italic font-medium flex items-center">
                        <span className="text-blue-300 mr-2">※</span>
                        Advanced ceramic microsphere technology with thermal protection properties, now available for residential and commercial applications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-14 mb-12 md:mb-20">
              {/* Enterprise-elite styled left column */}
              <div className="relative">
                {/* Advanced layered background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-950/98 to-black rounded-xl border border-blue-600/30 shadow-[0_5px_30px_rgba(59,130,246,0.15)]"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-blue-400/5 to-blue-600/20 rounded-xl blur-lg opacity-60"></div>
                
                {/* Corner accents - enterprise-elite style */}
                <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-400/40 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/60 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-400/40 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/60 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-400/40 rounded-bl-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/60 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-400/40 rounded-br-md"></div>
                </div>
                
                {/* Enhanced content with premium padding */}
                <div className="relative p-7 md:p-9 backdrop-blur-sm">
                  {/* Premium heading with enhanced styling */}
                  <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-600/10 to-blue-500/20 rounded-full blur-lg opacity-70"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10 tracking-tight 
                      [text-shadow:0_1px_1px_rgba(0,0,0,0.8),0_2px_10px_rgba(59,130,246,0.3),0_-1px_20px_rgba(59,130,246,0.2)]">
                      Ceramic Microsphere Technology
                    </h2>
                    
                    {/* Sophisticated accent line */}
                    <div className="absolute -bottom-3 left-0 w-24 h-px bg-gradient-to-r from-blue-500/70 to-transparent"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Advanced Triple-Component Thermal Barrier System</h3>
                        <p className="text-sm md:text-base text-gray-100">Our ceramic microsphere coating technology creates thermal breaks with lower thermal conductivity (0.05-0.07 W/m·K) throughout the coating film. The principle works by using the air spaces inside each microsphere to reduce heat transfer, similar to how other insulating materials function.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">5-6 Coats Passes 1550°F Flame Tests</h3>
                        <p className="text-sm md:text-base text-gray-100">When applied at approximately 30 mils (762 μm) thickness (5-6 coats) to 1/4 inch steel, our coating provides significant fire protection per ASTM E119-22 time-temperature curve testing protocols while maintaining structural integrity.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-lg flex items-center justify-center
                        border border-blue-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Exceptional Durability Proven Over Decades</h3>
                        <p className="text-sm md:text-base text-gray-100">Original applications from 1989 showed only 1% reflectivity degradation when inspected 30 years later in 2019 (measured via ASTM C1549-16 protocols), compared to competing products that lose 10-20% reflectivity in just 3 years.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile-friendly performance metrics */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg blur-sm opacity-60 group-hover:opacity-90 transition-opacity"></div>
                      <div className="relative bg-black/40 border border-blue-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                        <div className="text-blue-300 font-semibold text-sm mb-1">Thermal Differential</div>
                        <div className="text-white text-lg font-bold">1,400°F</div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg blur-sm opacity-60 group-hover:opacity-90 transition-opacity"></div>
                      <div className="relative bg-black/40 border border-blue-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                        <div className="text-blue-300 font-semibold text-sm mb-1">Service Life</div>
                        <div className="text-white text-lg font-bold">30+ Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column with advanced ROI calculator */}
              <div className="relative">
                {/* Enhanced green ambient glow for ROI calculator section - moved to lower z-index to appear behind */}
                <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-[-2]"></div>
                <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-[-1] animate-pulse-slow"></div>
                
                {/* Advanced layered background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-950/98 to-black rounded-xl border border-green-500/30 shadow-[0_5px_30px_rgba(74,222,128,0.15)] z-[1]"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/20 via-green-400/5 to-green-600/20 rounded-xl blur-lg opacity-60 z-[2]"></div>
                
                {/* Corner accents - enterprise-elite style */}
                <div className="absolute top-0 left-0 w-16 h-16 z-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/60 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-green-400/40 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 z-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/60 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-green-400/40 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 z-20 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/60 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-green-400/40 rounded-bl-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 z-20 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/60 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-green-400/40 rounded-br-md"></div>
                </div>
                
                {/* Enhanced content with premium padding */}
                <div className="relative p-7 md:p-9 backdrop-blur-sm">
                  {/* Premium heading with enhanced styling */}
                  <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-green-600/10 to-green-500/20 rounded-full blur-lg opacity-70"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold relative z-[30] tracking-tight">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        39% Fire Prevention ROI
                      </span>
                    </h2>
                    
                    {/* Sophisticated accent line */}
                    <div className="absolute -bottom-3 left-0 w-24 h-px bg-gradient-to-r from-green-500/70 to-transparent"></div>
                  </div>
                  
                  {/* Advanced ROI Calculator Interface */}
                  <div className="space-y-6">
                    <div className="relative bg-gradient-to-br from-black/60 to-gray-900/60 border border-green-500/30 rounded-xl p-5 backdrop-blur-sm">
                      {/* Strategic green ambient glow for financial/ROI section - ENHANCED */}
                      <div className="absolute -inset-1 bg-green-500/40 rounded-xl blur-xl opacity-70 z-0"></div>
                      <div className="absolute -inset-6 bg-green-500/30 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                      <div className="absolute -inset-3 bg-green-400/20 rounded-xl blur-md opacity-50 z-0"></div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0 bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1.5
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <CircleDollarSign className="h-5 w-5 text-green-100" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Ultimate Fire Protection ROI</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-5 mb-6">
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/30 to-green-400/20 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-600/40 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Annual Insurance Premium</span>
                              <span className="text-green-400 font-semibold">$14,800</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Premium After Coating</span>
                              <span className="text-green-400 font-semibold">$12,500</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Annual Savings</span>
                              <span className="text-green-400 font-semibold">$2,300</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>5-Year Savings</span>
                              <span className="text-green-400 font-semibold">$11,500</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/30 to-green-400/20 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-600/40 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Home Value Before</span>
                              <span className="text-green-400 font-semibold">$750,000</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Home Value After</span>
                              <span className="text-green-400 font-semibold">$785,000</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Value Increase</span>
                              <span className="text-green-400 font-semibold">4.7%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 font-semibold" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Net Equity Gain</span>
                              <span className="text-green-400 font-semibold">$35,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/30 to-green-400/20 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-600/40 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-semibold">Total Investment</span>
                            <span className="text-white font-semibold">$13,825</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold">Total 5-Year Return</span>
                            <span className="text-white font-semibold">$46,500</span>
                          </div>
                          <div className="mt-3 flex justify-center items-center">
                            <div className="bg-gradient-to-r from-green-600 to-green-400 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                              <span className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}>39% ROI</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* ROI Calculator CTA Button */}
                    <div className="transform transition-all duration-700 hover:scale-105 relative z-20">
                      <PremiumCartButton 
                        size="lg" 
                        onClick={handleShowRegistrationForm}
                        className="px-8 py-4 text-lg relative group w-full border border-green-500/50"
                        variant="default"
                      >
                        <div className="flex items-center justify-center">
                          <BarChart3 className="mr-2 h-5 w-5" />
                          <span>Calculate Your Personal 1,390% ROI</span>
                        </div>
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content area with registration form */}
            <div className="max-w-4xl mx-auto mb-8 md:mb-16 relative">
              {showRegistrationForm ? (
                <div className="relative">
                  {/* Form ambient glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-500/30 via-green-400/20 to-green-500/30 rounded-2xl blur-xl opacity-70"></div>
                  
                  {/* Premium form card */}
                  <div className="relative bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black p-6 md:p-8 rounded-xl border border-green-500/40 shadow-[0_10px_50px_rgba(74,222,128,0.15)] backdrop-blur-sm">
                    {/* Premium corner accents */}
                    <div className="absolute top-4 left-4 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/50 rounded-tl-md"></div>
                      <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-green-400/30 rounded-tl-md"></div>
                    </div>
                    <div className="absolute top-4 right-4 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/50 rounded-tr-md"></div>
                      <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-green-400/30 rounded-tr-md"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/50 rounded-bl-md"></div>
                      <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-green-400/30 rounded-bl-md"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/50 rounded-br-md"></div>
                      <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-green-400/30 rounded-br-md"></div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center drop-shadow-[0_1px_2px_rgba(59,130,246,0.4)]">Calculate Your Wildfire Defense ROI</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter your first name"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
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
                                  <FormLabel className="text-white">Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter your last name"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="Enter your email"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
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
                                  <FormLabel className="text-white">Phone</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter your phone number"
                                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500"
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
                                <FormLabel className="text-white">Property Address</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter your property address"
                                    className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">City</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="City"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
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
                                  <FormLabel className="text-white">State</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="State"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
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
                                  <FormLabel className="text-white">Zip Code</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Zip Code"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="propertyType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Property Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                                        <SelectValue placeholder="Select property type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                      <SelectItem value="residential">Residential</SelectItem>
                                      <SelectItem value="commercial">Commercial</SelectItem>
                                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                                      <SelectItem value="industrial">Industrial</SelectItem>
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
                                  <FormLabel className="text-white">Property Size (sq ft)</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Property size in square feet"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="estimatedValue"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Estimated Property Value ($)</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Estimated value in USD"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="distanceToWildland"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Distance to Wildland (miles)</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Distance in miles"
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="insuranceProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Current Insurance Provider</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Your current insurance provider"
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="concernLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Fire Risk Concern Level</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger 
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
                                    >
                                      <SelectValue placeholder="Select your concern level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-900 border-2 border-green-500/50 text-white">
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="extreme">Extreme</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="additionalDetails"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Additional Details</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="Any additional details about your property or concerns"
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500 min-h-[100px]"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
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
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border-2 border-green-500/50"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-white">
                                    I agree to the terms and conditions and privacy policy
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Enhanced form button row with glowing effects */}
                        <div className="flex justify-center md:justify-end items-center gap-4 pt-4">
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600/50 to-emerald-600/50 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 group-hover:duration-200"></div>
                            
                            <button 
                              type="submit"
                              className="relative bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-medium py-2.5 px-8 rounded-lg overflow-hidden transition-all duration-300 z-10 border border-green-500/40 group-hover:border-green-500/60"
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
                      className="w-20 h-20 mx-auto mb-6 bg-green-600/20 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Registration Successful!</h2>
                    <p className="text-lg text-gray-300 mb-6">
                      Thank you for your interest in our wildfire defense system. Our team will calculate your personalized 1,390% ROI and contact you shortly with your custom analysis.
                    </p>
                    
                    <div className="pt-4">
                      <div className="relative inline-block group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600/50 to-blue-600/50 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <button 
                          onClick={() => setRegistrationSuccess(false)} 
                          className="relative bg-gradient-to-br from-gray-900 to-black px-8 py-3 rounded-lg text-white font-medium z-10 border border-green-500/40"
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20"></div>
                          <span className="flex items-center">
                            <Home className="mr-2 h-5 w-5" />
                            Return to Main Page
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {/* Ambient glow behind the entire card */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-70"></div>
                  
                  {/* Main card with premium styling */}
                  <div className="relative bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-orange-500/30 shadow-[0_10px_50px_rgba(234,88,12,0.15)] backdrop-blur-sm overflow-hidden">
                    {/* Corner accents - enterprise-elite style */}
                    <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                      <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                      <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                      <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                      <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-500/30 rounded-br-md"></div>
                    </div>
                    
                    {/* Content wrapper with padding */}
                    <div className="p-6 md:p-8 relative z-10">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-[0_1px_2px_rgba(234,88,12,0.4)]">Protect Your Investment with Advanced Ceramic Technology</h2>
                        <p className="text-gray-300 text-lg md:w-4/5 mx-auto">
                          Our ceramic coating creates a Class A fire-rated barrier (ASTM E108/UL 790) that helps reduce heat transfer to provide additional protection for your property against fire exposure.
                        </p>
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
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default FirePrevention;