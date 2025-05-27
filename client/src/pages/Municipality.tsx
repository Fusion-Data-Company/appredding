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
  ShieldCheck, 
  Leaf, 
  Clock, 
  Landmark, 
  CircleDollarSign,
  Building,
  BadgeAlert,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  FileCheck, 
  Zap,
  AlertTriangle,
  Calculator,
  Shield,
  DollarSign,
  Percent
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

// Municipality consultation form schema
const municipalityConsultationSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  organizationName: z.string().min(2, { message: "Organization name is required" }),
  position: z.string().min(2, { message: "Position is required" }),
  projectType: z.string().min(1, { message: "Project type is required" }),
  message: z.string().min(10, { message: "Please provide project details" })
});

// Municipality dealer registration form schema
const municipalityDealerSchema = z.object({
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

export default function Municipality() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Municipal Infrastructure";
  const slug = "municipality";
  const pageTitle = "Advance Power – Municipal Solar Solutions";
  const pageDescription = "Large-scale solar installations for municipal buildings, public facilities, and community infrastructure. Reduce operational costs while demonstrating environmental leadership.";
  const heroImagePath = "/src/assets_dir/images/municipality-hero.jpg";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/optimized/praetorian-background-new.png"
    ]);
  }, []);

  // Setup consultation form
  const consultationForm = useForm<z.infer<typeof municipalityConsultationSchema>>({
    resolver: zodResolver(municipalityConsultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organizationName: "",
      position: "",
      projectType: "",
      message: ""
    },
  });

  // Handle consultation form submission
  const onConsultationSubmit = (values: z.infer<typeof municipalityConsultationSchema>) => {
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
  const registrationForm = useForm<z.infer<typeof municipalityDealerSchema>>({
    resolver: zodResolver(municipalityDealerSchema),
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
  const onRegistrationSubmit = (values: z.infer<typeof municipalityDealerSchema>) => {
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
          'municipal infrastructure protection',
          'government building coating',
          'public infrastructure maintenance',
          'bridge corrosion prevention',
          'water facility protection'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Long-term municipal asset protection",
          "Reduced infrastructure maintenance costs",
          "Enhanced public safety and compliance",
          "Energy-efficient building solutions"
        ])}
      />
      
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with municipal theme */}
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
                      Municipal Infrastructure Protection
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Praetorian Smart-Coat delivers cutting-edge ceramic coating technology specifically formulated for municipal infrastructure. Our advanced ceramic formula creates a superior protective barrier that extends asset life, reduces maintenance costs, and enhances public safety.
                      </p>
                      <p className="text-lg">
                        From government buildings to bridges, water facilities to public works, our specialized solutions provide long-term protection for your community's most critical infrastructure investments.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Infrastructure Protection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CircleDollarSign className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Budget Optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Landmark className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Public Asset Preservation</span>
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
                        Become a Contractor
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
                      alt="Municipal infrastructure protection with Praetorian Smart-Coat" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                    />
                    
                    {/* Premium overlay elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                      <p className="text-sm text-gray-300 text-center">SON-SHIELD ceramic technology protecting municipal infrastructure</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Asset Life Extension</p>
                    <p className="text-3xl font-bold text-white">Up to 300%<sup className="text-blue-300 text-xs">*</sup></p>
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
                  Critical Municipal Infrastructure Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Aging Infrastructure Crisis</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Over 47% of America's public infrastructure is rated in "poor" or "fair" condition by the American Society of Civil Engineers</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">The average age of government buildings exceeds 50 years, with critical systems functioning well beyond intended lifespans</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Deferred maintenance backlogs for municipal infrastructure average $43 per square foot nationwide</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">42% of municipal bridge structures show signs of significant deterioration requiring immediate intervention</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Water and wastewater facilities face rapidly accelerating corrosion rates with 36% requiring major rehabilitation within 5 years</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Budgetary Constraints</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Infrastructure funding gaps exceed $2.6 trillion nationally, with municipal governments facing the most severe shortfalls</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Maintenance allocations typically cover only 58% of actual infrastructure preservation needs</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Full replacement costs for critical infrastructure average 6-8x higher than preventive protection measures</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Rising material and labor costs have increased infrastructure rehabilitation expenses by 26% in the past three years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Emergency repairs typically cost 4-5x more than planned maintenance, yet reactive management remains the dominant approach</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Environmental & Regulatory Pressure</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Municipal buildings account for over 35% of local government energy consumption and carbon emissions</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">New energy efficiency mandates require 40-50% improvements in building performance by 2030</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Environmental regulations increasingly require elimination of harmful runoff from aging infrastructure</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Non-compliance with updated safety and accessibility standards exposes municipalities to significant liability</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Climate change resilience requirements are mandating costly infrastructure modifications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Public Impact & Safety Concerns</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Infrastructure failures directly impact public services and safety, with severe incidents increasing 28% over the past decade</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Deteriorating facilities contribute to poor indoor environmental quality, impacting employee health and productivity</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Emergency service disruptions from facility failures affect critical response times and public safety</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Liability claims related to infrastructure deficiencies have increased 145% in the past 5 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Public perception of government effectiveness is increasingly tied to visible infrastructure condition</span>
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
                  Advanced Municipal Protection Technology
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">SON-SHIELD Municipal Ceramic Technology</h3>
                    <p className="text-gray-300 mb-6">
                      Our proprietary SON-SHIELD ceramic formulation creates a multi-function protective system specifically engineered for municipal infrastructure requirements. The unique microstructure delivers exceptional environmental resistance, thermal performance, and long-term durability while maintaining compliance with public sector requirements.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Building className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">300%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Asset Life Extension</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Leaf className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">31.4%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Energy Efficiency Improvement</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <CircleDollarSign className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">67%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Maintenance Cost Reduction</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">*Based on independent laboratory testing and field performance data of SON-SHIELD ceramic coating technology</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-amber-300">Multi-Function Protection System</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Corrosion Defense Matrix</h4>
                            <p className="text-gray-300 text-sm">Specialized ceramic compounds create an impermeable barrier that blocks moisture, salt, and chemical penetration, preventing the primary causes of infrastructure deterioration.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Thermal Regulation System</h4>
                            <p className="text-gray-300 text-sm">Advanced ceramic technology reflects solar radiation and provides thermal insulation, dramatically reducing heating/cooling costs and improving energy efficiency ratings for public buildings.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Structural Integrity Enhancement</h4>
                            <p className="text-gray-300 text-sm">Penetrating ceramic particles bond at the molecular level with substrate materials, reinforcing structural elements and preventing microfractures from expanding into serious defects.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-400 font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">Environmental Compliance Features</h4>
                            <p className="text-gray-300 text-sm">Low-VOC, non-toxic formulation meets or exceeds all municipal environmental standards while preventing harmful runoff from treated surfaces, aiding in regulatory compliance.</p>
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
                          <span className="text-white font-medium">&lt; 50 g/L (Low VOC)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Fire Rating</span>
                          <span className="text-white font-medium">Class A (ASTM E84)</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-700">
                          <span className="text-gray-300">Weather Resistance</span>
                          <span className="text-white font-medium">Excellent (ASTM D6695)</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-gray-300">Service Life</span>
                          <span className="text-white font-medium">20+ Years</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-amber-600/10">
                        <h4 className="font-semibold text-amber-300 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Municipal Compliance
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• GSA Schedule Contract Approved</li>
                          <li>• LEED Credits Eligible</li>
                          <li>• FEMA Hazard Mitigation Approved</li>
                          <li>• ADA Compliant (slip resistance)</li>
                          <li>• Meets Buy American Act requirements</li>
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
                  Financial Impact & Budget Optimization
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Capital Expense Reduction</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Infrastructure Lifespan Extension</h4>
                            <p className="text-gray-300">Municipal assets protected with SON-SHIELD coatings experience 250-300% longer functional lifespans, dramatically deferring major capital replacement expenses by 15-20+ years. For every $1 invested in protective coating, municipalities save $5.80-$7.20 in future replacement costs.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Grant Eligibility Enhancement</h4>
                            <p className="text-gray-300">Projects incorporating SON-SHIELD qualify for numerous sustainability and infrastructure resilience grants, with municipalities reporting 40-65% higher approval rates for funding applications that include proven protective technologies.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Bond Rating Protection</h4>
                            <p className="text-gray-300">Demonstrable infrastructure protection programs positively impact municipal bond ratings by demonstrating fiscal responsibility and risk management, with rating agencies specifically noting proactive maintenance in evaluation criteria.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md h-full">
                      <h3 className="text-xl font-bold mb-4 text-green-300">Operational Budget Benefits</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-start">
                          <DollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Maintenance Cost Reduction</h4>
                            <p className="text-gray-300">Annual maintenance budgets show 55-70% reductions for protected infrastructure, with elimination of painting cycles, decreased cleaning requirements, and minimal repair needs. Documentation from existing municipal clients shows average annual savings of $2.25-$3.10 per square foot of treated surface.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <DollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Energy Cost Savings</h4>
                            <p className="text-gray-300">The thermal insulation properties of SON-SHIELD coatings reduce heating and cooling costs by 25-35% annually, with typical municipal buildings experiencing $1.15-$1.85 per square foot in energy expense reduction, meeting or exceeding energy efficiency mandates.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <DollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Insurance Premium Reductions</h4>
                            <p className="text-gray-300">Municipal insurance providers offer 8-15% premium reductions for properties with documented protection systems, recognizing the decreased risk of structural failures, water damage, and liability claims.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Case Studies: Infrastructure Protection ROI</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">City of Oakridge Municipal Building Complex</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          A 250,000 sq ft government complex in the Midwest applied SON-SHIELD to exterior walls, roof surfaces, and exposed infrastructure in 2020. The city documented a 31% reduction in energy costs, 64% reduction in maintenance expenses, and successfully deferred a planned $12.8M facade replacement project for an estimated 15+ years.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Total Implementation: $1.4M</span>
                          <span className="text-green-400">5-Year ROI: 318%</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600/10">
                        <h4 className="font-semibold text-white mb-2">Riverdale County Bridge System</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          A county transportation department applied SON-SHIELD to 14 bridges rated in "poor" condition in 2019. Independent structural analysis in 2023 documented arrested corrosion, eliminated water penetration, and significant restoration of structural integrity. The county reallocated $43.5M in planned replacement funds to other critical infrastructure needs.
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Cost Avoidance: $43.5M</span>
                          <span className="text-green-400">ROI: 1,740%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Municipal Budget Calculator</h3>
                    <p className="text-gray-300 mb-6">
                      Our specialized municipal budgeting tool provides comprehensive financial analysis tailored to your specific infrastructure protection needs. The calculator integrates current asset condition, projected maintenance schedules, energy modeling, and replacement cost projections to deliver accurate financial forecasting.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-green-600/10 text-center">
                        <h4 className="font-semibold text-green-300 mb-2">Typical 10-Year Capital Deferment</h4>
                        <p className="text-3xl font-bold text-white mb-1">$125-$180<span className="text-lg">/sq ft</span></p>
                        <p className="text-xs text-gray-400">Based on current municipal construction costs</p>
                      </div>
                      
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-green-600/10 text-center">
                        <h4 className="font-semibold text-green-300 mb-2">Annual Maintenance Savings</h4>
                        <p className="text-3xl font-bold text-white mb-1">$2.25-$3.10<span className="text-lg">/sq ft/yr</span></p>
                        <p className="text-xs text-gray-400">Based on documented municipal client data</p>
                      </div>
                      
                      <div className="bg-gray-900/70 p-4 rounded-lg border border-green-600/10 text-center">
                        <h4 className="font-semibold text-green-300 mb-2">Energy Cost Reduction</h4>
                        <p className="text-3xl font-bold text-white mb-1">25-35<span className="text-lg">%</span></p>
                        <p className="text-xs text-gray-400">Based on thermal performance testing</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        className="relative group overflow-hidden bg-black border border-green-400 hover:border-green-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300 flex items-center">
                          <Calculator className="w-5 h-5 mr-2" />
                          Request Budget Analysis
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
                  Become a Praetorian Municipal Contractor
                </h2>
                
                {!showRegistrationForm && !registrationSuccess && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-purple-700/20 shadow-md max-w-3xl mx-auto mb-8">
                      <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Contractor Benefits</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">GSA Schedule and procurement qualification support</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Comprehensive training and government certification</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Bid specification assistance and pre-qualification</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Technical support and application guidance</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">High-margin product with significant profit potential</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Recurring revenue from maintenance contracts</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Access to municipal funding program database</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Project estimating tools and presentation materials</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-4 rounded-lg mb-8">
                        <h4 className="font-semibold text-white mb-3 text-center">Ideal Contractor Profile</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Commercial or industrial painting contractors with government experience</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Building maintenance companies serving municipal clients</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Infrastructure service providers and specialty contractors</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Construction companies with government contracting experience</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          onClick={handleShowRegistrationForm}
                        >
                          <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300 flex items-center">
                            Apply to Become A Contractor
                          </span>
                          <span className="absolute -inset-[3px] bg-purple-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Contractor Application Form */}
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
                                      "Government Contracting",
                                      "Commercial Painting",
                                      "Building Maintenance",
                                      "Waterproofing",
                                      "Infrastructure Services",
                                      "Construction",
                                      "Facility Management",
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
                                  <FormLabel className="text-gray-200">Government Experience</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Please describe your experience with government and municipal projects" 
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
                                    I agree to the terms and conditions, including the confidentiality and non-disclosure agreement for Praetorian municipal contractors.
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
                        Thank you for your interest in becoming a Praetorian Smart-Coat municipal contractor. Our team will review your application and contact you within 2-3 business days to discuss next steps.
                      </p>
                      <p className="text-gray-300 mb-8">
                        While you wait, you may want to explore our municipal resource section for more detailed information about our products and technologies.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400">
                          View Contractor Resources
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
                    Request Your Municipal Consultation
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-center">
                    Complete the form below, and one of our municipal infrastructure specialists will contact you to discuss your specific needs and provide a detailed budget analysis.
                  </p>
                  
                  <Form {...consultationForm}>
                    <form onSubmit={consultationForm.handleSubmit(onConsultationSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={consultationForm.control}
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
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        
                        <FormField
                          control={consultationForm.control}
                          name="organizationName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Organization Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter organization name" 
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
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Position/Title</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your position" 
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
                                  <SelectItem value="Government Building">Government Building</SelectItem>
                                  <SelectItem value="Water Infrastructure">Water Infrastructure</SelectItem>
                                  <SelectItem value="Transportation Infrastructure">Transportation Infrastructure</SelectItem>
                                  <SelectItem value="Public Works">Public Works</SelectItem>
                                  <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                                  <SelectItem value="Other Municipal">Other Municipal</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={consultationForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe your infrastructure protection needs, including approximate square footage, current condition, and any specific challenges" 
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
                    Thank you for your interest in Praetorian Smart-Coat municipal infrastructure solutions. One of our specialists will contact you within 24 hours to discuss your specific needs and provide a detailed analysis.
                  </p>
                  <p className="text-gray-300 mb-8 text-center">
                    In the meantime, you may want to explore our municipal resource section for more information on protecting your critical infrastructure.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="border-green-500 text-green-400 hover:text-green-300 hover:border-green-400">
                      Browse Municipal Resources
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
                      Ready to Protect Your Municipal Assets?
                    </h2>
                    <p className="text-gray-300">
                      Join the growing number of municipalities using Praetorian Smart-Coat to extend infrastructure life, reduce maintenance costs, and optimize their budgets.
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
                        Become a Contractor
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