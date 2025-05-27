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
    <section id="services" className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-slate-100 overflow-hidden">
      {/* Enterprise Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(249, 115, 22, 0.06)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
        </svg>
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-32 w-24 h-24 bg-gradient-to-br from-yellow-400/8 to-orange-500/8 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-br from-orange-500/8 to-red-500/8 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Enterprise Typography */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Solar Services
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-lg -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed mb-6">
            Comprehensive solar energy solutions from design to installation to maintenance - 
            serving Northern California for over 20 years.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>CSLB Licensed</span>
            </div>
            <div className="w-1 h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <span>NABCEP Certified</span>
            </div>
            <div className="w-1 h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-600"></div>
              <span>Fully Insured</span>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 border border-gray-200/50 hover:border-orange-200 overflow-hidden"
            >
              {/* Enterprise Card Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-red-50/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Premium Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Enhanced Icon Container */}
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <div className="text-white">
                    {service.icon}
                  </div>
                  <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-sm"></div>
                </div>
                
                {/* Premium Typography */}
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-5 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                  {service.description}
                </p>
                
                {/* Enhanced Features List */}
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-800 font-medium">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full mr-4 shadow-lg flex-shrink-0"></div>
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Premium CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn relative w-full py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center overflow-hidden"
                >
                  {/* Button Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-60 group-hover/btn:opacity-80 transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-center gap-3">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.button>
              </div>
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