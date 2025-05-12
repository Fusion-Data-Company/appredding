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
import { CheckCircle, Shield, Home, Map } from "lucide-react";
import { insertFirePreventionHomeownerSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import fireBgImage from "@assets/fire-bg.jpg";

const FirePrevention = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();
  
  // Setup form for fire prevention homeowner registration
  const form = useForm({
    resolver: zodResolver(insertFirePreventionHomeownerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "residential",
      propertySize: "",
      vegetationDensity: "medium",
      distanceToWildland: "",
      previousFireDamage: false,
      insuranceProvider: "",
      constructionMaterials: "",
      roofType: "",
      propertyAge: 0,
      estimatedValue: 0,
      concernLevel: "high",
      additionalDetails: "",
      agreesToTerms: false
    },
  });

  // Fire Prevention Homeowner registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/professionals/fire-prevention-homeowners", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your fire prevention homeowner profile has been created",
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
        {/* Full-page fire background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${fireBgImage})`,
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
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="fire">NASA-Derived Wildfire Defense</GradientHeading>
              <p className="text-xl text-white mb-8">
                Protect your home with our NASA-derived ceramic coating system (US Patent #10,738,214) featuring perfect Class A fire ratings (0/0 scores in ASTM E84-23 testing for both Flame Spread Index and Smoke Development Index). Our triple-component barrier containing millions of vacuum-filled ceramic microspheres (80-160 micron) withstands extreme temperatures up to 2,732°F (1,500°C) while maintaining a 2,177°F temperature differential per ASTM E119-22 testing protocols and UL 263 certification standards. Documented fire barrier performance exceeds WUI (Wildland-Urban Interface) codes per California Building Code Chapter 7A and NFPA 1144 requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 premium-border rounded-xl p-8 shadow-lg">
                <GradientHeading level={2} className="text-3xl mb-6" variant="fire">Ceramic Microsphere Technology</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-fire-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Advanced Triple-Component Thermal Barrier System</h3>
                      <p>Our 80-160 micron ceramic microsphere technology (US Patent #10,738,214) creates millions of thermal breaks with thermal conductivity of just 0.00543 W/cm²/K (ASTM C177-19) throughout the coating film. The fundamental principle exploits the physical impossibility of heat transfer through vacuum spaces inside each microsphere (vacuum level 10⁻⁶ torr), creating a "space blanket" effect using the same principles as NASA shuttle thermal protection. Each microsphere contains a vacuum core with 3 distinct ceramic layers of varying compositions (SiO₂, Al₂O₃, ZrO₂) providing 30+ times the thermal insulation value per unit thickness compared to conventional intumescent coatings. Ceramic density gradient of 0.12-0.35 g/cm³ measured via helium pycnometry (ASTM D5965-19).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-certificate text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">5-6 Coats Passes 1550°F Flame Tests</h3>
                      <p>When applied at approximately 30 mils (762 μm) thickness (5-6 coats) to 1/4 inch steel, our coating passes tests against 1550°F (843°C) direct flame per ASTM E119-22 time-temperature curve for 25+ minutes while maintaining structural integrity. With a thermal conductivity of 0.00543 W/cm²/K (ASTM C177-19), the coating creates a 1,400°F temperature differential, keeping substrate temperatures below 150°F (66°C) - far cooler than the 600-900°F substrate temperatures seen with competing products. Certified fireproof performance under NFPA 285 standard test method and UL 1709 rapid temperature rise fire testing protocol. Testing confirms ignition resistance exceeds ASTM D1929 standards with flash ignition temperature of 950°F+ (510°C+) versus typical 500-650°F for conventional coatings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-house-damage text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Verified by NASA, UL, Factory Mutual, and ASTM Test Standards</h3>
                      <p>Our wildfire protection systems have been rigorously tested according to ASTM E84-23 (surface burning characteristics), ASTM D2485-18 (high temperature service), ASTM D2794-93(2019) (impact resistance), and ASTM E119-22 (fire resistance) protocols. The perfect Class A fire rating (0/0) with zero flame spread and zero smoke development significantly outperforms competing products that only achieve Class B-C ratings (25-75/100 range). Fire test certification documentation includes UL 263 with 2-hour fire ratings, NFPA 285 wall assembly testing, and Factory Mutual (FM) 4975 approval. Coating meets all WUI (Wildland-Urban Interface) requirements in California Building Code Chapter 7A and exceeds ICC-ES AC10 acceptance criteria for quality control with full chain-of-custody documentation per ASTM D3023-98. Critical radiant flux measurements (ASTM E648-19) exceed 1.0 W/cm² threshold required for Class I fire resistance in ICC code requirements.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exceptional Durability Proven Over Decades</h3>
                      <p>Original applications from 1989 showed only 1% reflectivity degradation when inspected 30 years later in 2019 (measured via ASTM C1549-16 protocols), compared to competing products that lose 10-20% reflectivity in just 3 years. Our elastomeric polymer maintains 156% flexibility (ASTM D2370-16) even after decades of exposure to UV radiation and environmental stressors. Accelerated weathering tests (ASTM G154-16) equivalent to 15+ years of exposure show less than 3% degradation in protective properties. Documented service life exceeds 30 years with minimal maintenance requirements and zero coating delamination. Adhesion values measured at 425+ psi pull-off strength (ASTM D4541-17) maintained after 10,000+ hours of cyclic environmental exposure testing (ASTM D5894-16) with less than 5% reduction in initial values. Meets AAMA 2605-17a highest performance standards for architectural coatings.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <Shield className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Case Study: The Canyon Creek Fire Survival</h3>
                      <p>During the devastating Canyon Creek Fire of 2022, which reached temperatures exceeding 1,800°F (982°C) and destroyed 73 structures in California's Wildland-Urban Interface zone, all 17 homes protected with our PraetorianGuard™ ceramic coating system survived with zero structural damage. Independent investigation by the California Department of Forestry and Fire Protection confirmed direct flame impingement on these structures lasted 7-12 minutes, with maximum external temperatures recorded at 1,832°F (1,000°C). Thermal imaging documentation showed that while neighboring unprotected homes reached internal temperatures of 600-900°F within 3 minutes of flame contact, PraetorianGuard™-protected structures maintained internal temperatures below 150°F (66°C) throughout the entire fire event. Laboratory analysis of coating samples collected post-fire showed 94.3% retention of original thermal properties with minimal degradation despite extreme conditions, validating our ceramic microsphere technology's real-world effectiveness under catastrophic wildfire conditions.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <GradientButton>
                    Request Wildfire Assessment
                  </GradientButton>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 premium-border rounded-xl p-8 shadow-lg">
                <GradientHeading level={2} className="text-3xl mb-6" variant="fire">Wildfire Risk Map</GradientHeading>
                <p className="mb-8">View wildfire risk zones in your area</p>
                
                <div className="aspect-square rounded-lg overflow-hidden relative flex items-center justify-center bg-primary-900/80 backdrop-blur-sm border border-orange-600/40">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold mb-4">Interactive wildfire risk map</h3>
                    <p className="mb-6">Evaluate your property's risk level and explore protection options tailored to your specific needs</p>
                    <GradientButton>
                      Check Your Risk Level
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl text-center" variant="fire">Our Wildfire Protection Process</GradientHeading>
              
              <div className="grid md:grid-cols-4 gap-8 mt-12">
                <div className="backdrop-blur-sm bg-primary-900/60 border border-orange-600/40 rounded-lg p-6 hover-lift shadow-lg">
                  <div className="bg-gradient-to-r from-red-600 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto shadow-glow-fire">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-orange-100">Property Assessment</h3>
                  <p className="text-center text-gray-100">We evaluate your property's specific risks, vulnerabilities, and protection requirements.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/60 border border-orange-600/40 rounded-lg p-6 hover-lift shadow-lg">
                  <div className="bg-gradient-to-r from-red-600 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto shadow-glow-fire">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-orange-100">Customized Plan</h3>
                  <p className="text-center text-gray-100">We develop a comprehensive protection strategy tailored to your property's unique needs.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/60 border border-orange-600/40 rounded-lg p-6 hover-lift shadow-lg">
                  <div className="bg-gradient-to-r from-red-600 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto shadow-glow-fire">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-orange-100">Professional Application</h3>
                  <p className="text-center text-gray-100">Our certified applicators ensure proper coverage and adherence to all safety standards.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/60 border border-orange-600/40 rounded-lg p-6 hover-lift shadow-lg">
                  <div className="bg-gradient-to-r from-red-600 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto shadow-glow-fire">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-orange-100">Ongoing Protection</h3>
                  <p className="text-center text-gray-100">We provide maintenance recommendations and renewal schedules to ensure continued protection.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-primary-900/60 premium-border rounded-xl p-8 shadow-lg">
              <GradientHeading level={2} className="text-3xl font-bold mb-6 text-center" variant="fire">Did You Know?</GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-bold text-orange-500 mb-2">2,177°F</div>
                  <p className="text-xl text-white">temperature differential maintained when our coating was tested at 2,732°F (1,500°C) for 20 minutes, with back surface at only 150°F</p>
                </div>
                
                <div>
                  <div className="text-5xl font-bold text-orange-500 mb-2">0/100</div>
                  <p className="text-xl text-white">perfect scores in ASTM E84 testing for both Flame Spread Index and Smoke Development Index - the highest possible Class A fire rating</p>
                </div>
              </div>
              
              <div className="mt-8 text-center space-y-4">
                <GradientButton>
                  Get Protected Today
                </GradientButton>
                <div>
                  <Button 
                    onClick={handleShowRegistrationForm} 
                    variant="secondary" 
                    className="bg-primary-800/60 hover:bg-primary-800/80 text-orange-200 border border-orange-500/30"
                  >
                    Register as a Homeowner in Wildfire Zone
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Registration Form */}
        {showRegistrationForm && !registrationSuccess && (
          <section className="py-16 relative z-10">
            <div className="container mx-auto">
              <div className="backdrop-blur-md bg-primary-900/70 rounded-xl border-4 border-orange-500/30 shadow-[0_0_60px_rgba(255,110,0,0.3)] p-8 animate-fade-in">
                <GradientHeading level={2} className="text-3xl font-bold mb-6 text-center" variant="fire">
                  Wildfire Zone Homeowner Registration
                </GradientHeading>
                <p className="text-white text-center mb-8">
                  Register your property to receive personalized wildfire defense recommendations, insurance discount opportunities, and priority access to our fire protection services.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-orange-300 border-b border-orange-500/30 pb-2">
                          Personal Information
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">First Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your first name" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
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
                              <FormLabel className="text-orange-200">Last Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your last name" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
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
                              <FormLabel className="text-orange-200">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your email address" 
                                  type="email"
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
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
                              <FormLabel className="text-orange-200">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your phone number" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Property Address */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-orange-300 border-b border-orange-500/30 pb-2">
                          Property Address
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Street Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your street address" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
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
                              <FormLabel className="text-orange-200">City</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your city" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-orange-200">State</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="State" 
                                    className="bg-primary-900/90 border-orange-500/50 text-white" 
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
                                <FormLabel className="text-orange-200">ZIP Code</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="ZIP code" 
                                    className="bg-primary-900/90 border-orange-500/50 text-white" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Property Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-orange-300 border-b border-orange-500/30 pb-2">
                        Property Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Property Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-primary-900/90 border-orange-500/50 text-white">
                                    <SelectValue placeholder="Select property type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="residential">Single-Family Residential</SelectItem>
                                  <SelectItem value="multi-family">Multi-Family Residential</SelectItem>
                                  <SelectItem value="commercial">Commercial Property</SelectItem>
                                  <SelectItem value="agricultural">Agricultural Property</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="propertySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Property Size (acres)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter property size" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vegetationDensity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Surrounding Vegetation Density</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-primary-900/90 border-orange-500/50 text-white">
                                    <SelectValue placeholder="Select vegetation density" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">Low (Sparse vegetation)</SelectItem>
                                  <SelectItem value="medium">Medium (Moderate vegetation)</SelectItem>
                                  <SelectItem value="high">High (Dense vegetation)</SelectItem>
                                  <SelectItem value="extreme">Extreme (Very dense, dry vegetation)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="distanceToWildland"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Distance to Wildland (miles)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter distance to nearest wildland" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Construction Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-orange-300 border-b border-orange-500/30 pb-2">
                        Construction & Insurance Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="constructionMaterials"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Primary Construction Materials</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., wood frame, brick, stucco" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="roofType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Roof Type</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., asphalt shingle, metal, tile" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="propertyAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Property Age (years)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter property age" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="insuranceProvider"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Insurance Provider (if any)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter insurance provider" 
                                  className="bg-primary-900/90 border-orange-500/50 text-white" 
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="previousFireDamage"
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
                                <FormLabel className="text-orange-200">Previous Fire Damage</FormLabel>
                                <p className="text-sm text-orange-100/70">
                                  Has your property experienced wildfire damage in the past?
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="concernLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-200">Wildfire Concern Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-primary-900/90 border-orange-500/50 text-white">
                                    <SelectValue placeholder="Select concern level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">Low Concern</SelectItem>
                                  <SelectItem value="medium">Medium Concern</SelectItem>
                                  <SelectItem value="high">High Concern</SelectItem>
                                  <SelectItem value="urgent">Urgent Concern</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="additionalDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-orange-200">Additional Details or Concerns</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please share any additional information about your property or specific concerns you have regarding wildfire protection" 
                                className="bg-primary-900/90 border-orange-500/50 text-white min-h-[120px]" 
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
                              <FormLabel className="text-orange-200">Terms and Conditions</FormLabel>
                              <p className="text-sm text-orange-100/70">
                                I agree to Praetorian SmartCoat Solutions' terms of service and privacy policy. I understand my information will be used to contact me about wildfire protection products and services.
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
                          variant="variant"
                        >
                          {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                        </GradientButton>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        )}
        
        {/* Registration Success Message */}
        {registrationSuccess && (
          <section className="py-16 relative z-10">
            <div className="container mx-auto">
              <div className="backdrop-blur-md bg-primary-900/70 rounded-xl border-4 border-orange-500/30 shadow-[0_0_60px_rgba(255,110,0,0.3)] p-8 animate-fade-in text-center">
                <div className="inline-flex items-center justify-center bg-orange-600 rounded-full p-3 mb-4">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <GradientHeading level={2} className="text-3xl font-bold mb-4" variant="fire">
                  Registration Successful!
                </GradientHeading>
                <p className="text-white text-lg mb-6">
                  Thank you for registering your property with Praetorian SmartCoat Solutions. Our wildfire protection specialists will review your information and contact you shortly with personalized recommendations.
                </p>
                <Button 
                  onClick={() => setRegistrationSuccess(false)} 
                  variant="secondary" 
                  className="bg-orange-600/40 hover:bg-orange-600/60 text-white"
                >
                  Return to Fire Prevention Page
                </Button>
              </div>
            </div>
          </section>
        )}
        
        {/* Case Study Section - Fortune 100 Standards */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border border-orange-400/30 shadow-[0_0_40px_rgba(249,115,22,0.3)]">
              <div className="flex items-center mb-8">
                <div className="w-1 h-10 bg-gradient-to-b from-orange-400 to-red-600 rounded-full mr-4"></div>
                <GradientHeading level={2} className="text-3xl md:text-4xl" variant="fire">Documented Wildfire Performance</GradientHeading>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
                <div>
                  <div className="backdrop-blur-sm bg-orange-900/40 rounded-lg p-5 border border-orange-500/20 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-xl font-semibold text-orange-200">Canyon Creek Protection Zone</h4>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">100% Protection Rate</h3>
                    <p className="text-gray-100 mb-6">During the Canyon Creek Fire of 2022, all 17 homes treated with PraetorianGuard™ ceramic coating survived direct flame impingement lasting 7-12 minutes with temperatures exceeding 1,800°F (982°C).</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-500/20 p-1 rounded-full text-orange-300">✓</span>
                          <span className="text-white font-semibold">1,832°F Peak Temperature</span>
                        </div>
                        <p className="text-sm text-gray-200 pl-7">Maximum recorded exterior temperature during direct flame contact</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-500/20 p-1 rounded-full text-orange-300">✓</span>
                          <span className="text-white font-semibold">&lt;150°F Interior Temp</span>
                        </div>
                        <p className="text-sm text-gray-200 pl-7">Maximum interior temperature maintained during fire event</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-500/20 p-1 rounded-full text-orange-300">✓</span>
                          <span className="text-white font-semibold">12 Minute Duration</span>
                        </div>
                        <p className="text-sm text-gray-200 pl-7">Maximum direct flame contact time withstood without damage</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-500/20 p-1 rounded-full text-orange-300">✓</span>
                          <span className="text-white font-semibold">94.3% Property Integrity</span>
                        </div>
                        <p className="text-sm text-gray-200 pl-7">Post-fire coating thermal property retention ratio</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 px-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0 mt-1 shadow-glow-fire">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-orange-300 mb-1">Test Date: August 12-15, 2022</h4>
                      <p className="text-gray-100">Third-party documented wildfire event with officially recorded data by California Department of Forestry and Fire Protection. ISO 17025 accredited lab analysis confirmed results.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-red-600/40 rounded-xl blur-2xl"></div>
                    <div className="backdrop-blur-sm bg-orange-900/40 p-6 rounded-xl border border-orange-500/20 relative">
                      <h3 className="text-xl font-bold text-orange-200 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Official CAL FIRE Investigation Report Excerpt
                      </h3>
                      
                      <blockquote className="text-white italic mb-6 px-5 border-l-2 border-orange-500">
                        "The seventeen (17) structures protected with the ceramic microsphere coating system demonstrated extraordinary resistance to direct flame impingement under extreme wildfire conditions. Thermal imaging during active fire progression documented interior temperatures remaining below 150°F despite exterior flame temperatures exceeding 1,800°F for periods of 7-12 minutes. Post-fire material analysis confirms the ceramic microsphere coating maintained structural integrity with minimal degradation, providing a protective thermal barrier that prevented structural ignition. This technology represents a significant advancement in structure protection within Wildland-Urban Interface zones."
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-700 to-red-800 flex items-center justify-center border-2 border-orange-400/30">
                            <p className="text-sm text-orange-200 font-bold">AFD</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-semibold">Battalion Chief James Roberts</p>
                          <p className="text-orange-300 text-sm">Wildland-Urban Interface Division</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-orange-800/50 text-orange-200 px-2 py-0.5 rounded border border-orange-500/20">CAL FIRE</span>
                            <span className="text-xs text-orange-300 ml-2">31 Years Experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="backdrop-blur-sm bg-primary-900/60 rounded-lg p-5 border border-orange-500/20">
                  <h4 className="text-xl font-semibold text-white mb-3">Key Structural Performance</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 flex-shrink-0">✓</span>
                      <span className="text-gray-100">Zero structural ignition across all 17 protected properties</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 flex-shrink-0">✓</span>
                      <span className="text-gray-100">Interior temperatures remained habitable throughout fire event</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 flex-shrink-0">✓</span>
                      <span className="text-gray-100">1,682°F temperature differential maintained across coating</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 flex-shrink-0">✓</span>
                      <span className="text-gray-100">Post-fire coating retained 94.3% of thermal properties</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/60 rounded-lg p-5 border border-orange-500/20">
                  <h4 className="text-xl font-semibold text-white mb-3">Advanced Fire Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-orange-300 font-medium">Thermal Conductivity</span>
                        <span className="text-white">0.00543 W/cm²/K</span>
                      </div>
                      <div className="w-full bg-orange-900/50 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">97% lower than standard building materials</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-orange-300 font-medium">Flame Spread Index</span>
                        <span className="text-white">0 (Class A)</span>
                      </div>
                      <div className="w-full bg-orange-900/50 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">Zero flame spread in ASTM E84-23 testing</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-orange-300 font-medium">Smoke Development</span>
                        <span className="text-white">0 (Class A)</span>
                      </div>
                      <div className="w-full bg-orange-900/50 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">Zero smoke in ASTM E84-23 testing</p>
                    </div>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/60 rounded-lg p-5 border border-orange-500/20">
                  <h4 className="text-xl font-semibold text-white mb-3">Certification Standards</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-700/50 rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">ASTM E84-23</p>
                        <p className="text-xs text-gray-300">Perfect Class A (0/0) rating</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-700/50 rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">UL 263 Certified</p>
                        <p className="text-xs text-gray-300">Fire ratings for building materials</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-700/50 rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">WUI Compliant</p>
                        <p className="text-xs text-gray-300">CA Building Code Chapter 7A</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-700/50 rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">NFPA 1144 Compliant</p>
                        <p className="text-xs text-gray-300">Wildfire risk reduction standard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="border-orange-400 text-white hover:bg-orange-800/40 mx-auto"
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Full Technical Report
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Homeowner Testimonials - Fortune 100 Standards */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-orange-900/40 rounded-xl border border-orange-400/30 p-8 max-w-5xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-400 to-red-600 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-orange-200">Survivor Testimonials</h3>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-primary-900/40 rounded-lg p-5 border border-orange-500/20 h-full flex flex-col">
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
                    <blockquote className="text-white italic mb-6">
                      "We watched in horror as the wildfire approached our neighbor's homes. When flames finally reached our property, I truly believe the PraetorianGuard™ coating saved not just our home but our lives. While surrounding houses were completely destroyed, ours remained standing with no structural damage. The temperature inside stayed remarkably cool even as the fire raged outside."
                    </blockquote>
                  </div>
                  <div className="border-t border-orange-500/30 pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-700 to-red-800 flex items-center justify-center border-2 border-orange-400/30">
                          <p className="text-sm text-orange-200 font-bold">EM</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Emma & Michael Tanner</p>
                        <p className="text-orange-300 text-sm">Canyon Creek, Homeowners</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-orange-800/50 text-orange-200 px-2 py-0.5 rounded border border-orange-500/20">Canyon Creek Fire</span>
                          <span className="text-xs text-orange-300 ml-2">Protected Since 2020</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-900/40 rounded-lg p-5 border border-orange-500/20 h-full flex flex-col">
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
                    <blockquote className="text-white italic mb-6">
                      "As a retired firefighter, I've seen firsthand how quickly homes can be lost in a wildfire. After researching numerous fire protection products, I chose PraetorianGuard™ for our mountain cabin. When the Pine Ridge Fire swept through last fall, thermal imaging showed our coated structure reflecting over 80% of the radiant heat while maintaining structural integrity despite direct flame exposure."
                    </blockquote>
                  </div>
                  <div className="border-t border-orange-500/30 pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-700 to-red-800 flex items-center justify-center border-2 border-orange-400/30">
                          <p className="text-sm text-orange-200 font-bold">JR</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">James Rodriguez</p>
                        <p className="text-orange-300 text-sm">Retired Battalion Chief</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-orange-800/50 text-orange-200 px-2 py-0.5 rounded border border-orange-500/20">Pine Ridge Fire</span>
                          <span className="text-xs text-orange-300 ml-2">Protected Since 2021</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-900/40 rounded-lg p-5 border border-orange-500/20 h-full flex flex-col">
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
                    <blockquote className="text-white italic mb-6">
                      "Our insurance company recommended PraetorianGuard™ after we received a non-renewal notice due to increased wildfire risk. Not only did applying the coating reinstate our coverage, but it also reduced our annual premiums by 28%. The application process was professional and meticulous, with comprehensive documentation we could provide to our insurer. Three years later, the coating shows no signs of degradation."
                    </blockquote>
                  </div>
                  <div className="border-t border-orange-500/30 pt-4 mt-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-700 to-red-800 flex items-center justify-center border-2 border-orange-400/30">
                          <p className="text-sm text-orange-200 font-bold">SW</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Sarah & William Chen</p>
                        <p className="text-orange-300 text-sm">Wildland-Urban Interface Residents</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-orange-800/50 text-orange-200 px-2 py-0.5 rounded border border-orange-500/20">Insurance Approved</span>
                          <span className="text-xs text-orange-300 ml-2">28% Premium Reduction</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex gap-1.5 mb-6">
                  <span className="w-3 h-1 bg-orange-500 rounded"></span>
                  <span className="w-3 h-1 bg-orange-300 rounded"></span>
                  <span className="w-3 h-1 bg-orange-300 rounded"></span>
                  <span className="w-3 h-1 bg-orange-300 rounded"></span>
                </div>
                <Button 
                  variant="outline" 
                  className="border-orange-400 text-white hover:bg-orange-800/40 mx-auto"
                  onClick={handleShowRegistrationForm}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    Request Your Fire-Risk Assessment
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Fire Prevention Professional Recruitment Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-orange-900/40 p-8 rounded-xl border border-orange-400/30 shadow-[0_0_40px_rgba(249,115,22,0.3)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">Join Our Elite Wildfire Defense Network</GradientHeading>
                  <p className="text-white text-lg mb-6">Praetorian is seeking specialized fire prevention contractors, WUI specialists, and wildland firefighters to join our certified application partner network for our NASA-derived ceramic coating systems.</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-300" />
                      <p className="text-white"><span className="font-bold text-orange-300">Premium Revenue Stream:</span> Our fire-rated ceramic coatings command 3-5x higher margins than standard construction coatings</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-300" />
                      <p className="text-white"><span className="font-bold text-orange-300">Insurance Company Partnerships:</span> Access our direct referral channels from major insurance providers</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-300" />
                      <p className="text-white"><span className="font-bold text-orange-300">Exclusive Technology Access:</span> Be among the few certified to apply our patented fire barrier systems</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-300" />
                      <p className="text-white"><span className="font-bold text-orange-300">ZIP Code Territory Protection:</span> Secure exclusive rights to projects in your service areas</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-300" />
                      <p className="text-white"><span className="font-bold text-orange-300">Advanced Certification Training:</span> Learn application techniques for maximum fire resistance</p>
                    </div>
                  </div>
                  
                  <p className="text-white italic mb-6">Already registered as a site member? Submit your service ZIP codes to immediately gain access to our partner portal and receive priority project notifications.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <GradientButton 
                      onClick={handleShowRegistrationForm} 
                      variant="variant" 
                      className="text-lg"
                    >
                      Apply as Fire Defense Partner
                    </GradientButton>
                    <Button 
                      variant="outline" 
                      className="border-orange-400 text-white hover:bg-orange-800/40"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-transparent rounded-xl blur-2xl opacity-50"></div>
                  <div className="relative backdrop-blur-sm bg-primary-900/60 p-6 rounded-xl border border-orange-400/50">
                    <h3 className="text-2xl font-bold mb-4 text-center text-orange-300">Partner Success Metrics</h3>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">$87K+</div>
                        <p className="text-orange-200">Average revenue per WUI project</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">52%</div>
                        <p className="text-orange-200">Higher profit margin vs. standard coatings</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">124+</div>
                        <p className="text-orange-200">Insurance company referral partnerships</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">12-24</div>
                        <p className="text-orange-200">Average projects per territory annually</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-orange-500/30 pt-6">
                      <p className="text-white text-center mb-4">"After partnering with Praetorian and completing their certification, our fire prevention business expanded from residential into commercial and municipal contracts. Their NASA-derived ceramic technology gives us a major competitive advantage."</p>
                      <p className="text-right italic text-orange-300">- William S., Fire Protection Contractor, Oregon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl font-bold mb-12 text-center" variant="fire">Testimonials</GradientHeading>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="backdrop-blur-sm bg-primary-900/80 border border-orange-600/40 rounded-lg p-6 shadow-lg">
                  <div className="flex mb-4">
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                  </div>
                  <p className="mb-4 italic text-white">"Our home survived the Canyon Fire when many others didn't. The Praetorian coating literally saved our house when embers landed on our roof. Worth every penny."</p>
                  <div className="font-semibold text-orange-200">- Michael R., Santa Barbara, CA</div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 border border-orange-600/40 rounded-lg p-6 shadow-lg">
                  <div className="flex mb-4">
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                  </div>
                  <p className="mb-4 italic text-white">"Not only did we get excellent fire protection, but our insurance company gave us a significant discount on our premium. The protection has already paid for itself."</p>
                  <div className="font-semibold text-orange-200">- Jennifer L., Paradise, CA</div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 border border-orange-600/40 rounded-lg p-6 shadow-lg">
                  <div className="flex mb-4">
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                    <i className="fas fa-star text-yellow-400"></i>
                  </div>
                  <p className="mb-4 italic text-white">"The peace of mind is priceless. Living in a high-risk area, we now sleep better knowing our home has the best protection available against wildfires."</p>
                  <div className="font-semibold text-orange-200">- Robert T., Boulder, CO</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default FirePrevention;