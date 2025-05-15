import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Warehouse, Ship, AlarmClockCheck, Home, Building2, Droplets, ThermometerSun, Wrench, Zap, DollarSign, Shield, CheckCircle, Sun, ShoppingCart } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { Link } from "wouter";
import { PremiumCartButton } from "@/utils/premium-buttons";
import praetorianLogoFire from "../../assets_dir/images/praetorian-logo-fire.png";

interface ApplicationData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  caseStudy: {
    title: string;
    location: string;
    challenge: string;
    solution: string;
    results: string[];
    image?: string;
  };
}

const IndustryApplications = () => {
  const [selectedTab, setSelectedTab] = useState("fire-prevention");

  const applications: ApplicationData[] = [
    {
      id: "fire-prevention",
      title: "Fire Prevention",
      icon: <Shield className="h-5 w-5" />,
      description: "Advanced thermal protection for buildings, industrial facilities, and assets at risk of fire damage.",
      benefits: [
        {
          icon: <ThermometerSun />,
          title: "Thermal Barrier",
          description: "Creates a Class A rated thermal barrier that dramatically slows heat transfer."
        },
        {
          icon: <AlarmClockCheck />,
          title: "Critical Response Time",
          description: "Provides crucial extra minutes for evacuation and emergency response."
        },
        {
          icon: <Building />,
          title: "Structural Protection",
          description: "Prevents structural warping and failure during extreme heat exposure."
        }
      ],
      caseStudy: {
        title: "Industrial Manufacturing Facility",
        location: "Phoenix, AZ",
        challenge: "High-temperature processing equipment created significant fire risk to surrounding structure and materials.",
        solution: "Applied Praetorian Smart-Coat to walls, ceiling, and support structures in a 15,000 sq ft processing area.",
        results: [
          "Reduced surface temperatures by 78°F during normal operations",
          "Achieved Class A fire rating certification for the entire facility",
          "Decreased cooling costs by 23% during summer months",
          "Insurance premiums reduced by $87,500 annually"
        ],
        image: "/src/assets_dir/images/fire-prevention-case.jpg"
      }
    },
    {
      id: "marinas",
      title: "Marinas",
      icon: <Ship className="h-5 w-5" />,
      description: "Specialized protection for marine environments, docks, and waterfront structures with ABS certification.",
      benefits: [
        {
          icon: <Droplets />,
          title: "Salt Water Resistant",
          description: "Prevents corrosion and deterioration caused by constant salt water exposure."
        },
        {
          icon: <Sun />,
          title: "UV Protection",
          description: "Reflects 89% of UV radiation, preventing sun damage to structures."
        },
        {
          icon: <Building2 />,
          title: "Dock Preservation",
          description: "Extends the life of wooden and composite dock materials by 10-15 years."
        }
      ],
      caseStudy: {
        title: "Lakewood Marina Resort",
        location: "Tampa Bay, FL",
        challenge: "Extensive sun damage and salt water deterioration requiring frequent dock replacement and maintenance.",
        solution: "Applied Praetorian Smart-Coat to all exposed dock surfaces, boat storage, and marina buildings.",
        results: [
          "Surface temperature reduction of 42°F on peak summer days",
          "Eliminated water intrusion on all treated wooden surfaces",
          "100% reduction in sun-related fading on treated areas",
          "Maintenance costs reduced by $142,000 annually"
        ],
        image: "/src/assets_dir/images/marina-case.jpg"
      }
    },
    {
      id: "pools",
      title: "Pools",
      icon: <Droplets className="h-5 w-5" />,
      description: "Temperature controlling, weather-resistant coatings for pool decks, equipment areas, and surrounds.",
      benefits: [
        {
          icon: <ThermometerSun />,
          title: "Cool Surfaces",
          description: "Reduces surface temperatures by up to 37°F for comfortable barefoot walking."
        },
        {
          icon: <Droplets />,
          title: "Waterproof Seal",
          description: "Creates a completely waterproof surface that prevents water damage."
        },
        {
          icon: <Wrench />,
          title: "Equipment Protection",
          description: "Extends the life of pool equipment and mechanical systems."
        }
      ],
      caseStudy: {
        title: "Sunset Valley Community Pool",
        location: "San Diego, CA",
        challenge: "Extreme surface temperatures making pool deck unusable during peak hours and causing rapid degradation.",
        solution: "Applied Praetorian Smart-Coat to 8,500 sq ft of pool deck and equipment room surfaces.",
        results: [
          "Reduced deck surface temperature by 37°F during peak sun exposure",
          "Extended usable hours of the facility by 4 hours daily",
          "Eliminated water intrusion in the equipment room",
          "Extended expected deck life by 15+ years"
        ],
        image: "/src/assets_dir/images/pool-case.jpg"
      }
    },
    {
      id: "construction",
      title: "Construction",
      icon: <Building2 className="h-5 w-5" />,
      description: "Premium protective solutions for new construction and renovation projects across residential and commercial sectors.",
      benefits: [
        {
          icon: <Shield />,
          title: "All-weather Protection",
          description: "Protects building materials during all phases of construction regardless of weather."
        },
        {
          icon: <ThermometerSun />,
          title: "Energy Efficiency",
          description: "Increases building energy efficiency by up to 40% after completion."
        },
        {
          icon: <DollarSign />,
          title: "Value-Add Upgrade",
          description: "Creates premium selling point for completed properties with documented ROI."
        }
      ],
      caseStudy: {
        title: "Highland Park Residential Development",
        location: "Austin, TX",
        challenge: "Builder seeking energy efficiency certification and premium market differentiation for 28-home development.",
        solution: "Applied Praetorian Smart-Coat to all exterior surfaces and certain interior areas during construction phase.",
        results: [
          "Achieved Platinum energy efficiency rating for all homes",
          "Homes sold at 12% premium compared to neighborhood average",
          "Measured 38% energy consumption reduction for cooling",
          "Development sold out 4 months ahead of projected schedule"
        ],
        image: "/src/assets_dir/images/construction-case.jpg"
      }
    },
    {
      id: "mobile-home",
      title: "Mobile Home",
      icon: <Home className="h-5 w-5" />,
      description: "Specialized protection for manufactured housing, providing thermal efficiency and extended structural life.",
      benefits: [
        {
          icon: <Zap />,
          title: "Energy Cost Reduction",
          description: "Reduces cooling costs by up to 40% during summer months."
        },
        {
          icon: <ThermometerSun />,
          title: "Interior Comfort",
          description: "Stabilizes interior temperatures regardless of outside conditions."
        },
        {
          icon: <Building />,
          title: "Structure Preservation",
          description: "Prevents premature roof and siding deterioration from sun and elements."
        }
      ],
      caseStudy: {
        title: "Riverside Mobile Home Community",
        location: "Tucson, AZ",
        challenge: "Excessive cooling costs and heat-related structural deterioration across a 120-unit community.",
        solution: "Applied Praetorian Smart-Coat to roofs and west-facing walls of all units in the community.",
        results: [
          "Average interior temperature reduction of 18°F during peak heat",
          "Resident cooling costs reduced by average of 42%",
          "Extended roof replacement schedule from 7 to 20+ years",
          "Dramatically improved resident comfort and satisfaction"
        ],
        image: "/src/assets_dir/images/mobile-home-case.jpg"
      }
    },
    {
      id: "municipality",
      title: "Municipality",
      icon: <Building className="h-5 w-5" />,
      description: "Energy-efficient solutions for government buildings, water treatment facilities, and public infrastructure.",
      benefits: [
        {
          icon: <DollarSign />,
          title: "Budget Savings",
          description: "Reduces operating and maintenance costs for public buildings and facilities."
        },
        {
          icon: <Zap />,
          title: "Energy Conservation",
          description: "Helps municipalities meet energy conservation and sustainability goals."
        },
        {
          icon: <AlarmClockCheck />,
          title: "Extended Asset Life",
          description: "Significantly extends the service life of valuable public infrastructure."
        }
      ],
      caseStudy: {
        title: "Lakewood Water Treatment Facility",
        location: "Colorado Springs, CO",
        challenge: "High operational costs, excessive heat in critical processing areas, and corrosion issues throughout the facility.",
        solution: "Applied Praetorian Smart-Coat to all exterior surfaces, processing equipment areas, and chemical storage facilities.",
        results: [
          "Reduced cooling costs by $157,000 annually",
          "Eliminated condensation in chemical processing areas",
          "Extended expected maintenance intervals by 300%",
          "Helped facility exceed EPA energy reduction mandate by 43%"
        ],
        image: "/src/assets_dir/images/municipality-case.jpg"
      }
    }
  ];

  return (
    <section 
      id="industry-applications"
      className="py-12 relative flex items-center justify-center"
      style={{ 
        backgroundColor: "#000000",
        zIndex: 999, 
        minHeight: "70vh", 
        marginTop: "-5px", 
        position: "relative", 
        paddingTop: "20px"
      }}
    >
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 relative z-20">
          {/* Premium top accent */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent rounded-full blur-[3px]"></div>
          
          {/* Premium corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500/70 rounded-tl-md"></div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/50 rounded-full blur-[2px]"></div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/70 rounded-tr-md"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[2px]"></div>
          </div>
          
          {/* Elite Enterprise CTA Button - Moved to top position */}
          <div className="mb-6 mt-4">
            <Link href="/products">
              <div className="transform transition-all duration-700 hover:scale-105">
                <PremiumCartButton size="xl" className="text-xl font-bold">
                  Get Praetorian Smart-Coat NOW!
                </PremiumCartButton>
              </div>
            </Link>
          </div>
          
          {/* Elite enterprise styled heading with shimmer effect */}
          <h2 className="text-4xl font-bold mt-12 mb-5 tracking-tight relative inline-block">
            {/* Top horizontal accent line with enhanced glow */}
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent rounded-full blur-sm animate-pulse-slow"></span>
            
            {/* Left corner accent */}
            <span className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-orange-500/50 rounded-tl-lg"></span>
            
            {/* Right corner accent */}
            <span className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></span>
            
            {/* Heading text with enhanced shimmer effect */}
            <div className="relative z-10 px-6 py-2 overflow-hidden">
              {/* Additional animated glow behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
              
              {/* Shimmer overlay */}
              <div className="shimmer-fire-text font-bold text-4xl tracking-tight">
                <span className="text-white">
                  Protection Across Every Industry
                </span>
              </div>
              
              {/* Text shadow for depth */}
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-tight opacity-70 blur-[2px] text-blue-900/30 -z-10">
                Protection Across Every Industry
              </div>
              
              {/* Subtle moving highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent"></div>
            </div>
            
            {/* Bottom horizontal accent line with enhanced glow */}
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full blur-sm animate-pulse-slow"></span>
            
            {/* Left bottom corner accent */}
            <span className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-orange-500/50 rounded-bl-lg"></span>
            
            {/* Right bottom corner accent */}
            <span className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></span>
          </h2>
          
          {/* Enhanced description with premium styling */}
          <p className="text-gray-200 dark:text-gray-300 max-w-2xl mx-auto font-medium text-lg tracking-wide leading-relaxed mb-10 mt-10 relative px-6">
            {/* Left side ornamental accent */}
            <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-blue-500/30 blur-md"></span>
              <span className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-orange-500/20 via-orange-500/40 to-orange-500/20"></span>
            </span>
            
            {/* Enhanced text with subtle highlight */}
            <span className="relative">
              Explore how Praetorian's advanced ceramic coating technology delivers specialized protection and exceptional performance for diverse industries and applications.
            </span>
            
            {/* Right side ornamental accent */}
            <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 blur-md"></span>
              <span className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20"></span>
            </span>
          </p>
        </div>
        
        {/* Premium Enterprise Tabs Container */}
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="relative z-20"
        >
          {/* Premium Styled TabsList */}
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto overflow-hidden relative">
            {/* Elite Enterprise Styled Top Glow */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent blur-sm"></div>
            
            {/* Premium Tabs List with enhanced hover effects */}
            <TabsList className="bg-gray-900/80 backdrop-blur-lg h-auto mb-8 flex flex-wrap justify-center gap-2 border border-blue-500/20 rounded-xl px-2 py-3 relative">
              {/* Inner ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-blue-600/5 to-orange-600/5 rounded-xl"></div>
              
              {applications.map(app => (
                <TabsTrigger
                  key={app.id}
                  value={app.id}
                  className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-900/50 data-[state=active]:to-gray-900/80 data-[state=active]:border-blue-500/50 data-[state=active]:text-white py-2 px-3 rounded-lg border border-transparent data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 relative group"
                >
                  {/* Active tab glow */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-orange-500/20 opacity-0 group-data-[state=active]:opacity-100 blur-sm transition-opacity duration-500"></div>
                  
                  <div className="flex items-center space-x-2 relative z-10">
                    <span className="text-white group-data-[state=active]:text-white transition-colors duration-300">{app.icon}</span>
                    <span className="text-gray-300 group-data-[state=active]:text-white transition-colors duration-300 font-medium">{app.title}</span>
                  </div>
                  
                  {/* Enhanced tab underline effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-data-[state=active]:w-4/5 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 transition-all duration-300 rounded-full"></div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* Enhanced Content Areas */}
          {applications.map(application => {
            const isWaterRelated = application.id === "marinas" || application.id === "pools";
            const isFireRelated = application.id === "fire-prevention";
            
            // Set theme-based gradient for cards
            const themeGradient = isWaterRelated 
              ? "from-blue-500/40 via-blue-600/40 to-cyan-500/40" 
              : isFireRelated
                ? "from-orange-500/40 via-orange-600/40 to-amber-500/40"
                : "from-amber-500/40 via-orange-500/40 to-yellow-500/40";
            
            return (
              <TabsContent 
                key={application.id} 
                value={application.id} 
                className="relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-16">
                  {application.benefits.map((benefit, index) => {
                    // Set glow theme based on application
                    const glowTheme = isWaterRelated
                      ? "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 70%)"
                      : isFireRelated
                        ? "radial-gradient(circle at center, rgba(251,113,36,0.3) 0%, transparent 70%)"
                        : "radial-gradient(circle at center, rgba(251,191,36,0.3) 0%, transparent 70%)";
                    
                    return (
                      <div key={index} className="relative transform transition-all duration-500 hover:z-10">
                        <div className="group relative">
                          {/* Multiple layered background effects - matching Testimonials section */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
                          
                          {/* Main card container - matching Testimonials section */}
                          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-5 z-10 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 h-full">
                          
                            {/* Inner highlight */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                            
                            {/* Corner accent squares - matching Testimonials */}
                            <div className="absolute top-4 left-4 w-12 h-12 z-10">
                              <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                              <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                            </div>
                            <div className="absolute top-4 right-4 w-12 h-12 z-10">
                              <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                              <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                            </div>
                            <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                              <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                              <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                              <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                              <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
                            </div>
                            
                            {/* Subtle ambient glow that activates on hover */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                                style={{ background: glowTheme }}>
                            </div>
                            
                            {/* Content with z-index to appear above effects */}
                            <div className="relative z-10 flex flex-col h-full">
                              {/* Icon with enhanced glow effect */}
                              <div className="mb-3 relative">
                                {/* Icon background glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 ease-in-out" 
                                    style={{ 
                                      background: isWaterRelated 
                                        ? "radial-gradient(circle at center, rgba(59,130,246,0.4) 0%, transparent 70%)" 
                                        : isFireRelated
                                          ? "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, transparent 70%)"
                                          : "radial-gradient(circle at center, rgba(251,191,36,0.4) 0%, transparent 70%)",
                                      filter: "blur(8px)"
                                    }}>
                                </div>
                                
                                {/* Icon with enhanced animation */}
                                <div className={`transform transition-all duration-500 group-hover:scale-125 ${
                                  isWaterRelated ? "text-blue-400" : isFireRelated ? "text-orange-500" : "text-amber-400"
                                }`}>
                                  {React.cloneElement(benefit.icon as React.ReactElement, { 
                                    size: 28, 
                                    strokeWidth: 1.5,
                                    className: isWaterRelated 
                                      ? "drop-shadow-[0_2px_8px_rgba(59,130,246,0.6)]" 
                                      : isFireRelated
                                        ? "drop-shadow-[0_2px_8px_rgba(251,113,36,0.6)]"
                                        : "drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]"
                                  })}
                                </div>
                              </div>
                              
                              {/* Title with animated underline on hover */}
                              <h4 className="font-bold mb-2 text-lg relative">
                                <span className="text-white transition-colors duration-300">
                                  {benefit.title}
                                </span>
                                {/* Animated underline */}
                                <div className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-3/4 transition-all duration-700 bg-gradient-to-r ${
                                  isWaterRelated 
                                    ? "from-blue-400 to-cyan-400" 
                                    : isFireRelated
                                      ? "from-orange-500 to-blue-500"
                                      : "from-amber-400 to-orange-400"
                                }`}></div>
                              </h4>
                              
                              {/* Description text */}
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Subtle bottom reflection */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent rounded-full blur-sm"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Premium Enterprise Case Study Container */}
                <div className="relative group">
                  {/* Multiple layered background effects - matching Testimonials section */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Main card container - matching Testimonials section */}
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 z-10 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                    
                    {/* Inner highlight */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                    
                    {/* Corner accent squares - matching Testimonials */}
                    <div className="absolute top-4 left-4 w-12 h-12 z-10">
                      <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                      <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 z-10">
                      <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                      <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                      <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                      <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                      <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                      <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
                    </div>
                    
                    {/* Premium Enterprise styled heading */}
                    <h3 className="text-white text-2xl font-bold tracking-tight mb-2 relative inline-block">
                      <span className="relative">
                        Case Study: {application.caseStudy.title}
                      </span>
                      {/* Animated underline */}
                      <span className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 w-full"></span>
                    </h3>
                    
                    <p className="text-blue-400 font-semibold mb-6">
                      {application.caseStudy.location}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-6">
                        {/* Challenge card */}
                        <div className="group relative">
                          {/* Premium Card Container */}
                          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10">
                            {/* Premium gradient border effect - reduced opacity */}
                            <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${
                              isWaterRelated 
                                ? "from-blue-500/30 to-cyan-500/30" 
                                : isFireRelated
                                  ? "from-orange-500/30 to-red-500/30"
                                  : "from-amber-500/30 to-yellow-500/30"
                            }`}></div>
                            
                            <h4 className="text-white font-bold mb-2 flex items-center">
                              <Shield className="mr-2 h-5 w-5 text-orange-500" />
                              Challenge:
                            </h4>
                            <p className="text-gray-300">
                              {application.caseStudy.challenge}
                            </p>
                          </div>
                        </div>
                        
                        {/* Solution card */}
                        <div className="group relative">
                          {/* Premium Card Container */}
                          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10 ">
                          
                            {/* Premium gradient border effect - reduced opacity */}
                            <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${
                              isWaterRelated 
                                ? "from-blue-500/30 to-cyan-500/30" 
                                : isFireRelated
                                  ? "from-orange-500/30 to-red-500/30"
                                  : "from-amber-500/30 to-yellow-500/30"
                            }`}></div>
                            
                            <h4 className="text-white font-bold mb-2 flex items-center">
                              <Wrench className="mr-2 h-5 w-5 text-blue-500" />
                              Solution:
                            </h4>
                            <p className="text-gray-300">
                              {application.caseStudy.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Results card */}
                      <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10 h-full flex flex-col">
                        {/* Premium gradient border effect - reduced opacity */}
                        <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${themeGradient}`}></div>
                        
                        <h4 className="text-white font-bold mb-4 flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          Results:
                        </h4>
                        
                        <ul className="space-y-3 flex-1">
                          {application.caseStudy.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                                  isWaterRelated 
                                    ? "bg-blue-500/20 text-blue-400" 
                                    : isFireRelated
                                      ? "bg-orange-500/20 text-orange-400"
                                      : "bg-amber-500/20 text-amber-400"
                                }`}>
                                  <div className={`h-2 w-2 rounded-full ${
                                    isWaterRelated 
                                      ? "bg-blue-400" 
                                      : isFireRelated
                                        ? "bg-orange-400"
                                        : "bg-amber-400"
                                  }`}></div>
                                </div>
                              </div>
                              <span className="ml-2 text-gray-300">{result}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Enhanced CTA link */}
                        <Link href={`/case-studies/${application.id}`} className="mt-6 inline-block">
                          <div className={`inline-flex items-center py-2 px-4 rounded-lg ${
                            isWaterRelated 
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                              : isFireRelated
                                ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                          } transition-colors duration-300 group`}>
                            <span>View Full Case Study</span>
                            <div className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Elite Enterprise CTA Button at Bottom */}
                <div className="text-center mt-16">
                  <Link href={`/applications/${application.id}`}>
                    <div className="transform transition-all duration-700 hover:scale-105 inline-block">
                      <PremiumCartButton size="lg" className="text-lg">
                        Explore {application.title} Applications
                      </PremiumCartButton>
                    </div>
                  </Link>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default IndustryApplications;