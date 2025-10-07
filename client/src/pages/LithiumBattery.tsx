import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Battery, Zap, Shield, Award, Activity, AlertTriangle, CheckCircle, TrendingUp, Cpu, Thermometer, Clock, ArrowRight, Beaker, Database, Lock, Gauge, Wrench, BarChart, DollarSign, Package, Truck, FileCheck, Phone, ChevronRight, AlertCircle, CircuitBoard, Flame, Snowflake, Droplets, Wind, Sun, Moon, Cloud, CloudRain, Timer, Settings, Info, Calculator, TrendingDown, Briefcase, Factory, Building2, Home, Car, Smartphone, Laptop, Server, HardDrive, Wifi, Radio, Microscope, TestTube, Scale, BookOpen, GraduationCap, Globe, MapPin, Navigation, Compass, Target, Crosshair, Eye, Search, Filter, Layers, Grid, Box, Hexagon, Triangle, Square, Circle, Star, Heart, ThumbsUp, Users, UserCheck, UserPlus, Mail, MessageSquare, Send, Bell, BellOff, Volume2, VolumeX, Mic, MicOff, Video, VideoOff, Camera, CameraOff, Image, Film, Music, Headphones, Speaker, Monitor, Tv, Projector, Watch, Tablet, Power, Leaf, Component } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import { MagneticButton } from "../components/ui/magnetic-button";
import { ScrollProgress } from "../components/ui/scroll-progress";
import { AnimatedCounter, LargeNumberCounter, PercentageCounter } from "../components/ui/animated-counter";
import { AwardBadge } from "../components/ui/award-badge";
import ShaderBackground from "../components/ui/shader-background";
import { Button } from "../components/ui/button";
import { useFormModal } from "@/contexts/FormModalContext";


const LithiumBattery = () => {
  const { openSolarForm } = useFormModal();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChemistry, setSelectedChemistry] = useState("lifepo4");
  const [cycleCount, setCycleCount] = useState(0);
  const [temperatureReading, setTemperatureReading] = useState(25);
  const [socLevel, setSocLevel] = useState(100);
  const [voltageReading, setVoltageReading] = useState(52.8);
  const [currentFlow, setCurrentFlow] = useState(28.5);
  const [powerOutput, setPowerOutput] = useState(1.5);

  // Minimal animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-shine {
        animation: shine 3s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-float, .animate-shine {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Static initial values - no constant updates
  useEffect(() => {
    setCycleCount(8432);
    setTemperatureReading(25.2);
    setSocLevel(98.5);
    setVoltageReading(52.8);
    setCurrentFlow(28.5);
    setPowerOutput(1.52);
  }, []);

  const chemistryData: Record<string, any> = {
    lifepo4: {
      name: "LiFePO4 (Lithium Iron Phosphate)",
      voltage: "3.2V",
      energy: "90-120 Wh/kg",
      cycles: "8,000-12,000",
      safety: "Exceptional",
      temp: "-20°C to 60°C",
      cost: "$$",
      advantages: ["Safest chemistry", "Longest cycle life", "Wide temperature range", "No thermal runaway"],
      applications: ["Home energy storage", "Solar systems", "RV/Marine", "Off-grid living"]
    },
    nmc: {
      name: "NMC (Lithium Nickel Manganese Cobalt)",
      voltage: "3.7V",
      energy: "150-220 Wh/kg",
      cycles: "3,000-5,000",
      safety: "Good with BMS",
      temp: "-10°C to 45°C",
      cost: "$$$",
      advantages: ["High energy density", "Good power output", "Balanced performance", "Compact size"],
      applications: ["Electric vehicles", "Power tools", "Consumer electronics", "Grid storage"]
    },
    nca: {
      name: "NCA (Lithium Nickel Cobalt Aluminum)",
      voltage: "3.6V",
      energy: "200-260 Wh/kg",
      cycles: "2,000-3,000",
      safety: "Moderate",
      temp: "0°C to 45°C",
      cost: "$$$$",
      advantages: ["Highest energy density", "Excellent specific power", "Long calendar life", "Fast charging"],
      applications: ["Premium EVs", "Aircraft", "Medical devices", "High-performance applications"]
    },
    lto: {
      name: "LTO (Lithium Titanate)",
      voltage: "2.4V",
      energy: "50-80 Wh/kg",
      cycles: "15,000-25,000",
      safety: "Outstanding",
      temp: "-40°C to 55°C",
      cost: "$$$$$",
      advantages: ["Ultra-fast charging", "Extreme cycle life", "Wide temperature", "Zero strain"],
      applications: ["Buses", "Grid frequency regulation", "Military", "Extreme environments"]
    }
  };

  const cellFormats = [
    { format: "18650", diameter: "18mm", length: "65mm", capacity: "2.5-3.5Ah", voltage: "3.6-3.7V", applications: "Laptops, power tools, Tesla Model S/X", weight: "45-48g" },
    { format: "21700", diameter: "21mm", length: "70mm", capacity: "4.0-5.0Ah", voltage: "3.6-3.7V", applications: "Tesla Model 3/Y, e-bikes, power walls", weight: "68-70g" },
    { format: "26650", diameter: "26mm", length: "65mm", capacity: "5.0-6.0Ah", voltage: "3.2-3.7V", applications: "Solar storage, flashlights, vapes", weight: "90-95g" },
    { format: "32650", diameter: "32mm", length: "65mm", capacity: "6.0-7.0Ah", voltage: "3.2V", applications: "Solar systems, RV batteries, UPS", weight: "135-145g" },
    { format: "Prismatic", diameter: "Variable", length: "Variable", capacity: "20-300Ah", voltage: "3.2-3.7V", applications: "EVs, ESS, telecom backup", weight: "0.5-5kg" },
    { format: "Pouch", diameter: "Variable", length: "Variable", capacity: "10-100Ah", voltage: "3.2-3.7V", applications: "Smartphones, tablets, drones", weight: "50g-2kg" }
  ];

  const bmsFeatures = [
    { layer: "Cell Voltage Monitoring", function: "Individual cell voltage tracking", range: "2.5V - 4.2V ±5mV", response: "&lt;10ms", protection: "Overvoltage/Undervoltage" },
    { layer: "Current Monitoring", function: "Bidirectional current sensing", range: "0-500A ±0.5%", response: "&lt;1ms", protection: "Overcurrent/Short circuit" },
    { layer: "Temperature Management", function: "Multi-point thermal monitoring", range: "-40°C to 85°C ±2°C", response: "&lt;100ms", protection: "Overtemp/Undertemp" },
    { layer: "Cell Balancing", function: "Active/Passive balancing", range: "50mV tolerance", response: "200mA balance current", protection: "Cell imbalance" },
    { layer: "State Estimation", function: "SOC/SOH/SOP calculation", range: "0-100% ±3%", response: "Real-time", protection: "Capacity fade detection" },
    { layer: "Communication", function: "CAN/RS485/Bluetooth", range: "Multi-protocol", response: "&lt;50ms latency", protection: "Data integrity" },
    { layer: "Safety Cutoff", function: "Dual MOSFET control", range: "0-1000V", response: "&lt;1μs", protection: "Hardware failsafe" },
    { layer: "Insulation Monitoring", function: "Ground fault detection", range: ">1MΩ", response: "&lt;500ms", protection: "Electrical isolation" }
  ];

  const manufacturingProcess = [
    { step: 1, process: "Electrode Preparation", description: "Mixing active materials with binders and conductive additives", duration: "4-6 hours", quality: "Particle size &lt;10μm" },
    { step: 2, process: "Coating & Calendering", description: "Applying slurry to current collectors and compressing", duration: "2-3 hours", quality: "Thickness ±2μm" },
    { step: 3, process: "Drying & Slitting", description: "Removing solvents and cutting to size", duration: "8-12 hours", quality: "Moisture &lt;200ppm" },
    { step: 4, process: "Cell Assembly", description: "Stacking/winding electrodes with separator", duration: "1-2 hours", quality: "Alignment ±0.1mm" },
    { step: 5, process: "Electrolyte Filling", description: "Injecting electrolyte in dry room", duration: "30-60 min", quality: "Humidity &lt;1%" },
    { step: 6, process: "Formation Cycling", description: "Initial charge/discharge cycles for SEI formation", duration: "48-72 hours", quality: "Capacity matching ±2%" },
    { step: 7, process: "Aging & Testing", description: "Stabilization and quality verification", duration: "7-14 days", quality: "Self-discharge &lt;3%/month" },
    { step: 8, process: "Module Assembly", description: "Connecting cells with BMS integration", duration: "2-4 hours", quality: "Contact resistance &lt;0.1mΩ" }
  ];

  const applications = [
    {
      sector: "Residential Energy Storage",
      power: "5-20kWh",
      voltage: "48-400V",
      chemistry: "LiFePO4",
      brands: ["Tesla Powerwall", "Enphase IQ", "LG Chem RESU", "Sonnen Eco"],
      features: ["10-year warranty", "Modular expansion", "Smart grid ready", "App monitoring"],
      roi: "7-10 years"
    },
    {
      sector: "Electric Vehicles",
      power: "40-100kWh",
      voltage: "400-800V",
      chemistry: "NMC/NCA",
      brands: ["Tesla", "BYD", "CATL", "LG Energy"],
      features: ["300+ mile range", "Fast DC charging", "Thermal management", "V2G capable"],
      roi: "5-8 years"
    },
    {
      sector: "Grid-Scale Storage",
      power: "1-100MWh",
      voltage: "600-1500V",
      chemistry: "LiFePO4/LTO",
      brands: ["Fluence", "Tesla Megapack", "BYD", "Wartsila"],
      features: ["4-hour duration", "Grid frequency support", "Black start capable", "Remote monitoring"],
      roi: "8-12 years"
    },
    {
      sector: "Marine & RV",
      power: "2-10kWh",
      voltage: "12-48V",
      chemistry: "LiFePO4",
      brands: ["Battle Born", "Victron", "RELiON", "Dakota Lithium"],
      features: ["IP67 waterproof", "Bluetooth monitoring", "Cold weather package", "Drop-in replacement"],
      roi: "3-5 years"
    }
  ];

  const recyclingProcess = [
    { stage: "Collection", process: "Battery aggregation from end-users", recovery: "95% collection rate", value: "$500-1000/ton" },
    { stage: "Discharge", process: "Safe energy depletion", recovery: "100% safety compliance", value: "Energy recovery possible" },
    { stage: "Dismantling", process: "Module and cell separation", recovery: "90% component recovery", value: "$50-100/kWh labor" },
    { stage: "Shredding", process: "Mechanical size reduction", recovery: "Black mass production", value: "$2000-3000/ton black mass" },
    { stage: "Hydrometallurgy", process: "Chemical leaching and precipitation", recovery: "95% Li, 98% Co, 98% Ni", value: "$15,000/ton cobalt" },
    { stage: "Pyrometallurgy", process: "High-temperature smelting", recovery: "90% metal recovery", value: "$8,000/ton nickel" },
    { stage: "Direct Recycling", process: "Cathode material regeneration", recovery: "90% capacity retention", value: "$4000-6000/ton cathode" },
    { stage: "Refinement", process: "Battery-grade material production", recovery: "99.5% purity", value: "70% cost vs virgin materials" }
  ];

  const safetyStandards = [
    { standard: "UL 9540", description: "Energy Storage Systems Safety", tests: ["Thermal runaway", "Fire propagation", "Explosion risk"], compliance: "Mandatory for US installations" },
    { standard: "UL 9540A", description: "Thermal Runaway Fire Propagation", tests: ["Cell level testing", "Module level testing", "Installation level testing"], compliance: "Required for indoor installations" },
    { standard: "UL 1973", description: "Batteries for Stationary Applications", tests: ["Electrical safety", "Mechanical safety", "Environmental testing"], compliance: "Industry standard certification" },
    { standard: "IEC 62619", description: "Secondary Cells Industrial Applications", tests: ["Cycle life", "Calendar life", "Safety requirements"], compliance: "International standard" },
    { standard: "UN 38.3", description: "Transportation Testing", tests: ["Altitude", "Thermal", "Vibration", "Shock", "Short circuit"], compliance: "Required for shipping" },
    { standard: "NFPA 855", description: "Installation of ESS", tests: ["Spacing requirements", "Fire suppression", "Ventilation"], compliance: "Fire code compliance" }
  ];

  const batteryMetrics = [
    { metric: "C-Rate", definition: "Charge/discharge rate relative to capacity", example: "1C = full charge in 1 hour", importance: "Determines power capability" },
    { metric: "DOD", definition: "Depth of Discharge percentage", example: "80% DOD = using 80% of capacity", importance: "Affects cycle life" },
    { metric: "SOC", definition: "State of Charge percentage", example: "100% = fully charged", importance: "Current energy level" },
    { metric: "SOH", definition: "State of Health percentage", example: "90% = 90% of original capacity", importance: "Battery degradation indicator" },
    { metric: "Round-trip Efficiency", definition: "Energy out / Energy in", example: "95% = 5% loss in storage", importance: "System efficiency measure" },
    { metric: "Self-discharge", definition: "Energy loss when idle", example: "2%/month", importance: "Long-term storage capability" }
  ];

  return (
    <>
      <ScrollProgress />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Glassomorphic Card */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
          <ShaderBackground />

          {/* Excellence Award Badge - Top Right */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
            <AwardBadge type="customer-service-excellence" />
          </div>

          <div className="relative z-10 w-full py-20">
            {/* Glassomorphic Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              {/* Glassomorphic Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-y border-white/20 p-12 md:p-16 lg:p-20 shadow-2xl"
              >
                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight"
                    style={{
                      filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))'
                    }}
                  >
                    <span className="text-white">Lithium Battery</span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                      Technology Guide
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 leading-relaxed drop-shadow-lg"
                  >
                    LiFePO4 chemistry delivers 10,000+ cycles at 100% DOD vs. 3,000 cycles for NMC. API batteries with active BMS balancing ensure 95-98% round-trip efficiency and 270°C thermal runaway protection. UL 9540A certified for residential safety. Chemistry selection impacts 20-year TCO by $15,000-25,000.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-xl text-yellow-200/80 mb-12 leading-relaxed"
                  >
                    SimpliPhi PHI 3.5 • Fortress eVault • EG4 PowerPro • Battle Born GC3 • SOC/SOH Telemetry • SGIP Qualification
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    {/* Premium CTA Button */}
                    <Button
                      onClick={() => document.getElementById('chemistry')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-600 text-black font-bold px-12 py-8 text-lg shadow-2xl shadow-yellow-500/50 transform hover:scale-105 transition-all rounded-xl overflow-hidden"
                    >
                      {/* Button Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />

                      {/* Content */}
                      <div className="relative flex items-center gap-3">
                        <Battery className="h-6 w-6" />
                        <span>Compare Battery Chemistries</span>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    </Button>

                    {/* Secondary Button */}
                    <Button
                      variant="outline"
                      className="group relative border-2 border-white/30 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:border-white/50 px-12 py-8 text-lg font-semibold rounded-xl overflow-hidden transition-all"
                      onClick={() => document.getElementById('bms')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {/* Button Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative flex items-center gap-3">
                        <CircuitBoard className="h-6 w-6" />
                        <span>BMS Technology Deep Dive</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>

                {/* Bottom Shine */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </motion.div>

              {/* Stats Cards Below Glassomorphic Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto px-6 sm:px-12"
              >
              {[
                {
                  title: "LiFePO4 Cycles",
                  value: "10,000+",
                  description: "@ 100% DOD lifespan",
                  icon: <Activity className="h-8 w-8" />
                },
                {
                  title: "Energy Density",
                  value: "90-260",
                  description: "Wh/kg by chemistry",
                  icon: <Battery className="h-8 w-8" />
                },
                {
                  title: "Round-Trip",
                  value: "95-98%",
                  description: "Energy efficiency",
                  icon: <Zap className="h-8 w-8" />
                },
                {
                  title: "Thermal Safety",
                  value: "270°C",
                  description: "LiFePO4 runaway temp",
                  icon: <Flame className="h-8 w-8" />
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  className="relative group"
                >
                  {/* Yellow Electric Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/90 via-amber-500/90 to-yellow-600/90 rounded-2xl blur-sm group-hover:blur-md transition-all" />

                  {/* Card Content */}
                  <div className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-2xl p-6 backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-300/50 transition-all transform hover:scale-105">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl text-black">
                        {card.icon}
                      </div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50" />
                    </div>

                    <h3 className="text-black/90 font-bold text-sm mb-2 uppercase tracking-wide">{card.title}</h3>
                    <div className="text-3xl font-black text-black mb-1 drop-shadow-md">{card.value}</div>
                    <p className="text-black/70 text-xs font-medium">{card.description}</p>
                  </div>
                </motion.div>
              ))}
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* Main Content Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Content Container */}
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              
              {/* Chemistry Comparison Deep Dive */}
              <div id="chemistry" className="mb-16">
                <div className="text-center mb-8">
                  <p className="text-orange-400 font-semibold mb-2 uppercase tracking-wide">Battery Chemistry Analysis</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                    filter: 'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.3))'
                  }}>
                    Lithium Technology Comparison
                  </h2>
                  <p className="text-gray-400 text-lg">Comprehensive analysis of lithium battery chemistries for optimal application selection</p>
                </div>

                <div className="flex flex-wrap gap-3 mb-6 justify-center">
                  {Object.keys(chemistryData).map((chem) => (
                    <button
                      key={chem}
                      onClick={() => setSelectedChemistry(chem)}
                      className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        selectedChemistry === chem
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/50"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                      }`}
                    >
                      {chem.toUpperCase()}
                    </button>
                  ))}
                </div>

                <motion.div
                  className="card-elite glow-orange p-8 mb-6 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Background shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(110deg, transparent 20%, rgba(251, 146, 60, 0.15) 50%, transparent 80%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer1 5s infinite'
                    }}
                  />

                  <div className="relative"
                    style={{
                      filter: 'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.2))'
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {chemistryData[selectedChemistry].name}
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { icon: <Zap className="h-5 w-5" />, label: "Nominal Voltage", value: chemistryData[selectedChemistry].voltage, gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", iconColor: "text-blue-300" },
                        { icon: <Battery className="h-5 w-5" />, label: "Energy Density", value: chemistryData[selectedChemistry].energy, gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", iconColor: "text-orange-300" },
                        { icon: <Activity className="h-5 w-5" />, label: "Cycle Life", value: chemistryData[selectedChemistry].cycles, gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", iconColor: "text-orange-300" },
                        { icon: <Shield className="h-5 w-5" />, label: "Safety Rating", value: chemistryData[selectedChemistry].safety, gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", iconColor: "text-green-300" }
                      ].map((item, idx) => (
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
                              background: item.glowColor,
                              animation: `pulse ${2.5 + idx * 0.3}s ease-in-out infinite`
                            }}
                          />

                          {/* Card */}
                          <div
                            className={`relative bg-gradient-to-br ${item.gradient} rounded-xl p-4 border border-white/20 overflow-hidden`}
                            style={{
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className={`${item.iconColor} mb-2`}
                              >
                                {item.icon}
                              </motion.div>
                              <div className="text-sm text-white/80 mb-1">{item.label}</div>
                              <motion.div
                                className="text-xl font-bold text-white"
                                whileHover={{ scale: 1.1 }}
                              >
                                {item.value}
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                          <CheckCircle className="h-5 w-5 text-orange-400" /> Key Advantages
                        </h4>
                        <ul className="space-y-2">
                          {chemistryData[selectedChemistry].advantages.map((adv: string, idx: number) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className="flex items-start gap-2 text-gray-300"
                            >
                              <ChevronRight className="h-4 w-4 text-orange-400 mt-0.5" />
                              <span>{adv}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                          <Factory className="h-5 w-5 text-blue-400" /> Applications
                        </h4>
                        <ul className="space-y-2">
                          {chemistryData[selectedChemistry].applications.map((app: string, idx: number) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className="flex items-start gap-2 text-gray-300"
                            >
                              <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5" />
                              <span>{app}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Additional Chemistry Details */}
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                      {[
                        { icon: <Thermometer className="h-5 w-5" />, label: "Operating Temperature", value: chemistryData[selectedChemistry].temp, gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.3)", iconColor: "text-red-400", borderColor: "border-red-500/30" },
                        { icon: <DollarSign className="h-5 w-5" />, label: "Relative Cost", value: chemistryData[selectedChemistry].cost, gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.3)", iconColor: "text-blue-400", borderColor: "border-blue-500/30" },
                        { icon: <Award className="h-5 w-5" />, label: "Best Use Case", value: chemistryData[selectedChemistry].applications[0], gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.3)", iconColor: "text-orange-400", borderColor: "border-orange-500/30" }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="relative group"
                        >
                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"
                            style={{
                              background: item.glowColor,
                              animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                            }}
                          />

                          <div className={`relative bg-gradient-to-br ${item.gradient} rounded-xl p-4 border ${item.borderColor} overflow-hidden`}
                            style={{
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            {/* Glass overlay */}
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                              }}
                            />

                            <div className="relative z-10">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className={`${item.iconColor} mb-2`}
                              >
                                {item.icon}
                              </motion.div>
                              <div className="text-sm text-white/80">{item.label}</div>
                              <div className="font-bold text-white">{item.value}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

                {/* Cell Format Specifications */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-orange-400 font-semibold mb-2 uppercase tracking-wide">Cell Formats & Standards</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.3))'
                    }}>
                      Industry-Standard Cell Types
                    </h2>
                    <p className="text-gray-400 text-lg">Comprehensive specifications for all standard lithium battery cell formats</p>
                  </div>
                  <motion.div
                    className="card-elite glow-orange p-8 overflow-hidden relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Background shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(251, 146, 60, 0.1) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer2 6s infinite'
                      }}
                    />

                    <div className="overflow-x-auto relative">
                      <div className="relative rounded-2xl overflow-hidden border border-orange-500/20"
                        style={{
                          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(249, 115, 22, 0.1) 100%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Shimmer overlay */}
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
                              <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Format</span>
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Dimensions</span>
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Capacity</span>
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Voltage</span>
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
                                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Weight</span>
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Applications</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700/30">
                            {cellFormats.map((cell, idx) => (
                              <motion.tr
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="hover:bg-white/5 transition-all duration-300 group"
                              >
                                <motion.td
                                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-amber-200"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                                    {cell.format}
                                  </div>
                                </motion.td>
                                <motion.td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-blue-200"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                    {cell.diameter} × {cell.length}
                                  </div>
                                </motion.td>
                                <motion.td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-orange-200"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="inline-block px-3 py-1 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                                    {cell.capacity}
                                  </div>
                                </motion.td>
                                <motion.td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-green-200"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="inline-block px-3 py-1 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                                    {cell.voltage}
                                  </div>
                                </motion.td>
                                <motion.td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-red-200"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="inline-block px-3 py-1 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                                    {cell.weight}
                                  </div>
                                </motion.td>
                                <motion.td
                                  className="px-6 py-4 text-sm text-gray-300 group-hover:text-cyan-200"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <div className="px-3 py-1 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                                    {cell.applications}
                                  </div>
                                </motion.td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* BMS Technology Deep Dive */}
                <div id="bms" className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-cyan-400 font-semibold mb-2 uppercase tracking-wide">Battery Management System</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(6, 182, 212, 0.3))'
                    }}>
                      8-Layer Protection Architecture
                    </h2>
                    <p className="text-gray-400 text-lg">Advanced BMS technology ensuring safety, longevity, and optimal performance</p>
                  </div>
                  <motion.div
                    className="grid lg:grid-cols-2 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card-elite glow-blue rounded-2xl overflow-hidden relative">
                      {/* Background shimmer */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.1) 50%, transparent 80%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer1 5s infinite'
                        }}
                      />

                      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-4 text-white relative overflow-hidden">
                        {/* Glass overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                          }}
                        />
                        <h3 className="text-xl font-bold flex items-center gap-2 relative z-10">
                          <CircuitBoard className="h-6 w-6" /> BMS Protection Layers
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-700/50 relative">
                        {bmsFeatures.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', x: 5 }}
                            className="p-4 transition-all duration-300 group relative"
                          >
                            {/* Glow effect on hover */}
                            <div
                              className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none"
                              style={{
                                background: 'rgba(249, 115, 22, 0.5)'
                              }}
                            />

                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-white group-hover:text-amber-200 transition-colors">{feature.layer}</h4>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/30 transition-colors"
                                >
                                  {feature.response}
                                </motion.span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">{feature.function}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500 group-hover:text-gray-400 transition-colors">Range: {feature.range}</span>
                                <span className="text-orange-400 group-hover:text-orange-300 transition-colors flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                                  {feature.protection}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Real-time BMS Monitoring Visualization */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Activity className="h-6 w-6 text-orange-400" /> Live BMS Monitoring
                      </h3>
                      <div className="space-y-4">
                        {/* Cell Voltage Visualization */}
                        <div className="bg-gray-800 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">Cell Voltages (16S Configuration)</span>
                            <span className="text-xs text-orange-400">All Balanced</span>
                          </div>
                          <div className="grid grid-cols-8 gap-1">
                            {[...Array(16)].map((_, i) => (
                              <div key={i} className="relative group flex flex-col items-center">
                                <div className="relative w-full">
                                  <div className="h-8 bg-gradient-to-t from-green-600 to-green-400 rounded animate-pulse"
                                       style={{height: `${28 + Math.sin(Date.now() / 1000 + i) * 4}px`}}>
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                      3.{28 + Math.floor(Math.random() * 4)}V
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>3.28V min</span>
                            <span>3.30V avg</span>
                            <span>3.32V max</span>
                          </div>
                        </div>

                        {/* Temperature and Power Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-800 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Thermometer className="h-4 w-4 text-orange-400" />
                              <span className="text-sm text-gray-400">Temperature Map</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {[25, 26, 24, 27, 25, 26].map((temp, i) => (
                                <div key={i} className="text-center">
                                  <div className={`text-lg font-bold ${temp > 26 ? 'text-orange-400' : 'text-orange-400'}`}>
                                    {temp}°C
                                  </div>
                                  <div className="text-xs text-gray-500">T{i+1}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-800 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm text-gray-400">Power Flow</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Current</span>
                                <span className="text-sm font-bold text-orange-400">{currentFlow.toFixed(1)}A</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Voltage</span>
                                <span className="text-sm font-bold text-blue-400">{voltageReading.toFixed(1)}V</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Power</span>
                                <span className="text-sm font-bold text-yellow-400">{powerOutput.toFixed(2)}kW</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Protection Status Grid */}
                        <div className="bg-gray-800 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">Protection Status</span>
                            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">All Systems Normal</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            {['OVP', 'UVP', 'OCP', 'OTP', 'SCP', 'Cell Balance', 'Isolation', 'Communication'].map((protection, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                <span className="text-gray-400">{protection}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Manufacturing Process Timeline */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-green-400 font-semibold mb-2 uppercase tracking-wide">Production Excellence</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(16, 185, 129, 0.3))'
                    }}>
                      Battery Manufacturing Process
                    </h2>
                    <p className="text-gray-400 text-lg">ISO 9001:2015 certified production with rigorous quality control</p>
                  </div>
                  <motion.div
                    className="card-elite glow-green rounded-2xl p-8 relative overflow-hidden"
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
                        animation: 'shimmer2 6s infinite'
                      }}
                    />

                    <div className="relative">
                      {/* Process Timeline */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600"></div>

                      <div className="space-y-8">
                        {manufacturingProcess.map((step, idx) => {
                          const gradients = [
                            { gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", borderColor: "border-blue-500/40", dotColor: "border-blue-500" },
                            { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/40", dotColor: "border-orange-500" },
                            { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/40", dotColor: "border-orange-500" },
                            { gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", borderColor: "border-green-500/40", dotColor: "border-green-500" },
                            { gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", borderColor: "border-red-500/40", dotColor: "border-red-500" },
                            { gradient: "from-blue-500 via-cyan-500 to-cyan-600", glowColor: "rgba(59, 130, 246, 0.4)", borderColor: "border-blue-500/40", dotColor: "border-blue-500" },
                            { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500/40", dotColor: "border-orange-500" },
                            { gradient: "from-yellow-500 via-amber-500 to-yellow-600", glowColor: "rgba(234, 179, 8, 0.4)", borderColor: "border-yellow-500/40", dotColor: "border-yellow-500" }
                          ];
                          const style = gradients[idx % gradients.length];

                          return (
                            <motion.div
                              key={step.step}
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              className="relative flex items-start gap-6"
                            >
                              <div className={`absolute left-6 w-4 h-4 bg-gray-800 border-4 ${style.dotColor} rounded-full shadow-lg`}
                                style={{
                                  boxShadow: `0 0 12px ${style.glowColor}`
                                }}
                              />
                              <div className="ml-16 flex-1">
                                <motion.div
                                  whileHover={{ scale: 1.02, y: -5 }}
                                  className="relative group"
                                >
                                  {/* Glow effect */}
                                  <div
                                    className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500"
                                    style={{
                                      background: style.glowColor
                                    }}
                                  />

                                  {/* Card */}
                                  <div
                                    className={`relative bg-gradient-to-br ${style.gradient} border ${style.borderColor} rounded-xl p-6 overflow-hidden`}
                                    style={{
                                      backdropFilter: 'blur(10px)',
                                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                                        background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)',
                                        backgroundSize: '200% 100%',
                                        animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                                        mixBlendMode: 'overlay'
                                      }}
                                    />

                                    <div className="relative z-10">
                                      <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-lg font-bold text-white drop-shadow-md">
                                          Step {step.step}: {step.process}
                                        </h4>
                                        <motion.span
                                          whileHover={{ scale: 1.1 }}
                                          className="text-sm bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
                                        >
                                          {step.duration}
                                        </motion.span>
                                      </div>
                                      <p className="text-white/90 mb-3 drop-shadow-sm">{step.description}</p>
                                      <div className="flex items-center gap-2 text-sm">
                                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                                          <CheckCircle className="h-4 w-4 text-white" />
                                        </motion.div>
                                        <span className="text-white/80">Quality Standard: {step.quality}</span>
                                      </div>
                                    </div>

                                    {/* Bottom accent */}
                                    <div
                                      className="absolute bottom-0 left-0 right-0 h-1"
                                      style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
                                      }}
                                    />
                                  </div>
                                </motion.div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Application Sectors with Detailed Specs */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-orange-400 font-semibold mb-2 uppercase tracking-wide">Market Applications</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(249, 115, 22, 0.3))'
                    }}>
                      Industry-Specific Solutions
                    </h2>
                    <p className="text-gray-400 text-lg">Tailored lithium battery systems for every sector and use case</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {applications.map((app, idx) => {
                      const gradients = [
                        { gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", headerGradient: "from-green-500 to-emerald-600" },
                        { gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", headerGradient: "from-red-500 to-pink-600" },
                        { gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", headerGradient: "from-blue-500 to-cyan-600" },
                        { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", headerGradient: "from-orange-500 to-amber-600" }
                      ];
                      const style = gradients[idx % gradients.length];

                      return (
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
                          <div
                            className="absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                            style={{
                              background: style.glowColor,
                              animation: `pulse ${2.5 + idx * 0.3}s ease-in-out infinite`
                            }}
                          />

                          <div className="card-elite glow-orange rounded-2xl overflow-hidden relative">
                            {/* Header with gradient */}
                            <div className={`bg-gradient-to-r ${style.headerGradient} p-4 text-white relative overflow-hidden`}>
                              {/* Glass overlay */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
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
                              <div className="flex items-center justify-between relative z-10">
                                <h3 className="text-xl font-bold drop-shadow-md">{app.sector}</h3>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                                >
                                  {app.power}
                                </motion.span>
                              </div>
                            </div>

                            {/* Card body */}
                            <div className="p-6 relative">
                              {/* Background shimmer */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: `linear-gradient(110deg, transparent 20%, ${style.glowColor.replace('0.4', '0.05')} 50%, transparent 80%)`,
                                  backgroundSize: '200% 100%',
                                  animation: 'shimmer2 6s infinite'
                                }}
                              />

                              <div className="relative z-10">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-3 rounded-lg bg-gradient-to-br ${style.gradient} border border-white/20`}
                                  >
                                    <span className="text-xs text-white/80">Voltage Range</span>
                                    <div className="font-semibold text-white">{app.voltage}</div>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-3 rounded-lg bg-gradient-to-br ${style.gradient} border border-white/20`}
                                  >
                                    <span className="text-xs text-white/80">Chemistry</span>
                                    <div className="font-semibold text-white">{app.chemistry}</div>
                                  </motion.div>
                                </div>

                                <div className="mb-4">
                                  <span className="text-xs text-gray-400">Leading Brands</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {app.brands.map((brand, i) => (
                                      <motion.span
                                        key={i}
                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                        className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded border border-gray-600/30 transition-colors"
                                      >
                                        {brand}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <span className="text-xs text-gray-400">Key Features</span>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {app.features.map((feature, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className="flex items-center gap-1 text-xs text-gray-300"
                                      >
                                        <CheckCircle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                                        {feature}
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                  <span className="text-sm text-gray-400">ROI Period</span>
                                  <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    className="text-sm font-bold text-orange-400"
                                  >
                                    {app.roi}
                                  </motion.span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Safety Standards & Testing */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-red-400 font-semibold mb-2 uppercase tracking-wide">Safety & Compliance</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(239, 68, 68, 0.3))'
                    }}>
                      Rigorous Testing Standards
                    </h2>
                    <p className="text-gray-400 text-lg">Meeting and exceeding global safety certifications</p>
                  </div>

                  {/* Safety Standards Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {safetyStandards.map((standard, idx) => {
                      const gradients = [
                        { gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", iconColor: "text-red-300", borderColor: "border-red-500/30" },
                        { gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", iconColor: "text-blue-300", borderColor: "border-blue-500/30" },
                        { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", iconColor: "text-orange-300", borderColor: "border-orange-500/30" },
                        { gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", iconColor: "text-green-300", borderColor: "border-green-500/30" },
                        { gradient: "from-yellow-500 via-amber-500 to-yellow-600", glowColor: "rgba(234, 179, 8, 0.4)", iconColor: "text-yellow-300", borderColor: "border-yellow-500/30" },
                        { gradient: "from-cyan-500 via-blue-500 to-cyan-600", glowColor: "rgba(6, 182, 212, 0.4)", iconColor: "text-cyan-300", borderColor: "border-cyan-500/30" }
                      ];
                      const style = gradients[idx % gradients.length];

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, y: -8 }}
                          className="relative group h-full"
                        >
                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                            style={{
                              background: style.glowColor,
                              animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                            }}
                          />

                          {/* Card */}
                          <div
                            className={`card-elite glow-red rounded-2xl p-6 h-full flex flex-col relative overflow-hidden bg-gradient-to-br ${style.gradient} border ${style.borderColor}`}
                            style={{
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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

                            <div className="relative z-10 h-full flex flex-col">
                              <div className="flex items-start justify-between mb-3">
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                >
                                  <Award className={`h-8 w-8 ${style.iconColor}`} />
                                </motion.div>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                                >
                                  {standard.standard}
                                </motion.span>
                              </div>
                              <h4 className="text-lg font-bold text-white mb-2 drop-shadow-md">{standard.description}</h4>
                              <div className="mb-3 flex-grow">
                                <p className="text-xs text-white/80 mb-2">Testing Requirements:</p>
                                <ul className="space-y-1">
                                  {standard.tests.map((test, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.3, delay: i * 0.05 }}
                                      className="text-xs text-white/90 flex items-center gap-1"
                                    >
                                      <ChevronRight className="h-3 w-3 text-white" />
                                      {test}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              <div className="pt-3 border-t border-white/20 mt-auto">
                                <p className="text-xs text-white/80">{standard.compliance}</p>
                              </div>
                            </div>

                            {/* Bottom accent */}
                            <div
                              className="absolute bottom-0 left-0 right-0 h-1"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Testing Procedures */}
                  <motion.div
                    className="bg-red-900/20 rounded-2xl p-8 border border-red-500/30 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Background shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(239, 68, 68, 0.1) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer1 5s infinite'
                      }}
                    />

                    <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 relative z-10">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                        <Flame className="h-6 w-6 text-red-400" />
                      </motion.div>
                      Thermal Runaway Testing Protocol
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 relative z-10">
                      {[
                        { icon: <Thermometer className="h-5 w-5" />, title: "Temperature Test", desc: "Cells heated to 200°C to verify no thermal runaway propagation", gradient: "from-red-500 via-orange-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", iconColor: "text-red-300" },
                        { icon: <Zap className="h-5 w-5" />, title: "Overcharge Test", desc: "Charge to 200% SOC to verify BMS protection and safety", gradient: "from-yellow-500 via-amber-500 to-yellow-600", glowColor: "rgba(234, 179, 8, 0.4)", iconColor: "text-yellow-300" },
                        { icon: <AlertTriangle className="h-5 w-5" />, title: "Penetration Test", desc: "Nail penetration to simulate catastrophic damage scenarios", gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", iconColor: "text-orange-300" }
                      ].map((test, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="relative group"
                        >
                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"
                            style={{
                              background: test.glowColor,
                              animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                            }}
                          />

                          {/* Card */}
                          <div
                            className={`relative bg-gradient-to-br ${test.gradient} backdrop-blur-sm border border-white/20 rounded-xl p-4 overflow-hidden`}
                            style={{
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            {/* Glass overlay */}
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                              }}
                            />

                            {/* Shimmer */}
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)',
                                backgroundSize: '200% 100%',
                                animation: `shimmer${idx + 1} ${3 + idx * 0.5}s infinite`,
                                mixBlendMode: 'overlay'
                              }}
                            />

                            <div className="relative z-10">
                              <div className="flex items-center gap-2 mb-2">
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                  className={test.iconColor}
                                >
                                  {test.icon}
                                </motion.div>
                                <h4 className="font-semibold text-white drop-shadow-md">{test.title}</h4>
                              </div>
                              <p className="text-sm text-white/90">{test.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Battery Metrics Education */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-sky-400 font-semibold mb-2 uppercase tracking-wide">Technical Knowledge</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(14, 165, 233, 0.3))'
                    }}>
                      Understanding Battery Metrics
                    </h2>
                    <p className="text-gray-400 text-lg">Key performance indicators and what they mean for your system</p>
                  </div>
                  <motion.div
                    className="card-elite glow-blue rounded-2xl overflow-hidden relative"
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 relative z-10">
                      {batteryMetrics.map((metric, idx) => {
                        const gradients = [
                          { gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", borderColor: "border-blue-500" },
                          { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500" },
                          { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", borderColor: "border-orange-500" },
                          { gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", borderColor: "border-green-500" },
                          { gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", borderColor: "border-red-500" },
                          { gradient: "from-cyan-500 via-blue-500 to-cyan-600", glowColor: "rgba(6, 182, 212, 0.4)", borderColor: "border-cyan-500" }
                        ];
                        const style = gradients[idx % gradients.length];

                        return (
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
                              className="absolute inset-0 blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"
                              style={{
                                background: style.glowColor,
                                animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                              }}
                            />

                            {/* Card */}
                            <div
                              className={`relative border-l-4 ${style.borderColor} pl-4 p-4 rounded-lg bg-gradient-to-br ${style.gradient} overflow-hidden`}
                              style={{
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                              }}
                            >
                              {/* Glass overlay */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                                }}
                              />

                              {/* Shimmer */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)',
                                  backgroundSize: '200% 100%',
                                  animation: `shimmer${idx + 1} ${3 + idx * 0.5}s infinite`,
                                  mixBlendMode: 'overlay'
                                }}
                              />

                              <div className="relative z-10">
                                <h4 className="text-lg font-bold text-white mb-1 drop-shadow-md">{metric.metric}</h4>
                                <p className="text-sm text-white/80 mb-2">{metric.definition}</p>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  className="text-xs bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-1 border border-white/20"
                                >
                                  <strong className="text-white">Example:</strong> <span className="text-white/90">{metric.example}</span>
                                </motion.div>
                                <p className="text-xs text-white/90">
                                  <strong>Why it matters:</strong> {metric.importance}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Recycling & Sustainability */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-green-400 font-semibold mb-2 uppercase tracking-wide">Circular Economy</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(34, 197, 94, 0.3))'
                    }}>
                      Battery Recycling & Recovery
                    </h2>
                    <p className="text-gray-400 text-lg">Closing the loop with 95%+ material recovery rates</p>
                  </div>
                  <motion.div
                    className="card-elite glow-green rounded-2xl p-8 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Background shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(34, 197, 94, 0.1) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer1 5s infinite'
                      }}
                    />

                    <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                      {/* Recycling Process Flow */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Recycling Process Flow</h3>
                        <div className="space-y-3">
                          {recyclingProcess.map((stage, idx) => {
                            const gradients = [
                              { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", numberBg: "bg-orange-500" },
                              { gradient: "from-blue-500 via-cyan-500 to-blue-600", glowColor: "rgba(59, 130, 246, 0.4)", numberBg: "bg-blue-500" },
                              { gradient: "from-orange-500 via-amber-500 to-orange-600", glowColor: "rgba(249, 115, 22, 0.4)", numberBg: "bg-orange-500" },
                              { gradient: "from-green-500 via-emerald-500 to-green-600", glowColor: "rgba(34, 197, 94, 0.4)", numberBg: "bg-green-500" },
                              { gradient: "from-red-500 via-pink-500 to-red-600", glowColor: "rgba(239, 68, 68, 0.4)", numberBg: "bg-red-500" },
                              { gradient: "from-cyan-500 via-blue-500 to-cyan-600", glowColor: "rgba(6, 182, 212, 0.4)", numberBg: "bg-cyan-500" },
                              { gradient: "from-yellow-500 via-amber-500 to-yellow-600", glowColor: "rgba(234, 179, 8, 0.4)", numberBg: "bg-yellow-500" },
                              { gradient: "from-pink-500 via-rose-500 to-pink-600", glowColor: "rgba(236, 72, 153, 0.4)", numberBg: "bg-pink-500" }
                            ];
                            const style = gradients[idx % gradients.length];

                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="relative group"
                              >
                                {/* Glow effect */}
                                <div
                                  className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"
                                  style={{
                                    background: style.glowColor
                                  }}
                                />

                                {/* Card */}
                                <div
                                  className={`relative bg-gradient-to-br ${style.gradient} backdrop-blur-sm border border-white/20 rounded-xl p-4 overflow-hidden`}
                                  style={{
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                                  }}
                                >
                                  {/* Glass overlay */}
                                  <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                                    }}
                                  />

                                  {/* Shimmer */}
                                  <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                      background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)',
                                      backgroundSize: '200% 100%',
                                      animation: `shimmer${idx + 1} ${3 + idx * 0.5}s infinite`,
                                      mixBlendMode: 'overlay'
                                    }}
                                  />

                                  <div className="flex items-start gap-3 relative z-10">
                                    <motion.div
                                      whileHover={{ scale: 1.1, rotate: 360 }}
                                      transition={{ duration: 0.6 }}
                                      className={`w-8 h-8 ${style.numberBg} text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg`}
                                    >
                                      {idx + 1}
                                    </motion.div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-white drop-shadow-md">{stage.stage}</h4>
                                        <motion.span
                                          whileHover={{ scale: 1.1 }}
                                          className="text-xs bg-white/20 text-white px-2 py-1 rounded border border-white/30 backdrop-blur-sm"
                                        >
                                          {stage.recovery}
                                        </motion.span>
                                      </div>
                                      <p className="text-sm text-white/90 mb-2">{stage.process}</p>
                                      <div className="flex items-center gap-2 text-xs text-white/90">
                                        <DollarSign className="h-3 w-3" />
                                        <span>{stage.value}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Environmental Impact */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Environmental Impact</h3>

                        {/* Carbon Footprint Comparison */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                            <Leaf className="h-5 w-5 text-orange-400" /> Carbon Footprint Reduction
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-400">Virgin Material Production</span>
                                <span className="text-sm font-bold text-red-400">12.5 kg CO₂/kWh</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-400">Recycled Material Production</span>
                                <span className="text-sm font-bold text-orange-400">3.8 kg CO₂/kWh</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{width: '30%'}}></div>
                              </div>
                            </div>
                            <div className="pt-3 border-t border-gray-700">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Carbon Savings</span>
                                <span className="font-bold text-orange-400">70% Reduction</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Material Recovery Rates */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                            <Package className="h-5 w-5 text-blue-400" /> Material Recovery Rates
                          </h4>
                          <div className="space-y-2">
                            {[
                              { material: "Lithium", rate: 95, color: "blue" },
                              { material: "Cobalt", rate: 98, color: "cyan" },
                              { material: "Nickel", rate: 98, color: "green" },
                              { material: "Copper", rate: 99, color: "orange" },
                              { material: "Aluminum", rate: 97, color: "gray" },
                              { material: "Graphite", rate: 90, color: "black" }
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-sm text-gray-400 w-20">{item.material}</span>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                  <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{width: `${item.rate}%`}}></div>
                                </div>
                                <span className="text-sm font-bold text-white">{item.rate}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sustainability Goals */}
                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white border border-blue-500/30">
                      <h3 className="text-xl font-bold mb-4">2030 Sustainability Commitments</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold">100% Renewable Energy</p>
                            <p className="text-sm opacity-90">All manufacturing facilities</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold">Zero Landfill Waste</p>
                            <p className="text-sm opacity-90">Complete battery recycling</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold">50% Recycled Content</p>
                            <p className="text-sm opacity-90">In all new batteries</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Cost Analysis & ROI Calculator */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <p className="text-orange-400 font-semibold mb-2 uppercase tracking-wide">Financial Analysis</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{
                      filter: 'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.3))'
                    }}>
                      Total Cost of Ownership
                    </h2>
                    <p className="text-gray-400 text-lg">Comprehensive cost comparison and ROI calculations</p>
                  </div>
                  <div className="card-elite glow-orange rounded-2xl p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Cost Comparison */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">10-Year Cost Comparison</h3>
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 shadow-inner rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Lead-Acid Batteries</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Initial Cost (10kWh)</span>
                                <span className="font-medium">$3,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Replacements (3x)</span>
                                <span className="font-medium">$9,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Maintenance</span>
                                <span className="font-medium">$2,400</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Energy Loss (30%)</span>
                                <span className="font-medium">$3,600</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-600">
                                <span className="font-semibold text-gray-900 dark:text-white">Total 10-Year Cost</span>
                                <span className="font-bold text-red-600">$18,000</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Lithium LiFePO4 Batteries</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Initial Cost (10kWh)</span>
                                <span className="font-medium">$8,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Replacements</span>
                                <span className="font-medium">$0</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Maintenance</span>
                                <span className="font-medium">$0</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Energy Loss (5%)</span>
                                <span className="font-medium">$600</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-600">
                                <span className="font-semibold text-gray-900 dark:text-white">Total 10-Year Cost</span>
                                <span className="font-bold text-orange-600">$8,600</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-gray-900 dark:text-white">10-Year Savings with Lithium</span>
                              <span className="text-2xl font-bold text-orange-600">$9,400</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ROI Calculator */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick ROI Calculator</h3>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">System Size (kWh)</label>
                              <input type="range" min="5" max="50" defaultValue="15" className="w-full mt-2" />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>5 kWh</span>
                                <span className="font-bold">15 kWh</span>
                                <span>50 kWh</span>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Usage (%)</label>
                              <input type="range" min="20" max="100" defaultValue="80" className="w-full mt-2" />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>20%</span>
                                <span className="font-bold">80%</span>
                                <span>100%</span>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Electricity Rate ($/kWh)</label>
                              <input type="range" min="0.08" max="0.40" step="0.01" defaultValue="0.15" className="w-full mt-2" />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$0.08</span>
                                <span className="font-bold">$0.15</span>
                                <span>$0.40</span>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">Monthly Savings</p>
                                  <p className="text-xl font-bold text-orange-600">$144</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">Annual Savings</p>
                                  <p className="text-xl font-bold text-orange-600">$1,728</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">Payback Period</p>
                                  <p className="text-xl font-bold text-blue-600">6.9 years</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 dark:text-gray-400">20-Year ROI</p>
                                  <p className="text-xl font-bold text-cyan-600">290%</p>
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
                <div
                  className="relative rounded-3xl p-8 text-white text-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #22c55e 100%)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Ready to Upgrade to Lithium?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                      Get a custom battery solution designed for your specific needs
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <MagneticButton
                        onClick={openSolarForm}
                        className="relative bg-white/90 backdrop-blur-sm text-blue-600 px-10 py-5 rounded-xl font-bold overflow-hidden group transition-all duration-300 shadow-xl hover:shadow-2xl"
                        strength={0.5}
                        style={{
                          background: `linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                          <Calculator className="h-5 w-5" /> Get Custom Quote
                        </span>
                      </MagneticButton>
                      <MagneticButton
                        onClick={openSolarForm}
                        className="bg-white/25 backdrop-blur-md text-white px-10 py-5 rounded-xl font-bold border border-white/40 flex items-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-white/35"
                        strength={0.5}
                      >
                        <Phone className="h-5 w-5" /> Schedule Consultation
                      </MagneticButton>
                      <MagneticButton
                        className="bg-white/25 backdrop-blur-md text-white px-10 py-5 rounded-xl font-bold border border-white/40 flex items-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-white/35"
                        strength={0.5}
                      >
                        <FileCheck className="h-5 w-5" /> Download Spec Sheet
                      </MagneticButton>
                    </div>
                    <motion.div
                      className="mt-8 text-sm text-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex flex-wrap justify-center gap-3">
                        {["ISO 9001:2015 Certified", "UL Listed", "10-Year Warranty", "24/7 Support"].map((item, i) => (
                          <motion.span
                            key={i}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LithiumBattery;