import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { PremiumButton } from "@/components/ui/premium-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Landmark, 
  CircleDollarSign,
  Building,
  Droplets,
  BadgeAlert,
  PenTool,
  Blocks,
  Activity,
  Loader2,
  TrendingUp,
  BadgeCheck,
  ParkingCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMunicipalityProfessionalSchema } from "@shared/schema";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Extended schema with additional validation for municipality professional registration
const municipalityProfessionalFormSchema = insertMunicipalityProfessionalSchema.extend({
  confirmEmail: z.string().email("Invalid email format"),
  jurisdictions: z.string(),
  clientTypes: z.string(),
  experienceYears: z.coerce.number(),
  projectExperience: z.string()
});

type MunicipalityProfessionalFormValues = z.infer<typeof municipalityProfessionalFormSchema>;

export default function Municipality() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<MunicipalityProfessionalFormValues>({
    resolver: zodResolver(municipalityProfessionalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      company: "",
      title: "",
      jurisdictions: "",
      clientTypes: "",
      experienceYears: undefined,
      projectExperience: "",
      communicationConsent: false
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: MunicipalityProfessionalFormValues) => {
      return await apiRequest("/api/municipality/register", {
        method: "POST",
        data
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Thank you for registering. Our team will contact you shortly.",
      });
      form.reset();
      setShowRegistrationForm(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  });

  function onSubmit(data: MunicipalityProfessionalFormValues) {
    mutate(data);
  }

  return (
    <MainLayout>
      <div className="bg-black min-h-screen text-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/90 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center max-w-4xl mx-auto text-center mb-16 relative">
              {/* Premium ambient glow effect */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/20 rounded-full blur-[80px] z-0 opacity-70"></div>
              
              <GradientHeading 
                className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold" 
                from="#ffffff" 
                to="#a3c2ff"
                shadow="rgba(0, 136, 255, 0.5)"
              >
                Municipal Infrastructure Protection
              </GradientHeading>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
                Specialized ceramic coating solutions for extending the life of critical municipal infrastructure while reducing maintenance costs and environmental impact.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <GradientButton onClick={() => setShowRegistrationForm(true)}>
                  Schedule a Consultation
                </GradientButton>
                <GradientButton variant="outline" onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                  ROI Calculator
                </GradientButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl p-6 border border-blue-500/20 relative group transition-all duration-300 hover:border-blue-500/40">
                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Card ambient glow */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-xl group-hover:bg-blue-500/10 transition-all duration-500 z-0"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Infrastructure Protection</h3>
                  <p className="text-gray-300">
                    Our ceramic coating creates a durable barrier against corrosion, UV damage, and chemical exposure, extending the life of critical infrastructure.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl p-6 border border-blue-500/20 relative group transition-all duration-300 hover:border-blue-500/40">
                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Card ambient glow */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-xl group-hover:bg-blue-500/10 transition-all duration-500 z-0"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="w-7 h-7 text-green-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Environmental Compliance</h3>
                  <p className="text-gray-300">
                    Zero VOC formulation helps municipalities meet environmental regulations while protecting water treatment facilities and public infrastructure.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl p-6 border border-blue-500/20 relative group transition-all duration-300 hover:border-blue-500/40">
                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Card ambient glow */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-xl group-hover:bg-blue-500/10 transition-all duration-500 z-0"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-700 to-purple-900 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Budget Optimization</h3>
                  <p className="text-gray-300">
                    Significantly reduce maintenance costs and extend replacement cycles, helping municipalities optimize their infrastructure budgets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <GradientHeading
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                from="#ffffff"
                to="#a3c2ff"
                shadow="rgba(0, 136, 255, 0.5)"
              >
                Municipal Success Stories
              </GradientHeading>
              
              <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl border border-blue-500/20 p-8 relative mb-12">
                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Card ambient glow */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-xl z-0"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Coastal Water Treatment Facility</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3 text-white">Challenge</h4>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-3">
                          <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                          <span className="text-white">Severe corrosion on multiple tanks and treatment systems requiring annual maintenance</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                          <span className="text-white">Frequent equipment replacement cycles averaging 5-7 years</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                          <span className="text-white">Environmental concerns from traditional protective coatings</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-3 text-white">Results</h4>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-3">
                          <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1">✓</span>
                          <span className="text-white">Extended maintenance cycle from annual to every 5+ years</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1">✓</span>
                          <span className="text-white">Projected equipment lifespan increase of 300%</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1">✓</span>
                          <span className="text-white">$425,000 estimated maintenance savings over 10 years</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <GradientButton onClick={() => setShowRegistrationForm(true)}>
                      Get Similar Results
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section id="roi-calculator" className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <GradientHeading
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              from="#ffffff"
              to="#a3c2ff"
              shadow="rgba(0, 136, 255, 0.5)"
            >
              Municipal Infrastructure ROI Calculator
            </GradientHeading>
            
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl border border-blue-500/20 p-8 relative">
              {/* Premium corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Card ambient glow */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-xl z-0"></div>
              
              <div className="relative z-10">
                <p className="text-lg text-gray-300 mb-8 text-center">
                  Calculate your potential savings by protecting municipal infrastructure with our ceramic coating technology.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <CircleDollarSign className="w-5 h-5 mr-2 text-blue-400" />
                      Current Maintenance Costs
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Annual Maintenance Cost</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="$0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Average Replacement Cycle (Years)</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="7"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Annual Labor Hours</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Landmark className="w-5 h-5 mr-2 text-blue-400" />
                      Infrastructure Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Infrastructure Type</label>
                        <select className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                          <option>Water Treatment Plant</option>
                          <option>Wastewater Facility</option>
                          <option>Public Buildings</option>
                          <option>Bridges & Overpasses</option>
                          <option>Other Municipal Structures</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Surface Area (sq ft)</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Environmental Exposure</label>
                        <select className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                          <option>Coastal/Marine</option>
                          <option>Urban/Industrial</option>
                          <option>Rural</option>
                          <option>Chemical/Corrosive</option>
                          <option>Standard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mb-8">
                  <GradientButton>
                    Calculate 10-Year Savings
                  </GradientButton>
                </div>
                
                <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6 text-center">
                  <h4 className="text-lg font-medium mb-3 text-white">Estimated 10-Year ROI</h4>
                  <p className="text-3xl font-bold text-blue-300 mb-2">$380,000 - $450,000</p>
                  <p className="text-gray-400">Based on average municipal infrastructure applications</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        {showRegistrationForm && (
          <section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="max-w-2xl w-full bg-gradient-to-br from-gray-850 to-gray-950 rounded-xl border border-blue-500/20 p-8 relative max-h-[90vh] overflow-y-auto">
              {/* Premium corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Card ambient glow */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-xl z-0"></div>
              
              <div className="relative z-10">
                <button 
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => setShowRegistrationForm(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 className="text-2xl font-semibold mb-6 text-white text-center">
                  Municipal Professional Registration
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                            <FormLabel>Confirm Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Municipality/Organization</FormLabel>
                            <FormControl>
                              <Input placeholder="City of Springfield" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Facilities Manager" {...field} />
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
                          <FormLabel>Jurisdictions/Areas Served</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List the jurisdictions or areas your organization serves" 
                              {...field} 
                              value={field.value as string}
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
                          <FormLabel>Types of Infrastructure</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the types of infrastructure you manage" 
                              {...field}
                              value={field.value as string} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experienceYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="10" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              value={field.value as number | undefined} 
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
                          <FormLabel>Current Infrastructure Challenges</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your current infrastructure maintenance challenges" 
                              {...field}
                              value={field.value as string} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="communicationConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-gray-800">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I consent to receive communications from Praetorian SmartCoat
                            </FormLabel>
                            <FormDescription>
                              You can unsubscribe at any time by clicking the link in the footer of our emails.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-center mt-8">
                      <GradientButton type="submit" disabled={isPending}>
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : "Register Now"}
                      </GradientButton>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        )}
                
        {/* Contact Information Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/50 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Us</h3>
                <p className="text-gray-300 mb-6">
                  Our specialized team is ready to help with your municipal infrastructure protection needs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Headquarters</h4>
                      <p className="text-gray-400">Redding, California</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Phone</h4>
                      <p className="text-gray-400">(916) 809-6619</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Email</h4>
                      <p className="text-gray-400">rob@praetoriansmartcoat.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-6 text-white">Schedule a Consultation</h3>
                <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl p-6 border border-blue-500/20 relative">
                  {/* Premium corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  {/* Card ambient glow */}
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl z-0"></div>
                  
                  <div className="relative z-10">
                    <p className="text-gray-300 mb-6">
                      Complete the form to schedule a personalized consultation with our municipal infrastructure specialists. We'll analyze your specific needs and provide tailored solutions.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Name</label>
                        <input className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" type="text" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" type="email" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Phone</label>
                        <input className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" type="tel" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Organization</label>
                        <input className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" type="text" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Infrastructure Type</label>
                      <select className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        <option>Water Treatment Facility</option>
                        <option>Wastewater Management</option>
                        <option>Public Buildings</option>
                        <option>Transportation Infrastructure</option>
                        <option>Other Municipal Infrastructure</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2">Message</label>
                      <textarea className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32" placeholder="Tell us about your infrastructure protection needs..."></textarea>
                    </div>
                    
                    <div className="flex justify-center">
                      <GradientButton onClick={() => setShowRegistrationForm(true)}>
                        Schedule Consultation
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}