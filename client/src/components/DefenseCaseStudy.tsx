import React from "react";
import { Shield, Activity, BadgeCheck, Zap, GaugeCircle, Flame, Droplets, CircleDollarSign, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: "blue" | "green" | "orange";
  percentage?: number;
}

const CaseStudyMetric: React.FC<CaseStudyMetricProps> = ({
  icon,
  label,
  value,
  subtext,
  color,
  percentage = 100
}) => {
  const colorVariants = {
    blue: {
      icon: "text-blue-400",
      value: "text-blue-300",
      bar: "from-blue-500 to-blue-300"
    },
    green: {
      icon: "text-green-400",
      value: "text-green-300",
      bar: "from-green-500 to-green-300"
    },
    orange: {
      icon: "text-orange-400",
      value: "text-orange-300",
      bar: "from-orange-500 to-orange-300"
    }
  };
  
  const colors = colorVariants[color];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm flex items-center">
          <div className={cn("h-4 w-4 mr-2", colors.icon)}>
            {icon}
          </div>
          {label}
        </span>
        <span className={cn("font-mono font-semibold", colors.value)}>{value}</span>
      </div>
      <div className="w-full bg-blue-950/60 rounded-full h-2">
        <div 
          className={cn("bg-gradient-to-r h-2 rounded-full", colors.bar)} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-blue-300 mt-1">
        <span>{subtext}</span>
      </div>
    </div>
  );
};

export const DefenseCaseStudy = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900/70 to-primary-950/80 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 max-w-5xl mx-auto shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-px rounded-full mb-6">
          <div className="bg-blue-900 rounded-full p-3">
            <Shield className="h-6 w-6 text-blue-300" />
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-2">
          CASE STUDY: Naval Research Forward Operating Base
        </h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="bg-blue-800/50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
            U.S. Defense Research
          </span>
          <span className="bg-blue-800/50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
            Classified Naval Installation
          </span>
          <span className="bg-blue-800/50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
            Completed 2019
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-7 gap-6">
        <div className="md:col-span-4">
          <p className="text-white mb-4">
            The Naval Research Laboratory faced several critical challenges at their forward operating installation:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
              <span className="text-white">Critical equipment vulnerability to thermal detection using long-range infrared cameras</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
              <span className="text-white">Temperature control issues with equipment housing reaching 140°F in direct sunlight</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
              <span className="text-white">Corrosion damage to sensitive equipment from high-salinity coastal environment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
              <span className="text-white">Energy costs of $490,000 annually for climate control in sensitive equipment areas</span>
            </li>
          </ul>
          
          <p className="text-white mb-4">
            After implementing PraetorianGuard™ NASA-derived ceramic coating systems in 2019, the classified assessment verified:
          </p>
          
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
              <span className="text-white">93% reduction in thermal signature as measured by FLIR (Forward-Looking Infrared) cameras</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
              <span className="text-white">Surface temperature reduction of 38°F with equipment housing maintaining 102°F maximum</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
              <span className="text-white">Zero corrosion degradation after 10,000+ hours of salt spray testing in specialized chambers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
              <span className="text-white">Energy cost reduction of 42% with annual savings of $205,800 for sensitive equipment areas</span>
            </li>
          </ul>
          
          <div className="mt-4 bg-blue-900/40 border-l-4 border-blue-400 rounded-r-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-serif text-white">
                "
              </div>
              <div>
                <h4 className="font-bold text-white">Commander Thomas Reeves</h4>
                <p className="text-sm text-blue-300">Naval Research Division Lead</p>
              </div>
            </div>
            <p className="italic text-blue-100 leading-relaxed">
              The PraetorianGuard™ ceramic system has significantly improved our operational security posture by reducing thermal signatures while simultaneously delivering superior corrosion protection in our harsh coastal environment. The energy savings alone justified the project investment.
            </p>
            <div className="mt-3 pt-3 border-t border-blue-600/30 flex justify-between items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
              <span className="text-xs text-blue-400">Classified Implementation</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 backdrop-blur-md rounded-xl border border-blue-500/30 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-900/20 p-4 border-b border-blue-500/30 flex justify-between items-center">
              <h4 className="text-blue-100 font-semibold text-lg flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-300" />
                Project Metrics
              </h4>
              <span className="bg-blue-800/50 text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-500/30">
                Classified Assessment
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <CaseStudyMetric
                  icon={<Zap size={16} />}
                  label="Thermal Signature Reduction"
                  value="93%"
                  subtext="Undetectable by standard FLIR systems at >800m"
                  color="blue"
                  percentage={93}
                />
                
                <CaseStudyMetric
                  icon={<GaugeCircle size={16} />}
                  label="Surface Temperature Reduction"
                  value="38°F"
                  subtext="From 140°F → 102°F max surface temperature"
                  color="green"
                  percentage={85}
                />
                
                <CaseStudyMetric
                  icon={<Flame size={16} />}
                  label="Fire Safety Rating"
                  value="Class A (0/0)"
                  subtext="Perfect score with zero flame spread"
                  color="orange"
                  percentage={100}
                />
                
                <CaseStudyMetric
                  icon={<Droplets size={16} />}
                  label="Salt Spray Resistance"
                  value="10,000+ hrs"
                  subtext="Zero corrosion in accelerated testing"
                  color="blue"
                  percentage={95}
                />
                
                <CaseStudyMetric
                  icon={<CircleDollarSign size={16} />}
                  label="Energy Cost Reduction"
                  value="42%"
                  subtext="$490,000 → $284,200 annually"
                  color="green"
                  percentage={42}
                />
              </div>
            
              <div className="mt-6 bg-blue-800/30 rounded-lg p-4 border border-blue-500/30">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-200">Return on Investment</span>
                  <span className="text-white font-bold">14 months</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-blue-200">Projected 20-Year Savings</span>
                  <span className="text-white font-bold">$4.12M</span>
                </div>
                
                <div className="pt-3 border-t border-blue-700/30 flex items-center justify-between">
                  <div className="flex items-center">
                    <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                    <span className="text-xs text-blue-200">Naval Research Certified</span>
                  </div>
                  <span className="text-xs font-mono text-blue-300">NRL-2019-1143</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 backdrop-blur-md rounded-xl border border-blue-500/30 overflow-hidden p-5">
            <h4 className="text-blue-100 font-semibold mb-3 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-300" />
              Implementation Timeline
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-3">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">1</div>
                  <div className="w-px h-full bg-blue-700/50 mt-1"></div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-200">Assessment & Planning</h5>
                  <p className="text-xs text-gray-400">3 weeks - Custom formulation for coastal conditions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-3">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">2</div>
                  <div className="w-px h-full bg-blue-700/50 mt-1"></div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-200">Surface Preparation</h5>
                  <p className="text-xs text-gray-400">5 days - Specialized cleaning and priming</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-3">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">3</div>
                  <div className="w-px h-full bg-blue-700/50 mt-1"></div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-200">Application</h5>
                  <p className="text-xs text-gray-400">12 days - Multi-layer system with strategic curing</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-3">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">4</div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-200">Validation Testing</h5>
                  <p className="text-xs text-gray-400">7 days - Thermal, environmental, and operational testing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefenseCaseStudy;