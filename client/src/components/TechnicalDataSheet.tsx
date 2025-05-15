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

// Enhanced TechnicalSpecCard with premium enterprise-level styling
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
  
  // Define custom gradient and glow colors based on card color variant
  const gradientBorder = 
    color === "orange" ? "from-orange-500/50 via-transparent to-red-500/50" :
    color === "blue" ? "from-blue-500/50 via-transparent to-cyan-400/50" :
    color === "green" ? "from-emerald-500/50 via-transparent to-teal-400/50" :
    "from-purple-500/50 via-transparent to-pink-400/50";
  
  const glowColor = 
    color === "orange" ? "rgba(251,113,36,0.4)" :
    color === "blue" ? "rgba(59,130,246,0.4)" :
    color === "green" ? "rgba(16,185,129,0.4)" :
    "rgba(168,85,247,0.4)";
    
  const valueGradient = 
    color === "orange" ? "from-orange-500 via-amber-400 to-orange-500" :
    color === "blue" ? "from-blue-500 via-cyan-400 to-blue-500" :
    color === "green" ? "from-emerald-500 via-teal-400 to-emerald-500" :
    "from-purple-500 via-pink-400 to-purple-500";
    
  return (
    <div className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10">
      {/* Card container with premium styling */}
      <div className={cn(
        "relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] flex flex-col h-full z-10",
        className
      )}>
        {/* Premium gradient border effect */}
        <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${gradientBorder} opacity-70`}></div>
        
        {/* Inner card highlight */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        
        {/* Subtle ambient glow that activates on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
             style={{ 
               background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
             }}>
        </div>
        
        {/* Header with enhanced icon styling */}
        <div className="px-4 py-3 flex items-center gap-3 relative z-10 border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
          {/* Enhanced icon container */}
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            {/* Icon background with gradient */}
            <div className={cn("p-2 rounded-lg border relative overflow-hidden", colors.iconBg)}>
              {/* Icon background gradient */}
              <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
              
              {/* Icon */}
              <div className={cn("relative z-10", colors.iconColor)}>{icon}</div>
            </div>
            
            {/* Animated concentric ring */}
            <div className="absolute inset-0 rounded-lg border border-white/20 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-[1.3] transition-all duration-700"></div>
          </div>
          
          {/* Title with enhanced styling */}
          <h3 className={cn("font-medium relative z-10", colors.titleColor)}>{title}</h3>
        </div>
        
        {/* Value section with premium styling */}
        <div className="relative px-4 py-6 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Background gradient for value section */}
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${valueGradient}`}></div>
          
          {/* Value with gradient text */}
          <div className={cn("relative z-10 text-3xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent", valueGradient)}>
            {value}
          </div>
          
          {/* Test method with subtle styling */}
          {testMethod && (
            <div className="relative z-10 text-xs text-gray-400 px-2 py-1 rounded-full border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
              {testMethod}
            </div>
          )}
        </div>
        
        {/* Description with enhanced styling */}
        <div className="relative p-4 text-sm text-gray-300 flex-grow z-10">
          {/* Subtle background gradient */}
          <div className={`absolute inset-0 opacity-5 bg-gradient-to-b ${valueGradient}`}></div>
          
          {/* Description text */}
          <p className="relative z-10">{description}</p>
        </div>
      </div>
      
      {/* Subtle bottom reflection */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-sm"></div>
    </div>
  );
};

export const TechnicalDataSheet = () => {
  return (
    <div className="space-y-10">
      <div className="relative">
        {/* Premium enterprise-level heading styling */}
        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-8 px-6 md:py-10 md:px-12 mx-auto max-w-4xl mb-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          {/* Premium gradient border effect */}
          <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-blue-500/30 to-orange-500/50 opacity-70"></div>
          
          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          
          {/* Subtle ambient glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-orange-500/10 blur-[100px] rounded-full"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-orange-300 via-white to-blue-300 bg-clip-text text-transparent">
              NASA Ceramic Technology Specifications
            </h2>
            <p className="text-gray-400 text-center mb-2 max-w-3xl mx-auto">
              Documented performance metrics from independent laboratory testing of Praetorian Smart-Coat's NASA-derived ceramic coating technology (Patent #10,738,214)
            </p>
          </div>
        </div>
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
        {/* Certifications Card - Premium Enterprise Styling */}
        <div className="group relative">
          {/* Premium Card Container */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-7 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 h-full">
            {/* Premium gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-blue-500/50 via-transparent to-cyan-400/50 opacity-70"></div>
            
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out rounded-xl" 
                style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.4) 0%, transparent 70%)" }}>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Enhanced section header */}
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-blue-700/30">
                <div className="relative group-hover:scale-105 transition-transform duration-500">
                  {/* Icon background with gradient */}
                  <div className="p-2 rounded-lg bg-blue-950 border border-blue-700/50 relative overflow-hidden">
                    {/* Icon background gradient */}
                    <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                    
                    {/* Icon */}
                    <Award className="h-5 w-5 text-blue-400 relative z-10" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Certifications & Compliance
                </h3>
              </div>
              
              {/* Enhanced list items */}
              <div className="space-y-5">
                {/* Item 1 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-blue-300 transition-colors duration-300">
                      ABS Certification #MC-1372
                    </h4>
                    <p className="text-sm text-gray-300">
                      Certified for maritime and marine applications with verified corrosion protection
                    </p>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-blue-300 transition-colors duration-300">
                      NSF/ANSI 61 Compliant
                    </h4>
                    <p className="text-sm text-gray-300">
                      Certified safe for contact with potable water systems and drinking water infrastructure
                    </p>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-blue-300 transition-colors duration-300">
                      UL 94 V-0 and 5VA
                    </h4>
                    <p className="text-sm text-gray-300">
                      Self-extinguishing with no burn-through in composite systems under rigorous fire testing
                    </p>
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-blue-300 transition-colors duration-300">
                      ISO 14116 Compliant
                    </h4>
                    <p className="text-sm text-gray-300">
                      Meets international standards for flame spread prevention, even after multiple wash cycles on coated fabrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle bottom reflection */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-sm"></div>
        </div>
        
        {/* Performance Validation Card - Premium Enterprise Styling */}
        <div className="group relative">
          {/* Premium Card Container */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-7 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 h-full">
            {/* Premium gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
            
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out rounded-xl" 
                style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, transparent 70%)" }}>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Enhanced section header */}
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-orange-700/30">
                <div className="relative group-hover:scale-105 transition-transform duration-500">
                  {/* Icon background with gradient */}
                  <div className="p-2 rounded-lg bg-orange-950 border border-orange-700/50 relative overflow-hidden">
                    {/* Icon background gradient */}
                    <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                    
                    {/* Icon */}
                    <Award className="h-5 w-5 text-orange-400 relative z-10" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                  Performance Validation
                </h3>
              </div>
              
              {/* Enhanced list items */}
              <div className="space-y-5">
                {/* Item 1 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-[0_0_8px_rgba(251,113,36,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-orange-300 transition-colors duration-300">
                      Extreme Temperature Resistance
                    </h4>
                    <p className="text-sm text-gray-300">
                      Maintains integrity under direct flame (propane torch at 2700°F) for 20+ minutes with protected side reaching only ~306°F
                    </p>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-[0_0_8px_rgba(251,113,36,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-orange-300 transition-colors duration-300">
                      Corrosion Resistance
                    </h4>
                    <p className="text-sm text-gray-300">
                      Withstands 10,000+ hours of salt spray testing with zero degradation or substrate corrosion
                    </p>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-[0_0_8px_rgba(251,113,36,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-orange-300 transition-colors duration-300">
                      Long-Term Field Performance
                    </h4>
                    <p className="text-sm text-gray-300">
                      30+ year verified performance with zero maintenance required, based on actual installations from 1989 inspected in 2019
                    </p>
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="flex items-start gap-3 group/item">
                  <div className="min-w-[28px] pt-1 relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-[0_0_8px_rgba(251,113,36,0.6)] group-hover/item:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover/item:text-orange-300 transition-colors duration-300">
                      Dielectric Properties
                    </h4>
                    <p className="text-sm text-gray-300">
                      Non-conductive properties confirmed through military testing, providing electrical insulation and signature reduction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle bottom reflection */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-sm"></div>
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