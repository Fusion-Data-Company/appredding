import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientHeading } from "@/components/ui/gradient-heading";
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
  FormMessage
} from "@/components/ui/form";
import { CheckCircle, CheckCheck, PaintBucket, Brush, Clock, Palette, User, Building, ChevronRight, FileCheck, Zap, CircleDollarSign } from "lucide-react";
import { PremiumArrowButton, PremiumActionButton, PremiumFireButton, PremiumCartButton } from "@/utils/premium-buttons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { z } from "zod";

// Define form schema for painters
const insertPainterContactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companyName: z.string().optional(),
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

type PainterContactForm = z.infer<typeof insertPainterContactSchema>;

const Painters = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for painter contact
  const form = useForm<PainterContactForm>({
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
      projectType: "residential",
      projectSize: "",
      projectTimeline: "",
      coatingNeeds: "exterior",
      preferredProducts: "",
      additionalDetails: "",
      agreesToTerms: false
    },
  });

  // Painter contact mutation
  const contactMutation = useMutation({
    mutationFn: async (data: PainterContactForm) => {
      const response = await apiRequest("POST", "/api/professionals/painter-contacts", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Contact request failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Contact Request Successful",
        description: "Your request has been submitted. Our team will contact you shortly.",
        variant: "default",
      });
      setContactSuccess(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Contact Request Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PainterContactForm) => {
    contactMutation.mutate(data);
  };
  
  const handleShowContactForm = () => {
    setShowContactForm(true);
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
              <div className="relative p-8 rounded-xl z-10">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <div className="relative mb-6">
                  <div className="inline-block mb-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs py-1 px-2 rounded-md transform rotate-3 shadow-lg border border-red-400/40">
                    PREVIOUSLY A GOVERNMENT RESOURCE
                  </div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-white drop-shadow-[0_1px_3px_rgba(239,68,68,0.6)]"
                  >
                    The Painter's Profit Crisis
                  </motion.h1>
                </div>
                
                {/* Pain Points Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mb-8"
                >
                  <p className="text-white text-xl mb-6">
                    <span className="text-red-400 font-semibold">Have YOU been struggling with these painting business challenges?</span>
                  </p>
                  
                  <div className="bg-black/30 border border-red-600/20 rounded-lg p-4 mb-6 text-left">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 font-bold text-lg mt-0.5">?</span>
                        <p className="text-gray-300">Have you ever lost a bid because you couldn't justify charging premium rates with standard paint products?</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 font-bold text-lg mt-0.5">?</span>
                        <p className="text-gray-300">Do you find yourself making constant callbacks for touch-ups that eat into your profits?</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-400 font-bold text-lg mt-0.5">?</span>
                        <p className="text-gray-300">Are you struggling to differentiate your painting services in a crowded market?</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-red-500/30 flex items-start space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-full mt-1">
                        <PaintBucket className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-red-300 font-semibold mb-1">Razor-Thin Margins</h3>
                        <p className="text-gray-300 text-sm">Constantly competing on price with commodity paints slashes profits to unsustainable levels</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-red-500/30 flex items-start space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-full mt-1">
                        <Clock className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-red-300 font-semibold mb-1">Constant Callbacks</h3>
                        <p className="text-gray-300 text-sm">Standard coatings fail prematurely, forcing costly touchups that destroy profitability</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-red-500/30 flex items-start space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-full mt-1">
                        <Building className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-red-300 font-semibold mb-1">Premium Market Lockout</h3>
                        <p className="text-gray-300 text-sm">Without differentiated technology, you can't access high-margin clients willing to pay premium rates</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-red-500/30 flex items-start space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-full mt-1">
                        <User className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-red-300 font-semibold mb-1">Customer Acquisition Struggle</h3>
                        <p className="text-gray-300 text-sm">Without a unique selling proposition, you're forced to compete on price alone</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              
                <div className="bg-black/30 border border-red-600/20 rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-300 italic">The average painting contractor loses <span className="text-red-400 font-semibold">$1,250 annually</span> in potential profit and wastes 15+ hours on preventable callbacks</p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <PremiumArrowButton 
                    onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="fire"
                    size="lg"
                    iconPosition="right"
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    Discover the Solution
                  </PremiumArrowButton>
                </motion.div>
              </div>
            </div>
            
            {/* Solution Section (Relief) - Middle of Funnel */}
            <div id="solution" className="max-w-4xl mx-auto text-center mb-10 md:mb-16 pt-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600/40 via-green-600/40 to-green-600/40 rounded-xl blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/80 via-green-500/80 to-green-500/80 rounded-xl blur-md opacity-90"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-8 rounded-xl z-10 border border-green-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-shadow duration-500">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-green-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-green-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <div className="inline-block mb-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs py-1 px-2 rounded-md transform rotate-1 shadow-lg border border-green-400/40">
                  THE SOLUTION YOU'VE BEEN LOOKING FOR
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-white drop-shadow-[0_1px_3px_rgba(34,197,94,0.6)]"
                >
                  <span className="text-green-400">Boost Your Painting Profit</span> by 15-25%
                </motion.h1>
                
                {/* Enhanced ROI-focused stats in enterprise grid format */}
                <div className="relative mb-6">
                  {/* Enhanced green ambient glow for ROI section */}
                  <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                  <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                  
                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <CircleDollarSign className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl md:text-2xl block group-hover:scale-110 transition-transform duration-300">$0.35</span>
                      <span className="text-blue-200 text-xs">Extra profit per sq.ft</span>
                    </div>
                    <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <CheckCircle className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl md:text-2xl block group-hover:scale-110 transition-transform duration-300">35%</span>
                      <span className="text-blue-200 text-xs">Callback reduction</span>
                    </div>
                    <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <Clock className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl md:text-2xl block group-hover:scale-110 transition-transform duration-300">10 yrs</span>
                      <span className="text-blue-200 text-xs">Warranty-backed service</span>
                    </div>
                  </div>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-white mb-6 leading-relaxed"
                >
                  <span className="text-green-400 font-semibold">Smart Coat's advanced ceramic technology</span> transforms your painting business by unlocking premium high-margin projects and eliminating callbacks that damage your reputation and profits.
                </motion.p>
                
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-green-500/30 p-4 rounded-lg mb-6 text-left">
                  <h3 className="text-lg font-semibold text-green-300 mb-3">How Smart Coat Solves Your Painting Challenges:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                      <span className="text-gray-300"><span className="text-green-300 font-semibold">Problem:</span> Razor-thin margins. <span className="text-green-300 font-semibold">Solution:</span> Charge premium rates ($0.35+ more per sq ft) for a truly differentiated coating</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                      <span className="text-gray-300"><span className="text-green-300 font-semibold">Problem:</span> Constant callbacks. <span className="text-green-300 font-semibold">Solution:</span> 35% fewer callbacks with our ultra-durable ceramic coating technology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                      <span className="text-gray-300"><span className="text-green-300 font-semibold">Problem:</span> Market differentiation. <span className="text-green-300 font-semibold">Solution:</span> Exclusive access to military-grade coatings your competitors can't offer</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/30 border border-green-600/20 rounded-lg p-3 mb-6">
                  <p className="text-sm text-green-100 italic">The average painting contractor using Smart Coat increases their annual profit by <span className="text-green-400 font-semibold">$12,500+</span> within the first year of certification</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-green-500/30 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-green-300 mb-3 text-left">What Makes Smart Coat Different:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-3 rounded-lg border border-green-500/20 text-left">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">Military-Grade Technology</h4>
                      <p className="text-gray-300 text-xs">Previously classified ceramic microsphere technology now exclusively available to certified painting partners</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-green-500/20 text-left">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">10-Year Warranty Backing</h4>
                      <p className="text-gray-300 text-xs">Stand behind your work with confidence thanks to our industry-leading warranty protection</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-green-500/20 text-left">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">Premium Pricing Power</h4>
                      <p className="text-gray-300 text-xs">Command higher rates with documented proof of energy savings and extended protection</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-green-500/20 text-left">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">Certified Partner Status</h4>
                      <p className="text-gray-300 text-xs">Join an exclusive network of high-performing painting professionals with specialized training</p>
                    </div>
                  </div>
                </div>
                
                {/* Benefits Summary Section - Bottom of Funnel */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-green-300 mb-4 text-left">With Smart Coat Certification, You'll Get:</h3>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500/20 p-1 rounded-full mt-1">
                        <CheckCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white"><span className="text-green-300 font-medium">Access to premium customers</span> searching for energy-efficient, long-lasting painting services</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500/20 p-1 rounded-full mt-1">
                        <CheckCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white"><span className="text-green-300 font-medium">Technical certification and training</span> to properly apply Smart Coat's patented ceramic technology</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500/20 p-1 rounded-full mt-1">
                        <CheckCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white"><span className="text-green-300 font-medium">Exclusive marketing materials</span> demonstrating the energy savings and ROI to justify premium pricing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500/20 p-1 rounded-full mt-1">
                        <CheckCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white"><span className="text-green-300 font-medium">Comprehensive 10-year warranty support</span> backed by our industry-leading quality assurance program</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge for government technology */}
                <div className="mb-6 bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-lg p-3 border border-green-500/30">
                  <p className="text-sm text-white">
                    <span className="bg-green-500/20 px-2 py-1 rounded text-xs font-semibold text-green-300 mr-2">LIMITED AVAILABILITY</span> 
                    We approve only a limited number of painting contractors per region to ensure exclusive market access
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"
                >
                  <PremiumActionButton
                    onClick={handleShowContactForm}
                    size="lg"
                    className="transform hover:scale-105 transition-transform duration-300"
                    glowEffect={true}
                  >
                    <span className="flex items-center">
                      <CircleDollarSign className="mr-2 h-6 w-6 text-amber-300" />
                      <span>Become a Certified Partner Today</span>
                    </span>
                  </PremiumActionButton>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <a 
                      href="#profit-calculator" 
                      className="relative flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg border border-orange-500/50 hover:border-orange-400 transition duration-200"
                    >
                      <span className="flex items-center">
                        <PaintBucket className="mr-2 h-5 w-5 text-blue-400" />
                        <span>Calculate Revenue Boost</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ROI Calculator Section with Premium Green Styling */}
            <div id="profit-calculator" className="max-w-4xl mx-auto my-16 relative">
              <div className="absolute -inset-10 bg-green-500/10 rounded-3xl blur-[60px] opacity-70"></div>
              
              <div className="relative z-10 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-2xl overflow-hidden border border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.15)]">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/70 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-green-400/30 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/70 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-green-400/30 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/70 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-green-400/30 rounded-bl-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/70 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-green-400/30 rounded-br-md"></div>
                </div>
                
                <div className="px-6 py-8 md:p-10">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white inline-block">
                        Painter's Profit Calculator
                      </span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      See how Praetorian's ceramic coating technology creates 
                      <span className="text-green-400 font-semibold"> 43% higher margins</span> compared to traditional painting methods.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                      {/* Add subtle glow background for this card */}
                      <div className="absolute -inset-2 bg-blue-500/10 rounded-xl blur-xl opacity-60 z-0"></div>
                      
                      <div className="bg-gray-900/70 rounded-xl p-6 border border-blue-500/20 shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] relative z-10">
                        <h3 className="text-xl font-semibold text-white mb-4 text-center">Traditional Painting</h3>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Average Cost per sq.ft</span>
                            <span className="text-white font-medium">$1.75</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Materials Cost per sq.ft</span>
                            <span className="text-white font-medium">$0.85</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Labor Cost per sq.ft</span>
                            <span className="text-white font-medium">$0.65</span>
                          </div>
                          <div className="flex justify-between items-center pb-2">
                            <span className="text-gray-300 font-semibold">Profit per sq.ft</span>
                            <span className="text-blue-300 font-semibold">$0.25</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-3 rounded-lg border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-200">Project Size</span>
                            <span className="text-white">2,500 sq.ft</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-200 font-semibold">Total Profit</span>
                            <span className="text-blue-300 font-semibold">$625</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      {/* Enhanced green ambient glow for premium calculator */}
                      <div className="absolute -inset-3 bg-green-500/20 rounded-xl blur-2xl opacity-80 z-0"></div>
                      <div className="absolute -inset-6 bg-green-500/10 rounded-xl blur-xl opacity-70 z-0 animate-pulse-slow"></div>
                      
                      <div className="bg-gradient-to-br from-gray-900/70 to-black/80 rounded-xl p-6 border-2 border-green-500/40 shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(74,222,128,0.15)] relative z-10">
                        <h3 className="text-xl font-semibold text-white mb-4 text-center relative">
                          <div className="absolute -top-10 -right-3 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs py-1 px-2 rounded-md transform rotate-3 shadow-lg border border-green-400/40">
                            PREVIOUSLY A GOVERNMENT RESOURCE
                          </div>
                          Praetorian Ceramic Coating
                        </h3>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Average Cost per sq.ft</span>
                            <span className="text-green-300 font-medium">$4.50</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Materials Cost per sq.ft</span>
                            <span className="text-white font-medium">$2.25</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="text-gray-300">Labor Cost per sq.ft</span>
                            <span className="text-white font-medium">$0.75</span>
                          </div>
                          <div className="flex justify-between items-center pb-2">
                            <span className="text-gray-300 font-semibold">Profit per sq.ft</span>
                            <span className="text-green-400 font-bold">$1.50</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-200">Project Size</span>
                            <span className="text-white">2,500 sq.ft</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-200 font-semibold">Total Profit</span>
                            <span className="text-green-400 font-bold">$3,750</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 relative">
                    {/* Enhanced green ambient glow for ROI summary */}
                    <div className="absolute -inset-4 bg-green-500/20 rounded-xl blur-2xl opacity-80 z-0"></div>
                    <div className="absolute -inset-8 bg-green-500/10 rounded-xl blur-xl opacity-70 z-0 animate-pulse-slow"></div>
                    
                    <div className="p-4 bg-gray-900/60 rounded-lg border-2 border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)] relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0 md:mr-4">
                          <div className="flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.5)] border border-green-400/40">
                              <CircleDollarSign className="h-8 w-8 text-white" />
                            </div>
                            <div className="ml-4 text-left">
                              <span className="block text-white text-xl font-bold">15% ROI</span>
                              <span className="text-green-400 text-sm">Additional Profit Margin</span>
                            </div>
                          </div>
                        </div>
                        
                        <PremiumCartButton
                          onClick={handleShowContactForm}
                          size="lg"
                          className="transform hover:scale-105 transition-transform duration-300"
                          glowEffect={true}
                        >
                          <span className="flex items-center justify-center">
                            <CircleDollarSign className="h-6 w-6 mr-3 text-amber-300" />
                            <span>Get Your Custom Profit Analysis</span>
                          </span>
                        </PremiumCartButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form Section - Bottom of Funnel */}
            {showContactForm && (
              <div className="max-w-4xl mx-auto my-20 relative">
                <div className="absolute -inset-10 bg-blue-500/10 rounded-3xl blur-[60px] opacity-70"></div>
                
                <div className="relative z-10 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-400/30 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-400/30 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/70 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-400/30 rounded-bl-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-400/30 rounded-br-md"></div>
                  </div>
                  
                  <div className="px-6 py-8 md:p-10">
                    <div className="text-center mb-8">
                      <div className="inline-block mb-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs py-1 px-2 rounded-md transform rotate-3 shadow-lg border border-blue-400/40">
                        PREVIOUSLY A GOVERNMENT RESOURCE
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Become a Certified Painter Partner</h2>
                      <p className="text-gray-300 max-w-2xl mx-auto">
                        Gain access to ceramic coating technology with enhanced durability. Increase your profit margins by up to 20% on every project.
                      </p>
                    </div>
                    
                    {contactSuccess ? (
                      <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                        <p className="text-gray-300 mb-6">
                          Thank you for your interest in joining our exclusive network of certified painters. Our team will contact you within 24 hours to discuss the next steps and your custom profit analysis.
                        </p>
                        <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-green-500/30">
                          <p className="text-sm text-green-400 font-medium">
                            While you wait, prepare the following information:
                          </p>
                          <ul className="text-left text-sm text-gray-300 mt-2 space-y-1">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Current project sizes and pricing structure</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Customer demographic and target markets</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Current coating products and application methods</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">First Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="John" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
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
                                    <Input 
                                      placeholder="Doe" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Email</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email" 
                                      placeholder="john@example.com" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
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
                                    <Input 
                                      placeholder="(555) 123-4567" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Company Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your Painting Company" 
                                    {...field} 
                                    className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">City</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="New York" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">State</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="NY" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Zip Code</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="10001" 
                                      {...field} 
                                      className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="projectType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Primary Project Type</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50">
                                        <SelectValue placeholder="Select project type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-800 border border-blue-500/30 text-white">
                                      <SelectItem value="residential">Residential</SelectItem>
                                      <SelectItem value="commercial">Commercial</SelectItem>
                                      <SelectItem value="industrial">Industrial</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="coatingNeeds"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Coating Needs</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-gray-800/50 border border-blue-500/30 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50">
                                        <SelectValue placeholder="Select primary need" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-800 border border-blue-500/30 text-white">
                                      <SelectItem value="exterior">Exterior</SelectItem>
                                      <SelectItem value="interior">Interior</SelectItem>
                                      <SelectItem value="both">Both Interior & Exterior</SelectItem>
                                      <SelectItem value="specialized">Specialized Application</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="agreesToTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-gray-300">
                                    I agree to receive information about becoming a certified partner with Praetorian SmartCoat.
                                  </FormLabel>
                                  <FormMessage className="text-red-400" />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4 text-center">
                            <PremiumFireButton 
                              type="submit"
                              disabled={contactMutation.isPending}
                              size="xl"
                              className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-300"
                              glowEffect={true}
                            >
                              {contactMutation.isPending ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <CircleDollarSign className="mr-2 h-6 w-6 text-amber-300" />
                                  <span>Submit Application</span>
                                </span>
                              )}
                            </PremiumFireButton>
                          </div>
                        </form>
                      </Form>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info Section */}
            <div className="mt-8 text-center text-gray-400 text-sm max-w-3xl mx-auto">
              <p>For immediate assistance, please contact us directly at <a href="tel:9168096619" className="text-blue-400 hover:text-blue-300">(916) 809-6619</a> or email <a href="mailto:rob@praetoriansmartcoat.com" className="text-blue-400 hover:text-blue-300">rob@praetoriansmartcoat.com</a></p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Painters;