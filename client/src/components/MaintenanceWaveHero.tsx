"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Sun, Wrench, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// GRADIENT BUTTON COMPONENT
// ============================================================================

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

// ============================================================================
// INTERACTIVE HOVER BUTTON COMPONENT
// ============================================================================

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

// ============================================================================
// ANIMATED WAVE BACKGROUND COMPONENT
// ============================================================================

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
          <linearGradient id="solarGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDB813" stopOpacity="0.3">
              <animate
                attributeName="stop-color"
                values="#FDB813; #FF6B35; #F7931E; #FDB813"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.2">
              <animate
                attributeName="stop-color"
                values="#FF6B35; #F7931E; #FDB813; #FF6B35"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#F7931E" stopOpacity="0.1">
              <animate
                attributeName="stop-color"
                values="#F7931E; #FDB813; #FF6B35; #F7931E"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id="electricGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4">
              <animate
                attributeName="stop-color"
                values="#00D4FF; #0099FF; #0066FF; #00D4FF"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2">
              <animate
                attributeName="stop-color"
                values="#0066FF; #00D4FF; #0099FF; #0066FF"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        
        <path
          fill="url(#solarGradient1)"
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
          fill="url(#electricGradient)"
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

// ============================================================================
// FLOATING PARTICLES COMPONENT
// ============================================================================

const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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

// ============================================================================
// MAIN MAINTENANCE HERO COMPONENT
// ============================================================================

interface MaintenanceWaveHeroProps {
  tagline?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const MaintenanceWaveHero: React.FC<MaintenanceWaveHeroProps> = ({
  tagline = "Powered by Solar & Electric Innovation",
  title = "Solar System Maintenance",
  subtitle = "Professional maintenance services to keep your solar system operating at peak performance. Our certified technicians ensure maximum efficiency and longevity for your investment.",
  stats = [
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Emergency Support" },
    { value: "25+", label: "Years Experience" },
  ]
}) => {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background */}
      <AnimatedWaveBackground />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      
      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        {/* Icon Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center gap-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 backdrop-blur-sm"
        >
          <Sun className="h-5 w-5 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-100">
            {tagline}
          </span>
          <Wrench className="h-5 w-5 text-orange-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 max-w-5xl text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            {title}
          </span>
          <br />
          <span className="text-white">Advance Power Redding</span>
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-6 mb-16"
        >
          <GradientButton variant="default">
            Schedule Maintenance
          </GradientButton>
          <InteractiveHoverButton text="Emergency Service" className="w-40" />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12"
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

export default MaintenanceWaveHero;
