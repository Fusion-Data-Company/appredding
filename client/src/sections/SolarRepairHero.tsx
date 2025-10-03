"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackgroundImage from '@assets/generated_images/4K_solar_panels_hero_background_87aa32c0.png';

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
  tagline = "25+ Years Serving Northern California",
  title = (
    <>
      Advance Power of Redding
      <br />
      <span className="text-primary">Solar Solutions Expert</span>
    </>
  ),
  subtitle = "Rescuing orphaned solar systems in 7 days or less. Specializing in NEM 3.0 battery retrofits and load shifting to recover 25-40% of lost export value. Serving Shasta County, North State I-5 corridor, Trinity & Tehama counties.",
  ctaButtons = {
    primary: { label: "Get Free Quote", onClick: () => console.log("Schedule clicked") },
    secondary: { label: "Call (530) 226-0701", onClick: () => console.log("Emergency clicked") }
  },
  backgroundImage = heroBackgroundImage,
  solarImages = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545209463-e2825498edbf?w=400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=600&fit=crop&q=80",
  ]
}) => {
  const featureRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false); // Fallback to gradient if image fails
  }, [backgroundImage]);

  // Optimized scroll effects using requestAnimationFrame
  useEffect(() => {
    const featureEl = featureRef.current;
    if (!featureEl) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const maxScroll = 800;
          const scrollPercent = Math.min(scrollTop / maxScroll, 1);
          
          const translateY = scrollTop * 0.3;
          const blurAmount = scrollPercent * 2;
          const opacity = Math.max(0.7, 1 - scrollPercent * 0.3);
          
          featureEl.style.transform = `translate3d(0, ${translateY}px, 0)`;
          featureEl.style.filter = `blur(${blurAmount}px)`;
          featureEl.style.opacity = `${opacity}`;
          
          ticking = false;
        });
        ticking = true;
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
        className="fixed top-0 left-0 right-0 w-full h-screen z-0 overflow-hidden"
        style={{
          backgroundImage: imageLoaded 
            ? `url('${backgroundImage}')`
            : 'linear-gradient(135deg, #ff6b35 0%, #f97316 25%, #0284c7 75%, #1e40af 100%)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          willChange: 'transform, filter, opacity',
        }}
      >
        {/* Semi-transparent overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        
        {/* Additional gradient overlay with APR brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-600/10" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-muted-foreground glass-card shimmer-effect"
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
                className="gap-2 glass-button edge-glow"
                onClick={ctaButtons.primary.onClick}
              >
                <Calendar className="w-4 h-4" />
                {ctaButtons.primary.label}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-background/80 backdrop-blur-sm glass-button edge-glow"
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
            <div className="shimmer-effect">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Our Triage Process
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="relative overflow-hidden rounded-xl p-6 backdrop-blur-sm bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/90 dark:to-orange-800/90 ring-2 ring-orange-300/80 dark:ring-orange-600/80 shadow-lg shadow-orange-200/50 dark:shadow-orange-900/50">
                <span className="pointer-events-none absolute -right-6 -top-6 inline-flex h-16 w-16 rounded-full bg-white/30 dark:bg-white/10" />
                <span className="pointer-events-none absolute -right-2 -top-2 inline-flex h-8 w-8 rounded-full bg-white/40 dark:bg-white/15" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/60 dark:bg-white/20 shadow-md flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-orange-700 dark:text-orange-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-orange-900 dark:text-orange-100">1. Contact Us</h3>
                  <p className="text-orange-800 dark:text-orange-100 text-sm">
                    Call or schedule online. Our team responds within 2 hours for emergency repairs.
                  </p>
                  <div className="bg-current/40 mt-4 h-0.5 w-16 rounded opacity-60" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl p-6 backdrop-blur-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/90 dark:to-blue-800/90 ring-2 ring-blue-300/80 dark:ring-blue-600/80 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50">
                <span className="pointer-events-none absolute -right-6 -top-6 inline-flex h-16 w-16 rounded-full bg-white/30 dark:bg-white/10" />
                <span className="pointer-events-none absolute -right-2 -top-2 inline-flex h-8 w-8 rounded-full bg-white/40 dark:bg-white/15" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/60 dark:bg-white/20 shadow-md flex items-center justify-center mb-4">
                    <Wrench className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">2. Diagnosis</h3>
                  <p className="text-blue-800 dark:text-blue-100 text-sm">
                    Comprehensive system inspection to identify issues and provide transparent pricing.
                  </p>
                  <div className="bg-current/40 mt-4 h-0.5 w-16 rounded opacity-60" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl p-6 backdrop-blur-sm bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/90 dark:to-emerald-800/90 ring-2 ring-emerald-300/80 dark:ring-emerald-600/80 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/50">
                <span className="pointer-events-none absolute -right-6 -top-6 inline-flex h-16 w-16 rounded-full bg-white/30 dark:bg-white/10" />
                <span className="pointer-events-none absolute -right-2 -top-2 inline-flex h-8 w-8 rounded-full bg-white/40 dark:bg-white/15" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/60 dark:bg-white/20 shadow-md flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-emerald-900 dark:text-emerald-100">3. Repair</h3>
                  <p className="text-emerald-800 dark:text-emerald-100 text-sm">
                    Expert repairs with warranty-backed parts. Most repairs completed same-day.
                  </p>
                  <div className="bg-current/40 mt-4 h-0.5 w-16 rounded opacity-60" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Common Solar Panel Issues
            </h2>
            <div className="relative overflow-hidden rounded-xl p-8 backdrop-blur-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/90 dark:to-purple-800/90 ring-2 ring-purple-300/80 dark:ring-purple-600/80 shadow-lg shadow-purple-200/50 dark:shadow-purple-900/50 mb-12">
              <span className="pointer-events-none absolute -right-6 -top-6 inline-flex h-16 w-16 rounded-full bg-white/30 dark:bg-white/10" />
              <span className="pointer-events-none absolute -right-2 -top-2 inline-flex h-8 w-8 rounded-full bg-white/40 dark:bg-white/15" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
              
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 text-purple-900 dark:text-purple-100">
                  <span className="text-purple-700 dark:text-purple-300 font-bold text-xl leading-none">•</span>
                  <span className="font-medium">Reduced energy output and efficiency loss</span>
                </li>
                <li className="flex items-start gap-3 text-purple-900 dark:text-purple-100">
                  <span className="text-purple-700 dark:text-purple-300 font-bold text-xl leading-none">•</span>
                  <span className="font-medium">Physical damage from weather or debris</span>
                </li>
                <li className="flex items-start gap-3 text-purple-900 dark:text-purple-100">
                  <span className="text-purple-700 dark:text-purple-300 font-bold text-xl leading-none">•</span>
                  <span className="font-medium">Inverter malfunctions and electrical issues</span>
                </li>
                <li className="flex items-start gap-3 text-purple-900 dark:text-purple-100">
                  <span className="text-purple-700 dark:text-purple-300 font-bold text-xl leading-none">•</span>
                  <span className="font-medium">Wiring problems and connection failures</span>
                </li>
                <li className="flex items-start gap-3 text-purple-900 dark:text-purple-100">
                  <span className="text-purple-700 dark:text-purple-300 font-bold text-xl leading-none">•</span>
                  <span className="font-medium">Monitoring system errors and communication loss</span>
                </li>
              </ul>
              <div className="bg-purple-700/40 dark:bg-purple-300/40 mt-6 h-0.5 w-24 rounded opacity-60" />
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Ready to Restore Your Solar System?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let solar panel issues cost you money. Get expert repair service today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="gap-2 glass-button edge-glow"
                  onClick={ctaButtons.primary.onClick}
                >
                  <Calendar className="w-4 h-4" />
                  {ctaButtons.primary.label}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="gap-2 glass-button edge-glow"
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

export default SolarRepairHero;