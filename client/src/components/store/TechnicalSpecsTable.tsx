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
          <div className="px-3 py-1.5 rounded-full border border-orange-500 bg-black text-white inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)] relative z-50">
            <Shield className="h-4 w-4 mr-2 text-orange-500" />
            <span className="text-sm font-medium">Performance Specifications</span>
          </div>
        </div>
        
        <div className="text-center mb-12">
          {/* Premium Enterprise-level heading container with mixed orange/blue styling */}
          <div className="relative mx-auto max-w-4xl mb-8 inline-block group transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 hover:z-10">
            {/* Multiple layered background effects  */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-300"></div>
            
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-8 px-10 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10">
              {/* Subtle dots and squares pattern background in mixed colors */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effects - positioned away from text */}
              <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
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
              <div className="relative z-20 text-center">
                {/* Premium card header styling matching NASA card */}
                <div className="relative h-20 flex items-center justify-center">
                  {/* Animated glow behind heading with mixed colors */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow-delayed"></div>
                  
                  {/* Background blur text */}
                  <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 opacity-50">
                    Performance Specifications
                  </div>
                  
                  {/* Main text with premium gradient - matching mixed style */}
                  <span className="shimmer-mixed-text relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400
                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15)]
                    text-3xl md:text-4xl font-bold relative z-20">
                    Performance Specifications
                  </span>
                  
                  {/* Multiple text shadows for depth - reduced blur effects */}
                  <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                    Performance Specifications
                  </div>
                  
                  {/* Animated underline with mixed-themed gradient */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-48 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                </div>
                
                <p className="text-gray-200 text-lg md:text-xl relative z-20 mt-8 font-medium">
                  Praetorian's ceramic-based coatings deliver industry-leading performance metrics that exceed traditional protective coatings across all key indicators.
                </p>
                
                {/* Decorative horizontal line - matching NASA card */}
                <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-70 group-hover:w-40 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
              </div>
            </div>
            
            {/* Subtle bottom reflection with dual-color gradient */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
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
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/40 via-transparent to-blue-500/40 opacity-70"></div>
            
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
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-900/80 via-blue-900/60 to-gray-900/80"></div>
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
                          <div className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-1/2 transition-all duration-700 bg-gradient-to-r from-orange-500 to-blue-500 opacity-60"></div>
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
          {/* Premium Enterprise Bottom Note with Mixed Orange/Blue Theme */}
          <div className="relative group inline-block transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 hover:z-10">
            {/* Multiple layered background effects  */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-300"></div>
            
            {/* Main card container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-4 px-8 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* Subtle dots and squares pattern background in mixed colors */}
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
                  For detailed technical data sheets or certification documentation, please contact our technical support team.
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

export default TechnicalSpecsTable;