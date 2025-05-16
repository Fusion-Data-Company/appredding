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
                  className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-white drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]"
                >
                  Boost Your Painting Business Profits
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 leading-relaxed"
                >
                  Praetorian's premium ceramic coatings aren't just better for your clients — they're better for your bottom line. 
                  Charge 15-25% more per project while reducing callbacks by up to 90%, and expand into high-margin specialized markets that regular painters can't access.
                </motion.p>
                
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
                      className="relative px-6 py-3 bg-gradient-to-br from-gray-900 to-black text-white font-medium rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200"
                    >
                      Become a Certified Partner
                    </button>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <a 
                      href="#profit-calculator" 
                      className="relative flex items-center px-6 py-3 bg-gradient-to-br from-gray-900 to-black text-white font-medium rounded-lg border border-orange-500/50 hover:border-orange-400 transition duration-200"
                    >
                      Calculate Your Profit <ChevronRight className="ml-2 h-4 w-4" />
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

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-2 mt-1 shadow-inner">
                        <Palette className="h-5 w-5 text-blue-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Custom Color Matching</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Our professional tinting system allows for precise color matching to any specification. With our proprietary pigment technology, colors maintain their vibrancy and resist fading even in extreme UV exposure conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 rounded-xl blur-lg opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-orange-500/30 h-full">
                  <GradientHeading level={2} className="text-2xl md:text-3xl mb-4 md:mb-6 text-white drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                    Professional Painter Benefits
                  </GradientHeading>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-full p-2 mt-1 shadow-inner">
                        <User className="h-5 w-5 text-orange-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Client Satisfaction Guarantee</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Our products consistently exceed client expectations with measurable benefits in energy efficiency, comfort, and protection. Backed by comprehensive warranties and documented performance data, you can confidently offer premium services.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-full p-2 mt-1 shadow-inner">
                        <Building className="h-5 w-5 text-orange-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Expanded Service Portfolio</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          By offering Praetorian's specialized coatings, you can expand into high-margin markets including energy-efficient retrofits, moisture protection, thermal insulation, and specialized commercial applications that typical painters cannot address.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-full p-2 mt-1 shadow-inner">
                        <FileCheck className="h-5 w-5 text-orange-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Comprehensive Support</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Our dedicated contractor support team provides technical training, specification assistance, on-site support, and marketing materials to help you succeed. Our certification program gives you a competitive edge in the marketplace.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                      <span className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-full p-2 mt-1 shadow-inner">
                        <Zap className="h-5 w-5 text-orange-200" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">Performance Metrics</h3>
                        <p className="text-sm md:text-base text-gray-100">
                          Our coatings deliver measurable performance improvements that you can demonstrate to clients, including ASTM-verified metrics for reflectivity, thermal resistance, and weather resistance. This data-driven approach helps justify premium pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium Enterprise Statistics Section */}
            <div className="relative mb-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-8 rounded-xl z-10 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                  Performance Metrics
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-lg border border-blue-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-blue-300 text-sm font-medium mb-1">Thermal Resistance</p>
                    <p className="text-3xl font-bold text-white mb-1">99.5%</p>
                    <p className="text-xs text-gray-400">Compared to standard paints</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-lg border border-orange-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-orange-300 text-sm font-medium mb-1">Service Life</p>
                    <p className="text-3xl font-bold text-white mb-1">30+ Years</p>
                    <p className="text-xs text-gray-400">Documented performance</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-lg border border-blue-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-blue-300 text-sm font-medium mb-1">UV Reflection</p>
                    <p className="text-3xl font-bold text-white mb-1">89%</p>
                    <p className="text-xs text-gray-400">Reduces building heat load</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-lg border border-orange-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-orange-300 text-sm font-medium mb-1">VOC Content</p>
                    <p className="text-3xl font-bold text-white mb-1">{"<50g/L"}</p>
                    <p className="text-xs text-gray-400">Eco-friendly formula</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profit Calculator Section */}
            <div id="profit-calculator" className="relative mb-16 scroll-mt-24">
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
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-2xl md:text-3xl mb-6 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                    How Praetorian Boosts Your Painting Business Revenue
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 rounded-lg p-5 shadow-md border border-blue-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-sm">Premium Pricing</h3>
                      <ul className="space-y-2 text-gray-100">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <span>Charge 15-25% more per project</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <span>Move from commodity pricing to value pricing</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <span>Justify higher margins with documented performance</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 rounded-lg p-5 shadow-md border border-orange-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-sm">Reduced Callbacks</h3>
                      <ul className="space-y-2 text-gray-100">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-orange-400 mr-2 shrink-0 mt-0.5" />
                          <span>90% fewer warranty claims vs. standard paints</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-orange-400 mr-2 shrink-0 mt-0.5" />
                          <span>Eliminate costs of repeat visits and touch-ups</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-orange-400 mr-2 shrink-0 mt-0.5" />
                          <span>Free up workforce for new revenue-generating projects</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 rounded-lg p-5 shadow-md border border-blue-500/20">
                      <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-sm">New Markets</h3>
                      <ul className="space-y-2 text-gray-100">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <span>Access high-value energy retrofit projects</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <span>Win specialized commercial/industrial contracts</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <span>Qualify for government and institutional projects</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20 mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-white text-center">Revenue Comparison: Standard Project vs. Praetorian Project</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-700 rounded-tl-sm"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-700 rounded-br-sm"></div>
                        </div>
                        
                        <h4 className="text-lg font-medium mb-3 text-gray-100">Standard Exterior Painting Project</h4>
                        <ul className="space-y-2 text-gray-200">
                          <li className="flex justify-between">
                            <span>Project Size:</span>
                            <span>2,500 sq ft home</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Standard Paint Price:</span>
                            <span>$45/gallon</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Standard Labor Rate:</span>
                            <span>$35/hour</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Standard Materials Cost:</span>
                            <span>$1,350</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Standard Labor Cost:</span>
                            <span>$4,200</span>
                          </li>
                          <li className="flex justify-between font-semibold border-t border-gray-700 pt-2 mt-2">
                            <span>Standard Project Revenue:</span>
                            <span>$7,500</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span>Standard Profit Margin:</span>
                            <span>26%</span>
                          </li>
                          <li className="flex justify-between font-semibold text-green-400 mt-2">
                            <span>Standard Project Profit:</span>
                            <span>$1,950</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-700 rounded-tl-sm"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-700 rounded-br-sm"></div>
                        </div>
                        
                        <h4 className="text-lg font-medium mb-3 text-gray-100">Praetorian Ceramic Coating Project</h4>
                        <ul className="space-y-2 text-gray-200">
                          <li className="flex justify-between">
                            <span>Project Size:</span>
                            <span>2,500 sq ft home</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Praetorian Cost:</span>
                            <span>$75/gallon</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Premium Labor Rate:</span>
                            <span>$45/hour</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Premium Materials Cost:</span>
                            <span>$2,250</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Premium Labor Cost:</span>
                            <span>$5,400</span>
                          </li>
                          <li className="flex justify-between font-semibold border-t border-gray-700 pt-2 mt-2">
                            <span>Premium Project Revenue:</span>
                            <span>$11,250</span>
                          </li>
                          <li className="flex justify-between text-sm">
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
                </motion.div>
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-green-500/30 rounded-xl blur-lg opacity-70 animate-pulse-slow"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-8 rounded-xl border border-green-500/30">
                    <div className="bg-green-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Request Submitted Successfully!</h3>
                    <p className="text-gray-300 mb-4">
                      Thank you for your interest in becoming a certified Praetorian contractor. Our team will reach out to you within one business day to discuss next steps.
                    </p>
                    <div className="mt-6">
                      <PremiumCartButton
                        size="sm"
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                        onClick={() => {
                          setContactSuccess(false);
                          setShowContactForm(false);
                        }}
                      >
                        Return to Painters Page
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
              ) : (
                // Contact Form
                <div className="max-w-2xl mx-auto relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 rounded-xl blur-lg opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-6 md:p-8 rounded-xl border border-blue-500/30 overflow-hidden">
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
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-3 text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                        Become a Praetorian Certified Contractor
                      </h2>
                      <p className="text-gray-200 mb-4">
                        Join our exclusive network of professional painters who enjoy premium pricing, priority lead generation, and advanced technical support.
                      </p>
                      
                      <div className="bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-gray-900/70 p-4 rounded-lg border border-orange-500/20 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Certified Contractor Benefits:</h3>
                        <ul className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                          <li className="flex items-center text-sm text-gray-200">
                            <CheckCircle className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                            <span>Priority lead generation in your service area</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-200">
                            <CheckCircle className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                            <span>Exclusive access to contractor pricing</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-200">
                            <CheckCircle className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                            <span>Official certification credentials</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-200">
                            <CheckCircle className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                            <span>Featured listing on our contractor locator</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-200">
                            <CheckCircle className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                            <span>Advanced technical training sessions</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-200">
                            <CheckCircle className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                            <span>Co-branded marketing materials</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Smith" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                              <FormLabel className="text-white">Company Name (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Smith & Sons Painting" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                              <FormLabel className="text-white">Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Anytown" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">State</FormLabel>
                                <FormControl>
                                  <Input placeholder="CA" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Zip Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="90210" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Project Types</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-900/70 border-gray-700 text-white">
                                      <SelectValue placeholder="Select project type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
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
                                <FormLabel className="text-white">Typical Project Size</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Small residential, 10,000+ sq ft" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="projectTimeline"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Project Timeline</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Immediate, Next quarter" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Coating Needs</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-900/70 border-gray-700 text-white">
                                      <SelectValue placeholder="Select coating needs" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                    <SelectItem value="exterior">Exterior Coatings</SelectItem>
                                    <SelectItem value="interior">Interior Coatings</SelectItem>
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
                              <FormLabel className="text-white">Preferred Products (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Any specific Praetorian products you're interested in" {...field} className="bg-gray-900/70 border-gray-700 text-white" />
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
                              <FormLabel className="text-white">Additional Details</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please share any specific requirements or questions about becoming a certified contractor"
                                  className="bg-gray-900/70 border-gray-700 text-white min-h-[100px]"
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-900/50 border border-gray-800">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-white">
                                  I agree to the <span className="text-blue-400">Terms of Service</span> and <span className="text-blue-400">Privacy Policy</span>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-center pt-4">
                          <PremiumCartButton 
                            type="submit" 
                            size="lg"
                            className="relative min-w-[200px]"
                            disabled={contactMutation.isPending}
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
                              <span>Submit Application</span>
                            )}
                          </PremiumCartButton>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              )}
            </div>
            
            {/* Testimonials Section */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                What Professional Painters Say
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Testimonial 1 */}
                <div className="relative transform transition-all duration-500">
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow z-0"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500 z-0"></div>
                    
                    <div className="relative backdrop-blur-sm bg-black/90 rounded-xl p-5 z-30 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 h-full">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                      
                      {/* Corner accent squares */}
                      <div className="absolute top-4 left-4 w-12 h-12 z-10">
                        <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                      </div>
                      <div className="absolute top-4 right-4 w-12 h-12 z-10">
                        <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                      </div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                        <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                        <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                        <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
                      </div>
                      
                      <div className="mb-4 flex justify-center">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-3 rounded-full">
                          <Brush className="h-8 w-8 text-blue-400" />
                        </div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <p className="text-gray-300 mb-4 italic">
                          "Our clients are amazed by the energy savings after we apply Praetorian coatings. The application is smooth and customer satisfaction is through the roof. This has completely transformed our business model."
                        </p>
                        <div className="mt-4">
                          <p className="text-white font-semibold">Robert Garcia</p>
                          <p className="text-gray-400 text-sm">Garcia Professional Painters</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="relative transform transition-all duration-500">
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow z-0"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500 z-0"></div>
                    
                    <div className="relative backdrop-blur-sm bg-black/90 rounded-xl p-5 z-30 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 h-full">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                      
                      {/* Corner accent squares */}
                      <div className="absolute top-4 left-4 w-12 h-12 z-10">
                        <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                      </div>
                      <div className="absolute top-4 right-4 w-12 h-12 z-10">
                        <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                      </div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                        <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                        <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                        <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
                      </div>
                      
                      <div className="mb-4 flex justify-center">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-3 rounded-full">
                          <Building className="h-8 w-8 text-blue-400" />
                        </div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <p className="text-gray-300 mb-4 italic">
                          "We've doubled our commercial contracts since becoming a certified Praetorian applicator. The technical support is outstanding, and the durability metrics help us win competitive bids against traditional painters."
                        </p>
                        <div className="mt-4">
                          <p className="text-white font-semibold">Jennifer Williams</p>
                          <p className="text-gray-400 text-sm">Elite Commercial Finishes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="relative transform transition-all duration-500">
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow z-0"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500 z-0"></div>
                    
                    <div className="relative backdrop-blur-sm bg-black/90 rounded-xl p-5 z-30 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 h-full">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                      
                      {/* Corner accent squares */}
                      <div className="absolute top-4 left-4 w-12 h-12 z-10">
                        <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                      </div>
                      <div className="absolute top-4 right-4 w-12 h-12 z-10">
                        <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                      </div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                        <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                        <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                        <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
                      </div>
                      
                      <div className="mb-4 flex justify-center">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-3 rounded-full">
                          <PaintBucket className="h-8 w-8 text-blue-400" />
                        </div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <p className="text-gray-300 mb-4 italic">
                          "The technical training provided by Praetorian has helped us expand into specialty markets like energy-efficient retrofits. Our team now commands premium rates for specialty coating applications."
                        </p>
                        <div className="mt-4">
                          <p className="text-white font-semibold">Michael Chen</p>
                          <p className="text-gray-400 text-sm">Precision Paint Solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer CTA */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                Ready to Transform Your Painting Business?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join Praetorian's network of certified professional applicators and gain access to exclusive training, technical support, and premium products that will set your business apart.
              </p>
              
              {!showContactForm && !contactSuccess && (
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 animate-pulse-slow"></div>
                  
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <PremiumCartButton size="lg" className="relative z-10" onClick={handleShowContactForm}>
                      Get Started Today <ChevronRight className="ml-2 h-4 w-4" />
                    </PremiumCartButton>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Registration Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-blue-600/30 to-blue-500/30 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-6 rounded-xl shadow-lg border border-blue-500/20 overflow-hidden">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.3)]">
                  Become a Certified Praetorian Painting Partner
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 bg-blue-950/20 p-4 rounded-lg border border-blue-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3">Partnership Benefits</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Exclusive territory protection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Project lead referrals in your area</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Professional certification & training</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Marketing support & materials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Dedicated account manager</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Preferential product pricing</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-3 rounded border border-blue-700/20">
                      <p className="text-sm text-gray-300">
                        Our partners see an average of <span className="font-bold text-white">410% increase</span> in annual profits when offering Praetorian premium coating solutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Registration Complete!",
                        description: "Your partnership application has been received. A Praetorian representative will contact you within 24 hours.",
                      });
                      setShowRegistrationForm(false);
                    }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            First Name*
                          </label>
                          <input 
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Last Name*
                          </label>
                          <input 
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Smith"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Name*
                        </label>
                        <input 
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Professional Painters Inc."
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address*
                          </label>
                          <input 
                            type="email"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number*
                          </label>
                          <input 
                            type="tel"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Service Area (Cities/Regions)*
                        </label>
                        <input 
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="e.g., Greater Los Angeles, Northern California"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Years in Business
                          </label>
                          <input 
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Number of Painters
                          </label>
                          <input 
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Primary Business Focus
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option value="">Select business focus</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="mixed">Mixed</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          How did you hear about us?
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option value="">Select option</option>
                          <option value="search">Internet Search</option>
                          <option value="referral">Referral</option>
                          <option value="tradeshow">Trade Show</option>
                          <option value="industry">Industry Publication</option>
                          <option value="social">Social Media</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="flex items-start mt-4">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            aria-describedby="terms-description"
                            name="terms"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 rounded bg-gray-700"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-medium text-gray-300">
                            I agree to the partnership terms
                          </label>
                          <p id="terms-description" className="text-gray-500">
                            By submitting this form, you agree to be contacted by our team and receive relevant business communications.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 ease-in-out"
                        >
                          Submit Partnership Application
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Painters Business ROI Analysis Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative max-w-6xl mx-auto">
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
                
                <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Painting Business Revenue Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Professional Painting Challenges</h3>
                    
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 p-6 rounded-lg border border-red-500/20 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Industry Pain Points
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Razor-thin margins</span> - Average profit margins for painting contractors are just 8.3% and declining
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">High competition</span> - 94% of painting businesses have 9 or fewer employees with minimal differentiation
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Callback costs</span> - Average contractor spends 10-15% of revenue on warranty repairs and customer callbacks
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Project timeline pressure</span> - Standard paint curing times create scheduling bottlenecks and cash flow issues
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian Painter Partnership Benefits
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Premium pricing power</span> - Offer high-performance coatings that command 35-65% higher project prices
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Better profit margins</span> - Average Praetorian partner contractors achieve 27-42% profit margins on premium projects
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Technical differentiation</span> - Certified exclusive installer status with documented performance capabilities
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">20+ year warranty support</span> - Virtually eliminates callback costs with documented performance certification
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                      <Brush className="h-5 w-5 text-blue-400 mr-2" />
                      Painter Revenue Enhancement Model
                    </h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Residential Painting Business <span className="text-sm text-blue-300">(5-person crew)</span></h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Standard Annual Business</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Project revenue (25 projects):</span>
                            <span className="text-white font-medium">$312,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Cost of materials/labor:</span>
                            <span className="text-white font-medium">$265,625</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Callback/warranty costs:</span>
                            <span className="text-white font-medium">$21,875</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Standard Annual Profit:</span>
                            <span className="text-white font-semibold">$25,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Profit Margin:</span>
                            <span className="text-white font-medium">8.0%</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">With Praetorian Partnership</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Premium project revenue (15 projects):</span>
                            <span className="text-white font-medium">$375,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Cost of materials/labor:</span>
                            <span className="text-white font-medium">$243,750</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Callback/warranty costs:</span>
                            <span className="text-white font-medium">$3,750</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Enhanced Annual Profit:</span>
                            <span className="text-green-400 font-semibold">$127,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Profit Margin:</span>
                            <span className="text-green-400 font-semibold">34.0%</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center text-blue-300 text-sm">
                          <span className="font-semibold">Annual Profit Increase: $102,500</span> | 410% improvement
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Commercial Painting Business <span className="text-sm text-blue-300">(10-person crew)</span></h4>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Average project value increase:</span>
                            <span className="text-white font-semibold">58.3%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "58.3%" }}></div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Callbacks reduction:</span>
                            <span className="text-white font-semibold">91.7%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "91.7%" }}></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-300">Annual company revenue potential:</span>
                          <span className="text-white font-semibold">$1.25M - $2.8M</span>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/20">
                          <div className="flex items-center">
                            <CircleDollarSign className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-200">
                              <span className="font-semibold text-white">Premium Positioning:</span> Specialized certification allows partners to target higher-value clients in commercial, industrial, and luxury residential segments
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6">
                      <button 
                        onClick={() => setShowRegistrationForm(true)}
                        className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Become a Certified Partner</span>
                        <span className="relative invisible">Become a Certified Partner</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    Praetorian provides full certification, training, and marketing support to our exclusive network of professional painting partners. Access premium clients and projects unavailable to standard painting contractors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Painters;