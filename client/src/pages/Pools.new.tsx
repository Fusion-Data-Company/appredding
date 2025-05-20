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
  Shield, 
  ChevronRight, 
  CircleDollarSign, 
  Calculator, 
  AlertTriangle, 
  Building, 
  TrendingUp,
  Droplets,
  ThermometerSun,
  Sun,
  Paintbrush,
  CalendarIcon
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

// Types for the calculator
interface CoatingProduct {
  name: string;
  coverage: number; // Coverage in sq ft per gallon
  price: number; // Price per gallon
}

interface CalculationResult {
  surfaceArea: number;
  gallonsNeeded: number;
  totalCost: number;
  productName: string;
  coatCount: number;
}

// Coating products data
const coatingProducts: Record<string, CoatingProduct> = {
  standard: {
    name: "Standard Pool Coating",
    coverage: 100,
    price: 85
  },
  premium: {
    name: "Premium SON-SHIELD Ceramic Pool Coating",
    coverage: 90,
    price: 125
  },
  professional: {
    name: "Professional-Grade SON-SHIELD Coating System",
    coverage: 80,
    price: 175
  }
};

// Dealer registration form schema
const poolDealerSchema = z.object({
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
  poolsCompletedAnnually: z.string().min(1, { message: "Required field" }),
  yearsInBusiness: z.string().min(1, { message: "Years in business is required" }),
  serviceAreaMiles: z.string().min(1, { message: "Service area is required" }),
  employeeCount: z.string().min(1, { message: "Employee count is required" }),
  annualRevenue: z.string().min(1, { message: "Annual revenue is required" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
  notes: z.string().optional(),
});

export default function Pools() {
  // State for calculator
  const [poolSurfaceArea, setPoolSurfaceArea] = useState<number>(500);
  const [selectedProduct, setSelectedProduct] = useState<string>("premium");
  const [coatCount, setCoatCount] = useState<number>(2);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showROICalculator, setShowROICalculator] = useState<boolean>(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Pool Protection";
  const slug = "pools";
  const pageTitle = "Praetorian Smart-Coat – Pool & Deck Protection Solutions";
  const pageDescription = "Advanced ceramic coatings for swimming pools, decks and water features. Protect surfaces from UV damage, chlorine, and temperature extremes.";
  const heroImagePath = "/src/assets_dir/images/pool-deck-hero.png";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/pool-coating-application.jpg"
    ]);
  }, []);
  
  // Calculate coating requirements
  const calculateCoverage = () => {
    const product = coatingProducts[selectedProduct];
    const gallonsNeeded = Math.ceil((poolSurfaceArea * coatCount) / product.coverage);
    const totalCost = gallonsNeeded * product.price;
    
    setCalculationResult({
      surfaceArea: poolSurfaceArea,
      gallonsNeeded,
      totalCost,
      productName: product.name,
      coatCount
    });
  };
  
  // Setup registration form
  const registrationForm = useForm<z.infer<typeof poolDealerSchema>>({
    resolver: zodResolver(poolDealerSchema),
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
      poolsCompletedAnnually: "",
      yearsInBusiness: "",
      serviceAreaMiles: "",
      employeeCount: "",
      annualRevenue: "",
      termsAccepted: false,
      notes: ""
    },
  });
  
  // Handle dealer application form submission
  const onRegistrationSubmit = (values: z.infer<typeof poolDealerSchema>) => {
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
          'pool deck coating',
          'swimming pool protection',
          'waterproof ceramic coating',
          'pool surface treatment',
          'UV resistant pool paint'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Superior chlorine and chemical resistance",
          "UV-resistant protection for long-term durability",
          "Temperature-regulating properties for cooler pool decks",
          "Waterproof ceramic barrier coating"
        ])}
      />
      
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with water theme */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.4) 0%, rgba(15, 23, 42, 0) 60%)'
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
                      Premium Pool & Deck Protection
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Praetorian Smart-Coat delivers cutting-edge ceramic coating technology specifically formulated for swimming pools, decks, and water features. Our advanced ceramic formula creates a superior protective barrier against UV damage, temperature extremes, and chemical exposure.
                      </p>
                      <p className="text-lg">
                        Extend the life of your pool surfaces while creating a more comfortable and beautiful environment for your clients and their families.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Chemical Resistant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">UV Protection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ThermometerSun className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Temperature Control</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                        onClick={() => setShowROICalculator(true)}
                      >
                        <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                          Calculate Coverage
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
                      src="/src/assets_dir/images/pool-coating-application.jpg" 
                      alt="Pool deck coating application by Praetorian Smart-Coat" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = heroImagePath;
                      }}
                    />
                    
                    {/* Premium overlay elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                      <p className="text-sm text-gray-300 text-center">SON-SHIELD ceramic coating application for pool decks and surfaces</p>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Surface Temp Reduction</p>
                    <p className="text-3xl font-bold text-white">Up to 30°F<sup className="text-blue-300 text-xs">*</sup></p>
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
                  Critical Pool Protection Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Extreme Weather Vulnerability</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Pool deck surface temperatures can reach 150°F+ in summer months, making them unusable and dangerous</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Unprotected concrete decks absorb up to 90% of solar radiation, leading to extreme heat retention</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Freeze-thaw cycles cause significant concrete cracking and spalling in just 2-3 seasons</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">UV radiation degrades traditional pool coatings in as little as 2-3 years</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Chemical & Water Damage</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Chlorine and other pool chemicals degrade standard surface coatings, causing peeling and flaking</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Constant water exposure leads to efflorescence and calcium scaling on unprotected concrete</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Salt chlorination systems accelerate corrosion of pool equipment and surrounding structures</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Chemical degradation creates porous surfaces that harbor algae and bacteria</span>
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
                          <span className="text-gray-300">Average pool resurfacing costs range from $10,000-$25,000 every 5-7 years</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Energy costs for heated pools increase 30-40% with uninsulated surfaces</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Chemical usage increases by 25% with degraded pool surfaces due to increased absorption</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Potential liability from slip and fall accidents on degraded or excessively hot surfaces</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-red-700/20 shadow-md">
                      <h3 className="text-xl font-bold mb-4 text-red-300">Conventional Product Limitations</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Standard epoxy pool coatings require 7-10 day cure times, causing extended pool closures</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Traditional coatings provide either chemical resistance OR UV protection, rarely both</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Most sealers require annual reapplication, creating ongoing maintenance costs</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">Many coatings contain high VOCs, creating environmental and health concerns</span>
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
                  Advanced Pool Protection Technology
                </h2>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-amber-300">SON-SHIELD Ceramic Technology for Pools</h3>
                    <p className="text-gray-300 mb-6">
                      Our proprietary SON-SHIELD ceramic formulation creates a multi-function protective system specifically engineered for pool environments. The unique microstructure delivers exceptional chemical resistance, temperature control, and UV protection while maintaining aesthetic appeal for years.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Droplets className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">99.9%<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Water & Chemical Resistance</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <ThermometerSun className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">30°F<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">Surface Temperature Reduction</p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg border border-amber-600/20">
                        <div className="w-16 h-16 flex items-center justify-center mb-2 bg-amber-900/20 rounded-full">
                          <Sun className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center text-amber-400 font-semibold text-lg mb-1">10+ Years<sup className="text-yellow-200 text-xs">*</sup></p>
                        <p className="text-center text-sm text-gray-400">UV Resistance</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">*Based on independent laboratory testing of SON-SHIELD ceramic coating technology</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-amber-700/20 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-amber-300">Technical Specifications</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Application Method</span>
                      <span className="text-white font-medium">Spray, Brush, or Roller</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Dry Film Thickness</span>
                      <span className="text-white font-medium">10-15 mils (per coat)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Coverage Rate</span>
                      <span className="text-white font-medium">80-100 sq ft/gallon</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Dry Time</span>
                      <span className="text-white font-medium">2 hrs touch, 24 hrs full cure</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">VOC Content</span>
                      <span className="text-white font-medium">&lt; 50 g/L (Low VOC)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Chlorine Resistance</span>
                      <span className="text-white font-medium">Excellent (ASTM D1308)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-300">Salt Resistance</span>
                      <span className="text-white font-medium">Excellent (ASTM B117)</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-300">UV Resistance</span>
                      <span className="text-white font-medium">Excellent (ASTM G154)</span>
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
                            <h4 className="font-semibold text-white mb-1">Extended Surface Life</h4>
                            <p className="text-gray-300">Pool surfaces treated with SON-SHIELD coating last 2-3 times longer than traditional surfaces, deferring expensive resurfacing costs by 5-10 years and saving $10,000-$25,000 in resurfacing expenses.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Energy Cost Savings</h4>
                            <p className="text-gray-300">The thermal insulation properties of SON-SHIELD coatings reduce heating costs for pools by 20-35% annually, with payback periods of under 2 years in most heated pool applications.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CircleDollarSign className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Reduced Maintenance Costs</h4>
                            <p className="text-gray-300">SON-SHIELD coated surfaces require up to 15% less chemicals for maintenance due to their non-porous nature, and virtually eliminate the need for specialized cleaners and annual re-sealing.</p>
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
                            <h4 className="font-semibold text-white mb-1">Superior Comfort</h4>
                            <p className="text-gray-300">Surface temperature reductions of up to 30°F create comfortable walking surfaces even in direct sunlight. This transforms unusable hot decks into comfortable barefoot-friendly spaces throughout the day.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Enhanced Safety</h4>
                            <p className="text-gray-300">SON-SHIELD coatings maintain slip-resistant properties even when wet, and eliminate hot surface contact burns. This is especially valuable for properties with children and elderly visitors.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-white mb-1">Superior Aesthetics</h4>
                            <p className="text-gray-300">Our coatings are available in a wide range of colors and finishes that resist fading and maintain their appearance for years, enhancing property value and client satisfaction.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-lg border border-green-700/20 shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-300">Calculate Your Project Requirements</h3>
                    
                    {!calculationResult ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-4">
                          <label className="block text-gray-300 font-medium">Pool Surface Area (sq ft)</label>
                          <Input 
                            type="number" 
                            value={poolSurfaceArea} 
                            onChange={(e) => setPoolSurfaceArea(Number(e.target.value))}
                            className="bg-gray-800/50 border-gray-700 text-white" 
                          />
                          <p className="text-xs text-gray-400">Enter the total area to be coated</p>
                        </div>
                        
                        <div className="space-y-4">
                          <label className="block text-gray-300 font-medium">Product Type</label>
                          <Select 
                            value={selectedProduct} 
                            onValueChange={setSelectedProduct}
                          >
                            <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="standard">Standard Pool Coating</SelectItem>
                              <SelectItem value="premium">Premium SON-SHIELD Ceramic</SelectItem>
                              <SelectItem value="professional">Professional-Grade System</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-400">Select coating type for your project</p>
                        </div>
                        
                        <div className="space-y-4">
                          <label className="block text-gray-300 font-medium">Number of Coats</label>
                          <Select 
                            value={coatCount.toString()} 
                            onValueChange={(value) => setCoatCount(Number(value))}
                          >
                            <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="1">1 Coat (Light Protection)</SelectItem>
                              <SelectItem value="2">2 Coats (Standard Protection)</SelectItem>
                              <SelectItem value="3">3 Coats (Maximum Protection)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-400">Recommended: 2 coats for most applications</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-900/70 p-6 rounded-lg border border-green-600/10 mb-6">
                        <h4 className="font-semibold text-green-300 mb-4 text-center text-lg">Your Project Requirements</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Pool Surface Area:</span>
                            <span className="text-white font-medium">{calculationResult.surfaceArea} sq ft</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Product Selected:</span>
                            <span className="text-white font-medium">{calculationResult.productName}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Number of Coats:</span>
                            <span className="text-white font-medium">{calculationResult.coatCount}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Gallons Required:</span>
                            <span className="text-white font-medium">{calculationResult.gallonsNeeded}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-700 pb-2 md:col-span-2">
                            <span className="text-gray-300">Estimated Materials Cost:</span>
                            <span className="text-green-400 font-bold">${calculationResult.totalCost.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">Note: Final costs may vary based on specific project requirements and preparation needs. Contact a certified dealer for a comprehensive quote.</p>
                      </div>
                    )}
                    
                    <div className="flex justify-center">
                      {!calculationResult ? (
                        <Button 
                          className="relative group overflow-hidden bg-black border border-green-400 hover:border-green-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                          onClick={calculateCoverage}
                        >
                          <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300 flex items-center">
                            <Calculator className="w-5 h-5 mr-2" />
                            Calculate Requirements
                          </span>
                          <span className="absolute -inset-[3px] bg-green-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                        </Button>
                      ) : (
                        <div className="flex gap-4">
                          <Button 
                            variant="outline" 
                            className="border-gray-600 text-green-400 hover:text-green-300 hover:border-green-500"
                            onClick={() => setCalculationResult(null)}
                          >
                            Recalculate
                          </Button>
                          <Button 
                            className="relative group overflow-hidden bg-black border border-green-400 hover:border-green-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                            onClick={handleShowRegistrationForm}
                          >
                            <span className="relative z-10 text-white group-hover:text-green-200 transition-colors duration-300">
                              Become a Dealer
                            </span>
                            <span className="absolute -inset-[3px] bg-green-600 opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md rounded-lg -z-10"></span>
                          </Button>
                        </div>
                      )}
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
                  Become a Praetorian Pool Coating Dealer
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
                            <span className="text-gray-300">Year-round business opportunity for pool contractors</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Add-on service for existing pool maintenance clients</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Differentiate your business with exclusive technology</span>
                          </div>
                        </div>
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
                              name="poolsCompletedAnnually"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Pools Completed Annually</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Number of pools" 
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
                                    I agree to the terms and conditions, including the confidentiality and non-disclosure agreement for Praetorian pool coating dealers.
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
                        Thank you for your interest in becoming a Praetorian Smart-Coat pool products dealer. Our team will review your application and contact you within 2-3 business days to discuss next steps.
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
                      Ready to Transform Your Pool Business?
                    </h2>
                    <p className="text-gray-300">
                      Join the growing network of successful Praetorian Smart-Coat dealers providing premium ceramic coating solutions to pool owners.
                    </p>
                  </div>
                  
                  <div className="lg:w-1/3 flex flex-wrap gap-4 justify-center lg:justify-end">
                    <Button 
                      className="relative group overflow-hidden bg-black border border-purple-400 hover:border-purple-300 transition-all duration-300 px-8 py-3 text-lg shadow-lg"
                      onClick={handleShowRegistrationForm}
                    >
                      <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300">
                        Apply to Become a Dealer
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