import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CircleDollarSign, 
  DropletIcon, 
  HelpCircle, 
  Info, 
  Loader2, 
  ThermometerIcon, 
  ShieldCheck,
  TimerIcon,
  BarChart3Icon
} from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import poolImage from "@assets/Screenshot 2025-04-22 at 14.04.08.png";
import waterBgImage from "@assets/pool-water-bg.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import GoogleReviews from "@/components/GoogleReviews";
import { insertPoolProfessionalSchema } from "@shared/schema";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Extended schema with additional validation for pool professional registration
const poolProfessionalFormSchema = insertPoolProfessionalSchema.extend({
  confirmEmail: z.string().email("Invalid email format"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  })
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

type PoolProfessionalFormValues = z.infer<typeof poolProfessionalFormSchema>;

// Constants for pool coating calculator
interface CoatingProduct {
  name: string;
  coverage: number; // Coverage in sq ft per gallon
  price: number; // Price per gallon
}

interface CalculationResult {
  surfaceArea: number; // Total surface area in sq ft
  gallonsNeeded: number; // Total gallons needed
  totalCost: number; // Total cost in dollars
  productName: string; // Name of the coating product
  coatCount: number; // Number of coats
}

// Coating product information
const coatingProducts: Record<string, CoatingProduct> = {
  pebble: {
    name: "CoolDeck Standard™",
    coverage: 100, // 100 sq ft per gallon
    price: 75.99
  },
  quartz: {
    name: "CoolDeck Premium™",
    coverage: 125, // 125 sq ft per gallon
    price: 89.99
  },
  epoxy: {
    name: "CoolDeck Ultra™",
    coverage: 150, // 150 sq ft per gallon
    price: 105.99
  }
};

// Surface condition factors - affects how much material is needed
const surfaceFactors = {
  smooth: 1.0, // No additional material needed
  moderate: 1.2, // 20% more material needed
  rough: 1.4 // 40% more material needed
};

// Pool Professional Registration Form Component
const PoolProfessionalForm = () => {
  const { toast } = useToast();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const form = useForm<PoolProfessionalFormValues>({
    resolver: zodResolver(poolProfessionalFormSchema),
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
      yearsInBusiness: undefined,
      specialties: "",
      serviceAreas: "",
      poolTypes: "",
      materialsExperience: "",
      hourlyRate: undefined,
      certifications: "",
      notes: "",
      termsAccepted: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: PoolProfessionalFormValues) => {
      // Remove fields that aren't in the database schema
      const { confirmEmail, termsAccepted, ...registerData } = data;
      const res = await apiRequest("POST", "/api/professionals/pool-professionals", registerData);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
      
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Thank you for registering with our Pool Professional network!",
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

  function onSubmit(data: PoolProfessionalFormValues) {
    registerMutation.mutate(data);
  }
  
  return (
    <div className="w-full">
      {showSuccessMessage ? (
        <div className="p-6 bg-primary-800/80 rounded-xl border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          <GradientHeading level={3} className="text-2xl mb-4" variant="blue">
            Registration Complete!
          </GradientHeading>
          <p className="mb-6">
            Thank you for registering as a pool professional with Praetorian SmartCoat Solutions. 
            Our team will review your application and be in touch with you shortly.
          </p>
          <GradientButton variant="variant" onClick={() => setShowSuccessMessage(false)}>
            Register Another Professional
          </GradientButton>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <GradientHeading level={3} className="text-2xl mb-4" variant="blue">
              Pool Professional Registration
            </GradientHeading>
            
            <p className="mb-6">
              Register to join our network of trusted pool professionals. Complete the form below to apply.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name*</FormLabel>
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
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="License number" {...field} className="bg-primary-800 border-primary-600" />
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
                      <FormLabel>Years in Business*</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Years" 
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          className="bg-primary-800 border-primary-600" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Pool Experience */}
            <div className="space-y-4">
              <GradientHeading level={4} className="text-xl mb-2" variant="blue">
                Pool Experience & Specialties
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
                          placeholder="Pool cleaning, maintenance, repairs, installation, etc."
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
                  name="poolTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pool Types Experience*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Residential, commercial, in-ground, above-ground, etc."
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
                  name="materialsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materials Experience*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Concrete, fiberglass, vinyl, pebble, gunite, etc."
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
                  name="serviceAreas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Areas*</FormLabel>
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
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any relevant certifications"
                          {...field}
                          className="bg-primary-800 border-primary-600 min-h-[80px]"
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
                      <FormLabel>Insurance Information*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Details of your liability insurance"
                          {...field}
                          className="bg-primary-800 border-primary-600 min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Your standard hourly rate" 
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
                  "Register as Pool Professional"
                )}
              </GradientButton>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

const Pools = () => {
  // State for calculator inputs
  const [poolShape, setPoolShape] = useState("rectangular");
  const [coatingType, setCoatingType] = useState("pebble");
  const [length, setLength] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [depth, setDepth] = useState<number | undefined>(undefined);
  const [coats, setCoats] = useState<number>(2);
  const [surfaceCondition, setSurfaceCondition] = useState("moderate");
  
  // State for calculation results
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calculate the deck surface area based on shape and dimensions
  const calculateSurfaceArea = () => {
    if (!length || !width) {
      return 0;
    }

    let surfaceArea = 0;
    
    switch (poolShape) {
      case "rectangular":
        // Simple rectangular deck area calculation
        surfaceArea = length * width;
        break;
      case "oval":
        // Approximation for oval/curved deck area
        const a = length / 2;
        const b = width / 2;
        // Use ellipse area formula
        surfaceArea = Math.PI * a * b;
        break;
      case "kidney":
        // L-shaped deck area (rectangular main area + extension)
        surfaceArea = 0.85 * (length * width); // 0.85 adjustment factor for L-shape
        break;
      case "freeform":
        // For complex deck shapes, use an approximation based on rectangular with adjustment
        surfaceArea = 0.9 * (length * width);
        break;
      case "custom":
        // For custom deck layout, use a rectangular base but allow for adjustment
        surfaceArea = length * width;
        break;
      default:
        surfaceArea = 0;
    }
    
    return Math.ceil(surfaceArea);
  };

  // Calculate the amount of coating needed
  const calculateCoatingNeeded = () => {
    // Reset validation error
    setValidationError(null);
    
    // Validate inputs
    if (!length || !width) {
      setValidationError("Please enter all deck dimensions.");
      return;
    }
    
    if (length <= 0 || width <= 0) {
      setValidationError("Dimensions must be greater than zero.");
      return;
    }
    
    // Get product details
    const product = coatingProducts[coatingType];
    const surfaceFactor = surfaceFactors[surfaceCondition as keyof typeof surfaceFactors];
    
    // Calculate base surface area
    let area = calculateSurfaceArea();
    
    // Apply additional areas percentage if provided
    if (depth) {
      // The depth field is now used for additional areas percentage
      const additionalAreaPercentage = depth / 100;
      area = area * (1 + additionalAreaPercentage);
    }
    
    // Calculate gallons needed based on coverage, number of coats, and surface condition
    const gallonsPerCoat = Math.ceil((area / product.coverage) * surfaceFactor);
    const totalGallons = gallonsPerCoat * coats;
    
    // Calculate total cost
    const cost = totalGallons * product.price;
    
    // Set calculation result
    setCalculationResult({
      surfaceArea: area,
      gallonsNeeded: totalGallons,
      totalCost: cost,
      productName: product.name,
      coatCount: coats
    });
    
    // Show the results
    setShowResults(true);
  };

  // Reset the calculator
  const resetCalculator = () => {
    setLength(undefined);
    setWidth(undefined);
    setDepth(undefined);
    setCoats(2);
    setPoolShape("rectangular");
    setCoatingType("pebble");
    setSurfaceCondition("moderate");
    setShowResults(false);
    setCalculationResult(null);
    setValidationError(null);
  };

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Premium enterprise water background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${waterBgImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        />
        
        {/* Premium enterprise gradient overlay for enhanced appearance */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90"></div>
        
        {/* Premium ambient glow effects for elite enterprise appearance */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            {/* Premium header section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-8 px-10 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
                  {/* Corner accents */}
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

                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg blur-sm"></div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white relative drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                      <span className="inline-block relative">
                        Cool-Touch Pool Deck Protection
                        <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"></div>
                      </span>
                    </h1>
                  </div>
                  
                  <p className="text-xl text-white mb-8 leading-relaxed">
                    Our NASA-derived ceramic microsphere technology creates cool-to-touch surfaces for pool decks, surrounding areas, and furniture, with up to <span className="text-blue-300 font-medium">40°F temperature reduction</span> even in direct sunlight. Featuring <span className="text-blue-300 font-medium">156% elastomeric flexibility</span>, <span className="text-blue-300 font-medium">89% UV reflection</span>, and <span className="text-blue-300 font-medium">30+ year service life</span> — ending barefoot burns and protecting your investment.
                  </p>
                </div>
              </div>
            </div>

            {/* Features grid section with premium styling */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 via-orange-500/10 to-blue-500/15 rounded-2xl blur-xl opacity-70"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 p-8 rounded-xl border border-blue-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
                  {/* Corner accents */}
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
                
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg blur-sm"></div>
                    <h2 className="text-3xl font-bold text-white relative drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                      <span className="inline-block relative">
                        Cool-Touch Pool Deck & Furniture Technology
                        <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"></div>
                      </span>
                    </h2>
                  </div>
                  
                  <p className="mb-8 text-white leading-relaxed">
                    Our NASA-derived ceramic microsphere coating systems create cool-to-touch surfaces for pool decks, pavers, furniture, and equipment areas - preventing painful burns even in <span className="text-blue-300 font-medium">100°F+ temperatures</span> with <span className="text-blue-300 font-medium">30+ year documented durability</span>
                  </p>
                
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                        <span className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-2 mt-1 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                          <DropletIcon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_1px_2px_rgba(59,130,246,0.5)]">
                          <span className="relative inline-block">
                            Cool-Touch Surface Technology
                            <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                          </span>
                        </h3>
                        <p className="text-white leading-relaxed">Our ceramic microsphere technology creates surfaces that remain cool to the touch even in direct sunlight, reducing surface temperatures by up to <span className="text-blue-300 font-medium">40°F (22.2°C)</span> compared to untreated concrete, pavers, or furnishings. Testing confirms coating surface temperatures of only <span className="text-blue-300 font-medium">85°F (29.4°C)</span> when untreated surfaces reach <span className="text-blue-300 font-medium">125°F+ (51.7°C+)</span> in identical conditions (ASTM C1371-15 thermal emittance protocol).</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-sun text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Child & Pet-Safe Surface Protection</h3>
                      <p>Our coatings prevent painful burns from hot pool decks, pavers, and concrete surfaces that can reach 140°F+ (60°C+) in direct sunlight - temperatures that cause second-degree burns in just 3 seconds of skin contact. Independent testing confirms our coating maintains safe-touch temperatures of 85-95°F (29-35°C) on identical surfaces in identical conditions. The 89% solar reflection rating (verified by Cool Roof Rating Council and ASTM C1549-16 protocols) combined with 0.91 thermal emittance (ASTM C1371-15) provides immediate temperature reduction on application. Surface heat mitigation remains effective for 20+ years with only minimal maintenance. The water-based formula contains zero VOCs (ASTM D6886-21) and meets the strictest California environmental standards for outdoor coatings with CDPH Section 01350 certification for safe use in areas where children and pets play.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-fire-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Class A Fire Rating for Pool Equipment Protection</h3>
                      <p>Perfect 0/0 scores in ASTM E84-23 testing for both Flame Spread and Smoke Development provides critical fire protection for pool equipment rooms, pump housings, electrical panels, and surrounding structures. Meets NFPA 101 requirements for Class A materials in equipment enclosures where fire hazards are elevated. Testing per UL 263 demonstrates 2-hour fireproof rating at 1,400°F (760°C) with coating integrity maintained - particularly critical for protecting expensive pool equipment and preventing electrical fires from spreading to adjacent structures. Complies with ICC-ES AC10 acceptance criteria for code compliance with full verification documentation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-clock text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">All-Weather Deck & Furniture Protection</h3>
                      <p>Our coating creates a durable protective barrier on pool decks, pavers, furniture, and equipment areas that withstands heavy foot traffic, pool chemicals, and harsh weather conditions. Abrasion resistance testing (ASTM D4060-19) demonstrates 70% less wear than traditional paint/sealers, with only 3.2mg material loss after 1,000 cycles compared to 12-15mg for conventional products. The 156% elastomeric flexibility (ASTM D2370-16) prevents cracking from concrete expansion/contraction during freeze-thaw cycles. Original applications from 1989 showed only minimal degradation when inspected 30 years later in 2019, verified through both visual documentation and laboratory tests confirming 97% retention of original specifications. Coating maintains slip resistance (ASTM D2047-17) rating of 0.65 in wet conditions, exceeding the 0.50 minimum safety standard for public pool areas.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <img 
                  src={poolImage} 
                  alt="Elegant luxury pool with pristine Praetorian coating" 
                  className="rounded-xl w-full h-64 object-cover mb-8"
                />
                
                <GradientHeading level={2} className="text-3xl mb-6" variant="blue">Cool-Touch Pool Deck & Furniture Benefits</GradientHeading>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Reduces surface temperatures by up to 40°F (22.2°C), preventing painful burns on bare feet even in direct sunlight</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Creates child and pet-safe surfaces on concrete, pavers, coping stones, and pool furniture that stay cool to the touch</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Superior slip resistance (0.65 coefficient) exceeds public safety standards in wet conditions</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>70% improved abrasion resistance compared to traditional sealers, with only 3.2mg material loss after 1,000 test cycles</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Class A fire rating (0/0 scores) provides critical safety for equipment areas and reduces fire spread hazards</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>30-year transferable warranty with documented performance in outdoor pool environments since 1989</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <GradientButton variant="variant">
                    Get a Free Consultation
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-12 text-center" variant="blue">Pool Deck Coverage Calculator</GradientHeading>
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-center">Calculate How Much Coating You Need</h3>
                <p className="text-center mb-6">Enter your pool deck dimensions to determine the amount of coating needed to protect surrounding surfaces</p>
                
                {validationError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Deck Area Shape
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1">
                              <HelpCircle className="h-4 w-4 inline text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Select the layout that best matches your pool deck area to get an accurate estimate.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <select 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2"
                      value={poolShape}
                      onChange={(e) => setPoolShape(e.target.value)}
                    >
                      <option value="rectangular">Rectangular Deck</option>
                      <option value="oval">Curved/Circular Deck</option>
                      <option value="kidney">L-Shaped Deck</option>
                      <option value="freeform">Irregular/Custom Shape</option>
                      <option value="custom">Multi-Level/Complex</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Coating System
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1">
                              <HelpCircle className="h-4 w-4 inline text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Different coating systems have different coverage rates and durability. Select the system that best meets your needs.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <select 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2"
                      value={coatingType}
                      onChange={(e) => setCoatingType(e.target.value)}
                    >
                      <option value="pebble">PraetorianPebble™</option>
                      <option value="quartz">PraetorianQuartz™</option>
                      <option value="epoxy">PraetorianEpoxy™</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Deck Length (ft)</label>
                    <input 
                      type="number" 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2" 
                      placeholder="Enter deck length" 
                      value={length || ''}
                      onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Deck Width (ft)</label>
                    <input 
                      type="number" 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2" 
                      placeholder="Enter deck width" 
                      value={width || ''}
                      onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Additional Areas (%)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1">
                              <HelpCircle className="h-4 w-4 inline text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Enter the percentage of additional area for furniture, walkways, and surrounding features. For example, enter 20 if you need to cover additional areas that are approximately 20% of the main deck size.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <input 
                      type="number" 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2" 
                      placeholder="Enter additional area %" 
                      value={depth || ''}
                      onChange={(e) => setDepth(e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="0"
                      max="100"
                      step="5"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Coats</label>
                    <select 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2"
                      value={coats}
                      onChange={(e) => setCoats(parseInt(e.target.value))}
                    >
                      <option value="1">1 Coat</option>
                      <option value="2">2 Coats (Recommended)</option>
                      <option value="3">3 Coats (Heavy Duty)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Deck Surface Type
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1">
                              <HelpCircle className="h-4 w-4 inline text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Surface type affects how much coating material is needed. More porous or textured surfaces require additional material for complete coverage.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <select 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2"
                      value={surfaceCondition}
                      onChange={(e) => setSurfaceCondition(e.target.value)}
                    >
                      <option value="smooth">Smooth (Polished Concrete, Tile)</option>
                      <option value="moderate">Moderate (Standard Concrete, Pavers)</option>
                      <option value="rough">Rough (Textured, Stamped, Stone)</option>
                    </select>
                  </div>
                </div>

                {showResults && calculationResult ? (
                  <div className="mb-6">
                    <Card className="bg-primary-700 border-primary-600">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-center text-white">
                          <DropletIcon className="h-6 w-6 mr-2 text-primary-300" /> 
                          Calculation Results
                        </CardTitle>
                        <CardDescription className="text-center text-primary-200">
                          Based on your deck dimensions and selected coating system
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <div className="text-sm font-medium">Deck Surface Area:</div>
                          <div className="text-right">{calculationResult.surfaceArea.toLocaleString()} sq ft</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <div className="text-sm font-medium">Coating System:</div>
                          <div className="text-right">{calculationResult.productName}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <div className="text-sm font-medium">Number of Coats:</div>
                          <div className="text-right">{calculationResult.coatCount}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <div className="text-sm font-medium">Material Needed:</div>
                          <div className="text-right">{calculationResult.gallonsNeeded.toLocaleString()} gallons</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4 pt-4 border-t border-primary-600">
                          <div className="text-base font-semibold flex items-center">
                            <CircleDollarSign className="h-5 w-5 mr-1.5 text-primary-300" />
                            Estimated Cost:
                          </div>
                          <div className="text-right text-base font-semibold">
                            ${calculationResult.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <GradientButton 
                          variant="variant"
                          onClick={resetCalculator}
                          className="mr-2"
                        >
                          Reset
                        </GradientButton>
                        <GradientButton>
                          Request Quote
                        </GradientButton>
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
                  <GradientButton 
                    className="w-full py-3 text-lg"
                    onClick={calculateCoatingNeeded}
                    variant="variant"
                  >
                    Calculate Materials Needed
                  </GradientButton>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Coating systems section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-12 text-center" variant="blue">NASA Ceramic Pool Coating Systems</GradientHeading>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-primary-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3">PraetorianCeramic™ Premium</h3>
                  <p className="mb-4">Our flagship NASA-derived ceramic microsphere coating with cool-touch technology and vacuum-filled ceramic protection for pool decks.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span><span className="font-bold">Cool-Touch Surface:</span> Reduces surface temperature by 47°F in direct sunlight</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>156% elastomeric flexibility prevents cracking and peeling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>30+ year documented durability with transferable warranty</span>
                    </li>
                  </ul>
                  <GradientButton className="w-full" variant="variant">Technical Specs</GradientButton>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3">PraetorianCeramic™ Commercial</h3>
                  <p className="mb-4">Heavy-duty ceramic formulation with our coolest-to-touch technology specifically engineered for high-traffic commercial pools and resorts.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span><span className="font-bold">Ultra Cool-Touch™ Technology:</span> Surface remains comfortable even in extreme heat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>89% solar reflection prevents heat absorption and hot spots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>Enhanced slip resistance with wet-foot safety certification</span>
                    </li>
                  </ul>
                  <GradientButton className="w-full" variant="variant">Technical Specs</GradientButton>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3">PraetorianCeramic™ UV Shield</h3>
                  <p className="mb-4">Specialized cool-touch ceramic formulation with enhanced UV protection for pool decks in extreme sun exposure environments.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span><span className="font-bold">Cool-Touch Surface:</span> Maintains comfortable temperature even in 100°F+ weather</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>95% UV reflection prevents heat absorption and surface degradation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>25+ year documented performance in extreme sun conditions</span>
                    </li>
                  </ul>
                  <GradientButton className="w-full" variant="variant">Technical Specs</GradientButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-12 text-center" variant="blue">Pool Application Process</GradientHeading>
            
              <div className="max-w-5xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-600"></div>
                  
                  {/* Timeline items */}
                  <div className="relative z-10 space-y-16">
                    <div className="flex items-center flex-col md:flex-row gap-8">
                      <div className="md:w-1/2 md:text-right">
                        <h3 className="text-2xl font-bold mb-3">1. Surface Preparation</h3>
                        <p>Proper preparation is critical. We drain the pool, remove any existing coating, repair cracks or damage, and thoroughly clean the surface.</p>
                      </div>
                      <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                        <i className="fas fa-tools text-white"></i>
                      </div>
                      <div className="md:w-1/2"></div>
                    </div>
                    
                    <div className="flex items-center flex-col md:flex-row gap-8">
                      <div className="md:w-1/2"></div>
                      <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                        <i className="fas fa-brush text-white"></i>
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-3">2. Priming</h3>
                        <p>We apply a specialized bonding agent to ensure proper adhesion between the pool surface and the coating system.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-col md:flex-row gap-8">
                      <div className="md:w-1/2 md:text-right">
                        <h3 className="text-2xl font-bold mb-3">3. Base Coat Application</h3>
                        <p>Our technicians apply the primary coating material using specialized techniques to ensure even coverage and proper thickness.</p>
                      </div>
                      <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                        <i className="fas fa-layer-group text-white"></i>
                      </div>
                      <div className="md:w-1/2"></div>
                    </div>
                    
                    <div className="flex items-center flex-col md:flex-row gap-8">
                      <div className="md:w-1/2"></div>
                      <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                        <i className="fas fa-tint text-white"></i>
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-3">4. Finishing & Curing</h3>
                        <p>After application, the coating needs to cure properly. We ensure optimal conditions and provide detailed care instructions for filling and using your newly coated pool.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-16">
                <GradientButton className="px-8 py-3 text-lg" variant="variant">
                  Schedule Your Pool Coating
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
        
        {/* Live Customer Reviews Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="blue">
                Real Customer Reviews
              </GradientHeading>
              
              <div className="text-center mb-8">
                <p className="text-white max-w-3xl mx-auto mb-4">
                  See what our verified customers are saying about our pool coating solutions. All reviews are pulled directly from our Google Business Profile.
                </p>
                <div className="inline-flex items-center justify-center">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <span className="text-white">Average Rating: <span id="average-rating">Loading...</span></span>
                </div>
              </div>
              
              <GoogleReviews />
              
              <div className="text-center">
                <Button
                  variant="outline"
                  className="mt-6 bg-transparent border-white text-white hover:bg-primary-700"
                  onClick={() => window.open("https://g.page/r/CYourGoogleReviewLink/review", "_blank")}
                >
                  Leave Your Review
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pool Professional Registration Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-6 text-center" variant="blue">
                Join Our Elite Network of Pool Professionals
              </GradientHeading>
              
              <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
                Praetorian is expanding our network of certified pool specialists authorized to install our premium Cool-Touch™ ceramic coatings. Register today to become an exclusive application partner in your area.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="backdrop-blur-sm bg-primary-800/50 p-6 rounded-xl border border-white/30">
                    <h3 className="text-2xl font-bold mb-4 text-center text-primary-300">The Praetorian Partner Advantage</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                          <CircleDollarSign className="h-5 w-5 text-white" />
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">Premium Pricing Power</h3>
                          <p>Command 30-45% higher rates with our advanced Cool-Touch™ technology that customers actively seek</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                          <i className="fas fa-map-marker-alt text-white"></i>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">Exclusive Territory Rights</h3>
                          <p>Secure protected service areas based on your ZIP code registration with our lead-routing system</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                          <i className="fas fa-user-friends text-white"></i>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">Direct Client Referrals</h3>
                          <p>Receive qualified leads from our national marketing campaigns worth $5K-$15K per project</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                          <i className="fas fa-tools text-white"></i>
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">Comprehensive Training</h3>
                          <p>Access our proprietary application techniques with hands-on certification training</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-primary-600/50">
                      <p className="text-white text-center mb-4">"After becoming a Praetorian certified applicator, our pool service business revenue increased by 35% in just one season. The Cool-Touch technology sells itself when customers feel the difference."</p>
                      <p className="text-right italic text-primary-300">- David M., Pool Professional, Arizona</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="italic mb-4">Already registered as a site member? Simply complete the form and submit your service ZIP codes to gain immediate access to our partner portal.</p>
                  </div>
                </div>
                
                <div>
                  <PoolProfessionalForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Pools;