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
          <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)] relative z-50">
            <Shield className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-sm font-medium">Competitive Comparison</span>
          </div>
        </div>
        
        <div className="text-center mb-12">
          {/* Premium Enterprise-level heading container */}
          <div className="relative group mx-auto max-w-4xl mb-10 inline-block transform transition-all duration-500">
            {/* Multiple layered background effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-red-600/40 to-amber-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-amber-500/80 to-red-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-12 px-12 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* Subtle dots and squares pattern background in burnt orange */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effect - positioned away from text */}
              <div className="absolute -top-60 -right-40 w-80 h-80 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
              
              {/* Corner accent with gradient - top-right corner */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-10">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
              </div>
              
              {/* Additional corner accent lines */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Shimmer heading */}
              <div className="relative z-10 mb-8 px-6 py-2 overflow-hidden">
                {/* Animated glow behind text */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-orange-500/20 to-red-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                
                {/* Heading with enhanced enterprise styling and shadows */}
                <div className="shimmer-fire-text font-bold text-4xl tracking-tight relative z-10">
                  {/* Background glow for letter definition */}
                  <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                    How Praetorian Outperforms the Competition
                  </div>
                  
                  {/* Main text with premium gradient */}
                  <span className="relative z-20 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                    How Praetorian Outperforms the Competition
                  </span>
                  
                  {/* Top glossy reflection */}
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                </div>
                
                {/* Multiple text shadows for depth - reduced blur effects */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                  How Praetorian Outperforms the Competition
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                  How Praetorian Outperforms the Competition
                </div>
              </div>
              
              {/* Enhanced description */}
              <p className="text-gray-200 text-xl max-w-2xl mx-auto relative z-20">
                {/* Left accent - animated pulse */}
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                
                See why Praetorian's revolutionary ceramic technology delivers superior performance across all key metrics compared to traditional protective coatings.
                
                {/* Right accent - animated pulse with delay */}
                <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
              </p>
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
            {/* Premium Card Container with mixed orange/blue styling - matching the bottom card */}
            <div className="col-span-12 relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-6 px-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 border border-orange-500/30 group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* External glow effects - behind the card */}
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-600/30 via-blue-600/30 to-orange-600/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-pulse-slow"></div>
              
              {/* Subtle dots and squares pattern background for visible gray texture */}
              <div className="absolute inset-0 opacity-30 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjI1KSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
              </div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Ambient glow effects - positioned away from text - with blue/orange mixed glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
              
              {/* Corner accent lines - with mixed theme - exactly like the bottom card */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              
              {/* Content */}
              <div className="grid grid-cols-12 gap-4 items-center relative z-20">
                <div className="col-span-4 font-bold text-lg">
                  <span className="relative z-20 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)]">
                    Feature
                  </span>
                </div>
                <div className="col-span-4 font-bold text-center text-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 blur-[6px] opacity-60"></div>
                      <Sparkles className="h-5 w-5 text-amber-300 relative z-20" />
                    </div>
                    <span className="relative z-20 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)]">
                      Praetorian
                    </span>
                  </div>
                </div>
                <div className="col-span-4 font-bold text-center text-lg">
                  <span className="relative z-20 text-gray-300">Competitors</span>
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
                {/* Premium Card Container with full Specialized Application styling */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-5 px-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 border border-orange-500/30 overflow-hidden">
                  {/* External glow effects - behind the card */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-orange-600/30 via-blue-600/30 to-orange-600/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-pulse-slow"></div>
                  
                  {/* Subtle dots and squares pattern background for visible gray texture */}
                  <div className="absolute inset-0 opacity-30 z-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjI1KSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                  </div>
                  
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                  
                  {/* Ambient glow effects - mixed orange/blue */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
                  
                  {/* Corner accent lines - with mixed orange/blue theme */}
                  <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] border-orange-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-1 h-1 bg-orange-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-10">
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] border-blue-500/70 rounded-tr-lg"></div>
                    <div className="absolute top-0 right-0 w-1 h-1 bg-blue-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-10">
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] border-orange-500/70 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-orange-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-10">
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] border-blue-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  
                  {/* Subtle ambient glow that activates on hover - updated with mixed theme */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                      style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.2) 0%, rgba(251,113,36,0.2) 50%, transparent 80%)" }}>
                  </div>
                  
                  {/* Content with z-index to appear above effects */}
                  <div className="grid grid-cols-12 gap-4 items-center relative z-20">
                    {/* Feature name */}
                    <div className="col-span-12 md:col-span-4 font-medium text-base relative">
                      <span className="relative z-20 text-white group-hover:text-amber-200 transition-colors duration-300">
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
                          <div className="relative z-20">
                            {renderStatus(item.praetorian)}
                          </div>
                        </div>
                        
                        {/* Data with gradient text on hover */}
                        <p className="text-sm text-center text-amber-400/90 font-medium group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 relative z-20">
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
                          <div className="relative z-20">
                            {renderStatus(item.competitors)}
                          </div>
                        </div>
                        
                        {/* Competitor data text */}
                        <p className="text-sm text-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-20">
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
          {/* Premium Enterprise Bottom Note with Mixed Orange/Blue Theme */}
          <div className="relative group inline-block transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 hover:z-10">
            {/* Multiple layered background effects - Mixed theme */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-4 px-8 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* Subtle dots and squares pattern background for visible gray texture */}
              <div className="absolute inset-0 opacity-30 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjI1KSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
              </div>
              
              {/* Ambient glow effects - positioned away from text */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
              
              {/* Corner accent lines - with mixed theme */}
              <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1px] border-l-[1px] border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-4 h-4 border-t-[1px] border-r-[1px] border-blue-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1px] border-l-[1px] border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1px] border-r-[1px] border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              
              {/* Content with improved z-indices */}
              <div className="relative z-20 flex items-center">
                <div className="hidden md:block mr-3 relative">
                  {/* Icon with mixed glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-blue-500/30 blur-[10px] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Shield className="h-5 w-5 text-orange-400 relative z-20 group-hover:text-amber-300 transition-colors duration-300" />
                </div>
                <p className="text-sm text-gray-200 relative z-20 font-medium">
                  Data based on independent laboratory testing comparing Praetorian SmartCoat to leading industry competitors.
                  Product performance may vary based on application methods and environmental conditions.
                </p>
              </div>
              
              {/* Decorative horizontal line - matching NASA card */}
              <div className="absolute left-1/2 bottom-1 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-60 group-hover:w-1/4 transition-all duration-1000 shadow-[0_0_4px_rgba(251,113,36,0.4),_0_0_4px_rgba(59,130,246,0.4)]"></div>
            </div>
            
            {/* Subtle bottom reflection with dual-color gradient */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;