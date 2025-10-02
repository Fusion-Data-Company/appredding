"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight, Zap, DollarSign, Award, CheckCircle } from 'lucide-react';
import { EliteSolarButton } from '@/components/ui/elite-solar-button';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';

const PremiumCTASection: React.FC = () => {
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

  const benefits = [
    { icon: <DollarSign className="w-5 h-5" />, text: "Free Solar Quote" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "No Obligation" },
    { icon: <Award className="w-5 h-5" />, text: "Licensed Experts" },
    { icon: <Zap className="w-5 h-5" />, text: "25 Year Warranty" }
  ];

  const stats = [
    { label: "Average Savings", value: "$2,400/year", color: "text-green-400" },
    { label: "Payback Period", value: "6-8 years", color: "text-blue-400" },
    { label: "ROI", value: "15-20%", color: "text-yellow-400" }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
              Ready to Go Solar?
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              <PraetorianGradientText variant="dual" size="4xl" glow="md">
                Start Your Solar Journey Today
              </PraetorianGradientText>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Join over 1,000 Northern California families and businesses who have made the switch to solar. 
              Get your free consultation and discover how much you can save.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
                  <span className="text-blue-400">{benefit.icon}</span>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                  <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <EliteSolarButton
                onClick={() => console.log("Free consultation clicked")}
                className="px-8 py-4 text-lg font-semibold"
                variant="primary"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </EliteSolarButton>
              
              <button
                onClick={() => console.log("Call clicked")}
                className="px-8 py-4 text-lg font-semibold border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-200 transition-all duration-300 rounded-lg flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (530) 226-0701
              </button>
            </div>
          </motion.div>

          {/* Urgency Message */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-medium backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              Limited Time: Federal Tax Credit Up to 30% Off
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-50" />
      <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-30" />
    </section>
  );
};

export default PremiumCTASection;

