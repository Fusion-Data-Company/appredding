import React, { useState, useEffect } from "react";
import { Leaf, Lightbulb, ThermometerSun, Wind, Droplets, Home, Shield, AlertTriangle, CheckCircle, TrendingUp, CircleDollarSign, BarChart, DollarSign, Calculator, Zap, Eye, FileCheck, ChevronRight, ArrowRight, Building2, Factory, Gauge, Timer, Settings, Info, Target, Activity, Battery, Power, Sun, Cloud, Snowflake, Flame, Award, Package, Wrench, Component, Cpu, Lock, Database, Globe, MapPin, Users, Phone, Mail, MessageSquare, Calendar, Clock, Star, Heart, Bell, Search, Filter, Layers, Grid, Box, Hexagon } from "lucide-react";
import { motion } from "framer-motion";

const EnergyConservation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedService, setSelectedService] = useState("audit");
  const [energyUsage, setEnergyUsage] = useState(3500);
  const [efficiency, setEfficiency] = useState(65);
  const [savings, setSavings] = useState(0);
  const [temperature, setTemperature] = useState(72);

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
    <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Live Metrics */}
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Comprehensive Energy Conservation</h1>
            <p className="text-xl mb-6 text-green-100">Reduce energy consumption by 30-50% with professional efficiency upgrades</p>

            {/* Live Energy Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Activity className="h-5 w-5 mb-2 text-green-200" />
                <div className="text-2xl font-bold">{energyUsage.toFixed(0)}</div>
                <div className="text-sm text-green-200">kWh Usage</div>
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
              <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition flex items-center gap-2">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Professional Conservation Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive energy reduction strategies tailored to your property</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(conservationServices).map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedService === service
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {conservationServices[service].name.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {conservationServices[selectedService].name}
              </h3>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {conservationServices[selectedService].savings} Savings
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {conservationServices[selectedService].description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <CheckCircle className="h-5 w-5 text-green-500" /> Key Features
                </h4>
                <ul className="space-y-2">
                  {conservationServices[selectedService].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">ROI Period</span>
                    <span className="font-bold text-gray-900 dark:text-white">{conservationServices[selectedService].roi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Investment Range</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{conservationServices[selectedService].price}</span>
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Audit Process */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Diagnostic Assessment</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Professional Energy Audit Process</h2>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive analysis using advanced building science techniques</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Audit Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
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
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.step}</h4>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Equipment */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Cpu className="h-6 w-6 text-green-500" /> Diagnostic Equipment
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
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{item.tool}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.spec}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Measures: {item.measure}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>BPI Certified:</strong> Our auditors are Building Performance Institute certified professionals using calibrated equipment meeting RESNET standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Building Science Principles */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Technical Foundation</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Building Science Principles</h2>
            <p className="text-gray-600 dark:text-gray-400">Understanding the physics of energy efficiency</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
              {buildingScience.map((concept, idx) => (
                <div key={idx} className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{concept.concept}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{concept.description}</p>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span className="text-gray-500">Impact: {concept.impact}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Advanced HVAC Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400">High-efficiency heating and cooling with heat pump technology</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Heat Pump Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Wind className="h-6 w-6 text-blue-500" /> Heat Pump Technology
              </h3>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Air-Source Heat Pumps</span>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                      300-400% Efficient
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Modern heat pumps achieve 3-4 COP (Coefficient of Performance), delivering 3-4 units of heat for every unit of electricity consumed.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">Heating:</span>
                      <strong className="text-gray-900 dark:text-white"> HSPF2 10+</strong>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">Cooling:</span>
                      <strong className="text-gray-900 dark:text-white"> SEER2 20+</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Ground-Source (Geothermal)</span>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">
                      400-600% Efficient
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Geothermal systems use stable ground temperatures for exceptional efficiency year-round.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">COP:</span>
                      <strong className="text-gray-900 dark:text-white"> 4.0-6.0</strong>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2">
                      <span className="text-gray-500">EER:</span>
                      <strong className="text-gray-900 dark:text-white"> 20-30</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cold Climate Performance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
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
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
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
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.feature}</h4>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">{item.savings}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Insulation & Air Sealing</h2>
            <p className="text-gray-600 dark:text-gray-400">Creating an efficient thermal boundary for your building</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* R-Value Requirements */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <Home className="h-5 w-5 text-green-500" /> Insulation R-Values (Climate Zone 3)
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
                        <span className="font-medium text-gray-900 dark:text-white">{item.area}</span>
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">
                          {item.savings}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Current:</span>
                          <span className="text-gray-700 dark:text-gray-300"> {item.current}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Target:</span>
                          <span className="text-green-600 dark:text-green-400 font-medium"> {item.recommended}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Air Sealing Priority Areas */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
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
                        <span className="font-medium text-gray-900 dark:text-white">{item.area}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.leakage === "High" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" :
                          item.leakage === "Medium" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300" :
                          "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        }`}>
                          {item.leakage} Priority
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.method}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Air Leakage Standards */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Air Leakage Standards (ACH50)</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">10-15</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Old/Leaky</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">7-10</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Average</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">3-7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Efficient</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">&lt;3</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Passive House</div>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Smart Home Energy Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Intelligent systems that optimize energy use automatically</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartHomeIntegration.map((system, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <Component className="h-8 w-8 text-blue-500" />
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{system.savings} Savings</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{system.system}</h3>
                <ul className="space-y-2">
                  {system.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Energy Efficiency Metrics</h2>
            <p className="text-gray-600 dark:text-gray-400">Understanding efficiency ratings and certifications</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metric</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Definition</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Standard Efficiency</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">High Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {efficiencyMetrics.map((metric, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {metric.metric}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {metric.definition}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {metric.standard}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Rebates & Financing Programs</h2>
            <p className="text-gray-600 dark:text-gray-400">Take advantage of available incentives to reduce upgrade costs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rebatePrograms.map((program, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    {program.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{program.program}</h3>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{program.amount}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{program.requirements}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Incentive Stacking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Energy Savings Calculator</h2>
            <p className="text-gray-600 dark:text-gray-400">Calculate your potential savings and payback period</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Typical Project ROI</h3>
                <div className="space-y-4">
                  {[
                    { upgrade: "LED Lighting", cost: "$1,500", savings: "$600/yr", payback: "2.5 years", roi: "40%" },
                    { upgrade: "Smart Thermostat", cost: "$300", savings: "$180/yr", payback: "1.7 years", roi: "60%" },
                    { upgrade: "Attic Insulation", cost: "$2,500", savings: "$500/yr", payback: "5 years", roi: "20%" },
                    { upgrade: "Heat Pump HVAC", cost: "$8,000", savings: "$1,200/yr", payback: "6.7 years", roi: "15%" },
                    { upgrade: "Full Envelope", cost: "$12,000", savings: "$2,400/yr", payback: "5 years", roi: "20%" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.upgrade}</h4>
                        <span className="text-sm font-bold text-green-600">{item.roi} ROI</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <div className="font-medium">{item.cost}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Savings:</span>
                          <div className="font-medium text-green-600">{item.savings}</div>
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
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Calculator</h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Energy Bill</label>
                      <input type="range" min="100" max="500" defaultValue="250" className="w-full mt-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$100</span>
                        <span className="font-bold">$250</span>
                        <span>$500</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Efficiency Improvement</label>
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
                          <p className="text-gray-600 dark:text-gray-400">Monthly Savings</p>
                          <p className="text-2xl font-bold text-green-600">$87</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Annual Savings</p>
                          <p className="text-2xl font-bold text-green-600">$1,044</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">10-Year Savings</p>
                          <p className="text-2xl font-bold text-blue-600">$12,528</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">CO₂ Reduction</p>
                          <p className="text-2xl font-bold text-green-600">3.2 tons/yr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Saving Energy Today</h2>
          <p className="text-xl mb-6 text-green-100">
            Get a professional energy audit and custom efficiency plan for your property
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Schedule Energy Audit
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <Phone className="h-5 w-5" /> Call (530) 221-3331
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Get Free Quote
            </button>
          </div>
          <div className="mt-6 text-sm text-green-200">
            BPI Certified • Title 24 Compliant • 25+ Years Experience • Licensed & Insured
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyConservation;