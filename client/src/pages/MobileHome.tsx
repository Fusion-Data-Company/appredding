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
import { PremiumArrowButton, PremiumActionButton, PremiumFireButton, PremiumCartButton } from "@/utils/premium-buttons";
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
  
  const calculateROI = () => {
    // Calculate the ROI based on inputs and show the results section
    const roiResultsElement = document.getElementById('roiResults');
    if (roiResultsElement) {
      roiResultsElement.scrollIntoView({ behavior: 'smooth' });
      roiResultsElement.classList.remove('opacity-0');
      roiResultsElement.classList.add('opacity-100');
    }
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-blue-500/20 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
              
              {/* Ultra-premium enterprise header with layered effects */}
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-10 px-12 rounded-xl border border-blue-600/50 shadow-[0_10px_50px_rgba(59,130,246,0.3)]">
                {/* Glass shimmer effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-br from-blue-600/10 to-transparent rounded-t-xl opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-blue-900/20 to-transparent rounded-b-xl"></div>
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                </div>
                
                {/* Premium Corner Accents */}
                <div className="absolute top-0 left-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-400/40 rounded-tl-md"></div>
                  <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500/40 rounded-full blur-[3px] animate-pulse-slow"></div>
                </div>
                <div className="absolute top-0 right-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/60 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-400/40 rounded-tr-md"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500/40 rounded-full blur-[3px] animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/60 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-400/40 rounded-br-md"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-blue-500/40 rounded-full blur-[3px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="absolute bottom-0 left-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/60 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-400/40 rounded-bl-md"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 bg-blue-500/40 rounded-full blur-[3px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                <div className="mb-4 relative">
                  <span className="inline-block bg-blue-900/60 text-blue-200 text-sm px-4 py-1.5 rounded-full font-semibold mb-3 border border-blue-500/30 shadow-[0_2px_10px_rgba(29,78,216,0.3)]">Previously Government-Exclusive Technology</span>
                </div>
                
                <GradientHeading className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_2px_4px_rgba(59,130,246,0.7)]">
                  Transform Your Mobile Home, Cut Costs & Extend Life
                </GradientHeading>
                
                {/* SANDLER STAGE 1: IDENTIFY THE PAINS */}
                <div className="mb-10 relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 via-blue-500/10 to-red-600/10 rounded-xl blur-md opacity-80"></div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Are These Mobile Home Problems Costing You Money?
                  </h2>
                  
                  <p className="text-lg text-white leading-relaxed mb-6">
                    Mobile homes present unique challenges in energy efficiency, comfort, and longevity. Every day, owners face frustrating issues that drain their wallets and decrease quality of life.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">Have you ever dreaded opening your utility bill</span> during extreme weather? The average mobile home loses <span className="font-semibold text-red-300">42% of its heating and cooling</span> through poor insulation, making your HVAC system work overtime and sending your bills skyrocketing to <span className="font-semibold text-red-300">3.4x higher than necessary</span>.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">What happens to your home's exterior</span> year after year? UV damage causes deterioration at <span className="font-semibold text-red-300">2.8x the normal rate</span>, leading to costly repairs and decreased property value. And without fire-rated materials, insurance companies are raising rates by <span className="font-semibold text-red-300">26% annually</span> - eating away at your budget.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">Do you find yourself constantly adjusting the thermostat</span> because some rooms are too hot while others are too cold? Temperature fluctuations make consistent comfort impossible, leading to both discomfort and wasted energy as you try to compensate.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-6 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-full mr-3 mt-1.5"></div>
                      <p className="text-base text-gray-200">
                        <span className="text-white font-medium">Have you calculated how much money you're losing</span> to these inefficiencies? The average mobile home owner wastes <span className="font-semibold text-red-300">$1,870 annually</span> in unnecessary energy costs and premature maintenance – that's over $18,700 in a decade that could be going toward other priorities.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-base text-red-200 font-medium">
                    These problems affect virtually every mobile home in America, draining owners' finances while making daily living less comfortable. The traditional approach of patching with conventional materials simply isn't working – it's a costly cycle with diminishing returns.
                  </p>
                </div>
                
                {/* SANDLER STAGE 2: PRESENT SOLUTIONS */}
                <div className="relative mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 via-green-500/20 to-green-600/20 rounded-xl blur-md opacity-80"></div>
                  
                  <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
                    <div className="absolute -top-4 left-8 px-6 py-1 bg-gradient-to-r from-green-900/90 to-green-700/90 rounded-full border border-green-400/30 shadow-lg shadow-green-900/20">
                      <span className="text-green-200 font-semibold">PROVEN SOLUTION</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl text-white font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-emerald-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      Praetorian Smart-Coat – Advanced Mobile Home Protection
                    </h2>
                    
                    <p className="text-lg text-white leading-relaxed mb-6">
                      Our NASA-derived ceramic coating technology isn't just paint – it's a complete thermal and protective barrier system specifically engineered for mobile homes:
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-green-500/20 rounded-xl transition-all duration-300 hover:border-green-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-2 bg-green-900/50 rounded-lg border border-green-500/30">
                              <SunIcon className="w-6 h-6 text-green-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-green-400 mb-2">Thermal Barrier Technology</h3>
                            <p className="text-gray-200">
                              Our ceramic microsphere coating creates a powerful thermal barrier that reduces heat transfer by up to 92%. Unlike conventional insulation that degrades quickly in mobile homes, our coating maintains its effectiveness for decades, providing consistent temperature control throughout your home while dramatically cutting energy consumption.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-green-500/20 rounded-xl transition-all duration-300 hover:border-green-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-2 bg-green-900/50 rounded-lg border border-green-500/30">
                              <Shield className="w-6 h-6 text-green-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-green-400 mb-2">Fire-Rated Protection</h3>
                            <p className="text-gray-200">
                              Praetorian Smart-Coat is certified Class A fire resistant (ASTM E84), creating a non-combustible barrier that protects your home from fire hazards. This certification not only improves safety but can reduce insurance premiums by up to 17% annually. In mobile home parks where fire can spread rapidly, this protection is invaluable.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-green-500/20 rounded-xl transition-all duration-300 hover:border-green-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-2 bg-green-900/50 rounded-lg border border-green-500/30">
                              <DropletIcon className="w-6 h-6 text-green-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-green-400 mb-2">Advanced UV & Weather Protection</h3>
                            <p className="text-gray-200">
                              Our coating includes advanced UV inhibitors that shield your mobile home's exterior from sun damage, preventing the accelerated deterioration that plagues most mobile homes. The waterproof, flexible barrier also protects against moisture intrusion and mold growth, extending your home's exterior life by 15+ years while maintaining its appearance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-white leading-relaxed italic">
                      Praetorian Smart-Coat isn't just about immediate benefits – it's a long-term investment in your mobile home's value, efficiency, and longevity, providing comprehensive protection against the elements year after year.
                    </p>
                  </div>
                </div>
                
                {/* Enhanced ROI-focused stats with premium green styling */}
                <div className="relative mb-8">
                  {/* Enhanced green ambient glow for ROI section */}
                  <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                  <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                  
                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <SunIcon className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-2xl md:text-3xl block group-hover:scale-110 transition-transform duration-300">87%</span>
                      <span className="text-blue-200 text-xs">Energy Cost Reduction</span>
                    </div>
                    <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <Clock className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-2xl md:text-3xl block group-hover:scale-110 transition-transform duration-300">15+</span>
                      <span className="text-blue-200 text-xs">Years Extended Life</span>
                    </div>
                    <div className="bg-gray-900/60 p-3 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)] text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                          <Shield className="w-4 h-4 text-green-100" />
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-2xl md:text-3xl block group-hover:scale-110 transition-transform duration-300">43%</span>
                      <span className="text-blue-200 text-xs">Insurance Savings</span>
                    </div>
                  </div>
                </div>
                
                {/* SANDLER STAGE 3: HIGHLIGHT BENEFITS */}
                <div className="relative mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-600/20 rounded-xl blur-md opacity-80"></div>
                  
                  <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
                    <div className="absolute -top-4 left-8 px-6 py-1 bg-gradient-to-r from-blue-900/90 to-blue-700/90 rounded-full border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <span className="text-blue-200 font-semibold">MEASURABLE BENEFITS</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl text-white font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      Real Results for Your Mobile Home
                    </h2>
                    
                    <p className="text-lg text-white leading-relaxed mb-6">
                      When you choose Praetorian Smart-Coat for your mobile home, the benefits extend far beyond just aesthetics:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-blue-500/20 rounded-xl transition-all duration-300 hover:border-blue-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative">
                          <div className="mb-3">
                            <CircleDollarSign className="w-8 h-8 text-blue-400" />
                          </div>
                          <h3 className="font-bold text-xl text-blue-400 mb-2">Dramatic Cost Savings</h3>
                          <p className="text-gray-200">
                            The average mobile home owner saves $842 annually on energy bills after applying our coating. Over 10 years, that's $8,420 back in your pocket. Add reduced maintenance costs and you're looking at a 243% return on your investment – money that would otherwise be wasted on inefficient heating/cooling and constant repairs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-blue-500/20 rounded-xl transition-all duration-300 hover:border-blue-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative">
                          <div className="mb-3">
                            <TimerIcon className="w-8 h-8 text-blue-400" />
                          </div>
                          <h3 className="font-bold text-xl text-blue-400 mb-2">Extended Home Life & Value</h3>
                          <p className="text-gray-200">
                            Mobile homes typically depreciate quickly, but our coating system adds 15+ years to your home's lifespan while increasing its resale value. The protective barrier prevents the most common causes of deterioration – weather damage, UV exposure, and temperature fluctuations – preserving your investment for years to come.
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-blue-500/20 rounded-xl transition-all duration-300 hover:border-blue-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative">
                          <div className="mb-3">
                            <BadgeCheck className="w-8 h-8 text-blue-400" />
                          </div>
                          <h3 className="font-bold text-xl text-blue-400 mb-2">Improved Comfort & Safety</h3>
                          <p className="text-gray-200">
                            Say goodbye to temperature fluctuations and hot/cold spots. Our coating creates a consistent indoor climate year-round, making your home more comfortable no matter the weather outside. The fire-resistant properties add an essential layer of safety, protecting your family and possessions from unexpected dangers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative group p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-blue-500/20 rounded-xl transition-all duration-300 hover:border-blue-500/40">
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative">
                          <div className="mb-3">
                            <Wrench className="w-8 h-8 text-blue-400" />
                          </div>
                          <h3 className="font-bold text-xl text-blue-400 mb-2">Maintenance-Free Protection</h3>
                          <p className="text-gray-200">
                            Our one-time application provides decades of protection without the need for regular maintenance or reapplication. Unlike traditional mobile home coatings that need refreshing every 2-3 years, Praetorian's ceramic shield creates a permanent barrier that stands the test of time – saving you from the endless cycle of repairs.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xl text-white mb-4 text-center">
                      Our <span className="text-orange-300 font-semibold">Class A fire-rated ceramic microsphere coating</span> provides <span className="text-blue-300 font-semibold">unmatched thermal protection</span> with documented performance metrics that deliver <span className="text-green-400 font-semibold">$14,830 average 5-year savings</span> for mobile homeowners.
                    </p>
                  </div>
                </div>
                
                {/* SANDLER STAGE 4: FUNNEL CLOSE + REGISTRATION */}
                <div className="mt-8 p-6 relative bg-gradient-to-br from-black/60 to-gray-900/60 border-2 border-green-600/40 rounded-xl transition-all duration-300 mb-8">
                  <div className="absolute -inset-px bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 rounded-xl opacity-70 blur-sm"></div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Transform Your Mobile Home Today</h3>
                  
                  <p className="text-lg text-gray-100 mb-6 text-center">
                    Stop throwing money away on skyrocketing energy bills and endless repairs. Praetorian Smart-Coat gives you a more comfortable, valuable, and protected home while saving you thousands of dollars over time.
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    {/* Ambient blue-to-orange gradient glow wrapper around the button without affecting the button itself */}
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                      <div className="relative">
                        <PremiumActionButton
                          onClick={() => document.getElementById('mobileHomeForm')?.scrollIntoView({ behavior: 'smooth' })}
                          size="lg"
                          className="text-lg font-bold px-8 transform transition-all duration-300 hover:scale-105"
                          glowEffect={true}
                        >
                          Get Your Mobile Home Certified Today
                        </PremiumActionButton>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 text-center">
                    Our mobile home specialists will assess your needs, provide a detailed cost analysis showing your expected ROI, and schedule your installation – all at no obligation.
                  </p>
                </div>
                
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
                          <p className="text-orange-100">Upon completion, you receive official ROI certification documentation, thermal performance verification, and a 10-year warranty that can be transferred to future homeowners.</p>
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
                      
                      {/* Ambient blue-to-orange gradient glow wrapper around the button without affecting the button itself */}
                      <div className="relative mt-4">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                        <div className="relative">
                          <PremiumFireButton 
                            className="w-full transform hover:scale-105 transition-transform duration-300"
                            size="lg"
                            glowEffect={true}
                            onClick={() => calculateROI()}
                          >
                            Calculate My ROI
                          </PremiumFireButton>
                        </div>
                      </div>
                    </div>
                    
                    {/* ROI Results Preview with Enhanced Green Glow */}
                    <div className="mt-6 pt-6 border-t border-gray-700 relative">
                      {/* Prominent ambient green glow for ROI section */}
                      <div className="absolute -inset-3 bg-green-500/30 rounded-xl blur-xl opacity-70 z-0"></div>
                      <div className="absolute -inset-6 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                      <div className="absolute -inset-10 bg-green-600/10 rounded-xl blur-3xl opacity-40 z-0"></div>
                      
                      <div className="relative z-10">
                        <h4 className="text-xl font-bold mb-4 text-white bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          Projected 5-Year Returns
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative bg-gray-900/80 border-2 border-green-500/60 rounded-lg p-4 overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                            {/* Enhanced glowing effect */}
                            <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-md opacity-70 -z-10 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg opacity-70 -z-10"></div>
                            
                            {/* Subtle glass shimmer */}
                            <div className="absolute inset-0 overflow-hidden rounded-lg -z-10">
                              <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-green-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                            </div>
                            
                            <div className="text-xl font-bold text-green-400" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>$14,830</div>
                            <div className="text-sm text-gray-300" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Total Savings</div>
                          </div>
                          <div className="relative bg-gray-900/80 border-2 border-green-500/60 rounded-lg p-4 overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                            {/* Enhanced glowing effect */}
                            <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-md opacity-70 -z-10 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg opacity-70 -z-10"></div>
                            
                            {/* Subtle glass shimmer */}
                            <div className="absolute inset-0 overflow-hidden rounded-lg -z-10">
                              <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-green-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            
                            <div className="text-xl font-bold text-green-400" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>37%</div>
                            <div className="text-sm text-gray-300" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>ROI</div>
                          </div>
                          <div className="relative bg-gray-900/80 border-2 border-green-500/60 rounded-lg p-4 overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                            {/* Enhanced glowing effect */}
                            <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-md opacity-70 -z-10 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg opacity-70 -z-10"></div>
                            
                            {/* Subtle glass shimmer */}
                            <div className="absolute inset-0 overflow-hidden rounded-lg -z-10">
                              <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-green-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                            
                            <div className="text-xl font-bold text-green-400" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>1.7 years</div>
                            <div className="text-sm text-gray-300" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Payback Period</div>
                          </div>
                          <div className="relative bg-gray-900/80 border-2 border-green-500/60 rounded-lg p-4 overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                            {/* Enhanced glowing effect */}
                            <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-md opacity-70 -z-10 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg opacity-70 -z-10"></div>
                            
                            {/* Subtle glass shimmer */}
                            <div className="absolute inset-0 overflow-hidden rounded-lg -z-10">
                              <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-green-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                            </div>
                            
                            <div className="text-xl font-bold text-green-400" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" }}>$8,600</div>
                            <div className="text-sm text-gray-300" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Value Increase</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-400">
                        Results based on average data for similar mobile homes in your climate zone. Contact us for a precise custom assessment.
                      </div>
                      
                      {/* Ambient glow wrapped around the button without affecting the button itself */}
                      <div className="relative mt-4">
                        <div className="absolute -inset-3 bg-blue-600/30 blur-xl rounded-xl opacity-80 transition-opacity duration-500"></div>
                        <div className="relative">
                          <PremiumCartButton
                            onClick={handleShowRegistrationForm}
                            size="lg"
                            className="w-full transform hover:scale-105 transition-transform duration-300"
                            glowEffect={true}
                          >
                            <div className="flex items-center justify-center">
                              <CircleDollarSign className="w-6 h-6 mr-3 text-amber-300" />
                              Get Detailed ROI Report
                            </div>
                          </PremiumCartButton>
                        </div>
                      </div>
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
                                  <Input 
                                    placeholder="your@email.com" 
                                    {...field} 
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
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
                                    {...field} 
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
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
                                <FormLabel className="text-white">Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="(555) 123-4567" 
                                    {...field} 
                                    value={field.value || ''}
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
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
                                <FormLabel className="text-white">Website (optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://your-website.com" 
                                    {...field} 
                                    value={field.value || ''}
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
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
                                <FormLabel className="text-white">Professional License (optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="License number" 
                                    {...field} 
                                    value={field.value || ''}
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
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
                                <FormLabel className="text-white">Years in Business</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="Years of experience" 
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    value={field.value?.toString() || ''}
                                    className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                    }}
                                  />
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
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      name={field.name}
                                      ref={field.ref}
                                      value={field.value || ''}
                                      className="bg-gray-900/60 border-2 border-green-500/50 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] placeholder:text-gray-500 min-h-[120px]"
                                      style={{
                                        textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)",
                                        boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                      }}
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
                                      className="border-2 border-green-500/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                      style={{
                                        boxShadow: "0 0 10px rgba(74, 222, 128, 0.2)"
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-white">
                                      I agree to the <a href="#" className="text-green-400 underline hover:text-green-300 transition-colors">terms of service</a> and <a href="#" className="text-green-400 underline hover:text-green-300 transition-colors">privacy policy</a>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center mt-4">
                          {/* Ambient blue-to-orange gradient glow wrapper around submit button without affecting the button itself */}
                          <div className="relative inline-block">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                            <div className="relative">
                              <PremiumFireButton
                                type="submit"
                                size="lg"
                                className="px-8 transform hover:scale-105 transition-transform duration-300"
                                glowEffect={true}
                                disabled={registerMutation.isPending}
                              >
                                {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
                              </PremiumFireButton>
                            </div>
                          </div>
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
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                        <a href="/" className="relative bg-black rounded-lg group-hover:bg-gradient-to-br from-gray-900 to-black transition-all duration-200 py-3 px-8 border border-blue-500/30 text-white font-semibold text-center">
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