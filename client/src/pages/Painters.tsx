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
  PaintBucket, 
  Brush, 
  Clock, 
  Palette, 
  ChevronRight, 
  Zap, 
  CircleDollarSign,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  BarChart
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

export default function Painters() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  // Define industry-specific data for SEO
  const industry = "Painting Contractors";
  const slug = "painters";
  const pageTitle = "Advance Power Redding – Solar Solutions for Painting Contractors";
  const pageDescription = "Specialized solar energy systems for painting contractors and commercial coating businesses. Reduce operational costs while providing reliable power for your projects.";
  const heroImagePath = "/src/assets_dir/images/painters-hero.jpg";
  
  // Preload critical images
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/optimized/praetorian-background-new.png"
    ]);
  }, []);

  // Setup form for consultation form
  const form = useForm<z.infer<typeof insertPainterContactSchema>>({
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
      projectType: "commercial",
      projectSize: "",
      projectTimeline: "",
      coatingNeeds: "both",
      preferredProducts: "",
      additionalDetails: "",
      agreesToTerms: false
    },
  });

  // Mutation for consultation form
  const consultationMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertPainterContactSchema>) => {
      return await apiRequest("/api/painters/consultation", {
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

  const onSubmit = (data: z.infer<typeof insertPainterContactSchema>) => {
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
          'painting contractor solar',
          'commercial coating solar',
          'painter energy solutions',
          'contractor solar systems'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Commercial Solar Systems",
          "Contractor Energy Solutions",
          "Painting Business Solar",
          "Industrial Solar Power"
        ])}
      />
      
      <div className="relative">
        {/* Premium gradient background */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(154, 52, 18, 0.6) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-3] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 64, 175, 0.5) 0%, rgba(15, 23, 42, 0) 60%)'
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
                      Solar Solutions for Painting Contractors
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power provides specialized solar energy systems designed for painting contractors and commercial coating businesses. Our solutions deliver reliable, cost-effective power for your operations while significantly reducing overhead costs.
                      </p>
                      <p className="text-lg">
                        From commercial painting facilities to mobile coating operations, we provide comprehensive solar solutions that meet the unique energy demands of the painting industry.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <PaintBucket className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Commercial Facilities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brush className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Mobile Operations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Reliable Systems</span>
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
                      src="/src/assets_dir/images/painters-hero.jpg" 
                      alt="Solar installation for painting contractors by Advance Power" 
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
                  Painting Industry Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-red-900/30 rounded-lg border border-red-700/50 backdrop-blur-sm">
                        <CircleDollarSign className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-red-300">High Operating Costs</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Energy costs for spray booths and climate control average $3,000-5,000 monthly</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Seasonal fluctuations create cash flow challenges, with 40-60% revenue variations between peak and off-peak periods</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Equipment power requirements increase operational expenses by 15-25%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-red-900/30 rounded-lg border border-red-700/50 backdrop-blur-sm">
                        <Clock className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-red-300">Competitive Market Pressures</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Labor shortages impact 68% of painting businesses, with skilled painter turnover exceeding 45% annually</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Marketing costs average 12-18% of revenue for painting contractors, more than double other trades</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Bid competition forces margins down while material and energy costs continue rising</span>
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
                  Advanced Solar Technology Solutions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <Zap className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">High-Performance Solar Systems</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Premium monocrystalline panels designed for commercial operations</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Advanced power optimizers for maximum energy harvesting</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Weather-resistant construction for industrial environments</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <BarChart className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">Smart Energy Management</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Real-time monitoring and optimization systems</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Load management for spray booth and HVAC systems</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Battery backup integration for critical operations</span>
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
                  Complete Painting Contractor Solutions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50 backdrop-blur-sm">
                        <CircleDollarSign className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-green-300">Immediate Cost Reduction</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reduce facility energy costs by 70-90% immediately</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">No upfront investment with flexible financing options</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Federal tax incentives and accelerated depreciation benefits</span>
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
                        <h3 className="text-xl font-bold mb-3 text-green-300">Enhanced Business Performance</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Predictable energy costs improve bid accuracy and margins</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">25-year warranty provides long-term cost certainty</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Professional installation and comprehensive support</span>
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
                      Start Your Solar Project Today
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
              <h3 className="text-xl font-bold mb-4 text-white">Request Painting Contractor Consultation</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                            <Input placeholder="Doe" {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                          <Input type="email" placeholder="john@company.com" {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                        <FormLabel className="text-gray-300">Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your painting company" {...field} className="bg-gray-800 border-gray-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Project Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your energy needs..." {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                Thank you for your interest in our painting contractor solar solutions. We'll contact you within 24 hours.
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