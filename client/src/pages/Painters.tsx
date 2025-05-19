import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientHeading } from "@/components/ui/gradient-heading";
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
import { CheckCircle, PaintBucket, Brush, Clock, Palette, User, Building, ChevronRight, FileCheck, Zap, CircleDollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { motion } from "framer-motion";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import AccessibleImage from "@/components/ui/accessible-image";
import { preloadCriticalImage } from "@/lib/seo-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

// Define form schema for painters
const insertPainterContactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companyName: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  projectType: z.enum(["residential", "commercial", "industrial", "other"]),
  projectSize: z.string().min(1, "Project size is required"),
  projectTimeline: z.string().min(1, "Timeline is required"),
  coatingNeeds: z.enum(["exterior", "interior", "both", "specialized"]),
  preferredProducts: z.string().optional(),
  additionalDetails: z.string().optional(),
  agreesToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

type PainterContactForm = z.infer<typeof insertPainterContactSchema>;

const Painters = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define SEO metadata
  const title = "Praetorian Smart-Coat – Painters";
  const description = "Advanced ceramic coatings for professional painters. Extend your service offerings with our premium fireproof and insulating paint technology.";
  const slug = "painters";
  const heroImagePath = "/src/assets_dir/images/painters-hero.png";
  const keywords = getIndustryKeywords('painters', [
    'professional painter supplies', 'specialty coatings', 'painting contractors', 
    'commercial painting materials', 'industrial coatings'
  ]);
  
  // Generate structured data for SEO
  const structuredData = generateStructuredData(
    'Painters',
    'Advanced ceramic coating solutions for professional painters and contractors',
    slug,
    ['Fire resistant', 'Insulating', 'Premium finishes', 'Extended service offerings']
  );
  
  // Preload critical hero image
  useEffect(() => {
    preloadCriticalImage(heroImagePath);
  }, []);
  
  // Setup form for painter contact
  const form = useForm<PainterContactForm>({
    resolver: zodResolver(insertPainterContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      projectType: "residential",
      projectSize: "",
      projectTimeline: "",
      coatingNeeds: "exterior",
      preferredProducts: "",
      additionalDetails: "",
      agreesToTerms: false
    },
  });

  // Contact submission mutation
  const contactMutation = useMutation({
    mutationFn: async (data: PainterContactForm) => {
      const response = await apiRequest("POST", "/api/painters/contact", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Contact request failed");
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Contact Request Successful",
        description: "We've received your information and will be in touch soon.",
        variant: "default",
      });
      setContactSuccess(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Contact Request Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: PainterContactForm) => {
    contactMutation.mutate(data);
  };
  
  const handleShowContactForm = () => {
    setShowContactForm(true);
  };
  
  return (
    <MainLayout fullWidth={true}>
      <Helmet>
        <title>Praetorian Smart-Coat – Painters</title>
        <meta name="description" content="Join our premium painting contractor network. Gain access to revolutionary ceramic coating technology and grow your business with high-margin specialized projects." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Praetorian Smart-Coat – Painters" />
        <meta property="og:description" content="Fireproof, insulating ceramic paint for professional contractors. Guard what matters." />
        <meta property="og:image" content="/images/og-painters.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Praetorian Smart-Coat – Painters" />
        <meta name="twitter:description" content="Fireproof, insulating ceramic paint for professional contractors. Guard what matters." />
        <meta name="twitter:image" content="/images/og-painters.jpg" />
        
        {/* Preload critical hero image */}
        <link rel="preload" as="image" href={heroImagePath} />
      </Helmet>
      <div className="relative">
        {/* Premium background with layered gradient effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0d0d15 0%, #131930 30%, #182240 60%, #101b2c 100%)'
        }}></div>
        
        {/* Dynamic layered background elements */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-4] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(91, 33, 182, 0.4) 0%, rgba(15, 23, 42, 0) 70%)'
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
                
                {/* Ultra-premium painter-themed background elements with enhanced patterns */}
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
                
                {/* Painter-themed brush stroke pattern overlay */}
                <div className="absolute inset-0 opacity-5 z-0"
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 10C0 4 4 0 10 0s10 4 10 10v10c0 6-4 10-10 10S0 26 0 20V10zm30 0c0-6 4-10 10-10v10c0 6-4 10-10 10V10z\" fill=\"%2359a5fc\" fill-opacity=\"0.2\"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                    backgroundSize: '40px 40px'
                  }}
                ></div>
                
                {/* Advanced animated light sweep effect */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                </div>
                
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
                </div>
                
                {/* Header content */}
                <div className="relative z-10 p-8 md:p-12">
                  <div className="max-w-5xl mx-auto text-center">
                    {/* Premium badge */}
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 border border-blue-500/30 shadow-lg mb-6 backdrop-blur-sm">
                      <PaintBucket className="h-5 w-5 mr-2 text-blue-400" />
                      <span className="text-blue-100 font-medium text-sm">PROFESSIONAL PAINTERS NETWORK</span>
                    </div>
                    
                    {/* Premium enterprise title with layered effects */}
                    <div className="mb-8">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                        Painter Partnership Program
                      </h1>
                      <p className="text-xl text-blue-200/90 max-w-3xl mx-auto">
                        Join our exclusive network of certified application professionals and unlock premium margins with advanced coating technology
                      </p>
                    </div>
                    
                    {/* Enhanced feature list with premium styling */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <Palette className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Premium Products</h3>
                          <p className="text-gray-300">Access to exclusive high-margin ceramic coating systems that outperform traditional paints by 5-10x in durability.</p>
                        </div>
                      </div>
                      
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <User className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Lead Generation</h3>
                          <p className="text-gray-300">Qualified project leads delivered directly to your business through our marketing campaigns and national distribution network.</p>
                        </div>
                      </div>
                      
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                            <Brush className="h-8 w-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">Expert Training</h3>
                          <p className="text-gray-300">Comprehensive certification program with hands-on technical training on advanced ceramic coating application techniques.</p>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  Industry Challenges Facing Painters Today
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-red-900/70 rounded-lg border border-red-700/40 mr-3">
                          <CircleDollarSign className="h-6 w-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Shrinking Profit Margins</h3>
                      </div>
                      
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 text-lg leading-6">•</span>
                          <span>Traditional paint products offer limited margin potential in increasingly competitive markets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 text-lg leading-6">•</span>
                          <span>Rising material and labor costs outpacing ability to increase prices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 text-lg leading-6">•</span>
                          <span>Difficulty differentiating services from competitors using the same products</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-red-900/70 rounded-lg border border-red-700/40 mr-3">
                          <Clock className="h-6 w-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Project Inefficiency</h3>
                      </div>
                      
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 text-lg leading-6">•</span>
                          <span>Multiple coats and extended cure times extend project timelines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 text-lg leading-6">•</span>
                          <span>Weather and temperature dependencies create delays and unpredictability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 text-lg leading-6">•</span>
                          <span>Frequent repaints and callbacks for premature coating failures</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                  {/* Enhanced layered glows and effects */}
                  <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-red-900/70 rounded-lg border border-red-700/40 mr-3">
                        <Building className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Lead Generation Struggles</h3>
                    </div>
                    
                    <ul className="space-y-2 text-gray-300 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 text-lg leading-6">•</span>
                        <span>High customer acquisition costs from digital advertising and lead services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 text-lg leading-6">•</span>
                        <span>Difficulty scaling beyond word-of-mouth and referral business</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 text-lg leading-6">•</span>
                        <span>Limited ways to reach high-value clients seeking premium services</span>
                      </li>
                    </ul>
                    
                    <div className="bg-black/40 p-4 rounded-lg border border-red-700/20">
                      <p className="text-white text-sm mb-2">Industry Statistics:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-red-400">78%</p>
                          <p className="text-xs text-gray-400">of painters struggle with consistent lead generation</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-400">15-18%</p>
                          <p className="text-xs text-gray-400">average profit margin on traditional paint jobs</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-400">32%</p>
                          <p className="text-xs text-gray-400">increase in material costs over the last 2 years</p>
                        </div>
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
              {/* Section-specific ambient green glow in background */}
              <div className="absolute -inset-10 bg-green-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-emerald-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  The Praetorian Advantage for Painters
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex flex-col items-center text-center h-full">
                      <div className="bg-green-900/70 rounded-full w-16 h-16 flex items-center justify-center border border-green-700/40 mb-5">
                        <CircleDollarSign className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-300 mb-2">Premium Margins</h3>
                      <div className="text-sm text-gray-300 mb-4">
                        <p className="mb-2">Standard Paint Jobs:</p>
                        <p className="bg-gray-800/70 rounded-lg p-2 mb-2">
                          <span className="text-gray-400 font-medium">15-18%</span> Typical Margin
                        </p>
                        <p className="mb-2">Praetorian Coatings:</p>
                        <p className="bg-green-900/30 rounded-lg p-2 border border-green-500/30">
                          <span className="text-green-400 font-bold">35-50%</span> Premium Margin
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex flex-col items-center text-center h-full">
                      <div className="bg-green-900/70 rounded-full w-16 h-16 flex items-center justify-center border border-green-700/40 mb-5">
                        <Zap className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-300 mb-2">Application Efficiency</h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="bg-gray-800/70 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Traditional Exterior Painting:</p>
                          <p><span className="text-white font-medium">3-5 days</span> average project time</p>
                        </div>
                        <div className="bg-green-900/30 rounded-lg p-3 border border-green-500/30">
                          <p className="text-xs text-gray-400 mb-1">Praetorian Coating System:</p>
                          <p><span className="text-green-400 font-bold">1-2 days</span> average project time</p>
                        </div>
                        <p className="text-xs text-green-400 font-medium">Complete more projects with less labor</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex flex-col items-center text-center h-full">
                      <div className="bg-green-900/70 rounded-full w-16 h-16 flex items-center justify-center border border-green-700/40 mb-5">
                        <FileCheck className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-300 mb-2">Warranty Program</h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="bg-gray-800/70 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Traditional Paint Job:</p>
                          <p><span className="text-white font-medium">2-5 years</span> typical warranty</p>
                        </div>
                        <div className="bg-green-900/30 rounded-lg p-3 border border-green-500/30">
                          <p className="text-xs text-gray-400 mb-1">Praetorian System:</p>
                          <p><span className="text-green-400 font-bold">15-25 years</span> manufacturer-backed warranty</p>
                        </div>
                        <p className="text-xs text-green-400 font-medium">Build long-term customer trust with premium protection</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-700/30 rounded-xl transition-all duration-300 hover:border-green-600/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                  {/* Enhanced layered glows and effects */}
                  <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  
                  <div className="relative">
                    <h3 className="text-xl font-bold text-center text-green-300 mb-6">Painter Partnership Benefits</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">1</div>
                          <div>
                            <p className="text-green-200 font-medium">Exclusive Distribution Rights</p>
                            <p className="text-gray-400 text-sm">Protected territory rights with first access to new product lines</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">2</div>
                          <div>
                            <p className="text-green-200 font-medium">Certified Applicator Status</p>
                            <p className="text-gray-400 text-sm">Professional certification credentials and marketing materials</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">3</div>
                          <div>
                            <p className="text-green-200 font-medium">Lead Generation Program</p>
                            <p className="text-gray-400 text-sm">Direct project leads through our national marketing campaigns</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-900/70 rounded-full flex items-center justify-center text-white text-sm mt-0.5 flex-shrink-0">4</div>
                          <div>
                            <p className="text-green-200 font-medium">Technical Support</p>
                            <p className="text-gray-400 text-sm">On-demand application assistance and project consultation</p>
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
              {/* Section-specific ambient purple glow in background */}
              <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-violet-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                <div className="max-w-4xl mx-auto">
                  {showContactForm ? (
                    contactSuccess ? (
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20 blur-xl animate-pulse-slow"></div>
                          <div className="relative h-24 w-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">Contact Request Submitted</h3>
                        <p className="text-lg text-gray-300 mb-6">Thank you for your interest in the Praetorian Painter Partnership Program. One of our partnership specialists will reach out to you shortly to discuss next steps.</p>
                        
                        <div className="mt-6">
                          <div className="rounded-lg p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 mb-6">
                            <h4 className="text-green-400 font-semibold mb-2">What to expect next:</h4>
                            <ul className="space-y-3 text-left">
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">1</span>
                                <span className="text-gray-300">Initial consultation call to understand your business needs</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">2</span>
                                <span className="text-gray-300">Product and application demonstration</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">3</span>
                                <span className="text-gray-300">Partnership program overview and territory discussion</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <PremiumCartButton 
                            onClick={() => setContactSuccess(false)} 
                            size="lg"
                          >
                            Return to Painters Program Page
                          </PremiumCartButton>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center mb-8">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                            Contact Our Partnership Team
                          </h2>
                          <p className="text-lg text-purple-200 mb-2">Start your journey to premium coating certification</p>
                        </div>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Contact Information */}
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
                                            <Input placeholder="John" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                            <Input placeholder="Smith" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                          <Input placeholder="john@acmeconstruction.com" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                          <Input placeholder="(555) 123-4567" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                        <FormLabel className="text-gray-300">Company Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Acme Painting Services" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Business Information */}
                              <div>
                                <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Business Information</h3>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Address</FormLabel>
                                        <FormControl>
                                          <Input placeholder="123 Main St" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                            <Input placeholder="Anytown" {...field} className="bg-gray-900/70 border-purple-800/30" />
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
                                            <Input placeholder="CA" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  
                                  <FormField
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Zip Code</FormLabel>
                                        <FormControl>
                                          <Input placeholder="12345" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Project Information</h3>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="projectType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Project Types</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="bg-gray-900/70 border-purple-800/30">
                                              <SelectValue placeholder="Select project type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="residential">Residential</SelectItem>
                                            <SelectItem value="commercial">Commercial</SelectItem>
                                            <SelectItem value="industrial">Industrial</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="projectSize"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Typical Project Size</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g. 2,500 sq ft" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="projectTimeline"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Typical Timeline</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g. 2 weeks" {...field} className="bg-gray-900/70 border-purple-800/30" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-medium text-purple-200 border-b border-purple-800/30 pb-2 mb-4">Additional Details</h3>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="coatingNeeds"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-gray-300">Coating Needs</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="bg-gray-900/70 border-purple-800/30">
                                              <SelectValue placeholder="Select coating needs" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="exterior">Exterior Only</SelectItem>
                                            <SelectItem value="interior">Interior Only</SelectItem>
                                            <SelectItem value="both">Both Interior & Exterior</SelectItem>
                                            <SelectItem value="specialized">Specialized Applications</SelectItem>
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
                                        <FormLabel className="text-gray-300">Additional Information</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder="Tell us about your business and what you're looking for in a partnership"
                                            className="min-h-[100px] bg-gray-900/70 border-purple-800/30"
                                            {...field}
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
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-900/50">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=checked]:bg-purple-600"
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="text-sm text-gray-300">
                                            I agree to be contacted about the Praetorian Painter Partnership Program
                                          </FormLabel>
                                        </div>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                                <button
                                  type="button"
                                  onClick={() => setShowContactForm(false)}
                                  className="w-full md:w-auto order-2 md:order-1 bg-transparent border border-purple-500/30 hover:bg-purple-900/20 text-purple-200 px-6 py-3 rounded-lg transition-colors"
                                >
                                  Cancel
                                </button>
                                
                                <PremiumCartButton
                                  type="submit"
                                  className="w-full md:w-auto order-1 md:order-2"
                                  disabled={contactMutation.isPending}
                                >
                                  {contactMutation.isPending ? (
                                    <>
                                      <span className="animate-spin mr-2">⟳</span>
                                      Processing...
                                    </>
                                  ) : "Submit Application"}
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
                        Join Our Painter Partnership Program
                      </h2>
                      
                      <div className="relative group bg-gradient-to-br from-black/80 to-gray-900/80 border border-purple-700/30 rounded-xl p-6 mb-8">
                        <div className="absolute -inset-px bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        <div className="relative">
                          <h3 className="text-xl text-center font-semibold text-white mb-6">Start Your Partnership Journey</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4">
                                <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center flex-shrink-0">
                                  <span className="text-purple-300 font-bold">1</span>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-purple-300">Complete Application</h4>
                                  <p className="text-gray-300 text-sm">Fill out our quick form to start the partnership process</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-4">
                                <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center flex-shrink-0">
                                  <span className="text-purple-300 font-bold">2</span>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-purple-300">Consultation Call</h4>
                                  <p className="text-gray-300 text-sm">Speak with our partnership team about your business</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4">
                                <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center flex-shrink-0">
                                  <span className="text-purple-300 font-bold">3</span>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-purple-300">Training & Certification</h4>
                                  <p className="text-gray-300 text-sm">Complete our product and application training</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-4">
                                <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center flex-shrink-0">
                                  <span className="text-purple-300 font-bold">4</span>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-purple-300">Launch Partnership</h4>
                                  <p className="text-gray-300 text-sm">Receive your territory rights and start offering premium coatings</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center mt-6">
                            <PremiumCartButton 
                              size="lg" 
                              onClick={handleShowContactForm}
                              className="text-lg"
                            >
                              Contact Our Partnership Team
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
        
        <div className="mt-8 text-center text-gray-400 text-sm max-w-3xl mx-auto">
          <p>For immediate assistance, please contact us directly at <a href="tel:9168096619" className="text-blue-400 hover:text-blue-300">(916) 809-6619</a> or email <a href="mailto:rob@praetoriansmartcoat.com" className="text-blue-400 hover:text-blue-300">rob@praetoriansmartcoat.com</a></p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Painters;