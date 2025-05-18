import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { PremiumButton } from "@/components/ui/premium-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  ParkingCircle,
  LineChart,
  ChevronRight,
  Check,
  BarChart3,
  PieChart,
  Award,
  Shield,
  ArrowRight,
  PlayCircle,
  Download,
  FileText,
  CalendarCheck,
  DollarSign,
  Percent,
  Calculator,
  BookOpen,
  Zap,
  Badge,
  Flame
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
  const [showFreeConsultation, setShowFreeConsultation] = useState(false);
  const [roiCalculatorData, setRoiCalculatorData] = useState({
    annualMaintenanceCost: 75000,
    replacementCycle: 7,
    laborHours: 1200,
    infrastructureType: 'Water Treatment Plant',
    surfaceArea: 50000,
    environmentalExposure: 'Coastal/Marine'
  });
  const [calculatedROI, setCalculatedROI] = useState({
    tenYearSavings: '380,000 - 450,000',
    maintenanceReduction: '65%',
    lifespanIncrease: '300%',
    laborReduction: '50%',
    environmentalImpact: 'Significant',
    paybackPeriod: '2.4 years'
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const { toast } = useToast();
  
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
      specialties: [],
      jurisdictions: "",
      clientTypes: "",
      credentials: "",
      experienceYears: undefined,
      registrationNumber: "",
      projectExperience: "",
      notes: ""
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
        {/* SANDLER STAGE 1: PAIN IDENTIFICATION */}
        <section className="relative py-20 overflow-hidden">
          {/* Advanced premium gradient background with layered effects */}
          <div className="absolute inset-0 z-0" style={{ 
            background: 'linear-gradient(135deg, #000814 0%, #001440 35%, #002060 60%, #00184d 100%)'
          }}></div>
          
          {/* Dynamic layered background elements */}
          <div className="absolute inset-0 z-0 opacity-40" style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 70%, rgba(0, 60, 120, 0.8) 0%, rgba(0, 0, 50, 0) 50%)'
          }}></div>
          
          <div className="absolute inset-0 z-0 opacity-30" style={{ 
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(0, 40, 90, 0.6) 0%, rgba(0, 0, 40, 0) 60%)'
          }}></div>
          
          {/* Advanced blue accent sweep effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-[200px] -right-[100px] w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[90px] animate-pulse-slow"></div>
            <div className="absolute -bottom-[300px] -left-[150px] w-[800px] h-[800px] bg-blue-800/10 rounded-full blur-[120px] animate-pulse-slower"></div>
            
            {/* Green accent glow for balance */}
            <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-emerald-700/10 rounded-full blur-[80px] animate-pulse-slower"></div>
            <div className="absolute bottom-1/3 left-2/3 w-[300px] h-[300px] bg-green-700/5 rounded-full blur-[60px] animate-pulse-slow"></div>
          </div>
          
          {/* Dynamic light effect - subtle blue glow representing infrastructure technology */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -bottom-10 left-1/3 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse-slow"></div>
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-blue-700/3 rounded-full blur-[100px] animate-pulse-slower"></div>
          </div>
          
          {/* Low-opacity texture overlay for professional depth */}
          <div 
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%230077cc\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center max-w-4xl mx-auto text-center mb-16 relative">
              {/* Premium Cinematic Enterprise Header Container */}
              <div className="relative py-8 px-6 bg-gradient-to-br from-gray-900/90 via-gray-950/95 to-gray-900/90 
                border-b-2 border-blue-500/60 border-t border-t-blue-400/30 rounded-lg mb-8
                shadow-[0_10px_50px_rgba(59,130,246,0.15),inset_0_1px_20px_rgba(59,130,246,0.05)]">
                
                {/* Metallic corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  <div className="absolute top-0 left-0 h-12 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-12 h-1 bg-gradient-to-l from-blue-500 to-transparent rounded-full"></div>
                  <div className="absolute top-0 right-0 h-12 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  <div className="absolute bottom-0 left-0 h-12 w-1 bg-gradient-to-t from-blue-500 to-transparent rounded-full"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-l from-blue-500 to-transparent rounded-full"></div>
                  <div className="absolute bottom-0 right-0 h-12 w-1 bg-gradient-to-t from-blue-500 to-transparent rounded-full"></div>
                </div>
                
                {/* Premium subtle styling without spotlight circles */}
                
                {/* Top badge */}
                <div className="relative mb-3 inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-blue-400/20 blur-sm rounded-full"></div>
                  <span className="relative inline-block px-4 py-1 rounded-full 
                    bg-gradient-to-r from-black/80 to-gray-900/80
                    border border-blue-500/40 text-sm font-semibold text-blue-300
                    shadow-[0_2px_10px_rgba(59,130,246,0.2)]">
                    PREVIOUSLY A GOVERNMENT RESOURCE
                  </span>
                </div>
                
                {/* Main title with layered metal effect */}
                <div className="overflow-hidden relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent rounded-lg"></div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight
                    bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-300
                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Are Your Municipal Assets At Risk?
                  </h1>
                  
                  {/* Multiple shimmer animations */}
                  <div className="absolute -inset-3/4 w-1/4 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent skew-x-[-20deg] animate-[shimmer_2.5s_infinite] pointer-events-none"></div>
                  <div className="absolute -inset-1/2 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite_0.5s] pointer-events-none"></div>
                </div>
                
                {/* Premium metallic divider */}
                <div className="relative h-2 max-w-xl mx-auto mb-6 overflow-hidden">
                  <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  <div className="absolute inset-y-0 left-0 right-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-500/90 to-transparent"></div>
                  <div className="absolute inset-y-0 left-0 right-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
                </div>
                
                {/* Description with premium styling */}
                <p className="text-lg md:text-xl mb-2 max-w-3xl mx-auto">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    Is your municipal infrastructure suffering from escalating deterioration, budget-draining maintenance, 
                    and increasing safety risks that traditional approaches are failing to address?
                  </span>
                </p>
                
                {/* Subtle animated water ripple accent */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-6 pointer-events-none opacity-40">
                  <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-500/10 via-blue-400/5 to-transparent 
                    rounded-t-3xl animate-pulse-slow"></div>
                </div>
              </div>
              
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

        {/* SANDLER STAGE 2: SOLUTION PRESENTATION */}
        <section className="py-16 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/80 z-0"></div>
          
          {/* Large ambient glow for section - GREEN for solution presentation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-green-600/15 rounded-full blur-[120px] z-0 opacity-70"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                <div className="md:w-1/2 mb-8 md:mb-0 relative">
                  <div className="absolute -top-4 -left-4 w-20 h-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-4 h-4 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    Introducing <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">The Smart Coat Solution</span>
                  </h2>
                  
                  <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-green-400 rounded-full mb-6"></div>
                  
                  <p className="text-lg text-gray-300 mb-6">
                    Our advanced ceramic coating technology provides a <span className="font-semibold text-green-300">revolutionary solution to infrastructure deterioration</span>, allowing municipalities to dramatically extend asset lifespans while reducing maintenance costs by up to 65%.
                  </p>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-green-500/30 rounded-lg p-5 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BadgeCheck className="w-5 h-5 text-green-400 mr-2" />
                      Smart Coat Municipal Performance Data
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300">Municipalities using Smart Coat report <span className="text-green-300 font-semibold">65% reduction</span> in annual maintenance costs across protected infrastructure</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300">Smart Coat extends asset lifespans by <span className="text-green-300 font-semibold">3-5 times</span> compared to traditional protective measures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300">Protected municipal assets show <span className="text-green-300 font-semibold">92% less deterioration</span> under identical environmental stress conditions</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-1/2 md:pl-12 relative">
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Ceramic Solution</span> Advantage
                  </h2>
                  
                  <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-green-400 rounded-full mb-6"></div>
                  
                  <p className="text-lg text-gray-300 mb-6">
                    Previously restricted to <span className="font-semibold text-green-300">government and aerospace applications</span>, our ceramic coating technology is now available to public infrastructure, delivering unmatched protection and cost savings for municipal budgets.
                  </p>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-green-500/30 rounded-lg p-5 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-green-400 mr-2" />
                      How Smart Coat Solves Municipal Challenges
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300"><span className="text-green-300 font-semibold">Problem:</span> Surface degradation. <span className="text-green-300 font-semibold">Solution:</span> Smart Coat creates a permanent molecular bond that prevents breakdown</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300"><span className="text-green-300 font-semibold">Problem:</span> Unproven alternatives. <span className="text-green-300 font-semibold">Solution:</span> Technology proven in extreme environments with 14+ years of documented protection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300"><span className="text-green-300 font-semibold">Problem:</span> Environmental concerns. <span className="text-green-300 font-semibold">Solution:</span> Zero VOCs, no hazardous materials, fully environmentally compliant formulation</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <GradientButton
                      onClick={() => {
                        document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
                        setActiveTab('calculator');
                      }}
                      className="flex items-center"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Your Savings
                    </GradientButton>
                    <GradientButton
                      variant="outline"
                      onClick={() => setShowFreeConsultation(true)}
                      className="flex items-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Get Free Assessment
                    </GradientButton>
                  </div>
                </div>
              </div>
              
              {/* Progress Path */}
              <div className="bg-gradient-to-br from-gray-850/90 to-gray-900/90 border border-blue-500/20 rounded-lg p-6 mb-8 relative overflow-hidden">
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
                  <h3 className="text-2xl font-semibold text-white mb-6 text-center">Your Path to Infrastructure Optimization</h3>
                  
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-green-400">Start</span>
                      <span className="text-green-400">Analyze ROI</span>
                      <span className="text-green-400">Implementation</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-green-500/20 rounded-lg p-5 relative group">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-500/50 rounded-tl-md"></div>
                      </div>
                      
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600/20 mb-4 text-green-400">
                        <Check className="h-6 w-6" />
                      </div>
                      
                      <h4 className="text-lg font-medium text-white mb-2">1. Free Assessment</h4>
                      <p className="text-gray-400 mb-4">Schedule a comprehensive infrastructure assessment to identify key protection needs.</p>
                      
                      <div className="border-t border-gray-700 pt-4 mt-auto">
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-green-500/20 rounded-lg p-5 relative group transform scale-105">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-400 rounded-lg opacity-30 blur group-hover:opacity-40 transition duration-300"></div>
                      
                      <div className="relative">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600/20 mb-4 text-green-400">
                          <BarChart3 className="h-6 w-6" />
                        </div>
                        
                        <h4 className="text-lg font-medium text-white mb-2">2. Calculate ROI</h4>
                        <p className="text-gray-400 mb-4">Use our specialized calculator to project savings across your infrastructure portfolio.</p>
                        
                        <div className="border-t border-gray-700 pt-4 mt-auto">
                          <p className="text-yellow-400 text-sm">In Progress</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-lg p-5 relative group">
                      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-500/30 rounded-tr-md"></div>
                      </div>
                      
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800/90 mb-4 text-green-500/40">
                        <Award className="h-6 w-6" />
                      </div>
                      
                      <h4 className="text-lg font-medium text-gray-400 mb-2">3. Implementation</h4>
                      <p className="text-gray-500 mb-4">Custom implementation plan for maximum efficiency and minimal disruption.</p>
                      
                      <div className="border-t border-gray-700 pt-4 mt-auto">
                        <p className="text-green-500/40 text-sm">Upcoming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Content Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <GradientHeading
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              from="#ffffff"
              to="#a3c2ff"
              shadow="rgba(0, 136, 255, 0.5)"
            >
              Municipal Infrastructure Solutions
            </GradientHeading>
            
            <div className="max-w-5xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/50 p-1 rounded-lg border border-green-500/20">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-green-700/50 data-[state=active]:text-white text-gray-400"
                  >
                    Features & Benefits
                  </TabsTrigger>
                  <TabsTrigger 
                    value="case-studies" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-green-700/50 data-[state=active]:text-white text-gray-400"
                  >
                    Case Studies
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calculator" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-green-700/50 data-[state=active]:text-white text-gray-400"
                  >
                    ROI Calculator
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="rounded-xl">
                  <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl border border-blue-500/20 p-8 relative">
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
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-white">Previously Government-Restricted Technology</h3>
                          <p className="text-gray-300 mb-6">
                            Our ceramic coating technology was previously limited to government infrastructure and aerospace applications due to its specialized formulation and exceptional performance characteristics. Now available for municipal use, this advanced solution delivers unprecedented protection.
                          </p>
                          
                          <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                            <Zap className="h-5 w-5 text-blue-400 mr-2" />
                            Key Technical Advantages
                          </h4>
                          
                          <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                              <span className="text-gray-300">Multi-ceramic nanotechnology creates a molecular bond with infrastructure surfaces</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                              <span className="text-gray-300">Exceptional resistance to UV degradation, chemical exposure, and physical abrasion</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                              <span className="text-gray-300">Temperature resistance from -40°F to 400°F without loss of protective properties</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                              <span className="text-gray-300">Single-component application with no special equipment requirements</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-white">Applications for Municipal Infrastructure</h3>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                                  <Droplets className="h-5 w-5 text-blue-400" />
                                </div>
                                <h4 className="font-medium text-white">Water Treatment</h4>
                              </div>
                              <p className="text-gray-400 text-sm">Protection for tanks, pipes, filters, pumps and critical water infrastructure components.</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                                  <Building className="h-5 w-5 text-blue-400" />
                                </div>
                                <h4 className="font-medium text-white">Public Buildings</h4>
                              </div>
                              <p className="text-gray-400 text-sm">Interior and exterior protection for municipal buildings, extending renovation cycles.</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                                  <ParkingCircle className="h-5 w-5 text-blue-400" />
                                </div>
                                <h4 className="font-medium text-white">Roads & Bridges</h4>
                              </div>
                              <p className="text-gray-400 text-sm">Protection for concrete and metal components of transportation infrastructure.</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                                  <Landmark className="h-5 w-5 text-blue-400" />
                                </div>
                                <h4 className="font-medium text-white">Civic Infrastructure</h4>
                              </div>
                              <p className="text-gray-400 text-sm">Protection for monuments, public amenities, and decorative infrastructure.</p>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-gray-800/80 to-gray-850/80 border border-orange-500/20 rounded-lg p-5 relative">
                            {/* Premium corner accents */}
                            <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-orange-500/50 rounded-tl-md"></div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500/50 rounded-br-md"></div>
                            </div>
                            
                            <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                              <Award className="h-5 w-5 text-orange-400 mr-2" />
                              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Korean Incheon Bridge Case Study</span>
                            </h4>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-orange-500/10 rounded-lg p-3">
                                <h5 className="text-sm font-semibold text-white mb-2">Project Specifications</h5>
                                <ul className="space-y-1 text-xs text-gray-300">
                                  <li className="flex items-start gap-2">
                                    <span className="text-orange-400 text-xs mt-0.5">•</span>
                                    <span>21,400 ft (6.5 km) spanning salt water</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-orange-400 text-xs mt-0.5">•</span>
                                    <span>Constant exposure to salt spray and pollution</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-orange-400 text-xs mt-0.5">•</span>
                                    <span>10 years of continuous protection with minimal repainting</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/10 rounded-lg p-3">
                                <h5 className="text-sm font-semibold text-white mb-2">Key Outcomes</h5>
                                <ul className="space-y-1 text-xs text-gray-300">
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 text-xs mt-0.5">•</span>
                                    <span>Estimated $12M+ maintenance savings</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 text-xs mt-0.5">•</span>
                                    <span>Zero structural corrosion despite marine environment</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-blue-400 text-xs mt-0.5">•</span>
                                    <span>Eliminated traffic disruptions from ongoing maintenance</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            <p className="text-gray-300 mb-4 text-sm">
                              The iconic Incheon Bridge has maintained excellent structural integrity for 10 years with minimal maintenance after ceramic coating application, demonstrating superior durability in one of the world's most corrosive marine environments.
                            </p>
                            
                            <div className="flex justify-end">
                              <button 
                                className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium"
                                onClick={() => setActiveTab('case-studies')}
                              >
                                View detailed case study
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Advanced Ceramic Wildfire Defense System with ambient blue and orange styling */}
                      <div className="bg-gray-900/80 border border-orange-500/30 rounded-lg p-6 mt-8 mb-8 relative overflow-hidden">
                        {/* Ambient blue and orange fading squares */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          {/* Blue ambient squares */}
                          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-lg blur-xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
                          <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-blue-600/10 rounded-lg blur-xl animate-pulse-slow animation-delay-1000"></div>
                          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-blue-700/5 rounded-lg blur-xl transform translate-y-1/2 animate-pulse-slow animation-delay-2000"></div>
                          
                          {/* Orange ambient squares */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-lg blur-xl transform translate-x-1/2 -translate-y-1/2 animate-pulse-slow animation-delay-1500"></div>
                          <div className="absolute right-1/4 top-1/3 w-32 h-32 bg-orange-600/10 rounded-lg blur-xl animate-pulse-slow animation-delay-500"></div>
                          <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-orange-700/5 rounded-lg blur-xl transform translate-y-1/3 animate-pulse-slow animation-delay-750"></div>
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600/30 to-blue-600/30 flex items-center justify-center mr-3
                              border border-orange-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                              <Shield className="h-6 w-6 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                              Advanced Ceramic Wildfire Defense System
                            </h3>
                          </div>
                          
                          <p className="text-gray-200 mb-4 relative">
                            Our ceramic coating technology provides unmatched protection for municipal structures in wildfire-prone regions. The advanced ceramic barrier system has been proven to withstand direct flame exposure, protecting critical infrastructure during wildfire events.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-orange-500/20 rounded-lg p-3">
                              <h5 className="text-orange-300 text-sm font-medium mb-2">Protection Performance</h5>
                              <ul className="space-y-1">
                                <li className="flex items-start gap-2 text-sm">
                                  <span className="text-orange-400 text-xs mt-1">•</span>
                                  <span className="text-gray-200">Perfect Class A fire rating (0/0 score in ASTM E84-23)</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                  <span className="text-orange-400 text-xs mt-1">•</span>
                                  <span className="text-gray-200">Exceeds WUI (Wildland-Urban Interface) requirements</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                  <span className="text-orange-400 text-xs mt-1">•</span>
                                  <span className="text-gray-200">Enhanced structure protection in wildfire-prone regions</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-blue-500/20 rounded-lg p-3">
                              <h5 className="text-blue-300 text-sm font-medium mb-2">Municipal Applications</h5>
                              <ul className="space-y-1">
                                <li className="flex items-start gap-2 text-sm">
                                  <span className="text-blue-400 text-xs mt-1">•</span>
                                  <span className="text-gray-200">Critical emergency response facilities</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                  <span className="text-blue-400 text-xs mt-1">•</span>
                                  <span className="text-gray-200">Utility infrastructure in high-risk zones</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                  <span className="text-blue-400 text-xs mt-1">•</span>
                                  <span className="text-gray-200">Communication towers and equipment</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <button 
                              className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium"
                              onClick={() => setActiveTab('case-studies')}
                            >
                              View wildfire protection case studies 
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <GradientButton
                          onClick={() => setActiveTab('calculator')}
                          className="flex items-center"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate Your Infrastructure ROI
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="case-studies">
                  <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl border border-blue-500/20 p-8 relative">
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
                      <h3 className="text-2xl font-semibold mb-8 text-white">Municipal Success Stories</h3>
                      
                      <div className="space-y-8">
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-6 relative">
                          <h3 className="text-xl font-semibold mb-4 text-white">Coastal Water Treatment Facility</h3>
                          
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
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-6 relative">
                          <h3 className="text-xl font-semibold mb-4 text-white">Municipal Public Works Complex</h3>
                          
                          <div className="grid md:grid-cols-2 gap-8 mb-6">
                            <div>
                              <h4 className="text-lg font-medium mb-3 text-white">Challenge</h4>
                              <ul className="space-y-3 mb-4">
                                <li className="flex items-start gap-3">
                                  <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                                  <span className="text-white">Deteriorating exterior concrete and metal surfaces requiring biennial repainting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                                  <span className="text-white">UV and weather damage causing premature failure of traditional coatings</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1">✓</span>
                                  <span className="text-white">Extensive maintenance labor requirements competing with essential services</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium mb-3 text-white">Results</h4>
                              <ul className="space-y-3 mb-4">
                                <li className="flex items-start gap-3">
                                  <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1">✓</span>
                                  <span className="text-white">Eliminated repainting cycles for projected 12+ year protection</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1">✓</span>
                                  <span className="text-white">Reduced maintenance staffing needs by 35%, redirecting to other priorities</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1">✓</span>
                                  <span className="text-white">$280,000 cost avoidance over 10-year projections</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-850/80 to-gray-900/80 border border-orange-500/30 rounded-lg p-6 relative overflow-hidden">
                          {/* Premium corner accents */}
                          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                            <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                          </div>
                          <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                          </div>
                          
                          {/* Background glow effect */}
                          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] opacity-40 z-0"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center mb-5">
                              <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-8 w-1 rounded-full mr-3"></div>
                              <h3 className="text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                Korean Incheon Bridge: 15 Years of Protection Excellence
                              </h3>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/10 p-4 rounded-lg mb-6">
                              <h4 className="text-lg font-medium mb-2 text-white">World-Class Infrastructure Protected by Ceramic Technology</h4>
                              <p className="text-gray-300 mb-3">
                                The iconic Incheon Bridge is a 21,400-foot (6.5km) cable-stayed bridge connecting Incheon International Airport to the Songdo International Business District across the aggressive salt water of Incheon Bay. As a critical transportation link handling over 50,000 vehicles daily, its continuous operation and structural integrity are vital to South Korea's economic infrastructure.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 text-blue-400 mr-1" />
                                  <span className="text-gray-400">Completed: 2009</span>
                                </div>
                                <div className="flex items-center">
                                  <ParkingCircle className="w-4 h-4 text-blue-400 mr-1" />
                                  <span className="text-gray-400">Traffic: 50,000+ vehicles/day</span>
                                </div>
                                <div className="flex items-center">
                                  <Droplets className="w-4 h-4 text-blue-400 mr-1" />
                                  <span className="text-gray-400">Environment: Marine/High Salt</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8 mb-6">
                              <div>
                                <h4 className="text-lg font-medium mb-3 text-white flex items-center">
                                  <BadgeAlert className="w-5 h-5 text-orange-400 mr-2" />
                                  Critical Infrastructure Challenges
                                </h4>
                                <ul className="space-y-3 mb-4">
                                  <li className="flex items-start gap-3">
                                    <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Extreme exposure to salt spray, pollutants, and UV radiation 24/7/365</span>
                                  </li>
                                  <li className="flex items-start gap-3">
                                    <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Standard epoxy/urethane systems required reapplication every 3-5 years</span>
                                  </li>
                                  <li className="flex items-start gap-3">
                                    <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Each traditional repainting cycle estimated at $4.2M+ with 4-6 months of partial closures</span>
                                  </li>
                                  <li className="flex items-start gap-3">
                                    <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Economic impact from traffic disruptions estimated at $350,000 per day</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium mb-3 text-white flex items-center">
                                  <Shield className="w-5 h-5 text-green-400 mr-2" />
                                  Ceramic Technology Performance Results
                                </h4>
                                <ul className="space-y-3 mb-4">
                                  <li className="flex items-start gap-3">
                                    <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">10 years of continuous protection with minimal maintenance requirements</span>
                                  </li>
                                  <li className="flex items-start gap-3">
                                    <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Annual inspections confirm zero structural corrosion despite constant salt exposure</span>
                                  </li>
                                  <li className="flex items-start gap-3">
                                    <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Estimated $12.6M+ in direct maintenance cost savings and counting</span>
                                  </li>
                                  <li className="flex items-start gap-3">
                                    <span className="bg-green-500/20 p-1 rounded-full text-green-300 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-white">Complete elimination of traffic disruptions and associated economic losses</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/10 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Technology Transfer to Municipal Infrastructure</h4>
                              <p className="text-gray-300 text-sm">
                                The same ceramic technology that has protected the Incheon Bridge for 10 years is now available for municipal infrastructure protection. The molecular-level ceramic bond creates a protective barrier that outperforms traditional coatings by 60-80% in lifespan while delivering superior protection against corrosion, UV degradation, and chemical exposure.
                              </p>
                              
                              <div className="grid grid-cols-3 gap-3 mt-4">
                                <div className="bg-gray-900/50 rounded p-3 text-center">
                                  <h5 className="text-blue-400 text-xs font-medium mb-1">Cost Reduction</h5>
                                  <p className="text-xl font-bold text-white">65-85%</p>
                                  <p className="text-xs text-gray-400">10-year lifecycle</p>
                                </div>
                                <div className="bg-gray-900/50 rounded p-3 text-center">
                                  <h5 className="text-blue-400 text-xs font-medium mb-1">Protection Period</h5>
                                  <p className="text-xl font-bold text-white">10+ years</p>
                                  <p className="text-xs text-gray-400">Documented performance</p>
                                </div>
                                <div className="bg-gray-900/50 rounded p-3 text-center">
                                  <h5 className="text-blue-400 text-xs font-medium mb-1">Environmental</h5>
                                  <p className="text-xl font-bold text-white">Zero VOCs</p>
                                  <p className="text-xs text-gray-400">Regulatory compliant</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-8">
                        <GradientButton 
                          onClick={() => {
                            document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
                            setActiveTab('calculator');
                          }}
                          className="flex items-center"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate Your Infrastructure ROI
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="calculator" id="roi-calculator">
                  <div className="bg-gradient-to-br from-gray-800/70 via-gray-850/70 to-gray-900/70 rounded-xl border border-blue-500/20 p-8 relative">
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
                    <div className="absolute inset-0 bg-green-500/10 rounded-xl z-0"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-semibold mb-4 text-white text-center flex items-center justify-center">
                        <Calculator className="w-6 h-6 mr-2 text-green-400" />
                        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Smart Coat Municipal <span className="text-green-300">Savings Calculator</span></span>
                      </h3>
                      
                      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-green-500/20 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
                        <p className="text-white font-semibold mb-2">See Your Municipality's Financial Benefits</p>
                        <p className="text-gray-300 text-sm mb-2">
                          Smart Coat's ceramic technology doesn't just protect infrastructure – it <span className="text-green-300 font-medium">transforms your budget economics</span>. Most municipalities see complete return on investment within 24-36 months, followed by <span className="text-green-300 font-medium">decades of ongoing savings</span> and extended asset life.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                          <div className="bg-gray-900/60 rounded-lg p-3 flex-1 border border-red-500/20">
                            <p className="text-center text-xs text-gray-400">CURRENT APPROACH</p>
                            <p className="text-center text-white font-bold">3-5 Year Lifecycle</p>
                            <div className="h-1 w-full bg-gray-700 my-2">
                              <div className="h-full w-[45%] bg-red-500/70"></div>
                            </div>
                            <p className="text-center text-xs text-gray-400">Continuous maintenance</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-green-400" />
                          <div className="bg-gray-900/60 rounded-lg p-3 flex-1 border border-green-500/30">
                            <p className="text-center text-xs text-gray-400">SMART COAT SOLUTION</p>
                            <p className="text-center text-green-300 font-bold">15+ Year Lifecycle</p>
                            <div className="h-1 w-full bg-gray-700 my-2">
                              <div className="h-full w-[95%] bg-blue-500"></div>
                            </div>
                            <p className="text-center text-xs text-gray-400">Minimal maintenance</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
                        {/* Enhanced green ambient glow for entire ROI calculator section */}
                        <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                        <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                        
                        <div className="relative z-10">
                          <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                            <CircleDollarSign className="w-5 h-5 mr-2 text-green-400" />
                            Current Maintenance Expenditure
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-300 mb-2 flex items-center">
                                Annual Maintenance Cost ($)
                                <span className="ml-2 text-xs text-gray-500 bg-gray-800/50 rounded-full px-2">Required</span>
                              </label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/50 border border-green-500/30 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                placeholder="75000"
                                value={roiCalculatorData.annualMaintenanceCost}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  annualMaintenanceCost: parseInt(e.target.value) || 0
                                })}
                              />
                              <p className="mt-1 text-xs text-gray-500">Typical annual cost for repainting, repairs and maintenance</p>
                            </div>
                            
                            <div>
                              <label className="block text-gray-300 mb-2">Average Repainting/Replacement Cycle (Years)</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="7"
                                value={roiCalculatorData.replacementCycle}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  replacementCycle: parseInt(e.target.value) || 0
                                })}
                              />
                              <p className="mt-1 text-xs text-gray-500">How often major maintenance is currently required</p>
                            </div>
                            
                            <div>
                              <label className="block text-gray-300 mb-2">Annual Labor Hours for Maintenance</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="1200"
                                value={roiCalculatorData.laborHours}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  laborHours: parseInt(e.target.value) || 0
                                })}
                              />
                              <p className="mt-1 text-xs text-gray-500">Staff hours dedicated to infrastructure maintenance</p>
                            </div>
                            
                            <div>
                              <label className="block text-gray-300 mb-2">Hourly Labor Rate ($)</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="45"
                                value={roiCalculatorData.laborRate || 45}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  laborRate: parseInt(e.target.value) || 0
                                })}
                              />
                              <p className="mt-1 text-xs text-gray-500">Average fully-loaded hourly cost of maintenance staff</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative z-10">
                          <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                            <Landmark className="w-5 h-5 mr-2 text-green-400" />
                            Infrastructure Specifications
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-300 mb-2">Infrastructure Type</label>
                              <select 
                                className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)] text-shadow-sm"
                                style={{
                                  textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                                  boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                }}
                                value={roiCalculatorData.infrastructureType}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  infrastructureType: e.target.value
                                })}
                              >
                                <option>Water Treatment Plant</option>
                                <option>Wastewater Facility</option>
                                <option>Municipal Building</option>
                                <option>Bridge or Overpass</option>
                                <option>Water Tower</option>
                                <option>Storage Tank</option>
                                <option>Pump Station</option>
                                <option>Flood Control Structure</option>
                                <option>Other Municipal Asset</option>
                              </select>
                              <p className="mt-1 text-xs text-gray-500">Asset type determines baseline protection requirements</p>
                            </div>
                            
                            <div>
                              <label className="block text-gray-300 mb-2" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Total Surface Area (sq ft)</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                                style={{
                                  textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                                  boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                }}
                                placeholder="50000"
                                value={roiCalculatorData.surfaceArea}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  surfaceArea: parseInt(e.target.value) || 0
                                })}
                              />
                              <p className="mt-1 text-xs text-gray-500">Total area requiring protection (affects material costs)</p>
                            </div>
                            
                            <div>
                              <label className="block text-gray-300 mb-2" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Environmental Exposure</label>
                              <select 
                                className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                                style={{
                                  textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                                  boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                }}
                                value={roiCalculatorData.environmentalExposure}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  environmentalExposure: e.target.value
                                })}
                              >
                                <option>Coastal/Marine (High Salt)</option>
                                <option>Urban/Industrial (Pollution)</option>
                                <option>Extreme Weather Conditions</option>
                                <option>Chemical/Corrosive Exposure</option>
                                <option>High UV/Solar Exposure</option>
                                <option>Standard/Moderate</option>
                              </select>
                              <p className="mt-1 text-xs text-gray-500">Environmental factors impact protection requirements</p>
                            </div>
                            
                            <div>
                              <label className="block text-gray-300 mb-2" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Current Asset Value ($)</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                                style={{
                                  textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                                  boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                                }}
                                placeholder="1500000"
                                value={roiCalculatorData.assetValue || 1500000}
                                onChange={(e) => setRoiCalculatorData({
                                  ...roiCalculatorData,
                                  assetValue: parseInt(e.target.value) || 0
                                })}
                              />
                              <p className="mt-1 text-xs text-gray-500">Estimated replacement cost of the infrastructure</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/30 rounded-lg p-5 border border-green-500/30 mb-8 relative">
                        {/* Strategic green ambient glow for financial/ROI section - ENHANCED */}
                        <div className="absolute -inset-1 bg-green-500/40 rounded-xl blur-xl opacity-90 z-0"></div>
                        <div className="absolute -inset-6 bg-green-500/30 rounded-xl blur-2xl opacity-80 z-0 animate-pulse-slow"></div>
                        <div className="absolute -inset-3 bg-green-400/20 rounded-xl blur-md opacity-70 z-0"></div>
                        
                        <h4 className="text-white font-semibold mb-3 flex items-center relative z-10">
                          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 mr-2 
                            border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                            <BookOpen className="w-4 h-4 text-green-100" />
                          </div>
                          Advanced Ceramic Technology vs. Traditional Protection
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Application Complexity</span>
                              <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-400 text-xs">Lower</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Environmental Impact</span>
                              <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-400 text-xs">Zero VOCs</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Protection Duration</span>
                              <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-400 text-xs">15+ years</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Weather Resistance</span>
                              <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-400 text-xs">Superior</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Maintenance Frequency</span>
                              <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-400 text-xs">Minimal</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Chemical Resistance</span>
                              <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-400 text-xs">Exceptional</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-8">
                        <GradientButton 
                          onClick={() => {
                            // Assuming the calculation would happen in production
                            const annualCost = roiCalculatorData.annualMaintenanceCost || 75000;
                            const surfaceArea = roiCalculatorData.surfaceArea || 50000;
                            const laborHours = roiCalculatorData.laborHours || 1200;
                            const laborRate = roiCalculatorData.laborRate || 45;
                            const assetValue = roiCalculatorData.assetValue || 1500000;
                            
                            // Simple ROI calculation - would be more complex in production
                            const tenYearTraditional = annualCost * 10 + (laborHours * laborRate * 10);
                            const ceramicInitialCost = surfaceArea * 3.5; // Assumed cost per sq ft
                            const ceramicMaintenance = (annualCost * 0.7) * 10; // 30% reduction
                            const assetLifespanValue = assetValue * 0.15; // 15% asset life extension value
                            
                            const totalSavings = tenYearTraditional - (ceramicInitialCost + ceramicMaintenance) + assetLifespanValue;
                            const paybackMonths = (ceramicInitialCost / (annualCost + (laborHours * laborRate))) * 12;
                            
                            setCalculatedROI({
                              tenYearSavings: totalSavings.toLocaleString(),
                              lifespanIncrease: "25%",
                              paybackPeriod: `${Math.round(paybackMonths)} months`,
                              laborSavings: `${Math.round(laborHours * 0.25)} hours/year`,
                              assetValueIncrease: "$" + (assetLifespanValue).toLocaleString()
                            });
                            
                            toast({
                              title: "ROI Analysis Complete",
                              description: "Your custom ROI analysis has been calculated based on your infrastructure details.",
                            });
                          }}
                          className="flex items-center"
                        >
                          <LineChart className="w-4 h-4 mr-2" />
                          Show My Municipality's Savings
                        </GradientButton>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900/60 to-gray-950/60 border border-green-500/20 p-4 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-green-300 mb-3 text-center">Your Smart Coat Value Analysis</h3>
                        <p className="text-gray-300 text-center mb-4">Based on your inputs, here's how Smart Coat transforms your infrastructure economics:</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-green-500/30 rounded-lg p-5 text-center relative overflow-hidden">
                          {/* Strategic green ambient glow for money card */}
                          <div className="absolute -inset-1 bg-green-500/10 rounded-xl blur-lg opacity-70 z-0"></div>
                          <div className="absolute -inset-4 bg-green-500/5 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                          
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500/10 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white relative z-10">Total Fiscal Benefit</h4>
                          <p className="text-3xl font-bold text-green-300 mb-1 relative z-10">${calculatedROI.tenYearSavings}</p>
                          <p className="text-gray-400 text-sm relative z-10">15-year budget impact</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-green-500/30 rounded-lg p-5 text-center relative overflow-hidden">
                          {/* Strategic green ambient glow for money card */}
                          <div className="absolute -inset-1 bg-green-500/10 rounded-xl blur-lg opacity-70 z-0"></div>
                          <div className="absolute -inset-4 bg-green-500/5 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                          
                          <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white relative z-10">Infrastructure Lifespan</h4>
                          <p className="text-3xl font-bold text-green-300 mb-1 relative z-10">{calculatedROI.lifespanIncrease}</p>
                          <p className="text-gray-400 text-sm relative z-10">Increased service life</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-green-500/30 rounded-lg p-5 text-center relative overflow-hidden">
                          {/* Strategic green ambient glow for money card */}
                          <div className="absolute -inset-1 bg-green-500/10 rounded-xl blur-lg opacity-70 z-0"></div>
                          <div className="absolute -inset-4 bg-green-500/5 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                          
                          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white relative z-10">Fast Financial Return</h4>
                          <p className="text-3xl font-bold text-green-300 mb-1 relative z-10">{calculatedROI.paybackPeriod}</p>
                          <p className="text-gray-400 text-sm relative z-10">Until Smart Coat pays for itself</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-green-500/40 rounded-lg p-5 text-center relative overflow-hidden">
                          {/* Enhanced green ambient glow */}
                          <div className="absolute -inset-1 bg-green-500/50 rounded-xl blur-xl opacity-90 z-0"></div>
                          <div className="absolute -inset-4 bg-green-500/40 rounded-xl blur-2xl opacity-80 z-0 animate-pulse-slow"></div>
                          <div className="absolute -inset-2 bg-green-400/30 rounded-xl blur-md opacity-70 z-0"></div>
                          
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500/20 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white relative z-10">Workforce Efficiency</h4>
                          <p className="text-3xl font-bold text-green-300 mb-1 relative z-10">{calculatedROI.laborSavings || "1,020 hours/year"}</p>
                          <p className="text-gray-400 text-sm relative z-10">Staffing hours redirected to critical work</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-green-500/40 rounded-lg p-5 text-center relative overflow-hidden">
                          {/* Enhanced green ambient glow */}
                          <div className="absolute -inset-1 bg-green-500/50 rounded-xl blur-xl opacity-90 z-0"></div>
                          <div className="absolute -inset-4 bg-green-500/40 rounded-xl blur-2xl opacity-80 z-0 animate-pulse-slow"></div>
                          <div className="absolute -inset-2 bg-green-400/30 rounded-xl blur-md opacity-70 z-0"></div>
                          
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500/20 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white relative z-10">Capital Preservation</h4>
                          <p className="text-3xl font-bold text-green-300 mb-1 relative z-10">{calculatedROI.assetValueIncrease || "$375,000"}</p>
                          <p className="text-gray-400 text-sm relative z-10">Deferred replacement value</p>
                        </div>
                      </div>
                      
                      {/* Estimated 10-Year ROI Summary Box */}
                      <div className="mb-8 relative">
                        {/* Premium accent squares instead of blur glow */}
                        <div className="absolute top-6 left-6 w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-md -z-10"></div>
                        <div className="absolute bottom-6 right-6 w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-md -z-10"></div>
                        <div className="absolute top-14 right-14 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-md -z-10"></div>
                        <div className="absolute bottom-14 left-14 w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-md -z-10"></div>
                        
                        {/* Green glow effect that doesn't blur */}
                        <div className="absolute inset-0 border-4 border-green-500/20 rounded-xl -z-10"></div>
                        <div className="absolute inset-[6px] border-2 border-green-400/30 rounded-xl -z-10"></div>
                        <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-green-500/10 rounded-full -z-10 animate-pulse-slow"></div>
                        <div className="absolute -top-1 -left-1 w-24 h-24 bg-green-500/10 rounded-full -z-10 animate-pulse-slow"></div>
                        
                        {/* Main ROI summary box with fully opaque background */}
                        <div className="relative border-2 border-green-500/50 rounded-xl bg-gray-900 shadow-[0_0_15px_rgba(74,222,128,0.3)] p-6 z-0">
                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400/80"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400/80"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400/80"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400/80"></div>
                          
                          {/* Edge accent lines */}
                          <div className="absolute top-4 left-0 w-2 h-20 border-l-2 border-green-400/40"></div>
                          <div className="absolute bottom-4 right-0 w-2 h-20 border-r-2 border-green-400/40"></div>
                          
                          {/* Header with premium styling - no blurring */}
                          <div className="text-center mb-6">
                            <div className="inline-flex items-center mb-3 bg-gradient-to-r from-gray-900 via-gray-850 to-gray-900 px-6 py-2 rounded-xl border border-green-400/30">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-lg mr-3">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                  <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                              </div>
                              <h3 className="text-xl font-bold text-white">
                                Estimated 10-Year ROI
                                <div className="h-[2px] w-full bg-gradient-to-r from-green-500 via-green-400 to-green-500 mt-1"></div>
                              </h3>
                            </div>
                          </div>
                          
                          {/* ROI Value */}
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-xl mr-2">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                                  <DollarSign className="w-6 h-6 text-green-400" />
                                </div>
                              </div>
                              <div className="text-5xl font-bold text-white">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-white to-green-300">835%</span>
                              </div>
                            </div>
                            <p className="text-green-300 text-xl mb-4">Return on Investment</p>
                            <p className="text-gray-300 text-center max-w-xl">
                              Your municipality could see an estimated <span className="text-green-300 font-semibold">$2.4 million</span> in total savings 
                              over a 10-year period through reduced maintenance costs, extended asset lifespan, 
                              and decreased labor requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-lg p-5 mb-8">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-900/40 rounded-full p-3 flex-shrink-0">
                            <Shield className="h-6 w-6 text-blue-300" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white mb-2">Incheon Bridge Case Study: 10 Years of Protection</h4>
                            <p className="text-gray-300 text-sm mb-4">
                              The iconic Korean Incheon Bridge spanning 21,400 ft of salt water has been protected by our ceramic coating technology for 10 years with minimal maintenance requirements—saving significant maintenance costs. Municipal infrastructure worldwide can achieve similar results.
                            </p>
                            <button 
                              className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium"
                              onClick={() => setActiveTab('case-studies')}
                            >
                              View detailed Incheon Bridge case study 
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <h4 className="text-white text-center font-semibold mb-4">Ready to transform your infrastructure protection strategy?</h4>
                        <GradientButton
                          onClick={() => setShowRegistrationForm(true)}
                          className="flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Request Comprehensive ROI Analysis & Assessment
                        </GradientButton>
                        <p className="text-gray-500 text-xs mt-3 text-center max-w-xl">
                          Our engineers will prepare a customized infrastructure protection plan with detailed ROI projections based on your specific assets and environmental conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Free Resources Section */}
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
              
              {/* Card ambient glow - positioned fully behind card, much smaller size */}
              <div className="absolute -inset-6 bg-green-500/50 rounded-xl blur-xl opacity-80 -z-5 animate-pulse-slow"></div>
              <div className="absolute -inset-3 bg-green-400/40 rounded-xl blur-md opacity-70 -z-4"></div>
              
              {/* Solid card overlay with higher z-index to prevent glow from bleeding through */}
              <div className="absolute inset-0 bg-gray-900 rounded-xl z-1 border border-gray-700/70"></div>
              
              {/* Accent squares */}
              <div className="absolute top-8 right-8 w-12 h-12 rounded-md bg-blue-600/20 blur-md animate-pulse-slow"></div>
              <div className="absolute bottom-8 left-8 w-10 h-10 rounded-md bg-orange-500/20 blur-md animate-pulse-slow"></div>
              
              <div className="relative z-10 p-6">
                <div className="mb-8 text-center">
                  {/* Ultra premium enterprise metallic header with 3D elements */}
                  <div className="relative mb-6">
                    {/* Outer glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600/50 via-blue-400/30 to-green-600/50 rounded-lg blur-md opacity-75 transition duration-1000 animate-gradient-x"></div>
                    
                    {/* Main header container */}
                    <div className="relative px-7 py-5 bg-gradient-to-b from-gray-900 to-gray-950 ring-1 ring-gray-800/50 rounded-lg leading-none flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                      
                      {/* Diagonal line accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-[-5px] right-[-5px] w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rotate-45 transform origin-bottom-left shadow-md"></div>
                      </div>
                      
                      {/* Left corner accent */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-400"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-400"></div>
                      
                      {/* High-end 3D icon container */}
                      <div className="w-16 h-16 relative mr-5 flex-shrink-0">
                        {/* Shadow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-600 to-green-400 opacity-70 blur-sm"></div>
                        
                        {/* Main icon container with metallic finish */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-xl border border-green-300/20">
                          {/* Inner layer with glass effect */}
                          <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center overflow-hidden">
                            {/* Reflection effect */}
                            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent"></div>
                            
                            {/* Icon with glow */}
                            <div className="relative">
                              <div className="absolute inset-0 text-green-400 blur-sm opacity-70"></div>
                              <Calculator className="w-7 h-7 text-green-400 relative z-10 drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Title with metallic premium effect */}
                      <div>
                        <h3 className="text-3xl font-bold mb-1 tracking-tight">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white animate-text-shimmer">ROI Calculator</span>
                        </h3>
                        
                        {/* Premium underline with metallic finish */}
                        <div className="relative h-[3px] w-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm"></div>
                        </div>
                        
                        {/* Premium subtitle */}
                        <p className="text-xs text-green-300/80 mt-1 tracking-widest uppercase">MUNICIPALITY EDITION</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/70"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/70"></div>
                  
                  <p className="text-lg text-gray-300 mx-auto max-w-2xl">
                    Calculate your potential savings by protecting municipal infrastructure with our ceramic coating technology.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(74,222,128,0.4)] border border-green-400/30 p-[2px]">
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center overflow-hidden">
                          <CircleDollarSign className="w-4 h-4 text-green-400 drop-shadow-[0_0_2px_rgba(74,222,128,0.5)]" />
                        </div>
                      </div>
                      Current Maintenance Costs
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Annual Maintenance Cost</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/70 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          placeholder="$0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Average Replacement Cycle (Years)</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/70 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          placeholder="7"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Annual Labor Hours</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/70 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-lg mr-3 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-gray-900/80 flex items-center justify-center">
                          <Landmark className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                      Infrastructure Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Infrastructure Type</label>
                        <select className="w-full bg-gray-900/70 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500">
                          <option>Water Treatment Plant</option>
                          <option>Wastewater Facility</option>
                          <option>Public Buildings</option>
                          <option>Bridges & Overpasses</option>
                          <option>Other Municipal Structures</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Surface Area (sq ft)</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-900/70 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          placeholder="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Environmental Exposure</label>
                        <select className="w-full bg-gray-900/70 border-2 border-green-500/50 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500">
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
                  {/* Premium button with $100 bill background */}
                  <button 
                    className="relative overflow-hidden group rounded-lg border-2 border-green-500/50 px-10 py-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]"
                    style={{
                      background: "linear-gradient(to right, rgba(17, 24, 39, 0.65), rgba(17, 24, 39, 0.75))"
                    }}
                  >
                    {/* Money background image - increased visibility */}
                    <div className="absolute inset-0 z-0 opacity-70 group-hover:opacity-80 transition-opacity duration-300">
                      <div 
                        className="absolute inset-0 bg-[url('/attached_assets/F7B18297-B3B4-46C2-B4E1-466869133B22.webp')]" 
                        style={{ 
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'brightness(1.3) contrast(1.4)',
                          opacity: 0.7
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-gray-900/40"></div>
                    </div>
                    
                    {/* Premium corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400 rounded-tl-sm z-10"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400 rounded-tr-sm z-10"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400 rounded-bl-sm z-10"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400 rounded-br-sm z-10"></div>
                    
                    {/* Content */}
                    <div className="flex items-center justify-center relative z-20">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-lg mr-3 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-gray-900/80 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-400" />
                        </div>
                      </div>
                      <span className="text-white font-semibold text-lg px-3 py-1 bg-gray-900/60 rounded-lg border border-green-500/40 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] relative overflow-hidden">
                        {/* Light shimmer animation effect */}
                        <span className="absolute inset-0 overflow-hidden">
                          <span className="absolute top-0 -left-3/4 w-1/2 h-full bg-gradient-to-r from-transparent via-green-100/30 to-transparent transform -skew-x-30 animate-shimmer"></span>
                        </span>
                        Calculate 10-Year Savings
                      </span>
                    </div>
                    
                    {/* Hover animation effect */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-green-400 to-blue-400 group-hover:w-full transition-all duration-500 z-10"></div>
                  </button>
                </div>
                
                {/* Premium Estimated 10-Year ROI Section */}
                <div className="relative mb-8">
                  {/* Premium accent squares */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-md -z-10"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-md -z-10"></div>
                  <div className="absolute top-10 right-10 w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-md -z-10"></div>
                  <div className="absolute bottom-10 left-10 w-6 h-6 bg-orange-500/20 border border-orange-500/30 rounded-md -z-10"></div>
                  
                  {/* Green accent glow without blur */}
                  <div className="absolute inset-0 border-4 border-green-500/20 rounded-xl -z-10"></div>
                  <div className="absolute inset-[6px] border-2 border-green-400/30 rounded-xl -z-10"></div>
                  
                  {/* Main ROI box with fully opaque background */}
                  <div className="bg-gray-900 border-2 border-green-500/40 rounded-xl p-6 text-center relative shadow-[0_0_15px_rgba(74,222,128,0.3)] z-0">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400/80"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400/80"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400/80"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400/80"></div>
                    
                    {/* Top premium header bar */}
                    <div className="mb-6 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 z-10">
                        <div className="flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-lg mr-3">
                            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-white">Estimated 10-Year ROI</h4>
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-green-500 to-transparent mt-4"></div>
                    </div>

                    {/* Premium money value display */}
                    <div className="flex justify-center items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-[2px] shadow-xl mr-3 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                      </div>
                      <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-white to-green-300">
                        $380,000 - $450,000
                      </p>
                    </div>
                    
                    <p className="text-green-300 text-lg mb-2">Return On Investment</p>
                    <p className="text-gray-300">Based on average municipal infrastructure applications</p>
                    
                    {/* Bottom edge highlight */}
                    <div className="h-[1px] w-2/3 mx-auto bg-gradient-to-r from-transparent via-green-500/30 to-transparent mt-4"></div>
                  </div>
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
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Contact Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                {...field} 
                                className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Company Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Municipal Solutions Inc." 
                                {...field} 
                                className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john.doe@example.com" 
                                {...field} 
                                className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white" 
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
                            <FormLabel className="text-gray-300">Confirm Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john.doe@example.com" 
                                {...field} 
                                className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
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
                            <FormLabel className="text-gray-300">Phone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(123) 456-7890" 
                                {...field} 
                                className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123 Main Street" 
                                {...field} 
                                className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="professionalType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Professional Type</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Consultant, Public Works Director, etc." 
                              {...field} 
                              className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
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
                          <FormLabel className="text-gray-300">Jurisdictions/Areas Served</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List the jurisdictions or areas your organization serves" 
                              {...field} 
                              value={field.value as string}
                              className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white min-h-[100px]"
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
                          <FormLabel className="text-gray-300">Types of Infrastructure</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the types of infrastructure you manage" 
                              {...field}
                              value={field.value as string}
                              className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white min-h-[100px]"
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
                          <FormLabel className="text-gray-300">Years of Experience</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="10" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              value={field.value as number | undefined}
                              className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white"
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
                          <FormLabel className="text-gray-300">Current Infrastructure Challenges</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your current infrastructure maintenance challenges" 
                              {...field}
                              value={field.value as string}
                              className="bg-gray-900/70 border-2 border-green-500/50 rounded-lg py-2 px-3 text-white min-h-[100px]"
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
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border-2 border-green-500/30 bg-gray-900/70">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-300">
                              I consent to receive communications from Praetorian SmartCoat
                            </FormLabel>
                            <p className="text-sm text-gray-400">
                              You can unsubscribe at any time by clicking the link in the footer of our emails.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-center mt-8">
                      <GradientButton 
                        type="submit" 
                        disabled={isPending}
                        className="text-white font-bold py-3 px-8 rounded-lg text-lg shadow-[0_0_15px_rgba(0,255,0,0.4)] border-2 border-green-500/50 bg-gradient-to-b from-gray-900 to-gray-800 transition-all hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]"
                      >
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
                      <label className="block text-gray-400 mb-2">Your Infrastructure Challenges</label>
                      <textarea className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 h-32" placeholder="Tell us about your current infrastructure challenges and protection goals..."></textarea>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-green-500/30 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Why Schedule a Consultation?</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Get a personalized infrastructure assessment and protection plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Receive a customized ROI analysis for your specific municipal assets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Learn how other municipalities have reduced maintenance costs by up to 65%</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-center">
                      <GradientButton 
                        onClick={() => setShowRegistrationForm(true)}
                        className="text-lg px-8 py-3 font-semibold"
                      >
                        Start Your Infrastructure Transformation
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