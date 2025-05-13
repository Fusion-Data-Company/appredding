import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Warehouse, Ship, AlarmClockCheck, Home, Building2, Droplets, ThermometerSun, Wrench, Zap, DollarSign, Shield, CheckCircle, Sun } from "lucide-react";

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
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-amber-600/80 to-amber-500/80 dark:from-amber-700/80 dark:to-amber-600/80 px-4 py-1.5 border border-amber-400 dark:border-amber-500 rounded-md shadow-[0_2px_10px_rgba(251,191,36,0.2)] backdrop-blur-sm">
            <span className="font-semibold text-white tracking-wide text-sm uppercase">Industry Solutions</span>
          </div>
          <h2 className="text-4xl font-bold text-white dark:text-amber-300 mb-4 mt-4 tracking-tight drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)] [text-shadow:0_4px_8px_rgba(0,0,0,0.5)]">
            Protection Across Every Industry
          </h2>
          <p className="text-gray-200 dark:text-gray-300 max-w-2xl mx-auto font-medium text-lg tracking-wide leading-relaxed">
            Explore how Praetorian's advanced ceramic coating technology delivers specialized protection and exceptional performance for diverse industries and applications.
          </p>
        </div>

        <Tabs defaultValue="fire-prevention" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1.5 
              bg-gradient-to-br from-amber-100/90 via-amber-50/95 to-white/90 
              dark:from-gray-900/95 dark:via-amber-900/40 dark:to-amber-800/30 
              border-2 border-amber-300 dark:border-amber-700 rounded-xl mb-8 
              shadow-[0_4px_20px_rgba(251,191,36,0.2)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] 
              backdrop-blur-sm relative overflow-hidden"
            style={{
              backgroundImage: `url('/assets/images/praetorian-shield-logo.png')`,
              backgroundPosition: 'center',
              backgroundSize: '40%',
              backgroundRepeat: 'no-repeat',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="absolute inset-0 bg-amber-50/60 dark:bg-gray-900/70 backdrop-blur-sm"></div>
            {applications.map(app => (
              <TabsTrigger 
                key={app.id} 
                value={app.id}
                className="py-3 relative z-10 font-medium transition-all duration-300 
                  data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-amber-50 
                  dark:data-[state=active]:from-amber-800 dark:data-[state=active]:to-amber-900 
                  data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-100 
                  data-[state=active]:shadow-lg data-[state=active]:border-b-2 
                  data-[state=active]:border-amber-500 dark:data-[state=active]:border-amber-500 
                  rounded-lg text-gray-700 dark:text-amber-300 
                  hover:bg-amber-50/70 dark:hover:bg-amber-800/50 
                  hover:shadow-md hover:-translate-y-0.5 
                  transform transition-transform"
              >
                <div className="flex flex-col items-center gap-2 p-1">
                  <div className="text-amber-600 dark:text-amber-400 transition-all duration-300 transform hover:scale-125">
                    {React.cloneElement(app.icon as React.ReactElement, { 
                      size: 26, 
                      strokeWidth: 1.5,
                      className: "drop-shadow-[0_1px_1px_rgba(251,191,36,0.4)]"
                    })}
                  </div>
                  <span className="text-xs font-semibold tracking-wide">{app.title}</span>
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
                  className="bg-gradient-to-b from-white/95 to-amber-50/95 dark:from-gray-800/95 dark:to-gray-900/95 rounded-xl shadow-[0_10px_50px_rgba(251,191,36,0.2)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.4)] overflow-hidden border-2 border-amber-200 dark:border-amber-700"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-3 drop-shadow-[0_1px_2px_rgba(251,191,36,0.3)]">
                      <span className="text-amber-600 dark:text-amber-400 transform transition-all duration-500 hover:scale-110 hover:rotate-3">{app.icon}</span>
                      <span className="border-b-2 border-amber-400/30 dark:border-amber-600/30 pb-1">{app.title} Applications</span>
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium text-lg max-w-3xl">
                      {app.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {app.benefits.map((benefit, index) => (
                        <div key={index} className="group bg-gradient-to-b from-amber-50/95 to-white/90 dark:from-amber-900/30 dark:to-gray-900/30 p-5 rounded-lg border border-amber-200 dark:border-amber-700/50 shadow-[0_4px_15px_rgba(251,191,36,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(251,191,36,0.2)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                          <div className="text-amber-600 dark:text-amber-400 mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-amber-500 dark:group-hover:text-amber-300">
                            {benefit.icon}
                          </div>
                          <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 text-lg group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors duration-300">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50/95 to-white/90 dark:from-amber-900/40 dark:to-gray-900/40 rounded-xl p-8 shadow-[0_10px_40px_rgba(251,191,36,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-amber-300/50 dark:border-amber-700/50 backdrop-blur-sm">
                      <div className="flex items-center mb-6">
                        <div className="h-10 w-2 bg-amber-500 dark:bg-amber-600 rounded-full mr-3"></div>
                        <h4 className="text-2xl font-bold text-amber-800 dark:text-amber-300 drop-shadow-sm">
                          Case Study: <span className="text-amber-600 dark:text-amber-200">{app.caseStudy.title}</span>
                        </h4>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-2/3">
                          <div className="mb-5 bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                            <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-wider">Location</div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">{app.caseStudy.location}</div>
                          </div>
                          
                          <div className="mb-5 bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                            <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-wider">Challenge</div>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{app.caseStudy.challenge}</div>
                          </div>
                          
                          <div className="mb-5 bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                            <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-wider">Solution</div>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{app.caseStudy.solution}</div>
                          </div>
                          
                          <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                            <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">Results</div>
                            <ul className="space-y-3">
                              {app.caseStudy.results.map((result, index) => (
                                <li key={index} className="flex items-start gap-2 group">
                                  <CheckCircle className="h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300" />
                                  <span className="text-gray-700 dark:text-gray-300">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="md:w-1/3 flex justify-center items-center">
                          <div className="rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 p-3 border border-amber-100 dark:border-amber-900/50 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-[0_20px_60px_rgba(251,191,36,0.3)]">
                            <img 
                              src={app.caseStudy.image || "/assets/images/praetorian-shield-logo.png"} 
                              alt={`${app.title} application`}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="text-sm text-center font-medium text-amber-700 dark:text-amber-300 mt-2">{app.title} Application</div>
                          </div>
                        </div>
                      </div>
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