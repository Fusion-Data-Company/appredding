"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wrench, Phone, Clock } from 'lucide-react';
import TriageCalculator from '@/components/TriageCalculator';

interface SolarRepairHeroProps {
  heading?: string;
  tagline?: string;
  emergencyPhone?: string;
  ctaText?: string;
  backgroundImages?: string[];
}

const SolarRepairHero: React.FC<SolarRepairHeroProps> = ({
  heading = "Expert Solar Panel Repair & Maintenance",
  tagline = "Fast, reliable solar repair services in Redding, CA. Keep your system running at peak efficiency with our certified technicians. 24/7 emergency support available.",
  emergencyPhone = "(530) 226-0701",
  ctaText = "Get Free Diagnostic",
  backgroundImages = [
    "/assets/images/solar-panels-hero.jpg"
  ]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const services = [
    { icon: <Wrench className="w-6 h-6" />, title: "Panel Repair", desc: "Expert diagnostics & fixes" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Service", desc: "Emergency support" },
    { icon: <Phone className="w-6 h-6" />, title: "Free Quote", desc: "No obligation estimate" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            {backgroundImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={img}
                  alt={`Solar panel ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </div>
        </motion.div>

        {/* Grid Overlay */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute inset-0 opacity-20"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Emergency Banner */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-primary/90 backdrop-blur-sm py-2 px-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-primary-foreground text-sm md:text-base">
            <Phone className="w-4 h-4 animate-pulse" />
            <span className="font-semibold">Emergency Repairs - Advance Power Redding:</span>
            <a href={`tel:${emergencyPhone}`} className="hover:underline font-bold">
              {emergencyPhone}
            </a>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div 
            style={{ y: y3 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium">Certified Solar Technicians - Redding, CA</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
            >
              {heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
            >
              {tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                data-testid="button-get-diagnostic"
              >
                {ctaText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-6 text-lg rounded-xl"
                data-testid="button-view-services"
              >
                View Services
              </Button>
            </motion.div>

            {/* Service Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
            >
              {services.map((service, idx) => (
                <Card
                  key={idx}
                  className="bg-background/80 backdrop-blur-md border-border/50 p-6 hover:bg-background/90 transition-all duration-300 hover:scale-105"
                  data-testid={`card-service-${idx}`}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Triage Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-12"
            >
              <TriageCalculator />
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="pb-8 px-4"
        >
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm text-gray-300">
            <div className="text-center">
              <div className="font-bold text-2xl text-white">500+</div>
              <div>Installations</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-white">25+ Years</div>
              <div>Experience</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-white">Same Day</div>
              <div>Service Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function SolarRepairHeroDemo() {
  return <SolarRepairHero />;
}
