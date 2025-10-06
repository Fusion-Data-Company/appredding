import React from "react";
import { motion } from "framer-motion";
import { GradientTracing } from "@/components/ui/gradient-tracing";
import { Sun, Zap, Battery, Shield, Phone, Mail, MapPin, Calendar, Award, Star } from "lucide-react";

export const EliteFooter: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <GradientTracing
          gradientColors={["#f97316", "#fb923c", "#3b82f6"]}
          animationDuration={4}
          strokeWidth={2}
        />
      </div>
      {/* Ultra-Realistic Solar Panel Texture */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-solar-grid" width="80" height="50" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="36" height="21" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="42" y="2" width="36" height="21" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="2" y="27" width="36" height="21" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="42" y="27" width="36" height="21" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <line x1="20" y1="2" x2="20" y2="23" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="0.3"/>
              <line x1="60" y1="2" x2="60" y2="23" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-solar-grid)" />
        </svg>
      </div>

      {/* Premium Ambient Light Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl"
          animate={{ 
            rotate: 360,
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Elite Company Branding */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl mr-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <Sun className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>
            <div>
              <h3 className="text-4xl font-black text-white tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Advance Power</span>
              </h3>
              <p className="text-gray-400 font-medium">Northern California Solar Specialists</p>
            </div>
          </div>
          
          {/* Premium Certifications */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {[
              { icon: <Award className="w-6 h-6" />, label: "25+ Years Experience" },
              { icon: <Shield className="w-6 h-6" />, label: "Licensed & Bonded" },
              { icon: <Star className="w-6 h-6" />, label: "Top Rated Installer" }
            ].map((cert, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-gray-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-orange-400">{cert.icon}</div>
                <span className="font-semibold">{cert.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Elite Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-black text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 text-orange-400 mr-2" />
              Solar Services
            </h4>
            <ul className="space-y-3">
              {[
                "Residential Solar Installation",
                "Commercial Solar Systems", 
                "Battery Storage Solutions",
                "System Maintenance & Repair",
                "Energy Efficiency Consulting",
                "Solar Panel Cleaning"
              ].map((service, index) => (
                <motion.li
                  key={index}
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-black text-white mb-6 flex items-center">
              <Battery className="w-5 h-5 text-orange-400 mr-2" />
              Products
            </h4>
            <ul className="space-y-3">
              {[
                "Sol-Ark 12K Hybrid Inverters",
                "Sol-Ark 15K Whole Home Systems",
                "API LiFePO4 Battery Storage",
                "Premium Solar Panels",
                "Monitoring Systems",
                "Electrical Components"
              ].map((product, index) => (
                <motion.li
                  key={index}
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {product}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-black text-white mb-6 flex items-center">
              <Shield className="w-5 h-5 text-orange-400 mr-2" />
              Company
            </h4>
            <ul className="space-y-3">
              {[
                "About Advance Power",
                "Our Team",
                "Certifications",
                "Case Studies",
                "Customer Reviews",
                "Careers"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-black text-white mb-6 flex items-center">
              <Phone className="w-5 h-5 text-orange-400 mr-2" />
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 text-orange-400 mr-3" />
                <span>(530) 226-0701</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 text-orange-400 mr-3" />
                <span>info@apredding.net</span>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-4 h-4 text-orange-400 mr-3 mt-1" />
                <span>Serving Northern California<br />Redding, Chico, Sacramento</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 text-orange-400 mr-3" />
                <span>Mon-Fri: 7AM-6PM</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elite Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Advance Power Redding. All rights reserved. | Licensed Solar Contractor #1234567
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="hover:text-orange-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-orange-400 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-orange-400 transition-colors cursor-pointer">Warranty</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Elite Floating Light Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </footer>
  );
};