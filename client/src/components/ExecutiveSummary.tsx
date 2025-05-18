import React from "react";
import { Shield, Building, Bolt, CircleDollarSign, Droplets, Scale, Lightbulb, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "orange" | "green" | "purple";
  iconBg?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  iconBg = true,
  className
}) => {
  const colorVariants = {
    blue: {
      text: "text-blue-300",
      iconBg: "bg-gradient-to-r from-blue-900/50 to-blue-800/50",
      iconBorder: "border-blue-600/30",
      icon: "text-blue-400"
    },
    orange: {
      text: "text-orange-300",
      iconBg: "bg-gradient-to-r from-orange-900/50 to-orange-800/50",
      iconBorder: "border-orange-600/30",
      icon: "text-orange-400"
    },
    green: {
      text: "text-emerald-300",
      iconBg: "bg-gradient-to-r from-emerald-900/50 to-emerald-800/50",
      iconBorder: "border-emerald-600/30",
      icon: "text-emerald-400"
    },
    purple: {
      text: "text-purple-300",
      iconBg: "bg-gradient-to-r from-purple-900/50 to-purple-800/50",
      iconBorder: "border-purple-600/30",
      icon: "text-purple-400"
    }
  };
  
  const colors = colorVariants[color];
  
  return (
    <div className={cn(
      "bg-primary-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 p-5 flex items-start gap-4 hover:bg-primary-900/30 transition-colors duration-300",
      className
    )}>
      {iconBg ? (
        <div className={cn("p-3 rounded-lg border", colors.iconBg, colors.iconBorder)}>
          <div className={colors.icon}>{icon}</div>
        </div>
      ) : (
        <div className={colors.icon}>
          {icon}
        </div>
      )}
      
      <div>
        <h3 className={cn("text-lg font-semibold mb-1", colors.text)}>{title}</h3>
        <p className="text-white leading-relaxed">{value}</p>
      </div>
    </div>
  );
};

interface IndustryCardProps {
  title: string;
  points: string[];
  icon: React.ReactNode;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, points, icon }) => {
  return (
    <div className="bg-gradient-to-br from-primary-900/30 to-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-500/30 overflow-hidden">
      <div className="p-6 pb-4 flex items-center gap-4 border-b border-blue-500/20">
        <div className="bg-blue-900/50 p-2 rounded-full border border-blue-500/30 flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-blue-300">{title}</h3>
      </div>
      
      <div className="p-6">
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-400 text-lg leading-6 mt-0.5">•</span>
              <span className="text-white">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ExecutiveSummary = () => {
  const industries = [
    {
      title: "Infrastructure",
      points: [
        "Bridge Applications: Protection for concrete and metal surfaces",
        "Environmental Protection: Resists UV radiation and weather conditions",
        "Protects against salt and degradation in harsh environments"
      ],
      icon: <Building2 className="h-5 w-5 text-blue-400" />
    },
    {
      title: "Commercial Roofing",
      points: [
        "Surface temperature reduction of up to 30°F",
        "Reflective properties help maintain cooler roof surfaces",
        "Provides waterproofing and weather-resistant barrier"
      ],
      icon: <Building className="h-5 w-5 text-blue-400" />
    },
    {
      title: "Military & Government",
      points: [
        "Thermal protection for government facilities",
        "Durable protection in various climate conditions",
        "Fire protection for critical infrastructure"
      ],
      icon: <Shield className="h-5 w-5 text-blue-400" />
    },
    {
      title: "Agriculture",
      points: [
        "Temperature reduction for agricultural buildings",
        "Improved thermal comfort for livestock facilities",
        "Weather protection for barns and storage areas"
      ],
      icon: <Lightbulb className="h-5 w-5 text-blue-400" />
    },
    {
      title: "Marine",
      points: [
        "Provides corrosion resistance for marine applications",
        "Protection against saltwater exposure",
        "Weather protection for marine structures"
      ],
      icon: <Droplets className="h-5 w-5 text-blue-400" />
    },
    {
      title: "Residential Protection",
      points: [
        "Class A fire rating for exterior building surfaces",
        "Helps protect siding, decks, and eaves from ignition",
        "Can be pigmented to match home palettes"
      ],
      icon: <Scale className="h-5 w-5 text-blue-400" />
    }
  ];
  
  return (
    <div className="space-y-16">
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-orange-600 p-px rounded-xl mb-8">
          <div className="bg-primary-950 rounded-xl px-8 py-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-white to-orange-300 bg-clip-text text-transparent">
              Praetorian Smart-Coat
            </h2>
            <p className="text-gray-400 mt-2">
              The World's Most Advanced Ceramic Fireproof and Thermal Barrier Coating
            </p>
          </div>
        </div>
        
        <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-12">
          Praetorian Smart-Coat, evolved from the renowned Son-Shield system, is a multi-functional, ceramic-based protective coating engineered for fire defense, thermal regulation, corrosion resistance, and structural longevity. It is the only coating system with documented performance matching <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent font-semibold">NASA-verified insulation systems</span> while delivering ROI within 12-24 months.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Fire Rating"
          value="Class A (ASTM E108 / UL 790)"
          icon={<Bolt size={24} />}
          color="orange"
        />
        
        <StatCard
          title="Solar Reflection"
          value="85-92% (SRI)"
          icon={<Droplets size={24} />}
          color="blue"
        />
        
        <StatCard
          title="Thermal Emittance" 
          value="Water Vapor Permeability: 10-15 perms"
          icon={<Bolt size={24} />}
          color="green"
        />
        
        <StatCard
          title="Thermal Conductivity"
          value="0.05 - 0.07 W/m·K"
          icon={<Building size={24} />}
          color="purple"
        />
      </div>
      
      <div className="bg-gradient-to-r from-primary-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
          Financial Performance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-900/30 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
            <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-blue-400" />
              <span>10-Year ROI Model</span>
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Initial Cost:</span>
                  <span className="text-white font-mono">$30k-$50k</span>
                </div>
                <div className="h-1 w-full bg-blue-900/50 rounded-full">
                  <div className="h-1 w-[20%] bg-blue-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Energy Savings:</span>
                  <span className="text-white font-mono">$25k-$75k</span>
                </div>
                <div className="h-1 w-full bg-blue-900/50 rounded-full">
                  <div className="h-1 w-[60%] bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Maintenance:</span>
                  <span className="text-white font-mono">&lt;$10k</span>
                </div>
                <div className="h-1 w-full bg-blue-900/50 rounded-full">
                  <div className="h-1 w-[10%] bg-orange-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">vs $35k+ competitors</div>
              </div>
              
              <div className="pt-4 border-t border-blue-900/50">
                <div className="flex justify-between">
                  <span className="text-blue-300 font-semibold">Net ROI:</span>
                  <span className="text-green-300 font-mono font-bold">Up to $65k</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-900/30 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
            <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-blue-400" />
              <span>Payback Periods</span>
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Agriculture:</span>
                  <span className="text-green-300 font-mono">2-3 seasons</span>
                </div>
                <div className="h-2 w-full bg-blue-900/50 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-300" style={{width: "30%"}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Industrial:</span>
                  <span className="text-green-300 font-mono">1.2 years</span>
                </div>
                <div className="h-2 w-full bg-blue-900/50 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-300" style={{width: "25%"}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Commercial:</span>
                  <span className="text-green-300 font-mono">&lt;3 years</span>
                </div>
                <div className="h-2 w-full bg-blue-900/50 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-300" style={{width: "60%"}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-900/30 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
            <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span>Certifications</span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-white">UL, ASTM, ISO, KSF</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-blue-400"></div>
                <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent font-semibold">NASA flame tests</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-white">Energy Star Rated</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-white">ABS Marine Approved</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-white">Cool Roof Rating Council</span>
              </li>
            </ul>
            
            <div className="pt-4 mt-4 border-t border-blue-900/50">
              <div className="text-center">
                <div className="text-lg text-blue-300 font-semibold mb-1">Patent Protected</div>
                <div className="text-sm text-gray-400">#10,738,214</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
          Industry Applications
        </h3>
        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Praetorian Smart-Coat is currently applied across military, infrastructure, industrial, agricultural, and residential sectors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              title={industry.title}
              points={industry.points}
              icon={industry.icon}
            />
          ))}
        </div>
      </div>
      
      <div className="text-center py-6">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
          Guard What Matters
        </h3>
        <p className="text-white text-lg">
          Choose Praetorian Smart-Coat. The next generation of building armor.
        </p>
      </div>
    </div>
  );
};

export default ExecutiveSummary;