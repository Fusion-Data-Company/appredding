import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { PremiumButton } from "@/components/ui/premium-button";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import SEOHead from "@/components/SEOHead";
import AccessibleImage from "@/components/ui/accessible-image";
import { preloadCriticalImages, createIndustryImageSource } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";
import { 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Landmark, 
  CircleDollarSign,
  Building,
  Droplets,
  BadgeAlert,
  PenTool,
  Blocks,
  Activity,
  Loader2,
  TrendingUp,
  BadgeCheck,
  ParkingCircle,
  LineChart,
  ChevronRight,
  Check,
  CheckCircle,
  BarChart3,
  PieChart,
  Award,
  Shield,
  ArrowRight,
  PlayCircle,
  Download,
  FileText,
  CalendarCheck,
  DollarSign,
  Percent,
  Calculator,
  BookOpen,
  Zap,
  Badge,
  Flame
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMunicipalityProfessionalSchema } from "@shared/schema";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const municipalityProfessionalFormSchema = insertMunicipalityProfessionalSchema.extend({
  confirmEmail: z.string().email({ message: "Invalid email format" }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"]
});

type MunicipalityProfessionalFormValues = z.infer<typeof municipalityProfessionalFormSchema>;

export default function Municipality() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [activeTab, setActiveTab] = useState("infrastructure");
  const [progress, setProgress] = useState(33);
  
  // Define SEO metadata
  const title = "Praetorian Smart-Coat – Municipal Applications";
  const description = "Energy-efficient ceramic coating solutions for municipal infrastructure. Reduce maintenance costs, improve energy efficiency, and protect public facilities.";
  const slug = "municipality";
  const heroImagePath = "/src/assets_dir/images/municipality-hero.png";
  const keywords = getIndustryKeywords('municipality', [
    'public buildings', 'energy savings', 'infrastructure protection', 
    'thermal insulation', 'municipal facilities'
  ]);
  
  // Generate structured data for SEO
  const structuredData = generateStructuredData({
    type: 'Product',
    name: 'Praetorian Smart-Coat for Municipalities',
    description: 'Advanced ceramic coating for municipal buildings and infrastructure',
    image: heroImagePath,
    url: `https://praetoriansmartcoat.com/${slug}`,
    manufacturer: 'Praetorian Protective Coatings',
    category: 'Municipal Infrastructure Protection'
  });
  
  // Preload critical hero image
  useEffect(() => {
    preloadCriticalImages([createIndustryImageSource(heroImagePath, 'municipality')]);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const { toast } = useToast();
  
  const form = useForm<MunicipalityProfessionalFormValues>({
    resolver: zodResolver(municipalityProfessionalFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      professionalType: "",
      specialties: [],
      jurisdictions: "",
      clientTypes: "",
      credentials: "",
      experienceYears: undefined,
      registrationNumber: "",
      projectExperience: "",
      notes: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: MunicipalityProfessionalFormValues) => {
      return await apiRequest("/api/municipality/register", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Thank you for registering. Our team will contact you shortly.",
      });
      form.reset();
      setShowRegistrationForm(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  });

  function onSubmit(data: MunicipalityProfessionalFormValues) {
    mutate(data);
  }

  return (
    <MainLayout fullWidth={true}>
      <Helmet>
        <title>Praetorian Smart-Coat – Municipal Infrastructure</title>
        <meta name="description" content="Advanced protective coatings for municipal infrastructure. Extend asset lifespan, reduce maintenance costs, and improve energy efficiency with our ceramic barrier technology." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Praetorian Smart-Coat – Municipality" />
        <meta property="og:description" content="Fireproof, insulating ceramic paint for municipal infrastructure. Guard what matters." />
        <meta property="og:image" content="/images/og-municipality.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Praetorian Smart-Coat – Municipality" />
        <meta name="twitter:description" content="Fireproof, insulating ceramic paint for municipal infrastructure. Guard what matters." />
        <meta name="twitter:image" content="/images/og-municipality.jpg" />
        
        {/* Preload critical hero image */}
        <link rel="preload" as="image" href={heroImagePath} />
      </Helmet>
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with municipality theme */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-4] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0) 70%)'
        }}></div>
        
        {/* Advanced multi-color ambient glow effects - POSITIONED BEHIND CONTENT */}
        <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none">
          {/* Blue glow */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          
          {/* Red glow */}
          <div className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-red-500/10 rounded-full blur-[150px] animate-pulse-slower"></div>
          
          {/* Green accent glows for balance */}
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          
          {/* Purple accent for depth */}
          <div className="absolute top-[70%] left-[50%] w-[20rem] h-[20rem] bg-purple-700/5 rounded-full blur-[90px] animate-pulse-slow"></div>
        </div>
        
        {/* Low-opacity subtle pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%235d9bec\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
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
              
              {/* Ultra-premium Elite Enterprise Header Container with enhanced 3D depth */}
              <div className="relative z-20 rounded-2xl overflow-hidden transform transition-all duration-700 group hover:scale-[1.005] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-blue-600/40">
                {/* Enhanced multi-layered background with premium depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 to-blue-900/20 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent blur-md z-5"></div>
                
                {/* Advanced animated light sweep effects with multiple layers */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] animate-light-sweep" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-blue-300/25 to-transparent skew-x-[-25deg] animate-light-sweep" style={{ animationDelay: '4s' }}></div>
                </div>
                
                {/* 3D edge highlight effect for depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                
                {/* Ultra-premium municipality-themed background elements with enhanced patterns */}
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
                
                {/* Municipality-themed grid pattern overlay */}
                <div className="absolute inset-0 opacity-5 z-0"
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 0h10v10H0V0zm10 0h10v10H10V0zm10 0h10v10H20V0zm10 0h10v10H30V0zM0 10h10v10H0V10zm10 10h10v10H10V20zm10 0h10v10H20V20zm10 0h10v10H30V20zM0 20h10v10H0V20zm0 10h10v10H0V30zm10 0h10v10H10V30zm10 0h10v10H20V30zm10 0h10v10H30V30z\" stroke=\"%2359a5fc\" stroke-opacity=\"0.2\" stroke-width=\"1\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                    backgroundSize: '40px 40px'
                  }}
                ></div>
                
                {/* Advanced animated light sweep effects with multiple layers */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] animate-light-sweep" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-blue-300/20 to-transparent skew-x-[-25deg] animate-light-sweep" style={{ animationDelay: '4s' }}></div>
                </div>
                
                {/* 3D edge highlight effect for depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                
                {/* Enhanced Header content with premium homepage-style styling */}
                <div className="relative z-20 p-10 flex flex-col items-center text-center">
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
                
                  <div className="relative p-8 md:p-10 backdrop-blur-sm">
                    {/* Ultra-premium enterprise header with layered effects */}
                    <div className="relative mb-8">
                      {/* Premium Cinematic Enterprise Header Container */}
                      <div className="relative py-8 px-6 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 
                        border-b-2 border-blue-500/60 border-t border-t-blue-400/30 rounded-lg mb-4
                        shadow-[0_10px_50px_rgba(59,130,246,0.15),inset_0_1px_20px_rgba(59,130,246,0.05)]">
                        
                        {/* Metallic corner accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                          <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                          <div className="absolute top-0 left-0 h-12 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                          <div className="absolute top-0 right-0 w-12 h-1 bg-gradient-to-l from-blue-500 to-transparent rounded-full"></div>
                          <div className="absolute top-0 right-0 h-12 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                          <div className="absolute bottom-0 left-0 h-12 w-1 bg-gradient-to-t from-blue-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-l from-blue-500 to-transparent rounded-full"></div>
                          <div className="absolute bottom-0 right-0 h-12 w-1 bg-gradient-to-t from-blue-500 to-transparent rounded-full"></div>
                        </div>
                        
                        {/* Premium subtle glow effects */}
                        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
                        
                        {/* Cinematic metallic header with layered elements */}
                        <div className="relative z-10">
                          {/* Top badge */}
                          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 border border-blue-500/30 shadow-lg mb-4 backdrop-blur-sm">
                            <Landmark className="h-5 w-5 mr-2 text-blue-400" />
                            <span className="text-blue-100 font-medium text-sm">Advanced Municipal Protection Technology</span>
                          </div>
                          
                          {/* Enterprise-grade headline with gradient accent */}
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                            Municipal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-500">Infrastructure</span> Protection
                          </h1>
                          
                          {/* Enhanced premium subheadline with vibrant color accent */}
                          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-blue-50/90 leading-relaxed">
                            Advanced ceramic coating technology with <span className="text-blue-300 font-semibold">fireproofing, weatherproofing, and energy-efficiency</span> for municipal assets
                          </p>
                          
                          {/* Refined feature highlight row with premium styling */}
                          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Fire Protection</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Energy Savings</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Extended Asset Lifespan</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Budget Compliance</span>
                            </div>
                          </div>
                          
                          {/* Premium animated CTA button */}
                          <div className="transform transition-all duration-700 hover:scale-105 relative z-20">
                            <PremiumCartButton 
                              size="lg" 
                              onClick={() => setShowRegistrationForm(true)}
                              className="px-8 py-4 text-lg relative group"
                              variant="gold"
                            >
                              <div className="flex items-center justify-center">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                <span>Calculate Municipal Infrastructure ROI</span>
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
                  Municipal Infrastructure Challenges
                </h2>
                
                {/* Interactive tabs component */}
                <div className="mb-8">
                  <Tabs defaultValue="infrastructure" className="w-full" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-6">
                      <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-1 bg-black/50 p-1 rounded-xl border border-gray-800">
                        <TabsTrigger 
                          value="infrastructure" 
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'infrastructure' ? 'bg-gradient-to-r from-red-900/90 to-red-800/90 text-white shadow-md border border-red-700/50' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                          <Building className="w-4 h-4 mr-2" />
                          <span>Infrastructure</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="energy" 
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'energy' ? 'bg-gradient-to-r from-red-900/90 to-red-800/90 text-white shadow-md border border-red-700/50' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          <span>Energy Costs</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="safety" 
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === 'safety' ? 'bg-gradient-to-r from-red-900/90 to-red-800/90 text-white shadow-md border border-red-700/50' : 'text-gray-400 hover:text-gray-300'}`}
                        >
                          <Flame className="w-4 h-4 mr-2" />
                          <span>Safety</span>
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="infrastructure" className="mt-2">
                      <div className="space-y-6">
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          {/* Enhanced layered glows and effects */}
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              {/* Elite enterprise icon styling */}
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                                  <Building className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Aging Infrastructure Crisis</h3>
                              <p className="text-gray-200 leading-relaxed">
                                Are your municipal buildings, bridges, and facilities struggling with deterioration years ahead of schedule? The American Society of Civil Engineers gives U.S. infrastructure a <span className="text-red-300 font-medium">D+ rating</span>, with <span className="text-red-300 font-medium">43%</span> of public buildings showing critical structural weaknesses that reduce property values and increase liability.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          {/* Enhanced layered glows and effects */}
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
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
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Unsustainable Maintenance Costs</h3>
                              <p className="text-gray-200 leading-relaxed">
                                How much of your budget is consumed by maintenance? Traditional municipal infrastructure requires constant repairs, with maintenance costs increasing <span className="text-red-300 font-medium">18-24%</span> annually. This creates a negative spiral where deferred maintenance leads to even more expensive emergency repairs, draining funds from critical community services.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          {/* Enhanced layered glows and effects */}
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              {/* Elite enterprise icon styling */}
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                                  <BookOpen className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Complex Regulatory Compliance</h3>
                              <p className="text-gray-200 leading-relaxed">
                                Is your municipality struggling to meet increasingly stringent building codes and environmental regulations? Traditional renovation solutions often fail to meet modern building code requirements, forcing municipalities to choose between costly demolition/rebuilding or risking non-compliance penalties of <span className="text-red-300 font-medium">$50,000+</span> per violation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="energy" className="mt-2">
                      <div className="space-y-6">
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                                  <Zap className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Ballooning Energy Expenditures</h3>
                              <p className="text-gray-200 leading-relaxed">
                                Is your municipality's budget being drained by rising energy costs? Public buildings with poor insulation lose <span className="text-red-300 font-medium">35-50%</span> of heating and cooling through walls and roofs, resulting in expenditures <span className="text-red-300 font-medium">3.2x higher</span> than necessary. These inefficiencies can consume up to <span className="text-red-300 font-medium">12-18%</span> of municipal operating budgets.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                                  <TrendingUp className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Carbon Reduction Mandate Challenges</h3>
                              <p className="text-gray-200 leading-relaxed">
                                How is your municipality handling increasingly strict carbon reduction mandates? Municipal buildings contribute <span className="text-red-300 font-medium">28%</span> of all government carbon emissions, and retrofitting with traditional methods is prohibitively expensive, often costing <span className="text-red-300 font-medium">$50-$150</span> per square foot - far beyond most municipal budgets.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                                  <Percent className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Utility Rebate Program Complexity</h3>
                              <p className="text-gray-200 leading-relaxed">
                                Are your energy efficiency initiatives hampered by complex utility rebate programs? Up to <span className="text-red-300 font-medium">68%</span> of available financial incentives go unclaimed due to administrative burdens and technical eligibility requirements that most municipalities lack the resources to navigate effectively.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="safety" className="mt-2">
                      <div className="space-y-6">
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                                  <Flame className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Fire Protection Vulnerabilities</h3>
                              <p className="text-gray-200 leading-relaxed">
                                How adequate is your municipal fire protection? Data shows that <span className="text-red-300 font-medium">64%</span> of municipal buildings have inadequate fire prevention systems, and retrofitting with traditional methods costs <span className="text-red-300 font-medium">$35-85</span> per square foot - stretching already limited budgets to the breaking point while leaving occupants at risk.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                                  <Shield className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Public Safety Liability Exposure</h3>
                              <p className="text-gray-200 leading-relaxed">
                                Is your municipality carrying excess liability risk? Local governments face average annual liability claims of <span className="text-red-300 font-medium">$2.1 million</span> from property-related injuries and incidents, while insurance premiums for municipal buildings increase <span className="text-red-300 font-medium">15-22%</span> annually due to aging infrastructure and heightened risk profiles.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                          <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="relative flex gap-5">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                                <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                  <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                                  <BadgeAlert className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Critical Infrastructure Resilience Gaps</h3>
                              <p className="text-gray-200 leading-relaxed">
                                How prepared is your municipality for extreme weather events? Climate-related infrastructure damage costs municipalities <span className="text-red-300 font-medium">$68 billion</span> annually, yet <span className="text-red-300 font-medium">71%</span> of local governments lack adequate protective measures for their critical facilities and infrastructure due to budget constraints.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Progress tracker */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300 font-medium">Municipal Infrastructure Risk Level</h3>
                    <span className="text-red-400 font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-800">
                    <div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>
                  <p className="mt-2 text-sm text-gray-400 italic">Based on assessment of U.S. municipal infrastructure overall condition and liability exposure.</p>
                </div>
                
                {/* Expert quote section */}
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-black/80 to-red-950/20 border border-red-700/20">
                  <div className="absolute -top-2 -left-2 text-4xl text-red-500 opacity-40">"</div>
                  <div className="absolute -bottom-2 -right-2 text-4xl text-red-500 opacity-40">"</div>
                  <p className="italic text-gray-300 mb-4">The reality is that most municipalities are facing an infrastructure crisis that traditional solutions cannot solve within budget constraints. Without innovative approaches, local governments will continue to see maintenance costs rise while public safety and property values decline.</p>
                  <div className="flex items-center">
                    <div className="ml-auto">
                      <p className="text-orange-200 font-medium">Dr. Robert Hendricks</p>
                      <p className="text-xs text-gray-400">Director, Municipal Infrastructure Institute</p>
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
                  Municipal Infrastructure ROI
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* ROI calculator preview */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">The Praetorian Advantage</h3>
                    
                    <div className="space-y-5">
                      <p className="text-gray-300">Our ceramic coating technology delivers an average <span className="text-emerald-400 font-bold">580% ROI</span> over 15 years for municipal infrastructure when accounting for energy savings, maintenance reduction, and extended asset lifespan.</p>
                      
                      <div className="relative">
                        <div className="p-5 rounded-lg bg-black/40">
                          <h4 className="font-medium text-emerald-100 mb-3">Sample Municipal ROI Analysis</h4>
                          
                          <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div className="text-gray-400">Initial Investment:</div>
                            <div className="text-gray-300 font-medium">$140,000</div>
                            
                            <div className="text-gray-400">Annual Savings:</div>
                            <div className="text-gray-300 font-medium">$54,200</div>
                            
                            <div className="text-gray-400">15-Year Returns:</div>
                            <div className="text-emerald-400 font-bold">$813,000</div>
                            
                            <div className="text-gray-400">ROI Percentage:</div>
                            <div className="text-emerald-400 font-bold">580%</div>
                          </div>
                        </div>
                        
                        {/* Pricing Indicator Badge */}
                        <div className="absolute -top-5 -right-5 w-20 h-20 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"></div>
                          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white w-14 h-14 rounded-full border-2 border-emerald-400/50 shadow-lg flex items-center justify-center text-sm font-bold">
                            Save<br/>32%
                          </div>
                        </div>
                      </div>
                      
                      {/* Call-to-action for ROI calculator */}
                      <div className="mt-5">
                        <PremiumButton 
                          onClick={() => setShowRegistrationForm(true)}
                          className="w-full"
                          variant="default"
                        >
                          <Calculator className="mr-2 h-4 w-4" />
                          Calculate Your Custom ROI
                        </PremiumButton>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cost savings breakdown */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">Budget-Friendly Benefits</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Energy Cost Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">25-42%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Maintenance Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">65-80%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Fire Safety Rating Increase</span>
                        </div>
                        <span className="text-emerald-400 font-bold">75-90%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Asset Lifespan Extension</span>
                        </div>
                        <span className="text-emerald-400 font-bold">15-25 years</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <Leaf className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Carbon Footprint Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">18-32%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Key features */}
                <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30 mb-8">
                  <h3 className="text-xl font-semibold mb-6 text-center text-emerald-200">Infrastructure Protection Features</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-black/40 transition-all duration-300 hover:bg-black/60">
                      <div className="relative h-16 w-16 flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-xl border border-emerald-600/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-4">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-lg opacity-50"></div>
                        <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                        <Flame className="w-8 h-8 text-emerald-300 relative z-10" />
                      </div>
                      <h4 className="font-semibold text-lg text-emerald-300 mb-2">Fire Protection</h4>
                      <p className="text-gray-400 text-center text-sm">Advanced ceramic coating provides Class-A fire resistance without costly renovations or disruption.</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 rounded-lg bg-black/40 transition-all duration-300 hover:bg-black/60">
                      <div className="relative h-16 w-16 flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-xl border border-emerald-600/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-4">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-lg opacity-50"></div>
                        <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                        <Zap className="w-8 h-8 text-emerald-300 relative z-10" />
                      </div>
                      <h4 className="font-semibold text-lg text-emerald-300 mb-2">Energy Efficiency</h4>
                      <p className="text-gray-400 text-center text-sm">Unique thermal barrier technology reduces HVAC costs by 25-42% with minimal application cost.</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 rounded-lg bg-black/40 transition-all duration-300 hover:bg-black/60">
                      <div className="relative h-16 w-16 flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-xl border border-emerald-600/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-4">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-lg opacity-50"></div>
                        <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                        <Droplets className="w-8 h-8 text-emerald-300 relative z-10" />
                      </div>
                      <h4 className="font-semibold text-lg text-emerald-300 mb-2">Weather Protection</h4>
                      <p className="text-gray-400 text-center text-sm">Comprehensive protection against water, UV damage, and extreme weather for extended infrastructure lifespan.</p>
                    </div>
                  </div>
                </div>
                
                {/* Grant compliance callout */}
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                  <div className="flex items-center mb-4">
                    <Badge className="h-6 w-6 text-emerald-400 mr-2" />
                    <h3 className="text-xl font-semibold text-emerald-200">Grant & Funding Compliance</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6">Praetorian Smart-Coat qualifies for multiple federal and state funding programs, including:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">FEMA Building Resilience Funding</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Energy Efficiency & Conservation Block Grants</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Inflation Reduction Act Tax Credits</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">State Infrastructure Modernization Programs</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-emerald-200 italic">Our municipal specialists work directly with your grant writing team to maximize funding opportunities, often achieving 40-80% project cost coverage through available programs.</p>
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
                  Next Steps for Municipal Leaders
                </h2>
                
                {/* Next steps content */}
                {!showRegistrationForm ? (
                  <div className="space-y-8">
                    {/* Process Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                        {/* Step indicator */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                        <h3 className="text-xl font-semibold mb-3 text-purple-200">Free Consultation</h3>
                        <p className="text-gray-400 mb-4">Schedule a personalized analysis of your municipal infrastructure's specific needs with zero obligation.</p>
                        <div className="flex items-center text-purple-400 text-sm">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Includes preliminary ROI analysis</span>
                        </div>
                      </div>
                      
                      <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                        {/* Step indicator */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                        <h3 className="text-xl font-semibold mb-3 text-purple-200">Custom Protection Plan</h3>
                        <p className="text-gray-400 mb-4">Receive a comprehensive protection strategy tailored to your specific infrastructure, budget, and compliance needs.</p>
                        <div className="flex items-center text-purple-400 text-sm">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Includes funding assistance</span>
                        </div>
                      </div>
                      
                      <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                        {/* Step indicator */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                        <h3 className="text-xl font-semibold mb-3 text-purple-200">Efficient Implementation</h3>
                        <p className="text-gray-400 mb-4">Our certified municipal specialists apply Praetorian Smart-Coat with minimal disruption to government operations.</p>
                        <div className="flex items-center text-purple-400 text-sm">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Most projects complete in under 30 days</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Municipal case studies */}
                    <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/20 border border-purple-800/30 mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-center text-purple-200">Municipal Success Stories</h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4 p-4 rounded-lg bg-black/30 border border-purple-800/20">
                          <h4 className="font-medium text-lg text-purple-300">Springfield City Hall</h4>
                          
                          <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Building className="h-4 w-4 mr-2 text-purple-400" />
                            <span>Historic preservation with modern protection</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Project Cost:</span>
                              <span className="text-white">$215,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Annual Savings:</span>
                              <span className="text-white">$87,500</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">ROI:</span>
                              <span className="text-purple-400 font-medium">405%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Grant Coverage:</span>
                              <span className="text-white">62%</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-400 italic">
                            "Praetorian helped us preserve our historic building while dramatically reducing our energy and maintenance costs." - Springfield Budget Director
                          </p>
                        </div>
                        
                        <div className="space-y-4 p-4 rounded-lg bg-black/30 border border-purple-800/20">
                          <h4 className="font-medium text-lg text-purple-300">Westlake Public Works</h4>
                          
                          <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Blocks className="h-4 w-4 mr-2 text-purple-400" />
                            <span>Infrastructure modernization program</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Project Cost:</span>
                              <span className="text-white">$560,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Annual Savings:</span>
                              <span className="text-white">$196,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">ROI:</span>
                              <span className="text-purple-400 font-medium">350%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Grant Coverage:</span>
                              <span className="text-white">75%</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-400 italic">
                            "We leveraged Praetorian's solution to extend our infrastructure lifespan while qualifying for maximum federal funding." - Westlake City Manager
                          </p>
                        </div>
                        
                        <div className="space-y-4 p-4 rounded-lg bg-black/30 border border-purple-800/20">
                          <h4 className="font-medium text-lg text-purple-300">Riverside County Facilities</h4>
                          
                          <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Shield className="h-4 w-4 mr-2 text-purple-400" />
                            <span>Fire safety & energy efficiency upgrade</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Project Cost:</span>
                              <span className="text-white">$1.4 Million</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Annual Savings:</span>
                              <span className="text-white">$520,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">ROI:</span>
                              <span className="text-purple-400 font-medium">371%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Grant Coverage:</span>
                              <span className="text-white">58%</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-400 italic">
                            "Praetorian's solution helped us meet stringent safety requirements while significantly reducing our carbon footprint." - Riverside Sustainability Director
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Final CTA */}
                    <div className="rounded-xl p-8 bg-gradient-to-br from-black/80 to-purple-900/20 border border-purple-700/30 text-center">
                      <h3 className="text-2xl font-bold mb-4 text-white">Ready for Your Municipal Infrastructure Upgrade?</h3>
                      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Join the growing number of municipal leaders protecting their infrastructure, reducing costs, and extending asset life with Praetorian Smart-Coat technology.</p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <PremiumCartButton 
                          size="lg" 
                          onClick={() => setShowRegistrationForm(true)}
                          variant="gold"
                          className="relative group px-6 py-3"
                        >
                          <div className="flex items-center">
                            <Landmark className="mr-2 h-5 w-5" />
                            <span>Schedule Municipal Consultation</span>
                          </div>
                        </PremiumCartButton>
                        
                        <PremiumButton 
                          variant="ghost"
                          className="flex items-center gap-2"
                          onClick={() => {}}
                        >
                          <FileText className="h-5 w-5" />
                          <span>Download Municipal Case Studies</span>
                        </PremiumButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900/90 to-purple-950/10 border border-purple-700/30 max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-purple-100">Municipal Professional Registration</h3>
                      <div className="px-3 py-1 bg-purple-900/30 text-purple-200 border border-purple-700/50 rounded-full text-xs font-medium">
                        Government Priority Access
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Organization Information</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Municipality/Organization Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Municipality Name" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="professionalType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Government Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50">
                                        <SelectValue placeholder="Select government type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="city">City/Town Government</SelectItem>
                                      <SelectItem value="county">County Government</SelectItem>
                                      <SelectItem value="state">State Government</SelectItem>
                                      <SelectItem value="federal">Federal Government</SelectItem>
                                      <SelectItem value="special">Special District</SelectItem>
                                      <SelectItem value="school">School District</SelectItem>
                                      <SelectItem value="other">Other Public Entity</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Website</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Municipality Website" {...field} value={field.value || ''} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="jurisdictions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Population Served</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Approx. population served" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="experienceYears"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Number of Buildings</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="# of municipal buildings to protect" 
                                      {...field} 
                                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                      className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Contact Information</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Contact Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Full Name" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="credentials"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Job Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your title/position" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Your email" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="confirmEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Confirm Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Confirm your email" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                  <FormLabel className="text-gray-300">Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your phone number" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
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
                                  <FormLabel className="text-gray-300">State/Province</FormLabel>
                                  <FormControl>
                                    <Input placeholder="State/Province" {...field} className="bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Project Details</h4>
                          
                          <FormField
                            control={form.control}
                            name="specialties"
                            render={() => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Project Interests (select all that apply)</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                                  {[
                                    { value: "fire-protection", label: "Fire Protection" },
                                    { value: "energy-efficiency", label: "Energy Efficiency" },
                                    { value: "maintenance-reduction", label: "Maintenance Reduction" },
                                    { value: "historic-preservation", label: "Historic Preservation" },
                                    { value: "sustainability", label: "Sustainability Goals" },
                                    { value: "grant-assistance", label: "Grant Assistance" },
                                  ].map((interest) => (
                                    <FormField
                                      key={interest.value}
                                      control={form.control}
                                      name="specialties"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={interest.value}
                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 bg-gray-900/50"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(interest.value)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, interest.value])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== interest.value
                                                        )
                                                      )
                                                }}
                                                className="border-purple-600/40 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-700"
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal text-gray-300">
                                              {interest.label}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Additional Project Notes</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Share any specific requirements, questions, or details about your municipal infrastructure project..."
                                    className="min-h-[100px] bg-gray-900/70 border-purple-800/30 focus:border-purple-600/50"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 pt-4 border-t border-purple-800/30">
                          <PremiumButton 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowRegistrationForm(false)}
                            className="border-purple-700/40"
                          >
                            Back to Information
                          </PremiumButton>
                          
                          <PremiumCartButton
                            type="submit"
                            disabled={isPending}
                            variant="gold"
                            className="px-8"
                          >
                            {isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Processing...</span>
                              </>
                            ) : (
                              <>
                                <CalendarCheck className="mr-2 h-4 w-4" />
                                <span>Schedule Municipal Consultation</span>
                              </>
                            )}
                          </PremiumCartButton>
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

      {/* JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "Praetorian Smart-Coat Municipal Infrastructure Protection System",
          "description": "Advanced ceramic coating technology with fireproofing, weatherproofing, and energy-efficiency for municipal assets, delivering superior protection while reducing maintenance costs and extending infrastructure lifespan.",
          "brand": {
            "@type": "Brand",
            "name": "Praetorian Smart-Coat"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://praetoriansmartcoat.com/municipality",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {}
        }
      `}} />
    </MainLayout>
  );
}