import React from "react";
import { Helmet } from "react-helmet";
import { ChevronRight, Sun, Battery, Zap, Shield, TrendingUp, Leaf } from "lucide-react";
import GradientHeading from "../components/ui/GradientHeading";
import ParticleBackground from "../components/ui/ParticleBackground";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GradientTracing } from '@/components/ui/gradient-tracing';
import solarPanelImage from '@assets/Landis_1759799401459.jpg';
import batteryTechImage from '@assets/Batt-3-300x400.jpg';
import solArkEquipmentImage from '@assets/15K-new-1-e1719430674378-628x1024.webp';
import installationTechImage from '@assets/Gilmer pic_1759799414077.jpg';

const Technology = () => {
  return (
    <MainLayout fullWidth>
      <Helmet>
        <title>Solar Technology | Advance Power Redding</title>
        <meta name="description" content="Advanced solar energy systems including high-efficiency solar panels, energy storage solutions, and smart inverters. Optimized for Northern California's unique climate and NEM 3.0 requirements." />
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
          
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <GradientTracing
              gradientColors={["#10b981", "#06b6d4", "#8b5cf6"]}
              animationDuration={3.5}
              strokeWidth={2}
            />
          </div>
          
          <ParticleBackground
            quantity={75}
            minSize={1}
            maxSize={4}
            minSpeed={0.05}
            maxSpeed={0.2}
            color="#fbbf24"
            className="opacity-20"
          />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/30 via-blue-900/30 to-amber-900/30 px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 text-sm mb-4">
                <Sun className="h-4 w-4" />
                <span>ENGINEERED FOR NORTHERN CALIFORNIA EXTREMES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-300 via-white to-blue-300 bg-clip-text text-transparent mb-6 leading-tight max-w-4xl">
                Enterprise-Grade Solar Technology
              </h1>
              
              <p className="text-gray-300 md:text-lg max-w-3xl mb-8">
                Sol-Ark 12K/15K all-in-one hybrid inverters with <10ms transfer time. API LiFePO4 batteries rated for 10,000+ cycles at 100% DOD. N-type TOPCon panels delivering 22%+ efficiency in high-heat conditions. UL 1741-SA certified for PSPS resilience and SGIP incentive qualification.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="#solar-panels" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-blue-500 hover:from-amber-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-amber-900/30 text-sm">
                  <Sun className="h-4 w-4" />
                  <span>Solar Panels</span>
                </a>
                
                <a href="#energy-storage" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-blue-500 hover:from-amber-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-amber-900/30 text-sm">
                  <Battery className="h-4 w-4" />
                  <span>Energy Storage</span>
                </a>
                
                <a href="#inverters" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-blue-500 hover:from-amber-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-amber-900/30 text-sm">
                  <Zap className="h-4 w-4" />
                  <span>Inverters</span>
                </a>
                
                <a href="#benefits" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-blue-500 hover:from-amber-500 hover:to-blue-400 text-white px-4 w-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-amber-900/30 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>Benefits</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solar Panel Technology Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={solarPanelImage}
              alt="Advanced solar panel technology with high-efficiency photovoltaic cells"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-technology-1"
            />
          </div>
        </div>
        
        {/* Solar Panels Section */}
        <section id="solar-panels" className="relative py-16 z-10 bg-gray-950/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <GradientHeading level={2} className="text-2xl md:text-3xl font-bold text-center mb-6" variant="blue">
              High-Efficiency Solar Panels
            </GradientHeading>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Premium photovoltaic modules designed for maximum energy production and long-term reliability
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-amber-500/30">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">High Efficiency</h3>
                <p className="text-gray-400">
                  Up to 22% efficiency ratings ensure maximum energy production from your available roof space.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-amber-500/30">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">25-Year Warranty</h3>
                <p className="text-gray-400">
                  Industry-leading warranties protect your investment with guaranteed performance over decades.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-amber-500/30">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Durable Design</h3>
                <p className="text-gray-400">
                  Weather-resistant construction withstands harsh Northern California conditions including heat, wind, and snow.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Battery Technology Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={batteryTechImage}
              alt="Cutting-edge battery systems for reliable energy storage"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-technology-2"
            />
          </div>
        </div>

        {/* Energy Storage Section */}
        <section id="energy-storage" className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <GradientHeading level={2} className="text-2xl md:text-3xl font-bold text-center mb-6" variant="blue">
              Advanced Energy Storage
            </GradientHeading>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Store excess solar energy for use during peak hours or power outages
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-blue-500/30">
                <Battery className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Battery Backup Systems</h3>
                <p className="text-gray-400 mb-4">
                  Lithium-ion battery systems provide reliable backup power and optimize your energy usage for maximum savings under NEM 3.0.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>10-15 kWh capacity options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Seamless backup during outages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Smart load management</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-blue-500/30">
                <Zap className="h-8 w-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Smart Energy Management</h3>
                <p className="text-gray-400 mb-4">
                  Intelligent systems automatically optimize when to use stored energy versus grid power for maximum cost savings.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Real-time monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Peak demand management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Mobile app control</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Sol-Ark Equipment Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={solArkEquipmentImage}
              alt="Sol-Ark inverter technology for maximum efficiency"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-technology-3"
            />
          </div>
        </div>
        
        {/* Inverters Section */}
        <section id="inverters" className="relative py-16 z-10 bg-gray-950/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <GradientHeading level={2} className="text-2xl md:text-3xl font-bold text-center mb-6" variant="blue">
              Smart Inverter Technology
            </GradientHeading>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Convert DC solar power to usable AC electricity with maximum efficiency
            </p>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-amber-500/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">String Inverters</h3>
                    <p className="text-gray-400 mb-4">
                      Cost-effective solution for straightforward installations with consistent sun exposure.
                    </p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>97-98% efficiency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>12-15 year warranties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Lower upfront cost</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Microinverters</h3>
                    <p className="text-gray-400 mb-4">
                      Panel-level optimization maximizes energy production in complex roof designs or partial shade.
                    </p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Panel-level monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>25-year warranties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Maximum energy harvest</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Installation Technology Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={installationTechImage}
              alt="Modern solar equipment installation technology"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              loading="lazy"
              data-testid="img-technology-4"
            />
          </div>
        </div>
        
        {/* Benefits Section */}
        <section id="benefits" className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <GradientHeading level={2} className="text-2xl md:text-3xl font-bold text-center mb-6" variant="blue">
              Why Choose Solar?
            </GradientHeading>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Investing in solar energy provides immediate and long-term benefits for your home or business
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-green-500/30">
                <TrendingUp className="h-8 w-8 text-orange-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Lower Energy Bills</h3>
                <p className="text-gray-400 text-sm">
                  Reduce or eliminate your monthly electricity costs with self-generated clean energy.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-blue-500/30">
                <Shield className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Energy Independence</h3>
                <p className="text-gray-400 text-sm">
                  Protect yourself from rising utility rates and power outages with your own energy source.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-amber-500/30">
                <Leaf className="h-8 w-8 text-orange-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Environmental Impact</h3>
                <p className="text-gray-400 text-sm">
                  Reduce your carbon footprint and contribute to a cleaner, sustainable future.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-purple-500/30">
                <TrendingUp className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Increase Property Value</h3>
                <p className="text-gray-400 text-sm">
                  Homes with solar installations typically sell for more and faster than comparable homes.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-amber-500/30">
                <Shield className="h-8 w-8 text-amber-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Federal Tax Credits</h3>
                <p className="text-gray-400 text-sm">
                  Take advantage of 30% federal tax credits and California state incentives.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-blue-500/30">
                <Zap className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Low Maintenance</h3>
                <p className="text-gray-400 text-sm">
                  Solar systems require minimal maintenance with most components lasting 25+ years.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <div className="card-elite glow-orange p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-900/50 px-4 py-2 rounded-full border border-orange-500/30 text-orange-300 text-sm mb-6">
                <Sun className="h-4 w-4" />
                <span>FREE CONSULTATION</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-300 via-white to-orange-300 bg-clip-text text-transparent mb-4">
                Ready to Go Solar?
              </h2>
              
              <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                Contact Advance Power Redding today for a free consultation and custom solar system design. Our experts will analyze your energy needs and provide a detailed proposal with no obligation.
              </p>
              
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-amber-900/30">
                  <Sun className="h-5 w-5 mr-2" />
                  <span>Get Free Quote</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Technology;
