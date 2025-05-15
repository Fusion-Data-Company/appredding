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
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/70 rounded-tr-md"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500/50 rounded-full blur-[2px]"></div>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-500">
                  Protection Across Every Industry
                </span>
              </div>
              
              {/* Text shadow for depth */}
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-tight opacity-70 blur-[2px] text-red-900/30 -z-10">
                Protection Across Every Industry
              </div>
              
              {/* Subtle moving highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent"></div>
            </div>
            
            {/* Bottom horizontal accent line with enhanced glow */}
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-red-400/60 to-transparent rounded-full blur-sm animate-pulse-slow"></span>
            
            {/* Left bottom corner accent */}
            <span className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-orange-500/50 rounded-bl-lg"></span>
            
            {/* Right bottom corner accent */}
            <span className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-red-500/50 rounded-br-lg"></span>
          </h2>
          
          {/* Enhanced description with premium styling */}
          <p className="text-gray-200 dark:text-gray-300 max-w-2xl mx-auto font-medium text-lg tracking-wide leading-relaxed mb-10 mt-10 relative px-6">
            {/* Left side ornamental accent */}
            <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-md"></span>
              <span className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-orange-500/20 via-orange-500/40 to-orange-500/20"></span>
            </span>
            
            {/* Enhanced text with subtle highlight */}
            <span className="relative">
              Explore how Praetorian's advanced ceramic coating technology delivers specialized protection and exceptional performance for diverse industries and applications.
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 rounded-lg"></span>
            </span>
            
            {/* Right side ornamental accent */}
            <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-md"></span>
              <span className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-orange-500/20 via-orange-500/40 to-orange-500/20"></span>
            </span>
          </p>
          
          {/* Bottom decorative element */}
          <div className="w-full flex justify-center">
            <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          </div>
        </div>

        <Tabs defaultValue="fire-prevention" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1.5 
              bg-gray-800/60 backdrop-blur-xl 
              border-0 rounded-xl mb-8 premium-gradient-border
              shadow-[0_4px_20px_rgba(251,191,36,0.2)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
              relative overflow-hidden"
            style={{
              backgroundImage: `url('/assets/images/praetorian-shield-logo.png')`,
              backgroundPosition: 'center center', // Standardized position
              backgroundSize: '40%',
              backgroundRepeat: 'no-repeat',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="absolute inset-0 bg-amber-50/60 dark:bg-gray-900/70 backdrop-blur-sm premium-gradient-border-bright tabs-glow-pulse rounded-xl"></div>
            {applications.map(app => (
              <TabsTrigger 
                key={app.id} 
                value={app.id}
                className="py-3 relative z-10 font-medium transition-all duration-300 overflow-hidden
                  data-[state=active]:bg-gray-800/80 
                  data-[state=active]:text-amber-400
                  data-[state=active]:shadow-[0_4px_12px_rgba(251,191,36,0.25)] dark:data-[state=active]:shadow-[0_4px_12px_rgba(0,0,0,0.3)]
                  data-[state=active]:border-0 data-[state=active]:premium-gradient-border
                  data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:left-[10%]
                  data-[state=active]:before:w-[80%] data-[state=active]:before:h-[2px]
                  data-[state=active]:before:bg-gradient-to-r data-[state=active]:before:from-amber-500
                  data-[state=active]:before:via-[rgba(220,65,30,0.95)] data-[state=active]:before:to-amber-500
                  rounded-lg text-gray-300
                  hover:bg-gray-800/50
                  hover:shadow-[0_4px_12px_rgba(251,191,36,0.15)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                  hover:-translate-y-0.5 
                  group
                  transform transition-transform"
              >
                <div className="flex flex-col items-center gap-2 p-1 relative z-10">
                  <div className="text-[rgba(200,45,20,0.9)] dark:text-[rgba(220,65,30,0.95)] transition-all duration-300 transform hover:scale-125">
                    {React.cloneElement(app.icon as React.ReactElement, { 
                      size: 26, 
                      strokeWidth: 1.5,
                      className: "drop-shadow-[0_2px_3px_rgba(200,45,20,0.4)]"
                    })}
                  </div>
                  <span className="text-xs font-semibold tracking-wide">{app.title}</span>
                </div>
                {/* Shimmer effect only for active tabs, matching the "Get Praetorian SmartCoat Now" button */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden data-[state=active]:block hidden">
                  <div className="absolute top-0 left-[-100%] h-full w-[300%] 
                    bg-gradient-to-r from-transparent via-white/40 to-transparent
                    animate-shimmer"
                  ></div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {applications.map(app => (
            <TabsContent key={app.id} value={app.id} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl shadow-[0_10px_50px_rgba(251,191,36,0.2)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.4)] overflow-hidden border-0 premium-gradient-border relative"
                  style={{
                    backgroundImage: "url(/assets/images/stone-texture-bg.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay"
                  }}
                >
                  <div className="p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                      <span className="text-amber-600 dark:text-amber-400 transform transition-all duration-500 hover:scale-110 hover:rotate-3">{app.icon}</span>
                      <GradientText variant="fire" className="border-b-2 border-amber-400/30 dark:border-amber-600/30 pb-1 drop-shadow-[0_1px_2px_rgba(251,191,36,0.3)]">
                        {app.title} Applications
                      </GradientText>
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium text-lg max-w-3xl">
                      {app.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {app.benefits.map((benefit, index) => {
                        // Determine theme variant based on application type
                        const isWaterRelated = app.id === "marinas" || app.id === "pools";
                        const isFireRelated = app.id === "fire-prevention";
                        
                        // Set gradient theme based on application
                        const themeGradient = isWaterRelated 
                          ? "from-blue-500/50 via-transparent to-cyan-500/50" 
                          : isFireRelated
                            ? "from-orange-500/50 via-transparent to-red-500/50"
                            : "from-amber-500/50 via-transparent to-orange-500/50";
                            
                        // Set glow theme based on application
                        const glowTheme = isWaterRelated
                          ? "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 70%)"
                          : isFireRelated
                            ? "radial-gradient(circle at center, rgba(251,113,36,0.3) 0%, transparent 70%)"
                            : "radial-gradient(circle at center, rgba(251,191,36,0.3) 0%, transparent 70%)";
                        
                        return (
                          <div key={index} className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10">
                            {/* Premium Card Container */}
                            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-5 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 h-full">
                              {/* Premium gradient border effect - Theme variant with index-based opacity variation - moved inside */}
                              <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${themeGradient} opacity-30`} style={{ opacity: 0.3 + (index % 3) * 0.05 }}></div>
                              
                              {/* Inner highlight */}
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                              
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
                                  <span className={`inline-block ${
                                    isWaterRelated 
                                      ? "text-blue-300 group-hover:text-blue-200" 
                                      : isFireRelated
                                        ? "text-amber-400 group-hover:text-amber-300"
                                        : "text-amber-400 group-hover:text-amber-300"
                                  } transition-colors duration-300`}>
                                    {benefit.title}
                                  </span>
                                  {/* Animated underline */}
                                  <div className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-3/4 transition-all duration-700 bg-gradient-to-r ${
                                    isWaterRelated 
                                      ? "from-blue-400 to-cyan-400" 
                                      : isFireRelated
                                        ? "from-orange-500 to-red-500"
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
                        );
                      })}
                    </div>
                    
                    {/* Premium Enterprise Case Study Container */}
                    <div className="relative group">
                      {/* Premium Card Container */}
                      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)] z-10">
                        {/* Premium gradient border effect - Theme-based styling - reduced opacity */}
                        <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${
                          app.id === "marinas" || app.id === "pools"
                            ? "from-blue-500/40 via-transparent to-cyan-500/40" 
                            : app.id === "fire-prevention"
                              ? "from-orange-500/40 via-transparent to-red-500/40"
                              : "from-amber-500/40 via-transparent to-orange-500/40"
                        } opacity-80`}></div>
                        
                        {/* Inner highlight */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                        
                        {/* Subtle ambient glow - removed to avoid interference with image */}
                        
                        {/* Premium Header */}
                        <div className="flex items-center mb-8 relative">
                          {/* Animated accent bar */}
                          <div className={`h-10 w-2 rounded-full mr-3 ${
                            app.id === "marinas" || app.id === "pools"
                              ? "bg-gradient-to-b from-blue-400 to-cyan-600" 
                              : app.id === "fire-prevention"
                                ? "bg-gradient-to-b from-orange-400 to-red-600"
                                : "bg-gradient-to-b from-amber-400 to-orange-600"
                          } animate-pulse-subtle`}></div>
                          
                          {/* Header with theme-based styling */}
                          <div>
                            <h4 className="text-2xl font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                              <span className={`inline-block ${
                                app.id === "marinas" || app.id === "pools"
                                  ? "text-blue-300" 
                                  : app.id === "fire-prevention"
                                    ? "text-amber-400"
                                    : "text-amber-400"
                              }`}>
                                Case Study:
                              </span>{" "}
                              <span className="text-white ml-1">{app.caseStudy.title}</span>
                            </h4>
                            
                            {/* Premium location badge */}
                            <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full ${
                              app.id === "marinas" || app.id === "pools"
                                ? "bg-blue-900/40 border border-blue-700/30" 
                                : app.id === "fire-prevention"
                                  ? "bg-red-900/40 border border-red-700/30"
                                  : "bg-amber-900/40 border border-amber-700/30"
                            }`}>
                              <span className="text-gray-300 text-sm font-medium">
                                {app.caseStudy.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Premium content layout */}
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Information column */}
                          <div className="md:w-2/3 space-y-5">
                            {/* Challenge card */}
                            <div className="group relative">
                              {/* Premium Card Container */}
                              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10">
                                {/* Premium gradient border effect - reduced opacity */}
                                <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${
                                  app.id === "marinas" || app.id === "pools"
                                    ? "from-blue-500/30 via-transparent to-cyan-500/30" 
                                    : app.id === "fire-prevention"
                                      ? "from-orange-500/30 via-transparent to-red-500/30"
                                      : "from-amber-500/30 via-transparent to-orange-500/30"
                                } opacity-70 transition-opacity duration-300 group-hover:opacity-90`}></div>
                                
                                {/* Inner highlight */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                                
                                {/* Content */}
                                <div className="relative z-10">
                                  {/* Section label with icon */}
                                  <div className="flex items-center mb-2">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "bg-blue-900/70 text-blue-300" 
                                        : app.id === "fire-prevention"
                                          ? "bg-red-900/70 text-amber-300"
                                          : "bg-amber-900/70 text-amber-300"
                                    }`}>1</div>
                                    <p className={`font-medium text-sm uppercase tracking-wide ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "text-blue-300" 
                                        : app.id === "fire-prevention"
                                          ? "text-amber-400"
                                          : "text-amber-400"
                                    }`}>Challenge</p>
                                  </div>
                                  
                                  {/* Challenge content */}
                                  <p className="text-gray-300 leading-relaxed pl-8 relative">
                                    {/* Animated side indicator */}
                                    <span className={`absolute left-0 top-0 bottom-0 w-1 ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "bg-blue-800/50" 
                                        : app.id === "fire-prevention"
                                          ? "bg-red-800/50"
                                          : "bg-amber-800/50"
                                    } rounded-full`}></span>
                                    {app.caseStudy.challenge}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Solution card */}
                            <div className="group relative">
                              {/* Premium Card Container */}
                              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10 ">
                              
                                {/* Premium gradient border effect - reduced opacity */}
                                <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${
                                  app.id === "marinas" || app.id === "pools"
                                    ? "from-blue-500/30 via-transparent to-cyan-500/30" 
                                    : app.id === "fire-prevention"
                                      ? "from-orange-500/30 via-transparent to-red-500/30"
                                      : "from-amber-500/30 via-transparent to-orange-500/30"
                                } opacity-70 transition-opacity duration-300 group-hover:opacity-90`}></div>
                                
                                {/* Inner highlight */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                                
                                {/* Content */}
                                <div className="relative z-10">
                                  {/* Section label with icon */}
                                  <div className="flex items-center mb-2">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "bg-blue-900/70 text-blue-300" 
                                        : app.id === "fire-prevention"
                                          ? "bg-red-900/70 text-amber-300"
                                          : "bg-amber-900/70 text-amber-300"
                                    }`}>2</div>
                                    <p className={`font-medium text-sm uppercase tracking-wide ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "text-blue-300" 
                                        : app.id === "fire-prevention"
                                          ? "text-amber-400"
                                          : "text-amber-400"
                                    }`}>Solution</p>
                                  </div>
                                  
                                  {/* Solution content */}
                                  <p className="text-gray-300 leading-relaxed pl-8 relative">
                                    {/* Animated side indicator */}
                                    <span className={`absolute left-0 top-0 bottom-0 w-1 ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "bg-blue-800/50" 
                                        : app.id === "fire-prevention"
                                          ? "bg-red-800/50"
                                          : "bg-amber-800/50"
                                    } rounded-full`}></span>
                                    {app.caseStudy.solution}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Results card */}
                            <div className="group relative">
                              {/* Premium Card Container */}
                              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10 ">
                              
                                {/* Background glow effects BEHIND the content */}
                                {/* Premium gradient border effect */}
                                <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${
                                  app.id === "marinas" || app.id === "pools"
                                    ? "from-blue-500/30 via-transparent to-cyan-500/30" 
                                    : app.id === "fire-prevention"
                                      ? "from-orange-500/30 via-transparent to-red-500/30"
                                      : "from-amber-500/30 via-transparent to-orange-500/30"
                                } opacity-70 transition-opacity duration-300 group-hover:opacity-90`}></div>
                                
                                {/* Inner highlight */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                                
                                {/* Content */}
                                <div className="relative z-10">
                                  {/* Section label with icon */}
                                  <div className="flex items-center mb-3">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "bg-blue-900/70 text-blue-300" 
                                        : app.id === "fire-prevention"
                                          ? "bg-red-900/70 text-amber-300"
                                          : "bg-amber-900/70 text-amber-300"
                                    }`}>3</div>
                                    <p className={`font-medium text-sm uppercase tracking-wide ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "text-blue-300" 
                                        : app.id === "fire-prevention"
                                          ? "text-amber-400"
                                          : "text-amber-400"
                                    }`}>Results</p>
                                  </div>
                                  
                                  {/* Results list with enhanced checkmarks */}
                                  <ul className="space-y-3 pl-8 relative">
                                    {/* Animated side indicator */}
                                    <span className={`absolute left-0 top-0 bottom-0 w-1 ${
                                      app.id === "marinas" || app.id === "pools"
                                        ? "bg-blue-800/50" 
                                        : app.id === "fire-prevention"
                                          ? "bg-red-800/50"
                                          : "bg-amber-800/50"
                                    } rounded-full`}></span>
                                    
                                    {app.caseStudy.results.map((result, index) => (
                                      <li key={index} className="flex items-start group/item">
                                        {/* Icon with enhanced styling */}
                                        <div className="relative mr-3 flex-shrink-0">
                                          {/* Glow effect on hover */}
                                          <div className={`absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ${
                                            app.id === "marinas" || app.id === "pools"
                                              ? "bg-blue-500/30 blur-[6px]" 
                                              : app.id === "fire-prevention"
                                                ? "bg-orange-500/30 blur-[6px]"
                                                : "bg-amber-500/30 blur-[6px]"
                                          }`}></div>
                                          
                                          {/* Icon */}
                                          <CheckCircle 
                                            size={18} 
                                            className={`relative z-10 ${
                                              app.id === "marinas" || app.id === "pools"
                                                ? "text-blue-400" 
                                                : app.id === "fire-prevention"
                                                  ? "text-orange-400"
                                                  : "text-amber-400"
                                            } transform transition-transform duration-300 group-hover/item:scale-125`} 
                                          />
                                        </div>
                                        
                                        {/* Result text */}
                                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                                          {result}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Image column */}
                          <div className="md:w-1/3 flex justify-center items-center">
                            {/* Premium image container */}
                            <div className="relative group/image overflow-hidden" style={{zIndex: 100}}>
                              {/* Image container with theme-based styling */}
                              <div className={`relative rounded-xl overflow-hidden border-2 ${
                                app.id === "marinas" || app.id === "pools"
                                  ? "border-blue-700/30" 
                                  : app.id === "fire-prevention"
                                    ? "border-red-700/30"
                                    : "border-amber-700/30"
                                } shadow-[0_10px_40px_rgba(0,0,0,0.4)] transform transition-all duration-700 group-hover/image:scale-[1.03]`}>
                                {/* Image */}
                                <img
                                  src={app.caseStudy.image || ''}
                                  alt={`${app.title} Application`}
                                  className={`w-full h-64 ${!app.caseStudy.image ? 'opacity-0' : 'object-cover'} transition-all duration-700 group-hover/image:saturate-[1.1]`}
                                  style={{display: app.caseStudy.image ? 'block' : 'none'}}
                                />
                                
                                {/* Gradient overlay with forced Praetorian logo */}
                                <div className="absolute inset-0 bg-black flex items-center justify-center" style={{zIndex: 50}}>
                                  <img 
                                    src={praetorianLogoFire} 
                                    alt="Praetorian SmartCoat" 
                                    className="w-full h-auto max-h-56 object-contain"
                                    style={{zIndex: 50}}
                                  />
                                </div>
                              </div>
                              
                              {/* Caption */}
                              <div className={`absolute bottom-0 left-0 right-0 p-4 ${
                                app.id === "marinas" || app.id === "pools"
                                  ? "bg-gradient-to-t from-blue-900/80 to-blue-900/0" 
                                  : app.id === "fire-prevention"
                                    ? "bg-gradient-to-t from-red-900/80 to-red-900/0"
                                    : "bg-gradient-to-t from-amber-900/80 to-amber-900/0"
                              }`} style={{zIndex: 51}}>
                                <p className="text-white font-bold text-lg md:text-xl lg:text-2xl opacity-0 group-hover/image:opacity-100 transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-500 relative overflow-hidden" style={{marginTop: "50px", position: "relative", top: "30px"}}>
                                  {app.title} application at {app.caseStudy.title}
                                  
                                  {/* Premium shimmer effect like intro button */}
                                  <span className="absolute inset-0 pointer-events-none overflow-hidden">
                                    <span className="absolute top-0 left-[-100%] h-full w-[300%] 
                                      bg-gradient-to-r from-transparent via-white/40 to-transparent
                                      animate-shimmer"
                                    ></span>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtle bottom reflection */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

// Import missing CheckCircle component at the top
export default IndustryApplications;