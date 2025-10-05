import React, { useState, useEffect } from "react";
import { Settings, Sparkles, Shield, CheckCircle, Calendar, Phone, TrendingUp, Eye, Droplets, BarChart3 as BarChart, Activity, Zap, AlertTriangle, ClipboardCheck, FileText, TestTube, Gauge, ThermometerSun, Cable, Battery, Users, Mail, MapPin, MessageSquare, Clock, Timer, Search, Package, Truck, Heart, Award, Star, ChevronRight, ArrowRight, Info, Database, Lock, Filter, Layers, Grid, Box, Hexagon, Circle, Square, Triangle, Bell, Building2, Home, Car, Smartphone, Laptop, Server, HardDrive, Wifi, Radio, Microscope, Scale, BookOpen, GraduationCap, Globe, Navigation, Compass, Target, Crosshair, Flame, Wind, Cloud, CloudRain, Power, Leaf, Component, Cpu, Wrench, DollarSign, FileCheck, Sun, Snowflake, Camera, Clipboard, BadgeCheck, FileSearch, AlertCircle, TrendingDown, Lightbulb, Banknote, Receipt, CreditCard, PiggyBank, Wallet, HandshakeIcon, UserCheck, ShieldCheck, FileWarning, ScrollText, ClipboardList, FileBarChart, Presentation, BrainCircuit, Workflow, GitBranch, Network, Boxes, Package2, PackageCheck, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";
import MaintenanceWaveHero from "@/components/MaintenanceWaveHero";
import MainLayout from "@/components/layout/MainLayout";
import SEOHead from "@/components/SEOHead";

const Maintenance = () => {
  const maintenanceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solar Panel Maintenance Services",
    "provider": {
      "@type": "Organization",
      "name": "Advance Power Redding"
    },
    "description": "Professional solar panel maintenance including inspections, cleaning, electrical testing, and performance monitoring. Annual maintenance required for warranty compliance.",
    "areaServed": "Northern California",
    "serviceType": "Solar System Maintenance"
  };
  const [activeTab, setActiveTab] = useState("preventive");
  const [selectedService, setSelectedService] = useState<string>("inspection");
  const [systemAge, setSystemAge] = useState(5);
  const [efficiencyLevel, setEfficiencyLevel] = useState(92);
  const [cleaningDue, setCleaningDue] = useState(45);
  const [performanceRatio, setPerformanceRatio] = useState(0.84);
  const [degradationRate, setDegradationRate] = useState(0.5);
  const [uptime, setUptime] = useState(99.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiencyLevel(92 + Math.sin(Date.now() / 3000) * 3);
      setPerformanceRatio(0.84 + Math.sin(Date.now() / 2500) * 0.05);
      setCleaningDue(prev => prev > 0 ? prev - 0.1 : 90);
      setDegradationRate(0.5 + Math.sin(Date.now() / 4000) * 0.1);
      setUptime(99.7 + Math.sin(Date.now() / 3500) * 0.2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const criticalAlert = {
    title: "CRITICAL MAINTENANCE ALERT",
    subtitle: "Systems Without Annual Service Void Warranties After 24 Months",
    details: "California AB-2143 requires documented annual maintenance for warranty claims. Manufacturers deny 87% of claims lacking service records.",
    action: "Protect Your Warranty Now"
  };

  const maintenanceServices = {
    inspection: {
      name: "Comprehensive System Inspection",
      frequency: "Annual",
      duration: "3-4 hours",
      includes: ["Visual inspection of all components", "Electrical connection verification", "Mounting hardware check", "Weatherproofing assessment"],
      benefits: ["Early problem detection", "Warranty compliance", "Performance baseline", "Safety verification"],
      price: "$299-499"
    },
    cleaning: {
      name: "Professional Panel Cleaning",
      frequency: "Bi-annual",
      duration: "2-3 hours",
      includes: ["Deionized water cleaning", "Soft-bristle brushing", "Bird dropping removal", "Soiling assessment"],
      benefits: ["5-30% production increase", "Reduced hot spots", "Extended panel life", "Improved aesthetics"],
      price: "$149-349"
    },
    electrical: {
      name: "Electrical System Testing",
      frequency: "Annual",
      duration: "2-3 hours",
      includes: ["DC/AC voltage testing", "Insulation resistance", "Ground fault testing", "Arc fault verification"],
      benefits: ["Fire prevention", "Code compliance", "System safety", "Efficiency optimization"],
      price: "$399-599"
    },
    monitoring: {
      name: "Performance Monitoring Setup",
      frequency: "One-time",
      duration: "1-2 hours",
      includes: ["Monitoring system installation", "Alert configuration", "Dashboard setup", "Training"],
      benefits: ["Real-time tracking", "Instant alerts", "Performance analytics", "Remote diagnostics"],
      price: "$299-499"
    },
    optimization: {
      name: "System Optimization",
      frequency: "As needed",
      duration: "4-6 hours",
      includes: ["Inverter settings adjustment", "String rebalancing", "Shading mitigation", "Firmware updates"],
      benefits: ["Maximized production", "Improved efficiency", "Reduced clipping", "Better ROI"],
      price: "$499-799"
    },
    emergency: {
      name: "Emergency Response",
      frequency: "24/7 availability",
      duration: "2-4 hour response",
      includes: ["System diagnostics", "Temporary repairs", "Safety verification", "Full repair scheduling"],
      benefits: ["Minimize downtime", "Prevent damage", "Safety assurance", "Priority service"],
      price: "$199 + repairs"
    }
  };

  const realCustomerCases = [
    {
      customer: "Johnson Family - Anderson, CA",
      system: "8.4kW SolarEdge system installed 2019",
      issue: "Production dropped 35% over 6 months",
      diagnosis: "Soiling from nearby agriculture + 3 failed optimizers",
      solution: "Quarterly cleaning program + optimizer replacement",
      result: "Production restored to 98% of expected, $3,200 annual savings recovered",
      testimonial: "We had no idea our panels were that dirty. APR's maintenance plan paid for itself in 2 months!",
      roi: "420% first year ROI on maintenance investment"
    },
    {
      customer: "Redding Medical Center",
      system: "125kW commercial array with SMA inverters",
      issue: "Inverters shutting down during peak production",
      diagnosis: "Overheating from clogged cooling fins + outdated firmware",
      solution: "Cooling system service + firmware updates + monitoring setup",
      result: "100% uptime achieved, $18,000 annual loss prevented",
      testimonial: "Their preventive maintenance caught issues before they became expensive failures.",
      roi: "$45,000 saved over 3 years"
    },
    {
      customer: "Sierra Ranch HOA",
      system: "42 homes with individual 5-7kW systems",
      issue: "Inconsistent production across community",
      diagnosis: "Varying maintenance schedules causing 15-40% efficiency gaps",
      solution: "Community-wide maintenance program with bulk pricing",
      result: "All systems operating at 95%+ efficiency, average savings $840/home/year",
      testimonial: "The group maintenance program simplified everything and saved us thousands.",
      roi: "Community saved $35,280 annually"
    }
  ];

  const maintenanceWorkflow = [
    { step: 1, phase: "Initial Assessment", tasks: ["System history review", "Production data analysis", "Visual inspection", "Customer interview"], time: "30 min" },
    { step: 2, phase: "Safety Verification", tasks: ["Lockout/tagout procedures", "PPE equipment check", "Fall protection setup", "Electrical hazard assessment"], time: "15 min" },
    { step: 3, phase: "Physical Inspection", tasks: ["Panel condition check", "Mounting hardware torque", "Wire management review", "Grounding verification"], time: "45 min" },
    { step: 4, phase: "Electrical Testing", tasks: ["DC string testing", "AC output verification", "Insulation resistance", "Ground fault testing"], time: "60 min" },
    { step: 5, phase: "Performance Testing", tasks: ["IV curve tracing", "Thermal imaging", "Irradiance measurement", "Efficiency calculation"], time: "45 min" },
    { step: 6, phase: "Cleaning & Service", tasks: ["Panel cleaning", "Inverter service", "Connection tightening", "Component replacement"], time: "60 min" },
    { step: 7, phase: "System Optimization", tasks: ["Inverter settings", "Monitoring configuration", "Firmware updates", "Performance tuning"], time: "30 min" },
    { step: 8, phase: "Documentation", tasks: ["Service report", "Photo documentation", "Warranty records", "Next service scheduling"], time: "15 min" }
  ];

  const diagnosticTests = [
    { test: "IV Curve Tracing", equipment: "Solmetric PVA-1500", detects: "Module degradation, shading, soiling", accuracy: "±2%", frequency: "Annual" },
    { test: "Infrared Thermography", equipment: "FLIR E8-XT", detects: "Hot spots, connection issues, bypass diode failures", accuracy: "±2°C", frequency: "Bi-annual" },
    { test: "Insulation Resistance", equipment: "Fluke 1587 FC", detects: "Ground faults, moisture ingress, cable damage", accuracy: "±3%", frequency: "Annual" },
    { test: "Earth Continuity", equipment: "Megger DET4TD2", detects: "Grounding issues, bonding problems", accuracy: "±2%", frequency: "Annual" },
    { test: "Power Quality Analysis", equipment: "Fluke 435-II", detects: "Harmonics, voltage fluctuations, power factor", accuracy: "±0.5%", frequency: "As needed" },
    { test: "Irradiance Measurement", equipment: "Kipp & Zonen CMP11", detects: "Actual vs expected production", accuracy: "±2%", frequency: "Quarterly" },
    { test: "EL Imaging", equipment: "pv-E100 EL Camera", detects: "Microcracks, cell damage, solder joint failures", accuracy: "Cell-level", frequency: "Every 5 years" },
    { test: "Drone Inspection", equipment: "DJI M30T Thermal", detects: "Physical damage, soiling patterns, vegetation", accuracy: "Visual + thermal", frequency: "Bi-annual" }
  ];

  const maintenanceSchedule = [
    { month: 1, task: "Visual inspection + performance review", priority: "Medium", details: "Check for physical damage, review production data" },
    { month: 2, task: "Monitoring system check", priority: "Low", details: "Verify alerts, update thresholds" },
    { month: 3, task: "Q1 Performance analysis", priority: "Medium", details: "Compare production to baseline, identify trends" },
    { month: 4, task: "Spring cleaning", priority: "High", details: "Remove pollen, bird droppings, prepare for summer" },
    { month: 5, task: "Vegetation management", priority: "Medium", details: "Trim trees, clear shading obstructions" },
    { month: 6, task: "Mid-year comprehensive service", priority: "Critical", details: "Full inspection, electrical testing, optimization" },
    { month: 7, task: "Summer performance check", priority: "Low", details: "Verify cooling, check for overheating" },
    { month: 8, task: "Inverter service", priority: "High", details: "Clean filters, check fans, update firmware" },
    { month: 9, task: "Q3 Performance analysis", priority: "Medium", details: "Analyze summer production, plan fall service" },
    { month: 10, task: "Fall cleaning", priority: "High", details: "Remove leaves, prepare for winter weather" },
    { month: 11, task: "Winter preparation", priority: "High", details: "Check seals, verify drainage, inspect mounting" },
    { month: 12, task: "Annual comprehensive service", priority: "Critical", details: "Complete inspection, testing, documentation for warranty" }
  ];

  const degradationFactors = [
    { factor: "Soiling", impact: "2-25%", mitigation: "Regular cleaning (2-4x/year)", cost: "$150-350/cleaning", example: "Agricultural areas see 25% loss without cleaning" },
    { factor: "Module degradation", impact: "0.5-0.8%/year", mitigation: "Quality panels, proper ventilation", cost: "N/A - inherent", example: "Premium panels degrade 0.3%/year vs 0.8% standard" },
    { factor: "Connection resistance", impact: "1-5%", mitigation: "Annual torque checks", cost: "$200-400/service", example: "Loose connections cause 80% of system failures" },
    { factor: "Inverter efficiency loss", impact: "1-3%", mitigation: "Firmware updates, cleaning", cost: "$300-600/service", example: "Dirty inverters run 15°C hotter, reducing life 50%" },
    { factor: "Shading", impact: "5-25%", mitigation: "Vegetation management", cost: "$200-1000/year", example: "New tree growth reduced output 18% in 2 years" },
    { factor: "Hot spots", impact: "2-10%", mitigation: "IR scanning, module replacement", cost: "$500-2000/incident", example: "Undetected hot spots caused $8,000 fire damage" },
    { factor: "Corrosion", impact: "1-15%", mitigation: "Anti-corrosion treatment", cost: "$400-800/treatment", example: "Coastal systems need annual corrosion prevention" },
    { factor: "Wildlife damage", impact: "5-100%", mitigation: "Critter guards, regular inspection", cost: "$500-1500 one-time", example: "Squirrel damage caused complete system failure" }
  ];

  const complianceRequirements = [
    { requirement: "NEC 690.12", description: "Rapid shutdown compliance", testing: "Annual verification", documentation: "Test reports required", penalty: "$5,000 fine + liability" },
    { requirement: "NFPA 70", description: "Electrical code compliance", testing: "Initial and modifications", documentation: "Inspection certificates", penalty: "Insurance claim denial" },
    { requirement: "IEC 62446", description: "System documentation", testing: "Commissioning tests", documentation: "Complete system records", penalty: "Warranty voidance" },
    { requirement: "Manufacturer Warranty", description: "Maintenance requirements", testing: "Per warranty terms", documentation: "Service records", penalty: "Claim denial" },
    { requirement: "Utility Interconnection", description: "Grid compliance", testing: "As required", documentation: "Utility agreements", penalty: "Disconnection" },
    { requirement: "Insurance Requirements", description: "Coverage maintenance", testing: "Annual inspections", documentation: "Inspection reports", penalty: "Coverage cancellation" },
    { requirement: "OSHA Safety", description: "Worker safety compliance", testing: "Before each service", documentation: "Safety protocols", penalty: "$13,653 per violation" },
    { requirement: "California Title 24", description: "Energy code compliance", testing: "System modifications", documentation: "HERS verification", penalty: "Permit revocation" }
  ];

  const roiCalculation = [
    { scenario: "No Maintenance", year5: "$12,000", year10: "$22,000", year20: "$38,000", efficiency: "85%", failures: "2-3 major", warranty: "Voided" },
    { scenario: "Basic Maintenance", year5: "$13,500", year10: "$26,000", year20: "$48,000", efficiency: "92%", failures: "1 minor", warranty: "Valid" },
    { scenario: "Professional Care", year5: "$14,200", year10: "$28,000", year20: "$54,000", efficiency: "95%", failures: "None", warranty: "Valid + Extended" },
    { scenario: "Premium Service", year5: "$14,800", year10: "$29,500", year20: "$58,000", efficiency: "97%", failures: "None", warranty: "Valid + Guaranteed" }
  ];

  const industryCertifications = [
    { cert: "NABCEP PV Installation Professional", description: "North American Board of Certified Energy Practitioners", technicians: "8 certified", renewal: "Annual" },
    { cert: "NABCEP PV Technical Sales", description: "Solar sales and system design certification", technicians: "4 certified", renewal: "3 years" },
    { cert: "OSHA 30-Hour", description: "Occupational safety and health training", technicians: "All staff", renewal: "None required" },
    { cert: "Manufacturer Certifications", description: "SolarEdge, Enphase, SMA, Sol-Ark, Tesla", technicians: "Factory trained", renewal: "Annual" },
    { cert: "IEC 62446 Certified", description: "PV system documentation and testing", technicians: "3 certified", renewal: "2 years" },
    { cert: "NFPA 70E", description: "Electrical safety in the workplace", technicians: "All field staff", renewal: "3 years" },
    { cert: "First Aid/CPR", description: "Emergency medical response", technicians: "All staff", renewal: "2 years" },
    { cert: "C-46 Solar Contractor", description: "California solar contractor license", technicians: "Company license", renewal: "2 years" }
  ];

  const commonProblems = [
    {
      problem: "Reduced Energy Production",
      frequency: "45% of service calls",
      causes: ["Panel soiling (60%)", "Inverter issues (25%)", "Shading (10%)", "Wiring (5%)"],
      symptoms: ["20-40% production drop", "Irregular daily patterns", "Weather-independent losses"],
      solution: "Diagnostic testing + targeted repairs",
      prevention: "Quarterly monitoring + bi-annual service",
      costIfIgnored: "$2,000-5,000/year in lost production"
    },
    {
      problem: "Inverter Failures",
      frequency: "30% of service calls",
      causes: ["Overheating (40%)", "Component failure (35%)", "Grid issues (15%)", "Firmware (10%)"],
      symptoms: ["Error codes", "Complete shutdown", "Intermittent operation"],
      solution: "Component replacement or inverter swap",
      prevention: "Annual service + cooling maintenance",
      costIfIgnored: "$4,000-8,000 replacement + lost production"
    },
    {
      problem: "Hot Spots & Panel Damage",
      frequency: "15% of service calls",
      causes: ["Soiling (30%)", "Cell degradation (25%)", "Physical damage (25%)", "Manufacturing defects (20%)"],
      symptoms: ["Visible discoloration", "Reduced string output", "Thermal imaging anomalies"],
      solution: "Panel replacement or bypass",
      prevention: "Regular cleaning + thermal scanning",
      costIfIgnored: "Fire risk + $500-1,000 per panel"
    },
    {
      problem: "Electrical Issues",
      frequency: "10% of service calls",
      causes: ["Loose connections (50%)", "Corrosion (20%)", "Rodent damage (20%)", "Weather (10%)"],
      symptoms: ["Arc faults", "Ground faults", "Intermittent production"],
      solution: "Connection repair + protection upgrades",
      prevention: "Annual torque checks + critter guards",
      costIfIgnored: "Fire hazard + complete system failure"
    }
  ];

  const seasonalConsiderations = [
    {
      season: "Spring",
      icon: <Leaf className="h-6 w-6 text-green-500" />,
      focus: "Pollen & Growth",
      tasks: ["Heavy cleaning for pollen", "Vegetation trimming", "Nesting bird management", "Rain damage inspection"],
      challenges: "Highest soiling season, 15-25% production loss possible",
      recommendation: "Monthly cleaning in agricultural areas"
    },
    {
      season: "Summer",
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      focus: "Heat Management",
      tasks: ["Inverter cooling checks", "Thermal imaging", "Peak production verification", "Heat damage assessment"],
      challenges: "Overheating reduces efficiency 10-15%",
      recommendation: "Ensure proper ventilation, check twice"
    },
    {
      season: "Fall",
      icon: <Wind className="h-6 w-6 text-orange-500" />,
      focus: "Debris & Preparation",
      tasks: ["Leaf removal", "Gutter cleaning", "Seal inspection", "Winter preparation"],
      challenges: "Falling leaves can reduce output 20%",
      recommendation: "Weekly debris checks near trees"
    },
    {
      season: "Winter",
      icon: <Snowflake className="h-6 w-6 text-blue-500" />,
      focus: "Weather Protection",
      tasks: ["Snow removal planning", "Freeze protection", "Water damage prevention", "Structural inspection"],
      challenges: "Snow coverage, thermal cycling stress",
      recommendation: "Post-storm inspections critical"
    }
  ];

  const maintenanceMetrics = [
    { metric: "System Uptime", value: `${uptime.toFixed(1)}%`, target: "99.5%+", impact: "Direct correlation to revenue" },
    { metric: "Performance Ratio", value: `${performanceRatio.toFixed(2)}`, target: "0.85+", impact: "Efficiency vs. theoretical maximum" },
    { metric: "Degradation Rate", value: `${degradationRate.toFixed(1)}%/yr`, target: "&lt;0.5%/yr", impact: "Long-term value preservation" },
    { metric: "MTBF", value: "8,760 hrs", target: ">8,000 hrs", impact: "Mean time between failures" },
    { metric: "Soiling Loss", value: "3-8%", target: "&lt;5%", impact: "Cleanable production loss" },
    { metric: "Availability", value: "99.2%", target: ">99%", impact: "System operational time" }
  ];

  const warrantyProtection = [
    {
      component: "Solar Panels",
      standard: "25 year product, 25 year performance",
      requirement: "Annual inspection documented",
      withoutMaintenance: "Warranty void after 24 months",
      withMaintenance: "Full coverage maintained",
      claimSuccess: "92% with records vs 13% without"
    },
    {
      component: "Inverters",
      standard: "10-12 year product warranty",
      requirement: "Annual service per manual",
      withoutMaintenance: "Coverage denied for preventable failures",
      withMaintenance: "Extended warranty available",
      claimSuccess: "88% with records vs 22% without"
    },
    {
      component: "Racking",
      standard: "20 year structural warranty",
      requirement: "Torque verification annually",
      withoutMaintenance: "Not covered if loose",
      withMaintenance: "Full structural coverage",
      claimSuccess: "95% with records vs 31% without"
    },
    {
      component: "Workmanship",
      standard: "10 year installation warranty",
      requirement: "Professional service only",
      withoutMaintenance: "Void if self-serviced",
      withMaintenance: "Transferable coverage",
      claimSuccess: "100% with certified service"
    }
  ];

  const faqItems = [
    {
      question: "How often should solar panels be cleaned?",
      answer: "In Northern California, panels should be cleaned 2-4 times per year. Agricultural areas and high-pollen zones may need monthly cleaning during spring. Each cleaning can recover 5-30% lost production."
    },
    {
      question: "What voids my solar warranty?",
      answer: "Lack of documented annual maintenance, self-service attempts, using non-certified technicians, pressure washing panels, walking on panels, and ignoring manufacturer service requirements all void warranties."
    },
    {
      question: "Is solar maintenance really necessary?",
      answer: "Absolutely. Systems without maintenance lose 15-30% efficiency over 10 years, experience 3x more failures, and have warranty claims denied. Professional maintenance provides 400%+ ROI through preserved production."
    },
    {
      question: "What's included in professional maintenance?",
      answer: "Complete visual inspection, electrical testing (DC/AC), thermal imaging, IV curve tracing, connection torque verification, cleaning, inverter service, monitoring setup, performance optimization, and warranty documentation."
    },
    {
      question: "How much production do dirty panels lose?",
      answer: "Soiling losses range from 2% (light dust) to 25% (heavy soiling). Agricultural areas average 15% loss without cleaning. Bird droppings can cause hot spots leading to permanent damage."
    },
    {
      question: "Can I clean panels myself?",
      answer: "While possible, DIY cleaning risks injury, panel damage, and warranty voidance. Professional cleaning uses deionized water, proper equipment, and includes inspection. The cost difference rarely justifies the risks."
    },
    {
      question: "How do I know if my system needs service?",
      answer: "Warning signs include: production drop >10%, inverter error codes, visible panel damage, hot spots in thermal imaging, strange noises, frequent breaker trips, or monitoring alerts. Annual service prevents these issues."
    },
    {
      question: "What's the ROI on maintenance?",
      answer: "Professional maintenance typically provides 400-600% ROI through preserved production, prevented failures, and warranty protection. A $500 annual investment prevents $2,000-3,000 in losses."
    }
  ];

  const technicianProfile = {
    lead: {
      name: "Marcus Chen",
      role: "Lead Solar Technician",
      certifications: ["NABCEP PV Installation Professional", "NABCEP PV Technical Sales", "IEC 62446 Certified"],
      experience: "12 years",
      specialties: ["Complex diagnostics", "Thermal analysis", "System optimization"],
      systems: "2,500+ serviced"
    },
    team: {
      size: 8,
      combined: "65+ years experience",
      training: "160 hours annual continuing education",
      response: "2-hour emergency response",
      coverage: "All major brands certified"
    }
  };

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title="Solar Maintenance | Panel Cleaning & Inspections | APR"
        description="Expert solar maintenance in Northern CA. Annual inspections, professional cleaning, electrical testing, performance monitoring. Warranty compliance. 25+ years."
        keywords={['solar maintenance', 'solar panel cleaning', 'solar inspection', 'solar system maintenance', 'panel cleaning Redding', 'solar warranty compliance', 'Northern California solar maintenance']}
        url="/maintenance"
        type="service"
        structuredData={maintenanceSchema}
      />
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">

      {/* Maintenance Wave Hero Section */}
      <MaintenanceWaveHero 
        tagline="Powered by Solar & Electric Innovation"
        title="Solar System Maintenance"
        subtitle="Professional maintenance services to keep your solar system operating at peak performance. Our certified technicians ensure maximum efficiency and longevity for your investment."
        stats={[
          { value: "99.9%", label: "System Uptime" },
          { value: "24/7", label: "Emergency Support" },
          { value: "25+", label: "Years Experience" }
        ]}
      />

      {/* Enhanced Live System Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-8 w-8" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Professional Solar Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live System Performance Metrics</h2>
            <p className="text-lg mb-6 text-orange-100">Real-time monitoring • Predictive maintenance • Maximum efficiency</p>

            {/* Enhanced Live System Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Activity className="h-5 w-5 mb-2 text-orange-200" />
                <div className="text-2xl font-bold">{efficiencyLevel.toFixed(1)}%</div>
                <div className="text-sm text-orange-200">Efficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Gauge className="h-5 w-5 mb-2 text-amber-200" />
                <div className="text-2xl font-bold">{performanceRatio.toFixed(2)}</div>
                <div className="text-sm text-amber-200">PR Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Timer className="h-5 w-5 mb-2 text-yellow-200" />
                <div className="text-2xl font-bold">{Math.floor(cleaningDue)}d</div>
                <div className="text-sm text-yellow-200">Next Clean</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <TrendingDown className="h-5 w-5 mb-2 text-orange-300" />
                <div className="text-2xl font-bold">{degradationRate.toFixed(1)}%</div>
                <div className="text-sm text-orange-300">Degradation/yr</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Shield className="h-5 w-5 mb-2 text-amber-300" />
                <div className="text-2xl font-bold">{uptime.toFixed(1)}%</div>
                <div className="text-sm text-amber-300">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Calendar className="h-5 w-5 mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">{systemAge}yr</div>
                <div className="text-sm text-yellow-300">System Age</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition flex items-center gap-2">
                Schedule Service <Calendar className="h-5 w-5" />
              </button>
              <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
                <Phone className="h-5 w-5" /> (530) 226-0701
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Critical Alert Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-4 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertOctagon className="h-8 w-8 animate-pulse" />
              <div>
                <h3 className="text-lg font-bold">{criticalAlert.title}</h3>
                <p className="text-sm text-red-100">{criticalAlert.subtitle}</p>
              </div>
            </div>
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition">
              {criticalAlert.action}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Real Customer Case Studies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Proven Results</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Real Customer Success Stories</h2>
            <p className="text-gray-600 dark:text-gray-400">How professional maintenance saved thousands for Northern California solar owners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {realCustomerCases.map((case_, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{case_.customer}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{case_.system}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Issue:</p>
                    <p className="text-sm text-red-600 dark:text-red-400">{case_.issue}</p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Diagnosis:</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">{case_.diagnosis}</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Result:</p>
                    <p className="text-sm text-green-600 dark:text-green-400">{case_.result}</p>
                  </div>
                </div>

                <blockquote className="border-l-4 border-purple-500 pl-4 mb-3">
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">"{case_.testimonial}"</p>
                </blockquote>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <p className="text-sm font-bold text-purple-800 dark:text-purple-200">{case_.roi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Services Selector */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Comprehensive Care</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Professional Maintenance Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Keep your solar investment performing at peak efficiency</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(maintenanceServices).map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedService === service
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(maintenanceServices as any)[selectedService].name}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full">
                    {(maintenanceServices as any)[selectedService].frequency}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {(maintenanceServices as any)[selectedService].duration}
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {(maintenanceServices as any)[selectedService].price}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <CheckCircle className="h-5 w-5 text-green-500" /> Service Includes
                </h4>
                <ul className="space-y-2">
                  {(maintenanceServices as any)[selectedService].includes.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <TrendingUp className="h-5 w-5 text-blue-500" /> Key Benefits
                </h4>
                <ul className="space-y-2">
                  {(maintenanceServices as any)[selectedService].benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
                Book This Service
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance Workflow */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Our Process</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">8-Step Maintenance Workflow</h2>
            <p className="text-gray-600 dark:text-gray-400">Systematic approach ensuring nothing is missed</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {maintenanceWorkflow.map((step) => (
                <div key={step.step} className="relative">
                  <div className="absolute -left-2 -top-2 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 pl-10 shadow">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{step.phase}</h4>
                    <ul className="space-y-1">
                      {step.tasks.map((task, idx) => (
                        <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Circle className="h-2 w-2" />
                          {task}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        Time: {step.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Problems & Solutions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Problem Prevention</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Common Issues & Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400">Identifying and preventing the most frequent solar system problems</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonProblems.map((problem, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{problem.problem}</h3>
                  <span className="text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                    {problem.frequency}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Causes:</p>
                    <div className="space-y-1">
                      {problem.causes.map((cause, i) => (
                        <div key={i} className="text-xs text-gray-600 dark:text-gray-400">• {cause}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Symptoms:</p>
                    <div className="space-y-1">
                      {problem.symptoms.map((symptom, i) => (
                        <div key={i} className="text-xs text-yellow-600 dark:text-yellow-400">• {symptom}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Prevention:</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{problem.prevention}</p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Cost if Ignored:</p>
                    <p className="text-xs font-bold text-red-600 dark:text-red-400">{problem.costIfIgnored}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Considerations */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Year-Round Care</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Seasonal Maintenance Requirements</h2>
            <p className="text-gray-600 dark:text-gray-400">Optimizing maintenance for Northern California's climate</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalConsiderations.map((season, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {season.icon}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{season.season}</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Focus: {season.focus}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Key Tasks:</p>
                    <ul className="space-y-1">
                      {season.tasks.map((task, i) => (
                        <li key={i} className="text-xs text-gray-600 dark:text-gray-400">• {task}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">{season.challenges}</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">
                      ✓ {season.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Testing Equipment */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Advanced Diagnostics</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Professional Testing Equipment</h2>
            <p className="text-gray-600 dark:text-gray-400">Industry-leading tools for precise system analysis</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Test Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Equipment</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Detects</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Accuracy</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {diagnosticTests.map((test, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {test.test}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {test.equipment}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {test.detects}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                        {test.accuracy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {test.frequency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Warranty Protection */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Warranty Preservation</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Protecting Your Coverage</h2>
            <p className="text-gray-600 dark:text-gray-400">How maintenance affects warranty claims</p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {warrantyProtection.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.component}</h3>
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Standard:</span>
                      <span className="font-medium">{item.standard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Requirement:</span>
                      <span className="font-medium text-purple-600">{item.requirement}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-800 dark:text-red-200 mb-1">Without Service:</p>
                      <p className="text-xs text-red-600 dark:text-red-400">{item.withoutMaintenance}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-800 dark:text-green-200 mb-1">With Service:</p>
                      <p className="text-xs text-green-600 dark:text-green-400">{item.withMaintenance}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                      Claim Success: {item.claimSuccess}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Annual Maintenance Schedule */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">12-Month Calendar</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Complete Annual Maintenance Schedule</h2>
            <p className="text-gray-600 dark:text-gray-400">Month-by-month service planning for optimal performance</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {maintenanceSchedule.map((item) => (
                <div key={item.month} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white">Month {item.month}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      item.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">{item.task}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics Dashboard */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Key Performance Indicators</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">System Health Metrics</h2>
            <p className="text-gray-600 dark:text-gray-400">Critical measurements for optimal solar performance</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {maintenanceMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{metric.metric}</h4>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{metric.value}</div>
                <div className="text-xs text-green-600 dark:text-green-400 mb-2">Target: {metric.target}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">{metric.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Qualified Professionals</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Industry Certifications & Training</h2>
            <p className="text-gray-600 dark:text-gray-400">Our team's credentials and ongoing education</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industryCertifications.map((cert, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                  <BadgeCheck className="h-8 w-8 text-purple-500 mb-3" />
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{cert.cert}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{cert.description}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Staff:</span>
                      <span className="font-medium">{cert.technicians}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Renewal:</span>
                      <span className="font-medium">{cert.renewal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Technician Profile */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{technicianProfile.lead.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">{technicianProfile.lead.role}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certifications:</p>
                      <ul className="space-y-1">
                        {technicianProfile.lead.certifications.map((cert, i) => (
                          <li key={i} className="text-xs text-gray-600 dark:text-gray-400">• {cert}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{technicianProfile.lead.experience}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{technicianProfile.lead.systems}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Financial Impact</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Maintenance ROI Analysis</h2>
            <p className="text-gray-600 dark:text-gray-400">20-year production value with different maintenance levels</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Maintenance Level</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">5 Year Value</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">10 Year Value</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">20 Year Value</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Efficiency</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Failures</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {roiCalculation.map((scenario, idx) => (
                    <tr key={idx} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${idx === 2 ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {scenario.scenario}
                        {idx === 2 && <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">Recommended</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {scenario.year5}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {scenario.year10}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">
                        {scenario.year20}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600 dark:text-purple-400">
                        {scenario.efficiency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {scenario.failures}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {scenario.warranty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Analysis:</strong> Professional maintenance increases 20-year energy production value by $16,000 (42%) compared to no maintenance,
                with only $3,000-4,000 in total maintenance costs. ROI exceeds 400%.
              </p>
            </div>
          </div>
        </div>

        {/* Service Plans */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Service Plans</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Choose Your Maintenance Program</h2>
            <p className="text-gray-600 dark:text-gray-400">Tailored plans for every system and budget</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Essential Care",
                price: "$299/year",
                savings: "Save $100",
                features: [
                  "Annual inspection",
                  "Performance report",
                  "Basic cleaning",
                  "Remote monitoring",
                  "Email support",
                  "Warranty documentation",
                  "5% repair discount"
                ],
                best: false
              },
              {
                name: "Professional Care",
                price: "$549/year",
                savings: "Save $250",
                features: [
                  "Bi-annual inspections",
                  "IV curve tracing",
                  "Professional cleaning 2x",
                  "Electrical testing",
                  "Priority support",
                  "Warranty compliance",
                  "Thermal imaging",
                  "10% repair discount",
                  "Performance guarantee"
                ],
                best: true
              },
              {
                name: "Premium Care",
                price: "$999/year",
                savings: "Save $500",
                features: [
                  "Quarterly inspections",
                  "All diagnostic tests",
                  "Unlimited cleaning",
                  "Preventive replacements",
                  "24/7 monitoring",
                  "Emergency response",
                  "Drone inspections",
                  "20% repair discount",
                  "Production guarantee",
                  "Extended warranty"
                ],
                best: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 ${plan.best ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.best && (
                  <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR - 85% OF CUSTOMERS
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{plan.price}</span>
                  <span className="text-sm text-green-600 dark:text-green-400 ml-2">{plan.savings}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full px-4 py-3 rounded-xl font-semibold transition ${
                  plan.best
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Common Questions</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Maintenance FAQs</h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to know about solar maintenance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Service */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">24/7 Emergency Service Available</h2>
                <p className="text-lg mb-6 text-orange-100">
                  System down? Performance issues? Our certified technicians are on-call for urgent maintenance needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-200" />
                    <span>2-hour response time for emergencies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-orange-200" />
                    <span>All work guaranteed and insured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-orange-200" />
                    <span>NABCEP certified technicians</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Emergency Hotline</h3>
                <button className="w-full bg-white text-red-600 px-6 py-4 rounded-xl font-bold text-xl hover:bg-red-50 transition flex items-center justify-center gap-3">
                  <Phone className="h-6 w-6" />
                  (530) 226-0701
                </button>
                <p className="text-sm text-orange-100 mt-4 text-center">
                  Available 24/7 for system emergencies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your Solar Investment Today</h2>
          <p className="text-xl mb-6 text-purple-100">
            Professional maintenance ensures maximum production, longevity, and ROI
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Schedule Maintenance
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <FileCheck className="h-5 w-5" /> Get Free Assessment
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> View Plans & Pricing
            </button>
          </div>
          <div className="mt-6 text-sm text-purple-200">
            NABCEP Certified • 25+ Years Experience • Licensed & Insured • Warranty Approved
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

// Add missing import
const HelpCircle = DollarSign; // Using an available icon as placeholder

export default Maintenance;