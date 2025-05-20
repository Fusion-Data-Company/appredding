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
  Anchor, 
  ShieldCheck, 
  Sun,
  Settings,
  TrendingUp,
  Ship, 
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
  ArrowRight,
  AlertTriangle,
  Calculator
} from "lucide-react";
import { insertMarinaProfessionalSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

type MarinaProfessionalFormValues = z.infer<typeof insertMarinaProfessionalSchema>;

// Marina dealer registration form schema
const marinaDealerSchema = z.object({
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
  serviceAreaMiles: z.string().min(1, { message: "Service area is required" }),
  employeeCount: z.string().min(1, { message: "Employee count is required" }),
  annualRevenue: z.string().min(1, { message: "Annual revenue is required" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
  notes: z.string().optional(),
});

export default function Marinas() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Marina Protection";
  const slug = "marinas";
  const pageTitle = "Praetorian Smart-Coat – Marina & Marine Protection Solutions";
  const pageDescription = "Advanced ceramic coatings for marinas, docks, and marine infrastructure. Protect surfaces from salt water, UV damage, and harsh marine environments.";
  const heroImagePath = "/src/assets_dir/images/marina-hero.jpg";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/images/sailboat-bg.jpg"
    ]);
  }, []);

  // Setup form for consultation form
  const form = useForm<MarinaProfessionalFormValues>({
    resolver: zodResolver(insertMarinaProfessionalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      projectType: "",
      message: ""
    },
  });

  // Mutation for consultation form
  const consultationMutation = useMutation({
    mutationFn: async (data: MarinaProfessionalFormValues) => {
      return await apiRequest("/api/marina/consultation", {
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

  const onSubmit = (data: MarinaProfessionalFormValues) => {
    consultationMutation.mutate(data);
  };

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };
  
  // Setup dealer/distributor application form
  const registrationForm = useForm<z.infer<typeof marinaDealerSchema>>({
    resolver: zodResolver(marinaDealerSchema),
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
      serviceAreaMiles: "",
      employeeCount: "",
      annualRevenue: "",
      termsAccepted: false,
      notes: ""
    },
  });
  
  // Handle dealer application form submission
  const onRegistrationSubmit = (values: z.infer<typeof marinaDealerSchema>) => {
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
          'marina dock coating',
          'salt water resistant paint',
          'marine infrastructure protection',
          'boat slip coating',
          'anti-corrosion marine coating'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Superior salt water corrosion resistance",
          "UV-resistant protection for marine environments",
          "Anti-slip safety features for docks and piers",
          "Waterproof ceramic barrier coating"
        ])}
      />
      
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with marine theme */}
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
                      Premium Marina & Marine Protection
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Praetorian Smart-Coat delivers cutting-edge ceramic coating technology specifically formulated for marinas, docks, and marine infrastructure. Our advanced ceramic formula creates a superior protective barrier against salt water corrosion, UV damage, and extreme marine environments.
                      </p>
                      <p className="text-lg">
                        Extend the life of your marine structures while creating safer, more durable environments for boat owners and marina visitors.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Waves className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Salt Water Resistant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">UV Protection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Anti-Slip Safety</span>
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
                      src="/images/sailboat-bg.jpg" 
                      alt="Marina and dock protection by Praetorian Smart-Coat" 
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
                      <p className="text-sm text-gray-300 text-center">SON-SHIELD ceramic technology protecting marina docks and marine infrastructure</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Salt Resistance</p>
                    <p className="text-3xl font-bold text-white">15+ Years<sup className="text-blue-300 text-xs">*</sup></p>
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
                  Critical Marina Protection Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Salt Water Corrosion</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Traditional wood docks experience 50-75% shorter lifespans in marine environments without proper protection</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Metal infrastructure corrodes 5-10x faster in saltwater environments than in non-marine settings</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Concrete supports can lose up to 40% of structural integrity within 7-10 years due to saltwater penetration</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Salt spray accelerates deterioration of electrical systems and fixtures by 300-400%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Environmental Extremes</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Intense UV exposure degrades traditional coatings in marine environments within 2-3 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Constant moisture exposure leads to accelerated biological growth, requiring harsh chemical treatments</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Temperature fluctuations cause expansion/contraction cycles that crack standard coatings</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Extreme weather events are occurring with 40% higher frequency, significantly increasing infrastructure stress</span>
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
                          <span className="text-gray-300">Average marina dock replacement costs range from $75-$150 per square foot ($750,000-$1.5M for a 10,000 sq ft dock system)</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Annual maintenance costs typically reach 8-12% of infrastructure replacement value</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Business interruption from dock repairs costs an average of $2,500-$5,000 per slip per month in lost revenue</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Insurance premiums increase 15-25% for marinas with documented maintenance issues</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Safety & Liability Concerns</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Slip and fall accidents on wet marina surfaces account for 65% of marina-related injuries</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Average liability claim for marina-related injuries exceeds $85,000</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Structural failures from corrosion have resulted in catastrophic damages exceeding $1M per incident</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Environmental regulations increasingly penalize marinas for chemical leaching from deteriorating infrastructure</span>
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
                  Advanced Marina Protection Technology
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">SON-SHIELD Marine Ceramic Technology</h3>
                    <p className="text-gray-300 mb-6">
                      Our proprietary SON-SHIELD ceramic formulation creates a multi-function protective system specifically engineered for marine environments. The unique microstructure delivers exceptional salt resistance, UV protection, and anti-slip safety while maintaining aesthetic appeal for years.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Waves className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">99.9%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Salt Water Resistance</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Sun className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">15+ Years<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">UV Resistance</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <ShieldCheck className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">Class A<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Slip Resistance Rating</p>
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
                            <h4 className="font-semibold text-white mb-1">Salt Barrier Layer</h4>
                            <p className="text-gray-300 text-sm">Advanced ceramic compounds create an impenetrable salt barrier that prevents chloride ion penetration to the substrate, blocking the primary cause of marine corrosion.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">UV Protection Matrix</h4>
                            <p className="text-gray-300 text-sm">Specialized ceramic components reflect and absorb damaging UV radiation, preventing degradation of the substrate while maintaining color stability for years in harsh marine environments.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Anti-Slip Safety Surface</h4>
                            <p className="text-gray-300 text-sm">Engineered texture creates a microscopically rough surface that maintains slip resistance even when wet, dramatically improving safety while remaining comfortable for bare feet.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Biocidal Protection</h4>
                            <p className="text-gray-300 text-sm">Integrated biocidal components resist algae, mold, and mildew growth without harmful leaching, reducing maintenance needs and preserving aesthetic appearance.</p>
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
                          <span className="text-white font-medium">70-90 sq ft/gallon</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Dry Time</span>
                          <span className="text-white font-medium">4 hrs touch, 24 hrs full cure</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">VOC Content</span>
                          <span className="text-white font-medium">&lt; 50 g/L (Low VOC)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Salt Spray Resistance</span>
                          <span className="text-white font-medium">10,000+ hrs (ASTM B117)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Slip Resistance</span>
                          <span className="text-white font-medium">Class A (ASTM D2047)</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-gray-300">UV Resistance</span>
                          <span className="text-white font-medium">Excellent (ASTM G154)</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-amber-600/10">
                        <h4 className="font-semibold text-amber-300 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Compatible Substrates
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Wood (pressure-treated, composite, hardwood)</li>
                          <li>• Concrete (all grades and finishes)</li>
                          <li>• Metal (aluminum, galvanized, stainless steel)</li>
                          <li>• Fiberglass and composite materials</li>
                          <li>• Previously coated surfaces (with proper preparation)</li>
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
                            <h4 className="font-semibold text-white mb-1">Extended Infrastructure Life</h4>
                            <p className="text-gray-300">Marine structures protected with SON-SHIELD coating last 2-3 times longer than unprotected structures, deferring major capital expenses by 10-15 years and saving up to 70% of replacement costs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Reduced Maintenance Costs</h4>
                            <p className="text-gray-300">Annual maintenance expenses are reduced by 50-65% through elimination of painting cycles, reduced cleaning requirements, and minimal repair needs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Insurance Premium Reductions</h4>
                            <p className="text-gray-300">Many insurers offer 10-20% premium reductions for marinas with documented professional protection systems that reduce slip-and-fall risks and structural failure potential.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Revenue Protection</h4>
                            <p className="text-gray-300">Eliminating business interruptions from dock repairs and maintenance preserves rental income and prevents customer migration to competing facilities.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Performance Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Enhanced Safety</h4>
                            <p className="text-gray-300">Class A slip resistance dramatically reduces fall incidents while maintaining comfort for barefoot traffic, protecting both marina visitors and reducing liability exposure.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Superior Aesthetics</h4>
                            <p className="text-gray-300">Our coatings maintain color stability and resist staining, algae growth, and discoloration for years in marine conditions, preserving the premium appearance of your facility.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Environmental Compliance</h4>
                            <p className="text-gray-300">Low-VOC formulation and non-leaching biocides meet or exceed all environmental regulations for waterfront applications, protecting your facility from regulatory penalties.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">All-Weather Performance</h4>
                            <p className="text-gray-300">Maintains protective properties in temperature extremes from -40°F to 250°F, ensuring year-round protection regardless of climate conditions.</p>
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
                        <h4 className="font-semibold text-white mb-2">Gulf Coast Marina</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          A 120-slip marina on Florida's Gulf Coast applied SON-SHIELD coating to all dock surfaces and pilings in 2018. After Hurricane Ian in 2022, the marina reported 95% less damage than neighboring facilities, with minimal structural repairs needed despite direct impact from the Category 4 storm.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Damage Reduction: 95%</span>
                          <span className="text-green-400">ROI: 8.5:1</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Newport Harbor Yacht Club</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          After applying SON-SHIELD to their aging dock system in 2019, Newport Harbor Yacht Club documented a 72% reduction in annual maintenance costs and complete elimination of slip-and-fall incidents on their docks. The club avoided a planned $2.1M dock replacement, extending infrastructure life by an estimated 12+ years.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Maintenance Cost Reduction: 72%</span>
                          <span className="text-green-400">Capital Expense Deferred: $2.1M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="relative group overflow-hidden bg-black border border-green-400 hover:border-green-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                    onClick={handleShowConsultationForm}
                  >
                    <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Request ROI Analysis
                    </span>
                    <span className="absolute -inset-[3px] bg-green-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                  </Button>
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
                  Become a Praetorian Marine Coating Dealer
                </h2>
                
                {!showRegistrationForm && !registrationSuccess && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md max-w-3xl mx-auto mb-8">
                      <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Dealer Benefits</h3>
                      
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
                            <span className="text-gray-300">Marketing support and lead generation resources</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Technical support and application guidance</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">High-margin product with 40-60% gross profit potential</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Year-round business opportunity in the marine sector</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Complementary service for marine contractors and services</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Differentiate your business with exclusive technology</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-4 rounded-lg mb-8">
                        <h4 className="font-semibold text-white mb-3 text-center">Ideal Dealer Profile</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Marine service providers, dock builders, and marine contractors</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Waterproofing specialists expanding into marine applications</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Commercial painting contractors serving coastal markets</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Marine supply distributors looking to offer installation services</span>
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
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="servicesOffered"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-gray-200">Current Services Offered</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select all that apply
                                    </FormDescription>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      "Dock Construction/Repair",
                                      "Marine Painting/Coating",
                                      "Marina Management",
                                      "Waterproofing",
                                      "Marine Construction",
                                      "Boat Maintenance",
                                      "Marine Equipment Sales",
                                      "Other"
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
                          
                          <div className="mt-4">
                            <FormField
                              control={registrationForm.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Additional Information</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us about your business and why you're interested in becoming a dealer" 
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
                                    I agree to the terms and conditions, including the confidentiality and non-disclosure agreement for Praetorian marine coating dealers.
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
                        Thank you for your interest in becoming a Praetorian Smart-Coat marine products dealer. Our team will review your application and contact you within 2-3 business days to discuss next steps.
                      </p>
                      <p className="text-gray-300 mb-8">
                        While you wait, you may want to explore our resources section for more detailed information about our products and technologies.
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
                    Request Your Free Consultation
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-center">
                    Complete the form below, and one of our marine protection specialists will contact you within 24 hours to discuss your specific needs.
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
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Project Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                <SelectItem value="Marina Dock System">Marina Dock System</SelectItem>
                                <SelectItem value="Boat Slips">Boat Slips</SelectItem>
                                <SelectItem value="Pilings">Pilings</SelectItem>
                                <SelectItem value="Waterfront Structure">Waterfront Structure</SelectItem>
                                <SelectItem value="Commercial Marine">Commercial Marine</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your project or protection needs" 
                                className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-center">
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
                    Thank you for your interest in Praetorian Smart-Coat marine protection solutions. One of our specialists will contact you within 24 hours to discuss your specific needs and schedule your free consultation.
                  </p>
                  <p className="text-gray-300 mb-8 text-center">
                    In the meantime, you may want to explore our resource library for more information on protecting your marine infrastructure.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400">
                      Browse Marine Protection Resources
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
                      Ready to Protect Your Marina Investment?
                    </h2>
                    <p className="text-gray-300">
                      Join the growing network of marinas and marine service providers using Praetorian Smart-Coat to extend infrastructure life, reduce maintenance costs, and improve safety.
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