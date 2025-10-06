import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CommercialSolarWaveHero from "@/components/CommercialSolarWaveHero";
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
  Factory,
  Calculator,
  ChartBar,
  Settings,
  Building2,
  CheckCircle,
  CircleDollarSign,
  AlertTriangle,
  Battery,
  Network,
  Award,
  Clock,
  FileText,
  BarChart3,
  Gauge,
  Activity,
  Server,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Layers,
  Monitor,
  LineChart,
  PieChart,
  TrendingDown,
  Briefcase,
  Package,
  Truck,
  Warehouse,
  ShoppingCart,
  Home,
  Heart,
  Lightbulb
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";
import { motion } from "framer-motion";

import PageHeroSection from "@/components/sections/PageHeroSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ContentSection from "@/components/sections/ContentSection";
import ServiceCard from "@/components/cards/ServiceCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { AwardBadge } from "@/components/ui/award-badge";

const commercialConsultationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  industry: z.string().optional(),
  monthlyUsage: z.string().optional(),
  peakDemand: z.string().optional(),
  message: z.string().optional()
});

type CommercialSolarFormValues = z.infer<typeof commercialConsultationSchema>;

const CommercialSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();
  
  const pageTitle = "Commercial Solar + Storage | Sol-Ark 30K/60K Three-Phase Systems";
  const pageDescription = "Enterprise-grade 3-phase solar + battery systems for California businesses. Sol-Ark 30K/60K inverters, SGIP incentives, demand charge reduction, CPUC Rule 21 Fast Track interconnection. ITC + Bonus Depreciation ROI modeling.";

  const form = useForm<CommercialSolarFormValues>({
    resolver: zodResolver(commercialConsultationSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      monthlyUsage: "",
      peakDemand: "",
      message: ""
    }
  });

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

  const commercialFunnelStages = [
    {
      id: 'discovery',
      title: 'Energy Audit & Analysis',
      description: 'Comprehensive utility rate analysis (B-10, B-19, B-20, E-19 TOU), demand charge profiling, and 12-month consumption pattern review for optimal system sizing.',
      status: 'completed' as const,
      color: 'red' as const,
      icon: <ChartBar className='h-6 w-6' />,
      metrics: [
        { label: 'Avg. Demand Charge', value: '35%' },
        { label: 'Cost/Bill', value: '$0.28/kWh' },
      ],
    },
    {
      id: 'design',
      title: 'System Design & Engineering',
      description: 'Sol-Ark 30K/60K three-phase inverter specification, CPUC Rule 21 compliance review, single-line diagrams, and PE-stamped structural calculations.',
      status: 'active' as const,
      color: 'yellow' as const,
      icon: <Settings className='h-6 w-6' />,
      metrics: [
        { label: 'Fast Track', value: '<1MW' },
        { label: 'Avg. System', value: '250kW' },
      ],
    },
    {
      id: 'financial',
      title: 'Financial Modeling & Incentives',
      description: '30% ITC calculation, 100% Year 1 Bonus Depreciation modeling, SGIP battery rebates ($200-350/kWh), and demand charge avoidance ROI analysis.',
      status: 'upcoming' as const,
      color: 'green' as const,
      icon: <Calculator className='h-6 w-6' />,
      metrics: [
        { label: 'ITC Credit', value: '30%' },
        { label: 'Yr 1 Depr.', value: '100%' },
      ],
    },
    {
      id: 'installation',
      title: 'Interconnection & Commissioning',
      description: 'PG&E Rule 21 application, utility NEM 3.0 enrollment, CANbus battery integration, three-phase switchgear installation, and final PTO activation.',
      status: 'upcoming' as const,
      color: 'purple' as const,
      icon: <Network className='h-6 w-6' />,
      metrics: [
        { label: 'Interconnect', value: '90-120d' },
        { label: 'Uptime SLA', value: '99.5%' },
      ],
    },
  ];

  const commercialFeatures = [
    {
      icon: Zap,
      title: "Sol-Ark 30K/60K Three-Phase Inverters",
      description: "30kW/60kW 3-phase commercial inverters with up to 90kW PV input, integrated grid-tie + battery management, and CANbus HV battery communication.",
      highlight: true
    },
    {
      icon: Battery,
      title: "SGIP-Qualified Battery Storage",
      description: "High-voltage battery systems ($200-350/kWh rebates) for demand charge reduction, peak shaving, and Equity Resiliency incentive eligibility.",
      highlight: false
    },
    {
      icon: Network,
      title: "CPUC Rule 21 Fast Track",
      description: "Systems &lt;1MW qualify for expedited interconnection review. Our team handles all PG&E/REU utility applications and NEM 3.0 enrollment.",
      highlight: false
    },
    {
      icon: DollarSign,
      title: "Demand Charge Optimization",
      description: "Advanced battery dispatch algorithms reduce peak demand charges on B-10, B-19, B-20, and E-19 TOU rate schedules by 40-60%.",
      highlight: true
    },
    {
      icon: Calculator,
      title: "30% ITC + 100% Bonus Depreciation",
      description: "Federal Investment Tax Credit (30%) plus 100% Year 1 Bonus Depreciation on solar + battery systems. Typical 3.5-5 year payback for commercial.",
      highlight: false
    },
    {
      icon: Shield,
      title: "25-Year Performance Warranty",
      description: "Tier-1 solar panels (85% output @ 25 years), Sol-Ark 12-year inverter warranty, and 10-year battery performance guarantees.",
      highlight: false
    }
  ];

  const rateStructures = [
    {
      icon: Building2,
      title: "PG&E B-10 (Secondary)",
      description: "Facilities &lt;500kW with demand charges $12-18/kW. Battery storage reduces peak demand and on-peak energy consumption ($0.30-0.35/kWh)."
    },
    {
      icon: Factory,
      title: "PG&E B-19 (Medium)",
      description: "Medium commercial (500kW-999kW) with demand charges up to $22/kW. TOU differentials create strong arbitrage opportunities for battery dispatch."
    },
    {
      icon: Building,
      title: "PG&E B-20 (Primary)",
      description: "Large facilities >1MW on primary voltage. Demand charges $15-20/kW plus voltage level discount. Rule 21 Supplemental Review required."
    },
    {
      icon: Gauge,
      title: "PG&E E-19 TOU (Secondary)",
      description: "Time-of-use rate for medium customers. Peak period demand charges (12-6pm summer) create maximum savings potential with solar + storage."
    }
  ];

  const commercialStats = [
    {
      value: "40-60",
      suffix: "%",
      label: "Demand Charge Reduction",
      icon: TrendingUp
    },
    {
      value: "3.5-5",
      label: "Year Payback (ITC+Depr)",
      icon: DollarSign
    },
    {
      value: "1MW",
      suffix: "",
      label: "Rule 21 Fast Track Limit",
      icon: Network
    },
    {
      value: "30",
      suffix: "%",
      label: "Federal ITC Credit",
      icon: Calculator
    }
  ];

  const commercialTestimonials = [
    {
      quote: "Our 450kW Sol-Ark system reduced monthly demand charges from $18,000 to $7,200. The ITC and bonus depreciation delivered a 4.2-year payback. Best capital allocation decision we've made.",
      author: "David Park",
      role: "CFO",
      company: "NorCal Cold Storage",
      rating: 5
    },
    {
      quote: "Advance Power navigated the entire CPUC Rule 21 Fast Track process with PG&E. System was interconnected in 105 days and we're now on E-19 TOU with SGIP battery credits.",
      author: "Maria Gonzalez",
      role: "Facilities Director",
      company: "Shasta Regional Medical",
      rating: 5
    },
    {
      quote: "The demand charge optimization on our B-19 rate schedule saves us $4,800/month. The battery dispatch algorithm is incredibly sophisticated—it learns our load patterns.",
      author: "James Mitchell",
      role: "Operations VP",
      company: "Redding Manufacturing Group",
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
      
      {/* Commercial Solar Wave Hero Section */}
      <CommercialSolarWaveHero 
        tagline="Next-Gen Energy Solutions"
        title="Commercial Solar Installation"
        subtitle="Transform your business with enterprise-grade solar solutions. Our advanced commercial systems deliver maximum ROI, reduce operational costs, and establish your company as a sustainability leader."
        stats={[
          { value: "500+", label: "Businesses Served" },
          { value: "40-60%", label: "Peak Reduction" },
          { value: "1.9yr", label: "Payback Period" }
        ]}
      />

      {/* Excellence Award Badge */}
      <div className="flex justify-center py-12 bg-gradient-to-b from-slate-950 to-gray-900">
        <AwardBadge type="customer-service-excellence" />
      </div>

      {/* Color-Coded Commercial Solar Funnel (RED → YELLOW → GREEN → PURPLE) */}
      <SolarRescueTimelineSection
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        stages={[
          {
            id: 'problem-red',
            title: 'Demand Charge Crisis & Peak Load Problems',
            description: 'California businesses suffer $8,000-$18,000/month demand charges on TOU-8 rates. Aging inverters fail during critical production hours. Grid instability threatens operations in Tier 3 wildfire zones.',
            color: 'from-red-500 to-red-600',
            glowColor: 'rgba(239, 68, 68, 0.5)',
            icon: <AlertTriangle className='h-8 w-8' />,
            metrics: 'Demand Charges: $8K-$18K/mo',
          },
          {
            id: 'intel-yellow',
            title: 'Three-Phase Engineering & SOLARK 30K/60K Sizing',
            description: 'Commercial-grade site analysis with SOLARK 30K/60K three-phase inverter specifications, 480V integration, demand charge optimization modeling, CPUC Rule 21 Fast Track qualification, and SGIP commercial incentive application.',
            color: 'from-yellow-500 to-yellow-600',
            glowColor: 'rgba(234, 179, 8, 0.5)',
            icon: <Factory className='h-8 w-8' />,
            metrics: 'SOLARK 30K/60K: 99 PF',
          },
          {
            id: 'roi-green',
            title: 'ITC + Bonus Depreciation ROI Modeling',
            description: '30% Federal ITC combined with 60% Bonus Depreciation (2024) delivers 4.2-year payback. Peak shaving algorithms reduce demand charges by 60%. SGIP commercial battery incentives ($200-$300/kWh) further accelerate ROI.',
            color: 'from-green-500 to-green-600',
            glowColor: 'rgba(34, 197, 94, 0.5)',
            icon: <TrendingUp className='h-8 w-8' />,
            metrics: 'ITC 30% + Depreciation 60%',
          },
          {
            id: 'action-purple',
            title: 'Fast Track Interconnection & Commissioning',
            description: 'CPUC Rule 21 Fast Track approval (systems <1MW), SOLARK 30K/60K deployment with UL 1741-SA certification, utility PTO coordination, commissioning with load management programming, and ongoing demand charge optimization.',
            color: 'from-purple-500 to-purple-600',
            glowColor: 'rgba(168, 85, 247, 0.5)',
            icon: <CheckCircle className='h-8 w-8' />,
            metrics: 'Fast Track: <1MW Systems',
          },
        ]}
      />

      <section id="inverters" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sol-Ark 30K/60K Commercial Inverter Specifications
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Three-phase commercial inverters designed for demand charge reduction and peak load management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-elite glow-blue p-8">
              <div className="flex items-center mb-6">
                <div className="icon-container-elite bg-blue-500/20">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-blue-400">Sol-Ark 30K</h3>
                  <p className="text-gray-400">30kW Three-Phase Commercial</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="data-row-elite">
                  <span className="text-gray-400">AC Output Power:</span>
                  <span className="text-white font-semibold">30kW (208/240/277/480V)</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Max PV Input:</span>
                  <span className="text-white font-semibold">45kW (150% DC/AC ratio)</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Battery Voltage:</span>
                  <span className="text-white font-semibold">400-800VDC CANbus HV</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-semibold">98.2% CEC Weighted</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Grid Code:</span>
                  <span className="text-white font-semibold">UL 1741-SA Rule 21</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white font-semibold">12 years standard</span>
                </div>
              </div>

              <div className="badge-elite-metallic badge-electric mt-6">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span>Ideal For: 100-200kW commercial systems, multi-inverter parallel configuration, B-10/E-19 rate schedules</span>
              </div>
            </div>

            <div className="card-elite glow-purple p-8">
              <div className="flex items-center mb-6">
                <div className="icon-container-elite bg-purple-500/20">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-purple-400">Sol-Ark 60K</h3>
                  <p className="text-gray-400">60kW Three-Phase Commercial</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="data-row-elite">
                  <span className="text-gray-400">AC Output Power:</span>
                  <span className="text-white font-semibold">60kW (208/240/277/480V)</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Max PV Input:</span>
                  <span className="text-white font-semibold">90kW (150% DC/AC ratio)</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Battery Voltage:</span>
                  <span className="text-white font-semibold">400-800VDC CANbus HV</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-semibold">98.5% CEC Weighted</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Grid Code:</span>
                  <span className="text-white font-semibold">UL 1741-SA Rule 21</span>
                </div>
                <div className="data-row-elite">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white font-semibold">12 years standard</span>
                </div>
              </div>

              <div className="badge-elite-metallic badge-premium mt-6">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                <span>Ideal For: 250kW-1MW systems, B-19/B-20 facilities, high-demand manufacturing/cold storage</span>
              </div>
            </div>
          </div>

          <div className="mt-12 card-elite glow-orange p-8">
            <h4 className="text-2xl font-bold text-orange-400 mb-6">CANbus Battery Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">Supported Battery Systems</h5>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> BYD Battery-Box Commercial</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Simpliphi AccESS HV</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Pytes E-Box Commercial</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> EG4 Commercial Series</li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">Battery Sizing Guidelines</h5>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong className="text-blue-400">Demand Charge Avoidance:</strong> 2-4 hour capacity @ peak demand</li>
                  <li><strong className="text-blue-400">SGIP Eligibility:</strong> Min. 1 hour usable capacity required</li>
                  <li><strong className="text-blue-400">Peak Shaving:</strong> Size to 60-80% of peak demand (kW)</li>
                  <li><strong className="text-blue-400">Backup Power:</strong> Critical load × desired runtime hours</li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">SGIP Rebate Calculator</h5>
                <div className="space-y-3">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                    <p className="text-xs text-green-300 mb-1">Standard Rebate</p>
                    <p className="text-xl font-bold text-green-400">$200/kWh</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                    <p className="text-xs text-blue-300 mb-1">Equity Resiliency</p>
                    <p className="text-xl font-bold text-blue-400">$850-$1,000/kWh</p>
                  </div>
                  <p className="text-xs text-gray-400">200kWh system = $40K-200K SGIP credit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              California Commercial Rate Structures
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Understanding PG&E demand charges and time-of-use rates for optimal solar + battery system design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {rateStructures.map((rate, index) => (
              <div key={index} className="card-elite glow-orange p-6">
                <div className="flex items-start mb-4">
                  <div className="icon-container-elite bg-orange-500/20 mr-4 flex-shrink-0">
                    <rate.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{rate.title}</h3>
                    <p className="text-sm text-gray-300">{rate.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-elite glow-red p-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-6">Demand Charge Optimization Strategies</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">How Demand Charges Work</h4>
                <p className="text-gray-300 mb-4 text-sm">
                  Demand charges are based on your <strong>peak 15-minute average power consumption</strong> during the billing period, 
                  typically measured in kW. On B-19 schedules, this can be $18-22/kW—meaning a single 500kW demand spike costs $9,000-11,000/month.
                </p>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-red-300 text-sm font-semibold">Example Without Solar + Battery:</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Manufacturing facility on B-19: Peak demand = 450kW<br/>
                    Demand charge: 450kW × $20/kW = <span className="text-red-400 font-bold">$9,000/month</span><br/>
                    Annual demand charges: <span className="text-red-400 font-bold">$108,000</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Battery Demand Charge Reduction</h4>
                <p className="text-gray-300 mb-4 text-sm">
                  Battery systems dispatch stored energy during peak demand periods, "shaving" your peak load to reduce demand charges 
                  by 40-60%. Advanced algorithms forecast demand and optimize battery discharge timing.
                </p>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <p className="text-green-300 text-sm font-semibold">Example With Solar + 200kWh Battery:</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Peak demand reduced: 450kW → 250kW (200kW shaved)<br/>
                    New demand charge: 250kW × $20/kW = <span className="text-green-400 font-bold">$5,000/month</span><br/>
                    Annual savings: <span className="text-green-400 font-bold">$48,000</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="category-card-elite">
                <h5 className="text-white font-semibold mb-2 flex items-center">
                  <Activity className="h-5 w-5 text-blue-400 mr-2" />
                  Peak Shaving
                </h5>
                <p className="text-gray-300 text-sm">
                  Battery discharges during load peaks to reduce maximum demand registration. Ideal for facilities with predictable peak periods.
                </p>
              </div>

              <div className="category-card-elite">
                <h5 className="text-white font-semibold mb-2 flex items-center">
                  <Clock className="h-5 w-5 text-orange-400 mr-2" />
                  TOU Arbitrage
                </h5>
                <p className="text-gray-300 text-sm">
                  Charge battery during off-peak periods ($0.12/kWh), discharge during on-peak ($0.35/kWh). Captures $0.23/kWh spread.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2 flex items-center">
                  <BarChart3 className="h-5 w-5 text-green-400 mr-2" />
                  Load Forecasting
                </h5>
                <p className="text-gray-300 text-sm">
                  ML algorithms predict demand spikes based on historical data, weather, and production schedules for optimal dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              CPUC Rule 21 Interconnection Process
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Fast Track vs Supplemental Review thresholds and timeline expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-700/30 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-green-400">Rule 21 Fast Track</h3>
                  <p className="text-gray-400">Expedited Process &lt;1MW</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Eligibility Criteria</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>System ≤1,000kW (1MW) nameplate AC capacity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Feeder capacity available (15% rule)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>UL 1741-SA certified inverters (Sol-Ark qualified)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No system modifications to utility infrastructure</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Application Review:</span>
                      <span className="text-green-400 font-semibold">20-30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Utility Study (if required):</span>
                      <span className="text-green-400 font-semibold">30-45 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Final PTO Authorization:</span>
                      <span className="text-green-400 font-semibold">10-15 days</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                      <span className="text-white font-semibold">Total Timeline:</span>
                      <span className="text-green-400 font-bold">60-90 days</span>
                    </div>
                  </div>
                </div>

                <p className="text-green-300 text-sm">
                  ✓ <strong>Advance Power Handled:</strong> Complete Fast Track application management, utility coordination, and NEM 3.0 enrollment included.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-orange-950/20 border border-orange-700/30 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-10 w-10 text-orange-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-orange-400">Supplemental Review</h3>
                  <p className="text-gray-400">Required for Systems &gt;1MW</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">When Required</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>System &gt;1,000kW nameplate capacity</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Feeder capacity constraints (failed 15% screen)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Utility infrastructure upgrades needed</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Primary voltage interconnection (B-20 rate)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Initial Review:</span>
                      <span className="text-orange-400 font-semibold">45-60 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Detailed Study:</span>
                      <span className="text-orange-400 font-semibold">90-120 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Utility Upgrades (if needed):</span>
                      <span className="text-orange-400 font-semibold">6-12 months</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                      <span className="text-white font-semibold">Total Timeline:</span>
                      <span className="text-orange-400 font-bold">6-18 months</span>
                    </div>
                  </div>
                </div>

                <p className="text-orange-300 text-sm">
                  ⚠ <strong>Study Costs:</strong> Supplemental Review requires utility impact studies ($5K-25K). Upgrade costs are negotiated separately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Three-Phase Interconnection Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Electrical Requirements</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Three-phase service (208V/240V/277V/480V)</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Main panel rated for backfeed capacity</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Dedicated AC disconnect (lockable)</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Ground fault protection (GFP) for {'>'} 1MW</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Metering & Monitoring</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Net Energy Metering (NEM 3.0) upgrade</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Bi-directional revenue-grade meter</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Real-time production monitoring</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Remote utility disconnect capability</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Documentation</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> PE-stamped single-line diagram</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Structural calculations (roof loading)</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Equipment certifications (UL 1741-SA)</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Site plan and setback compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection
        stats={commercialStats}
        title="Commercial Solar Performance Metrics"
        subtitle="Real-World Results"
        columns={4}
        variant="highlighted"
        accentColor="orange"
        backgroundColor="bg-gray-900"
      />

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Financial Modeling: ITC + Bonus Depreciation
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              30% Federal Investment Tax Credit plus 100% Year 1 Bonus Depreciation dramatically improves commercial solar ROI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-700/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-6">Federal Tax Incentives</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                    30% Investment Tax Credit (ITC)
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Direct federal tax credit equal to 30% of total project cost (solar + battery). Can offset corporate income tax liability.
                    Credit is non-refundable but can carry back 1 year or forward 20 years.
                  </p>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">System Cost:</span>
                        <span className="text-white font-semibold">$500,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ITC @ 30%:</span>
                        <span className="text-green-400 font-semibold">-$150,000</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-700 pt-2">
                        <span className="text-white font-semibold">Net Cost After ITC:</span>
                        <span className="text-white font-bold">$350,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Calculator className="h-5 w-5 text-blue-400 mr-2" />
                    100% Bonus Depreciation (Year 1)
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Allows businesses to deduct 100% of equipment cost in Year 1 (reduced to 80% in 2023, 60% in 2024 - install NOW).
                    Must reduce depreciable basis by 50% of ITC credit (85% remaining).
                  </p>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Original System Cost:</span>
                        <span className="text-white">$500,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ITC Basis Reduction (50% of ITC):</span>
                        <span className="text-orange-400">-$75,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Depreciable Basis:</span>
                        <span className="text-white font-semibold">$425,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bonus Depreciation (100%):</span>
                        <span className="text-white">$425,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax Savings @ 21% Corp Rate:</span>
                        <span className="text-blue-400 font-semibold">-$89,250</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                        <span className="text-white font-bold">Total Year 1 Tax Benefits:</span>
                        <span className="text-green-400 font-bold">$239,250</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-orange-950/20 border border-orange-700/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-orange-400 mb-6">Complete ROI Analysis</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4">500kW Commercial System</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">System Size:</span>
                      <span className="text-white">500kW solar + 200kWh battery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Installed Cost:</span>
                      <span className="text-white font-semibold">$500,000</span>
                    </div>
                    
                    <div className="border-t border-gray-700 my-3"></div>
                    <p className="text-orange-400 font-semibold">Year 1 Cash Flows:</p>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">30% ITC Credit:</span>
                      <span className="text-green-400">-$150,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bonus Depr. Tax Savings:</span>
                      <span className="text-green-400">-$89,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SGIP Battery Rebate:</span>
                      <span className="text-green-400">-$40,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Energy Cost Savings (Yr 1):</span>
                      <span className="text-green-400">-$75,000</span>
                    </div>
                    
                    <div className="border-t border-gray-700 my-3"></div>
                    <div className="flex justify-between text-base">
                      <span className="text-white font-bold">Total Year 1 Benefits:</span>
                      <span className="text-green-400 font-bold">$354,250</span>
                    </div>
                    
                    <div className="flex justify-between text-base">
                      <span className="text-white font-bold">Net Project Cost After Year 1:</span>
                      <span className="text-orange-400 font-bold">$145,750</span>
                    </div>

                    <div className="border-t border-gray-700 my-3"></div>
                    <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3 mt-4">
                      <div className="flex justify-between text-lg">
                        <span className="text-white font-bold">Payback Period:</span>
                        <span className="text-orange-400 font-bold">1.9 Years</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Based on $75K annual energy savings + demand charge reduction</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <h4 className="text-blue-400 font-semibold mb-3">10-Year Financial Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Energy Savings (10yr):</span>
                      <span className="text-green-400 font-semibold">$825,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Tax Benefits:</span>
                      <span className="text-green-400 font-semibold">$239,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SGIP Rebates:</span>
                      <span className="text-green-400 font-semibold">$40,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">System Cost:</span>
                      <span className="text-red-400">-$500,000</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 mt-2 text-base">
                      <span className="text-white font-bold">10-Year Net Benefit:</span>
                      <span className="text-green-400 font-bold">$604,250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-700/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Important Tax Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">ITC Requirements</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Must be placed in service by Dec 31, 2034 (30% rate)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Property must be owned by taxpayer (not leased)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Must have sufficient tax liability to use credit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>5-year recapture period (can't sell system early)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Depreciation Notes</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Bonus depreciation reduced to 60% in 2024, 40% in 2025</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Must reduce basis by 50% of ITC amount claimed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Fall back to MACRS 5-year if bonus expires</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Consult CPA for specific tax situation guidance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
              <p className="text-yellow-300 text-sm">
                <strong>⚠️ Tax Disclaimer:</strong> This analysis is for illustrative purposes only. Actual tax benefits depend on your specific 
                tax situation, entity structure, and tax liability. Consult with a qualified CPA or tax advisor to model your exact scenario. 
                Advance Power does not provide tax advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Commercial Clients Trust Advance Power
            </h2>
            <p className="text-lg text-gray-300">
              Real results from facility managers, CFOs, and operations directors across Northern California
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commercialTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Reduce Demand Charges and Energy Costs?"
        description="Schedule a comprehensive energy audit with detailed utility rate analysis, system design proposal, and complete financial modeling including ITC, bonus depreciation, and SGIP incentives."
        primaryButton={{
          text: "Request Energy Audit",
          onClick: () => setShowConsultationForm(true)
        }}
        secondaryButton={{
          text: "Download Commercial Guide",
          onClick: () => console.log("Download guide")
        }}
        accentColor="orange"
        backgroundColor="bg-gradient-to-br from-gray-900 via-black to-gray-900"
      />

      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Request Commercial Energy Audit</h3>
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
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Industry (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Manufacturing, Cold Storage, Medical" className="bg-gray-800 border-gray-700 text-white" />
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
                      <FormLabel className="text-gray-300">Average Monthly kWh (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 50000" className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="peakDemand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Peak Demand (kW) - Optional</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 450" className="bg-gray-800 border-gray-700 text-white" />
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
                          rows={3}
                          placeholder="Current PG&E rate schedule, demand charge concerns, etc."
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
