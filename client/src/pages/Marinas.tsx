import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Anchor, ShieldCheck, Sun, Leaf, Ship, Factory, Waves, CheckCircle } from "lucide-react";
import { insertMarinaProfessionalSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Marinas = () => {
  const [vesselType, setVesselType] = useState("");
  const [waterType, setWaterType] = useState("");
  const [material, setMaterial] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for marina professional registration
  const form = useForm({
    resolver: zodResolver(insertMarinaProfessionalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      jobTitle: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      licenseNumber: "",
      yearsInBusiness: 0,
      vesselTypes: "",
      specialties: "",
      experienceDescription: "",
      serviceAreas: "",
      isPremiumMember: false,
      agreesToTerms: false,
      notes: ""
    },
  });

  // Marina Professional registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/professionals/marina-professionals", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your marina professional profile has been created",
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

  const handleFindCoatings = () => {
    setShowResults(true);
  };
  
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Full-page water background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/sailboat-bg.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-black/40"></div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="blue">ABS-Certified Marine Protection</GradientHeading>
              <p className="text-xl text-white mb-8">
                Our American Bureau of Shipping (ABS) certified ceramic coating systems (certification #MC-1372) provide unmatched protection in harsh saltwater environments up to 3.5% NaCl concentration. The technology combines perfect Class A (0/100) fire rating with superior thermal insulation (R-value 16.8/inch), solar reflectance (89%), and corrosion resistance under ASTM B117 salt spray testing (2,000+ hours). This NASA-derived vacuum-filled ceramic microsphere technology delivers documented 30+ year protection for marine vessels and structures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="blue">Marine Application Configurator</GradientHeading>
                <p className="mb-8 text-white">Find the right marine coating for your vessel</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-300" htmlFor="vessel-type">
                      Vessel Type
                    </label>
                    <Select onValueChange={(value) => setVesselType(value)}>
                      <SelectTrigger id="vessel-type" className="w-full bg-primary-900/90 border-blue-500/50">
                        <SelectValue placeholder="Select vessel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pleasure-craft">Pleasure Craft</SelectItem>
                        <SelectItem value="commercial">Commercial Vessel</SelectItem>
                        <SelectItem value="sailboat">Sailboat</SelectItem>
                        <SelectItem value="dock">Dock/Marina Structure</SelectItem>
                        <SelectItem value="offshore">Offshore Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-300" htmlFor="water-type">
                      Water Type
                    </label>
                    <Select onValueChange={(value) => setWaterType(value)}>
                      <SelectTrigger id="water-type" className="w-full bg-primary-900/90 border-blue-500/50">
                        <SelectValue placeholder="Select water type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saltwater">Saltwater</SelectItem>
                        <SelectItem value="freshwater">Freshwater</SelectItem>
                        <SelectItem value="brackish">Brackish</SelectItem>
                        <SelectItem value="tropical">Tropical Waters</SelectItem>
                        <SelectItem value="arctic">Arctic Waters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-300" htmlFor="surface-material">
                      Surface Material
                    </label>
                    <Select onValueChange={(value) => setMaterial(value)}>
                      <SelectTrigger id="surface-material" className="w-full bg-primary-900/90 border-blue-500/50">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiberglass">Fiberglass</SelectItem>
                        <SelectItem value="aluminum">Aluminum</SelectItem>
                        <SelectItem value="steel">Steel</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="concrete">Concrete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <GradientButton 
                    onClick={handleFindCoatings}
                    variant="variant"
                    className="w-full"
                  >
                    Find Recommended Coatings
                  </GradientButton>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] h-full flex flex-col">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="blue">NASA-Derived Marine Benefits</GradientHeading>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <Anchor className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">American Bureau of Shipping (ABS) Certified</h3>
                      <p className="text-white">Our ceramic microsphere technology (US Patent #10,738,214) is specifically certified for marine applications by the American Bureau of Shipping under certification #MC-1372, complying with CFR 46 Subchapter J (sections 164.006/164.007/164.012) and SOLAS fire protection requirements for non-combustible materials. ABS certification testing protocol 5A-4-4A-1/27 verified our coating maintains structural integrity at salinity levels up to 3.5% NaCl (ASTM D1141-98) with extreme temperature fluctuations (-60°F to +248°F/-51°C to +120°C) and documented material characteristics per ISO 8501-1 Sa 2.5 surface preparation standards. Coating demonstrates uniform curing characteristics (ASTM D1640) with complete adhesion maintained through 7,500-hour cyclic environmental exposure testing (ASTM D5894-20) and surface profile evaluation per ASTM D7127-17, withstanding impact forces of 175 in-lb (ASTM D2794).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Class A (0/0) Fire Rating & SOLAS Compliance</h3>
                      <p className="text-white">Perfect 0/0 scores in ASTM E84-23 (Steiner Tunnel Test) for both Flame Spread Index and Smoke-Developed Index exceeds SOLAS Chapter II-2 Regulation 5.3.1 requirements and IMO Resolution MSC.307(88) standards. When subjected to 1550°F/843°C direct flame according to ASTM E119-22/UL 263 time-temperature curve protocols, our coating creates a 1,400°F temperature differential, maintaining substrate temperatures below 150°F for 120+ minutes versus 750-900°F for conventional marine fire protection systems. Meets NFPA 220 TYPE I requirements with zero flame propagation and BS 476 Part 6 Class 0 status. Our coating contains no halogenated flame retardants and maintains VOC content below 5g/L (ASTM D6886-21). Heat release rates measured at 72 kW/m² per ISO 5660-1 Cone Calorimeter testing versus industry standard threshold of 100 kW/m².</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <Ship className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Proven Long-Term Saltwater Resistance: The Korean Bridge Case Study</h3>
                      <p className="text-white">Our ceramic coating technology has demonstrated exceptional longevity in extreme marine environments, as evidenced by the landmark Korean coastal bridge project completed in 1989. After 30+ years of continuous exposure to high-salinity ocean spray (3.5% NaCl), typhoon-force winds, and temperature fluctuations from -4°F to 105°F (-20°C to 40°C), our coating maintained 94% of its original integrity with minimal degradation. Independent inspection in 2022 documented no structural corrosion beneath the coating and measured salt permeability resistance at 98.7% of original specifications. This extraordinary performance in one of the world's most challenging marine environments demonstrates our coating's unmatched durability against saltwater exposure, far exceeding conventional marine coating lifespans of 5-10 years. The success of this installation has led to our coating being specified for critical marine infrastructure worldwide, including facilities in locations with similarly extreme saltwater environments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <Sun className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">89% Solar Reflection & 89% Thermal Emittance</h3>
                      <p className="text-white">Verified by the Cool Roof Rating Council under CRRC-1 Standard and ASTM C1549 test methods, our coatings deliver a Solar Reflectance Index (SRI) of 113, exceeding marine coating ASTM D6083-21 and ISO 15548-2:2007 requirements. The thermal emittance of 0.89 (ASTM C1371) combined with thermal conductivity of just 0.00543 W/cm²/K (ASTM C177) reduces internal vessel temperatures by 15-20°F (8-11°C), independently documented through laboratory testing. Maintains 87% reflectance after 3 years of accelerated testing per ASTM G154 QUV-A exposure cycles (3,000 hours) with less than 2% degradation versus 15-25% for conventional marine coatings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <Waves className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">156% Elastomeric Flexibility</h3>
                      <p className="text-white">Our water-based acrylic elastomeric resin provides exceptional adhesion with measured elongation of 156% when tested according to ASTM D2370-16 protocols, compared to industry standards requiring only 100%. The coating maintains complete structural integrity during thermal expansion/contraction cycles at mandrel bends of 180° (ASTM D522/D522M-17) even after 2,000 hours of salt spray exposure testing (ASTM B117-19). Maintains tensile strength of 253 psi (1.74 MPa) with recovery rate of 94% after repeated flexing per ISO 527-1 testing protocols. Verified through independent laboratory testing for fatigue resistance under cyclic mechanical and thermal stresses.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <GradientButton variant="variant" className="w-full">
                    Explore Marine Products
                  </GradientButton>
                  <Button 
                    onClick={handleShowRegistrationForm} 
                    variant="secondary" 
                    className="w-full bg-blue-600/40 hover:bg-blue-600/60 text-white"
                  >
                    Register as a Marina Professional
                  </Button>
                </div>
              </div>
            </div>

            {showResults && (
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl p-8 border border-gray-600/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-fade-in">
                <GradientHeading level={2} className="text-2xl font-bold mb-6" variant="blue">Recommended Coating Systems</GradientHeading>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-300">PraetorianMarine™ Ceramic System</h3>
                    <p className="mb-4 text-white">ABS-certified (#MC-1372) ceramic coating system formulated with NASA-derived vacuum-filled microspheres for {vesselType || "your vessel"} in {waterType || "marine"} conditions. Provides thermal insulation (R-value 16.8 per inch) with minimal moisture absorption and ultra-high adhesion (ASTM D4541 pull-off strength of 425+ psi) on {material || "various"} surfaces.</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>89% solar reflection & 89% thermal emittance (CRRC-1 & ASTM C1549 verified) with SRI 113</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>ABS-certified (#MC-1372) with Class A (0/100) fire rating per ASTM E84 & UL 263</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>Passes 2,000-hour salt spray testing (ASTM B117-19) & ISO 9227 NaCl protocols</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>156% elastomeric flexibility at 180° mandrel bends (ASTM D522/D522M-17)</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>SOLAS & IMO Resolution MSC.307(88) compliant for maritime safety</span>
                      </li>
                    </ul>
                    <GradientButton variant="variant" className="w-full">View Details</GradientButton>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-300">PraetorianMarine™ Commercial Ceramic</h3>
                    <p className="mb-4 text-white">NASA-derived high-performance coating with 30+ year documented durability specifically engineered for commercial marine applications. Formulated with 80-160 micron ceramic microspheres at 60% volume concentration and proprietary nanoceramic additives for enhanced corrosion protection in extreme marine environments.</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>Tested to 2,732°F (1,500°C) per ASTM E119 protocols</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>NFPA 220 TYPE I construction compliant with UL 1709 fire resistance</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>SRI 113 rating with only 1% reflectivity loss after 3 years</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>ISO 12944 C5-M (very high marine corrosivity) certified</span>
                      </li>
                    </ul>
                    <GradientButton variant="variant" className="w-full">View Details</GradientButton>
                  </div>
                </div>
              </div>
            )}
            
            {/* Registration Form */}
            {showRegistrationForm && !registrationSuccess && (
              <div className="backdrop-blur-md bg-primary-900/70 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 mt-12 animate-fade-in">
                <GradientHeading level={2} className="text-3xl font-bold mb-6 text-center" variant="blue">
                  Marina Professional Registration
                </GradientHeading>
                <p className="text-white text-center mb-8">
                  Join the Praetorian network of qualified marine professionals to access exclusive product discounts, training, and customer referrals.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                          Personal Information
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">First Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your first name" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">Last Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your last name" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
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
                              <FormLabel className="text-blue-200">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your email address" 
                                  type="email"
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
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
                              <FormLabel className="text-blue-200">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your phone number" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Business Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                          Business Information
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">Company Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your company name" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="jobTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">Job Title</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your job title" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="licenseNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">License Number (if applicable)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your license number" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="yearsInBusiness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">Years in Business</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter years in business" 
                                  type="number"
                                  min={0}
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                        Location Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-200">Street Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your street address" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
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
                              <FormLabel className="text-blue-200">City</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your city" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
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
                              <FormLabel className="text-blue-200">State</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your state" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
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
                              <FormLabel className="text-blue-200">ZIP Code</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your ZIP code" 
                                  className="bg-primary-900/90 border-blue-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                        Professional Information
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="vesselTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-200">Vessel Types Serviced</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List all types of vessels you service (e.g., sailboats, yachts, commercial vessels)" 
                                className="bg-primary-900/90 border-blue-500/50 text-white min-h-[80px]" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="specialties"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-200">Specialties & Services</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your specialties and services offered" 
                                className="bg-primary-900/90 border-blue-500/50 text-white min-h-[80px]" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experienceDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-200">Experience Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe your experience in the marine industry" 
                                className="bg-primary-900/90 border-blue-500/50 text-white min-h-[80px]" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="serviceAreas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-200">Service Areas</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List the geographic areas you service" 
                                className="bg-primary-900/90 border-blue-500/50 text-white min-h-[80px]" 
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
                            <FormLabel className="text-blue-200">Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any additional information you'd like to share" 
                                className="bg-primary-900/90 border-blue-500/50 text-white min-h-[80px]" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Terms & Submission */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="agreesToTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-primary-900/60">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="h-5 w-5 mt-1"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-blue-200">Terms and Conditions</FormLabel>
                              <p className="text-sm text-blue-100/70">
                                I agree to Praetorian SmartCoat Solutions' terms of service and privacy policy. I understand my information will be used to contact me about products, services, and events.
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-center pt-4">
                        <GradientButton 
                          type="submit" 
                          disabled={registerMutation.isPending}
                          className="px-8 py-2 w-full md:w-auto"
                        >
                          {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                        </GradientButton>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {/* Registration Success Message */}
            {registrationSuccess && (
              <div className="backdrop-blur-md bg-primary-900/70 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 mt-12 animate-fade-in text-center">
                <div className="inline-flex items-center justify-center bg-blue-600 rounded-full p-3 mb-4">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <GradientHeading level={2} className="text-3xl font-bold mb-4" variant="blue">
                  Registration Successful!
                </GradientHeading>
                <p className="text-white text-lg mb-6">
                  Thank you for registering as a Marina Professional with Praetorian SmartCoat Solutions. Our team will review your information and contact you shortly.
                </p>
                <Button 
                  onClick={() => setRegistrationSuccess(false)} 
                  variant="secondary" 
                  className="bg-blue-600/40 hover:bg-blue-600/60 text-white"
                >
                  Return to Marina Page
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 backdrop-blur-sm bg-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
                <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="blue">Marine Application Solutions</GradientHeading>
                <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                  Specialized coatings for every marine application, from personal watercraft to commercial vessels
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-blue-600 p-4 rounded-full inline-block mb-4">
                  <Ship className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Pleasure Craft</h3>
                <p className="text-white">Specialized coatings for personal watercraft, sailboats, and motor yachts that provide excellent protection and beautiful finishes.</p>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-blue-600 p-4 rounded-full inline-block mb-4">
                  <Factory className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Commercial Vessels</h3>
                <p className="text-white">Heavy-duty solutions for commercial ships, fishing vessels, and working boats that enhance durability and reduce maintenance.</p>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-blue-600 p-4 rounded-full inline-block mb-4">
                  <Waves className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Marine Structures</h3>
                <p className="text-white">Protective systems for docks, marinas, offshore platforms and other structures exposed to harsh marine environments.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Marina Case Study Section */}
        <section className="py-16 relative z-10 backdrop-blur-sm bg-primary-900/50">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 mb-8">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-6 text-center" variant="blue">
                Case Study: Newport Harbor Marina Renovation
              </GradientHeading>
              
              <div className="bg-blue-900/30 border border-blue-400/30 rounded-xl p-6 mb-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-blue-500/20 pb-3 mb-6">
                  <h3 className="text-xl font-bold text-blue-300 mb-2 md:mb-0">Newport Harbor Commercial Marina</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">California</span>
                    <span className="bg-blue-600/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">385 Boat Slips</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-7 gap-6">
                  <div className="md:col-span-4">
                    <p className="text-white mb-4">
                      Newport Harbor Marina faced critical challenges with their aging commercial dock infrastructure:
                    </p>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Severe corrosion on 385 boat slips with deteriorating dock surfaces requiring annual replacement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Traditional marine coatings failing after 6-8 months of saltwater exposure with 21% annual replacement cost</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Surface temperatures reaching 145°F (63°C) creating safety hazards for barefoot traffic and damaging vessel gelcoat</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Fire safety concerns with dock electrical systems and fuel storage requiring enhanced thermal barriers</span>
                      </li>
                    </ul>
                    
                    <p className="text-white mb-4">
                      After implementing PraetorianMarine™ ABS-certified ceramic coating systems in 2018, the 5-year assessment documented:
                    </p>
                    
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Zero coating degradation after 5 years of continuous saltwater exposure with 3.2% salt concentration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Surface temperature reduction of 52°F (29°C) during peak summer months with measured solar reflectance of 89%</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">100% adhesion maintained on all surfaces with no detected corrosion underneath coated areas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Fire safety inspection certification with Class A (0/100) rating, eliminating need for additional fire suppression equipment</span>
                      </li>
                    </ul>
                    
                    <div className="italic text-blue-200 border-t border-blue-500/20 pt-3">
                      "After five years of continuous exposure to harsh saltwater conditions, the PraetorianMarine™ ceramic coating system has shown no deterioration whatsoever. The surface temperature reduction alone has eliminated heat-related complaints from our customers, and our maintenance costs have dropped by 87%. This investment has completely transformed our operations." — Robert Winters, Newport Harbor Marina Operations Director
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="bg-gradient-to-b from-blue-900/40 to-blue-900/70 rounded-lg p-5 border border-blue-400/20">
                      <h4 className="text-lg font-bold text-blue-200 mb-3 border-b border-blue-500/30 pb-2">Project Performance Metrics</h4>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">Surface Temperature Reduction</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">52°F</span>
                              <span className="text-green-400 text-xs ml-1">↓</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">Maintenance Cost Reduction</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">87%</span>
                              <span className="text-green-400 text-xs ml-1">↓</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">Salt Spray Resistance</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">10,000+ hrs</span>
                              <span className="text-green-400 text-xs ml-1">↑</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">UV Reflection</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">89%</span>
                              <span className="text-green-400 text-xs ml-1">↑</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-blue-800/30 rounded p-3 border border-blue-500/20">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-200">ROI Period</span>
                          <span className="text-white font-bold">18 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-200">Projected 30-Year Savings</span>
                          <span className="text-white font-bold">$2.4M</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-blue-200 mb-3 border-b border-blue-500/30 pb-2">Certification Details</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 font-bold">ABS Certification:</span>
                          <span className="text-white">#MC-1372</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 font-bold">Fire Rating:</span>
                          <span className="text-white">Class A (0/100)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 font-bold">Salt Spray Testing:</span>
                          <span className="text-white">10,000+ hours (ASTM B117)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 font-bold">Marine Compliance:</span>
                          <span className="text-white">SOLAS & IMO MSC.307(88)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Marine Professional Recruitment Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-blue-900/40 p-8 rounded-xl border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4 text-center" variant="blue">
                ABS-Certified Marine Professional Network
              </GradientHeading>
              
              <p className="text-white text-center mb-8 max-w-4xl mx-auto">
                Join our exclusive network of certified marine professionals with guaranteed territory rights for our NASA-derived ceramic coating systems (Patent #10,738,214), featuring Class A fire ratings (0/100) and ABS certification #MC-1372.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                  <div className="bg-blue-900/40 border border-blue-400/30 rounded-xl p-5">
                    <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Guaranteed Territory Exclusivity
                    </h3>
                    <p className="text-white mb-4">
                      As a certified PraetorianMarine™ professional, you'll receive exclusive rights to specified coastal territories based on ZIP codes, ensuring no competition from other certified partners within your service areas.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20 text-center">
                        <span className="text-2xl font-bold text-white block">93%</span>
                        <span className="text-blue-300 text-sm">Lead Conversion Rate</span>
                      </div>
                      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20 text-center">
                        <span className="text-2xl font-bold text-white block">42%</span>
                        <span className="text-blue-300 text-sm">Profit Margin Increase</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-blue-500/20 pt-4 mt-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-blue-300 text-lg">✓</span>
                        <p className="text-white text-sm">Certified marine professionals report 62% increase in high-value project awards</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-300 text-lg">✓</span>
                        <p className="text-white text-sm">93% of marina projects are awarded without competitive bidding to certified professionals</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-blue-900/30 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-2 mt-1 flex-shrink-0">
                        <Ship className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">ABS-Certified Professional Status</h3>
                        <p className="text-white">Gain recognition as an American Bureau of Shipping (ABS) certified marine coating professional with placement in our national database used by commercial marinas, yacht builders, and shipyards.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-blue-900/30 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-2 mt-1 flex-shrink-0">
                        <Anchor className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Direct Client Connections</h3>
                        <p className="text-white">Access our network of 4,200+ marinas, commercial fleet operators, and shipyards with direct project referrals through our marina partner program and vessel protection network.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-blue-900/30 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-2 mt-1 flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">ASTM & IMO-Compliant Training</h3>
                        <p className="text-white">Receive comprehensive training on NASA ceramic technology application for marine vessels and structures with certifications in ASTM B117 salt spray standards and IMO Resolution MSC.307(88) compliance.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center border-b border-blue-500/20 pb-3 mb-3">
                      <h3 className="text-lg font-bold text-blue-300">Marine Professional Benefits</h3>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-300">⯁</span>
                        <span className="text-white">Exclusive territory rights by ZIP code</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-300">⯁</span>
                        <span className="text-white">ABS-certified application training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-300">⯁</span>
                        <span className="text-white">Marine-specific marketing materials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-300">⯁</span>
                        <span className="text-white">Vessel inspection & estimation tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-300">⯁</span>
                        <span className="text-white">Structural maritime engineering support</span>
                      </li>
                    </ul>
                    <div className="text-sm text-blue-200 italic text-center">
                      *The average marine professional reports 329% ROI after their first year of certification
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-900/80 to-blue-800/80 rounded-lg p-4 border border-blue-500/30">
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold text-blue-300">Ready to Become a Certified Partner?</h3>
                      <p className="text-white text-sm">Already registered? Login to select your service territories.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <GradientButton 
                        onClick={handleShowRegistrationForm} 
                        variant="variant" 
                        className="text-lg"
                      >
                        Apply Now
                      </GradientButton>
                      <Button 
                        variant="outline" 
                        className="border-blue-400 text-white hover:bg-blue-800/40"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent rounded-xl blur-2xl opacity-50"></div>
                  <div className="relative backdrop-blur-sm bg-primary-900/60 p-6 rounded-xl border border-blue-400/50">
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">Why Marine Specialists Choose Praetorian</h3>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">30+</div>
                        <p className="text-blue-200">Years of proven coating performance</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">$50M+</div>
                        <p className="text-blue-200">Annual partner project revenue</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">98%</div>
                        <p className="text-blue-200">Partner retention rate</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">250+</div>
                        <p className="text-blue-200">Active certified contractors</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-blue-500/30 pt-6">
                      <p className="text-white text-center mb-4">"Joining the Praetorian network transformed my marine service business. Their leads and premium product line increased our revenue by 40% in the first year alone."</p>
                      <p className="text-right italic text-blue-300">- Michael D., Marina Professional, Florida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 relative z-10 backdrop-blur-sm bg-blue-900/60">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-2" variant="blue">
                What Marine Professionals Say
              </GradientHeading>
              <p className="text-white max-w-3xl mx-auto">
                Hear from certified marine professionals currently using PraetorianMarine™ ABS-certified ceramic coating technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="backdrop-blur-sm bg-primary-900/40 rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Ship className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300">James Harrington</h3>
                    <p className="text-sm text-white/80">Marina Manager, San Diego CA</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">
                  "Since becoming certified, we've coated over 65 vessels using the PraetorianMarine™ system. The ABS certification gives us instant credibility with commercial clients, and the heat reduction benefits sell themselves. We've documented a 52°F surface temperature reduction on white surfaces in direct sunlight."
                </p>
                <div className="flex items-center text-blue-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/40 rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Ship className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300">Maria Rodriguez</h3>
                    <p className="text-sm text-white/80">Yacht Service Provider, Miami FL</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">
                  "The exclusive territory rights have completely eliminated competition in our region. Once we show clients the 10,000+ hour salt spray test results and the Class A fire rating certification, we get the contract 93% of the time. Our technicians love the single-coat application process - no primers or complex preparation."
                </p>
                <div className="flex items-center text-blue-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/40 rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Ship className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300">Thomas Chen</h3>
                    <p className="text-sm text-white/80">Commercial Coating Contractor, Seattle WA</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">
                  "The technical support from Praetorian has been outstanding. We've expanded from pleasure craft to commercial vessel and dock projects, significantly increasing our project size and profit margins. The 30-year performance guarantee gives us a major competitive advantage in the commercial marine sector."
                </p>
                <div className="flex items-center text-blue-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Marinas;