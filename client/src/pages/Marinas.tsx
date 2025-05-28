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
  Anchor, 
  ShieldCheck, 
  Sun,
  TrendingUp,
  Ship, 
  Waves, 
  CheckCircle, 
  Zap,
  CircleDollarSign,
  Shield,
  Droplet,
  AlertTriangle
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

export default function Marinas() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Marina Protection";
  const slug = "marinas";
  const pageTitle = "Advance Power Redding – Solar Solutions for Marinas";
  const pageDescription = "Advanced solar energy systems for marinas, docks, and marine infrastructure. Reduce operational costs while providing reliable power for marine facilities and operations.";
  const heroImagePath = "/src/assets_dir/images/marina-hero.jpg";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/optimized/praetorian-background-new.png"
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
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      licenseNumber: "",
      yearsInBusiness: 0,
      specialties: [],
      serviceAreas: [],
      certifications: [],
      notes: ""
    },
  });

  // Mutation for consultation form
  const consultationMutation = useMutation({
    mutationFn: async (data: MarinaProfessionalFormValues) => {
      return await apiRequest("/api/marinas/consultation", {
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

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry={industry}
        slug={slug}
        imagePath={heroImagePath}
        keywords={getIndustryKeywords(slug, [
          'marina solar systems',
          'dock solar power',
          'marine facility solar',
          'harbor solar energy'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Marina Solar Systems",
          "Dock Power Solutions",
          "Marine Facility Energy",
          "Harbor Solar Power"
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
                      Solar Solutions for Marinas
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power delivers specialized solar energy systems designed for marinas, docks, and marine infrastructure. Our solutions provide reliable, cost-effective power for marine operations while significantly reducing operational expenses.
                      </p>
                      <p className="text-lg">
                        From harbor lighting and dock utilities to boat services and marine facilities, we provide comprehensive solar solutions that meet the unique demands of waterfront operations.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Anchor className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Marina Operations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Ship className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Dock Services</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Marine-Grade Systems</span>
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
                      src="/src/assets_dir/images/marina-hero.jpg" 
                      alt="Solar installation for marinas by Advance Power" 
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
                  Marina Industry Challenges
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
                            <span className="text-gray-300">Marina electrical costs average $5,000-15,000 monthly for lighting and utilities</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Dock power pedestals consume 24/7 electricity for boat services</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Security lighting and facilities add $2,000-5,000 to monthly bills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-red-900/30 rounded-lg border border-red-700/50 backdrop-blur-sm">
                        <Waves className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-red-300">Harsh Marine Environment</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Salt water corrosion damages electrical systems requiring frequent replacement</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Storm damage and power outages disrupt operations and revenue</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Seasonal fluctuations create unpredictable energy demands</span>
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
                  Marine-Grade Solar Technology
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <Zap className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">Corrosion-Resistant Solar Systems</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Marine-grade solar panels with salt-water resistant coatings</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Stainless steel mounting systems designed for coastal environments</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">IP67-rated inverters and electrical components</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <Shield className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">Storm-Ready Infrastructure</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Wind-load rated mounting systems for coastal storms</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Flood-resistant electrical installations above storm surge levels</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Battery backup systems for emergency power during outages</span>
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
                  Complete Marina Solar Solutions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50 backdrop-blur-sm">
                        <CircleDollarSign className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-green-300">Dramatic Cost Reduction</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reduce marina energy costs by 75-90% immediately</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">No upfront investment with marine-specific financing</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">30% federal tax credit plus state marine incentives</span>
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
                        <h3 className="text-xl font-bold mb-3 text-green-300">Enhanced Marina Operations</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reliable power for dock services and lighting</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">25-year marine warranty with specialized support</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Professional marine installation and maintenance</span>
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
                      Start Your Marina Solar Project Today
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
              <h3 className="text-xl font-bold mb-4 text-white">Request Marina Consultation</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Name</FormLabel>
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
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Marina Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your marina name" {...field} className="bg-gray-800 border-gray-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Project Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your marina solar needs..." {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                Thank you for your interest in our marina solar solutions. We'll contact you within 24 hours.
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