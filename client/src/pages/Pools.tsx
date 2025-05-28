import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Shield, 
  CircleDollarSign, 
  Calculator, 
  AlertTriangle, 
  TrendingUp,
  Droplets,
  ThermometerSun,
  Sun,
  Paintbrush,
  Zap
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

// Pool contractor form schema
const poolContractorSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Company address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "ZIP code is required" }),
  projectDetails: z.string().min(10, { message: "Project details are required" }),
  agreesToTerms: z.boolean().refine(val => val === true, { 
    message: "You must accept the terms and conditions" 
  })
});

export default function Pools() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Pool Contractors";
  const slug = "pools";
  const pageTitle = "Advance Power Redding – Solar Solutions for Pool Contractors";
  const pageDescription = "Advanced solar energy systems for pool contractors and aquatic facility operators. Reduce operational costs while providing reliable power for pool equipment and facilities.";
  const heroImagePath = "/src/assets_dir/images/pools-hero.jpg";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/optimized/praetorian-background-new.png"
    ]);
  }, []);

  // Setup form for consultation form
  const form = useForm<z.infer<typeof poolContractorSchema>>({
    resolver: zodResolver(poolContractorSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      projectDetails: "",
      agreesToTerms: false
    },
  });

  // Mutation for consultation form
  const consultationMutation = useMutation({
    mutationFn: async (data: z.infer<typeof poolContractorSchema>) => {
      return await apiRequest("/api/pools/consultation", {
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

  const onSubmit = (data: z.infer<typeof poolContractorSchema>) => {
    consultationMutation.mutate(data);
  };

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry={industry}
        slug={slug}
        imagePath={heroImagePath}
        keywords={getIndustryKeywords(slug, [
          'pool contractor solar',
          'aquatic facility solar',
          'pool equipment solar power',
          'swimming pool solar systems'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Pool Equipment Solar",
          "Aquatic Facility Power",
          "Swimming Pool Solar",
          "Pool Contractor Energy"
        ])}
      />
      
      <div className="relative">
        {/* Premium gradient background */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>

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
                  {/* Blue glow effect */}
                  <div className="absolute -inset-10 bg-blue-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
                  <div className="absolute -inset-20 bg-blue-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                  <div className="absolute -inset-30 bg-blue-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
                  
                  {/* Content card */}
                  <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-blue-700/30 shadow-lg">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">
                      Solar Solutions for Pool Contractors
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power delivers specialized solar energy systems designed for pool contractors and aquatic facility operators. Our solutions provide reliable, cost-effective power for pool equipment while dramatically reducing operational expenses.
                      </p>
                      <p className="text-lg">
                        From residential pool installations to commercial aquatic centers, we provide comprehensive solar solutions that meet the high-energy demands of pool operations.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Pool Equipment Power</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Heating Systems</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Reliable Operations</span>
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
                      <Button variant="outline" className="border-gray-600 text-blue-400 hover:text-blue-300 hover:border-blue-500">
                        Learn More
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
                  <div className="relative rounded-2xl overflow-hidden border border-blue-700/30 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/80 mix-blend-overlay z-10"></div>
                    
                    <img 
                      src="/src/assets_dir/images/pools-hero.jpg" 
                      alt="Solar installation for pool contractors by Advance Power" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/src/assets_dir/images/optimized/praetorian-background-new.png";
                      }}
                    />
                    
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 1: PAIN - RED GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Red glow */}
              <div className="absolute -inset-10 bg-red-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  Pool Industry Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-red-900/30 rounded-lg border border-red-700/50 backdrop-blur-sm">
                        <CircleDollarSign className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-red-300">Extreme Energy Costs</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Pool pumps and heating systems consume 2,500-5,000 kWh monthly per pool</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Energy costs represent 40-60% of total pool operating expenses</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Commercial pools face $1,000-3,000 monthly electricity bills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-red-900/30 rounded-lg border border-red-700/50 backdrop-blur-sm">
                        <ThermometerSun className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-red-300">Seasonal Operational Challenges</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Heating costs spike 200-300% during cooler months</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Equipment failures during peak season cost $500-2,000 in repairs</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Customer complaints about high utility bills damage business reputation</span>
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
            
        {/* SANDLER STAGE 2: TECHNICAL - YELLOW GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Yellow glow effect */}
              <div className="absolute -inset-10 bg-yellow-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-yellow-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300">
                  Advanced Pool Solar Technology
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <Zap className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">High-Output Solar Systems</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Premium solar panels optimized for pool equipment loads</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Advanced inverters designed for variable pool equipment demands</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Weather-resistant components for outdoor pool environments</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <Sun className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">Integrated Pool Heating</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Solar thermal integration for efficient pool heating</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Smart controllers for automated temperature management</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Battery backup systems for continuous operation</span>
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

        {/* SANDLER STAGE 3: SOLUTION - GREEN GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Green glow effect */}
              <div className="absolute -inset-10 bg-green-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-200 to-green-300">
                  Complete Pool Solar Solutions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50 backdrop-blur-sm">
                        <CircleDollarSign className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-green-300">Massive Cost Savings</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reduce pool energy costs by 80-95% immediately</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">No upfront costs with flexible financing available</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">30% federal tax credit plus local incentives</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50 backdrop-blur-sm">
                        <TrendingUp className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-green-300">Enhanced Operations</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reliable power eliminates equipment downtime</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">25-year warranty ensures long-term performance</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Professional installation and ongoing support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="text-center">
                  <Button 
                    className="relative group overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border border-green-500 transition-all duration-300 px-8 py-3 shadow-lg text-lg"
                    onClick={handleShowConsultationForm}
                  >
                    <span className="relative z-10 text-white group-hover:text-green-100 transition-colors duration-300">
                      Start Your Pool Solar Project Today
                    </span>
                    <span className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Form Modal */}
        {showConsultationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4 text-white">Request Pool Contractor Consultation</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your pool company" {...field} className="bg-gray-800 border-gray-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                          <Input type="email" placeholder="your@email.com" {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                          <Input placeholder="(555) 123-4567" {...field} className="bg-gray-800 border-gray-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Project Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your pool solar needs..." {...field} className="bg-gray-800 border-gray-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      disabled={consultationMutation.isPending}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {consultationMutation.isPending ? "Submitting..." : "Get Consultation"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowConsultationForm(false)}
                      className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}

        {/* Success Message */}
        {consultationRequestSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Consultation Request Submitted!</h3>
              <p className="text-gray-300 mb-4">
                Thank you for your interest in our pool contractor solar solutions. We'll contact you within 24 hours.
              </p>
              <Button 
                onClick={() => setConsultationRequestSuccess(false)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}