import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Warehouse, Ship, AlarmClockCheck, Home, Building2, Droplets, ThermometerSun, Wrench, Zap, DollarSign, Shield, CheckCircle, Sun, ShoppingCart } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { Link } from "wouter";
import { PremiumCartButton } from "@/utils/premium-buttons";
import praetorianLogoFire from "../../assets_dir/images/praetorian-logo-fire.png";
import fireBackground from "@assets/fire-bg.jpg";
import paintersBackground from "@assets/painters.jpg";
import { PRAETORIAN_HERO_IMAGE } from "../../assets_dir/imageExports";

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

// Nicely styled data set - Enterprise class structure
const applications: ApplicationData[] = [
  {
    id: "fire-prevention",
    title: "Fire Prevention",
    icon: <Shield className="h-5 w-5 text-orange-500" />,
    description: "Industry-leading fire retardant coatings that offer unparalleled protection against wildfires and structural fires.",
    benefits: [
      {
        icon: <Shield className="h-6 w-6 text-orange-500" />,
        title: "Class-A Fire Rating",
        description: "Our coatings meet the highest standards for fire protection, providing crucial defense during emergencies."
      },
      {
        icon: <Sun className="h-6 w-6 text-orange-500" />,
        title: "High Heat Resistance",
        description: "Withstands temperatures up to 2000°F, creating a critical time buffer for emergency response."
      },
      {
        icon: <ThermometerSun className="h-6 w-6 text-orange-500" />,
        title: "Thermal Barrier",
        description: "Advanced ceramic microsphere technology creates superior insulative properties against heat transfer."
      }
    ],
    caseStudy: {
      title: "Wildfire Defense System",
      location: "Northern California Community",
      challenge: "A residential development in a high-risk wildfire zone needed enhanced protection for wooden structures and surrounding vegetation.",
      solution: "Applied SmartCoat FireShield to all wooden structures and created a protective barrier around the perimeter with our specialized formulation.",
      results: [
        "Community successfully withstood three wildfire threats since application",
        "Reduced insurance premiums by 35% for all residents",
        "Zero structural damage reported during recent close-proximity fire"
      ],
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  },
  {
    id: "marinas",
    title: "Marinas",
    icon: <Ship className="h-5 w-5 text-blue-500" />,
    description: "Specialized coatings designed for the harsh marine environment, offering exceptional protection against salt, water, and UV damage.",
    benefits: [
      {
        icon: <Droplets className="h-6 w-6 text-blue-500" />,
        title: "Salt Water Resistant",
        description: "Advanced protection against the corrosive effects of constant salt water exposure on docks and marine structures."
      },
      {
        icon: <Sun className="h-6 w-6 text-blue-500" />,
        title: "UV Protection",
        description: "Prevents degradation and color fading caused by intense sun exposure in marine environments."
      },
      {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: "Anti-Fouling Properties",
        description: "Specialized formulation discourages marine growth and biological accumulation on treated surfaces."
      }
    ],
    caseStudy: {
      title: "Coastal Marina Renovation",
      location: "Gulf Coast Commercial Marina",
      challenge: "A major marina faced severe corrosion and structural degradation due to harsh coastal conditions and constant salt water exposure.",
      solution: "Applied SmartCoat MarineSeal system to all wooden docks, metal structures, and concrete pilings throughout the facility.",
      results: [
        "Extended maintenance cycle from annual to five-year intervals",
        "80% reduction in hardware replacement costs",
        "Significant improvement in slip rental occupancy due to improved aesthetics and safety"
      ],
      image: "https://images.unsplash.com/photo-1528155124528-088d4014a0a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80"
    }
  },
  {
    id: "pools",
    title: "Pools",
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
    description: "Premium pool coating systems that resist chemicals, prevent leaks, and provide a beautiful, long-lasting finish.",
    benefits: [
      {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: "Chemical Resistant",
        description: "Withstands exposure to pool chemicals including chlorine, salt, and pH balancers without degradation."
      },
      {
        icon: <Sun className="h-6 w-6 text-blue-500" />,
        title: "Non-Slip Surface",
        description: "Enhanced texture provides crucial safety features for wet areas while maintaining comfort for bare feet."
      },
      {
        icon: <Droplets className="h-6 w-6 text-blue-500" />,
        title: "Waterproof Seal",
        description: "Creates an impermeable barrier that prevents water loss and structural damage from leaks."
      }
    ],
    caseStudy: {
      title: "Resort Pool Renovation",
      location: "Luxury Hawaii Resort",
      challenge: "A high-end resort needed to renovate multiple pool facilities without extending closure time and with guaranteed longevity.",
      solution: "Applied SmartCoat AquaSeal system with accelerated cure formulation to all pool surfaces, including underwater lighting fixtures.",
      results: [
        "Reduced renovation time by 40% compared to traditional methods",
        "Eliminated leak issues that had persisted through two previous renovations",
        "Enhanced appearance with custom color matching to resort's design palette"
      ],
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  },
  {
    id: "construction",
    title: "Construction",
    icon: <Building className="h-5 w-5 text-yellow-500" />,
    description: "Heavy-duty coatings for construction applications, providing superior protection for concrete, metal, and wood structures.",
    benefits: [
      {
        icon: <Shield className="h-6 w-6 text-yellow-500" />,
        title: "Weather Resistant",
        description: "Protects structures from rain, snow, UV exposure, and temperature fluctuations in all climate conditions."
      },
      {
        icon: <AlarmClockCheck className="h-6 w-6 text-yellow-500" />,
        title: "Extended Lifespan",
        description: "Significantly extends maintenance cycles and overall lifespan of treated structural elements."
      },
      {
        icon: <Wrench className="h-6 w-6 text-yellow-500" />,
        title: "Easy Application",
        description: "Engineered for efficient application across large areas with standard equipment, reducing labor costs."
      }
    ],
    caseStudy: {
      title: "Commercial Building Protection",
      location: "Midwest Office Complex",
      challenge: "A five-building office complex required comprehensive weatherproofing with minimal business disruption during application.",
      solution: "Implemented phased application of SmartCoat ConstructSeal on all exterior concrete, metal flashings, and HVAC infrastructure.",
      results: [
        "Eliminated water infiltration issues that had plagued the complex for years",
        "Reduced energy costs by 22% through improved thermal performance",
        "Extended facade maintenance cycle from 5-year to 15-year intervals"
      ],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
    }
  },
  {
    id: "mobile-home",
    title: "Mobile Home & RV",
    icon: <Home className="h-5 w-5 text-yellow-500" />,
    description: "Specialized coatings for mobile structures that provide weather protection, energy efficiency, and extended lifespan.",
    benefits: [
      {
        icon: <ThermometerSun className="h-6 w-6 text-yellow-500" />,
        title: "Thermal Regulation",
        description: "Advanced ceramic technology reduces heat transfer, lowering cooling costs in summer and heating costs in winter."
      },
      {
        icon: <Shield className="h-6 w-6 text-yellow-500" />,
        title: "Leak Prevention",
        description: "Creates a seamless, waterproof membrane that eliminates common leak points in mobile structures."
      },
      {
        icon: <DollarSign className="h-6 w-6 text-yellow-500" />,
        title: "Value Preservation",
        description: "Protects your investment by preventing the most common causes of depreciation in mobile homes and RVs."
      }
    ],
    caseStudy: {
      title: "RV Fleet Protection",
      location: "National Rental Fleet",
      challenge: "A nationwide RV rental company needed to extend vehicle lifespan and reduce maintenance costs across their diverse fleet.",
      solution: "Developed custom SmartCoat MobileProtect system tailored for different RV construction types and applied to 500+ vehicles.",
      results: [
        "Reduced roof-related repairs by 87% across the fleet",
        "Improved fuel efficiency by 8-12% through better thermal regulation",
        "Extended average vehicle service life by 4.5 years before major renovation"
      ],
      image: "https://images.unsplash.com/photo-1516449609426-c117e1c5c816?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80"
    }
  },
  {
    id: "municipality",
    title: "Municipality",
    icon: <Building2 className="h-5 w-5 text-blue-500" />,
    description: "Protective solutions for public infrastructure including water systems, roadways, bridges, and government buildings.",
    benefits: [
      {
        icon: <Zap className="h-6 w-6 text-blue-500" />,
        title: "Long-Term Durability",
        description: "Engineered for decades of protection with minimal maintenance, ideal for public works projects."
      },
      {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: "Chemical Resistance",
        description: "Withstands exposure to road salt, wastewater chemicals, and other harsh municipal environmental factors."
      },
      {
        icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
        title: "Code Compliance",
        description: "Meets or exceeds all relevant municipal building codes and environmental regulations nationwide."
      }
    ],
    caseStudy: {
      title: "Water Infrastructure Protection",
      location: "Southwest Municipal Water District",
      challenge: "A water district needed corrosion protection for concrete water tanks, metal pipes, and treatment facilities facing severe desert conditions.",
      solution: "Applied specialized SmartCoat MuniShield system to all water-contact surfaces and exterior infrastructure with enhanced UV protection.",
      results: [
        "Passed all NSF/ANSI 61 safety certifications for drinking water contact",
        "Prevented concrete spalling in elevated tanks despite extreme temperature fluctuations",
        "Projected 30+ year service life based on accelerated testing protocols"
      ],
      image: "https://images.unsplash.com/photo-1584049939594-584fac3f42e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
    }
  }
];

export default function IndustryApplications() {
  const [selectedTab, setSelectedTab] = useState(applications[0].id);
  
  return (
    <section 
      id="industry-applications" 
      className="py-20 relative overflow-hidden bg-black"
      style={{ 
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
          
          {/* Premium Styled Title Card with advanced styling */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 rounded-xl blur-xl opacity-80 animate-pulse-slow"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(249,115,22,0.2)] backdrop-blur-sm">
              {/* Corner accents - premium touch matching cards */}
              <div className="absolute top-4 left-4 w-12 h-12 z-10">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 z-10">
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
              </div>
              
              {/* Additional background gradient areas */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-5">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 z-5">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-bl-xl blur-[2px]"></div>
              </div>
              
              {/* Background blur text */}
              <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 pointer-events-none">
                Protection Across Every Industry
              </div>
              
              {/* Main title with premium styling - matching "What Our Clients Say" */}
              <h2 className="text-white
                drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                text-4xl md:text-5xl font-bold relative z-30 mb-6 whitespace-nowrap">
                Protection Across Every Industry
              </h2>
              
              {/* Multiple text shadows for depth */}
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 z-10 transform scale-105 pointer-events-none">
                <span className="whitespace-nowrap">Protection Across Every Industry</span>
              </div>
            </div>
          </div>
          
          {/* Premium styled description with same styling as other headers */}
          <div className="relative max-w-3xl mx-auto mt-4 mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 rounded-xl blur-lg opacity-70 animate-pulse-slow"></div>
            
            <p className="text-gray-200 font-medium text-xl tracking-wide leading-relaxed relative z-10 p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 shadow-lg">
              {/* Enhanced text with premium styling */}
              <span className="relative text-center block">
                Explore how Praetorian's advanced ceramic coating technology delivers specialized protection and exceptional performance for diverse industries and applications.
              </span>
              
              {/* Bottom reflection effect */}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></span>
            </p>
          </div>
        </div>
        
        {/* Premium Enterprise Tabs Container */}
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="relative z-20"
        >
          {/* Premium Styled TabsList */}
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto overflow-hidden relative">
            
            {/* Premium Tabs List with enhanced hover effects */}
            <TabsList className="backdrop-blur-sm h-auto mb-8 flex flex-wrap justify-center gap-2 border border-blue-500/20 rounded-xl px-2 py-3 relative">
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
            const gradientTheme = isWaterRelated 
              ? "from-blue-500/40 via-blue-600/40 to-blue-700/40"
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
                      <div key={index} className="relative transform transition-all duration-500 z-20">
                        <div className="group relative">
                          {/* Multiple layered background effects - matching Testimonials section - MOVED TO BACK */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow z-0"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500 z-0"></div>
                          
                          {/* Main card container - matching Testimonials section - PULLED TO FRONT */}
                          <div className="relative backdrop-blur-sm bg-black/90 rounded-xl p-5 z-30 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 h-full">
                          
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
                              <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-blue-500/30 rounded-br-md"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                              <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                              <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-blue-500/30 rounded-bl-md"></div>
                            </div>
                            
                            {/* Content with premium formatting */}
                            <div className="pt-6 pb-8 px-2 relative z-10">
                              <div className="text-center mb-4">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 mb-4 relative group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-shadow duration-500">
                                  {/* Icon glow effect */}
                                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                      style={{ background: glowTheme, filter: "blur(10px)" }}>
                                  </div>
                                  
                                  {/* Icon with subtle animation */}
                                  <div className="relative">
                                    {benefit.icon}
                                  </div>
                                </div>
                                
                                <h3 className="text-xl text-white font-bold mb-1">{benefit.title}</h3>
                                
                                {/* Decorative accent line */}
                                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto my-3 rounded-full group-hover:w-24 transition-all duration-300"></div>
                              </div>
                              
                              <p className="text-gray-300 text-center">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="max-w-6xl mx-auto">
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 rounded-xl blur-lg opacity-70"></div>
                    
                    <div className="relative p-1 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/30 via-transparent to-orange-500/30">
                      <div className="bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-lg p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                          {/* Left column: Case study details */}
                          <div className="md:col-span-6 lg:col-span-7 space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                              <div className="bg-gradient-to-br from-orange-500/10 to-blue-500/10 p-1.5 rounded-lg">
                                <Badge className={`bg-gradient-to-r ${gradientTheme} text-white border-none px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide shadow-sm`}>
                                  Case Study
                                </Badge>
                              </div>
                              <span>{application.caseStudy.title}</span>
                            </h3>
                            
                            <div className="flex items-start gap-4 mb-4">
                              <div className="flex-shrink-0 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-3 rounded-lg">
                                <Building className="h-6 w-6 text-blue-400" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold mb-1 flex items-center">
                                  Location:
                                </h4>
                                <p className="text-gray-300">
                                  {application.caseStudy.location}
                                </p>
                              </div>
                            </div>
                            
                            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10 ">
                            
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
                            
                            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10 ">
                            
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
                            
                            {/* Results card - matching other enterprise cards */}
                            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10">
                              
                              {/* Premium gradient border effect - reduced opacity */}
                              <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r ${
                                isWaterRelated 
                                  ? "from-blue-500/30 to-cyan-500/30" 
                                  : isFireRelated
                                    ? "from-orange-500/30 to-red-500/30"
                                    : "from-amber-500/30 to-yellow-500/30"
                              }`}></div>
                              
                              <h4 className="text-white font-bold mb-3 flex items-center">
                                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                Results:
                              </h4>
                              <ul className="space-y-2">
                                {application.caseStudy.results.map((result, index) => (
                                  <li key={index} className="flex items-start gap-2 text-gray-300">
                                    <span className="flex-shrink-0 mt-1 w-5 h-5 flex justify-center items-center rounded-full bg-green-500/20 text-green-400">✓</span>
                                    {result}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {/* Right column: Image */}
                          <div className="md:col-span-6 lg:col-span-5">
                            <div className="relative h-full flex flex-col">
                              {/* Premium image container with multiple glows and effects */}
                              <div className="relative group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-1 h-full">
                                {/* Ambient glow behind image */}
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Corner glow effects */}
                                <div className="absolute -top-5 -right-5 w-48 h-48 bg-orange-600/20 rounded-full filter blur-[100px] animate-pulse-slow group-hover:bg-orange-500/30 transition-colors duration-500"></div>
                                <div className="absolute -bottom-5 -left-5 w-48 h-48 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse-slow-delayed group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                                
                                <div className="relative rounded-xl overflow-hidden shadow-2xl h-full border border-blue-500/20">
                                  {/* Superior glass-like background */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-950/70 to-black/70 backdrop-blur-xl"></div>
                                  
                                  {/* Premium styled image */}
                                  <div className="aspect-video md:h-full w-full relative rounded-lg overflow-hidden">
                                    {isFireRelated ? (
                                      <img 
                                        src={paintersBackground}
                                        alt={application.caseStudy.title}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    ) : application.caseStudy.image && (
                                      <img 
                                        src={application.caseStudy.image}
                                        alt={application.caseStudy.title}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    )}
                                    
                                    {/* Gradient overlay to ensure text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    
                                    {/* Premium glass sheen effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-30"></div>
                                    
                                    {/* Bottom content area with CTA */}
                                    <div className="absolute bottom-0 inset-x-0 p-4 md:p-6">
                                      <div>
                                        <h4 className="text-lg font-bold text-white drop-shadow-md mb-1">{application.title} Protection</h4>
                                        <p className="text-gray-300 text-sm mb-4 max-w-md">{application.description}</p>
                                        
                                        <Link href="/products">
                                          <PremiumCartButton size="sm" className="w-full md:w-auto">
                                            <div className="flex items-center justify-center">
                                              <ShoppingCart className="mr-2 h-4 w-4" />
                                              <span>Shop {application.title} Products</span>
                                            </div>
                                          </PremiumCartButton>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Bottom reflection effect */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
        
        {/* Additional Enterprise-grade CTA at bottom */}
        <div className="text-center mt-20">
          <Link href="/contact">
            <PremiumCartButton size="lg">
              Request Custom Solution for Your Industry
            </PremiumCartButton>
          </Link>
          <p className="text-gray-400 mt-6 italic">Enterprise-grade protection for any application</p>
          
          {/* Premium logo for enhanced branding */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-32 h-32 opacity-40">
              <img src={praetorianLogoFire} alt="Praetorian" className="absolute inset-0 w-full h-full object-contain" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}