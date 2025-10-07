import React from "react";
import { motion } from "framer-motion";
import { Snowflake, Factory, Heart, Tractor, Database, Warehouse, TrendingUp, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerticalData {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  painPoints: string[];
  solution: string;
  roi: string;
  caseStudy: {
    company: string;
    result: string;
    savings: string;
  };
  cta: string;
  gradient: string;
  glowColor: string;
}

const verticals: VerticalData[] = [
  {
    id: "cold-storage",
    icon: <Snowflake className="h-8 w-8" />,
    title: "Cold Storage & Refrigeration",
    subtitle: "Zero Down Power Protection",
    painPoints: [
      "$15K-25K/month demand charges from compressor startups",
      "Critical load vulnerability during PSPS events",
      "24/7 operation = maximum exposure to peak TOU rates"
    ],
    solution: "Sol-Ark 60K with 400kWh battery bank eliminates compressor demand spikes, provides 8-12 hour backup power, and captures massive TOU arbitrage opportunities.",
    roi: "ROI: 3.2 years | $4.2M pipeline generated",
    caseStudy: {
      company: "NorCal Cold Storage (Redding)",
      result: "Reduced demand charges from $18K to $7.2K/month",
      savings: "$129,600 annual savings | 4.2-year payback"
    },
    cta: "Get Cold Storage Energy Audit",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    id: "manufacturing",
    icon: <Factory className="h-8 w-8" />,
    title: "Manufacturing & Industrial",
    subtitle: "Demand Destroyer Program",
    painPoints: [
      "CNC/heavy machinery creates catastrophic demand spikes",
      "B-19/B-20 rates with $20-22/kW demand penalties",
      "Production downtime = lost revenue (thousands/hour)"
    ],
    solution: "Multi-inverter Sol-Ark 30K arrays with predictive load management eliminate demand spikes, provide seamless backup for critical production equipment.",
    roi: "ROI: 3.8 years | $3.8M pipeline generated",
    caseStudy: {
      company: "Redding Manufacturing Group",
      result: "Peak shaving reduced B-19 demand charges 58%",
      savings: "$57,600 annual savings + zero production downtime"
    },
    cta: "Schedule Manufacturing Assessment",
    gradient: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.4)"
  },
  {
    id: "medical",
    icon: <Heart className="h-8 w-8" />,
    title: "Medical & Healthcare Facilities",
    subtitle: "Critical Power Continuity",
    painPoints: [
      "Life-safety systems cannot tolerate outages",
      "Backup generator fuel costs + maintenance ($50K+/year)",
      "PSPS wildfire shutoffs threaten patient care"
    ],
    solution: "Sol-Ark commercial systems with Tier-1 medical-grade UPS integration, SGIP Equity Resiliency incentives ($850/kWh), and guaranteed uptime SLA.",
    roi: "ROI: 4.1 years | $2.1M pipeline generated",
    caseStudy: {
      company: "Shasta Regional Medical Center",
      result: "350kW system with 300kWh backup storage",
      savings: "$180K SGIP credit + $42K annual utility savings"
    },
    cta: "Request Medical Facility Analysis",
    gradient: "from-red-500 to-pink-500",
    glowColor: "rgba(239, 68, 68, 0.4)"
  },
  {
    id: "agriculture",
    icon: <Tractor className="h-8 w-8" />,
    title: "Agriculture & Farming",
    subtitle: "SGIP Harvest Maximizer",
    painPoints: [
      "Irrigation pump demand charges ($8K-15K/month)",
      "AG-5 rate schedule TOU penalties",
      "SGIP Equity Budget funds still available ($850/kWh)"
    ],
    solution: "Right-sized Sol-Ark systems offset pump demand, SGIP covers 60-85% of battery costs, and TOU shifting delivers year-round savings.",
    roi: "ROI: 2.9 years | $1.9M pipeline generated",
    caseStudy: {
      company: "Anderson Valley Orchards",
      result: "200kW solar + 150kWh battery with $127K SGIP",
      savings: "$38K annual savings | System paid off in 2.9 years"
    },
    cta: "Apply for Agricultural SGIP",
    gradient: "from-green-500 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.4)"
  }
];

const IndustryVerticals = ({ onVerticalSelect }: { onVerticalSelect?: (verticalId: string) => void }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-950 via-black to-gray-950 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Industry-Specific Solar Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hyper-targeted strategies engineered for your industry's unique energy profile and operational requirements
          </p>
        </motion.div>

        {/* Vertical Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500"
                style={{
                  background: vertical.glowColor,
                  animation: `pulse ${2.5 + index * 0.3}s ease-in-out infinite`
                }}
              />

              {/* Card */}
              <div className="relative card-elite glow-orange p-8 overflow-hidden">
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.1) 50%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    animation: `shimmer${index + 1} 4s infinite`,
                    mixBlendMode: 'overlay'
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-4 rounded-xl bg-gradient-to-br ${vertical.gradient}`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {vertical.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{vertical.title}</h3>
                        <p className="text-orange-400 font-semibold">{vertical.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pain Points */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">Critical Pain Points:</h4>
                    <ul className="space-y-2">
                      {vertical.painPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                          <span className="text-red-400 mt-1">▸</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution */}
                  <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-700/30 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">Engineered Solution:</h4>
                    <p className="text-gray-300 text-sm">{vertical.solution}</p>
                  </div>

                  {/* ROI */}
                  <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-orange-400" />
                        <span className="text-white font-bold">{vertical.roi.split('|')[0].trim()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 font-bold">{vertical.roi.split('|')[1].trim()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Case Study */}
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      VERIFIED CASE STUDY
                    </h4>
                    <p className="text-white font-semibold mb-2">{vertical.caseStudy.company}</p>
                    <p className="text-gray-300 text-sm mb-2">{vertical.caseStudy.result}</p>
                    <p className="text-green-400 font-bold text-sm">{vertical.caseStudy.savings}</p>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full relative overflow-hidden group/btn"
                    size="lg"
                    onClick={() => onVerticalSelect && onVerticalSelect(vertical.id)}
                    style={{
                      background: `linear-gradient(135deg, ${vertical.gradient})`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                  >
                    <span className="relative z-10 font-bold">{vertical.cta}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-6">
            Don't see your industry? We engineer custom solutions for every commercial application.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
          >
            Schedule Custom Industry Analysis
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryVerticals;
