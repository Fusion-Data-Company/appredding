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
import { 
  CheckCircle, 
  Shield, 
  Battery, 
  Sun, 
  Power,
  Zap,
  Clock,
  Settings,
  Home
} from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
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
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";

type HybridSolarFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const HybridSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationRequestSuccess, setConsultationRequestSuccess] = useState(false);
  const { toast } = useToast();
  
  const industry = "Hybrid Solar";
  const slug = "hybrid-solar";
  const pageTitle = "Advance Power Redding – Hybrid Solar Systems";
  const pageDescription = "Tailor-made hybrid solar solutions that seamlessly integrate solar panels with lithium battery storage. Enjoy on-grid reliability and off-grid independence with custom systems.";
  const heroImagePath = "/src/assets_dir/images/optimized/praetorian-background-new.png";
  
  useEffect(() => {
    preloadCriticalImages([
      heroImagePath,
      "/src/assets_dir/images/hybrid-solar-hero.jpg"
    ]);
  }, []);

  const form = useForm<HybridSolarFormValues>({
    resolver: zodResolver(insertFirePreventionHomeownerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      message: ""
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: HybridSolarFormValues) => {
      return await apiRequest("/api/hybrid-solar/consultation", {
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

  const onSubmit = (data: HybridSolarFormValues) => {
    consultationMutation.mutate(data);
  };

  const handleShowConsultationForm = () => {
    setShowConsultationForm(true);
  };

  const hybridFeatures = [
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Solar + Battery Integration",
      description: "Seamlessly combine solar panels with lithium battery storage for 24/7 power availability."
    },
    {
      icon: <Power className="w-6 h-6" />,
      title: "Grid-Tie with Backup",
      description: "Stay connected to the grid for reliability while having instant backup power during outages."
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: "Energy Independence",
      description: "Store excess solar energy for use during peak rates or when the grid is down."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Switchover",
      description: "Sub-10ms transfer time ensures seamless transition during power outages."
    }
  ];

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry={industry}
        slug={slug}
        imagePath={heroImagePath}
        keywords={getIndustryKeywords(slug, [
          'hybrid solar systems',
          'solar battery storage',
          'grid-tie with backup',
          'solar plus battery',
          'energy independence'
        ])}
        structuredData={generateStructuredData(industry, pageDescription, slug, [
          "Hybrid Solar Systems",
          "Solar Battery Storage",
          "Grid-Tie Solar with Backup",
          "Energy Independence Solutions"
        ])}
      />
      
      <div className="relative">
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.6) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-3] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 64, 175, 0.5) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>

        {/* Hero Section */}
        <section className="relative z-10 py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative">
                  <div className="absolute -inset-10 bg-blue-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
                  <div className="absolute -inset-20 bg-blue-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                  <div className="absolute -inset-30 bg-blue-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
                  
                  <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-blue-700/30 shadow-lg">
                    <div className="absolute bottom-1 left-1 w-12 h-12 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                    <div className="absolute bottom-1 right-1 w-12 h-12 border-b border-r border-blue-500/30 rounded-br-md"></div>
                    <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                    <div className="absolute top-1 right-1 w-12 h-12 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                  
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">
                      Hybrid Solar Systems
                    </h1>
                    
                    <div className="mb-6 space-y-6 text-gray-300">
                      <p className="text-lg">
                        Advance Power Redding offers tailor-made hybrid solar solutions that seamlessly integrate solar panels with lithium battery storage. Our hybrid systems ensure you have power day and night – storing excess solar energy for use during outages or peak times.
                      </p>
                      <p className="text-lg">
                        Enjoy the benefits of both on-grid reliability and off-grid independence with a system customized to your lifestyle and energy needs.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Solar + Storage</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Battery className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Backup Power</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Power className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-200">Grid Independence</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        className="relative group overflow-hidden bg-gradient-to-r from-gray-800 to-gray-950 border border-gray-700 hover:border-blue-500 transition-all duration-300 px-6 py-2 shadow-lg"
                        onClick={handleShowConsultationForm}
                      >
                        <span className="relative z-10 text-white group-hover:text-blue-200 transition-colors duration-300">
                          Get Hybrid Quote
                        </span>
                        <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-gray-600 text-blue-400 hover:text-blue-300 hover:border-blue-500"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
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
                      src="/src/assets_dir/images/hybrid-solar-hero.jpg" 
                      alt="Hybrid solar system with battery storage by Advance Power Redding" 
                      className="w-full h-auto max-h-[500px] object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/src/assets_dir/images/optimized/praetorian-background-new.png";
                      }}
                    />
                    
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                      <p className="text-sm text-gray-300 text-center">Hybrid solar system with lithium battery storage for 24/7 power independence</p>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-700/30 rounded-lg p-4 shadow-lg z-30">
                    <p className="text-blue-400 font-semibold">Backup Power</p>
                    <p className="text-3xl font-bold text-white">24/7<sup className="text-blue-300 text-xs">*</sup></p>
                    <p className="text-xs text-gray-400">*Uninterrupted energy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solar Rescue Timeline Section - Complete Magic MCP Funnel */}
        <SolarRescueTimelineSection className="bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

        {/* Hybrid System Features Section */}
        <section className="relative z-10 py-20 overflow-hidden">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose Hybrid Solar?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Experience the best of both worlds with hybrid solar systems that combine the reliability of grid-tied solar with the security of battery backup.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hybridFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs Section */}
        <section className="relative z-10 py-20 overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-8 text-center">Hybrid System Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">System Components</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">High-efficiency solar panels</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">LiFePO4 lithium batteries</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Hybrid grid-tie inverter</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Smart energy management system</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Key Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-gray-300">10-year battery warranty</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-gray-300">&lt;10ms backup switchover</span>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-gray-300">Real-time monitoring app</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-5 w-5 text-blue-400 mr-2" />
                      <span className="text-gray-300">Whole-home or critical loads</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready for Energy Independence?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get a custom hybrid solar system designed for your home. Our experts will help you achieve true energy security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg"
                  onClick={handleShowConsultationForm}
                >
                  Get Free Consultation
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-500 py-4 px-8 rounded-lg">
                  Call (530) 226-0701
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Consultation Form */}
        {showConsultationForm && !consultationRequestSuccess && (
          <section className="relative z-10 py-12 overflow-hidden">
            <div className="container mx-auto max-w-2xl">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-2xl border border-blue-700/30 shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Request a Consultation</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-gray-800 border-gray-700 text-white" />
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
                            <Input {...field} type="tel" className="bg-gray-800 border-gray-700 text-white" />
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
                          <FormLabel className="text-white">Property Address</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="bg-gray-800 border-gray-700 text-white" rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
                      disabled={consultationMutation.isPending}
                    >
                      {consultationMutation.isPending ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        )}

        {/* Success Message */}
        {consultationRequestSuccess && (
          <section className="relative z-10 py-12 overflow-hidden">
            <div className="container mx-auto max-w-2xl">
              <div className="bg-gradient-to-br from-green-900/50 to-gray-950 p-8 rounded-2xl border border-green-700/30 shadow-lg text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Request Received!</h2>
                <p className="text-gray-300 text-lg">
                  Thank you for your interest in hybrid solar systems. Our team will contact you shortly to discuss your energy independence goals.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default HybridSolar;
