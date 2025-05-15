import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";
import { PremiumBadge } from "@/components/ui/premium-badge";

const IntroSection = () => {
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
        minHeight: "100vh",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Main hero card with ultra-premium styling */}
          <div className="group relative transform transition-all duration-500 hover:scale-[1.01] mx-auto max-w-5xl mb-16">
            {/* Multiple layered background effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-14 px-10 md:px-16 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* Subtle dots and squares pattern background in mixed colors */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effects - positioned away from text */}
              <div className="absolute -top-80 -right-40 w-96 h-96 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-80 -left-40 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[150px] animate-pulse-slow"></div>
              
              {/* Corner accent with gradient - top-right corner */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-20 z-10">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
              </div>
              
              {/* Additional corner accent lines */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* NASA Premium badge with position handled directly in the component */}
              <div className="relative w-full">
                <PremiumBadge>
                  NASA TECHNOLOGY
                </PremiumBadge>
              </div>
            
              {/* Main title with enhanced visual effects */}
              <div className="relative mb-8 z-20">
                {/* Background glow animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow-delayed"></div>
                
                {/* Background blurred title - updated styling */}
                <div className="absolute inset-0 flex justify-center items-center text-6xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                  NASA-Derived Technology
                </div>
                
                {/* Main heading with improved z-index */}
                <div className="shimmer-fire-text font-bold text-4xl md:text-6xl tracking-tight relative z-10">
                  {/* Main text with white color - matching testimonials section */}
                  <span className="relative text-white
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                    NASA-Derived Ceramic Coating Technology
                  </span>
                </div>
                
                {/* Multiple text shadows for depth - reduced blur effects */}
                <div className="absolute inset-0 flex justify-center items-center text-4xl md:text-6xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                  NASA-Derived Ceramic Coating Technology
                </div>
                <div className="absolute inset-0 flex justify-center items-center text-4xl md:text-6xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                  NASA-Derived Ceramic Coating Technology
                </div>
                
                {/* Ambient light reflections */}
                <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
              </div>
              
              {/* Enhanced paragraph with animated accents and improved visibility */}
              <div className="relative z-20">
                <p className="text-gray-200 text-xl md:text-2xl max-w-3xl mx-auto font-medium relative">
                  {/* Left animated accent */}
                  <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-28 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                  
                  Revolutionary triple-component system with perfect Class A fire protection and superior thermal insulation using vacuum-filled ceramic microsphere technology.
                  
                  {/* Right animated accent */}
                  <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-28 bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
                </p>
                
                {/* Text shimmer animation on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 z-10"
                   style={{
                     background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                     backgroundSize: '200% 100%',
                     animation: 'shimmer 2s infinite'
                   }}>
                </div>
              </div>
              
              {/* Decorative horizontal line */}
              <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-70 group-hover:w-48 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
          </div>
          
          {/* Bottom reflection effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="relative mt-10 mb-16 max-w-4xl mx-auto">
            {/* Premium Enterprise-level paragraph styling */}
            {/* Multiple layered background effects for Elite Performance Metrics */}
            <div className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:z-10">
              {/* Mixed orange/blue background effects to match the hero section */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Main card container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10">
                {/* Subtle dots and squares pattern background in mixed colors */}
                <div className="absolute inset-0 opacity-25 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                </div>
                
                {/* Ambient glow effects - positioned away from text */}
                <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
                <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
                
                {/* Corner accent with gradient - top-right corner */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-10">
                  <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
                </div>
                
                {/* Additional corner accent lines - matching NASA card with blue accents */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Content with improved z-indices to ensure it appears above effects */}
                <div className="relative z-20">
                  {/* Premium card header with specialized styling */}
                  <div className="relative pb-4 mb-6">
                    {/* Animated glow behind heading with mixed colors */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow-delayed"></div>
                    
                    {/* Background blur text */}
                    <div className="absolute inset-0 flex justify-center items-center text-3xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 opacity-50">
                      Performance Metrics
                    </div>
                    
                    {/* Main text with premium gradient - matching mixed style - higher z-index to bring in front */}
                    <div className="shimmer-fire-text font-bold tracking-tight relative z-10">
                      <span className="text-2xl md:text-3xl mb-2 relative text-white
                        drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                        [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                        Elite Performance Metrics
                      </span>
                    </div>
                    
                    {/* Multiple text shadows for depth - reduced blur effects */}
                    <div className="absolute inset-0 flex justify-center items-center text-3xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                      Elite Performance Metrics
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center text-3xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                      Elite Performance Metrics
                    </div>
                    
                    {/* Animated underline with mixed-themed gradient */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-48 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                  </div>
                  
                  {/* Enhanced paragraph text with shimmer effect on hover */}
                  <div className="relative overflow-hidden">
                    <p className="text-gray-200 text-xl md:text-2xl font-medium relative z-20 transform group-hover:text-gray-200 transition-colors duration-700">
                      {/* Left accent - animated pulse - orange */}
                      <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-24 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                      
                      Perfect 0/100 scores in ASTM E84 fire testing with documented 87% energy savings. Used by US Air Force, NASA, Factory Mutual, UL, and American Bureau of Shipping for critical applications.
                      
                      {/* Right accent - animated pulse with delay - blue to match NASA card */}
                      <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-24 bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
                    </p>
                    
                    {/* Text shimmer animation on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 z-10"
                       style={{
                         background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                         backgroundSize: '200% 100%',
                         animation: 'shimmer 2s infinite'
                       }}>
                    </div>
                  </div>
                  
                  {/* Decorative horizontal line - matching NASA card */}
                  <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-70 group-hover:w-40 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
                </div>
              </div>
              
              {/* Subtle bottom reflection with dual-color gradient */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
            </div>
            
            {/* Subtle bottom reflection with dual-color gradient */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent rounded-full blur-sm"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
            {/* Card 1: Class A Fire Protection - Ultra Premium Enterprise Styling */}
            <div className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10 h-full min-h-[280px]">
              {/* Multiple layered background effects - Fire theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10 flex flex-col justify-between h-full">
                {/* Subtle dots and squares pattern background */}
                <div className="absolute inset-0 opacity-25 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                </div>
                
                {/* Ambient glow effects - positioned away from text */}
                <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
                <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-red-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
                
                {/* Additional corner accent lines - with fire theme */}
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
                
                {/* Content with improved z-indices to ensure it appears above effects */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Enhanced heading with subtle effects */}
                  <div className="relative pb-4 mb-4">
                    {/* Animated glow behind heading */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                    
                    {/* Background blur text */}
                    <div className="absolute inset-0 flex justify-start items-center text-3xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 opacity-50">
                      Fire Protection
                    </div>
                    
                    {/* Main heading with improved z-index */}
                    <div className="shimmer-fire-text font-bold tracking-tight relative z-10">
                      <span className="text-2xl md:text-3xl relative text-white
                        drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                        [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                        Class A Fire Protection
                      </span>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
                  </div>
                  
                  {/* Enhanced content text */}
                  <div className="relative flex-grow">
                    <p className="text-gray-200 text-lg md:text-xl relative z-20">
                      {/* Left accent - animated pulse */}
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                      
                      Perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development. Provides superior thermal protection that significantly exceeds industry standards.
                      
                      {/* Right accent - animated pulse with delay */}
                      <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
                    </p>
                  </div>
                  
                  {/* Decorative horizontal line */}
                  <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-orange-600 via-blue-500 to-orange-600 rounded-full opacity-70 group-hover:w-32 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
                </div>
              </div>
              
              {/* Subtle bottom reflection */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
            </div>
            
            {/* Card 2: Ceramic Microsphere Technology - Ultra Premium Enterprise Styling */}
            <div className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10 h-full min-h-[280px]">
              {/* Multiple layered background effects - Blue theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/40 via-cyan-600/40 to-blue-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/80 via-cyan-500/80 to-blue-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 border border-blue-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow duration-500 z-10 flex flex-col justify-between h-full">
                {/* Subtle dots and squares pattern background */}
                <div className="absolute inset-0 opacity-25 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                </div>
                
                {/* Ambient glow effects - positioned away from text */}
                <div className="absolute -top-40 -right-20 w-60 h-60 bg-blue-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
                <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
                
                {/* Additional corner accent lines - with blue theme */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Content with improved z-indices to ensure it appears above effects */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Enhanced heading with subtle effects */}
                  <div className="relative pb-4 mb-4">
                    {/* Animated glow behind heading */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/20 to-cyan-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                    
                    {/* Background blur text */}
                    <div className="absolute inset-0 flex justify-start items-center text-3xl font-bold tracking-tight text-blue-900/10 blur-[5px] scale-110 opacity-50">
                      Ceramic Technology
                    </div>
                    
                    {/* Main heading with improved z-index */}
                    <div className="shimmer-blue-text font-bold tracking-tight relative z-10">
                      <span className="text-2xl md:text-3xl relative text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500
                        drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                        [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                        Ceramic Microsphere Technology
                      </span>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(59,130,246,0.6)]"></div>
                  </div>
                  
                  {/* Enhanced content text */}
                  <div className="relative flex-grow">
                    <p className="text-gray-200 text-lg md:text-xl relative z-20">
                      {/* Left accent - animated pulse */}
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 rounded-full animate-pulse-slow z-20"></span>
                      
                      Vacuum-filled ceramic microspheres physically block heat transfer through all three heat transmission mechanisms — conduction, convection, and radiation — a feat unmatched by conventional insulation.
                      
                      {/* Right accent - animated pulse with delay */}
                      <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-cyan-500/0 via-cyan-500/70 to-cyan-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
                    </p>
                  </div>
                  
                  {/* Decorative horizontal line */}
                  <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 rounded-full opacity-70 group-hover:w-32 transition-all duration-1000 shadow-[0_0_5px_rgba(59,130,246,0.6)]"></div>
                </div>
              </div>
              
              {/* Subtle bottom reflection */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-full blur-sm"></div>
            </div>
            
            {/* Card 3: Extreme Energy Efficiency - Ultra Premium Enterprise Styling */}
            <div className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10 h-full min-h-[280px]">
              {/* Multiple layered background effects - Mixed theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10 flex flex-col justify-between h-full">
                {/* Subtle dots and squares pattern background */}
                <div className="absolute inset-0 opacity-25 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                </div>
                
                {/* Ambient glow effects - positioned away from text */}
                <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
                <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
                
                {/* Additional corner accent lines - with mixed theme */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Content with improved z-indices to ensure it appears above effects */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Enhanced heading with subtle effects */}
                  <div className="relative pb-4 mb-4">
                    {/* Animated glow behind heading */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                    
                    {/* Background blur text */}
                    <div className="absolute inset-0 flex justify-start items-center text-3xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 opacity-50">
                      Energy Efficiency
                    </div>
                    
                    {/* Main heading with improved z-index */}
                    <div className="shimmer-mixed-text font-bold tracking-tight relative z-10">
                      <span className="text-2xl md:text-3xl relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400
                        drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                        [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                        Extreme Energy Efficiency
                      </span>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                  </div>
                  
                  {/* Enhanced content text */}
                  <div className="relative flex-grow">
                    <p className="text-gray-200 text-lg md:text-xl relative z-20">
                      {/* Left accent - animated pulse - orange */}
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                      
                      Documented energy savings from 20-87% in real-world applications, with 89% solar reflection and 89% thermal emittance. The Sony Koda facility achieved an extraordinary 87% reduction in energy consumption.
                      
                      {/* Right accent - animated pulse with delay - blue */}
                      <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
                    </p>
                  </div>
                  
                  {/* Decorative horizontal line */}
                  <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-70 group-hover:w-32 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                </div>
              </div>
              
              {/* Subtle bottom reflection */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;