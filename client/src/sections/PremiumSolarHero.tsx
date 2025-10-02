"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lamp } from '@/components/ui/lamp';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';
import { EliteSolarButton } from '@/components/ui/elite-solar-button';
import { Phone, Calendar, Zap, Sun, ArrowRight, CheckCircle, Star, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface PremiumSolarHeroProps {
  tagline?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
  };
  backgroundImage?: string;
  stats?: Array<{ label: string; value: string; icon: React.ReactNode }>;
  features?: Array<{ text: string; icon: React.ReactNode }>;
}

const PremiumSolarHero: React.FC<PremiumSolarHeroProps> = ({
  tagline = "Northern California's Premier Solar Experts",
  title = (
    <>
      <PraetorianGradientText variant="dual" size="6xl" glow="lg">
        Advance Power
      </PraetorianGradientText>
      <br />
      <span className="text-5xl md:text-6xl font-black text-blue-300">
        Solar Solutions
      </span>
    </>
  ),
  subtitle = "Transform your energy future with Northern California's most trusted solar company. 25+ years of excellence, 1000+ satisfied customers, and cutting-edge technology.",
  ctaButtons = {
    primary: { label: "Get Free Solar Quote", onClick: () => console.log("Quote clicked") },
    secondary: { label: "Call (530) 226-0701", onClick: () => console.log("Emergency clicked") }
  },
  backgroundImage = "/assets/images/solar-panels-hero.jpg",
  stats = [
    { label: "Years Experience", value: "25+", icon: <Award className="w-6 h-6" /> },
    { label: "Happy Customers", value: "1000+", icon: <Star className="w-6 h-6" /> },
    { label: "Systems Installed", value: "2500+", icon: <Sun className="w-6 h-6" /> },
    { label: "Average Savings", value: "$2,400/yr", icon: <Zap className="w-6 h-6" /> }
  ],
  features = [
    { text: "Licensed & Insured", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "25 Year Warranty", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Free Consultations", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Same Day Service", icon: <CheckCircle className="w-5 h-5" /> }
  ]
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Background with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-900/60 to-slate-950/80" />
      </motion.div>

      {/* Lamp effect */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <Lamp />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-30" />
      </div>

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 glass-card shimmer-effect edge-glow rounded-full text-blue-300 text-sm font-medium">
              {tagline}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              {title}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              {subtitle}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 glass-card shimmer-effect px-4 py-2 rounded-full">
                  <span className="text-blue-400">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <EliteSolarButton
                onClick={ctaButtons.primary.onClick}
                className="glass-button edge-glow-strong px-8 py-4 text-lg font-semibold"
                variant="primary"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {ctaButtons.primary.label}
                <ArrowRight className="w-5 h-5 ml-2" />
              </EliteSolarButton>
              
              <Button
                onClick={ctaButtons.secondary.onClick}
                variant="outline"
                className="glass-button edge-glow px-8 py-4 text-lg font-semibold text-blue-300 hover:text-blue-200 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                {ctaButtons.secondary.label}
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass-card-light shimmer-slow edge-glow p-6 rounded-2xl">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full">
                    <span className="text-blue-400">{stat.icon}</span>
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PremiumSolarHero;

