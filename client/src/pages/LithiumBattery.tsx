import React, { useState, useEffect } from "react";
import { Battery, Zap, Shield, Award, Activity, AlertTriangle, CheckCircle, TrendingUp, Cpu, Thermometer, Clock, ArrowRight, Beaker, Database, Lock, Gauge, Wrench, BarChart, DollarSign, Package, Truck, FileCheck, Phone, ChevronRight, AlertCircle, CircuitBoard, Flame, Snowflake, Droplets, Wind, Sun, Moon, Cloud, CloudRain, Timer, Settings, Info, Calculator, TrendingDown, Briefcase, Factory, Building2, Home, Car, Smartphone, Laptop, Server, HardDrive, Wifi, Radio, Microscope, TestTube, Scale, BookOpen, GraduationCap, Globe, MapPin, Navigation, Compass, Target, Crosshair, Eye, Search, Filter, Layers, Grid, Box, Cube, Hexagon, Triangle, Square, Circle, Star, Heart, ThumbsUp, Users, UserCheck, UserPlus, Mail, MessageSquare, Send, Bell, BellOff, Volume2, VolumeX, Mic, MicOff, Video, VideoOff, Camera, CameraOff, Image, Film, Music, Headphones, Speaker, Monitor, Tv, Projector, Watch, Tablet, Power, Leaf, Component } from "lucide-react";
import { motion } from "framer-motion";

// Import the lithium battery service images
import solarInstallImage from "@assets/13-500x500.jpg";
import batteryBankImage from "@assets/20210121_103322-400x400.jpg";
import inverterSystemImage from "@assets/98453708_3165453150160953_3940467511501258752_n-298x400.jpg";
import installationTeamImage from "@assets/400617335_882191187089939_3988264444007076062_n-500x375.jpg";
import solarFarmImage from "@assets/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-500x375.jpg";
import batteryStorageImage from "@assets/Batt-3-300x400.jpg";
import residentialSolarImage from "@assets/Frame-5-500x282.webp";
import technicianImage from "@assets/Greg-with-panel.jpg";
import solArkSystemImage from "@assets/491844865_1271014964874224_7004732250107002194_n.jpg";
import energyConservationImage from "@assets/Advance-Power-Redding-Energy-Conservation-Techniques.jpg";
import solarPanelsAerialImage from "@assets/guillherme-schneider-ecIS-bfYSG8-unsplash-300x400.jpg";
import forestSolarImage from "@assets/moritz-kindler-gD8IO0E4OZM-unsplash-267x400.jpg";

const LithiumBattery = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChemistry, setSelectedChemistry] = useState("lifepo4");
  const [cycleCount, setCycleCount] = useState(0);
  const [temperatureReading, setTemperatureReading] = useState(25);
  const [socLevel, setSocLevel] = useState(100);
  const [voltageReading, setVoltageReading] = useState(52.8);
  const [currentFlow, setCurrentFlow] = useState(28.5);
  const [powerOutput, setPowerOutput] = useState(1.5);

  // Add custom styles for Phase 4 animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes aurora {
        0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.3; }
        33% { transform: rotate(120deg) scale(1.2); opacity: 0.5; }
        66% { transform: rotate(240deg) scale(0.9); opacity: 0.2; }
      }
      @keyframes aurora-reverse {
        0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.2; }
        33% { transform: rotate(-120deg) scale(0.9); opacity: 0.4; }
        66% { transform: rotate(-240deg) scale(1.1); opacity: 0.3; }
      }
      @keyframes holographic {
        0% { transform: translateX(0) translateY(0); }
        100% { transform: translateX(100px) translateY(100px); }
      }
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-aurora { animation: aurora 15s ease-in-out infinite; }
      .animate-aurora-reverse { animation: aurora-reverse 20s ease-in-out infinite; }
      .animate-holographic { animation: holographic 10s linear infinite; }
      .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      .animate-gradient-shift { animation: gradient-shift 5s ease infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleCount(prev => (prev + 1) % 10000);
      setTemperatureReading(25 + Math.sin(Date.now() / 3000) * 5);
      setSocLevel(95 + Math.sin(Date.now() / 2000) * 5);
      setVoltageReading(52.8 + Math.sin(Date.now() / 2500) * 0.4);
      setCurrentFlow(28.5 + Math.sin(Date.now() / 3500) * 2);
      setPowerOutput(1.5 + Math.sin(Date.now() / 4000) * 0.2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const chemistryData = {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* PHASE 1: Enhanced Background Layers */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="fixed inset-0 -z-40 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/30 via-transparent to-transparent" />
      </div>
      <div className="fixed inset-0 -z-30 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2260%22%20height%3D%2260%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2060%200%20L%200%200%200%2060%22%20fill%3D%22none%22%20stroke%3D%22rgba(255,255,255,0.03)%22%20stroke-width%3D%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22/%3E%3C/svg%3E')]" />

      <div className="relative py-16 sm:py-24">
        {/* Hero Section with Enhanced Glassmorphism */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative"
          >
            {/* Multi-layer glass effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-700/20 rounded-[2rem] blur-3xl" />
            <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-2xl rounded-[2rem] p-[2px] overflow-hidden shadow-2xl shadow-purple-500/20">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12">
                {/* Animated circuit pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cg%20stroke%3D%22rgba(147,51,234,0.3)%22%20stroke-width%3D%220.5%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M0%200h50v50M50%2050h50v50M25%2025h50M0%2075h75%22%3E%3C/path%3E%3C/g%3E%3C/svg%3E')]" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
                      <Battery className="h-10 w-10 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-4 py-2 rounded-full border border-white/10 backdrop-blur">
                      ADVANCED LITHIUM TECHNOLOGY
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Next-Generation
                    </span>
                    <br />
                    <span className="text-white">Lithium Battery Systems</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl mb-8 text-blue-100/80 max-w-3xl"
                  >
                    Powering the future with <span className="text-blue-300 font-bold">12,000+ cycle life</span>,
                    <span className="text-purple-300 font-bold"> 95% efficiency</span>, and
                    <span className="text-pink-300 font-bold"> unmatched safety</span>
                  </motion.p>

                  {/* Enhanced Live Battery Metrics Dashboard */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, staggerChildren: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
                  >
                    {[
                      { icon: Activity, value: cycleCount.toLocaleString(), label: "Cycles", color: "blue" },
                      { icon: Thermometer, value: `${temperatureReading.toFixed(1)}°C`, label: "Temperature", color: "green" },
                      { icon: Gauge, value: `${socLevel.toFixed(0)}%`, label: "SOC", color: "yellow" },
                      { icon: Zap, value: `${voltageReading.toFixed(1)}V`, label: "Voltage", color: "purple" },
                      { icon: CircuitBoard, value: `${currentFlow.toFixed(1)}A`, label: "Current", color: "orange" },
                      { icon: Power, value: `${powerOutput.toFixed(2)}kW`, label: "Power", color: "red" }
                    ].map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all">
                            <Icon className={`h-5 w-5 mb-2 text-${metric.color}-400`} />
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                            <div className={`text-sm text-${metric.color}-300/80`}>{metric.label}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Enhanced CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group px-8 py-4 rounded-2xl font-bold overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative text-white flex items-center gap-2">
                        Get Technical Datasheet
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group px-8 py-4 rounded-2xl font-bold overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <span className="relative text-white flex items-center gap-2 border border-white/20 rounded-2xl px-8 py-4">
                        <Calculator className="h-5 w-5" />
                        Battery Sizing Calculator
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PHASE 2: Enhanced Photo Gallery with Advanced Animations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-bold mb-2 text-lg"
              >
                OUR WORK
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-black mb-4"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Professional Installations
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg"
              >
                Real projects completed by North State Solar
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Enhanced Photo Card with Multi-layer Effects */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />

                {/* Glass container */}
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Image with overlay effects */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={solarInstallImage}
                      alt="Ground-mount solar installation with lithium battery integration"
                      className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        PROFESSIONAL INSTALLATION
                      </div>
                    </motion.div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white font-bold text-2xl mb-2"
                      >
                        Solar + Battery Integration
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-200 text-sm"
                      >
                        Complete energy independence solution with LiFePO4 storage
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>

            {/* Battery Bank Configuration */}
            <div className="relative group">
              <img
                src={batteryBankImage}
                alt="Lithium battery bank configuration and wiring"
                className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg hover:shadow-2xl transition-shadow"
              />
              <div className="absolute top-2 left-2 bg-black/80 text-yellow-300 px-3 py-1 rounded text-xs font-semibold">
                LiFePO4 Technology
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold">Battery Bank Systems</h3>
                <p className="text-gray-200 text-sm">Scalable 48V configurations with BMS integration</p>
              </div>
            </div>

            {/* Inverter System Integration */}
            <div className="relative group">
              <img
                src={inverterSystemImage}
                alt="Advanced inverter system with grid integration"
                className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg hover:shadow-2xl transition-shadow"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-yellow-300 px-3 py-1 rounded text-xs font-semibold">
                Grid-Tie System
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold">Smart Inverter Technology</h3>
                <p className="text-gray-200 text-sm">Sol-Ark hybrid inverters with automatic transfer</p>
              </div>
            </div>

            {/* Installation Team */}
            <div className="relative group">
              <img
                src={installationTeamImage}
                alt="Professional installation team working on lithium battery system"
                className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg hover:shadow-2xl transition-shadow"
              />
              <div className="absolute top-2 left-2 bg-black/80 text-yellow-300 px-3 py-1 rounded text-xs font-semibold">
                Expert Team
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold">Certified Installers</h3>
                <p className="text-gray-200 text-sm">NABCEP certified technicians with 20+ years experience</p>
              </div>
            </div>
          </div>
        </div>
          </motion.div>
        </div>

        {/* PHASE 3: Chemistry Comparison with 3D Effects and Particle Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-100, -500],
                  x: [0, (i % 2 ? 50 : -50), 0]
                }}
                transition={{
                  duration: 10 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"
                style={{ left: `${(i * 5) % 100}%` }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-xl rounded-full text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text font-bold mb-4">
              BATTERY CHEMISTRY ANALYSIS
            </span>
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lithium Technology
              </span>
              <br />
              <span className="text-white">Comparison Matrix</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive analysis of lithium battery chemistries for optimal application selection
            </p>
          </motion.div>

          {/* 3D Tab Selector with Perspective */}
          <motion.div
            initial={{ opacity: 0, rotateX: -20 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            style={{ perspective: "1000px" }}
            className="flex flex-wrap gap-3 mb-8 justify-center"
          >
            {Object.keys(chemistryData).map((chem, idx) => (
              <motion.button
                key={chem}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedChemistry(chem)}
                className="relative group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`
                  relative px-6 py-3 rounded-2xl font-bold transition-all duration-300
                  ${selectedChemistry === chem
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30"
                    : "bg-slate-800/50 backdrop-blur-xl text-gray-300 hover:text-white border border-slate-700/50"
                  }
                `}>
                  {selectedChemistry === chem && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{chem.toUpperCase()}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {chemistryData[selectedChemistry].name}
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <Zap className="h-5 w-5 text-yellow-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Nominal Voltage</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].voltage}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <Battery className="h-5 w-5 text-green-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Energy Density</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].energy}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <Activity className="h-5 w-5 text-blue-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Cycle Life</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].cycles}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <Shield className="h-5 w-5 text-purple-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Safety Rating</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].safety}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <CheckCircle className="h-5 w-5 text-green-500" /> Key Advantages
                </h4>
                <ul className="space-y-2">
                  {chemistryData[selectedChemistry].advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Factory className="h-5 w-5 text-blue-500" /> Applications
                </h4>
                <ul className="space-y-2">
                  {chemistryData[selectedChemistry].applications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Chemistry Details */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <Thermometer className="h-5 w-5 text-blue-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Operating Temperature</div>
                <div className="font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].temp}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <DollarSign className="h-5 w-5 text-green-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Relative Cost</div>
                <div className="font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].cost}</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <Award className="h-5 w-5 text-purple-500 mb-2" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Best Use Case</div>
                <div className="font-bold text-gray-900 dark:text-white">{chemistryData[selectedChemistry].applications[0]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Installation Gallery */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="relative group">
              <img
                src={solarFarmImage}
                alt="Large scale solar farm with battery storage"
                className="w-full h-auto rounded-lg border border-blue-600/30 shadow-lg hover:shadow-2xl transition-shadow"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold">Utility Scale Storage</h3>
                <p className="text-gray-200 text-sm">Megawatt-hour grid stabilization systems</p>
              </div>
            </div>

            <div className="relative group">
              <img
                src={batteryStorageImage}
                alt="Commercial battery storage system"
                className="w-full h-auto rounded-lg border border-blue-600/30 shadow-lg hover:shadow-2xl transition-shadow"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold">Commercial Storage</h3>
                <p className="text-gray-200 text-sm">Demand charge reduction systems</p>
              </div>
            </div>

            <div className="relative group">
              <img
                src={residentialSolarImage}
                alt="Residential solar and battery system"
                className="w-full h-auto rounded-lg border border-blue-600/30 shadow-lg hover:shadow-2xl transition-shadow"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold">Residential Solutions</h3>
                <p className="text-gray-200 text-sm">Whole-home backup power systems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cell Format Specifications */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Cell Formats & Standards</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Industry-Standard Cell Types</h2>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive specifications for all standard lithium battery cell formats</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Format</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dimensions</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Voltage</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cellFormats.map((cell, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {cell.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {cell.diameter} × {cell.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {cell.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {cell.voltage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {cell.weight}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {cell.applications}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BMS Technology Deep Dive */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Battery Management System</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">8-Layer Protection Architecture</h2>
            <p className="text-gray-600 dark:text-gray-400">Advanced BMS technology ensuring safety, longevity, and optimal performance</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <CircuitBoard className="h-6 w-6" /> BMS Protection Layers
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {bmsFeatures.map((feature, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.layer}</h4>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                        {feature.response}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{feature.function}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-500">Range: {feature.range}</span>
                      <span className="text-green-600 dark:text-green-400">✓ {feature.protection}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time BMS Monitoring Visualization */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-400" /> Live BMS Monitoring
              </h3>
              <div className="space-y-4">
                {/* Cell Voltage Visualization */}
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Cell Voltages (16S Configuration)</span>
                    <span className="text-xs text-green-400">All Balanced</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition z-10">
                          3.{28 + Math.floor(Math.random() * 4)}V
                        </div>
                        <div className="h-8 bg-gradient-to-t from-green-600 to-green-400 rounded animate-pulse mt-6"
                             style={{height: `${28 + Math.sin(Date.now() / 1000 + i) * 4}px`}}></div>
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
                          <div className={`text-lg font-bold ${temp > 26 ? 'text-orange-400' : 'text-green-400'}`}>
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
                        <span className="text-sm font-bold text-green-400">{currentFlow.toFixed(1)}A</span>
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
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">All Systems Normal</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {['OVP', 'UVP', 'OCP', 'OTP', 'SCP', 'Cell Balance', 'Isolation', 'Communication'].map((protection, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-400">{protection}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Team and Equipment Gallery */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={technicianImage}
                  alt="Greg with solar panel - Lead technician"
                  className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg hover:shadow-2xl transition-shadow"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white font-bold">Expert Installation Team</h3>
                  <p className="text-gray-200 text-sm">NABCEP certified with 20+ years experience</p>
                </div>
              </div>

              <div className="relative group">
                <img
                  src={solArkSystemImage}
                  alt="Sol-Ark hybrid inverter system installation"
                  className="w-full h-auto rounded-lg border border-yellow-600/30 shadow-lg hover:shadow-2xl transition-shadow"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white font-bold">Sol-Ark Hybrid Systems</h3>
                  <p className="text-gray-200 text-sm">Advanced grid-interactive battery inverters</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={energyConservationImage}
                  alt="Energy conservation and monitoring systems"
                  className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg hover:shadow-2xl transition-shadow"
                />
              </div>

              <div className="relative group">
                <img
                  src={solarPanelsAerialImage}
                  alt="Aerial view of solar panel installation"
                  className="w-full h-auto rounded-lg border border-blue-600/30 shadow-lg hover:shadow-2xl transition-shadow"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white font-bold">Large Scale Projects</h3>
                  <p className="text-gray-200 text-sm">Commercial and industrial installations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final aesthetic image */}
          <div className="mt-6">
            <div className="relative group">
              <img
                src={forestSolarImage}
                alt="Solar panels in forest setting - sustainable energy"
                className="w-full h-auto rounded-lg border border-green-600/30 shadow-lg hover:shadow-2xl transition-shadow max-h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end p-8">
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">Sustainable Energy Solutions</h3>
                  <p className="text-gray-200">Harmonizing technology with nature for a cleaner future</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing Process Timeline */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Production Excellence</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Battery Manufacturing Process</h2>
            <p className="text-gray-600 dark:text-gray-400">ISO 9001:2015 certified production with rigorous quality control</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="relative">
              {/* Process Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

              <div className="space-y-8">
                {manufacturingProcess.map((step) => (
                  <div key={step.step} className="relative flex items-start gap-6">
                    <div className="absolute left-6 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full"></div>
                    <div className="ml-16 flex-1">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                            Step {step.step}: {step.process}
                          </h4>
                          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-500 dark:text-gray-400">Quality Standard: {step.quality}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Application Sectors with Detailed Specs */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Market Applications</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Industry-Specific Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400">Tailored lithium battery systems for every sector and use case</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{app.sector}</h3>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{app.power}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Voltage Range</span>
                      <div className="font-semibold text-gray-900 dark:text-white">{app.voltage}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Chemistry</span>
                      <div className="font-semibold text-gray-900 dark:text-white">{app.chemistry}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Leading Brands</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {app.brands.map((brand, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Key Features</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {app.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">ROI Period</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{app.roi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Standards & Testing */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold mb-2">Safety & Compliance</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Rigorous Testing Standards</h2>
            <p className="text-gray-600 dark:text-gray-400">Meeting and exceeding global safety certifications</p>
          </div>

          {/* Safety Standards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {safetyStandards.map((standard, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <Award className="h-8 w-8 text-blue-500" />
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{standard.standard}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{standard.description}</h4>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Testing Requirements:</p>
                  <ul className="space-y-1">
                    {standard.tests.map((test, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <ChevronRight className="h-3 w-3 text-green-500" />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{standard.compliance}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testing Procedures */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="h-6 w-6 text-red-500" /> Thermal Runaway Testing Protocol
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Temperature Test</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cells heated to 200°C to verify no thermal runaway propagation</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Overcharge Test</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Charge to 200% SOC to verify BMS protection and safety</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Penetration Test</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nail penetration to simulate catastrophic damage scenarios</p>
              </div>
            </div>
          </div>
        </div>

        {/* Battery Metrics Education - Phase 4 Ultra Premium */}
        <div className="mb-12 relative">
          {/* Quantum Particle Field */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full"
                initial={{
                  x: Math.random() * 1000,
                  y: Math.random() * 600,
                  scale: 0
                }}
                animate={{
                  x: [null, Math.random() * 1000],
                  y: [null, Math.random() * 600],
                  scale: [0, Math.random() * 2 + 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  boxShadow: '0 0 20px rgba(59,130,246,0.8)',
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 relative z-10"
          >
            <motion.p
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-red-600 font-semibold mb-2 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
            >
              Technical Knowledge
            </motion.p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 relative">
              <span className="relative z-10">Understanding Battery Metrics</span>
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Key performance indicators and what they mean for your system</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg,
                rgba(255,255,255,0.95) 0%,
                rgba(219,234,254,0.9) 33%,
                rgba(221,214,254,0.9) 66%,
                rgba(254,226,226,0.9) 100%)`,
              boxShadow: `
                0 25px 50px -12px rgba(0,0,0,0.15),
                0 0 150px rgba(59,130,246,0.15),
                inset 0 0 100px rgba(168,85,247,0.05)
              `
            }}
          >
            {/* Iridescent Overlay */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              animate={{
                background: [
                  "conic-gradient(from 0deg, transparent, rgba(255,0,255,0.2), transparent, rgba(0,255,255,0.2), transparent)",
                  "conic-gradient(from 180deg, transparent, rgba(0,255,255,0.2), transparent, rgba(255,0,255,0.2), transparent)",
                  "conic-gradient(from 360deg, transparent, rgba(255,0,255,0.2), transparent, rgba(0,255,255,0.2), transparent)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 relative z-10">
              {batteryMetrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                  }}
                  className="relative group"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(45deg,
                        rgba(59,130,246,0.1) 0%,
                        rgba(168,85,247,0.1) 50%,
                        rgba(236,72,153,0.1) 100%)`,
                      filter: "blur(20px)"
                    }}
                  />
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-white/50 dark:border-gray-700/50">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-l-xl"></div>
                    <div className="pl-3">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {metric.metric}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.definition}</p>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-2 mb-1 border border-blue-200/50 dark:border-purple-400/30"
                      >
                        <strong className="text-blue-700 dark:text-blue-300">Example:</strong> {metric.example}
                      </motion.div>
                      <p className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                        <strong>Why it matters:</strong> {metric.importance}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recycling & Sustainability - Phase 4 Ultra Premium */}
        <div className="mb-12 relative">
          {/* Aurora Wave Effect */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse at top left, rgba(34,197,94,0.3) 0%, transparent 50%)",
                "radial-gradient(ellipse at bottom right, rgba(59,130,246,0.3) 0%, transparent 50%)",
                "radial-gradient(ellipse at top right, rgba(168,85,247,0.3) 0%, transparent 50%)",
                "radial-gradient(ellipse at bottom left, rgba(34,197,94,0.3) 0%, transparent 50%)",
                "radial-gradient(ellipse at top left, rgba(34,197,94,0.3) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ filter: "blur(40px)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 relative z-10"
          >
            <motion.p
              className="text-red-600 font-semibold mb-2 relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent animate-gradient-x">
                Circular Economy
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-lg blur-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              <motion.span
                className="inline-block"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34,197,94,0)",
                    "0 0 40px rgba(34,197,94,0.3)",
                    "0 0 20px rgba(34,197,94,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Battery Recycling & Recovery
              </motion.span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Closing the loop with 95%+ material recovery rates</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden p-8"
            style={{
              background: `linear-gradient(145deg,
                rgba(240,253,244,0.95) 0%,
                rgba(219,234,254,0.95) 25%,
                rgba(237,233,254,0.95) 50%,
                rgba(219,234,254,0.95) 75%,
                rgba(240,253,244,0.95) 100%)`,
              boxShadow: `
                0 30px 60px -15px rgba(0,0,0,0.12),
                0 0 120px rgba(34,197,94,0.1),
                0 0 80px rgba(59,130,246,0.1),
                inset 0 0 60px rgba(255,255,255,0.5)
              `
            }}
          >
            {/* Holographic Mesh */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(34,197,94,0.1) 35px, rgba(34,197,94,0.1) 70px),
                  repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(59,130,246,0.1) 35px, rgba(59,130,246,0.1) 70px)
                `
              }}
            />
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recycling Process Flow */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recycling Process Flow</h3>
                <div className="space-y-3">
                  {recyclingProcess.map((stage, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{stage.stage}</h4>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                              {stage.recovery}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stage.process}</p>
                          <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                            <DollarSign className="h-3 w-3" />
                            <span>{stage.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Impact */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Environmental Impact</h3>

                {/* Carbon Footprint Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Leaf className="h-5 w-5 text-green-500" /> Carbon Footprint Reduction
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Virgin Material Production</span>
                        <span className="text-sm font-bold text-red-500">12.5 kg CO₂/kWh</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Recycled Material Production</span>
                        <span className="text-sm font-bold text-green-500">3.8 kg CO₂/kWh</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 dark:text-white">Carbon Savings</span>
                        <span className="font-bold text-green-600">70% Reduction</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Recovery Rates */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Package className="h-5 w-5 text-blue-500" /> Material Recovery Rates
                  </h4>
                  <div className="space-y-2">
                    {[
                      { material: "Lithium", rate: 95, color: "blue" },
                      { material: "Cobalt", rate: 98, color: "purple" },
                      { material: "Nickel", rate: 98, color: "green" },
                      { material: "Copper", rate: 99, color: "orange" },
                      { material: "Aluminum", rate: 97, color: "gray" },
                      { material: "Graphite", rate: 90, color: "black" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">{item.material}</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{width: `${item.rate}%`}}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.rate}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sustainability Goals */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
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
          </div>
        </div>

        {/* Cost Analysis & ROI Calculator - Phase 4 Ultra Premium */}
        <div className="mb-12 relative">
          {/* Floating Currency Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-20"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: Math.random() * 360
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360,
                  opacity: [0, 0.3, 0.3, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "linear"
                }}
              >
                {["💰", "$", "€", "£", "¥"][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 relative z-10"
          >
            <motion.p
              animate={{
                background: [
                  "linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)",
                  "linear-gradient(90deg, #10b981 0%, #ef4444 50%, #f59e0b 100%)",
                  "linear-gradient(90deg, #f59e0b 0%, #10b981 50%, #ef4444 100%)",
                  "linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-red-600 font-semibold mb-2 bg-clip-text text-transparent inline-block"
              style={{ WebkitBackgroundClip: "text" }}
            >
              Financial Analysis
            </motion.p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Total Cost of Ownership
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-xl blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive cost comparison and ROI calculations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateX: -10 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative rounded-2xl overflow-hidden p-8"
            style={{
              perspective: "1000px",
              background: `linear-gradient(135deg,
                rgba(255,255,255,0.98) 0%,
                rgba(239,246,255,0.95) 20%,
                rgba(254,240,138,0.92) 40%,
                rgba(220,252,231,0.92) 60%,
                rgba(233,213,255,0.95) 80%,
                rgba(255,255,255,0.98) 100%)`,
              boxShadow: `
                0 50px 100px -20px rgba(0,0,0,0.15),
                0 30px 60px -30px rgba(0,0,0,0.2),
                0 0 200px rgba(16,185,129,0.1),
                inset 0 0 150px rgba(255,255,255,0.6)
              `,
              transform: "translateZ(0)"
            }}
          >
            {/* Animated Grid Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5 pointer-events-none"
              animate={{
                backgroundPosition: ["0px 0px", "50px 50px"]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: `
                  linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px"
              }}
            />
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Cost Comparison */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">10-Year Cost Comparison</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
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
                        <span className="font-bold text-green-600">$8,600</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white">10-Year Savings with Lithium</span>
                      <span className="text-2xl font-bold text-green-600">$9,400</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Calculator */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick ROI Calculator</h3>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
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
                          <p className="text-xl font-bold text-green-600">$144</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Annual Savings</p>
                          <p className="text-xl font-bold text-green-600">$1,728</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Payback Period</p>
                          <p className="text-xl font-bold text-blue-600">6.9 years</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">20-Year ROI</p>
                          <p className="text-xl font-bold text-purple-600">290%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Phase 4 Ultra Premium */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="relative overflow-hidden rounded-3xl p-8 text-white text-center"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(59,130,246,0.8) 0%, transparent 40%),
              radial-gradient(ellipse at bottom right, rgba(168,85,247,0.8) 0%, transparent 40%),
              radial-gradient(ellipse at center, rgba(236,72,153,0.6) 0%, transparent 60%),
              linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)
            `,
            boxShadow: `
              0 30px 60px rgba(0,0,0,0.3),
              0 0 120px rgba(59,130,246,0.4),
              0 0 80px rgba(168,85,247,0.3),
              inset 0 0 120px rgba(255,255,255,0.1)
            `
          }}
        >
          {/* Animated Particles Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * 1000 - 500,
                  y: Math.random() * 600 - 300,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 1000 - 500,
                  y: Math.random() * 600 - 300,
                  opacity: [0, Math.random() * 0.5 + 0.3, 0]
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  filter: `blur(${Math.random() * 2}px)`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                }}
              />
            ))}
          </div>

          {/* Holographic Overlay */}
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none"
            animate={{
              background: [
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg)",
                "conic-gradient(from 120deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg)",
                "conic-gradient(from 240deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg)",
                "conic-gradient(from 360deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
            animate={{
              textShadow: [
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 60px rgba(255,255,255,0.8)",
                "0 0 30px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ready to Upgrade to Lithium?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get a custom battery solution designed for your specific needs
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Get Custom Quote
              </span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.35)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/25 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border border-white/30 flex items-center gap-2"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.1)"
              }}
            >
              <Phone className="h-5 w-5" /> Schedule Consultation
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.35)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/25 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border border-white/30 flex items-center gap-2"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.1)"
              }}
            >
              <FileCheck className="h-5 w-5" /> Download Spec Sheet
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-8 text-sm text-blue-100 relative z-10"
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
        </motion.div>
      </div>
    </div>
  );
};

export default LithiumBattery;