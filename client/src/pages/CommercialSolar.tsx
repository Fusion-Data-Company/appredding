import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Phone,
  Factory,
  Zap,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const CommercialSolar = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Reduce Operating Costs",
      description: "Cut electricity expenses by up to 80% with commercial solar systems."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Tax Incentives",
      description: "Take advantage of federal and state tax credits for business solar."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Energy Independence",
      description: "Protect your business from rising utility costs and power outages."
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Scalable Solutions",
      description: "Systems designed to meet your business's unique energy demands."
    }
  ];

  const industries = [
    { name: "Manufacturing", description: "Large-scale solar for energy-intensive operations" },
    { name: "Warehouses", description: "Roof-mounted systems for distribution centers" },
    { name: "Retail Centers", description: "Solar canopies and rooftop installations" },
    { name: "Offices", description: "Professional solar solutions for corporate buildings" },
    { name: "Agriculture", description: "Solar systems for farms and agricultural operations" },
    { name: "Healthcare", description: "Reliable solar power for medical facilities" }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title="Commercial Solar Installation | Advance Power Redding"
        description="Professional commercial solar panel installation for businesses in Redding, CA. Reduce operating costs with scalable solar solutions. 20+ years experience."
        keywords="commercial solar, business solar installation, commercial solar panels Redding, solar energy business"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            <div>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Building2 className="w-12 h-12 text-blue-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Commercial 
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent block">
                    Solar Solutions
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Power your business with scalable commercial solar systems. Reduce operating costs, 
                increase sustainability, and protect against rising energy prices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Business Quote
                </Button>
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-4 px-8 rounded-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Commercial Solar Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Reduce electricity costs by up to 80%</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Federal and state tax incentives available</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Scalable systems for any business size</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Professional installation & maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
              Why Choose <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Commercial Solar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your business operations with clean, reliable solar energy that delivers immediate and long-term benefits.
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
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
              Industries We <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From small businesses to large industrial facilities, we design solar solutions for every commercial application.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold text-white">{industry.name}</h3>
                </div>
                <p className="text-gray-300">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Power Your Business Forward
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get a custom commercial solar proposal tailored to your business needs and energy consumption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg">
                <Calculator className="w-5 h-5 mr-2" />
                Request Business Proposal
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-500 py-4 px-8 rounded-lg">
                <Phone className="w-5 h-5 mr-2" />
                Speak with Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CommercialSolar;