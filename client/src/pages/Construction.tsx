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
import { HardHat, Droplets, ShieldCheck, Leaf, Building, PaintBucket, Umbrella, HardDrive, Hammer, Ruler, Wrench, CheckCircle, Warehouse, Truck, Award, CircleDollarSign, ArrowRight, CalendarCheck, TrendingUp, Clock, FileCheck, BarChart3 } from "lucide-react";
import { insertConstructionDistributorSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { PremiumCartButton } from "@/utils/premium-buttons";

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
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101630 30%, #14162c 60%, #0c0e1f 100%)'
        }}></div>
        
        {/* Dynamic layered background elements */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-4] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0) 70%)'
        }}></div>
        
        {/* Advanced multi-color ambient glow effects - enhanced for elite enterprise appearance */}
        <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none">
          {/* Blue glow */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          
          {/* Red glow */}
          <div className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-red-500/10 rounded-full blur-[150px] animate-pulse-slower"></div>
          
          {/* Green accent glows for balance */}
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[30%] left-[20%] w-[30rem] h-[30rem] bg-green-700/5 rounded-full blur-[100px] animate-pulse-slower"></div>
          
          {/* Purple accent for depth */}
          <div className="absolute top-[70%] left-[50%] w-[20rem] h-[20rem] bg-purple-700/5 rounded-full blur-[90px] animate-pulse-slow"></div>
        </div>
        
        {/* Low-opacity subtle pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%235d9bec\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="container mx-auto">
            {/* Section-specific ambient blue glow in background (z-index lower than content) */}
            <div className="absolute -inset-10 bg-blue-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
            <div className="absolute -inset-20 bg-blue-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
            
            {/* Ultra-premium Elite Enterprise Header Container - front layer with high z-index */}
            <div className="relative z-20 rounded-2xl overflow-hidden transform transition-all duration-700 group hover:scale-[1.005] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] border border-blue-700/30">
              {/* Premium multi-layered background with depth effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-950/98 to-black/95"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/30 to-transparent opacity-70"></div>
              
              {/* Edge lighting effects with gradient borders */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
              
              {/* Header content container with padding */}
              <div className="relative z-10 p-8 md:p-12">
                <div className="max-w-5xl mx-auto text-center">
                  {/* Premium enterprise title with layered effects */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white relative">
                    <span className="absolute -inset-2 bg-blue-500/5 blur-xl rounded-full"></span>
                    <span className="relative z-10">Construction Industry Protection</span>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                  </h1>
                  
                  {/* Enterprise-grade subtitle */}
                  <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Praetorian Smart-Coat delivers advanced material protection that extends infrastructure lifespan while reducing maintenance costs and energy consumption.
                  </p>
                  
                  {/* Icon feature grid with premium styling */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                          <HardHat className="h-8 w-8 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Industrial-Grade Protection</h3>
                        <p className="text-gray-300">Military-spec ceramic coating that creates a permanent bond with concrete, steel, and wood. Proven to extend asset lifespan by 20+ years in extreme environments.</p>
                      </div>
                    </div>
                    
                    <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                          <ShieldCheck className="h-8 w-8 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Multiple Protection Layers</h3>
                        <p className="text-gray-300">A single system that provides Class-A fire resistance, thermal insulation, corrosion prevention, and UV protection - significantly reducing material degradation.</p>
                      </div>
                    </div>
                    
                    <div className="relative p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-blue-500/30 rounded-xl transition-all duration-300 hover:border-blue-500/50 overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="p-3 bg-blue-950/80 rounded-2xl mb-4 border border-blue-700/40">
                          <Leaf className="h-8 w-8 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Eco-Friendly Formula</h3>
                        <p className="text-gray-300">Low-VOC, water-based coating complies with strict environmental regulations and contributes to LEED certification points while reducing energy consumption by 30-45%.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content problems section */}
            <div className="relative z-20 mt-16 mb-12">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-gray-950/90 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.25)]">
                  <div className="p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Construction Industry Challenges</h2>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 p-1 bg-blue-900/50 rounded-lg border border-blue-700/40">
                          <Droplets className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-blue-200">Moisture Intrusion & Material Failure</h3>
                          <p className="mt-1 text-gray-300">Water penetration through concrete and other building materials leads to premature structural degradation, mold growth, and expensive repairs.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 p-1 bg-blue-900/50 rounded-lg border border-blue-700/40">
                          <Umbrella className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-blue-200">Weather-Related Deterioration</h3>
                          <p className="mt-1 text-gray-300">UV damage, freeze-thaw cycles, and extreme temperature fluctuations drastically reduce the lifespan of construction materials and coatings.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 p-1 bg-blue-900/50 rounded-lg border border-blue-700/40">
                          <Building className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-blue-200">Increasing Energy Costs</h3>
                          <p className="mt-1 text-gray-300">Poor thermal management in buildings results in excessive HVAC costs, uncomfortable interior environments, and failure to meet modern energy codes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 2: PAIN - RED GLOW SECTION */}
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="container mx-auto">
            {/* Section-specific ambient red glow in background (z-index lower than content) */}
            <div className="absolute -inset-10 bg-red-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
            <div className="absolute -inset-20 bg-red-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
            
            {/* Content card with high z-index to appear over the glow */}
            <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
              {/* Section Title with premium styling */}
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                Ultimate Construction Protection Solutions
              </h2>

              {/* Key solution offerings in grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 via-red-400/20 to-red-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-red-500/30 rounded-xl p-6 h-full">
                    <div className="mb-4 flex items-center">
                      <div className="p-2 bg-red-900/50 rounded-lg border border-red-500/30 mr-3">
                        <Hammer className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">New Construction Solutions</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6">Integrate Smart-Coat from day one for superior building envelope protection and thermal management. Ideal for:</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Commercial facilities requiring enhanced energy efficiency</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Industrial buildings exposed to harsh operating conditions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Infrastructure projects with extended service life requirements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Facilities seeking LEED certification points for energy reduction</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 via-red-400/20 to-red-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-red-500/30 rounded-xl p-6 h-full">
                    <div className="mb-4 flex items-center">
                      <div className="p-2 bg-red-900/50 rounded-lg border border-red-500/30 mr-3">
                        <Wrench className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Retrofit & Remediation</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6">Transform existing structures with protective coating systems that address current problems while preventing future degradation:</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Aging infrastructure requiring extended service life</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Concrete structures with moisture intrusion issues</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Metal buildings with corrosion and thermal management problems</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">Buildings seeking energy efficiency improvements without major renovation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Application specifications section */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-red-500/20 rounded-xl p-6 mb-8">
                <div className="absolute -inset-px bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-xl opacity-50 blur-sm"></div>
                
                <h3 className="text-2xl font-bold text-red-300 mb-4 relative z-10">Application Specifications & Performance</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-red-500/10">
                    <h4 className="text-lg font-semibold text-red-200 mb-2">Concrete Applications</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Penetrates 3-5mm into substrate, creating permanent molecular bond</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Reduces water penetration by 98% while maintaining vapor permeability</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Prevents efflorescence, spalling, and freeze-thaw damage</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-red-500/10">
                    <h4 className="text-lg font-semibold text-red-200 mb-2">Metal Applications</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Blocks electrolytic corrosion with molecular barrier that maintains adhesion in 15-year saltwater tests</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Reflects up to 95% of solar radiation, reducing metal surface temperatures by 50-75°F</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Prevents heat transfer through thermal bridging in steel structures</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-red-500/10">
                    <h4 className="text-lg font-semibold text-red-200 mb-2">Universal Benefits</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Class-A fire rating per ASTM E84 with zero flame spread</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>VOC compliant in all 50 states (< 50 g/L)</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="h-4 w-1 bg-red-500/50 rounded-full mr-2 mt-1"></div>
                        <span>Can be applied in temperatures from 40°F to 120°F with standard equipment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 3: SOLUTION/ROI - GREEN GLOW SECTION */}
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="container mx-auto">
            {/* Section-specific ambient green glow in background (z-index lower than content) */}
            <div className="absolute -inset-10 bg-green-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
            <div className="absolute -inset-20 bg-green-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
            
            {/* Content card with high z-index to appear over the glow */}
            <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-green-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
              {/* Section Title with premium styling */}
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-300">
                Construction Industry ROI Analysis
              </h2>

              {/* Business impact statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-black/80 to-green-900/20 p-6">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl blur opacity-50"></div>
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <CircleDollarSign className="h-12 w-12 text-green-400 mb-2" />
                    <h3 className="text-xl font-bold text-green-300">Maintenance Reduction</h3>
                    <div className="text-4xl font-bold text-white">62-78%</div>
                    <p className="text-gray-400 text-sm">Average reduction in annual maintenance costs for treated structures</p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-black/80 to-green-900/20 p-6">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl blur opacity-50"></div>
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <TrendingUp className="h-12 w-12 text-green-400 mb-2" />
                    <h3 className="text-xl font-bold text-green-300">Property Value Increase</h3>
                    <div className="text-4xl font-bold text-white">12-18%</div>
                    <p className="text-gray-400 text-sm">Average increase in property valuation with certified energy efficiency improvements</p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-black/80 to-green-900/20 p-6">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl blur opacity-50"></div>
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <Clock className="h-12 w-12 text-green-400 mb-2" />
                    <h3 className="text-xl font-bold text-green-300">Payback Period</h3>
                    <div className="text-4xl font-bold text-white">2.4 yrs</div>
                    <p className="text-gray-400 text-sm">Average time to ROI through combined energy and maintenance savings</p>
                  </div>
                </div>
              </div>
              
              {/* Financial benefit timeline */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-green-500/20 rounded-xl p-6 mb-10">
                <div className="absolute -inset-px bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 rounded-xl opacity-50 blur-sm"></div>
                
                <h3 className="text-2xl font-bold text-green-300 mb-6 relative z-10">Long-Term Business Impact Analysis</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-green-500/80 via-green-600/50 to-green-700/30"></div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-800 rounded-full p-2 border-4 border-gray-900 z-10">
                        <CalendarCheck className="h-5 w-5 text-green-300" />
                      </div>
                      <div className="ml-8">
                        <h4 className="text-xl font-semibold text-white mb-2">Year 1: Immediate Benefits</h4>
                        <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-green-500/10">
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>30-45% reduction in HVAC energy costs through superior thermal management</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Complete protection against moisture intrusion and corrosion initiation</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Potential insurance premium reductions due to fire protection rating</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-800 rounded-full p-2 border-4 border-gray-900 z-10">
                        <CalendarCheck className="h-5 w-5 text-green-300" />
                      </div>
                      <div className="ml-8">
                        <h4 className="text-xl font-semibold text-white mb-2">Years 3-5: Accumulating ROI</h4>
                        <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-green-500/10">
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Complete avoidance of traditional repainting/recoating cycles (3-5 year typical schedule)</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Elimination of rust remediation costs on metal structures</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Continued energy savings compounding with utility rate increases</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-800 rounded-full p-2 border-4 border-gray-900 z-10">
                        <CalendarCheck className="h-5 w-5 text-green-300" />
                      </div>
                      <div className="ml-8">
                        <h4 className="text-xl font-semibold text-white mb-2">Years 10-15: Maximum Return Phase</h4>
                        <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-green-500/10">
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Avoided capital expense of major structural repairs common in untreated buildings</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Extended service life of the entire building envelope by 15-20 years</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Premium property valuation at time of sale due to certified enhanced building performance</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Case study section */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-black/80 to-gray-900/80 rounded-xl border border-green-500/20 p-6">
                  <h3 className="text-2xl font-bold text-green-300 mb-4">Construction Industry Case Study</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-2">Mid-Atlantic Commercial Development</h4>
                    <p className="text-gray-300 mb-4">A 120,000 sq ft mixed-use commercial development faced severe issues with concrete spalling and water intrusion. Traditional waterproofing systems had failed within 4 years of installation.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-green-500/10">
                        <h5 className="text-lg font-medium text-green-200 mb-2">Before Smart-Coat Application</h5>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500/50 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✕</div>
                            <span>$172,000 annual concrete repair budget</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500/50 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✕</div>
                            <span>Tenant complaints about water leakage</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500/50 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✕</div>
                            <span>15% vacancy rate due to building conditions</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-red-500/50 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✕</div>
                            <span>$387,000 average annual energy costs</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-green-500/10">
                        <h5 className="text-lg font-medium text-green-200 mb-2">After Smart-Coat Application</h5>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-green-500/70 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✓</div>
                            <span>Concrete repair budget reduced to $28,000 annually</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-green-500/70 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✓</div>
                            <span>Complete elimination of water intrusion issues</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-green-500/70 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✓</div>
                            <span>100% occupancy achieved within 6 months</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-green-500/70 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5 mr-2">✓</div>
                            <span>Energy costs reduced to $251,000 annually (35% reduction)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-lg font-medium text-green-200 mb-2 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                          Five-Year Financial Impact
                        </h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Maintenance cost reduction:</span>
                            <span className="text-white font-semibold">$720,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Energy savings:</span>
                            <span className="text-white font-semibold">$680,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Additional revenue from occupancy increase:</span>
                            <span className="text-white font-semibold">$940,000</span>
                          </div>
                          <div className="h-px bg-green-500/30 my-2"></div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-200 font-medium">Total 5-year benefit:</span>
                            <span className="text-green-100 font-bold">$2,340,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-200 font-medium">Smart-Coat investment:</span>
                            <span className="text-green-100 font-bold">$420,000</span>
                          </div>
                          <div className="h-px bg-green-500/30 my-2"></div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-100 font-bold">Net ROI (5-year):</span>
                            <span className="text-green-100 font-bold">457%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 4: DECISION - PURPLE GLOW SECTION */}
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="container mx-auto">
            {/* Section-specific ambient purple glow in background (z-index lower than content) */}
            <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
            <div className="absolute -inset-20 bg-violet-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
            
            {/* Content card with high z-index to appear over the glow */}
            <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
              {/* Form container */}
              {showRegistrationForm ? (
                registrationSuccess ? (
                  <div className="max-w-4xl mx-auto">
                    {/* Success message with premium styling */}
                    <div className="relative p-8 rounded-xl bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-600/40 shadow-[0_10px_30px_rgba(34,197,94,0.2)]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-green-600/10 to-green-500/20 rounded-xl blur-md opacity-70"></div>
                      
                      <div className="text-center relative z-10">
                        <div className="inline-flex items-center justify-center rounded-full p-4 bg-gradient-to-br from-green-700 to-green-800 border border-green-500/50 shadow-lg shadow-green-900/30 mb-6">
                          <CheckCircle className="h-12 w-12 text-green-400" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">Registration Successfully Submitted</h3>
                        <p className="text-lg text-gray-300 mb-6">Thank you for your interest in becoming a Praetorian Smart-Coat construction distributor. Our team will review your information and contact you shortly.</p>
                        
                        <div className="mt-6">
                          <div className="rounded-lg p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 mb-6">
                            <h4 className="text-green-400 font-semibold mb-2">What happens next?</h4>
                            <ul className="space-y-3 text-left">
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">1</span>
                                <span className="text-gray-300">A Praetorian Distribution Manager will contact you within 24 hours</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">2</span>
                                <span className="text-gray-300">We'll schedule a virtual meeting to discuss distributor benefits and requirements</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="h-6 min-w-6 rounded-full bg-green-900 flex items-center justify-center text-white text-sm flex-shrink-0">3</span>
                                <span className="text-gray-300">You'll receive access to technical documentation and training materials</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -inset-1 bg-blue-500/30 rounded-lg blur-md opacity-70"></div>
                          <div className="relative">
                            <PremiumCartButton 
                              onClick={() => setRegistrationSuccess(false)} 
                              size="lg"
                              className="bg-blue-600/40 hover:bg-blue-600/60 text-white"
                            >
                              Return to Construction Page
                            </PremiumCartButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                        Register as a Construction Distributor
                      </h2>
                      <p className="text-lg text-purple-200 mb-2">Join our growing network of high-performance building solution providers</p>
                      <p className="text-gray-400">Complete the form below to get exclusive access to Praetorian's construction-grade coating systems</p>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Company Information */}
                          <div className="relative space-y-6 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl border border-purple-500/30">
                            <div className="absolute -inset-px bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 rounded-xl opacity-50 blur-sm"></div>
                            <h3 className="text-lg font-semibold text-purple-300 relative z-10 mb-4 flex items-center">
                              <Building className="w-5 h-5 mr-2 text-purple-400" />
                              Company Information
                            </h3>
                            
                            <div className="relative z-10 space-y-4">
                              <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Company Name</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="ABC Construction Supply" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
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
                                    <FormLabel className="text-purple-200">Contact Name</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="John Smith" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
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
                                    <FormLabel className="text-purple-200">Email Address</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="john@abcconstruction.com" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
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
                                    <FormLabel className="text-purple-200">Phone Number</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="(555) 123-4567" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Website (optional)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="https://www.abcconstruction.com" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="foundedYear"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Year Founded</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          placeholder="2000" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field}
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="employeeCount"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-purple-200">Employee Count</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          placeholder="25" 
                                          className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                          {...field}
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Business Details */}
                          <div className="relative space-y-6 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl border border-purple-500/30">
                            <div className="absolute -inset-px bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 rounded-xl opacity-50 blur-sm"></div>
                            <h3 className="text-lg font-semibold text-purple-300 relative z-10 mb-4 flex items-center">
                              <FileCheck className="w-5 h-5 mr-2 text-purple-400" />
                              Business Details
                            </h3>
                            
                            <div className="relative z-10 space-y-4">
                              <FormField
                                control={form.control}
                                name="businessType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Business Type</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50">
                                          <SelectValue placeholder="Select business type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-gray-900 border-purple-500/50">
                                        <SelectItem value="retailer">Building Materials Retailer</SelectItem>
                                        <SelectItem value="distributor">Wholesale Distributor</SelectItem>
                                        <SelectItem value="contractor">General Contractor</SelectItem>
                                        <SelectItem value="specialist">Specialty Contractor</SelectItem>
                                        <SelectItem value="manufacturer">Manufacturer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="annualRevenue"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Annual Revenue</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50">
                                          <SelectValue placeholder="Select revenue range" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-gray-900 border-purple-500/50">
                                        <SelectItem value="under-1m">Under $1 Million</SelectItem>
                                        <SelectItem value="1m-5m">$1 Million - $5 Million</SelectItem>
                                        <SelectItem value="5m-10m">$5 Million - $10 Million</SelectItem>
                                        <SelectItem value="10m-50m">$10 Million - $50 Million</SelectItem>
                                        <SelectItem value="over-50m">Over $50 Million</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="coverageAreas"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Coverage Areas</FormLabel>
                                    <FormDescription className="text-purple-200/70 text-sm">Enter regions/states separated by commas</FormDescription>
                                    <FormControl>
                                      <Input 
                                        placeholder="Northeast, Mid-Atlantic, Florida" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="productCategories"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Product Categories</FormLabel>
                                    <FormDescription className="text-purple-200/70 text-sm">Enter categories separated by commas</FormDescription>
                                    <FormControl>
                                      <Input 
                                        placeholder="Coatings, Sealants, Waterproofing, Insulation" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="certifications"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Certifications/Affiliations</FormLabel>
                                    <FormDescription className="text-purple-200/70 text-sm">Enter certifications separated by commas</FormDescription>
                                    <FormControl>
                                      <Input 
                                        placeholder="LEED, Energy Star Partner, NAHB, ABC" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Additional Information */}
                        <div className="relative space-y-6 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl border border-purple-500/30">
                          <div className="absolute -inset-px bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10 rounded-xl opacity-50 blur-sm"></div>
                          <h3 className="text-lg font-semibold text-purple-300 relative z-10 mb-4 flex items-center">
                            <Warehouse className="w-5 h-5 mr-2 text-purple-400" />
                            Distribution Capabilities
                          </h3>
                          
                          <div className="relative z-10 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="warehouseLocations"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Warehouse Locations</FormLabel>
                                    <FormDescription className="text-purple-200/70 text-sm">Enter locations separated by commas</FormDescription>
                                    <FormControl>
                                      <Input 
                                        placeholder="Atlanta GA, Charlotte NC, Richmond VA" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="deliveryOptions"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Delivery/Logistics Options</FormLabel>
                                    <FormDescription className="text-purple-200/70 text-sm">Enter options separated by commas</FormDescription>
                                    <FormControl>
                                      <Input 
                                        placeholder="Company Fleet, LTL Shipping, Jobsite Delivery" 
                                        className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50" 
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
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-purple-200">Additional Notes</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Please share any additional information about your business that would help us understand your distribution capabilities..." 
                                      className="bg-gray-900/50 border-purple-700/30 focus:border-purple-500/50 min-h-[120px]" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        {/* Submit section */}
                        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowRegistrationForm(false)}
                            className="w-full md:w-auto order-2 md:order-1 border-purple-500/30 hover:bg-purple-900/20 text-purple-200"
                          >
                            Cancel
                          </Button>
                          
                          <Button 
                            type="submit"
                            className="w-full md:w-auto order-1 md:order-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <>
                                <span className="animate-spin mr-2">⟳</span>
                                Processing...
                              </>
                            ) : "Submit Registration"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                    Distribution Partnership Opportunities
                  </h2>
                  
                  <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative group overflow-hidden">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-purple-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/90 to-gray-900/90 border border-purple-500/30 rounded-xl p-6 h-full flex flex-col">
                          <div className="p-3 bg-purple-900/70 rounded-2xl mb-4 border border-purple-700/40 w-fit">
                            <Truck className="h-8 w-8 text-purple-300" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Exclusive Distribution</h3>
                          <p className="text-gray-300 mb-4 flex-grow">Gain exclusive access to Praetorian Smart-Coat products within your sales territory. Our territory protection ensures you maximize your ROI.</p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Protected sales territories</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Preferential pricing structure</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Lead referral program</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="relative group overflow-hidden">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-purple-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/90 to-gray-900/90 border border-purple-500/30 rounded-xl p-6 h-full flex flex-col">
                          <div className="p-3 bg-purple-900/70 rounded-2xl mb-4 border border-purple-700/40 w-fit">
                            <Award className="h-8 w-8 text-purple-300" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Technical Certification</h3>
                          <p className="text-gray-300 mb-4 flex-grow">Comprehensive training program certifies your team to specify and sell advanced ceramic coating solutions for construction applications.</p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Virtual and on-site training</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Technical certification program</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Ongoing technical support</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="relative group overflow-hidden">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-purple-500/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/90 to-gray-900/90 border border-purple-500/30 rounded-xl p-6 h-full flex flex-col">
                          <div className="p-3 bg-purple-900/70 rounded-2xl mb-4 border border-purple-700/40 w-fit">
                            <CircleDollarSign className="h-8 w-8 text-purple-300" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">Marketing Support</h3>
                          <p className="text-gray-300 mb-4 flex-grow">Comprehensive marketing resources to help you effectively position and sell Praetorian Smart-Coat products to your construction customers.</p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Co-branded marketing materials</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">Digital asset library</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">ROI calculator tools</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-6 text-center">
                      <p className="text-lg text-purple-200 mb-4">Ready to offer cutting-edge coating solutions to your construction customers?</p>
                      <p className="text-gray-400 mb-8 max-w-3xl mx-auto">Join our growing network of construction material distributors and gain exclusive access to premium Smart-Coat products with industry-leading margins and technical support.</p>
                    </div>
                    
                    <div className="relative z-10 transform transition-all duration-500 hover:scale-[1.03]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-purple-600/30 rounded-lg blur-md opacity-75"></div>
                      <div className="relative">
                        <PremiumCartButton 
                          size="lg"
                          className="px-10 py-6 text-lg"
                          onClick={handleShowRegistrationForm}
                        >
                          Register as a Construction Distributor
                        </PremiumCartButton>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ConstructionPage;