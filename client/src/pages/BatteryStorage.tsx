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
  Tool,
  Timer,
  Calendar,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SolarRescueTimelineSection from "@/sections/SolarRescueTimelineSection";
import ContentSection from "@/components/sections/ContentSection";

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
        structuredData={structuredData}
      />

      {/* Enhanced Battery Storage Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/optimized/diamond-plate-industrial.jpg')] opacity-5 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Energy Storage Crisis Alert */}
          <div className="bg-purple-900/20 border border-purple-500/50 backdrop-blur-sm rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-6 w-6 text-purple-400 animate-pulse" />
              <div className="flex-1">
                <p className="text-purple-300 font-semibold">CRITICAL: NEM 3.0 Makes Battery Storage Mandatory for Positive ROI</p>
                <p className="text-gray-400 text-sm mt-1">Without batteries: 10-12 year payback • With batteries + SGIP: 4-6 year payback • Time-shift arbitrage saves $150-300/month</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Battery className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">LiFePO4 Technology • 10,000+ Cycles • NFPA 855 Compliant</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Battery Storage Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto mb-4">
              LiFePO4 battery technology with 95%+ round-trip efficiency, 10-year warranties, and SGIP incentives up to $1,000/kWh
            </p>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-8">
              SimpliPhi • Fortress Power • EG4 • Sol-Ark Integration • Smart BMS • Thermal Management • Remote Monitoring
            </p>

            {/* Live Battery Metrics Bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">Round-Trip:</span>
                <span className="text-green-400 font-mono">95-98%</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <Timer className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-400">Cycle Life:</span>
                <span className="text-yellow-400 font-mono">6,000-10,000</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <DollarSign className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">SGIP Rebate:</span>
                <span className="text-purple-400 font-mono">$200-1,000/kWh</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Warranty:</span>
                <span className="text-blue-400 font-mono">10 years</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                onClick={() => setShowConsultationForm(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-all"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Battery Sizing & SGIP
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => document.getElementById('battery-comparison')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Database className="mr-2 h-5 w-5" />
                Compare Battery Technologies
              </Button>
            </div>
          </div>

          {/* Battery Technology Grid */}
          <div className="grid lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <Battery className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">LiFePO4 Chemistry</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Safety:</span>
                  <span className="text-purple-300 font-mono">Highest</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Thermal:</span>
                  <span className="text-purple-300 font-mono">270°C</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-purple-300 font-mono">10,000+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">DoD:</span>
                  <span className="text-purple-300 font-mono">100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Degrade:</span>
                  <span className="text-purple-300 font-mono">0.5%/yr</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Smart BMS</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cell Balance:</span>
                  <span className="text-blue-300 font-mono">±20mV</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Protection:</span>
                  <span className="text-blue-300 font-mono">8-Layer</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monitor:</span>
                  <span className="text-blue-300 font-mono">Real-time</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Comm:</span>
                  <span className="text-blue-300 font-mono">CAN/RS485</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Alerts:</span>
                  <span className="text-blue-300 font-mono">Instant</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Gauge className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-green-300 font-mono">95-98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">C-Rate:</span>
                  <span className="text-green-300 font-mono">1C cont</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Response:</span>
                  <span className="text-green-300 font-mono">&lt;20ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Voltage:</span>
                  <span className="text-green-300 font-mono">48-51.2V</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Scalable:</span>
                  <span className="text-green-300 font-mono">200kWh+</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Safety/Code</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">UL:</span>
                  <span className="text-orange-300 font-mono">9540A</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">NFPA:</span>
                  <span className="text-orange-300 font-mono">855</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fire:</span>
                  <span className="text-orange-300 font-mono">2hr rated</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Venting:</span>
                  <span className="text-orange-300 font-mono">Sealed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">IP Rating:</span>
                  <span className="text-orange-300 font-mono">IP65</span>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case Matrix */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Layers className="mr-3 h-6 w-6 text-purple-400" />
              Critical Battery Storage Applications
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-black/30 rounded-lg p-4">
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
              <div className="bg-black/30 rounded-lg p-4">
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
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDollarSign className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-300 font-semibold">Demand Charge</h4>
                </div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Peak shaving 40-60%</li>
                  <li>• Commercial savings</li>
                  <li>• $8-18K/month reduction</li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
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
                <div className="text-green-300 font-bold">4-6 Year Payback</div>
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
        id="battery-comparison"
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
                  <td className="text-center py-3 px-4 font-mono text-purple-300">2-3%/month</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">3-5%/month</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">5-15%/month</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Maintenance Required</td>
                  <td className="text-center py-3 px-4 text-purple-300">None</td>
                  <td className="text-center py-3 px-4 text-blue-300">None</td>
                  <td className="text-center py-3 px-4 text-orange-300">Regular</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Typical Warranty</td>
                  <td className="text-center py-3 px-4 font-mono text-purple-300">10 years</td>
                  <td className="text-center py-3 px-4 font-mono text-blue-300">10 years</td>
                  <td className="text-center py-3 px-4 font-mono text-orange-300">3-5 years</td>
                </tr>
                <tr className="bg-gray-900/40">
                  <td className="py-3 px-4 text-white font-semibold">Cost per kWh (installed)</td>
                  <td className="text-center py-3 px-4 text-purple-300 font-bold">$600-800</td>
                  <td className="text-center py-3 px-4 text-blue-300 font-bold">$700-1,000</td>
                  <td className="text-center py-3 px-4 text-orange-300 font-bold">$200-400</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-semibold">10-Year Cost/kWh/Cycle</td>
                  <td className="text-center py-3 px-4 text-purple-300 font-bold">$0.08</td>
                  <td className="text-center py-3 px-4 text-blue-300 font-bold">$0.20</td>
                  <td className="text-center py-3 px-4 text-orange-300 font-bold">$0.80</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Safety Comparison */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-purple-400" />
              LiFePO4 Safety Profile
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">No thermal runaway below 270°C</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">No oxygen release during failure</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">No cobalt or nickel content</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">UL 9540A certified for residential</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">NFPA 855 compliant installation</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-400" />
              NMC/NCA Considerations
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Thermal runaway at 150°C possible</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Requires active thermal management</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Higher energy density (smaller size)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Better for mobile applications</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Requires fire suppression system</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-400" />
              Lead Acid Limitations
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">50% DoD limit reduces usable capacity</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">500-1,000 cycles = 2-3 year replacement</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">80-85% efficiency wastes energy</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Requires ventilation for hydrogen gas</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">10x higher lifecycle cost than LiFePO4</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Battery Sizing & Load Analysis */}
      <ContentSection
        title="Professional Battery Sizing & Load Analysis"
        subtitle="Right-Sizing Your Energy Storage"
        description="Engineering-grade calculations for optimal battery capacity based on your specific energy usage patterns"
        backgroundColor="bg-gray-900"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calculator className="mr-3 h-6 w-6 text-green-400" />
              Load Analysis Methodology
            </h3>
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-3">Step 1: Data Collection</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>12 months of 15-minute interval data from PG&E</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Peak demand identification (kW)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>TOU period consumption patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Seasonal variation analysis</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-3">Step 2: Critical Load Audit</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Refrigerator:</span>
                    <span className="text-white font-mono">150W avg (1.2kWh/day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lighting (LED):</span>
                    <span className="text-white font-mono">200W (1.6kWh/day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Internet/WiFi:</span>
                    <span className="text-white font-mono">50W (1.2kWh/day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Well Pump:</span>
                    <span className="text-white font-mono">1,500W (3kWh/day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HVAC (1 zone):</span>
                    <span className="text-white font-mono">3,500W (14kWh/day)</span>
                  </div>
                  <div className="border-t border-blue-500/30 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-blue-400">Total Critical:</span>
                      <span className="text-white">21kWh/day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Database className="mr-3 h-6 w-6 text-purple-400" />
              Battery Sizing Formula
            </h3>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
              <h4 className="text-purple-400 font-semibold mb-3">NEM 3.0 Optimization Formula:</h4>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-green-400">
                <p>Battery_Size = (Peak_TOU_Usage × 1.2) + (Backup_Hours × Critical_Load)</p>
                <p className="mt-2 text-xs text-gray-400">Where:</p>
                <p className="text-xs text-gray-400">• Peak_TOU = 4pm-9pm consumption (kWh)</p>
                <p className="text-xs text-gray-400">• 1.2 = 20% reserve margin</p>
                <p className="text-xs text-gray-400">• Backup_Hours = Desired outage protection</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Typical Residential Sizing:</h4>
              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Small Home (1,500 sq ft):</span>
                    <span className="text-white font-mono">10-13kWh</span>
                  </div>
                  <p className="text-xs text-gray-500">3 × SimpliPhi PHI 3.8 (11.4kWh total)</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Medium Home (2,500 sq ft):</span>
                    <span className="text-white font-mono">15-20kWh</span>
                  </div>
                  <p className="text-xs text-gray-500">5 × SimpliPhi PHI 3.8 (19kWh total)</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Large Home (3,500+ sq ft):</span>
                    <span className="text-white font-mono">25-40kWh</span>
                  </div>
                  <p className="text-xs text-gray-500">2 × Fortress eVault Max (37kWh total)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time-of-Use Optimization Strategy */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Clock className="mr-3 h-6 w-6 text-green-400" />
            TOU Rate Arbitrage Strategy (PG&E EV-A Schedule)
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-black/40 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">12am - 3pm</h5>
              <p className="text-xs text-gray-400 mb-2">Off-Peak: $0.40/kWh</p>
              <div className="space-y-1 text-xs text-gray-300">
                <p>• Charge battery from solar</p>
                <p>• Export excess at low rates</p>
                <p>• Run heavy loads</p>
              </div>
            </div>
            <div className="bg-black/40 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">3pm - 4pm</h5>
              <p className="text-xs text-gray-400 mb-2">Partial-Peak: $0.42/kWh</p>
              <div className="space-y-1 text-xs text-gray-300">
                <p>• Reduce grid consumption</p>
                <p>• Top off battery to 100%</p>
                <p>• Prepare for peak period</p>
              </div>
            </div>
            <div className="bg-black/40 rounded-lg p-4">
              <h5 className="text-red-400 font-semibold mb-2">4pm - 9pm</h5>
              <p className="text-xs text-gray-400 mb-2">Peak: $0.51/kWh</p>
              <div className="space-y-1 text-xs text-gray-300">
                <p>• 100% battery power</p>
                <p>• Zero grid import</p>
                <p>• Save $200-300/month</p>
              </div>
            </div>
            <div className="bg-black/40 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2">9pm - 12am</h5>
              <p className="text-xs text-gray-400 mb-2">Partial-Peak: $0.42/kWh</p>
              <div className="space-y-1 text-xs text-gray-300">
                <p>• Continue battery use</p>
                <p>• Grid import if needed</p>
                <p>• Prepare for off-peak</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* BMS & Safety Systems */}
      <ContentSection
        title="Battery Management System (BMS) & Safety"
        subtitle="Advanced Protection & Monitoring"
        description="Understanding the critical safety systems that protect your investment and home"
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Cpu className="mr-3 h-6 w-6 text-blue-400" />
              8-Layer BMS Protection
            </h3>
            <div className="space-y-3">
              {[
                { layer: "1. Cell Voltage", protection: "Over/under voltage protection", range: "2.5-3.65V/cell" },
                { layer: "2. Current", protection: "Overcurrent & short circuit", range: "200A max continuous" },
                { layer: "3. Temperature", protection: "Thermal monitoring per cell", range: "-20 to +60°C" },
                { layer: "4. Cell Balance", protection: "Active balancing ±20mV", range: "Automatic equalization" },
                { layer: "5. SOC/SOH", protection: "State tracking & health", range: "±2% accuracy" },
                { layer: "6. Communication", protection: "CANbus/RS485 monitoring", range: "Real-time data" },
                { layer: "7. Isolation", protection: "Ground fault detection", range: ">1MΩ resistance" },
                { layer: "8. Firmware", protection: "OTA updates & diagnostics", range: "Remote management" }
              ].map((item, index) => (
                <div key={index} className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-blue-400 font-semibold text-sm">{item.layer}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.protection}</p>
                    </div>
                    <span className="text-xs font-mono text-blue-300">{item.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="mr-3 h-6 w-6 text-orange-400" />
              NFPA 855 Compliance
            </h3>
            <div className="space-y-4">
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">Installation Requirements:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>3 feet clearance from ignition sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Dedicated 2-hour fire-rated room/enclosure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Smoke/heat detection with auto-shutdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Emergency disconnect within 10 feet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Ventilation per manufacturer specs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Thermal Management:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Passive cooling (LiFePO4):</span>
                    <span className="text-green-400">Standard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active cooling (NMC):</span>
                    <span className="text-yellow-400">Required</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temperature sensors:</span>
                    <span className="text-white font-mono">Per module</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shutdown temp:</span>
                    <span className="text-red-400 font-mono">60°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-400 font-semibold mb-2">Monitoring & Alerts:</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• 24/7 cloud monitoring dashboard</li>
                  <li>• SMS/email alerts for anomalies</li>
                  <li>• Remote shutdown capability</li>
                  <li>• Predictive maintenance alerts</li>
                  <li>• Historical performance data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* UL Certifications */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-3 h-6 w-6 text-green-400" />
            Required Certifications & Standards
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">UL 9540</h5>
              <p className="text-xs text-gray-400">Energy Storage System Standard</p>
              <ul className="mt-2 space-y-1 text-xs text-gray-300">
                <li>• Electrical safety</li>
                <li>• Mechanical safety</li>
                <li>• Environmental testing</li>
              </ul>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">UL 9540A</h5>
              <p className="text-xs text-gray-400">Thermal Runaway Fire Test</p>
              <ul className="mt-2 space-y-1 text-xs text-gray-300">
                <li>• Cell-level testing</li>
                <li>• Module-level testing</li>
                <li>• Installation method</li>
              </ul>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">UL 1973</h5>
              <p className="text-xs text-gray-400">Battery Safety Standard</p>
              <ul className="mt-2 space-y-1 text-xs text-gray-300">
                <li>• Construction requirements</li>
                <li>• Performance tests</li>
                <li>• Safety mechanisms</li>
              </ul>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">IEEE 1547</h5>
              <p className="text-xs text-gray-400">Grid Interconnection</p>
              <ul className="mt-2 space-y-1 text-xs text-gray-300">
                <li>• Anti-islanding</li>
                <li>• Voltage/frequency</li>
                <li>• Power quality</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Leading Battery Brands Comparison */}
      <ContentSection
        title="Leading Battery Storage Solutions"
        subtitle="Brand Comparison & Selection Guide"
        description="Detailed comparison of top-tier battery manufacturers and their flagship products"
        backgroundColor="bg-gray-900"
      >
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">SimpliPhi Power</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-blue-400 font-semibold mb-2">PHI 3.8-M Battery</h4>
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
                  <span className="text-gray-400">Peak Discharge:</span>
                  <span className="text-white font-mono">150A (7.68kW)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-mono">98% round-trip</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cycles:</span>
                  <span className="text-white font-mono">10,000 @ 80% DoD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white font-mono">10 years/10,000 cycles</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-3">
              <p className="text-xs text-gray-300"><strong className="text-blue-400">Best For:</strong> Modular systems, retrofits, off-grid applications</p>
              <p className="text-xs text-green-400 mt-1">Price: $2,800-3,200/module</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Fortress Power</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-green-400 font-semibold mb-2">eVault Max 18.5kWh</h4>
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
                  <span className="text-gray-400">Peak Discharge:</span>
                  <span className="text-white font-mono">200A (10.24kW)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-white font-mono">95% round-trip</span>
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
            <div className="bg-green-900/20 rounded-lg p-3">
              <p className="text-xs text-gray-300"><strong className="text-green-400">Best For:</strong> Whole-home backup, large systems</p>
              <p className="text-xs text-green-400 mt-1">Price: $11,000-13,000/unit</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6">
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
              <p className="text-xs text-green-400 mt-1">Price: $7,500-8,500/unit</p>
            </div>
          </div>
        </div>

        {/* Installation Timeline */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
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
        <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 border border-green-500/30 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <CircleDollarSign className="mr-3 h-6 w-6 text-green-400" />
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
                  <td className="text-center py-3 px-4 font-mono text-green-300">$850-1,000/kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$12,750-15,000</td>
                  <td className="text-center py-3 px-4 text-gray-400 text-xs">CARE/FERA/Disadvantaged Community</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-semibold">Equity Resiliency</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$850-1,000/kWh</td>
                  <td className="text-center py-3 px-4 font-mono text-green-300">$12,750-15,000</td>
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
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
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

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 text-green-400" />
              Incentives & Net Cost
            </h3>
            <div className="space-y-3 text-sm">
              <h4 className="text-green-400 font-semibold">Available Incentives:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Federal ITC (30%):</span>
                  <span className="text-green-300 font-mono">-$5,700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SGIP General Market:</span>
                  <span className="text-green-300 font-mono">-$3,800</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-700 pt-2">
                  <span className="text-white">Net Cost After Incentives:</span>
                  <span className="text-green-400 font-mono">$9,500</span>
                </div>
              </div>

              <h4 className="text-green-400 font-semibold mt-4">Monthly Savings:</h4>
              <div className="bg-green-900/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">TOU Arbitrage:</span>
                  <span className="text-green-300 font-mono">$180/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Demand Reduction:</span>
                  <span className="text-green-300 font-mono">$45/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VPP Revenue:</span>
                  <span className="text-green-300 font-mono">$20/mo</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-green-500/30 pt-2">
                  <span className="text-green-400">Total Monthly Savings:</span>
                  <span className="text-green-400 font-mono">$245/mo</span>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-semibold">Simple Payback:</span>
                  <span className="text-2xl font-bold text-blue-300">3.2 years</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-400 font-semibold">10-Year ROI:</span>
                  <span className="text-2xl font-bold text-green-400">209%</span>
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
              >
                Get Free Battery Sizing Analysis
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 rounded-lg"
                onClick={() => window.location.href = 'tel:5302260701'}
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