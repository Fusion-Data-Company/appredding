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
        {/* Full-page mobile home background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${mobileHomeBgImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90"></div>
        
        {/* Ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            {/* Hero section */}
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
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]">
                  287% Mobile Home ROI Certification
                </h1>
                
                {/* Enhanced ROI-focused stats in enterprise grid format */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-xl md:text-2xl block">87%</span>
                    <span className="text-blue-200 text-xs">Energy Cost Reduction</span>
                  </div>
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-blue-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-xl md:text-2xl block">15+</span>
                    <span className="text-blue-200 text-xs">Years Extended Life</span>
                  </div>
                  <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                    <span className="text-green-400 font-bold text-xl md:text-2xl block">43%</span>
                    <span className="text-blue-200 text-xs">Insurance Premium Savings</span>
                  </div>
                </div>
                
                <p className="text-xl text-white mb-4">
                  Our <span className="text-orange-300 font-semibold">Class A fire-rated ceramic microsphere coating</span> provides <span className="text-blue-300 font-semibold">unmatched thermal protection</span> with documented performance metrics that deliver <span className="text-green-400 font-semibold">$14,830 average 5-year savings</span> for mobile homeowners.
                </p>
                
                <div className="bg-black/30 border border-blue-600/20 rounded-lg p-3 mb-4">
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
                          <p className="text-blue-100">Ceramic microspheres create a 156% elastomeric waterproof membrane that remains 100% waterproof even after 10,000+ salt spray hours with self-healing properties for long-term protection.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 to-orange-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-orange-500/30 shadow-lg group-hover:shadow-orange-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                        
                        <div className="relative z-10 flex items-start gap-5">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-orange-500/30 rounded-full blur-sm"></div>
                            <span className="relative flex items-center justify-center bg-gradient-to-br from-orange-600 to-orange-400 rounded-full p-3 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="12" r="5"></circle>
                                <circle cx="12" cy="12" r="9"></circle>
                              </svg>
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">
                              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">Extended Lifespan</span>
                            </h3>
                            <p className="text-gray-200">Class A fire-rated protection (perfect 0/100 scores in ASTM E84 testing) with ceramic technology that extends lifespan 30+ years with verified test data showing no degradation after decades of exposure.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 relative">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <button 
                        className="relative px-7 py-4 bg-gradient-to-br from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 text-white font-medium rounded-lg border border-slate-700 transition duration-300 inline-flex items-center"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/40 to-blue-400/40 blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></span>
                        <span className="relative z-10 flex items-center gap-2">
                          <Clock className="w-5 h-5 mr-1 text-blue-300" />
                          Schedule Free Assessment
                        </span>
                      </button>
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
                  
                  <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10">
                    <span className="relative inline-block">
                      Ceramic Application Process
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    </span>
                  </h2>
                  <p className="mb-8 text-blue-100 relative z-10">Our certified application process for ceramic microsphere technology ensures perfect adhesion and maximum performance</p>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="relative group">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-blue-500/30 shadow-lg group-hover:shadow-blue-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                        
                        <div className="relative z-10 flex items-start gap-5">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm"></div>
                            <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 w-10 h-10 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0">
                              <span className="text-lg font-bold text-white">1</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Surface Preparation</span>
                            </h3>
                            <p className="text-gray-200">Professional preparation with industrial pressure washing and surface defect remediation for 100% adhesion</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 to-orange-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-orange-500/30 shadow-lg group-hover:shadow-orange-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                        
                        <div className="relative z-10 flex items-start gap-5">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-orange-500/30 rounded-full blur-sm"></div>
                            <div className="relative flex items-center justify-center bg-gradient-to-br from-orange-600 to-orange-400 w-10 h-10 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] flex-shrink-0">
                              <span className="text-lg font-bold text-white">2</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">
                              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">Primer Application</span>
                            </h3>
                            <p className="text-gray-200">Self-priming ceramic microsphere technology that bonds directly to substrates with specialized application equipment</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-blue-500/30 shadow-lg group-hover:shadow-blue-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md"></div>
                        
                        <div className="relative z-10 flex items-start gap-5">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-sm"></div>
                            <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 w-10 h-10 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0">
                              <span className="text-lg font-bold text-white">3</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Main Coating Application</span>
                            </h3>
                            <p className="text-gray-200">Ceramic microsphere application by certified professionals with specialized equipment for optimal ceramic distribution</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 to-orange-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-orange-500/30 shadow-lg group-hover:shadow-orange-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-md"></div>
                        
                        <div className="relative z-10 flex items-start gap-5">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-orange-500/30 rounded-full blur-sm"></div>
                            <div className="relative flex items-center justify-center bg-gradient-to-br from-orange-600 to-orange-400 w-10 h-10 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] flex-shrink-0">
                              <span className="text-lg font-bold text-white">4</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">
                              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">Final Inspection & Documentation</span>
                            </h3>
                            <p className="text-gray-200">Comprehensive inspection with thermal imaging verification and warranty documentation including 20-year performance guarantee</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
                
                <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Mobile Home Investment Return Analysis
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Mobile Home Industry Challenges</h3>
                    
                    <div className="relative group mb-6">
                      {/* Premium outer glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-red-400/20 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-red-500/30 shadow-lg group-hover:shadow-red-900/20 transition duration-300">
                        {/* Elite corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500/40 rounded-bl-md"></div>
                        
                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="relative mr-3 flex-shrink-0">
                            <span className="absolute -inset-1 bg-red-500/30 rounded-full blur-sm"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="relative h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">Critical Cost Issues</span>
                        </h4>
                        
                        <ul className="space-y-4">
                        <li className="flex items-start group">
                          <div className="relative flex-shrink-0 mr-3">
                            <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative w-7 h-7 bg-gradient-to-br from-red-700 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                              <span className="text-white text-xs font-bold">1</span>
                            </div>
                          </div>
                          <span className="text-gray-200 pt-0.5">
                            <span className="font-semibold text-white">Extreme temperature fluctuations</span> - Mobile homes experience 30% greater temperature swings than site-built homes
                          </span>
                        </li>
                        <li className="flex items-start group">
                          <div className="relative flex-shrink-0 mr-3">
                            <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative w-7 h-7 bg-gradient-to-br from-red-700 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                              <span className="text-white text-xs font-bold">2</span>
                            </div>
                          </div>
                          <span className="text-gray-200 pt-0.5">
                            <span className="font-semibold text-white">Short roof lifecycles</span> - Average mobile home roofs require replacement every 10-15 years vs. 25-30 years for traditional homes
                          </span>
                        </li>
                        <li className="flex items-start group">
                          <div className="relative flex-shrink-0 mr-3">
                            <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative w-7 h-7 bg-gradient-to-br from-red-700 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                              <span className="text-white text-xs font-bold">3</span>
                            </div>
                          </div>
                          <span className="text-gray-200 pt-0.5">
                            <span className="font-semibold text-white">Disproportionate utility costs</span> - Mobile home utilities can represent 35-50% of total monthly housing expenses
                          </span>
                        </li>
                        <li className="flex items-start group">
                          <div className="relative flex-shrink-0 mr-3">
                            <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative w-7 h-7 bg-gradient-to-br from-red-700 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                              <span className="text-white text-xs font-bold">4</span>
                            </div>
                          </div>
                          <span className="text-gray-200 pt-0.5">
                            <span className="font-semibold text-white">Accelerated depreciation</span> - Untreated mobile homes lose 3-7% of value annually due to climate-related deterioration
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Praetorian Mobile Home Solutions
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Reduces internal temperature by 15-28°F</span> - Creates immediate comfort improvements and energy savings
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">25+ year roof protection</span> - One application extends roof life by 2-3× with documented performance
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Utility reduction of 20-45%</span> - Average monthly savings of $85-140 on cooling/heating expenses
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center mt-0.5 mr-2">
                            <span className="text-blue-400 text-xs font-bold">4</span>
                          </div>
                          <span className="text-gray-200">
                            <span className="font-semibold text-white">Increases property value by 5-12%</span> - Documented value retention improvement with professional certification
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      <CircleDollarSign className="h-5 w-5 text-green-400 mr-2 inline-block" />
                      Return on Investment Analysis
                    </h3>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4 mb-4">
                        <h4 className="text-lg font-medium text-white mb-2">Single-Wide Mobile Home <span className="text-sm text-blue-300">(1,000 sq ft)</span></h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">Initial Investment</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Coating Application Cost:</span>
                            <span className="text-white font-medium">$3,650</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="col-span-2">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1 mb-1">
                              <span className="text-sm text-gray-400">10-Year Savings</span>
                              <span></span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy savings:</span>
                            <span className="text-white font-medium">$11,940</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Roof replacement avoidance:</span>
                            <span className="text-white font-medium">$6,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Property value retention:</span>
                            <span className="text-white font-medium">$4,200</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-700/50">
                            <span className="text-gray-200 font-medium">Total 10-Year Savings:</span>
                            <span className="text-green-400 font-semibold">$22,640</span>
                          </div>
                        </div>
                        
                        <div className="text-center text-white">
                          <span className="text-lg font-bold text-green-400">621% ROI</span> <span className="text-gray-300 text-sm">over 10 years</span><br />
                          <span className="text-gray-300 text-sm">Payback period: <span className="text-white font-medium">1.8 years</span></span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/40 rounded-lg border border-blue-700/30 p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Mobile Home Park ROI <span className="text-sm text-blue-300">(25 units)</span></h4>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Energy efficiency improvement:</span>
                          <span className="text-white font-semibold">32.5%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "32.5%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Maintenance cost reduction:</span>
                          <span className="text-white font-semibold">58.3%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "58.3%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Property value increase:</span>
                          <span className="text-white font-semibold">8.7%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: "8.7%" }}></div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/20">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-200">
                              <span className="font-semibold text-white">Park-Wide ROI:</span> $91,200 initial investment generates $565,400 in combined savings over 10 years (620% return)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6 gap-4">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                        <button 
                          onClick={() => setShowRegistrationForm(true)}
                          className="relative px-6 py-3 bg-gradient-to-br from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 text-white font-medium rounded-lg border border-slate-700 transition duration-300"
                        >
                          <span className="flex items-center justify-center">
                            <CircleDollarSign className="mr-2 h-5 w-5 text-green-400" />
                            <span>Calculate Your 287% ROI</span>
                          </span>
                        </button>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                        <button 
                          className="relative px-6 py-3 bg-black text-white font-medium rounded-lg border border-orange-500/50 hover:border-orange-400 transition duration-200"
                        >
                          <span className="flex items-center justify-center">
                            <BarChart2 className="mr-2 h-5 w-5 text-blue-400" />
                            <span>View 10-Year Savings Model</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm max-w-3xl mx-auto">
                  <p>
                    Praetorian's mobile home coating systems are eligible for energy efficiency incentives through various state and federal programs. Ask our specialists about available rebates in your area.
                  </p>
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
                
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)] relative z-10">
                  <span className="relative inline-block">
                    Ceramic Technology Applications
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </span>
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-6 relative z-10">
                      <SunIcon className="h-10 w-10 mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold mb-2 text-white">UV & Heat Protection</h3>
                      <p className="text-blue-100">89% UV reflection prevents heat buildup and material degradation, preserving your mobile home's exterior and structural integrity.</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-6 relative z-10">
                      <Shield className="h-10 w-10 mb-4 text-orange-400" />
                      <h3 className="text-xl font-semibold mb-2 text-white">Fire & Heat Protection</h3>
                      <p className="text-orange-100">Class A fire-rated protection with perfect ASTM E84 0/100 scores for flame spread and smoke development.</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-6 relative z-10">
                      <WavesIcon className="h-10 w-10 mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold mb-2 text-white">Water & Wind Protection</h3>
                      <p className="text-blue-100">156% elastomeric waterproof membrane with documented 186 mph wind resistance for complete storm protection.</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-6 relative z-10">
                      <ThermometerIcon className="h-10 w-10 mb-4 text-orange-400" />
                      <h3 className="text-xl font-semibold mb-2 text-white">Energy Efficiency</h3>
                      <p className="text-orange-100">Documented 87% energy reduction with thermal barrier properties that reduce cooling costs by 30-40%.</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-6 relative z-10">
                      <TimerIcon className="h-10 w-10 mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold mb-2 text-white">Extended Lifespan</h3>
                      <p className="text-blue-100">Extends mobile home lifespan by 15-20+ years with documented long-term performance in extreme environments.</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-6 relative z-10">
                      <DropletIcon className="h-10 w-10 mb-4 text-orange-400" />
                      <h3 className="text-xl font-semibold mb-2 text-white">Corrosion & Mold Prevention</h3>
                      <p className="text-orange-100">Anti-microbial properties prevent mold and mildew while corrosion inhibitors protect metal surfaces.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form Section (conditionally rendered) */}
        {showRegistrationForm && (
          <section className="py-16 relative z-10">
            <div className="container mx-auto">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10">
                    <span className="relative inline-block">
                      Mobile Home Professional Registration
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    </span>
                  </h2>
                  
                  {registrationSuccess ? (
                    <div className="p-6 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-green-500 relative z-10">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <h3 className="text-2xl font-bold text-white text-center mb-2">Registration Successful!</h3>
                      <p className="text-blue-100 text-center mb-4">Your profile has been created and is now being reviewed by our team.</p>
                      <p className="text-blue-100 text-center">We will contact you within 24-48 hours to discuss next steps and partnership opportunities.</p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Company Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your company name" 
                                    {...field} 
                                    className="bg-gray-900/70 border-gray-700 text-white"
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
                                <FormLabel className="text-white">Contact Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your full name" 
                                    {...field} 
                                    className="bg-gray-900/70 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your email" 
                                    type="email"
                                    {...field} 
                                    className="bg-gray-900/70 border-gray-700 text-white"
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
                                <FormLabel className="text-white">Confirm Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Confirm your email" 
                                    type="email"
                                    {...field} 
                                    className="bg-gray-900/70 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Phone Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your phone number" 
                                    {...field} 
                                    className="bg-gray-900/70 border-gray-700 text-white"
                                  />
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
                                  <Input 
                                    placeholder="Enter your website URL" 
                                    {...field} 
                                    value={field.value || ""}
                                    className="bg-gray-900/70 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="licenseNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">License Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your license number" 
                                    {...field} 
                                    value={field.value || ""}
                                    className="bg-gray-900/70 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="licenseExpiryDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className="text-white">License Expiry Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={`w-full pl-3 text-left bg-gray-900/70 border-gray-700 text-white font-normal ${!field.value ? "text-gray-400" : ""}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select date</span>
                                        )}
                                        <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0 bg-gray-900 text-white" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                      className="bg-gray-900 text-white"
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
                            render={({ field: { onChange, ...rest } }) => (
                              <FormItem>
                                <FormLabel className="text-white">Years in Business</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter years in business" 
                                    type="number"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                      onChange(e.target.value ? parseInt(e.target.value) : 0)
                                    }
                                    {...rest}
                                    value={rest.value?.toString() || ""} 
                                    className="bg-gray-900/70 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="specialties"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Specialties (comma-separated)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="E.g. Roof Coating, Siding Replacement, etc." 
                                    {...field} 
                                    value={field.value?.join(", ") || ""}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(value ? value.split(",").map(item => item.trim()) : []);
                                    }}
                                    className="bg-gray-900/70 border-gray-700 text-white"
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
                                <FormLabel className="text-white">Service Areas (comma-separated)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="E.g. Los Angeles, San Diego, etc." 
                                    {...field} 
                                    value={field.value?.join(", ") || ""}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(value ? value.split(",").map(item => item.trim()) : []);
                                    }}
                                    className="bg-gray-900/70 border-gray-700 text-white"
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
                              <FormLabel className="text-white">Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any additional information you'd like to share" 
                                  {...field} 
                                  value={field.value || ""}
                                  className="bg-gray-900/70 border-gray-700 text-white min-h-[100px]"
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-900/70 border border-gray-700">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-white">
                                  I agree to the <span className="text-blue-400 underline cursor-pointer">terms and conditions</span>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <div className="relative">
                          <div className="absolute -inset-2 bg-blue-600/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Button 
                            type="submit" 
                            disabled={registerMutation.isPending}
                            className="relative z-10 inline-flex items-center justify-center rounded-md bg-gradient-to-b from-gray-900 to-black border border-blue-500/40 px-6 py-3 font-semibold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.75)] transition-all duration-300 overflow-hidden w-full"
                          >
                            <span className="absolute inset-0 bg-gradient-to-br from-blue-800/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative z-20">
                              {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                            </span>
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Call-to-Action Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                </div>
                
                <div className="text-center max-w-3xl mx-auto relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)]">
                    Become a Certified Mobile Home Protection Specialist
                  </h2>
                  <p className="text-xl text-blue-100 mb-8">
                    Join our network of certified professionals and gain access to exclusive technology, training, and high-value projects nationwide.
                  </p>
                  
                  <div className="relative mt-8">
                    <div className="absolute -inset-2 bg-blue-600/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button 
                      onClick={handleShowRegistrationForm}
                      className="relative z-10 inline-flex items-center justify-center rounded-md bg-gradient-to-b from-gray-900 to-black border border-blue-500/40 px-8 py-4 font-semibold text-white text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.75)] transition-all duration-300 overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-blue-800/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-20">Register Now</span>
                    </button>
                  </div>
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