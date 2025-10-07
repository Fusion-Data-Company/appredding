import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SolarElectricHero from "@/components/SolarElectricHero";
import { motion } from "framer-motion";
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
import { AwardBadge } from "@/components/ui/award-badge";

import gregWithPanelImg from '@assets/Greg-with-panel.jpg';
import teamInstallationImg from '@assets/491844865_1271014964874224_7004732250107002194_n.jpg';
import batteryStorageImg from '@assets/Batt-3-300x400.jpg';
import completedInstallationImg from '@assets/400617335_882191187089939_3988264444007076062_n-500x375.jpg';

type ResidentialSolarFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const ResidentialSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();
  
  const pageTitle = "NEM 3.0 Solar Installation | C-46 Contractor | Advance Power Redding";
  const pageDescription = "Professional NEM 3.0 solar installations with SGIP battery incentives. C-46 licensed contractor specializing in PG&E interconnection, CPUC Rule 21 compliance, Title 24 requirements, and LiFePO4 storage solutions in Northern California.";

  const form = useForm<ResidentialSolarFormValues>({
    resolver: zodResolver(insertFirePreventionHomeownerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "",
      additionalComments: ""
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: ResidentialSolarFormValues) => {
      return await apiRequest("POST", "/api/fire-prevention/consultation", data);
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
        "streetAddress": "843 N. Market St.",
        "addressLocality": "Redding",
        "addressRegion": "CA",
        "postalCode": "96001",
        "addressCountry": "US"
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
    <MainLayout fullWidth={true}>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />

      {/* Solar Electric Hero Section */}
      <SolarElectricHero>
        {/* Excellence Award Badge - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <AwardBadge type="customer-service-excellence" />
        </div>
      </SolarElectricHero>

      {/* Enhanced Solar Engineering Funnel with Expanded Technical Details */}
      <SolarRescueTimelineSection
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-black !pt-0 !pb-20 -mt-32"
        stages={[
          {
            id: 'problem-red',
            title: 'STAGE 1: NEM 3.0 Crisis & System Failure Recognition',
            description: 'Critical discovery phase: Export credits plummet from $0.21-0.30/kWh (NEM 2.0) to $0.03-0.05/kWh (NEM 3.0). Monthly bills increase 200-400% despite full solar production. SolarCity/Sunrun orphaned systems fail without technical support. Inverter error codes multiply. Production drops 15-30% from deferred maintenance.',
            color: 'from-red-500 to-red-600',
            glowColor: 'rgba(239, 68, 68, 0.5)',
            icon: <AlertTriangle className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-red-300 font-bold">75-80% Export Value Lost</div>
                <div className="text-xs text-gray-400">$500-800 monthly impact</div>
                <div className="text-xs text-gray-400">10-12 year payback without battery</div>
              </div>
            ),
          },
          {
            id: 'intel-yellow',
            title: 'STAGE 2: Engineering Assessment & Load Profile Analysis',
            description: 'Comprehensive 127-point inspection: Electrical panel capacity verification (200A minimum for Sol-Ark 15K), roof structural analysis (10-15 lbs/sq ft loading), shading study with Solmetric SunEye, 12-month PG&E usage data analysis for load profile modeling, SGIP Equity qualification assessment (CARE/FERA/PSPS zones), existing inverter/panel compatibility check for AC/DC coupling options.',
            color: 'from-yellow-500 to-yellow-600',
            glowColor: 'rgba(234, 179, 8, 0.5)',
            icon: <Gauge className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-yellow-300 font-bold">2-Hour Site Audit</div>
                <div className="text-xs text-gray-400">AutoCAD system design</div>
                <div className="text-xs text-gray-400">PE structural stamp included</div>
              </div>
            ),
          },
          {
            id: 'roi-green',
            title: 'STAGE 3: Custom Battery System Design & Financial Modeling',
            description: 'Precision engineering phase: Sol-Ark 15K sizing (15kW continuous/23kW surge), SimpliPhi/Fortress battery calculations (1.5x daily usage for 90% self-consumption), TOU arbitrage modeling ($0.51 peak vs $0.18 off-peak = $0.33/kWh spread), SGIP rebate maximization strategy (stacking Equity + Resiliency tiers), 20-year cash flow analysis with ITC 30% federal credit, custom Python load-shifting algorithms for seasonal optimization.',
            color: 'from-green-500 to-green-600',
            glowColor: 'rgba(34, 197, 94, 0.5)',
            icon: <Battery className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-orange-300 font-bold">$15,000-25,000 SGIP</div>
                <div className="text-xs text-gray-400">5-7 year payback with incentives</div>
                <div className="text-xs text-gray-400">$200-400 monthly savings</div>
              </div>
            ),
          },
          {
            id: 'action-orange',
            title: 'STAGE 4: Turnkey Installation & Grid Integration',
            description: 'Execution excellence: 2-day professional installation by C-46 crew, NFPA 855 battery safety compliance with thermal monitoring, PG&E Rule 21 smart inverter commissioning (Volt-VAR, Freq-Watt settings), real-time monitoring portal activation with API integration, SGIP Performance Based Incentive enrollment for 5-year payments, 24/7 NOC monitoring with 2-hour emergency response SLA, comprehensive 10-year system warranty package.',
            color: 'from-orange-500 to-orange-600',
            glowColor: 'rgba(168, 85, 247, 0.5)',
            icon: <CheckCircle className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-orange-300 font-bold">14-21 Day PTO Average</div>
                <div className="text-xs text-gray-400">99.1% first-pass inspection</div>
                <div className="text-xs text-gray-400">Same-day monitoring activation</div>
              </div>
            ),
          },
        ]}
      />

      {/* Team Work Image 2 */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={teamInstallationImg}
            alt="Professional solar installation team working on residential rooftop system"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-residential-solar-2"
          />
        </div>
      </div>

      {/* NEM 3.0 Technical Deep Dive - Massively Expanded */}
      <ContentSection
        title="NEM 3.0 Net Billing Tariff: Complete Technical & Financial Analysis"
        subtitle="CPUC Decision 22-12-056 Implementation Guide"
        description="Comprehensive breakdown of California's Net Billing Tariff structure, avoided cost calculator methodology, and advanced optimization strategies for residential solar + storage systems."
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        {/* Real-Time Rate Monitor */}
        <motion.div
          className="card-elite glow-blue p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 20%, rgba(59, 130, 246, 0.1) 50%, transparent 80%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer1 5s infinite'
            }}
          />

          <h3 className="text-xl font-bold text-white mb-4 flex items-center relative z-10">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <Activity className="mr-3 h-6 w-6 text-blue-400" />
            </motion.div>
            Live PG&E TOU-C Rate Schedule (Winter 2024)
          </h3>
          <div className="grid md:grid-cols-4 gap-4 relative z-10">
            {[
              { title: "Peak (4-9pm)", value: "$0.51/kWh", desc: "Import Cost", export: "Export: $0.08", gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", borderColor: "border-red-500/30" },
              { title: "Partial Peak (3-4pm, 9-12am)", value: "$0.42/kWh", desc: "Import Cost", export: "Export: $0.06", gradient: "from-yellow-500 via-amber-500 to-yellow-600", glowColor: "rgba(234, 179, 8, 0.4)", borderColor: "border-yellow-500/30" },
              { title: "Off-Peak (12am-3pm)", value: "$0.40/kWh", desc: "Import Cost", export: "Export: $0.04", gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/30" },
              { title: "Price Differential", value: "12.75x", desc: "Import/Export Ratio", export: "Peak Period", gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/30" }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                  style={{
                    background: card.glowColor,
                    animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                  }}
                />

                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${card.gradient} rounded-xl p-4 border ${card.borderColor} overflow-hidden`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {/* Glass overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
                    }}
                  />

                  {/* Shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)',
                      backgroundSize: '200% 100%',
                      animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                      mixBlendMode: 'overlay'
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-xs text-white/80 uppercase mb-1 font-semibold drop-shadow-sm">{card.title}</div>
                    <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{card.value}</div>
                    <div className="text-xs text-white/70 mt-1 drop-shadow-sm">{card.desc}</div>
                    <div className="text-sm font-mono text-white/90 font-semibold drop-shadow-sm">{card.export}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Detailed Export Value Calculator */}
          <motion.div
            className="card-elite glow-orange p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Background shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.15) 50%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer1 5s infinite'
              }}
            />

            <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Calculator className="mr-3 h-6 w-6 text-orange-400" />
              </motion.div>
              NEM 3.0 Avoided Cost Calculator (ACC Plus)
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-3">Export Value Components</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Energy Value (LMP):</span>
                    <span className="text-red-300 font-mono">$0.025-0.045/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity Value:</span>
                    <span className="text-red-300 font-mono">$0.005-0.015/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RPS/GHG Adder:</span>
                    <span className="text-red-300 font-mono">$0.002-0.008/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Line Loss Factor:</span>
                    <span className="text-red-300 font-mono">×1.05-1.08</span>
                  </div>
                  <div className="border-t border-red-500/30 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-red-400">Total Export Value:</span>
                      <span className="text-red-300">$0.03-0.10/kWh</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Monthly True-Up Calculation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Solar Production:</span>
                    <span className="text-yellow-300 font-mono">850 kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Self-Consumption:</span>
                    <span className="text-yellow-300 font-mono">450 kWh (53%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Grid Export:</span>
                    <span className="text-yellow-300 font-mono">400 kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Export Credit:</span>
                    <span className="text-yellow-300 font-mono">400 × $0.04 = $16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Grid Import:</span>
                    <span className="text-yellow-300 font-mono">350 kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Import Cost:</span>
                    <span className="text-yellow-300 font-mono">350 × $0.45 = $157.50</span>
                  </div>
                  <div className="border-t border-yellow-500/30 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-yellow-400">Net Monthly Bill:</span>
                      <span className="text-red-400">$141.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Load-Shifting Strategy */}
          <motion.div
            className="card-elite glow-green p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Background shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(34, 197, 94, 0.15) 50%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer2 5s infinite'
              }}
            />

            <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <LineChart className="mr-3 h-6 w-6 text-orange-400" />
              </motion.div>
              24-Hour Optimization Protocol
            </h3>
            <div className="space-y-3">
              {[
                { time: "12am-6am", action: "Grid Charging", detail: "Import at $0.40/kWh if battery < 20% SOC", color: "blue" },
                { time: "6am-7am", action: "Solar Priority", detail: "Direct solar to battery, zero grid export", color: "yellow" },
                { time: "7am-12pm", action: "Battery Charging", detail: "Charge to 100% SOC, minimal home loads", color: "green" },
                { time: "12pm-3pm", action: "Self-Consumption", detail: "Run pool pump, HVAC, washer/dryer", color: "orange" },
                { time: "3pm-4pm", action: "Pre-Peak Prep", detail: "Verify 100% SOC, reduce all loads", color: "yellow" },
                { time: "4pm-9pm", action: "Peak Discharge", detail: "Battery supplies 100% of loads, zero grid import", color: "red" },
                { time: "9pm-12am", action: "Partial Peak", detail: "Continue battery discharge if SOC > 30%", color: "orange" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`bg-${item.color}-500/20 rounded-full p-2 mt-1`}>
                    <Clock className={`h-4 w-4 text-${item.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white">{item.time}: {item.action}</h4>
                        <p className="text-sm text-gray-400">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparative Analysis Table */}
        <motion.div
          className="card-elite glow-orange p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.1) 50%, transparent 80%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer3 6s infinite'
            }}
          />

          <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <PieChart className="mr-3 h-6 w-6 text-orange-400" />
            </motion.div>
            NEM 2.0 vs NEM 3.0: 10-Year Financial Impact Analysis
          </h3>
          <div className="overflow-x-auto relative z-10">
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(249, 115, 22, 0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 50%, transparent 80%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer1 5s infinite',
                  mixBlendMode: 'overlay'
                }}
              />

              <table className="w-full text-sm relative">
                <thead>
                  <tr
                    className="border-b border-gray-700/50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <th className="text-left py-3 px-4 text-gray-300 font-bold">Metric</th>
                    <th className="text-right py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-blue-300 font-bold">NEM 2.0 (Legacy)</span>
                      </div>
                    </th>
                    <th className="text-right py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <span className="text-yellow-300 font-bold">NEM 3.0 (Solar Only)</span>
                      </div>
                    </th>
                    <th className="text-right py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                        <span className="text-orange-300 font-bold">NEM 3.0 + Battery</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {[
                    { spec: "Export Credit Rate", nem2: "$0.21-0.30/kWh", nem3: "$0.03-0.05/kWh", battery: "N/A (self-consume)" },
                    { spec: "Monthly Bill (avg)", nem2: "$15-25", nem3: "$120-180", battery: "$20-40" },
                    { spec: "Payback Period", nem2: "5-7 years", nem3: "10-12 years", battery: "6-8 years" },
                    { spec: "10-Year Savings", nem2: "$28,000-35,000", nem3: "$8,000-12,000", battery: "$24,000-32,000" },
                    { spec: "System Cost (net)", nem2: "$15,000", nem3: "$15,000", battery: "$18,000-22,000" },
                    { spec: "10-Year ROI", nem2: "186%", nem3: "53%", battery: "145%", bold: true }
                  ].map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`hover:bg-white/5 transition-all duration-300 group ${row.bold ? 'font-semibold' : ''}`}
                    >
                      <td className={`py-3 px-4 ${row.bold ? 'text-white' : 'text-gray-200'} group-hover:text-white transition-colors`}>
                        {row.spec}
                      </td>
                      <motion.td
                        className="text-right py-3 px-4 font-mono text-blue-300 group-hover:text-blue-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative inline-block px-3 py-1 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          {row.nem2}
                        </div>
                      </motion.td>
                      <motion.td
                        className="text-right py-3 px-4 font-mono text-yellow-300 group-hover:text-yellow-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative inline-block px-3 py-1 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                          {row.nem3}
                        </div>
                      </motion.td>
                      <motion.td
                        className="text-right py-3 px-4 font-mono text-orange-300 group-hover:text-orange-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative inline-block px-3 py-1 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                          {row.battery}
                        </div>
                      </motion.td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Critical Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-elite glow-orange p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-400" />
              AB 942: The Hidden Home Value Killer
            </h4>
            <p className="text-gray-300 mb-3">
              <strong className="text-orange-400">Critical Alert:</strong> California Assembly Bill 942 terminates NEM 2.0 grandfathering upon property transfer. This creates a $20,000-40,000 instant value loss for homes with solar-only systems.
            </p>
            <div className="bg-black/30 rounded-lg p-4 mt-3">
              <h5 className="text-orange-300 font-semibold mb-2">Mitigation Strategy:</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Add battery storage before listing (increases value $15-25k)</li>
                <li>• Document SGIP rebates received (proves system economics)</li>
                <li>• Provide 12-month production/savings data to buyers</li>
                <li>• Include transferable monitoring/warranty packages</li>
              </ul>
            </div>
          </div>

          <div className="card-elite glow-green p-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-orange-400" />
              Virtual Power Plant (VPP) Opportunity
            </h4>
            <p className="text-gray-300 mb-3">
              <strong className="text-orange-400">Revenue Stream:</strong> California's Emergency Load Reduction Program (ELRP) pays $2/kWh for battery discharge during grid emergencies. Average 5-10 events annually.
            </p>
            <div className="bg-black/30 rounded-lg p-4 mt-3">
              <h5 className="text-orange-300 font-semibold mb-2">VPP Revenue Potential:</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• 15kWh battery × 80% DoD = 12kWh available</li>
                <li>• 12kWh × $2/kWh = $24 per event</li>
                <li>• 8 events/year × $24 = $192 annual revenue</li>
                <li>• Plus avoided peak charges = $2,400-3,600/year total</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Technical Equipment Specifications - NEW SECTION */}
      <ContentSection
        title="Advanced Solar + Storage Equipment Specifications"
        subtitle="Component Deep Dive"
        description="Detailed technical analysis of inverters, batteries, panels, and BOS components optimized for NEM 3.0 economics"
        backgroundColor="bg-gray-900"
      >
        {/* Sol-Ark Inverter Comparison */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <Cpu className="mr-3 h-6 w-6 text-orange-400" />
            </motion.div>
            Sol-Ark Hybrid Inverter Comparison Matrix
          </h3>
          <div className="overflow-x-auto">
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(249, 115, 22, 0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 50%, transparent 80%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer2 5s infinite',
                  mixBlendMode: 'overlay'
                }}
              />

              <table className="w-full text-sm relative">
                <thead>
                  <tr
                    className="border-b border-gray-700/50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <th className="text-left py-3 px-4 text-gray-300 font-bold">Specification</th>
                    <th className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-blue-300 font-bold">Sol-Ark 12K</span>
                      </div>
                    </th>
                    <th className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <span className="text-orange-300 font-bold">Sol-Ark 15K</span>
                      </div>
                    </th>
                    <th className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                        <span className="text-orange-300 font-bold">Sol-Ark 30K (3-phase)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Power Output</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">12kW continuous</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">15kW continuous</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">30kW continuous</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Peak Surge (5 sec)</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">20kW</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">23kW</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">46kW</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Max PV Input</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">19.5kW</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">19.5kW</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">39kW</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Battery Voltage Range</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">40-60VDC</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">40-60VDC</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">120-500VDC</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Max Charge Current</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">215A</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">275A</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">200A</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Grid-Tie Efficiency</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">97.6% CEC</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">97.5% CEC</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">97.2% CEC</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Transfer Time</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">&lt;4ms UPS</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">&lt;4ms UPS</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">&lt;10ms</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Warranty</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">10 years std</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">10 years std</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">10 years std</td>
                </tr>
                <tr className="bg-gray-900/40">
                  <td className="py-3 px-4 text-white font-semibold">Typical Application</td>
                  <td className="text-center py-3 px-4 text-blue-300">3-5BR homes</td>
                  <td className="text-center py-3 px-4 text-orange-300">5BR+/Estate</td>
                  <td className="text-center py-3 px-4 text-orange-300">Commercial</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Battery Technology Comparison */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <Battery className="mr-3 h-6 w-6 text-orange-400" />
            </motion.div>
            LiFePO4 Battery Selection Guide
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "SimpliPhi PHI 3.8", capacity: "3.8kWh @ 100% DoD", voltage: "51.2V nominal", discharge: "150A continuous", efficiency: "96% efficiency", cycles: "10,000 @ 80% DoD", weight: "82 lbs", warranty: "10 years", ideal: "Ideal for: Modular expansion, critical loads backup", gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", borderColor: "border-blue-500/30" },
              { name: "Fortress eVault Max", capacity: "18.5kWh @ 100% DoD", voltage: "51.2V nominal", discharge: "200A continuous", efficiency: "95% efficiency", cycles: "6,000 @ 80% DoD", weight: "408 lbs", warranty: "10 years", ideal: "Ideal for: Whole-home backup, TOU arbitrage", gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/30" },
              { name: "EG4 LifePower4", capacity: "14.3kWh @ 95% DoD", voltage: "51.2V nominal", discharge: "200A continuous", efficiency: "95% efficiency", cycles: "8,000 @ 80% DoD", weight: "330 lbs", warranty: "10 years", ideal: "Ideal for: Budget-conscious, server rack mount", gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/30" }
            ].map((battery, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                  style={{
                    background: battery.glowColor,
                    animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                  }}
                />

                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${battery.gradient} rounded-xl p-6 border ${battery.borderColor} overflow-hidden`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {/* Glass overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
                    }}
                  />

                  {/* Shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)',
                      backgroundSize: '200% 100%',
                      animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                      mixBlendMode: 'overlay'
                    }}
                  />

                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white mb-4 drop-shadow-md">{battery.name}</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/80">Capacity:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Voltage:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.voltage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Max Discharge:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.discharge}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Round-Trip:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.efficiency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Cycles:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.cycles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Weight:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Warranty:</span>
                        <span className="text-white font-mono font-semibold drop-shadow-sm">{battery.warranty}</span>
                      </div>
                      <div className="pt-3 border-t border-white/20">
                        <p className="text-white/90 text-sm drop-shadow-sm">{battery.ideal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solar Panel Technology */}
        <div className="card-elite glow-gold p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Sun className="mr-3 h-6 w-6 text-yellow-400" />
            Premium Solar Panel Technology Comparison
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">REC Alpha Pure-RX 470W</h4>
              <div className="bg-black/30 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Technology:</span>
                  <span className="text-yellow-300 font-mono">HJT N-Type</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-yellow-300 font-mono">22.6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Degradation:</span>
                  <span className="text-yellow-300 font-mono">0.25%/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Temp Coefficient:</span>
                  <span className="text-yellow-300 font-mono">-0.24%/°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-yellow-300 font-mono">25yr product/92% power</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">QCells Q.TRON BLK M-G2+ 480W</h4>
              <div className="bg-black/30 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Technology:</span>
                  <span className="text-yellow-300 font-mono">Q.ANTUM NEO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-yellow-300 font-mono">21.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Degradation:</span>
                  <span className="text-yellow-300 font-mono">0.45%/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Temp Coefficient:</span>
                  <span className="text-yellow-300 font-mono">-0.30%/°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-yellow-300 font-mono">25yr product/86% power</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* ROI Analysis Section - NEW */}
      <ContentSection
        title="NEM 3.0 Financial Modeling & ROI Analysis"
        subtitle="Real-World Case Studies"
        description="Comprehensive financial analysis with actual customer data from Northern California installations"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="card-elite glow-green p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <DollarSign className="mr-3 h-6 w-6 text-orange-400" />
            Case Study: 4BR Redding Home (2,400 sq ft)
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="spec-card-elite glow-green p-6">
              <h4 className="text-lg font-semibold text-orange-400 mb-4">System Configuration</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Solar Array:</span>
                  <span className="font-mono text-orange-300">9.6kW (20×480W)</span>
                </li>
                <li className="flex justify-between">
                  <span>Inverter:</span>
                  <span className="font-mono text-orange-300">Sol-Ark 15K</span>
                </li>
                <li className="flex justify-between">
                  <span>Battery:</span>
                  <span className="font-mono text-orange-300">15.2kWh (4×PHI 3.8)</span>
                </li>
                <li className="flex justify-between">
                  <span>Install Date:</span>
                  <span className="font-mono text-orange-300">Oct 2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Gross Cost:</span>
                  <span className="font-mono text-orange-300">$42,000</span>
                </li>
              </ul>
            </div>

            <div className="spec-card-elite glow-blue p-6">
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Incentives & Credits</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>ITC 30%:</span>
                  <span className="font-mono text-blue-300">-$12,600</span>
                </li>
                <li className="flex justify-between">
                  <span>SGIP General:</span>
                  <span className="font-mono text-blue-300">-$3,800</span>
                </li>
                <li className="flex justify-between">
                  <span>PG&E Rebate:</span>
                  <span className="font-mono text-blue-300">-$500</span>
                </li>
                <li className="flex justify-between">
                  <span>Net Cost:</span>
                  <span className="font-mono text-blue-300">$25,100</span>
                </li>
                <li className="flex justify-between">
                  <span>Finance APR:</span>
                  <span className="font-mono text-blue-300">4.99% / 12yr</span>
                </li>
              </ul>
            </div>

            <div className="spec-card-elite glow-gold p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Monthly Performance</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Prev Bill:</span>
                  <span className="font-mono text-red-300">$385/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>New Bill:</span>
                  <span className="font-mono text-orange-300">$28/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Loan Payment:</span>
                  <span className="font-mono text-yellow-300">$235/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Net Savings:</span>
                  <span className="font-mono text-orange-300">$122/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Payback:</span>
                  <span className="font-mono text-orange-300">6.1 years</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-black/30 rounded-lg p-4">
            <h5 className="text-orange-300 font-semibold mb-2">20-Year Financial Projection</h5>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Total Energy Savings:</span>
                <div className="text-2xl font-bold text-orange-400 font-mono">$112,400</div>
              </div>
              <div>
                <span className="text-gray-400">Total System Cost:</span>
                <div className="text-2xl font-bold text-yellow-400 font-mono">$31,220</div>
              </div>
              <div>
                <span className="text-gray-400">Net Profit:</span>
                <div className="text-2xl font-bold text-orange-400 font-mono">$81,180</div>
              </div>
              <div>
                <span className="text-gray-400">IRR:</span>
                <div className="text-2xl font-bold text-blue-400 font-mono">14.2%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Financing Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card-elite glow-green p-6">
            <h4 className="text-xl font-bold text-white mb-4">Cash Purchase</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Upfront Cost:</span>
                <span className="text-orange-300 font-mono">$25,100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Savings:</span>
                <span className="text-orange-300 font-mono">$357</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payback:</span>
                <span className="text-orange-300 font-mono">5.9 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">20-Year ROI:</span>
                <span className="text-orange-300 font-mono">324%</span>
              </div>
            </div>
          </div>

          <div className="card-elite glow-blue p-6">
            <h4 className="text-xl font-bold text-white mb-4">Solar Loan (4.99%)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Down Payment:</span>
                <span className="text-yellow-300 font-mono">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Payment:</span>
                <span className="text-yellow-300 font-mono">$235</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Net Savings/mo:</span>
                <span className="text-yellow-300 font-mono">$122</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">20-Year ROI:</span>
                <span className="text-yellow-300 font-mono">260%</span>
              </div>
            </div>
          </div>

          <div className="card-elite glow-orange p-6">
            <h4 className="text-xl font-bold text-white mb-4">PACE Financing</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Property Tax:</span>
                <span className="text-orange-300 font-mono">+$208/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Term:</span>
                <span className="text-orange-300 font-mono">20 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Net Savings/mo:</span>
                <span className="text-orange-300 font-mono">$149</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transferable:</span>
                <span className="text-orange-300 font-mono">Yes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Independence Calculator */}
        <div className="card-elite glow-orange p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <LineChart className="mr-3 h-6 w-6 text-orange-400" />
            Self-Sufficiency Analysis
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Energy Flow (Annual)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Solar Production:</span>
                  <div className="flex-1 mx-4 bg-gray-700 rounded-full h-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600" style={{width: '100%'}}></div>
                  </div>
                  <span className="font-mono text-yellow-300">14,400 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Home Consumption:</span>
                  <div className="flex-1 mx-4 bg-gray-700 rounded-full h-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600" style={{width: '83%'}}></div>
                  </div>
                  <span className="font-mono text-blue-300">12,000 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Grid Import:</span>
                  <div className="flex-1 mx-4 bg-gray-700 rounded-full h-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600" style={{width: '15%'}}></div>
                  </div>
                  <span className="font-mono text-red-300">1,800 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Grid Export:</span>
                  <div className="flex-1 mx-4 bg-gray-700 rounded-full h-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600" style={{width: '20%'}}></div>
                  </div>
                  <span className="font-mono text-orange-300">2,400 kWh</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Key Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Self-Sufficiency</div>
                  <div className="text-2xl font-bold text-orange-400">85%</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Solar Fraction</div>
                  <div className="text-2xl font-bold text-blue-400">92%</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Peak Offset</div>
                  <div className="text-2xl font-bold text-orange-400">100%</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Backup Days</div>
                  <div className="text-2xl font-bold text-orange-400">1.2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Team Work Image 3 */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={batteryStorageImg}
            alt="LiFePO4 battery storage system installation for residential solar"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-residential-solar-3"
          />
        </div>
      </div>

      {/* SGIP Incentive Breakdown - Enhanced */}
      <ContentSection
        title="SGIP Battery Incentive Program: Complete Guide"
        subtitle="California Self-Generation Incentive Program"
        description="Comprehensive guide to SGIP rebate tiers, eligibility requirements, and application strategy for battery energy storage systems."
        backgroundColor="bg-gray-900"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Equity Budget", rate: "$1,000/kWh", max: "Up to $1,000,000 per project", eligibility: ["CARE/FERA utility customers", "Tribal lands installations", "Affordable housing properties", "Environmental justice communities"], note: "Priority application processing", gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/30", icon: Award },
            { title: "Equity Resiliency", rate: "$1,000/kWh", max: "Plus resiliency adder", eligibility: ["Tier 2/3 PSPS fire zones (Shasta County qualifies)", "Medical baseline customers", "Critical need verification", "Must demonstrate resiliency benefit"], note: "Highest rebate tier available", gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", borderColor: "border-blue-500/30", icon: Shield },
            { title: "General Market", rate: "$200-300/kWh", max: "Step-down schedule applies", eligibility: ["Standard residential customers", "Commercial/industrial facilities", "Agricultural operations", "No special qualification needed"], note: "Still 20-30% cost offset", gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", borderColor: "border-green-500/30", icon: CircleDollarSign }
          ].map((tier, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                style={{
                  background: tier.glowColor,
                  animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                }}
              />

              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${tier.gradient} rounded-xl p-6 border ${tier.borderColor} overflow-hidden`}
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                }}
              >
                {/* Glass overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
                  }}
                />

                {/* Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                    mixBlendMode: 'overlay'
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="p-3 bg-black/30 backdrop-blur-md rounded-xl shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <tier.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{tier.title}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{tier.rate}</div>
                    <div className="text-sm text-white/80 drop-shadow-sm">{tier.max}</div>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <p className="font-semibold drop-shadow-sm"><strong>Eligibility:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2 drop-shadow-sm">
                      {tier.eligibility.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-white font-semibold drop-shadow-md">{tier.note}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card-elite glow-orange p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FileCheck className="mr-3 h-6 w-6 text-orange-400" />
            SGIP Application Strategy & Timeline
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Required Documentation</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Interconnection Agreement (PG&E Rule 21)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Battery system specification sheets (kWh capacity, power rating)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Installer C-46 contractor license verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Proof of utility account (for Equity tiers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>PSPS zone verification (for Resiliency tier)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
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
                  <div className="bg-orange-500/20 rounded-full px-3 py-1 text-sm font-semibold text-orange-400">Week 11-24</div>
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
          <div className="card-elite glow-blue p-8">
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

          <div className="card-elite glow-green p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FileCheck className="mr-3 h-6 w-6 text-orange-400" />
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

        <div className="mt-8 alert-elite">
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
              desc: "Roof structural analysis, shading study, electrical panel evaluation, PG&E meter verification",
              gradient: "from-blue-500 via-cyan-500 to-blue-600",
              glowColor: "rgba(59, 130, 246, 0.5)"
            },
            {
              step: "2",
              title: "Engineering & Permitting",
              desc: "AutoCAD system design, Title 24 compliance, structural PE stamp, Rule 21 interconnection application",
              gradient: "from-orange-500 via-amber-500 to-orange-600",
              glowColor: "rgba(249, 115, 22, 0.5)"
            },
            {
              step: "3",
              title: "Professional Installation",
              desc: "C-46 licensed crew, code-compliant mounting, inverter/battery integration, final inspection",
              gradient: "from-green-500 via-emerald-500 to-green-600",
              glowColor: "rgba(34, 197, 94, 0.5)"
            },
            {
              step: "4",
              title: "PTO & Monitoring",
              desc: "PG&E permission to operate, monitoring platform setup, load-shifting optimization, SGIP claim submission",
              gradient: "from-orange-500 via-amber-500 to-orange-600",
              glowColor: "rgba(249, 115, 22, 0.5)"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              {/* Glow effect on number badge */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: item.glowColor,
                  animation: `pulse ${2 + index * 0.3}s ease-in-out infinite`
                }}
              />

              <motion.div
                className="relative w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{
                  background: `linear-gradient(135deg, ${item.gradient})`,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Glass overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
                  }}
                />

                {/* Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    animation: `shimmer${index + 1} ${3 + index * 0.5}s infinite`,
                    mixBlendMode: 'overlay'
                  }}
                />

                <span className="relative z-10 text-white drop-shadow-lg">{item.step}</span>
              </motion.div>

              <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Team Work Image 4 */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={completedInstallationImg}
            alt="Completed residential solar installation by Advance Power Redding team"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-residential-solar-4"
          />
        </div>
      </div>

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-orange-500/30 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Request Technical Consultation</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-firstName" />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-lastName" />
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-city" />
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
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-state" />
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
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-zipCode" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700" data-testid="input-propertyType" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} className="bg-gray-800 border-gray-700" rows={3} data-testid="input-additionalComments" />
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
