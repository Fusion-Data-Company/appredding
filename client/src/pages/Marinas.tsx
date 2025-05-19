import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import AccessibleImage from "@/components/ui/accessible-image";
import { preloadCriticalImages, createIndustryImageSource } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";
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
  BarChart3,
  Shield,
  Droplet,
  LayoutList as Workflow
} from "lucide-react";
import { insertMarinaProfessionalSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { preloadCriticalImage, getAccessibleAltText } from "@/lib/seo-helper";

const Marinas = () => {
  const [vesselType, setVesselType] = useState("");
  const [waterType, setWaterType] = useState("");
  const [material, setMaterial] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Marine & Maritime";
  const slug = "marinas";
  const pageTitle = "Praetorian Smart-Coat – Marine & Maritime Solutions";
  const pageDescription = "Advanced protective coatings for marine vessels, docks, and waterfront infrastructure with superior salt water and UV resistance.";
  const heroImagePath = "/images/sailboat-bg.jpg";
  
  // Generate industry-specific keywords
  const keywords = [
    'marine protective coating',
    'boat protection',
    'saltwater resistant paint',
    'marina infrastructure protection',
    'maritime coatings'
  ];
  
  // Generate structured data for search engines
  const structuredData = generateStructuredData(
    industry,
    pageDescription,
    slug,
    [
      "Superior saltwater corrosion resistance",
      "UV-resistant formula for extended durability",
      "Protects vessel hulls, docks, and maritime infrastructure",
      "Reduces maintenance and dry-dock frequency",
      "Extends service life of marine assets"
    ]
  );
  
  // Preload critical images for performance
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/images/marinas-thumb.webp",
      "/src/assets_dir/images/optimized/praetorian-products-updated.webp"
    ]);
  }, []);
  
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
      {/* SEO Metadata with enhanced tags and structured data */}
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry={industry}
        slug={slug}
        imagePath={heroImagePath}
        keywords={keywords}
        structuredData={structuredData}
      />
      {/* Enhanced SEO metadata is now handled by the SEOHead component above */}
      
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
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto">
            {/* Enhanced ultra-premium ambient blue glow in background with multiple layers and advanced effects */}
            <div className="absolute -inset-10 bg-blue-800/15 rounded-full blur-[100px] opacity-90 z-0"></div>
            <div className="absolute -inset-20 bg-blue-900/10 rounded-full blur-[150px] opacity-80 z-0 animate-pulse-slow"></div>
            <div className="absolute -inset-30 bg-blue-600/5 rounded-full blur-[200px] opacity-70 z-0 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
            <div className="absolute -inset-20 bg-gradient-to-tr from-blue-700/5 via-blue-600/2 to-blue-500/5 rounded-full blur-[180px] opacity-50 z-0 animate-pulse-slower" style={{ animationDuration: '12s' }}></div>
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[120px] z-0 animate-float-slow" style={{ animationDuration: '15s' }}></div>
            <div className="absolute bottom-[-30%] right-[-20%] w-[1000px] h-[1000px] bg-blue-600/2 rounded-full blur-[150px] z-0 animate-float-slow-reverse" style={{ animationDuration: '18s' }}></div>

            {/* Premium styled title card with enhanced effects */}
            <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20 relative">
              {/* Enhanced ultra-premium enterprise-grade backdrop with layered effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-gray-950/95 to-blue-950/90 rounded-2xl border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.2)]"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-blue-800/10 to-blue-600/30 rounded-2xl blur-xl opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 to-blue-900/20 backdrop-blur-sm rounded-2xl z-5"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent blur-md z-5"></div>
              
              {/* Ultra-premium marina-themed background elements with enhanced patterns */}
              <div className="absolute inset-0 opacity-40 z-0 mix-blend-overlay rounded-2xl" 
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                  backgroundSize: '80px 80px'
                }}
              ></div>
              
              {/* Advanced data matrix/blueprint pattern */}
              <div className="absolute inset-0 opacity-10 z-0 mix-blend-overlay rounded-2xl"
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.6\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"1.5\"%2F%3E%3Ccircle cx=\"3\" cy=\"17\" r=\"1.5\"%2F%3E%3Ccircle cx=\"17\" cy=\"3\" r=\"1.5\"%2F%3E%3Ccircle cx=\"17\" cy=\"17\" r=\"1.5\"%2F%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"0.5\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                  backgroundSize: '20px 20px'
                }}
              ></div>
              
              {/* Enhanced water-themed shimmer effect with larger light points */}
              <div className="absolute inset-0 mix-blend-overlay opacity-10 z-0 rounded-2xl" 
                style={{
                  backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 0.6%)",
                  backgroundSize: "10px 10px"
                }}>
              </div>
              
              {/* Marina/Ocean-themed wave pattern overlay */}
              <div className="absolute inset-0 opacity-5 z-0 rounded-2xl"
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 20c5-10 10-10 20-10s15 0 20 10c-5 10-10 10-20 10s-15 0-20-10z\" fill=\"%2359a5fc\" fill-opacity=\"0.3\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                  backgroundSize: '40px 40px'
                }}
              ></div>
              
              {/* Advanced animated light sweep effect */}
              <div className="absolute inset-0 opacity-20 z-0 overflow-hidden rounded-2xl">
                <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep" style={{ animationDuration: '6s' }}></div>
              </div>
              
              {/* Premium corner accents with enhanced effects */}
              <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
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
              
              <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-none">
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
              
              <div className="absolute bottom-0 right-0 w-20 h-20 z-10 pointer-events-none">
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
              
              <div className="absolute bottom-0 left-0 w-20 h-20 z-10 pointer-events-none">
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
              
              {/* Advanced dynamic glass shimmer effects for ultra-premium look */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                {/* Multiple layered shimmer effects with varying speeds and angles */}
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute" style={{ animationDuration: '3s' }}></div>
                <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent skew-x-[-15deg] animate-shimmer-slow absolute" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                <div className="h-full w-1/5 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent skew-x-[-25deg] animate-shimmer-slow absolute" style={{ animationDuration: '3.5s', animationDelay: '2s' }}></div>
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
                    Defend Your Marina – Against Corrosion, UV Damage & Fire
                  </h1>
                  <p className="text-lg text-blue-200 mt-4 relative z-10">
                    Marine environments present the most challenging protection demands in the industry. Salt water corrosion attacks metal structures, brutal UV exposure deteriorates surfaces, and electrical/fuel hazards create constant fire risks. Praetorian Smart-Coat's specialized marine formula creates a powerful multi-threat defense system that protects your valuable waterfront investment for decades.
                  </p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                {/* Pain points section */}
                <div className="relative mb-10 bg-gradient-to-br from-gray-900/60 to-gray-800/60 border border-blue-600/30 rounded-xl p-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-blue-500/30 to-blue-600/10 rounded-xl blur-md opacity-80"></div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    The Relentless Battle Against Marine Elements
                  </h2>
                  
                  <p className="text-lg text-white leading-relaxed mb-6">
                    Owning or managing a marina or shipyard means battling the elements daily. The environment is relentless – is your infrastructure holding up or costing you a fortune?
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">Ever had to sand down rust and repaint your docks or hulls every couple of years?</span> Salt spray and constant humidity eat away steel and paint, forcing costly maintenance cycles. It's a never-ending fight against corrosion that drains budgets and disrupts operations.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">What happens when the summer sun turns your deck surfaces and handrails scorching hot?</span> Visitors and staff risk burns from touching metal in peak sun. Meanwhile, UV radiation is silently degrading your coatings, causing fading, chalking, and cracks that let moisture in.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">Why do you still struggle with coatings that can't handle marine abuse?</span> Hairline cracks let water infiltrate, leading to hidden rot or rust. Fuel spills or electrical sparks on a dock can ignite a fire, yet many "marine" paints aren't truly fireproof. Regulatory pressures demand more, and traditional paints just aren't cutting it.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-base text-red-200 font-medium mb-4">
                    The risk and cost here are huge: unchecked corrosion compromises structural integrity (endangering boats and people), while a single dock fire could devastate an entire marina. Yet maintenance and liability costs keep rising as conventional solutions fail to provide lasting protection.
                  </p>
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
                  The Brutal Triple Threat to Marinas
                </h2>
                
                <div className="max-w-4xl mx-auto mb-8">
                  <p className="text-white text-lg mb-4">
                    Marina managers and owners face an unrelenting assault from nature's most destructive forces. The combination of salt water, intense UV radiation, and fuel/electrical hazards creates a perfect storm that devastates traditional coatings within 2-3 years.
                  </p>
                  <p className="text-white text-lg">
                    How many times have you had to completely replace docks, pilings or support structures due to corrosion? What's the true cost of your current endless cycle of maintenance and repairs? And what would happen if an electrical spark ignited fuel vapors on your docks?
                  </p>
                </div>

                {/* Solution details */}
                <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm mb-10">
                  <div className="absolute -top-4 left-8 px-6 py-1 bg-gradient-to-r from-red-900/90 to-red-700/90 rounded-full border border-red-400/30 shadow-lg shadow-red-900/20">
                    <span className="text-red-200 font-semibold">ADVANCED SOLUTIONS</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl text-white font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-orange-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Praetorian Smart-Coat (Marine Grade) – Advanced Protection System
                  </h2>
                  
                  <p className="text-lg text-white leading-relaxed mb-6">
                    This isn't an off-the-shelf paint – it's a military-grade, ABS-certified coating system that delivers on all fronts:
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-xl transition-all duration-300 hover:border-red-500/40">
                      <div className="absolute -inset-px bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="p-2 bg-red-900/50 rounded-lg border border-red-500/30">
                            <Anchor className="w-6 h-6 text-red-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-red-400 mb-2">Unmatched Corrosion Resistance</h3>
                          <p className="text-gray-300">Unlike standard marine paints that breakdown in 1-3 years, Smart-Coat's reinforced ceramic microspheres create a permanent bond with metal surfaces – proven to withstand 7,000+ hours of salt spray testing without degradation.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-xl transition-all duration-300 hover:border-red-500/40">
                      <div className="absolute -inset-px bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="p-2 bg-red-900/50 rounded-lg border border-red-500/30">
                            <Sun className="w-6 h-6 text-red-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-red-400 mb-2">Total UV & Heat Protection</h3>
                          <p className="text-gray-300">Ceramic microspheres reflect up to 95% of solar radiation (independently verified), reducing surface temperatures by 40-60°F even in direct sun. This prevents heat damage, eliminates burn risk, and cuts cooling costs in enclosed structures by 30-45%.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-xl transition-all duration-300 hover:border-red-500/40">
                      <div className="absolute -inset-px bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="p-2 bg-red-900/50 rounded-lg border border-red-500/30">
                            <ShieldCheck className="w-6 h-6 text-red-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-red-400 mb-2">Class-A Fire Protection</h3>
                          <p className="text-gray-300">Our marine formulation is specifically engineered to provide active fire resistance – not just "fire retardant" but actually flame-stopping with a Class-A fire rating. This critical layer of protection has been documented to contain fuel fires on multiple marinas before they could spread.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Informational Section: Marine Protection Technology */}
        <section className="relative z-10 py-12 overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Section: Marine Protection Technology */}
              <div className="p-6 rounded-2xl border border-cyan-800/30 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-500">
                  Marine-Grade Protection
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-cyan-900/30 border border-cyan-700/30">
                      <Waves className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-300 mb-2">Salt Water Impermeability</h3>
                      <p className="text-gray-300">
                        Our elastomeric ceramic formulation creates a 100% waterproof membrane that blocks salt ion penetration, preventing the electrochemical reaction that causes corrosion in marine environments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-cyan-900/30 border border-cyan-700/30">
                      <ShieldCheck className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-300 mb-2">Anti-Fouling Properties</h3>
                      <p className="text-gray-300">
                        The ceramic microsphere surface creates a non-stick barrier that inhibits marine organism attachment while remaining environmentally safe - unlike traditional toxic anti-fouling paints that leach harmful chemicals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-cyan-900/30 border border-cyan-700/30">
                      <Zap className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-300 mb-2">Electrical Safety</h3>
                      <p className="text-gray-300">
                        The ceramic coating provides a dielectric barrier that reduces electrical conductivity on metal surfaces, enhancing safety in wet environments and reducing electrolysis damage in saltwater.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section: Application Process */}
              <div className="p-6 rounded-2xl border border-blue-800/30 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                  Marine Application Process
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 border border-blue-700/30">
                      <FileCheck className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Professional Assessment</h3>
                      <p className="text-gray-300">
                        Our marine specialists evaluate your facility's specific environmental conditions, traffic patterns, and structural materials to create a customized application strategy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 border border-blue-700/30">
                      <Settings className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Three-Stage Process</h3>
                      <p className="text-gray-300">
                        Our marine application includes specialized surface preparation, a priming layer for maximum adhesion, and multiple coats of our marine-grade ceramic formulation calibrated to 16-mil thickness.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="min-w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 border border-blue-700/30">
                      <CheckCircle className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Documentation & Warranty</h3>
                      <p className="text-gray-300">
                        Every installation includes comprehensive application documentation and a 10-year performance warranty - the longest in the industry for marine environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 3: SOLUTION/ROI - GREEN GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Section-specific ambient green glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-green-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-green-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-300">
                  The Proven ROI for Marina Owners
                </h2>
                
                <div className="max-w-4xl mx-auto mb-8">
                  <p className="text-white text-lg mb-4">
                    Praetorian Smart-Coat transforms your marina's financial outlook by eliminating the endless cycle of maintenance and replacement. Our Gulf Coast Marina case study demonstrates how our specialized marine coating system delivers exceptional returns:
                  </p>
                </div>

                {/* Enhanced ROI stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-black/80 to-green-900/20 p-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl blur opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                      <CircleDollarSign className="h-12 w-12 text-green-400 mb-2" />
                      <h3 className="text-xl font-bold text-green-300">Maintenance Cost Reduction</h3>
                      <div className="text-4xl font-bold text-white">74%</div>
                      <p className="text-gray-400 text-sm">Average reduction in annual maintenance expenses after Smart-Coat application at Gulf Coast Marina, saving over $218,000 annually</p>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-black/80 to-green-900/20 p-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl blur opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                      <TrendingUp className="h-12 w-12 text-green-400 mb-2" />
                      <h3 className="text-xl font-bold text-green-300">Asset Lifespan Extension</h3>
                      <div className="text-4xl font-bold text-white">12-20 yrs</div>
                      <p className="text-gray-400 text-sm">Extended usable lifespan of docks, pilings, and walkways - documented in a Florida marina where treated structures remained pristine after 17 years in saltwater</p>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-black/80 to-green-900/20 p-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl blur opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                      <Clock className="h-12 w-12 text-green-400 mb-2" />
                      <h3 className="text-xl font-bold text-green-300">Investment Payback Period</h3>
                      <div className="text-4xl font-bold text-white">18-24 mos</div>
                      <p className="text-gray-400 text-sm">Average time to 100% ROI through reduced maintenance & energy costs</p>
                    </div>
                  </div>
                </div>

                {/* Application showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative rounded-xl overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 via-green-400/20 to-green-500/30 rounded-xl blur opacity-70"></div>
                    <div className="relative z-10 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-600/20 rounded-xl p-6 h-full flex flex-col">
                      <div className="inline-flex items-center justify-center bg-green-600 rounded-full p-3 mb-4 w-16 h-16">
                        <Ship className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">Vessels & Hulls</h3>
                      <p className="text-gray-300 mb-6 flex-grow">Extend vessel life and reduce maintenance costs with marine-grade ceramic coating that provides superior protection against salt, UV, and temperature extremes. Perfect for commercial fleets and private boats.</p>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <PremiumCartButton size="sm" className="w-full">
                            Learn More
                          </PremiumCartButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 via-green-400/20 to-green-500/30 rounded-xl blur opacity-70"></div>
                    <div className="relative z-10 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-600/20 rounded-xl p-6 h-full flex flex-col">
                      <div className="inline-flex items-center justify-center bg-green-600 rounded-full p-3 mb-4 w-16 h-16">
                        <BuildingIcon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">Marina Infrastructure</h3>
                      <p className="text-gray-300 mb-6 flex-grow">Protect docks, piers, and marina facilities from the harsh marine environment. Our coatings create a durable barrier against saltwater, UV, and microbial growth while extending infrastructure lifespan.</p>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 4: DECISION - PURPLE GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative">
              {/* Section-specific ambient purple glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-violet-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Form container */}
                {showRegistrationForm ? (
                  registrationSuccess ? (
                    <div className="max-w-4xl mx-auto">
                      {/* Success message with premium styling */}
                      <div className="relative p-8 rounded-xl bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-600/40 shadow-[0_10px_30px_rgba(34,197,94,0.2)]">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-green-600/10 to-green-500/20 rounded-xl blur-md opacity-70"></div>
                        
                        <div className="text-center relative z-10">
                          <div className="inline-flex items-center justify-center rounded-full p-4 bg-gradient-to-br from-green-700 to-green-800 border border-green-500/50 shadow-lg shadow-green-900/30 mb-6">
                            <CheckCircle className="h-12 w-12 text-green-400" />
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-4">Registration Successfully Submitted</h3>
                          <p className="text-lg text-gray-300 mb-6">Thank you for your interest in our advanced marina coating solutions. Our team will review your information and contact you shortly to discuss how we can best protect your marine assets.</p>
                          
                          <div className="mt-6">
                            <div className="rounded-lg p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 mb-6">
                              <h4 className="text-green-400 font-semibold mb-2">What happens next?</h4>
                              <ul className="space-y-3 text-left">
                                <li className="flex items-start gap-3">
                                  <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">1</span>
                                  <span className="text-gray-300">A Praetorian Marine Specialist will contact you within 24 hours</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">2</span>
                                  <span className="text-gray-300">We'll arrange a comprehensive marina assessment to identify critical protection points</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">3</span>
                                  <span className="text-gray-300">You'll receive a detailed ROI analysis with projected maintenance savings</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
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
                    </div>
                  ) : (
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                          Register for Marina Professional Network
                        </h2>
                        <p className="text-lg text-purple-200 mb-2">Join our specialized network of marina protection professionals</p>
                        <p className="text-gray-400">Complete the form below to access advanced training, certification, and exclusive marina project opportunities</p>
                      </div>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div className="relative space-y-6 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl border border-purple-500/30">
                              <div className="absolute -inset-px bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 rounded-xl opacity-50 blur-sm"></div>
                              <h3 className="text-lg font-semibold text-purple-300 relative z-10 mb-4 flex items-center">
                                <BuildingIcon className="w-5 h-5 mr-2 text-purple-400" />
                                Company Information
                              </h3>
                              
                              <div className="relative z-10 space-y-4">
                                <FormField
                                  control={form.control}
                                  name="firstName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">First Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="John" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
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
                                      <FormLabel className="text-purple-200">Last Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Doe" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="companyName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Company Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Marina Services Inc." 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="jobTitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Job Title</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Operations Manager" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
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
                                      <FormLabel className="text-purple-200">Phone Number</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="(555) 123-4567" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
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
                                      <FormLabel className="text-purple-200">Email Address</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="john@example.com" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            {/* Professional Details */}
                            <div className="relative space-y-6 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl border border-purple-500/30">
                              <div className="absolute -inset-px bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 rounded-xl opacity-50 blur-sm"></div>
                              <h3 className="text-lg font-semibold text-purple-300 relative z-10 mb-4 flex items-center">
                                <FileCheck className="w-5 h-5 mr-2 text-purple-400" />
                                Professional Details
                              </h3>
                              
                              <div className="relative z-10 space-y-4">
                                <FormField
                                  control={form.control}
                                  name="licenseNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">License Number (if applicable)</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="MPC-12345" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
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
                                      <FormLabel className="text-purple-200">Years in Business</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          placeholder="5" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                                      <FormLabel className="text-purple-200">Types of Vessels You Work With</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Sailboats, Yachts, Commercial Vessels" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="specialties"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Specialties/Services Offered</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Hull Maintenance, Dock Repair, Coating Application" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="serviceAreas"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Service Areas</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Northeast Coast, Gulf Area" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="experienceDescription"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Brief Description of Experience</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Tell us about your experience in marine work..." 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50 min-h-[120px]" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Terms & Submit */}
                          <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl border border-purple-500/30">
                            <div className="absolute -inset-px bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 rounded-xl opacity-50 blur-sm"></div>
                            
                            <div className="relative z-10">
                              <FormField
                                control={form.control}
                                name="isPremiumMember"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-purple-200">
                                        I'm interested in joining the Premium Partner Program (includes specialized training and certification)
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="agreesToTerms"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-purple-200">
                                        I agree to the terms and conditions and consent to being contacted about Praetorian Smart-Coat solutions
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                              
                              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setShowRegistrationForm(false)}
                                  className="w-full md:w-auto order-2 md:order-1 border-purple-500/30 hover:bg-purple-900/20 text-purple-200"
                                >
                                  Cancel
                                </Button>
                                
                                <Button 
                                  type="submit"
                                  className="w-full md:w-auto order-1 md:order-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white"
                                  disabled={registerMutation.isPending}
                                >
                                  {registerMutation.isPending ? (
                                    <>
                                      <span className="animate-spin mr-2">⟳</span>
                                      Processing...
                                    </>
                                  ) : "Submit Registration"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Form>
                    </div>
                  )
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-purple-300">
                      Next Steps for Marina Professionals
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-purple-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-purple-500/30 rounded-xl p-6 h-full">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center border border-purple-700 mr-3">
                              <span className="text-lg font-bold text-purple-200">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Request Consultation</h3>
                          </div>
                          <p className="text-gray-300 mb-4">Our marine specialists will conduct a comprehensive assessment of your vessels or marina infrastructure to identify critical protection points.</p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Professional inspection</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Detailed condition report</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Protection recommendations</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-purple-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-purple-500/30 rounded-xl p-6 h-full">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center border border-purple-700 mr-3">
                              <span className="text-lg font-bold text-purple-200">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Receive Custom Plan</h3>
                          </div>
                          <p className="text-gray-300 mb-4">Based on your specific marina environment and assets, we'll create a tailored protection strategy with projected ROI analysis.</p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Detailed cost breakdown</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">ROI analysis (5/10/15 years)</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Implementation timeline</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-purple-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-purple-500/30 rounded-xl p-6 h-full">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center border border-purple-700 mr-3">
                              <span className="text-lg font-bold text-purple-200">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Expert Implementation</h3>
                          </div>
                          <p className="text-gray-300 mb-4">Our certified application team will install the Smart-Coat system with minimal disruption to your operations.</p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Professional installation</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">Minimal operational downtime</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-200 text-sm">15-year protection warranty</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-6 text-center">
                        <p className="text-lg text-purple-200 mb-4">Ready to revolutionize your marina's protection strategy?</p>
                        <p className="text-gray-400 mb-8 max-w-3xl mx-auto">Join our specialized network of marine professionals who are transforming the industry with next-generation coating technology. Gain access to exclusive training, certification, and marina project opportunities.</p>
                      </div>
                      
                      <div className="relative z-10 transform transition-all duration-500 hover:scale-[1.03]">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-purple-600/30 rounded-lg blur-md opacity-75"></div>
                        <div className="relative">
                          <PremiumCartButton 
                            size="lg"
                            className="px-10 py-6 text-lg"
                            onClick={handleShowRegistrationForm}
                          >
                            Register for Marina Professional Network
                          </PremiumCartButton>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Marinas;