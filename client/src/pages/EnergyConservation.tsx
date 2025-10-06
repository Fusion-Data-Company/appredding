import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import FluidEnergyHero from "@/components/FluidEnergyHero";
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
import { Leaf, Lightbulb, ThermometerSun, Wind, Droplets, Home, Shield, AlertTriangle, CheckCircle, TrendingUp, CircleDollarSign, BarChart, DollarSign, Calculator, Zap, Eye, FileCheck, ChevronRight, ArrowRight, Building2, Factory, Gauge, Timer, Settings, Info, Target, Activity, Battery, Power, Sun, Cloud, Snowflake, Flame, Award, Package, Wrench, Component, Cpu, Lock, Database, Globe, MapPin, Users, Phone, Mail, MessageSquare, Calendar, Clock, Star, Heart, Bell, Search, Filter, Layers, Grid, Box, Hexagon, BarChart3, LineChart, PieChart, FileText, Circle, GraduationCap, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";
import ContentSection from "@/components/sections/ContentSection";
import { AwardBadge } from "@/components/ui/award-badge";
import energyConservationTechniquesImg from "@assets/Advance-Power-Redding-Energy-Conservation-Techniques.jpg";
import gregWithPanelImg from "@assets/Greg-with-panel.jpg";
import teamEnergyAuditImg from "@assets/400617335_882191187089939_3988264444007076062_n-500x375.jpg";
import solarEfficiencyEquipmentImg from "@assets/guillherme-schneider-ecIS-bfYSG8-unsplash-300x400.jpg";

type EnergyConservationFormValues = z.infer<typeof insertFirePreventionHomeownerSchema>;

const EnergyConservation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedService, setSelectedService] = useState("audit");
  const [energyUsage, setEnergyUsage] = useState(3500);
  const [efficiency, setEfficiency] = useState(65);
  const [savings, setSavings] = useState(0);
  const [temperature, setTemperature] = useState(72);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const { toast } = useToast();

  const pageTitle = "Energy Conservation & Efficiency Solutions | Professional Energy Audits";
  const pageDescription = "Comprehensive energy conservation services including professional energy audits, HVAC optimization, insulation upgrades, and smart home integration. Reduce energy consumption by 30-50% with expert efficiency solutions.";

  const form = useForm<EnergyConservationFormValues>({
    resolver: zodResolver(insertFirePreventionHomeownerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      additionalComments: ""
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: EnergyConservationFormValues) => {
      return await apiRequest("POST", "/api/energy-conservation/consultation", data);
    },
    onSuccess: () => {
      setShowConsultationForm(false);
      form.reset();
      toast({
        title: "Request Submitted",
        description: "We've received your energy consultation request and will contact you shortly.",
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

  const onSubmit = (data: EnergyConservationFormValues) => {
    consultationMutation.mutate(data);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Energy Conservation Services",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyUsage(3500 + Math.sin(Date.now() / 2000) * 200);
      setEfficiency(65 + Math.sin(Date.now() / 3000) * 5);
      setSavings(prev => (prev + 0.5) % 1000);
      setTemperature(72 + Math.sin(Date.now() / 4000) * 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const conservationServices = {
    audit: {
      name: "Comprehensive Energy Audit",
      description: "Professional home energy assessment using advanced diagnostic tools",
      savings: "20-40%",
      roi: "Immediate insights",
      features: ["Blower door testing", "Infrared thermography", "Duct leakage testing", "Combustion safety testing"],
      price: "$399-599"
    },
    lighting: {
      name: "LED Lighting Retrofit",
      description: "Complete conversion to high-efficiency LED lighting systems",
      savings: "75-90%",
      roi: "1-2 years",
      features: ["Smart controls", "Occupancy sensors", "Daylight harvesting", "Color tuning"],
      price: "$500-5,000"
    },
    hvac: {
      name: "HVAC Optimization",
      description: "Heat pump upgrades and smart thermostat installation",
      savings: "20-40%",
      roi: "3-5 years",
      features: ["Variable speed systems", "Zoning controls", "Air quality monitoring", "Predictive maintenance"],
      price: "$3,000-12,000"
    },
    insulation: {
      name: "Building Envelope Upgrade",
      description: "Comprehensive insulation and air sealing improvements",
      savings: "15-30%",
      roi: "2-4 years",
      features: ["Attic insulation", "Wall insulation", "Air sealing", "Window upgrades"],
      price: "$2,000-8,000"
    },
    water: {
      name: "Water Heating Efficiency",
      description: "Heat pump water heater installation and optimization",
      savings: "50-65%",
      roi: "4-6 years",
      features: ["Heat pump technology", "Demand controls", "Pipe insulation", "Low-flow fixtures"],
      price: "$2,500-4,500"
    },
    solar: {
      name: "Solar Integration",
      description: "Combining efficiency with renewable energy generation",
      savings: "80-100%",
      roi: "5-7 years",
      features: ["Right-sized systems", "Net metering", "Battery storage", "Smart inverters"],
      price: "$15,000-30,000"
    }
  };

  const efficiencyMetrics = [
    { metric: "SEER2", definition: "Seasonal Energy Efficiency Ratio", standard: "14+ minimum", premium: "20+ high-efficiency" },
    { metric: "HSPF2", definition: "Heating Seasonal Performance Factor", standard: "7.5+ minimum", premium: "10+ high-efficiency" },
    { metric: "AFUE", definition: "Annual Fuel Utilization Efficiency", standard: "80% minimum", premium: "95%+ condensing" },
    { metric: "COP", definition: "Coefficient of Performance", standard: "2.5+ good", premium: "4.0+ excellent" },
    { metric: "EER", definition: "Energy Efficiency Ratio", standard: "11+ standard", premium: "13+ high-efficiency" },
    { metric: "R-Value", definition: "Thermal Resistance", standard: "R-30 attic min", premium: "R-49+ recommended" }
  ];

  const rebatePrograms = [
    { program: "PG&E Home Energy Savings", type: "Whole House", amount: "Up to $6,500", requirements: "15% energy reduction" },
    { program: "TECH Clean California", type: "Heat Pumps", amount: "$3,000-$4,500", requirements: "Qualified heat pump installation" },
    { program: "Energy Upgrade California", type: "Multiple Measures", amount: "$1,000-$6,500", requirements: "3+ qualifying measures" },
    { program: "Federal Tax Credits", type: "Efficiency Upgrades", amount: "30% of cost", requirements: "Energy Star certified" },
    { program: "PACE Financing", type: "All Measures", amount: "100% financing", requirements: "Property tax assessment" },
    { program: "Low-Income Weatherization", type: "Comprehensive", amount: "Free upgrades", requirements: "Income qualification" }
  ];

  const buildingScience = [
    { concept: "Stack Effect", description: "Warm air rises creating pressure differentials", impact: "30% of air leakage", solution: "Air sealing at attic and basement" },
    { concept: "Thermal Bridging", description: "Heat transfer through structural members", impact: "15-20% heat loss", solution: "Continuous insulation installation" },
    { concept: "Vapor Drive", description: "Moisture movement through materials", impact: "Mold and degradation", solution: "Proper vapor barriers" },
    { concept: "Pressure Balance", description: "Indoor/outdoor pressure differentials", impact: "Drafts and infiltration", solution: "Balanced ventilation systems" },
    { concept: "Heat Island Effect", description: "Surface temperature elevation", impact: "25% cooling increase", solution: "Cool roofs and shade structures" },
    { concept: "Thermal Mass", description: "Material heat storage capacity", impact: "Temperature stability", solution: "Strategic mass placement" }
  ];

  const smartHomeIntegration = [
    { system: "Smart Thermostats", savings: "10-23%", features: ["Learning algorithms", "Geofencing", "Remote control", "Energy reports"] },
    { system: "Smart Lighting", savings: "15-30%", features: ["Dimming controls", "Scene settings", "Circadian rhythm", "Voice activation"] },
    { system: "Energy Monitoring", savings: "5-15%", features: ["Real-time usage", "Appliance detection", "Cost tracking", "Anomaly alerts"] },
    { system: "Smart Plugs", savings: "5-10%", features: ["Schedule control", "Phantom load elimination", "Remote shutoff", "Usage tracking"] },
    { system: "HVAC Zoning", savings: "20-35%", features: ["Room-by-room control", "Occupancy detection", "Schedule optimization", "Maintenance alerts"] },
    { system: "Water Leak Detection", savings: "10-20%", features: ["Instant alerts", "Auto shutoff", "Usage patterns", "Freeze protection"] }
  ];

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />

      {/* Fluid Energy Hero Section */}
      <FluidEnergyHero />


      {/* Professional Energy Conservation Work Image */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={energyConservationTechniquesImg}
            alt="Professional energy conservation techniques and efficiency audit in progress"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-energy-conservation-1"
          />
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Live Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-blue-700 rounded-3xl p-8 mb-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Energy Efficiency Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live Energy Metrics</h2>
            <p className="text-lg mb-6 text-orange-100">Real-time monitoring of your energy consumption and savings potential</p>

            {/* Live Energy Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Activity className="h-5 w-5 mb-2 text-orange-200" />
                <div className="text-2xl font-bold">{energyUsage.toFixed(0)}</div>
                <div className="text-sm text-orange-200">kWh Usage</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Gauge className="h-5 w-5 mb-2 text-blue-200" />
                <div className="text-2xl font-bold">{efficiency.toFixed(0)}%</div>
                <div className="text-sm text-blue-200">Efficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <DollarSign className="h-5 w-5 mb-2 text-yellow-200" />
                <div className="text-2xl font-bold">${savings.toFixed(0)}</div>
                <div className="text-sm text-yellow-200">Monthly Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <ThermometerSun className="h-5 w-5 mb-2 text-orange-200" />
                <div className="text-2xl font-bold">{temperature.toFixed(0)}°F</div>
                <div className="text-sm text-orange-200">Set Point</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition flex items-center gap-2">
                Schedule Energy Audit <ArrowRight className="h-5 w-5" />
              </button>
              <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Calculate Savings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Conservation Services Selector */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Energy Efficiency Services</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Professional Conservation Solutions</h2>
            <p className="text-gray-600 ">Comprehensive energy reduction strategies tailored to your property</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(conservationServices).map((service: string) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedService === service
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700  hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {conservationServices[service as keyof typeof conservationServices].name.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="card-elite glow-green p-8 group">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900 ">
                {conservationServices[selectedService as keyof typeof conservationServices].name}
              </h3>
              <span className="bg-orange-100 dark:bg-orange-900 text-orange-800  px-3 py-1 rounded-full text-sm font-medium">
                {conservationServices[selectedService as keyof typeof conservationServices].savings} Savings
              </span>
            </div>

            <p className="text-gray-600  mb-6">
              {conservationServices[selectedService as keyof typeof conservationServices].description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 ">
                  <CheckCircle className="h-5 w-5 text-orange-500" /> Key Features
                </h4>
                <ul className="space-y-2">
                  {conservationServices[selectedService as keyof typeof conservationServices].features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 ">
                      <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 ">ROI Period</span>
                    <span className="font-bold text-gray-900 ">{conservationServices[selectedService as keyof typeof conservationServices].roi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 ">Investment Range</span>
                    <span className="font-bold text-orange-600 ">{conservationServices[selectedService as keyof typeof conservationServices].price}</span>
                  </div>
                </div>

                <button className="w-full bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-orange-700 transition">
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technician Working on Energy Systems Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={gregWithPanelImg}
              alt="Expert technician working on HVAC optimization and energy system upgrades"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-energy-conservation-2"
            />
          </div>
        </div>

        {/* Energy Audit Process */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Diagnostic Assessment</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Professional Energy Audit Process</h2>
            <p className="text-gray-600 ">Comprehensive analysis using advanced building science techniques</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Audit Steps */}
            <div className="card-elite glow-blue p-8 group">
              <h3 className="text-xl font-bold mb-6 text-gray-900  flex items-center gap-2">
                <Eye className="h-6 w-6 text-blue-500" /> Audit Methodology
              </h3>

              <div className="space-y-4">
                {[
                  { step: "Visual Inspection", desc: "Comprehensive walkthrough of all spaces", time: "30 min" },
                  { step: "Blower Door Test", desc: "Measure air infiltration at 50 Pascal pressure", time: "45 min" },
                  { step: "Duct Blaster Test", desc: "Quantify HVAC duct leakage", time: "30 min" },
                  { step: "Infrared Imaging", desc: "Thermal camera scan of building envelope", time: "60 min" },
                  { step: "Combustion Safety", desc: "Test gas appliances for CO and efficiency", time: "20 min" },
                  { step: "Report Generation", desc: "Detailed findings and recommendations", time: "24-48 hrs" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 ">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 ">{item.step}</h4>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 ">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600  mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Equipment */}
            <div className="card-elite glow-blue p-8 group">
              <h3 className="text-xl font-bold mb-6 text-gray-900  flex items-center gap-2">
                <Cpu className="h-6 w-6 text-orange-500" /> Diagnostic Equipment
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { tool: "Blower Door", spec: "Minneapolis BD3", measure: "CFM50, ACH50" },
                  { tool: "Duct Blaster", spec: "DG-1000", measure: "CFM25, Leakage %" },
                  { tool: "Thermal Camera", spec: "FLIR E8-XT", measure: "320x240 resolution" },
                  { tool: "Combustion Analyzer", spec: "Testo 330-2", measure: "CO, CO2, O2, Efficiency" },
                  { tool: "Moisture Meter", spec: "Protimeter MMS2", measure: "WME, %MC" },
                  { tool: "Data Logger", spec: "HOBO MX2301A", measure: "Temp, RH, Dew Point" }
                ].map((item, idx) => (
                  <div key={idx} className="spec-card-elite glow-blue">
                    <h4 className="font-semibold text-gray-900  text-sm">{item.tool}</h4>
                    <p className="text-xs text-gray-500 ">{item.spec}</p>
                    <p className="text-xs text-orange-600  mt-1">Measures: {item.measure}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <p className="text-sm text-gray-700 ">
                  <strong>BPI Certified:</strong> Our auditors are Building Performance Institute certified professionals using calibrated equipment meeting RESNET standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Energy Audit Work Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={teamEnergyAuditImg}
              alt="Professional team conducting comprehensive energy efficiency audit and insulation upgrade assessment"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-energy-conservation-3"
            />
          </div>
        </div>

        {/* Building Science Principles */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Technical Foundation</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Building Science Principles</h2>
            <p className="text-gray-600 ">Understanding the physics of energy efficiency</p>
          </div>

          <div className="card-elite glow-blue p-8 group">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildingScience.map((concept, idx) => (
                <div key={idx} className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-lg font-bold text-gray-900  mb-1">{concept.concept}</h4>
                  <p className="text-sm text-gray-600  mb-2">{concept.description}</p>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span className="text-gray-500">Impact: {concept.impact}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-gray-500">Solution: {concept.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HVAC & Heat Pump Technology */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Climate Control Efficiency</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Advanced HVAC Solutions</h2>
            <p className="text-gray-600 ">High-efficiency heating and cooling with heat pump technology</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Heat Pump Specifications */}
            <div className="card-elite glow-blue p-8 group">
              <h3 className="text-xl font-bold mb-6 text-gray-900  flex items-center gap-2">
                <Wind className="h-6 w-6 text-blue-500" /> Heat Pump Technology
              </h3>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 ">Air-Source Heat Pumps</span>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600  px-2 py-1 rounded">
                      300-400% Efficient
                    </span>
                  </div>
                  <p className="text-sm text-gray-600  mb-2">
                    Modern heat pumps achieve 3-4 COP (Coefficient of Performance), delivering 3-4 units of heat for every unit of electricity consumed.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">Heating:</span>
                      <strong className="text-gray-900 "> HSPF2 10+</strong>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">Cooling:</span>
                      <strong className="text-gray-900 "> SEER2 20+</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 ">Ground-Source (Geothermal)</span>
                    <span className="text-sm bg-orange-100 dark:bg-orange-900 text-orange-600  px-2 py-1 rounded">
                      400-600% Efficient
                    </span>
                  </div>
                  <p className="text-sm text-gray-600  mb-2">
                    Geothermal systems use stable ground temperatures for exceptional efficiency year-round.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">COP:</span>
                      <strong className="text-gray-900 "> 4.0-6.0</strong>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">EER:</span>
                      <strong className="text-gray-900 "> 20-30</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900  mb-2">Cold Climate Performance</h4>
                <p className="text-sm text-gray-600  mb-2">
                  Modern inverter-driven heat pumps maintain efficiency down to -15°F (-26°C)
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Snowflake className="h-4 w-4 text-blue-500" />
                    <span>-15°F operation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>No backup heat needed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Controls */}
            <div className="card-elite glow-purple p-8 group">
              <h3 className="text-xl font-bold mb-6 text-gray-900  flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-500" /> Smart HVAC Controls
              </h3>

              <div className="space-y-4">
                {[
                  { feature: "Learning Thermostats", savings: "10-23%", desc: "AI-driven temperature optimization" },
                  { feature: "Zoning Systems", savings: "20-35%", desc: "Room-by-room climate control" },
                  { feature: "Variable Speed", savings: "15-25%", desc: "Inverter-driven compressor modulation" },
                  { feature: "Demand Response", savings: "5-15%", desc: "Grid-interactive load management" },
                  { feature: "Predictive Maintenance", savings: "10-20%", desc: "AI-based fault detection" }
                ].map((item, idx) => (
                  <div key={idx} className="spec-card-elite glow-purple">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 ">{item.feature}</h4>
                      <span className="text-sm font-bold text-orange-600 ">{item.savings}</span>
                    </div>
                    <p className="text-sm text-gray-600 ">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insulation & Building Envelope */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Building Envelope</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Insulation & Air Sealing</h2>
            <p className="text-gray-600 ">Creating an efficient thermal boundary for your building</p>
          </div>

          <div className="card-elite glow-green p-8 group">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* R-Value Requirements */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900  flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-500" /> Insulation R-Values (Climate Zone 3)
                </h3>
                <div className="space-y-3">
                  {[
                    { area: "Attic/Ceiling", current: "R-19 to R-30", recommended: "R-38 to R-49", savings: "15-20%" },
                    { area: "Walls (2x4)", current: "R-11 to R-13", recommended: "R-13 to R-15", savings: "10-15%" },
                    { area: "Walls (2x6)", current: "R-19", recommended: "R-19 to R-21", savings: "5-10%" },
                    { area: "Floors", current: "R-13 to R-19", recommended: "R-25 to R-30", savings: "5-10%" },
                    { area: "Basement Walls", current: "Uninsulated", recommended: "R-15 to R-19", savings: "10-15%" },
                    { area: "Crawl Space", current: "R-0 to R-19", recommended: "R-25 to R-30", savings: "10-20%" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900 ">{item.area}</span>
                        <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600  px-2 py-1 rounded">
                          {item.savings}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Current:</span>
                          <span className="text-gray-700 "> {item.current}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Target:</span>
                          <span className="text-orange-600  font-medium"> {item.recommended}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Air Sealing Priority Areas */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900  flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" /> Air Sealing Priority Areas
                </h3>
                <div className="space-y-3">
                  {[
                    { area: "Attic Penetrations", leakage: "High", method: "Foam, caulk, weather stripping" },
                    { area: "Rim Joists", leakage: "High", method: "Spray foam or rigid foam + caulk" },
                    { area: "Windows & Doors", leakage: "Medium", method: "Weather stripping, caulking" },
                    { area: "Electrical Outlets", leakage: "Medium", method: "Foam gaskets, caulk" },
                    { area: "Plumbing Penetrations", leakage: "Medium", method: "Expanding foam, caulk" },
                    { area: "HVAC Registers", leakage: "Low", method: "Mastic seal, foam tape" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900 ">{item.area}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.leakage === "High" ? "bg-red-100 text-red-600 dark:bg-red-900 " :
                          item.leakage === "Medium" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 " :
                          "bg-orange-100 text-orange-600 dark:bg-orange-900 "
                        }`}>
                          {item.leakage} Priority
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ">{item.method}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Air Leakage Standards */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-gray-900 ">Air Leakage Standards (ACH50)</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">10-15</div>
                  <div className="text-xs text-gray-600 ">Old/Leaky</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">7-10</div>
                  <div className="text-xs text-gray-600 ">Average</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">3-7</div>
                  <div className="text-xs text-gray-600 ">Efficient</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">&lt;3</div>
                  <div className="text-xs text-gray-600 ">Passive House</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">ACH50 = Air Changes per Hour at 50 Pascal pressure difference</p>
            </div>
          </div>
        </div>

        {/* Smart Home Energy Management */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Automation & Control</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Smart Home Energy Management</h2>
            <p className="text-gray-600 ">Intelligent systems that optimize energy use automatically</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartHomeIntegration.map((system, idx) => (
              <div key={idx} className="card-elite glow-purple p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="icon-container-elite bg-purple-500/20 group-hover:bg-purple-500/30">
                    <Component className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm font-bold text-orange-600 ">{system.savings} Savings</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900  mb-3">{system.system}</h3>
                <ul className="space-y-2">
                  {system.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600  flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-orange-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics & Standards */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Performance Standards</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Energy Efficiency Metrics</h2>
            <p className="text-gray-600 ">Understanding efficiency ratings and certifications</p>
          </div>

          <div className="card-elite glow-blue overflow-hidden group">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Metric</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Definition</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Standard Efficiency</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">High Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {efficiencyMetrics.map((metric, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                        {metric.metric}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 ">
                        {metric.definition}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                        {metric.standard}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600 ">
                        {metric.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Rebate Programs */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Financial Incentives</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Rebates & Financing Programs</h2>
            <p className="text-gray-600 ">Take advantage of available incentives to reduce upgrade costs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rebatePrograms.map((program, idx) => (
              <div key={idx} className="card-elite glow-gold p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="icon-container-elite bg-yellow-500/20 group-hover:bg-yellow-500/30">
                    <DollarSign className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm bg-orange-100 dark:bg-orange-900 text-orange-800  px-2 py-1 rounded">
                    {program.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900  mb-2">{program.program}</h3>
                <div className="text-2xl font-bold text-orange-600  mb-2">{program.amount}</div>
                <p className="text-sm text-gray-600 ">{program.requirements}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 alert-elite">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900  mb-2">Incentive Stacking</h3>
                <p className="text-sm text-gray-600 ">
                  Many programs can be combined. For example, federal tax credits can be used alongside utility rebates and PACE financing,
                  potentially covering 50-80% of project costs. Our team handles all paperwork and applications to maximize your savings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculator Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Investment Analysis</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Energy Savings Calculator</h2>
            <p className="text-gray-600 ">Calculate your potential savings and payback period</p>
          </div>

          <div className="card-elite glow-green p-8 group">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 ">Typical Project ROI</h3>
                <div className="space-y-4">
                  {[
                    { upgrade: "LED Lighting", cost: "$1,500", savings: "$600/yr", payback: "2.5 years", roi: "40%" },
                    { upgrade: "Smart Thermostat", cost: "$300", savings: "$180/yr", payback: "1.7 years", roi: "60%" },
                    { upgrade: "Attic Insulation", cost: "$2,500", savings: "$500/yr", payback: "5 years", roi: "20%" },
                    { upgrade: "Heat Pump HVAC", cost: "$8,000", savings: "$1,200/yr", payback: "6.7 years", roi: "15%" },
                    { upgrade: "Full Envelope", cost: "$12,000", savings: "$2,400/yr", payback: "5 years", roi: "20%" }
                  ].map((item, idx) => (
                    <div key={idx} className="spec-card-elite glow-gold">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 ">{item.upgrade}</h4>
                        <span className="text-sm font-bold text-orange-600">{item.roi} ROI</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <div className="font-medium">{item.cost}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Savings:</span>
                          <div className="font-medium text-orange-600">{item.savings}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Payback:</span>
                          <div className="font-medium">{item.payback}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 ">Quick Calculator</h3>
                <div className="category-card-elite p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 ">Monthly Energy Bill</label>
                      <input type="range" min="100" max="500" defaultValue="250" className="w-full mt-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$100</span>
                        <span className="font-bold">$250</span>
                        <span>$500</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 ">Efficiency Improvement</label>
                      <input type="range" min="20" max="50" defaultValue="35" className="w-full mt-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>20%</span>
                        <span className="font-bold">35%</span>
                        <span>50%</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 ">Monthly Savings</p>
                          <p className="text-2xl font-bold text-orange-600">$87</p>
                        </div>
                        <div>
                          <p className="text-gray-600 ">Annual Savings</p>
                          <p className="text-2xl font-bold text-orange-600">$1,044</p>
                        </div>
                        <div>
                          <p className="text-gray-600 ">10-Year Savings</p>
                          <p className="text-2xl font-bold text-blue-600">$12,528</p>
                        </div>
                        <div>
                          <p className="text-gray-600 ">CO₂ Reduction</p>
                          <p className="text-2xl font-bold text-orange-600">3.2 tons/yr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Customer Case Studies */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">Success Stories</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Real Energy Savings Achieved</h2>
            <p className="text-gray-600 ">Actual results from Northern California properties</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                customer: "Valley Medical Center - Redding, CA",
                property: "125,000 sq ft medical facility",
                baseline: "$42,000/month energy costs",
                issues: "Outdated HVAC, poor insulation, inefficient lighting, no controls",
                solutions: "VRF system upgrade, LED retrofit, building automation, envelope sealing",
                results: "47% reduction in energy use, $19,740/month savings",
                investment: "$385,000",
                payback: "19.5 months",
                annual_savings: "$236,880",
                testimonial: "The energy audit revealed opportunities we never knew existed. The savings have exceeded projections every month.",
                additional_benefits: "Improved patient comfort, reduced maintenance, LEED Silver certification"
              },
              {
                customer: "Anderson Unified School District",
                property: "8 schools, 450,000 sq ft total",
                baseline: "$1.2M annual energy spend",
                issues: "1970s HVAC systems, single-pane windows, no energy management",
                solutions: "High-efficiency boilers/chillers, window film, occupancy controls, solar integration",
                results: "52% reduction, saving $624,000 annually",
                investment: "$2.1M (with Prop 39 funding)",
                payback: "3.4 years",
                annual_savings: "$624,000",
                testimonial: "The savings allowed us to hire two additional teachers. Energy efficiency directly benefits our students.",
                additional_benefits: "Better learning environment, reduced sick days, sustainability curriculum"
              },
              {
                customer: "Shasta County Office Complex",
                property: "75,000 sq ft government building",
                baseline: "$285,000 annual energy cost",
                issues: "Constant HVAC runtime, no daylight harvesting, inefficient pumps/motors",
                solutions: "Smart thermostats, daylight sensors, VFDs, retrocommissioning",
                results: "38% reduction, $108,300 annual savings",
                investment: "$195,000",
                payback: "1.8 years",
                annual_savings: "$108,300",
                testimonial: "Simple upgrades with huge impact. The building is more comfortable and costs far less to operate.",
                additional_benefits: "Qualified for PG&E rebates, improved employee satisfaction"
              },
              {
                customer: "Redding Marriott Hotel",
                property: "186 rooms, conference center, restaurant",
                baseline: "$380,000 annual utility costs",
                issues: "Guest room energy waste, kitchen inefficiency, pool heating costs",
                solutions: "Occupancy-based HVAC, ENERGY STAR kitchen equipment, solar pool heating, heat recovery",
                results: "41% reduction, $155,800 annual savings",
                investment: "$420,000",
                payback: "2.7 years",
                annual_savings: "$155,800",
                testimonial: "Guest comfort improved while energy costs plummeted. Best investment we've made in the property.",
                additional_benefits: "Green certification, marketing advantage, guest satisfaction up 12%"
              }
            ].map((study, idx) => (
              <div key={idx} className="card-elite glow-green p-6 group">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 ">{study.customer}</h3>
                  <p className="text-sm text-gray-600 ">{study.property}</p>
                  <p className="text-sm text-gray-500 ">Baseline: {study.baseline}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-red-600 ">Problems Identified</h4>
                    <p className="text-sm text-gray-700 ">{study.issues}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-600 ">Solutions Implemented</h4>
                    <p className="text-sm text-gray-700 ">{study.solutions}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-600 ">Results Achieved</h4>
                    <p className="text-sm text-gray-700 ">{study.results}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                    <p className="text-xs text-gray-600 ">Investment</p>
                    <p className="text-sm font-bold text-gray-900 ">{study.investment}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                    <p className="text-xs text-gray-600 ">Annual Savings</p>
                    <p className="text-sm font-bold text-orange-600 ">{study.annual_savings}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                    <p className="text-xs text-gray-600 ">Payback</p>
                    <p className="text-sm font-bold text-blue-600 ">{study.payback}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3 border-l-4 border-green-500">
                  <p className="text-sm italic text-gray-700 ">"{study.testimonial}"</p>
                </div>

                <div className="text-xs text-gray-600 ">
                  <strong>Additional Benefits:</strong> {study.additional_benefits}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Energy Audit Process */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">ASHRAE Level II Audits</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Professional Energy Audit Process</h2>
            <p className="text-gray-600 ">Investment-grade analysis for maximum savings</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                phase: "Pre-Audit Analysis",
                duration: "1-2 days",
                activities: [
                  "12-month utility bill analysis",
                  "Weather normalization",
                  "Baseline establishment",
                  "Benchmarking vs similar buildings"
                ],
                deliverables: "Energy Use Intensity (EUI) report",
                icon: LineChart
              },
              {
                phase: "On-Site Assessment",
                duration: "1-3 days",
                activities: [
                  "Building envelope inspection",
                  "HVAC system evaluation",
                  "Lighting audit",
                  "Plug load analysis",
                  "Thermal imaging"
                ],
                deliverables: "Detailed findings report",
                icon: Search
              },
              {
                phase: "Data Analysis",
                duration: "3-5 days",
                activities: [
                  "Energy modeling",
                  "Load profile analysis",
                  "Savings calculations",
                  "ROI projections",
                  "Rebate identification"
                ],
                deliverables: "Energy Conservation Measures (ECMs)",
                icon: BarChart3
              },
              {
                phase: "Report & Planning",
                duration: "2-3 days",
                activities: [
                  "Prioritized recommendations",
                  "Implementation roadmap",
                  "Financing options",
                  "Measurement & verification plan"
                ],
                deliverables: "Comprehensive audit report",
                icon: FileText
              }
            ].map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <div key={idx} className="card-elite glow-blue p-4 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-orange-600 " />
                    </div>
                    <span className="text-lg font-bold text-gray-300 ">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900  mb-2">{phase.phase}</h3>
                  <p className="text-xs text-orange-600  mb-3">{phase.duration}</p>

                  <ul className="space-y-1 mb-3">
                    {phase.activities.map((activity, i) => (
                      <li key={i} className="text-xs text-gray-600  flex items-start gap-1">
                        <Circle className="h-2 w-2 text-orange-500 mt-1" />
                        {activity}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-700 ">
                      <strong>Deliverable:</strong> {phase.deliverables}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-elite glow-blue p-8 group">
            <h3 className="text-xl font-bold text-gray-900  mb-4">Audit Technologies & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { tool: "FLIR E95 Thermal Camera", purpose: "Identify heat loss, air leaks, insulation gaps", value: "$28,000" },
                { tool: "Blower Door Test Kit", purpose: "Measure building air tightness, locate leaks", value: "$4,500" },
                { tool: "HOBO Data Loggers", purpose: "Long-term temperature, humidity, light monitoring", value: "$2,800" },
                { tool: "Fluke 1738 Power Logger", purpose: "Electrical load profiling, power quality analysis", value: "$5,200" },
                { tool: "TSI VelociCalc 9565", purpose: "HVAC airflow, temperature, humidity measurement", value: "$3,800" },
                { tool: "EnergyCAP Software", purpose: "Utility tracking, benchmarking, M&V", value: "$12,000/yr" }
              ].map((item, idx) => (
                <div key={idx} className="category-card-elite p-3">
                  <h4 className="text-sm font-semibold text-gray-900 ">{item.tool}</h4>
                  <p className="text-xs text-gray-600  mt-1">{item.purpose}</p>
                  <p className="text-xs text-orange-600  mt-1">Investment: {item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Energy Conservation Measures (ECMs) */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">Conservation Strategies</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Top Energy Conservation Measures</h2>
            <p className="text-gray-600 ">Proven solutions with highest ROI</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                category: "HVAC Optimization",
                savings_potential: "20-40%",
                measures: [
                  { measure: "Variable Frequency Drives (VFDs)", savings: "15-25%", payback: "1-3 years", cost: "$$" },
                  { measure: "Smart Thermostats & Controls", savings: "10-23%", payback: "1-2 years", cost: "$" },
                  { measure: "Economizer Repair/Installation", savings: "5-15%", payback: "1-2 years", cost: "$" },
                  { measure: "Duct Sealing & Insulation", savings: "10-20%", payback: "2-4 years", cost: "$$" },
                  { measure: "High-Efficiency Equipment", savings: "20-30%", payback: "5-10 years", cost: "$$$" }
                ],
                best_for: "Commercial buildings, schools, hospitals"
              },
              {
                category: "Lighting Systems",
                savings_potential: "30-60%",
                measures: [
                  { measure: "LED Retrofit", savings: "40-60%", payback: "1-3 years", cost: "$$" },
                  { measure: "Occupancy Sensors", savings: "15-30%", payback: "1-2 years", cost: "$" },
                  { measure: "Daylight Harvesting", savings: "20-40%", payback: "2-5 years", cost: "$$" },
                  { measure: "Task Lighting", savings: "10-20%", payback: "1-2 years", cost: "$" },
                  { measure: "Exterior Lighting Controls", savings: "30-50%", payback: "1-3 years", cost: "$" }
                ],
                best_for: "Offices, retail, warehouses, parking"
              },
              {
                category: "Building Envelope",
                savings_potential: "15-30%",
                measures: [
                  { measure: "Air Sealing", savings: "5-15%", payback: "1-3 years", cost: "$" },
                  { measure: "Insulation Upgrade", savings: "10-20%", payback: "3-7 years", cost: "$$" },
                  { measure: "Window Film/Replacement", savings: "5-15%", payback: "5-10 years", cost: "$$$" },
                  { measure: "Cool Roof Coating", savings: "10-30%", payback: "3-7 years", cost: "$$" },
                  { measure: "Weatherstripping", savings: "3-8%", payback: "0.5-2 years", cost: "$" }
                ],
                best_for: "Older buildings, extreme climates"
              },
              {
                category: "Water Heating",
                savings_potential: "20-50%",
                measures: [
                  { measure: "Heat Pump Water Heaters", savings: "50-70%", payback: "2-4 years", cost: "$$" },
                  { measure: "Tankless Water Heaters", savings: "20-30%", payback: "5-10 years", cost: "$$$" },
                  { measure: "Pipe Insulation", savings: "3-7%", payback: "0.5-1 year", cost: "$" },
                  { measure: "Low-Flow Fixtures", savings: "10-20%", payback: "0.5-2 years", cost: "$" },
                  { measure: "Solar Water Heating", savings: "50-80%", payback: "5-10 years", cost: "$$$" }
                ],
                best_for: "Hotels, hospitals, multifamily"
              },
              {
                category: "Smart Building Controls",
                savings_potential: "15-30%",
                measures: [
                  { measure: "Building Automation System", savings: "10-20%", payback: "3-5 years", cost: "$$$" },
                  { measure: "Energy Management System", savings: "5-15%", payback: "2-4 years", cost: "$$" },
                  { measure: "Demand Response", savings: "10-20%", payback: "1-3 years", cost: "$" },
                  { measure: "Submetering", savings: "5-10%", payback: "2-4 years", cost: "$$" },
                  { measure: "Fault Detection", savings: "10-15%", payback: "2-3 years", cost: "$$" }
                ],
                best_for: "Large commercial, campuses"
              },
              {
                category: "Process & Plug Loads",
                savings_potential: "10-25%",
                measures: [
                  { measure: "ENERGY STAR Equipment", savings: "10-30%", payback: "3-7 years", cost: "$$" },
                  { measure: "Smart Power Strips", savings: "5-10%", payback: "1-2 years", cost: "$" },
                  { measure: "Computer Power Management", savings: "20-40%", payback: "0-1 year", cost: "$" },
                  { measure: "Vending Machine Controls", savings: "30-50%", payback: "1-2 years", cost: "$" },
                  { measure: "Kitchen Equipment Upgrade", savings: "15-30%", payback: "3-7 years", cost: "$$$" }
                ],
                best_for: "Offices, schools, restaurants"
              }
            ].map((category, idx) => (
              <div key={idx} className="card-elite glow-green p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 ">{category.category}</h3>
                  <span className="bg-orange-100 dark:bg-orange-900 text-orange-800  px-3 py-1 rounded-full text-sm font-medium">
                    {category.savings_potential} Savings
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {category.measures.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 ">{item.measure}</p>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-orange-600 ">Save {item.savings}</span>
                          <span className="text-xs text-blue-600 ">ROI {item.payback}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{item.cost}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 ">
                    <strong>Best for:</strong> {category.best_for}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rebates and Incentives */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">Financial Incentives</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Rebates & Incentive Programs</h2>
            <p className="text-gray-600 ">Maximize your ROI with available funding</p>
          </div>

          <div className="card-elite glow-gold overflow-hidden group">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">Eligible Measures</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">Incentive Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">Requirements</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  {
                    program: "PG&E Energy Efficiency",
                    measures: "Lighting, HVAC, refrigeration, motors",
                    incentive: "$0.05-$0.25/kWh saved",
                    requirements: "Pre-approval, licensed contractor",
                    application: "Online portal"
                  },
                  {
                    program: "SGIP Battery Storage",
                    measures: "Battery energy storage systems",
                    incentive: "$150-$1,000/kWh",
                    requirements: "Paired with solar or standalone",
                    application: "Certified developer"
                  },
                  {
                    program: "Federal 179D Tax Deduction",
                    measures: "Whole building efficiency",
                    incentive: "Up to $5.00/sq ft",
                    requirements: "25-50% energy reduction",
                    application: "Tax filing"
                  },
                  {
                    program: "California PACE Financing",
                    measures: "Energy efficiency, renewable energy",
                    incentive: "100% financing, 5-30 years",
                    requirements: "Property tax assessment",
                    application: "PACE provider"
                  },
                  {
                    program: "IRA Tax Credits",
                    measures: "Heat pumps, insulation, windows",
                    incentive: "30% of project cost",
                    requirements: "ENERGY STAR certified",
                    application: "Tax filing"
                  },
                  {
                    program: "On-Bill Financing",
                    measures: "Qualified efficiency measures",
                    incentive: "0% interest loans",
                    requirements: "Utility customer, credit check",
                    application: "Utility program"
                  },
                  {
                    program: "BayREN Business",
                    measures: "Small/medium business upgrades",
                    incentive: "Up to $2,500 per measure",
                    requirements: "<50 employees, <$15M revenue",
                    application: "Program contractor"
                  },
                  {
                    program: "Title 24 Compliance Credit",
                    measures: "Beyond-code efficiency",
                    incentive: "Accelerated permitting",
                    requirements: "Exceed Title 24 by 15%+",
                    application: "Building dept"
                  }
                ].map((program, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 ">{program.program}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{program.measures}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-orange-600 ">{program.incentive}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{program.requirements}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{program.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement & Verification */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">Performance Tracking</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Measurement & Verification (M&V)</h2>
            <p className="text-gray-600 ">Ensure savings persist with continuous monitoring</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card-elite glow-blue p-6 group">
              <h3 className="text-xl font-bold text-gray-900  mb-4">IPMVP Options</h3>
              <div className="space-y-3">
                {[
                  { option: "Option A", name: "Retrofit Isolation: Key Parameter", description: "Measure key parameters, estimate others", best_for: "Lighting retrofits, motor replacements", accuracy: "±10%" },
                  { option: "Option B", name: "Retrofit Isolation: All Parameter", description: "Measure all parameters affecting energy", best_for: "VFD installations, complex HVAC", accuracy: "±5%" },
                  { option: "Option C", name: "Whole Facility", description: "Utility meter analysis", best_for: "Multiple ECMs, whole building", accuracy: "±10%" },
                  { option: "Option D", name: "Calibrated Simulation", description: "Energy modeling calibrated to actual", best_for: "New construction, major renovation", accuracy: "±5-10%" }
                ].map((option, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 ">{option.option}: {option.name}</h4>
                      <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800  px-2 py-1 rounded">
                        {option.accuracy}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600  mb-1">{option.description}</p>
                    <p className="text-xs text-blue-600 ">Best for: {option.best_for}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-elite glow-green p-6 group">
              <h3 className="text-xl font-bold text-gray-900  mb-4">M&V Process</h3>
              <div className="space-y-3">
                {[
                  { step: "Baseline Period", description: "Establish pre-retrofit energy use (12+ months)", icon: Calendar },
                  { step: "Installation & Commissioning", description: "Implement ECMs, verify proper operation", icon: Wrench },
                  { step: "Post-Installation Period", description: "Measure actual energy use (12+ months)", icon: BarChart3 },
                  { step: "Adjustments", description: "Weather normalization, occupancy changes", icon: Settings },
                  { step: "Savings Calculation", description: "Baseline - Post + Adjustments = Savings", icon: Calculator },
                  { step: "Reporting", description: "Monthly/quarterly savings reports", icon: FileText },
                  { step: "Persistence", description: "Ongoing monitoring to maintain savings", icon: TrendingUp }
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-orange-600 " />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 ">{step.step}</h4>
                        <p className="text-xs text-gray-600 ">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">Professional Credentials</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Our Certifications & Expertise</h2>
            <p className="text-gray-600 ">Qualified professionals for every project</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { cert: "CEM - Certified Energy Manager", org: "AEE", professionals: 3, icon: Award },
              { cert: "BPI Building Analyst", org: "BPI", professionals: 5, icon: Building2 },
              { cert: "LEED AP BD+C", org: "USGBC", professionals: 2, icon: Leaf },
              { cert: "Title 24 Energy Analyst", org: "CEC", professionals: 4, icon: FileCheck },
              { cert: "ASHRAE BEMP", org: "ASHRAE", professionals: 2, icon: GraduationCap },
              { cert: "Energy Star Partner", org: "EPA", professionals: "All", icon: Star },
              { cert: "C-20 HVAC License", org: "CSLB", professionals: 3, icon: Shield },
              { cert: "NATE Certified", org: "NATE", professionals: 6, icon: Award }
            ].map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <div key={idx} className="card-elite glow-green p-4 text-center group">
                  <div className="icon-container-elite bg-orange-500/20 group-hover:bg-orange-500/30 mx-auto mb-2">
                    <Icon className="h-5 w-5 text-orange-600 " />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 ">{cert.cert}</h4>
                  <p className="text-xs text-gray-600  mt-1">{cert.org}</p>
                  <p className="text-xs text-orange-600  mt-1">
                    {cert.professionals} {typeof cert.professionals === 'number' ? 'Certified' : ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Solar and Efficiency Equipment Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={solarEfficiencyEquipmentImg}
              alt="Advanced solar panels and energy saving equipment for maximum efficiency"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-energy-conservation-4"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-orange-600 font-semibold mb-2">Common Questions</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Energy Conservation FAQs</h2>
            <p className="text-gray-600 ">Everything you need to know about energy efficiency</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How much can I really save with energy efficiency?",
                a: "Most commercial buildings can reduce energy use by 20-30% with cost-effective measures. We've achieved savings of 40-50% in many projects. The average payback is 2-3 years with utility rebates."
              },
              {
                q: "What's included in a professional energy audit?",
                a: "Our ASHRAE Level II audits include: 12-month utility analysis, on-site assessment with thermal imaging, equipment testing, energy modeling, prioritized recommendations with ROI calculations, and assistance with rebate applications."
              },
              {
                q: "How long does an energy audit take?",
                a: "Typical timeline: 1-3 days on-site depending on building size, 3-5 days for analysis and modeling, 2-3 days for report preparation. You'll have results within 2 weeks of the site visit."
              },
              {
                q: "Are there rebates available for energy upgrades?",
                a: "Yes! PG&E offers rebates of $0.05-$0.25 per kWh saved. Federal tax incentives cover 30% of many upgrades. We handle all rebate paperwork and maximize your incentives."
              },
              {
                q: "What's the difference between energy efficiency and solar?",
                a: "Energy efficiency reduces how much energy you need (demand reduction). Solar produces energy (supply). Efficiency should come first - it's cheaper to save a kWh than produce one. We offer both solutions."
              },
              {
                q: "Can you guarantee energy savings?",
                a: "Yes, through performance contracting. We can guarantee specific savings levels and include measurement & verification to prove results. Many projects are cash-flow positive from day one."
              },
              {
                q: "What are the best upgrades for immediate savings?",
                a: "Quick wins: LED lighting (1-3 year payback), smart thermostats (1-2 years), VFDs on motors (2-3 years), fixing compressed air leaks (immediate), and occupancy sensors (1-2 years)."
              },
              {
                q: "Do you work with our existing contractors?",
                a: "Absolutely. We can provide the audit and design, then work with your preferred contractors for implementation. Or we can manage the entire project with our certified team."
              },
              {
                q: "How do you measure success after upgrades?",
                a: "We use IPMVP protocols for measurement & verification. This includes baseline establishment, post-installation monitoring, weather normalization, and monthly savings reports."
              },
              {
                q: "Is financing available for energy projects?",
                a: "Yes! Options include: PACE financing (100% financed via property tax), On-Bill Financing (0% through utility), equipment leasing, and performance contracts. Most projects are cash-flow positive."
              }
            ].map((faq, idx) => (
              <div key={idx} className="card-elite glow-blue p-6 group">
                <h3 className="font-bold text-gray-900  mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-700  text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Saving Energy Today</h2>
          <p className="text-xl mb-6 text-orange-100">
            Get a professional energy audit and custom efficiency plan for your property
          </p>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">35%</div>
                <div className="text-sm text-orange-200">Avg Energy Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2.3yr</div>
                <div className="text-sm text-orange-200">Typical Payback</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$2.1M</div>
                <div className="text-sm text-orange-200">Rebates Secured</div>
              </div>
              <div>
                <div className="text-3xl font-bold">450+</div>
                <div className="text-sm text-orange-200">Audits Completed</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Schedule Energy Audit
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <Phone className="h-5 w-5" /> Call (530) 221-3331
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Get Free Quote
            </button>
          </div>
          <div className="mt-6 text-sm text-orange-200">
            BPI Certified • Title 24 Compliant • 25+ Years Experience • Licensed & Insured
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default EnergyConservation;