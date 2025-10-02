"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Home, 
  Building2, 
  Battery, 
  Wrench, 
  Zap, 
  Truck,
  ArrowRight,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';
import { EliteSolarButton } from '@/components/ui/elite-solar-button';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';
import { Lamp } from '@/components/ui/lamp';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  features: string[];
  price: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    title: "Residential Solar",
    description: "Transform your home with premium solar panel installations designed for maximum efficiency and savings.",
    icon: <Home className="w-8 h-8" />,
    href: "/residential-solar",
    features: ["25-Year Warranty", "Free Consultation", "Licensed Installation", "Utility Bill Reduction"],
    price: "From $15,000",
    popular: true
  },
  {
    title: "Commercial Solar",
    description: "Power your business with commercial-grade solar solutions that deliver exceptional ROI and sustainability.",
    icon: <Building2 className="w-8 h-8" />,
    href: "/commercial-solar",
    features: ["Custom Design", "Tax Incentives", "Maintenance Plans", "Energy Monitoring"],
    price: "Custom Quote"
  },
  {
    title: "Battery Storage",
    description: "Store excess solar energy with cutting-edge lithium battery systems for backup power and grid independence.",
    icon: <Battery className="w-8 h-8" />,
    href: "/battery-storage",
    features: ["10-Year Warranty", "Grid Independence", "Peak Shaving", "Emergency Backup"],
    price: "From $8,000"
  },
  {
    title: "Solar Repairs",
    description: "Expert maintenance and repair services to keep your solar system running at peak performance.",
    icon: <Wrench className="w-8 h-8" />,
    href: "/repairs",
    features: ["Same Day Service", "Diagnostic Testing", "Panel Cleaning", "Warranty Work"],
    price: "Service Call"
  },
  {
    title: "Hybrid Systems",
    description: "Advanced grid-tie and off-grid solar solutions for complete energy independence and flexibility.",
    icon: <Zap className="w-8 h-8" />,
    href: "/hybrid-solar",
    features: ["Grid-Tie Ready", "Off-Grid Capable", "Smart Inverters", "Energy Management"],
    price: "From $25,000"
  },
  {
    title: "Mobile Home Solar",
    description: "Specialized solar installations designed specifically for mobile homes and manufactured housing.",
    icon: <Truck className="w-8 h-8" />,
    href: "/mobile-home",
    features: ["Mobile Home Certified", "Lightweight Design", "Quick Installation", "Portable Options"],
    price: "From $12,000"
  }
];

const PremiumServicesSection: React.FC = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      {/* Lamp decoration */}
      <div className="absolute top-10 right-10 opacity-30">
        <Lamp />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
              Our Premium Services
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              <PraetorianGradientText variant="dual" size="4xl" glow="md">
                Complete Solar Solutions
              </PraetorianGradientText>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              From residential installations to commercial projects, we deliver cutting-edge solar technology 
              with unmatched expertise and service excellence.
            </p>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="relative group"
            >
              <Link href={service.href}>
                <div className={`relative h-full p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 ${service.popular ? 'ring-2 ring-blue-500/30' : ''}`}>
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <span className="text-blue-400">{service.icon}</span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-slate-300 mb-6 text-center leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {service.price}
                    </div>
                    <div className="text-xs text-slate-500">
                      {service.price === "Custom Quote" ? "Contact for pricing" : "Starting price"}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center">
                    <div className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-semibold flex items-center gap-2 group-hover:bg-blue-600/30 group-hover:border-blue-400/50 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Go Solar?
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Get a free consultation and custom quote for your solar installation. 
              Our experts will help you maximize savings and energy independence.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EliteSolarButton
              onClick={() => console.log("Free consultation clicked")}
              className="px-8 py-4 text-lg font-semibold"
              variant="primary"
            >
              <Award className="w-5 h-5 mr-2" />
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </EliteSolarButton>
            
            <button className="px-8 py-4 text-lg font-semibold text-blue-300 hover:text-blue-200 transition-colors">
              View Our Portfolio →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumServicesSection;

