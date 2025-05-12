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
                Our American Bureau of Shipping (ABS) certified ceramic coating systems provide unmatched protection in harsh saltwater environments, combining Class A fire rating with superior thermal insulation and corrosion resistance for marine vessels and structures.
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
                      <p className="text-white">Our ceramic microsphere technology is specifically certified for marine applications by the American Bureau of Shipping, providing validation for use in the most demanding saltwater environments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Class A Fire Rating for Maritime Safety</h3>
                      <p className="text-white">Perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development provides critical fire protection for vessels and marine structures, exceeding maritime safety standards.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <Sun className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">89% Solar Reflection & 89% Thermal Emittance</h3>
                      <p className="text-white">Verified by the Cool Roof Rating Council, our coatings provide superior protection against solar radiation with only 1% degradation after 3 years in marine environments, compared to 10-20% for competitors.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 rounded-full p-2 mt-1">
                      <Waves className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">156% Elastomeric Flexibility</h3>
                      <p className="text-white">Our water-based acrylic elastomeric resin provides exceptional adhesion while maintaining flexibility during thermal expansion/contraction cycles, exceeding the standard 100% requirement for maritime applications.</p>
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
                    <p className="mb-4 text-white">ABS-certified ceramic coating system with NASA-derived technology for {vesselType || "your vessel"} in {waterType || "marine"} conditions.</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>89% solar reflection & 89% thermal emittance</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>Perfect 0/100 fire rating for {material || "various"} surfaces</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>156% elastomeric flexibility for durability in marine conditions</span>
                      </li>
                    </ul>
                    <GradientButton variant="variant" className="w-full">View Details</GradientButton>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-300">PraetorianMarine™ Commercial Ceramic</h3>
                    <p className="mb-4 text-white">NASA-derived high-performance coating with 30+ year durability for commercial marine applications.</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>Withstands 2,732°F (1,500°C) with 2,177°F temperature differential</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>Only 1% reflectivity loss after 3 years (vs 10-20% for competitors)</span>
                      </li>
                      <li className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        <span>Proven 30+ year service life with minimal maintenance</span>
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
      </div>
    </MainLayout>
  );
};

export default Marinas;