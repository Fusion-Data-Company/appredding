import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PremiumTabs, PremiumTabsList, PremiumTabsTrigger, PremiumTabsContent } from "@/components/ui/premium-tabs";
import { Zap, Sun, Battery, Sparkles, Star, TrendingUp, Shield, Gauge, Thermometer, CheckCircle2, Package, Award, ArrowRight } from "lucide-react";
import SolarBackground from "@/components/SolarBackground";

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
  }
];

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggle: (productId: string) => void;
  isDisabled: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onToggle, isDisabled }) => {
  return (
    <div 
      className={`
        group relative
        bg-gradient-to-br from-white via-cream-50 to-amber-50/30
        backdrop-blur-sm
        rounded-2xl p-8
        border-2 transition-all duration-300 ease-in-out
        ${isSelected 
          ? 'border-amber-400 shadow-2xl shadow-amber-500/20 ring-4 ring-amber-200/50' 
          : 'border-amber-200 shadow-xl hover:shadow-2xl hover:border-amber-300'
        }
        hover:scale-[1.02] hover:-translate-y-1
      `}
    >
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/20 z-10"></div>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex-grow flex flex-col justify-between min-w-0">
          {/* Top Section - Name and Checkbox */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-amber-700 transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Checkbox 
                  id={`select-${product.id}`} 
                  checked={isSelected}
                  onCheckedChange={() => onToggle(product.id)}
                  disabled={isDisabled}
                  className="border-2 border-amber-500 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-amber-500 data-[state=checked]:to-orange-500 data-[state=checked]:border-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <Label 
                  htmlFor={`select-${product.id}`} 
                  className={`text-sm font-semibold cursor-pointer whitespace-nowrap ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}
                >
                  {isSelected ? 'Selected' : 'Compare'}
                </Label>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-800 leading-relaxed mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>
          
          {/* Bottom Section - Rating and Price */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-amber-100">
            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : index < product.rating
                        ? 'fill-amber-200 text-amber-200'
                        : 'fill-gray-200 text-gray-200'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {product.rating.toFixed(1)}
              </span>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ${product.price.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                per {product.price.unit}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getSpecIcon = (specName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Continuous Power Output": <Zap className="w-4 h-4 text-amber-600" />,
    "Peak/Surge Power": <TrendingUp className="w-4 h-4 text-amber-600" />,
    "Max Efficiency": <Gauge className="w-4 h-4 text-amber-700" />,
    "CEC Weighted Efficiency": <Gauge className="w-4 h-4 text-amber-700" />,
    "Warranty": <Shield className="w-4 h-4 text-amber-600" />,
    "Operating Temperature": <Thermometer className="w-4 h-4 text-orange-600" />,
    "Battery Type Support": <Battery className="w-4 h-4 text-amber-600" />,
    "Certifications": <Award className="w-4 h-4 text-amber-700" />,
    "Weight": <Package className="w-4 h-4 text-amber-600" />,
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
    if (numValue >= 98) return "text-amber-700 font-bold";
    if (numValue >= 97) return "text-amber-600 font-semibold";
    return "text-gray-800";
  }
  if (specName === "Warranty") {
    const yearMatch = value.toString().match(/(\d+)\s*years?/i);
    if (yearMatch) {
      const years = parseInt(yearMatch[1]);
      if (years >= 20) return "text-amber-700 font-bold";
      if (years >= 12) return "text-amber-600 font-semibold";
    }
  }
  return "text-gray-800";
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
        
        {/* Content Container - positioned above background */}
        <div className="relative z-10 container mx-auto">
          {/* Header Card */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-white/95 via-white/90 to-amber-50/95 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-2xl border border-amber-200/50">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Industry-Leading Comparison Tool
                </div>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent leading-tight">
                Solar Inverter Comparison
              </h1>
              
              {/* Subtext */}
              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
                Compare Sol-Ark hybrid inverters with leading competitors side by side to find the perfect inverter solution for your solar energy system.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-xl backdrop-blur">
                  <div className="text-3xl font-bold text-amber-700 mb-1">6+</div>
                  <div className="text-sm text-gray-700 font-semibold">Top Brands</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-100/80 to-amber-100/80 rounded-xl backdrop-blur">
                  <div className="text-3xl font-bold text-orange-700 mb-1">15+</div>
                  <div className="text-sm text-gray-700 font-semibold">Specs Compared</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-100/80 to-yellow-100/80 rounded-xl backdrop-blur">
                  <div className="text-3xl font-bold text-amber-700 mb-1">100%</div>
                  <div className="text-sm text-gray-700 font-semibold">Unbiased</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rest of the content continues here */}
          <div className="bg-gradient-to-br from-white/95 via-white/90 to-amber-50/95 backdrop-blur-xl rounded-3xl p-8 mb-10 border-2 border-amber-200 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Select Inverters to Compare</h2>
              <p className="mb-6 text-gray-700 font-medium">Choose up to 3 inverters to compare their features, specifications, and pricing.</p>
              
              <PremiumTabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
                <PremiumTabsList>
                  <PremiumTabsTrigger value="all">All Inverters</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="hybrid-inverter">Hybrid Inverters</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="microinverter">Microinverters</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="string-inverter">String Inverters</PremiumTabsTrigger>
                </PremiumTabsList>
                
                <PremiumTabsContent value="all">
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProducts.includes(product.id)}
                        onToggle={handleProductToggle}
                        isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      />
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="hybrid-inverter">
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProducts.includes(product.id)}
                        onToggle={handleProductToggle}
                        isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      />
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="microinverter">
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProducts.includes(product.id)}
                        onToggle={handleProductToggle}
                        isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      />
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="string-inverter">
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProducts.includes(product.id)}
                        onToggle={handleProductToggle}
                        isDisabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                      />
                    ))}
                  </div>
                </PremiumTabsContent>
              </PremiumTabs>
            </div>
            
            {/* Comparison Section */}
            {selectedProducts.length === 0 ? (
              <div className="bg-gradient-to-br from-white via-cream-50 to-amber-50/30 backdrop-blur-sm rounded-3xl p-16 md:p-20 border-2 border-amber-200 shadow-2xl">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-6">
                    <CheckCircle2 className="w-12 h-12 text-amber-600" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    No Inverters Selected Yet
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Select up to 3 inverters from the options above to see a detailed side-by-side comparison of their specifications, features, and pricing.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-amber-700 font-medium">
                    <ArrowRight className="w-4 h-4" />
                    <span>Start by checking the boxes on the inverter cards above</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white via-cream-50 to-amber-50/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-amber-300 shadow-2xl shadow-amber-500/20">
                {/* Header with Product Count and Clear Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b-2 border-amber-200">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                      Inverter Comparison
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Sparkles className="h-4 w-4" />
                      {selectedProducts.length} Selected
                    </div>
                  </div>
                  <Button 
                    onClick={clearComparison}
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    data-testid="button-clear-comparison"
                  >
                    Clear All
                  </Button>
                </div>
                
                {/* Responsive Table Container */}
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-2xl border-2 border-amber-200 shadow-xl">
                      <table className="min-w-full divide-y-2 divide-amber-200">
                        <thead>
                          {/* Product Images and Names Row */}
                          <tr className="bg-gradient-to-r from-amber-50 to-orange-50">
                            <th className="px-6 py-6 text-left">
                              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                                Specification
                              </span>
                            </th>
                            {comparisonProducts.map(product => (
                              <th key={product.id} className="px-6 py-6 text-center border-l-2 border-amber-100">
                                <div className="flex flex-col items-center gap-4">
                                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-2 ring-amber-200">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/20 z-10"></div>
                                    <img 
                                      src={product.imageUrl} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                                      {product.name}
                                    </h4>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                      ${product.price.value.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-amber-100">
                          {/* Category Row */}
                          <tr className="bg-amber-50/60">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-bold text-gray-900">Category</span>
                            </td>
                            {comparisonProducts.map(product => (
                              <td key={product.id} className="px-6 py-4 text-center border-l border-amber-100">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 capitalize">
                                  {product.category.replace('-', ' ')}
                                </span>
                              </td>
                            ))}
                          </tr>
                          
                          {/* Rating Row */}
                          <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-bold text-gray-900">Rating</span>
                            </td>
                            {comparisonProducts.map(product => (
                              <td key={product.id} className="px-6 py-4 text-center border-l border-amber-100">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, index) => (
                                      <Star
                                        key={index}
                                        className={`w-5 h-5 ${
                                          index < Math.floor(product.rating)
                                            ? 'fill-amber-400 text-amber-400'
                                            : index < product.rating
                                            ? 'fill-amber-200 text-amber-200'
                                            : 'fill-gray-200 text-gray-200'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-bold text-gray-900">
                                    {product.rating.toFixed(1)}
                                  </span>
                                </div>
                              </td>
                            ))}
                          </tr>
                          
                          {/* Technical Specifications Section Header */}
                          <tr className="bg-gradient-to-r from-amber-100 to-orange-100">
                            <td colSpan={comparisonProducts.length + 1} className="px-6 py-4">
                              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                                Technical Specifications
                              </h3>
                            </td>
                          </tr>
                          
                          {/* Specification Rows with Alternating Backgrounds */}
                          {allSpecifications.map((spec, index) => (
                            <tr 
                              key={spec} 
                              className={`
                                ${index % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}
                                ${isImportantSpec(spec) ? 'ring-2 ring-inset ring-amber-200' : ''}
                                hover:bg-amber-50/70 transition-colors duration-150
                              `}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  {getSpecIcon(spec)}
                                  <span className={`text-sm font-semibold ${isImportantSpec(spec) ? 'text-gray-900' : 'text-gray-800'}`}>
                                    {spec}
                                  </span>
                                </div>
                              </td>
                              {comparisonProducts.map(product => (
                                <td key={product.id} className="px-6 py-4 text-center border-l border-amber-100">
                                  <span className={`text-sm ${getValueColor(spec, product.specifications[spec] || "-")}`}>
                                    {product.specifications[spec] || (
                                      <span className="text-gray-400">N/A</span>
                                    )}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                          
                          {/* Application Areas Section Header */}
                          <tr className="bg-gradient-to-r from-amber-100 to-orange-100">
                            <td colSpan={comparisonProducts.length + 1} className="px-6 py-4">
                              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                                Recommended Applications
                              </h3>
                            </td>
                          </tr>
                          
                          {/* Application Areas Row */}
                          <tr className="bg-white">
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-gray-900">Best Used For</span>
                            </td>
                            {comparisonProducts.map(product => (
                              <td key={product.id} className="px-6 py-4 border-l border-amber-100">
                                <ul className="space-y-2 text-left">
                                  {product.applicationAreas.map((area, areaIndex) => (
                                    <li key={areaIndex} className="flex items-start gap-2 text-sm text-gray-800">
                                      <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                      <span>{area}</span>
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action Footer */}
                <div className="mt-10 pt-8 border-t-2 border-amber-200">
                  <p className="text-center text-lg text-gray-700 mb-6 font-medium">
                    Ready to purchase or need more information about these inverters?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      data-testid="button-contact-sales"
                    >
                      <Sun className="w-5 h-5 mr-2" />
                      Contact Sales Team
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold"
                      data-testid="button-download-specs"
                    >
                      <Package className="w-5 h-5 mr-2" />
                      Download Specifications
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
    </MainLayout>
  );
};

export default ProductComparison;
