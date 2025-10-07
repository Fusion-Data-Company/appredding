"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Phone, Calendar, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useFormModal } from '@/contexts/FormModalContext';
import heroBackgroundImage from '@assets/Rice Photo 1_1759814518987.jpg';
import ricePhoto1 from '@assets/Rice Photo 1_1759799425958.jpg';
import gitchellPhoto from '@assets/Gitchell_1759799401459.jpg';
import radfordPhoto from '@assets/Radford_1759799425938.jpg';
import landisPhoto from '@assets/Landis_1759799401459.jpg';
import wilsonArrayPhoto from '@assets/Wilson Array_1759799440933.jpg';
import gilmerPhoto from '@assets/Gilmer pic_1759799414077.jpg';
import wrightPhoto from '@assets/Wright_1759799443706.jpg';
import caseyPhoto from '@assets/Casey 4_1759799408663.jpg';

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
  title,
  subtitle = "Rescuing orphaned solar systems in 7 days or less. Specializing in NEM 3.0 battery retrofits and load shifting to recover 25-40% of lost export value. Serving Shasta County, North State I-5 corridor, Trinity & Tehama counties.",
  ctaButtons,
  backgroundImage = heroBackgroundImage,
  solarImages = [
    ricePhoto1,
    gitchellPhoto,
    radfordPhoto,
    landisPhoto,
    wilsonArrayPhoto,
    gilmerPhoto,
    wrightPhoto,
    caseyPhoto,
  ]
}) => {
  const { openSolarForm } = useFormModal();
  
  const defaultCtaButtons = {
    primary: { label: "Get Free Quote", onClick: openSolarForm },
    secondary: { label: "Call (530) 226-0701", onClick: () => console.log("Emergency clicked") }
  };
  
  const finalCtaButtons = ctaButtons || defaultCtaButtons;
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
        <div className="container mx-auto px-4 sm:px-6 !pt-4 pb-12 sm:pb-20">
          <div className="flex flex-col items-center justify-start text-center !mt-0">
            <motion.div 
              className="flex justify-center mb-4 !mt-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 via-amber-400 to-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold shadow-2xl shadow-orange-400/60 border-2 border-orange-300/50"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                animate={{ 
                  boxShadow: [
                    "0 10px 40px rgba(249, 115, 22, 0.6), 0 0 20px rgba(249, 115, 22, 0.3)",
                    "0 15px 50px rgba(249, 115, 22, 0.8), 0 0 30px rgba(249, 115, 22, 0.5)",
                    "0 10px 40px rgba(249, 115, 22, 0.6), 0 0 20px rgba(249, 115, 22, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="h-4 w-4 opacity-90" aria-hidden />
                </motion.div>
                {tagline}
              </motion.div>
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-4 sm:mb-6 px-2"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Advance Power Redding
              <br />
              <span className="text-primary">Solar Solutions Experts</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={FADE_IN_ANIMATION_VARIANTS}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl mb-6 sm:mb-8 px-4"
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
              <button
                onClick={finalCtaButtons.primary.onClick}
                className="relative overflow-hidden px-8 py-4 text-lg font-bold rounded-full transition-all hover:scale-105 text-white group"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 25%, #ea580c 50%, #f59e0b 75%, #3b82f6 100%)',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.5), 0 2px 10px rgba(59,130,246,0.4), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {finalCtaButtons.primary.label}
                </span>
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none rounded-full" />
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    background: 'linear-gradient(125deg, transparent 45%, rgba(255, 255, 255, 0.9) 50%, transparent 55%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer1 3s infinite',
                    mixBlendMode: 'overlay'
                  }}
                />
              </button>
              <button
                onClick={finalCtaButtons.secondary.onClick}
                className="relative overflow-hidden px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105 text-white group"
                style={{
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(251,146,60,0.15) 50%, rgba(59,130,246,0.2) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.3), 0 2px 10px rgba(59,130,246,0.2), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.1)',
                  border: '2px solid rgba(251,146,60,0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {ctaButtons.secondary.label}
                </span>
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-tl from-white/30 via-transparent to-white/10 opacity-50 pointer-events-none rounded-full" />
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    background: 'linear-gradient(130deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer2 3.5s infinite',
                    mixBlendMode: 'overlay'
                  }}
                />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] mt-24 sm:mt-32 md:mt-40 pt-6 md:pt-8">
          <motion.div
            className="flex gap-3 sm:gap-4"
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
                className="relative aspect-[3/4] h-40 sm:h-48 md:h-64 flex-shrink-0"
                style={{
                  rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
                }}
              >
                <OptimizedImage
                  src={src}
                  alt={`Solar panel installation ${index + 1}`}
                  width={400}
                  height={600}
                  priority={index === 0}
                  className="rounded-2xl shadow-lg"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="shimmer-effect">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Our Triage Process
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
            <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_24px_rgba(181,18,18,0.25)] mb-12" style={{ background: 'conic-gradient(from 210deg at 50% 50%, #540808 0%, #7E0B0B 35%, #B51212 60%, #7E0B0B 82%, #540808 100%)' }}>
              <div className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
                <div className="space-y-1">
                  <h3 className="font-bold text-white">Reduced energy output & efficiency loss</h3>
                  <p className="text-white/80 text-sm"><strong>What it looks like:</strong> Gradual drop in daily kWh despite similar weather.</p>
                  <p className="text-white/80 text-sm"><strong>Likely causes:</strong> Soiling (dust, pollen), heat derating, UV aging.</p>
                  <p className="text-white/80 text-sm"><strong>Quick check:</strong> Compare panel temp and inverter logs vs. baseline week.</p>
                  <p className="text-white/80 text-sm"><strong>Fix path:</strong> Schedule cleaning, verify airflow, assess module age vs. warranty.</p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white">Physical damage from weather or debris</h3>
                  <p className="text-white/80 text-sm"><strong>What it looks like:</strong> Cracked glass, hot spots, shading from nearby branches.</p>
                  <p className="text-white/80 text-sm"><strong>Likely causes:</strong> Hail, wind-borne debris, seasonal overgrowth.</p>
                  <p className="text-white/80 text-sm"><strong>Quick check:</strong> Visual inspection at dawn/dusk; thermal scan if available.</p>
                  <p className="text-white/80 text-sm"><strong>Fix path:</strong> Trim vegetation, replace compromised modules, add hail guards where appropriate.</p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white">Inverter malfunctions & electrical issues</h3>
                  <p className="text-white/80 text-sm"><strong>What it looks like:</strong> Fault codes, nighttime draw, intermittent shutdowns.</p>
                  <p className="text-white/80 text-sm"><strong>Likely causes:</strong> DC/AC faults, ground issues, failing caps.</p>
                  <p className="text-white/80 text-sm"><strong>Quick check:</strong> Pull recent fault history; verify string voltages vs. spec.</p>
                  <p className="text-white/80 text-sm"><strong>Fix path:</strong> Firmware update, tighten lugs, RMA inverter if out of spec.</p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white">Wiring problems & connection failures</h3>
                  <p className="text-white/80 text-sm"><strong>What it looks like:</strong> One string underperforming, arc faults, nuisance trips.</p>
                  <p className="text-white/80 text-sm"><strong>Likely causes:</strong> Loose MC4s, corroded lugs, rodent damage.</p>
                  <p className="text-white/80 text-sm"><strong>Quick check:</strong> IR temp delta at connectors; continuity tests per string.</p>
                  <p className="text-white/80 text-sm"><strong>Fix path:</strong> Re-terminate connectors, replace damaged runs, add conduit guards.</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <h3 className="font-bold text-white">Monitoring errors & communication loss</h3>
                  <p className="text-white/80 text-sm"><strong>What it looks like:</strong> Data gaps, offline portal, no alerts firing.</p>
                  <p className="text-white/80 text-sm"><strong>Likely causes:</strong> Gateway power loss, Wi-Fi/LAN issues, API auth lapses.</p>
                  <p className="text-white/80 text-sm"><strong>Quick check:</strong> Verify gateway LEDs, router logs, DHCP lease.</p>
                  <p className="text-white/80 text-sm"><strong>Fix path:</strong> Re-provision gateway, pin a static IP, rotate API keys and re-auth.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Ready to Restore Your Solar System?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let solar panel issues cost you money. Get expert repair service today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={finalCtaButtons.primary.onClick}
                  className="relative overflow-hidden px-8 py-4 text-lg font-bold rounded-full transition-all hover:scale-105 text-white group"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 25%, #ea580c 50%, #f59e0b 75%, #3b82f6 100%)',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.5), 0 2px 10px rgba(59,130,246,0.4), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.4)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {finalCtaButtons.primary.label}
                  </span>
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none rounded-full" />
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background: 'linear-gradient(125deg, transparent 45%, rgba(255, 255, 255, 0.9) 50%, transparent 55%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer3 3.2s infinite',
                      mixBlendMode: 'overlay'
                    }}
                  />
                </button>
                <button
                  onClick={finalCtaButtons.secondary.onClick}
                  className="relative overflow-hidden px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105 text-white group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(251,146,60,0.15) 50%, rgba(59,130,246,0.2) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.3), 0 2px 10px rgba(59,130,246,0.2), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.1)',
                    border: '2px solid rgba(251,146,60,0.5)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {finalCtaButtons.secondary.label}
                  </span>
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/30 via-transparent to-white/10 opacity-50 pointer-events-none rounded-full" />
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background: 'linear-gradient(130deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer4 3.8s infinite',
                      mixBlendMode: 'overlay'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarRepairHero;