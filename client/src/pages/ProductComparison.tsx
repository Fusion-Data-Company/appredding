import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PremiumTabs, PremiumTabsList, PremiumTabsTrigger, PremiumTabsContent } from "@/components/ui/premium-tabs";
import { Zap, Sun, Battery, Sparkles, Star, TrendingUp, Shield, Gauge, Thermometer, CheckCircle2, Package, Award, ArrowRight } from "lucide-react";
import SolarBackground from "@/components/SolarBackground";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { GradientTracing } from '@/components/ui/gradient-tracing';

interface ProductFeature {
  name: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  features: ProductFeature[];
  specifications: Record<string, string | number>;
  applicationAreas: string[];
  price: {
    value: number;
    unit: string;
  };
  rating: number;
  imageUrl: string;
}

const productData: Product[] = [
  {
    id: "sol-ark-12k",
    name: "Sol-Ark 12K",
    description: "All-in-one hybrid inverter with integrated battery management, dual MPPT, and seamless backup switching for residential and light commercial applications.",
    category: "hybrid-inverter",
    features: [
      { name: "Integrated Battery Management", description: "Built-in advanced BMS for lithium and LiFePO4 batteries" },
      { name: "Dual MPPT Channels", description: "Two independent MPPT trackers for maximum solar harvest" },
      { name: "Seamless Backup Switching", description: "Automatic transfer in under 4ms for uninterrupted power" },
      { name: "Hybrid Operation", description: "Works with grid, solar, battery, and generator simultaneously" },
      { name: "Smart Load Management", description: "Intelligent load shifting and peak shaving capabilities" },
      { name: "Generator Support", description: "Auto-start generator integration for extended backup" }
    ],
    specifications: {
      "Continuous Power Output": "12,000 W",
      "Peak/Surge Power": "18,000 W for 5 sec",
      "Max Efficiency": "97.5%",
      "CEC Weighted Efficiency": "96.5%",
      "MPPT Voltage Range": "60-550 VDC",
      "Max Input Voltage": "600 VDC",
      "Output Voltage": "120/240 VAC split-phase",
      "Battery Voltage Range": "42-60 VDC",
      "Battery Type Support": "Lithium-ion, LiFePO4",
      "Grid Tie/Off-Grid": "Hybrid (both)",
      "Warranty": "10 years standard",
      "Certifications": "UL1741-SA, IEEE 1547, Rule 21",
      "Operating Temperature": "-40°C to +60°C",
      "Cooling": "Natural convection",
      "Dimensions (HxWxD)": "26 x 18 x 10 in",
      "Weight": "110 lbs",
      "IP Rating": "IP65",
      "Communication": "WiFi, Ethernet, Modbus",
      "Monitoring": "Mobile app, web portal",
      "MPPT Channels": "2 independent"
    },
    applicationAreas: [
      "Residential Solar + Storage",
      "Off-Grid Homes",
      "Backup Power Systems",
      "Energy Independence Applications"
    ],
    price: {
      value: 5299,
      unit: "unit"
    },
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sol-ark-15k",
    name: "Sol-Ark 15K",
    description: "Premium all-in-one hybrid inverter with 15kW continuous output, advanced battery management, and commercial-grade reliability for demanding applications.",
    category: "hybrid-inverter",
    features: [
      { name: "High Power Output", description: "15kW continuous, 22.5kW surge for heavy loads" },
      { name: "Advanced Battery Management", description: "Multi-battery bank support with sophisticated SOC management" },
      { name: "Commercial Grade", description: "Built for demanding commercial and large residential systems" },
      { name: "Parallel Capable", description: "Stack up to 4 units for 60kW total output" },
      { name: "Load Shedding", description: "Intelligent prioritization of critical loads during outages" },
      { name: "Generator Auto-Start", description: "Automatic backup generator control and integration" }
    ],
    specifications: {
      "Continuous Power Output": "15,000 W",
      "Peak/Surge Power": "22,500 W for 5 sec",
      "Max Efficiency": "97.8%",
      "CEC Weighted Efficiency": "97.0%",
      "MPPT Voltage Range": "60-550 VDC",
      "Max Input Voltage": "600 VDC",
      "Output Voltage": "120/240 VAC split-phase",
      "Battery Voltage Range": "42-60 VDC",
      "Battery Type Support": "Lithium-ion, LiFePO4, Lead-acid",
      "Grid Tie/Off-Grid": "Hybrid (both)",
      "Warranty": "10 years standard, 15 years extended",
      "Certifications": "UL1741-SA, IEEE 1547, Rule 21, NEMA 3R",
      "Operating Temperature": "-40°C to +60°C",
      "Cooling": "Natural convection",
      "Dimensions (HxWxD)": "30 x 20 x 12 in",
      "Weight": "135 lbs",
      "IP Rating": "IP65",
      "Communication": "WiFi, Ethernet, Modbus, CAN",
      "Monitoring": "Mobile app, web portal, API",
      "MPPT Channels": "2 independent"
    },
    applicationAreas: [
      "Large Residential Solar + Storage",
      "Commercial Solar Systems",
      "Off-Grid Commercial",
      "Critical Backup Applications"
    ],
    price: {
      value: 6499,
      unit: "unit"
    },
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "enphase-iq8-plus",
    name: "Enphase IQ8+",
    description: "Advanced microinverter with grid-forming capability and sunlight backup for panel-level optimization and maximum energy harvest.",
    category: "microinverter",
    features: [
      { name: "Grid-Forming Technology", description: "Can operate independently without grid reference" },
      { name: "Sunlight Backup", description: "Power during outages with battery or solar only" },
      { name: "Panel-Level Optimization", description: "Each panel operates at maximum efficiency independently" },
      { name: "Rapid Shutdown", description: "Built-in module-level rapid shutdown compliance" },
      { name: "Smart Grid Ready", description: "IEEE 1547-2018 compliant with advanced grid support" },
      { name: "Long Warranty", description: "Industry-leading 25-year warranty coverage" }
    ],
    specifications: {
      "Continuous Power Output": "300 W",
      "Peak/Surge Power": "366 W",
      "Max Efficiency": "97.6%",
      "CEC Weighted Efficiency": "97.0%",
      "MPPT Voltage Range": "27-60 VDC",
      "Max Input Voltage": "60 VDC",
      "Output Voltage": "240 VAC split-phase",
      "Battery Voltage Range": "N/A (grid-forming)",
      "Battery Type Support": "Compatible with Enphase IQ Battery",
      "Grid Tie/Off-Grid": "Grid-tie with backup capability",
      "Warranty": "25 years",
      "Certifications": "UL1741-SA, IEEE 1547-2018, Rule 21",
      "Operating Temperature": "-40°C to +65°C",
      "Cooling": "Natural convection",
      "Dimensions (HxWxD)": "8.3 x 6.5 x 1.5 in",
      "Weight": "2.2 lbs",
      "IP Rating": "IP67",
      "Communication": "Envoy (cellular/ethernet)",
      "Monitoring": "Enlighten mobile app, web",
      "MPPT Channels": "1 per microinverter"
    },
    applicationAreas: [
      "Residential Solar Systems",
      "Complex Roof Layouts",
      "Shading Mitigation",
      "Module-Level Monitoring"
    ],
    price: {
      value: 225,
      unit: "unit"
    },
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "solaredge-se7600h",
    name: "SolarEdge HD-Wave SE7600H",
    description: "High-efficiency string inverter with HD-Wave technology and built-in power optimizers support for maximum energy production and safety.",
    category: "string-inverter",
    features: [
      { name: "HD-Wave Technology", description: "Advanced power conversion with superior efficiency" },
      { name: "Power Optimizer Integration", description: "Works with SolarEdge power optimizers for MPPT at module level" },
      { name: "Fixed Voltage", description: "Optimized string voltage for consistent performance" },
      { name: "Compact Design", description: "Small, lightweight inverter for easy installation" },
      { name: "Built-in Safety", description: "SafeDC automatic voltage shutdown" },
      { name: "Smart Energy Management", description: "Compatible with storage and EV charging solutions" }
    ],
    specifications: {
      "Continuous Power Output": "7,600 W",
      "Peak/Surge Power": "7,600 W (no surge)",
      "Max Efficiency": "99.0%",
      "CEC Weighted Efficiency": "98.0%",
      "MPPT Voltage Range": "Fixed at optimizer level",
      "Max Input Voltage": "450 VDC",
      "Output Voltage": "240 VAC split-phase",
      "Battery Voltage Range": "Compatible with SolarEdge Battery",
      "Battery Type Support": "SolarEdge StorEdge compatible",
      "Grid Tie/Off-Grid": "Grid-tie with backup option",
      "Warranty": "12 years standard, 20/25 extended",
      "Certifications": "UL1741-SA, IEEE 1547, Rule 21",
      "Operating Temperature": "-40°C to +60°C",
      "Cooling": "Natural convection",
      "Dimensions (HxWxD)": "20.5 x 14.4 x 7.1 in",
      "Weight": "33 lbs",
      "IP Rating": "IP65",
      "Communication": "WiFi, Ethernet, cellular (optional)",
      "Monitoring": "SolarEdge monitoring platform",
      "MPPT Channels": "Module-level via optimizers"
    },
    applicationAreas: [
      "Residential Solar Systems",
      "Grid-Tie Solar",
      "Systems with Shading",
      "Battery-Ready Installations"
    ],
    price: {
      value: 1549,
      unit: "unit"
    },
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sma-sunny-boy-7-7",
    name: "SMA Sunny Boy 7.7",
    description: "Proven string inverter with integrated ShadeFix technology and comprehensive grid management for reliable residential solar installations.",
    category: "string-inverter",
    features: [
      { name: "ShadeFix Technology", description: "Optimizes performance in partial shading conditions" },
      { name: "OptiTrac MPPT", description: "Fast and precise maximum power point tracking" },
      { name: "Integrated DC Disconnect", description: "Built-in safety disconnect for easy servicing" },
      { name: "Secure Power Supply", description: "Daytime power during grid outages (no battery)" },
      { name: "Grid Support Functions", description: "Reactive power and voltage support capabilities" },
      { name: "Proven Reliability", description: "SMA's industry-leading track record" }
    ],
    specifications: {
      "Continuous Power Output": "7,700 W",
      "Peak/Surge Power": "7,700 W (no surge)",
      "Max Efficiency": "97.5%",
      "CEC Weighted Efficiency": "97.0%",
      "MPPT Voltage Range": "80-600 VDC",
      "Max Input Voltage": "600 VDC",
      "Output Voltage": "240 VAC split-phase",
      "Battery Voltage Range": "N/A (no battery support)",
      "Battery Type Support": "None (grid-tie only)",
      "Grid Tie/Off-Grid": "Grid-tie only",
      "Warranty": "10 years standard, 20 years extended",
      "Certifications": "UL1741-SA, IEEE 1547, Rule 21",
      "Operating Temperature": "-25°C to +60°C",
      "Cooling": "OptiCool active cooling",
      "Dimensions (HxWxD)": "18.1 x 16.9 x 7.5 in",
      "Weight": "61 lbs",
      "IP Rating": "IP65",
      "Communication": "Ethernet, WiFi via Webconnect",
      "Monitoring": "Sunny Portal, ennexOS",
      "MPPT Channels": "2 independent"
    },
    applicationAreas: [
      "Residential Grid-Tie Solar",
      "Commercial Solar",
      "String Inverter Systems",
      "Reliable Grid-Connected Installations"
    ],
    price: {
      value: 1849,
      unit: "unit"
    },
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fronius-primo-8-2",
    name: "Fronius Primo 8.2",
    description: "Premium Austrian-engineered string inverter with SnapINverter technology and comprehensive smart grid features for modern solar installations.",
    category: "string-inverter",
    features: [
      { name: "SnapINverter Mounting", description: "Tool-free installation with quick-change technology" },
      { name: "SuperFlex Design", description: "Wide input voltage range for flexible design" },
      { name: "Dynamic Peak Manager", description: "Optimized performance in all conditions" },
      { name: "Smart Grid Ready", description: "Full grid management and support capabilities" },
      { name: "Integrated Datalogger", description: "Built-in monitoring and data collection" },
      { name: "WiFi Included", description: "Standard wireless connectivity for monitoring" }
    ],
    specifications: {
      "Continuous Power Output": "8,200 W",
      "Peak/Surge Power": "8,200 W (no surge)",
      "Max Efficiency": "98.0%",
      "CEC Weighted Efficiency": "97.5%",
      "MPPT Voltage Range": "80-800 VDC",
      "Max Input Voltage": "1000 VDC",
      "Output Voltage": "240 VAC split-phase",
      "Battery Voltage Range": "Compatible with Fronius Energy Package",
      "Battery Type Support": "Fronius Solar Battery",
      "Grid Tie/Off-Grid": "Grid-tie with backup option",
      "Warranty": "10 years standard, 20 years extended",
      "Certifications": "UL1741-SA, IEEE 1547, Rule 21",
      "Operating Temperature": "-25°C to +60°C",
      "Cooling": "Temperature-controlled fan",
      "Dimensions (HxWxD)": "25.6 x 17.7 x 7.9 in",
      "Weight": "37 lbs",
      "IP Rating": "IP66",
      "Communication": "WiFi, Ethernet, Modbus",
      "Monitoring": "Fronius Solar.web, app",
      "MPPT Channels": "2 independent"
    },
    applicationAreas: [
      "Residential Solar Systems",
      "Commercial Installations",
      "Premium Grid-Tie Solar",
      "Smart Home Energy Systems"
    ],
    price: {
      value: 2099,
      unit: "unit"
    },
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80"
  },
  // Solar Panels from Sales Manual
  {
    id: "lg-neon-r-440",
    name: "LG NeON R 440W",
    description: "Premium high-efficiency monocrystalline solar panel with exceptional performance and 25-year warranty from LG Electronics.",
    category: "solar-panel",
    features: [
      { name: "High Efficiency", description: "Up to 22.0% module efficiency with N-type cells" },
      { name: "Bifacial Design", description: "Rear-side power generation for up to 30% more energy" },
      { name: "Enhanced Durability", description: "Improved frame and cell design for extreme weather" },
      { name: "Temperature Performance", description: "Excellent temperature coefficient -0.30%/°C" },
      { name: "LG Warranty", description: "25-year product and performance warranty" },
      { name: "Low Light Performance", description: "Superior performance in cloudy conditions" }
    ],
    specifications: {
      "Power Output": "440W",
      "Module Efficiency": "22.0%",
      "Cell Type": "N-type Monocrystalline",
      "Cell Configuration": "60 cells (6x10)",
      "Operating Temperature": "-40°C to +85°C",
      "Temperature Coefficient": "-0.30%/°C",
      "Max System Voltage": "1000V DC",
      "Dimensions": "2024 x 1024 x 40mm",
      "Weight": "22 kg",
      "Frame": "Anodized aluminum",
      "Glass": "3.2mm tempered glass",
      "Warranty": "25 years product, 25 years performance",
      "Certifications": "UL 61730, IEC 61215",
      "Wind Load": "5400 Pa",
      "Snow Load": "5400 Pa"
    },
    applicationAreas: [
      "Residential Solar Systems",
      "Commercial Rooftops",
      "Ground Mount Arrays",
      "High-Efficiency Applications"
    ],
    price: {
      value: 580,
      unit: "panel"
    },
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "jinko-tiger-neo-420",
    name: "JinkoSolar Tiger Neo 420W",
    description: "Advanced N-type TOPCon solar panel with excellent performance and competitive pricing from the world's largest panel manufacturer.",
    category: "solar-panel",
    features: [
      { name: "TOPCon Technology", description: "N-type tunnel oxide passivated contact cells" },
      { name: "High Power Output", description: "Up to 420W with 21.5% efficiency" },
      { name: "Low Degradation", description: "First year degradation ≤1%, annual ≤0.4%" },
      { name: "Bifacial Factor", description: "Up to 80% bifaciality for increased yield" },
      { name: "PID Resistant", description: "Anti-PID cell technology and materials" },
      { name: "Hot Spot Protection", description: "Half-cell design reduces hot spot risk" }
    ],
    specifications: {
      "Power Output": "420W",
      "Module Efficiency": "21.5%",
      "Cell Type": "N-type TOPCon",
      "Cell Configuration": "108 half-cells",
      "Operating Temperature": "-40°C to +85°C",
      "Temperature Coefficient": "-0.30%/°C",
      "Max System Voltage": "1500V DC",
      "Dimensions": "1722 x 1134 x 30mm",
      "Weight": "22.5 kg",
      "Frame": "Anodized aluminum alloy",
      "Glass": "3.2mm AR coated tempered glass",
      "Warranty": "12 years product, 25 years performance",
      "Certifications": "UL 61730, IEC 61215, IEC 61730",
      "Wind Load": "2400 Pa",
      "Snow Load": "5400 Pa"
    },
    applicationAreas: [
      "Utility-Scale Solar",
      "Commercial Projects",
      "Residential Installations",
      "Floating Solar Systems"
    ],
    price: {
      value: 315,
      unit: "panel"
    },
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "mission-solar-415",
    name: "Mission Solar MSE415SQ9S",
    description: "American-made PERC solar panel with excellent reliability and performance, assembled in San Antonio, Texas.",
    category: "solar-panel",
    features: [
      { name: "Made in USA", description: "Assembled in San Antonio, Texas facility" },
      { name: "PERC Technology", description: "Passivated Emitter Rear Cell for higher efficiency" },
      { name: "Heavy Snow Load", description: "Certified for 5400 Pa snow load" },
      { name: "Buy American Compliant", description: "Meets Buy American Act requirements" },
      { name: "Quality Assurance", description: "100% EL testing on every module" },
      { name: "Low LID", description: "Light-induced degradation <2%" }
    ],
    specifications: {
      "Power Output": "415W",
      "Module Efficiency": "20.1%",
      "Cell Type": "Monocrystalline PERC",
      "Cell Configuration": "144 half-cells",
      "Operating Temperature": "-40°C to +85°C",
      "Temperature Coefficient": "-0.35%/°C",
      "Max System Voltage": "1500V DC",
      "Dimensions": "2094 x 1038 x 35mm",
      "Weight": "25 kg",
      "Frame": "Black anodized aluminum",
      "Glass": "3.2mm tempered glass",
      "Warranty": "12 years product, 25 years performance",
      "Certifications": "UL 61730, Buy American Act",
      "Wind Load": "2400 Pa",
      "Snow Load": "5400 Pa"
    },
    applicationAreas: [
      "Government Projects",
      "Residential Solar",
      "Commercial Rooftops",
      "Buy American Projects"
    ],
    price: {
      value: 385,
      unit: "panel"
    },
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1413882353314-73389f63b6fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rec-alpha-430",
    name: "REC Alpha Pure-R 430W",
    description: "Premium European solar panel with heterojunction cell technology delivering industry-leading performance and reliability.",
    category: "solar-panel",
    features: [
      { name: "HJT Technology", description: "Heterojunction cells for superior efficiency" },
      { name: "Gapless Design", description: "No gaps between cells for maximum power" },
      { name: "Lead-Free", description: "Environmentally friendly lead-free construction" },
      { name: "Low Temperature Coefficient", description: "Best-in-class -0.24%/°C" },
      { name: "Strong Warranty", description: "25-year product, 92% performance at 25 years" },
      { name: "Twin Design", description: "Split junction box reduces power loss" }
    ],
    specifications: {
      "Power Output": "430W",
      "Module Efficiency": "22.3%",
      "Cell Type": "Heterojunction (HJT)",
      "Cell Configuration": "120 half-cells",
      "Operating Temperature": "-40°C to +85°C",
      "Temperature Coefficient": "-0.24%/°C",
      "Max System Voltage": "1000V DC",
      "Dimensions": "1821 x 1016 x 30mm",
      "Weight": "19.5 kg",
      "Frame": "Anodized aluminum",
      "Glass": "3.2mm solar glass",
      "Warranty": "25 years product, 25 years performance",
      "Certifications": "UL 61730, IEC 61215",
      "Wind Load": "2400 Pa",
      "Snow Load": "7000 Pa"
    },
    applicationAreas: [
      "Premium Residential",
      "Limited Roof Space",
      "High-Temperature Regions",
      "Performance-Critical Applications"
    ],
    price: {
      value: 495,
      unit: "panel"
    },
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=600&q=80"
  },
  // Battery Storage from Sales Manual
  {
    id: "simpliphi-phi-3.8",
    name: "SimpliPhi PHI 3.8 kWh",
    description: "Premium LiFePO4 battery with built-in BMS, no thermal runaway risk, and 10,000+ cycle life for residential storage.",
    category: "battery",
    features: [
      { name: "LiFePO4 Chemistry", description: "Safest lithium chemistry with no thermal runaway" },
      { name: "Deep Discharge", description: "100% depth of discharge without damage" },
      { name: "No Ventilation Required", description: "Safe for indoor installation without special ventilation" },
      { name: "Wide Temperature Range", description: "Operates from -4°F to 140°F" },
      { name: "Maintenance Free", description: "No watering, equalization, or maintenance" },
      { name: "Modular Design", description: "Scalable from 3.8 to 100+ kWh" }
    ],
    specifications: {
      "Nominal Capacity": "3.8 kWh",
      "Usable Capacity": "3.8 kWh (100% DOD)",
      "Nominal Voltage": "51.2V",
      "Operating Voltage": "44-58.1V",
      "Max Charge Current": "74A",
      "Max Discharge Current": "100A continuous, 150A surge",
      "Roundtrip Efficiency": ">98%",
      "Cycle Life": "10,000 cycles @ 80% DOD",
      "Operating Temperature": "-4°F to 140°F",
      "Dimensions": "13.5 x 12.9 x 9.7 in",
      "Weight": "82 lbs",
      "Warranty": "10 years",
      "Certifications": "UL 1973, UL 9540",
      "Chemistry": "LiFePO4",
      "BMS": "Integrated"
    },
    applicationAreas: [
      "Residential Solar Storage",
      "Off-Grid Systems",
      "Backup Power",
      "Peak Shaving Applications"
    ],
    price: {
      value: 2195,
      unit: "battery"
    },
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fortress-eVault-max",
    name: "Fortress eVault Max 18.5kWh",
    description: "High-capacity LiFePO4 battery system with advanced BMS and seamless integration for whole-home backup.",
    category: "battery",
    features: [
      { name: "Large Capacity", description: "18.5 kWh in a single cabinet" },
      { name: "High Power Output", description: "10kW continuous, 15kW peak power" },
      { name: "Stackable Design", description: "Up to 10 units for 185 kWh total" },
      { name: "Smart BMS", description: "Cell-level monitoring and balancing" },
      { name: "UL 9540A Tested", description: "Fire safety tested to UL standards" },
      { name: "Remote Monitoring", description: "Cloud-based monitoring platform" }
    ],
    specifications: {
      "Nominal Capacity": "18.5 kWh",
      "Usable Capacity": "18.5 kWh (100% DOD)",
      "Nominal Voltage": "51.2V",
      "Operating Voltage": "42-58V",
      "Max Charge Power": "9.2kW",
      "Max Discharge Power": "10kW continuous, 15kW peak",
      "Roundtrip Efficiency": ">96%",
      "Cycle Life": "6,000 cycles @ 80% DOD",
      "Operating Temperature": "32°F to 113°F",
      "Dimensions": "29.3 x 25.3 x 10.6 in",
      "Weight": "408 lbs",
      "Warranty": "10 years",
      "Certifications": "UL 1973, UL 9540, UL 9540A",
      "Chemistry": "LiFePO4",
      "Communication": "CAN, RS485, WiFi"
    },
    applicationAreas: [
      "Whole Home Backup",
      "Commercial Storage",
      "Microgrid Applications",
      "Demand Charge Management"
    ],
    price: {
      value: 12500,
      unit: "system"
    },
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1609348904326-66e32334a1e0?auto=format&fit=crop&w=600&q=80"
  }
];

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggle: (productId: string) => void;
  isDisabled: boolean;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onToggle, isDisabled, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        group relative overflow-hidden
        bg-gradient-to-br from-gray-800/95 via-gray-900/90 to-black/95
        backdrop-blur-sm
        rounded-2xl p-8
        border-2 transition-all duration-500 ease-in-out
        ${isSelected 
          ? 'border-amber-500/60 shadow-2xl shadow-amber-900/60' 
          : 'border-amber-500/30 shadow-2xl shadow-amber-900/40 hover:shadow-amber-900/70 hover:border-amber-500/50'
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-orange-600/5 opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <GradientTracing
          gradientColors={["#f97316", "#fb923c", "#3b82f6"]}
          animationDuration={3.5}
          strokeWidth={2}
        />
      </div>
      
      {isSelected && (
        <>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-amber-400/40"
            animate={{ 
              scale: [1, 1.01, 1],
              opacity: [0.3, 0.6, 0.3],
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.3)",
                "0 0 40px rgba(251, 191, 36, 0.6)",
                "0 0 20px rgba(251, 191, 36, 0.3)"
              ]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
      
      <div className="relative z-10 flex gap-6">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-2xl shadow-amber-900/40 border-2 border-amber-500/20 group-hover:shadow-amber-900/60 group-hover:border-amber-500/40 transition-all duration-500">
            <div
              className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-transparent to-orange-500/30 z-10 opacity-30 hover:opacity-60 transition-opacity duration-300"
            />
            <OptimizedImage 
              src={product.imageUrl} 
              alt={product.name}
              width={600}
              height={600}
              priority={true}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        
        <div className="flex-grow flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <motion.h3 
                className="text-2xl font-bold text-white leading-tight group-hover:text-amber-300 transition-colors duration-300"
                style={{ 
                  textShadow: isSelected ? '0 0 20px rgba(251, 191, 36, 0.4)' : 'none'
                }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {product.name}
              </motion.h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Checkbox 
                  id={`select-${product.id}`} 
                  checked={isSelected}
                  onCheckedChange={() => onToggle(product.id)}
                  disabled={isDisabled}
                  className="border-2 border-amber-400/60 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-amber-500 data-[state=checked]:to-orange-500 data-[state=checked]:border-amber-400 data-[state=checked]:shadow-lg data-[state=checked]:shadow-amber-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                />
                <Label 
                  htmlFor={`select-${product.id}`} 
                  className={`text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-300 ${
                    isDisabled 
                      ? 'text-gray-500' 
                      : isSelected
                      ? 'text-amber-300 hover:text-amber-200 hover:scale-105'
                      : 'text-amber-100 hover:text-amber-300 hover:scale-105'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Compare'}
                </Label>
              </div>
            </div>
            
            <p className="text-sm text-amber-50/80 leading-relaxed mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-amber-50">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-amber-500/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`w-4 h-4 ${
                      starIndex < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                        : starIndex < product.rating
                        ? 'fill-amber-500/50 text-amber-500/50'
                        : 'fill-gray-600 text-gray-600'
                    } transition-all duration-300`}
                  />
                ))}
              </div>
              <motion.span 
                className="text-sm font-semibold text-amber-100"
                whileHover={{ scale: 1.1 }}
              >
                {product.rating.toFixed(1)}
              </motion.span>
            </div>
            
            <motion.div 
              className="text-right"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                style={{ 
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 10px rgba(251, 191, 36, 0.5)'
                }}
              >
                ${product.price.value.toLocaleString()}
              </div>
              <div className="text-xs text-amber-200/70 font-medium">
                per {product.price.unit}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getSpecIcon = (specName: string) => {
  const iconClass = "w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110";
  const iconMap: Record<string, React.ReactNode> = {
    "Continuous Power Output": <Zap className={`${iconClass} text-amber-600`} />,
    "Peak/Surge Power": <TrendingUp className={`${iconClass} text-amber-600`} />,
    "Max Efficiency": <Gauge className={`${iconClass} text-amber-700`} />,
    "CEC Weighted Efficiency": <Gauge className={`${iconClass} text-amber-700`} />,
    "Warranty": <Shield className={`${iconClass} text-amber-600`} />,
    "Operating Temperature": <Thermometer className={`${iconClass} text-orange-600`} />,
    "Battery Type Support": <Battery className={`${iconClass} text-amber-600`} />,
    "Certifications": <Award className={`${iconClass} text-amber-700`} />,
    "Weight": <Package className={`${iconClass} text-amber-600`} />,
  };
  return iconMap[specName] || null;
};

const isImportantSpec = (specName: string): boolean => {
  const importantSpecs = [
    "Continuous Power Output",
    "Max Efficiency", 
    "CEC Weighted Efficiency",
    "Warranty",
    "Peak/Surge Power"
  ];
  return importantSpecs.includes(specName);
};

const getValueColor = (specName: string, value: string | number): string => {
  if (specName.includes("Efficiency")) {
    const numValue = parseFloat(value.toString());
    if (numValue >= 98) return "text-amber-300 font-bold";
    if (numValue >= 97) return "text-amber-400 font-semibold";
    return "text-amber-100";
  }
  if (specName === "Warranty") {
    const yearMatch = value.toString().match(/(\d+)\s*years?/i);
    if (yearMatch) {
      const years = parseInt(yearMatch[1]);
      if (years >= 20) return "text-amber-300 font-bold";
      if (years >= 12) return "text-amber-400 font-semibold";
    }
  }
  return "text-white";
};

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = activeCategory === "all" 
    ? productData 
    : productData.filter(product => product.category === activeCategory);
  
  const comparisonProducts = productData.filter(product => 
    selectedProducts.includes(product.id)
  );
  
  const handleProductToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, productId]);
      }
    }
  };
  
  const clearComparison = () => {
    setSelectedProducts([]);
  };
  
  const allSpecifications = comparisonProducts.length > 0
    ? Array.from(new Set(comparisonProducts.flatMap(product => Object.keys(product.specifications))))
    : [];
  
  return (
    <MainLayout fullWidth={true}>
      <section className="relative min-h-screen py-20 md:py-32">
        <div className="absolute inset-0">
          <SolarBackground />
        </div>
        
        <div className="relative z-10 container mx-auto">
          <motion.div 
            className="max-w-5xl mx-auto mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-cyan-700 to-blue-800 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-2xl shadow-blue-900/50 border-2 border-blue-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20 opacity-50" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold shadow-2xl shadow-blue-400/60 border-2 border-blue-300/50"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                  animate={{ 
                    boxShadow: [
                      "0 10px 40px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 15px 50px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)",
                      "0 10px 40px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4 fill-blue-600 text-blue-600" />
                  </motion.div>
                  Industry-Leading Comparison Tool
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-center text-white leading-tight"
                style={{ 
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)' 
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Solar Inverter Comparison
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-cyan-50 text-center mb-8 leading-relaxed font-medium"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Compare Sol-Ark hybrid inverters with leading competitors side by side to find the perfect inverter solution for your solar energy system.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-3 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {[
                  { value: "6+", label: "Top Brands" },
                  { value: "15+", label: "Specs Compared" },
                  { value: "100%", label: "Unbiased" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative overflow-hidden text-center p-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-xl backdrop-blur border-2 border-blue-400/40 shadow-2xl shadow-blue-900/40"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 50px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
                    <motion.div 
                      className="absolute top-0 right-0 w-20 h-20 bg-cyan-300/20 rounded-full blur-2xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <motion.div 
                      className="relative text-4xl md:text-5xl font-black text-white mb-2"
                      style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 2px 4px rgba(0, 0, 0, 0.4)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="relative text-sm text-cyan-100 font-bold uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-white/95 via-white/90 to-blue-50/95 backdrop-blur-xl rounded-3xl p-8 mb-10 border-2 border-blue-200 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">Select Products to Compare</h2>
            <p className="mb-6 text-gray-700 font-medium">Choose up to 3 products to compare their features, specifications, and pricing.</p>
            
            <PremiumTabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
              <PremiumTabsList>
                <PremiumTabsTrigger value="all">All Products</PremiumTabsTrigger>
                <PremiumTabsTrigger value="hybrid-inverter">Hybrid Inverters</PremiumTabsTrigger>
                <PremiumTabsTrigger value="microinverter">Microinverters</PremiumTabsTrigger>
                <PremiumTabsTrigger value="string-inverter">String Inverters</PremiumTabsTrigger>
                <PremiumTabsTrigger value="solar-panel">Solar Panels</PremiumTabsTrigger>
                <PremiumTabsTrigger value="battery">Battery Storage</PremiumTabsTrigger>
              </PremiumTabsList>
              
              <PremiumTabsContent value="all">
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={handleProductToggle}
                      isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      index={index}
                    />
                  ))}
                </div>
              </PremiumTabsContent>
              
              <PremiumTabsContent value="hybrid-inverter">
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={handleProductToggle}
                      isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      index={index}
                    />
                  ))}
                </div>
              </PremiumTabsContent>
              
              <PremiumTabsContent value="microinverter">
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={handleProductToggle}
                      isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      index={index}
                    />
                  ))}
                </div>
              </PremiumTabsContent>
              
              <PremiumTabsContent value="string-inverter">
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={handleProductToggle}
                      isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      index={index}
                    />
                  ))}
                </div>
              </PremiumTabsContent>

              <PremiumTabsContent value="solar-panel">
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={handleProductToggle}
                      isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      index={index}
                    />
                  ))}
                </div>
              </PremiumTabsContent>

              <PremiumTabsContent value="battery">
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={handleProductToggle}
                      isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      index={index}
                    />
                  ))}
                </div>
              </PremiumTabsContent>
            </PremiumTabs>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {selectedProducts.length === 0 ? (
              <motion.div 
                key="empty-state"
                className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-xl rounded-3xl p-16 md:p-20 border-2 shadow-2xl shadow-amber-900/50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="absolute inset-0 border-2 border-amber-500/40 rounded-3xl"
                  style={{
                    boxShadow: "0 0 30px rgba(251, 191, 36, 0.3), inset 0 0 30px rgba(251, 191, 36, 0.1)"
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-orange-600/5" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <GradientTracing
                    gradientColors={["#a855f7", "#ec4899", "#06b6d4"]}
                    animationDuration={3.5}
                    strokeWidth={2}
                  />
                </div>
                
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent"
                />
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles
                        className="w-32 h-32 text-amber-400/40"
                        style={{
                          filter: 'blur(8px) drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))'
                        }}
                      />
                    </div>
                    <Sparkles
                      className="relative w-28 h-28 mx-auto mb-8 text-amber-400"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 40px rgba(251, 191, 36, 0.5))'
                      }}
                    />
                  </div>
                  <motion.h3 
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                    style={{ 
                      textShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 0 15px rgba(251, 191, 36, 0.4)' 
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    No Products Selected
                  </motion.h3>
                  <motion.p
                    className="text-lg md:text-xl text-amber-100/80 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Select up to 3 products from the list above to compare their features, specifications, and pricing side by side.
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="comparison-table"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white via-cream-50 to-amber-50/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-200 shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b-2 border-amber-200">
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-amber-600" />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                        Product Comparison
                      </h2>
                      <p className="text-sm text-gray-600 font-medium mt-1">
                        Comparing {selectedProducts.length} {selectedProducts.length === 1 ? 'product' : 'products'}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Button 
                      onClick={clearComparison}
                      variant="outline"
                      className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 hover:border-amber-600 hover:text-amber-800 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
                    >
                      Clear All
                    </Button>
                  </motion.div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <motion.tr 
                        className="border-b-2 border-amber-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <th className="text-left py-6 px-6 font-bold text-gray-800 bg-amber-50/50">Product</th>
                        {comparisonProducts.map((product, index) => (
                          <motion.th 
                            key={product.id} 
                            className="py-6 px-6 min-w-[250px]"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          >
                            <motion.div 
                              className="flex flex-col items-center gap-3"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
                                <OptimizedImage 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-gray-900 mb-1">{product.name}</div>
                                <div className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                  ${product.price.value.toLocaleString()}
                                </div>
                              </div>
                            </motion.div>
                          </motion.th>
                        ))}
                      </motion.tr>
                    </thead>
                    <tbody>
                      {allSpecifications.map((specName, specIndex) => (
                        <motion.tr 
                          key={specName}
                          className={`border-b border-amber-100 transition-all duration-300 hover:bg-amber-50/50 ${
                            isImportantSpec(specName) ? 'bg-amber-50/30' : ''
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + specIndex * 0.05 }}
                          whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                        >
                          <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap group">
                            <div className="flex items-center gap-2">
                              {getSpecIcon(specName)}
                              <span className={isImportantSpec(specName) ? 'text-amber-800' : ''}>
                                {specName}
                              </span>
                            </div>
                          </td>
                          {comparisonProducts.map((product, prodIndex) => (
                            <motion.td 
                              key={product.id} 
                              className={`py-4 px-6 text-center ${getValueColor(specName, product.specifications[specName] || 'N/A')}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.7 + prodIndex * 0.05 }}
                              whileHover={{ scale: 1.05, fontWeight: 600 }}
                            >
                              {product.specifications[specName] || (
                                <span className="text-gray-400 italic">N/A</span>
                              )}
                            </motion.td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <motion.div 
                  className="mt-10 pt-8 border-t-2 border-amber-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {comparisonProducts.map((product, prodIndex) => (
                      <motion.div 
                        key={product.id}
                        className="bg-white/80 backdrop-blur rounded-xl p-6 border border-amber-200 shadow-md hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.9 + prodIndex * 0.1 }}
                        whileHover={{ 
                          y: -4,
                          boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)"
                        }}
                      >
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">{product.name}</h4>
                        <ul className="space-y-3">
                          {product.features.slice(0, 4).map((feature, featIndex) => (
                            <motion.li 
                              key={featIndex}
                              className="flex items-start gap-2 text-sm group"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 1 + featIndex * 0.05 }}
                              whileHover={{ x: 4 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.3, rotate: 360 }}
                                transition={{ duration: 0.4 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              </motion.div>
                              <span className="text-gray-700 leading-tight group-hover:text-gray-900 transition-colors duration-200">
                                {feature.name}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Request Quote for Selected Products
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductComparison;
