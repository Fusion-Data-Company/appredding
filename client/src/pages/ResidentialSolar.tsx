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
  Wrench,
  Code,
  BookOpen,
  Gauge,
  Database,
  Activity,
  DollarSign,
  Cpu,
  Network,
  Wifi,
  LineChart,
  PieChart,
  Monitor,
  Server,
  HardDrive,
  Layers
} from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from '@/sections/SolarRescueTimelineSection';

import PageHeroSection from "@/components/sections/PageHeroSection";
import ContentSection from "@/components/sections/ContentSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ServiceCard from "@/components/cards/ServiceCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import ServicePage from "./ServicePage";

type ResidentialSolarFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const ResidentialSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();
  
  const pageTitle = "NEM 3.0 Solar Installation | C-46 Contractor | Advance Power Redding";
  const pageDescription = "Professional NEM 3.0 solar installations with SGIP battery incentives. C-46 licensed contractor specializing in PG&E interconnection, CPUC Rule 21 compliance, Title 24 requirements, and LiFePO4 storage solutions in Northern California.";

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
    "name": "NEM 3.0 Residential Solar Installation with SGIP Battery Incentives",
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

  const features = [
    {
      icon: Shield,
      title: "CPUC Rule 21 Certified",
      description: "Full compliance with IEEE 1547-2018 and UL 1741-SB interconnection standards for seamless PG&E integration."
    },
    {
      icon: Battery,
      title: "SGIP Battery Incentives",
      description: "$1,000/kWh Equity Budget, $200-300/kWh General Market. Expert application processing for maximum rebates."
    },
    {
      icon: Code,
      title: "C-46 Licensed Contractor",
      description: "California C-46 Solar contractor license with 25+ years experience in Title 24 compliance and permit expediting."
    },
    {
      icon: Zap,
      title: "Sol-Ark Hybrid Inverters",
      description: "12K/15K models with split-phase 120/240V, 97.5% efficiency, and seamless grid-tie to off-grid transition."
    },
    {
      icon: Database,
      title: "LiFePO4 Battery Storage",
      description: "API modules: 5.12kWh/14.34kWh configurations, 6000+ cycle lifespan, BMS-optimized for NEM 3.0 load shifting."
    },
    {
      icon: BookOpen,
      title: "NEM 3.0 Load Optimization",
      description: "Custom load-shifting strategies to maximize export value during peak periods ($0.08-0.10/kWh 4-9pm)."
    }
  ];

  const stats = [
    {
      value: "75-80",
      suffix: "%",
      label: "NEM 3.0 Export Credit Cut",
      icon: TrendingUp
    },
    {
      value: "6000",
      suffix: "+",
      label: "LiFePO4 Battery Cycles",
      icon: Battery
    },
    {
      value: "97.5",
      suffix: "%",
      label: "Sol-Ark Inverter Efficiency",
      icon: Gauge
    },
    {
      value: "7",
      label: "Day Orphan System Rescue",
      icon: Clock
    }
  ];

  const testimonials = [
    {
      quote: "APR navigated the entire CPUC Rule 21 interconnection process and secured our SGIP Equity Budget rebate. The Sol-Ark 15K with 28kWh LiFePO4 storage cut our bills by 82% under NEM 3.0.",
      author: "Dr. Michael Chen",
      role: "Engineering Professional",
      company: "Redding, CA",
      rating: 5
    },
    {
      quote: "Their team understands the technical nuances of NEM 3.0 export credits. The load-shifting automation they configured saves us $180/month by avoiding peak TOU rates. True solar professionals.",
      author: "Jennifer Martinez",
      role: "Energy Analyst",
      company: "Anderson, CA",
      rating: 5
    },
    {
      quote: "Outstanding C-46 contractor work. They handled Title 24 compliance, IEEE 1547-2018 certification, and PG&E interconnection flawlessly. Our 12kW system with 14.34kWh storage is performing at 98.2% of rated capacity.",
      author: "Robert Williams, PE",
      role: "Licensed Engineer",
      company: "Red Bluff, CA",
      rating: 5
    }
  ];

  const servicePageData = {
    pageTitle,
    pageDescription,
    structuredData,
    heroSection: {
      title: "NEM 3.0 Solar + Storage Engineering",
      subtitle: "C-46 #1084287 • NABCEP PV-102419 • CPUC Rule 21 Certified",
      description: "Navigate California's Net Billing Tariff with PE-stamped designs, SGIP incentive maximization, and advanced Sol-Ark/LiFePO4 integration",
      imageUrl: "/images/optimized/diamond-plate-industrial.jpg",
      primaryButton: {
        text: "Emergency NEM 3.0 Assessment",
        onClick: () => setShowConsultationForm(true),
      },
      secondaryButton: {
        text: "Calculate SGIP + ITC Savings",
        link: "/roi-calculator",
      },
    },
    featuresSection: {
        title: "Professional Solar Technology Solutions",
        subtitle: "Why Choose APR",
        description: "Industry-leading equipment, expert installation, and local service you can trust.",
        features: features
    },
    statsSection: {
        title: "Technical Performance Metrics",
        subtitle: "By The Numbers",
        description: "Real-world performance data from our Northern California NEM 3.0 installations.",
        stats: stats
    },
    contentSections: [
        {
            title: "NEM 3.0 Net Billing Tariff: Complete Technical & Financial Analysis",
            subtitle: "CPUC Decision 22-12-056 Implementation Guide",
            description: "Comprehensive breakdown of California's Net Billing Tariff structure, avoided cost calculator methodology, and advanced optimization strategies for residential solar + storage systems.",
            content: (
                <div>
                    {/* ... content from ResidentialSolar.tsx ... */}
                </div>
            )
        }
    ],
    testimonialsSection: {
        title: "What Solar Professionals & Homeowners Say",
        subtitle: "Client Reviews",
        testimonials: testimonials
    },
    ctaSection: {
        title: "Ready to Navigate NEM 3.0?",
        description: "Join hundreds of Northern California homeowners and solar professionals who've optimized their systems for maximum ROI under the new regulations.",
        primaryButton: {
            text: "Get Technical Consultation",
            onClick: () => setShowConsultationForm(true)
        },
        secondaryButton: {
            text: "Call C-46 Contractor",
            link: "tel:5302260701"
        }
    }
  };

  return (
    <>
      <ServicePage {...servicePageData} />
      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-orange-500/30 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Request Technical Consultation</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-name" />
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
                        <Input {...field} type="email" className="bg-gray-800 border-gray-700" data-testid="input-email" />
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
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-phone" />
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
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-address" />
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
                        <Textarea {...field} className="bg-gray-800 border-gray-700" rows={3} data-testid="input-message" />
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
                    data-testid="button-submit"
                  >
                    {consultationMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowConsultationForm(false)}
                    className="border-gray-600"
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResidentialSolar;
