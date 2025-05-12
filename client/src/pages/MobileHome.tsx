import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Home, Wrench, Clock, Shield, CheckCircle, BadgeCheck, Building } from "lucide-react";
import { insertMobileHomeProfessionalSchema } from "@shared/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import mobileHomeBgImage from "@assets/mobile-homes-bg.jpg";

// Extend the schema to include form-specific fields
const mobileHomeProfessionalFormSchema = insertMobileHomeProfessionalSchema.extend({
  confirmEmail: z.string().email(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

// Define the form values type
type MobileHomeProfessionalFormValues = z.infer<typeof mobileHomeProfessionalFormSchema>;

const MobileHome = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();

  // Setup form for mobile home professional registration
  const form = useForm<MobileHomeProfessionalFormValues>({
    resolver: zodResolver(mobileHomeProfessionalFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      licenseNumber: "",
      licenseExpiryDate: undefined,
      insuranceInfo: "",
      yearsInBusiness: 0,
      specialties: [],
      serviceAreas: [],
      materialTypes: [],
      installationTypes: [],
      repairServices: [],
      emergencyService: false,
      hourlyRate: undefined,
      mobileHomeTypes: [],
      rvTypes: [],
      certifications: [],
      manufacturerAuthorizations: [],
      notes: "",
      termsAccepted: false
    },
  });

  // Mobile Home Professional registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: MobileHomeProfessionalFormValues) => {
      // Remove form-specific fields
      const { confirmEmail, termsAccepted, ...registerData } = data;
      const response = await apiRequest("POST", "/api/professionals/mobile-home-professionals", registerData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your mobile home professional profile has been created",
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

  const onSubmit = (data: MobileHomeProfessionalFormValues) => {
    registerMutation.mutate(data);
  };
  
  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Full-page mobile home background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${mobileHomeBgImage})`,
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
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="mixed">NASA Ceramic Technology for Mobile Homes</GradientHeading>
              <p className="text-xl text-white mb-8">
                Protect your mobile home with our revolutionary NASA-derived ceramic microsphere coating technology. Our Class A fire-rated system (perfect 0/100 ASTM E84 scores) provides unmatched thermal protection, extending your home's lifespan by 15+ years with documented 87% energy cost reduction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <GradientHeading level={2} className="text-3xl mb-6" variant="mixed">NASA Ceramic Microsphere Benefits</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
                        <path d="M19 11h2m-1 -1v2"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">NASA Ceramic UV Shield</h3>
                      <p className="text-gray-100">NASA-derived ceramic microspheres provide 89% UV reflection (verified by Cool Roof Rating Council) and resist extreme temperature fluctuations (-40°F to 300°F) with only 1% reflectivity loss after 3 years.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">NASA-Verified Energy Efficiency</h3>
                      <p className="text-gray-100">Ceramic microsphere technology delivers documented 87% energy reduction (Sony Koda case study) with thermal barrier properties that reduce cooling costs 30-40% more than standard reflective coatings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 1 1 8 0"></path>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                        <path d="M9.7 8.7a8 8 0 1 1 4.6 0"></path>
                        <path d="M12 3v5"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Ceramic Microsphere Waterproofing</h3>
                      <p className="text-gray-100">NASA-derived ceramic microspheres create a 156% elastomeric waterproof membrane that remains 100% waterproof even after 10,000+ salt spray hours with self-healing properties for long-term protection.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="12" r="5"></circle>
                        <circle cx="12" cy="12" r="9"></circle>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Fire Protection & Extended Lifespan</h3>
                      <p className="text-gray-100">Class A fire-rated protection (perfect 0/100 scores in ASTM E84 testing) with NASA ceramic technology that extends lifespan 30+ years with verified test data showing no degradation after decades of exposure.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <GradientButton variant="variant">
                    Schedule Free Assessment
                  </GradientButton>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <GradientHeading level={2} className="text-3xl mb-6" variant="mixed">NASA Ceramic Application Process</GradientHeading>
                <p className="mb-8 text-gray-100">Our certified application process for NASA-derived ceramic microsphere technology ensures perfect adhesion and maximum performance</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Thorough Inspection & Assessment</h3>
                      <p className="text-gray-200">We evaluate your mobile home's current condition, identify problem areas, and create a customized protection plan.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Professional Surface Preparation</h3>
                      <p className="text-gray-200">Surfaces are thoroughly cleaned, repaired, and primed to ensure maximum adhesion and longevity of the protective coating.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Precision Application & Coverage</h3>
                      <p className="text-gray-200">Our certified technicians apply the specialized coating using advanced equipment for consistent, uniform coverage.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Quality Inspection & Warranty</h3>
                      <p className="text-gray-200">Final inspection ensures every surface is properly protected, and we provide a comprehensive warranty on materials and workmanship.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl text-center mb-12" variant="mixed">NASA Ceramic Technology Applications</GradientHeading>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-blue-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">Roof Protection</h3>
                  <p className="text-center text-gray-100">Seamless, waterproof membrane that reflects heat, prevents leaks, and extends your roof's lifespan by 15+ years. Available in multiple colors.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-blue-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="10" y1="16" x2="14" y2="16"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">Exterior Wall Coating</h3>
                  <p className="text-center text-gray-100">Durable, elastomeric coatings that flex with temperature changes while providing exceptional weather resistance and improved appearance.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-blue-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1.5 0 3 .5 3 2s-1.5 2 -3 2h-1"></path>
                      <path d="M9 16h2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">Skirting & Foundation</h3>
                  <p className="text-center text-gray-100">Protective barriers that prevent moisture damage, pest intrusion, and heat loss while enhancing the structural integrity of your home.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl text-center mb-8" variant="mixed">Join Our Mobile Home Professional Network</GradientHeading>
              <p className="text-lg text-center text-white mb-6">
                Become part of our network of mobile home protection specialists and gain access to exclusive products, training, and customer referrals.
              </p>
              
              {!showRegistrationForm && !registrationSuccess && (
                <div className="flex justify-center">
                  <GradientButton variant="variant" onClick={handleShowRegistrationForm} className="text-lg px-8 py-3">
                    Apply to Join Our Network
                  </GradientButton>
                </div>
              )}
              
              {showRegistrationForm && !registrationSuccess && (
                <div className="mt-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Company Information</GradientHeading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter company name" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                <FormLabel className="text-white">Contact Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter contact name" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email address" {...field} className="bg-primary-700/50 border-white/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="confirmEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Confirm Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Confirm email address" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                <FormLabel className="text-white">Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                <FormLabel className="text-white">Website (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter website URL" {...field} className="bg-primary-700/50 border-white/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    
                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Address Information</GradientHeading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel className="text-white">Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter street address" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                  <Input placeholder="Enter city" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                <FormLabel className="text-white">State</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter state" {...field} className="bg-primary-700/50 border-white/30 text-white" />
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
                                <FormLabel className="text-white">ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter ZIP code" {...field} className="bg-primary-700/50 border-white/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Business Credentials</GradientHeading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="licenseNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">License Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter license number" {...field} className="bg-primary-700/50 border-white/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="licenseExpiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">License Expiry Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={`w-full pl-3 text-left font-normal bg-primary-700/50 border-white/30 text-white ${!field.value ? "text-muted-foreground" : ""}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select expiry date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="yearsInBusiness"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Years in Business</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="Enter years in business" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                                    className="bg-primary-700/50 border-white/30 text-white" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="insuranceInfo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Insurance Information</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter insurance details" {...field} className="bg-primary-700/50 border-white/30 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Specializations</GradientHeading>
                        <div className="grid grid-cols-1 gap-6">
                          <FormField
                            control={form.control}
                            name="specialties"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Specialties</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List your specialties (e.g., roof coatings, exterior painting, etc.)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
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
                                <FormLabel className="text-white">Service Areas</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List your service areas (e.g., cities, counties, regions)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="materialTypes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Material Types</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List material types you work with (e.g., elastomeric coatings, silicone, etc.)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Services & Experience</GradientHeading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="installationTypes"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel className="text-white">Installation Types</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List installation types you offer (e.g., roof coatings, siding, windows, etc.)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="repairServices"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel className="text-white">Repair Services</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List repair services you offer (e.g., leak repair, damage restoration, etc.)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="emergencyService"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-primary-700/30">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-gradient-to-r from-orange-600 to-blue-500 data-[state=checked]:border-none"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-white">
                                    Emergency Service Available
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="hourlyRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Hourly Rate (USD)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="Enter hourly rate" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                    className="bg-primary-700/50 border-white/30 text-white" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Mobile Home & RV Specific</GradientHeading>
                        <div className="grid grid-cols-1 gap-6">
                          <FormField
                            control={form.control}
                            name="mobileHomeTypes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Mobile Home Types</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List mobile home types you service (e.g., single-wide, double-wide, modular, manufactured, etc.)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="rvTypes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">RV Types</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List RV types you service (e.g., Class A, Class C, Fifth Wheel, etc.)" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="certifications"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Certifications</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List relevant certifications for mobile home/RV work" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="manufacturerAuthorizations"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Manufacturer Authorizations</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List any mobile home or RV manufacturers you're authorized to service" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[100px]" 
                                    value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                    onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-primary-800/60 p-6 rounded-lg border-2 border-white mb-8">
                        <GradientHeading level={3} className="text-xl mb-6" variant="mixed">Additional Information</GradientHeading>
                        <div className="grid grid-cols-1 gap-6">
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Additional Notes</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any additional information you'd like to share about your services" 
                                    className="bg-primary-700/50 border-white/30 text-white min-h-[150px]" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-primary-700/30">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-gradient-to-r from-orange-600 to-blue-500 data-[state=checked]:border-none"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-white">
                                    I agree to the terms and conditions for Praetorian professional network membership
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-orange-600 to-blue-500 hover:from-orange-700 hover:to-blue-600 text-white font-semibold py-2 px-8 rounded-lg shadow-lg text-lg"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <span className="mr-2">Submitting</span>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {registrationSuccess && (
                <div className="text-center bg-primary-800/60 p-8 rounded-lg border-2 border-white">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <GradientHeading level={3} className="text-xl mb-4" variant="mixed">Registration Successful!</GradientHeading>
                  <p className="text-white mb-6">
                    Thank you for applying to join the Praetorian Mobile Home Professional Network. Our team will review your application and contact you shortly.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-orange-600 to-blue-500 hover:from-orange-700 hover:to-blue-600 text-white" 
                    onClick={() => setRegistrationSuccess(false)}
                  >
                    Return to Mobile Home Solutions
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={2} className="text-3xl font-bold mb-8 text-center" variant="mixed">Why Choose Praetorian?</GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Specialized in Mobile Homes</h3>
                  <p className="text-gray-100">Our technicians are specifically trained in the unique requirements of mobile home protection, unlike general contractors who may lack this specialized expertise.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Extended Warranty</h3>
                  <p className="text-gray-100">We stand behind our work with an industry-leading 15-year warranty on materials and workmanship, transferable to new owners if you sell your home.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Eco-Friendly Solutions</h3>
                  <p className="text-gray-100">Our coatings are low-VOC and environmentally responsible, providing protection without harsh chemicals or harmful emissions.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Financing Available</h3>
                  <p className="text-gray-100">Affordable monthly payment options make protecting your investment accessible, with no money down and interest-free periods available.</p>
                </div>
              </div>
              
              <div className="text-center">
                <GradientButton variant="variant">
                  Get Your Free Quote Today
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={2} className="text-3xl md:text-4xl font-bold mb-12 text-center" variant="mixed">Customer Testimonials</GradientHeading>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </div>
                  <p className="mb-4 italic text-white">"After applying Praetorian's roof coating, our energy bills dropped by almost 25%! The technicians were professional and finished the job in just two days. My mobile home looks better than it has in years."</p>
                  <div className="font-semibold text-orange-200">- David M., Phoenix, AZ</div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </div>
                  <p className="mb-4 italic text-white">"We had persistent leaks for years that other companies couldn't fix. Praetorian's specialized coating sealed everything perfectly. It's been through two monsoon seasons without a single leak. Worth every penny!"</p>
                  <div className="font-semibold text-orange-200">- Linda W., Tucson, AZ</div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </div>
                  <p className="mb-4 italic text-white">"The financing options made it possible for us to protect our home on a fixed income. The difference in interior temperature during summer is amazing, and the exterior looks like new. Their customer service was outstanding."</p>
                  <div className="font-semibold text-orange-200">- Robert & Susan K., Mesa, AZ</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default MobileHome;