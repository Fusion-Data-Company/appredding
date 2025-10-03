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
  CheckCircle, 
  Shield, 
  Home, 
  ChevronRight, 
  FileCheck, 
  Zap, 
  CircleDollarSign, 
  BarChart3, 
  Calculator, 
  Sun, 
  Battery, 
  Award, 
  AlertTriangle, 
  Building, 
  TrendingUp,
  ArrowRight,
  Phone,
  Clock,
  Users,
  Settings,
  Wrench
} from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";

// Import section components
import PageHeroSection from "@/components/sections/PageHeroSection";
import HeroSection from "@/components/sections/HeroSection";
import ContentSection from "@/components/sections/ContentSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ServiceCard from "@/components/cards/ServiceCard";
import TestimonialCard from "@/components/cards/TestimonialCard";

type ResidentialSolarFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const ResidentialSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();
  
  const pageTitle = "Residential Solar Installation | Advance Power Redding";
  const pageDescription = "Professional residential solar installations in Redding, CA. Save money on energy bills with custom solar solutions designed for Northern California homes. NEM 3.0 optimized systems with battery storage.";

  const form = useForm<ResidentialSolarFormValues>({
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
    mutationFn: async (data: ResidentialSolarFormValues) => {
      return await apiRequest("/api/fire-prevention/consultation", {
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
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

  const onSubmit = (data: ResidentialSolarFormValues) => {
    consultationMutation.mutate(data);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Residential Solar Installation",
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
    "areaServed": "Redding, California"
  };

  // Define features for residential solar
  const features = [
    {
      icon: Sun,
      title: "25-Year Warranty",
      description: "Complete system protection with industry-leading warranty coverage on panels, inverters, and workmanship."
    },
    {
      icon: Battery,
      title: "Battery Storage",
      description: "LG Chem RESU, Tesla Powerwall, FranklinWH - optimized for NEM 3.0 load shifting and power backup."
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "C-46 licensed electrical contractor with comprehensive insurance and PG&E interconnection expertise."
    },
    {
      icon: Zap,
      title: "Rapid Installation",
      description: "7-day rescue service for orphaned systems. Complete new installations in 2-4 weeks."
    },
    {
      icon: Calculator,
      title: "Custom Design",
      description: "Site-specific system design optimized for roof orientation, shading, and energy consumption patterns."
    },
    {
      icon: Award,
      title: "Local Expertise",
      description: "25+ years serving Shasta County and the North State I-5 corridor with proven local experience."
    }
  ];

  // Define stats for display
  const stats = [
    {
      value: "30-50",
      suffix: "%",
      label: "Average Energy Savings",
      icon: TrendingUp
    },
    {
      value: "25",
      suffix: "+",
      label: "Years of Experience",
      icon: Award
    },
    {
      value: "500",
      suffix: "+",
      label: "Homes Powered",
      icon: Home
    },
    {
      value: "7",
      label: "Day Rescue Service",
      icon: Clock
    }
  ];

  // Define service offerings
  const services = [
    {
      icon: Sun,
      title: "Solar Panel Installation",
      description: "Premium Tier 1 panels with microinverters for maximum efficiency",
      features: [
        "25-year performance warranty",
        "All-weather durability",
        "Maximum energy harvest"
      ]
    },
    {
      icon: Battery,
      title: "Battery Storage Systems",
      description: "Smart battery solutions for energy independence",
      features: [
        "NEM 3.0 optimization",
        "Backup power during outages",
        "Time-of-use rate savings"
      ]
    },
    {
      icon: Settings,
      title: "System Monitoring",
      description: "Real-time performance tracking and maintenance",
      features: [
        "24/7 system monitoring",
        "Mobile app access",
        "Proactive maintenance alerts"
      ]
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Advance Power rescued our orphaned solar system in just 7 days. The team was professional, knowledgeable, and got us back to saving on our energy bills immediately.",
      author: "Sarah Johnson",
      role: "Homeowner",
      company: "Redding, CA",
      rating: 5
    },
    {
      quote: "With the new NEM 3.0 rules, adding battery storage was essential. APR designed the perfect system that saves us money and provides backup power during outages.",
      author: "Mike Chen",
      role: "Business Owner",
      company: "Anderson, CA",
      rating: 5
    },
    {
      quote: "Outstanding service from start to finish. The team handled everything from permits to PG&E interconnection. Our energy bills dropped by 45% in the first month!",
      author: "Jennifer Williams",
      role: "Homeowner",
      company: "Red Bluff, CA",
      rating: 5
    }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <PageHeroSection
        title="Residential Solar Installation"
        subtitle="Advance Power Redding • Navigate NEM 3.0's 75-80% export credit reduction with our smart battery solutions"
        ctaButtons={[
          {
            text: "Get Free Quote",
            onClick: () => setShowConsultationForm(true),
            variant: "primary"
          },
          {
            text: "Calculate Savings",
            link: "/roi-calculator",
            variant: "secondary"
          }
        ]}
        overlayColor="orange"
        height="large"
      />

      {/* Problem Section */}
      <ContentSection
        title="Rising Energy Costs Are Crushing Homeowners"
        subtitle="The Energy Crisis"
        description="PG&E rates have increased 127% since 2010, and NEM 3.0 has drastically reduced solar export credits."
        backgroundColor="bg-gray-900"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
              <AlertTriangle className="mr-2" />
              Skyrocketing Utility Bills
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• NEM 3.0 slashed export credits by 75-80%</li>
              <li>• Time-of-use rates spike when solar doesn't produce</li>
              <li>• PSPS events cost families $250/night in hotels</li>
            </ul>
          </div>
          <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
              <AlertTriangle className="mr-2" />
              Energy Dependency Risks
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Increasing wildfire PSPS shutoffs in Shasta County</li>
              <li>• AB 942 eliminates NEM grandfathering on home sales</li>
              <li>• Orphaned solar systems need immediate rescue</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Features Section */}
      <FeatureGrid
        title="Professional Solar Technology Solutions"
        subtitle="Why Choose APR"
        description="Industry-leading equipment, expert installation, and local service you can trust."
        features={features}
        columns={3}
        accentColor="orange"
      />

      {/* Services Section */}
      <ContentSection
        title="Complete Solar Solutions"
        subtitle="Our Services"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              accentColor="orange"
              highlight={index === 1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Stats Section */}
      <StatsSection
        title="Proven Results"
        subtitle="By The Numbers"
        description="Real savings and performance metrics from our Northern California installations."
        stats={stats}
        columns={4}
        variant="highlighted"
        accentColor="orange"
      />

      {/* Process Section */}
      <ContentSection
        title="Our Installation Process"
        subtitle="Simple & Transparent"
        backgroundColor="bg-gray-900"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Free Consultation", desc: "Energy assessment and custom design" },
            { step: "2", title: "System Design", desc: "Engineering and permit preparation" },
            { step: "3", title: "Installation", desc: "Professional installation in 1-2 days" },
            { step: "4", title: "Activation", desc: "PG&E interconnection and monitoring setup" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Testimonials Section */}
      <ContentSection
        title="What Our Customers Say"
        subtitle="Real Reviews"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              highlight={index === 1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-orange-500/30">
            <h3 className="text-2xl font-bold text-white mb-6">Request Free Consultation</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="bg-gray-800 border-gray-700" />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" />
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" />
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
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-gray-800 border-gray-700" rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
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
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Saving?"
        description="Join hundreds of Northern California homeowners who've taken control of their energy costs."
        primaryButton={{
          text: "Get Your Free Quote",
          onClick: () => setShowConsultationForm(true)
        }}
        secondaryButton={{
          text: "Call Now",
          link: "tel:5302260701"
        }}
        showContactInfo={true}
        accentColor="orange"
      />
    </MainLayout>
  );
};

export default ResidentialSolar;