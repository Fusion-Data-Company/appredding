import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import HybridSolarWaveHero from "@/components/HybridSolarWaveHero";
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
  Home,
  AlertTriangle,
  TrendingUp,
  Activity,
  Cpu,
  Network,
  Server,
  HardDrive,
  Wifi,
  WifiOff,
  CircuitBoard,
  Gauge,
  Layers,
  GitBranch,
  ToggleLeft,
  ToggleRight,
  Timer,
  Cloud,
  CloudOff,
  Fuel,
  Wind,
  MapPin,
  ThermometerSun,
  Monitor,
  Database,
  DollarSign,
  Calculator,
  LineChart,
  PieChart,
  BarChart3,
  FileCheck,
  ChevronRight,
  ArrowRight,
  Award
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
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";
import ContentSection from "@/components/sections/ContentSection";

type HybridSolarFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const HybridSolar = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();

  const pageTitle = "Hybrid Solar Systems | Grid-Tie + Off-Grid Backup | Sol-Ark Inverters";
  const pageDescription = "Advanced hybrid solar systems with seamless grid-tie to off-grid transition. Sol-Ark 12K/15K inverters, AC/DC coupling, critical load panels, PSPS protection. &lt;10ms transfer time for uninterrupted power.";

  const form = useForm<HybridSolarFormValues>({
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
    mutationFn: async (data: HybridSolarFormValues) => {
      return await apiRequest("POST", "/api/hybrid-solar/consultation", data);
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

  const onSubmit = (data: HybridSolarFormValues) => {
    consultationMutation.mutate(data);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hybrid Solar System Installation",
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

      {/* Hybrid Solar Wave Hero Section */}
      <HybridSolarWaveHero 
        tagline="Next-Gen Energy Solutions"
        title="Hybrid Solar"
        subtitle="Revolutionary hybrid solar systems with seamless grid-tie to off-grid transition. Sol-Ark inverters provide <10ms transfer time for uninterrupted power during PSPS events and grid outages."
        stats={[
          { value: "<10ms", label: "Transfer Time" },
          { value: "UL 1741-SA", label: "Certified" },
          { value: "25+", label: "Years Experience" }
        ]}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-mesh py-12">
        {/* PSPS/Grid Failure Alert */}
        <div className="alert-elite">
          <div className="flex items-center gap-3">
            <WifiOff className="h-6 w-6 text-orange-400 animate-pulse" />
            <div className="flex-1">
              <p className="text-orange-300 font-semibold">CRITICAL: California PSPS Events Increasing 300% Year-Over-Year</p>
              <p className="text-gray-400 text-sm mt-1">Tier 2/3 fire zones experience 48-72 hour power shutoffs • Grid-tied solar provides ZERO backup without batteries</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <GitBranch className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Grid-Tie + Off-Grid • Seamless Transfer • UL 1741-SA</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Hybrid Solar + Battery Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto mb-4">
              True energy independence with Sol-Ark hybrid inverters — seamlessly switch from grid-tie to off-grid in &lt;10ms
            </p>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-8">
              AC/DC coupled architecture • Critical load panels • Generator integration • PSPS protection for Tier 2/3 wildfire zones
            </p>

            {/* Live System Status Bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
              <div className="status-badge-elite">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">Grid Status:</span>
                <span className="text-green-400 font-mono">Connected</span>
              </div>
              <div className="status-badge-elite">
                <Battery className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-400">Battery SOC:</span>
                <span className="text-yellow-400 font-mono">85%</span>
              </div>
              <div className="status-badge-elite">
                <Sun className="h-4 w-4 text-orange-400" />
                <span className="text-gray-400">Solar Production:</span>
                <span className="text-orange-400 font-mono">8.5kW</span>
              </div>
              <div className="status-badge-elite">
                <Timer className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Transfer Time:</span>
                <span className="text-blue-400 font-mono">&lt;10ms</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                onClick={() => setShowConsultationForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all"
              >
                <Power className="mr-2 h-5 w-5" />
                Get Grid Independence Assessment
              </Button>
              <Button
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => document.getElementById('system-architecture')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <CircuitBoard className="mr-2 h-5 w-5" />
                View System Architecture
              </Button>
            </div>
          </div>

          {/* Enhanced Technical Specifications Grid */}
          <div className="grid lg:grid-cols-4 gap-4 mb-12">
            <div className="spec-card-elite glow-green group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-green-500/20 group-hover:bg-green-500/30">
                  <Cpu className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Sol-Ark Hybrid</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Model:</span>
                  <span className="text-green-300 font-mono">12K/15K</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Grid-Tie:</span>
                  <span className="text-green-300 font-mono">12/15kW</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Off-Grid:</span>
                  <span className="text-green-300 font-mono">9/12kW</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Surge:</span>
                  <span className="text-green-300 font-mono">20/23kW</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Transfer:</span>
                  <span className="text-green-300 font-mono">&lt;4ms UPS</span>
                </div>
              </div>
            </div>

            <div className="spec-card-elite glow-blue group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-blue-500/20 group-hover:bg-blue-500/30">
                  <ToggleRight className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Auto Transfer</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Detection:</span>
                  <span className="text-blue-300 font-mono">&lt;100ms</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Switch:</span>
                  <span className="text-blue-300 font-mono">&lt;10ms</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Mode:</span>
                  <span className="text-blue-300 font-mono">Seamless</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Priority:</span>
                  <span className="text-blue-300 font-mono">Critical</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Gen Start:</span>
                  <span className="text-blue-300 font-mono">Auto AGS</span>
                </div>
              </div>
            </div>

            <div className="spec-card-elite glow-orange group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-orange-500/20 group-hover:bg-orange-500/30">
                  <HardDrive className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Battery Backup</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Capacity:</span>
                  <span className="text-orange-300 font-mono">15-30kWh</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Chemistry:</span>
                  <span className="text-orange-300 font-mono">LiFePO4</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Runtime:</span>
                  <span className="text-orange-300 font-mono">8-24hrs</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-orange-300 font-mono">6000+</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-orange-300 font-mono">10 years</span>
                </div>
              </div>
            </div>

            <div className="spec-card-elite glow-purple group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-purple-500/20 group-hover:bg-purple-500/30">
                  <Monitor className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Smart Control</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Monitor:</span>
                  <span className="text-purple-300 font-mono">24/7 App</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Loads:</span>
                  <span className="text-purple-300 font-mono">Priority</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">TOU:</span>
                  <span className="text-purple-300 font-mono">Optimized</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Remote:</span>
                  <span className="text-purple-300 font-mono">Full Control</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Updates:</span>
                  <span className="text-purple-300 font-mono">OTA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Application Matrix */}
          <div className="matrix-elite">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <MapPin className="mr-3 h-6 w-6 text-green-400" />
              Perfect for California's Challenging Grid Conditions
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <CloudOff className="h-5 w-5 text-red-400" />
                  <h4 className="text-red-300 font-semibold">PSPS Zones</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Tier 2/3 fire areas</li>
                  <li>• 48-72hr outages</li>
                  <li>• Automatic backup</li>
                </ul>
              </div>
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-5 w-5 text-blue-400" />
                  <h4 className="text-blue-300 font-semibold">Rural Properties</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Unreliable grid</li>
                  <li>• Long outages</li>
                  <li>• Well pump backup</li>
                </ul>
              </div>
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-300 font-semibold">Medical Needs</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• CPAP/oxygen</li>
                  <li>• Refrigerated meds</li>
                  <li>• Life support</li>
                </ul>
              </div>
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-purple-400" />
                  <h4 className="text-purple-300 font-semibold">Home Office</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Internet/WiFi</li>
                  <li>• Computer systems</li>
                  <li>• Uninterrupted work</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Color-Coded Hybrid Solar Funnel */}
      <SolarRescueTimelineSection
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        stages={[
          {
            id: 'pain-red',
            title: 'STAGE 1: Grid Failure & PSPS Crisis',
            description: 'PG&E PSPS events shut off power for 48-72 hours during fire season. Traditional grid-tied solar systems provide ZERO backup without batteries. Medical equipment, refrigeration, and well pumps fail. Generator fuel costs $400-800 per outage.',
            color: 'from-red-500 to-red-600',
            glowColor: 'rgba(239, 68, 68, 0.5)',
            icon: <WifiOff className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-red-300 font-bold">72-Hour PSPS Events</div>
                <div className="text-xs text-gray-400">300% increase YoY</div>
                <div className="text-xs text-gray-400">Tier 2/3 fire zones affected</div>
              </div>
            ),
          },
          {
            id: 'intel-yellow',
            title: 'STAGE 2: Hybrid System Architecture Design',
            description: 'Sol-Ark 12K/15K hybrid inverter sizing for seamless grid/off-grid operation. AC-coupled vs DC-coupled battery integration analysis. Critical load panel design for essential circuits (well, refrigeration, medical, HVAC). Generator integration with automatic start (AGS) for extended outages.',
            color: 'from-yellow-500 to-yellow-600',
            glowColor: 'rgba(234, 179, 8, 0.5)',
            icon: <CircuitBoard className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-yellow-300 font-bold">AC + DC Coupling</div>
                <div className="text-xs text-gray-400">Retrofit existing solar</div>
                <div className="text-xs text-gray-400">Max flexibility & efficiency</div>
              </div>
            ),
          },
          {
            id: 'roi-green',
            title: 'STAGE 3: Independence ROI & Resilience Value',
            description: 'SGIP Equity Resiliency: $850-1,000/kWh for PSPS zones. Eliminate generator fuel costs ($4,800-9,600 annual). NEM 3.0 TOU arbitrage saves $150-250/month. Home value increase: $20,000-35,000 for energy independence. Medical baseline customers get priority SGIP funding.',
            color: 'from-green-500 to-green-600',
            glowColor: 'rgba(34, 197, 94, 0.5)',
            icon: <TrendingUp className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-green-300 font-bold">$1,000/kWh SGIP</div>
                <div className="text-xs text-gray-400">PSPS zone priority</div>
                <div className="text-xs text-gray-400">4-6 year payback</div>
              </div>
            ),
          },
          {
            id: 'action-purple',
            title: 'STAGE 4: Seamless Integration & Activation',
            description: 'Professional installation with automatic transfer switch (ATS) wiring. Critical load panel separation and circuit prioritization. &lt;10ms UPS-grade transfer prevents computer/medical equipment disruption. Remote monitoring with grid status alerts and automatic mode switching. Generator integration testing and AGS programming.',
            color: 'from-purple-500 to-purple-600',
            glowColor: 'rgba(168, 85, 247, 0.5)',
            icon: <CheckCircle className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-purple-300 font-bold">&lt;10ms Transfer</div>
                <div className="text-xs text-gray-400">Zero interruption</div>
                <div className="text-xs text-gray-400">UPS-grade switching</div>
              </div>
            ),
          },
        ]}
      />

      {/* Hybrid System Architecture Section */}
      <ContentSection
        title="Hybrid Solar System Architecture"
        subtitle="AC-Coupled vs DC-Coupled Design"
        description="Understanding the technical differences between coupling methods and their impact on system performance, efficiency, and flexibility"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AC-Coupled Systems */}
          <div className="card-elite glow-blue p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Layers className="mr-3 h-6 w-6 text-blue-400" />
              AC-Coupled Architecture
            </h3>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-400 mb-3">How It Works:</h4>
              <p className="text-gray-300 text-sm mb-4">
                Solar panels connect to a standard grid-tie inverter (existing or new). Battery inverter/charger is added on the AC side.
                Both inverters synchronize on the AC bus during grid-tie operation.
              </p>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                <h5 className="text-blue-300 font-semibold mb-2">Best For:</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Retrofitting existing grid-tie solar systems</li>
                  <li>• Systems requiring maximum flexibility</li>
                  <li>• Installations with multiple inverter brands</li>
                  <li>• Microinverter or power optimizer systems</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="text-white font-semibold">Advantages:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Easy retrofit to existing solar (no rewiring)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Multiple inverters provide redundancy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Can use different inverter brands/models</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Higher solar harvest in off-grid mode</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Efficiency (Grid-Tie):</span>
                <span className="text-white font-mono">94-96%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Efficiency (Off-Grid):</span>
                <span className="text-white font-mono">90-93%</span>
              </div>
            </div>
          </div>

          {/* DC-Coupled Systems */}
          <div className="card-elite glow-green p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <GitBranch className="mr-3 h-6 w-6 text-green-400" />
              DC-Coupled Architecture
            </h3>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-green-400 mb-3">How It Works:</h4>
              <p className="text-gray-300 text-sm mb-4">
                Solar panels connect directly to charge controller or hybrid inverter's DC input.
                Batteries charge directly from DC solar power. Single inverter manages all power conversion.
              </p>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
                <h5 className="text-green-300 font-semibold mb-2">Best For:</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• New installations designed for battery backup</li>
                  <li>• Off-grid or primarily off-grid systems</li>
                  <li>• Maximum battery charging efficiency needed</li>
                  <li>• Single-inverter simplicity preferred</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="text-white font-semibold">Advantages:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Higher battery charging efficiency (no double conversion)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Single inverter reduces system complexity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Lower equipment cost for new installations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Better for high battery cycling applications</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Efficiency (Battery Charge):</span>
                <span className="text-white font-mono">95-98%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Efficiency (Grid-Tie):</span>
                <span className="text-white font-mono">97-98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sol-Ark Hybrid Advantage */}
        <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Cpu className="mr-3 h-6 w-6 text-orange-400" />
            Sol-Ark: The Ultimate Hybrid Solution
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-orange-400 font-semibold mb-3">Dual Architecture Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>AC-couple with any grid-tie inverter</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>DC-couple with built-in MPPT</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>AC + DC simultaneous operation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-400 font-semibold mb-3">Seamless Transfer</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>&lt;4ms UPS-grade switching</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>No interruption to sensitive loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Automatic grid detection/reconnection</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-400 font-semibold mb-3">Smart Features</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Time-of-use optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Generator auto-start (2-wire/3-wire)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Load management & prioritization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Critical Load Panel Design */}
      <ContentSection
        title="Critical Load Panel & Backup Strategy"
        subtitle="Intelligent Power Management"
        description="Designing your backup system for maximum runtime and essential service continuity during grid outages"
        backgroundColor="bg-gray-900"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="card-elite glow-green p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Home className="mr-3 h-6 w-6 text-green-400" />
              Critical Load Categories
            </h3>
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Priority 1: Life Safety (Always On)</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Medical equipment (CPAP, oxygen, dialysis)</li>
                  <li>• Refrigeration for medications</li>
                  <li>• Security systems & emergency lighting</li>
                  <li>• Sump pumps (flood prevention)</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">Typical Load: 500-1,500W continuous</div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Priority 2: Essential Services</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Well pump (water supply)</li>
                  <li>• Kitchen refrigerator/freezer</li>
                  <li>• Internet/WiFi router</li>
                  <li>• Select lighting circuits</li>
                  <li>• Garage door opener</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">Typical Load: 1,000-3,000W continuous</div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Priority 3: Comfort (Load Managed)</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Mini-split HVAC (1-2 zones)</li>
                  <li>• Water heater (timer controlled)</li>
                  <li>• Washer/dryer (scheduled)</li>
                  <li>• EV charger (overnight)</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">Typical Load: 3,000-8,000W managed</div>
              </div>
            </div>
          </div>

          <div className="card-elite glow-gold p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calculator className="mr-3 h-6 w-6 text-blue-400" />
              Runtime Calculator Example
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
              <h4 className="text-blue-400 font-semibold mb-4">Typical Home Scenario:</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Battery Capacity:</span>
                  <span className="text-white font-mono">15.2kWh (4×PHI 3.8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Usable Capacity (90% DoD):</span>
                  <span className="text-white font-mono">13.7kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Critical Loads (Avg):</span>
                  <span className="text-white font-mono">1.5kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Essential Loads (Avg):</span>
                  <span className="text-white font-mono">2.0kW</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Runtime (Critical Only):</span>
                    <span className="text-green-400">~9 hours</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span className="text-white">Runtime (Critical + Essential):</span>
                    <span className="text-yellow-400">~4 hours</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span className="text-white">With Solar (8hr daylight):</span>
                    <span className="text-blue-400">24+ hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-2">Load Management Strategy</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Automatic load shedding when battery &lt; 30%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Time-based water heater control (off-peak only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>HVAC cycling to maintain 50% runtime</span>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Generator auto-start at 20% SOC</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Whole Home vs Critical Loads Comparison */}
        <div className="card-elite glow-purple p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="mr-3 h-6 w-6 text-purple-400" />
            Whole Home vs Critical Load Backup Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Aspect</th>
                  <th className="text-center py-3 px-4 text-blue-400">Critical Loads Panel</th>
                  <th className="text-center py-3 px-4 text-green-400">Whole Home Backup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="py-3 px-4 text-gray-300">Battery Size Required</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">10-20kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">30-60kWh</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">System Cost</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">$25,000-35,000</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$45,000-75,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Installation Complexity</td>
                  <td className="text-center py-3 px-4 text-blue-300">Moderate (sub-panel)</td>
                  <td className="text-center py-3 px-4 text-green-300">Simple (main panel)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Runtime (No Solar)</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">8-24 hours</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">4-12 hours</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Load Management</td>
                  <td className="text-center py-3 px-4 text-blue-300">Not needed</td>
                  <td className="text-center py-3 px-4 text-green-300">Critical</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">SGIP Incentive</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">$2,000-20,000</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$6,000-60,000</td>
                </tr>
                <tr className="font-semibold">
                  <td className="py-3 px-4 text-white">Best For</td>
                  <td className="text-center py-3 px-4 text-blue-300">Most homes</td>
                  <td className="text-center py-3 px-4 text-green-300">Large/luxury homes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ContentSection>

      {/* Generator Integration Section */}
      <ContentSection
        title="Generator Integration & Multi-Source Management"
        subtitle="Hybrid + Generator = Ultimate Resilience"
        description="Combining solar, battery, and generator for unlimited backup runtime during extended grid outages"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-elite glow-orange p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Fuel className="mr-3 h-6 w-6 text-orange-400" />
              Automatic Generator Start (AGS)
            </h3>
            <div className="space-y-4 mb-6">
              <p className="text-gray-300 text-sm">
                Sol-Ark inverters include built-in 2-wire and 3-wire generator start capabilities, enabling fully automatic backup power management without manual intervention.
              </p>
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">AGS Trigger Conditions:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                    <span>Battery SOC drops below set point (typically 20-30%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                    <span>Load demand exceeds inverter capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                    <span>Extended grid outage (time-based trigger)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                    <span>Low solar production + high demand</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Generator Sizing Guide:</h4>
              <div className="bg-gray-900/50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Small Home (1,500 sq ft):</span>
                  <span className="text-white font-mono">8-12kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Medium Home (2,500 sq ft):</span>
                  <span className="text-white font-mono">14-18kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Large Home (3,500+ sq ft):</span>
                  <span className="text-white font-mono">20-26kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">With Well Pump:</span>
                  <span className="text-white font-mono">+3-5kW</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elite glow-blue p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Network className="mr-3 h-6 w-6 text-blue-400" />
              Multi-Source Optimization
            </h3>
            <div className="mb-6">
              <h4 className="text-blue-400 font-semibold mb-3">Intelligent Source Priority:</h4>
              <div className="space-y-3">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-blue-300">1.</span>
                    <Sun className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-semibold">Solar (Free Energy)</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7">Primary source during daylight, charges battery</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-blue-300">2.</span>
                    <Battery className="h-5 w-5 text-green-400" />
                    <span className="text-white font-semibold">Battery (Stored Solar)</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7">Evening/night operation, peak load support</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-blue-300">3.</span>
                    <Fuel className="h-5 w-5 text-orange-400" />
                    <span className="text-white font-semibold">Generator (Backup)</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7">Extended outages, battery recharge, high loads</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-blue-300">4.</span>
                    <Wifi className="h-5 w-5 text-purple-400" />
                    <span className="text-white font-semibold">Grid (When Available)</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7">Off-peak charging, export excess solar (NEM)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Fuel Savings Analysis:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Generator-only runtime:</span>
                  <span className="text-white font-mono">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">With solar + battery:</span>
                  <span className="text-white font-mono">2-4 hrs/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuel consumption reduction:</span>
                  <span className="text-green-400 font-mono">85-90%</span>
                </div>
                <div className="border-t border-green-500/30 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Annual fuel savings:</span>
                    <span className="text-green-400">$4,800-9,600</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Outage Timeline */}
        <div className="mt-8 card-elite glow-purple p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Clock className="mr-3 h-6 w-6 text-purple-400" />
            72-Hour PSPS Event Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-purple-400 font-mono text-sm">Hour 0-8</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Grid Outage Begins</h4>
                <p className="text-gray-400 text-sm">Inverter detects grid loss in &lt;100ms, transfers to battery in &lt;10ms. Home continues normal operation on battery power.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-yellow-400 font-mono text-sm">Hour 8-16</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Daytime Solar Recharge</h4>
                <p className="text-gray-400 text-sm">Solar panels generate 40-60kWh, recharging batteries to 100% and powering loads. Excess energy available for heavy loads.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-orange-400 font-mono text-sm">Hour 16-24</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Evening Battery Operation</h4>
                <p className="text-gray-400 text-sm">Battery powers critical and essential loads through the night. SOC drops to 40-50% by morning.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-blue-400 font-mono text-sm">Hour 24-48</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Day 2-3 Cycling</h4>
                <p className="text-gray-400 text-sm">Pattern repeats: solar charges during day, battery powers night. Generator starts only if weather limits solar production.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-green-400 font-mono text-sm">Hour 72+</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Grid Restoration</h4>
                <p className="text-gray-400 text-sm">System detects grid return, synchronizes, and seamlessly transfers back. Battery maintains charge for next event.</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* PSPS Zone Map and Statistics */}
      <ContentSection
        title="California PSPS Zones & Grid Resilience"
        subtitle="Why Hybrid Solar is Essential"
        description="Understanding Public Safety Power Shutoff impacts and the critical need for energy independence in wildfire-prone regions"
        backgroundColor="bg-gray-900"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="card-elite glow-red p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MapPin className="mr-3 h-6 w-6 text-red-400" />
              Northern California PSPS Statistics
            </h3>
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-3">2023 PSPS Impact Data:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total PSPS Events:</span>
                    <span className="text-white font-mono">38</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customers Affected:</span>
                    <span className="text-white font-mono">2.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Duration:</span>
                    <span className="text-white font-mono">48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Longest Outage:</span>
                    <span className="text-red-400 font-mono">5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Peak Season:</span>
                    <span className="text-orange-400 font-mono">Sept-Nov</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-3">High-Risk Areas (Tier 2/3):</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Shasta County foothills</li>
                  <li>• Paradise/Magalia region</li>
                  <li>• Nevada County communities</li>
                  <li>• El Dorado Hills</li>
                  <li>• Napa/Sonoma mountains</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-elite glow-green p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="mr-3 h-6 w-6 text-green-400" />
              PSPS Economic Impact
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Cost of Outages (Per Event):</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Food spoilage:</span>
                    <span className="text-red-400 font-mono">$400-800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hotel costs (if needed):</span>
                    <span className="text-red-400 font-mono">$300-600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Generator fuel:</span>
                    <span className="text-red-400 font-mono">$200-400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lost productivity:</span>
                    <span className="text-red-400 font-mono">$500-2,000</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total per event:</span>
                      <span className="text-red-400">$1,400-3,800</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-3">Hybrid Solar Benefits:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Zero downtime during PSPS events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>No food spoilage or hotel costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Work from home continuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Medical equipment reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Increased home value ($20-35K)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SGIP Resiliency Incentive */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-3 h-6 w-6 text-purple-400" />
            SGIP Equity Resiliency Incentive for PSPS Zones
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Eligibility Requirements:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>Located in Tier 2 or Tier 3 HFTD</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>Experienced 2+ PSPS events</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>Medical baseline customer (priority)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span>Well pump for water (qualifies)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Incentive Amounts:</h4>
              <div className="bg-purple-900/20 rounded-lg p-4 space-y-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300">$850-1,000</div>
                  <div className="text-sm text-gray-400">per kWh installed</div>
                </div>
                <div className="border-t border-purple-500/30 pt-2 mt-2">
                  <div className="text-sm text-gray-300">
                    15kWh system = <span className="text-purple-300 font-bold">$12,750-15,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Application Priority:</h4>
              <ol className="space-y-2 text-sm text-gray-300">
                <li>1. Medical baseline customers</li>
                <li>2. Low-income qualified (CARE/FERA)</li>
                <li>3. Critical facilities nearby</li>
                <li>4. Well water dependent</li>
                <li>5. General residential</li>
              </ol>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* ROI and Financial Analysis */}
      <ContentSection
        title="Hybrid Solar ROI & Financial Analysis"
        subtitle="The Economics of Energy Independence"
        description="Comprehensive financial breakdown including incentives, savings, and increased property value"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="card-elite glow-green p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calculator className="mr-3 h-6 w-6 text-green-400" />
            Typical Hybrid System Financial Analysis
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="spec-card-elite glow-green">
              <h4 className="text-lg font-semibold text-green-400 mb-4">System Configuration</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Solar Array:</span>
                  <span className="font-mono text-green-300">8.5kW</span>
                </li>
                <li className="flex justify-between">
                  <span>Sol-Ark Inverter:</span>
                  <span className="font-mono text-green-300">12K</span>
                </li>
                <li className="flex justify-between">
                  <span>Battery Storage:</span>
                  <span className="font-mono text-green-300">15.2kWh</span>
                </li>
                <li className="flex justify-between">
                  <span>Critical Load Panel:</span>
                  <span className="font-mono text-green-300">Yes</span>
                </li>
                <li className="flex justify-between">
                  <span>Generator Integration:</span>
                  <span className="font-mono text-green-300">AGS</span>
                </li>
              </ul>
            </div>

            <div className="spec-card-elite glow-blue">
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Cost & Incentives</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Gross System Cost:</span>
                  <span className="font-mono text-white">$38,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Federal ITC (30%):</span>
                  <span className="font-mono text-green-300">-$11,400</span>
                </li>
                <li className="flex justify-between">
                  <span>SGIP Resiliency:</span>
                  <span className="font-mono text-green-300">-$13,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Net Cost:</span>
                  <span className="font-mono text-blue-300">$13,600</span>
                </li>
                <li className="flex justify-between">
                  <span>Finance (4.99%):</span>
                  <span className="font-mono text-gray-400">$127/mo</span>
                </li>
              </ul>
            </div>

            <div className="spec-card-elite glow-gold">
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Savings & Returns</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Energy Savings:</span>
                  <span className="font-mono text-green-300">$185/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>PSPS Avoidance:</span>
                  <span className="font-mono text-green-300">$200/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Net Monthly:</span>
                  <span className="font-mono text-green-300">+$258</span>
                </li>
                <li className="flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-mono text-yellow-300">4.4 years</span>
                </li>
                <li className="flex justify-between">
                  <span>20-Year ROI:</span>
                  <span className="font-mono text-green-300">385%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Value Comparison Table */}
        <div className="card-elite glow-purple p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <PieChart className="mr-3 h-6 w-6 text-orange-400" />
            Backup Power Options Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="table-elite">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Solution</th>
                  <th className="text-center py-3 px-4 text-gray-400">Upfront Cost</th>
                  <th className="text-center py-3 px-4 text-gray-400">Runtime</th>
                  <th className="text-center py-3 px-4 text-gray-400">Annual Fuel</th>
                  <th className="text-center py-3 px-4 text-gray-400">Maintenance</th>
                  <th className="text-center py-3 px-4 text-gray-400">10-Year TCO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Portable Generator</td>
                  <td className="text-center py-3 px-4 font-mono text-gray-300">$800-2,000</td>
                  <td className="text-center py-3 px-4 text-yellow-300">8-12 hrs/tank</td>
                  <td className="text-center py-3 px-4 font-mono text-red-300">$2,400</td>
                  <td className="text-center py-3 px-4 font-mono text-red-300">$300/yr</td>
                  <td className="text-center py-3 px-4 font-mono text-red-400">$29,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Standby Generator</td>
                  <td className="text-center py-3 px-4 font-mono text-gray-300">$8,000-15,000</td>
                  <td className="text-center py-3 px-4 text-green-300">Unlimited</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">$3,600</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">$500/yr</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-400">$54,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Battery Only</td>
                  <td className="text-center py-3 px-4 font-mono text-gray-300">$15,000-25,000</td>
                  <td className="text-center py-3 px-4 text-yellow-300">8-24 hrs</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$0</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$0</td>
                  <td className="text-center py-3 px-4 font-mono text-yellow-400">$20,000</td>
                </tr>
                <tr className="bg-green-900/10">
                  <td className="py-3 px-4 text-green-400 font-bold">Hybrid Solar + Battery</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$13,600 (net)</td>
                  <td className="text-center py-3 px-4 text-green-300">Unlimited w/sun</td>
                  <td className="text-center py-3 px-4 font-mono text-green-400">-$2,200 (savings)</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$100/yr</td>
                  <td className="text-center py-3 px-4 font-mono text-green-400">-$8,400 (profit)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            * TCO includes equipment, fuel, maintenance, and energy savings over 10 years
          </div>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for True Energy Independence?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of California homeowners who never worry about power outages.
              Get your custom hybrid solar system design with SGIP incentive analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg"
                onClick={() => setShowConsultationForm(true)}
              >
                Get Free Grid Independence Assessment
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 py-4 px-8 rounded-lg"
                onClick={() => window.location.href = 'tel:5302260701'}
              >
                Call (530) 226-0701
              </Button>
            </div>
            <p className="mt-8 text-white/80 text-sm">
              PSPS zone residents qualify for $850-1,000/kWh SGIP Equity Resiliency incentives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Request Hybrid Solar Consultation</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">First Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-firstName" />
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
                        <FormLabel className="text-gray-300">Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-lastName" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="bg-gray-800 border-gray-700 text-white" data-testid="input-email" />
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
                        <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-phone" />
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
                      <FormLabel className="text-gray-300">Property Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">City</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-city" />
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
                        <FormLabel className="text-gray-300">State</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-state" />
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
                        <FormLabel className="text-gray-300">Zip Code</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-700 text-white" data-testid="input-zipCode" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Are you in a PSPS zone?</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2" data-testid="input-propertyType">
                          <option value="">Select...</option>
                          <option value="psps-yes">Yes - Tier 2/3 Fire Zone</option>
                          <option value="psps-maybe">Not Sure</option>
                          <option value="psps-no">No</option>
                          <option value="medical">Medical Baseline Customer</option>
                        </select>
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
                      <FormLabel className="text-gray-300">Additional Comments (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={3}
                          placeholder="Tell us about your backup power needs, outage frequency, etc."
                          data-testid="input-additionalComments"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={consultationMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    data-testid="button-submit"
                  >
                    {consultationMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowConsultationForm(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
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
    </MainLayout>
  );
};

export default HybridSolar;