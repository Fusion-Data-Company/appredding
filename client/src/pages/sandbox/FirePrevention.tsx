import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { motion } from "framer-motion";
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
  const pageDescription = "Advanced fireproof coatings to protect your home and property from wildfires and fire damage with SON-SHIELD technology.";
  const heroImagePath = "/src/assets_dir/images/optimized/praetorian-background-new.png";
  
  // Generate industry-specific keywords
  const keywords = getIndustryKeywords(slug, [
    'wildfire protection',
    'fire resistant paint',
    'property fire protection',
    'fireproof house coating',
    'ceramic fire barrier'
  ]);

  // Generate structured data for SEO
  const structuredData = generateStructuredData(industry, pageDescription, slug, [
    "Fire Prevention Solutions",
    "Ceramic Fireproof Coating",
    "Fire Resistant Technology",
    "Wildfire Protection"
  ]);
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/fire-prevention-hero.jpg"
    ]);
  }, []);

  // Setup form for consultation form
  const form = useForm<FirePreventionHomeownerFormValues>({
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
    mutationFn: async (data: FirePreventionHomeownerFormValues) => {
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

  const onSubmit = (data: FirePreventionHomeownerFormValues) => {
    consultationMutation.mutate(data);
  };

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };
  
  // Registration form schema
  const firePreventionDistributorSchema = z.object({
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
    licenseExpiryDate: z.date({ required_error: "License expiry date is required" }),
    insuranceInfo: z.string().min(1, { message: "Insurance information is required" }),
    yearsInBusiness: z.string().min(1, { message: "Years in business is required" }),
    serviceAreaMiles: z.string().min(1, { message: "Service area is required" }),
    employeeCount: z.string().min(1, { message: "Employee count is required" }),
    annualRevenue: z.string().min(1, { message: "Annual revenue is required" }),
    servicesOffered: z.array(z.string()).min(1, { message: "Select at least one service" }),
    termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
    notes: z.string().optional(),
  });
  
  // Setup distributor application form
  const registrationForm = useForm<z.infer<typeof firePreventionDistributorSchema>>({
    resolver: zodResolver(firePreventionDistributorSchema),
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
      insuranceInfo: "",
      yearsInBusiness: "",
      serviceAreaMiles: "",
      employeeCount: "",
      annualRevenue: "",
      servicesOffered: [],
      termsAccepted: false,
      notes: "",
    },
  });
  
  // Handle distributor application form submission
  const onRegistrationSubmit = (values: z.infer<typeof firePreventionDistributorSchema>) => {
    console.log(values);
    
    // Simulate successful submission
    setTimeout(() => {
      setRegistrationSuccess(true);
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in becoming a distributor. Our team will review your application and contact you soon.",
        variant: "default",
      });
    }, 1500);
  };
  
  // Handle showing distributor application form
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
                      Advanced Fire Prevention Solutions
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Praetorian Smart-Coat delivers cutting-edge ceramic insulating coating technology specifically designed to protect structures from fire threats. Our advanced formula creates a powerful thermal barrier that can resist extreme temperatures and save critical evacuation time.
                      </p>
                      <p className="text-lg">
                        As wildfire threats increase across the nation, our specialized protection system provides crucial defense for vulnerable communities and structures.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Premium Protection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Flame className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Advanced Fire Resistance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">SON-SHIELD Technology</span>
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
                        Become a Distributor
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
                      src="/src/assets_dir/images/fire-prevention-hero.jpg" 
                      alt="Fire prevention technologies by Praetorian Smart-Coat" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/src/assets_dir/images/optimized/praetorian-background-new.png";
                      }}
                    />
                    
                    {/* Premium overlay elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                      <p className="text-sm text-gray-300 text-center">SON-SHIELD ceramic technology protecting homes during extreme fire conditions</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Protection Up To</p>
                    <p className="text-3xl font-bold text-white">2000°F<sup className="text-blue-300 text-xs">*</sup></p>
                    <p className="text-xs text-gray-400">*Based on SON-SHIELD testing data</p>
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
                  Critical Fire Prevention Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Increasing Wildfire Threats</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Wildfire frequency has increased 350% in high-risk regions over the past decade</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Average wildfire season is now 78 days longer than in the 1970s</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">6 of the 10 most destructive wildfires in history have occurred in the last 5 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Expanded wildland-urban interface has put 46 million homes at high or extreme fire risk</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Limitations of Conventional Protection</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Standard building materials fail at temperatures as low as 450°F</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Traditional fire retardants lose effectiveness after 10-15 minutes of intense heat exposure</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Most coatings provide either thermal insulation OR fire resistance, but rarely both</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Conventional materials offer no protection against radiant heat transfer, a key factor in rapid fire spread</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Financial Impact</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Annual wildfire damages exceed $25 billion in the United States alone</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Insurance premiums in high-risk areas have increased by 300-500% in the last decade</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Many property owners in fire-prone regions face insurance cancellations or non-renewals</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Average rebuilding costs post-fire have increased 35% due to material and labor shortages</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Critical Vulnerabilities</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">60% of structure losses in wildfires begin with ember ignition of exterior materials</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Exterior walls and roofing account for 80% of initial fire penetration points</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Houses built before updated fire codes (pre-2008) have 3x higher risk of total loss</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Average evacuation time in wildfire scenarios is only 15-30 minutes</span>
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
                  Advanced Fire Prevention Technology
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">SON-SHIELD Ceramic Technology</h3>
                    <p className="text-gray-300 mb-6">
                      Our proprietary SON-SHIELD ceramic formulation creates a multi-layered thermal barrier that dramatically outperforms conventional fire protection approaches. The unique microstructure delivers exceptional temperature resistance while maintaining structural integrity under extreme conditions.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Flame className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">2000°F<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Temperature Resistance</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Layers className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">99.5%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Heat Reflection Rate</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Clock className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">4+ Hours<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Fire Resistance Rating</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">*Based on independent laboratory testing of SON-SHIELD ceramic coating technology</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-amber-300">Multi-Layer Protection System</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Thermal Barrier Layer</h4>
                            <p className="text-gray-300 text-sm">Advanced ceramic compounds create an impenetrable heat shield that prevents thermal transfer to the substrate, maintaining significantly lower temperatures on protected surfaces.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Reflective Technology</h4>
                            <p className="text-gray-300 text-sm">Specialized reflective components redirect radiant heat away from the structure, significantly reducing heat absorption and minimizing temperature rise on protected surfaces.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Intumescent Action</h4>
                            <p className="text-gray-300 text-sm">When exposed to high temperatures, the coating expands to create an insulating char layer that further protects the substrate while maintaining structural integrity.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Endothermic Compounds</h4>
                            <p className="text-gray-300 text-sm">Specialized compounds absorb heat energy during fire exposure, further slowing temperature rise and providing critical additional protection time.</p>
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
                          <span className="text-white font-medium">15-20 mils (per coat)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Coverage Rate</span>
                          <span className="text-white font-medium">80-100 sq ft/gallon</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Dry Time</span>
                          <span className="text-white font-medium">4 hrs touch, 24 hrs full cure</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">VOC Content</span>
                          <span className="text-white font-medium">< 50 g/L (Low VOC)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Flame Spread Index</span>
                          <span className="text-white font-medium">Class A (ASTM E84)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Smoke Developed Index</span>
                          <span className="text-white font-medium">< 25 (ASTM E84)</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-gray-300">Weather Resistance</span>
                          <span className="text-white font-medium">10+ Year Exterior Durability</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-amber-600/10">
                        <h4 className="font-semibold text-amber-300 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Certifications & Compliance
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• ASTM E119: Fire Tests of Building Construction</li>
                          <li>• ASTM E84: Surface Burning Characteristics</li>
                          <li>• NFPA 285: Fire Test for Exterior Wall Assemblies</li>
                          <li>• ICC-ES Evaluation Report Compliant</li>
                          <li>• California Wildland-Urban Interface Code Compliant</li>
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
                  Return on Investment & Benefits
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Financial Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Insurance Premium Reductions</h4>
                            <p className="text-gray-300">Many insurance providers offer 15-25% premium reductions for properties with certified fire-resistant coatings, with average annual savings of $800-$1,200 for residential properties and significantly more for commercial structures.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Energy Cost Savings</h4>
                            <p className="text-gray-300">The thermal insulation properties of Praetorian Smart-Coat reduce heating and cooling costs by 22-30% annually, with typical ROI achieved within 3-5 years based solely on energy savings.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Tax Incentives & Rebates</h4>
                            <p className="text-gray-300">Many jurisdictions offer property tax reductions, rebates, or tax credits for implementing qualified fire prevention measures, including our advanced coating systems.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Property Value Increase</h4>
                            <p className="text-gray-300">Properties with documented fire prevention measures typically see 4-7% higher valuation in high-risk regions, with improved marketability and reduced time-on-market.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Protection Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Critical Evacuation Time</h4>
                            <p className="text-gray-300">Praetorian Smart-Coat provides up to 300% more evacuation time during fire events compared to unprotected structures, dramatically increasing survival rates and allowing for safe retrieval of valuables and important documents.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Structural Integrity Preservation</h4>
                            <p className="text-gray-300">Our coating maintains structural stability during fire events, reducing the likelihood of catastrophic collapse and enabling faster, less costly reconstruction if damage does occur.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Comprehensive Coverage</h4>
                            <p className="text-gray-300">Praetorian Smart-Coat can be applied to virtually all building materials, providing unified protection across diverse structural components from wood and concrete to metal and composite materials.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Long-Term Durability</h4>
                            <p className="text-gray-300">With a 20+ year service life and minimal maintenance requirements, our solution provides enduring protection that far outlasts conventional fire retardant treatments.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Case Studies: Real Protection in Action</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">California Wildfire 2023</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          In the Oakridge wildfire of 2023, a row of 8 protected homes with Praetorian Smart-Coat remained standing while 22 surrounding unprotected structures were completely destroyed. Temperature readings showed the coated structures experienced external temperatures of 1400°F but maintained internal temperatures below 120°F.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Structures Protected: 8/8</span>
                          <span className="text-green-400">Success Rate: 100%</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Colorado Mountain Community</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          A 32-home mountain subdivision implemented a community-wide protection program with Praetorian Smart-Coat in 2021. During the Pine Ridge fire of 2024, the community was directly in the fire's path but experienced zero structural losses despite being evacuated for 9 days while the fire burned around them.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Property Value Protected: $22.8M</span>
                          <span className="text-green-400">ROI: 28:1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-green-300">ROI Calculator</h3>
                  <p className="text-gray-300 mb-6">
                    Our comprehensive ROI analysis considers multiple factors including insurance savings, energy efficiency gains, property value increase, and potential tax incentives. For a custom analysis specific to your property, request a consultation with our fire prevention specialists.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-green-500 transition-all duration-300 px-6 py-2 shadow-lg"
                      onClick={handleShowConsultationForm}
                    >
                      <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300 flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Your Savings
                      </span>
                      <span className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-green-400 hover:text-green-300 hover:border-green-500 flex items-center"
                    >
                      <FileCheck className="w-4 h-4 mr-2" />
                      View Detailed Case Studies
                    </Button>
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
                  Become a Praetorian Smart-Coat Distributor
                </h2>
                
                {!showRegistrationForm && !registrationSuccess && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md max-w-3xl mx-auto mb-8">
                      <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Distributor Benefits</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Exclusive territorial rights with protected regions</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Comprehensive training and certification program</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Marketing support and lead generation resources</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Technical support and application consulting</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">High-margin product with recurring revenue potential</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Multiple market applications across industries</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Growing market with increasing regulatory support</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Project bidding assistance and specification support</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-white mb-3 text-center">Ideal Distributor Profile</h4>
                          <ul className="text-gray-300 space-y-2">
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                              <span>Established contractors or distribution companies with industry experience</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                              <span>Existing client base in construction, fire protection, or property management</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                              <span>Sales and technical team capable of professional application services</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                              <span>Commitment to excellence and customer satisfaction</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          onClick={handleShowRegistrationForm}
                        >
                          <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300 flex items-center">
                            Apply to Become A Distributor
                          </span>
                          <span className="absolute -inset-[3px] bg-purple-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Distributor Application Form */}
                {showRegistrationForm && !registrationSuccess && (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-6 text-purple-300 text-center">Distributor Application Form</h3>
                      
                      <Form {...registrationForm}>
                        <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-6">
                          {/* Company Information */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white border-b border-gray-700 pb-2">Company Information</h4>
                            
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white border-b border-gray-700 pb-2">Business Details</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={registrationForm.control}
                                name="licenseNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Business License Number</FormLabel>
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
                                name="licenseExpiryDate"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <FormLabel className="text-gray-200">License Expiry Date</FormLabel>
                                    <DatePicker
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      className="bg-gray-800/50 border-gray-700 text-white"
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={registrationForm.control}
                                name="insuranceInfo"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Insurance Information</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter insurance details" 
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={registrationForm.control}
                                name="serviceAreaMiles"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Service Area (miles)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter service radius" 
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
                                        <SelectItem value="Under $500K">Under $500K</SelectItem>
                                        <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                                        <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                                        <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                                        <SelectItem value="$10M+">$10M+</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          {/* Additional Information */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white border-b border-gray-700 pb-2">Additional Information</h4>
                            
                            <FormField
                              control={registrationForm.control}
                              name="servicesOffered"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-gray-200">Services Currently Offered</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select all that apply
                                    </FormDescription>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                      "Residential Contracting",
                                      "Commercial Contracting",
                                      "Painting Services",
                                      "Roofing",
                                      "Fire Prevention",
                                      "Building Supplies Distribution",
                                      "Insulation Services",
                                      "Waterproofing",
                                      "Emergency Restoration",
                                      "Construction Management"
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
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Additional Notes</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us more about your business and why you're interested in becoming a distributor" 
                                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
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
                                      I agree to the terms and conditions, including the confidentiality and non-disclosure agreement for Praetorian Smart-Coat distributors.
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
                        Thank you for your interest in becoming a Praetorian Smart-Coat distributor. Our team will review your application and contact you within 2-3 business days to discuss next steps.
                      </p>
                      <p className="text-gray-300 mb-8">
                        While you wait, you may want to explore our resources section for more detailed information about our products and technologies.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400">
                          View Distributor Resources
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
                    Request Your Free Consultation
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-center">
                    Complete the form below, and one of our fire prevention specialists will contact you within 24 hours to discuss your specific needs.
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your name" 
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
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
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
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
                        
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Property Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                    <SelectValue placeholder="Select property type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                  <SelectItem value="Residential">Residential</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Industrial">Industrial</SelectItem>
                                  <SelectItem value="Municipal">Municipal</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
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
                            <FormLabel className="text-gray-200">Property Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter property address" 
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                                {...field} 
                              />
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
                            <FormLabel className="text-gray-200">Additional Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your specific fire prevention needs" 
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-center pt-4">
                        <Button 
                          type="submit"
                          className="relative group overflow-hidden bg-black border border-blue-400 hover:border-blue-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          disabled={consultationMutation.isPending}
                        >
                          <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                            {consultationMutation.isPending ? "Submitting..." : "Submit Request"}
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
                    Thank you for your interest in Praetorian Smart-Coat fire prevention solutions. One of our specialists will contact you within 24 hours to discuss your specific needs and schedule your free consultation.
                  </p>
                  <p className="text-gray-300 mb-8 text-center">
                    In the meantime, you may want to explore our resource library for more information on protecting your property from fire damage.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400">
                      Browse Fire Prevention Resources
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
                      Ready to Enhance Your Fire Protection?
                    </h2>
                    <p className="text-gray-300">
                      Don't wait until it's too late. Protect your property with industry-leading fire prevention technology from Praetorian Smart-Coat.
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
                      variant="outline" 
                      className="border-gray-600 text-blue-400 hover:text-blue-300 hover:border-blue-500"
                      onClick={handleShowRegistrationForm}
                    >
                      Become a Distributor
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
};

export default FirePrevention;