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
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-black"></div>
          <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-blue-600/10 rounded-full filter blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-orange-600/10 rounded-full filter blur-[150px] animate-pulse-slow-delayed"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjIpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        </div>
        
        <section className="py-10 md:py-24 relative z-10">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Hero Section */}
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
                      <span className="text-green-400 font-semibold"> 543% higher margins</span> compared to traditional painting methods.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/70 rounded-xl p-6 border border-green-500/20 shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]">
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
                          <span className="text-white font-semibold">$0.25</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-3 rounded-lg border border-gray-700/50">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-200">Project Size</span>
                          <span className="text-white">2,500 sq.ft</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-200 font-semibold">Total Profit</span>
                          <span className="text-white font-semibold">$625</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-900/70 to-black/80 rounded-xl p-6 border border-green-500/40 shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(74,222,128,0.15)]">
                      <h3 className="text-xl font-semibold text-white mb-4 text-center relative">
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs py-1 px-2 rounded-md transform rotate-3 shadow-lg">
                          PREMIUM SOLUTION
                        </div>
                        Praetorian Ceramic Coating
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                          <span className="text-gray-300">Average Cost per sq.ft</span>
                          <span className="text-green-300 font-medium">$15.00</span>
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
                          <span className="text-green-400 font-bold">$12.00</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-200">Project Size</span>
                          <span className="text-white">2,500 sq.ft</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-200 font-semibold">Total Profit</span>
                          <span className="text-green-400 font-bold">$30,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="mb-4 md:mb-0 md:mr-4">
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                            <CircleDollarSign className="h-8 w-8 text-white" />
                          </div>
                          <div className="ml-4 text-left">
                            <span className="block text-white text-xl font-bold">543% ROI</span>
                            <span className="text-green-400 text-sm">Additional Profit Margin</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600/40 via-green-500/30 to-green-600/40 rounded-lg blur-md opacity-80"></div>
                        <button
                          onClick={handleShowContactForm}
                          className="relative px-8 py-3 bg-gradient-to-br from-gray-800 to-gray-900 text-white text-lg font-medium rounded-lg border-2 border-green-500/50 hover:border-green-400/70 transition-all duration-300 overflow-hidden"
                        >
                          {/* Light shimmer animation effect */}
                          <span className="absolute inset-0 overflow-hidden">
                            <span className="absolute top-0 -left-3/4 w-1/2 h-full bg-gradient-to-r from-transparent via-green-100/20 to-transparent transform -skew-x-30 animate-shimmer"></span>
                          </span>
                          <div className="flex items-center justify-center">
                            <CircleDollarSign className="h-5 w-5 mr-2 text-green-400" />
                            Get Your Custom Profit Analysis
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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