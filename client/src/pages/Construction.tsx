import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { HardHat, ShieldCheck, Building, Building2, Hammer, CheckCircle, Warehouse, CircleDollarSign, TrendingUp, TrendingDown, Clock, Medal, Activity, Thermometer, FileText, Download, FlaskConical, Calculator, Check, Award, BarChart3, BadgePercent, Users, BookCopy, DollarSign, Timer, PiggyBank, FileCheck, Landmark, Sigma, Zap, Verified, AlertTriangle } from "lucide-react";
import { insertConstructionDistributorSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { preloadCriticalImages } from "@/lib/image-helper";
import { generateStructuredData, getIndustryKeywords } from "@/lib/seo-helper";

type ConstructionDistributorFormValues = z.infer<typeof insertConstructionDistributorSchema>;

const Construction = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [squareFootage, setSquareFootage] = useState<number | undefined>();
  const [energyCost, setEnergyCost] = useState<number | undefined>();
  const { toast } = useToast();
  
  // State for calculated ROI values
  const [energySavings, setEnergySavings] = useState<number>(0);
  const [roiTimeframe, setRoiTimeframe] = useState<number>(0);
  const [totalRoi, setTotalRoi] = useState<number>(0);
  
  // Define SEO metadata
  const title = "Advance Power Redding – Construction Solar Solutions";
  const description = "Shasta County Building Division compliant installations. PE stamps for structural modifications, 5-7 day permit processing, online submittal for systems under 15kW, C-46 licensed contractors.";
  const slug = "construction";
  const heroImagePath = "/src/assets_dir/images/construction-hero.png";
  
  // Preload critical hero image
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/optimized/praetorian-background-new.png"
    ]);
  }, []);
  
  // Form setup for construction distributor registration
  const form = useForm({
    resolver: zodResolver(insertConstructionDistributorSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      businessType: "contractor",
      foundedYear: 0,
      employeeCount: 0,
      annualRevenue: "",
      coverageAreas: [],
      productCategories: [],
      certifications: [],
      distributionCapabilities: "",
      marketingPreference: "",
      additionalNotes: ""
    },
  });

  // Submit handler
  const onSubmit = (data: ConstructionDistributorFormValues) => {
    registrationMutation.mutate(data);
  };

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: async (data: ConstructionDistributorFormValues) => {
      return await apiRequest("POST", "/api/construction/registration", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your distributor application has been submitted.",
        variant: "default",
      });
      setRegistrationSuccess(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <MainLayout fullWidth={true}>
      <SEOHead 
        title={title}
        description={description}
        industry="Construction"
        slug={slug}
        imagePath={heroImagePath}
        keywords={getIndustryKeywords('construction', [
          'construction solar solutions',
          'commercial solar installation',
          'building solar systems',
          'construction site power'
        ])}
        structuredData={generateStructuredData(
          'Construction',
          'Commercial solar solutions for construction projects and building infrastructure',
          slug,
          ['Commercial solar', 'Construction power', 'Building energy', 'Site installations']
        )}
      />
      <div className="relative">
        {/* Premium background */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0d0d15 0%, #131930 30%, #182240 60%, #101b2c 100%)'
        }}></div>
        
        {/* Background glow elements */}
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
                      Construction Solar Solutions
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power delivers robust solar energy systems designed for construction sites, commercial buildings, and industrial facilities. Our solutions provide reliable, cost-effective power for your projects while reducing operational expenses.
                      </p>
                      <p className="text-lg">
                        From temporary construction power to permanent building installations, we provide comprehensive solar solutions that meet the demanding requirements of the construction industry.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Commercial Installations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HardHat className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Construction Site Power</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Durable Systems</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                        onClick={handleShowRegistrationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                          Get Quote
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
                      src="/src/assets_dir/images/construction-hero.png" 
                      alt="Construction solar installation by Advance Power" 
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
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  Construction Industry Challenges
                </h2>
                
                {/* Pain points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-red-900/30 rounded-lg border border-red-700/50 backdrop-blur-sm">
                        <DollarSign className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-red-300">Rising Energy Costs</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Construction energy costs have increased 40% over the past 3 years</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Temporary power connections cost $2,000-5,000 per month per site</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Energy costs represent 8-12% of total construction project budgets</span>
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
                        <h3 className="text-xl font-bold mb-3 text-red-300">Project Delays & Inefficiencies</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Power outages cause an average of 12 hours of delays per month</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Grid connection delays can push project timelines back 2-6 weeks</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Equipment downtime costs $1,500-3,000 per day in lost productivity</span>
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
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">High-Efficiency Solar Panels</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Tier-1 monocrystalline panels with 22%+ efficiency ratings</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Weather-resistant construction for job site durability</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">25-year performance warranty with guaranteed output</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-yellow-500/30 rounded-xl transition-all duration-300 hover:border-yellow-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50 backdrop-blur-sm">
                        <Building className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">Modular Installation Systems</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Portable systems for temporary construction power needs</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Rapid deployment and removal for project flexibility</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Scalable configurations from 10kW to 2MW+ systems</span>
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
                  Complete Construction Solar Solutions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-lg">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative flex gap-4 items-start">
                      <div className="p-3 bg-green-900/30 rounded-lg border border-green-700/50 backdrop-blur-sm">
                        <CircleDollarSign className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-green-300">Immediate Cost Savings</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reduce energy costs by 70-90% from day one</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">No upfront costs with financing options available</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Federal tax credits and accelerated depreciation benefits</span>
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
                        <h3 className="text-xl font-bold mb-3 text-green-300">Enhanced Project Efficiency</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Reliable power eliminates weather-related delays</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">24/7 monitoring and maintenance support</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">Professional installation and commissioning</span>
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
                    onClick={handleShowRegistrationForm}
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

        {/* Registration Form Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">Request Construction Solar Quote</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} className="bg-gray-800 border-gray-600 text-white" />
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
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Project Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project..." {...field} className="bg-gray-800 border-gray-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      disabled={registrationMutation.isPending}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {registrationMutation.isPending ? "Submitting..." : "Get Quote"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowRegistrationForm(false)}
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
        {registrationSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Quote Request Submitted!</h3>
              <p className="text-gray-300 mb-4">
                Thank you for your interest in our construction solar solutions. We'll contact you within 24 hours.
              </p>
              <Button 
                onClick={() => setRegistrationSuccess(false)}
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
};

export default Construction;