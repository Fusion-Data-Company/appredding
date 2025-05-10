import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import painterImage from "@assets/iStock-1214149737.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPainterSchema } from "@shared/schema";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Extended schema with additional validation
const painterFormSchema = insertPainterSchema.extend({
  confirmEmail: z.string().email("Invalid email format"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  })
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

type PainterFormValues = z.infer<typeof painterFormSchema>;

const PainterNetwork = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const form = useForm<PainterFormValues>({
    resolver: zodResolver(painterFormSchema),
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
      specialties: "",
      serviceAreas: "",
      teamSize: 0,
      hourlyRate: undefined,
      minProjectSize: undefined,
      portfolio: "",
      certifications: "",
      notes: "",
      termsAccepted: false,
    },
  });
  
  const registerPainterMutation = useMutation({
    mutationFn: async (data: PainterFormValues) => {
      try {
        // Remove confirmEmail and termsAccepted as they're not in the database schema
        const { confirmEmail, termsAccepted, ...painterData } = data;
        const res = await apiRequest("POST", "/api/professionals/painters", painterData);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: "Failed to register painter" }));
          throw new Error(errorData.message || "Failed to register painter");
        }
        
        return res.json();
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Thank you for registering with our Painter Network! We'll contact you soon.",
        variant: "default"
      });
      setFormSubmitted(true);
      form.reset();
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow relative">
        {/* Full-page painter background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${painterImage})`,
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
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg">
              <div className="tracking-tight flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl mb-6 font-bold">
                  <span className="gradient-text-blue">Professional</span>{" "}
                  <span className="gradient-text-fire">Painter Network</span>
                </h1>
              </div>
              <p className="text-xl text-white mb-8">
                Our nationwide network of certified application professionals ensures your project is completed to the highest standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 premium-border rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                <div className="p-6 border-b border-primary-700">
                  <h3 className="text-xl font-semibold">Certified Painter Network</h3>
                  <p className="text-gray-300">Find approved application professionals in your area</p>
                </div>
                <div className="h-[400px] bg-primary-700/50 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Painter network map" 
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center backdrop-blur-sm bg-primary-900/70 rounded-lg p-6 max-w-xs premium-border">
                      <i className="fas fa-map-marker-alt text-4xl mb-3 text-primary-400"></i>
                      <p className="mb-4">Interactive painter network map would be displayed here</p>
                      <GradientButton variant="default">
                        Find Nearby Painters
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg order-1 md:order-2">
                <div className="tracking-tight mb-6">
                  <h2 className="text-3xl font-bold">
                    <span className="gradient-text-blue">Network</span>{" "}
                    <span className="gradient-text-fire">Benefits</span>
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-certificate text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Certified Professionals</h3>
                      <p>All network members complete our rigorous training and certification program</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Workmanship Guarantee</h3>
                      <p>Applications completed by certified painters are backed by our quality guarantee</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-star text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                      <p>Browse real customer feedback and ratings for each network member</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-tools text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Specialized Equipment</h3>
                      <p>Access to proprietary application methods and technologies</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <GradientButton variant="default">
                    Join Our Network
                  </GradientButton>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg">
              <div className="tracking-tight flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold">
                  <span className="gradient-text-blue">Become a</span>{" "}
                  <span className="gradient-text-fire">Certified Painter</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-6">
                    Join our exclusive network of certified painters and grow your business with access to our premium clients and specialized products.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Exclusive access to Praetorian's specialized protective coatings</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Training and certification in specialized application techniques</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Marketing support and qualified customer referrals</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Technical support and ongoing professional development</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Apply to Join Our Network</h3>
                  
                  {formSubmitted ? (
                    <div className="rounded-lg bg-primary-700/50 p-6 text-center shadow-inner">
                      <div className="mb-4 text-primary-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold mb-2">Application Submitted!</h4>
                      <p className="mb-4">Thank you for your interest in joining our painter network. Our team will review your application and contact you shortly.</p>
                      <GradientButton 
                        variant="default" 
                        onClick={() => setFormSubmitted(false)}
                      >
                        Submit Another Application
                      </GradientButton>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit((values) => registerPainterMutation.mutate(values))} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your company name" 
                                  className="bg-primary-800 border-primary-600"
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
                              <FormLabel>Contact Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your full name" 
                                  className="bg-primary-800 border-primary-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email"
                                    placeholder="Your email address" 
                                    className="bg-primary-800 border-primary-600"
                                    {...field} 
                                  />
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
                                  <Input 
                                    type="email"
                                    placeholder="Confirm your email" 
                                    className="bg-primary-800 border-primary-600"
                                    {...field} 
                                  />
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
                                  <Input 
                                    type="tel"
                                    placeholder="Your phone number" 
                                    className="bg-primary-800 border-primary-600"
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
                                <FormLabel>Years in Business</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number"
                                    min={0}
                                    placeholder="Years of experience" 
                                    className="bg-primary-800 border-primary-600"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Street address" 
                                  className="bg-primary-800 border-primary-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="City" 
                                    className="bg-primary-800 border-primary-600"
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
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="State" 
                                    className="bg-primary-800 border-primary-600"
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
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Zip code" 
                                    className="bg-primary-800 border-primary-600"
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
                          name="specialties"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specializations</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your painting specialties (commercial, residential, industrial, etc.)" 
                                  className="bg-primary-800 border-primary-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="licenseNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your professional license number" 
                                    className="bg-primary-800 border-primary-600"
                                    {...field} 
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
                                <FormLabel>Insurance Information</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Insurance carrier and policy number" 
                                    className="bg-primary-800 border-primary-600"
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
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>How Did You Hear About Us?</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Referral source" 
                                  className="bg-primary-800 border-primary-600"
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I accept the terms and conditions and agree to maintain Praetorian's quality standards
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <GradientButton 
                          className="w-full" 
                          variant="default"
                          type="submit"
                          disabled={registerPainterMutation.isPending}
                        >
                          {registerPainterMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : "Submit Application"}
                        </GradientButton>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl shadow-lg">
              <div className="tracking-tight flex flex-col items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  <span className="gradient-text-blue">Benefits of Working With</span>{" "}
                  <span className="gradient-text-fire">Certified Painters</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-primary-800/70 backdrop-blur-sm rounded-lg p-6 hover-lift">
                  <i className="fas fa-medal text-primary-400 text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-3">Expert Application</h3>
                  <p>Our certified painters have undergone extensive training on proper application techniques for all our specialized protective coatings.</p>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm rounded-lg p-6 hover-lift">
                  <i className="fas fa-clock text-primary-400 text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-3">Timely Project Completion</h3>
                  <p>Experience efficient project management and timely completion with our network of professional painters.</p>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm rounded-lg p-6 hover-lift">
                  <i className="fas fa-check-double text-primary-400 text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                  <p>Every project completed by our certified network undergoes a rigorous quality check to ensure perfect application.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto backdrop-blur-sm bg-primary-900/60 rounded-xl p-8 shadow-lg">
              <div className="tracking-tight flex flex-col items-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  <span className="gradient-text-blue">Success</span>{" "}
                  <span className="gradient-text-fire">Stories</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-primary-800/70 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">James Martinez - Premier Painting Services</h3>
                      <p className="italic mb-4">"Joining the Praetorian Painter Network was the best business decision I've made. My revenue has increased by 35% in the first year, and I now have access to clients I couldn't reach before."</p>
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Sarah Johnson - Coastal Protection Specialists</h3>
                      <p className="italic mb-4">"The training and certification process was thorough, but the rewards have been tremendous. We've become the go-to company for marine applications in our region thanks to Praetorian's support."</p>
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PainterNetwork;