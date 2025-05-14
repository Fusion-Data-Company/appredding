import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, HelpCircle, Sparkles, Shield, Info } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../../assets_dir/imageExports";

const ProductComparison = () => {
  const comparisons = [
    {
      feature: "Thermal Protection",
      praetorian: true,
      praetorianDetails: "0.00543 W/cm²/K thermal conductivity",
      competitors: "limited",
      competitorDetails: "0.231 W/cm²/K average thermal conductivity"
    },
    {
      feature: "Fire Resistance",
      praetorian: true,
      praetorianDetails: "Class A fire rating (0/0 scores)",
      competitors: "varies",
      competitorDetails: "Typically Class B or C fire rating"
    },
    {
      feature: "UV Reflection",
      praetorian: true,
      praetorianDetails: "89% UV reflection",
      competitors: "partial",
      competitorDetails: "40-60% UV reflection"
    },
    {
      feature: "Elastomeric Flexibility",
      praetorian: true,
      praetorianDetails: "156% elasticity",
      competitors: "limited",
      competitorDetails: "30-70% elasticity on average"
    },
    {
      feature: "Waterproofing",
      praetorian: true,
      praetorianDetails: "Complete waterproof seal",
      competitors: "partial",
      competitorDetails: "Water resistant but not fully waterproof"
    },
    {
      feature: "Mold & Mildew Resistance",
      praetorian: true,
      praetorianDetails: "Prevents all mold & mildew growth",
      competitors: "varies",
      competitorDetails: "Limited protection in many products"
    },
    {
      feature: "Marine Grade Certification",
      praetorian: true,
      praetorianDetails: "ABS Certification #MC-1372",
      competitors: false,
      competitorDetails: "Most lack marine certifications"
    },
    {
      feature: "Application Temperature Range",
      praetorian: true,
      praetorianDetails: "40°F to 120°F application range",
      competitors: "limited",
      competitorDetails: "50°F to 90°F typical range"
    },
    {
      feature: "VOC Compliance",
      praetorian: true,
      praetorianDetails: "< 50 g/L, exceeds all regulations",
      competitors: "varies",
      competitorDetails: "Many products at 100-250 g/L"
    },
    {
      feature: "NASA-derived Technology",
      praetorian: true,
      praetorianDetails: "Ceramic-based formula from space program research",
      competitors: false,
      competitorDetails: "Conventional chemical formulations"
    }
  ];

  // Helper function to render status indicators
  const renderStatus = (status: boolean | string) => {
    if (status === true) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (status === false) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    } else if (status === "limited" || status === "partial") {
      return <HelpCircle className="h-6 w-6 text-amber-500" />;
    } else if (status === "varies") {
      return <HelpCircle className="h-6 w-6 text-blue-500" />;
    }
    return null;
  };

  return (
    <section 
      className="py-16 relative z-10"
      style={{ 
        backgroundImage: `url(${PRAETORIAN_HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="flex justify-center mb-5">
          <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)]">
            <Shield className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-sm font-medium">Competitive Comparison</span>
          </div>
        </div>
        
        <div className="text-center mb-12">
          {/* Premium Enterprise-level heading container */}
          <div className="relative mx-auto max-w-4xl mb-8 inline-block">
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-8 px-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
              {/* Premium gradient border effect - Fire variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow */}
              <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-red-500/5 blur-[100px] rounded-full"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Elite enterprise styled heading */}
                <div className="relative mb-4">
                  {/* Top horizontal accent line with enhanced glow */}
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent rounded-full blur-sm"></span>
                  
                  <GradientHeading level={2} className="text-3xl md:text-4xl shimmer-fire-text" variant="fire">
                    How Praetorian Outperforms the Competition
                  </GradientHeading>
                  
                  {/* Bottom horizontal accent line with enhanced glow */}
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-red-400/50 to-transparent rounded-full blur-sm"></span>
                </div>
                
                <p className="text-gray-300 max-w-2xl mx-auto mt-8">
                  See why Praetorian's revolutionary ceramic technology delivers superior performance across all key metrics compared to traditional protective coatings.
                </p>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
        >
          {/* Headers - Premium Enterprise Styling */}
          <div className="grid grid-cols-12 gap-4 mb-6 relative">
            {/* Premium Card Container */}
            <div className="col-span-12 relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-6 px-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
              {/* Premium gradient border effect - Fire variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Content */}
              <div className="grid grid-cols-12 gap-4 items-center relative z-10">
                <div className="col-span-4 font-bold text-lg">
                  <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Feature</span>
                </div>
                <div className="col-span-4 font-bold text-center text-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 blur-[6px] opacity-60"></div>
                      <Sparkles className="h-5 w-5 text-amber-300 relative z-10" />
                    </div>
                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Praetorian</span>
                  </div>
                </div>
                <div className="col-span-4 font-bold text-center text-lg">
                  <span className="text-gray-400">Competitors</span>
                </div>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
          </div>

          {/* Comparison rows - Premium Enterprise Styling */}
          <div className="space-y-6">
            {comparisons.map((item, index) => (
              <div key={index} className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10">
                {/* Premium Card Container */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-5 px-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
                  {/* Premium gradient border effect - Fire variant with index-based opacity variation */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
                  
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                  
                  {/* Subtle ambient glow that activates on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                      style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3) 0%, transparent 70%)" }}>
                  </div>
                  
                  {/* Content with z-index to appear above effects */}
                  <div className="grid grid-cols-12 gap-4 items-center relative z-10">
                    {/* Feature name */}
                    <div className="col-span-12 md:col-span-4 font-medium text-base relative">
                      <span className="text-white group-hover:text-amber-200 transition-colors duration-300">
                        {item.feature}
                      </span>
                      {/* Subtle underline that appears on hover */}
                      <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-1/2 transition-all duration-700 opacity-60"></div>
                    </div>
                    
                    {/* Praetorian data */}
                    <div className="col-span-6 md:col-span-4">
                      <div className="flex flex-col items-center">
                        {/* Enhanced icon display */}
                        <div className="relative mb-3 transform group-hover:scale-110 transition-transform duration-500">
                          {/* Icon glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/30 to-green-600/30 blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Status icon */}
                          <div className="relative z-10">
                            {renderStatus(item.praetorian)}
                          </div>
                        </div>
                        
                        {/* Data with gradient text on hover */}
                        <p className="text-sm text-center text-amber-400/90 font-medium group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {item.praetorianDetails}
                        </p>
                      </div>
                    </div>
                    
                    {/* Competitors data */}
                    <div className="col-span-6 md:col-span-4">
                      <div className="flex flex-col items-center">
                        {/* Enhanced icon display */}
                        <div className="relative mb-3 transform group-hover:scale-110 transition-transform duration-500">
                          {/* Icon glow effect - different colors based on status */}
                          <div className={`absolute inset-0 rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                            item.competitors === false ? "bg-red-500/30" : 
                            item.competitors === true ? "bg-green-500/30" : 
                            "bg-amber-500/30"
                          }`}></div>
                          
                          {/* Status icon */}
                          <div className="relative z-10">
                            {renderStatus(item.competitors)}
                          </div>
                        </div>
                        
                        {/* Competitor data text */}
                        <p className="text-sm text-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {item.competitorDetails}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle bottom reflection */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          {/* Premium Enterprise Bottom Note */}
          <div className="relative inline-block">
            {/* Premium Note Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-4 px-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
              {/* Premium gradient border effect - Subtle variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/30 via-transparent to-red-500/30 opacity-60"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center">
                <div className="hidden md:block mr-3 relative">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-[10px] opacity-50"></div>
                  <Shield className="h-5 w-5 text-orange-400 relative z-10" />
                </div>
                <p className="text-sm text-gray-300">
                  Data based on independent laboratory testing comparing Praetorian SmartCoat to leading industry competitors.
                  Product performance may vary based on application methods and environmental conditions.
                </p>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;