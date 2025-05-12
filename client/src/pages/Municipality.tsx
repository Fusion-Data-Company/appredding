import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Building, Droplets, ShieldCheck, Leaf, Clock, ParkingCircle, BadgeAlert, Landmark, PenTool, Blocks, Activity, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMunicipalityProfessionalSchema } from "@shared/schema";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Extended schema with additional validation for municipality professional registration
const municipalityProfessionalFormSchema = insertMunicipalityProfessionalSchema.extend({
  confirmEmail: z.string().email("Invalid email format"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  })
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

type MunicipalityProfessionalFormValues = z.infer<typeof municipalityProfessionalFormSchema>;

// Municipality Professional Registration Form Component
const MunicipalityProfessionalForm = () => {
  const { toast } = useToast();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const form = useForm<MunicipalityProfessionalFormValues>({
    resolver: zodResolver(municipalityProfessionalFormSchema),
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
      professionalType: "",
      specialties: "",
      jurisdictions: "",
      clientTypes: "",
      credentials: "",
      experienceYears: undefined,
      registrationNumber: "",
      projectExperience: "",
      notes: "",
      termsAccepted: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: MunicipalityProfessionalFormValues) => {
      // Remove fields that aren't in the database schema
      const { confirmEmail, termsAccepted, ...registerData } = data;
      const res = await apiRequest("POST", "/api/professionals/municipality-professionals", registerData);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
      
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Thank you for registering with our Municipality Professional network!",
        variant: "default",
      });
      setShowSuccessMessage(true);
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

  function onSubmit(data: MunicipalityProfessionalFormValues) {
    registerMutation.mutate(data);
  }
  
  // Professional type options
  const professionalTypes = [
    { value: "consultant", label: "Consultant" },
    { value: "engineer", label: "Engineer" },
    { value: "lobbyist", label: "Lobbyist" },
    { value: "contractor", label: "Contractor" },
    { value: "public_official", label: "Public Official" },
    { value: "regulatory_expert", label: "Regulatory Expert" },
    { value: "other", label: "Other" },
  ];
  
  return (
    <div className="w-full">
      {showSuccessMessage ? (
        <div className="p-6 bg-primary-800/80 rounded-xl border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          <GradientHeading level={3} className="text-2xl mb-4" variant="mixed">
            Registration Complete!
          </GradientHeading>
          <p className="mb-6">
            Thank you for registering as a municipality professional with Praetorian SmartCoat Solutions. 
            Our team will review your application and be in touch with you shortly.
          </p>
          <GradientButton variant="variant" onClick={() => setShowSuccessMessage(false)}>
            Register Another Professional
          </GradientButton>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <GradientHeading level={3} className="text-2xl mb-4" variant="mixed">
              Municipality Professional Registration
            </GradientHeading>
            
            <p className="mb-6">
              Register to join our network of trusted municipality professionals. Complete the form below to apply.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} className="bg-primary-800 border-primary-600" />
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
                      <FormLabel>Contact Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} className="bg-primary-800 border-primary-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="professionalType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Type*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-primary-800 border-primary-600">
                            <SelectValue placeholder="Select professional type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {professionalTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} className="bg-primary-800 border-primary-600" />
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
                      <FormLabel>Confirm Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm email" {...field} className="bg-primary-800 border-primary-600" />
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
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 555-5555" {...field} className="bg-primary-800 border-primary-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Address & Qualifications */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address" {...field} className="bg-primary-800 border-primary-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} className="bg-primary-800 border-primary-600" />
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
                        <FormLabel>State*</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} className="bg-primary-800 border-primary-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code*</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip code" {...field} className="bg-primary-800 border-primary-600" />
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
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com" {...field} className="bg-primary-800 border-primary-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration/License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Registration number" {...field} className="bg-primary-800 border-primary-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Professional Experience */}
            <div className="space-y-4">
              <GradientHeading level={4} className="text-xl mb-2" variant="mixed">
                Professional Experience & Expertise
              </GradientHeading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="specialties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialties*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Water treatment, public works, regulatory compliance, etc."
                          {...field}
                          className="bg-primary-800 border-primary-600 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jurisdictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jurisdictions/Areas*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cities, counties, or regions you service"
                          {...field}
                          className="bg-primary-800 border-primary-600 min-h-[100px]"
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
                  name="credentials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credentials/Certifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Relevant certifications, credentials, or qualifications"
                          {...field}
                          className="bg-primary-800 border-primary-600 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Types*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="City governments, county utilities, state agencies, etc."
                          {...field}
                          className="bg-primary-800 border-primary-600 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Years" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="bg-primary-800 border-primary-600 max-w-[200px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="projectExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Experience*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your relevant municipal project experience"
                        {...field}
                        className="bg-primary-800 border-primary-600 min-h-[120px]"
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
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information you'd like to provide"
                        {...field}
                        className="bg-primary-800 border-primary-600 min-h-[100px]"
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary-700 p-4 bg-primary-900/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions*
                      </FormLabel>
                      <FormDescription>
                        By checking this box, I agree to receive communications about Praetorian SmartCoat Solutions products and services.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-4">
              <GradientButton 
                type="submit" 
                variant="variant" 
                className="w-full md:w-auto"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Register as Municipality Professional"
                )}
              </GradientButton>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

const MunicipalityPage = () => {
  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Full-page municipality background - will be added when available */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/oceanside-treatment-plant.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 1
          }}
        />
        
        {/* No overlay to keep background perfectly clear */}
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/80 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="mixed">NASA Ceramic Technology for Municipalities</GradientHeading>
              <p className="text-xl text-white mb-8">
                Class A fire-rated coatings with NASA-derived ceramic microsphere technology provide superior protection for municipal infrastructure with perfect 0/100 flame spread ratings and independently verified 30+ year lifespan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">NASA Ceramic Protection Technology</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Building className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Class A Fire Protection</h3>
                      <p className="text-white">NASA-derived ceramic microsphere technology provides perfect 0/100 flame spread and smoke development ratings (ASTM E84), ensuring maximum protection for critical municipal infrastructure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Droplets className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Chemical & Water-Treatment Resistant</h3>
                      <p className="text-white">NASA ceramic microsphere technology creates a 156% elastomeric waterproof barrier that withstands harsh chemicals, maintaining NSF/ANSI 61 certification for potable water after 10,000+ hours of salt spray testing.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">30+ Year Verified Performance</h3>
                      <p className="text-white">NASA ceramic technology provides independently verified longevity, with original applications showing no degradation after 30+ years of extreme weather exposure, maintaining full EPA compliance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Leaf className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">89% Energy Efficiency</h3>
                      <p className="text-white">NASA ceramic microsphere technology provides 89% UV reflection and reduces building energy consumption by up to 87% as verified in the Sony Koda case study, while exceeding all EPA environmental regulations.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 flex flex-col">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">NASA Ceramic Applications</GradientHeading>
                <p className="mb-4 text-white">Our NASA-derived ceramic microsphere technology provides Class A fire protection and 30+ year longevity for diverse municipal infrastructure:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Water storage tanks</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Wastewater facilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Bridge structures</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Public buildings</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Traffic infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Park facilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Transportation terminals</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Parking structures</span>
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">
                    Request a Consultation
                  </GradientButton>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 mb-16">
              <h2 className="mb-6 text-3xl md:text-4xl font-bold text-center">
                <span className="text-blue-300">Municipal </span>
                <span className="text-white">Infrastructure </span>
                <span className="text-orange-400">Protection</span>
              </h2>
              <p className="text-white mb-8 text-center max-w-3xl mx-auto">
                Our specialized municipal coatings are designed to provide long-lasting protection for public infrastructure, 
                enhancing durability while reducing maintenance costs and extending service life. Engineered with advanced polymer technology, 
                these coatings create a resilient barrier against environmental damage, corrosion, and wear.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Extended Lifecycle</h3>
                  <p className="text-white">Significantly extends the service life of municipal infrastructure, reducing replacement frequency and costs.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <ParkingCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Traffic-Rated Systems</h3>
                  <p className="text-white">Durable coatings designed to withstand heavy vehicle traffic and constant use in public facilities.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BadgeAlert className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Emergency Ready</h3>
                  <p className="text-white">Specialized coatings for critical infrastructure that must remain operational during emergencies.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Landmark className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Historic Preservation</h3>
                  <p className="text-white">Solutions for protecting and preserving historic municipal structures and monuments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 backdrop-blur-sm bg-primary-900/80 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="bg-primary-900/80 backdrop-blur-xl rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
                <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">NASA Ceramic Coating Systems</GradientHeading>
                <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                  Class A fire-rated ceramic technology with perfect 0/100 flame spread ratings provides 30+ year verified protection for critical municipal infrastructure
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">NASA Ceramic Water Protection</h3>
                <p className="text-white">NASA-derived ceramic microsphere technology with NSF/ANSI 61 certification provides Class A fire protection (0/100 flame spread) and potable water safety for municipal water infrastructure with 30+ year verified performance.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Blocks className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">NASA Ceramic Transport Protection</h3>
                <p className="text-white">NASA-derived ceramic microsphere technology provides Class A fire protection (0/100 flame spread) for tunnels and transit facilities while delivering 156% elastomeric flexibility for bridges and highways exposed to extreme temperature variations.</p>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">NASA Ceramic Public Safety</h3>
                <p className="text-white">NASA-derived ceramic microsphere technology provides Class A fire protection (0/100 flame spread rating) for government buildings and public spaces while delivering 89% UV reflection for energy efficiency and 30+ year performance.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10 backdrop-blur-lg bg-primary-900/40">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-6" variant="mixed">NASA Ceramic Technology Assessment</GradientHeading>
              <p className="text-white text-center mb-8">Our certified experts will evaluate your municipal infrastructure and recommend NASA-derived ceramic microsphere technology solutions for maximum fire protection, energy efficiency, and 30+ year lifecycle performance.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Why NASA Ceramic Technology</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Class A fire protection (0/100 flame spread) for safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-white">NSF/ANSI 61 certified for water infrastructure safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">156% elastomeric flexibility for temperature variations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-white">89% UV reflection reduces energy costs by up to 40%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">NASA-verified 30+ year performance with zero maintenance</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" placeholder="First Name" className="w-full p-3 rounded-md bg-gray-800/90 border-2 border-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                      </div>
                      <div>
                        <input type="text" placeholder="Last Name" className="w-full p-3 rounded-md bg-gray-800/90 border-2 border-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                      </div>
                    </div>
                    <div>
                      <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md bg-gray-800/90 border-2 border-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>
                    <div>
                      <input type="text" placeholder="Municipality/Department" className="w-full p-3 rounded-md bg-gray-800/90 border-2 border-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>
                    <div>
                      <select className="w-full p-3 rounded-md bg-gray-800/90 border-2 border-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <option value="">Select Infrastructure Type</option>
                        <option value="water">Water Infrastructure</option>
                        <option value="transportation">Transportation Systems</option>
                        <option value="buildings">Municipal Buildings</option>
                        <option value="recreation">Recreational Facilities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <textarea placeholder="Project Details" rows={4} className="w-full p-3 rounded-md bg-gray-800/90 border-2 border-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></textarea>
                    </div>
                    <div>
                      <GradientButton variant="default" className="w-full py-3">Submit Request</GradientButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Municipality Professional Registration Section */}
        <section className="py-16 relative z-10 backdrop-blur-sm bg-primary-900/40">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="mixed">
                NASA Ceramic Technology Certification
              </GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg">
                    Become certified in NASA-derived ceramic microsphere technology application with Class A fire rating capabilities (0/100 flame spread) and gain access to exclusive projects requiring perfect fire protection and 30+ year longevity.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Certified Professional Status</h3>
                        <p className="text-white">Gain recognition as a certified professional for municipal infrastructure projects</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <Building className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-orange-300">Public Sector Connections</h3>
                        <p className="text-white">Access to our network of public sector clients and project opportunities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <Droplets className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Specialized Training</h3>
                        <p className="text-white">Receive training on our advanced municipal coating systems and applications</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <Landmark className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-orange-300">Regulatory Expertise</h3>
                        <p className="text-white">Access to our team of regulatory experts for municipal infrastructure projects</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <MunicipalityProfessionalForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default MunicipalityPage;