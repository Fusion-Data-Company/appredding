import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { 
  Settings, 
  Sparkles, 
  Shield, 
  CheckCircle, 
  Calendar,
  Phone,
  TrendingUp,
  Eye,
  Droplets,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const Maintenance = () => {
  const services = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "IR Scanning",
      description: "Infrared thermography detects hot spots, wiring issues, and failing cells invisible to the eye."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "IV Curve Tracing",
      description: "Advanced diagnostic testing measures actual vs expected power output, identifying underperforming modules."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Critter Guard Installation",
      description: "Protect wiring from North State wildlife damage - squirrels and birds cause 60% of rural failures."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Sense, Solar Analytics, or Home Assistant integration for real-time monitoring and alerts."
    }
  ];

  const maintenancePlans = [
    {
      name: "Basic Care",
      frequency: "Annual",
      features: ["Visual inspection", "Performance check", "Basic cleaning", "System report"],
      price: "Starting at $199"
    },
    {
      name: "Premium Care",
      frequency: "Bi-Annual", 
      features: ["Deep cleaning", "Electrical testing", "Inverter inspection", "Performance optimization", "Priority support"],
      price: "Starting at $349"
    },
    {
      name: "Complete Care",
      frequency: "Quarterly",
      features: ["All premium features", "Battery maintenance", "Monitoring system", "Emergency response", "Extended warranty"],
      price: "Starting at $599"
    }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title="Solar System Maintenance | Advance Power Redding"
        description="Professional solar panel cleaning and maintenance services in Redding, CA. Keep your solar system running at peak efficiency with regular maintenance."
        keywords="solar maintenance, solar panel cleaning Redding, solar system inspection, solar performance monitoring"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            <div>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Settings className="w-12 h-12 text-purple-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Solar System 
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent block">
                    Maintenance
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Keep your solar investment performing at its best with professional maintenance services. 
                Regular care ensures maximum energy production and extends system life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Service
                </Button>
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white py-4 px-8 rounded-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Why Regular Maintenance?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Maintain peak energy production</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Extend system lifespan by years</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Prevent costly repairs</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Maintain warranty coverage</span>
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
              Our <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Maintenance Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive maintenance services to keep your solar system operating at maximum efficiency year-round.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans Section */}
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
              Maintenance <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Plans</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the maintenance plan that best fits your system size and performance requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenancePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-purple-400 font-semibold">{plan.frequency}</p>
                  <p className="text-3xl font-bold text-white mt-4">{plan.price}</p>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Protect Your Solar Investment
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schedule your maintenance service today and keep your solar system producing clean energy efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-500 py-4 px-8 rounded-lg">
                <Phone className="w-5 h-5 mr-2" />
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Maintenance;