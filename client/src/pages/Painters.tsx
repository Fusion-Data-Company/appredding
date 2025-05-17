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
import { CheckCircle, PaintBucket, Brush, Clock, Palette, User, Building, ChevronRight, FileCheck, Zap, CircleDollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PremiumCartButton } from "@/utils/premium-buttons";
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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
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
        {/* Premium gradient background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-black"></div>
          
          {/* Premium ambient glows */}
          <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-blue-600/10 rounded-full filter blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-orange-600/10 rounded-full filter blur-[150px] animate-pulse-slow-delayed"></div>
          
          {/* Premium grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjIpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        </div>
        
        {/* Main content section - optimized for mobile */}
        <section className="py-10 md:py-24 relative z-10">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Premium Enterprise Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-8 rounded-xl z-10 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]"
                >
                  543% Increased Painting Profit Margin
                </motion.h1>
                
                {/* Enhanced ROI-focused stats in enterprise grid format */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-xl md:text-2xl block">$37.50</span>
                    <span className="text-blue-200 text-xs">Extra profit per sq.ft</span>
                  </div>
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-blue-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-xl md:text-2xl block">87.3%</span>
                    <span className="text-blue-200 text-xs">Callback reduction</span>
                  </div>
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-xl md:text-2xl block">14+ yrs</span>
                    <span className="text-blue-200 text-xs">Warranty-backed service</span>
                  </div>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-white mb-6 leading-relaxed"
                >
                  <span className="text-blue-300 font-semibold">Ceramic technology unlocks premium project opportunities</span> with 25-40% higher profit margins. Our exclusive formula allows you to charge more while delivering superior value clients can't get elsewhere.
                </motion.p>
                
                <div className="bg-black/30 border border-blue-600/20 rounded-lg p-3 mb-6">
                  <p className="text-sm text-blue-100 italic">Previously classified ceramic microsphere technology, now available exclusively through certified painting partners</p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <button 
                      onClick={handleShowContactForm}
                      className="relative px-6 py-3 bg-black text-white font-medium rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200"
                    >
                      <span className="flex items-center">
                        <CircleDollarSign className="mr-2 h-5 w-5 text-green-400" />
                        <span>Increase Your Profit Margin</span>
                      </span>
                    </button>
                  </div>
                  
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

            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 rounded-xl blur-lg opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-blue-500/30 h-full">
                  <GradientHeading level={2} className="text-2xl md:text-3xl mb-4 md:mb-6 text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                    Advanced Coating Technology
                  </GradientHeading>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-inner">
                        <PaintBucket className="h-5 w-5 text-blue-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Premium Ceramic Formulation</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Our ceramic microsphere technology creates millions of thermal breaks throughout the coating film, providing exceptional insulation and durability. Each microsphere contains vacuum layers that dramatically improve thermal resistance and energy efficiency.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-inner">
                        <Brush className="h-5 w-5 text-blue-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Superior Application Properties</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Designed for professional application, our coatings offer excellent flow, leveling, and adhesion with minimal VOCs. Apply with airless sprayers, rollers, or brushes with outstanding results and consistent coverage across various substrates.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-inner">
                        <Clock className="h-5 w-5 text-blue-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Exceptional Longevity</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Original applications from 1989 showed only 1% degradation when inspected 30 years later, outperforming competing products that lose 10-20% effectiveness in just 3 years. Our elastomeric polymer maintains 156% flexibility even after decades of exposure to UV radiation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 rounded-xl blur-lg opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-orange-500/30 h-full">
                  <GradientHeading level={2} className="text-2xl md:text-3xl mb-4 md:mb-6 text-white drop-shadow-[0_0px_1px_rgba(249,115,22,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(249,115,22,0.3)]">
                    Key Benefits for Painters
                  </GradientHeading>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm"></div>
                        <div className="relative flex items-center justify-center w-8 h-8 bg-orange-900/60 rounded-full border border-orange-500/40">
                          <span className="text-orange-200 font-bold">1</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Premium Profit Margins</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          With its premium positioning, our product lets you maintain a 25-40% higher margin than standard paint projects. This means significantly higher profits without increasing overhead or time investment.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm"></div>
                        <div className="relative flex items-center justify-center w-8 h-8 bg-orange-900/60 rounded-full border border-orange-500/40">
                          <span className="text-orange-200 font-bold">2</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Exclusive Market Positioning</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Differentiate your business with exclusive access to ceramic technology previously only available to government agencies. Become the go-to expert for high-performance coating solutions in your market area.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm"></div>
                        <div className="relative flex items-center justify-center w-8 h-8 bg-orange-900/60 rounded-full border border-orange-500/40">
                          <span className="text-orange-200 font-bold">3</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Business Growth Opportunities</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Unlock new premium markets including energy retrofit, government contracts, and specialized commercial projects. Our certification program provides marketing materials and technical support to help grow your business.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics Section */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <GradientHeading level={2} className="text-2xl md:text-3xl mb-4 text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Performance Metrics That Matter to Professionals
                </GradientHeading>
                <p className="text-gray-200">
                  Our premium ceramic coating delivers measurable advantages that make every job more profitable and every client more satisfied.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 p-4 rounded-lg border border-blue-500/30 h-full flex flex-col items-center text-center">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                    
                    <div className="mb-3 relative z-10">
                      <p className="text-blue-300 text-sm font-semibold mb-1 relative z-10">Warranty Period</p>
                      <p className="text-3xl font-bold text-white mb-1 drop-shadow-sm relative z-10">14+ Years</p>
                      <p className="text-xs text-gray-300 relative z-10">Industry-leading protection</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 p-4 rounded-lg border border-orange-500/30 h-full flex flex-col items-center text-center">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-orange-500/30 rounded-tl-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-orange-500/30 rounded-br-md"></div>
                    
                    <div className="mb-3 relative z-10">
                      <p className="text-orange-300 text-sm font-semibold mb-1 relative z-10">Temperature Reduction</p>
                      <p className="text-3xl font-bold text-white mb-1 drop-shadow-sm relative z-10">30-40°F</p>
                      <p className="text-xs text-gray-300 relative z-10">Surface temperature drop</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 p-4 rounded-lg border border-blue-500/30 h-full flex flex-col items-center text-center">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                    
                    <div className="mb-3 relative z-10">
                      <p className="text-blue-300 text-sm font-semibold mb-1 relative z-10">Energy Savings</p>
                      <p className="text-3xl font-bold text-white mb-1 drop-shadow-sm relative z-10">20-35%</p>
                      <p className="text-xs text-gray-300 relative z-10">Cooling cost reduction</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 p-4 rounded-lg border border-orange-500/30 h-full flex flex-col items-center text-center">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-orange-500/30 rounded-tl-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-orange-500/30 rounded-br-md"></div>
                    
                    <div className="mb-3 relative z-10">
                      <p className="text-orange-300 text-sm font-semibold mb-1 relative z-10">VOC Content</p>
                      <p className="text-3xl font-bold text-white mb-1 drop-shadow-sm relative z-10">{"<50g/L"}</p>
                      <p className="text-xs text-gray-300 relative z-10">Eco-friendly formula</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple profit calculator section */}
            <div id="profit-calculator" className="max-w-4xl mx-auto relative mb-16 scroll-mt-24">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-blue-500/30 overflow-hidden">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl mb-6 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                    How Praetorian Boosts Your Painting Business Revenue
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 rounded-lg p-6 shadow-lg border border-blue-500/30 overflow-hidden">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                        
                        <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)]">Premium Pricing</h3>
                        <ul className="space-y-3 text-gray-100">
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-blue-400" />
                            </span>
                            <span>Charge 15-25% more per project</span>
                          </li>
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-blue-400" />
                            </span>
                            <span>Move from commodity pricing to value pricing</span>
                          </li>
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-blue-400" />
                            </span>
                            <span>Justify higher margins with documented performance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/20 to-orange-400/10 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 rounded-lg p-6 shadow-lg border border-orange-500/30 overflow-hidden">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                        
                        <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_1px_2px_rgba(251,146,60,0.3)]">Reduced Callbacks</h3>
                        <ul className="space-y-3 text-gray-100">
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-orange-400" />
                            </span>
                            <span>90% fewer warranty claims vs. standard paints</span>
                          </li>
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-orange-400" />
                            </span>
                            <span>Eliminate costs of repeat visits and touch-ups</span>
                          </li>
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-orange-400" />
                            </span>
                            <span>Free up workforce for new revenue-generating projects</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 rounded-lg p-6 shadow-lg border border-blue-500/30 overflow-hidden">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                        
                        <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)]">New Markets</h3>
                        <ul className="space-y-3 text-gray-100">
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-blue-400" />
                            </span>
                            <span>Access high-value energy retrofit projects</span>
                          </li>
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-blue-400" />
                            </span>
                            <span>Win specialized commercial/industrial contracts</span>
                          </li>
                          <li className="flex items-start group">
                            <span className="relative flex-shrink-0 mr-3">
                              <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></span>
                              <CheckCircle className="relative h-5 w-5 text-blue-400" />
                            </span>
                            <span>Qualify for government and institutional projects</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-green-500/20 to-blue-600/30 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-lg p-6 md:p-8 border border-blue-500/30 shadow-lg group-hover:shadow-blue-900/20 transition duration-300">
                      {/* Elite corner accents */}
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/40 rounded-tr-md"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500/50 rounded-full blur-[2px]"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/40 rounded-bl-md"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500/50 rounded-full blur-[2px]"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                      </div>
                    
                      <h3 className="text-2xl font-semibold mb-6 text-center relative z-10">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                          Revenue Comparison: Standard vs. Praetorian Project
                        </span>
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-400/5 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 rounded-lg p-5 border border-blue-500/20 shadow-lg">
                          {/* Corner accent elements */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                          
                          <h4 className="text-lg font-semibold mb-4 text-gray-100 drop-shadow-sm border-b border-gray-800 pb-2">Standard Exterior Painting Project</h4>
                          <ul className="space-y-2.5 text-gray-200">
                            <li className="flex justify-between">
                              <span className="text-gray-300">Project Size:</span>
                              <span className="font-medium">2,500 sq ft home</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Standard Paint Price:</span>
                              <span className="font-medium">$45/gallon</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Standard Labor Rate:</span>
                              <span className="font-medium">$35/hour</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Standard Materials Cost:</span>
                              <span className="font-medium text-red-300">$1,350</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Standard Labor Cost:</span>
                              <span className="font-medium text-red-300">$4,200</span>
                            </li>
                            <li className="flex justify-between font-semibold border-t border-gray-700 pt-3 mt-3">
                              <span className="text-gray-200">Standard Project Revenue:</span>
                              <span className="text-white">$7,500</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-200">Standard Profit Margin:</span>
                              <span className="text-white">26%</span>
                            </li>
                            <li className="flex justify-between font-semibold mt-2">
                              <span className="text-gray-200">Standard Project Profit:</span>
                              <span className="text-blue-300">$1,950</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/10 to-green-400/5 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 rounded-lg p-5 border border-green-500/20 shadow-lg">
                          {/* Corner accent elements */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-green-500/30 rounded-tl-md"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-green-500/30 rounded-br-md"></div>
                          
                          <h4 className="text-lg font-semibold mb-4 text-gray-100 drop-shadow-sm border-b border-gray-800 pb-2">Premium Praetorian Project</h4>
                          <ul className="space-y-2.5 text-gray-200">
                            <li className="flex justify-between">
                              <span className="text-gray-300">Project Size:</span>
                              <span className="font-medium">2,500 sq ft home</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Premium Coating Price:</span>
                              <span className="font-medium">$120/gallon</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Premium Labor Rate:</span>
                              <span className="font-medium">$45/hour</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Premium Materials Cost:</span>
                              <span className="font-medium text-red-300">$3,000</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-300">Premium Labor Cost:</span>
                              <span className="font-medium text-red-300">$4,650</span>
                            </li>
                            <li className="flex justify-between font-semibold border-t border-gray-700 pt-3 mt-3">
                              <span>Premium Project Revenue:</span>
                              <span>$11,250</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Premium Profit Margin:</span>
                              <span>32%</span>
                            </li>
                            <li className="flex justify-between font-semibold text-green-400 mt-2">
                              <span>Premium Project Profit:</span>
                              <span>$3,600</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-950/30 rounded-lg border border-blue-500/30">
                      <p className="text-lg font-semibold text-center text-white mb-2">Your Additional Profit with Praetorian: <span className="text-green-400">$1,650 per project</span></p>
                      <p className="text-sm text-center text-gray-200">At just 2 projects per month, that's an additional <span className="font-semibold text-green-400">$39,600 in profit per year</span></p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                      <button 
                        onClick={handleShowContactForm}
                        className="relative px-8 py-4 bg-gradient-to-br from-gray-900 to-black text-white font-medium text-lg rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200"
                      >
                        Register as a Praetorian Certified Contractor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact CTA Section */}
            <div className="text-center mb-16">
              {!showContactForm && !contactSuccess ? (
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 animate-pulse-slow"></div>
                  
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <PremiumCartButton size="xl" className="relative z-10" onClick={handleShowContactForm}>
                      Become a Certified Contractor
                    </PremiumCartButton>
                  </motion.div>
                </div>
              ) : contactSuccess ? (
                <div className="max-w-xl mx-auto relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600/40 via-blue-600/40 to-green-600/40 rounded-xl blur-xl opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-8 rounded-xl z-10 border border-green-500/30">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Thank You for Your Interest!</h3>
                    <p className="text-gray-300 mb-6">Your contact request has been successfully submitted. One of our certified coating specialists will contact you shortly to discuss how we can help grow your painting business.</p>
                    <div className="flex justify-center">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                        <button
                          onClick={() => setContactSuccess(false)}
                          className="relative px-6 py-3 bg-black text-white font-medium rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200"
                        >
                          <span className="flex items-center">
                            <span>Return to Main Page</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-6 md:p-8 rounded-xl shadow-lg border border-blue-500/30">
                    <GradientHeading level={2} className="text-2xl md:text-3xl mb-6 text-white">
                      Professional Contractor Registration
                    </GradientHeading>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your first name" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
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
                                <FormLabel className="text-gray-200">Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your last name" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your email address" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
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
                                <FormLabel className="text-gray-200">Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your phone number" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Company Name (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your company name" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your street address" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter city" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">State</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter state" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Zip Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter zip code" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Project Types</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-900/50 border-blue-500/30 text-white">
                                      <SelectValue placeholder="Select project type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-900 border-blue-500/50 text-white">
                                    <SelectItem value="residential">Residential</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                    <SelectItem value="industrial">Industrial</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Average Project Size</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2,500 sq ft" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="projectTimeline"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Project Timeline</FormLabel>
                                <FormControl>
                                  <Input placeholder="When do you need the product?" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="coatingNeeds"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Coating Needs</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-900/50 border-blue-500/30 text-white">
                                      <SelectValue placeholder="Select coating needs" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-900 border-blue-500/50 text-white">
                                    <SelectItem value="exterior">Exterior Only</SelectItem>
                                    <SelectItem value="interior">Interior Only</SelectItem>
                                    <SelectItem value="both">Both Interior & Exterior</SelectItem>
                                    <SelectItem value="specialized">Specialized Applications</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="preferredProducts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Currently Used Products (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="What paint products do you currently use?" {...field} className="bg-gray-900/50 border-blue-500/30 text-white" />
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
                              <FormLabel className="text-gray-200">Additional Project Details (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Provide any additional details about your projects or requirements" 
                                  className="min-h-[100px] bg-gray-900/50 border-blue-500/30 text-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="agreesToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-blue-500/30 p-4 bg-blue-900/20">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-gray-200">
                                  I agree to the terms and conditions and privacy policy
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-2">
                          <div className="relative group w-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                            <button 
                              type="submit"
                              className="relative w-full px-8 py-4 bg-gradient-to-br from-gray-900 to-black text-white font-medium text-lg rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200 disabled:opacity-50"
                              disabled={contactMutation.isPending}
                            >
                              {contactMutation.isPending ? 'Submitting...' : 'Submit Registration'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              )}
            </div>

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