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
  Database
} from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import { SandlerSolarFunnel } from '@/sections/SandlerSolarFunnel';

import PageHeroSection from "@/components/sections/PageHeroSection";
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

  return (
    <MainLayout>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />

      {/* Hero Section with Technical Specs Grid */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/images/optimized/diamond-plate-industrial.jpg')] opacity-5 bg-cover bg-center" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
              <Code className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400 uppercase tracking-wider">C-46 Licensed • CPUC Certified</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              NEM 3.0 Solar Engineering
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Navigate California's 75-80% export credit reduction with SGIP-optimized battery storage, CPUC Rule 21 compliance, and Title 24 engineering expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                onClick={() => setShowConsultationForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg"
                data-testid="button-consultation"
              >
                <Phone className="mr-2 h-5 w-5" />
                Free Technical Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 px-8 py-6 text-lg"
                onClick={() => window.location.href = '/roi-calculator'}
                data-testid="button-calculator"
              >
                <Calculator className="mr-2 h-5 w-5" />
                NEM 3.0 ROI Calculator
              </Button>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Sol-Ark Hybrid Inverters</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 12K/15K models (12kW/15kW continuous)</li>
                <li>• 97.5% CEC weighted efficiency</li>
                <li>• Split-phase 120/240V output</li>
                <li>• Seamless grid-tie to off-grid switch</li>
                <li>• UL 1741-SB compliant</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">LiFePO4 Battery Specs</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• API 5.12kWh & 14.34kWh modules</li>
                <li>• 6000+ cycle lifespan (80% DoD)</li>
                <li>• Modular scalability to 100kWh+</li>
                <li>• BMS-optimized charge curves</li>
                <li>• 10-year performance warranty</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CircleDollarSign className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">SGIP Incentive Rates</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Equity Budget: $1,000/kWh</li>
                <li>• Equity Resiliency: $1,000/kWh</li>
                <li>• General Market: $200-300/kWh</li>
                <li>• Expert application processing</li>
                <li>• 3-6 month average payout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Sales Funnel Section */}
      <SandlerSolarFunnel />

      {/* NEM 3.0 Technical Deep Dive */}
      <ContentSection
        title="NEM 3.0 Export Credit Structure & Load-Shifting Strategy"
        subtitle="Technical Deep Dive"
        description="Understanding California's Net Billing Tariff (NBT) export rates and optimization strategies for maximum ROI under NEM 3.0 regulations."
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="mr-3 h-6 w-6 text-orange-400" />
              PG&E Net Billing Export Rates
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-red-400 font-semibold">Peak Period (4pm-9pm)</span>
                  <span className="text-2xl font-bold text-red-300">$0.08-0.10/kWh</span>
                </div>
                <p className="text-sm text-gray-400">Highest export value - discharge battery to grid during this window</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-400 font-semibold">Off-Peak (9pm-4pm)</span>
                  <span className="text-2xl font-bold text-yellow-300">$0.03-0.05/kWh</span>
                </div>
                <p className="text-sm text-gray-400">75-80% reduction from NEM 2.0 - minimize exports, maximize self-consumption</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">Super Off-Peak (Midnight-6am)</span>
                  <span className="text-2xl font-bold text-purple-300">$0.03-0.04/kWh</span>
                </div>
                <p className="text-sm text-gray-400">Charge battery from grid if solar insufficient - arbitrage opportunity</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Settings className="mr-3 h-6 w-6 text-green-400" />
              Load-Shifting Optimization Strategy
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 rounded-full p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Morning (6am-12pm): Solar Charging</h4>
                  <p className="text-sm">Charge battery from solar production. Minimize grid imports. Export minimal excess to avoid low NBT rates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 rounded-full p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Midday (12pm-4pm): Battery Full, Self-Consume</h4>
                  <p className="text-sm">Run heavy loads (HVAC, water heater, EV charging). Battery at 100% SOC. Maximize on-site consumption.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-500/20 rounded-full p-2 mt-1">
                  <Zap className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Peak Period (4pm-9pm): Battery Discharge</h4>
                  <p className="text-sm">Discharge battery to offset grid imports at $0.32-0.51/kWh rates. Export surplus at $0.08-0.10/kWh NBT if applicable.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 rounded-full p-2 mt-1">
                  <Battery className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Evening (9pm-6am): Grid Arbitrage (Optional)</h4>
                  <p className="text-sm">Charge battery from grid at $0.18-0.23/kWh during super off-peak if forecast indicates insufficient solar tomorrow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-white mb-3 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-orange-400" />
            NEM 3.0 Critical Insight: AB 942 & Home Sales
          </h4>
          <p className="text-gray-300 mb-2">
            <strong>California AB 942</strong> eliminates NEM 2.0 grandfathering protection upon home sale. New owners inherit NEM 3.0 export rates, reducing home value by $15,000-30,000 for systems without battery storage.
          </p>
          <p className="text-gray-300">
            <strong>Solution:</strong> Retrofit battery storage before listing. SGIP incentives offset 40-60% of installation costs, protecting resale value and demonstrating energy resilience to buyers.
          </p>
        </div>
      </ContentSection>

      {/* SGIP Incentive Breakdown */}
      <ContentSection
        title="SGIP Battery Incentive Breakdown"
        subtitle="California Self-Generation Incentive Program"
        description="Comprehensive guide to SGIP rebate tiers, eligibility requirements, and application strategy for battery energy storage systems."
        backgroundColor="bg-gray-900"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Equity Budget</h3>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-purple-300 mb-2">$1,000/kWh</div>
              <div className="text-sm text-gray-400">Up to $1,000,000 per project</div>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Eligibility:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>CARE/FERA utility customers</li>
                <li>Tribal lands installations</li>
                <li>Affordable housing properties</li>
                <li>Environmental justice communities</li>
              </ul>
              <p className="mt-3 text-purple-300 font-semibold">Priority application processing</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Equity Resiliency</h3>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-blue-300 mb-2">$1,000/kWh</div>
              <div className="text-sm text-gray-400">Plus resiliency adder</div>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Eligibility:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tier 2/3 PSPS fire zones (Shasta County qualifies)</li>
                <li>Medical baseline customers</li>
                <li>Critical need verification</li>
                <li>Must demonstrate resiliency benefit</li>
              </ul>
              <p className="mt-3 text-blue-300 font-semibold">Highest rebate tier available</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CircleDollarSign className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">General Market</h3>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-green-300 mb-2">$200-300/kWh</div>
              <div className="text-sm text-gray-400">Step-down schedule applies</div>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Eligibility:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Standard residential customers</li>
                <li>Commercial/industrial facilities</li>
                <li>Agricultural operations</li>
                <li>No special qualification needed</li>
              </ul>
              <p className="mt-3 text-green-300 font-semibold">Still 20-30% cost offset</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FileCheck className="mr-3 h-6 w-6 text-orange-400" />
            SGIP Application Strategy & Timeline
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Required Documentation</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Interconnection Agreement (PG&E Rule 21)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Battery system specification sheets (kWh capacity, power rating)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Installer C-46 contractor license verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Proof of utility account (for Equity tiers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>PSPS zone verification (for Resiliency tier)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Installation photos and commissioning report</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Processing Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/20 rounded-full px-3 py-1 text-sm font-semibold text-orange-400">Week 1-2</div>
                  <span className="text-gray-300 text-sm">Application submission & initial review</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/20 rounded-full px-3 py-1 text-sm font-semibold text-orange-400">Week 3-6</div>
                  <span className="text-gray-300 text-sm">Reservation confirmation from program administrator</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/20 rounded-full px-3 py-1 text-sm font-semibold text-orange-400">Week 7-10</div>
                  <span className="text-gray-300 text-sm">System installation & PG&E permission to operate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full px-3 py-1 text-sm font-semibold text-green-400">Week 11-24</div>
                  <span className="text-gray-300 text-sm">Final claim submission & incentive payment</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong className="text-orange-400">APR handles 100% of SGIP paperwork</strong> - from initial application to final payment, ensuring maximum rebate capture and zero administrative burden on homeowners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* CPUC Rule 21 & Title 24 Compliance */}
      <ContentSection
        title="CPUC Rule 21 Interconnection & Title 24 Compliance"
        subtitle="Regulatory Framework"
        description="Understanding California's solar interconnection standards and building code requirements for residential solar installations."
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Code className="mr-3 h-6 w-6 text-blue-400" />
              CPUC Rule 21 Requirements
            </h3>
            <div className="space-y-4 text-gray-300 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">IEEE 1547-2018 Compliance</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Smart inverter functions (voltage-reactive power, frequency-watt)</li>
                  <li>Anti-islanding protection with 2-second disconnect</li>
                  <li>Voltage and frequency ride-through requirements</li>
                  <li>Interoperability standards for utility communication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">UL 1741-SB Certification</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Inverter safety testing and certification</li>
                  <li>Grid support functionality verification</li>
                  <li>Required for all PG&E interconnection approvals</li>
                  <li>Sol-Ark 12K/15K models are UL 1741-SB certified</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">PG&E Interconnection Process</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Fast Track (≤30kW) or Independent Study Path ({'>'} 30kW)</li>
                  <li>10-15 business day initial review period</li>
                  <li>Supplemental review for complex installations</li>
                  <li>Permission to Operate (PTO) issued post-inspection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FileCheck className="mr-3 h-6 w-6 text-green-400" />
              Title 24 Building Code
            </h3>
            <div className="space-y-4 text-gray-300 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">2022 Energy Code Updates</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Solar + storage requirements for new residential construction</li>
                  <li>Prescriptive path: 4kWh minimum battery capacity</li>
                  <li>Performance path: time-dependent valuation modeling</li>
                  <li>Ventilation and heat pump integration standards</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Retrofit Compliance</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Existing homes: solar permitted under Title 24, Part 1 (administrative)</li>
                  <li>Electrical permit required (handled by C-46 contractor)</li>
                  <li>Structural calculations for roof loading (10-15 lbs/sq ft)</li>
                  <li>Fire setback requirements: 18" pathway to ridge, 36" sides</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Battery Installation Standards</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>NFPA 855: Energy Storage System safety code</li>
                  <li>Thermal runaway mitigation (LiFePO4 chemistry preferred)</li>
                  <li>Clearance requirements: 3ft from combustibles</li>
                  <li>Ventilation and temperature monitoring (HVAC integration)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-white mb-3 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-400" />
            APR C-46 Contractor Expertise
          </h4>
          <p className="text-gray-300">
            Our California C-46 Solar contractor license ensures full compliance with CPUC Rule 21, Title 24, and all local building codes. We handle permitting, structural engineering stamps, PG&E interconnection applications, and final inspection coordination - delivering turnkey installations with zero regulatory risk to homeowners.
          </p>
        </div>
      </ContentSection>

      {/* Features Grid */}
      <FeatureGrid
        title="Professional Solar Technology Solutions"
        subtitle="Why Choose APR"
        description="Industry-leading equipment, expert installation, and local service you can trust."
        features={features}
        columns={3}
        accentColor="orange"
      />

      {/* Stats Section */}
      <StatsSection
        title="Technical Performance Metrics"
        subtitle="By The Numbers"
        description="Real-world performance data from our Northern California NEM 3.0 installations."
        stats={stats}
        columns={4}
        variant="highlighted"
        accentColor="orange"
      />

      {/* Testimonials Section */}
      <ContentSection
        title="What Solar Professionals & Homeowners Say"
        subtitle="Client Reviews"
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

      {/* Process Section */}
      <ContentSection
        title="Our Installation Process"
        subtitle="Engineering-Grade Methodology"
        backgroundColor="bg-gray-900"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              step: "1", 
              title: "Technical Site Assessment", 
              desc: "Roof structural analysis, shading study, electrical panel evaluation, PG&E meter verification" 
            },
            { 
              step: "2", 
              title: "Engineering & Permitting", 
              desc: "AutoCAD system design, Title 24 compliance, structural PE stamp, Rule 21 interconnection application" 
            },
            { 
              step: "3", 
              title: "Professional Installation", 
              desc: "C-46 licensed crew, code-compliant mounting, inverter/battery integration, final inspection" 
            },
            { 
              step: "4", 
              title: "PTO & Monitoring", 
              desc: "PG&E permission to operate, monitoring platform setup, load-shifting optimization, SGIP claim submission" 
            }
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

      {/* CTA Section */}
      <CTASection
        title="Ready to Navigate NEM 3.0?"
        description="Join hundreds of Northern California homeowners and solar professionals who've optimized their systems for maximum ROI under the new regulations."
        primaryButton={{
          text: "Get Technical Consultation",
          onClick: () => setShowConsultationForm(true)
        }}
        secondaryButton={{
          text: "Call C-46 Contractor",
          link: "tel:5302260701"
        }}
        showContactInfo={true}
        accentColor="orange"
      />
    </MainLayout>
  );
};

export default ResidentialSolar;
