"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Zap, Sun, Leaf, ThermometerSun } from "lucide-react";
import { cn } from "@/lib/utils";
import { AwardBadge } from '@/components/ui/award-badge';

// GradientButton Component
const GradientButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "variant";
    asChild?: boolean;
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "gradient-button",
        "inline-flex items-center justify-center",
        "rounded-[11px] min-w-[132px] px-9 py-4",
        "text-base leading-[19px] font-[500] text-white",
        "font-sans font-bold",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "variant" && "gradient-button-variant",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
GradientButton.displayName = "GradientButton";

// InteractiveHoverButton Component
const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
  }
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
        className
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
    </button>
  );
});
InteractiveHoverButton.displayName = "InteractiveHoverButton";

// Animated Wave Background Component
const AnimatedWaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <linearGradient id="energyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3">
              <animate
                attributeName="stop-color"
                values="#10B981; #059669; #047857; #10B981"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#059669" stopOpacity="0.2">
              <animate
                attributeName="stop-color"
                values="#059669; #047857; #10B981; #059669"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#047857" stopOpacity="0.1">
              <animate
                attributeName="stop-color"
                values="#047857; #10B981; #059669; #047857"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id="efficiencyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4">
              <animate
                attributeName="stop-color"
                values="#3B82F6; #1D4ED8; #1E40AF; #3B82F6"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.2">
              <animate
                attributeName="stop-color"
                values="#1E40AF; #3B82F6; #1D4ED8; #1E40AF"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        
        <path
          fill="url(#energyGradient1)"
          d="M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z;
              M0,450 C320,350 420,550 720,450 C1020,350 1120,550 1440,450 L1440,800 L0,800 Z;
              M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z
            "
          />
        </path>
        
        <path
          fill="url(#efficiencyGradient)"
          d="M0,500 C360,400 480,600 840,500 C1200,400 1320,600 1440,500 L1440,800 L0,800 Z"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,500 C360,400 480,600 840,500 C1200,400 1320,600 1440,500 L1440,800 L0,800 Z;
              M0,550 C360,450 480,650 840,550 C1200,450 1320,650 1440,550 L1440,800 L0,800 Z;
              M0,500 C360,400 480,600 840,500 C1200,400 1320,600 1440,500 L1440,800 L0,800 Z
            "
          />
        </path>
      </svg>
    </div>
  );
};

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth < 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const particleCount = isMobile ? 10 : 20;
  const particles = Array.from({ length: particleCount });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Main Energy Conservation Hero Component
interface EnergyConservationWaveHeroProps {
  tagline?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const EnergyConservationWaveHero: React.FC<EnergyConservationWaveHeroProps> = ({
  tagline = "Professional Energy Efficiency Solutions",
  title = "Energy Conservation",
  subtitle = "Comprehensive energy conservation services to reduce your consumption by 30-50%. Our certified professionals provide energy audits, HVAC optimization, and smart home integration for maximum efficiency.",
  stats = [
    { value: "30-50%", label: "Energy Savings" },
    { value: "BPI", label: "Certified" },
    { value: "25+", label: "Years Experience" },
  ]
}) => {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div className="hero-section relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-slate-900" style={{ position: 'relative' }}>
      {/* Award Badge */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <AwardBadge type="customer-service-excellence" data-testid="award-badge-energy-conservation" />
      </div>

      {/* Animated Background */}
      <AnimatedWaveBackground />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      
      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex min-h-screen flex-col items-start justify-start px-4 text-center pt-24 md:pt-32"
      >
        {/* Icon Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="badge-elite-metallic badge-energy mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Leaf className="h-5 w-5 text-green-400" />
          </motion.div>
          <span>{tagline}</span>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
          >
            <ThermometerSun className="h-5 w-5 text-blue-400" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mx-auto"
        >
          The Future of{" "}
          <span className="font-extrabold bg-gradient-to-r from-emerald-300 via-green-400 to-lime-500 bg-clip-text text-transparent">
            Energy Conservation
          </span>
          <br />
          Meets{" "}
          <span className="font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-500 bg-clip-text text-transparent">
            Efficiency Innovation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 max-w-2xl text-lg text-slate-300 md:text-xl"
        >
          {subtitle}
        </motion.p>


        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
};

export default EnergyConservationWaveHero;