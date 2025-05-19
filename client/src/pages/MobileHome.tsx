import React, { useState, ChangeEvent } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "wouter";
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
  DollarSign,
  CalendarDays,
  CloudSun,
  Calculator,
  Timer as TimerIcon,
  CircleDollarSign,
  BarChart2,
  Thermometer as ThermometerIcon,
  Award,
  Info as InfoIcon,
  FileText,
  Download,
  TrendingUp,
  AlertTriangle
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
        
        {/* New Main Header Section */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Advanced ambient blue glow effects for header */}
              <div className="absolute -inset-10 bg-blue-800/10 rounded-full blur-[100px] opacity-80 z-0"></div>
              <div className="absolute -inset-20 bg-blue-900/5 rounded-full blur-[150px] opacity-70 z-0 animate-pulse-slow"></div>
              
              {/* Premium Header Container */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/95 to-blue-900/90 z-10"></div>
                
                {/* Header background with subtle pattern and animated gradient overlay */}
                <div className="absolute inset-0 opacity-40 z-0" 
                  style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }}></div>
                
                {/* Animated blue light sweep effect */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                </div>
                
                {/* Enhanced Header content with premium homepage-style styling */}
                <div className="relative z-20 p-10 flex flex-col items-center text-center">
                  {/* Complex ambient background glow effect */}
                  <div className="absolute -inset-10 bg-gradient-to-r from-blue-900/10 via-blue-700/20 to-blue-900/10 rounded-[40px] blur-[60px] opacity-80 -z-10"></div>
                  <div className="absolute -inset-20 bg-blue-500/5 rounded-[80px] blur-[100px] opacity-60 -z-10 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
                  
                  {/* Premium Corner Accents matching the homepage style exactly */}
                  <div className="absolute top-0 left-0 w-14 h-14 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-700/70 rounded-tl-md"></div>
                    <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-600/50 rounded-tl-md"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-14 h-14 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-700/70 rounded-tr-md"></div>
                    <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-600/50 rounded-tr-md"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-14 h-14 z-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-700/70 rounded-br-md"></div>
                    <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-600/50 rounded-br-md"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-14 h-14 z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-700/70 rounded-bl-md"></div>
                    <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-600/50 rounded-bl-md"></div>
                  </div>
                  
                  {/* Enhanced subtle border effect */}
                  <div className="absolute inset-0 rounded-xl border border-blue-600/10 pointer-events-none"></div>
                  <div className="absolute inset-[3px] rounded-lg border border-blue-500/5 pointer-events-none"></div>
                  
                  {/* Multiple glass shimmer effects for enhanced premium look */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute" style={{ animationDuration: '3s' }}></div>
                    <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-blue-300/5 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Premium badge with icon in homepage style */}
                  <div className="relative mb-6">
                    <div className="flex items-start justify-center">
                      <div className="relative mr-2">
                        <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-md"></div>
                        <div className="relative h-6 w-6 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/80 to-blue-800/80 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                          <div className="absolute inset-0.5 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-full"></div>
                          <Calculator className="w-3.5 h-3.5 text-blue-100 relative z-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        ADVANCED ROI TECHNOLOGY
                      </h3>
                    </div>
                  </div>
                  
                  {/* Enhanced Main Header with premium 3D gradient styling and animated elements */}
                  <div className="relative">
                    {/* Ambient glow behind text */}
                    <div className="absolute -inset-10 bg-blue-500/20 rounded-full blur-3xl opacity-70"></div>
                    <div className="absolute -inset-14 bg-blue-600/10 rounded-full blur-2xl opacity-50 animate-pulse-slow" style={{ animationDuration: '6s' }}></div>
                    
                    {/* Heading with enhanced 3D text effect */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-white leading-tight max-w-5xl mx-auto tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" style={{ textShadow: "0 1px 1px rgba(0,0,0,0.8), 0 8px 24px rgba(59,130,246,0.2)" }}>
                      Mobile Home ROI Analysis Calculator
                    </h1>
                  </div>
                  
                  {/* Enhanced subheader with premium styling and subtle animation */}
                  <div className="relative">
                    <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                      Discover how Praetorian Smart-Coat technology can <span className="text-white font-medium">transform your mobile home's efficiency</span>, 
                      reduce utility costs, and <span className="text-white font-medium">increase property value</span> with our advanced ROI calculator.
                    </p>
                    
                    {/* Enhanced floating icon indicators with homepage-style styling */}
                    <div className="flex justify-center space-x-10 mt-6 mb-10">
                      <div className="flex flex-col items-center group">
                        <div className="relative p-3 mb-3">
                          <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                            <DollarSign className="w-6 h-6 text-blue-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                        <span className="text-blue-200 text-sm font-medium">Maximize Savings</span>
                      </div>
                      
                      <div className="flex flex-col items-center group">
                        <div className="relative p-3 mb-3">
                          <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                            <CalendarDays className="w-6 h-6 text-blue-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                        <span className="text-blue-200 text-sm font-medium">Extend Lifespan</span>
                      </div>
                      
                      <div className="flex flex-col items-center group">
                        <div className="relative p-3 mb-3">
                          <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <div className="absolute inset-0.5 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full opacity-50"></div>
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                            <TrendingUp className="w-6 h-6 text-blue-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                        <span className="text-blue-200 text-sm font-medium">Increase Value</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced accented bottom area with more depth */}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"></div>
                    <div className="h-0.5 w-3/4 mt-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Existing Hero Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-blue-500/20 to-blue-600/30 rounded-xl blur-xl opacity-70"></div>
              
              {/* Ultra-premium enterprise header with layered effects - no blue glow */}
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-10 px-12 rounded-xl border border-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                {/* Glass shimmer effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                </div>
                
                {/* Premium Corner Accents */}
                <div className="absolute top-0 left-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-700 rounded-tl-md"></div>
                  <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-gray-600 rounded-tl-md"></div>
                </div>
                <div className="absolute top-0 right-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-700 rounded-tr-md"></div>
                  <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-gray-600 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-700 rounded-br-md"></div>
                  <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-gray-600 rounded-br-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-14 h-14 z-10 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-700 rounded-bl-md"></div>
                  <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-gray-600 rounded-bl-md"></div>
                </div>
                
                {/* Premium header with styled corner accents like homepage */}
                <div className="relative mb-8">
                  {/* Blue ambient glow behind the header */}
                  <div className="absolute -inset-6 bg-blue-600/20 rounded-xl blur-3xl opacity-50 z-0"></div>
                  <div className="absolute -inset-10 bg-blue-500/15 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                  
                  {/* Main header with premium corner accents and styling */}
                  <div className="relative p-8 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-800/80 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] z-10">
                    {/* Corner decorations exactly like homepage */}
                    <div className="absolute top-0 left-0 w-14 h-14 z-10 pointer-events-none">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-700/70 rounded-tl-md"></div>
                      <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-blue-600/50 rounded-tl-md"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-14 h-14 z-10 pointer-events-none">
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-700/70 rounded-tr-md"></div>
                      <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-blue-600/50 rounded-tr-md"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-14 h-14 z-10 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-700/70 rounded-br-md"></div>
                      <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-blue-600/50 rounded-br-md"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-14 h-14 z-10 pointer-events-none">
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-700/70 rounded-bl-md"></div>
                      <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-blue-600/50 rounded-bl-md"></div>
                    </div>
                    
                    {/* Glass shimmer effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                    </div>
                    
                    {/* Header content */}
                    <div className="relative z-10">
                      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        Previously Government-Exclusive Technology
                      </h2>
                      
                      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Transform Your Mobile Home, Cut Costs & Extend Life
                      </h1>
                    </div>
                  </div>
                </div>
                
                {/* SANDLER STAGE 1: IDENTIFY THE PAINS - Updated with premium styling to match proven solution section */}
                <div className="relative mb-10">
                  {/* Enhanced multi-layered red glow with depth and animation */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 via-red-500/30 to-red-600/30 rounded-xl blur-md opacity-90"></div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-red-700/20 via-red-600/10 to-red-700/20 rounded-xl blur-xl opacity-70"></div>
                  <div className="absolute -inset-6 bg-red-600/10 rounded-xl blur-2xl opacity-50 animate-pulse-slow"></div>
                  
                  <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/40 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                    {/* Enhanced semantic header hierarchy with premium icon styling */}
                    <div className="flex items-start mb-3">
                      <div className="relative mr-2">
                        <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-md"></div>
                        <div className="relative h-6 w-6 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 to-red-800/80 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                          <AlertTriangle className="w-3.5 h-3.5 text-red-100 relative z-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        CRITICAL CHALLENGES
                      </h3>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Are These Mobile Home Problems Costing You Money?
                    </h2>
                    
                    <p className="text-lg text-white leading-relaxed mb-6">
                      Mobile homes present unique challenges in energy efficiency, comfort, and longevity. Every day, owners face frustrating issues that drain their wallets and decrease quality of life.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                                <CircleDollarSign className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Skyrocketing Utility Costs</h3>
                            <p className="text-gray-200 leading-relaxed">
                              Have you ever dreaded opening your utility bill during extreme weather? The average mobile home loses <span className="text-red-300 font-medium">42% of its heating and cooling</span> through poor insulation, making your HVAC system work overtime and sending your bills skyrocketing to <span className="text-red-300 font-medium">3.4x higher than necessary</span>.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                                <Home className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Accelerated Exterior Deterioration</h3>
                            <p className="text-gray-200 leading-relaxed">
                              What happens to your home's exterior year after year? UV damage causes deterioration at <span className="text-red-300 font-medium">2.8x the normal rate</span>, leading to costly repairs and decreased property value. And without fire-rated materials, insurance companies are raising rates by <span className="text-red-300 font-medium">26% annually</span> - eating away at your budget.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                                <ThermometerIcon className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Inconsistent Temperature Control</h3>
                            <p className="text-gray-200 leading-relaxed">
                              Do you find yourself constantly adjusting the thermostat because some rooms are too hot while others are too cold? Temperature fluctuations make consistent comfort impossible, leading to both discomfort and wasted energy as you try to compensate.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/30 rounded-xl transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-900 rounded-xl border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-red-700 to-red-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.9s' }}></div>
                                <BarChart2 className="w-7 h-7 text-red-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Massive Financial Waste</h3>
                            <p className="text-gray-200 leading-relaxed">
                              Have you calculated how much money you're losing to these inefficiencies? The average mobile home owner wastes <span className="text-red-300 font-medium">$1,870 annually</span> in unnecessary energy costs and premature maintenance – that's over $18,700 in a decade that could be going toward other priorities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-red-200 font-medium italic">
                      These problems affect virtually every mobile home in America, draining owners' finances while making daily living less comfortable. The traditional approach of patching with conventional materials simply isn't working – it's a costly cycle with diminishing returns.
                    </p>
                  </div>
                </div>
                
                {/* SANDLER STAGE 2: PRESENT SOLUTIONS */}
                <div className="relative mb-10">
                  {/* Enhanced multi-layered green glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600/30 via-green-500/30 to-green-600/30 rounded-xl blur-md opacity-90"></div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-green-700/20 via-green-600/10 to-green-700/20 rounded-xl blur-xl opacity-70"></div>
                  <div className="absolute -inset-6 bg-green-600/10 rounded-xl blur-2xl opacity-50 animate-pulse-slow"></div>
                  
                  <div className="relative bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/40 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                    {/* Enhanced semantic header hierarchy */}
                    <div className="flex items-start mb-3">
                      <div className="relative mr-2">
                        <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-md"></div>
                        <div className="relative h-6 w-6 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-b from-green-600/80 to-green-800/80 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                          <CheckCircle className="w-3.5 h-3.5 text-green-100 relative z-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        PROVEN SOLUTION
                      </h3>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Praetorian Smart-Coat – Advanced Mobile Home Protection
                    </h2>
                    
                    <p className="text-lg text-white leading-relaxed mb-6">
                      Our NASA-derived ceramic coating technology isn't just paint – it's a complete thermal and protective barrier system specifically engineered for mobile homes:
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/5 to-green-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                                <SunIcon className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Thermal Barrier Technology</h3>
                            <p className="text-gray-200 leading-relaxed">
                              Our ceramic microsphere coating creates a powerful thermal barrier that reduces heat transfer by up to <span className="text-green-300 font-medium">92%</span>. Unlike conventional insulation that degrades quickly in mobile homes, our coating maintains its effectiveness for decades, providing consistent temperature control throughout your home while dramatically cutting energy consumption.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/5 to-green-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.3s' }}></div>
                                <Shield className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Fire-Rated Protection</h3>
                            <p className="text-gray-200 leading-relaxed">
                              Praetorian Smart-Coat is certified Class A fire resistant (ASTM E84), creating a non-combustible barrier that protects your home from fire hazards. This certification not only improves safety but can reduce insurance premiums by up to <span className="text-green-300 font-medium">17% annually</span>. In mobile home parks where fire can spread rapidly, this protection is invaluable.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border border-green-500/30 rounded-xl transition-all duration-300 hover:border-green-500/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {/* Enhanced layered glows and effects */}
                        <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/5 to-green-700/5 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        <div className="relative flex gap-5">
                          <div className="flex-shrink-0">
                            {/* Elite enterprise icon styling */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-80"></div>
                              <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 rounded-xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                                <div className="absolute inset-0.5 bg-gradient-to-br from-green-700 to-green-800 rounded-[0.65rem] opacity-50"></div>
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg] animate-shimmer-slow" style={{ animationDelay: '0.6s' }}></div>
                                <DropletIcon className="w-7 h-7 text-green-300 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-200 mb-3" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Advanced UV & Weather Protection</h3>
                            <p className="text-gray-200 leading-relaxed">
                              Our coating includes advanced UV inhibitors that shield your mobile home's exterior from sun damage, preventing the accelerated deterioration that plagues most mobile homes. The waterproof, flexible barrier also protects against moisture intrusion and mold growth, extending your home's exterior life by <span className="text-green-300 font-medium">15+ years</span> while maintaining its appearance.
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
                
                {/* SANDLER STAGE 3: HIGHLIGHT BENEFITS - Enhanced Premium Styling */}
                <div className="relative mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] p-8">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                    </div>
                    
                    {/* Premium Badge/Label - Centered with Enhanced Styling */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-700/90 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20">
                      <div className="absolute inset-0 rounded-full opacity-70 overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-300/10 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                      </div>
                      <span className="text-blue-100 font-bold tracking-wider text-sm relative z-10 flex items-center">
                        <span className="mr-1.5 bg-blue-500/70 h-1.5 w-1.5 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.7)]"></span>
                        MEASURABLE BENEFITS
                        <span className="ml-1.5 bg-blue-500/70 h-1.5 w-1.5 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.7)]"></span>
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10 mt-4">
                      <span className="relative inline-block">
                        Real Results for Your Mobile Home
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                      </span>
                    </h2>
                    
                    <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8 relative z-10">
                      When you choose Praetorian Smart-Coat for your mobile home, the benefits extend far beyond just aesthetics:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group">
                        <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative z-10 flex items-start gap-4">
                          <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0">
                            <CircleDollarSign className="w-6 h-6 text-white" />
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Dramatic Cost Savings</h3>
                            <p className="text-blue-100">
                              The average mobile home owner saves $842 annually on energy bills after applying our coating. Over 10 years, that's $8,420 back in your pocket. Add reduced maintenance costs and you're looking at a 243% return on your investment – money that would otherwise be wasted on inefficient heating/cooling and constant repairs.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group">
                        <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative z-10 flex items-start gap-4">
                          <span className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex-shrink-0">
                            <TimerIcon className="w-6 h-6 text-white" />
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Extended Home Life & Value</h3>
                            <p className="text-orange-100">
                              Mobile homes typically depreciate quickly, but our coating system adds 15+ years to your home's lifespan while increasing its resale value. The protective barrier prevents the most common causes of deterioration – weather damage, UV exposure, and temperature fluctuations – preserving your investment for years to come.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group">
                        <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative z-10 flex items-start gap-4">
                          <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0">
                            <BadgeCheck className="w-6 h-6 text-white" />
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Improved Comfort & Safety</h3>
                            <p className="text-blue-100">
                              Say goodbye to temperature fluctuations and hot/cold spots. Our coating creates a consistent indoor climate year-round, making your home more comfortable no matter the weather outside. The fire-resistant properties add an essential layer of safety, protecting your family and possessions from unexpected dangers.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group">
                        <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative z-10 flex items-start gap-4">
                          <span className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex-shrink-0">
                            <Wrench className="w-6 h-6 text-white" />
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Maintenance-Free Protection</h3>
                            <p className="text-orange-100">
                              Our one-time application provides decades of protection without the need for regular maintenance or reapplication. Unlike traditional mobile home coatings that need refreshing every 2-3 years, Praetorian's ceramic shield creates a permanent barrier that stands the test of time – saving you from the endless cycle of repairs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xl text-white mb-4 text-center">
                      Our <span className="text-orange-300 font-semibold">Class A fire-rated ceramic microsphere coating</span> provides <span className="text-blue-300 font-semibold">unmatched thermal protection</span> with documented performance metrics that deliver <span className="text-green-400 font-semibold">$14,830 average 5-year savings</span> for mobile homeowners.
                    </p>
                  </div>
                </div>
                
                {/* SANDLER STAGE 4: FUNNEL CLOSE + REGISTRATION */}
                <div className="relative mt-8 mb-8">
                  {/* Completely separate ambient green glow elements positioned behind the card */}
                  <div className="absolute -inset-2 bg-green-500/20 rounded-xl blur-2xl opacity-70 z-0"></div>
                  <div className="absolute -inset-4 bg-green-500/15 rounded-xl blur-3xl opacity-60 z-0 animate-pulse-slow"></div>
                  <div className="absolute -inset-px bg-gradient-to-r from-green-600/20 via-transparent to-green-600/20 rounded-xl opacity-80 blur-sm z-0"></div>
                  
                  {/* Actual card with clean styling - no green glows attached */}
                  <div className="relative p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-green-600/50 rounded-xl transition-all duration-300 shadow-lg z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Transform Your Mobile Home Today</h3>
                    
                    <p className="text-lg text-gray-100 mb-6 text-center">
                      Stop throwing money away on skyrocketing energy bills and endless repairs. Praetorian Smart-Coat gives you a more comfortable, valuable, and protected home while saving you thousands of dollars over time.
                    </p>
                    

                    
                    <p className="text-sm text-gray-300 text-center">
                      Our mobile home specialists will assess your needs, provide a detailed cost analysis showing your expected ROI, and schedule your installation – all at no obligation.
                    </p>
                  </div>
                </div>
                
                {/* Testimonial with proper heading structure */}
                <div className="relative mb-6">
                  {/* Blue glow behind the container */}
                  <div className="absolute -inset-2 bg-blue-500/10 rounded-xl blur-2xl opacity-50 z-0"></div>
                  <div className="absolute -inset-4 bg-blue-500/10 rounded-xl blur-3xl opacity-40 z-0 animate-pulse-slow"></div>
                  
                  {/* Content card */}
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-blue-600/20 rounded-lg p-4 z-10">
                    <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-200 mb-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                      Military-Grade Technology
                    </h4>
                    <p className="text-sm text-blue-100 italic">
                      Previously classified ceramic microsphere technology, formerly exclusive to military housing, now available to mobile home communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Benefits and Application Process grid */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Benefits Card */}
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.3)] p-8 overflow-hidden h-full flex flex-col">
                  {/* Premium enterprise background effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-br from-blue-600/10 to-transparent rounded-t-xl opacity-50"></div>
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                  </div>
                  
                  {/* Enhanced corner accents with glowing dots */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                    
                    {/* Glowing corner dots */}
                    <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  

                  
                  <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)] relative z-10 mt-4">
                    <span className="relative inline-block">
                      Ceramic Microsphere Benefits
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    </span>
                  </h2>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-blue-500/40">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-blue-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center">
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

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-orange-500/40">
                      <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-orange-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center justify-center">
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

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-blue-500/40">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-blue-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center">
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
                    
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-green-500/40">
                      <div className="absolute -inset-0.5 bg-green-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-green-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-green-700 to-green-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M9.883 2.207a1 1 0 0 1 1.834 0l.883 1.764a1 1 0 0 0 .749.542l1.961.284a1 1 0 0 1 .553 1.705l-1.414 1.377a1 1 0 0 0 -.29.885l.335 1.951a1 1 0 0 1 -1.45 1.054l-1.756 -.918a1 1 0 0 0 -.926 0l-1.756 .918a1 1 0 0 1 -1.45 -1.054l.335 -1.951a1 1 0 0 0 -.29 -.885l-1.414 -1.377a1 1 0 0 1 .553 -1.705l1.961 -.284a1 1 0 0 0 .749 -.542l.883 -1.764z"></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(34,197,94,0.5)]">Military-Grade Durability</h3>
                          <p className="text-green-100">Originally developed for military applications, our ceramic coating has been field-tested in extreme conditions worldwide with an impressive 99.8% success rate and documented performance in temperatures ranging from -58°F to 347°F.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 relative">
                    <div className="absolute -inset-1 bg-blue-600/10 rounded-lg blur-sm opacity-70"></div>
                    <div className="relative p-4 bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 text-blue-300 text-sm font-semibold mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 9v4"></path><path d="M12 17.5v.5"></path><path d="M12 3c-4.2 0-7.9 2.1-10 5.3 2.1 3.2 5.8 5.3 10 5.3s7.9-2.1 10-5.3c-2.1-3.2-5.8-5.3-10-5.3"></path>
                          <path d="M12 18c-4.2 0-7.9-2.1-10-5.3 2.1-3.2 5.8-5.3 10-5.3"></path>
                        </svg>
                        INDUSTRY INSIGHT
                      </div>
                      <p className="text-sm text-blue-100 italic">
                        Ceramic microsphere technology was previously classified as a military compound, exclusively used in high-security infrastructure. Now available to civilian applications, independent testing verifies performance metrics that exceed industry standards by 247%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Application Process Card */}
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.3)] p-8 overflow-hidden h-full flex flex-col">
                  {/* Premium enterprise background effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-br from-orange-600/10 to-transparent rounded-t-xl opacity-50"></div>
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                  </div>
                  
                  {/* Enhanced corner accents with glowing dots */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
                    
                    {/* Glowing corner dots */}
                    <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  

                  
                  <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_1px_3px_rgba(249,115,22,0.6)] relative z-10 mt-4">
                    <span className="relative inline-block">
                      Application Process
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                    </span>
                  </h2>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-blue-500/40">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-blue-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center w-8 h-8">
                          <span className="text-white font-bold text-sm">1</span>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Professional Assessment</h3>
                          <p className="text-blue-100">Our certified technicians conduct a comprehensive mobile home evaluation, documenting current energy performance and creating a detailed application plan with thermal imaging analysis.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-orange-500/40">
                      <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-orange-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center justify-center w-8 h-8">
                          <span className="text-white font-bold text-sm">2</span>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Surface Preparation</h3>
                          <p className="text-orange-100">All surfaces undergo our 6-step preparation process including power washing, crack sealing, and primer application to ensure optimal microsphere adhesion and maximum performance durability.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-blue-500/40">
                      <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-blue-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center w-8 h-8">
                          <span className="text-white font-bold text-sm">3</span>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">Multi-Layer Application</h3>
                          <p className="text-blue-100">Our technicians apply 3-4 precision coats of ceramic microsphere material using airless sprayers calibrated to ensure uniform 16-mil thickness with complete documentation of application conditions.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-gray-800 group transition-all duration-300 hover:border-orange-500/40">
                      <div className="absolute -inset-0.5 bg-orange-600/20 rounded-lg blur opacity-60 group-hover:opacity-100 group-hover:bg-orange-600/30 transition-all duration-300"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="bg-gradient-to-r from-orange-700 to-orange-500 rounded-full p-2 mt-1 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center justify-center w-8 h-8">
                          <span className="text-white font-bold text-sm">4</span>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(249,115,22,0.5)]">Certification & Documentation</h3>
                          <p className="text-orange-100">Upon completion, you receive official ROI certification documentation, thermal performance verification, and a 10-year warranty that can be transferred to future homeowners.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 relative">
                    <div className="absolute -inset-1 bg-orange-600/10 rounded-lg blur-sm opacity-70"></div>
                    <div className="relative p-4 bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 text-orange-300 text-sm font-semibold mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12h6"></path><path d="M12 9v6"></path><circle cx="12" cy="12" r="9"></circle>
                        </svg>
                        EXPERT TIP
                      </div>
                      <p className="text-sm text-orange-100 italic">
                        Praetorian's mobile home coating systems are eligible for energy efficiency incentives through various state and federal programs. Our specialists will help you navigate available rebates and incentives in your area, potentially saving you thousands on your installation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Home ROI Analysis Section with Green Styling */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative max-w-6xl mx-auto">
              {/* Enhanced green ambient glow for ROI section */}
              <div className="absolute -inset-2 bg-gradient-to-r from-green-600/30 via-blue-600/10 to-green-600/30 rounded-xl blur-xl opacity-70"></div>
              <div className="absolute -inset-6 bg-green-600/20 rounded-xl blur-2xl opacity-50 animate-pulse-slow"></div>
              <div className="absolute -inset-10 bg-green-600/10 rounded-xl blur-3xl opacity-30"></div>
              
              {/* Premium glass container with green accents */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-xl p-6 md:p-8 shadow-lg border border-green-500/30 overflow-hidden">
                {/* Glass shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-br from-green-600/10 to-transparent rounded-t-xl opacity-50"></div>
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-green-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                </div>
                
                {/* Enhanced Green header bar with premium enterprise styling */}
                <div className="relative -mt-6 -mx-6 md:-mx-8 mb-8 py-5 px-6 md:px-8 bg-gradient-to-r from-green-900/90 via-green-800/95 to-green-900/90 border-b border-green-400/40 shadow-[0_10px_25px_-5px_rgba(34,197,94,0.25)]">
                  
                  {/* Enhanced background pattern with shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2322c55e\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
                    <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/15 to-transparent skew-x-[-20deg] animate-shimmer-slow absolute"></div>
                  </div>
                  
                  {/* Corner accent elements */}
                  <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400/60 rounded-tl-md"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-green-400/60 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400/60 rounded-tr-md"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-400/60 rounded-full blur-[1px]"></div>
                  </div>
                  
                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center">
                      {/* Enhanced icon with glow effect */}
                      <div className="relative flex-shrink-0 mr-5">
                        <div className="absolute -inset-1 bg-green-500/40 rounded-full blur-md opacity-80"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.6)] border border-green-400/40">
                          <CircleDollarSign className="w-6 h-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
                        </div>
                      </div>
                      
                      {/* Enhanced heading with gradient text */}
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-50 via-green-100 to-green-50 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                          ROI Analysis Calculator
                        </h2>
                        <div className="h-0.5 w-3/4 mt-1 bg-gradient-to-r from-transparent via-green-400/60 to-transparent rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced certification badge */}
                    <div className="hidden md:flex items-center px-3 py-1 bg-green-800/60 rounded-full border border-green-400/30 shadow-inner text-green-100 text-sm">
                      <div className="relative mr-2 flex-shrink-0">
                        <div className="absolute -inset-0.5 bg-green-400/40 rounded-full blur-sm"></div>
                        <CheckCircle className="w-4 h-4 relative text-green-300" />
                      </div>
                      <span className="font-medium tracking-wide">NASA-Certified Technology</span>
                    </div>
                  </div>
                </div>
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
                      {/* Premium green outer glow effect - CONVERTED FROM BLUE TO GREEN */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-600/40 to-green-400/30 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="absolute -inset-4 bg-green-600/20 rounded-lg blur-xl opacity-50 group-hover:opacity-70 transition duration-300"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-lg p-6 border border-green-500/30 shadow-lg group-hover:shadow-green-900/20 transition duration-300">
                        {/* Elite corner accents - GREEN-STYLED */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/40 rounded-tl-md"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/40 rounded-tr-md"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/40 rounded-br-md"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/40 rounded-bl-md"></div>
                        
                        {/* Glass shimmer effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-green-400/10 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                        </div>
                        
                        <h4 className="text-lg font-semibold mb-3 flex items-center relative z-10">
                          <span className="relative mr-3 flex-shrink-0">
                            <span className="absolute -inset-1 bg-green-500/30 rounded-full blur-sm"></span>
                            <div className="relative h-6 w-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </span>
                          <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">Praetorian Mobile Home Solutions</span>
                        </h4>
                      
                        <ul className="space-y-4 relative z-10">
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-green-700 to-green-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.4)]">
                                <span className="text-white text-xs font-bold">1</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">Reduces internal temperature by 15-28°F</span> - Creates immediate comfort improvements and energy savings
                            </span>
                          </li>
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-green-700 to-green-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.4)]">
                                <span className="text-white text-xs font-bold">2</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">25+ year roof protection</span> - One application extends roof life by 2-3× with documented performance
                            </span>
                          </li>
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-green-700 to-green-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.4)]">
                                <span className="text-white text-xs font-bold">3</span>
                              </div>
                            </div>
                            <span className="text-gray-200 pt-0.5">
                              <span className="font-semibold text-white">Utility reduction of 20-45%</span> - Average monthly savings of $85-140 on cooling/heating expenses
                            </span>
                          </li>
                          <li className="flex items-start group">
                            <div className="relative flex-shrink-0 mr-3">
                              <div className="absolute -inset-1 bg-green-500/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                              <div className="relative w-7 h-7 bg-gradient-to-br from-green-700 to-green-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.4)]">
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
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-green-500/20">
                    {/* Green glass shimmer effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-green-400/5 to-transparent skew-x-[-20deg] animate-shimmer-slow"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <div className="relative mr-3 flex-shrink-0">
                        <div className="absolute -inset-1 bg-green-500/40 rounded-full blur-md"></div>
                        <div className="relative h-10 w-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                          <CircleDollarSign className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">Return on Investment Analysis</span>
                    </h3>
                    
                    <div className="space-y-6 relative">
                      <div className="group">
                        <label className="text-sm text-gray-300 block mb-2 flex items-center">
                          <Home className="h-4 w-4 text-green-400 mr-2" />
                          Mobile Home Size (sq ft)
                        </label>
                        <div className="flex items-center relative">
                          {/* Input glow effect */}
                          <div className="absolute -inset-0.5 bg-green-500/20 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                          <div className="relative flex items-center w-full">
                            <input 
                              type="number" 
                              className="bg-gray-900/90 text-white border border-green-600/30 rounded-l p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.1)] relative z-10" 
                              placeholder="e.g. 1,200"
                              defaultValue={1200}
                            />
                            <span className="bg-gray-800/90 text-green-100 px-4 py-2.5 border border-green-600/30 border-l-0 rounded-r shadow-inner relative z-10">sq ft</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group">
                        <label className="text-sm text-gray-300 block mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                          Monthly Energy Bill
                        </label>
                        <div className="flex items-center relative">
                          {/* Input glow effect */}
                          <div className="absolute -inset-0.5 bg-green-500/20 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                          <div className="relative flex items-center w-full">
                            <span className="bg-gray-800/90 text-green-100 px-4 py-2.5 border border-green-600/30 border-r-0 rounded-l shadow-inner relative z-10">$</span>
                            <input 
                              type="number" 
                              className="bg-gray-900/90 text-white border border-green-600/30 rounded-r p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.1)] relative z-10" 
                              placeholder="e.g. 280"
                              defaultValue={280}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="group">
                        <label className="text-sm text-gray-300 block mb-2 flex items-center">
                          <CalendarDays className="h-4 w-4 text-green-400 mr-2" />
                          Mobile Home Age (years)
                        </label>
                        <div className="relative">
                          {/* Input glow effect */}
                          <div className="absolute -inset-0.5 bg-green-500/20 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                          <input 
                            type="number" 
                            className="bg-gray-900/90 text-white border border-green-600/30 rounded p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.1)] relative z-10" 
                            placeholder="e.g. 15"
                            defaultValue={15}
                          />
                        </div>
                      </div>
                      
                      <div className="group">
                        <label className="text-sm text-gray-300 block mb-2 flex items-center">
                          <CloudSun className="h-4 w-4 text-green-400 mr-2" />
                          Local Climate Zone
                        </label>
                        <div className="relative">
                          {/* Input glow effect */}
                          <div className="absolute -inset-0.5 bg-green-500/20 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                          <select className="bg-gray-900/90 text-white border border-green-600/30 rounded p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.1)] relative z-10">
                            <option value="hot">Hot (Southern Regions)</option>
                            <option value="mixed">Mixed/Moderate</option>
                            <option value="cold">Cold (Northern Regions)</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Purple ambient glow button like registration form */}
                      <div className="relative mt-6">
                        {/* Outer ambient glow */}
                        <div className="absolute -inset-[25px] rounded-3xl opacity-70 transition-opacity duration-500 -z-10 group-hover:opacity-90"
                          style={{ 
                            background: 'radial-gradient(circle, rgba(138,43,226,0.25) 0%, rgba(59,130,246,0.15) 40%, rgba(0,0,0,0.05) 70%)',
                            filter: 'blur(25px)'
                          }}>
                        </div>
                        
                        {/* Secondary inner glow for depth */}
                        <div className="absolute -inset-[15px] rounded-2xl opacity-60 transition-opacity duration-500 -z-[5] group-hover:opacity-80"
                          style={{ 
                            background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(79,70,229,0.15) 60%, rgba(0,0,0,0) 80%)',
                            filter: 'blur(15px)'
                          }}>
                        </div>
                        
                        {/* Black button with glass effect */}
                        <button 
                          onClick={() => calculateROI()}
                          className="relative px-8 py-3 rounded-xl text-white font-medium text-lg transition-all duration-300 hover:scale-105 group z-10 w-full"
                        >
                          {/* Button background with glass effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-black to-gray-950/95 rounded-xl -z-[1] backdrop-blur-sm"></div>
                          
                          {/* Thin border/edge highlight */}
                          <div className="absolute inset-0 rounded-xl border border-purple-500/50 -z-[1]"></div>
                          
                          {/* Top edge highlight */}
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/40 to-transparent rounded-full -z-[1]"></div>
                          
                          {/* Diagonal shimmer effect */}
                          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl -z-[1]">
                            <div className="absolute inset-0 w-[120%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70 -translate-x-full animate-shimmer-slow transform skew-x-[-20deg]"></div>
                          </div>
                          
                          {/* Button text */}
                          <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            <Calculator className="w-5 h-5 mr-2" />
                            Calculate My ROI
                          </span>
                        </button>
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
                      
                      {/* Informational note with enhanced styling */}
                      <div className="mt-6 p-3 relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-blue-600/20 rounded-lg blur-sm opacity-70"></div>
                        <div className="relative p-3 bg-gradient-to-br from-gray-900/90 to-gray-950/90 rounded-lg border border-blue-500/30">
                          <div className="flex items-start">
                            <div className="relative mr-3 mt-1 flex-shrink-0">
                              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"></div>
                              <InfoIcon className="w-5 h-5 text-blue-300 relative" />
                            </div>
                            <p className="text-blue-100 text-sm">
                              This preliminary calculation shows estimated savings based on average data. For a full detailed ROI analysis including tax incentives and rebates, please contact our team for a personalized assessment.
                            </p>
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
            
            {/* Registration Form with Purple Ambient Glow */}
            {showRegistrationForm && !registrationSuccess ? (
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Enhanced purple ambient glow for registration form */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-violet-600/30 to-purple-600/40 rounded-xl blur-xl opacity-80"></div>
                  <div className="absolute -inset-2 bg-purple-800/20 blur-lg rounded-xl opacity-70 animate-pulse-slow"></div>
                  <div className="absolute -inset-4 bg-purple-500/10 blur-2xl rounded-xl opacity-60"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-purple-500/30 shadow-[0_0_60px_rgba(147,51,234,0.3)]">
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
                                  <Input 
                                    placeholder="Your company name" 
                                    {...field} 
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500" 
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
                                    placeholder="Your name" 
                                    {...field} 
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500" 
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
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="your@email.com" 
                                    {...field} 
                                    className="bg-gray-900/60 border-2 border-purple-500/50 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                      boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                      boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                      boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                      boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                      boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                    className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500"
                                    style={{
                                      textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                      boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                      className="bg-gray-900/60 border-2 border-purple-500/40 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 shadow-[0_0_10px_rgba(147,51,234,0.15)] placeholder:text-gray-500 min-h-[120px]"
                                      style={{
                                        textShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
                                        boxShadow: "0 0 15px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
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
                                      className="border-2 border-purple-500/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                      style={{
                                        boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)"
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-white">
                                      I agree to the <a href="#" className="text-purple-400 underline hover:text-purple-300 transition-colors">terms of service</a> and <a href="#" className="text-purple-400 underline hover:text-purple-300 transition-colors">privacy policy</a>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center mt-4">
                          {/* Purple ambient glow wrapper around submit button without affecting the button itself */}
                          <div className="relative inline-block">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 rounded-xl blur-xl opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-purple-500/30 shadow-[0_0_60px_rgba(147,51,234,0.2)]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-white">Registration Successful!</h2>
                      <p className="text-lg text-gray-300 mb-6">
                        Thank you for registering with our mobile home services. A member of our team will contact you shortly to discuss your needs.
                      </p>
                      <p className="text-gray-400 text-sm mb-6">
                        You'll receive a confirmation email with additional information and next steps.
                      </p>
                      {/* Purple ambient glow around the return button */}
                      <div className="relative inline-block">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                        <div className="relative">
                          <Link to="/">
                            <PremiumFireButton
                              size="lg"
                              className="px-8 transform hover:scale-105 transition-transform duration-300"
                              glowEffect={true}
                            >
                              Return to Home
                            </PremiumFireButton>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {/* Glass button with multi-layer gradient glow */}
                <div className="relative inline-block">
                  <button 
                    onClick={handleShowRegistrationForm}
                    className="relative px-8 py-3 rounded-xl text-white font-medium text-lg transition-all duration-300 hover:scale-105 group z-10"
                  >
                    {/* Button background with glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-black to-gray-950/95 rounded-xl -z-[1] backdrop-blur-sm"></div>
                    
                    {/* Thin border/edge highlight */}
                    <div className="absolute inset-0 rounded-xl border border-purple-500/50 -z-[1]"></div>
                    
                    {/* Top edge highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/40 to-transparent rounded-full -z-[1]"></div>
                    
                    {/* Diagonal shimmer effect */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl -z-[1]">
                      <div className="absolute inset-0 w-[120%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70 -translate-x-full animate-shimmer-slow transform skew-x-[-20deg]"></div>
                    </div>
                    
                    {/* Button text */}
                    <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      <FileText className="w-5 h-5 mr-2" />
                      Register for Mobile Home Services
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default MobileHome;