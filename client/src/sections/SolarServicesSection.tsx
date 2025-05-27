import { motion } from "framer-motion";
import { Sun, Battery, Zap, Shield, Settings, Home } from "lucide-react";

const SolarServicesSection = () => {
  const services = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Residential Solar",
      description: "Custom solar panel systems designed for your home's unique energy needs and roof configuration.",
      features: ["Free energy assessment", "Custom design", "Professional installation", "25-year warranty"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Commercial Solar",
      description: "Scalable solar solutions for businesses looking to reduce energy costs and environmental impact.",
      features: ["Commercial-grade panels", "Grid-tie systems", "Tax incentive assistance", "Performance monitoring"]
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Hybrid Systems",
      description: "Solar panels combined with lithium battery storage for energy independence day and night.",
      features: ["Battery backup power", "Grid independence", "Smart energy management", "Emergency power"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Lithium Batteries",
      description: "Advanced energy storage systems that store solar power for use when you need it most.",
      features: ["Long-lasting batteries", "Smart inverters", "Remote monitoring", "Seamless integration"]
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Maintenance & Repair",
      description: "Professional maintenance and repair services to keep your solar system running at peak efficiency.",
      features: ["System diagnostics", "Panel cleaning", "Inverter repair", "Performance optimization"]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Energy Conservation",
      description: "Comprehensive energy efficiency services to maximize your solar investment and reduce consumption.",
      features: ["Energy audits", "Insulation upgrades", "Smart home integration", "Usage optimization"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Solar Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solar energy solutions from design to installation to maintenance - 
            serving Northern California for over 20 years.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Go Solar?</h3>
            <p className="text-xl mb-6 opacity-90">
              Contact Advance Power Redding today for your free solar consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-orange-500 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Get Free Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-orange-500 transition-all duration-300"
              >
                Call (530) 226-0701
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarServicesSection;