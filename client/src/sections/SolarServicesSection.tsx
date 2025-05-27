import { motion } from "framer-motion";
import { Sun, Home, Building2, Zap, Users, Clock } from "lucide-react";

const SolarServicesSection = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Residential Solar",
      description: "Custom solar panel installations for homes throughout Northern California.",
      features: ["25-year warranty", "Net metering setup", "Energy monitoring"],
      color: "from-yellow-500 to-orange-500",
      hoverColor: "hover:from-yellow-400 hover:to-orange-400"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Commercial Solar",
      description: "Large-scale solar solutions for businesses and industrial facilities.",
      features: ["Tax incentive optimization", "Fleet maintenance", "Performance guarantees"],
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:from-orange-400 hover:to-red-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Battery Storage",
      description: "Advanced energy storage systems for backup power and energy independence.",
      features: ["24/7 backup power", "Smart grid integration", "Remote monitoring"],
      color: "from-red-500 to-yellow-500",
      hoverColor: "hover:from-red-400 hover:to-yellow-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "System Maintenance",
      description: "Professional cleaning, inspection, and maintenance services.",
      features: ["Performance optimization", "Preventive care", "Emergency repairs"],
      color: "from-yellow-500 to-red-500",
      hoverColor: "hover:from-yellow-400 hover:to-red-400"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Emergency Repairs",
      description: "24/7 emergency repair services to keep your solar system running.",
      features: ["Same-day service", "Licensed technicians", "Parts warranty"],
      color: "from-orange-500 to-yellow-500",
      hoverColor: "hover:from-orange-400 hover:to-yellow-400"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "System Upgrades",
      description: "Modernize your existing solar system with latest technology.",
      features: ["Efficiency improvements", "Smart inverters", "Monitoring upgrades"],
      color: "from-red-500 to-orange-500",
      hoverColor: "hover:from-red-400 hover:to-orange-400"
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Solar Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 via-amber-200/15 to-yellow-200/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/15 to-amber-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-300/15 to-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Solar Panel Array Pattern */}
      <div className="absolute inset-0 opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="solar-array-pattern" width="100" height="60" patternUnits="userSpaceOnUse">
              {/* Solar Panel Row */}
              <rect x="5" y="5" width="40" height="25" fill="rgba(30, 58, 138, 0.08)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" rx="2"/>
              <rect x="55" y="5" width="40" height="25" fill="rgba(30, 58, 138, 0.08)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" rx="2"/>
              <rect x="5" y="30" width="40" height="25" fill="rgba(30, 58, 138, 0.08)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" rx="2"/>
              <rect x="55" y="30" width="40" height="25" fill="rgba(30, 58, 138, 0.08)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" rx="2"/>
              {/* Solar Cell Grid Lines */}
              <line x1="25" y1="5" x2="25" y2="30" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.3"/>
              <line x1="75" y1="5" x2="75" y2="30" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.3"/>
              <line x1="25" y1="30" x2="25" y2="55" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.3"/>
              <line x1="75" y1="30" x2="75" y2="55" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#solar-array-pattern)" />
        </svg>
      </div>

      {/* Floating Solar Panel Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Solar Array - Top */}
        <div className="absolute top-12 left-1/4 w-48 h-28 bg-gradient-to-br from-blue-900/12 to-blue-700/8 border border-blue-500/20 rounded-lg rotate-3 animate-pulse shadow-lg">
          <div className="grid grid-cols-6 grid-rows-3 gap-0.5 p-2 h-full">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>

        {/* Medium Solar Panel - Right */}
        <div className="absolute top-1/3 right-20 w-32 h-20 bg-gradient-to-br from-blue-900/15 to-blue-700/10 border border-blue-500/25 rounded-lg -rotate-6 animate-pulse delay-1000 shadow-xl">
          <div className="grid grid-cols-4 grid-rows-2 gap-0.5 p-1.5 h-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-blue-800/20 rounded-sm border border-blue-600/20"></div>
            ))}
          </div>
        </div>

        {/* Solar Panel Cluster - Bottom Left */}
        <div className="absolute bottom-20 left-16 w-40 h-24 bg-gradient-to-br from-blue-900/10 to-blue-700/8 border border-blue-500/20 rounded-lg rotate-2 animate-pulse delay-500 shadow-lg">
          <div className="grid grid-cols-5 grid-rows-3 gap-0.5 p-1.5 h-full">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="bg-blue-800/12 rounded-sm border border-blue-600/12"></div>
            ))}
          </div>
        </div>

        {/* Small Solar Panels Scattered */}
        <div className="absolute top-2/3 left-1/3 w-24 h-16 bg-gradient-to-br from-blue-900/12 to-blue-700/8 border border-blue-500/20 rounded-md -rotate-4 animate-pulse delay-1500 shadow-md">
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-800/15 rounded-sm border border-blue-600/15"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/3 w-28 h-18 bg-gradient-to-br from-blue-900/10 to-blue-700/8 border border-blue-500/18 rounded-lg rotate-8 animate-pulse delay-2000 shadow-md">
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 p-1 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-800/12 rounded-sm border border-blue-600/12"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-800 mb-12 leading-tight">
            Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                Solar Services
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/30 to-amber-300/30 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-700 max-w-5xl mx-auto font-light leading-relaxed">
            Comprehensive solar solutions for homes and businesses throughout Northern California. 
            From installation to maintenance, we've got you covered.
          </p>
        </motion.div>

        {/* Enterprise Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              {/* Premium Card Background */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-orange-200/50 group-hover:border-orange-500/50 transition-all duration-500 overflow-hidden shadow-xl">
                
                {/* Card Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Premium Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mb-8 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  {/* Enhanced Typography */}
                  <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Premium Feature List */}
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 text-lg">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-4 group-hover:scale-150 transition-transform duration-300`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Premium CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-8 w-full px-8 py-4 bg-gradient-to-r ${service.color} ${service.hoverColor} text-white font-bold rounded-xl text-lg shadow-2xl transition-all duration-300 hover:shadow-3xl`}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-16 border border-gray-700/50 overflow-hidden">
            
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-5xl md:text-6xl font-black text-white mb-8">
                Ready to Go Solar?
              </h3>
              
              <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who've made the switch to clean, renewable energy. 
                Get your free consultation and custom quote today.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-black rounded-xl text-xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
                >
                  Get Free Solar Quote
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 border-2 border-gray-400 text-gray-200 font-black rounded-xl text-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Call (530) 226-0701
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarServicesSection;