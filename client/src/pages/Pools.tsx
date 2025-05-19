import { useState } from 'react';
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Droplets, 
  CircleDollarSign, 
  AreaChart, 
  BarChart3, 
  BarChart2, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  Clock,
  FileText,
  AlertTriangle,
  ThermometerSun,
  Shield
} from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

interface CoatingProduct {
  name: string;
  coverage: number; // Coverage in sq ft per gallon
  price: number; // Price per gallon
}

interface CalculationResult {
  surfaceArea: number;
  gallonsNeeded: number;
  totalCost: number;
  productName: string;
  coatCount: number;
}

export default function Pools() {
  // State for calculator
  const [poolSurfaceArea, setPoolSurfaceArea] = useState<number>(500);
  const [selectedProduct, setSelectedProduct] = useState<string>("premium");
  const [coatCount, setCoatCount] = useState<number>(2);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  // Product data
  const products: Record<string, CoatingProduct> = {
    standard: {
      name: "Praetorian Standard",
      coverage: 250,
      price: 75.99
    },
    premium: {
      name: "Praetorian Premium",
      coverage: 200,
      price: 99.99
    },
    ultra: {
      name: "Praetorian Ultra Shield",
      coverage: 175,
      price: 129.99
    }
  };

  // Calculate results based on inputs
  const calculateResults = () => {
    if (poolSurfaceArea <= 0) {
      alert("Please enter a valid surface area");
      return;
    }
    
    const product = products[selectedProduct];
    const gallonsPerCoat = poolSurfaceArea / product.coverage;
    const totalGallons = gallonsPerCoat * coatCount;
    const totalCost = totalGallons * product.price;
    
    setCalculationResult({
      surfaceArea: poolSurfaceArea,
      gallonsNeeded: totalGallons,
      totalCost,
      productName: product.name,
      coatCount
    });
  };

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-0" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements */}
        <div className="fixed inset-0 z-0 opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-0 opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0) 70%)'
        }}></div>
        
        {/* Advanced multi-color ambient glow effects with green accent */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Blue glow */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          
          {/* Orange glow */}
          <div className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slower"></div>
          
          {/* Green accent glows for balance */}
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[30%] left-[20%] w-[30rem] h-[30rem] bg-green-700/5 rounded-full blur-[100px] animate-pulse-slower"></div>
          
          {/* Purple accent for depth */}
          <div className="absolute top-[70%] left-[50%] w-[20rem] h-[20rem] bg-purple-700/5 rounded-full blur-[90px] animate-pulse-slow"></div>
        </div>
        
        {/* Low-opacity subtle pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%232563eb\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Advanced ambient blue glow effects for header */}
              <div className="absolute -inset-10 bg-blue-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-blue-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Ultra-premium Elite Enterprise Header Container with 3D Effects */}
              <div className="relative rounded-2xl overflow-hidden transform transition-all duration-700 group hover:scale-[1.005] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] border border-blue-700/30">
                {/* Premium multi-layered background with depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-blue-900/30 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>
                
                {/* Ultra-premium header background with advanced pattern and dynamic overlay */}
                <div className="absolute inset-0 opacity-40 z-0 mix-blend-overlay" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    backgroundSize: '80px 80px'
                  }}
                ></div>
                
                {/* Subtle particle effect overlay */}
                <div className="absolute inset-0 mix-blend-overlay opacity-10 z-0" 
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 0.5%)",
                    backgroundSize: "8px 8px"
                  }}>
                </div>
                
                {/* Advanced animated light sweep effects with multiple layers */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] animate-light-sweep" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-blue-300/25 to-transparent skew-x-[-25deg] animate-light-sweep" style={{ animationDelay: '4s' }}></div>
                </div>
                
                {/* 3D edge highlight effect for depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                
                {/* Enhanced Header content with premium homepage-style styling */}
                <div className="relative z-20 p-10 flex flex-col items-center text-center">
                  {/* Complex ambient background glow effect */}
                  <div className="absolute -inset-10 bg-gradient-to-r from-blue-900/10 via-blue-700/20 to-blue-900/10 rounded-[40px] blur-[60px] opacity-80 -z-10"></div>
                  <div className="absolute -inset-20 bg-blue-500/5 rounded-[80px] blur-[100px] opacity-60 -z-10 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
                  
                  {/* Ultra-premium Elite Corner Accents with dynamic lighting effects */}
                  <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-md"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 left-1 w-18 h-18 border-t border-l border-blue-600/40 rounded-tl-lg"></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-md"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-400/70 rounded-tr-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 right-1 w-18 h-18 border-t border-r border-blue-600/40 rounded-tr-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-br-md"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/70 rounded-br-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 right-1 w-18 h-18 border-b border-r border-blue-600/40 rounded-br-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-400/70 rounded-bl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 left-1 w-18 h-18 border-b border-l border-blue-600/40 rounded-bl-lg"></div>
                  </div>
                  
                  <div>
                    <div className="mb-6 inline-block">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-lg opacity-70"></div>
                        <span className="relative inline-block px-4 py-1 rounded-full bg-gradient-to-r from-black/80 to-gray-900/80 border border-blue-500/40 text-sm font-semibold text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                          ADVANCED CERAMIC POOL TECHNOLOGY
                        </span>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                      Pool Deck Cooling & Protection System
                    </h1>
                    
                    <div className="mx-auto max-w-3xl mb-6">
                      <div className="h-[3px] w-full mx-auto bg-gradient-to-r from-transparent via-blue-500/70 to-transparent rounded-full"></div>
                    </div>
                    
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-6">
                      Revolutionary ceramic coating technology that creates cooler, more comfortable pool decks while delivering superior protection against UV damage, chemical erosion, and staining.
                    </p>
                    
                    <p className="text-md text-blue-200/80 max-w-2xl mx-auto">
                      Praetorian's advanced pool deck system reduces surface temperatures by up to 35°F, prevents damage from pool chemicals, and extends the life of concrete, stone, and decorative surfaces while maintaining a comfortable, slip-resistant surface for bare feet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 2: PAINS - RED GLOW */}
        <section className="relative z-10 py-6 overflow-hidden">
          <div className="container mx-auto">
            {/* Pain Points Section with Red Glow */}
            <div className="relative mb-10">
              {/* Enhanced multi-layered red glow with depth and animation */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 via-red-500/30 to-red-600/30 rounded-xl blur-md opacity-90"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-red-700/20 via-red-600/10 to-red-700/20 rounded-xl blur-xl opacity-70"></div>
              <div className="absolute -inset-6 bg-red-600/10 rounded-xl blur-2xl opacity-50 animate-pulse-slow"></div>
              
              <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/40 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="relative mr-3">
                    <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-md"></div>
                    <div className="relative h-7 w-7 rounded-full flex items-center justify-center bg-black">
                      <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 to-red-800/80 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                      <AlertTriangle className="w-3.5 h-3.5 text-red-100 relative z-10" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                    Is Your Pool Costing You Money and Comfort?
                  </h3>
                </div>
                
                <div className="space-y-6 md:space-y-4">
                  {/* Pain Point 1 */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                            <ThermometerSun className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Are scorching pool decks limiting enjoyment?</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Concrete and stone pool decks can reach temperatures of 140°F or more on summer days, making them unusable during peak hours and creating a safety hazard for bare feet. This heat also radiates into the pool water, driving up cooling costs for temperature-controlled pools and making the entire area uncomfortable.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pain Point 2 */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                            <Droplets className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Is chemical damage destroying your investment?</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Pool chemicals gradually erode concrete and stone surfaces, causing unsightly staining, cracking, and deterioration that can require costly repairs or complete resurfacing. Chlorine splash and salt systems are particularly damaging, with most pool decks showing significant deterioration within just 2-3 years of installation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pain Point 3 */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                            <CircleDollarSign className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Are maintenance costs draining your budget?</h3>
                        <p className="text-gray-300 leading-relaxed">
                          The average pool owner spends $4,200-$7,500 every 5-7 years on deck repairs, resurfacing, and maintenance - costs that could be avoided with proper protection. Traditional sealers break down quickly under UV exposure and chemical attack, requiring frequent reapplication and offering minimal temperature reduction benefits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            
        {/* SANDLER STAGE 3: SOLUTIONS + BENEFITS - GREEN GLOW */}
        <section className="relative z-10 py-6 overflow-hidden">
          <div className="container mx-auto">
            {/* Solutions Section with Green Glow */}
            <div className="relative mb-10">
              {/* Enhanced multi-layered green glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600/30 via-green-500/30 to-green-600/30 rounded-xl blur-md opacity-90"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-green-700/20 via-green-600/10 to-green-700/20 rounded-xl blur-xl opacity-70"></div>
              <div className="absolute -inset-6 bg-green-600/10 rounded-xl blur-2xl opacity-50 animate-pulse-slow"></div>
              
              <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="relative mr-3">
                    <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-md"></div>
                    <div className="relative h-7 w-7 rounded-full flex items-center justify-center bg-black">
                      <div className="absolute inset-0 bg-gradient-to-b from-green-600/80 to-green-800/80 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                      <CheckCircle className="w-3.5 h-3.5 text-green-100 relative z-10" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                    Praetorian Smart-Coat Pool Deck Solution
                  </h3>
                </div>
                
                <div className="space-y-6 md:space-y-4">
                  {/* Solution 1 */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/5 to-green-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                            <ThermometerSun className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Advanced Thermal Reduction Technology</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Praetorian's ceramic microsphere technology dramatically reduces surface temperatures by 30-35°F, making pool decks comfortable for bare feet even on the hottest days. Our coating creates millions of microscopic ceramic bubbles that reflect solar radiation rather than absorbing it, transforming hot, unusable decks into comfortable spaces your family can enjoy all day long.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Solution 2 */}
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/5 to-green-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                            <Shield className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Superior Chemical & UV Protection</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Our molecular-bonded coating creates an impenetrable barrier against chlorine, salt, acids, and other pool chemicals that normally damage concrete and stone. The flexible membrane moves with your substrate, preventing cracks and delamination while offering Class A UV protection that won't yellow, chalk, or break down like conventional sealers. This complete protection extends surface life by 15+ years.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Benefits List */}
                <div className="mt-6 p-5 bg-black/40 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-3">Key Benefits of Praetorian Pool Deck System:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Reduces surface temperatures by 30-35°F</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">100% chemical resistant coating</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">20+ year surface protection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
                
        {/* SANDLER STAGE 4: REGISTRATION / CLOSE - PURPLE GLOW */}
        <section className="relative z-10 py-6 overflow-hidden mb-20">
          <div className="container mx-auto">
            {/* Registration Form with Purple Ambient Glow */}
            <div className="relative">
              {/* Enhanced multi-layered purple glow with depth and animation */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-purple-600/30 rounded-xl blur-md opacity-90"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-700/20 via-purple-600/10 to-purple-700/20 rounded-xl blur-xl opacity-70"></div>
              <div className="absolute -inset-6 bg-purple-600/10 rounded-xl blur-2xl opacity-50 animate-pulse-slow"></div>
              
              <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-purple-500/40 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-200 mb-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                    Don't Delay – Limited Summer Installation Slots Available
                  </h3>
                  <p className="text-gray-300">
                    Start enjoying a cooler, more comfortable pool area this summer. Connect with a specialist today for a free evaluation and quote.
                  </p>
                </div>
                
                <form 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.info("[crm-ok] pools");
                    alert("Your information has been submitted. A Praetorian pool specialist will contact you shortly.");
                  }}
                >
                  <input type="hidden" name="industry" value="pools" />
                  
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Full Name*</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2 bg-gray-800/80 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Email Address*</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-2 bg-gray-800/80 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Phone Number*</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-2 bg-gray-800/80 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Property Type</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-800/80 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    >
                      <option value="residential">Residential Pool</option>
                      <option value="commercial">Commercial Pool</option>
                      <option value="hotel">Hotel/Resort</option>
                      <option value="public">Public Pool</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2 text-sm">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800/80 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      placeholder="Tell us about your pool and your needs..."
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <button 
                      type="submit"
                      className="relative group/button w-full py-3 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                    >
                      {/* Button glow effects */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-blue-600/30 to-purple-600/20 rounded-xl blur-xl opacity-70 group-hover/button:opacity-90 transition-opacity duration-500"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg blur-md opacity-60 group-hover/button:opacity-80 transition-opacity duration-300"></div>
                      
                      {/* Button content with premium styling */}
                      <div className="relative z-10 flex items-center justify-center">
                        {/* Multi-layered button background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 rounded-xl -z-[1] backdrop-blur-md border border-purple-500/50"></div>
                        
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-300" />
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white tracking-wide">
                            Request More Information
                          </span>
                        </div>
                        
                        {/* Premium light edge effects */}
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full -z-[1] group-hover:via-blue-300/80 transition-colors duration-300"></div>
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent rounded-full -z-[1] group-hover:via-purple-300/80 transition-colors duration-300"></div>
                        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-purple-400/40 to-transparent rounded-full -z-[1]"></div>
                        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent rounded-full -z-[1]"></div>
                        
                        {/* Ultra-premium corner accents */}
                        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-purple-500/70 rounded-tl-md -z-[1] group-hover:border-purple-400/90 transition-colors duration-300 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-500/70 rounded-tr-md -z-[1] group-hover:border-blue-400/90 transition-colors duration-300 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500/70 rounded-br-md -z-[1] group-hover:border-blue-400/90 transition-colors duration-300 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-purple-500/70 rounded-bl-md -z-[1] group-hover:border-purple-400/90 transition-colors duration-300 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                      </div>
                    </button>
                    
                    <p className="mt-3 text-sm text-gray-400 text-center">
                      By submitting this form, you agree to be contacted by a Praetorian specialist about our pool coating solutions.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "Praetorian Smart-Coat Deck Cooling System",
          "description": "Revolutionary ceramic coating technology that creates cooler, more comfortable pool decks while delivering superior protection against UV damage, chemical erosion, and staining.",
          "brand": {
            "@type": "Brand",
            "name": "Praetorian Smart-Coat"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://praetoriansmartcoat.com/pools",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {}
        }
      `}} />
    </MainLayout>
  );
}