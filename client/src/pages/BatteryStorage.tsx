import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import {
  Battery,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Calculator,
  Phone,
  Clock,
  Home,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";

const BatteryStorage = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Energy Independence",
      description: "Store solar energy for use when the sun isn't shining or during power outages."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Backup Power",
      description: "Keep essential systems running during grid outages with reliable battery backup."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-of-Use Savings",
      description: "Use stored energy during peak rate hours to maximize your savings."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Seamless Integration",
      description: "Battery systems integrate perfectly with existing solar installations."
    }
  ];

  const batteryTypes = [
    {
      name: "Tesla Powerwall",
      capacity: "13.5 kWh",
      features: ["NEM 3.0 optimized", "Load shifting 6-9 PM", "SGIP eligible", "PSPS backup ready"]
    },
    {
      name: "LG Chem RESU",
      capacity: "9.8 kWh",
      features: ["$1,000/kWh SGIP rebate", "Wildfire zone certified", "25-40% value recovery", "Silent operation"]
    },
    {
      name: "FranklinWH",
      capacity: "13.6 kWh",
      features: ["Whole-home backup", "Smart load management", "REU compatible", "7-day rescue support"]
    }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title="Solar Battery Storage Systems | Advance Power Redding"
        description="Professional solar battery storage installation in Redding, CA. Store solar energy for backup power and energy independence. Tesla Powerwall, Enphase, LG Chem batteries."
        keywords="solar battery storage, Tesla Powerwall Redding, battery backup, energy storage California"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            <div>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Battery className="w-12 h-12 text-green-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Solar Battery 
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent block">
                    Storage
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Store your solar energy for use anytime with advanced battery storage systems. 
                Achieve true energy independence with backup power solutions from Northern California's solar experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Storage Quote
                </Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white py-4 px-8 rounded-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Battery Storage Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>24/7 backup power during outages</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Store excess solar energy for later use</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Reduce peak-hour electricity costs</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Increase energy independence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color-Coded Battery Storage Funnel (RED → YELLOW → GREEN → PURPLE) */}
      <SolarRescueTimelineSection
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        stages={[
          {
            id: 'pain-red',
            title: 'TOU Rate Shock & Peak Demand Penalties',
            description: 'PG&E TOU rates hit $0.42-$0.51/kWh during 4-9pm peak hours. Solar-only systems export at $0.03-$0.05/kWh under NEM 3.0, losing 80% of export value. No backup power during PSPS events leaves homes vulnerable.',
            color: 'from-red-500 to-red-600',
            glowColor: 'rgba(239, 68, 68, 0.5)',
            icon: <AlertTriangle className='h-8 w-8' />,
            metrics: 'Peak TOU: $0.42-$0.51/kWh',
          },
          {
            id: 'intel-yellow',
            title: 'Battery Sizing & SOLARK Integration Analysis',
            description: 'Comprehensive load profiling to determine optimal battery capacity (10-30kWh typical). SOLARK 12K/15K hybrid inverter compatibility assessment. AC vs DC coupling architecture evaluation. Critical load prioritization for backup scenarios.',
            color: 'from-yellow-500 to-yellow-600',
            glowColor: 'rgba(234, 179, 8, 0.5)',
            icon: <Battery className='h-8 w-8' />,
            metrics: 'Typical Range: 10-30kWh',
          },
          {
            id: 'roi-green',
            title: 'SGIP Incentives & Load-Shifting Economics',
            description: 'SGIP Equity Budget: $1,000/kWh (up to $30,000 for 30kWh). General Market: $200-$300/kWh. Load-shifting strategy recovers $120-$180/month in lost NEM 3.0 export value. 6-8 year payback with incentives.',
            color: 'from-green-500 to-green-600',
            glowColor: 'rgba(34, 197, 94, 0.5)',
            icon: <TrendingUp className='h-8 w-8' />,
            metrics: 'Monthly Savings: $120-$180',
          },
          {
            id: 'action-purple',
            title: 'ESS Installation & Smart Load Management',
            description: 'C-46 licensed Energy Storage System (ESS) installation with UL 9540 compliance. SOLARK inverter integration with automated TOU load-shifting. Backup power testing. SGIP documentation & PTO coordination. 24/7 monitoring activation.',
            color: 'from-purple-500 to-purple-600',
            glowColor: 'rgba(168, 85, 247, 0.5)',
            icon: <CheckCircle className='h-8 w-8' />,
            metrics: 'UL 9540 ESS Certified',
          },
        ]}
      />

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Battery Storage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solar battery storage systems provide energy security, cost savings, and environmental benefits for your home or business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Battery Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Battery Systems</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We install and service the industry's leading battery storage systems from trusted manufacturers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {batteryTypes.map((battery, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <Battery className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{battery.name}</h3>
                    <p className="text-green-400 font-semibold">{battery.capacity}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {battery.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Energy Independence?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get a custom battery storage solution designed for your home's energy needs and usage patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg">
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Storage Needs
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-500 py-4 px-8 rounded-lg">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BatteryStorage;