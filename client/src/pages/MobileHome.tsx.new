import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  PaintBucket, 
  Brush, 
  Clock, 
  Palette, 
  User, 
  Building, 
  ChevronRight, 
  FileCheck, 
  Zap, 
  CircleDollarSign,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Calculator,
  TrendingUp,
  ShieldCheck,
  BarChart,
  Calendar,
  PercentSquare,
  Users
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

// Define form schema for painters
const insertPainterContactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companyName: z.string().min(2, "Company name is required"),
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

// Dealer application form schema
const painterDealerSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  confirmEmail: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  companyAddress: z.string().min(5, { message: "Company address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "ZIP code is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  yearsInBusiness: z.string().min(1, { message: "Years in business is required" }),
  servicesOffered: z.array(z.string()).min(1, { message: "Select at least one service" }).default([]),
  employeeCount: z.string().min(1, { message: "Employee count is required" }),
  annualRevenue: z.string().min(1, { message: "Annual revenue is required" }),
  certifications: z.array(z.string()).optional().default([]),
  termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
  notes: z.string().optional(),
});

export default function Painters() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Painting Professionals";
  const slug = "painters";
  const pageTitle = "Praetorian Smart-Coat – Professional Painting Solutions";
  const pageDescription = "Advanced ceramic coatings for professional painters. Increase job profitability, deliver superior results, and grow your business with next-generation coating technology.";
  const heroImagePath = "/src/assets_dir/images/painters-hero.jpg";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/optimized/praetorian-background-new.png"
    ]);
  }, []);

  // Setup consultation form
  const consultationForm = useForm<z.infer<typeof insertPainterContactSchema>>({
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

  // Handle consultation form submission
  const onConsultationSubmit = (values: z.infer<typeof insertPainterContactSchema>) => {
    console.log("Consultation submitted:", values);
    
    // Simulate successful submission
    setTimeout(() => {
      setConsultationRequestSuccess(true);
      consultationForm.reset();
      toast({
        title: "Request Submitted",
        description: "We've received your consultation request and will contact you shortly.",
        variant: "default",
      });
    }, 1500);
  };

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };
  
  // Setup dealer/distributor application form
  const registrationForm = useForm<z.infer<typeof painterDealerSchema>>({
    resolver: zodResolver(painterDealerSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      companyAddress: "",
      city: "",
      state: "",
      zipCode: "",
      licenseNumber: "",
      yearsInBusiness: "",
      servicesOffered: [],
      employeeCount: "",
      annualRevenue: "",
      certifications: [],
      termsAccepted: false,
      notes: ""
    },
  });
  
  // Handle dealer application form submission
  const onRegistrationSubmit = (values: z.infer<typeof painterDealerSchema>) => {
    console.log("Registration submitted:", values);
    
    // Simulate successful submission
    setTimeout(() => {
      setRegistrationSuccess(true);
      toast({
        title: "Registration Successful",
        description: "Your dealer application has been received. Our team will contact you shortly.",
        variant: "default",
      });
    }, 1500);
  };
  
  // Handle showing dealer registration form
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
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
          'professional painting solutions',
          'ceramic paint technology',
          'painting contractor products',
          'high-performance coatings',
          'premium paint alternatives'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Increased job profitability",
          "Long-lasting client results",
          "Reduced application time and labor",
          "Premium differentiation in the market"
        ])}
      />
      
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with painting theme */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(14, 165, 233, 0.4) 0%, rgba(15, 23, 42, 0) 60%)'
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
                      Professional Painting Solutions
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Praetorian Smart-Coat delivers cutting-edge ceramic coating technology specifically designed for professional painting contractors. Our advanced ceramic formula creates a superior protective barrier that dramatically increases job profitability while delivering exceptional results to your clients.
                      </p>
                      <p className="text-lg">
                        Differentiate your painting business in a crowded market by offering premium, long-lasting finishes that standard paints simply cannot match.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Palette className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Premium Finish</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CircleDollarSign className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Higher Margins</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Client Satisfaction</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                          Request Consultation
                        </span>
                        <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-gray-600 text-blue-400 hover:text-blue-300 hover:border-blue-500"
                        onClick={handleShowRegistrationForm}
                      >
                        Become a Dealer
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
                      src="/src/assets_dir/images/optimized/praetorian-background-new.png" 
                      alt="Professional painting solutions by Praetorian Smart-Coat" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                    />
                    
                    {/* Premium overlay elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                      <p className="text-sm text-gray-300 text-center">SON-SHIELD ceramic technology for professional painters</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Client Satisfaction</p>
                    <p className="text-3xl font-bold text-white">95%<sup className="text-blue-300 text-xs">*</sup></p>
                    <p className="text-xs text-gray-400">*Based on SON-SHIELD client surveys</p>
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
                  Critical Challenges for Painting Professionals
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Margin Compression</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Industry data shows paint contractor profit margins have compressed by 18-23% over the past 5 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Material costs have increased 35% on average while client price sensitivity has intensified</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Labor costs now account for 60-75% of project expenses, creating significant profit pressure</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Online lead generation platforms charge 15-20% referral fees, further eroding margins</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">82% of painting contractors report difficulty justifying premium pricing in competitive bidding situations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Market Commoditization</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Over 73% of consumers view painting services as a commodity, primarily making decisions based on price</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">DIY painting content has grown 340% on social media, eroding the perception of professional value</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Entry barriers to the painting industry have decreased, with 22,000+ new painting businesses opening in the last 3 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Big box retailers actively promote the message that "anyone can paint," further commoditizing professional services</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Only 11% of painting contractors successfully position themselves as premium providers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Product Performance Limitations</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Standard paints begin visible degradation within 3-5 years, leading to client dissatisfaction and warranty callbacks</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Conventional coatings fail 40% faster in extreme weather conditions, creating regional challenges</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Even "lifetime warranty" paints show significant color fading and chalking within 7-10 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">65% of exterior paint failures are attributed to moisture penetration issues that standard paints cannot address</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Multiple-coat applications increase labor costs by 35-45% while still not addressing fundamental performance limitations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Business Growth Challenges</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">78% of painting contractors report difficulty scaling beyond $500K in annual revenue due to business model limitations</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Client retention rates average only 22% for painting businesses, forcing constant expensive customer acquisition</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Seasonal fluctuations create cash flow challenges, with 40-60% revenue variations between peak and off-peak periods</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Labor shortages impact 68% of painting businesses, with skilled painter turnover exceeding 45% annually</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Marketing costs average 12-18% of revenue for painting contractors, more than double other trades</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            
        {/* SANDLER STAGE 2: TECHNICAL - YELLOW GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Yellow glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-amber-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-amber-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-amber-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-amber-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                  Advanced Ceramic Coating Technology
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">SON-SHIELD Professional Ceramic Technology</h3>
                    <p className="text-gray-300 mb-6">
                      Our proprietary SON-SHIELD ceramic formulation creates a revolutionary coating system specifically engineered for professional painting contractors. Unlike conventional paints, our advanced ceramic particles form a permanent molecular bond with the substrate, delivering extraordinary durability and performance benefits that allow you to differentiate your business.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Calendar className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">3-4x<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Longer Lifespan vs. Standard Paint</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <PercentSquare className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">28.6%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Reduced Application Time</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Building className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">97.8%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Client Satisfaction Rating</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">*Based on independent laboratory testing and field performance data of SON-SHIELD ceramic coating technology</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-amber-300">Performance Advantages</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Molecular Ceramic Binding</h4>
                            <p className="text-gray-300 text-sm">Unlike conventional paints that merely adhere to surfaces, SON-SHIELD's ceramic particles create a permanent molecular bond with the substrate, forming a protective barrier that won't peel, flake or delaminate.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Self-Cleaning Hydrophobic Surface</h4>
                            <p className="text-gray-300 text-sm">Advanced ceramic nanoparticles create a superhydrophobic surface that repels water, dirt, and contaminants, maintaining a clean appearance for years without requiring pressure washing or maintenance.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Thermal Regulation</h4>
                            <p className="text-gray-300 text-sm">Ceramic microspheres reflect up to 95% of solar radiation, dramatically reducing heat transfer through walls and roofs, lowering cooling costs by 22-35% while preventing heat-related coating degradation.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Extreme Durability</h4>
                            <p className="text-gray-300 text-sm">Laboratory testing confirms 15+ year lifespan in extreme weather conditions with minimal color fading or chalking, dramatically outperforming even premium conventional paints in UV resistance, moisture protection, and abrasion resistance.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-amber-300">Technical Specifications</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Application Method</span>
                          <span className="text-white font-medium">Spray, Brush, or Roller</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Dry Film Thickness</span>
                          <span className="text-white font-medium">10-13 mils (per coat)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Coverage Rate</span>
                          <span className="text-white font-medium">250-300 sq ft/gallon</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Dry Time</span>
                          <span className="text-white font-medium">1 hr touch, 4 hrs recoat</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">VOC Content</span>
                          <span className="text-white font-medium">&lt; 50 g/L (Low VOC)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">UV Resistance</span>
                          <span className="text-white font-medium">15+ years</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Washability</span>
                          <span className="text-white font-medium">25,000+ cycles (ASTM D2486)</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-gray-300">Mold/Mildew Resistance</span>
                          <span className="text-white font-medium">Excellent (ASTM D3273)</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-amber-600/10">
                        <h4 className="font-semibold text-amber-300 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Application Advantages
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• One-coat coverage for most applications</li>
                          <li>• No primer required on properly prepared surfaces</li>
                          <li>• Self-leveling for reduced brush/roller marks</li>
                          <li>• Excellent edge retention and hide</li>
                          <li>• Simple clean-up with soap and water</li>
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
              {/* Enhanced Green glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-green-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-green-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-green-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-200 to-green-300">
                  Business Growth & Profitability Impact
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Profit Margin Transformation</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Premium Positioning</h4>
                            <p className="text-gray-300">SON-SHIELD products command 2.5-3.5x higher price points than standard paints, while material costs are only 1.8x higher, creating substantial margin expansion. Painters report 45-65% gross profit margins compared to 25-30% with conventional coatings.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Labor Efficiency</h4>
                            <p className="text-gray-300">Single-coat application reduces labor time by 28-35% per project, while self-leveling properties reduce touch-up work by 80%. Painters report completing 3-4 more projects monthly with the same crew size after switching to SON-SHIELD.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Warranty Callback Elimination</h4>
                            <p className="text-gray-300">Painting contractors report 92% fewer warranty callbacks with SON-SHIELD compared to standard paints, eliminating an average of $15,000-$25,000 in annual unpaid labor costs and remediation expenses.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Business Growth Acceleration</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <TrendingUp className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Market Differentiation</h4>
                            <p className="text-gray-300">Painters offering SON-SHIELD report 75% reduced price competition, winning 3.2x more projects without being the lowest bidder. Your business escapes commodity status by offering exclusive, premium-performance solutions unavailable from competitors.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <TrendingUp className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Client Retention & Referrals</h4>
                            <p className="text-gray-300">SON-SHIELD contractors achieve 82% client retention rates (vs. industry average of 22%) and generate 3.8x more referrals per project than when offering standard paints, dramatically reducing marketing expenses and customer acquisition costs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <TrendingUp className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Business Model Transformation</h4>
                            <p className="text-gray-300">Painting contractors offering SON-SHIELD report 2.5x faster revenue growth and 44% improved cash flow stability due to year-round project opportunities and reduced seasonality impacts.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Contractor Success Stories</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Elite Pro Painting, Chicago</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          "After introducing SON-SHIELD to our service offerings in 2022, we've completely transformed our business model. We've increased our average project value by 210%, reduced our labor costs by 32%, and now exclusively target high-end residential clients who value quality over price. Our revenue increased from $780K to $1.7M in just 18 months with the same number of employees."
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Revenue Growth: 118%</span>
                          <span className="text-green-400">Net Profit Increase: 245%</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Superior Coatings, Dallas</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          "We were struggling with price competition and thin margins until we became a SON-SHIELD dealer in 2021. Now we're the exclusive provider of ceramic coatings in our area, charging premium rates while delivering extraordinary results. Our callbacks are virtually zero, customer satisfaction is off the charts, and we've grown from 4 employees to 15 in under two years."
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Team Growth: 275%</span>
                          <span className="text-green-400">Profit Margins: 52%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Profitability Comparison</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] text-left">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="p-3 text-gray-400">Metric</th>
                            <th className="p-3 text-gray-400">Standard Paint</th>
                            <th className="p-3 text-green-400">SON-SHIELD</th>
                            <th className="p-3 text-blue-400">Advantage</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr className="border-b border-gray-800">
                            <td className="p-3 text-white">Average Residential Project Revenue</td>
                            <td className="p-3 text-gray-300">$4,800</td>
                            <td className="p-3 text-green-300">$12,500</td>
                            <td className="p-3 text-blue-300">+160%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-3 text-white">Material Cost (% of Revenue)</td>
                            <td className="p-3 text-gray-300">18%</td>
                            <td className="p-3 text-green-300">22%</td>
                            <td className="p-3 text-blue-300">+4%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-3 text-white">Labor Cost (% of Revenue)</td>
                            <td className="p-3 text-gray-300">52%</td>
                            <td className="p-3 text-green-300">28%</td>
                            <td className="p-3 text-blue-300">-24%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-3 text-white">Gross Profit Margin</td>
                            <td className="p-3 text-gray-300">30%</td>
                            <td className="p-3 text-green-300">50%</td>
                            <td className="p-3 text-blue-300">+20%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-3 text-white">Average Monthly Projects</td>
                            <td className="p-3 text-gray-300">8</td>
                            <td className="p-3 text-green-300">12</td>
                            <td className="p-3 text-blue-300">+50%</td>
                          </tr>
                          <tr>
                            <td className="p-3 text-white">Conversion Rate (Estimates to Jobs)</td>
                            <td className="p-3 text-gray-300">18%</td>
                            <td className="p-3 text-green-300">42%</td>
                            <td className="p-3 text-blue-300">+133%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <Button 
                        className="relative group overflow-hidden bg-black border border-green-400 hover:border-green-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300 flex items-center">
                          <Calculator className="w-5 h-5 mr-2" />
                          Calculate Your Business Impact
                        </span>
                        <span className="absolute -inset-[3px] bg-green-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                      </Button>
                    </div>
                  </div>
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
                  Become a Praetorian Painting Dealer
                </h2>
                
                {!showRegistrationForm && !registrationSuccess && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md max-w-3xl mx-auto mb-8">
                      <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Exclusive Dealer Benefits</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Exclusive territorial rights for your service area</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Comprehensive training and certification program</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Custom marketing materials and lead generation</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Technical support and application guidance</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Premium pricing and high-margin products</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Extended warranty backing from Praetorian</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Business growth coaching and support</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Access to premium commercial accounts</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-4 rounded-lg mb-8">
                        <h4 className="font-semibold text-white mb-3 text-center">Ideal Dealer Profile</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Established painting contractors with proven track record</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Business owners seeking premium market differentiation</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Companies focused on quality over lowest-price competition</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Paint retailers looking to offer premium installation services</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          onClick={handleShowRegistrationForm}
                        >
                          <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300 flex items-center">
                            Apply to Become A Dealer
                          </span>
                          <span className="absolute -inset-[3px] bg-purple-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Dealer Application Form */}
                {showRegistrationForm && !registrationSuccess && (
                  <div className="max-w-4xl mx-auto">
                    <Form {...registrationForm}>
                      <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-6">
                        {/* Company Information */}
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md">
                          <h3 className="text-xl font-bold mb-4 text-purple-300">Company Information</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={registrationForm.control}
                              name="companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Company Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter company name" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Primary Contact Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter contact name" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Email Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter email address" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="confirmEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Confirm Email</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Confirm email address" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter phone number" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="companyAddress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Company Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter company address" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">City</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter city" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">State/Province</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter state" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">ZIP/Postal Code</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter ZIP code" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        {/* Business Details */}
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md">
                          <h3 className="text-xl font-bold mb-4 text-purple-300">Business Details</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={registrationForm.control}
                              name="licenseNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Contractor License Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter license number" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="yearsInBusiness"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Years in Business</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter years in business" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="employeeCount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Number of Employees</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter employee count" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="annualRevenue"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Annual Revenue</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                        <SelectValue placeholder="Select revenue range" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                      <SelectItem value="Under $250K">Under $250K</SelectItem>
                                      <SelectItem value="$250K - $500K">$250K - $500K</SelectItem>
                                      <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                                      <SelectItem value="$1M - $3M">$1M - $3M</SelectItem>
                                      <SelectItem value="$3M+">$3M+</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="servicesOffered"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-gray-200">Services Offered</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select all that apply
                                    </FormDescription>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      "Residential Exterior",
                                      "Residential Interior",
                                      "Commercial Exterior",
                                      "Commercial Interior",
                                      "Industrial Coatings",
                                      "Specialty Finishes",
                                      "Deck & Fence Staining",
                                      "Pressure Washing"
                                    ].map((service) => (
                                      <FormField
                                        key={service}
                                        control={registrationForm.control}
                                        name="servicesOffered"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={service}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(service)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, service])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== service
                                                          )
                                                        )
                                                  }}
                                                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                                />
                                              </FormControl>
                                              <FormLabel className="text-gray-300 font-normal">
                                                {service}
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
                              control={registrationForm.control}
                              name="certifications"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-gray-200">Certifications</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select all that apply
                                    </FormDescription>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      "EPA Lead-Safe Certified",
                                      "PDCA Member",
                                      "NACE Certified",
                                      "SSPC Certified",
                                      "Other Industry Certification"
                                    ].map((cert) => (
                                      <FormField
                                        key={cert}
                                        control={registrationForm.control}
                                        name="certifications"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={cert}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(cert)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, cert])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== cert
                                                          )
                                                        )
                                                  }}
                                                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                                />
                                              </FormControl>
                                              <FormLabel className="text-gray-300 font-normal">
                                                {cert}
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
                          </div>
                          
                          <div className="mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Business Goals</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us about your business goals and why you're interested in becoming a Praetorian Smart-Coat dealer" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <FormField
                            control={registrationForm.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-gray-300 font-normal">
                                    I agree to the terms and conditions, including the confidentiality and non-disclosure agreement for Praetorian Smart-Coat dealers.
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-center pt-4">
                          <Button 
                            type="submit"
                            className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          >
                            <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300">
                              Submit Application
                            </span>
                            <span className="absolute -inset-[3px] bg-purple-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
                
                {/* Application Success */}
                {registrationSuccess && (
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-lg border border-green-500/30 shadow-md text-center">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">Application Submitted Successfully!</h3>
                      <p className="text-gray-300 mb-6">
                        Thank you for your interest in becoming a Praetorian Smart-Coat dealer. Our team will review your application and contact you within 2-3 business days to discuss next steps.
                      </p>
                      <p className="text-gray-300 mb-8">
                        While you wait, you may want to explore our painter resources section for more detailed information about our products and technologies.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400">
                          View Dealer Resources
                        </Button>
                        <Button variant="outline" className="border-blue-500 text-blue-400 hover:text-blue-300 hover:border-blue-400">
                          Return to Home Page
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
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
                    Request Your Business Consultation
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-center">
                    Complete the form below, and one of our painting business specialists will contact you to discuss how SON-SHIELD can transform your contracting business.
                  </p>
                  
                  <Form {...consultationForm}>
                    <form onSubmit={consultationForm.handleSubmit(onConsultationSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={consultationForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">First Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your first name" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={consultationForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Last Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your last name" 
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
                          control={consultationForm.control}
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
                        
                        <FormField
                          control={consultationForm.control}
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
                      </div>
                      
                      <FormField
                        control={consultationForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Company Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your company name" 
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={consultationForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">City</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter city" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={consultationForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">State</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter state" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={consultationForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">ZIP Code</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter ZIP code" 
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
                          control={consultationForm.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Primary Business Focus</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                    <SelectValue placeholder="Select business type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
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
                          control={consultationForm.control}
                          name="coatingNeeds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Primary Service Area</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                    <SelectValue placeholder="Select service focus" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                  <SelectItem value="exterior">Exterior</SelectItem>
                                  <SelectItem value="interior">Interior</SelectItem>
                                  <SelectItem value="both">Both Interior & Exterior</SelectItem>
                                  <SelectItem value="specialized">Specialized Coatings</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={consultationForm.control}
                        name="additionalDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Business Goals</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your business and what you'd like to achieve with premium coatings" 
                                className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={consultationForm.control}
                        name="agreesToTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-gray-300 font-normal">
                                I agree to receive communications regarding Praetorian Smart-Coat products and services
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-center">
                        <Button 
                          type="submit"
                          className="relative group overflow-hidden bg-black border border-blue-400 hover:border-blue-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                        >
                          <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                            Submit Request
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
                    Consultation Request Received!
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Thank you for your interest in Praetorian Smart-Coat painting solutions. One of our business specialists will contact you within 24 hours to discuss how our premium coating systems can transform your contracting business.
                  </p>
                  <p className="text-gray-300 mb-8 text-center">
                    In the meantime, you may want to explore our painting professional resources for more information about our products and profit opportunities.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400">
                      Browse Painter Resources
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
        
        {/* CTA Footer Section */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative">
              {/* Blue glow */}
              <div className="absolute -inset-10 bg-blue-500/10 rounded-xl blur-xl opacity-70 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-blue-700/20 shadow-lg">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="lg:w-2/3">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      Ready to Transform Your Painting Business?
                    </h2>
                    <p className="text-gray-300">
                      Join the growing network of professional painters using Praetorian Smart-Coat to increase profits, deliver superior results, and build a sustainable premium business.
                    </p>
                  </div>
                  
                  <div className="lg:w-1/3 flex flex-wrap gap-4 justify-center lg:justify-end">
                    <Button 
                      className="relative group overflow-hidden bg-black border border-blue-400 hover:border-blue-300 transition-all duration-300 px-6 py-2 shadow-lg"
                      onClick={handleShowConsultationForm}
                    >
                      <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                        Request Consultation
                      </span>
                      <span className="absolute -inset-[3px] bg-blue-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                    </Button>
                    
                    <Button 
                      className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-6 py-2 shadow-lg"
                      onClick={handleShowRegistrationForm}
                    >
                      <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300">
                        Become a Dealer
                      </span>
                      <span className="absolute -inset-[3px] bg-purple-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}