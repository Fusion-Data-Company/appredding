import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import {
  Battery,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Calculator,
  Phone,
  Clock,
  Home,
  AlertTriangle,
  TrendingUp,
  Activity,
  Cpu,
  Database,
  Server,
  HardDrive,
  Gauge,
  ThermometerSun,
  Flame,
  Droplets,
  Wind,
  BarChart3,
  LineChart,
  PieChart,
  Award,
  FileCheck,
  CircleDollarSign,
  TrendingDown,
  Layers,
  GitBranch,
  ChevronRight,
  Info,
  Lock,
  Wifi,
  Monitor,
  Settings,
  Package,
  Truck,
  Timer,
  Calendar,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";
import ContentSection from "@/components/sections/ContentSection";
import { AwardBadge } from "@/components/ui/award-badge";
import { MorphingText } from "@/components/ui/morphing-text";
import { Waves } from "@/components/ui/waves";
import batteryInstallImg from "@assets/Batt-3-300x400.jpg";
import equipmentInstallImg from "@assets/Schmidt Battery page_1759799436499.jpg";
import teamWorkImg from "@assets/Battery Sales Flyer pic_1759799408663.jpg";
import solarBatterySystemImg from "@assets/Wolynn_1759799440933.jpg";

const BatteryStorage = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const pageTitle = "Solar Battery Storage Systems | LiFePO4 Technology | SGIP Certified";
  const pageDescription = "Advanced LiFePO4 battery storage systems with 10,000+ cycle life. SimpliPhi, Fortress, EG4 installations. SGIP rebates $200-1,000/kWh. NEM 3.0 optimization, NFPA 855 compliant.";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solar Battery Storage Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Advance Power Redding"
    },
    "description": pageDescription
  };

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry="solar"
        slug="battery-storage"
        structuredData={structuredData}
      />

      {/* NEW HERO SECTION WITH INTERACTIVE WAVES */}
      <section className="relative min-h-screen flex items-center bg-black">
        {/* Interactive Wave Background */}
        <div className="absolute inset-0 z-0">
          <Waves
            strokeColor="#fbbf24"
            backgroundColor="#000000"
            pointerSize={0.8}
          />
        </div>

        {/* Excellence Award Badge - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <AwardBadge type="customer-service-excellence" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* Premium Glassmorphism Card */}
            <div className="hero-glass-card max-w-6xl mx-auto">
              {/* Shimmer Overlay */}
              <div className="hero-glass-shimmer" />
              
              {/* Textured Pattern */}
              <div className="hero-glass-texture" />
              
              {/* Corner Accents */}
              <div className="hero-glass-corners" />
              
              {/* Edge Highlights */}
              <div className="hero-glass-edge-top" />
              <div className="hero-glass-edge-bottom" />
              
              {/* Floating Particles */}
              <div className="hero-glass-particles">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="hero-glass-particle"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.5}s`,
                      '--particle-x': `${Math.random() * 100 - 50}px`,
                      '--particle-y': `${-80 - Math.random() * 40}px`
                    } as React.CSSProperties}
                  />
                ))}
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-center">
                {/* Static Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6"
                >
                  Premium LiFePO4
                  <br />
                  Battery Storage
                </motion.h1>

                {/* Morphing Text Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-8"
                >
                  <MorphingText
                    texts={[
                      "SGIP Certified",
                      "SimpliPhi Power",
                      "LiFePO4 10K Cycles",
                      "NEM 3.0 Ready",
                      "Grid Resilience",
                    ]}
                    className="text-orange-500"
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  Premium LiFePO4 battery storage with SGIP rebates up to $1,000/kWh. SimpliPhi, Fortress, and EG4 systems engineered for 10,000+ cycle life and NEM 3.0 optimization. Transform surplus daytime solar into profitable peak-shift arbitrage.
                </motion.p>
              </div>
            </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                {/* Premium CTA Button */}
                <button
                  onClick={() => setShowConsultationForm(true)}
                  className="relative overflow-hidden px-8 py-6 text-lg font-bold rounded-full transition-all hover:scale-105 text-white group"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 25%, #ea580c 50%, #f59e0b 75%, #3b82f6 100%)',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.5), 0 2px 10px rgba(59,130,246,0.4), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.4)'
                  }}
                  data-testid="button-calculate-battery"
                >
                  <span className="relative z-10 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Calculate Battery Sizing & SGIP
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

                {/* Secondary Button */}
                <button
                  onClick={() => document.getElementById('battery-comparison')?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative overflow-hidden px-8 py-6 text-lg font-semibold rounded-full transition-all hover:scale-105 text-white group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(251,146,60,0.15) 50%, rgba(59,130,246,0.2) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.3), 0 2px 10px rgba(59,130,246,0.2), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.1)',
                    border: '2px solid rgba(251,146,60,0.5)'
                  }}
                  data-testid="button-compare-batteries"
                >
                  <span className="relative z-10 flex items-center">
                    <Battery className="w-5 h-5 mr-2" />
                    Learn More
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

            {/* Stats Cards Below Glassomorphic Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full px-6 sm:px-12 max-w-7xl mx-auto"
            >
            {[
              {
                title: "LiFePO4 Safety",
                value: "270°C",
                description: "Thermal runaway temp",
                icon: <Flame className="h-8 w-8" />,
                gradient: "from-red-500 via-orange-500 to-red-600",
                glowColor: "rgba(239, 68, 68, 0.5)",
                iconBg: "bg-red-900/30",
                textColor: "text-white",
                pulseColor: "bg-orange-400",
                borderColor: "border-red-400/30 hover:border-red-300/60"
              },
              {
                title: "Cycle Life",
                value: "10,000+",
                description: "@ 100% DOD cycles",
                icon: <Activity className="h-8 w-8" />,
                gradient: "from-orange-500 via-amber-500 to-orange-600",
                glowColor: "rgba(249, 115, 22, 0.5)",
                iconBg: "bg-orange-900/30",
                textColor: "text-white",
                pulseColor: "bg-orange-400",
                borderColor: "border-orange-400/30 hover:border-orange-300/60"
              },
              {
                title: "Round-Trip",
                value: "95-98%",
                description: "Energy efficiency",
                icon: <Zap className="h-8 w-8" />,
                gradient: "from-blue-500 via-cyan-500 to-blue-600",
                glowColor: "rgba(59, 130, 246, 0.5)",
                iconBg: "bg-blue-900/30",
                textColor: "text-white",
                pulseColor: "bg-cyan-400",
                borderColor: "border-blue-400/30 hover:border-blue-300/60"
              },
              {
                title: "SGIP Rebate",
                value: "$1,000/kWh",
                description: "Max incentive available",
                icon: <DollarSign className="h-8 w-8" />,
                gradient: "from-green-500 via-emerald-500 to-green-600",
                glowColor: "rgba(34, 197, 94, 0.5)",
                iconBg: "bg-green-900/30",
                textColor: "text-white",
                pulseColor: "bg-emerald-400",
                borderColor: "border-green-400/30 hover:border-green-300/60"
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + idx * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="relative group perspective-1000"
                data-testid={`card-feature-${idx}`}
              >
                {/* Animated glow background */}
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: card.glowColor,
                    animation: `pulse ${2 + idx * 0.3}s ease-in-out infinite`
                  }}
                />

                {/* Card Content with glassmorphism */}
                <div
                  className={`relative bg-gradient-to-br ${card.gradient} rounded-2xl p-6 backdrop-blur-sm border ${card.borderColor} transition-all duration-300 overflow-hidden`}
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Glass overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
                    }}
                  />

                  {/* Animated shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: `shimmer${idx + 1} ${3 + idx * 0.5}s infinite`,
                      mixBlendMode: 'overlay'
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      {/* Icon with animation */}
                      <motion.div
                        className={`p-3 ${card.iconBg} backdrop-blur-md rounded-xl ${card.textColor} shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {card.icon}
                      </motion.div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${card.pulseColor} rounded-full animate-pulse shadow-lg`}
                          style={{
                            boxShadow: `0 0 10px ${card.glowColor}`,
                            animation: `pulse ${1.5 + idx * 0.2}s ease-in-out infinite`
                          }}
                        />
                        <div className={`w-1.5 h-1.5 ${card.pulseColor} rounded-full opacity-60`} />
                      </div>
                    </div>

                    <h3 className={`${card.textColor} font-bold text-sm mb-2 uppercase tracking-wide drop-shadow-md`}>
                      {card.title}
                    </h3>
                    <motion.div
                      className={`text-3xl font-black ${card.textColor} mb-1`}
                      style={{
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)'
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {card.value}
                    </motion.div>
                    <p className={`${card.textColor} opacity-90 text-xs font-medium drop-shadow-sm`}>
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom shine effect */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(255, 255, 255, 0.15) 0%, transparent 100%)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Professional Battery Installation Image */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={batteryInstallImg}
            alt="Professional battery storage installation featuring LiFePO4 technology by certified technicians"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-battery-storage-1"
          />
        </div>
      </div>

      {/* Energy Storage Crisis Alert */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="alert-elite">
            <div className="flex items-center gap-4">
              <TrendingDown className="h-8 w-8 text-orange-400 animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <p className="text-orange-300 font-semibold text-lg mb-2">CRITICAL: NEM 3.0 Makes Battery Storage Mandatory for Positive ROI</p>
                <p className="text-gray-400">Without batteries: 10-12 year payback • With batteries + SGIP: 4-6 year payback • Time-shift arbitrage saves $150-300/month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Battery Metrics Bar */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="status-badge-elite" data-testid="metric-roundtrip">
              <Activity className="h-4 w-4 text-orange-400" />
              <span className="text-gray-400">Round-Trip:</span>
              <span className="text-orange-400 font-mono">95-98%</span>
            </div>
            <div className="status-badge-elite" data-testid="metric-cycles">
              <Timer className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-400">Cycle Life:</span>
              <span className="text-yellow-400 font-mono">6,000-10,000</span>
            </div>
            <div className="status-badge-elite" data-testid="metric-sgip">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <span className="text-gray-400">SGIP Rebate:</span>
              <span className="text-orange-400 font-mono">$200-1,000/kWh</span>
            </div>
            <div className="status-badge-elite" data-testid="metric-warranty">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-gray-400">Warranty:</span>
              <span className="text-blue-400 font-mono">10 years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Technology Grid */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-4 mb-12">
            <div className="spec-card-elite glow-orange group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-orange-500/20 group-hover:bg-orange-500/30">
                  <Battery className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">LiFePO4 Chemistry</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Safety:</span>
                  <span className="text-orange-300 font-mono">Highest</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Thermal:</span>
                  <span className="text-orange-300 font-mono">270°C</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-orange-300 font-mono">10,000+</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">DoD:</span>
                  <span className="text-orange-300 font-mono">100%</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Degrade:</span>
                  <span className="text-orange-300 font-mono">0.5%/yr</span>
                </div>
              </div>
            </div>

            <div className="spec-card-elite glow-blue group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-blue-500/20 group-hover:bg-blue-500/30">
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Smart BMS</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Cell Balance:</span>
                  <span className="text-blue-300 font-mono">±20mV</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Protection:</span>
                  <span className="text-blue-300 font-mono">8-Layer</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Monitor:</span>
                  <span className="text-blue-300 font-mono">Real-time</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Comm:</span>
                  <span className="text-blue-300 font-mono">CAN/RS485</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Alerts:</span>
                  <span className="text-blue-300 font-mono">Instant</span>
                </div>
              </div>
            </div>

            <div className="spec-card-elite glow-green group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-orange-500/20 group-hover:bg-orange-500/30">
                  <Gauge className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-orange-300 font-mono">95-98%</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">C-Rate:</span>
                  <span className="text-orange-300 font-mono">1C cont</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Response:</span>
                  <span className="text-orange-300 font-mono">&lt;20ms</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Voltage:</span>
                  <span className="text-orange-300 font-mono">48-51.2V</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Scalable:</span>
                  <span className="text-orange-300 font-mono">200kWh+</span>
                </div>
              </div>
            </div>

            <div className="spec-card-elite glow-orange group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-orange-500/20 group-hover:bg-orange-500/30">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Safety/Code</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">UL:</span>
                  <span className="text-orange-300 font-mono">9540A</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">NFPA:</span>
                  <span className="text-orange-300 font-mono">855</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Fire:</span>
                  <span className="text-orange-300 font-mono">2hr rated</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Venting:</span>
                  <span className="text-orange-300 font-mono">Sealed</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">IP Rating:</span>
                  <span className="text-orange-300 font-mono">IP65</span>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case Matrix */}
          <div className="matrix-elite">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Layers className="mr-3 h-6 w-6 text-orange-400" />
              Critical Battery Storage Applications
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              {[
                {
                  icon: <TrendingDown className="h-6 w-6" />,
                  title: "NEM 3.0 Arbitrage",
                  items: [
                    "Store solar at $0.04 export",
                    "Use during $0.51 peak",
                    "12x value multiplier"
                  ],
                  gradient: "from-red-500 via-pink-500 to-rose-600",
                  iconBg: "bg-red-900/40",
                  iconColor: "text-red-300",
                  titleColor: "text-red-200",
                  glowColor: "rgba(239, 68, 68, 0.4)",
                  borderColor: "border-red-500/30"
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Backup Power",
                  items: [
                    "PSPS protection",
                    "Medical equipment",
                    "Critical loads 24/7"
                  ],
                  gradient: "from-blue-500 via-cyan-500 to-blue-600",
                  iconBg: "bg-blue-900/40",
                  iconColor: "text-blue-300",
                  titleColor: "text-blue-200",
                  glowColor: "rgba(59, 130, 246, 0.4)",
                  borderColor: "border-blue-500/30"
                },
                {
                  icon: <CircleDollarSign className="h-6 w-6" />,
                  title: "Demand Charge",
                  items: [
                    "Peak shaving 40-60%",
                    "Commercial savings",
                    "$8-18K/month reduction"
                  ],
                  gradient: "from-orange-500 via-amber-500 to-orange-600",
                  iconBg: "bg-orange-900/40",
                  iconColor: "text-orange-300",
                  titleColor: "text-orange-200",
                  glowColor: "rgba(249, 115, 22, 0.4)",
                  borderColor: "border-orange-500/30"
                },
                {
                  icon: <Wifi className="h-6 w-6" />,
                  title: "VPP Revenue",
                  items: [
                    "$2/kWh ELRP events",
                    "Grid services income",
                    "$200-500 annual"
                  ],
                  gradient: "from-orange-500 via-amber-500 to-orange-600",
                  iconBg: "bg-orange-900/40",
                  iconColor: "text-orange-300",
                  titleColor: "text-orange-200",
                  glowColor: "rgba(249, 115, 22, 0.4)",
                  borderColor: "border-orange-500/30"
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                    style={{
                      background: card.glowColor,
                      animation: `pulse ${2.5 + idx * 0.3}s ease-in-out infinite`
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`relative bg-gradient-to-br ${card.gradient} rounded-xl p-5 border ${card.borderColor} overflow-hidden transition-all duration-300`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    {/* Glass overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-60"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
                      }}
                    />

                    {/* Shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                        mixBlendMode: 'overlay'
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          className={`p-2.5 ${card.iconBg} backdrop-blur-md rounded-lg ${card.iconColor} shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          {card.icon}
                        </motion.div>
                        <h4 className={`${card.titleColor} font-bold text-base drop-shadow-md`}>
                          {card.title}
                        </h4>
                      </div>

                      {/* Content */}
                      <ul className="space-y-2">
                        {card.items.map((item, itemIdx) => (
                          <motion.li
                            key={itemIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.1 + itemIdx * 0.05 }}
                            className="text-white/90 text-sm flex items-start gap-2 drop-shadow-sm"
                          >
                            <span className={`${card.iconColor} mt-0.5`}>•</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-50"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Work Installation Image */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={teamWorkImg}
            alt="Expert team installing energy storage solution with professional battery backup power system"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-battery-storage-3"
          />
        </div>
      </div>

      {/* Enhanced Battery Storage Funnel */}
      <SolarRescueTimelineSection
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        stages={[
          {
            id: 'pain-red',
            title: 'STAGE 1: Energy Storage Crisis Recognition',
            description: 'NEM 3.0 export credits at $0.03-0.05/kWh make solar-only systems uneconomical. Peak TOU rates hit $0.51/kWh while batteries sit idle. PSPS events leave homes without power despite having solar panels. Generator fuel costs $400-800 per outage.',
            color: 'from-red-500 to-red-600',
            glowColor: 'rgba(239, 68, 68, 0.5)',
            icon: <AlertTriangle className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-red-300 font-bold">12x Price Delta</div>
                <div className="text-xs text-gray-400">Export: $0.04/kWh</div>
                <div className="text-xs text-gray-400">Import: $0.51/kWh peak</div>
              </div>
            ),
          },
          {
            id: 'intel-yellow',
            title: 'STAGE 2: Battery Technology & Sizing Analysis',
            description: 'Load profile analysis determines 15-20kWh typical residential need. LiFePO4 chemistry selected for 10,000 cycle life and safety. SimpliPhi PHI 3.8 modules (3.8kWh) allow perfect scaling. Sol-Ark inverter CANbus integration ensures seamless communication. SGIP rebate calculations show $3,000-15,000 incentive potential.',
            color: 'from-yellow-500 to-yellow-600',
            glowColor: 'rgba(234, 179, 8, 0.5)',
            icon: <Database className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-yellow-300 font-bold">15.2kWh System</div>
                <div className="text-xs text-gray-400">4 × PHI 3.8 modules</div>
                <div className="text-xs text-gray-400">100% DoD safe</div>
              </div>
            ),
          },
          {
            id: 'roi-green',
            title: 'STAGE 3: Financial ROI & Incentive Stacking',
            description: 'Federal ITC 30% reduces battery cost by $4,500-7,500. SGIP General Market provides $200-300/kWh ($3,000-4,500). SGIP Equity/Resiliency tiers offer $850-1,000/kWh for qualified customers. Time-shift arbitrage saves $150-300 monthly. Total first-year offset: 55-75% of system cost.',
            color: 'from-green-500 to-green-600',
            glowColor: 'rgba(34, 197, 94, 0.5)',
            icon: <TrendingUp className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-orange-300 font-bold">4-6 Year Payback</div>
                <div className="text-xs text-gray-400">With SGIP + ITC</div>
                <div className="text-xs text-gray-400">$250/mo savings avg</div>
              </div>
            ),
          },
          {
            id: 'action-orange',
            title: 'STAGE 4: Professional Installation & Commissioning',
            description: 'NFPA 855 compliant installation with proper ventilation and fire separation. Smart BMS programming for optimal charge/discharge curves. Integration with existing solar via AC or DC coupling. Remote monitoring setup with real-time alerts. SGIP application submission and PTO coordination. 10-year warranty activation with 24/7 support.',
            color: 'from-orange-500 to-orange-600',
            glowColor: 'rgba(249, 115, 22, 0.5)',
            icon: <CheckCircle className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-orange-300 font-bold">2-Day Install</div>
                <div className="text-xs text-gray-400">Same-day backup</div>
                <div className="text-xs text-gray-400">Remote monitoring live</div>
              </div>
            ),
          },
        ]}
      />

      {/* Equipment Installation Image */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={equipmentInstallImg}
            alt="LiFePO4 battery system equipment installation with smart BMS technology"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-battery-storage-2"
          />
        </div>
      </div>

      {/* Comprehensive Battery Chemistry Comparison */}
      <ContentSection
        title="Battery Chemistry Deep Dive"
        subtitle="LiFePO4 vs NMC vs Lead Acid"
        description="Understanding the critical differences in battery technologies and why LiFePO4 dominates residential storage"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Battery className="mr-3 h-6 w-6 text-orange-400" />
            Comprehensive Chemistry Comparison
          </h3>
          <div className="overflow-x-auto">
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(249, 115, 22, 0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 50%, transparent 80%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer1 5s infinite',
                  mixBlendMode: 'overlay'
                }}
              />

              <table className="w-full text-sm relative">
                <thead>
                  <tr
                    className="border-b border-gray-700/50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <th className="text-left py-4 px-4 text-gray-300 font-bold">Specification</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                        <span className="text-orange-300 font-bold">LiFePO4 (LFP)</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <span className="text-blue-300 font-bold">NMC/NCA</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                        <span className="text-orange-300 font-bold">Lead Acid (AGM)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {[
                    { spec: "Cycle Life @ 80% DoD", lfp: "6,000-10,000", nmc: "3,000-5,000", lead: "500-1,000" },
                    { spec: "Energy Density (Wh/kg)", lfp: "90-120", nmc: "150-250", lead: "30-40" },
                    { spec: "Round-Trip Efficiency", lfp: "95-98%", nmc: "92-95%", lead: "80-85%" },
                    { spec: "Thermal Runaway Temp", lfp: "270°C", nmc: "150°C", lead: "N/A" },
                    { spec: "Max Discharge Rate", lfp: "1C continuous", nmc: "2C continuous", lead: "0.2C" },
                    { spec: "Operating Temp Range", lfp: "-20 to +60°C", nmc: "-20 to +45°C", lead: "-15 to +40°C" },
                    { spec: "Self-Discharge Rate", lfp: "<3%/month", nmc: "<5%/month", lead: "5-15%/month" },
                    { spec: "Calendar Life", lfp: "20+ years", nmc: "10-15 years", lead: "3-5 years" },
                    { spec: "Depth of Discharge", lfp: "100% safe", nmc: "80-90%", lead: "50% max" },
                    { spec: "Toxicity/Environmental", lfp: "Non-toxic", nmc: "Cobalt concerns", lead: "Lead hazard" }
                  ].map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="hover:bg-white/5 transition-all duration-300 group"
                    >
                      <td className="py-3 px-4 text-gray-200 font-semibold group-hover:text-white transition-colors">
                        {row.spec}
                      </td>
                      <motion.td
                        className="text-center py-3 px-4 font-mono text-orange-300 group-hover:text-orange-200 transition-colors relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative inline-block px-3 py-1 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                          {row.lfp}
                        </div>
                      </motion.td>
                      <motion.td
                        className="text-center py-3 px-4 font-mono text-blue-300 group-hover:text-blue-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative inline-block px-3 py-1 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                          {row.nmc}
                        </div>
                      </motion.td>
                      <motion.td
                        className="text-center py-3 px-4 font-mono text-orange-300 group-hover:text-orange-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative inline-block px-3 py-1 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                          {row.lead}
                        </div>
                      </motion.td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Why LiFePO4 Wins */}
        <div className="card-elite glow-orange p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-3 h-6 w-6 text-orange-400" />
            Why LiFePO4 Dominates Residential Storage
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="category-card-elite">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-6 w-6 text-red-400" />
                <h4 className="text-white font-semibold">Unmatched Safety</h4>
              </div>
              <p className="text-gray-400 text-sm mb-2">270°C thermal runaway temperature vs 150°C for NMC. No cobalt means inherently stable chemistry resistant to thermal events.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• UL 9540A fire propagation tested</li>
                <li>• NFPA 855 compliant installations</li>
                <li>• No off-gassing or explosion risk</li>
              </ul>
            </div>
            <div className="category-card-elite">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-6 w-6 text-orange-400" />
                <h4 className="text-white font-semibold">Superior Longevity</h4>
              </div>
              <p className="text-gray-400 text-sm mb-2">6,000-10,000 cycles at 100% DoD yields 20+ year lifespan. Degradation rate of only 0.5% annually maintains 90% capacity after 20 years.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• 10-year standard warranties</li>
                <li>• Predictable degradation curves</li>
                <li>• No memory effect issues</li>
              </ul>
            </div>
            <div className="category-card-elite">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h4 className="text-white font-semibold">Economic Efficiency</h4>
              </div>
              <p className="text-gray-400 text-sm mb-2">95-98% round-trip efficiency maximizes energy arbitrage. Cost per cycle 40-60% lower than alternatives over lifetime.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• $0.05-0.08 per kWh stored</li>
                <li>• Higher SGIP qualification rates</li>
                <li>• Lower replacement frequency</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Battery Manufacturer Comparison */}
        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <Package className="mr-3 h-6 w-6 text-blue-400" />
          Top LiFePO4 Battery Manufacturers
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-elite glow-blue p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">SimpliPhi Power</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-blue-400 font-semibold mb-2">PHI 3.8 Battery</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Capacity:</span>
                  <span className="text-white font-mono">3.8kWh @ 100% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voltage:</span>
                  <span className="text-white font-mono">51.2V nominal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Continuous Power:</span>
                  <span className="text-white font-mono">3.4kW (66A)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-mono">98% round-trip</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-white font-mono">10,000 @ 100% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white font-mono">10 years</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-3">
              <p className="text-xs text-gray-300"><strong className="text-blue-400">Best For:</strong> Modular scaling, premium quality</p>
              <p className="text-xs text-orange-400 mt-1">Price: $3,500-4,000/unit</p>
            </div>
          </div>

          <div className="card-elite glow-green p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-orange-400" />
              <h3 className="text-xl font-bold text-white">Fortress Power</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-orange-400 font-semibold mb-2">eVault Max 18.5kWh</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Capacity:</span>
                  <span className="text-white font-mono">18.5kWh @ 100% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voltage:</span>
                  <span className="text-white font-mono">51.2V nominal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peak Power:</span>
                  <span className="text-white font-mono">11.4kW (15s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-mono">96% round-trip</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-white font-mono">6,000 @ 80% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white font-mono">10 years</span>
                </div>
              </div>
            </div>
            <div className="bg-orange-900/20 rounded-lg p-3">
              <p className="text-xs text-gray-300"><strong className="text-orange-400">Best For:</strong> Whole-home backup, large systems</p>
              <p className="text-xs text-orange-400 mt-1">Price: $11,000-13,000/unit</p>
            </div>
          </div>

          <div className="card-elite glow-orange p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-orange-400" />
              <h3 className="text-xl font-bold text-white">EG4 Electronics</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-orange-400 font-semibold mb-2">LifePower4 14.3kWh</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Capacity:</span>
                  <span className="text-white font-mono">14.3kWh @ 95% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voltage:</span>
                  <span className="text-white font-mono">51.2V nominal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peak Discharge:</span>
                  <span className="text-white font-mono">200A (10.24kW)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-mono">95% round-trip</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-white font-mono">8,000 @ 80% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white font-mono">10 years</span>
                </div>
              </div>
            </div>
            <div className="bg-orange-900/20 rounded-lg p-3">
              <p className="text-xs text-gray-300"><strong className="text-orange-400">Best For:</strong> Budget-conscious, server rack mount</p>
              <p className="text-xs text-orange-400 mt-1">Price: $7,500-8,500/unit</p>
            </div>
          </div>
        </div>

        {/* Installation Timeline */}
        <motion.div
          className="card-elite glow-blue p-8 mt-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 20%, rgba(59, 130, 246, 0.1) 50%, transparent 80%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer2 6s infinite'
            }}
          />

          <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Calendar className="mr-3 h-6 w-6 text-blue-400" />
            </motion.div>
            Professional Installation Timeline
          </h3>

          <div className="space-y-6 relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-orange-500 to-green-500 opacity-30" />

            {[
              {
                time: "Day 1 AM",
                title: "Site Preparation",
                description: "Electrical panel upgrade if needed, dedicated breaker installation, battery location preparation",
                gradient: "from-blue-500 to-cyan-600",
                iconBg: "bg-blue-900/40",
                glowColor: "rgba(59, 130, 246, 0.4)",
                borderColor: "border-blue-500/40"
              },
              {
                time: "Day 1 PM",
                title: "Battery Installation",
                description: "Rack mounting, DC wiring, BMS connections, grounding system",
                gradient: "from-orange-500 to-amber-600",
                iconBg: "bg-orange-900/40",
                glowColor: "rgba(249, 115, 22, 0.4)",
                borderColor: "border-orange-500/40"
              },
              {
                time: "Day 2 AM",
                title: "Inverter Integration",
                description: "AC/DC coupling configuration, communication setup, firmware updates",
                gradient: "from-orange-500 to-amber-600",
                iconBg: "bg-orange-900/40",
                glowColor: "rgba(249, 115, 22, 0.4)",
                borderColor: "border-orange-500/40"
              },
              {
                time: "Day 2 PM",
                title: "Commissioning",
                description: "System testing, monitoring setup, customer training, warranty registration",
                gradient: "from-green-500 to-emerald-600",
                iconBg: "bg-green-900/40",
                glowColor: "rgba(34, 197, 94, 0.4)",
                borderColor: "border-green-500/40"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="flex gap-4 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                {/* Time badge */}
                <div className="flex-shrink-0 w-32 text-right relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${step.gradient} font-mono text-sm text-white font-bold shadow-lg relative overflow-hidden`}
                    style={{
                      boxShadow: `0 4px 16px ${step.glowColor}`
                    }}
                  >
                    {/* Glass overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50 pointer-events-none"
                    />
                    <span className="relative z-10">{step.time}</span>
                  </motion.div>

                  {/* Connection dot */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[2.15rem] w-3 h-3 rounded-full bg-gradient-to-r ${step.gradient} shadow-lg z-10"
                    style={{
                      boxShadow: `0 0 12px ${step.glowColor}`
                    }}
                  />
                </div>

                {/* Content card */}
                <motion.div
                  className="flex-1 relative group"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500"
                    style={{
                      background: step.glowColor
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`relative bg-gradient-to-br ${step.gradient} border ${step.borderColor} rounded-xl p-4 overflow-hidden`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Glass overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
                      }}
                    />

                    {/* Shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                        mixBlendMode: 'overlay'
                      }}
                    />

                    <div className="relative z-10">
                      <h4 className="text-white font-bold text-lg mb-2 drop-shadow-md flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        {step.title}
                      </h4>
                      <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ContentSection>

      {/* SGIP Incentive Details */}
      <ContentSection
        title="SGIP Battery Incentives & Financial Analysis"
        subtitle="Maximizing Your Rebates"
        description="Complete guide to California's Self-Generation Incentive Program and financial optimization strategies"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <motion.div
          className="card-elite glow-green p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 20%, rgba(34, 197, 94, 0.1) 50%, transparent 80%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer3 6s infinite'
            }}
          />

          <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
            <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
              <CircleDollarSign className="mr-3 h-6 w-6 text-orange-400" />
            </motion.div>
            SGIP Incentive Tiers (2024)
          </h3>

          <div className="overflow-x-auto relative z-10">
            <div className="relative rounded-2xl overflow-hidden border border-green-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="border-b border-gray-700/50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <th className="text-left py-4 px-4 text-gray-200 font-bold">Customer Category</th>
                    <th className="text-center py-4 px-4 text-gray-200 font-bold">Incentive Rate</th>
                    <th className="text-center py-4 px-4 text-gray-200 font-bold">15kWh System</th>
                    <th className="text-center py-4 px-4 text-gray-200 font-bold">Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {[
                    { category: "Equity Budget", rate: "$850-1,000/kWh", total: "$12,750-15,000", req: "CARE/FERA/Disadvantaged Community", color: "orange" },
                    { category: "Equity Resiliency", rate: "$850-1,000/kWh", total: "$12,750-15,000", req: "Equity + HFTD Tier 2/3 or Medical", color: "red" },
                    { category: "General Market", rate: "$200-250/kWh", total: "$3,000-3,750", req: "All residential customers", color: "blue" },
                    { category: "Resiliency (Non-Equity)", rate: "$200-300/kWh", total: "$3,000-4,500", req: "HFTD Tier 2/3 or 2+ PSPS events", color: "yellow" }
                  ].map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="hover:bg-white/5 transition-all duration-300 group"
                    >
                      <td className="py-4 px-4 text-gray-200 font-bold group-hover:text-white transition-colors">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 bg-${row.color}-400 rounded-full animate-pulse`} />
                          {row.category}
                        </div>
                      </td>
                      <motion.td
                        className={`text-center py-4 px-4 font-mono text-${row.color}-300 group-hover:text-${row.color}-200 transition-colors`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`inline-block px-3 py-1.5 rounded-lg bg-${row.color}-500/10 group-hover:bg-${row.color}-500/20 transition-colors`}>
                          {row.rate}
                        </div>
                      </motion.td>
                      <motion.td
                        className={`text-center py-4 px-4 font-mono text-${row.color}-300 group-hover:text-${row.color}-200 font-bold transition-colors`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`inline-block px-3 py-1.5 rounded-lg bg-${row.color}-500/10 group-hover:bg-${row.color}-500/20 transition-colors`}>
                          {row.total}
                        </div>
                      </motion.td>
                      <td className="text-center py-4 px-4 text-gray-300 text-xs group-hover:text-gray-200 transition-colors">
                        {row.req}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Complete Financial Example */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="card-elite glow-orange p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Background shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.15) 50%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer1 5s infinite'
              }}
            />

            <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Calculator className="mr-3 h-6 w-6 text-orange-400" />
              </motion.div>
              Real Customer Example: 15.2kWh System
            </h3>

            <div className="space-y-4 text-sm relative z-10">
              <div>
                <h4 className="text-orange-300 font-bold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  System Components:
                </h4>
                <div
                  className="rounded-xl p-4 space-y-2 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    boxShadow: '0 4px 16px rgba(249, 115, 22, 0.2)'
                  }}
                >
                  {["4 × SimpliPhi PHI 3.8 batteries", "Sol-Ark 12K inverter (existing)", "Critical load panel", "NFPA 855 compliant installation"].map((item, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-gray-200 flex items-center gap-2"
                    >
                      <span className="text-orange-400">•</span>
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-orange-300 font-bold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  Cost Breakdown:
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Equipment:", value: "$14,000", color: "text-gray-300" },
                    { label: "Installation:", value: "$4,500", color: "text-gray-300" },
                    { label: "Permits/Inspection:", value: "$500", color: "text-gray-300" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-orange-500/10 transition-colors"
                    >
                      <span className={item.color}>{item.label}</span>
                      <span className="text-white font-mono font-bold">{item.value}</span>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center px-4 py-3 rounded-xl mt-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.15) 100%)',
                      border: '1px solid rgba(249, 115, 22, 0.4)'
                    }}
                  >
                    <span className="text-orange-200 font-bold">Gross Cost:</span>
                    <span className="text-2xl font-black text-white font-mono">$19,000</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card-elite glow-green p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Background shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(34, 197, 94, 0.15) 50%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer2 5s infinite'
              }}
            />

            <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <TrendingUp className="mr-3 h-6 w-6 text-orange-400" />
              </motion.div>
              Incentives & Net Cost
            </h3>

            <div className="space-y-4 text-sm relative z-10">
              <div>
                <h4 className="text-orange-300 font-bold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  Available Incentives:
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Federal ITC (30%):", value: "-$5,700" },
                    { label: "SGIP General Market:", value: "-$3,800" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-orange-500/10 transition-colors"
                    >
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-orange-300 font-mono font-bold">{item.value}</span>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center px-4 py-3 rounded-xl mt-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.15) 100%)',
                      border: '1px solid rgba(249, 115, 22, 0.4)'
                    }}
                  >
                    <span className="text-orange-200 font-bold">Net Cost:</span>
                    <span className="text-2xl font-black text-orange-400 font-mono">$9,500</span>
                  </motion.div>
                </div>
              </div>

              <div>
                <h4 className="text-orange-300 font-bold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  Monthly Savings:
                </h4>
                <div
                  className="rounded-xl p-4 space-y-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
                    border: '1px solid rgba(249, 115, 22, 0.3)'
                  }}
                >
                  {[
                    { label: "TOU Arbitrage:", value: "$180/mo" },
                    { label: "Demand Reduction:", value: "$45/mo" },
                    { label: "VPP Revenue:", value: "$20/mo" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex justify-between"
                    >
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-orange-300 font-mono font-bold">{item.value}</span>
                    </motion.div>
                  ))}
                  <div className="flex justify-between pt-3 border-t border-orange-500/30">
                    <span className="text-orange-200 font-bold">Total Monthly:</span>
                    <span className="text-orange-400 font-mono font-black text-lg">$245/mo</span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-xl p-4 space-y-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-blue-300 font-semibold">Simple Payback:</span>
                  <motion.span
                    className="text-3xl font-black text-blue-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    3.2 years
                  </motion.span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-500/30">
                  <span className="text-blue-300 font-semibold">10-Year ROI:</span>
                  <motion.span
                    className="text-3xl font-black text-orange-400"
                    whileHover={{ scale: 1.1 }}
                  >
                    209%
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ContentSection>

      {/* Integrated Solar Battery System Image */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={solarBatterySystemImg}
            alt="Integrated solar and battery backup power system for complete energy independence"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
            data-testid="img-battery-storage-4"
          />
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Store Your Solar Energy Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Professional battery storage installation with SGIP incentive processing.
              Join the energy storage revolution with Northern California's trusted experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-free-analysis"
              >
                Get Free Battery Sizing Analysis
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 py-4 px-8 rounded-lg"
                onClick={() => window.location.href = 'tel:5302260701'}
                data-testid="button-call"
              >
                Call (530) 226-0701
              </Button>
            </div>
            <p className="mt-8 text-white/80 text-sm">
              Limited SGIP funding available • Apply before incentives decrease
            </p>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BatteryStorage;
