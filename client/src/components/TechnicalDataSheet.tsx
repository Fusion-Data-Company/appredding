import React from "react";
import { Beaker, ShieldCheck, Thermometer, Gauge, Flame, Droplets, FlaskConical, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechnicalSpecCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  testMethod?: string;
  color: "blue" | "orange" | "green" | "purple";
  className?: string;
}

const colorVariants = {
  blue: {
    iconBg: "bg-blue-950 border-blue-700/50",
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
    valueBg: "bg-blue-900/40",
    valueColor: "text-blue-100",
    border: "border-blue-700/50",
    descBg: "bg-blue-900/20",
  },
  orange: {
    iconBg: "bg-orange-950 border-orange-700/50",
    iconColor: "text-orange-400",
    titleColor: "text-orange-300",
    valueBg: "bg-orange-900/40",
    valueColor: "text-orange-100",
    border: "border-orange-700/50",
    descBg: "bg-orange-900/20",
  },
  green: {
    iconBg: "bg-emerald-950 border-emerald-700/50",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-300",
    valueBg: "bg-emerald-900/40",
    valueColor: "text-emerald-100",
    border: "border-emerald-700/50",
    descBg: "bg-emerald-900/20",
  },
  purple: {
    iconBg: "bg-purple-950 border-purple-700/50",
    iconColor: "text-purple-400",
    titleColor: "text-purple-300",
    valueBg: "bg-purple-900/40",
    valueColor: "text-purple-100", 
    border: "border-purple-700/50",
    descBg: "bg-purple-900/20",
  }
};

const TechnicalSpecCard: React.FC<TechnicalSpecCardProps> = ({
  title,
  value,
  description,
  icon,
  testMethod,
  color,
  className,
}) => {
  const colors = colorVariants[color];
  
  return (
    <div className={cn(
      "rounded-xl overflow-hidden backdrop-blur-sm border bg-primary-950/50 shadow-lg flex flex-col transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl",
      colors.border,
      className
    )}>
      <div className="px-4 py-3 flex items-center border-b border-opacity-50 gap-3" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <div className={cn("p-2 rounded-lg border", colors.iconBg)}>
          <div className={colors.iconColor}>{icon}</div>
        </div>
        <h3 className={cn("font-medium", colors.titleColor)}>{title}</h3>
      </div>
      
      <div className={cn("px-4 py-5 flex flex-col items-center justify-center text-center", colors.valueBg)}>
        <div className={cn("text-2xl font-bold mb-1", colors.valueColor)}>{value}</div>
        {testMethod && (
          <div className="text-xs text-gray-400">{testMethod}</div>
        )}
      </div>
      
      <div className={cn("p-3 text-sm text-gray-300 flex-grow", colors.descBg)}>
        {description}
      </div>
    </div>
  );
};

export const TechnicalDataSheet = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
          NASA Ceramic Technology Specifications
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Documented performance metrics from independent laboratory testing of Praetorian Smart-Coat's NASA-derived ceramic coating technology (Patent #10,738,214)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TechnicalSpecCard
          title="Fire Rating"
          value="Class A (0/0)"
          testMethod="ASTM E84"
          description="Perfect score with zero flame spread and zero smoke development. Self-extinguishing with no fuel contribution under direct flame exposure."
          icon={<Flame size={20} />}
          color="orange"
        />
        
        <TechnicalSpecCard
          title="UV Reflection"
          value="89%"
          testMethod="ASTM D6695"
          description="Reflects 89% of ultraviolet radiation, preventing surface degradation and significantly reducing solar heat gain on building exteriors."
          icon={<ShieldCheck size={20} />}
          color="blue"
        />
        
        <TechnicalSpecCard
          title="Thermal Emittance"
          value="89%"
          testMethod="ASTM C1371"
          description="High thermal emittance prevents heat buildup by efficiently releasing absorbed heat, keeping surfaces cooler under solar exposure."
          icon={<Thermometer size={20} />}
          color="green"
        />
        
        <TechnicalSpecCard
          title="Elastomeric Flexibility"
          value="156%"
          testMethod="ASTM D2370"
          description="Superior elasticity allows coating to expand and contract with structural movement without cracking or delamination, even in extreme temperature variations."
          icon={<Gauge size={20} />}
          color="purple"
        />
        
        <TechnicalSpecCard
          title="Temperature Reduction"
          value="30-40°F"
          testMethod="Field Testing"
          description="Reduces surface temperatures by 30-40°F compared to uncoated surfaces under identical conditions, significantly improving thermal comfort and energy efficiency."
          icon={<Thermometer size={20} />}
          color="blue"
        />
        
        <TechnicalSpecCard
          title="Water Resistance"
          value="100%"
          testMethod="ASTM D7088"
          description="Creates a waterproof membrane that prevents water intrusion while still allowing moisture vapor transmission, preventing trapped moisture damage."
          icon={<Droplets size={20} />}
          color="green"
        />
        
        <TechnicalSpecCard
          title="Thermal Conductivity"
          value="0.00543 W/cm²/K"
          testMethod="ASTM C518 Modified"
          description="Extremely low thermal conductivity due to ceramic microsphere technology, creating an effective thermal barrier that blocks heat transfer."
          icon={<Beaker size={20} />}
          color="orange"
        />
        
        <TechnicalSpecCard
          title="Sound Reduction"
          value="50% Average"
          testMethod="ASTM E90 & E413"
          description="Ceramic microspheres absorb and disperse sound energy, significantly reducing noise transmission through treated surfaces."
          icon={<FlaskConical size={20} />}
          color="purple"
        />
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900/40 to-primary-900/60 rounded-xl p-6 border border-blue-700/30">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-blue-300">
            <Award className="h-5 w-5 text-blue-400" />
            Certifications & Compliance
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">ABS Certification #MC-1372</h4>
                <p className="text-sm text-gray-300">Certified for maritime and marine applications with verified corrosion protection</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">NSF/ANSI 61 Compliant</h4>
                <p className="text-sm text-gray-300">Certified safe for contact with potable water systems and drinking water infrastructure</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">UL 94 V-0 and 5VA</h4>
                <p className="text-sm text-gray-300">Self-extinguishing with no burn-through in composite systems under rigorous fire testing</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">ISO 14116 Compliant</h4>
                <p className="text-sm text-gray-300">Meets international standards for flame spread prevention, even after multiple wash cycles on coated fabrics</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-900/40 to-primary-900/60 rounded-xl p-6 border border-orange-700/30">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-orange-300">
            <Award className="h-5 w-5 text-orange-400" />
            Performance Validation
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">Extreme Temperature Resistance</h4>
                <p className="text-sm text-gray-300">Maintains integrity under direct flame (propane torch at 2700°F) for 20+ minutes with protected side reaching only ~306°F</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">Corrosion Resistance</h4>
                <p className="text-sm text-gray-300">Withstands 10,000+ hours of salt spray testing with zero degradation or substrate corrosion</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">Long-Term Field Performance</h4>
                <p className="text-sm text-gray-300">30+ year verified performance with zero maintenance required, based on actual installations from 1989 inspected in 2019</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="min-w-[20px] pt-1">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">Dielectric Properties</h4>
                <p className="text-sm text-gray-300">Non-conductive properties confirmed through military testing, providing electrical insulation and signature reduction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-8">
        <div className="inline-flex items-center px-5 py-2 rounded-lg border border-primary-700/50 bg-primary-900/30 text-sm text-gray-300">
          <ShieldCheck className="h-4 w-4 mr-2 text-primary-400" />
          <span>
            All specifications independently verified through laboratory testing and field validation
          </span>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDataSheet;