"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SolarRepairHeroProps {
  tagline?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
  };
  backgroundImage?: string;
  solarImages?: string[];
}

const SolarRepairHero: React.FC<SolarRepairHeroProps> = ({
  tagline = "24/7 Emergency Solar Panel Service",
  title = (
    <>
      Expert Solar Panel
      <br />
      <span className="text-primary">Repair & Maintenance</span>
    </>
  ),
  subtitle = "Fast diagnosis, professional repairs, and preventive maintenance to keep your solar system running at peak efficiency. Our certified technicians are ready to help.",
  ctaButtons = {
    primary: { label: "Schedule Repair", onClick: () => console.log("Schedule clicked") },
    secondary: { label: "Emergency Service", onClick: () => console.log("Emergency clicked") }
  },
  backgroundImage = "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2940&auto=format&fit=crop",
  solarImages = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=600&fit=crop",
  ]
}) => {
  const featureRef = useRef<HTMLDivElement>(null);
  const opaqueRef = useRef<HTMLDivElement>(null);
  const [showOpaque, setShowOpaque] = useState(false);

  useEffect(() => {
    const featureEl = featureRef.current;
    if (!featureEl) return;

    const computedBgSize = window
      .getComputedStyle(featureEl)
      .getPropertyValue('background-size');
    const zoomFactor = parseFloat(computedBgSize) / 100;
    const featureWidth = featureEl.clientWidth;
    const initialSizePx = zoomFactor * featureWidth;

    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (!isChrome && !isSafari) {
      setShowOpaque(true);
    }

    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const newSize = initialSizePx - scrollTop / 3;

      if (newSize > featureWidth) {
        featureEl.style.backgroundSize = `${newSize}px`;
        const blurAmount = scrollTop / 100;
        featureEl.style.filter = `blur(${blurAmount}px)`;
        featureEl.style.opacity = `${1 - (scrollTop / document.documentElement.scrollHeight) * 1.3}`;
      }

      if (opaqueRef.current) {
        const opacity = Math.min(1, scrollTop / 5000);
        opaqueRef.current.style.opacity = `${opacity}`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const duplicatedImages = [...solarImages, ...solarImages];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div
        ref={featureRef}
        className="fixed top-0 left-0 right-0 w-full z-0 overflow-hidden"
        style={{
          paddingTop: '50%',
          backgroundImage: `url('${backgroundImage}')`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '250%',
          boxShadow: '0 -50px 20px -20px hsl(var(--background)) inset',
        }}
      >
        {showOpaque && (
          <div
            ref={opaqueRef}
            className="absolute inset-0 bg-background/80"
            style={{ opacity: 0 }}
          />
        )}
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              <Wrench className="w-4 h-4" />
              {tagline}
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6"
            >
              {title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl mb-8"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="gap-2"
                onClick={ctaButtons.primary.onClick}
              >
                <Calendar className="w-4 h-4" />
                {ctaButtons.primary.label}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-background/80 backdrop-blur-sm"
                onClick={ctaButtons.secondary.onClick}
              >
                <Phone className="w-4 h-4" />
                {ctaButtons.secondary.label}
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="w-full h-64 md:h-80 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex gap-4"
            animate={{
              x: ["-100%", "0%"],
              transition: {
                ease: "linear",
                duration: 40,
                repeat: Infinity,
              },
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
                style={{
                  rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
                }}
              >
                <img
                  src={src}
                  alt={`Solar panel ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Our Triage Process
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">1. Contact Us</h3>
                <p className="text-muted-foreground">
                  Call or schedule online. Our team responds within 2 hours for emergency repairs.
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">2. Diagnosis</h3>
                <p className="text-muted-foreground">
                  Comprehensive system inspection to identify issues and provide transparent pricing.
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">3. Repair</h3>
                <p className="text-muted-foreground">
                  Expert repairs with warranty-backed parts. Most repairs completed same-day.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Common Solar Panel Issues
            </h2>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-border mb-12">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Reduced energy output and efficiency loss</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Physical damage from weather or debris</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Inverter malfunctions and electrical issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Wiring problems and connection failures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Monitoring system errors and communication loss</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Restore Your Solar System?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let solar panel issues cost you money. Get expert repair service today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={ctaButtons.primary.onClick}
                >
                  <Calendar className="w-4 h-4" />
                  {ctaButtons.primary.label}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="gap-2"
                  onClick={ctaButtons.secondary.onClick}
                >
                  <Phone className="w-4 h-4" />
                  {ctaButtons.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SolarRepairHeroDemo() {
  return (
    <SolarRepairHero
      tagline="24/7 Emergency Solar Panel Service"
      title={
        <>
          Expert Solar Panel
          <br />
          <span className="text-primary">Repair & Maintenance</span>
        </>
      }
      subtitle="Fast diagnosis, professional repairs, and preventive maintenance to keep your solar system running at peak efficiency. Our certified technicians are ready to help."
      ctaButtons={{
        primary: { 
          label: "Schedule Repair",
          onClick: () => alert("Scheduling repair appointment...")
        },
        secondary: { 
          label: "Emergency Service",
          onClick: () => alert("Calling emergency service...")
        }
      }}
    />
  );
}