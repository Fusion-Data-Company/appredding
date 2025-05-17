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
  Badge
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
        {/* Hero Section with enhanced infrastructure-themed background */}
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
                
                {/* Premium subtle glow effects */}
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
                
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
                    Municipal Infrastructure Protection
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
                    Specialized ceramic coating solutions for extending the life of critical municipal infrastructure 
                    while reducing maintenance costs and environmental impact.
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

        {/* Progressive Sales Funnel - Key Problem Solution Section */}
        <section className="py-16 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/80 z-0"></div>
          
          {/* Large ambient glow for section */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] z-0 opacity-60"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                <div className="md:w-1/2 mb-8 md:mb-0 relative">
                  <div className="absolute -top-4 -left-4 w-20 h-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-4 h-4 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    The Hidden Cost of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Infrastructure Degradation</span>
                  </h2>
                  
                  <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
                  
                  <p className="text-lg text-gray-300 mb-6">
                    Most municipalities are experiencing the same critical problem: <span className="font-semibold text-white">infrastructure that deteriorates far faster than budgeted</span>, forcing difficult choices between capital projects and maintenance backlogs.
                  </p>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-red-500/20 rounded-lg p-5 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BadgeAlert className="w-5 h-5 text-red-400 mr-2" />
                      Critical Municipal Infrastructure Statistics
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="bg-red-500/20 p-1 rounded-full text-red-300 mt-1 flex-shrink-0">!</span>
                        <span className="text-gray-300">Over 65% of U.S. municipal water infrastructure exceeds its intended lifespan</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-red-500/20 p-1 rounded-full text-red-300 mt-1 flex-shrink-0">!</span>
                        <span className="text-gray-300">Municipalities lose $9B+ annually to corrosion-related infrastructure maintenance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-red-500/20 p-1 rounded-full text-red-300 mt-1 flex-shrink-0">!</span>
                        <span className="text-gray-300">Most municipal budgets allocate 35-50% more to maintenance than originally planned</span>
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
                  
                  <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6"></div>
                  
                  <p className="text-lg text-gray-300 mb-6">
                    Previously restricted to <span className="font-semibold text-white">government and aerospace applications</span>, our ceramic coating technology is now available to public infrastructure, delivering unmatched protection and cost savings.
                  </p>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-blue-500/20 rounded-lg p-5 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-blue-400 mr-2" />
                      Advanced Ceramic Technology Benefits
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300">Unlike conventional coatings, our ceramic solution creates a permanent molecular bond</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300">Proven in extreme industrial environments with 14+ years of protection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500/20 p-1 rounded-full text-blue-300 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300">Zero VOCs, no hazardous materials, and fully environmentally compliant</span>
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
                      <span className="text-blue-400">Start</span>
                      <span className="text-blue-400">Analyze ROI</span>
                      <span className="text-blue-400">Implementation</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-gray-700" indicatorClassName="bg-gradient-to-r from-blue-600 to-blue-400" />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/10 rounded-lg p-5 relative group">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-500/50 rounded-tl-md"></div>
                      </div>
                      
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600/20 mb-4 text-blue-400">
                        <Check className="h-6 w-6" />
                      </div>
                      
                      <h4 className="text-lg font-medium text-white mb-2">1. Free Assessment</h4>
                      <p className="text-gray-400 mb-4">Schedule a comprehensive infrastructure assessment to identify key protection needs.</p>
                      
                      <div className="border-t border-gray-700 pt-4 mt-auto">
                        <p className="text-blue-400 text-sm">Completed</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/20 rounded-lg p-5 relative group transform scale-105">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-30 blur group-hover:opacity-40 transition duration-300"></div>
                      
                      <div className="relative">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600/20 mb-4 text-blue-400">
                          <BarChart3 className="h-6 w-6" />
                        </div>
                        
                        <h4 className="text-lg font-medium text-white mb-2">2. Calculate ROI</h4>
                        <p className="text-gray-400 mb-4">Use our specialized calculator to project savings across your infrastructure portfolio.</p>
                        
                        <div className="border-t border-gray-700 pt-4 mt-auto">
                          <p className="text-yellow-400 text-sm">In Progress</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-5 relative group">
                      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gray-600 rounded-tr-md"></div>
                      </div>
                      
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 mb-4 text-gray-500">
                        <Award className="h-6 w-6" />
                      </div>
                      
                      <h4 className="text-lg font-medium text-gray-400 mb-2">3. Implementation</h4>
                      <p className="text-gray-500 mb-4">Custom implementation plan for maximum efficiency and minimal disruption.</p>
                      
                      <div className="border-t border-gray-700 pt-4 mt-auto">
                        <p className="text-gray-500 text-sm">Upcoming</p>
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
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/50 p-1 rounded-lg border border-blue-500/20">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900/50 data-[state=active]:to-blue-700/50 data-[state=active]:text-white text-gray-400"
                  >
                    Features & Benefits
                  </TabsTrigger>
                  <TabsTrigger 
                    value="case-studies" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900/50 data-[state=active]:to-blue-700/50 data-[state=active]:text-white text-gray-400"
                  >
                    Case Studies
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calculator" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900/50 data-[state=active]:to-blue-700/50 data-[state=active]:text-white text-gray-400"
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
                                    <span>15 years of continuous protection with no repainting</span>
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
                              The iconic Incheon Bridge has maintained perfect structural integrity for 15 years without repainting after ceramic coating application, demonstrating unprecedented durability in one of the world's most corrosive marine environments.
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
                                    <span className="text-white">15 years of continuous protection with zero repainting requirements</span>
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
                                The same ceramic technology that has protected the Incheon Bridge for 15 years is now available for municipal infrastructure protection. The molecular-level ceramic bond creates a permanent protective barrier that outperforms traditional coatings by 300-500% in lifespan while delivering superior protection against corrosion, UV degradation, and chemical exposure.
                              </p>
                              
                              <div className="grid grid-cols-3 gap-3 mt-4">
                                <div className="bg-gray-900/50 rounded p-3 text-center">
                                  <h5 className="text-blue-400 text-xs font-medium mb-1">Cost Reduction</h5>
                                  <p className="text-xl font-bold text-white">65-85%</p>
                                  <p className="text-xs text-gray-400">15-year lifecycle</p>
                                </div>
                                <div className="bg-gray-900/50 rounded p-3 text-center">
                                  <h5 className="text-blue-400 text-xs font-medium mb-1">Protection Period</h5>
                                  <p className="text-xl font-bold text-white">15+ years</p>
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
                    <div className="absolute inset-0 bg-blue-500/5 rounded-xl z-0"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-semibold mb-4 text-white text-center flex items-center justify-center">
                        <Calculator className="w-6 h-6 mr-2 text-blue-400" />
                        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Municipal Infrastructure Protection ROI Calculator</span>
                      </h3>
                      
                      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/10 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
                        <p className="text-white font-semibold mb-2">Why Ceramic Coating Protection Makes Financial Sense</p>
                        <p className="text-gray-300 text-sm mb-2">
                          Municipal infrastructure protection with ceramic technology isn't just about superior protection – it's about transforming your maintenance economics. Most municipalities see a complete return on investment within 24-36 months, followed by years of ongoing savings.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                          <div className="bg-blue-900/30 rounded-lg p-3 flex-1">
                            <p className="text-center text-xs text-gray-400">TRADITIONAL PROTECTION</p>
                            <p className="text-center text-white font-bold">3-5 Year Lifecycle</p>
                            <div className="h-1 w-full bg-gray-700 my-2">
                              <div className="h-full w-[45%] bg-orange-500"></div>
                            </div>
                            <p className="text-center text-xs text-gray-400">Continuous maintenance</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-blue-400" />
                          <div className="bg-blue-900/30 rounded-lg p-3 flex-1">
                            <p className="text-center text-xs text-gray-400">CERAMIC PROTECTION</p>
                            <p className="text-center text-white font-bold">15+ Year Lifecycle</p>
                            <div className="h-1 w-full bg-gray-700 my-2">
                              <div className="h-full w-[95%] bg-blue-500"></div>
                            </div>
                            <p className="text-center text-xs text-gray-400">Minimal maintenance</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                            <CircleDollarSign className="w-5 h-5 mr-2 text-blue-400" />
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
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                            <Landmark className="w-5 h-5 mr-2 text-blue-400" />
                            Infrastructure Specifications
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-300 mb-2">Infrastructure Type</label>
                              <select 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                              <label className="block text-gray-300 mb-2">Total Surface Area (sq ft)</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                              <label className="block text-gray-300 mb-2">Environmental Exposure</label>
                              <select 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                              <label className="block text-gray-300 mb-2">Current Asset Value ($)</label>
                              <input 
                                type="number" 
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                      
                      <div className="bg-gray-900/30 rounded-lg p-5 border border-blue-500/10 mb-8">
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
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
                            const ceramicMaintenance = (annualCost * 0.15) * 10; // 85% reduction
                            const assetLifespanValue = assetValue * 0.25; // 25% asset life extension value
                            
                            const totalSavings = tenYearTraditional - (ceramicInitialCost + ceramicMaintenance) + assetLifespanValue;
                            const paybackMonths = (ceramicInitialCost / (annualCost + (laborHours * laborRate))) * 12;
                            
                            setCalculatedROI({
                              tenYearSavings: totalSavings.toLocaleString(),
                              lifespanIncrease: "300%",
                              paybackPeriod: `${Math.round(paybackMonths)} months`,
                              laborSavings: `${Math.round(laborHours * 0.85)} hours/year`,
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
                          Calculate Total Infrastructure ROI
                        </GradientButton>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/30 rounded-lg p-5 text-center relative overflow-hidden">
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white">15-Year Savings</h4>
                          <p className="text-3xl font-bold text-blue-300 mb-1">${calculatedROI.tenYearSavings}</p>
                          <p className="text-gray-400 text-sm">Total projected savings</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/30 rounded-lg p-5 text-center relative overflow-hidden">
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white">Asset Life Extension</h4>
                          <p className="text-3xl font-bold text-blue-300 mb-1">{calculatedROI.lifespanIncrease}</p>
                          <p className="text-gray-400 text-sm">Extended infrastructure longevity</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/30 rounded-lg p-5 text-center relative overflow-hidden">
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white">ROI Breakeven</h4>
                          <p className="text-3xl font-bold text-blue-300 mb-1">{calculatedROI.paybackPeriod}</p>
                          <p className="text-gray-400 text-sm">Investment recovery timeline</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/20 rounded-lg p-5 text-center relative overflow-hidden">
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white">Annual Labor Savings</h4>
                          <p className="text-3xl font-bold text-blue-300 mb-1">{calculatedROI.laborSavings || "1,020 hours/year"}</p>
                          <p className="text-gray-400 text-sm">Maintenance staff time reclaimed</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-500/20 rounded-lg p-5 text-center relative overflow-hidden">
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
                          <h4 className="text-lg font-medium mb-2 text-white">Asset Value Increase</h4>
                          <p className="text-3xl font-bold text-blue-300 mb-1">{calculatedROI.assetValueIncrease || "$375,000"}</p>
                          <p className="text-gray-400 text-sm">Infrastructure replacement deferral value</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-lg p-5 mb-8">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-900/40 rounded-full p-3 flex-shrink-0">
                            <Shield className="h-6 w-6 text-blue-300" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white mb-2">Incheon Bridge Case Study: 15 Years of Protection</h4>
                            <p className="text-gray-300 text-sm mb-4">
                              The iconic Korean Incheon Bridge spanning 21,400 ft of salt water has been protected by our ceramic coating technology for 15 years with zero repainting required—saving millions in maintenance costs. Municipal infrastructure worldwide can achieve similar results.
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