import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { 
  Sun, 
  Home, 
  DollarSign, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const ResidentialSolar = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Reduce Electric Bills",
      description: "Save up to 90% on your monthly electricity costs with solar power."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "25-Year Warranty",
      description: "Industry-leading warranty coverage for complete peace of mind."
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Clean Energy",
      description: "Reduce your carbon footprint with renewable solar energy."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Increase Home Value",
      description: "Solar installations typically increase property values by 4%."
    }
  ];

  const process = [
    { step: "1", title: "Free Consultation", description: "We assess your home's solar potential and energy needs." },
    { step: "2", title: "Custom Design", description: "Our engineers design a system optimized for your roof." },
    { step: "3", title: "Permits & Installation", description: "We handle all permits and complete professional installation." },
    { step: "4", title: "System Activation", description: "Your system goes online and starts generating clean energy." }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title="Residential Solar Installation | Advance Power Redding"
        description="Professional residential solar panel installation in Redding, CA. Reduce your electric bills with custom solar solutions. 20+ years experience, 25-year warranty."
        keywords="residential solar, solar panels Redding, home solar installation, solar energy California"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-yellow-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            <div>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Sun className="w-12 h-12 text-yellow-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Residential 
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                    Solar Power
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Transform your home with custom solar solutions from Northern California's most trusted solar experts. 
                Over 20 years of experience serving Redding and surrounding areas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Quote
                </Button>
                <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white py-4 px-8 rounded-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Why Choose Advance Power?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>20+ years of solar installation experience</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Licensed & insured solar contractors</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>25-year comprehensive warranty</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Free energy assessment & design</span>
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
              Benefits of <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Home Solar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how residential solar can transform your home's energy efficiency and reduce your environmental impact.
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
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Solar <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Installation Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From initial consultation to system activation, we make going solar simple and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-orange-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get your free solar consultation and quote today. Join thousands of satisfied customers across Northern California.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg">
                <Calculator className="w-5 h-5 mr-2" />
                Schedule Free Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500 py-4 px-8 rounded-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Service Areas
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ResidentialSolar;