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
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 999, 
        minHeight: "70vh", 
        marginTop: "-5px", 
        position: "relative", 
        paddingTop: "20px"
      }}
    >
      {/* Strong background tint for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-50/70 dark:bg-amber-900/50 px-3 py-1 border border-amber-300 dark:border-amber-700 rounded-md text-amber-800 dark:text-amber-300 font-medium text-sm">
            Industry Solutions
          </div>
          <h2 className="text-4xl font-bold text-white dark:text-amber-300 mb-4 mt-4 text-shadow-lg">
            Protection Across Every Industry
          </h2>
          <p className="text-gray-200 dark:text-gray-300 max-w-2xl mx-auto font-medium text-lg">
            Explore how Praetorian's ceramic coating technology delivers specialized protection for diverse industries and applications.
          </p>
        </div>

        <Tabs defaultValue="fire-prevention" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-amber-50/90 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-700 rounded-lg mb-8 shadow-lg">
            {applications.map(app => (
              <TabsTrigger 
                key={app.id} 
                value={app.id}
                className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-amber-800/90 data-[state=active]:text-amber-700 dark:data-[state=active]:text-white data-[state=active]:shadow-md text-gray-700 dark:text-amber-200 font-medium"
              >
                <div className="flex flex-col items-center gap-1">
                  {app.icon}
                  <span className="text-xs font-medium">{app.title}</span>
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
                  className="bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-2xl overflow-hidden border-2 border-amber-200 dark:border-amber-700"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                      {app.icon}
                      <span>{app.title} Applications</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {app.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {app.benefits.map((benefit, index) => (
                        <div key={index} className="bg-amber-50/90 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700 shadow-md">
                          <div className="text-amber-600 dark:text-amber-400 mb-2">
                            {benefit.icon}
                          </div>
                          <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-amber-50/90 dark:bg-amber-800/30 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-700">
                      <h4 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-4">
                        Case Study: {app.caseStudy.title}
                      </h4>
                      
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-2/3">
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location:</div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">{app.caseStudy.location}</div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Challenge:</div>
                            <div className="text-gray-700 dark:text-gray-300">{app.caseStudy.challenge}</div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Solution:</div>
                            <div className="text-gray-700 dark:text-gray-300">{app.caseStudy.solution}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Results:</div>
                            <ul className="space-y-2">
                              {app.caseStudy.results.map((result, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700 dark:text-gray-300">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="md:w-1/3 flex justify-center items-center">
                          {app.caseStudy.image && (
                            <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700 p-2">
                              <img 
                                src={app.caseStudy.image} 
                                alt={`${app.title} case study`}
                                className="w-full h-48 object-cover rounded"
                              />
                            </div>
                          )}
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