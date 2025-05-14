import React from 'react';
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const ProductPerformanceSection = () => {
  return (
    <section 
      className="py-32 relative"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/60" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        {/* Premium Enterprise Main Heading Section */}
        <div className="text-center mb-24">
          <div className="relative group mx-auto max-w-4xl mb-10 inline-block transform transition-all duration-500">
            {/* Multiple layered background effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-red-600/40 to-amber-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-amber-500/80 to-red-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-12 px-12 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* Subtle dots and squares pattern background in burnt orange - increased opacity for visibility */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effect - positioned away from text */}
              <div className="absolute -top-60 -right-40 w-80 h-80 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
              
              {/* Corner accent with gradient - top-right corner only */}
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
              
              {/* Premium badge with consistent styling at the top center */}
              <div className="relative z-30 -mt-2 mb-6 flex justify-center">
                <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium">Verified Performance</span>
                </div>
              </div>
              
              {/* Shimmer heading */}
              <div className="relative z-10 mb-8 px-6 py-2 overflow-hidden">
                {/* Animated glow behind text */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-orange-500/20 to-red-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                
                {/* Heading with enhanced enterprise styling and shadows */}
                <div className="shimmer-fire-text font-bold text-5xl tracking-tight relative z-10">
                  {/* Background glow for letter definition */}
                  <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                    Product Performance Data
                  </div>
                  
                  {/* Main text with premium gradient - moved up 0.25 inch - reduced glow/shadow effects */}
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                    transform -translate-y-[0.25in]">
                    Product Performance Data
                  </span>
                  
                  {/* Top glossy reflection */}
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                </div>
                
                {/* Multiple text shadows for depth - reduced blur effects */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                  Product Performance Data
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                  Product Performance Data
                </div>
                
                {/* Positioned cool glowing decorative accent line under the P extending on hover - moved down 0.5 inch */}
                <div className="absolute left-[8%] bottom-[-0.5in] transform group w-14 h-2.5 rounded-full overflow-hidden z-50 transition-all duration-700 hover:w-72">
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 blur-md opacity-70"></div>
                  
                  {/* Pulsing dots */}
                  <div className="absolute h-full w-4 bg-white/80 right-4 rounded-full blur-[1px] animate-pulse-slow"></div>
                  <div className="absolute h-full w-3 bg-white/80 right-24 rounded-full blur-[1px] animate-pulse-slow-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>
              </div>
              
              {/* Enhanced description */}
              <p className="text-gray-200 text-xl max-w-2xl mx-auto relative">
                {/* Left accent - animated pulse - longer and moved to top */}
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                
                Our protective coatings are rigorously tested and proven to deliver exceptional performance across a range of metrics.
                
                {/* Right accent - animated pulse with delay - longer and moved to top */}
                <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
              </p>
              
              {/* Move blue/orange gradient square to top left corner instead of bottom left */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20 z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-tl-xl blur-[2px]"></div>
              </div>
              
              {/* Subtle animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 rounded-xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 -translate-x-full animate-shimmer-slow transform rounded-xl overflow-hidden"></div>
            </div>
            
            {/* Bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-32">
          {/* Premium Enterprise Stat Card 1 - Mixed Theme */}
          <div className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10 min-h-[350px]">
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col items-center justify-center">
              {/* Premium gradient border effect - Mixed variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow that activates on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                  style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Statistic with enhanced styling */}
                <div className="relative mb-6">
                  {/* Background glow effect */}
                  <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 blur-[30px]"></div>
                  </div>
                  
                  {/* Statistic text with premium styling */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-blue-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] group-hover:scale-110 transform transition-transform duration-500">
                    99%
                  </div>
                </div>
                
                {/* Title with animated underline */}
                <div className="relative mb-4">
                  <GradientHeading level={3} className="text-2xl md:text-3xl" variant="mixed">
                    Reflectivity Retention
                  </GradientHeading>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-400 group-hover:w-3/4 transition-all duration-700 rounded-full opacity-70"></div>
                </div>
                
                {/* Description with transition effect */}
                <p className="text-gray-300 text-lg transition-colors duration-500 group-hover:text-gray-200">
                  Only 1% reflectivity loss after 3 years compared to 10-20% for competing products, providing long-lasting thermal performance
                </p>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent rounded-full blur-sm"></div>
          </div>
          
          {/* Premium Enterprise Stat Card 2 - Fire Theme */}
          <div className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10 min-h-[350px]">
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col items-center justify-center">
              {/* Premium gradient border effect - Fire variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow that activates on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                  style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, transparent 70%)" }}>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Statistic with enhanced styling */}
                <div className="relative mb-6">
                  {/* Background glow effect */}
                  <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 blur-[30px]"></div>
                  </div>
                  
                  {/* Statistic text with premium styling */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] group-hover:scale-110 transform transition-transform duration-500">
                    30+
                  </div>
                </div>
                
                {/* Title with animated underline */}
                <div className="relative mb-4">
                  <GradientHeading level={3} className="text-2xl md:text-3xl" variant="fire">
                    Years Durability
                  </GradientHeading>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-3/4 transition-all duration-700 rounded-full opacity-70"></div>
                </div>
                
                {/* Description with transition effect */}
                <p className="text-gray-300 text-lg transition-colors duration-500 group-hover:text-gray-200">
                  Original 1989 applications showed no deterioration or performance loss when inspected 30 years later in 2019
                </p>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
          </div>
          
          {/* Premium Enterprise Stat Card 3 - Blue Theme */}
          <div className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10 min-h-[350px]">
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col items-center justify-center">
              {/* Premium gradient border effect - Blue variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-blue-500/50 via-transparent to-cyan-400/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow that activates on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                  style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.4) 0%, transparent 70%)" }}>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Statistic with enhanced styling */}
                <div className="relative mb-6">
                  {/* Background glow effect */}
                  <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-[30px]"></div>
                  </div>
                  
                  {/* Statistic text with premium styling */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)] group-hover:scale-110 transform transition-transform duration-500">
                    87%
                  </div>
                </div>
                
                {/* Title with animated underline */}
                <div className="relative mb-4">
                  <GradientHeading level={3} className="text-2xl md:text-3xl" variant="blue">
                    Maximum Energy Savings
                  </GradientHeading>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-3/4 transition-all duration-700 rounded-full opacity-70"></div>
                </div>
                
                {/* Description with transition effect */}
                <p className="text-gray-300 text-lg transition-colors duration-500 group-hover:text-gray-200">
                  Sony Koda facility energy consumption reduced from 3,767 KW to just 519 KW with 1.06 year payback period
                </p>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-full blur-sm"></div>
          </div>
          
          {/* Premium Enterprise Stat Card 4 - Fire Theme */}
          <div className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10 min-h-[350px]">
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col items-center justify-center">
              {/* Premium gradient border effect - Fire variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow that activates on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                  style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, transparent 70%)" }}>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Statistic with enhanced styling */}
                <div className="relative mb-6">
                  {/* Background glow effect */}
                  <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 blur-[30px]"></div>
                  </div>
                  
                  {/* Statistic text with premium styling */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] group-hover:scale-110 transform transition-transform duration-500">
                    0/100
                  </div>
                </div>
                
                {/* Title with animated underline */}
                <div className="relative mb-4">
                  <GradientHeading level={3} className="text-2xl md:text-3xl" variant="fire">
                    Perfect Fire Rating
                  </GradientHeading>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-3/4 transition-all duration-700 rounded-full opacity-70"></div>
                </div>
                
                {/* Description with transition effect */}
                <p className="text-gray-300 text-lg transition-colors duration-500 group-hover:text-gray-200">
                  Perfect scores in ASTM E84 testing for both Flame Spread Index and Smoke Development Index - the highest possible Class A classification
                </p>
              </div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
          </div>
        </div>
        
        {/* Premium Enterprise Card - NASA-Grade Section */}
        <div className="relative group">
          {/* Premium Enterprise Container */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-14 md:p-20 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 transform hover:scale-[1.01] transition-transform duration-500">
            {/* Premium gradient border effect - Mixed variant */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
            
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000 ease-in-out" 
                style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Enhanced Premium Heading Container */}
              <div className="text-center mb-14 relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent blur-xl"></div>
                
                {/* NASA Testing badge with consistent styling */}
                <div className="mb-4 inline-flex">
                  <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span className="text-sm font-medium">NASA-Grade Testing</span>
                  </div>
                </div>
                
                <GradientHeading level={2} className="text-3xl md:text-4xl lg:text-5xl mb-6" variant="mixed">NASA-Grade Testing Protocols</GradientHeading>
                <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  Our triple-component system utilizes vacuum-filled ceramic microspheres in a water-based acrylic elastomeric polymer with 156% elongation capability. This advanced ceramic technology provides exceptional thermal insulation properties and fire resistance across a wide range of applications.
                </p>
              </div>
              
              {/* Enhanced Content Grid */}
              <div className="grid md:grid-cols-2 gap-16">
                {/* Testing Protocols Side */}
                <div>
                  <div className="space-y-10">
                    {/* Protocol Item 1 - Fire Testing */}
                    <div className="group/item relative hover:z-10 transform transition-all duration-500 hover:scale-[1.02] rounded-xl p-6 hover:bg-gradient-to-r hover:from-red-900/10 hover:via-transparent hover:to-red-700/10">
                      <div className="flex items-start gap-6">
                        {/* Enhanced Icon Container */}
                        <div className="relative flex-shrink-0">
                          {/* Premium Icon Container */}
                          <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover/item:scale-110 transition-transform duration-500">
                            {/* Premium gradient border effect - Fire variant */}
                            <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/60 via-red-500/60 to-red-600/60 opacity-70"></div>
                            
                            {/* Inner highlight */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(251,113,36,0.6)]"></div>
                            
                            {/* Icon */}
                            <i className="fas fa-fire text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 text-2xl relative z-10"></i>
                          </div>
                          
                          {/* Bottom reflection */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                        </div>
                        
                        {/* Enhanced Content */}
                        <div>
                          <div className="relative mb-3 pb-2">
                            <h4 className="font-semibold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">ASTM E84 Fire Testing</h4>
                            
                            {/* Animated underline */}
                            <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover/item:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                          </div>
                          <p className="text-lg text-gray-300 group-hover/item:text-gray-200 transition-colors duration-500">Perfect Class A ratings with 0/100 scores for both Flame Spread Index and Smoke Development Index, verified by NASA, UL, and Factory Mutual. Competing ceramic coatings only achieve Class B-C ratings (25-75/100).</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Protocol Item 2 - Heat Tests */}
                    <div className="group/item relative hover:z-10 transform transition-all duration-500 hover:scale-[1.02] rounded-xl p-6 hover:bg-gradient-to-r hover:from-orange-900/10 hover:via-transparent hover:to-amber-700/10">
                      <div className="flex items-start gap-6">
                        {/* Enhanced Icon Container */}
                        <div className="relative flex-shrink-0">
                          {/* Premium Icon Container */}
                          <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover/item:scale-110 transition-transform duration-500">
                            {/* Premium gradient border effect - Heat variant */}
                            <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-600/60 via-amber-500/60 to-orange-500/60 opacity-70"></div>
                            
                            {/* Inner highlight */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(251,191,36,0.6)]"></div>
                            
                            {/* Icon */}
                            <i className="fas fa-temperature-high text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 text-2xl relative z-10"></i>
                          </div>
                          
                          {/* Bottom reflection */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                        </div>
                        
                        {/* Enhanced Content */}
                        <div>
                          <div className="relative mb-3 pb-2">
                            <h4 className="font-semibold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Extreme Heat Differential Tests</h4>
                            
                            {/* Animated underline */}
                            <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover/item:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                          </div>
                          <p className="text-lg text-gray-300 group-hover/item:text-gray-200 transition-colors duration-500">Advanced ceramic microspheres create physical impossibility for heat traversal through vacuum spaces. 5-6 coats (30 mils) on 1/4 inch steel withstand 1550°F (843°C) for 25+ minutes, significantly outperforming conventional systems.</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Protocol Item 3 - Solar Reflectance */}
                    <div className="group/item relative hover:z-10 transform transition-all duration-500 hover:scale-[1.02] rounded-xl p-6 hover:bg-gradient-to-r hover:from-blue-900/10 hover:via-transparent hover:to-cyan-700/10">
                      <div className="flex items-start gap-6">
                        {/* Enhanced Icon Container */}
                        <div className="relative flex-shrink-0">
                          {/* Premium Icon Container */}
                          <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-full p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover/item:scale-110 transition-transform duration-500">
                            {/* Premium gradient border effect - Blue variant */}
                            <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-blue-500/60 via-cyan-400/60 to-blue-400/60 opacity-70"></div>
                            
                            {/* Inner highlight */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                            
                            {/* Icon */}
                            <i className="fas fa-sun text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-2xl relative z-10"></i>
                          </div>
                          
                          {/* Bottom reflection */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                        </div>
                        
                        {/* Enhanced Content */}
                        <div>
                          <div className="relative mb-3 pb-2">
                            <h4 className="font-semibold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Solar Reflectance Testing</h4>
                            
                            {/* Animated underline */}
                            <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/item:w-1/2 transition-all duration-700 rounded-full opacity-70"></div>
                          </div>
                          <p className="text-lg text-gray-300 group-hover/item:text-gray-200 transition-colors duration-500">Titanium Dioxide reflective technology verified by Cool Roof Rating Council with 89% reflection and 89% thermal emittance. Blocks 95% of solar radiation with only 1% degradation over 3 years compared to 10-20% degradation in competing products.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product Comparison Chart Side */}
                <div className="relative">
                  {/* Enhanced Premium Heading with animated underline */}
                  <div className="relative mb-8 pb-3">
                    <GradientHeading level={3} className="text-3xl" variant="fire">
                      Product Comparison Chart
                    </GradientHeading>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-1/2 transition-all duration-1000 rounded-full opacity-70"></div>
                  </div>
                  
                  {/* Enhanced Premium Table Container */}
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.3)] z-10">
                    {/* Premium subtle border effect */}
                    <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/40 via-transparent to-red-500/40 opacity-60"></div>
                    
                    {/* Inner highlight */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                    
                    {/* Enhanced Table */}
                    <div className="overflow-x-auto relative z-10">
                      <table className="w-full text-lg">
                        <thead>
                          <tr className="border-b border-gray-600/30">
                            <th className="text-left py-6 px-6 text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Performance Metric</th>
                            <th className="text-center py-6 px-6 text-xl text-gray-400">Industry Standard</th>
                            <th className="text-center py-6 px-6 text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-500">Praetorian</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Enhanced Row 1 */}
                          <tr className="border-b border-gray-600/30 group/row hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-colors duration-300">
                            <td className="py-5 px-6 font-medium group-hover/row:text-gray-200 transition-colors duration-300">Fire Rating (ASTM E84)</td>
                            <td className="text-center py-5 px-6 text-gray-400 group-hover/row:text-gray-300 transition-colors duration-300">Class B-C (25-75/100)</td>
                            <td className="text-center py-5 px-6 font-semibold text-xl group-hover/row:scale-105 transform transition-transform duration-300">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                Class A (0/100)
                              </span>
                            </td>
                          </tr>
                          
                          {/* Enhanced Row 2 */}
                          <tr className="border-b border-gray-600/30 group/row hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-colors duration-300">
                            <td className="py-5 px-6 font-medium group-hover/row:text-gray-200 transition-colors duration-300">Solar Reflection</td>
                            <td className="text-center py-5 px-6 text-gray-400 group-hover/row:text-gray-300 transition-colors duration-300">70-80%</td>
                            <td className="text-center py-5 px-6 font-semibold text-xl group-hover/row:scale-105 transform transition-transform duration-300">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                89%
                              </span>
                            </td>
                          </tr>
                          
                          {/* Enhanced Row 3 */}
                          <tr className="border-b border-gray-600/30 group/row hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-colors duration-300">
                            <td className="py-5 px-6 font-medium group-hover/row:text-gray-200 transition-colors duration-300">Thermal Emittance</td>
                            <td className="text-center py-5 px-6 text-gray-400 group-hover/row:text-gray-300 transition-colors duration-300">70-80%</td>
                            <td className="text-center py-5 px-6 font-semibold text-xl group-hover/row:scale-105 transform transition-transform duration-300">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                89%
                              </span>
                            </td>
                          </tr>
                          
                          {/* Enhanced Row 4 */}
                          <tr className="border-b border-gray-600/30 group/row hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-colors duration-300">
                            <td className="py-5 px-6 font-medium group-hover/row:text-gray-200 transition-colors duration-300">Elastomeric Elongation</td>
                            <td className="text-center py-5 px-6 text-gray-400 group-hover/row:text-gray-300 transition-colors duration-300">100%</td>
                            <td className="text-center py-5 px-6 font-semibold text-xl group-hover/row:scale-105 transform transition-transform duration-300">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                156%
                              </span>
                            </td>
                          </tr>
                          
                          {/* Enhanced Row 5 */}
                          <tr className="group/row hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-colors duration-300">
                            <td className="py-5 px-6 font-medium group-hover/row:text-gray-200 transition-colors duration-300">Heat Resistance</td>
                            <td className="text-center py-5 px-6 text-gray-400 group-hover/row:text-gray-300 transition-colors duration-300">500-900°F</td>
                            <td className="text-center py-5 px-6 font-semibold text-xl group-hover/row:scale-105 transform transition-transform duration-300">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                Advanced
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Subtle bottom reflection */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle bottom reflection */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductPerformanceSection;