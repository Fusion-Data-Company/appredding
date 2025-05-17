import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
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
import { HardHat, Droplets, ShieldCheck, Leaf, Building, PaintBucket, Umbrella, HardDrive, Hammer, Ruler, Wrench, CheckCircle, Warehouse, Truck, Award, CircleDollarSign } from "lucide-react";
import { insertConstructionDistributorSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ConstructionPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for construction distributor registration
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
      businessType: "retailer", // Default value
      foundedYear: 0,
      employeeCount: 0,
      annualRevenue: "",
      coverageAreas: [],
      productCategories: [],
      certifications: [],
      notes: "",
      warehouseLocations: [],
      deliveryOptions: []
    },
  });

  // Construction Distributor registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      // Convert empty strings to nulls for optional fields
      const formattedData = { ...data };
      ["website", "address", "city", "state", "zipCode"].forEach(field => {
        if (formattedData[field] === "") formattedData[field] = null;
      });
      
      // Ensure array fields are properly formatted
      ["coverageAreas", "productCategories", "certifications", "warehouseLocations", "deliveryOptions"].forEach(field => {
        if (typeof formattedData[field] === "string" && formattedData[field]) {
          formattedData[field] = formattedData[field].split(",").map((item: string) => item.trim());
        }
      });
      
      const response = await apiRequest("POST", "/api/professionals/construction-distributors", formattedData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your construction distributor profile has been created",
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

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };
  
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };
  
  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Full-page construction background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/construction-bg.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90"></div>
        
        {/* Ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              {/* Advanced enterprise-grade backdrop with layered effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-orange-600/10 to-blue-600/20 rounded-2xl blur-xl opacity-70"></div>
              
              {/* Premium corner accents - enterprise elite style */}
              <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg"></div>
                <div className="absolute top-1 left-1 w-14 h-14 border-t border-l border-blue-500/40 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/60 rounded-tr-lg"></div>
                <div className="absolute top-1 right-1 w-14 h-14 border-t border-r border-blue-500/40 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-500/60 rounded-bl-lg"></div>
                <div className="absolute bottom-1 left-1 w-14 h-14 border-b border-l border-blue-500/40 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/60 rounded-br-lg"></div>
                <div className="absolute bottom-1 right-1 w-14 h-14 border-b border-r border-blue-500/40 rounded-br-lg"></div>
              </div>
              
              <div className="relative p-8 md:p-10 backdrop-blur-sm">
                {/* Ultra-premium enterprise header with layered effects */}
                <div className="relative mb-8">
                  {/* Advanced layered glow effects */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-blue-600/20 to-blue-500/30 rounded-full blur-xl opacity-80"></div>
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/10 via-orange-500/5 to-blue-600/10 rounded-full blur-2xl opacity-70 animate-pulse-slow"></div>
                  
                  {/* Premium title with enterprise-grade styling */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white relative z-10 
                    tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_2px_15px_rgba(59,130,246,0.3),0_-1px_35px_rgba(59,130,246,0.2)]">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-50 to-white">
                      642% Construction ROI System
                    </span>
                  </h1>
                  
                  {/* Sophisticated divider accents */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                {/* Enhanced ROI-focused stats in enterprise grid format with premium green styling */}
                <div className="relative mb-8">
                  {/* Enhanced green ambient glow for ROI section */}
                  <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                  <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {/* Cost Savings */}
                    <div className="relative group">
                      <div className="relative bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] transform group-hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                            border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                            <CircleDollarSign className="w-4 h-4 text-green-100" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-400 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">$3.2M</p>
                        <p className="text-blue-300 text-sm">Average Cost Savings</p>
                      </div>
                    </div>
                    
                    {/* Lifecycle Reduction */}
                    <div className="relative group">
                      <div className="relative bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] transform group-hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                            border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                            <Building className="w-4 h-4 text-green-100" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-400 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">27.8%</p>
                        <p className="text-blue-300 text-sm">Lifecycle Cost Reduction</p>
                      </div>
                    </div>
                    
                    {/* Maintenance Savings */}
                    <div className="relative group">
                      <div className="relative bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] transform group-hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                            border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                            <Wrench className="w-4 h-4 text-green-100" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-400 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">76.4%</p>
                        <p className="text-blue-300 text-sm">Maintenance Cost Savings</p>
                      </div>
                    </div>
                    
                    {/* Total ROI */}
                    <div className="relative group">
                      <div className="relative bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] transform group-hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                            border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                            <Award className="w-4 h-4 text-green-100" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-400 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">642%</p>
                        <p className="text-green-300 text-sm">Total Cost ROI</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced description with premium typography */}
                <div className="relative">
                  {/* Subtle glow effect behind premium text */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 via-blue-600/10 to-blue-600/5 rounded-xl blur-lg opacity-70"></div>
                  
                  <div className="relative">
                    <p className="text-xl text-white mb-6 leading-relaxed">
                      Our ceramic microsphere technology delivers <span className="text-orange-300 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">transformative performance</span> for construction applications with proven ROI across commercial, industrial, and infrastructure projects.
                    </p>
                    
                    <GradientButton 
                      onClick={handleShowRegistrationForm}
                      className="px-8 py-3 text-lg"
                    >
                      Calculate Your Construction ROI
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pain points and solutions section */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative rounded-xl overflow-hidden">
                {/* Advanced enterprise-grade backdrop with layered effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-blue-600/10 rounded-xl blur-xl opacity-70"></div>
                
                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/60 rounded-br-lg"></div>
                </div>
                
                <div className="relative p-8 lg:p-10">
                  {/* Enhanced section header with enterprise-grade styling */}
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 relative">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white
                        [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_0_15px_rgba(59,130,246,0.3)]">
                        Construction Industry Challenges & Solutions
                      </span>
                    </h2>
                    <div className="h-px w-40 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mx-auto"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Pain points column */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/5 via-red-500/10 to-red-600/5 rounded-xl blur-md opacity-80"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-xl border border-red-500/30">
                        <h3 className="text-xl font-bold text-white mb-4 relative inline-flex items-center">
                          <span className="mr-2 text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </span>
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-50 to-white">
                            Industry Pain Points
                          </span>
                        </h3>
                        <ul className="space-y-4">
                          {[
                            { 
                              text: "Escalating construction maintenance costs reaching $92.50/sq.ft annually for commercial buildings", 
                              icon: <Building className="h-5 w-5 text-red-400" /> 
                            },
                            { 
                              text: "Catastrophic infrastructure failures causing $78B in annual repair costs nationwide", 
                              icon: <HardHat className="h-5 w-5 text-red-400" /> 
                            },
                            { 
                              text: "Building envelope failures resulting in 23.8% energy loss and $4.28/sq.ft utility waste", 
                              icon: <ShieldCheck className="h-5 w-5 text-red-400" /> 
                            },
                            { 
                              text: "Corrosion degradation cutting service life by 38-52%, with $121B annual US impact", 
                              icon: <Droplets className="h-5 w-5 text-red-400" /> 
                            },
                            { 
                              text: "Volatile coating material costs increasing 73% since 2019, outpacing inflation", 
                              icon: <PaintBucket className="h-5 w-5 text-red-400" /> 
                            }
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mt-1 mr-3 flex-shrink-0">
                                {item.icon}
                              </div>
                              <p className="text-gray-300">{item.text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Solutions column */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 via-green-500/10 to-blue-600/5 rounded-xl blur-md opacity-80"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-xl border border-green-500/30">
                        <h3 className="text-xl font-bold text-white mb-4 relative inline-flex items-center">
                          <span className="mr-2 text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-50 to-white">
                            Our Ceramic Solutions
                          </span>
                        </h3>
                        <ul className="space-y-4">
                          {[
                            { 
                              text: "Permanent elastomeric waterproofing system reducing failures by 94.5% over 30+ years", 
                              icon: <Umbrella className="h-5 w-5 text-green-400" /> 
                            },
                            { 
                              text: "Structural reinforcement system extending infrastructure lifecycle 386% while reducing maintenance", 
                              icon: <Hammer className="h-5 w-5 text-green-400" /> 
                            },
                            { 
                              text: "Thermal envelope barrier reducing energy consumption by 41.7% with verified performance data", 
                              icon: <Leaf className="h-5 w-5 text-green-400" /> 
                            },
                            { 
                              text: "Anti-corrosion system surpassing 10,000 hours salt spray testing (ASTM B117) with zero failure", 
                              icon: <HardDrive className="h-5 w-5 text-green-400" /> 
                            },
                            { 
                              text: "Patented multi-ceramic formulation using 38% less material with 27.8% lower application costs", 
                              icon: <Ruler className="h-5 w-5 text-green-400" /> 
                            }
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mt-1 mr-3 flex-shrink-0">
                                {item.icon}
                              </div>
                              <p className="text-gray-300">{item.text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Financial Impact Section */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative rounded-xl overflow-hidden">
                {/* Advanced enterprise-grade backdrop with layered effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
                
                <div className="relative p-8 lg:p-10">
                  {/* Enhanced section header with enterprise-grade styling */}
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 relative">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-white
                        [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_0_15px_rgba(234,88,12,0.3)]">
                        Financial Impact: Premium Construction Solutions
                      </span>
                    </h2>
                  </div>
                  
                  <p className="mb-4 text-gray-200 leading-relaxed">Our government-exclusive ceramic technology is now available to civilian construction firms, delivering measurable ROI across these applications:</p>
                  <p className="mb-5 text-orange-300 text-sm italic">Previously limited to classified infrastructure projects, now accessible for commercial use with proven performance metrics:</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Enhanced premium stats item */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-blue-500/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/10 to-blue-500/10 flex items-center justify-center border border-blue-500/30">
                          <span className="text-blue-400 text-xl font-bold">✓</span>
                        </div>
                        <span className="text-gray-200">Structural steel fire protection: <span className="text-green-400 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">$1.84M saved</span> on 3-hour rated ASTM E119 project</span>
                      </div>
                    </div>
                    
                    {/* Enhanced premium stats item */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/5 to-orange-500/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-600/10 to-orange-500/10 flex items-center justify-center border border-orange-500/30">
                          <span className="text-orange-400 text-xl font-bold">✓</span>
                        </div>
                        <span className="text-gray-200">Industrial flooring with 156% flexibility: <span className="text-green-400 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">$460K insurance discount</span> in seismic zones</span>
                      </div>
                    </div>
                    
                    {/* Enhanced premium stats item */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-blue-500/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/10 to-blue-500/10 flex items-center justify-center border border-blue-500/30">
                          <span className="text-blue-400 text-xl font-bold">✓</span>
                        </div>
                        <span className="text-gray-200">Concrete thermal protection: <span className="text-green-400 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">42% energy cost reduction</span> (89% reflection, 47°F cooler)</span>
                      </div>
                    </div>
                    
                    {/* Enhanced premium stats item */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/5 to-orange-500/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-600/10 to-orange-500/10 flex items-center justify-center border border-orange-500/30">
                          <span className="text-orange-400 text-xl font-bold">✓</span>
                        </div>
                        <span className="text-gray-200">Bridge infrastructure: <span className="text-green-400 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">$4.8M maintenance savings</span> (10,000+ salt spray hour protection)</span>
                      </div>
                    </div>
                    
                    {/* Enhanced premium stats item */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-blue-500/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/10 to-blue-500/10 flex items-center justify-center border border-blue-500/30">
                          <span className="text-blue-400 text-xl font-bold">✓</span>
                        </div>
                        <span className="text-gray-200">Building envelope thermal barriers: <span className="text-green-400 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">$3.82/sq.ft annual utility savings</span> (87% reduction)</span>
                      </div>
                    </div>
                    
                    {/* Enhanced premium stats item */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/5 to-orange-500/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-600/10 to-orange-500/10 flex items-center justify-center border border-orange-500/30">
                          <span className="text-orange-400 text-xl font-bold">✓</span>
                        </div>
                        <span className="text-gray-200">Waterproofing with Class A fire rating: <span className="text-green-400 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">$14.50/sq.ft combined insurance/warranty savings</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ceramic Technology Features Section */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative rounded-xl overflow-hidden">
                {/* Advanced enterprise-grade backdrop with layered effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
                
                <div className="relative p-8 lg:p-10">
                  {/* Enhanced section header with enterprise-grade styling */}
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 relative">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white
                        [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_0_15px_rgba(59,130,246,0.3)]">
                        Ceramic Technology
                      </span>
                    </h2>
                  </div>
                  
                  {/* Enhanced feature grid with enterprise-elite styling */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-lg border border-blue-500/30">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                              <Wrench className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Multi-functional Performance</h3>
                            <p className="text-gray-300 leading-relaxed">Single-coat system delivers waterproofing, thermal insulation, corrosion protection, and structural reinforcement simultaneously, reducing application costs by 67%.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-lg border border-blue-500/30">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                              <CheckCircle className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Government-Grade Performance</h3>
                            <p className="text-gray-300 leading-relaxed">Exceeds MIL-PRF-24596B and MIL-DTL-24607B requirements with verified 30+ year durability in extreme environments. Exceeds ASTM E84, E96, and G154 standards.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-lg border border-blue-500/30">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                              <Warehouse className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Construction Portfolio Value</h3>
                            <p className="text-gray-300 leading-relaxed">Documented 7.2-10.4% increase in property valuations for LEED/Green-certified buildings using our ceramic technology. Enhances owner resale equity position by 9.2%.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature 4 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-lg border border-blue-500/30">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                              <Truck className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Logistics Optimization</h3>
                            <p className="text-gray-300 leading-relaxed">Reduces material volume requirements by 57% versus traditional systems while eliminating primer, intermediate and top-coat requirements for more efficient supply chains.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature 5 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-lg border border-blue-500/30">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                              <Award className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Highest Quality Certification</h3>
                            <p className="text-gray-300 leading-relaxed">ISO 9001:2015 certified manufacturing with documented chain-of-custody and complete quality assurance documentation for every production batch.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature 6 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-lg blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-lg border border-blue-500/30">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                              <CircleDollarSign className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">ROI Validation System</h3>
                            <p className="text-gray-300 leading-relaxed">Proprietary ROI analytics platform with documented savings calculations specific to your project parameters. Complete with third-party verification and audit capabilities.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced CTA */}
                  <div className="text-center mt-10">
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-blue-600/30 to-blue-600/20 rounded-full blur-xl opacity-70"></div>
                      <GradientButton 
                        onClick={handleShowRegistrationForm}
                        className="relative px-8 py-3 text-lg"
                      >
                        Request Detailed ROI Analysis
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Form Section */}
            {showRegistrationForm && !registrationSuccess ? (
              <div className="max-w-4xl mx-auto mb-16">
                <div className="relative rounded-xl overflow-hidden">
                  {/* Advanced enterprise-grade backdrop with layered effects */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
                  
                  <div className="relative p-8 lg:p-10">
                    {/* Enhanced section header with enterprise-grade styling */}
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold text-white mb-4 relative">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white
                          [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_0_15px_rgba(59,130,246,0.3)]">
                          Construction Distributor Registration
                        </span>
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Register below to receive your custom ROI analysis and product information
                      </p>
                    </div>
                    
                    {/* Form */}
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Company Name */}
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Company Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
                                    placeholder="Your Company Name" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {/* Contact Name */}
                          <FormField
                            control={form.control}
                            name="contactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Contact Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-900/50 border-blue-500/30 text-white focus:border-blue-400" 
                                    placeholder="Your Full Name" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {/* Email */}
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email"
                                    className="bg-gray-900/50 border-blue-500/30 text-white focus:border-blue-400" 
                                    placeholder="you@company.com" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {/* Phone */}
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="tel"
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
                                    placeholder="(123) 456-7890" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Submit Button */}
                        <div className="text-center mt-6">
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-r from-green-600/20 via-green-600/30 to-green-600/20 rounded-full blur-xl opacity-70"></div>
                            <Button 
                              type="submit" 
                              className="relative px-8 py-3 bg-gradient-to-br from-gray-800 to-gray-900 text-white text-lg font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 border-2 border-green-500/50 overflow-hidden"
                              disabled={registerMutation.isPending}
                            >
                              {/* Light shimmer animation effect */}
                              <span className="absolute inset-0 overflow-hidden">
                                <span className="absolute top-0 -left-3/4 w-1/2 h-full bg-gradient-to-r from-transparent via-green-100/20 to-transparent transform -skew-x-30 animate-shimmer"></span>
                              </span>
                              <div className="flex items-center justify-center">
                                <CircleDollarSign className="h-5 w-5 mr-2 text-green-400" />
                                {registerMutation.isPending ? "Submitting..." : "Register for ROI Analysis"}
                              </div>
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            ) : registrationSuccess ? (
              /* Registration Success Message */
              <div className="max-w-4xl mx-auto mb-16">
                <div className="relative rounded-xl overflow-hidden">
                  {/* Advanced enterprise-grade backdrop with layered effects */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]"></div>
                  
                  <div className="relative p-8 lg:p-10 text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Thank you for registering! Our construction solutions team will prepare your custom ROI analysis and contact you within 1 business day.
                    </p>
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-600/20 via-green-600/30 to-green-600/20 rounded-full blur-xl opacity-70"></div>
                      <Button 
                        onClick={() => setShowRegistrationForm(false)}
                        className="relative px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-medium rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                        Return to Construction Solutions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            
            {/* Contact Information Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative rounded-xl overflow-hidden">
                {/* Advanced enterprise-grade backdrop with layered effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
                
                <div className="relative p-8 lg:p-10">
                  {/* Contact Information */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Contact Our Construction Solutions Team
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Have specific questions about our construction solutions? Contact us directly:
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                      <div className="flex items-center">
                        <div className="mr-3 w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="text-white">(916) 809-6619</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-white">rob@praetoriansmartcoat.com</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-500/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-white">Redding, California</span>
                      </div>
                    </div>
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

export default ConstructionPage;