"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Sun, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Award,
  CheckCircle,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';

const PremiumSolarFooter: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const services = [
    { name: "Residential Solar", href: "/residential-solar" },
    { name: "Commercial Solar", href: "/commercial-solar" },
    { name: "Battery Storage", href: "/battery-storage" },
    { name: "Solar Repairs", href: "/repairs" },
    { name: "Hybrid Systems", href: "/hybrid-solar" },
    { name: "Mobile Home Solar", href: "/mobile-home" }
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Reviews", href: "/reviews" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ];

  const resources = [
    { name: "Solar Calculator", href: "/roi-calculator" },
    { name: "Product Comparison", href: "/product-comparison" },
    { name: "Technical Data", href: "/technical-data" },
    { name: "Technology", href: "/technology" },
    { name: "Book Appointment", href: "/book-appointment" },
    { name: "FAQ", href: "/faq" }
  ];

  const certifications = [
    { name: "Licensed & Insured", icon: <Shield className="w-4 h-4" /> },
    { name: "NABCEP Certified", icon: <Award className="w-4 h-4" /> },
    { name: "25 Year Warranty", icon: <CheckCircle className="w-4 h-4" /> },
    { name: "Same Day Service", icon: <Clock className="w-4 h-4" /> }
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: <Facebook className="w-5 h-5" /> },
    { name: "Instagram", href: "#", icon: <Instagram className="w-5 h-5" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Twitter", href: "#", icon: <Twitter className="w-5 h-5" /> }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sun className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Advance Power</h3>
                  <p className="text-sm text-blue-300">Redding Solar</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Northern California's premier solar company with over 25 years of experience. 
                We're committed to delivering exceptional solar solutions for homes and businesses.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">(530) 226-0701</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">info@advancepowerredding.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Redding, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6">
                <PraetorianGradientText variant="dual" size="lg" glow="sm">
                  Our Services
                </PraetorianGradientText>
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.href}>
                      <span className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6">
                <PraetorianGradientText variant="dual" size="lg" glow="sm">
                  Company
                </PraetorianGradientText>
              </h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <span className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6">
                <PraetorianGradientText variant="dual" size="lg" glow="sm">
                  Resources
                </PraetorianGradientText>
              </h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <Link href={resource.href}>
                      <span className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                        {resource.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-slate-800/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 text-center">
                  <div className="p-2 bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-lg">
                    <span className="text-blue-400">{cert.icon}</span>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{cert.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-6 border-t border-slate-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div variants={itemVariants} className="text-sm text-slate-400">
              © 2024 Advance Power Redding. All rights reserved.
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-6 text-sm">
              <Link href="/privacy">
                <span className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</span>
              </Link>
              <Link href="/sitemap">
                <span className="text-slate-400 hover:text-blue-400 transition-colors">Sitemap</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumSolarFooter;

