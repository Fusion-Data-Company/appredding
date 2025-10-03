import React, { useState } from "react";
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
  Building,
  TrendingUp,
  Shield,
  DollarSign,
  Zap,
  Award,
  Factory,
  PieChart,
  Briefcase,
  Users,
  Clock,
  Calculator,
  FileText,
  ChartBar,
  Settings,
  Building2,
  CheckCircle,
  CircleDollarSign,
  AlertTriangle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";

// Import section components
import PageHeroSection from "@/components/sections/PageHeroSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ContentSection from "@/components/sections/ContentSection";
import ServiceCard from "@/components/cards/ServiceCard";
import TestimonialCard from "@/components/cards/TestimonialCard";

// Form schema for commercial consultation
const commercialConsultationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  industry: z.string().optional(),
  monthlyUsage: z.string().optional(),
  message: z.string().optional()
});

type CommercialSolarFormValues = z.infer<typeof commercialConsultationSchema>;

const CommercialSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();
  
  const pageTitle = "Commercial Solar Installation | Advance Power Redding";
  const pageDescription = "Commercial solar installations for businesses in Northern California. Reduce operating costs, increase property value, and achieve energy independence with our C-10 licensed solutions.";

  const form = useForm<CommercialSolarFormValues>({
    resolver: zodResolver(commercialConsultationSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      monthlyUsage: "",
      message: ""
    }
  });

  // Mutation for consultation form
  const consultationMutation = useMutation({
    mutationFn: async (data: CommercialSolarFormValues) => {
      return await apiRequest("/api/commercial-solar/consultation", {
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
      setShowConsultationForm(false);
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

  const onSubmit = (data: CommercialSolarFormValues) => {
    consultationMutation.mutate(data);
  };

  // Define features for commercial solar
  const commercialFeatures = [
    {
      icon: Building2,
      title: "Custom Business Design",
      description: "Site-specific systems engineered for your facility's unique energy needs and consumption patterns.",
      highlight: false
    },
    {
      icon: Factory,
      title: "Industrial Scale Systems",
      description: "50kW to 1MW+ installations with central inverters and advanced monitoring capabilities.",
      highlight: false
    },
    {
      icon: Shield,
      title: "25-Year Warranty",
      description: "Complete protection with performance guarantees backed by industry-leading manufacturers.",
      highlight: false
    },
    {
      icon: Calculator,
      title: "ROI in 4-6 Years",
      description: "Typical payback period with accelerated depreciation and federal tax incentives.",
      highlight: true
    },
    {
      icon: ChartBar,
      title: "Real-Time Analytics",
      description: "Monitor production, consumption, and savings through advanced dashboard systems.",
      highlight: false
    },
    {
      icon: DollarSign,
      title: "Flexible Financing",
      description: "Purchase, lease, or PPA options available to meet your business needs.",
      highlight: false
    }
  ];

  // Define pain points for businesses
  const businessPainPoints = [
    {
      icon: AlertTriangle,
      title: "Rising Energy Costs",
      description: "Commercial rates have increased 140% in California over the past 10 years, crushing profit margins."
    },
    {
      icon: TrendingUp,
      title: "Peak Demand Charges",
      description: "Time-of-use rates and demand charges can triple your electric bill during business hours."
    },
    {
      icon: CircleDollarSign,
      title: "Competitive Disadvantage",
      description: "High energy costs reduce profitability while competitors with solar gain market advantages."
    },
    {
      icon: Building,
      title: "Grid Instability",
      description: "Power outages and brownouts disrupt operations, costing thousands in lost productivity."
    }
  ];

  // Define stats for commercial solar
  const commercialStats = [
    {
      value: "50-70",
      suffix: "%",
      label: "Energy Cost Reduction",
      icon: TrendingUp
    },
    {
      value: "500",
      suffix: "+",
      label: "Businesses Powered",
      icon: Building
    },
    {
      value: "4-6",
      label: "Year ROI",
      icon: DollarSign
    },
    {
      value: "98",
      suffix: "%",
      label: "System Uptime",
      icon: Shield
    }
  ];

  // Define service offerings
  const commercialServices = [
    {
      icon: Building2,
      title: "System Design & Engineering",
      description: "Custom commercial solar solutions engineered for maximum efficiency",
      features: [
        "Site analysis and energy audit",
        "PE stamped structural plans",
        "Single-line electrical diagrams"
      ]
    },
    {
      icon: Factory,
      title: "Installation & Integration",
      description: "Professional installation with minimal business disruption",
      features: [
        "PG&E and REU interconnection",
        "NEM 3.0 optimization",
        "OSHA compliant installation"
      ]
    },
    {
      icon: Settings,
      title: "Monitoring & Maintenance",
      description: "Comprehensive system management and performance optimization",
      features: [
        "24/7 remote monitoring",
        "Preventive maintenance",
        "Performance guarantees"
      ]
    }
  ];

  // Testimonials
  const commercialTestimonials = [
    {
      quote: "Advance Power designed and installed a 250kW system for our manufacturing facility. We're saving over $60,000 annually on energy costs.",
      author: "Michael Chen",
      role: "Operations Director",
      company: "NorCal Manufacturing",
      rating: 5
    },
    {
      quote: "Their team handled everything from permits to PG&E interconnection. The system has been running flawlessly for 3 years with 99% uptime.",
      author: "Jennifer Martinez",
      role: "Facilities Manager",
      company: "Redding Medical Center",
      rating: 5
    },
    {
      quote: "The ROI analysis was spot-on. We're on track to pay off the system in 5 years while locking in predictable energy costs.",
      author: "Robert Thompson",
      role: "CFO",
      company: "Valley Distribution Co.",
      rating: 5
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Commercial Solar Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Advance Power Redding",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Redding",
        "addressRegion": "CA"
      }
    },
    "description": pageDescription,
    "areaServed": "Northern California"
  };

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <PageHeroSection
        title="Commercial Solar Solutions for Northern California Businesses"
        subtitle="C-46 Licensed Contractor • 25+ Years Experience"
        ctaButtons={[
          {
            text: "Get Business Quote",
            onClick: () => setShowConsultationForm(true),
            variant: "primary"
          },
          {
            text: "Learn More",
            link: "#features",
            variant: "secondary"
          }
        ]}
        overlayColor="blue"
        height="large"
      />

      {/* Business Pain Points Section */}
      <section className="py-16 bg-gray-900">
        <FeatureGrid
          features={businessPainPoints}
          columns={2}
          title="Energy Costs Are Crushing Your Business"
          subtitle="The Problem"
          description="California businesses face skyrocketing energy costs that directly impact profitability and competitiveness."
          accentColor="orange"
        />
      </section>

      {/* Commercial Features Section */}
      <section id="features" className="py-16 bg-black">
        <FeatureGrid
          features={commercialFeatures}
          columns={3}
          title="Enterprise-Grade Solar Technology"
          subtitle="The Solution"
          description="Our commercial solar systems are engineered for maximum efficiency, durability, and return on investment."
          accentColor="blue"
        />
      </section>

      {/* Stats Section */}
      <StatsSection
        stats={commercialStats}
        title="Proven Results for Businesses"
        subtitle="By The Numbers"
        columns={4}
        variant="highlighted"
        accentColor="orange"
        backgroundColor="bg-gray-900"
      />

      {/* Service Offerings */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Commercial Solar Services
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From initial consultation to long-term maintenance, we handle every aspect of your commercial solar project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commercialServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <ContentSection
        title="Calculate Your Solar ROI"
        subtitle="Financial Analysis"
        variant="centered"
        backgroundColor="bg-gray-900"
      >
        <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">Typical Business Savings</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  30% Federal Tax Credit (ITC)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  100% Depreciation Year 1 (Bonus)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Net Metering Credits
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Property Tax Exemption
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">10-Year Financial Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Average System Cost:</span>
                  <span className="text-white font-semibold">$250,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax Incentives:</span>
                  <span className="text-green-400 font-semibold">-$125,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">10-Year Energy Savings:</span>
                  <span className="text-green-400 font-semibold">+$450,000</span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-white font-bold">Net Benefit:</span>
                    <span className="text-green-400 font-bold">+$325,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowConsultationForm(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 text-lg shadow-lg transform transition hover:scale-105"
            >
              Get Your Custom ROI Analysis
            </Button>
          </div>
        </div>
      </ContentSection>

      {/* Testimonials */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Leading Businesses
            </h2>
            <p className="text-lg text-gray-300">
              See what our commercial clients say about their solar investments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commercialTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ContentSection
        title="Our Commercial Solar Process"
        subtitle="Simple & Streamlined"
        variant="gradient"
        backgroundColor="bg-gray-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Energy Audit", description: "Comprehensive analysis of your energy usage and costs" },
            { step: "2", title: "Custom Design", description: "Engineering plans optimized for your facility" },
            { step: "3", title: "Professional Installation", description: "OSHA-compliant installation with minimal disruption" },
            { step: "4", title: "Monitoring & Support", description: "24/7 system monitoring and maintenance" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Final CTA Section */}
      <CTASection
        title="Ready to Reduce Your Energy Costs?"
        description="Join hundreds of Northern California businesses that have made the switch to solar energy. Get your free consultation and ROI analysis today."
        primaryButton={{
          text: "Schedule Consultation",
          onClick: () => setShowConsultationForm(true)
        }}
        secondaryButton={{
          text: "Download ROI Guide",
          onClick: () => console.log("Download guide")
        }}
        accentColor="orange"
        backgroundColor="bg-gradient-to-br from-gray-900 via-black to-gray-900"
      />

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Request Commercial Consultation</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="bg-gray-800 border-gray-700 text-white" />
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
                        <Input type="tel" {...field} className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="monthlyUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Average Monthly kWh Usage (Optional)</FormLabel>
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
                      <FormLabel className="text-gray-300">Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={consultationMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    {consultationMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowConsultationForm(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CommercialSolar;