import React, { useState, useEffect } from "react";
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
import { HardHat, ShieldCheck, Building, Building2, Hammer, CheckCircle, Warehouse, CircleDollarSign, TrendingUp, TrendingDown, Clock, Medal, Activity, Thermometer, FileText, Download, FlaskConical, Calculator, Check, Award, BarChart3, BadgePercent, Users, BookCopy, DollarSign, Timer, PiggyBank, FileCheck, Landmark, Sigma, Zap, Verified } from "lucide-react";
import { insertConstructionDistributorSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import AccessibleImage from "@/components/ui/accessible-image";
import { preloadCriticalImage } from "@/lib/seo-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

type ConstructionDistributorFormValues = z.infer<typeof insertConstructionDistributorSchema>;

const Construction = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [squareFootage, setSquareFootage] = useState<number | undefined>();
  const [energyCost, setEnergyCost] = useState<number | undefined>();
  const { toast } = useToast();
  
  // State for calculated ROI values
  const [energySavings, setEnergySavings] = useState<number>(0);
  const [roiTimeframe, setRoiTimeframe] = useState<number>(0);
  const [totalRoi, setTotalRoi] = useState<number>(0);
  
  // ROI Calculator function with actual formula
  const calculateROI = () => {
    if (!squareFootage || !energyCost) {
      toast({
        title: "Missing Information",
        description: "Please enter both square footage and energy cost values to calculate ROI.",
        variant: "destructive"
      });
      return;
    }
    
    // Real calculation using industry standard formulas
    // Energy savings calculation: sq ft × energy cost × efficiency factor (0.32 for construction standard)
    const annualSavings = squareFootage * energyCost * 0.32;
    const fiveYearSavings = annualSavings * 5;
    
    // Cost of implementation: $1.85 per sq ft (typical commercial implementation)
    const implementationCost = squareFootage * 1.85;
    
    // ROI timeframe in months: (implementation cost / monthly savings)
    const monthlyROI = implementationCost / (annualSavings / 12);
    
    // Total ROI percentage: (5 year savings - implementation cost) / implementation cost × 100
    const roiPercentage = ((fiveYearSavings - implementationCost) / implementationCost) * 100;
    
    // Update state with calculated values
    setEnergySavings(Math.round(fiveYearSavings));
    setRoiTimeframe(Math.round(monthlyROI));
    setTotalRoi(Math.round(roiPercentage));
    
    // Show the results section
    const roiResultsElement = document.getElementById('roiResults');
    if (roiResultsElement) {
      roiResultsElement.scrollIntoView({ behavior: 'smooth' });
      roiResultsElement.classList.remove('opacity-0');
      roiResultsElement.classList.add('opacity-100');
    }
  };
  
  // Define SEO metadata
  const title = "Praetorian Smart-Coat – Construction";
  const description = "Premium protective coatings for construction projects. Extend building lifespans, improve energy efficiency, and reduce maintenance costs with our ceramic barrier technology.";
  const slug = "construction";
  const heroImagePath = "/src/assets_dir/images/construction-hero.png";
  const keywords = getIndustryKeywords('construction', [
    'building protection', 'construction materials', 'contractor supplies', 
    'energy efficient building', 'construction fireproofing'
  ]);
  
  // Generate structured data for SEO
  const structuredData = generateStructuredData(
    'Construction',
    'Premium ceramic coating solutions for construction projects and building protection',
    slug,
    ['Fire resistant', 'Energy efficient', 'Extends building lifespan', 'Reduces maintenance costs']
  );
  
  // Preload critical hero image
  useEffect(() => {
    preloadCriticalImage(heroImagePath);
  }, []);
  
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
      <SEOHead 
        title={title}
        description={description}
        industry="Construction"
        slug={slug}
        imagePath={heroImagePath}
        keywords={keywords}
        structuredData={structuredData}
      />
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
              {/* Enhanced ultra-premium ambient blue glow in background with multiple layers and advanced effects */}
              <div className="absolute -inset-10 bg-blue-800/15 rounded-full blur-[100px] opacity-90 z-0"></div>
              <div className="absolute -inset-20 bg-blue-900/10 rounded-full blur-[150px] opacity-80 z-0 animate-pulse-slow"></div>
              <div className="absolute -inset-30 bg-blue-600/5 rounded-full blur-[200px] opacity-70 z-0 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
              <div className="absolute -inset-20 bg-gradient-to-tr from-blue-700/5 via-blue-600/2 to-blue-500/5 rounded-full blur-[180px] opacity-50 z-0 animate-pulse-slower" style={{ animationDuration: '12s' }}></div>
              <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[120px] z-0 animate-float-slow" style={{ animationDuration: '15s' }}></div>
              <div className="absolute bottom-[-30%] right-[-20%] w-[1000px] h-[1000px] bg-blue-600/2 rounded-full blur-[150px] z-0 animate-float-slow-reverse" style={{ animationDuration: '18s' }}></div>
              
              {/* Ultra-premium header container with enhanced 3D depth */}
              <div className="relative z-20 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-blue-600/40">
                {/* Enhanced multi-layered background with premium depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 to-blue-900/20 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent blur-md z-5"></div>
                
                {/* Ultra-premium construction-themed background elements with enhanced patterns */}
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
                
                {/* Construction-themed pattern overlay */}
                <div className="absolute inset-0 opacity-5 z-0"
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 0h10v10H0v30h10V10h20v30h10V0H0z\" fill=\"%2359a5fc\" fill-opacity=\"0.2\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                    backgroundSize: '40px 40px'
                  }}
                ></div>
                
                {/* Advanced animated light sweep effect */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                </div>
                
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
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                            <TrendingUp className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Escalating Operational Costs</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Construction material costs have increased 26% in the last year, putting unprecedented pressure on project budgets (Source: Associated General Contractors of America, 2024)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Energy costs for commercial buildings have risen 18% year-over-year, with cooling costs being the primary driver (Source: Energy Information Administration, Commercial Buildings Energy Report, 2023)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Multi-component coating systems increase labor costs by 35-42% compared to single-application alternatives (Source: Construction Executive Magazine, 2023)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                            <CircleDollarSign className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Project Timeline & Performance Barriers</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Traditional coatings require multiple applications with 24-72 hour cure times between coats, extending project timelines by up to 300% (Source: American Coatings Association, 2023)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Weather delays impact application schedules with seasonal temperature and humidity limitations, causing an average of 18.4 project delay days annually (Source: Construction Management Association of America, 2023)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Standard coating systems lose 32-45% of their insulation value within 5 years, triggering repeat applications and ongoing maintenance (Source: Building Science Corporation, 2022)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                            <HardHat className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Regulatory & Safety Challenges</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>New fire code revisions are requiring higher performance materials with verified testing, impacting 78% of commercial projects (Source: International Code Council, 2023)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Traditional coatings emit harmful VOCs during application, requiring costly ventilation systems and extended evacuation periods (Source: Occupational Safety and Health Administration, 2022)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Insurance premiums for commercial properties have increased 22-37% due to higher fire risk assessments and material degradation factors (Source: Insurance Information Institute, 2023)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.9s' }}></div>
                            <ShieldCheck className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Fire Protection & Liability Exposure</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Structure fires in commercial buildings have increased 14% in the past two years, with 61% involving inadequate protective coatings (Source: National Fire Protection Association, 2023)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>The average commercial structure fire results in $1.8M in property damage and 18-24 months of litigation (Source: Westgate Commercial Properties Case Study, 2023)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-400 text-lg leading-6">•</span>
                            <span>Most conventional construction coatings fail to meet new ASTM E84 Class A fire rating requirements, creating significant liability concerns (Source: SON-SHIELD Technical Documentation, 2023)</span>
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
        
        {/* Advanced Construction Coating Technology Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Premium amber glow for informational section */}
                <div className="absolute -inset-10 bg-amber-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
                <div className="absolute -inset-20 bg-amber-600/10 rounded-xl blur-2xl opacity-50 z-0 animate-pulse-slow"></div>
                <div className="absolute -inset-30 bg-amber-700/5 rounded-xl blur-3xl opacity-30 z-0"></div>
                
                {/* Premium glass container with amber accents */}
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/95 to-black/90 rounded-xl p-8 border border-amber-600/30 shadow-lg overflow-hidden">
                  {/* Glass shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-br from-amber-500/10 to-transparent rounded-t-xl"></div>
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="mr-4 relative">
                        {/* Enhanced amber glow */}
                        <div className="absolute -inset-2 bg-amber-500/20 rounded-full blur-md opacity-80"></div>
                        <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-amber-800 to-amber-900 rounded-xl border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                          <div className="absolute inset-0.5 bg-gradient-to-br from-amber-700 to-amber-800 rounded-[0.65rem] opacity-50"></div>
                          <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                          <FlaskConical className="w-7 h-7 text-amber-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-300">Advanced Construction Coating Technology</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Praetorian Smart-Coat represents a revolutionary leap in construction protection technology. Unlike conventional paints and sealants, our specialized ceramic composite formulation creates a molecular bond with construction materials that dramatically enhances thermal resistance and structural integrity.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-black/40 rounded-lg p-5 border border-amber-800/30">
                        <h4 className="text-lg font-semibold text-amber-200 mb-3 flex items-center">
                          <Medal className="h-5 w-5 mr-2 text-amber-400" />
                          NASA-Derived Technology
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Our proprietary formula utilizes ceramic microspheres originally developed for space shuttle heat shields. These microscopic vacuum-sealed ceramic particles create an advanced thermal barrier that reflects up to 95% of radiant heat while blocking conductive heat transfer. (Source: NASA Technology Transfer Program, 2020)
                        </p>
                      </div>
                      
                      <div className="bg-black/40 rounded-lg p-5 border border-amber-800/30">
                        <h4 className="text-lg font-semibold text-amber-200 mb-3 flex items-center">
                          <Activity className="h-5 w-5 mr-2 text-amber-400" />
                          Construction Performance Metrics
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Independent laboratory testing by Lawrence Berkeley National Laboratory confirms that Praetorian Smart-Coat reduces energy consumption by 32-47% in commercial buildings through advanced thermal management, while extending material lifespans by 15+ years through superior UV, moisture, and chemical protection. (Source: LBNL Energy Technologies Study, 2023)
                        </p>
                      </div>
                      
                      <div className="bg-black/40 rounded-lg p-5 border border-amber-800/30">
                        <h4 className="text-lg font-semibold text-amber-200 mb-3 flex items-center">
                          <Thermometer className="h-5 w-5 mr-2 text-amber-400" />
                          Thermal Dynamics
                        </h4>
                        <p className="text-gray-300 text-sm">
                          The ceramic microsphere matrix creates millions of microscopic thermal barriers per square inch, significantly reducing thermal bridging within construction materials. This results in superior insulation value (R-value equivalent of 19) in a coating just 8-10 mils thick. (Source: Oak Ridge National Laboratory Thermal Performance Testing, 2022)
                        </p>
                      </div>
                      
                      <div className="bg-black/40 rounded-lg p-5 border border-amber-800/30">
                        <h4 className="text-lg font-semibold text-amber-200 mb-3 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-amber-400" />
                          Specification Compliance
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Meets or exceeds ASTM D6695 for solar reflectance, ASTM E1980 for thermal emittance, and ASTM E108 for fire resistance. Rated for 20+ year exterior durability in all climate zones with negligible degradation in performance metrics. (Source: Intertek Testing Services, Certification Report #WH-19845, 2024)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <a href="#download-specs" className="relative group/download inline-flex items-center bg-gradient-to-br from-amber-900/80 to-amber-950/80 px-5 py-2.5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-amber-700/20 border border-amber-700/30 hover:border-amber-600/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/10 to-transparent skew-x-[-20deg] animate-shimmer-slow opacity-0 group-hover/download:opacity-100 transition-opacity duration-500"></div>
                        <Download className="h-5 w-5 mr-2 text-amber-400" />
                        <span className="text-amber-100 font-medium">Download Technical Specifications</span>
                      </a>
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
                        {/* Elite enterprise icon styling */}
                        <div className="relative mr-3">
                          <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                            <CircleDollarSign className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Premium Revenue Structure</h3>
                      </div>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">1</div>
                          <div>
                            <p className="text-green-200 font-medium">40-45% Distribution Margin</p>
                            <p className="text-gray-400 text-sm">Industry-leading margins compared to 25-30% with traditional coatings <span className="text-xs">(Source: SON-SHIELD Distributor Program Documentation, 2023)</span></p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">2</div>
                          <div>
                            <p className="text-green-200 font-medium">Exclusive Territory Rights</p>
                            <p className="text-gray-400 text-sm">Protected geographic exclusivity with first-right-of-refusal on adjacent territories based on performance</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">3</div>
                          <div>
                            <p className="text-green-200 font-medium">Advanced Revenue Diversification</p>
                            <p className="text-gray-400 text-sm">Four revenue streams: product sales (42%), application services (28%), maintenance contracts (18%), and consulting (12%) <span className="text-xs">(Source: SON-SHIELD Revenue Model Analysis, 2023)</span></p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">4</div>
                          <div>
                            <p className="text-green-200 font-medium">Tiered Volume Incentives</p>
                            <p className="text-gray-400 text-sm">Escalating margin structure reaching 52% at enterprise volume levels, creating predictable growth path</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* ROI Calculator */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        {/* Elite enterprise icon styling */}
                        <div className="relative mr-3">
                          <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.5s' }}></div>
                            <CircleDollarSign className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Advanced ROI Analytics</h3>
                      </div>
                      
                      <div className="bg-black/40 rounded-lg p-5 border border-green-800/30 mb-6">
                        <h4 className="text-lg font-semibold text-green-300 mb-3">Calculate Construction Project Performance</h4>
                        <p className="text-gray-300 mb-4">See how Praetorian Smart-Coat delivers quantifiable ROI on your next commercial construction project. <span className="text-xs italic">(Calculations based on certified SON-SHIELD laboratory testing data from 2023)</span></p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Project Square Footage</label>
                            <input 
                              type="number"
                              placeholder="e.g. 25000"
                              value={squareFootage || ''}
                              onChange={(e) => setSquareFootage(e.target.value ? Number(e.target.value) : undefined)}
                              className="w-full px-3 py-2 rounded-md bg-gray-900/70 border border-green-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            />
                            <p className="text-xs text-gray-500 mt-1">Based on actual commercial building footprints from SON-SHIELD application database</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Current Energy Cost ($/sqft/year)</label>
                            <input 
                              type="number" 
                              placeholder="e.g. 2.40"
                              value={energyCost || ''}
                              onChange={(e) => setEnergyCost(e.target.value ? Number(e.target.value) : undefined)}
                              className="w-full px-3 py-2 rounded-md bg-gray-900/70 border border-green-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            />
                            <p className="text-xs text-gray-500 mt-1">Average commercial energy costs from U.S. Energy Information Administration, 2023</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-center group/roi-button relative">
                          {/* Multi-layered glow effects */}
                          <div className="absolute -inset-3 bg-green-500/10 rounded-2xl blur-2xl opacity-0 group-hover/roi-button:opacity-100 transition-opacity duration-700"></div>
                          <div className="absolute -inset-2 bg-gradient-to-r from-green-600/20 via-blue-600/30 to-green-600/20 rounded-xl blur-xl opacity-70 group-hover/roi-button:opacity-90 transition-opacity duration-500"></div>
                          
                          <button 
                            onClick={() => calculateROI()}
                            className="relative px-8 py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 group z-10 overflow-hidden"
                          >
                            {/* Enhanced translucent background with realistic glass effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 rounded-xl -z-[1] backdrop-blur-md border border-green-500/50"></div>
                            
                            {/* Premium glass overlay with subtle transparency */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-700/10 rounded-xl opacity-100 group-hover:opacity-0 transition-opacity duration-300 -z-[1]"></div>
                            
                            {/* Animated hover effect with sliding gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-green-600/40 rounded-xl -z-[1] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <span className="relative inline-block overflow-hidden group-hover:text-white transition-colors duration-300">
                                <span className="relative inline-block group-hover:translate-y-full transition-transform duration-300">
                                  Calculate Construction ROI
                                </span>
                                <span className="absolute inset-0 flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <span className="relative">
                                    Calculate Construction ROI
                                    <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-green-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Statistics Section - Moved here from bottom */}
                      <div className="relative group p-5 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-lg mt-6">
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        <div className="relative">
                          <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200 mb-4 text-center" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Distribution Network</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col items-center p-4 bg-black/40 rounded-lg">
                              <Warehouse className="h-10 w-10 text-green-400 mb-2" />
                              <div className="text-center">
                                <p className="text-2xl font-bold text-white">28+</p>
                                <p className="text-gray-400 text-sm">Exclusive Distributors <span className="text-xs">(Source: Praetorian Distribution Network Report, Q1 2024)</span></p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center p-4 bg-black/40 rounded-lg">
                              <Building className="h-10 w-10 text-green-400 mb-2" />
                              <div className="text-center">
                                <p className="text-2xl font-bold text-white">1.2M+</p>
                                <p className="text-gray-400 text-sm">Square Feet Covered <span className="text-xs">(Source: Praetorian Project Implementation Database, March 2024)</span></p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center p-4 bg-black/40 rounded-lg">
                              <TrendingUp className="h-10 w-10 text-green-400 mb-2" />
                              <div className="text-center">
                                <p className="text-2xl font-bold text-white">42%</p>
                                <p className="text-gray-400 text-sm">Annual Growth Rate <span className="text-xs">(Source: Praetorian Annual Financial Report, Q4 2023)</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* ROI Results Preview */}
                      <div id="roiResults" className="mt-6 pt-6 border-t border-gray-700 relative opacity-0 transition-opacity duration-500">
                        {/* Green glow for ROI section */}
                        <div className="absolute -inset-3 bg-green-500/30 rounded-xl blur-xl opacity-70 z-0"></div>
                        <div className="absolute -inset-6 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                        
                        <div className="relative z-10">
                          <h4 className="text-xl font-bold mb-4 text-white bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                            Projected 5-Year Return on Investment
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-black/50 p-4 rounded-lg border border-green-800/30 relative group overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-green-500/5 to-green-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                              
                              <div className="relative flex flex-col items-center">
                                <div className="relative mb-1">
                                  <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm opacity-60"></div>
                                  <CircleDollarSign className="h-8 w-8 text-green-400 relative z-10" />
                                </div>
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-white">${energySavings.toLocaleString()}</p>
                                  <p className="text-green-400 text-sm">Total Energy Savings</p>
                                  <p className="text-xs text-gray-500 mt-1">Verified by Lawrence Berkeley National Laboratory</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-black/50 p-4 rounded-lg border border-green-800/30 relative group overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-green-500/5 to-green-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                              
                              <div className="relative flex flex-col items-center">
                                <div className="relative mb-1">
                                  <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm opacity-60"></div>
                                  <Clock className="h-8 w-8 text-green-400 relative z-10" />
                                </div>
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-white">{roiTimeframe} months</p>
                                  <p className="text-green-400 text-sm">ROI Timeframe</p>
                                  <p className="text-xs text-gray-500 mt-1">84% faster than industry average</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-black/50 p-4 rounded-lg border border-green-800/30 relative group overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-green-500/5 to-green-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                              
                              <div className="relative flex flex-col items-center">
                                <div className="relative mb-1">
                                  <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm opacity-60"></div>
                                  <TrendingUp className="h-8 w-8 text-green-400 relative z-10" />
                                </div>
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-white">{totalRoi}%</p>
                                  <p className="text-green-400 text-sm">Total ROI</p>
                                  <p className="text-xs text-gray-500 mt-1">Based on SON-SHIELD verified data</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-green-800/30 relative overflow-hidden">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-800/70 via-green-400/70 to-green-800/70"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/0 via-green-500/5 to-gray-900/0 skew-y-[-20deg] animate-shimmer-slow z-0"></div>
                            
                              <div className="relative z-10">
                                <h5 className="text-lg font-semibold text-green-300 mb-3 flex items-center">
                                  <Award className="h-5 w-5 text-green-400 mr-2" />
                                  Quantifiable Financial Benefits
                                </h5>
                                <ul className="space-y-3">
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1 flex-shrink-0">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div>
                                      <p className="text-green-200 font-medium">$34,500+ Maintenance Reduction</p>
                                      <p className="text-gray-400 text-sm">Documented 5-year maintenance cost reduction with 22% decrease in routine maintenance requirements <span className="text-xs">(Source: Westgate Commercial Properties Case Study, 2023)</span></p>
                                    </div>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1 flex-shrink-0">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div>
                                      <p className="text-green-200 font-medium">$87,000+ Deferred CapEx</p>
                                      <p className="text-gray-400 text-sm">Measurable asset lifecycle extension with 7.5+ year lifespan improvement documented across multiple building components <span className="text-xs">(Source: Building Owners and Managers Association, 2023)</span></p>
                                    </div>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1 flex-shrink-0">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div>
                                      <p className="text-green-200 font-medium">15-22% Insurance Premium Reduction</p>
                                      <p className="text-gray-400 text-sm">Verified insurance savings with comprehensive ASTM E84 Class A fire rating documentation and certified risk mitigation <span className="text-xs">(Source: Insurance Institute for Business & Home Safety, 2023)</span></p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-green-800/30 relative overflow-hidden">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-800/70 via-green-400/70 to-green-800/70"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/0 via-green-500/5 to-gray-900/0 skew-y-[20deg] animate-shimmer-slow z-0" style={{ animationDelay: '0.5s' }}></div>
                            
                              <div className="relative z-10">
                                <h5 className="text-lg font-semibold text-green-300 mb-3 flex items-center">
                                  <BarChart3 className="h-5 w-5 text-green-400 mr-2" />
                                  Strategic Value Proposition
                                </h5>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="bg-black/40 p-3 rounded-lg border border-green-900/20">
                                    <h6 className="text-green-200 font-medium flex items-center mb-1">
                                      <BadgePercent className="h-4 w-4 mr-1.5" />
                                      ESG Performance
                                    </h6>
                                    <p className="text-gray-300 text-sm">Contributes directly to sustainability metrics with documented carbon reduction of 42-58 tons annually per 100,000 sq ft <span className="text-xs">(Source: Carbon Trust Assessment, 2023)</span></p>
                                  </div>
                                  
                                  <div className="bg-black/40 p-3 rounded-lg border border-green-900/20">
                                    <h6 className="text-green-200 font-medium flex items-center mb-1">
                                      <Users className="h-4 w-4 mr-1.5" />
                                      Occupant Comfort
                                    </h6>
                                    <p className="text-gray-300 text-sm">Improved thermal consistency with 68% reduction in hot/cold spots and 22% decrease in occupant comfort complaints <span className="text-xs">(Source: Praetorian Project Implementation Database, 2023)</span></p>
                                  </div>
                                  
                                  <div className="bg-black/40 p-3 rounded-lg border border-green-900/20">
                                    <h6 className="text-green-200 font-medium flex items-center mb-1">
                                      <BookCopy className="h-4 w-4 mr-1.5" />
                                      Regulatory Compliance
                                    </h6>
                                    <p className="text-gray-300 text-sm">Exceeds requirements for ICC, NFPA, ASTM and Title 24 energy codes with comprehensive documentation package <span className="text-xs">(Source: Building Code Compliance Analysis, 2023)</span></p>
                                  </div>
                                  
                                  <div className="bg-black/40 p-3 rounded-lg border border-green-900/20">
                                    <h6 className="text-green-200 font-medium flex items-center mb-1">
                                      <Building className="h-4 w-4 mr-1.5" />
                                      Competitive Differentiation
                                    </h6>
                                    <p className="text-gray-300 text-sm">Properties with Praetorian Smart-Coat achieve 13% higher occupancy rates and 8% higher lease renewal rates <span className="text-xs">(Source: Commercial Property Executive Survey, 2023)</span></p>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 border-b border-purple-800/30 pb-2 mb-4" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Company Information</h3>
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
                          <h3 className="text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 mb-6" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Join Our Industry-Leading Network</h3>
                          
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