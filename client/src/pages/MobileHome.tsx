import React, { useState, ChangeEvent } from "react";
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
import { 
  CalendarIcon, 
  Home, 
  Wrench, 
  Clock, 
  Shield, 
  CheckCircle, 
  BadgeCheck, 
  Building,
  Sun as SunIcon,
  Waves as WavesIcon,
  Droplets as DropletIcon,
  Timer as TimerIcon,
  CircleDollarSign,
  BarChart2,
  Thermometer as ThermometerIcon,
  Award,
  FileText,
  Download,
  TrendingUp
} from "lucide-react";
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
      hourlyRate: "",
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
        {/* Advanced premium gradient background with layered effects */}
        <div className="fixed inset-0 z-0" style={{ 
          background: 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)'
        }}></div>
        
        {/* Dynamic layered background elements */}
        <div className="fixed inset-0 z-0 opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0) 60%)'
        }}></div>
        
        <div className="fixed inset-0 z-0 opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0) 70%)'
        }}></div>
        
        {/* Advanced multi-color ambient glow effects with green accent */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Blue glow */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          
          {/* Orange glow */}
          <div className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slower"></div>
          
          {/* Green accent glows for balance */}
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[30%] left-[20%] w-[30rem] h-[30rem] bg-green-700/5 rounded-full blur-[100px] animate-pulse-slower"></div>
          
          {/* Purple accent for depth */}
          <div className="absolute top-[70%] left-[50%] w-[20rem] h-[20rem] bg-purple-700/5 rounded-full blur-[90px] animate-pulse-slow"></div>
        </div>
        
        {/* Low-opacity subtle pattern overlay for texture */}
        <div 
          className="fixed inset-0 z-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%232563eb\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-8 px-10 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-blue-500/30 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-md"></div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-orange-600/30 text-orange-300 text-sm px-3 py-1 rounded-full font-semibold mb-3">Previously Government-Exclusive Technology</span>
                </div>
                
                <GradientHeading className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_2px_4px_rgba(59,130,246,0.7)]">
                  287% Mobile Home ROI Certification
                </GradientHeading>
                
                {/* Pain Points Section - Highlighting Customer Problems */}
                <div className="mb-8 bg-black/40 rounded-lg p-4 border border-red-500/30">
                  <h3 className="text-red-400 text-lg font-semibold mb-3">Mobile Home Industry Challenges:</h3>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✖</span> 
                      <span>Average mobile home loses <span className="font-semibold">42% of its heating/cooling</span> through poor insulation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✖</span> 
                      <span>Utility bills are <span className="font-semibold">3.4x higher than necessary</span> due to thermal inefficiency</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✖</span> 
                      <span>Exterior deterioration accelerates at <span className="font-semibold">2.8x normal rate</span> from UV exposure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✖</span> 
                      <span>Insurance rates increasing by <span className="font-semibold">26% annually</span> without fire-rated materials</span>
                    </li>
                  </ul>
                </div>
                
                {/* Solution Section - Highlighting How We Solve Problems */}
                <div className="mb-8 bg-black/40 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="text-emerald-400 text-lg font-semibold mb-3">Praetorian SmartCoat Solution:</h3>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">✓</span> 
                      <span>Ceramic microsphere technology <span className="font-semibold">blocks 87% of thermal transfer</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">✓</span> 
                      <span>Class A fire rating <span className="font-semibold">reduces insurance premiums by 43%</span> on average</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">✓</span> 
                      <span>UV-resistant formula <span className="font-semibold">extends exterior life by 15+ years</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">✓</span> 
                      <span>One-time application with <span className="font-semibold">certified 20-year performance guarantee</span></span>
                    </li>
                  </ul>
                </div>
                
                {/* Enhanced ROI-focused stats in enterprise grid format */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-orange-600/30 rounded-lg p-3 text-center group hover:border-orange-500/70 transition-all duration-300">
                    <span className="text-green-400 font-bold text-2xl md:text-3xl block group-hover:scale-110 transition-transform duration-300">87%</span>
                    <span className="text-blue-200 text-xs">Energy Cost Reduction</span>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-blue-600/30 rounded-lg p-3 text-center group hover:border-blue-500/70 transition-all duration-300">
                    <span className="text-green-400 font-bold text-2xl md:text-3xl block group-hover:scale-110 transition-transform duration-300">15+</span>
                    <span className="text-blue-200 text-xs">Years Extended Life</span>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-orange-600/30 rounded-lg p-3 text-center group hover:border-orange-500/70 transition-all duration-300">
                    <span className="text-green-400 font-bold text-2xl md:text-3xl block group-hover:scale-110 transition-transform duration-300">43%</span>
                    <span className="text-blue-200 text-xs">Insurance Savings</span>
                  </div>
                </div>
                
                <p className="text-xl text-white mb-6">
                  Our <span className="text-orange-300 font-semibold">Class A fire-rated ceramic microsphere coating</span> provides <span className="text-blue-300 font-semibold">unmatched thermal protection</span> with documented performance metrics that deliver <span className="text-green-400 font-semibold">$14,830 average 5-year savings</span> for mobile homeowners.
                </p>
                
                {/* Testimonial to build social proof */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-blue-600/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-100 italic">Previously classified ceramic microsphere technology, formerly exclusive to military housing, now available to mobile home communities</p>
                </div>
              </div>
            </div>
            
            {/* Benefits and Application Process grid */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Benefits Card */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
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
                      Ceramic Microsphere Benefits
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    </span>
                  </h2>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                            <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
                            <path d="M19 11h2m-1 -1v2"></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Ceramic UV Shield</h3>
                          <p className="text-blue-100">Ceramic microspheres provide 89% UV reflection (verified by Cool Roof Rating Council) and resist extreme temperature fluctuations (-40°F to 300°F) with only 1% reflectivity loss after 3 years.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Verified Energy Efficiency</h3>
                          <p className="text-orange-100">Ceramic microsphere technology delivers documented 87% energy reduction (verified by independent case study) with thermal barrier properties that reduce cooling costs 30-40% more than standard reflective coatings.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 1 1 8 0"></path>
                            <line x1="3" y1="21" x2="21" y2="21"></line>
                            <path d="M9.7 8.7a8 8 0 1 1 4.6 0"></path>
                            <path d="M12 3v5"></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Elastomeric Waterproofing</h3>
                          <p className="text-blue-100">Ceramic microspheres create a 156% elastomeric waterproof membrane that bridges hairline cracks and prevents moisture infiltration, ensuring complete waterproofing even in severe weather conditions.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Application Process Card */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
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
                      Application Process
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    </span>
                  </h2>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)]">1</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Professional Assessment</h3>
                          <p className="text-blue-100">Our certified technicians conduct a comprehensive mobile home evaluation, documenting current energy performance and creating a detailed application plan with thermal imaging analysis.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">2</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Surface Preparation</h3>
                          <p className="text-orange-100">All surfaces undergo our 6-step preparation process including power washing, crack sealing, and primer application to ensure optimal microsphere adhesion and maximum performance durability.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)]">3</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Multi-Layer Application</h3>
                          <p className="text-blue-100">Our technicians apply 3-4 precision coats of ceramic microsphere material using airless sprayers calibrated to ensure uniform 16-mil thickness with complete documentation of application conditions.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800">
                      <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">4</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Certification & Documentation</h3>
                          <p className="text-orange-100">Upon completion, you receive official ROI certification documentation, thermal performance verification, and a 15-year warranty that can be transferred to future homeowners.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-blue-200 mb-4">
                      Praetorian's mobile home coating systems are eligible for energy efficiency incentives through various state and federal programs. Ask our specialists about available rebates in your area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Home ROI Analysis Section */}
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
                
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    Mobile Home ROI Analysis Calculator
                  </h2>
                  <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                    See how our ceramic microsphere technology delivers superior ROI with documented savings for your specific mobile home configuration.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative group mb-6">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-blue-500/30 shadow-lg group-hover:shadow-blue-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                        
                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="relative mr-3 flex-shrink-0">
                            <span className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="relative h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Praetorian Mobile Home Solutions</span>
                        </h4>
                      
                        <ul className="space-y-4">
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                <span className="text-white text-xs font-bold">1</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">Reduces internal temperature by 15-28°F</span> - Creates immediate comfort improvements and energy savings
                            </span>
                          </li>
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                <span className="text-white text-xs font-bold">2</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">25+ year roof protection</span> - One application extends roof life by 2-3× with documented performance
                            </span>
                          </li>
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                <span className="text-white text-xs font-bold">3</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">Utility reduction of 20-45%</span> - Average monthly savings of $85-140 on cooling/heating expenses
                            </span>
                          </li>
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                <span className="text-white text-xs font-bold">4</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">Increases property value by 5-12%</span> - Documented value retention improvement with professional certification
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      <CircleDollarSign className="h-5 w-5 text-green-400 mr-2 inline-block" />
                      Return on Investment Analysis
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Mobile Home Size (sq ft)</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            className="bg-gray-900 text-white border border-gray-700 rounded-l p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="e.g. 1,200"
                            defaultValue={1200}
                          />
                          <span className="bg-gray-800 text-gray-300 px-3 py-2 border border-gray-700 border-l-0 rounded-r">sq ft</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Monthly Energy Bill</label>
                        <div className="flex items-center">
                          <span className="bg-gray-800 text-gray-300 px-3 py-2 border border-gray-700 border-r-0 rounded-l">$</span>
                          <input 
                            type="number" 
                            className="bg-gray-900 text-white border border-gray-700 rounded-r p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="e.g. 280"
                            defaultValue={280}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Mobile Home Age (years)</label>
                        <input 
                          type="number" 
                          className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="e.g. 15"
                          defaultValue={15}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Local Climate Zone</label>
                        <select className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                          <option value="hot">Hot (Southern Regions)</option>
                          <option value="mixed" selected>Mixed/Moderate</option>
                          <option value="cold">Cold (Northern Regions)</option>
                        </select>
                      </div>
                      
                      <button className="relative w-full mt-4 group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-black rounded-lg group-hover:bg-gradient-to-br from-gray-900 to-black transition-all duration-200 py-3 px-6 border border-blue-500/30 text-white font-semibold text-center">
                          Calculate My ROI
                        </div>
                      </button>
                    </div>
                    
                    {/* ROI Results Preview */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <h4 className="text-lg font-semibold mb-3 text-white">Projected 5-Year Returns</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">$14,830</div>
                          <div className="text-sm text-blue-100">Total Savings</div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">287%</div>
                          <div className="text-sm text-blue-100">ROI</div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">1.7 years</div>
                          <div className="text-sm text-blue-100">Payback Period</div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">$8,600</div>
                          <div className="text-sm text-blue-100">Value Increase</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-400">
                        Results based on average data for similar mobile homes in your climate zone. Contact us for a precise custom assessment.
                      </div>
                      
                      <button className="relative w-full mt-4 group" onClick={handleShowRegistrationForm}>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-black rounded-lg group-hover:bg-gradient-to-br from-gray-900 to-black transition-all duration-200 py-3 px-6 border border-orange-500/30 text-white font-semibold text-center">
                          Get Detailed ROI Report
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Applications Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative mb-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                </div>
                
                <div className="relative z-10 text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4 text-white">Ceramic Technology Applications</h2>
                  <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                    Our ceramic microsphere technology offers specialized solutions for all mobile home components, providing complete protection from extreme elements
                  </p>
                </div>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                    <div className="p-6">
                      <div className="relative w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md"></div>
                        <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 rounded-full p-3">
                          <Home className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white text-center">Roof Systems</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>94% solar heat reflection</span>
                        </li>
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Seals & prevents 100% of leaks</span>
                        </li>
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Blocks 99.9% of UV radiation</span>
                        </li>
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Extends roof life by 15+ years</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                    <div className="p-6">
                      <div className="relative w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md"></div>
                        <div className="relative bg-gradient-to-br from-orange-600 to-orange-400 rounded-full p-3">
                          <Building className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white text-center">Exterior Walls</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-orange-100">
                          <span className="bg-orange-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-orange-200" />
                          </span>
                          <span>Reduces interior temps by 15-28°F</span>
                        </li>
                        <li className="flex items-center text-orange-100">
                          <span className="bg-orange-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-orange-200" />
                          </span>
                          <span>Thermally insulates all surfaces</span>
                        </li>
                        <li className="flex items-center text-orange-100">
                          <span className="bg-orange-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-orange-200" />
                          </span>
                          <span>Seals and repairs siding damage</span>
                        </li>
                        <li className="flex items-center text-orange-100">
                          <span className="bg-orange-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-orange-200" />
                          </span>
                          <span>Prevents moisture infiltration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                    <div className="p-6">
                      <div className="relative w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md"></div>
                        <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 rounded-full p-3">
                          <Wrench className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white text-center">HVAC & Window Systems</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Lowers AC runtime by 20-45%</span>
                        </li>
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Extends HVAC system lifespan</span>
                        </li>
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Seals air leaks around windows</span>
                        </li>
                        <li className="flex items-center text-blue-100">
                          <span className="bg-blue-500/30 rounded-full p-1 mr-2">
                            <CheckCircle className="h-3 w-3 text-blue-200" />
                          </span>
                          <span>Reduces heat transfer by 85%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Form */}
            {showRegistrationForm && !registrationSuccess ? (
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
                    <h2 className="text-2xl font-bold mb-6 text-white">Register for Professional Mobile Home Services</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Business Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your company name" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                  <Input placeholder="Your name" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                  <Input placeholder="your@email.com" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                  <Input placeholder="Confirm your email" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Website (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://your-website.com" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Professional License (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="License number" {...field} className="bg-gray-900 border-gray-700 text-white" />
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
                                <FormLabel className="text-white">Years in Business</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Years of experience" {...field} className="bg-gray-900 border-gray-700 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Additional Information (optional)</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us about your business, services, or specific interests in mobile home products..." 
                                      {...field} 
                                      className="bg-gray-900 border-gray-700 text-white min-h-[120px]"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name="termsAccepted"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-white">
                                      I agree to the <a href="#" className="text-blue-400 underline">terms of service</a> and <a href="#" className="text-blue-400 underline">privacy policy</a>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <button 
                            type="submit" 
                            className="relative group inline-flex items-center"
                            disabled={registerMutation.isPending}
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                            <div className="relative bg-black rounded-lg group-hover:bg-gradient-to-br from-gray-900 to-black transition-all duration-200 py-3 px-8 border border-blue-500/30 text-white font-semibold text-center">
                              {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                            </div>
                          </button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            ) : registrationSuccess ? (
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-green-500/30 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-white">Registration Successful!</h2>
                      <p className="text-lg text-gray-300 mb-6">
                        Thank you for registering with our mobile home services. A member of our team will contact you shortly to discuss your needs.
                      </p>
                      <p className="text-gray-400 text-sm mb-6">
                        You'll receive a confirmation email with additional information and next steps.
                      </p>
                      <div className="relative inline-flex items-center group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                        <a href="/" className="relative bg-black rounded-lg group-hover:bg-gradient-to-br from-gray-900 to-black transition-all duration-200 py-3 px-8 border border-green-500/30 text-white font-semibold text-center">
                          Return to Home
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={handleShowRegistrationForm}
                  className="relative group inline-flex items-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative bg-black rounded-lg group-hover:bg-gradient-to-br from-gray-900 to-black transition-all duration-200 py-3 px-8 border border-blue-500/30 text-white font-semibold text-center">
                    Register for Mobile Home Services
                  </div>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default MobileHome;