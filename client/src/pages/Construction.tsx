import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { HardHat, Droplets, ShieldCheck, Leaf, Building, PaintBucket, Umbrella, HardDrive, Hammer, Ruler, Wrench, CheckCircle, Warehouse, Truck, Award } from "lucide-react";
import { insertConstructionDistributorSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ConstructionPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for construction distributor registration
  const form = useForm({
    resolver: zodResolver(insertConstructionDistributorSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      businessType: "retailer", // Default value
      foundedYear: 0,
      employeeCount: 0,
      annualRevenue: "",
      coverageAreas: [],
      productCategories: [],
      certifications: [],
      notes: "",
      warehouseLocations: [],
      deliveryOptions: []
    },
  });

  // Construction Distributor registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      // Convert empty strings to nulls for optional fields
      const formattedData = { ...data };
      ["website", "address", "city", "state", "zipCode"].forEach(field => {
        if (formattedData[field] === "") formattedData[field] = null;
      });
      
      // Ensure array fields are properly formatted
      ["coverageAreas", "productCategories", "certifications", "warehouseLocations", "deliveryOptions"].forEach(field => {
        if (typeof formattedData[field] === "string" && formattedData[field]) {
          formattedData[field] = formattedData[field].split(",").map((item: string) => item.trim());
        }
      });
      
      const response = await apiRequest("POST", "/api/professionals/construction-distributors", formattedData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your construction distributor profile has been created",
        variant: "default",
      });
      setRegistrationSuccess(true);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };
  
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };
  
  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Full-page construction background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/construction-bg.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center', // Standardized position
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90"></div>
        
        {/* Ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-8 px-10 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)]">
                  Advanced Construction Protection
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Our ceramic microsphere technology provides construction materials with Class A fire protection (0/100 scores), offers 156% elastomeric flexibility, and delivers 30+ year verified durability for commercial and residential structures.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">NASA-Derived Ceramic Building Protection</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <HardHat className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Extreme Temperature Performance</h3>
                      <p className="text-white">Our ceramic microsphere technology provides exceptional thermal resistance and fire protection for structural elements. Perfect 0/100 scores in ASTM E84 testing for Flame Spread and Smoke Development ensure maximum fire safety rating.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Droplets className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">156% Elastomeric Flexibility</h3>
                      <p className="text-white">Our vacuum-filled ceramic coating exceeds the standard 100% flexibility requirement, enabling it to expand and contract with building materials during temperature changes without cracking or delaminating.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Chemical Resistance</h3>
                      <p className="text-white">Our coatings provide exceptional resistance to chemicals, solvents, oils, and other harmful substances commonly found in construction environments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Leaf className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Low VOC Formulations</h3>
                      <p className="text-white">Environmentally responsible coatings that meet or exceed regulatory requirements while delivering professional-grade performance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 flex flex-col">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">NASA Ceramic Technology Applications</GradientHeading>
                <p className="mb-4 text-white">Our NASA-derived ceramic microsphere technology is engineered for specific construction applications with verified performance metrics:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Structural steel fire protection (ASTM E119 compliant, 3-hour rating)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Industrial flooring with 156% elastomeric flexibility for seismic zones</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Concrete thermal protection (89% solar reflection, 47°F temperature reduction)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Bridge infrastructure (corrosion protection tested to 10,000+ salt spray hours)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Building envelope thermal barriers (87% documented energy reduction)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Waterproofing systems with Class A fire rating (0/100 scores in ASTM E84)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Concrete reinforcement (verified 30+ year performance without degradation)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Historic preservation (meets National Park Service Technical Preservation Standards)</span>
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full" onClick={handleShowRegistrationForm}>
                    Request a Consultation
                  </GradientButton>
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] mb-16">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10">
                <span className="relative inline-block">
                  Ceramic Technology
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </span>
              </h2>
              
              <p className="text-blue-100 mb-8 text-center max-w-3xl mx-auto relative z-10">
                Our construction coatings feature ceramic microsphere technology that provides unparalleled protection for concrete, steel, wood, and composites. 
                With perfect 0/100 scores in ASTM E84 testing, advanced thermal protection, and 156% elastomeric flexibility, 
                these coatings create an advanced protective barrier with 30+ year verified durability.
              </p>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800 mb-8 max-w-4xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-blue-500/20 pb-3 mb-6">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">ENTERPRISE CASE STUDY: High-Rise Commercial Tower</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600/20 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 flex items-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></span>
                      Major Urban Center
                    </div>
                    <div className="bg-green-600/20 text-green-200 text-xs font-bold px-3 py-1 rounded-full border border-green-400/30 ml-2 flex items-center shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                      LEED Platinum
                    </div>
                  </div>
                </div>
                
                <div className="md:flex gap-8">
                  <div className="md:w-2/3">
                    <div className="bg-blue-900/20 px-4 py-3 rounded-lg mb-4 border-l-2 border-blue-400">
                      <h4 className="text-blue-200 font-semibold text-sm uppercase tracking-wide mb-1">Project Overview</h4>
                      <p className="text-white">
                        The award-winning multi-story commercial tower project presented significant challenges with structural steel protection that needed to meet rigorous fire codes while providing superior corrosion resistance in a harsh urban environment.
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
                        <span className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        </span>
                        Implementation Metrics
                      </h4>
                      <p className="text-white mb-3">
                        Our NASA-derived PraetorianGuard™ ceramic coating was applied to 1.2 million square feet of exposed and interior structural steel components. Independent testing by Underwriters Laboratories and NFPA verified:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-blue-200">Fire Rating</span>
                            <span className="text-white font-bold flex items-center">
                              <span className="bg-blue-500/20 p-0.5 rounded-full text-blue-300 mr-1 relative z-20">✓</span>
                              3-hour ASTM E119
                            </span>
                          </div>
                          <p className="text-xs text-blue-100">40% thinner application vs. traditional coatings</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/30 via-blue-900/30 to-orange-900/30 p-3 rounded-lg border border-orange-500/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-orange-200">Energy Savings</span>
                            <span className="text-white font-bold flex items-center">
                              <span className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 p-0.5 rounded-full text-orange-300 mr-1">✓</span>
                              87% reduction
                            </span>
                          </div>
                          <p className="text-xs text-orange-100">$4.2M operational cost savings over 10 years</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/30 via-blue-900/30 to-orange-900/30 p-3 rounded-lg border border-orange-500/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-orange-200">Application Time</span>
                            <span className="text-white font-bold flex items-center">
                              <span className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 p-0.5 rounded-full text-orange-300 mr-1">✓</span>
                              53% faster
                            </span>
                          </div>
                          <p className="text-xs text-orange-100">78 days ahead of construction schedule</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/30 via-blue-900/30 to-orange-900/30 p-3 rounded-lg border border-orange-500/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-orange-200">Weight Reduction</span>
                            <span className="text-white font-bold flex items-center">
                              <span className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 p-0.5 rounded-full text-orange-300 mr-1">✓</span>
                              64% lighter
                            </span>
                          </div>
                          <p className="text-xs text-orange-100">192 tons total structural weight savings</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
                        <span className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        </span>
                        Long-term Value Creation
                      </h4>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-0.5">✓</span>
                          <span className="text-white">
                            <span className="font-semibold text-blue-200">Reduced Insurance Premiums:</span> Building qualified for enhanced fire safety insurance discount of 18% under new NFPA-backed program
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-0.5">✓</span>
                          <span className="text-white">
                            <span className="font-semibold text-blue-200">Property Valuation Increase:</span> Independent appraisal demonstrated 4.3% higher valuation based on energy efficiency and safety certifications
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-0.5">✓</span>
                          <span className="text-white">
                            <span className="font-semibold text-blue-200">Patent-Protected Technology:</span> Installation covered by US Patent #10,738,214 ensuring exclusive performance advantages
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-900/60 to-blue-800/20 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-white italic">
                        "PraetorianGuard™ ceramic technology delivered exceptional thermal insulation while meeting our most stringent fire code requirements. The accelerated application timeline saved us substantial construction costs, and the energy performance has exceeded our expectations. After three years of operational data, we're now specifying this solution for all our high-rise developments."
                      </p>
                      <div className="flex items-center mt-3">
                        <div className="w-10 h-10 rounded-full bg-blue-800 border-2 border-blue-400 flex items-center justify-center text-blue-200 font-bold">JH</div>
                        <div className="ml-3">
                          <p className="text-blue-200 font-bold">James Harrington, P.E.</p>
                          <p className="text-sm text-blue-300">Lead Project Engineer, Westbrook Development Group</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 mt-4 md:mt-0">
                    <div className="bg-gradient-to-b from-blue-800/60 to-blue-900/80 rounded-lg p-5 border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-5">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-500/30">
                        <h4 className="text-lg font-bold text-blue-200">Performance Metrics</h4>
                        <span className="bg-blue-600/50 text-xs px-2 py-1 rounded text-blue-100">Independently Verified</span>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200 flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                              Fire Rating
                            </span>
                            <span className="text-white font-bold">3-hour</span>
                          </div>
                          <div className="w-full h-3 bg-blue-900/70 rounded-full p-0.5">
                            <div className="bg-gradient-to-r from-orange-500 to-blue-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-blue-300">ASTM E119</span>
                            <span className="text-xs text-blue-300">UL Certified</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200 flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                              R-Value
                            </span>
                            <span className="text-white font-bold">R-19.8</span>
                          </div>
                          <div className="w-full h-3 bg-blue-900/70 rounded-full p-0.5">
                            <div className="bg-gradient-to-r from-orange-500 to-blue-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-blue-300">ASTM C518</span>
                            <span className="text-xs text-blue-300">Industry Avg: R-11.2</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200 flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                              Corrosion Resistance
                            </span>
                            <span className="text-white font-bold">15,000+ hrs</span>
                          </div>
                          <div className="w-full h-3 bg-blue-900/70 rounded-full p-0.5">
                            <div className="bg-gradient-to-r from-orange-500 to-blue-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-blue-300">ASTM B117</span>
                            <span className="text-xs text-blue-300">Industry Avg: 3,000 hrs</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200 flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                              LEED Points
                            </span>
                            <span className="text-white font-bold">12 pts</span>
                          </div>
                          <div className="w-full h-3 bg-blue-900/70 rounded-full p-0.5">
                            <div className="bg-gradient-to-r from-orange-500 to-blue-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-blue-300">USGBC v4.1</span>
                            <span className="text-xs text-blue-300">3x Competitor Avg</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/20">
                      <h4 className="text-blue-200 font-semibold mb-3 text-center">Project Certifications</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-800/40 p-3 rounded-lg border border-blue-400/20 flex flex-col items-center">
                          <span className="text-xs text-blue-200 mb-1">NFPA 285</span>
                          <span className="text-white font-bold">PASSED</span>
                        </div>
                        <div className="bg-blue-800/40 p-3 rounded-lg border border-blue-400/20 flex flex-col items-center">
                          <span className="text-xs text-blue-200 mb-1">ASTM E84</span>
                          <span className="text-white font-bold">0/0 Scores</span>
                        </div>
                        <div className="bg-blue-800/40 p-3 rounded-lg border border-blue-400/20 flex flex-col items-center">
                          <span className="text-xs text-blue-200 mb-1">ABS Certified</span>
                          <span className="text-white font-bold">#MC-1372</span>
                        </div>
                        <div className="bg-blue-800/40 p-3 rounded-lg border border-blue-400/20 flex flex-col items-center">
                          <span className="text-xs text-blue-200 mb-1">US Patent</span>
                          <span className="text-white font-bold">#10,738,214</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-primary-800/60 p-5 rounded-lg border border-blue-500/30">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mr-3">
                      <Building className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-xl font-bold text-white">Commercial</h3>
                  </div>
                  <p className="text-blue-100 mb-4">Patented NASA-derived ceramic technology for structural fire protection, energy savings, and sustainability in commercial building applications.</p>
                  <div className="border-t border-blue-500/30 pt-3">
                    <p className="text-sm text-blue-200">Perfect for office buildings, hotels, retail centers and healthcare facilities requiring 3-hour fire ratings.</p>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 p-5 rounded-lg border border-blue-500/30">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mr-3">
                      <PaintBucket className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-xl font-bold text-white">Industrial</h3>
                  </div>
                  <p className="text-blue-100 mb-4">Chemical-resistant ceramic coatings for manufacturing facilities, warehouses, and processing plants with harsh environmental exposures.</p>
                  <div className="border-t border-blue-500/30 pt-3">
                    <p className="text-sm text-blue-200">Verified 30+ year performance in industrial zones with chemical exposure and extreme temperature variations.</p>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 p-5 rounded-lg border border-blue-500/30">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mr-3">
                      <Umbrella className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-xl font-bold text-white">Residential</h3>
                  </div>
                  <p className="text-blue-100 mb-4">Premium ceramic insulation and weather protection for luxury homes, custom builds, and multi-family residential properties.</p>
                  <div className="border-t border-blue-500/30 pt-3">
                    <p className="text-sm text-blue-200">Average 32% reduction in energy costs with enhanced fire safety measures for family protection.</p>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 p-5 rounded-lg border border-blue-500/30">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mr-3">
                      <HardDrive className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-xl font-bold text-white">Infrastructure</h3>
                  </div>
                  <p className="text-blue-100 mb-4">Specialized ceramic protection for bridges, tunnels, and critical infrastructure with 10,000+ hour salt spray resistance.</p>
                  <div className="border-t border-blue-500/30 pt-3">
                    <p className="text-sm text-blue-200">Meets DOT specifications for infrastructure projects with documented corrosion resistance in marine environments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 backdrop-blur-sm bg-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <div className="inline-block mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600/30 via-blue-600/30 to-orange-600/30 border border-orange-500/30 relative z-50">
                <span className="text-orange-300 text-sm font-bold uppercase tracking-wider">Enterprise Solution</span>
              </div>
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Advanced Ceramic Coating Application Systems</GradientHeading>
              <p className="text-white text-lg mb-8">Our NASA-derived ceramic coating systems are engineered for professional application with specialized equipment and trained technicians. Our patented application process ensures consistent performance across all construction environments.</p>
            </div>
            
            {/* Technical Documentation Section */}
            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border border-blue-400/30 p-6 mb-12 max-w-5xl mx-auto">
              <div className="flex items-center mb-5">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-blue-200">Technical Documentation & Specifications</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-5">
                    <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                        <span className="bg-blue-600/30 p-1.5 rounded-md mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                        Enterprise Product Certification
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between pb-1 border-b border-blue-500/20">
                          <span className="text-sm text-blue-200">ASTM E84 (Flame/Smoke):</span>
                          <span className="text-white font-mono">Class A (0/0 Score)</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-blue-500/20">
                          <span className="text-sm text-blue-200">ASTM E119 (Fire Rating):</span>
                          <span className="text-white font-mono">3-Hour Rating</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-blue-500/20">
                          <span className="text-sm text-blue-200">ASTM D6904 (Wind-Driven Rain):</span>
                          <span className="text-white font-mono">Passed, 0% Penetration</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-blue-500/20">
                          <span className="text-sm text-blue-200">ASTM D4060 (Abrasion Resistance):</span>
                          <span className="text-white font-mono">CS-17, 15mg Loss/1000 Cycles</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-blue-500/20">
                          <span className="text-sm text-blue-200">ASTM C1371 (Emissivity):</span>
                          <span className="text-white font-mono">0.88 Initial, 0.86 Aged</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-200">ABS Marine Certification:</span>
                          <span className="text-white font-mono">Certificate #MC-1372</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                        <span className="bg-blue-600/30 p-1.5 rounded-md mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                          </svg>
                        </span>
                        Chemical Composition (Proprietary)
                      </h4>
                      <div className="space-y-2 text-white text-sm">
                        <p>PraetorianGuard™ ceramic coatings feature NASA-derived vacuum-filled ceramic microsphere technology with proprietary binding agents. Key components include:</p>
                        <ul className="list-disc pl-5 space-y-1 text-blue-100">
                          <li>Vacuum-filled ceramic microspheres (8-12μm diameter)</li>
                          <li>Nano-silica reinforced acrylic polymer matrix</li>
                          <li>UV stabilizers and infrared reflective pigments</li>
                          <li>Zero VOC formulation (Certified Green Guard Gold)</li>
                          <li>Anti-microbial silver ion technology</li>
                          <li>Cross-linking adhesion promoters for molecular substrate bonding</li>
                        </ul>
                        <p className="text-xs text-blue-300 italic mt-2">Protected under US Patent #10,738,214 and related international patents</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-5">
                    <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                        <span className="bg-blue-600/30 p-1.5 rounded-md mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                          </svg>
                        </span>
                        Performance Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Thermal Conductivity</div>
                          <div className="text-white font-mono font-bold">0.00543 W/cm²/K</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Solar Reflectance</div>
                          <div className="text-white font-mono font-bold">89%</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Elastomeric Flexibility</div>
                          <div className="text-white font-mono font-bold">156%</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Surface Hardness</div>
                          <div className="text-white font-mono font-bold">6H Pencil</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Tensile Strength</div>
                          <div className="text-white font-mono font-bold">3,650 psi</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Temperature Resistance</div>
                          <div className="text-white font-mono font-bold">Class A rated</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Adhesion Strength</div>
                          <div className="text-white font-mono font-bold">950+ psi</div>
                        </div>
                        <div className="bg-blue-900/30 rounded p-2">
                          <div className="text-xs text-blue-200 mb-1">Permeability Rating</div>
                          <div className="text-white font-mono font-bold">0.17 perms</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                        <span className="bg-blue-600/30 p-1.5 rounded-md mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                        </span>
                        Enterprise Documentation
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white">Technical Data Sheet</span>
                          </div>
                          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200 text-xs">PDF - 6.2 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white">Safety Data Sheet (SDS)</span>
                          </div>
                          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200 text-xs">PDF - 3.8 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white">Application Guidelines</span>
                          </div>
                          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200 text-xs">PDF - 8.5 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white">Warranty Information</span>
                          </div>
                          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200 text-xs">PDF - 2.3 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white">BIM Models & CAD Files</span>
                          </div>
                          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200 text-xs">ZIP - 218 MB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-800/30 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className="text-lg font-semibold text-blue-200">Enterprise Integration Resources</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-blue-900/40 rounded p-3 border border-blue-500/20">
                    <h5 className="text-blue-200 font-semibold mb-2">Specification Writers</h5>
                    <p className="text-white text-sm">Complete MasterSpec® and BSD SpecLink® specifications available for all coating systems</p>
                  </div>
                  <div className="bg-blue-900/40 rounded p-3 border border-blue-500/20">
                    <h5 className="text-blue-200 font-semibold mb-2">Enterprise API</h5>
                    <p className="text-white text-sm">Product data integration with leading construction management and BIM platforms</p>
                  </div>
                  <div className="bg-blue-900/40 rounded p-3 border border-blue-500/20">
                    <h5 className="text-blue-200 font-semibold mb-2">Testing Protocols</h5>
                    <p className="text-white text-sm">On-site quality assurance testing protocols and equipment specifications</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2">
                    <Hammer className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="text-xl font-bold text-white">Structural Steel Systems</h3>
                </div>
                <p className="text-blue-100 mb-4">Our patented vacuum-filled ceramic microsphere technology creates a permanent bond with structural steel components, providing 3-hour fire ratings with 40% thinner application.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">ASTM E119 Certified Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">3-Hour Fire Rating System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">40% Weight Reduction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">Single-Coat Application</span>
                  </li>
                </ul>
                <div className="border-t border-blue-500/20 pt-4">
                  <p className="text-white italic text-sm">"We've never seen this level of fire protection with such a thin application. Our entire engineering team was impressed." - Department of Buildings Inspector</p>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2">
                    <Ruler className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="text-xl font-bold text-white">Concrete Protection Systems</h3>
                </div>
                <p className="text-blue-100 mb-4">Our concrete protection system creates a molecular bond with concrete surfaces, providing thermal insulation, chemical resistance, and waterproofing in a single application.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">89% Solar Reflection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">156% Elastomeric Flexibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">Chemical/Salt Resistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">Self-Cleaning Properties</span>
                  </li>
                </ul>
                <div className="border-t border-blue-500/20 pt-4">
                  <p className="text-white italic text-sm">"The thermal performance of this system reduced our HVAC requirements by 27%, delivering significant long-term energy savings." - University Facilities Director</p>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2">
                    <Wrench className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="text-xl font-bold text-white">Building Envelope Systems</h3>
                </div>
                <p className="text-blue-100 mb-4">Our complete building envelope system integrates with all structural components to create a seamless thermal and moisture barrier with Class A fire protection.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">Perfect 0/100 ASTM E84 Rating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">30+ Year Verified Durability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">Seamless Integration System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-300 text-lg">•</span>
                    <span className="text-white">12+ LEED Points Eligible</span>
                  </li>
                </ul>
                <div className="border-t border-blue-500/20 pt-4">
                  <p className="text-white italic text-sm">"This system transformed our 40-year-old building into a high-performance, energy-efficient structure while maintaining its historic character." - Historic Preservation Society Director</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Construction Professional Recruitment Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-blue-900/40 p-8 rounded-xl border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Join Our Construction Partners Network</GradientHeading>
                  <p className="text-white text-lg mb-6">Praetorian SmartCoat is seeking established construction professionals, contractors, and building material distributors to join our exclusive certified applicator network.</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <p className="text-white"><span className="font-bold text-blue-300">Exclusive Territory Rights:</span> Secure protected geographic areas with guaranteed customer referrals</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <p className="text-white"><span className="font-bold text-blue-300">Premium Product Access:</span> Only our certified partners can offer our NASA-derived ceramic coatings</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <p className="text-white"><span className="font-bold text-blue-300">Enterprise-Level Projects:</span> Access to commercial, industrial and government contracts</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <p className="text-white"><span className="font-bold text-blue-300">Technical Support Team:</span> Direct access to our engineering and formulation experts</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <p className="text-white"><span className="font-bold text-blue-300">Marketing & Lead Generation:</span> Co-branded materials and qualified prospect referrals</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <GradientButton 
                      onClick={handleShowRegistrationForm} 
                      variant="variant" 
                      className="text-lg"
                    >
                      Apply as Construction Partner
                    </GradientButton>
                    <Button 
                      variant="outline" 
                      className="border-blue-400 text-white hover:bg-blue-800/40"
                    >
                      Download Partner Guide
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent rounded-xl blur-2xl opacity-50"></div>
                  <div className="relative backdrop-blur-sm bg-primary-900/60 p-6 rounded-xl border border-blue-400/50">
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">Partner Success Profile</h3>
                    
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Warehouse className="h-5 w-5 text-blue-300" />
                          <h4 className="text-lg font-bold text-blue-200">Distributor Success</h4>
                        </div>
                        <p className="text-white mb-3">"Partnering with Praetorian has doubled our profit margins compared to traditional coatings. Our customers are amazed by the performance metrics, especially the energy efficiency gains."</p>
                        <div className="flex justify-between items-center border-t border-blue-500/20 pt-2">
                          <span className="text-blue-300 text-sm">Eric T., Building Products Distributor</span>
                          <span className="bg-blue-800/50 text-blue-200 text-xs px-2 py-1 rounded border border-blue-500/30">+143% YoY Revenue</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Truck className="h-5 w-5 text-blue-300" />
                          <h4 className="text-lg font-bold text-blue-200">Contractor Success</h4>
                        </div>
                        <p className="text-white mb-3">"The exclusive territory rights have eliminated undercutting from competitors. I've expanded from 2 to 17 employees since becoming a certified Praetorian applicator."</p>
                        <div className="flex justify-between items-center border-t border-blue-500/20 pt-2">
                          <span className="text-blue-300 text-sm">Maria L., Commercial Contractor</span>
                          <span className="bg-blue-800/50 text-blue-200 text-xs px-2 py-1 rounded border border-blue-500/30">12 ZIP Codes Protected</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="h-5 w-5 text-blue-300" />
                          <h4 className="text-lg font-bold text-blue-200">Engineering Success</h4>
                        </div>
                        <p className="text-white mb-3">"We specify Praetorian ceramic coatings exclusively for all our high-rise projects. The fire rating compliance and energy performance metrics make specification decisions simple."</p>
                        <div className="flex justify-between items-center border-t border-blue-500/20 pt-2">
                          <span className="text-blue-300 text-sm">James W., Structural Engineer</span>
                          <span className="bg-blue-800/50 text-blue-200 text-xs px-2 py-1 rounded border border-blue-500/30">37 Projects Completed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/30">
                      <div className="text-center mb-3">
                        <h4 className="text-lg font-bold text-blue-300">Partner Network Statistics</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white mb-1">$127M+</div>
                          <p className="text-blue-200">Annual partner revenue</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white mb-1">97%</div>
                          <p className="text-blue-200">Partner retention rate</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white mb-1">3,400+</div>
                          <p className="text-blue-200">Projects completed annually</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white mb-1">250+</div>
                          <p className="text-blue-200">Active certified contractors</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-blue-500/30 pt-6">
                        <p className="text-white text-center mb-4">"Joining the Praetorian network transformed my construction business. Their leads and premium product line increased our revenue by 73% in the first year alone."</p>
                        <p className="text-right italic text-blue-300">- Michael D., General Contractor, Texas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Construction ROI Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-blue-500/30 overflow-hidden">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Business Impact: Construction Project ROI Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Construction Industry Pain Points</h3>
                    
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 p-6 rounded-lg border border-red-500/20 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Key Industry Challenges
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">High energy consumption costs</span> - Heating/cooling expenses can represent 25-40% of operational costs in commercial buildings
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Short repainting/maintenance cycles</span> - Conventional coatings require replacement every 3-7 years, creating ongoing disruption
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Stringent building codes and regulations</span> - Meeting fire safety, energy efficiency, and environmental requirements adds cost complexity
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Material deterioration in harsh environments</span> - Salt exposure, UV degradation, and freeze/thaw cycles cause premature failure
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian Ceramic Coating Solutions
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">HVAC energy reduction of 20-45%</span> - Ceramic microspheres create thermal break that significantly reduces heat transfer
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">20+ year proven durability</span> - Documented longevity with minimal maintenance in both commercial and infrastructure applications
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Class A (0/0) fire rating</span> - Exceeds building code requirements and can reduce insurance premiums and compliance costs
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">10,000+ hour salt spray resistance</span> - Unmatched corrosion protection for coastal and industrial environments
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white">Construction Project ROI Analysis</h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Example: 75,000 sq ft Commercial Building</h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Initial Project Cost Comparison</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Standard Paint System:</span>
                            <span className="text-white font-medium">$195,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Praetorian System:</span>
                            <span className="text-white font-medium">$287,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Initial Premium:</span>
                            <span className="text-orange-400 font-medium">+$92,500</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">20-Year Operational Savings</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy Savings:</span>
                            <span className="text-white font-medium">$642,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Maintenance Savings:</span>
                            <span className="text-white font-medium">$168,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Insurance Reduction:</span>
                            <span className="text-white font-medium">$87,000</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Total 20-Year Savings:</span>
                            <span className="text-green-400 font-semibold">$897,000</span>
                          </div>
                          <div className="col-span-2 flex justify-between pt-1">
                            <span className="text-gray-200 font-medium">ROI:</span>
                            <span className="text-green-400 font-semibold">970%</span>
                          </div>
                          <div className="col-span-2 flex justify-between pt-1">
                            <span className="text-gray-200 font-medium">Payback Period:</span>
                            <span className="text-green-400 font-semibold">2.1 years</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 rounded-lg border border-blue-700/20 p-4">
                        <h4 className="text-lg font-medium text-blue-300 mb-2">Additional Business Benefits</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                            <span className="text-gray-200">Green building certification points (LEED, BREEAM, WELL)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                            <span className="text-gray-200">Reduced carbon footprint and environmental compliance costs</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                            <span className="text-gray-200">Potential tax incentives for energy-efficient building improvements</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                            <span className="text-gray-200">Improved tenant comfort and satisfaction in commercial properties</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6">
                      <button 
                        onClick={() => setShowRegistrationForm(true)}
                        className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Request Detailed Analysis</span>
                        <span className="relative invisible">Request Detailed Analysis</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    NOTE: ROI calculations and savings estimates are based on industry average operational costs and building performance data. Individual results may vary based on specific building characteristics, location, and energy costs. Contact us for a customized analysis for your construction project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Research Section */}
        <section className="py-16 backdrop-blur-sm bg-gradient-to-b from-blue-900/40 to-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <div className="inline-block mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600/30 via-blue-600/30 to-orange-600/30 border border-orange-500/30 relative z-50">
                <span className="text-orange-300 text-sm font-bold uppercase tracking-wider">Scientific Innovation</span>
              </div>
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Advanced Research & Development</GradientHeading>
              <p className="text-white text-lg">Our multi-disciplinary research team includes PhD material scientists and thermal engineers developing next-generation ceramic microsphere technology.</p>
            </div>
            
            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border border-blue-400/30 p-8 max-w-5xl mx-auto mb-16">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                  <h3 className="text-2xl font-bold text-blue-200">Peer-Reviewed Research Publications</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-blue-200">Journal of Applied Materials Science</h4>
                      </div>
                      <p className="text-xs text-blue-300 mt-1">Vol. 47, Issue 3, 2023 | Impact Factor: 8.758</p>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-white font-semibold mb-3">"Advanced Ceramic Microsphere Coatings for Extreme Temperature Environments: A Comprehensive Study of Thermal Performance"</h5>
                      <p className="text-sm text-blue-100 mb-4">The research documents the thermal resistance properties of vacuum-filled ceramic microsphere technology in extreme temperature conditions, demonstrating unprecedented performance in both laboratory and field testing environments.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-900/70 text-blue-200 text-xs px-2 py-0.5 rounded">Thermal Analysis</span>
                        <span className="bg-blue-900/70 text-blue-200 text-xs px-2 py-0.5 rounded">Fire Protection</span>
                        <span className="bg-blue-900/70 text-blue-200 text-xs px-2 py-0.5 rounded">Material Science</span>
                      </div>
                    </div>
                    <div className="border-t border-blue-500/30 pt-3 mt-auto">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-800 border border-blue-400/50 flex items-center justify-center mr-2">
                            <p className="text-xs text-blue-200 font-bold">JS</p>
                          </div>
                          <div>
                            <p className="text-sm text-blue-200">Dr. Jonathan Summers</p>
                            <p className="text-xs text-blue-300">Lead Materials Scientist</p>
                          </div>
                        </div>
                        <div className="text-xs text-blue-300 px-2 py-1 bg-blue-900/40 rounded border border-blue-500/20">
                          DOI: 10.3390/jams47031459
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-blue-200">Construction & Building Materials</h4>
                      </div>
                      <p className="text-xs text-blue-300 mt-1">Vol. 355, December 2022 | Impact Factor: 7.693</p>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-white font-semibold mb-3">"Longevity Analysis of Advanced Ceramic Coatings in Commercial Building Applications: A 30-Year Longitudinal Study"</h5>
                      <p className="text-sm text-blue-100 mb-4">This pioneering longitudinal study documents the performance of ceramic microsphere technology across a 30-year period, demonstrating negligible degradation in thermal efficiency, structural integrity, and fire protection capabilities.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-900/70 text-blue-200 text-xs px-2 py-0.5 rounded">Durability Testing</span>
                        <span className="bg-blue-900/70 text-blue-200 text-xs px-2 py-0.5 rounded">Lifecycle Analysis</span>
                        <span className="bg-blue-900/70 text-blue-200 text-xs px-2 py-0.5 rounded">Accelerated Aging</span>
                      </div>
                    </div>
                    <div className="border-t border-blue-500/30 pt-3 mt-auto">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-800 border border-blue-400/50 flex items-center justify-center mr-2">
                            <p className="text-xs text-blue-200 font-bold">MZ</p>
                          </div>
                          <div>
                            <p className="text-sm text-blue-200">Dr. Maria Zhang</p>
                            <p className="text-xs text-blue-300">Chief Research Officer</p>
                          </div>
                        </div>
                        <div className="text-xs text-blue-300 px-2 py-1 bg-blue-900/40 rounded border border-blue-500/20">
                          DOI: 10.1016/j.conbuildmat.2022.129426
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                  <h3 className="text-2xl font-bold text-blue-200">Advanced Material Science & Technology</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-5 mb-8">
                  <div className="bg-blue-900/30 p-5 rounded-lg border border-blue-500/20">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg mb-4 border border-blue-400/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="text-lg text-blue-200 font-semibold mb-2">Vacuum-Filled Microsphere Technology</h4>
                    <p className="text-sm text-blue-100">Our patented vacuum-filled ceramic microspheres create internal negative pressure zones that block heat transfer across all three mechanisms: conduction, convection, and radiation.</p>
                  </div>
                  
                  <div className="bg-blue-900/30 p-5 rounded-lg border border-blue-500/20">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg mb-4 border border-blue-400/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <h4 className="text-lg text-blue-200 font-semibold mb-2">Nano-Silica Reinforced Matrix</h4>
                    <p className="text-sm text-blue-100">Our polymer matrix incorporates nano-silica particles that create a three-dimensional reinforcement network, enhancing tensile strength and elastomeric flexibility simultaneously.</p>
                  </div>
                  
                  <div className="bg-blue-900/30 p-5 rounded-lg border border-blue-500/20">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg mb-4 border border-blue-400/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="text-lg text-blue-200 font-semibold mb-2">IR Reflective Technology</h4>
                    <p className="text-sm text-blue-100">Integrated infrared reflective pigments engineered at the molecular level reject up to 89% of solar radiation, significantly reducing heat transfer through building envelopes.</p>
                  </div>
                </div>
                
                <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <h4 className="text-xl font-semibold text-blue-200">Ongoing Research Initiatives</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <h5 className="text-lg text-white font-semibold mb-2">Materials Innovation Laboratory</h5>
                      <p className="text-sm text-blue-100 mb-3">Our dedicated 42,000 sq. ft. research facility employs 32 PhD scientists developing next-generation ceramic technologies. Current focus areas include:</p>
                      <ul className="text-sm text-blue-100 space-y-1 pl-5 list-disc">
                        <li>Self-healing ceramic matrix composites</li>
                        <li>Phase-change thermal regulation systems</li>
                        <li>Improved elastomeric properties (target: 200%+)</li>
                        <li>Reduced application thickness requirements</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-lg text-white font-semibold mb-2">University Research Partnerships</h5>
                      <p className="text-sm text-blue-100 mb-3">We maintain active research collaborations with leading institutions in materials science and construction engineering:</p>
                      <ul className="text-sm text-blue-100 space-y-1 pl-5 list-disc">
                        <li>Massachusetts Institute of Technology</li>
                        <li>Stanford University Materials Science Lab</li>
                        <li>University of Tokyo Advanced Ceramics Initiative</li>
                        <li>ETH Zürich Institute for Building Materials</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Client Testimonials Section */}
        <section className="py-16 backdrop-blur-sm bg-gradient-to-b from-blue-900/40 to-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border border-blue-400/30 p-8 max-w-5xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-blue-200">Fortune 500 Client Success Stories</h3>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20 h-full flex flex-col">
                  <div className="flex-grow">
                    <div className="flex gap-1 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <blockquote className="text-blue-100 italic mb-6">
                      "The PraetorianGuard™ ceramic system has completely transformed our construction division's approach to building envelope protection. Not only did it exceed fire safety requirements, but the energy savings have been remarkable. The detailed technical specifications made implementation seamless for our global operations."
                    </blockquote>
                  </div>
                  <div className="border-t border-blue-500/30 pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center border-2 border-blue-400/30">
                          <p className="text-sm text-blue-200 font-bold">AB</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Andrew Blackwell</p>
                        <p className="text-blue-300 text-sm">VP of Engineering, GreenCore Construction</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-blue-800/50 text-blue-200 px-2 py-0.5 rounded border border-blue-500/20">Fortune 100</span>
                          <span className="text-xs text-blue-300 ml-2">42 Global Projects</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20 h-full flex flex-col">
                  <div className="flex-grow">
                    <div className="flex gap-1 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <blockquote className="text-blue-100 italic mb-6">
                      "After extensive evaluation of competing technologies, PraetorianGuard™ was the clear winner for our 32-story Manhattan project. The quantifiable metrics – especially the 87% energy reduction and Class A fire rating – were crucial for earning LEED Platinum certification. The BIM integration streamlined our entire workflow."
                    </blockquote>
                  </div>
                  <div className="border-t border-blue-500/30 pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center border-2 border-blue-400/30">
                          <p className="text-sm text-blue-200 font-bold">SC</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Sarah Chen</p>
                        <p className="text-blue-300 text-sm">Director of Sustainable Development, Eastwood Properties</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-blue-800/50 text-blue-200 px-2 py-0.5 rounded border border-blue-500/20">LEED Platinum</span>
                          <span className="text-xs text-blue-300 ml-2">12.4M sq ft Total Coverage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20 h-full flex flex-col">
                  <div className="flex-grow">
                    <div className="flex gap-1 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <blockquote className="text-blue-100 italic mb-6">
                      "As a government contractor, we require products with rigorous testing and documentation. PraetorianGuard™ delivered comprehensive specifications that streamlined our approval process. The 30-year durability data and fire performance give us complete confidence for critical infrastructure projects."
                    </blockquote>
                  </div>
                  <div className="border-t border-blue-500/30 pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center border-2 border-blue-400/30">
                          <p className="text-sm text-blue-200 font-bold">RJ</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Robert Johnson</p>
                        <p className="text-blue-300 text-sm">Chief Operations Officer, Federal Infrastructure Partners</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-blue-800/50 text-blue-200 px-2 py-0.5 rounded border border-blue-500/20">Federal Certified</span>
                          <span className="text-xs text-blue-300 ml-2">27 Critical Infrastructure Projects</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex gap-1.5 mb-6">
                  <span className="w-3 h-1 bg-blue-500 rounded"></span>
                  <span className="w-3 h-1 bg-blue-300 rounded"></span>
                  <span className="w-3 h-1 bg-blue-300 rounded"></span>
                  <span className="w-3 h-1 bg-blue-300 rounded"></span>
                </div>
                <Button 
                  variant="outline" 
                  className="border-blue-400 text-white hover:bg-blue-800/40 mx-auto"
                >
                  View All 187 Enterprise Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Competitive Advantage Section */}
        <section className="py-16 backdrop-blur-sm bg-gradient-to-b from-primary-900/40 to-blue-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <div className="inline-block mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-800/30 border border-blue-500/30 relative z-50">
                <span className="text-blue-300 text-sm font-bold uppercase tracking-wider">Industry-Leading Technology</span>
              </div>
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">PraetorianGuard™ Competitive Advantage</GradientHeading>
              <p className="text-white text-lg">Our NASA-derived ceramic technology creates measurable value through quantifiable performance metrics that exceed traditional construction coating solutions.</p>
            </div>
            
            <div className="bg-primary-900/60 backdrop-blur-sm rounded-xl border border-blue-400/30 p-8 max-w-5xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/3">
                  <div className="sticky top-24">
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-800/80 to-blue-900/90 rounded-lg shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-white/5 bg-[length:16px_16px]"></div>
                      <div className="relative z-10 p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mx-auto mb-4 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">PraetorianGuard™</h3>
                        <p className="text-blue-200 mb-4">Patent #10,738,214</p>
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-100 mb-2">87%</div>
                        <p className="text-blue-300 font-semibold">Average Performance<br />Improvement</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-900/40 rounded-lg p-4 border border-blue-500/20">
                      <h4 className="text-lg font-semibold text-blue-200 mb-2">Industry Recognition</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-blue-200">2023 MaterialTech Innovation Award</div>
                            <div className="text-xs text-blue-300">Best Fire Protection Solution</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-blue-200">2022 ENR Top Product</div>
                            <div className="text-xs text-blue-300">Structural Protection Category</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-blue-200">2021 AEC Sustainability Award</div>
                            <div className="text-xs text-blue-300">Green Building Materials</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="space-y-6">
                    <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20">
                      <h3 className="text-xl font-bold text-blue-200 mb-4">Competitive Analysis: Fire Protection Coatings</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="pb-3 text-left text-blue-300">Performance Metric</th>
                              <th className="pb-3 text-center text-blue-300">PraetorianGuard™</th>
                              <th className="pb-3 text-center text-blue-300">Industry Average</th>
                              <th className="pb-3 text-center text-blue-300">Performance Delta</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            <tr className="border-b border-blue-500/20">
                              <td className="py-3 text-sm">Fire Rating (ASTM E119)</td>
                              <td className="py-3 text-center font-mono">3-hour</td>
                              <td className="py-3 text-center font-mono">1.5-hour</td>
                              <td className="py-3 text-center text-green-400 font-bold">+100%</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="py-3 text-sm">Coating Thickness Required</td>
                              <td className="py-3 text-center font-mono">3.2mm</td>
                              <td className="py-3 text-center font-mono">5.4mm</td>
                              <td className="py-3 text-center text-green-400 font-bold">-40%</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="py-3 text-sm">Weight Per Square Meter</td>
                              <td className="py-3 text-center font-mono">2.3kg</td>
                              <td className="py-3 text-center font-mono">6.4kg</td>
                              <td className="py-3 text-center text-green-400 font-bold">-64%</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="py-3 text-sm">Fire Protection Rating</td>
                              <td className="py-3 text-center font-mono">Class A (0/0)</td>
                              <td className="py-3 text-center font-mono">Class B-C</td>
                              <td className="py-3 text-center text-green-400 font-bold">Superior</td>
                            </tr>
                            <tr>
                              <td className="py-3 text-sm">VOC Content</td>
                              <td className="py-3 text-center font-mono">0g/L</td>
                              <td className="py-3 text-center font-mono">102g/L</td>
                              <td className="py-3 text-center text-green-400 font-bold">-100%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 text-xs text-blue-200">
                        <span className="font-bold">Data Source:</span> Independent testing by Underwriters Laboratories and TUV SUD America, 2023
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20">
                      <h3 className="text-xl font-bold text-blue-200 mb-4">Total Cost of Ownership Analysis</h3>
                      <div className="grid grid-cols-2 gap-5 mb-5">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                            Initial Implementation
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1 border-b border-blue-500/20">
                              <span className="text-sm text-white">Material Cost:</span>
                              <span className="text-blue-100">+18% vs. traditional</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-blue-500/20">
                              <span className="text-sm text-white">Labor Hours:</span>
                              <span className="text-green-400">-53% vs. traditional</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-blue-500/20">
                              <span className="text-sm text-white">Equipment Requirements:</span>
                              <span className="text-green-400">-30% vs. traditional</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-sm text-white">Project Timeline Impact:</span>
                              <span className="text-green-400">-47% vs. traditional</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                            Long-Term Value
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1 border-b border-blue-500/20">
                              <span className="text-sm text-white">Energy Savings:</span>
                              <span className="text-green-400">87% reduction</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-blue-500/20">
                              <span className="text-sm text-white">Insurance Premium Impact:</span>
                              <span className="text-green-400">18% reduction</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-blue-500/20">
                              <span className="text-sm text-white">Maintenance Frequency:</span>
                              <span className="text-green-400">Every 30+ years</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-sm text-white">Total 10-Year ROI:</span>
                              <span className="text-green-400">342%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-900/60 rounded-lg p-4 border border-blue-500/30">
                        <h4 className="font-semibold text-blue-200 mb-2">Case Study: 50,000 sq ft Commercial Building</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-blue-900/40 rounded p-3 text-center">
                            <div className="text-3xl font-bold text-white mb-1">$2.4M</div>
                            <div className="text-xs text-blue-200">10-Year<br />Energy Savings</div>
                          </div>
                          <div className="bg-blue-900/40 rounded p-3 text-center">
                            <div className="text-3xl font-bold text-white mb-1">72%</div>
                            <div className="text-xs text-blue-200">Reduced<br />Carbon Footprint</div>
                          </div>
                          <div className="bg-blue-900/40 rounded p-3 text-center">
                            <div className="text-3xl font-bold text-white mb-1">18.4</div>
                            <div className="text-xs text-blue-200">Years<br />Payback Period</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/40 rounded-lg p-5 border border-blue-500/20">
                      <h3 className="text-xl font-bold text-blue-200 mb-4">Enterprise Integration Benefits</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-700/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">BIM Integration</h4>
                            <p className="text-sm text-blue-200">Complete Revit, ArchiCAD, and Navisworks model libraries for immediate implementation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-700/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Project Management APIs</h4>
                            <p className="text-sm text-blue-200">Seamless integration with Procore, PlanGrid, and Autodesk Construction Cloud</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-700/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Specification Library</h4>
                            <p className="text-sm text-blue-200">Comprehensive MasterSpec® and CSI 3-part specifications for all building types</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-700/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Digital Twin Enablement</h4>
                            <p className="text-sm text-blue-200">IoT sensor integration for real-time thermal and structural monitoring</p>
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
        
        {/* Enterprise Case Study Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="mixed">
                Case Study: Skyline Tower Commercial Complex
              </GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div className="bg-blue-900/40 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-2xl font-bold mb-4 text-blue-100">Project Overview</h3>
                    <p className="mb-4">
                      A landmark 52-story mixed-use development in downtown Seattle required comprehensive fire protection and thermal management solutions to meet strict building codes while optimizing energy efficiency.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-900/70 p-4 rounded-lg flex flex-col items-center text-center">
                        <ShieldCheck className="h-8 w-8 mb-2 text-blue-300" />
                        <span className="text-2xl font-bold">97%</span>
                        <span className="text-sm">Increased Fire Protection</span>
                      </div>
                      <div className="bg-blue-900/70 p-4 rounded-lg flex flex-col items-center text-center">
                        <Building className="h-8 w-8 mb-2 text-blue-300" />
                        <span className="text-2xl font-bold">1.4M</span>
                        <span className="text-sm">Square Feet Protected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/40 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-xl font-bold mb-3 text-blue-100">Performance Metrics</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Droplets className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>100% water resistance</strong> across all tested exterior surfaces</span>
                      </li>
                      <li className="flex items-start">
                        <HardHat className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>Class A fire rating</strong> with 0/0 flame spread and smoke development</span>
                      </li>
                      <li className="flex items-start">
                        <PaintBucket className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>156% elastomeric flexibility</strong> allowing for thermal expansion</span>
                      </li>
                      <li className="flex items-start">
                        <Leaf className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>32% reduction</strong> in overall building energy consumption</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-blue-900/40 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-xl font-bold mb-3 text-blue-100">Implementation Details</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-300">Project Duration</p>
                          <p className="font-semibold">8.5 months</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-300">Coating System</p>
                          <p className="font-semibold">PraetorianGuard™ Pro</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-300">Application Method</p>
                          <p className="font-semibold">Spray & Roller Hybrid</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-300">Building Code</p>
                          <p className="font-semibold">IBC 2018 Compliant</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-blue-700">
                        <h4 className="font-semibold mb-2">ROI Analysis (10-Year Projection)</h4>
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-blue-700">
                              <th className="text-left py-2 text-sm">Category</th>
                              <th className="text-right py-2 text-sm">Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-800">
                              <td className="py-2">Energy Cost Reduction</td>
                              <td className="text-right">$3.6M</td>
                            </tr>
                            <tr className="border-b border-blue-800">
                              <td className="py-2">Insurance Premium Reduction</td>
                              <td className="text-right">$1.2M</td>
                            </tr>
                            <tr className="border-b border-blue-800">
                              <td className="py-2">Maintenance Cost Reduction</td>
                              <td className="text-right">$950K</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-bold">Total ROI</td>
                              <td className="text-right font-bold">583%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/40 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-xl font-bold mb-3 text-blue-100">Client Testimonial</h3>
                    <blockquote className="italic border-l-4 border-blue-400 pl-4 mb-4">
                      "The implementation of Praetorian's ceramic coating system throughout our Skyline Tower project delivered exceptional results that far exceeded our expectations. Not only did we achieve compliance with stringent fire safety regulations, but the energy efficiency gains have significantly improved our operating costs and enhanced our LEED Platinum certification. The long-term protection and warranty coverage provide peace of mind for our investment committee and property management team."
                    </blockquote>
                    <div className="text-right">
                      <p className="font-bold">Michael Chen, AIA, LEED AP</p>
                      <p className="text-sm">Director of Sustainable Development, Emerald City Properties</p>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button
                        className="bg-blue-600 hover:bg-blue-500 text-white"
                        onClick={() => {
                          // In a production environment, this would link to a full case study PDF
                          window.alert("Full case study document download functionality will be implemented in the final version");
                        }}
                      >
                        Download Detailed Technical Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            {showRegistrationForm ? (
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                {registrationSuccess ? (
                  <div className="text-center max-w-2xl mx-auto">
                    <div className="mb-6 text-green-400">
                      <CheckCircle className="h-16 w-16 mx-auto" />
                    </div>
                    <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Registration Successful!</GradientHeading>
                    <p className="text-white text-lg mb-8">Thank you for registering as a Construction Partner. Our team will review your application and contact you within 24-48 business hours to discuss next steps and your exclusive territory options.</p>
                    <Button 
                      variant="outline" 
                      className="border-blue-400 text-white hover:bg-blue-800/40"
                      onClick={() => setShowRegistrationForm(false)}
                    >
                      Return to Main Page
                    </Button>
                  </div>
                ) : (
                  <>
                    <GradientHeading level={2} className="text-3xl font-bold mb-8 text-center" variant="mixed">Construction Partner Registration</GradientHeading>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Company Name*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your company name" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Contact Name*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your full name" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Email Address*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your@email.com" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Phone Number*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(123) 456-7890" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Website</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://yourcompany.com" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="businessType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Business Type*</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-blue-900/40 border-blue-500/30 text-white">
                                        <SelectValue placeholder="Select business type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="retailer">Building Materials Retailer</SelectItem>
                                      <SelectItem value="distributor">Building Materials Distributor</SelectItem>
                                      <SelectItem value="contractor">General Contractor</SelectItem>
                                      <SelectItem value="specialty">Specialty Contractor</SelectItem>
                                      <SelectItem value="engineering">Engineering Firm</SelectItem>
                                      <SelectItem value="architecture">Architecture Firm</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="foundedYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Year Founded*</FormLabel>
                                  <FormControl>
                                    <Input type="number" min="1900" max="2023" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="employeeCount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Number of Employees*</FormLabel>
                                  <FormControl>
                                    <Input type="number" min="1" className="bg-blue-900/40 border-blue-500/30 text-white" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="annualRevenue"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Annual Revenue</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-blue-900/40 border-blue-500/30 text-white">
                                        <SelectValue placeholder="Select annual revenue" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="under_1m">Under $1M</SelectItem>
                                      <SelectItem value="1m_5m">$1M - $5M</SelectItem>
                                      <SelectItem value="5m_10m">$5M - $10M</SelectItem>
                                      <SelectItem value="10m_50m">$10M - $50M</SelectItem>
                                      <SelectItem value="over_50m">Over $50M</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="certifications"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Certifications/Licenses</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="List relevant certifications (e.g., ICC, NFPA, AIA, LEED, etc.)"
                                      className="bg-blue-900/40 border-blue-500/30 text-white min-h-[80px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-white mb-4 font-bold">Geographic Coverage Areas</p>
                          <FormField
                            control={form.control}
                            name="coverageAreas"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="List states, counties, or ZIP codes where you currently operate"
                                    className="bg-blue-900/40 border-blue-500/30 text-white min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div>
                          <p className="text-white mb-4 font-bold">Product Categories of Interest</p>
                          <FormField
                            control={form.control}
                            name="productCategories"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="List product categories you're interested in (e.g., structural steel coatings, concrete protection, waterproofing, etc.)"
                                    className="bg-blue-900/40 border-blue-500/30 text-white min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div>
                          <p className="text-white mb-4 font-bold">Additional Notes</p>
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Include any additional information about your business or specific interests in our products"
                                    className="bg-blue-900/40 border-blue-500/30 text-white min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Button 
                            variant="outline" 
                            className="border-blue-400 text-white hover:bg-blue-800/40"
                            onClick={() => setShowRegistrationForm(false)}
                            type="button"
                          >
                            Cancel
                          </Button>
                          
                          <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span>Submitting...</span>
                              </div>
                            ) : (
                              "Submit Application"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            ) : (
              <div className="backdrop-blur-sm bg-gradient-to-b from-primary-900/80 to-blue-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                <div className="md:flex items-center gap-10">
                  <div className="md:w-2/3 text-center md:text-left mb-8 md:mb-0">
                    <div className="inline-block mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-800/30 border border-blue-500/30 relative z-50">
                      <span className="text-blue-300 text-sm font-bold uppercase tracking-wider">Enterprise-Ready Solution</span>
                    </div>
                    <GradientHeading level={2} className="text-3xl md:text-5xl mb-4" variant="mixed">Transform Your Construction Projects</GradientHeading>
                    <p className="text-white text-lg mb-8">
                      Discover how PraetorianGuard™ NASA-derived ceramic technology delivers unmatched performance, sustainability, and value for commercial construction. Our patented solutions provide Class A fire protection, thermal performance, and 30+ year durability with full enterprise integration capabilities.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">Enterprise-level project management and BIM integration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">Engineer-verified performance specifications & documentation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">Dedicated project support from certified technical specialists</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">Comprehensive digital twin compatibility for lifecycle monitoring</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">Verified 342% ROI with extensive Fortune 500 implementation history</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <GradientButton 
                        onClick={handleShowRegistrationForm} 
                        variant="variant" 
                        className="text-lg"
                      >
                        Request Enterprise Consultation
                      </GradientButton>
                      <Button 
                        variant="outline" 
                        className="border-blue-400 text-white hover:bg-blue-800/40"
                      >
                        Download Technical Specifications
                      </Button>
                      <Button 
                        variant="link" 
                        className="text-white hover:text-blue-300 hidden md:flex"
                      >
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Watch Video Demo
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-700/30 rounded-full blur-3xl"></div>
                      <div className="relative w-64 h-64 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center p-1">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-900 to-black flex items-center justify-center overflow-hidden">
                          <div className="relative w-48 h-48">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg viewBox="0 0 200 200" className="w-full h-full">
                                <defs>
                                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1E40AF" />
                                    <stop offset="100%" stopColor="#1D4ED8" />
                                  </linearGradient>
                                </defs>
                                <path 
                                  fill="url(#gradient)" 
                                  d="M40,100 A60,60 0 1,1 160,100 A60,60 0 1,1 40,100 Z"
                                />
                              </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-center">
                              <div>
                                <div className="text-4xl font-bold text-white mb-2">342%</div>
                                <div className="text-sm text-blue-300 px-4">ROI For Enterprise Implementation</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Construction Industry ROI Analysis Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative max-w-7xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-orange-600/30 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-blue-500/30 overflow-hidden">
                {/* Corner accent elements */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Construction Material ROI Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Building Industry Challenges</h3>
                    
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 p-6 rounded-lg border border-red-500/20 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Industry Pain Points
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Rising energy costs</span> - Commercial buildings face 18-27% annual increases in utility expenses due to aging infrastructure
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Stricter building codes</span> - New regulations require up to 45% improvement in thermal efficiency by 2027
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Maintenance cycles</span> - Average commercial building exterior requires repainting every 3-5 years at $2.85-$4.75/sq ft
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Labor shortages</span> - Construction workforce facing 17% vacancy rates and 34% higher wage costs
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian SmartCoat Advantages
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">20+ year lifespan</span> - Eliminates 3-4 maintenance cycles for significant labor and material savings
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Energy reduction</span> - 32.7% average reduction in HVAC energy consumption through temperature stabilization
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Code compliance</span> - Meets or exceeds future energy code requirements in all 50 states
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Fire safety enhancement</span> - ASTM E119 fire rating improves building safety and reduces insurance premiums
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                      <Warehouse className="h-5 w-5 text-blue-400 mr-2" />
                      Commercial Building Cost Analysis
                    </h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Mid-Size Office Building <span className="text-sm text-blue-300">(50,000 sq ft)</span></h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Traditional System (30-Year Analysis)</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Initial coating cost:</span>
                            <span className="text-white font-medium">$212,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Repainting (5 cycles):</span>
                            <span className="text-white font-medium">$1,062,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy costs:</span>
                            <span className="text-white font-medium">$3,285,000</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">30-Year Total Cost:</span>
                            <span className="text-white font-semibold">$4,560,000</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">With Praetorian SmartCoat (30-Year Analysis)</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Initial system cost:</span>
                            <span className="text-white font-medium">$437,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Repainting (0 cycles):</span>
                            <span className="text-white font-medium">$0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy costs (-32.7%):</span>
                            <span className="text-white font-medium">$2,210,805</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">30-Year Total Cost:</span>
                            <span className="text-green-400 font-semibold">$2,648,305</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center text-blue-300 text-sm">
                          <span className="font-semibold">30-Year Savings: $1,911,695</span> | 371% ROI
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Additional Benefits</h4>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Reduced maintenance labor:</span>
                            <span className="text-white font-semibold">-83%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "83%" }}></div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Insurance premium reduction:</span>
                            <span className="text-white font-semibold">12-17%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "17%" }}></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-300">LEED/Energy Star certification bonus points:</span>
                          <span className="text-white font-semibold">12-18 pts</span>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/20">
                          <div className="flex items-center">
                            <Award className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-200">
                              <span className="font-semibold text-white">Tax Incentives:</span> Projects in designated development zones qualify for up to 30% material cost rebates through energy efficiency tax programs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6">
                      <button 
                        onClick={() => setShowRegistrationForm(true)}
                        className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Request Building Analysis</span>
                        <span className="relative invisible">Request Building Analysis</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    Praetorian SmartCoat has been applied to over 8.5 million square feet of commercial building surface area nationwide, saving customers an estimated $37.2 million in maintenance and energy costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Registration Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-blue-600/30 to-blue-500/30 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 p-6 rounded-xl shadow-lg border border-blue-500/20 overflow-hidden">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.3)]">
                  Request Your Custom Building Analysis
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 bg-blue-950/20 p-4 rounded-lg border border-blue-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3">Enterprise Benefits</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Custom ROI analysis for your building</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Thermal efficiency simulation report</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Energy cost reduction projection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Certification and compliance documentation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Technical specification package</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Tax incentive qualification assessment</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-3 rounded border border-blue-700/20">
                      <p className="text-sm text-gray-300">
                        Join over <span className="font-bold text-white">750+ commercial buildings</span> nationwide that have achieved an average of <span className="font-bold text-white">371% ROI</span> with Praetorian SmartCoat technology.
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Analysis Request Submitted!",
                        description: "Your custom building analysis will be prepared by our engineering team. A Praetorian representative will contact you within 24 hours.",
                      });
                      setShowRegistrationForm(false);
                    }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            First Name*
                          </label>
                          <input 
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Last Name*
                          </label>
                          <input 
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Smith"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Name*
                        </label>
                        <input 
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="ABC Construction Ltd."
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address*
                          </label>
                          <input 
                            type="email"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number*
                          </label>
                          <input 
                            type="tel"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Building Type*
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option value="">Select building type</option>
                          <option value="office">Office Building</option>
                          <option value="retail">Retail Building</option>
                          <option value="hotel">Hotel/Hospitality</option>
                          <option value="industrial">Industrial Facility</option>
                          <option value="healthcare">Healthcare Facility</option>
                          <option value="government">Government Building</option>
                          <option value="education">Educational Institution</option>
                          <option value="mixed">Mixed-Use Development</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Building Square Footage*
                          </label>
                          <input 
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="50000"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Building Age (Years)
                          </label>
                          <input 
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="15"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Current Primary Concerns
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option value="">Select primary concern</option>
                          <option value="energy">Energy Efficiency</option>
                          <option value="maintenance">Maintenance Costs</option>
                          <option value="fire">Fire Protection</option>
                          <option value="code">Building Code Compliance</option>
                          <option value="appearance">Appearance/Aesthetics</option>
                          <option value="moisture">Moisture/Water Issues</option>
                          <option value="structural">Structural Protection</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Project Timeline
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (0-3 months)</option>
                          <option value="shortterm">Short-term (3-6 months)</option>
                          <option value="midterm">Medium-term (6-12 months)</option>
                          <option value="longterm">Long-term (12+ months)</option>
                          <option value="planning">Planning Phase Only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-start mt-4">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            aria-describedby="terms-description"
                            name="terms"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 rounded bg-gray-700"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-medium text-gray-300">
                            I agree to be contacted
                          </label>
                          <p id="terms-description" className="text-gray-500">
                            By submitting this form, you agree to receive your custom analysis and be contacted by our engineering team.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 ease-in-out"
                        >
                          Request Custom Analysis
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ConstructionPage;