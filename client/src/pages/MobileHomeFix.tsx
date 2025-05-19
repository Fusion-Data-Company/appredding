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

const MobileHomeFix = () => {
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
        
        {/* Ultra-Premium Enterprise ROI Analysis Hero Section */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="container mx-auto mb-12">
            <div className="relative">
              {/* Ultra-premium Industry-Elite Enterprise Ambient Glow System */}
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-800/15 via-blue-700/20 to-blue-800/15 rounded-full blur-[120px] opacity-90 z-0"></div>
              <div className="absolute -inset-20 bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-blue-900/10 rounded-full blur-[180px] opacity-80 z-0 animate-pulse-slow"></div>
              <div className="absolute -inset-30 bg-gradient-to-tr from-blue-700/5 via-blue-600/5 to-blue-700/5 rounded-full blur-[200px] opacity-60 z-0 animate-pulse-very-slow" style={{ animationDuration: '15s' }}></div>
              
              {/* State-of-the-art Ultra-premium Elite Enterprise Header Container with Photorealistic 3D Effects */}
              <div className="relative rounded-2xl overflow-hidden transform perspective-[1200px] transition-all duration-700 group hover:scale-[1.005] hover:rotate-y-1 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.1),0_-10px_40px_-5px_rgba(59,130,246,0.1)] border border-blue-700/40">
                {/* Premium multi-layered background with advanced depth and lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-gray-950/98 to-blue-950/95 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-950/30 backdrop-blur-sm z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 z-5"></div>
                
                {/* Ultra-realistic glass surface depth effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-70 mix-blend-overlay z-5"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 via-transparent to-blue-800/10 z-5"></div>
                
                {/* Ultra-premium header background with advanced pattern and dynamic overlay */}
                <div className="absolute inset-0 opacity-40 z-0 mix-blend-overlay" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e3a8a\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')",
                    backgroundSize: '80px 80px'
                  }}
                ></div>
                
                {/* Subtle particle effect overlay */}
                <div className="absolute inset-0 mix-blend-overlay opacity-10 z-0" 
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 0.5%)",
                    backgroundSize: "8px 8px"
                  }}>
                </div>
                
                {/* Advanced animated light sweep effects with multiple layers */}
                <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
                  <div className="absolute -inset-full w-[600px] h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[-20deg] animate-light-sweep"></div>
                  <div className="absolute -inset-full w-[400px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] animate-light-sweep" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute -inset-full w-[300px] h-full bg-gradient-to-r from-transparent via-blue-300/25 to-transparent skew-x-[-25deg] animate-light-sweep" style={{ animationDelay: '4s' }}></div>
                </div>
                
                {/* 3D edge highlight effect for depth */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
                
                {/* Enhanced Header content with premium homepage-style styling */}
                <div className="relative z-20 p-10 flex flex-col items-center text-center">
                  {/* Complex ambient background glow effect */}
                  <div className="absolute -inset-10 bg-gradient-to-r from-blue-900/10 via-blue-700/20 to-blue-900/10 rounded-[40px] blur-[60px] opacity-80 -z-10"></div>
                  <div className="absolute -inset-20 bg-blue-500/5 rounded-[80px] blur-[100px] opacity-60 -z-10 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
                  
                  {/* Ultra-premium Elite Corner Accents with dynamic lighting effects */}
                  <div className="absolute top-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-md"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 left-1 w-18 h-18 border-t border-l border-blue-600/40 rounded-tl-lg"></div>
                    
                    {/* Animated corner accent with pulsing glow */}
                    <div className="absolute top-0 left-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '3s' }}></div>
                    
                    {/* Animated light ray accent */}
                    <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden rounded-tl-lg">
                      <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer-slow"></div>
                      <div className="absolute top-0 left-0 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-blue-400/80 to-transparent -translate-y-full animate-shimmer-slow"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-md"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-400/70 rounded-tr-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute top-1 right-1 w-18 h-18 border-t border-r border-blue-600/40 rounded-tr-lg"></div>
                    
                    {/* Animated corner accent with pulsing glow */}
                    <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                    
                    {/* Animated light ray accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-lg">
                      <div className="absolute top-0 right-0 w-[200%] h-[1px] bg-gradient-to-l from-transparent via-blue-400/80 to-transparent translate-x-full animate-shimmer-slow"></div>
                      <div className="absolute top-0 right-0 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-blue-400/80 to-transparent -translate-y-full animate-shimmer-slow" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-br-md"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/70 rounded-br-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 right-1 w-18 h-18 border-b border-r border-blue-600/40 rounded-br-lg"></div>
                    
                    {/* Animated corner accent with pulsing glow */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '4s' }}></div>
                    
                    {/* Animated light ray accent */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden rounded-br-lg">
                      <div className="absolute bottom-0 right-0 w-[200%] h-[1px] bg-gradient-to-l from-transparent via-blue-400/80 to-transparent translate-x-full animate-shimmer-slow"></div>
                      <div className="absolute bottom-0 right-0 h-[200%] w-[1px] bg-gradient-to-t from-transparent via-blue-400/80 to-transparent translate-y-full animate-shimmer-slow" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
                    {/* Multi-layered glowing corner effect */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-400/70 rounded-bl-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute bottom-1 left-1 w-18 h-18 border-b border-l border-blue-600/40 rounded-bl-lg"></div>
                    
                    {/* Animated corner accent with pulsing glow */}
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-400/60 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '4.5s' }}></div>
                    
                    {/* Animated light ray accent */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 overflow-hidden rounded-bl-lg">
                      <div className="absolute bottom-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer-slow"></div>
                      <div className="absolute bottom-0 left-0 h-[200%] w-[1px] bg-gradient-to-t from-transparent via-blue-400/80 to-transparent translate-y-full animate-shimmer-slow" style={{ animationDelay: '1.5s' }}></div>
                    </div>
                  </div>
                  
                  {/* Ultra-premium Enterprise Badge with Advanced 3D Styling */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/30 via-blue-400/40 to-blue-600/30 rounded-full blur-[10px] opacity-70 animate-pulse-slow"></div>
                    <div className="relative py-1.5 px-5 rounded-full bg-gradient-to-r from-blue-800/90 via-blue-700/90 to-blue-800/90 border border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_6px_rgba(59,130,246,0.4)_inset] transform group-hover:scale-105 transition-all duration-500">
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-slow"></div>
                      </div>
                      <span className="text-xs text-blue-100 font-semibold tracking-wide uppercase">Industry-Elite ROI Analysis</span>
                    </div>
                  </div>
                  
                  {/* State-of-the-Art Industry-Elite Enterprise Header with Cinematic 3D Effects */}
                  <div className="relative group">
                    {/* Ultra-advanced multi-layered volumetric glow system */}
                    <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/30 via-blue-500/25 to-blue-600/30 rounded-[50px] blur-[60px] opacity-80 z-0 group-hover:opacity-90 transition-opacity duration-700"></div>
                    <div className="absolute -inset-16 bg-gradient-to-r from-blue-700/20 via-blue-400/25 to-blue-700/20 rounded-full blur-[80px] opacity-70 z-0 animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute -inset-24 bg-gradient-to-tr from-blue-800/15 via-blue-500/15 to-blue-800/15 rounded-full blur-[100px] opacity-60 z-0 animate-pulse-very-slow" style={{ animationDuration: '15s' }}></div>
                    
                    {/* Cinematic volumetric light ray system with advanced dynamics */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-60 rotate-45 overflow-hidden z-0 opacity-40">
                      <div className="absolute h-full w-40 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-full animate-beam-slow"></div>
                      <div className="absolute h-full w-32 bg-gradient-to-r from-transparent via-blue-300/80 to-transparent -translate-x-full animate-beam-slow" style={{ animationDelay: '2.5s' }}></div>
                      <div className="absolute h-full w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-beam-slow" style={{ animationDelay: '4s' }}></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-40 -rotate-45 overflow-hidden z-0 opacity-40">
                      <div className="absolute h-full w-36 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-full animate-beam-slow" style={{ animationDelay: '1.2s' }}></div>
                      <div className="absolute h-full w-28 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent -translate-x-full animate-beam-slow" style={{ animationDelay: '3.7s' }}></div>
                    </div>
                    
                    {/* Enhanced atmospheric particulate effect with depth */}
                    <div className="absolute inset-0 mix-blend-overlay opacity-15" 
                      style={{
                        backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 0.6%)",
                        backgroundSize: "4px 4px"
                      }}>
                    </div>
                    
                    {/* Ultra-premium photorealistic 3D title with advanced lighting system */}
                    <div className="relative transform perspective-[1500px] group-hover:rotate-x-1 transition-transform duration-700">
                      {/* Advanced volumetric text glow system */}
                      <div className="absolute -inset-3 bg-gradient-to-br from-blue-600/25 via-blue-400/20 to-blue-600/25 rounded-[40px] blur-[30px] opacity-80 -z-10"></div>
                      <div className="absolute -inset-5 bg-gradient-to-r from-blue-700/15 via-blue-500/15 to-blue-700/15 rounded-[50px] blur-[40px] opacity-70 -z-10 animate-pulse-slow"></div>
                      
                      {/* Ultra-premium industry-elite 3D heading with photorealistic lighting and reflections */}
                      <h1 className="relative text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-50 to-white leading-tight max-w-6xl mx-auto tracking-tight transform transition-all duration-700 group-hover:scale-[1.02]" 
                        style={{ 
                          textShadow: "0 1px 1px rgba(0,0,0,0.9), 0 10px 30px rgba(59,130,246,0.4)", 
                          WebkitTextStroke: "1px rgba(255,255,255,0.15)"
                        }}>
                        <span className="relative inline-block">
                          {/* Text with inner light effect */}
                          <span className="absolute -inset-1 blur-[2px] opacity-20 bg-blue-300/30"></span>
                          
                          {/* Main text content with 3D depth */}
                          Mobile Home ROI Analysis Calculator
                        </span>
                        
                        {/* Ultra-realistic 3D lighting effects */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80"></div>
                        <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-70"></div>
                        
                        {/* Premium animated lighting effects */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-[3px] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/90 to-transparent"></div>
                          <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-shimmer-slow"></div>
                        </div>
                        
                        {/* Secondary reflection line for depth */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-3/5 h-[1px] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
                          <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer-slow" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                      </h1>
                    </div>
                  </div>
                  
                  {/* Ultra-premium Industry-Elite Subheader with Cinematic Interactive Effects */}
                  <div className="relative group">
                    {/* Advanced background glow system with dynamic hover effects */}
                    <div className="absolute -inset-6 bg-gradient-to-br from-blue-600/15 via-blue-500/10 to-blue-600/15 rounded-[30px] blur-[20px] opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                    <div className="absolute -inset-10 bg-blue-500/5 rounded-[40px] blur-[30px] opacity-0 group-hover:opacity-70 transition-all duration-1000 delay-100"></div>
                    
                    {/* Enhanced background pattern that reveals on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-xl"></div>
                    
                    {/* Ultra-premium paragraph with cinematic interactive hover effects */}
                    <p className="relative text-lg md:text-xl lg:text-2xl text-blue-100/90 max-w-4xl mx-auto mb-12 leading-relaxed tracking-wide">
                      <span className="relative">
                        {/* Subtle text glow effect */}
                        <span className="absolute -inset-1 text-blue-200/10 blur-[1px]"></span>
                        Discover how Praetorian Smart-Coat technology can 
                      </span>
                      
                      {/* Ultra-premium interactive key phrase with dynamic lighting effects */}
                      <span className="relative inline-block mx-2 group/item overflow-hidden">
                        {/* Multi-layered glow system */}
                        <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-500/20 rounded-md blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></span>
                        <span className="absolute -inset-2 bg-blue-500/10 rounded-lg blur-md opacity-0 group-hover/item:opacity-80 transition-opacity duration-500 delay-100"></span>
                        
                        {/* Advanced 3D text with lighting effects */}
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-white font-semibold px-1 py-0.5 border-b border-blue-400/0 group-hover/item:border-blue-400/40 transition-all duration-300"
                          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 0 10px rgba(59,130,246,0.3)" }}>
                          transform your mobile home's efficiency
                          
                          {/* Animated bottom highlight */}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></span>
                        </span>
                      </span>, 
                      
                      {/* Ultra-premium interactive key phrase with dynamic lighting effects */}
                      <span className="relative inline-block mx-2 group/item overflow-hidden">
                        {/* Multi-layered glow system */}
                        <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-500/20 rounded-md blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></span>
                        <span className="absolute -inset-2 bg-blue-500/10 rounded-lg blur-md opacity-0 group-hover/item:opacity-80 transition-opacity duration-500 delay-100"></span>
                        
                        {/* Advanced 3D text with lighting effects */}
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-white font-semibold px-1 py-0.5 border-b border-blue-400/0 group-hover/item:border-blue-400/40 transition-all duration-300"
                          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 0 10px rgba(59,130,246,0.3)" }}>
                          reduce utility costs
                          
                          {/* Animated bottom highlight */}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></span>
                        </span>
                      </span>, and 
                      
                      {/* Ultra-premium interactive key phrase with dynamic lighting effects */}
                      <span className="relative inline-block mx-2 group/item overflow-hidden">
                        {/* Multi-layered glow system */}
                        <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-500/20 rounded-md blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></span>
                        <span className="absolute -inset-2 bg-blue-500/10 rounded-lg blur-md opacity-0 group-hover/item:opacity-80 transition-opacity duration-500 delay-100"></span>
                        
                        {/* Advanced 3D text with lighting effects */}
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-white font-semibold px-1 py-0.5 border-b border-blue-400/0 group-hover/item:border-blue-400/40 transition-all duration-300"
                          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 0 10px rgba(59,130,246,0.3)" }}>
                          increase property value
                          
                          {/* Animated bottom highlight */}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></span>
                        </span>
                      </span> with our industry-leading ROI analysis system.
                      
                      {/* Subtle animated light sweep effect */}
                      <span className="absolute inset-0 w-full h-full overflow-hidden opacity-30">
                        <span className="absolute top-0 h-full w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-very-slow"></span>
                      </span>
                    </p>
                    
                    {/* Ultra-premium divider with animated shimmer effect */}
                    <div className="relative h-[2px] w-2/3 mx-auto mb-8 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"></div>
                      <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:animate-shimmer-slow"></div>
                    </div>
                  </div>
                  
                  {/* Ultra-premium 3D icons with advanced lighting effects */}
                  <div className="flex justify-center space-x-10 mt-6 mb-10">
                    <div className="flex flex-col items-center group">
                      <div className="relative p-3 mb-3 transform transition-all duration-300 group-hover:scale-110">
                        {/* Multi-layered glow effects */}
                        <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-xl opacity-60 group-hover:bg-blue-400/30 group-hover:opacity-80 transition-all duration-500"></div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-blue-500/30 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                        
                        {/* Premium 3D icon container with realistic glass effects */}
                        <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-blue-700/90 to-blue-900/95 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_10px_rgba(255,255,255,0.1)_inset] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6),0_0_15px_rgba(255,255,255,0.2)_inset] transition-all duration-500">
                          {/* Inner glass shine effect */}
                          <div className="absolute inset-0 overflow-hidden rounded-full">
                            <div className="absolute top-0 right-0 h-full w-[30%] bg-gradient-to-l from-transparent via-white/20 to-transparent skew-x-[-20deg] transform -translate-x-full group-hover:animate-shimmer-slow"></div>
                          </div>
                          
                          {/* Realistic light reflection */}
                          <div className="absolute top-[15%] left-[20%] w-[60%] h-[20%] bg-white/30 rounded-full blur-[1px] opacity-70"></div>
                          
                          {/* Icon */}
                          <ThermometerIcon className="h-6 w-6 text-blue-100/90" />
                        </div>
                      </div>
                      
                      {/* Enhanced label with hover animation */}
                      <div className="relative overflow-hidden">
                        <span className="block text-blue-100 text-sm font-semibold tracking-wide py-1 px-3 rounded-full bg-gradient-to-r from-blue-900/60 via-blue-800/60 to-blue-900/60 border border-blue-700/30 shadow-[0_2px_10px_rgba(0,0,0,0.2),0_0_5px_rgba(59,130,246,0.3)_inset] group-hover:shadow-[0_2px_15px_rgba(0,0,0,0.3),0_0_8px_rgba(59,130,246,0.4)_inset] transition-all duration-500">
                          Temperature Control
                          
                          {/* Animated bottom shimmer */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-400/50"></div>
                          <div className="absolute bottom-0 left-[-100%] right-0 h-[1px] w-[200%] bg-gradient-to-r from-transparent via-blue-300/80 to-transparent group-hover:animate-shimmer-slow"></div>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center group">
                      <div className="relative p-3 mb-3 transform transition-all duration-300 group-hover:scale-110">
                        {/* Multi-layered glow effects */}
                        <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-xl opacity-60 group-hover:bg-blue-400/30 group-hover:opacity-80 transition-all duration-500"></div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-blue-500/30 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                        
                        {/* Premium 3D icon container with realistic glass effects */}
                        <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-blue-700/90 to-blue-900/95 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_10px_rgba(255,255,255,0.1)_inset] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6),0_0_15px_rgba(255,255,255,0.2)_inset] transition-all duration-500">
                          {/* Inner glass shine effect */}
                          <div className="absolute inset-0 overflow-hidden rounded-full">
                            <div className="absolute top-0 right-0 h-full w-[30%] bg-gradient-to-l from-transparent via-white/20 to-transparent skew-x-[-20deg] transform -translate-x-full group-hover:animate-shimmer-slow"></div>
                          </div>
                          
                          {/* Realistic light reflection */}
                          <div className="absolute top-[15%] left-[20%] w-[60%] h-[20%] bg-white/30 rounded-full blur-[1px] opacity-70"></div>
                          
                          {/* Icon */}
                          <DollarSign className="h-6 w-6 text-blue-100/90" />
                        </div>
                      </div>
                      
                      {/* Enhanced label with hover animation */}
                      <div className="relative overflow-hidden">
                        <span className="block text-blue-100 text-sm font-semibold tracking-wide py-1 px-3 rounded-full bg-gradient-to-r from-blue-900/60 via-blue-800/60 to-blue-900/60 border border-blue-700/30 shadow-[0_2px_10px_rgba(0,0,0,0.2),0_0_5px_rgba(59,130,246,0.3)_inset] group-hover:shadow-[0_2px_15px_rgba(0,0,0,0.3),0_0_8px_rgba(59,130,246,0.4)_inset] transition-all duration-500">
                          Cost Savings
                          
                          {/* Animated bottom shimmer */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-400/50"></div>
                          <div className="absolute bottom-0 left-[-100%] right-0 h-[1px] w-[200%] bg-gradient-to-r from-transparent via-blue-300/80 to-transparent group-hover:animate-shimmer-slow"></div>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center group">
                      <div className="relative p-3 mb-3 transform transition-all duration-300 group-hover:scale-110">
                        {/* Multi-layered glow effects */}
                        <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-xl opacity-60 group-hover:bg-blue-400/30 group-hover:opacity-80 transition-all duration-500"></div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-blue-500/30 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                        
                        {/* Premium 3D icon container with realistic glass effects */}
                        <div className="relative h-14 w-14 flex items-center justify-center bg-gradient-to-br from-blue-700/90 to-blue-900/95 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_10px_rgba(255,255,255,0.1)_inset] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6),0_0_15px_rgba(255,255,255,0.2)_inset] transition-all duration-500">
                          {/* Inner glass shine effect */}
                          <div className="absolute inset-0 overflow-hidden rounded-full">
                            <div className="absolute top-0 right-0 h-full w-[30%] bg-gradient-to-l from-transparent via-white/20 to-transparent skew-x-[-20deg] transform -translate-x-full group-hover:animate-shimmer-slow"></div>
                          </div>
                          
                          {/* Realistic light reflection */}
                          <div className="absolute top-[15%] left-[20%] w-[60%] h-[20%] bg-white/30 rounded-full blur-[1px] opacity-70"></div>
                          
                          {/* Icon */}
                          <BarChart2 className="h-6 w-6 text-blue-100/90" />
                        </div>
                      </div>
                      
                      {/* Enhanced label with hover animation */}
                      <div className="relative overflow-hidden">
                        <span className="block text-blue-100 text-sm font-semibold tracking-wide py-1 px-3 rounded-full bg-gradient-to-r from-blue-900/60 via-blue-800/60 to-blue-900/60 border border-blue-700/30 shadow-[0_2px_10px_rgba(0,0,0,0.2),0_0_5px_rgba(59,130,246,0.3)_inset] group-hover:shadow-[0_2px_15px_rgba(0,0,0,0.3),0_0_8px_rgba(59,130,246,0.4)_inset] transition-all duration-500">
                          Increase Value
                          
                          {/* Animated bottom shimmer */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-400/50"></div>
                          <div className="absolute bottom-0 left-[-100%] right-0 h-[1px] w-[200%] bg-gradient-to-r from-transparent via-blue-300/80 to-transparent group-hover:animate-shimmer-slow"></div>
                        </span>
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
        
        {/* Features and Benefits Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Advanced ROI Benefits
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-950/80 to-black/80 rounded-xl p-6 border border-blue-700/30 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-blue-400/50 via-transparent to-transparent"></div>
                </div>
                
                <div className="mb-4 relative">
                  <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-lg opacity-60"></div>
                  <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-700/90 to-blue-900/95 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <ThermometerIcon className="h-6 w-6 text-blue-100" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Energy Efficiency Analysis</h3>
                <p className="text-blue-100/80">Advanced ceramic microsphere technology creates a thermal barrier that can reduce cooling costs by up to 87% and heating costs by up to 35%.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-950/80 to-black/80 rounded-xl p-6 border border-blue-700/30 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-blue-400/50 via-transparent to-transparent"></div>
                </div>
                
                <div className="mb-4 relative">
                  <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-lg opacity-60"></div>
                  <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-700/90 to-blue-900/95 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <Shield className="h-6 w-6 text-blue-100" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Protection Value Assessment</h3>
                <p className="text-blue-100/80">Class A fire-rated coating provides premium protection, qualifying for insurance premium discounts and increasing property resale value.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-950/80 to-black/80 rounded-xl p-6 border border-blue-700/30 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-blue-400/50 via-transparent to-transparent"></div>
                </div>
                
                <div className="mb-4 relative">
                  <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-lg opacity-60"></div>
                  <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-700/90 to-blue-900/95 rounded-full border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <CalendarDays className="h-6 w-6 text-blue-100" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Longevity ROI Calculation</h3>
                <p className="text-blue-100/80">Extends roof and exterior life by 15+ years, with detailed 5, 10, and 20-year ROI projections for total cost savings and value increase.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default MobileHomeFix;