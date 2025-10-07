import React, { useState, useEffect } from "react";
import { Wrench, AlertTriangle, Shield, CheckCircle, Clock, Phone, Zap, Battery, Sun, Settings, Activity, Gauge, ThermometerSun, Cpu, Component, AlertCircle, TrendingDown, DollarSign, FileCheck, Calendar, MapPin, Timer, Search, Package, Truck, Heart, Users, Award, Star, ChevronRight, ArrowRight, Info, Database, Lock, Eye, Filter, Layers, Grid, Box, Hexagon, Circle, Square, Triangle, Bell, Mail, MessageSquare, Building2, Home, Car, Smartphone, Laptop, Server, HardDrive, Wifi, Radio, Microscope, TestTube, Scale, BookOpen, GraduationCap, Globe, Navigation, Compass, Target, Crosshair, Flame, Droplets, Wind, Cloud, CloudRain, Power, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import RepairsWaveHero from "@/components/RepairsWaveHero";
import MainLayout from "@/components/layout/MainLayout";
import SEOHead from "@/components/SEOHead";
import { AwardBadge } from "@/components/ui/award-badge";
import teamRepairImage from "@assets/100 Yr Old Cabin Off Grid Gets Power 4_1759799414077.jpg";
import troubleshootingImage from "@assets/400617335_882191187089939_3988264444007076062_n-500x375.jpg";
import technicianWorkingImage from "@assets/Greg-with-panel.jpg";
import solarEquipmentImage from "@assets/Off Grid Power Shed_1759799401459.jpg";

const Repairs = () => {
  const repairsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solar Panel Repair Services",
    "provider": {
      "@type": "Organization",
      "name": "Advance Power Redding"
    },
    "description": "Expert solar panel repair services including inverter replacement, panel damage repair, electrical troubleshooting, and emergency response. 24/7 availability.",
    "areaServed": "Northern California",
    "serviceType": "Solar System Repair"
  };
  
  type RepairCategory = {
    name: string;
    urgency: string;
    frequency: string;
    symptoms: string[];
    solutions: string[];
    timeframe: string;
    cost: string;
  };

  type RepairCategories = {
    inverter: RepairCategory;
    panel: RepairCategory;
    electrical: RepairCategory;
    monitoring: RepairCategory;
    mechanical: RepairCategory;
  };

  const [activeTab, setActiveTab] = useState("diagnostics");
  const [selectedIssue, setSelectedIssue] = useState<keyof RepairCategories>("inverter");
  const [systemHealth, setSystemHealth] = useState(65);
  const [productionLevel, setProductionLevel] = useState(72);
  const [errorCount, setErrorCount] = useState(3);
  const [temperature, setTemperature] = useState(45);

  useEffect(() => {
    let animationFrameId: number;
    let lastUpdate = Date.now();

    const animate = () => {
      const now = Date.now();
      // Only update every 500ms instead of 100ms to reduce re-renders
      if (now - lastUpdate >= 500) {
        setSystemHealth(65 + Math.sin(Date.now() / 3000) * 10);
        setProductionLevel(72 + Math.sin(Date.now() / 2500) * 8);
        setErrorCount(Math.floor(3 + Math.sin(Date.now() / 4000) * 2));
        setTemperature(45 + Math.sin(Date.now() / 3500) * 5);
        lastUpdate = now;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const repairCategories: RepairCategories = {
    inverter: {
      name: "Inverter Failures",
      urgency: "Critical",
      frequency: "35% of repairs",
      symptoms: ["No power production", "Error codes", "Overheating", "Arc fault alerts"],
      solutions: ["Component replacement", "Firmware updates", "Cooling system repair", "Complete replacement"],
      timeframe: "Same day - 48 hours",
      cost: "$800-$4,500"
    },
    panel: {
      name: "Panel Damage",
      urgency: "Moderate",
      frequency: "25% of repairs",
      symptoms: ["Cracked glass", "Hot spots", "Delamination", "Discoloration"],
      solutions: ["Panel replacement", "Bypass diode repair", "Junction box repair", "Re-sealing"],
      timeframe: "2-5 days",
      cost: "$300-$800/panel"
    },
    electrical: {
      name: "Electrical Issues",
      urgency: "High",
      frequency: "20% of repairs",
      symptoms: ["Ground faults", "Arc faults", "Voltage drops", "Breaker trips"],
      solutions: ["Rewiring", "Combiner box repair", "Grounding system fix", "Breaker replacement"],
      timeframe: "Same day - 24 hours",
      cost: "$500-$2,000"
    },
    monitoring: {
      name: "Monitoring System",
      urgency: "Low",
      frequency: "10% of repairs",
      symptoms: ["Data gaps", "Communication errors", "Portal offline", "Incorrect readings"],
      solutions: ["Gateway replacement", "Antenna adjustment", "Software updates", "Sensor calibration"],
      timeframe: "1-3 days",
      cost: "$200-$800"
    },
    mechanical: {
      name: "Mounting & Racking",
      urgency: "Moderate",
      frequency: "10% of repairs",
      symptoms: ["Loose panels", "Rail damage", "Roof leaks", "Corrosion"],
      solutions: ["Re-torquing", "Rail replacement", "Flashing repair", "Anti-corrosion treatment"],
      timeframe: "1-2 days",
      cost: "$400-$1,500"
    }
  };

  const diagnosticProcess = [
    { step: "Remote Monitoring Analysis", time: "15 min", description: "Review system data and error logs" },
    { step: "Visual Inspection", time: "30 min", description: "Physical examination of all components" },
    { step: "Electrical Testing", time: "45 min", description: "IV curve tracing, insulation resistance, ground fault testing" },
    { step: "Thermal Imaging", time: "30 min", description: "Identify hot spots and failing components" },
    { step: "Performance Analysis", time: "20 min", description: "Compare actual vs expected production" },
    { step: "Report Generation", time: "20 min", description: "Detailed findings and repair recommendations" }
  ];

  const inverterBrands = [
    { brand: "SolarEdge", models: ["SE3800H-US", "SE7600H-US", "SE11400H-US"], issues: "Optimizer failures, fan issues", warranty: "12-25 years" },
    { brand: "Enphase", models: ["IQ7+", "IQ7A", "IQ8+"], issues: "Microinverter failures, communication", warranty: "25 years" },
    { brand: "SMA", models: ["Sunny Boy 3.0-7.7", "Tripower 15000TL"], issues: "Arc fault detection, grid profile", warranty: "10 years" },
    { brand: "Fronius", models: ["Primo 3.8-8.2", "Symo 10-20"], issues: "Fan failures, relay issues", warranty: "10 years" },
    { brand: "Sol-Ark", models: ["Sol-Ark 12K", "Sol-Ark 15K"], issues: "Battery communication, firmware", warranty: "10 years" },
    { brand: "Tesla", models: ["Powerwall+", "Solar Inverter"], issues: "Gateway communication, updates", warranty: "10 years" }
  ];

  const commonFailures = [
    { component: "DC Optimizers", mtbf: "20-25 years", failure_rate: "0.15%/year", symptoms: "Module shutdown, reduced production", repair: "Replace optimizer ($150-250)" },
    { component: "String Inverters", mtbf: "10-15 years", failure_rate: "0.5%/year", symptoms: "Complete shutdown, error codes", repair: "Board replacement or full swap ($800-4500)" },
    { component: "Microinverters", mtbf: "25+ years", failure_rate: "0.05%/year", symptoms: "Individual panel offline", repair: "Replace microinverter ($200-350)" },
    { component: "DC Combiner Box", mtbf: "20+ years", failure_rate: "0.2%/year", symptoms: "String failures, arc faults", repair: "Fuse/breaker replacement ($200-500)" },
    { component: "AC Disconnect", mtbf: "25+ years", failure_rate: "0.1%/year", symptoms: "System offline, breaker trips", repair: "Switch replacement ($300-600)" },
    { component: "Monitoring Gateway", mtbf: "8-10 years", failure_rate: "1%/year", symptoms: "No data reporting", repair: "Gateway replacement ($200-400)" }
  ];

  const troubleshootingGuide = [
    {
      problem: "Zero Production",
      checks: ["Check AC/DC disconnects", "Verify grid connection", "Check inverter display", "Test breakers"],
      likely_cause: "Inverter shutdown or grid outage",
      solution: "Reset inverter, check error codes"
    },
    {
      problem: "Low Production",
      checks: ["Check for shading", "Inspect panels for soiling", "Review monitoring data", "Check DC voltages"],
      likely_cause: "Dirty panels or partial shading",
      solution: "Clean panels, trim vegetation"
    },
    {
      problem: "Intermittent Production",
      checks: ["Monitor during peak hours", "Check connection torque", "Review arc fault history", "Test ground fault"],
      likely_cause: "Loose connections or arc faults",
      solution: "Retorque connections, replace connectors"
    },
    {
      problem: "Ground Fault Error",
      checks: ["Inspect wiring insulation", "Check moisture ingress", "Test isolation resistance", "Inspect connectors"],
      likely_cause: "Damaged wire insulation or water ingress",
      solution: "Repair/replace damaged wiring"
    }
  ];

  const warrantyInfo = [
    { type: "Panel Warranty", product: "25 years", power: "25-30 years @ 80%", covers: "Manufacturing defects, power output", excludes: "Physical damage, installation issues" },
    { type: "Inverter Warranty", product: "10-25 years", power: "N/A", covers: "Component failure, workmanship", excludes: "Lightning, power surges" },
    { type: "Workmanship", product: "10-25 years", power: "N/A", covers: "Installation quality, roof penetrations", excludes: "Acts of God, modifications" },
    { type: "Battery Warranty", product: "10 years", power: "10 years @ 70%", covers: "Capacity retention, defects", excludes: "Improper use, temperature damage" }
  ];

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title="Solar Repair | Emergency Service & Inverters | APR"
        description="Expert solar panel repair in Northern CA. Inverter replacement, panel damage repair, electrical troubleshooting. 24/7 emergency. Same-day service available."
        keywords={['solar panel repair', 'inverter replacement', 'solar repair Redding', 'emergency solar service', 'panel damage repair', 'solar troubleshooting', 'Northern California solar repair']}
        url="/repairs"
        type="service"
        structuredData={repairsSchema}
      />
      {/* Repairs Wave Hero Section */}
      <RepairsWaveHero 
        tagline="Orphaned System Rescue & Emergency Response"
        title="Solar System Repairs"
        subtitle="Rescuing failed solar systems across Shasta County in 7 days or less. Specializing in NEM 3.0 battery retrofits, inverter replacement (Sol-Ark, Enphase, SolarEdge), and micro-inverter diagnostics. We fix what others abandoned."
        stats={[
          { value: "24hr", label: "Emergency Response" },
          { value: "100%", label: "Repair Success Rate" },
          { value: "25+", label: "Years Experience" }
        ]}
      />


      <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Live System Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-8 w-8" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">24/7 Emergency Service</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Professional Solar Repair Services</h1>
            <p className="text-xl mb-6 text-orange-100">7-day orphaned system rescue • Same-day inverter swaps • Expert diagnostics</p>

            {/* Live System Health Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { icon: <Activity className="h-5 w-5" />, value: systemHealth.toFixed(0) + '%', label: 'System Health', gradient: 'from-red-500 via-orange-500 to-red-600', glowColor: 'rgba(239, 68, 68, 0.5)', iconBg: 'bg-red-900/30', pulseColor: 'bg-orange-400' },
                { icon: <Gauge className="h-5 w-5" />, value: productionLevel.toFixed(0) + '%', label: 'Production', gradient: 'from-orange-500 via-amber-500 to-orange-600', glowColor: 'rgba(249, 115, 22, 0.5)', iconBg: 'bg-orange-900/30', pulseColor: 'bg-orange-400' },
                { icon: <AlertTriangle className="h-5 w-5" />, value: errorCount.toString(), label: 'Active Alerts', gradient: 'from-yellow-500 via-amber-500 to-yellow-600', glowColor: 'rgba(234, 179, 8, 0.5)', iconBg: 'bg-yellow-900/30', pulseColor: 'bg-yellow-400' },
                { icon: <ThermometerSun className="h-5 w-5" />, value: temperature.toFixed(0) + '°C', label: 'Inverter Temp', gradient: 'from-red-500 via-pink-500 to-red-600', glowColor: 'rgba(236, 72, 153, 0.5)', iconBg: 'bg-pink-900/30', pulseColor: 'bg-pink-400' }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  {/* Glow background */}
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500"
                    style={{ background: card.glowColor, animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite` }}
                  />

                  {/* Card content */}
                  <div
                    className={`relative bg-gradient-to-br ${card.gradient} rounded-xl p-4 backdrop-blur-sm border border-white/20 transition-all duration-300 overflow-hidden`}
                    style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}
                  >
                    {/* Glass overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)' }} />

                    {/* Shimmer */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%, transparent 100%)', backgroundSize: '200% 100%', animation: `shimmer${idx + 1} ${3 + idx * 0.5}s infinite`, mixBlendMode: 'overlay' }} />

                    <div className="relative z-10">
                      <motion.div className={`p-2 ${card.iconBg} backdrop-blur-md rounded-lg text-white shadow-lg mb-2 inline-block`} whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                        {card.icon}
                      </motion.div>
                      <div className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>{card.value}</div>
                      <div className="text-sm text-white/90 font-medium">{card.label}</div>
                      <div className={`w-2 h-2 ${card.pulseColor} rounded-full absolute top-2 right-2`} style={{ animation: `pulse ${1.5 + idx * 0.2}s ease-in-out infinite` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition flex items-center gap-2">
                Emergency Repair <Phone className="h-5 w-5" />
              </button>
              <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
                <Clock className="h-5 w-5" /> Schedule Service
              </button>
            </div>
          </div>
        </motion.div>

        {/* Repair Categories Selector */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Common Solar Issues</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Repair Service Categories</h2>
            <p className="text-gray-600 ">Fast, professional repairs for all solar system components</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {(Object.keys(repairCategories) as Array<keyof RepairCategories>).map((category, idx) => (
              <motion.button
                key={category}
                onClick={() => setSelectedIssue(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                  selectedIssue === category
                    ? "text-white"
                    : "bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-600/80"
                }`}
                style={selectedIssue === category ? {
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #ea580c 100%)',
                  boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                } : {}}
              >
                {selectedIssue === category && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%)', backgroundSize: '200% 100%', animation: 'shimmer1 3s infinite', mixBlendMode: 'overlay' }} />
                  </>
                )}
                {repairCategories[category].name}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-elite glow-orange p-8 relative overflow-hidden"
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.1) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: 'shimmer2 5s infinite' }} />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {repairCategories[selectedIssue].name}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    repairCategories[selectedIssue].urgency === "Critical" ? "bg-red-100 text-red-800 dark:bg-red-900 " :
                    repairCategories[selectedIssue].urgency === "High" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 " :
                    repairCategories[selectedIssue].urgency === "Moderate" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 " :
                    "bg-orange-100 text-orange-800 dark:bg-orange-900 "
                  }`}>
                    {repairCategories[selectedIssue].urgency} Priority
                  </span>
                  <span className="text-sm text-gray-400">
                    {repairCategories[selectedIssue].frequency}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6 relative z-10">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                  <AlertCircle className="h-5 w-5 text-red-400" /> Common Symptoms
                </h4>
                <ul className="space-y-2">
                  {repairCategories[selectedIssue].symptoms.map((symptom, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-gray-200"
                    >
                      <ChevronRight className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-orange-400" /> Repair Solutions
                </h4>
                <ul className="space-y-2">
                  {repairCategories[selectedIssue].solutions.map((solution, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-gray-200"
                    >
                      <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="rounded-xl p-4 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Repair Time</span>
                </div>
                <p className="font-bold text-white">{repairCategories[selectedIssue].timeframe}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="rounded-xl p-4 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
                  border: '1px solid rgba(249, 115, 22, 0.3)'
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-gray-300">Typical Cost</span>
                </div>
                <p className="font-bold text-white">{repairCategories[selectedIssue].cost}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="rounded-xl p-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg relative overflow-hidden group">
                  <span className="relative z-10">Get Emergency Service</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Team Repair Work Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={teamRepairImage}
              alt="Professional solar system repair team working on emergency inverter replacement and troubleshooting"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-repairs-1"
            />
          </div>
        </div>

        {/* Diagnostic Process */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Professional Diagnostics</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Comprehensive System Analysis</h2>
            <p className="text-gray-600 ">Advanced testing to identify and resolve all issues</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Diagnostic Steps */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-elite glow-blue p-8 relative overflow-hidden"
            >
              {/* Background shimmer */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(59, 130, 246, 0.1) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: 'shimmer1 5s infinite' }} />

              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 relative z-10">
                <Search className="h-6 w-6 text-blue-400" /> Diagnostic Process
              </h3>

              <div className="space-y-4 relative z-10">
                {/* Vertical connecting line */}
                <div className="absolute left-5 top-0 bottom-12 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600 opacity-30" />

                {diagnosticProcess.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-4 relative"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-lg z-10" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white">{step.step}</h4>
                        <span className="text-xs px-2 py-1 rounded font-mono text-cyan-300" style={{ background: 'rgba(34, 211, 238, 0.15)', border: '1px solid rgba(34, 211, 238, 0.3)' }}>
                          {step.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 rounded-xl p-4 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}
              >
                <p className="text-sm text-gray-200">
                  <strong className="text-blue-300">Total Diagnostic Time:</strong> 2-3 hours typical • Same-day results • Detailed report provided
                </p>
              </motion.div>
            </motion.div>

            {/* Testing Equipment */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-elite glow-red p-8 relative overflow-hidden"
            >
              {/* Background shimmer */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(239, 68, 68, 0.1) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: 'shimmer2 5s infinite' }} />

              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 relative z-10">
                <Cpu className="h-6 w-6 text-red-400" /> Diagnostic Equipment
              </h3>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { tool: "IV Curve Tracer", model: "Solmetric PVA-1500", function: "Panel performance testing", gradient: "from-orange-500 via-red-500 to-orange-600", glow: "rgba(249, 115, 22, 0.4)" },
                  { tool: "Thermal Camera", model: "FLIR E8-XT", function: "Hot spot detection", gradient: "from-red-500 via-orange-500 to-red-600", glow: "rgba(239, 68, 68, 0.4)" },
                  { tool: "Irradiance Meter", model: "Solar-100", function: "Solar radiation measurement", gradient: "from-yellow-500 via-orange-500 to-yellow-600", glow: "rgba(234, 179, 8, 0.4)" },
                  { tool: "Insulation Tester", model: "Fluke 1587", function: "Ground fault detection", gradient: "from-blue-500 via-cyan-500 to-blue-600", glow: "rgba(59, 130, 246, 0.4)" },
                  { tool: "Power Analyzer", model: "Fluke 435-II", function: "Power quality analysis", gradient: "from-orange-500 via-amber-500 to-orange-600", glow: "rgba(249, 115, 22, 0.4)" },
                  { tool: "DC Clamp Meter", model: "Fluke 393 FC", function: "String current measurement", gradient: "from-green-500 via-emerald-500 to-green-600", glow: "rgba(34, 197, 94, 0.4)" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500" style={{ background: item.glow }} />

                    {/* Card */}
                    <div className={`relative spec-card-elite bg-gradient-to-br ${item.gradient} p-4 overflow-hidden`} style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}>
                      {/* Glass overlay */}
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)' }} />

                      <div className="relative z-10">
                        <h4 className="font-semibold text-white text-sm mb-1">{item.tool}</h4>
                        <p className="text-xs text-gray-200 opacity-80">{item.model}</p>
                        <p className="text-xs text-white/90 mt-1 font-medium">{item.function}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 rounded-xl p-4 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
                  border: '1px solid rgba(249, 115, 22, 0.3)'
                }}
              >
                <p className="text-sm text-gray-200">
                  <strong className="text-orange-300">Certified Technicians:</strong> NABCEP certified, manufacturer trained on all major brands
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Troubleshooting Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={troubleshootingImage}
              alt="Expert technician performing inverter troubleshooting and diagnostic testing on solar panel system"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-repairs-2"
            />
          </div>
        </div>

        {/* Inverter Expertise */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Inverter Specialists</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">All Major Brands Serviced</h2>
            <p className="text-gray-600 ">Factory-trained technicians for warranty and out-of-warranty repairs</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-elite glow-orange overflow-hidden relative"
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.1) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: 'shimmer3 6s infinite' }} />

            <div className="overflow-x-auto relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-orange-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(249, 115, 22, 0.1) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700/50" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)', backdropFilter: 'blur(10px)' }}>
                      <th className="px-6 py-4 text-left text-xs font-bold text-orange-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                          Brand
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Models Serviced</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Common Issues</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Warranty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {inverterBrands.map((brand, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="hover:bg-white/5 transition-all duration-300 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-300 group-hover:text-orange-200 transition-colors">
                          {brand.brand}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          {brand.models.join(", ")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          {brand.issues}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 rounded-lg text-blue-300 font-mono" style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                            {brand.warranty}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Component Failure Rates */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Reliability Data</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Component Failure Analysis</h2>
            <p className="text-gray-600 ">Understanding system reliability and maintenance needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonFailures.map((component, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                  style={{ background: 'rgba(249, 115, 22, 0.4)', animation: `pulse ${2.5 + idx * 0.3}s ease-in-out infinite` }}
                />

                {/* Card */}
                <div className="relative card-elite glow-orange p-6 overflow-hidden" style={{ backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)' }}>
                  {/* Glass overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)' }} />

                  {/* Shimmer */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`, mixBlendMode: 'overlay' }} />

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      {component.component}
                    </h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">MTBF</span>
                        <span className="text-sm font-semibold text-white">{component.mtbf}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Failure Rate</span>
                        <span className="text-sm font-semibold text-orange-300">{component.failure_rate}</span>
                      </div>
                    </div>

                    <div className="border-t border-orange-500/30 pt-3">
                      <p className="text-xs text-gray-200 mb-2">
                        <strong className="text-white">Symptoms:</strong> {component.symptoms}
                      </p>
                      <p className="text-xs text-orange-300">
                        <strong>Repair:</strong> {component.repair}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-50" style={{ background: 'linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.6), transparent)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Troubleshooting Guide */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Quick Reference</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Troubleshooting Guide</h2>
            <p className="text-gray-600 ">Common problems and their solutions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {troubleshootingGuide.map((item, idx) => (
              <div key={idx} className="card-elite glow-blue p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{item.problem}</h3>
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700  mb-2">Diagnostic Checks:</h4>
                    <ul className="space-y-1">
                      {item.checks.map((check, i) => (
                        <li key={i} className="text-sm text-gray-600  flex items-center gap-2">
                          <Circle className="h-2 w-2 text-blue-500" />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                    <p className="text-sm">
                      <strong className="text-orange-600 ">Likely Cause:</strong> {item.likely_cause}
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                    <p className="text-sm">
                      <strong className="text-orange-600 ">Solution:</strong> {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Service */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">24/7 Availability</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Emergency Repair Service</h2>
            <p className="text-gray-600 ">Rapid response for critical solar system failures</p>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Emergency Response Times</h3>
                <div className="space-y-4">
                  {[
                    { priority: "Critical (No Production)", time: "2-4 hours", description: "Complete system failure" },
                    { priority: "High (Safety Issue)", time: "Same day", description: "Arc faults, ground faults, fire risk" },
                    { priority: "Medium (Partial Loss)", time: "24-48 hours", description: "String failures, monitoring issues" },
                    { priority: "Low (Minor Issue)", time: "2-5 days", description: "Cosmetic damage, minor alerts" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.priority}</h4>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{item.time}</span>
                      </div>
                      <p className="text-sm text-orange-100">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Service Coverage Area</h3>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-orange-200" />
                      <span>Redding, CA - Immediate response</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-orange-200" />
                      <span>Shasta County - Same day service</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-orange-200" />
                      <span>North State Region - 24-48 hour response</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm mb-4">Emergency Hotline Available 24/7</p>
                    <button className="w-full bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      (530) 226-0701
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Information */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Coverage Details</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Warranty & Service Agreements</h2>
            <p className="text-gray-600 ">Understanding your coverage and repair options</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-elite glow-green overflow-hidden relative"
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(34, 197, 94, 0.1) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: 'shimmer1 5s infinite' }} />

            <div className="overflow-x-auto relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-green-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(34, 197, 94, 0.1) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700/50" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)', backdropFilter: 'blur(10px)' }}>
                      <th className="px-6 py-4 text-left text-xs font-bold text-green-300 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          Warranty Type
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Product Coverage</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">What's Covered</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Exclusions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {warrantyInfo.map((warranty, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="hover:bg-white/5 transition-all duration-300 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-300 group-hover:text-green-200 transition-colors">
                          {warranty.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          {warranty.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          {warranty.power}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          {warranty.covers}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          {warranty.excludes}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technician Working Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={technicianWorkingImage}
              alt="Certified technician fixing solar panel installation with expert emergency repair service"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-repairs-3"
            />
          </div>
        </div>

        {/* Real Customer Case Studies Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Success Stories</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Real Solar System Rescues</h2>
            <p className="text-gray-600 ">Actual repairs completed for Northern California customers</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                customer: "Martinez Family - Redding, CA",
                system: "12.6kW Enphase system with IQ7+ microinverters",
                installed: "March 2018 by defunct Solar Company XYZ",
                issue: "Complete system failure - no production for 3 months",
                timeline: "Orphaned when installer went bankrupt in 2022",
                diagnosis: "17 failed microinverters, corroded AC trunk cables, gateway offline",
                solution: "Emergency same-day response, replaced all failed components under new service agreement",
                result: "System restored to 99.2% of original capacity within 48 hours",
                savings_recovered: "$4,800/year production value restored",
                testimonial: "We thought our solar investment was lost when our installer disappeared. North State Solar rescued our system and it's performing better than new!",
                roi: "Repair cost recovered in 8 months through restored production"
              },
              {
                customer: "Anderson Medical Center - Anderson, CA",
                system: "235kW commercial system with SMA Tripower inverters",
                installed: "2016 ground mount installation",
                issue: "Repeated inverter shutdowns during peak demand, losing $2,000/day",
                timeline: "Problem persisted for 6 weeks with original installer",
                diagnosis: "Grid profile mismatch, overheating due to blocked ventilation, firmware severely outdated",
                solution: "Reprogrammed grid settings, cleared obstructions, comprehensive firmware updates, added active cooling",
                result: "Zero shutdowns in 18 months since repair, peak shaving restored",
                savings_recovered: "$84,000 annual demand charge reduction restored",
                testimonial: "North State Solar accomplished in 2 days what our original installer couldn't fix in 6 weeks.",
                roi: "Investment recovered in less than 30 days"
              }
            ].map((case_study, idx) => (
              <div key={idx} className="card-elite glow-green p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">{case_study.customer}</h3>
                  <p className="text-sm text-gray-600 ">{case_study.system}</p>
                  <p className="text-xs text-gray-500  mt-1">Installed: {case_study.installed}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-red-600 ">Problem</h4>
                    <p className="text-sm text-gray-700 ">{case_study.issue}</p>
                    <p className="text-xs text-gray-500  mt-1">{case_study.timeline}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-600 ">Diagnosis</h4>
                    <p className="text-sm text-gray-700 ">{case_study.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-600 ">Solution</h4>
                    <p className="text-sm text-gray-700 ">{case_study.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-600 ">Result</h4>
                    <p className="text-sm text-gray-700 ">{case_study.result}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                    <p className="text-xs text-gray-600 ">Savings Recovered</p>
                    <p className="text-lg font-bold text-orange-600 ">{case_study.savings_recovered}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <p className="text-xs text-gray-600 ">ROI</p>
                    <p className="text-sm font-bold text-blue-600 ">{case_study.roi}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border-l-4 border-green-500">
                  <p className="text-sm italic text-gray-700 ">"{case_study.testimonial}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Repair Process */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Our Process</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">8-Step Repair Workflow</h2>
            <p className="text-gray-600 ">From emergency call to follow-up monitoring</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: 1,
                title: "Emergency Call",
                duration: "0-5 minutes",
                description: "24/7 hotline answered by certified technician",
                icon: Phone
              },
              {
                step: 2,
                title: "Remote Diagnostics",
                duration: "5-30 minutes",
                description: "Initial system analysis via monitoring platform",
                icon: Wifi
              },
              {
                step: 3,
                title: "Technician Dispatch",
                duration: "30 min - 4 hours",
                description: "Certified technician deployed with equipment",
                icon: Truck
              },
              {
                step: 4,
                title: "On-Site Assessment",
                duration: "30-60 minutes",
                description: "Comprehensive system inspection and testing",
                icon: Search
              },
              {
                step: 5,
                title: "Repair Execution",
                duration: "1-6 hours",
                description: "Component replacement or repair performed",
                icon: Wrench
              },
              {
                step: 6,
                title: "Testing & Verification",
                duration: "30-45 minutes",
                description: "Confirm system operating at full capacity",
                icon: Gauge
              },
              {
                step: 7,
                title: "Documentation",
                duration: "15-20 minutes",
                description: "Complete repair records and warranty docs",
                icon: FileCheck
              },
              {
                step: 8,
                title: "Follow-Up",
                duration: "7-30 days",
                description: "Ensure continued optimal performance",
                icon: Shield
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="spec-card-elite glow-blue p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-300 ">
                      {step.step.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900  mb-1">{step.title}</h4>
                  <p className="text-xs text-orange-600  mb-2">{step.duration}</p>
                  <p className="text-sm text-gray-600 ">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Problems & Solutions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Troubleshooting</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Common Solar Problems</h2>
            <p className="text-gray-600 ">Quick diagnosis and solutions</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                problem: "Zero Production",
                frequency: "25% of calls",
                symptoms: ["No power generation", "Inverter shows errors", "Monitoring offline"],
                causes: ["Grid outage", "Inverter failure", "Breaker tripped", "AC disconnect off"],
                solution: "Check grid connection, reset inverter, verify all disconnects are on",
                repair_time: "30 min - 4 hours",
                cost_range: "$150-$2,500"
              },
              {
                problem: "Low Production",
                frequency: "35% of calls",
                symptoms: ["Below expected output", "Gradual decline", "Weather-independent losses"],
                causes: ["Soiling/dirt", "Shading issues", "Failed optimizers", "Panel degradation"],
                solution: "Clean panels, trim vegetation, test individual strings, thermal imaging",
                repair_time: "2-6 hours",
                cost_range: "$200-$800"
              },
              {
                problem: "Arc Fault Errors",
                frequency: "15% of calls",
                symptoms: ["AFCI trips", "Intermittent shutdowns", "Error code 29/64"],
                causes: ["Loose connections", "Damaged MC4", "Wire insulation damage", "Moisture ingress"],
                solution: "Inspect all DC connections, replace damaged connectors, seal penetrations",
                repair_time: "2-4 hours",
                cost_range: "$300-$600"
              },
              {
                problem: "Ground Fault",
                frequency: "10% of calls",
                symptoms: ["GFDI error", "Isolation fault", "System shutdown"],
                causes: ["Damaged wiring", "Water intrusion", "Rodent damage", "Corrosion"],
                solution: "Megger testing, inspect conduits, replace damaged wiring, improve sealing",
                repair_time: "3-6 hours",
                cost_range: "$400-$1,200"
              },
              {
                problem: "Communication Loss",
                frequency: "8% of calls",
                symptoms: ["No monitoring data", "Gaps in reporting", "Portal offline"],
                causes: ["Gateway failure", "Internet issues", "Antenna problems", "Firmware bugs"],
                solution: "Reset gateway, check network settings, update firmware, replace equipment",
                repair_time: "1-3 hours",
                cost_range: "$200-$400"
              },
              {
                problem: "Physical Damage",
                frequency: "7% of calls",
                symptoms: ["Cracked panels", "Loose mounting", "Roof leaks"],
                causes: ["Hail/weather", "Installation issues", "Thermal cycling", "Impact damage"],
                solution: "Panel replacement, re-secure mounting, repair flashing, seal penetrations",
                repair_time: "4-8 hours",
                cost_range: "$500-$2,000"
              }
            ].map((issue, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                  style={{ background: 'rgba(249, 115, 22, 0.4)', animation: `pulse ${2.5 + idx * 0.3}s ease-in-out infinite` }}
                />

                {/* Card */}
                <div className="relative card-elite glow-orange p-6 overflow-hidden" style={{ backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)' }}>
                  {/* Glass overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)' }} />

                  {/* Shimmer */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`, mixBlendMode: 'overlay' }} />

                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      {issue.problem}
                    </h3>
                    <span className="text-sm px-2 py-1 rounded-full text-red-300 font-semibold" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                      {issue.frequency}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm relative z-10">
                    <div>
                      <h4 className="font-semibold text-white mb-1">Symptoms</h4>
                      <ul className="space-y-1">
                        {issue.symptoms.map((symptom, i) => (
                          <li key={i} className="text-gray-200 flex items-center gap-2">
                            <Circle className="h-2 w-2 text-red-400 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-1">Common Causes</h4>
                      <ul className="space-y-1">
                        {issue.causes.map((cause, i) => (
                          <li key={i} className="text-gray-200 flex items-center gap-2">
                            <Triangle className="h-2 w-2 text-orange-400 flex-shrink-0" />
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg p-3" style={{ background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                      <h4 className="font-semibold text-orange-300 mb-1">Solution</h4>
                      <p className="text-gray-200">{issue.solution}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg p-2" style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                        <p className="text-xs text-gray-300">Repair Time</p>
                        <p className="text-sm font-semibold text-white">{issue.repair_time}</p>
                      </div>
                      <div className="rounded-lg p-2" style={{ background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                        <p className="text-xs text-gray-300">Cost Range</p>
                        <p className="text-sm font-semibold text-orange-300">{issue.cost_range}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-50" style={{ background: 'linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.6), transparent)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Response Protocol */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">24/7 Response</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Emergency Service Protocol</h2>
            <p className="text-gray-600 ">Priority-based rapid response system</p>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  priority: "P1 - Critical",
                  response: "0-2 hours",
                  examples: "Fire risk, exposed wiring, safety hazard",
                  color: "red"
                },
                {
                  priority: "P2 - Urgent",
                  response: "2-6 hours",
                  examples: "Complete system failure, zero production",
                  color: "orange"
                },
                {
                  priority: "P3 - Standard",
                  response: "24 hours",
                  examples: "Partial failure, string offline, monitoring issue",
                  color: "yellow"
                },
                {
                  priority: "P4 - Routine",
                  response: "2-3 days",
                  examples: "Low production, cosmetic issues, upgrades",
                  color: "green"
                }
              ].map((level, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <h4 className="font-bold text-lg mb-2">{level.priority}</h4>
                  <div className="bg-white/20 rounded-full px-3 py-1 text-sm inline-block mb-3">
                    {level.response}
                  </div>
                  <p className="text-sm text-orange-100">{level.examples}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid lg:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Hotline
                </h4>
                <p className="text-2xl font-bold">(530) 226-0701</p>
                <p className="text-sm text-orange-100">Available 24/7/365</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Service Area
                </h4>
                <p className="text-sm">Redding, Anderson, Shasta Lake</p>
                <p className="text-sm text-orange-100">All of Northern California</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  On-Call Team
                </h4>
                <p className="text-sm">12 certified technicians</p>
                <p className="text-sm text-orange-100">3 emergency response vehicles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Qualified Team</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Industry Certifications</h2>
            <p className="text-gray-600 ">Our technicians hold the highest industry credentials</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { cert: "NABCEP PV Professional", count: "8 Certified", icon: Award },
              { cert: "OSHA 30 Safety", count: "All Technicians", icon: Shield },
              { cert: "SolarEdge Advanced", count: "6 Certified", icon: Star },
              { cert: "Enphase Platinum", count: "4 Certified", icon: Award },
              { cert: "C-10 Electrical", count: "6 Licensed", icon: Zap },
              { cert: "Factory Trained", count: "All Brands", icon: GraduationCap }
            ].map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <div key={idx} className="spec-card-elite glow-orange p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                  <h4 className="text-sm font-semibold text-white">{cert.cert}</h4>
                  <p className="text-xs text-gray-600  mt-1">{cert.count}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Repair Cost Guide */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Pricing Transparency</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Typical Repair Costs</h2>
            <p className="text-gray-600 ">Upfront, honest pricing for common repairs</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-elite glow-blue overflow-hidden relative"
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(110deg, transparent 20%, rgba(59, 130, 246, 0.1) 50%, transparent 80%)', backgroundSize: '200% 100%', animation: 'shimmer2 5s infinite' }} />

            <div className="overflow-x-auto relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700/50" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)', backdropFilter: 'blur(10px)' }}>
                      <th className="px-6 py-3 text-left text-xs font-bold text-blue-300 uppercase">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          Repair Type
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase">Parts Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase">Labor Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase">Total Range</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {[
                      { type: "Optimizer Replacement", parts: "$120-180", labor: "$125-250", total: "$245-430", time: "1-2 hours" },
                      { type: "Microinverter Swap", parts: "$200-350", labor: "$125-250", total: "$325-600", time: "1-2 hours" },
                      { type: "String Inverter Repair", parts: "$800-2000", labor: "$375-750", total: "$1,175-2,750", time: "3-6 hours" },
                      { type: "Panel Replacement", parts: "$280-450", labor: "$250-500", total: "$530-950", time: "2-4 hours" },
                      { type: "Arc Fault Resolution", parts: "$50-200", labor: "$250-500", total: "$300-700", time: "2-4 hours" },
                      { type: "Ground Fault Repair", parts: "$100-300", labor: "$375-750", total: "$475-1,050", time: "3-6 hours" },
                      { type: "Monitoring Gateway", parts: "$350-500", labor: "$125-250", total: "$475-750", time: "1-2 hours" },
                      { type: "Complete Rewire", parts: "$200-500", labor: "$500-1500", total: "$700-2,000", time: "4-12 hours" }
                    ].map((repair, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="hover:bg-white/5 transition-all duration-300 group"
                      >
                        <td className="px-6 py-4 text-sm font-bold text-white group-hover:text-blue-200 transition-colors">{repair.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">{repair.parts}</td>
                        <td className="px-6 py-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">{repair.labor}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-orange-300 group-hover:text-orange-200 transition-colors">{repair.total}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded-lg text-cyan-300 font-mono" style={{ background: 'rgba(34, 211, 238, 0.15)', border: '1px solid rgba(34, 211, 238, 0.3)' }}>
                            {repair.time}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 ">
              * Service call fee: $150 (waived with repair) • Emergency service: +50% • Weekend service: +25%
            </p>
          </div>
        </div>

        {/* Solar Equipment Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={solarEquipmentImage}
              alt="Professional solar equipment and panel maintenance for emergency repair services in Northern California"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-repairs-4"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Common Questions</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Solar Repair FAQs</h2>
            <p className="text-gray-600 ">Everything you need to know about solar system repairs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How quickly can you respond to emergency repairs?",
                a: "Our average emergency response time is 2.3 hours for critical failures in the Redding/Anderson area. We maintain 24/7 on-call technicians and fully stocked service vehicles for immediate dispatch."
              },
              {
                q: "Do you service orphaned solar systems?",
                a: "Yes! We specialize in adopting systems where the original installer is no longer in business. We've rescued over 600 orphaned systems and can provide new warranty coverage."
              },
              {
                q: "What brands do you service?",
                a: "We're factory-certified for all major brands including SolarEdge, Enphase, SMA, Fronius, Sol-Ark, Tesla, and more. We can service any solar system regardless of manufacturer."
              },
              {
                q: "How much do repairs typically cost?",
                a: "Costs vary by issue: Simple fixes $200-400, component replacements $300-800, major repairs $800-2500. We provide free quotes and our service plans can reduce costs by 15-100%."
              },
              {
                q: "Can you handle warranty claims?",
                a: "Yes, we're authorized warranty service providers for most manufacturers. We handle all warranty paperwork and often have warranty parts in stock for faster repairs."
              },
              {
                q: "Should I attempt DIY solar repairs?",
                a: "No. Solar systems involve lethal DC voltages up to 600V. DIY repairs void warranties and may violate codes. Our certified technicians ensure safe, compliant repairs."
              },
              {
                q: "What causes most solar failures?",
                a: "Top causes: Inverter failures (35%), loose connections (20%), failed optimizers (15%), weather damage (10%), soiling (10%). Most are preventable with proper maintenance."
              },
              {
                q: "Do you offer preventive maintenance?",
                a: "Yes! Our maintenance plans include monitoring, cleaning, inspections, and priority service. Plans start at $15/month and prevent 90% of common failures."
              }
            ].map((faq, idx) => (
              <div key={idx} className="spec-card-elite glow-blue p-6">
                <h3 className="font-bold text-white mb-3 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
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
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Solar System Fixed Today</h2>
          <p className="text-xl mb-6 text-orange-100">
            Professional diagnostics and repairs for all solar systems • 24/7 Emergency Service
          </p>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">3,847</div>
                <div className="text-sm text-orange-200">Repairs Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2.3hr</div>
                <div className="text-sm text-orange-200">Avg Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold">627</div>
                <div className="text-sm text-orange-200">Orphan Rescues</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98.5%</div>
                <div className="text-sm text-orange-200">Uptime Restored</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition flex items-center gap-2">
              <Phone className="h-5 w-5" /> Emergency: (530) 226-0701
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Schedule Service
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <FileCheck className="h-5 w-5" /> Get Quote
            </button>
          </div>
          <div className="mt-6 text-sm text-orange-200">
            7-Day Orphan System Rescue • Same-Day Emergency Service • All Brands Serviced • NABCEP Certified
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default Repairs;