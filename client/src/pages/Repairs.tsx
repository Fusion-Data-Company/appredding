import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { 
  Wrench, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Clock,
  Phone,
  Zap,
  Battery,
  Sun,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";

const Repairs = () => {
  const repairServices = [
    {
      icon: <Sun className="w-6 h-6" />,
      title: "7-Day Orphaned System Rescue",
      description: "Rapid response for systems abandoned by defunct installers - full diagnostic and repair within 7 days."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Inverter Swaps",
      description: "SMA, SolarEdge, Enphase certified - same-day replacement with $2.10/mile Redding hub delivery."
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: "NEM 3.0 Battery Retrofits",
      description: "Add batteries to existing systems for load shifting - recover 25-40% of lost export value."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Cost-Effective Repairs",
      description: "Average repair costs less than 40% of replacement in North State - most fixes completed same visit."
    }
  ];

  const commonIssues = [
    {
      issue: "Reduced Energy Production",
      symptoms: ["Lower monthly energy output", "Decreased system efficiency", "Higher electricity bills"],
      causes: ["Dirty panels", "Shading issues", "Component failure", "Wiring problems"]
    },
    {
      issue: "Inverter Problems",
      symptoms: ["Error messages on display", "System shutdown", "No power production"],
      causes: ["Component failure", "Overheating", "Grid connection issues", "Age-related wear"]
    },
    {
      issue: "Physical Damage",
      symptoms: ["Cracked panels", "Loose mounting", "Weather damage"],
      causes: ["Hail damage", "Wind damage", "Thermal cycling", "Installation issues"]
    }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title="Solar System Repairs | Advance Power Redding"
        description="Professional solar panel and system repair services in Redding, CA. Fast diagnosis and repair of solar system issues. Emergency repair services available."
        keywords={["solar repair", "solar panel repair Redding", "inverter repair", "solar system troubleshooting"]}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            <div>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Wrench className="w-12 h-12 text-red-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Solar System 
                  <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent block">
                    Repairs
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                7-day orphaned system rescue promise. We fix systems abandoned by defunct installers with rapid 
                inverter swaps (SMA, SolarEdge, Enphase) and emergency waivers for post-facto inspection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg">
                  <Clock className="w-5 h-5 mr-2" />
                  Emergency Repair
                </Button>
                <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white py-4 px-8 rounded-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">When to Call for Repairs</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      <span>Sudden drop in energy production</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      <span>Inverter error messages or shutdown</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      <span>Physical damage from weather</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      <span>System not producing any power</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Our <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Repair Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive repair services for all solar system components, from panels to inverters to electrical connections.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {repairServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
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
              Common <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Solar Issues</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Recognize the signs and understand the causes of common solar system problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commonIssues.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-bold text-white mb-4">{item.issue}</h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-red-400 mb-2 uppercase tracking-wider">Symptoms</h4>
                  <div className="space-y-1">
                    {item.symptoms.map((symptom, i) => (
                      <div key={i} className="flex items-center text-gray-300">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-orange-400 mb-2 uppercase tracking-wider">Common Causes</h4>
                  <div className="space-y-1">
                    {item.causes.map((cause, i) => (
                      <div key={i} className="flex items-center text-gray-300">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-sm">{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SolarRescueTimelineSection className="bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
 
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get Your System Fixed Fast
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't let solar system issues cost you money. Our expert technicians provide fast, reliable repairs to restore your energy production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-red-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg">
                <Clock className="w-5 h-5 mr-2" />
                Schedule Repair
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-500 py-4 px-8 rounded-lg">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Repairs;