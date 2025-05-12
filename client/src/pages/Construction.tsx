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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-orange-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Fire-Rated Structural Protection</h3>
                  <p className="text-white">ASTM E119 compliant with 3-hour fire rating and perfect 0/100 scores in flame spread/smoke development tests (ASTM E84).</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-blue-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <PaintBucket className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Thermal Reflective Technology</h3>
                  <p className="text-white">89% solar reflection and thermal emittance documented by Cool Roof Rating Council with only 1% reflectivity loss after 3 years (vs 10-20% for competitors).</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-orange-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Umbrella className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Advanced Waterproofing</h3>
                  <p className="text-white">156% elastomeric flexibility with permanent waterproofing using ceramic microsphere self-healing technology. 100% waterproof even after 10,000 salt spray hours.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-blue-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <HardDrive className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">NASA Certification & Standards</h3>
                  <p className="text-white">Exceeds ASTM E84, NFPA 286, ASTM C1396, UL 723, and all commercial building codes with documented NASA technology transfer certification.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 backdrop-blur-sm bg-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="bg-primary-900/60 backdrop-blur-xl rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
                <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Construction Coating Solutions</GradientHeading>
                <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                  Specialized coatings for every construction application, from industrial facilities to residential buildings
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Hammer className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Floor Coatings</h3>
                <p className="text-white">High-performance epoxy and polyurethane systems for concrete floors that provide chemical resistance, durability, and aesthetic appeal.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Ruler className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">Wall Systems</h3>
                <p className="text-white">Protective and decorative wall coatings that offer superior durability, cleanability, and resistance to mold and mildew for long-lasting protection.</p>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Metal Protection</h3>
                <p className="text-white">Advanced systems that provide exceptional protection for metal structures against corrosion, extending service life and reducing maintenance costs.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
              <GradientHeading level={2} className="text-2xl font-bold mb-6 text-center" variant="mixed">Request a Construction Coating Consultation</GradientHeading>
              <p className="text-white text-center mb-8">Our experts will evaluate your project requirements and recommend the ideal coating system for your needs.</p>
              
              {!showRegistrationForm && !registrationSuccess && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Why Choose Our Construction Coatings?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">✓</span>
                        <span className="text-white">Superior adhesion to various construction materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span className="text-white">Extended service life compared to conventional coatings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">✓</span>
                        <span className="text-white">Reduced maintenance requirements and lifecycle costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span className="text-white">Expert application by certified contractors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">✓</span>
                        <span className="text-white">Comprehensive warranty programs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="p-4 mb-4 bg-primary-800/70 border border-orange-500/30 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2 text-white">Request a Consultation</h3>
                      <p className="text-[#a0a0a0] mb-4">For the fastest service, please register as a construction distributor to access our full range of services and resources.</p>
                      <GradientButton 
                        variant="variant" 
                        className="w-full"
                        onClick={handleShowRegistrationForm}
                      >
                        Register as a Construction Distributor
                      </GradientButton>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Registration Success Message */}
              {registrationSuccess && (
                <div className="max-w-2xl mx-auto text-center p-8 bg-primary-800/70 border-2 border-white/30 rounded-xl">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Registration Successful!</h3>
                  <p className="text-white mb-6">Thank you for registering as a construction distributor with Praetorian SmartCoat Solutions. Our team will review your information and contact you soon.</p>
                  <p className="text-[#a0a0a0] mb-6">You'll receive access to our exclusive distributor resources and specialized products for the construction industry.</p>
                  <GradientButton variant="default" onClick={() => setRegistrationSuccess(false)} className="px-8">
                    Return to Construction Page
                  </GradientButton>
                </div>
              )}
              
              {/* Registration Form */}
              {showRegistrationForm && !registrationSuccess && (
                <div className="max-w-3xl mx-auto">
                  <div className="bg-primary-800/70 border border-orange-500/30 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Construction Distributor Registration</h3>
                    <p className="text-[#a0a0a0] mb-6">Complete this form to register as an authorized distributor for our construction coating products.</p>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Company Information */}
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Company Name*</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter company name" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
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
                                <FormLabel className="text-white">Contact Person*</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter contact name" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
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
                                <FormLabel className="text-white">Email*</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter email address" 
                                    type="email"
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
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
                                  <Input 
                                    placeholder="Enter phone number" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
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
                                  <Input 
                                    placeholder="Enter company website" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
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
                                    <SelectTrigger className="bg-primary-900/70 border-orange-500/30 text-white">
                                      <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-primary-800 text-white border-blue-500/30">
                                    <SelectItem value="retailer">Retailer</SelectItem>
                                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                                    <SelectItem value="contractor">Contractor</SelectItem>
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
                                <FormLabel className="text-white">Year Founded</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="YYYY" 
                                    type="number"
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))}
                                  />
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
                                <FormLabel className="text-white">Number of Employees</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter employee count" 
                                    type="number" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))}
                                  />
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
                                <FormControl>
                                  <Input 
                                    placeholder="Optional revenue range" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="border-t border-white/10 pt-6"></div>
                        
                        {/* Address Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter street address" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">City</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter city" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">State/Province</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter state/province" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">ZIP/Postal Code</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter ZIP/postal code" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="border-t border-white/10 pt-6"></div>
                        
                        {/* Business Details */}
                        <div className="grid grid-cols-1 gap-6">
                          <FormField
                            control={form.control}
                            name="coverageAreas"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Geographic Coverage Areas</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter areas served, separated by commas (e.g., Northeast, Mid-Atlantic, Southeast)" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white min-h-[80px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="productCategories"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Product Categories of Interest</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter product categories, separated by commas (e.g., Floor Coatings, Wall Systems, Waterproofing)" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white min-h-[80px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="certifications"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">
                                    <div className="flex items-center gap-2">
                                      <Award className="h-4 w-4 text-blue-400" />
                                      <span>Certifications/Accreditations</span>
                                    </div>
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Enter certifications, separated by commas" 
                                      className="bg-primary-900/70 border-orange-500/30 text-white min-h-[80px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="warehouseLocations"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">
                                    <div className="flex items-center gap-2">
                                      <Warehouse className="h-4 w-4 text-orange-400" />
                                      <span>Warehouse Locations</span>
                                    </div>
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Enter warehouse locations, separated by commas" 
                                      className="bg-primary-900/70 border-orange-500/30 text-white min-h-[80px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="deliveryOptions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  <div className="flex items-center gap-2">
                                    <Truck className="h-4 w-4 text-blue-400" />
                                    <span>Delivery/Logistics Capabilities</span>
                                  </div>
                                </FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter delivery options, separated by commas (e.g., In-house delivery, Third-party logistics)" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white min-h-[80px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter any additional information about your business" 
                                    className="bg-primary-900/70 border-orange-500/30 text-white min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowRegistrationForm(false)}
                            className="border-blue-500/30 text-white hover:bg-blue-950/30"
                          >
                            Cancel
                          </Button>
                          <GradientButton 
                            type="submit" 
                            variant="default"
                            className="flex-1"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span>Submitting...</span>
                              </div>
                            ) : (
                              "Register as Construction Distributor"
                            )}
                          </GradientButton>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ConstructionPage;