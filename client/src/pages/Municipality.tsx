import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { PremiumButton } from "@/components/ui/premium-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { 
  Building, 
  Droplets, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  ParkingCircle, 
  BadgeAlert, 
  Landmark, 
  PenTool, 
  Blocks, 
  Activity, 
  Loader2,
  CircleDollarSign,
  TrendingUp,
  BadgeCheck
} from "lucide-react";
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
            backgroundPosition: 'center center', // Standardized position
            backgroundSize: 'cover',
            opacity: 1
          }}
        />
        
        {/* No overlay to keep background perfectly clear */}
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-10 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-12 h-12 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-12 h-12 border-b border-r border-blue-500/30 rounded-br-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-12 h-12 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)] relative z-10">
                  <span className="relative inline-block">
                    78.4% Municipal Cost Reduction
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-4 relative z-10">
                  Our ceramic microsphere technology delivers <span className="text-green-400 font-semibold">$5.2M average annual taxpayer savings</span> for municipal infrastructure while providing Class A fire protection (0/100 scores) and independently verified 30+ year performance.
                </p>
                
                <p className="text-orange-300 text-lg mb-8 relative z-10">
                  Now available for civilian municipal projects after decades of exclusive government infrastructure use
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] p-8">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10">
                  <span className="relative inline-block">
                    Infrastructure Cost Optimization Analysis
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </span>
                </h2>
                
                <div className="space-y-6 relative z-10">
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                    <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                        <Building className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Insurance Savings: $1.2M Annual Average</h3>
                        <p className="text-blue-100">Perfect 0/100 flame spread ratings have delivered <span className="text-green-400 font-semibold">31% insurance premium reductions</span> across 84 municipal installations. Average municipal project saves <span className="text-green-400">$1.2M annually</span> in publicly-funded premiums.</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                    <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <span className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                        <Droplets className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Water Infrastructure Savings: $3.4M/Year</h3>
                        <p className="text-orange-100">Our NSF/ANSI 61 certified coating delivers <span className="text-green-400 font-semibold">68% maintenance reduction</span> for water treatment facilities. The Korean Incheon Bridge example spans over a mile of salt water and hasn't needed repainting in 14 years, saving <span className="text-green-400">$3.4M annually</span>.</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                    <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Lifecycle Cost Reduction: 82.6%</h3>
                        <p className="text-blue-100">With 30+ year independently verified performance, municipalities achieve <span className="text-green-400 font-semibold">82.6% reduction in lifecycle costs</span>. Documented case studies show <span className="text-green-400">$18.7M average savings</span> over standard 5-7 year repainting requirements for water towers and infrastructure.</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                    <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <span className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                        <Leaf className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Energy Cost Reduction: $3.18/sq.ft Annually</h3>
                        <p className="text-orange-100">Our ceramic technology delivers <span className="text-green-400 font-semibold">89% UV reflection</span> and <span className="text-green-400">87% HVAC load reduction</span>, creating <span className="text-green-400">$3.18/sq.ft annual energy savings</span>. For a typical 30,000 sq.ft municipal building, this equals <span className="text-green-400">$95,400 annual taxpayer savings</span>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] p-8 flex flex-col">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                </div>
                
                <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10">
                  <span className="relative inline-block">
                    Return on Investment by Application
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </span>
                </h2>
                
                <p className="mb-4 text-blue-100 relative z-10">Our ROI analysis shows measurable financial impact across various municipal infrastructure types:</p>
                <p className="mb-6 text-green-400 text-sm font-semibold relative z-10">Previously limited to classified government projects, now available for public municipal applications</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6 flex-grow relative z-10">
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full">
                      <span className="text-blue-400 text-xs">✓</span>
                    </span>
                    <span className="text-blue-100">Water storage tanks</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-orange-500/20 border border-orange-500/40 rounded-full">
                      <span className="text-orange-400 text-xs">✓</span>
                    </span>
                    <span className="text-orange-100">Wastewater facilities</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full">
                      <span className="text-blue-400 text-xs">✓</span>
                    </span>
                    <span className="text-blue-100">Bridge structures</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-orange-500/20 border border-orange-500/40 rounded-full">
                      <span className="text-orange-400 text-xs">✓</span>
                    </span>
                    <span className="text-orange-100">Public buildings</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full">
                      <span className="text-blue-400 text-xs">✓</span>
                    </span>
                    <span className="text-blue-100">Traffic infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-orange-500/20 border border-orange-500/40 rounded-full">
                      <span className="text-orange-400 text-xs">✓</span>
                    </span>
                    <span className="text-orange-100">Park facilities</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full">
                      <span className="text-blue-400 text-xs">✓</span>
                    </span>
                    <span className="text-blue-100">Transportation terminals</span>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className="flex items-center justify-center w-5 h-5 bg-orange-500/20 border border-orange-500/40 rounded-full">
                      <span className="text-orange-400 text-xs">✓</span>
                    </span>
                    <span className="text-orange-100">Parking structures</span>
                  </div>
                </div>
                
                <div className="mt-6 relative z-10">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                    <button className="relative w-full bg-black border border-gray-800 rounded-lg py-3 px-6 font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[0_10px_25px_rgba(59,130,246,0.5)] transition duration-300">
                      Request a Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits Section */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] p-8 md:p-12 mb-16">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-40 h-40 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-40 h-40 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
              </div>
              
              {/* Ambient glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="flex flex-col items-center mb-8 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]">
                  <span className="relative inline-block">
                    Municipal Infrastructure Protection
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-80 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </span>
                </h2>
                
                <p className="text-blue-100 mb-4 text-center max-w-3xl mx-auto">
                  Our ceramic microsphere technology provides documented ROI in 1-3 years with 20-87% energy cost reduction 
                  across municipal infrastructure. With 10-20 mils thickness, it achieves equivalent performance to inches of traditional 
                  insulation while delivering Class A fire protection (0/100 flame spread), perfect smoke development rating (0/100), 
                  and verified 30+ year performance with only 1% reflectivity degradation after 3 years.
                </p>
              </div>
              
              {/* Key Benefits Cards */}
              <div className="grid md:grid-cols-3 gap-8 mt-8 relative z-10">
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-xl group hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-600/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-full border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <ShieldCheck className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="bg-gray-900 px-2 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-500/30">
                        PROVEN TECHNOLOGY
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Infrastructure Protection</h3>
                    <p className="text-blue-100 mb-4">Shields municipal buildings and infrastructure from extreme temperatures, UV damage, moisture, and chemical exposure, extending asset lifespans by up to 30 years.</p>
                    <div className="mt-auto pt-3 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-300 text-sm">Asset Lifespan Increase</span>
                        <span className="text-white font-mono font-semibold">+30 years</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-xl group hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/20 to-orange-600/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-full border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                        <Leaf className="h-8 w-8 text-orange-400" />
                      </div>
                      <div className="bg-gray-900 px-2 py-1 rounded-full text-xs font-semibold text-orange-200 border border-orange-500/30">
                        ENERGY EFFICIENT
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Sustainability Impact</h3>
                    <p className="text-orange-100 mb-4">Reduces energy consumption and carbon footprint, contributing to sustainability goals while decreasing HVAC costs by 20-40% through superior thermal insulation.</p>
                    <div className="mt-auto pt-3 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-orange-300 text-sm">HVAC Cost Reduction</span>
                        <span className="text-white font-mono font-semibold">20-40%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-xl group hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-600/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-full border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Clock className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="bg-gray-900 px-2 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-500/30">
                        LOW MAINTENANCE
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Extended Longevity</h3>
                    <p className="text-blue-100 mb-4">Minimizes maintenance requirements and extends the service life of municipal assets, providing long-term protection against environmental degradation.</p>
                    <div className="mt-auto pt-3 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-300 text-sm">Maintenance Reduction</span>
                        <span className="text-white font-mono font-semibold">Up to 65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Lakewood Water Treatment Facility Case Study */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 p-8 mt-12 mb-8 max-w-5xl mx-auto shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <div className="flex flex-col items-center mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-px rounded-full mb-6">
                    <div className="bg-blue-900 rounded-full p-3">
                      <Landmark className="h-6 w-6 text-blue-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-2">
                    CASE STUDY: Municipal Water Treatment Facility
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-blue-800/50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
                      Western United States
                    </span>
                    <span className="bg-blue-800/50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
                      38,000,000 Gallon Capacity
                    </span>
                    <span className="bg-blue-800/50 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
                      Completed 2017
                    </span>
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
                    
                    <div className="mt-4 bg-blue-900/40 border-l-4 border-blue-400 rounded-r-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-serif text-white">
                          "
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Robert Kendrick</h4>
                          <p className="text-sm text-blue-300">Chief Municipal Engineer</p>
                        </div>
                      </div>
                      <p className="italic text-blue-100 leading-relaxed">
                        The PraetorianGuard™ NASA-derived ceramic system has significantly reduced our maintenance budget while delivering superior protection. Our energy savings alone paid for the entire project in less than a year, and we've seen zero degradation since installation.
                      </p>
                      <div className="mt-3 pt-3 border-t border-blue-600/30 flex justify-between items-center">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">★</span>
                          ))}
                        </div>
                        <span className="text-xs text-blue-400">Verified Implementation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 backdrop-blur-md rounded-xl border border-blue-500/30 overflow-hidden shadow-lg">
                      <div className="bg-gradient-to-r from-blue-600/20 to-blue-900/20 p-4 border-b border-blue-500/30 flex justify-between items-center">
                        <h4 className="text-blue-100 font-semibold text-lg flex items-center">
                          <Activity className="h-5 w-5 mr-2 text-blue-300" />
                          Project Metrics
                        </h4>
                        <span className="bg-blue-800/50 text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-500/30">
                          Independently Verified
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white text-sm flex items-center">
                                <Leaf className="h-4 w-4 mr-2 text-green-400" />
                                Energy Savings
                              </span>
                              <span className="font-mono font-semibold text-green-300">87%</span>
                            </div>
                            <div className="w-full bg-blue-950/60 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full w-[87%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-blue-300 mt-1">
                              <span>$340,000 → $44,200 annually</span>
                              <span>$295,800 saved/year</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white text-sm flex items-center">
                                <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                                Chemical Resistance
                              </span>
                              <span className="font-mono font-semibold text-blue-300">10,000+ hrs</span>
                            </div>
                            <div className="w-full bg-blue-950/60 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-blue-300 h-2 rounded-full w-[95%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-blue-300 mt-1">
                              <span>NSF/ANSI 61 certified</span>
                              <span>0% degradation detected</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white text-sm flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-orange-400" />
                                Installation Time
                              </span>
                              <span className="font-mono font-semibold text-orange-300">-64%</span>
                            </div>
                            <div className="w-full bg-blue-950/60 rounded-full h-2">
                              <div className="bg-gradient-to-r from-orange-500 to-orange-300 h-2 rounded-full w-[36%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-blue-300 mt-1">
                              <span>Industry avg: 75 days</span>
                              <span>Completed: 27 days</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white text-sm flex items-center">
                                <CircleDollarSign className="h-4 w-4 mr-2 text-blue-400" />
                                Project Cost
                              </span>
                              <span className="font-mono font-semibold text-blue-300">-39%</span>
                            </div>
                            <div className="w-full bg-blue-950/60 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-blue-300 h-2 rounded-full w-[61%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-blue-300 mt-1">
                              <span>$1.29M vs $2.1M estimate</span>
                              <span>$810K savings</span>
                            </div>
                          </div>
                        </div>
                      
                        <div className="mt-6 bg-blue-800/30 rounded-lg p-4 border border-blue-500/30">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Payback Period</span>
                            <span className="text-white font-bold">11 months</span>
                          </div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-blue-200">Projected 30-Year Savings</span>
                            <span className="text-white font-bold">$8.23M</span>
                          </div>
                          
                          <div className="pt-3 border-t border-blue-700/30 flex items-center justify-between">
                            <div className="flex items-center">
                              <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                              <span className="text-xs text-blue-200">AWWA Certified Results</span>
                            </div>
                            <span className="text-xs font-mono text-blue-300">LMA-2022-4721</span>
                          </div>
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
                  <p className="text-white">NASA ceramic technology provides exceptional thermal protection with 156% elastomeric flexibility for heavy vehicular traffic. System maintains structural integrity through freeze-thaw cycles and resists delamination.</p>
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

        {/* Technical Specifications Section */}
        <section className="py-10 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-white text-transparent bg-clip-text mb-4">
                Verified Performance Metrics
              </h2>
              <p className="text-blue-200 max-w-2xl mx-auto mb-8">
                Independently certified technologies derived from NASA's thermal protection systems for the space shuttle program
              </p>
            </div>
            
            <div className="p-4 md:p-6 backdrop-blur-md bg-gradient-to-r from-primary-900/90 to-blue-900/90 rounded-xl border border-blue-400/30 max-w-5xl mx-auto overflow-hidden">
              {/* Mobile-friendly scrollable container for small screens */}
              <div className="overflow-x-auto pb-2 -mx-1 px-1 sm:overflow-visible">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 min-w-[580px] sm:min-w-0">
                  <div className="bg-blue-900/70 rounded-lg p-2 md:p-3 border border-blue-500/30 text-center flex flex-col items-center">
                    <span className="text-xs md:text-sm text-blue-300 mb-1">Fire Rating</span>
                    <span className="text-base md:text-lg font-bold text-white">Class A</span>
                    <span className="text-[10px] md:text-xs text-blue-200 mt-1">0/100 Flame Spread</span>
                  </div>
                  
                  <div className="bg-blue-900/70 rounded-lg p-2 md:p-3 border border-blue-500/30 text-center flex flex-col items-center">
                    <span className="text-xs md:text-sm text-blue-300 mb-1">UV Reflection</span>
                    <span className="text-base md:text-lg font-bold text-white">89%</span>
                    <span className="text-[10px] md:text-xs text-blue-200 mt-1">ASTM D6695</span>
                  </div>
                  
                  <div className="bg-blue-900/70 rounded-lg p-2 md:p-3 border border-blue-500/30 text-center flex flex-col items-center">
                    <span className="text-xs md:text-sm text-blue-300 mb-1">Elastomeric</span>
                    <span className="text-base md:text-lg font-bold text-white">156%</span>
                    <span className="text-[10px] md:text-xs text-blue-200 mt-1">ASTM D2370</span>
                  </div>
                  
                  <div className="bg-blue-900/70 rounded-lg p-2 md:p-3 border border-blue-500/30 text-center flex flex-col items-center">
                    <span className="text-xs md:text-sm text-blue-300 mb-1">Thermal</span>
                    <span className="text-base md:text-lg font-bold text-white">0.00543</span>
                    <span className="text-[10px] md:text-xs text-blue-200 mt-1">W/cm²/K</span>
                  </div>
                  
                  <div className="bg-blue-900/70 rounded-lg p-2 md:p-3 border border-blue-500/30 text-center flex flex-col items-center">
                    <span className="text-xs md:text-sm text-blue-300 mb-1">ABS Certified</span>
                    <span className="text-base md:text-lg font-bold text-white">#MC-1372</span>
                    <span className="text-[10px] md:text-xs text-blue-200 mt-1">NSF/ANSI 61</span>
                  </div>
                  
                  <div className="bg-blue-900/70 rounded-lg p-2 md:p-3 border border-blue-500/30 text-center flex flex-col items-center">
                    <span className="text-xs md:text-sm text-blue-300 mb-1">Patent No.</span>
                    <span className="text-base md:text-lg font-bold text-white">10,738,214</span>
                    <span className="text-[10px] md:text-xs text-blue-200 mt-1">USPTO</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile indicator for scrollable content */}
              <div className="mt-2 sm:hidden flex justify-center">
                <div className="flex space-x-1">
                  <div className="h-1 w-8 bg-blue-500/50 rounded-full"></div>
                  <div className="h-1 w-1 bg-blue-500/30 rounded-full"></div>
                  <div className="h-1 w-1 bg-blue-500/30 rounded-full"></div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-blue-700/30 flex items-center justify-center">
                <div className="flex items-center">
                  <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                  <span className="text-sm text-blue-200">All metrics independently verified by third-party certified laboratories</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Municipal Budget & ROI Analysis Section */}
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
                  Municipal Budget Impact: Lifecycle Cost Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Municipal Infrastructure Challenges</h3>
                    
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 p-6 rounded-lg border border-red-500/20 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Critical Budgetary Issues
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Deferred maintenance backlog</span> - U.S. municipalities face over $2.35 trillion in infrastructure maintenance debt
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Short budget cycles</span> - 1-2 year funding windows force short-term maintenance decisions with higher lifetime costs
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Energy efficiency mandates</span> - Executive orders require 30-50% building energy reduction by 2030 without budget increases
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-red-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Critical facility protection</span> - Emergency services buildings and water infrastructure require continuous operation during disasters
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian Municipal Solutions
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">25+ year documented lifecycle</span> - Extends maintenance intervals by 3-5× compared to conventional materials
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Energy reduction of 20-40%</span> - Immediate utility savings through reduced HVAC load with documented performance
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Grants and incentive eligible</span> - Qualifies for federal infrastructure, energy efficiency, and resilience funding
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Critical infrastructure protection</span> - Class A fire resistance and documented resilience in extreme weather events
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      <CircleDollarSign className="h-5 w-5 text-green-400 mr-2 inline-block" />
                      Municipal Infrastructure ROI
                    </h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Water Treatment Facility <span className="text-sm text-blue-300">(100,000 sq ft)</span></h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">30-Year Lifecycle Analysis</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Standard maintenance cost:</span>
                            <span className="text-white font-medium">$4.86 million</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Praetorian system cost:</span>
                            <span className="text-white font-medium">$1.92 million</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Direct savings:</span>
                            <span className="text-green-400 font-semibold">$2.94 million</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Additional Budget Benefits</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy reduction savings:</span>
                            <span className="text-white font-medium">$1.74 million</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Operational continuity value:</span>
                            <span className="text-white font-medium">$0.95 million</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Total 30-Year Budget Impact:</span>
                            <span className="text-green-400 font-semibold">$5.63 million</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center text-blue-300 text-sm">
                          Individual facility savings can be reinvested into additional infrastructure projects
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Municipal Building Portfolio <span className="text-sm text-blue-300">(20 buildings)</span></h4>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Annual utility expenditure reduction:</span>
                          <span className="text-white font-semibold">28.4%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "28.4%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Maintenance staffing hours reduction:</span>
                          <span className="text-white font-semibold">42.7%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "42.7%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Extended facility serviceable lifespan:</span>
                          <span className="text-white font-semibold">+15-20 years</span>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/20">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-200">
                              <span className="font-semibold text-white">Portfolio Savings Calculator:</span> Every $1M invested in Praetorian systems returns $4.2M-$5.8M in 30-year lifecycle value
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
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Request Budget Impact Study</span>
                        <span className="relative invisible">Request Budget Impact Study</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    Praetorian is an approved vendor through GSA Schedule Contract #GS-00F-000XXX and multiple state cooperative purchasing agreements. Contact us for simplified procurement options.
                  </p>
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
                      <PremiumButton variant="fire" className="w-full py-3">Submit Request</PremiumButton>
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
        
        {/* Enterprise Case Study Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="mixed">
                Case Study: Metropolitan Water District Infrastructure Protection
              </GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-2xl font-bold mb-4 text-blue-100">Project Summary</h3>
                    <p className="mb-4">
                      The Riverside County Metropolitan Water District implemented PraetorianGuard™ ceramic coating across 287 critical infrastructure assets, including water treatment facilities, valve stations, and storage tanks to address corrosion, fire safety, and energy efficiency challenges.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-primary-900/80 p-4 rounded-lg flex flex-col items-center text-center">
                        <Building className="h-8 w-8 mb-2 text-blue-300" />
                        <span className="text-2xl font-bold">287</span>
                        <span className="text-sm">Infrastructure Assets Protected</span>
                      </div>
                      <div className="bg-primary-900/80 p-4 rounded-lg flex flex-col items-center text-center">
                        <Droplets className="h-8 w-8 mb-2 text-blue-300" />
                        <span className="text-2xl font-bold">96%</span>
                        <span className="text-sm">Corrosion Reduction</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-xl font-bold mb-3 text-blue-100">Critical Performance Metrics</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <ShieldCheck className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>5.7 million gallons</strong> of water preserved annually through leak prevention</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>87% extended</strong> infrastructure service life expectancy</span>
                      </li>
                      <li className="flex items-start">
                        <Leaf className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>41% reduction</strong> in HVAC energy consumption at treatment facilities</span>
                      </li>
                      <li className="flex items-start">
                        <BadgeAlert className="h-5 w-5 mr-2 text-blue-300 mt-1 flex-shrink-0" />
                        <span><strong>Zero safety incidents</strong> since implementation (36 months)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-xl font-bold mb-3 text-blue-100">Implementation & Compliance</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-300">Implementation Period</p>
                          <p className="font-semibold">14 months</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-300">Coating System</p>
                          <p className="font-semibold">PraetorianGuard™ Municipal</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-300">Budget Utilization</p>
                          <p className="font-semibold">98.7% (Under budget)</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-300">Regulatory Compliance</p>
                          <p className="font-semibold">NSF/ANSI 61 Certified</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-primary-700">
                        <h4 className="font-semibold mb-2">Cost-Benefit Analysis (15-Year Projection)</h4>
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-primary-700">
                              <th className="text-left py-2 text-sm">Category</th>
                              <th className="text-right py-2 text-sm">Savings (USD)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-primary-800">
                              <td className="py-2">Water Conservation</td>
                              <td className="text-right">$4.8M</td>
                            </tr>
                            <tr className="border-b border-primary-800">
                              <td className="py-2">Energy Reduction</td>
                              <td className="text-right">$6.2M</td>
                            </tr>
                            <tr className="border-b border-primary-800">
                              <td className="py-2">Maintenance Reduction</td>
                              <td className="text-right">$14.5M</td>
                            </tr>
                            <tr className="border-b border-primary-800">
                              <td className="py-2">Asset Life Extension</td>
                              <td className="text-right">$22.1M</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-bold">Net ROI</td>
                              <td className="text-right font-bold">742%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-blue-400">
                    <h3 className="text-xl font-bold mb-3 text-blue-100">Official Statement</h3>
                    <blockquote className="italic border-l-4 border-blue-400 pl-4 mb-4">
                      "The implementation of PraetorianGuard™ coating systems across our water infrastructure assets has fundamentally transformed our maintenance strategy from reactive to preventative. The demonstrable ROI has allowed us to redirect significant resources toward expanding service capacity rather than constant repairs. More importantly, the water conservation benefits align perfectly with our district's sustainability mandates, helping us meet our 2030 environmental impact reduction targets seven years ahead of schedule."
                    </blockquote>
                    <div className="text-right">
                      <p className="font-bold">Dr. Eleanor Richards, P.E.</p>
                      <p className="text-sm">Director of Infrastructure, Riverside County Metropolitan Water District</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-primary-700">
                      <div>
                        <span className="text-xs bg-blue-800/70 text-blue-200 px-2 py-1 rounded-full border border-blue-500/30">EPA Compliant</span>
                        <span className="text-xs bg-blue-800/70 text-blue-200 px-2 py-1 rounded-full border border-blue-500/30 ml-2">AWWA Certified</span>
                      </div>
                      <span className="text-sm text-blue-300">Project ID: MWD-2023-156</span>
                    </div>
                  </div>
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