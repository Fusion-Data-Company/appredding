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
import ShaderBackground from "@/components/ui/shader-background";
import { AwardBadge } from "@/components/ui/award-badge";

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
    <MainLayout>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        industry="solar"
        slug="battery-storage"
        structuredData={structuredData}
      />

      {/* NEW HERO SECTION WITH SHADER BACKGROUND */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ShaderBackground />
        
        <div className="relative z-10 w-full py-20">
          {/* Glassomorphic Hero Card - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* Glassomorphic Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-y border-white/20 p-12 md:p-16 lg:p-20 shadow-2xl"
            >
              {/* Glass Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
              
              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight"
                >
                  <span className="text-white drop-shadow-2xl">Advanced Battery</span>
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                    Storage Systems
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 leading-relaxed drop-shadow-lg"
                >
                  LiFePO4 battery technology with 95%+ round-trip efficiency, 10-year warranties, and SGIP incentives up to $1,000/kWh
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl text-yellow-200/80 mb-12 leading-relaxed"
                >
                  SimpliPhi • Fortress Power • EG4 • Sol-Ark Integration • Smart BMS • Thermal Management • Remote Monitoring
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  {/* Premium CTA Button */}
                  <Button
                    onClick={() => setShowConsultationForm(true)}
                    className="group relative bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-600 text-black font-bold px-12 py-8 text-lg shadow-2xl shadow-yellow-500/50 transform hover:scale-105 transition-all rounded-xl overflow-hidden"
                    data-testid="button-calculate-battery"
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-3">
                      <Calculator className="h-6 w-6" />
                      <span>Calculate Battery Sizing & SGIP</span>
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </Button>
                  
                  {/* Secondary Button */}
                  <Button
                    variant="outline"
                    className="group relative border-2 border-white/30 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:border-white/50 px-12 py-8 text-lg font-semibold rounded-xl overflow-hidden transition-all"
                    onClick={() => document.getElementById('battery-comparison')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-compare-batteries"
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative flex items-center gap-3">
                      <Database className="h-6 w-6" />
                      <span>Compare Battery Technologies</span>
                    </div>
                  </Button>
                </motion.div>
              </div>
              
              {/* Bottom Shine */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </motion.div>

            {/* Stats Cards Below Glassomorphic Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto px-6 sm:px-12"
            >
            {[
              { 
                title: "LiFePO4 Safety", 
                value: "270°C", 
                description: "Thermal runaway temp",
                icon: <Flame className="h-8 w-8" />
              },
              { 
                title: "Cycle Life", 
                value: "10,000+", 
                description: "@ 100% DOD cycles",
                icon: <Activity className="h-8 w-8" />
              },
              { 
                title: "Round-Trip", 
                value: "95-98%", 
                description: "Energy efficiency",
                icon: <Zap className="h-8 w-8" />
              },
              { 
                title: "SGIP Rebate", 
                value: "$1,000/kWh", 
                description: "Max incentive available",
                icon: <DollarSign className="h-8 w-8" />
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                className="relative group"
                data-testid={`card-feature-${idx}`}
              >
                {/* Yellow Electric Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/90 via-amber-500/90 to-yellow-600/90 rounded-2xl blur-sm group-hover:blur-md transition-all" />
                
                {/* Card Content */}
                <div className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-2xl p-6 backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-300/50 transition-all transform hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl text-black">
                      {card.icon}
                    </div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  </div>
                  
                  <h3 className="text-black/90 font-bold text-sm mb-2 uppercase tracking-wide">{card.title}</h3>
                  <div className="text-3xl font-black text-black mb-1 drop-shadow-md">{card.value}</div>
                  <p className="text-black/70 text-xs font-medium">{card.description}</p>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Excellence Award Badge */}
      <div className="flex justify-center py-12 bg-gradient-to-b from-gray-900 to-black">
        <AwardBadge type="customer-service-excellence" />
      </div>

      {/* Energy Storage Crisis Alert */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="alert-elite">
            <div className="flex items-center gap-4">
              <TrendingDown className="h-8 w-8 text-purple-400 animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <p className="text-purple-300 font-semibold text-lg mb-2">CRITICAL: NEM 3.0 Makes Battery Storage Mandatory for Positive ROI</p>
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
              <DollarSign className="h-4 w-4 text-purple-400" />
              <span className="text-gray-400">SGIP Rebate:</span>
              <span className="text-purple-400 font-mono">$200-1,000/kWh</span>
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
            <div className="spec-card-elite glow-purple group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-elite bg-purple-500/20 group-hover:bg-purple-500/30">
                  <Battery className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">LiFePO4 Chemistry</h3>
              </div>
              <div className="space-y-3">
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Safety:</span>
                  <span className="text-purple-300 font-mono">Highest</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Thermal:</span>
                  <span className="text-purple-300 font-mono">270°C</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-purple-300 font-mono">10,000+</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">DoD:</span>
                  <span className="text-purple-300 font-mono">100%</span>
                </div>
                <div className="data-row-elite text-sm">
                  <span className="text-gray-400">Degrade:</span>
                  <span className="text-purple-300 font-mono">0.5%/yr</span>
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
              <Layers className="mr-3 h-6 w-6 text-purple-400" />
              Critical Battery Storage Applications
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  <h4 className="text-red-300 font-semibold">NEM 3.0 Arbitrage</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Store solar at $0.04 export</li>
                  <li>• Use during $0.51 peak</li>
                  <li>• 12x value multiplier</li>
                </ul>
              </div>
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <h4 className="text-blue-300 font-semibold">Backup Power</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• PSPS protection</li>
                  <li>• Medical equipment</li>
                  <li>• Critical loads 24/7</li>
                </ul>
              </div>
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDollarSign className="h-5 w-5 text-orange-400" />
                  <h4 className="text-orange-300 font-semibold">Demand Charge</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Peak shaving 40-60%</li>
                  <li>• Commercial savings</li>
                  <li>• $8-18K/month reduction</li>
                </ul>
              </div>
              <div className="category-card-elite">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="h-5 w-5 text-purple-400" />
                  <h4 className="text-purple-300 font-semibold">VPP Revenue</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• $2/kWh ELRP events</li>
                  <li>• Grid services income</li>
                  <li>• $200-500 annual</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            id: 'action-purple',
            title: 'STAGE 4: Professional Installation & Commissioning',
            description: 'NFPA 855 compliant installation with proper ventilation and fire separation. Smart BMS programming for optimal charge/discharge curves. Integration with existing solar via AC or DC coupling. Remote monitoring setup with real-time alerts. SGIP application submission and PTO coordination. 10-year warranty activation with 24/7 support.',
            color: 'from-purple-500 to-purple-600',
            glowColor: 'rgba(168, 85, 247, 0.5)',
            icon: <CheckCircle className='h-8 w-8' />,
            metrics: (
              <div className="space-y-1">
                <div className="text-purple-300 font-bold">2-Day Install</div>
                <div className="text-xs text-gray-400">Same-day backup</div>
                <div className="text-xs text-gray-400">Remote monitoring live</div>
              </div>
            ),
          },
        ]}
      />

      {/* Comprehensive Battery Chemistry Comparison */}
      <ContentSection
        title="Battery Chemistry Deep Dive"
        subtitle="LiFePO4 vs NMC vs Lead Acid"
        description="Understanding the critical differences in battery technologies and why LiFePO4 dominates residential storage"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Battery className="mr-3 h-6 w-6 text-purple-400" />
            Comprehensive Chemistry Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-800/40 rounded-xl overflow-hidden">
              <thead className="bg-gray-900/60">
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Specification</th>
                  <th className="text-center py-3 px-4 text-purple-400">LiFePO4 (LFP)</th>
                  <th className="text-center py-3 px-4 text-blue-400">NMC/NCA</th>
                  <th className="text-center py-3 px-4 text-orange-400">Lead Acid (AGM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Cycle Life @ 80% DoD</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">6,000-10,000</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">3,000-5,000</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">500-1,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Energy Density (Wh/kg)</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">90-120</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">150-250</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">30-40</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Round-Trip Efficiency</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">95-98%</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">92-95%</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">80-85%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Thermal Runaway Temp</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">270°C</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">150°C</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">N/A</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Max Discharge Rate</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">1C continuous</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">2C continuous</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">0.2C</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Operating Temp Range</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">-20 to +60°C</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">-20 to +45°C</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">-15 to +40°C</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Self-Discharge Rate</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">&lt;3%/month</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">&lt;5%/month</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">5-15%/month</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Calendar Life</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">20+ years</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">10-15 years</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">3-5 years</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Depth of Discharge</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">100% safe</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">80-90%</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">50% max</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Toxicity/Environmental</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">Non-toxic</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">Cobalt concerns</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">Lead hazard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why LiFePO4 Wins */}
        <div className="card-elite glow-purple p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-3 h-6 w-6 text-purple-400" />
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

          <div className="card-elite glow-purple p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">EG4 Electronics</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-purple-400 font-semibold mb-2">LifePower4 14.3kWh</h4>
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
            <div className="bg-purple-900/20 rounded-lg p-3">
              <p className="text-xs text-gray-300"><strong className="text-purple-400">Best For:</strong> Budget-conscious, server rack mount</p>
              <p className="text-xs text-orange-400 mt-1">Price: $7,500-8,500/unit</p>
            </div>
          </div>
        </div>

        {/* Installation Timeline */}
        <div className="card-elite glow-blue p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calendar className="mr-3 h-6 w-6 text-blue-400" />
            Professional Installation Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-blue-400 font-mono text-sm">Day 1 AM</span>
              </div>
              <div className="flex-1 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-white font-semibold mb-1">Site Preparation</h4>
                <p className="text-gray-400 text-sm">Electrical panel upgrade if needed, dedicated breaker installation, battery location preparation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-blue-400 font-mono text-sm">Day 1 PM</span>
              </div>
              <div className="flex-1 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-white font-semibold mb-1">Battery Installation</h4>
                <p className="text-gray-400 text-sm">Rack mounting, DC wiring, BMS connections, grounding system</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-blue-400 font-mono text-sm">Day 2 AM</span>
              </div>
              <div className="flex-1 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-white font-semibold mb-1">Inverter Integration</h4>
                <p className="text-gray-400 text-sm">AC/DC coupling configuration, communication setup, firmware updates</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-blue-400 font-mono text-sm">Day 2 PM</span>
              </div>
              <div className="flex-1 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-white font-semibold mb-1">Commissioning</h4>
                <p className="text-gray-400 text-sm">System testing, monitoring setup, customer training, warranty registration</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* SGIP Incentive Details */}
      <ContentSection
        title="SGIP Battery Incentives & Financial Analysis"
        subtitle="Maximizing Your Rebates"
        description="Complete guide to California's Self-Generation Incentive Program and financial optimization strategies"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="card-elite glow-green p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <CircleDollarSign className="mr-3 h-6 w-6 text-orange-400" />
            SGIP Incentive Tiers (2024)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Customer Category</th>
                  <th className="text-center py-3 px-4 text-gray-400">Incentive Rate</th>
                  <th className="text-center py-3 px-4 text-gray-400">15kWh System</th>
                  <th className="text-center py-3 px-4 text-gray-400">Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Equity Budget</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">$850-1,000/kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">$12,750-15,000</td>
                  <td className="text-center py-3 px-4 text-gray-400 text-xs">CARE/FERA/Disadvantaged Community</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Equity Resiliency</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">$850-1,000/kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">$12,750-15,000</td>
                  <td className="text-center py-3 px-4 text-gray-400 text-xs">Equity + HFTD Tier 2/3 or Medical</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">General Market</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">$200-250/kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">$3,000-3,750</td>
                  <td className="text-center py-3 px-4 text-gray-400 text-xs">All residential customers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Resiliency (Non-Equity)</td>
                  <td className="text-center py-3 px-4 font-mono text-yellow-300">$200-300/kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-yellow-300">$3,000-4,500</td>
                  <td className="text-center py-3 px-4 text-gray-400 text-xs">HFTD Tier 2/3 or 2+ PSPS events</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Complete Financial Example */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-elite glow-purple p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calculator className="mr-3 h-6 w-6 text-purple-400" />
              Real Customer Example: 15.2kWh System
            </h3>
            <div className="space-y-3 text-sm">
              <h4 className="text-purple-400 font-semibold">System Components:</h4>
              <div className="bg-purple-900/20 rounded-lg p-3 space-y-1">
                <p className="text-gray-300">• 4 × SimpliPhi PHI 3.8 batteries</p>
                <p className="text-gray-300">• Sol-Ark 12K inverter (existing)</p>
                <p className="text-gray-300">• Critical load panel</p>
                <p className="text-gray-300">• NFPA 855 compliant installation</p>
              </div>

              <h4 className="text-purple-400 font-semibold mt-4">Cost Breakdown:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Equipment:</span>
                  <span className="text-white font-mono">$14,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Installation:</span>
                  <span className="text-white font-mono">$4,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Permits/Inspection:</span>
                  <span className="text-white font-mono">$500</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-700 pt-2">
                  <span className="text-white">Gross Cost:</span>
                  <span className="text-white font-mono">$19,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elite glow-green p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 text-orange-400" />
              Incentives & Net Cost
            </h3>
            <div className="space-y-3 text-sm">
              <h4 className="text-orange-400 font-semibold">Available Incentives:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Federal ITC (30%):</span>
                  <span className="text-orange-300 font-mono">-$5,700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SGIP General Market:</span>
                  <span className="text-orange-300 font-mono">-$3,800</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-700 pt-2">
                  <span className="text-white">Net Cost After Incentives:</span>
                  <span className="text-orange-400 font-mono">$9,500</span>
                </div>
              </div>

              <h4 className="text-orange-400 font-semibold mt-4">Monthly Savings:</h4>
              <div className="bg-orange-900/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">TOU Arbitrage:</span>
                  <span className="text-orange-300 font-mono">$180/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Demand Reduction:</span>
                  <span className="text-orange-300 font-mono">$45/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VPP Revenue:</span>
                  <span className="text-orange-300 font-mono">$20/mo</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-green-500/30 pt-2">
                  <span className="text-orange-400">Total Monthly Savings:</span>
                  <span className="text-orange-400 font-mono">$245/mo</span>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-semibold">Simple Payback:</span>
                  <span className="text-2xl font-bold text-blue-300">3.2 years</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-400 font-semibold">10-Year ROI:</span>
                  <span className="text-2xl font-bold text-orange-400">209%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
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
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-free-analysis"
              >
                Get Free Battery Sizing Analysis
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 rounded-lg"
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
