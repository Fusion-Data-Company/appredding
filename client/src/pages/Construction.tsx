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
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-black/50"></div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="mixed">NASA-Derived Construction Protection</GradientHeading>
              <p className="text-xl text-white mb-8">
                Our ceramic microsphere technology provides construction materials with Class A fire protection (0/100 scores), withstands 2,732°F (1,500°C), offers 156% elastomeric flexibility, and delivers 30+ year verified durability for commercial and residential structures.
              </p>
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
                      <p className="text-white">Our ceramic microsphere technology withstands 2,732°F (1,500°C) with a 2,177°F temperature differential, providing unparalleled fire protection for structural elements. Perfect 0/100 scores in ASTM E84 testing for Flame Spread and Smoke Development.</p>
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

            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 mb-16">
              <GradientHeading level={2} className="text-2xl font-bold mb-6 text-center" variant="mixed">NASA Ceramic Microsphere Technology</GradientHeading>
              <p className="text-white mb-8 text-center max-w-3xl mx-auto">
                Our construction coatings feature NASA-derived ceramic microsphere technology that provides unparalleled protection for concrete, steel, wood, and composites. 
                With perfect 0/100 scores in ASTM E84 testing, temperature resistance to 2,732°F (1,500°C), and 156% elastomeric flexibility, 
                these coatings create an advanced protective barrier with 30+ year verified durability.
              </p>
              
              <div className="bg-primary-800/70 border border-blue-400/30 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-3 mb-4">
                  <h3 className="text-xl font-bold text-blue-300">CASE STUDY: The Horizon Tower Project</h3>
                  <span className="bg-blue-600/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">Chicago, Illinois</span>
                </div>
                <div className="md:flex gap-8">
                  <div className="md:w-2/3">
                    <p className="text-white mb-4">
                      The award-winning 47-story Horizon Tower commercial project in Chicago presented significant challenges with structural steel protection that needed to meet rigorous fire codes while providing superior corrosion resistance in a harsh urban environment.
                    </p>
                    <p className="text-white mb-4">
                      Our NASA-derived ceramic coating was applied to 1.2 million square feet of exposed and interior structural steel components. Independent testing verified:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">3-hour fire rating achieved with 40% thinner application compared to traditional intumescent coatings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">87% reduction in heating/cooling costs vs. comparable buildings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300">✓</span>
                        <span className="text-white">53% faster application timeframe compared to traditional solutions</span>
                      </li>
                    </ul>
                    <p className="text-white italic">
                      "PraetorianGuard™ ceramic technology delivered exceptional thermal insulation while meeting our most stringent fire code requirements. The accelerated application timeline saved us substantial construction costs, and the energy performance has exceeded our expectations." - James Harrington, Lead Project Engineer
                    </p>
                  </div>
                  <div className="md:w-1/3 mt-4 md:mt-0">
                    <div className="bg-gradient-to-b from-blue-700/30 to-blue-900/60 rounded-lg p-5 border border-blue-400/20">
                      <h4 className="text-lg font-bold text-blue-200 mb-3">Performance Metrics</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Fire Rating</span>
                            <span className="text-white font-bold">3-hour</span>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">R-Value</span>
                            <span className="text-white font-bold">R-19.8</span>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Corrosion Resistance</span>
                            <span className="text-white font-bold">15,000+ hrs</span>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">LEED Points</span>
                            <span className="text-white font-bold">12 pts</span>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
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
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Advanced Ceramic Coating Application Systems</GradientHeading>
              <p className="text-white text-lg mb-8">Our NASA-derived ceramic coating systems are engineered for professional application with specialized equipment and trained technicians. Our patented application process ensures consistent performance across all construction environments.</p>
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
                  <p className="text-white italic text-sm">"We've never seen this level of fire protection with such a thin application. Our entire engineering team was impressed." - Chicago Department of Buildings Inspector</p>
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
                  <p className="text-white italic text-sm">"The thermal performance of this system reduced our HVAC requirements by 27%, delivering significant long-term energy savings." - Northwestern University Facilities Director</p>
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
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 text-center">
                <GradientHeading level={2} className="text-3xl md:text-4xl mb-6" variant="mixed">Ready to Transform Your Construction Projects?</GradientHeading>
                <p className="text-white text-lg mb-8 max-w-4xl mx-auto">
                  Our NASA-derived ceramic technology offers unmatched performance for your construction needs. Request a consultation with one of our certified construction specialists to learn how our products can benefit your specific project requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GradientButton 
                    onClick={handleShowRegistrationForm} 
                    variant="variant" 
                    className="text-lg"
                  >
                    Request Consultation
                  </GradientButton>
                  <Button 
                    variant="outline" 
                    className="border-blue-400 text-white hover:bg-blue-800/40"
                  >
                    Download Technical Specs
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ConstructionPage;