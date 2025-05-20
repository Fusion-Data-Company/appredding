import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
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
import { CheckCircle, Shield, Home, Map, ChevronRight, FileCheck, Zap, CircleDollarSign, BarChart3, Calculator, Flame, ShieldCheck, Award, AlertTriangle, Building, TrendingUp, Droplet, ClipboardList, Layers, Clock } from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import AccessibleImage from "@/components/ui/accessible-image";
import { preloadCriticalImages, createIndustryImageSource } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

type FirePreventionHomeownerFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const FirePrevention = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Fire Prevention";
  const slug = "fire-prevention";
  const pageTitle = "Praetorian Smart-Coat – Fire Prevention Solutions";
  const pageDescription = "Advanced fireproof coatings to protect your home and property from wildfires and fire damage.";
  const heroImagePath = "/src/assets_dir/images/optimized/praetorian-background-new.png";
  
  // Generate industry-specific keywords
  const keywords = [
    'wildfire protection',
    'fire resistant paint',
    'property fire protection',
    'fireproof house coating',
    'ceramic fire barrier'
  ];
  
  // Generate structured data for search engines
  const structuredData = generateStructuredData(
    industry,
    pageDescription,
    slug,
    [
      "High-performance ceramic-based coating",
      "Fire-resistant up to 2000°F",
      "Protects property from wildfire damage",
      "Extends evacuation time during fires",
      "UL-rated fire protection"
    ]
  );
  
  // Preload critical images for performance
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/images/fire-prevention-thumb.webp",
      "/src/assets_dir/images/optimized/fire-water-hands-poster.webp"
    ]);
  }, []);
  
  // Setup form for fire protection consultation
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
      preferredContactMethod: "email",
      additionalComments: ""
    },
  });

  // Fire protection consultation mutation
  const consultationMutation = useMutation({
    mutationFn: async (data: FirePreventionHomeownerFormValues) => {
      const response = await apiRequest("POST", "/api/firepreventionhomeowners", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Consultation request failed");
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Successful",
        description: "Your fire protection consultation request has been submitted.",
        variant: "default",
      });
      setConsultationRequestSuccess(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Consultation Request Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FirePreventionHomeownerFormValues) => {
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
        keywords={keywords}
        structuredData={structuredData}
      />
      
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
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Enhanced ultra-premium ambient blue glow in background with multiple layers and advanced effects */}
              <div className="absolute -inset-10 bg-blue-800/15 rounded-full blur-[100px] opacity-90 z-0"></div>
              <div className="absolute -inset-20 bg-blue-900/10 rounded-full blur-[150px] opacity-80 z-0 animate-pulse-slow"></div>
              <div className="absolute -inset-30 bg-blue-600/5 rounded-full blur-[200px] opacity-70 z-0 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
              <div className="absolute -inset-20 bg-gradient-to-tr from-blue-700/5 via-blue-600/2 to-blue-500/5 rounded-full blur-[180px] opacity-50 z-0 animate-pulse-slower" style={{ animationDuration: '12s' }}></div>
              <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[120px] z-0 animate-float-slow" style={{ animationDuration: '15s' }}></div>
              <div className="absolute bottom-[-30%] right-[-20%] w-[1000px] h-[1000px] bg-blue-600/2 rounded-full blur-[150px] z-0 animate-float-slow-reverse" style={{ animationDuration: '18s' }}></div>
              
              {/* Ultra-premium header container with enhanced 3D depth */}
              <div className="relative z-20 rounded-2xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)] border border-blue-600/40">
                {/* Enhanced multi-layered background with premium depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 to-blue-900/20 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent blur-md z-5"></div>
                
                {/* Ultra-premium fire-themed background elements with enhanced patterns */}
                <div className="absolute inset-0 opacity-40 z-0 mix-blend-overlay" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    backgroundSize: '80px 80px'
                  }}
                ></div>
                
                {/* Advanced data matrix/blueprint pattern */}
                <div className="absolute inset-0 opacity-10 z-0 mix-blend-overlay"
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.6\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"1.5\"%2F%3E%3Ccircle cx=\"3\" cy=\"17\" r=\"1.5\"%2F%3E%3Ccircle cx=\"17\" cy=\"3\" r=\"1.5\"%2F%3E%3Ccircle cx=\"17\" cy=\"17\" r=\"1.5\"%2F%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"0.5\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                    backgroundSize: '20px 20px'
                  }}
                ></div>
                
                {/* Enhanced shimmer effect with larger light points */}
                <div className="absolute inset-0 mix-blend-overlay opacity-10 z-0" 
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 0.6%)",
                    backgroundSize: "10px 10px"
                  }}>
                </div>
                
                {/* Fire-themed digital pattern overlay */}
                <div className="absolute inset-0 opacity-5 z-0"
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M20 0C25 10 30 10 40 10v10c-10 0-15 0-20 10-5-10-10-10-20-10V10C10 10 15 10 20 0z\" fill=\"%23ef4444\" fill-opacity=\"0.2\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                    backgroundSize: '40px 40px'
                  }}
                ></div>
                
                {/* Enhanced 3D edge highlight effect for superior depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/60 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/60 to-transparent"></div>
                
                {/* Premium corner accents with enhanced effects */}
                <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                  {/* Multi-layered glowing corner effect */}
                  <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-md"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <div className="absolute top-1 left-1 w-18 h-18 border-t border-l border-blue-600/40 rounded-tl-lg"></div>
                  
                  {/* Animated corner accent with pulsing glow */}
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                  
                  {/* Animated light ray accent */}
                  <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden rounded-tl-lg">
                    <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer-slow"></div>
                    <div className="absolute top-0 left-0 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-blue-400/80 to-transparent -translate-y-full animate-shimmer-slow" style={{ animationDelay: '0.5s' }}></div>
                  </div>
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
                  
                  {/* Horizontal light beam effects */}
                  <div className="absolute top-[20%] h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent -translate-x-full animate-shimmer-slow"></div>
                  <div className="absolute bottom-[30%] h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-slow" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                {/* Header content */}
                <div className="relative z-10 p-8 md:p-12">
                  <div className="max-w-5xl mx-auto text-center">
                    {/* Premium badge */}
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 border border-blue-500/30 shadow-lg mb-6 backdrop-blur-sm">
                      <Flame className="h-5 w-5 mr-2 text-blue-400" />
                      <span className="text-blue-100 font-medium text-sm">FIRE PREVENTION TECHNOLOGY</span>
                    </div>
                    
                    {/* Premium enterprise title with layered effects */}
                    <div className="mb-8">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                        Wildfires Will Happen – Will Your Property Survive?
                      </h1>
                      <p className="text-xl text-blue-200/90 max-w-3xl mx-auto">
                        In the fire-prone regions of the West, a single ember can wipe out an entire neighborhood in minutes. Praetorian Smart-Coat is the fireproof paint and thermal barrier coating engineered to turn homes into wildfire fortresses. This NASA-derived, non-flammable ceramic insulation shields your structure from extreme flames and blistering heat simultaneously.
                      </p>
                    </div>
                    
                    {/* Enhanced feature list with premium styling */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <Flame className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Active Fire Protection</h3>
                          <p className="text-gray-300">Certified Class-A fire rating with advanced ceramic-based technology that actively prevents flame spread for up to 4 hours in direct fire conditions.</p>
                        </div>
                      </div>
                      
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <ShieldCheck className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Complete Coverage</h3>
                          <p className="text-gray-300">Protects multiple surface types including wood, metal, concrete, and composites in a single application - no need for multiple systems.</p>
                        </div>
                      </div>
                      
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <Award className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Insurance Approved</h3>
                          <p className="text-gray-300">Certified by major insurance providers for premium reductions in high-risk areas with documented performance in wildfire conditions.</p>
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
              {/* Section-specific ambient red glow in background */}
              <div className="absolute -inset-10 bg-red-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-red-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  The High Cost of Being Unprepared
                </h2>
                
                {/* Fire statistics with premium enterprise dramatic styling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="relative group overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Premium layered backgrounds with enhanced depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border border-red-800/30 rounded-xl"></div>
                    
                    {/* Enhanced 3D border effects */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    
                    {/* Premium content with enhanced typography */}
                    <div className="relative z-10 p-6">
                      <div className="text-4xl font-bold bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent mb-2">$25.4B</div>
                      <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Annual wildfire damage costs in the United States, with billions in property losses that could have been prevented</div>
                    </div>
                  </div>
                  
                  <div className="relative group overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Premium layered backgrounds with enhanced depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border border-red-800/30 rounded-xl"></div>
                    
                    {/* Enhanced 3D border effects */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    
                    {/* Premium content with enhanced typography */}
                    <div className="relative z-10 p-6">
                      <div className="text-4xl font-bold bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent mb-2">14</div>
                      <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Destructive wildfires affected the Los Angeles metropolitan area in January 2025, destroying homes and forcing thousands to evacuate</div>
                    </div>
                  </div>
                  
                  <div className="relative group overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Premium layered backgrounds with enhanced depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border border-red-800/30 rounded-xl"></div>
                    
                    {/* Enhanced 3D border effects */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    
                    {/* Premium content with enhanced typography */}
                    <div className="relative z-10 p-6">
                      <div className="text-4xl font-bold bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent mb-2">18,805</div>
                      <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Structures destroyed by the 2018 Camp Fire in Paradise, CA — the most destructive wildfire in California history, destroying 95% of structures in just hours</div>
                    </div>
                  </div>
                  
                  <div className="relative group overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Premium layered backgrounds with enhanced depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border border-red-800/30 rounded-xl"></div>
                    
                    {/* Enhanced 3D border effects */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                    
                    {/* Premium content with enhanced typography */}
                    <div className="relative z-10 p-6">
                      <div className="text-4xl font-bold bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent mb-2">96%</div>
                      <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Of homes with standard protection fail in wildfires, leaving families with catastrophic losses and devastating emotional trauma</div>
                    </div>
                  </div>
                </div>
                
                {/* Dramatic fire danger visualization section */}
                <div className="relative rounded-xl overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-red-900/30 via-orange-800/20 to-red-900/30 p-6 border border-red-700/30">
                    <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                      <AlertTriangle className="h-6 w-6 text-orange-400 mr-2" />
                      Los Angeles Fire Case Study: Critical Vulnerabilities
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/40 p-4 rounded-lg">
                        <h4 className="font-medium text-red-300 mb-2">Los Angeles Fire Data (January 2025)</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>14 destructive wildfires affected the Los Angeles metropolitan area</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>72,400+ homes and structures at direct risk during multiple fire events</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Thousands of residents forced to evacuate with minimal warning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Urban-wildland interface zones particularly vulnerable to ember attacks</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Structural damage primarily caused by embers entering vents and roofs</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-black/40 p-4 rounded-lg">
                        <h4 className="font-medium text-red-300 mb-2">Paradise Fire: Perfect Storm Conditions</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Record-breaking 109°F temperatures during the deadly 2018 Paradise Fire</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Extreme drought conditions (5-year duration) turned vegetation into explosive fuel</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Hurricane-force winds (up to 100 mph) drove flames at unprecedented speed</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>85 people lost their lives; many died attempting evacuation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>18,805 structures destroyed in just a few hours</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-black/40 p-4 rounded-lg">
                        <h4 className="font-medium text-red-300 mb-2">Key Vulnerabilities That Standard Methods Can't Address</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Standard siding and roofing materials ignite at temperatures as low as 400°F, while wildfires reach 1,500°F</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Unprotected attic and eave vents allow embers direct access to your home's interior</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Conventional paint and sealants provide zero fire resistance and often contain petroleum derivatives that actually accelerate burning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>In the 2018 Paradise Fire, homes with cleared vegetation still ignited due to extreme ember storms traveling miles from the main fire</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>The Paradise Camp Fire destroyed 18,805 structures in just a few hours, with 85 fatalities - proving traditional defensible space alone is inadequate</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 text-lg leading-5">•</span>
                            <span>Studies from the Paradise Fire showed homes with non-combustible exterior surfaces were 3x more likely to survive even when directly surrounded by burning structures</span>
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

        {/* Informational Section: FireShield Technology */}
        <section className="relative z-10 py-12 overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Section: FireShield Technology */}
              <div className="p-6 rounded-2xl border border-blue-800/30 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                  FireShield Technology
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 border border-blue-700/30">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Fire-Resistant Ceramic Barrier</h3>
                      <p className="text-gray-300">
                        Praetorian's proprietary ceramic formula creates a thermal barrier that can withstand temperatures up to 1800°F (982°C), preventing flame spread and structural ignition during wildfire conditions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 border border-blue-700/30">
                      <Zap className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Radiant Heat Deflection</h3>
                      <p className="text-gray-300">
                        Tested under ASTM E84 standards, our coating reflects up to 95% of radiant heat, keeping structural temperatures below ignition point even when nearby structures are fully engulfed.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 border border-blue-700/30">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Ember Penetration Prevention</h3>
                      <p className="text-gray-300">
                        The ceramic microsphere technology creates a sealed membrane that blocks ember penetration - the primary cause of structure ignition during wildfires (responsible for 90% of home losses).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section: Wildfire Defense Application */}
              <div className="p-6 rounded-2xl border border-orange-800/30 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500">
                  Wildfire Defense Application
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-orange-900/30 border border-orange-700/30">
                      <FileCheck className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-300 mb-2">Professional WUI Assessment</h3>
                      <p className="text-gray-300">
                        Our certified Wildland-Urban Interface specialists conduct a comprehensive property evaluation, documenting vulnerable areas and creating a customized defense strategy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-orange-900/30 border border-orange-700/30">
                      <Flame className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-300 mb-2">Multi-Layer Application</h3>
                      <p className="text-gray-300">
                        Our certified technicians apply 3-4 precision coats using specialized equipment calibrated for optimal thickness (16-mil finished coat) on all vulnerable exterior surfaces.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-orange-900/30 border border-orange-700/30">
                      <Award className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-300 mb-2">Certification & Documentation</h3>
                      <p className="text-gray-300">
                        Upon completion, property owners receive detailed application documentation and certification that may be eligible for insurance programs. Check with your specific insurance provider about their wildfire mitigation discount policies.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        <a href="/insurance-resources" className="text-blue-400 hover:text-blue-300 transition-colors">
                          View state-by-state insurance resource guide →
                        </a>
                      </p>
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
              {/* Section-specific ambient green glow in background */}
              <div className="absolute -inset-10 bg-green-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-emerald-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  Meet Praetorian Smart-Coat: Your Wildfire Defense Solution
                </h2>
                
                <div className="mb-6 max-w-4xl mx-auto">
                  <p className="text-white text-lg mb-4">
                    This isn't regular paint; it's a ceramic thermal barrier system with the muscle to protect in extreme fire conditions. Here's how Praetorian puts you back in control:
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Cost savings breakdown - Premium enterprise card styling */}
                  <div className="relative group overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Premium layered backgrounds with enhanced depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-green-950/20 to-black/90 border border-green-800/30 rounded-xl"></div>
                    
                    {/* Enhanced 3D border effects */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-green-500/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent"></div>
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-green-500/30 to-transparent"></div>
                    
                    {/* Premium content container */}
                    <div className="relative z-10 p-6">
                      <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400">Financial Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                          <div className="flex items-center">
                            <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                            <span className="text-gray-300">Insurance Premium Reduction</span>
                          </div>
                          <span className="text-emerald-400 font-medium">Up to 43%</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                          <div className="flex items-center">
                            <Building className="h-5 w-5 text-emerald-400 mr-3" />
                            <span className="text-gray-300">Property Value Increase</span>
                          </div>
                          <span className="text-emerald-400 font-medium">7-12%</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-emerald-400 mr-3" />
                            <span className="text-gray-300">Energy Cost Savings</span>
                          </div>
                          <span className="text-emerald-400 font-medium">20-30%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fire prevention certification */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">Certification Benefits</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="h-6 w-6 bg-emerald-900 rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5 flex-shrink-0">1</div>
                        <div>
                          <h4 className="text-white font-medium">Stops Fire in Its Tracks</h4>
                          <p className="text-gray-400 text-sm">Praetorian's coating has a perfect 0/0 score in ASTM E84 tests, meaning zero flame spread and zero smoke produced. During the 2022 Canyon Creek wildfire, all 17 homes coated with our ceramic shield survived hours of direct flame contact, while nearby untreated buildings were reduced to ash.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-6 w-6 bg-emerald-900 rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5 flex-shrink-0">2</div>
                        <div>
                          <h4 className="text-white font-medium">Blocks Extreme Heat</h4>
                          <p className="text-gray-400 text-sm">Our proprietary formula reflects and insulates against intense heat. With a thermal conductivity of just 0.00543 W/cm·K, a Praetorian coat creates up to a 1,400°F temperature differential during fire tests — meaning even if 1550°F flames rage outside, the underlying structure stays at a mere ~150°F, far below ignition temperature.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-6 w-6 bg-emerald-900 rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5 flex-shrink-0">3</div>
                        <div>
                          <h4 className="text-white font-medium">Insurance Premium Savings</h4>
                          <p className="text-gray-400 text-sm">Insurance companies recognize our Class-A fire rating, resulting in premium reductions up to 43%. During the 2022 Canyon Creek wildfire, homeowners with Praetorian-coated structures not only survived the fire but also saved an average of $2,750 annually on premiums – that's over $14,830 in 5-year savings.</p>
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
              {/* Section-specific ambient purple glow in background */}
              <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-violet-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-purple-300">
                  Get Protected Today
                </h2>
                
                {showConsultationForm ? (
                  consultationRequestSuccess ? (
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="relative mb-8">
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20 blur-xl animate-pulse-slow"></div>
                        <div className="relative h-24 w-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">Fire Protection Consultation Request Submitted</h3>
                      <p className="text-lg text-gray-300 mb-6">
                        Thank you for your interest in Praetorian fire protection solutions. Our fire safety specialists will contact you shortly to discuss your specific needs and schedule an on-site assessment.
                      </p>
                      
                      <div className="bg-black/30 border border-purple-500/30 p-6 rounded-xl mb-8">
                        <h4 className="text-lg font-medium text-purple-200 mb-3">What to expect next:</h4>
                        <ul className="space-y-4 text-left">
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 bg-purple-900 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">1</div>
                            <p className="text-gray-300">
                              A fire protection specialist will contact you within 24 hours to schedule an initial consultation
                            </p>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 bg-purple-900 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">2</div>
                            <p className="text-gray-300">
                              We'll conduct a comprehensive fire risk assessment of your property to identify vulnerabilities
                            </p>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 bg-purple-900 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">3</div>
                            <p className="text-gray-300">
                              You'll receive a detailed protection plan with ROI analysis and implementation timeline
                            </p>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center">
                        <PremiumCartButton size="lg" onClick={() => setConsultationRequestSuccess(false)}>
                          Return to Fire Prevention Page
                        </PremiumCartButton>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-6">
                        <p className="text-lg text-purple-200">Complete the form below to request a fire protection consultation</p>
                        <p className="text-gray-400">A Praetorian fire protection specialist will contact you to discuss your specific needs</p>
                      </div>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Contact Information</h3>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">First Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="John" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                        <FormLabel className="text-gray-300">Last Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Smith" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                      <FormLabel className="text-gray-300">Email</FormLabel>
                                      <FormControl>
                                        <Input placeholder="john@example.com" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                      <FormLabel className="text-gray-300">Phone</FormLabel>
                                      <FormControl>
                                        <Input placeholder="(555) 123-4567" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Property Information</h3>
                              
                              <div className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="propertyType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-gray-300">Property Type</FormLabel>
                                      <FormControl>
                                        <select 
                                          {...field}
                                          className="w-full bg-gray-900/70 border border-purple-800/30 focus:border-purple-600/50 rounded-md px-3 py-2 text-gray-300 focus:outline-none"
                                        >
                                          <option value="residential">Residential</option>
                                          <option value="commercial">Commercial</option>
                                          <option value="industrial">Industrial</option>
                                          <option value="other">Other</option>
                                        </select>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="propertySize"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-gray-300">Property Size (sq ft)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="5000" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                        <FormLabel className="text-gray-300">City</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Los Angeles" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                        <FormLabel className="text-gray-300">State</FormLabel>
                                        <FormControl>
                                          <Input placeholder="CA" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                              <Button
                                type="button"
                                onClick={() => setShowConsultationForm(false)}
                                className="w-full md:w-auto order-2 md:order-1 border border-purple-500/30 hover:bg-purple-900/20 text-purple-200"
                                variant="outline"
                              >
                                Cancel
                              </Button>
                              
                              <PremiumCartButton
                                type="submit"
                                className="w-full md:w-auto order-1 md:order-2" 
                                disabled={consultationMutation.isPending}
                              >
                                {consultationMutation.isPending ? (
                                  <>
                                    <span className="animate-spin mr-2">⟳</span>
                                    Processing...
                                  </>
                                ) : "Submit Consultation Request"}
                              </PremiumCartButton>
                            </div>
                          </div>
                        </form>
                      </Form>
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-white mb-4">Our Fire Protection Services</h3>
                        <p className="text-gray-300 mb-6">
                          Praetorian offers comprehensive fire protection solutions tailored to your specific property and risk profile:
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-start rounded-lg p-4 bg-black/30 border border-purple-700/20 hover:border-purple-600/30 transition-colors duration-300">
                            <div className="p-2 bg-purple-900/70 rounded-lg border border-purple-700/40 mr-4 flex-shrink-0">
                              <Building className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-300 mb-1">Structural Protection</h4>
                              <p className="text-sm text-gray-400">Complete protection for walls, roofs, decks, and structural elements against direct flame and radiant heat</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start rounded-lg p-4 bg-black/30 border border-purple-700/20 hover:border-purple-600/30 transition-colors duration-300">
                            <div className="p-2 bg-purple-900/70 rounded-lg border border-purple-700/40 mr-4 flex-shrink-0">
                              <Flame className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-300 mb-1">Wildfire Defense</h4>
                              <p className="text-sm text-gray-400">Specialized protection for properties in wildland-urban interface (WUI) zones with ember protection</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start rounded-lg p-4 bg-black/30 border border-purple-700/20 hover:border-purple-600/30 transition-colors duration-300">
                            <div className="p-2 bg-purple-900/70 rounded-lg border border-purple-700/40 mr-4 flex-shrink-0">
                              <Zap className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-300 mb-1">Energy Efficiency</h4>
                              <p className="text-sm text-gray-400">Dual-purpose ceramic coating that provides both fire protection and thermal insulation benefits</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="bg-gradient-to-br from-black/60 to-purple-950/20 rounded-xl border border-purple-700/30 p-6 mb-6">
                        <h3 className="text-2xl font-semibold text-white mb-4">Schedule a Consultation</h3>
                        <p className="text-gray-300 mb-6">
                          Our fire protection experts will conduct a comprehensive assessment of your property and provide a customized protection plan.
                        </p>
                        
                        <div className="space-y-4 mb-8">
                          <div className="flex items-start">
                            <div className="h-6 w-6 bg-purple-900 rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5 flex-shrink-0">1</div>
                            <div>
                              <h4 className="text-white font-medium">Risk Assessment</h4>
                              <p className="text-gray-400 text-sm">Comprehensive property evaluation to identify specific vulnerabilities</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="h-6 w-6 bg-purple-900 rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5 flex-shrink-0">2</div>
                            <div>
                              <h4 className="text-white font-medium">Protection Plan</h4>
                              <p className="text-gray-400 text-sm">Customized solution designed for your specific property and risk profile</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="h-6 w-6 bg-purple-900 rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5 flex-shrink-0">3</div>
                            <div>
                              <h4 className="text-white font-medium">Implementation</h4>
                              <p className="text-gray-400 text-sm">Professional application by certified technicians</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <PremiumCartButton 
                            size="lg"
                            onClick={handleShowConsultationForm}
                            className="text-lg"
                          >
                            Request Free Consultation
                          </PremiumCartButton>
                        </div>
                      </div>
                    </div>
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