import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/ui/gradient-heading";
import backgroundImg from "../../assets_dir/images/optimized/praetorian-background-new.png";

const TechnicalSpecsTable = () => {
  // Define technical specifications
  const specs = [
    {
      property: "Thermal Conductivity",
      value: "0.00543 W/cm²/K",
      explanation: "Lower thermal conductivity means superior insulating properties, reducing heat transfer through the coating.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "Fire Rating",
      value: "Class A (0/0 scores)",
      explanation: "The highest possible rating in ASTM E84 testing, indicating excellent fire retardant properties.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "UV Reflection",
      value: "89%",
      explanation: "Reflects 89% of ultraviolet radiation, protecting surfaces and preventing degradation from sun exposure.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "Elastomeric Flexibility",
      value: "156%",
      explanation: "Exceptional ability to stretch and recover without cracking, accommodating structural movement.",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      property: "Temperature Differential",
      value: "1,400°F",
      explanation: "The maximum temperature differential the coating can withstand without losing integrity.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "Certifications",
      value: "ABS #MC-1372",
      explanation: "American Bureau of Shipping certification for marine applications.",
      icon: <Award className="h-4 w-4" />
    },
    {
      property: "Patent",
      value: "#10,738,214",
      explanation: "Patented formula exclusive to Praetorian SmartCoat technology.",
      icon: <Award className="h-4 w-4" />
    },
    {
      property: "Chemical Resistance",
      value: "Excellent",
      explanation: "Resistant to a wide range of chemicals including acids, bases, and solvents.",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      property: "Service Life",
      value: "15-20 years",
      explanation: "Expected service life under normal environmental conditions with proper application.",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      property: "VOC Content",
      value: "< 50 g/L",
      explanation: "Extremely low volatile organic compound content, environmentally friendly and safe for use in enclosed spaces.",
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  return (
    <section 
      id="technical-specs" 
      className="py-16 relative z-10"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="flex justify-center mb-5">
          <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)]">
            <Shield className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-sm font-medium">Performance Specifications</span>
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
                {/* Premium card header styling matching Specialized Applications */}
                <div className="relative h-20 flex items-center justify-center">
                  {/* Background blur text */}
                  <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                    Performance Specifications
                  </div>
                  
                  {/* Main text with premium gradient */}
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                    transform -translate-y-[0.25in] text-3xl md:text-4xl font-bold">
                    Performance Specifications
                  </span>
                  
                  {/* Top glossy reflection */}
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                  
                  {/* Multiple text shadows for depth - reduced blur effects */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                    Performance Specifications
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                    Performance Specifications
                  </div>
                  
                  {/* Decorative accent line */}
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
                
                <p className="text-gray-300 max-w-2xl mx-auto mt-8">
                  Praetorian's ceramic-based coatings deliver industry-leading performance metrics that exceed traditional protective coatings across all key indicators.
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
          className="relative"
        >
          {/* Premium Enterprise Table Container */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
            {/* Premium gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/40 via-transparent to-red-500/40 opacity-70"></div>
            
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
            
            {/* Table Content */}
            <div className="relative z-10 overflow-x-auto">
              <Table>
                <TableCaption>
                  {/* Enhanced caption with glowing icon */}
                  <div className="flex items-center justify-center gap-2 py-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-[6px] opacity-50"></div>
                      <Info className="h-4 w-4 text-orange-400 relative z-10" />
                    </div>
                    <span className="text-sm text-gray-300">
                      All specifications certified by independent laboratory testing
                    </span>
                  </div>
                </TableCaption>
                
                {/* Premium Header */}
                <TableHeader>
                  <TableRow className="border-0">
                    {/* Premium Header Gradient */}
                    <th colSpan={3} className="p-0">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-900/80 via-red-900/60 to-gray-900/80"></div>
                    </th>
                  </TableRow>
                  <TableRow className="relative">
                    <TableHead className="font-bold text-amber-300 w-1/4 py-4 px-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full"></div>
                        Property
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-amber-300 w-1/4 py-4 px-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full"></div>
                        Value
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-amber-300 w-1/2 py-4 px-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full"></div>
                        Significance
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                
                {/* Table Body with Enhanced Row Styling */}
                <TableBody>
                  {specs.map((spec, index) => (
                    <TableRow 
                      key={index} 
                      className={`group relative transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-900/20 hover:via-transparent hover:to-amber-900/20 ${
                        index % 2 === 0 
                          ? "bg-gray-900/80" 
                          : "bg-gray-950/90"
                      }`}
                    >
                      {/* Premium Property Cell */}
                      <TableCell className="font-medium py-4 px-6 relative">
                        <div className="flex items-center gap-3">
                          {/* Icon with glow effect */}
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-[6px] opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <span className="text-amber-500 group-hover:text-amber-400 transition-colors duration-300 relative z-10 transform group-hover:scale-125 transition-transform duration-300">
                              {React.cloneElement(spec.icon, { 
                                strokeWidth: 1.5,
                                className: "h-5 w-5 drop-shadow-[0_1px_3px_rgba(251,113,36,0.5)]"
                              })}
                            </span>
                          </div>
                          
                          {/* Property name with gradient on hover */}
                          <span className="text-amber-300 group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {spec.property}
                          </span>
                        </div>
                      </TableCell>
                      
                      {/* Premium Value Cell */}
                      <TableCell className="font-bold py-4 px-6 relative">
                        <div className="relative">
                          {/* Value with hover effect */}
                          <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                            {spec.value}
                          </span>
                          
                          {/* Animated underline on hover */}
                          <div className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-1/2 transition-all duration-700 bg-gradient-to-r from-orange-500 to-red-500 opacity-60"></div>
                        </div>
                      </TableCell>
                      
                      {/* Premium Explanation Cell */}
                      <TableCell className="text-gray-300 text-sm py-4 px-6 group-hover:text-gray-200 transition-colors duration-300">
                        {spec.explanation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Subtle bottom reflection */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
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
                  For detailed technical data sheets or certification documentation, please contact our technical support team.
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

export default TechnicalSpecsTable;