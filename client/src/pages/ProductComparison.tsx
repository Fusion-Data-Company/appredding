import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PremiumTabs, PremiumTabsList, PremiumTabsTrigger, PremiumTabsContent } from "@/components/ui/premium-tabs";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Solar Inverter Comparison</h1>
              <p className="text-xl text-gray-200 mb-8">
                Compare Sol-Ark hybrid inverters with leading competitors side by side to find the perfect inverter solution for your solar energy system.
              </p>
            </div>
            
            <div className="bg-primary-800 premium-border rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">Select Inverters to Compare</h2>
              <p className="mb-6 text-gray-300">Choose up to 3 inverters to compare their features, specifications, and pricing.</p>
              
              <PremiumTabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
                <PremiumTabsList>
                  <PremiumTabsTrigger value="all">All Inverters</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="hybrid-inverter">Hybrid Inverters</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="microinverter">Microinverters</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="string-inverter">String Inverters</PremiumTabsTrigger>
                </PremiumTabsList>
                
                <PremiumTabsContent value="all">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toLocaleString()}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="hybrid-inverter">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toLocaleString()}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="microinverter">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toLocaleString()}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="string-inverter">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toLocaleString()}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
              </PremiumTabs>
            </div>
            
            {/* Comparison Section */}
            {selectedProducts.length > 0 && (
              <div className="bg-primary-800 premium-border rounded-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Inverter Comparison</h2>
                  <Button variant="outline" onClick={clearComparison}>Clear All</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary-700">
                        <th className="text-left p-4 border-b border-gray-700 w-1/4">Inverter Details</th>
                        {comparisonProducts.map(product => (
                          <th key={product.id} className="text-center p-4 border-b border-gray-700">
                            {product.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Category</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center p-4 border-b border-gray-700">
                            <span className="capitalize">{product.category.replace('-', ' ')}</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Price</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center p-4 border-b border-gray-700">
                            ${product.price.value.toLocaleString()}/{product.price.unit}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Rating</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center p-4 border-b border-gray-700">
                            <div className="flex items-center justify-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span>{product.rating.toFixed(1)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Features */}
                      <tr>
                        <td colSpan={comparisonProducts.length + 1} className="p-4 bg-primary-700 font-bold text-lg">
                          Key Features
                        </td>
                      </tr>
                      {comparisonProducts.length > 0 && comparisonProducts[0].features.map((_, featureIndex) => (
                        <tr key={`feature-${featureIndex}`}>
                          <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">
                            {comparisonProducts[0].features[featureIndex].name}
                          </td>
                          {comparisonProducts.map(product => (
                            <td key={product.id} className="text-center p-4 border-b border-gray-700">
                              {featureIndex < product.features.length ? product.features[featureIndex].description : "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Specifications */}
                      <tr>
                        <td colSpan={comparisonProducts.length + 1} className="p-4 bg-primary-700 font-bold text-lg">
                          Technical Specifications
                        </td>
                      </tr>
                      {allSpecifications.map(spec => (
                        <tr key={spec}>
                          <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">{spec}</td>
                          {comparisonProducts.map(product => (
                            <td key={product.id} className="text-center p-4 border-b border-gray-700">
                              {product.specifications[spec] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Application Areas */}
                      <tr>
                        <td colSpan={comparisonProducts.length + 1} className="p-4 bg-primary-700 font-bold text-lg">
                          Application Areas
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Recommended For</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="p-4 border-b border-gray-700">
                            <ul className="list-disc list-inside text-left">
                              {product.applicationAreas.map((area, index) => (
                                <li key={index} className="mb-1">{area}</li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-4">Ready to purchase or need more information?</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button>
                      Contact Sales Team
                    </Button>
                    <Button variant="outline">
                      Download Specifications
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductComparison;
