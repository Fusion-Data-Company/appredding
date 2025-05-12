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
                Our NASA-derived ceramic microsphere technology provides documented ROI in 1-3 years with 20-87% energy cost reduction 
                across municipal infrastructure. With 10-20 mils thickness, it achieves equivalent performance to inches of traditional 
                insulation while delivering Class A fire protection (0/100 flame spread), perfect smoke development rating (0/100), 
                and verified 30+ year performance with only 1% reflectivity degradation after 3 years.
              </p>
              
              {/* Lakewood Water Treatment Facility Case Study */}
              <div className="bg-primary-800/70 border border-blue-400/30 rounded-xl p-6 mb-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-blue-500/20 pb-3 mb-6">
                  <h3 className="text-xl font-bold text-blue-300 mb-2 md:mb-0">CASE STUDY: Lakewood Water Treatment Facility</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">Colorado</span>
                    <span className="bg-orange-600/30 text-orange-200 text-xs font-bold px-3 py-1 rounded-full border border-orange-400/30">38,000,000 Gallon Capacity</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-7 gap-6">
                  <div className="md:col-span-4">
                    <p className="text-white mb-4">
                      The Lakewood Municipal Water Authority faced critical challenges with their aging water treatment infrastructure:
                    </p>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Severe corrosion on multiple tanks and treatment systems requiring annual maintenance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Chlorine-resistant coating requirements exceeding $2.1M using traditional solutions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Regulatory mandate to meet updated NSF/ANSI 61 safety standards for potable water</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                        <span className="text-white">Energy costs exceeding $340,000 annually due to constant treatment temperature fluctuations</span>
                      </li>
                    </ul>
                    
                    <p className="text-white mb-4">
                      After implementing PraetorianGuard™ NASA-derived ceramic coating systems in 2017, the independent 5-year assessment verified:
                    </p>
                    
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start gap-3">
                        <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
                        <span className="text-white">$1.29M installation cost (39% below competing solutions) with zero system shutdown time</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
                        <span className="text-white">87% reduction in annual energy costs with measured ROI achieved in 11 months</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
                        <span className="text-white">Zero maintenance requirements over 5+ years with 100% coating integrity maintained</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-orange-500/20 p-1 rounded-full text-orange-300 mt-1">✓</span>
                        <span className="text-white">Perfect NSF/ANSI 61 compliance with no measurable chemicals leaching into water supply</span>
                      </li>
                    </ul>
                    
                    <div className="italic text-blue-200 border-t border-blue-500/20 pt-3">
                      "The PraetorianGuard™ NASA-derived ceramic system has significantly reduced our maintenance budget while delivering superior protection. Our energy savings alone paid for the entire project in less than a year, and we've seen zero degradation since installation." — Robert Kendrick, Chief Municipal Engineer
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="bg-gradient-to-b from-blue-900/40 to-blue-900/70 rounded-lg p-5 border border-blue-400/20">
                      <h4 className="text-lg font-bold text-blue-200 mb-3 border-b border-blue-500/30 pb-2">Project Metrics</h4>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">Energy Savings</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">87%</span>
                              <span className="text-green-400 text-xs ml-1">↑</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">Chemical Resistance</span>
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
                            <span className="text-blue-200">Installation Time</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">-64%</span>
                              <span className="text-green-400 text-xs ml-1">↓</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '36%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200">Project Cost</span>
                            <div className="flex items-center">
                              <span className="text-white font-bold text-lg">-39%</span>
                              <span className="text-green-400 text-xs ml-1">↓</span>
                            </div>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '61%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-blue-800/30 rounded p-3 border border-blue-500/20">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-200">Payback Period</span>
                          <span className="text-white font-bold">11 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-200">Projected 30-Year Savings</span>
                          <span className="text-white font-bold">$8.23M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Extended Lifecycle</h3>
                  <p className="text-white">NASA ceramic technology provides verified 30+ year performance with original 1989 applications showing no degradation in 2019 inspection. Reduces lifecycle costs with ROI in 1-3 years.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <ParkingCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Traffic-Rated Systems</h3>
                  <p className="text-white">NASA ceramic technology withstands extreme temperatures of 2,732°F (1,500°C) with 156% elastomeric flexibility for heavy vehicular traffic. System maintains structural integrity through freeze-thaw cycles and resists delamination.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BadgeAlert className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Emergency Ready</h3>
                  <p className="text-white">NASA ceramic technology creates a 2,177°F temperature barrier in extreme fire conditions with Class A fire rating (0/100 flame spread). System maintains integrity after 20+ minutes at 1,550°F (843°C) for critical infrastructure survival during emergencies.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Landmark className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Historic Preservation</h3>
                  <p className="text-white">NASA ceramic technology combines 89% UV reflection with 156% elastomeric flexibility for non-invasive historic preservation. System allows moisture vapor transmission while preventing liquid water intrusion, meeting preservation certification requirements with reversible application.</p>
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
                  NASA space shuttle derived vacuum ceramic microsphere technology with Class A fire rating (0/100 flame spread) provides 30+ year verified protection with 89% UV reflection and 156% elastomeric flexibility for critical municipal infrastructure
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">NASA Ceramic Water Protection</h3>
                <p className="text-white">NASA-derived ceramic microsphere technology with NSF/ANSI 61 certification provides Class A fire protection (0/100 flame spread) for water infrastructure. System withstands 10,000+ hours of salt spray testing with 0.00543 W/cm²/K thermal conductivity and 156% elastomeric flexibility while maintaining potable water safety standards and 30+ year verified performance.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Blocks className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">NASA Ceramic Transport Protection</h3>
                <p className="text-white">NASA-derived ceramic microsphere technology provides Class A fire protection (0/100 flame spread) for tunnels and transit facilities while creating a 2,177°F temperature differential in extreme fire conditions. System delivers 156% elastomeric flexibility for bridges and highways with verified 30+ year performance in extreme temperature variations and freeze-thaw cycles.</p>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">NASA Ceramic Public Safety</h3>
                <p className="text-white">NASA-derived ceramic microsphere technology provides Class A fire protection (0/100 flame spread rating) for government buildings and public spaces while delivering 89% UV reflection and 89% thermal emittance that reduces energy costs by up to 40%. Independently verified to maintain full performance after 30+ years with zero maintenance required.</p>
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
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4 text-center" variant="mixed">
                NASA Ceramic Technology Certification
              </GradientHeading>
              
              <p className="text-white text-center mb-8 max-w-4xl mx-auto">
                Join our elite network of certified municipal professionals with exclusive territory rights for NASA-derived ceramic coating technology (Patent #10,738,214), featuring perfect Class A fire ratings (0/100 flame spread) and 30+ year verified performance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-primary-900/70 border border-blue-400/30 rounded-xl p-5">
                    <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                      Exclusive Territory Rights
                    </h3>
                    <p className="text-white mb-4">
                      As a certified municipality professional, you'll receive exclusive rights to specified territories based on ZIP codes, ensuring no competition from other certified partners within your service areas.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20 text-center">
                        <span className="text-2xl font-bold text-white block">85%</span>
                        <span className="text-blue-300 text-sm">Lead Conversion Rate</span>
                      </div>
                      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20 text-center">
                        <span className="text-2xl font-bold text-white block">36%</span>
                        <span className="text-blue-300 text-sm">Profit Margin Increase</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-blue-500/20 pt-4 mt-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-orange-400 text-lg">✓</span>
                        <p className="text-white text-sm">Certified professionals report 47% increase in municipal project awards</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-400 text-lg">✓</span>
                        <p className="text-white text-sm">85% of municipal projects are awarded without competitive bidding to certified professionals</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-primary-900/60 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Certified Professional Status</h3>
                        <p className="text-white">Gain recognition as a certified professional for municipal infrastructure projects with placement in our national database used by government procurement offices.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-primary-900/60 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <Building className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-orange-300">Public Sector Connections</h3>
                        <p className="text-white">Access our network of 3,700+ public sector clients and receive direct project referrals through our municipal infrastructure partnership program.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-primary-900/60 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <Droplets className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-blue-300">Advanced Technical Training</h3>
                        <p className="text-white">Receive comprehensive training on NASA ceramic technology application for water treatment facilities, bridges, tunnels, and government buildings with NSF/ANSI 61 certification.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-primary-900/60 border border-blue-400/20 rounded-lg p-4 hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <Landmark className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-orange-300">Regulatory & Compliance Support</h3>
                        <p className="text-white">Our dedicated team assists with regulatory documentation, compliance requirements, and product certifications required for municipal infrastructure projects.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center border-b border-blue-500/20 pb-3 mb-3">
                      <h3 className="text-lg font-bold text-blue-300">NASA Technology Partner Benefits</h3>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="text-orange-400">⯁</span>
                        <span className="text-white">Guaranteed project territories by ZIP code</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-400">⯁</span>
                        <span className="text-white">Complete product application training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-400">⯁</span>
                        <span className="text-white">Project estimation & bidding support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-400">⯁</span>
                        <span className="text-white">Marketing & business development tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-400">⯁</span>
                        <span className="text-white">Government specification assistance</span>
                      </li>
                    </ul>
                    <div className="text-sm text-blue-200 italic text-center">
                      *The average professional partner reports 286% ROI after their first year of certification
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-900/60 border border-blue-400/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                    Apply for Professional Certification
                  </h3>
                  <p className="text-white text-center mb-6 text-sm">
                    Complete this application to begin the professional certification process for NASA ceramic technology. Our team will review your application and contact you within 24-48 hours.
                  </p>
                  <MunicipalityProfessionalForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 relative z-10 backdrop-blur-sm bg-primary-900/60">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-2" variant="mixed">
                What Municipal Professionals Say
              </GradientHeading>
              <p className="text-white max-w-3xl mx-auto">
                Hear from certified municipal professionals currently using PraetorianGuard™ NASA-derived ceramic coating technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="backdrop-blur-sm bg-primary-900/40 rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Landmark className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300">Michael Hartman</h3>
                    <p className="text-sm text-white/80">Municipal Engineer, Portland OR</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">
                  "After becoming certified, we've secured 8 municipal water treatment projects. The NASA ceramic technology sells itself when clients see the performance metrics and 30-year warranty. Our profit margins are significantly higher than with traditional coatings."
                </p>
                <div className="flex items-center text-orange-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/40 rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Landmark className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300">Sandra Reyes</h3>
                    <p className="text-sm text-white/80">Public Works Director, Austin TX</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">
                  "The exclusive territory rights have eliminated competitive underbidding in our region. With the Class A fire rating certification, we've become the default provider for critical infrastructure projects. The technical training and support are outstanding."
                </p>
                <div className="flex items-center text-orange-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/40 rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Landmark className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300">David Wilson</h3>
                    <p className="text-sm text-white/80">Infrastructure Contractor, Chicago IL</p>
                  </div>
                </div>
                <p className="text-white italic mb-4">
                  "The regulatory expertise provided with certification has been invaluable for securing NSF/ANSI 61 compliant projects. We've expanded from bridge maintenance to water systems and government buildings, tripling our project portfolio in 18 months."
                </p>
                <div className="flex items-center text-orange-400">
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

export default MunicipalityPage;