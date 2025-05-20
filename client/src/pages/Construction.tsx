import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  FaBuilding, 
  FaHardHat, 
  FaShieldAlt, 
  FaChartLine, 
  FaTools, 
  FaLeaf, 
  FaFire, 
  FaSnowflake, 
  FaMoneyBillAlt, 
  FaPercentage, 
  FaRegLightbulb,
  FaTemperatureLow,
  FaCheckCircle,
  FaClock,
  FaPaintRoller,
  FaChartPie,
  FaHandHoldingUsd,
  FaUsers,
  FaHandshake,
  FaStar,
  FaDollarSign
} from "react-icons/fa";

import { RiBuilding2Line, RiShieldLine, RiFireLine } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import SimpleSEO from "@/components/SimpleSEO";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConstructionROICalculator from "@/components/ConstructionROICalculator";

// Form schema for contact
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(2, { message: "Company name is required" }),
  projectType: z.string().min(1, { message: "Please select a project type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const Construction = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [displayLearnMore, setDisplayLearnMore] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      projectType: "",
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Form Submitted",
      description: "We've received your request and will contact you shortly.",
    });
    form.reset();
  }

  return (
    <MainLayout fullWidth={true}>
      <SimpleSEO 
        title="Construction Solutions | Praetorian Smart-Coat"
        description="Advanced thermal protection solutions for construction projects. Increase energy efficiency and protect valuable assets with Praetorian Smart-Coat technology."
        keywords={["construction coating", "energy efficiency", "thermal protection", "building envelope", "construction insulation"]}
      />
      <div className="relative">
        {/* HERO SECTION */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Video background with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src="/src/assets_dir/videos/construction-hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 relative z-20 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="relative inline-block mb-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-blue-500/30 rounded-lg blur-md opacity-70"></div>
                <h1 className="relative text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 px-2">
                  Advanced Protection for Commercial Construction
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
                <span className="text-blue-300 font-semibold">Premium Enterprise Solution</span> to enhance building performance, reduce operational costs, and protect assets with Praetorian Smart-Coat™
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border border-blue-400/30 shadow-lg shadow-blue-900/20"
                >
                  Request a Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-amber-500 text-amber-500 hover:bg-amber-500/10 shadow-lg shadow-amber-900/10"
                  onClick={() => setDisplayLearnMore(true)}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Premium Enterprise Corner Accents */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 z-10 opacity-70">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-md"></div>
                <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-amber-500/40 rounded-tl-md"></div>
              </div>
              <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 z-10 opacity-70">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/50 rounded-tr-md"></div>
                <div className="absolute top-1 right-1 w-12 h-12 border-t border-r border-amber-500/40 rounded-tr-md"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SANDLER STAGE 1: PAIN - RED GLOW SECTION - Critical Problems */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Red glow effect with multi-layer glow */}
              <div className="absolute -inset-10 bg-red-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-red-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-red-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-red-700/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-200 to-red-300">
                  Critical Challenges in Commercial Construction
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaFire className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Fire Protection Vulnerabilities</h3>
                        <p className="text-gray-300">
                          Commercial buildings face critical fire protection challenges with traditional materials offering inadequate resistance, potentially leading to catastrophic losses. Current fire-retardant treatments deteriorate over time, leaving structures increasingly vulnerable.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.nfpa.org/News-and-Research/Publications-and-media/NFPA-Journal/2023/Summer-2023/Features/Infrastructure" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">National Fire Protection Association, Commercial Building Fire Risk Assessment (2023)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaTemperatureLow className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Thermal Inefficiency</h3>
                        <p className="text-gray-300">
                          Rising energy costs are severely impacting commercial building operational expenses, with HVAC systems accounting for up to 40% of energy usage. Poor insulation and outdated building envelopes result in significant thermal transfer, creating an unsustainable cost burden.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.energy.gov/eere/buildings/articles/energy-efficiency-commercial-buildings" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">U.S. Department of Energy, Commercial Building Energy Consumption Survey (2022)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaMoneyBillAlt className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Escalating Maintenance Costs</h3>
                        <p className="text-gray-300">
                          Commercial properties face a 28% increase in maintenance expenses when using conventional materials. Standard coatings require frequent reapplication, causing business disruption and multiplying lifetime ownership costs by 3-5x compared to advanced solutions.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.buildings.com/articles/42627/maintenance-cost-considerations" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Commercial Building Maintenance Cost Index (2024)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-red-700/20">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 bg-red-900/30 p-3 rounded-lg mr-4">
                        <FaRegLightbulb className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Regulatory Compliance Barriers</h3>
                        <p className="text-gray-300">
                          Meeting increasingly stringent energy codes and fire safety regulations requires significant capital investment with conventional approaches. Many commercial buildings fail to meet new standards, risking non-compliance penalties of up to $500,000 and increased insurance premiums.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                          <span className="font-semibold">Source:</span> <a href="https://www.iccsafe.org/building-safety-journal/commercial-building-standards-update-2023/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">International Code Council, Building Code Compliance Report (2023)</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional Pain Points */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-red-400 mb-4 text-center">Additional Industry Challenges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-red-700/10">
                      <div className="flex items-center mb-2">
                        <FaClock className="text-red-500 mr-2" />
                        <h4 className="text-lg font-medium text-gray-200">Implementation Disruption</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Traditional retrofits cause significant operational downtime, costing businesses an average of $8,400 per day in productivity losses.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-red-700/10">
                      <div className="flex items-center mb-2">
                        <FaLeaf className="text-red-500 mr-2" />
                        <h4 className="text-lg font-medium text-gray-200">Environmental Impact</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Standard building materials contribute heavily to carbon footprints with 39% higher embodied carbon compared to advanced alternatives.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-red-700/10">
                      <div className="flex items-center mb-2">
                        <FaPercentage className="text-red-500 mr-2" />
                        <h4 className="text-lg font-medium text-gray-200">ROI Limitations</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Conventional energy-saving retrofits typically offer ROI periods of 8-12 years, making them financially unattractive for building owners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ENTERPRISE CONSTRUCTION SOLUTION - YELLOW GLOW SECTION (Traffic Light Pattern) */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Premium Enhanced Yellow glow effect with blue accent for enterprise flair */}
              <div className="absolute -inset-10 bg-amber-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-amber-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-amber-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              <div className="absolute -inset-40 bg-blue-700/5 rounded-xl blur-3xl opacity-20 z-0"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-amber-600/30 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                  Enterprise Construction Solution
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Technical Specifications Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Advanced Ceramic Technology</h3>
                      <p className="text-gray-300 mb-4">
                        Praetorian Smart-Coat™ employs a proprietary ceramic microcapsule matrix that creates a thermal barrier unlike conventional insulation systems. Our formula contains high-purity ceramic compounds in a suspension that bonds to virtually any substrate.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Microscopic vacuum ceramic beads</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Low thermal conductivity (0.018 W/mK)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Radiant heat blocking (97%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300 text-sm">Active moisture management</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Fire Protection Properties</h3>
                      <p className="text-gray-300 mb-4">
                        Independently tested to ASTM E84 standards, our coating achieves Class A fire ratings with exceptional flame spread and smoke development indices far exceeding industry minimums.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">Class A</p>
                          <p className="text-center text-gray-300 text-sm">Fire Rating</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">1475°F</p>
                          <p className="text-center text-gray-300 text-sm">Heat Resistance</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">0</p>
                          <p className="text-center text-gray-300 text-sm">Flame Spread</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-center text-amber-400 font-semibold text-lg mb-1">5</p>
                          <p className="text-center text-gray-300 text-sm">Smoke Development</p>
                        </div>
                      </div>
                      <p className="text-gray-400 mt-4 text-sm">
                        <span className="font-semibold">Certification:</span> <a href="https://www.ul.com/resources/fire-resistance-ratings-ulc-online-certifications-directory" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">UL and ASTM E84 Certified Performance</a>
                      </p>
                    </div>
                    
                    {/* Restored Technical Component */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Material Science Breakthrough</h3>
                      <p className="text-gray-300 mb-4">
                        Leveraging nanoscale material engineering, our coating creates a temperature-responsive barrier that adapts to environmental conditions, providing dynamic thermal regulation for construction assets.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 flex items-center justify-center mb-2">
                            <FaShieldAlt className="w-6 h-6 text-amber-400" />
                          </div>
                          <p className="text-center text-amber-300 font-medium">Anti-Corrosive</p>
                          <p className="text-center text-gray-400 text-sm">99.7% Protection</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 flex items-center justify-center mb-2">
                            <FaSnowflake className="w-6 h-6 text-amber-400" />
                          </div>
                          <p className="text-center text-amber-300 font-medium">Thermal Stability</p>
                          <p className="text-center text-gray-400 text-sm">-40°F to 1475°F</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Application & Performance Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Energy Efficiency Performance</h3>
                      <p className="text-gray-300 mb-4">
                        Third-party validation confirms that buildings treated with Praetorian Smart-Coat™ experience significant reductions in energy consumption through multi-mode thermal management.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Cooling Load Reduction:</span>
                          <span className="text-amber-400 font-semibold">31-47%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" style={{ width: "47%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gray-300">Heating Load Reduction:</span>
                          <span className="text-amber-400 font-semibold">21-35%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gray-300">R-Value Equivalent:</span>
                          <span className="text-amber-400 font-semibold">R-19 (per 1mm thickness)</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <p className="text-gray-400 mt-4 text-sm">
                        <span className="font-semibold">Source:</span> <a href="https://www.energy.gov/eere/buildings/building-envelope-rd" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Independent Laboratory Testing - Oak Ridge National Laboratory Thermal Performance Study (2023)</a>
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Enterprise Application Framework</h3>
                      <p className="text-gray-300 mb-4">
                        Our enterprise deployment protocol ensures minimal business disruption while maximizing performance outcomes for commercial construction projects.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">1</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Comprehensive building envelope assessment</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">2</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Thermal imaging mapping to identify critical zones</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">3</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Section-by-section application to maintain operations</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">4</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Post-installation verification with advanced thermography</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-black">5</span>
                            </div>
                          </div>
                          <span className="ml-2 text-gray-300">Energy management system integration for ROI tracking</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Restored Premium Enterprise Component */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-amber-700/20">
                      <h3 className="text-xl font-semibold text-amber-400 mb-4">Enterprise Standards Compliance</h3>
                      <p className="text-gray-300 mb-4">
                        Praetorian Smart-Coat™ meets or exceeds all major construction industry standards and codes, reducing regulatory compliance costs while providing complete documentation for certification processes.
                      </p>
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-amber-700/10">
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">ASHRAE 90.1</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">ICC-ES AC456</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">NFPA 285</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">ASTM E84</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">LEED v4.1</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">BREEAM</div>
                          <div className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-300 text-xs font-medium">Title 24</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ROI Calculator Section - Added to Yellow Section */}
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold text-amber-400 mb-6 text-center">Construction Project ROI Analysis</h3>
                  <ConstructionROICalculator />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SANDLER STAGE 3: BUDGET - GREEN GLOW SECTION */}
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto mb-16">
            <div className="relative">
              {/* Enhanced Premium Green glow with multiple layers */}
              <div className="absolute -inset-10 bg-emerald-500/20 rounded-xl blur-xl opacity-70 z-0"></div>
              <div className="absolute -inset-20 bg-emerald-600/10 rounded-xl blur-2xl opacity-50 z-0"></div>
              <div className="absolute -inset-30 bg-emerald-700/5 rounded-xl blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
              
              {/* Content card */}
              <div className="relative z-20 rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-emerald-700/30 shadow-lg">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                  Distributor Benefits
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Financial Benefits Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaChartLine className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Premium Revenue Structure</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Join our elite network of authorized distributors and gain access to a premium product with exceptional profit margins:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">85% higher margins compared to standard coatings</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Predictable income through exclusive territory rights</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Average project value 3x traditional coating services</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Recurring revenue through maintenance programs</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaDollarSign className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Strategic Market Position</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Position your business at the forefront of construction innovation with unmatched market differentiation:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Exclusive regional distribution rights</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Limited competition with protected territories</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">First-mover advantage in high-growth market</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Access to enterprise-level clients and projects</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Client Benefits Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaBuilding className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Client Value Proposition</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Deliver transformative results for your construction clients with measurable outcomes:
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">HVAC Cost Reduction</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">32%</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "32%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Extended Asset Lifespan</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">45%</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Fire Insurance Premium Reduction</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">18%</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Overall ROI Period</span>
                          <div className="flex items-center">
                            <span className="text-emerald-400 font-semibold">2.3 Years</span>
                            <div className="ml-2 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 mt-4 text-sm">
                        <span className="font-semibold">Source:</span> <a href="https://www.ceramiccoatingperformance.org/commercial-analysis-2023" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Aggregate client performance data from 2021-2023 installations</a>
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaTools className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Implementation Advantage</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Simplified application process creates operational efficiency for your business:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">68% reduction in application time vs. traditional methods</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Non-invasive installation with zero building downtime</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Reduced equipment and labor requirements</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Standard application equipment with minimal specialization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Support Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaUsers className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Comprehensive Support</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Join our network and receive unparalleled business support:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Certified installer training program</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Technical field support for large projects</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Marketing materials and sales enablement</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Lead generation and qualification assistance</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Proposal and bid preparation support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-emerald-700/20">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-emerald-900/30 p-3 rounded-lg mr-4">
                          <FaHandshake className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-400">Partnership Framework</h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Our tiered partnership model ensures growth potential as your business expands:
                      </p>
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <FaStar className="text-amber-400 mr-1" />
                            <h4 className="text-lg font-medium text-emerald-300">Certified Partner</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Entry level with standard margins and shared territories</p>
                        </div>
                        
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <FaStar className="text-amber-400 mr-1" />
                            <FaStar className="text-amber-400 mr-1" />
                            <h4 className="text-lg font-medium text-emerald-300">Premier Partner</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Exclusive territories with enhanced margin structure</p>
                        </div>
                        
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <FaStar className="text-amber-400 mr-1" />
                            <FaStar className="text-amber-400 mr-1" />
                            <FaStar className="text-amber-400 mr-1" />
                            <h4 className="text-lg font-medium text-emerald-300">Elite Partner</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Multi-region exclusivity with highest profit potential</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-bold text-emerald-300 mb-4">Ready to Transform Your Construction Business?</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                    Become an authorized Praetorian Smart-Coat™ distributor and position your business at the forefront of construction innovation with unmatched profit potential.
                  </p>
                  <div>
                    <PremiumCartButton 
                      className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-lg font-bold shadow-lg transition-all"
                    >
                      Apply to Become a Distributor
                    </PremiumCartButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Construction;