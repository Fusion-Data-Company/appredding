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
  Shield,
  Sun
} from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [showROICalculator, setShowROICalculator] = useState<boolean>(false);

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
        <div className="fixed inset-0 z-[-5]" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements with pool theme */}
        <div className="fixed inset-0 z-[-4] opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-[-4] opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0) 70%)'
        }}></div>
        
        {/* Advanced multi-color ambient glow effects with pool blue accent */}
        <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none">
          {/* Blue glow */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          
          {/* Orange/Red glow */}
          <div className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slower"></div>
          
          {/* Green accent glows for balance */}
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[30%] left-[20%] w-[30rem] h-[30rem] bg-green-700/5 rounded-full blur-[100px] animate-pulse-slower"></div>
          
          {/* Purple accent for depth */}
          <div className="absolute top-[70%] left-[50%] w-[20rem] h-[20rem] bg-purple-700/5 rounded-full blur-[90px] animate-pulse-slow"></div>
        </div>
        
        {/* Low-opacity subtle pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%235d9bec\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* SANDLER STAGE 1: INTRO - BLUE GLOW SECTION */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Section-specific ambient blue glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-blue-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-blue-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Ultra-premium Elite Enterprise Header Container - front layer with high z-index */}
              <div className="relative z-20 rounded-2xl overflow-hidden transform transition-all duration-700 group hover:scale-[1.005] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] border border-blue-700/30">
                {/* Premium multi-layered background with depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-gray-900/98 to-blue-900/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-blue-900/30 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>

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
                
                {/* Premium themed background elements */}
                <div className="absolute inset-0 opacity-40 z-0 mix-blend-overlay" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    backgroundSize: '80px 80px'
                  }}
                ></div>
                
                {/* Premium particle effect in header */}
                <div className="absolute inset-0 mix-blend-overlay opacity-10 z-0" 
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 0.5%)",
                    backgroundSize: "8px 8px"
                  }}>
                </div>
                
                {/* Ultra-premium Elite Corner Accents with dynamic lighting effects */}
                <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                  {/* Multi-layered glowing corner effect */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-blue-400/50 rounded-tl-lg"></div>
                  <div className="absolute top-1 left-1 w-12 h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                  <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-blue-600/30 rounded-tl-sm"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-400/30 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-blue-400/50 rounded-tr-lg"></div>
                  <div className="absolute top-1 right-1 w-12 h-12 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-blue-600/30 rounded-tr-sm"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400/30 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-blue-400/50 rounded-bl-lg"></div>
                  <div className="absolute bottom-1 left-1 w-12 h-12 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-blue-600/30 rounded-bl-sm"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-400/30 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 z-20 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-blue-400/50 rounded-br-lg"></div>
                  <div className="absolute bottom-1 right-1 w-12 h-12 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-blue-600/30 rounded-br-sm"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400/30 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Advanced animated light sweep effects with multiple layers */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] animate-light-sweep" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent skew-x-[-25deg] animate-light-sweep" style={{ animationDelay: '4s' }}></div>
                </div>
                
                {/* 3D edge highlight effect for depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                
                {/* Enhanced Header content with premium homepage-style styling */}
                <div className="relative z-20 p-10 flex flex-col items-center text-center">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-md"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 left-1 w-18 h-18 border-t border-l border-blue-600/40 rounded-tl-lg"></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-md"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-400/70 rounded-tr-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 right-1 w-18 h-18 border-t border-r border-blue-600/40 rounded-tr-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-br-md"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/70 rounded-br-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 right-1 w-18 h-18 border-b border-r border-blue-600/40 rounded-br-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-400/70 rounded-bl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 left-1 w-18 h-18 border-b border-l border-blue-600/40 rounded-bl-lg"></div>
                  </div>
                
                  <div className="relative p-8 md:p-10 backdrop-blur-sm">
                    {/* Ultra-premium enterprise header with layered effects */}
                    <div className="relative mb-8">
                      {/* Premium Cinematic Enterprise Header Container */}
                      <div className="relative py-8 px-6 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 
                        border-b-2 border-cyan-500/60 border-t border-t-cyan-400/30 rounded-lg mb-4
                        shadow-[0_10px_50px_rgba(6,182,212,0.15),inset_0_1px_20px_rgba(6,182,212,0.05)]">
                        
                        {/* Metallic corner accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                          <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                          <div className="absolute top-0 left-0 h-12 w-1 bg-gradient-to-b from-cyan-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                          <div className="absolute top-0 right-0 w-12 h-1 bg-gradient-to-l from-cyan-500 to-transparent rounded-full"></div>
                          <div className="absolute top-0 right-0 h-12 w-1 bg-gradient-to-b from-cyan-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                          <div className="absolute bottom-0 left-0 h-12 w-1 bg-gradient-to-t from-cyan-500 to-transparent rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-l from-cyan-500 to-transparent rounded-full"></div>
                          <div className="absolute bottom-0 right-0 h-12 w-1 bg-gradient-to-t from-cyan-500 to-transparent rounded-full"></div>
                        </div>
                        
                        {/* Premium subtle glow effects */}
                        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
                        
                        {/* Cinematic metallic header with layered elements */}
                        <div className="relative z-10">
                          {/* Top badge */}
                          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-cyan-600/20 to-cyan-500/20 border border-cyan-500/30 shadow-lg mb-4 backdrop-blur-sm">
                            <Droplets className="h-5 w-5 mr-2 text-cyan-400" />
                            <span className="text-cyan-100 font-medium text-sm">Advanced Pool Protection Technology</span>
                          </div>
                          
                          {/* Enterprise-grade headline with gradient accent */}
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">
                            Ultimate Pool <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Deck Protection</span> System
                          </h1>
                          
                          {/* Enhanced premium subheadline with vibrant color accent */}
                          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-blue-50/90 leading-relaxed">
                            Advanced ceramic coating technology that creates cooler, more comfortable pool decks with <span className="text-cyan-300 font-semibold">superior protection</span>
                          </p>
                          
                          {/* Refined feature highlight row with premium styling */}
                          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">UV Protection</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Temperature Reduction</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Chemical Resistance</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-50">Slip Resistance</span>
                            </div>
                          </div>
                          
                          {/* Premium animated CTA button */}
                          <div className="transform transition-all duration-700 hover:scale-105 relative z-20">
                            <PremiumCartButton 
                              size="lg" 
                              onClick={() => setShowROICalculator(true)}
                              className="px-8 py-4 text-lg relative group"
                              variant="gold"
                            >
                              <div className="flex items-center justify-center">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                <span>Calculate Your Pool Deck Coverage</span>
                              </div>
                            </PremiumCartButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SANDLER STAGE 2: PAIN - RED GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Section-specific ambient red glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-red-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-red-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-red-300">
                  Pool Deck Challenges: The Hidden Costs
                </h2>
                
                {/* Pool deck problem cards with stylized design */}
                <div className="space-y-6 mb-8">
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                            <Sun className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Excessive Heat Absorption</h3>
                        <p className="text-gray-200 leading-relaxed">
                          Is your pool deck too hot to walk on during summer? Unprotected concrete can reach <span className="text-red-300 font-medium">140°F+</span> in direct sunlight, making it unusable during peak hours and creating dangerous conditions for children and pets.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                            <AlertTriangle className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Dangerous Slip Hazards</h3>
                        <p className="text-gray-200 leading-relaxed">
                          Did you know that pool deck injuries account for <span className="text-red-300 font-medium">27% of all home pool accidents</span>? Standard concrete becomes extremely slippery when wet, creating a serious liability for homeowners and businesses. Insurance claims from slip-and-fall accidents average <span className="text-red-300 font-medium">$45,000</span> per incident.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                    {/* Enhanced layered glows and effects */}
                    <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0">
                        {/* Elite enterprise icon styling */}
                        <div className="relative">
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                          <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                            <CircleDollarSign className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Costly Ongoing Maintenance</h3>
                        <p className="text-gray-200 leading-relaxed">
                          How much are you spending on pool deck maintenance? Unprotected concrete and stone surfaces require frequent sealing, cleaning, and repairs – costing <span className="text-red-300 font-medium">$1,500-$3,000 annually</span>. The chemicals needed for traditional maintenance are also harmful to the environment and can contaminate your pool water.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expert quote section */}
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-black/80 to-red-950/20 border border-red-700/20">
                  <div className="absolute -top-2 -left-2 text-4xl text-red-500 opacity-40">"</div>
                  <div className="absolute -bottom-2 -right-2 text-4xl text-red-500 opacity-40">"</div>
                  <p className="italic text-gray-300 mb-4">Most pool owners don't realize they're losing money every day with their current decking solution. The combination of high maintenance costs, shortened lifespan, and potential liability makes traditional pool decks financially unsustainable.</p>
                  <div className="flex items-center">
                    <div className="ml-auto">
                      <p className="text-orange-200 font-medium">Elizabeth Chambers</p>
                      <p className="text-xs text-gray-400">Director, American Pool & Spa Association</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 3: BUDGET - GREEN GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Section-specific ambient green glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-green-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-emerald-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  Superior Return on Investment
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Cost savings breakdown */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">Long-Term Benefits</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Maintenance Cost Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">80%+</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <ThermometerSun className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Surface Temperature Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">30-40°F</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Lifespan Extension</span>
                        </div>
                        <span className="text-emerald-400 font-bold">15+ years</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-emerald-400 mr-3" />
                          <span className="text-gray-300">Insurance Premium Reduction</span>
                        </div>
                        <span className="text-emerald-400 font-bold">10-20%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* ROI calculator preview */}
                  <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-200">Calculate Your ROI</h3>
                    
                    <div className="space-y-5">
                      <p className="text-gray-300">Our advanced ceramic pool deck coating delivers an average <span className="text-emerald-400 font-bold">780% ROI</span> over 15 years when accounting for maintenance savings, liability reduction, and extended service life.</p>
                      
                      <div className="relative">
                        <div className="p-5 rounded-lg bg-black/40">
                          <h4 className="font-medium text-emerald-100 mb-3">Sample ROI Analysis</h4>
                          
                          <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div className="text-gray-400">Initial Investment:</div>
                            <div className="text-gray-300 font-medium">$4,500</div>
                            
                            <div className="text-gray-400">Annual Savings:</div>
                            <div className="text-gray-300 font-medium">$2,350</div>
                            
                            <div className="text-gray-400">15-Year Returns:</div>
                            <div className="text-emerald-400 font-bold">$35,250</div>
                            
                            <div className="text-gray-400">ROI Percentage:</div>
                            <div className="text-emerald-400 font-bold">783%</div>
                          </div>
                        </div>
                        
                        {/* Pricing Indicator Badge */}
                        <div className="absolute -top-5 -right-5 w-20 h-20 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"></div>
                          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white w-14 h-14 rounded-full border-2 border-emerald-400/50 shadow-lg flex items-center justify-center text-sm font-bold">
                            Save<br/>42%
                          </div>
                        </div>
                      </div>
                      
                      {/* Pool calculator */}
                      <div className="mt-5">
                        <Button 
                          onClick={() => setShowROICalculator(true)}
                          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white border border-emerald-500/50"
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Calculate Your Custom ROI
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Certification and Trust Indicators */}
                <div className="rounded-xl p-6 bg-gradient-to-br from-black/80 to-green-950/30 border border-green-800/30">
                  <h3 className="text-xl font-semibold mb-4 text-center text-emerald-200">Trusted and Certified Protection</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <Shield className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">ADA Compliant Slip Resistance</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <Droplets className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">100% Waterproof Protection</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <FileText className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">15-Year Warranty</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 rounded-lg bg-black/40">
                      <Sun className="h-8 w-8 text-emerald-400 mb-2" />
                      <span className="text-gray-300 text-sm text-center">UV & Weather Resistant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 4: DECISION - PURPLE GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto pb-16">
            <div className="relative">
              {/* Section-specific ambient purple glow in background (z-index lower than content) */}
              <div className="absolute -inset-10 bg-purple-900/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-violet-800/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Content card with high z-index to appear over the glow */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-purple-700/30 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)]">
                {/* Section Title with premium styling */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-purple-300">
                  Calculate Your Pool Deck Coverage
                </h2>
                
                {/* Pool calculator */}
                <div className="max-w-3xl mx-auto">
                  <div className="mb-10 p-6 bg-gradient-to-br from-black/90 to-purple-950/20 rounded-xl border border-purple-700/30">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-purple-200">Quick Coverage Calculator</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-gray-300 font-medium">Pool Deck Surface Area (sq ft)</label>
                          <input
                            type="number"
                            value={poolSurfaceArea}
                            onChange={(e) => setPoolSurfaceArea(Number(e.target.value))}
                            className="w-full bg-gray-900/80 text-white px-4 py-2 rounded-lg border border-purple-700/30 focus:border-purple-500/70 focus:outline-none focus:ring-1 focus:ring-purple-500/70"
                          />
                          <p className="text-xs text-gray-400">Average pool deck is 500-1000 sq ft</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-gray-300 font-medium">Product Type</label>
                          <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full bg-gray-900/80 text-white px-4 py-2 rounded-lg border border-purple-700/30 focus:border-purple-500/70 focus:outline-none focus:ring-1 focus:ring-purple-500/70"
                          >
                            <option value="standard">Praetorian Standard</option>
                            <option value="premium">Praetorian Premium</option>
                            <option value="ultra">Praetorian Ultra Shield</option>
                          </select>
                          <p className="text-xs text-gray-400">Premium recommended for most applications</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-gray-300 font-medium">Number of Coats</label>
                          <select
                            value={coatCount}
                            onChange={(e) => setCoatCount(Number(e.target.value))}
                            className="w-full bg-gray-900/80 text-white px-4 py-2 rounded-lg border border-purple-700/30 focus:border-purple-500/70 focus:outline-none focus:ring-1 focus:ring-purple-500/70"
                          >
                            <option value="1">1 coat (basic protection)</option>
                            <option value="2">2 coats (recommended)</option>
                            <option value="3">3 coats (maximum durability)</option>
                          </select>
                          <p className="text-xs text-gray-400">2 coats provides optimal balance of protection and cost</p>
                        </div>
                        
                        <div className="pt-4">
                          <button
                            onClick={calculateResults}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-3 rounded-lg border border-purple-500/30 shadow-lg transition-all duration-300 hover:shadow-[0_5px_20px_rgba(168,85,247,0.3)]"
                          >
                            Calculate Coverage
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900/90 to-purple-950/20 p-6 rounded-xl border border-purple-700/20">
                        {calculationResult ? (
                          <div className="space-y-6">
                            <h4 className="text-xl font-semibold text-purple-200 text-center mb-4">Your Results</h4>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Surface Area:</span>
                                <span className="text-white font-medium">{calculationResult.surfaceArea} sq ft</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-gray-400">Product:</span>
                                <span className="text-white font-medium">{calculationResult.productName}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-gray-400">Number of Coats:</span>
                                <span className="text-white font-medium">{calculationResult.coatCount}</span>
                              </div>
                              
                              <div className="flex justify-between border-t border-purple-800/30 pt-3 mt-3">
                                <span className="text-gray-400">Total Gallons Needed:</span>
                                <span className="text-white font-medium">{calculationResult.gallonsNeeded.toFixed(2)}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-gray-400">Estimated Cost:</span>
                                <span className="text-purple-300 font-bold">${calculationResult.totalCost.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-lg">
                              <p className="text-sm text-gray-300 italic">
                                This estimate includes material costs only. For a complete project quote including professional installation, please contact our specialists.
                              </p>
                            </div>
                            
                            <div className="flex justify-center">
                              <button
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-6 py-2 rounded-lg border border-purple-500/30 shadow-lg transition-all duration-300 hover:shadow-[0_5px_20px_rgba(168,85,247,0.3)] flex items-center"
                              >
                                <ChevronRight className="h-4 w-4 mr-1" />
                                Schedule Free Consultation
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <Droplets className="h-16 w-16 text-purple-600/30 mb-4" />
                            <p className="text-gray-400 text-center">Enter your deck dimensions and product preferences to calculate coverage requirements and costs.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Process Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                      {/* Step indicator */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-200">Free Consultation</h3>
                      <p className="text-gray-400 mb-4">Schedule a personalized analysis of your pool deck's specific needs and cooling requirements.</p>
                      <div className="flex items-center text-purple-400 text-sm">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>No obligation assessment</span>
                      </div>
                    </div>
                    
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                      {/* Step indicator */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-200">Professional Application</h3>
                      <p className="text-gray-400 mb-4">Our certified technicians apply the revolutionary cooling coating with minimal disruption.</p>
                      <div className="flex items-center text-purple-400 text-sm">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>Most installations complete in 1-2 days</span>
                      </div>
                    </div>
                    
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-black/80 to-purple-950/30 border border-purple-800/30">
                      {/* Step indicator */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-200">Enjoy Your Cool Deck</h3>
                      <p className="text-gray-400 mb-4">Experience immediate cooling benefits and long-term protection with our industry-leading warranty.</p>
                      <div className="flex items-center text-purple-400 text-sm">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>30-40°F temperature reduction</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Final CTA */}
                  <div className="rounded-xl p-8 bg-gradient-to-br from-black/80 to-purple-900/20 border border-purple-700/30 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-white">Ready to Enhance Your Pool Experience?</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Take the first step toward a cooler, safer, and more beautiful pool deck with our advanced ceramic coating technology.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <PremiumCartButton 
                        size="lg" 
                        variant="gold"
                        className="relative group px-6 py-3"
                      >
                        <div className="flex items-center">
                          <Droplets className="mr-2 h-5 w-5" />
                          <span>Schedule Free Consultation</span>
                        </div>
                      </PremiumCartButton>
                    </div>
                  </div>
                </div>
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