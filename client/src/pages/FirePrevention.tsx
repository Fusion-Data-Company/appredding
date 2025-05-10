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
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="fire">Wildfire Defense Solutions</GradientHeading>
              <p className="text-xl text-white mb-8">
                Protect your home and property from devastating wildfires with our Class-A fire retardant coatings. Proven effective in the most severe wildfire conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 premium-border rounded-xl p-8 shadow-lg">
                <GradientHeading level={2} className="text-3xl mb-6" variant="fire">Advanced Protection Technology</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-fire-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Intumescent technology creates an insulating barrier when exposed to high heat</h3>
                      <p>Our proprietary formulations create an expanding carbonaceous foam layer that protects underlying surfaces during fire exposure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-certificate text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exceeds California's stringent fire code requirements</h3>
                      <p>Rigorously tested and certified to meet or exceed the most demanding fire protection standards in California and other high-risk regions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-house-damage text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Available for all exterior surfaces including wood, metal, and concrete</h3>
                      <p>Versatile protection systems designed for virtually any building material, providing comprehensive wildfire defense for your entire property.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Insurance-approved for high-risk wildfire zones</h3>
                      <p>Many insurance providers offer premium discounts for homes protected with our certified wildfire defense coatings.</p>
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
                  <div className="text-5xl font-bold text-orange-500 mb-2">90%</div>
                  <p className="text-xl text-white">of homes destroyed in wildfires ignite due to embers landing on flammable surfaces, not direct flames</p>
                </div>
                
                <div>
                  <div className="text-5xl font-bold text-orange-500 mb-2">30%</div>
                  <p className="text-xl text-white">reduction in fire insurance premiums may be available for homes with certified fire-resistant coatings</p>
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
                          variant="fire"
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