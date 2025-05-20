import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
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
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  FaBuilding, 
  FaHardHat, 
  FaShieldAlt, 
  FaChartLine, 
  FaTools, 
  FaLeaf, 
  FaFire, 
  FaSnowflake, 
  FaMoneyBillAlt, 
  FaPercentage, 
  FaRegLightbulb,
  FaTemperatureLow,
  FaCheckCircle,
  FaClock,
  FaPaintRoller,
  FaChartPie,
  FaHandHoldingUsd,
  FaUsers,
  FaHandshake,
  FaStar,
  FaDollarSign
} from "react-icons/fa";

import { RiBuilding2Line, RiShieldLine, RiFireLine } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import SimpleSEO from "@/components/SimpleSEO";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConstructionROICalculator from "@/components/ConstructionROICalculator";
import { CalendarIcon, CheckCircle, Info } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Form schema for contact
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(2, { message: "Company name is required" }),
  projectType: z.string().min(1, { message: "Please select a project type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

// Construction Professional Registration Form Schema
const constructionProfessionalFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  confirmEmail: z.string().email({ message: "Emails must match" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  companyAddress: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "ZIP code is required" }),
  website: z.string().optional(),
  licenseNumber: z.string().min(3, { message: "License number is required" }),
  licenseExpiryDate: z.date({ 
    required_error: "License expiry date is required" 
  }),
  insuranceInfo: z.string().min(5, { message: "Insurance information is required" }),
  yearsInBusiness: z.number().min(0, { message: "Years in business is required" }),
  constructionTypes: z.array(z.string()).min(1, { message: "Select at least one construction type" }),
  serviceAreas: z.array(z.string()).min(1, { message: "Select at least one service area" }),
  certifications: z.array(z.string()).optional(),
  notes: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine(
  (data) => data.email === data.confirmEmail,
  {
    message: "Emails do not match",
    path: ["confirmEmail"]
  }
);

const Construction = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [displayLearnMore, setDisplayLearnMore] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Contact form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      projectType: "",
      message: ""
    }
  });
  
  // Registration form setup for construction professionals
  const registrationForm = useForm<z.infer<typeof constructionProfessionalFormSchema>>({
    resolver: zodResolver(constructionProfessionalFormSchema),
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
      website: "",
      licenseNumber: "",
      licenseExpiryDate: undefined,
      insuranceInfo: "",
      yearsInBusiness: 0,
      constructionTypes: [],
      serviceAreas: [],
      certifications: [],
      notes: "",
      termsAccepted: false
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Form Submitted",
      description: "We've received your request and will contact you shortly.",
    });
    form.reset();
  }
  
  function onRegistrationSubmit(values: z.infer<typeof constructionProfessionalFormSchema>) {
    console.log(values);
    toast({
      title: "Registration Received",
      description: "Your application has been submitted successfully.",
    });
    setRegistrationSuccess(true);
  }

  return (
    <MainLayout fullWidth={true}>
      <SimpleSEO 
        title="Construction Solutions | Praetorian Smart-Coat"
        description="Advanced thermal protection solutions for construction projects. Increase energy efficiency and protect valuable assets with Praetorian Smart-Coat technology."
        keywords={["construction coating", "energy efficiency", "thermal protection", "building envelope", "construction insulation"]}
      />
      <div className="relative">
        {/* HERO SECTION - Elite Enterprise Styling */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Video background with enhanced overlay gradients */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-amber-900/20 z-10"></div>
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src="/src/assets_dir/videos/construction-hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Premium Enterprise Visual Elements */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          <div className="absolute inset-y-[10%] left-0 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute inset-y-[10%] right-0 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>

          {/* Enhanced Enterprise Content */}
          <div className="container mx-auto px-6 relative z-20 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Elite Premium Badge */}
              <div className="relative group inline-block mb-4">
                {/* Multi-layered glows for premium effect */}
                <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/15 via-blue-400/20 to-blue-600/15 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="relative inline-flex items-center px-5 py-2 bg-gradient-to-r from-gray-900/90 via-blue-950/95 to-gray-900/90 rounded-full border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.35)]">
                  {/* Corner diamond accents */}
                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-blue-200/90 transform rotate-45"></div>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-200/90 transform rotate-45"></div>
                  <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-blue-200/90 transform rotate-45"></div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-blue-200/90 transform rotate-45"></div>
                  
                  {/* Animated pulse dot */}
                  <div className="relative w-3 h-3 mr-3 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                    <div className="relative w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-200"></div>
                    </div>
                  </div>
                  
                  {/* Text with subtle shimmer effect */}
                  <div className="relative overflow-hidden">
                    <span className="text-blue-100 font-bold tracking-wider text-sm bg-clip-text">ELITE ENTERPRISE SOLUTION</span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-300/30 to-transparent -translate-x-full animate-shimmer-slow transform skew-x-[-20deg]"></div>
                  </div>
                </div>
              </div>
            
              {/* Premium Title with Enhanced Styling */}
              <div className="relative inline-block mb-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-blue-500/30 rounded-lg blur-md opacity-70"></div>
                <h1 className="relative text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 px-2">
                  Advanced Protection for Commercial Construction
                </h1>
              </div>
              
              {/* Animated highlight line */}
              <div className="w-32 h-[2px] mx-auto mb-6 bg-gradient-to-r from-blue-500/50 via-amber-500/80 to-blue-500/50 rounded-full"></div>
              
              {/* Enhanced description */}
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/5 rounded-2xl blur-xl opacity-50"></div>
                <p className="relative text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                  <span className="text-blue-300 font-semibold">Premium Enterprise Solution</span> to enhance building performance, reduce operational costs, and protect assets with Praetorian Smart-Coat™ advanced technology
                </p>
              </div>
              
              {/* Premium Elite Action Buttons with glass effect and animations */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* First Premium Button - Enterprise Consultation */}
                <div className="relative group/button1">
                  {/* Multi-layer blue glow effect */}
                  <div className="absolute -inset-2 bg-blue-500/10 rounded-xl blur-2xl opacity-70 group-hover/button1:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-lg blur-md opacity-60 group-hover/button1:opacity-80 transition-opacity duration-500"></div>
                  
                  <button 
                    className="relative z-10 px-8 py-4 bg-gradient-to-br from-gray-900/95 via-blue-950/90 to-gray-900/95 rounded-lg border border-blue-500/40 shadow-lg flex items-center justify-center overflow-hidden"
                  >
                    {/* Corner diamond accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-300/90 transform rotate-45"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-300/90 transform rotate-45"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-blue-300/90 transform rotate-45"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-300/90 transform rotate-45"></div>
                    
                    {/* Animated shine effect - slide across on hover */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-300/10 to-transparent -translate-x-full group-hover/button1:translate-x-full transition-transform duration-1000 rounded-lg"></div>
                    
                    {/* Glass overlay with subtle transparency */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-500/10 rounded-xl opacity-100 group-hover/button1:opacity-0 transition-opacity duration-300"></div>
                    
                    {/* Button content */}
                    <span className="flex items-center space-x-3 text-blue-100 font-semibold">
                      <span className="relative flex-shrink-0 w-7 h-7 rounded-full bg-blue-800/80 flex items-center justify-center shadow-inner">
                        <span className="w-3.5 h-3.5 rounded-full bg-blue-300"></span>
                        {/* Subtle pulse around icon */}
                        <span className="absolute inset-0 rounded-full border border-blue-400/30 animate-pulse"></span>
                      </span>
                      <span className="text-lg">Request Enterprise Consultation</span>
                    </span>
                  </button>
                </div>

                {/* Second Premium Button - Learn More */}
                <div className="relative group/button2">
                  {/* Multi-layer amber glow effect */}
                  <div className="absolute -inset-2 bg-amber-500/10 rounded-xl blur-2xl opacity-70 group-hover/button2:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-amber-400/20 rounded-lg blur-md opacity-60 group-hover/button2:opacity-80 transition-opacity duration-500"></div>
                  
                  <button 
                    onClick={() => setDisplayLearnMore(true)}
                    className="relative z-10 px-8 py-4 bg-gradient-to-br from-gray-900/95 via-amber-950/90 to-gray-900/95 rounded-lg border border-amber-500/40 shadow-lg flex items-center justify-center overflow-hidden"
                  >
                    {/* Corner diamond accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-amber-300/90 transform rotate-45"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-amber-300/90 transform rotate-45"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-amber-300/90 transform rotate-45"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-amber-300/90 transform rotate-45"></div>
                    
                    {/* Animated shine effect - slide across on hover */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-300/10 to-transparent -translate-x-full group-hover/button2:translate-x-full transition-transform duration-1000 rounded-lg"></div>
                    
                    {/* Glass overlay with subtle transparency */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-500/10 rounded-xl opacity-100 group-hover/button2:opacity-0 transition-opacity duration-300"></div>
                    
                    {/* Button content */}
                    <span className="flex items-center space-x-3 text-amber-100 font-semibold">
                      <span className="relative flex-shrink-0 w-7 h-7 rounded-full bg-amber-800/80 flex items-center justify-center shadow-inner">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-300"></span>
                        {/* Subtle pulse around icon */}
                        <span className="absolute inset-0 rounded-full border border-amber-400/30 animate-pulse"></span>
                      </span>
                      <span className="text-lg">Learn More</span>
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Enhanced Premium Enterprise Corner Accents */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 w-20 h-20 z-10 opacity-70">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/50 rounded-tl-md"></div>
                <div className="absolute top-1 left-1 w-14 h-14 border-t border-l border-amber-500/40 rounded-tl-md"></div>
                <div className="absolute top-2 left-2 w-16 h-16 border-t border-l border-blue-500/20 rounded-tl-md"></div>
              </div>
              <div className="absolute top-4 right-4 md:top-8 md:right-8 w-20 h-20 z-10 opacity-70">
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/50 rounded-tr-md"></div>
                <div className="absolute top-1 right-1 w-14 h-14 border-t border-r border-amber-500/40 rounded-tr-md"></div>
                <div className="absolute top-2 right-2 w-16 h-16 border-t border-r border-blue-500/20 rounded-tr-md"></div>
              </div>
              
              {/* Bottom corner accents */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 z-10 opacity-50 transform rotate-180">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-amber-500/30 rounded-tl-md"></div>
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 z-10 opacity-50 transform rotate-180">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                <div className="absolute top-1 right-1 w-12 h-12 border-t border-r border-amber-500/30 rounded-tr-md"></div>
              </div>
            </motion.div>
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
                  Critical Challenges in Commercial Construction
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaFire className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Fire Protection Vulnerabilities</h3>
                        <p className="text-gray-300">
                          Commercial buildings face critical fire protection challenges with traditional materials offering inadequate resistance, potentially leading to catastrophic losses. Current fire-retardant treatments deteriorate over time, leaving structures increasingly vulnerable.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.nfpa.org/News-and-Research/Publications-and-media/NFPA-Journal/2023/Summer-2023/Features/Infrastructure" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">National Fire Protection Association, Commercial Building Fire Risk Assessment (2023)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaTemperatureLow className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Thermal Inefficiency</h3>
                        <p className="text-gray-300">
                          Rising energy costs are severely impacting commercial building operational expenses, with HVAC systems accounting for up to 40% of energy usage. Poor insulation and outdated building envelopes result in significant thermal transfer, creating an unsustainable cost burden.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.energy.gov/eere/buildings/articles/energy-efficiency-commercial-buildings" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">U.S. Department of Energy, Commercial Building Energy Consumption Survey (2022)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaMoneyBillAlt className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Escalating Maintenance Costs</h3>
                        <p className="text-gray-300">
                          Commercial properties face a 28% increase in maintenance expenses when using conventional materials. Standard coatings require frequent reapplication, causing business disruption and multiplying lifetime ownership costs by 3-5x compared to advanced solutions.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.buildings.com/articles/42627/maintenance-cost-considerations" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Commercial Building Maintenance Cost Index (2024)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaRegLightbulb className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Regulatory Compliance Barriers</h3>
                        <p className="text-gray-300">
                          Meeting increasingly stringent energy codes and fire safety regulations requires significant capital investment with conventional approaches. Many commercial buildings fail to meet new standards, risking non-compliance penalties of up to $500,000 and increased insurance premiums.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.iccsafe.org/building-safety-journal/commercial-building-standards-update-2023/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">International Code Council, Building Code Compliance Report (2023)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional Pain Points */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-red-400 mb-4 text-center">Additional Industry Challenges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-red-700/10">
                      <div className="flex items-center mb-2">
                        <FaClock className="text-red-500 mr-2" />
                        <h4 className="text-lg font-medium text-gray-200">Implementation Disruption</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Traditional retrofits cause significant operational downtime, costing businesses an average of $8,400 per day in productivity losses.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-red-700/10">
                      <div className="flex items-center mb-2">
                        <FaLeaf className="text-red-500 mr-2" />
                        <h4 className="text-lg font-medium text-gray-200">Environmental Impact</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Standard building materials contribute heavily to carbon footprints with 39% higher embodied carbon compared to advanced alternatives.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-red-700/10">
                      <div className="flex items-center mb-2">
                        <FaPercentage className="text-red-500 mr-2" />
                        <h4 className="text-lg font-medium text-gray-200">ROI Limitations</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Conventional energy-saving retrofits typically offer ROI periods of 8-12 years, making them financially unattractive for building owners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ENTERPRISE CONSTRUCTION SOLUTION - YELLOW GLOW SECTION (Traffic Light Pattern) */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Premium Enhanced Yellow glow effect with blue accent for enterprise flair */}
              <div className="absolute -inset-10 bg-amber-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-amber-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-amber-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              <div className="absolute -inset-40 bg-blue-700/5 rounded-xl blur-3xl opacity-20 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-amber-600/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                  Enterprise Construction Solution
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Technical Specifications Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Advanced Ceramic Technology</h3>
                      <p className="text-gray-300 mb-4">
                        Praetorian Smart-Coat™ employs a proprietary ceramic microcapsule matrix that creates a thermal barrier unlike conventional insulation systems. Our formula contains high-purity ceramic compounds in a suspension that bonds to virtually any substrate.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Microscopic vacuum ceramic beads</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Low thermal conductivity (0.018 W/mK)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Radiant heat blocking (97%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Active moisture management</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Fire Protection Properties</h3>
                      <p className="text-gray-300 mb-4">
                        Independently tested to ASTM E84 standards, our coating achieves Class A fire ratings with exceptional flame spread and smoke development indices far exceeding industry minimums.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">Class A</p>
                          <p className="text-center text-gray-300 text-sm">Fire Rating</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">1475°F<sup className="text-yellow-200 text-xs">*</sup></p>
                          <p className="text-center text-gray-300 text-sm">Heat Resistance</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">0</p>
                          <p className="text-center text-gray-300 text-sm">Flame Spread</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">5</p>
                          <p className="text-center text-gray-300 text-sm">Smoke Development</p>
                        </div>
                      </div>
                      <p className="text-gray-400 mt-4 text-sm">
                        <span className="font-semibold">Certification:</span> <a href="https://www.ul.com/resources/fire-resistance-ratings-ulc-online-certifications-directory" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">UL and ASTM E84 Certified Performance</a>
                      </p>
                      <div className="mt-3 text-xs text-yellow-500/70 border-t border-yellow-500/20 pt-2">
                        <p><sup>*</sup> Source: SON-SHIELD® Fire Resistance Technical Data Sheet 2024, p.5 - Laboratory verified thermal resistance threshold in controlled testing environments.</p>
                      </div>
                    </div>
                    
                    {/* Restored Technical Component */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Material Science Breakthrough</h3>
                      <p className="text-gray-300 mb-4">
                        Leveraging nanoscale material engineering, our coating creates a temperature-responsive barrier that adapts to environmental conditions, providing dynamic thermal regulation for construction assets.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 flex items-center justify-center mb-2">
                            <FaShieldAlt className="w-6 h-6 text-amber-400" />
                          </div>
                          <p className="text-center text-amber-300 font-medium">Anti-Corrosive</p>
                          <p className="text-center text-gray-400 text-sm">99.7% Protection</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 flex items-center justify-center mb-2">
                            <FaSnowflake className="w-6 h-6 text-amber-400" />
                          </div>
                          <p className="text-center text-amber-300 font-medium">Thermal Stability</p>
                          <p className="text-center text-gray-400 text-sm">-40°F to 1475°F</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Application & Performance Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Energy Efficiency Performance</h3>
                      <p className="text-gray-300 mb-4">
                        Third-party validation confirms that buildings treated with Praetorian Smart-Coat™ experience significant reductions in energy consumption through multi-mode thermal management.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Cooling Load Reduction:</span>
                          <span className="text-amber-400 font-semibold">31-47%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" style={{ width: "47%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gray-300">Heating Load Reduction:</span>
                          <span className="text-amber-400 font-semibold">21-35%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gray-300">R-Value Equivalent:</span>
                          <span className="text-amber-400 font-semibold">R-19 (per 1mm thickness)</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <p className="text-gray-400 mt-4 text-sm">
                        <span className="font-semibold">Source:</span> <a href="https://www.energy.gov/eere/buildings/building-envelope-rd" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Independent Laboratory Testing - Oak Ridge National Laboratory Thermal Performance Study (2023)</a>
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Enterprise Application Framework</h3>
                      <p className="text-gray-300 mb-4">
                        Our enterprise deployment protocol ensures minimal business disruption while maximizing performance outcomes for commercial construction projects.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">1</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Comprehensive building envelope assessment</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">2</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Thermal imaging mapping to identify critical zones</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">3</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Section-by-section application to maintain operations</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">4</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Post-installation verification with advanced thermography</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">5</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Energy management system integration for ROI tracking</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Restored Premium Enterprise Component */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Enterprise Standards Compliance</h3>
                      <p className="text-gray-300 mb-4">
                        Praetorian Smart-Coat™ meets or exceeds all major construction industry standards and codes, reducing regulatory compliance costs while providing complete documentation for certification processes.
                      </p>
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-amber-700/10">
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">ASHRAE 90.1</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">ICC-ES AC456</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">NFPA 285</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">ASTM E84</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">LEED v4.1</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">BREEAM</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">Title 24</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ROI Calculator Section - Added to Yellow Section */}
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400 mb-6 text-center">Construction Project ROI Analysis</h3>
                  <ConstructionROICalculator />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 3: BUDGET - GREEN GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Premium Green glow with multiple layers */}
              <div className="absolute -inset-10 bg-emerald-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-emerald-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-emerald-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-lg">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  Distributor Benefits
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Financial Benefits Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaChartLine className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Premium Revenue Structure</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Join our elite network of authorized distributors and gain access to a premium product with exceptional profit margins:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">85% higher margins compared to standard coatings</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Predictable income through exclusive territory rights</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Average project value 3x traditional coating services</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Recurring revenue through maintenance programs</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaDollarSign className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Strategic Market Position</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Position your business at the forefront of construction innovation with unmatched market differentiation:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Exclusive regional distribution rights</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Limited competition with protected territories</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">First-mover advantage in high-growth market</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Access to enterprise-level clients and projects</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Client Benefits Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaBuilding className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Client Value Proposition</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Deliver transformative results for your construction clients with measurable outcomes:
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">HVAC Cost Reduction</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">32%</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "32%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Extended Asset Lifespan</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">45%</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Fire Insurance Premium Reduction</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">18%</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Overall ROI Period</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">2.3 Years</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 mt-4 text-sm">
                        <span className="font-semibold">Source:</span> <a href="https://www.ceramiccoatingperformance.org/commercial-analysis-2023" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Aggregate client performance data from 2021-2023 installations</a>
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaTools className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Implementation Advantage</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Simplified application process creates operational efficiency for your business:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">68% reduction in application time vs. traditional methods</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Non-invasive installation with zero building downtime</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Reduced equipment and labor requirements</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Standard application equipment with minimal specialization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Support Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaUsers className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Comprehensive Support</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Join our network and receive unparalleled business support:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Certified installer training program</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Technical field support for large projects</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Marketing materials and sales enablement</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Lead generation and qualification assistance</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Proposal and bid preparation support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaHandshake className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Partnership Framework</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Our tiered partnership model ensures growth potential as your business expands:
                      </p>
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <FaStar className="text-amber-400 mr-1" />
                            <h4 className="text-lg font-medium text-emerald-300">Certified Partner</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Entry level with standard margins and shared territories</p>
                        </div>
                        
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <FaStar className="text-amber-400 mr-1" />
                            <FaStar className="text-amber-400 mr-1" />
                            <h4 className="text-lg font-medium text-emerald-300">Premier Partner</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Exclusive territories with enhanced margin structure</p>
                        </div>
                        
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <FaStar className="text-amber-400 mr-1" />
                            <FaStar className="text-amber-400 mr-1" />
                            <FaStar className="text-amber-400 mr-1" />
                            <h4 className="text-lg font-medium text-emerald-300">Elite Partner</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Multi-region exclusivity with highest profit potential</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-bold text-emerald-300 mb-4">Ready to Transform Your Construction Business?</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                    Become an authorized Praetorian Smart-Coat™ distributor and position your business at the forefront of construction innovation with unmatched profit potential.
                  </p>
                  <div>
                    <button 
                      onClick={() => setShowRegistrationForm(true)}
                      className="relative z-10 px-10 py-5 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-500/50 rounded-lg font-bold shadow-lg text-purple-100 hover:text-white transition-all transform hover:scale-105 overflow-hidden"
                    >
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-purple-300/90 transform rotate-45"></div>
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-purple-300/90 transform rotate-45"></div>
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-purple-300/90 transform rotate-45"></div>
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-300/90 transform rotate-45"></div>
                      
                      {/* Glass overlay with subtle transparency */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-700/10 rounded-xl opacity-100 hover:opacity-0 transition-opacity duration-300 -z-[1]"></div>
                      
                      {/* Animated hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-600/30 rounded-xl -z-[1] translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
                      
                      <span className="relative text-xl font-bold">Apply to Become a Distributor</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        
        {/* Registration Form Section - Purple Section (conditionally rendered) */}
        {showRegistrationForm && (
          <section className="py-16 relative z-10">
            <div className="container mx-auto">
              <div className="relative">
                {/* Purple glow effect */}
                <div className="absolute -inset-10 bg-purple-700/20 rounded-xl blur-xl opacity-60 z-0"></div>
                <div className="absolute -inset-20 bg-purple-800/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                <div className="absolute -inset-30 bg-indigo-700/10 rounded-xl blur-3xl opacity-40 z-0"></div>
                <div className="absolute -inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 rounded-xl blur-3xl opacity-60 z-0"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 md:p-10 rounded-xl border border-purple-500/30 shadow-[0_0_60px_rgba(147,51,234,0.15)] z-10">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-purple-500/40 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-purple-500/40 rounded-br-lg"></div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_1px_3px_rgba(147,51,234,0.6)] relative z-10 text-center">
                    <span className="relative inline-block">
                      Construction Professional Registration
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    </span>
                  </h2>
                  
                  {registrationSuccess ? (
                    <div className="p-8 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-green-500/30 relative z-10">
                      <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
                      <h3 className="text-2xl font-bold text-white text-center mb-4">Registration Successful!</h3>
                      <p className="text-purple-100 text-center mb-6">Your application has been received and is now being reviewed by our team.</p>
                      <p className="text-purple-100 text-center mb-8">We will contact you within 24-48 hours to discuss partnership opportunities and next steps.</p>
                      <div className="flex justify-center">
                        <Button 
                          onClick={() => setShowRegistrationForm(false)}
                          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                        >
                          Return to Page
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Form {...registrationForm}>
                      <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-8 relative z-10">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Company Information Section */}
                          <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-purple-300 mb-4">Company Information</h3>
                            
                            <FormField
                              control={registrationForm.control}
                              name="companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Company Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your company name" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                  <FormLabel className="text-gray-200">Contact Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Full name of primary contact" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={registrationForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">Email</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Email address" 
                                        className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                        placeholder="Confirm email" 
                                        className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={registrationForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Phone</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Business phone number" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                  <FormLabel className="text-gray-200">Business Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Street address" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-3 gap-4">
                              <FormField
                                control={registrationForm.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-200">City</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="City" 
                                        className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                    <FormLabel className="text-gray-200">State</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="State" 
                                        className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                    <FormLabel className="text-gray-200">ZIP Code</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="ZIP code" 
                                        className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          {/* Credentials & Experience Section */}
                          <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-purple-300 mb-4">Credentials & Experience</h3>
                            
                            <FormField
                              control={registrationForm.control}
                              name="licenseNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Contractor License Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="License number" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal bg-gray-900/70 border-gray-700 hover:bg-gray-800 text-white",
                                            !field.value && "text-gray-500"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Select expiry date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date()
                                        }
                                        initialFocus
                                        className="bg-gray-900 text-white"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="insuranceInfo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Insurance Information</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Insurance provider and policy number" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
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
                                      type="number"
                                      placeholder="Years of industry experience" 
                                      className="bg-gray-900/70 border-gray-700 focus:border-purple-500 text-white" 
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registrationForm.control}
                              name="constructionTypes"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel className="text-gray-200">Construction Types</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select all that apply to your business
                                    </FormDescription>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {[
                                      "Commercial", 
                                      "Residential", 
                                      "Industrial", 
                                      "Government", 
                                      "Educational", 
                                      "Healthcare",
                                      "Retail",
                                      "Hospitality"
                                    ].map((type) => (
                                      <FormField
                                        key={type}
                                        control={registrationForm.control}
                                        name="constructionTypes"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={type}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(type)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, type])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== type
                                                          )
                                                        )
                                                  }}
                                                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                                />
                                              </FormControl>
                                              <FormLabel className="text-gray-300 font-normal">
                                                {type}
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
                        </div>
                        
                        {/* Terms and submit */}
                        <div className="space-y-6 pt-4">
                          <FormField
                            control={registrationForm.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-gray-300 font-normal">
                                    I accept the <a href="#" className="text-purple-400 hover:underline">terms and conditions</a> and agree to the <a href="#" className="text-purple-400 hover:underline">contractor standards</a>
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-between items-center pt-4">
                            <Button 
                              type="button"
                              variant="outline" 
                              onClick={() => setShowRegistrationForm(false)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit"
                              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8"
                            >
                              Submit Application
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Construction;