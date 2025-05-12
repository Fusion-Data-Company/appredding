import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleDollarSign, DropletIcon, HelpCircle, Info, Loader2 } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import poolImage from "@assets/Screenshot 2025-04-22 at 14.04.08.png";
import waterBgImage from "@assets/pool-water-bg.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    name: "PraetorianPebble™",
    coverage: 100, // 100 sq ft per gallon
    price: 75.99
  },
  quartz: {
    name: "PraetorianQuartz™",
    coverage: 125, // 125 sq ft per gallon
    price: 89.99
  },
  epoxy: {
    name: "PraetorianEpoxy™",
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

  // Calculate the surface area based on pool shape and dimensions
  const calculateSurfaceArea = () => {
    if (!length || !width || !depth) {
      return 0;
    }

    let surfaceArea = 0;
    
    switch (poolShape) {
      case "rectangular":
        // Calculate surface area for rectangular pool
        // Bottom + 2 long sides + 2 short sides
        surfaceArea = (length * width) + (2 * length * depth) + (2 * width * depth);
        break;
      case "oval":
        // Approximation for oval pool
        // Using PI * (a * b) for the oval bottom + perimeter * depth for sides
        const a = length / 2;
        const b = width / 2;
        // Approximation of oval perimeter
        const perimeter = 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
        surfaceArea = (Math.PI * a * b) + (perimeter * depth);
        break;
      case "kidney":
      case "freeform":
        // For complex shapes, use a factor based on rectangular estimation
        // This is an approximation - actual calculation would require more specific measurements
        surfaceArea = 0.85 * ((length * width) + (2 * length * depth) + (2 * width * depth));
        break;
      case "custom":
        // For custom, we just use a simplified rectangular calculation
        surfaceArea = (length * width) + (2 * (length + width) * depth);
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
    if (!length || !width || !depth) {
      setValidationError("Please enter all pool dimensions.");
      return;
    }
    
    if (length <= 0 || width <= 0 || depth <= 0) {
      setValidationError("Dimensions must be greater than zero.");
      return;
    }
    
    // Get product details
    const product = coatingProducts[coatingType];
    const surfaceFactor = surfaceFactors[surfaceCondition as keyof typeof surfaceFactors];
    
    // Calculate surface area
    const area = calculateSurfaceArea();
    
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
        {/* Full-page water background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${waterBgImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-black/40"></div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            {/* Header section */}
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="blue">Cool-Touch Pool Deck Protection</GradientHeading>
              <p className="text-xl text-white mb-8">
                Our NASA-derived ceramic microsphere technology creates cool-to-touch surfaces for pool decks, surrounding areas, and furniture, with up to 40°F temperature reduction even in direct sunlight. Featuring 156% elastomeric flexibility, 89% UV reflection, and 30+ year service life — ending barefoot burns and protecting your investment.
              </p>
            </div>

            {/* Features grid section */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <GradientHeading level={2} className="text-3xl mb-6" variant="blue">Cool-Touch Pool Deck & Furniture Technology</GradientHeading>
                <p className="mb-8">Our NASA-derived ceramic microsphere coating systems create cool-to-touch surfaces for pool decks, pavers, furniture, and equipment areas - preventing painful burns even in 100°F+ temperatures with 30+ year documented durability</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-water text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Space-Grade Chemical Resistance</h3>
                      <p>Our ceramic microsphere technology forms an impenetrable barrier against chlorine (up to 3.5 ppm), bromine (up to 6.0 ppm), salt (up to 3,500 ppm), and pool chemicals with pH resilience from 6.8-8.2. Verified by ASTM D4587-11(2019) accelerated weathering tests and ASTM D3359-17 cross-hatch adhesion tests (5B rating). The water-based acrylic elastomeric resin provides 156% elongation capability (ASTM D2370-16 testing), exceeding the standard 100% requirement with maintained flexibility after 10,000+ hours of accelerated chemical exposure (ASTM D1308-02(2013) chemical resistance testing). NSF/ANSI 61 certified safe for water contact, with documented resistance to chloramines and cyanuric acid stabilizers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-sun text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">89% Solar Reflection & Thermal Emittance</h3>
                      <p>Verified by Cool Roof Rating Council testing and ASTM C1549-16 protocols, our coatings demonstrate only 1% reflectivity loss after 3 years compared to 10-20% for competing products. Combined with thermal emittance of 0.91 (ASTM C1371-15), our coating keeps pool surfaces up to 20°F cooler than conventional products. Laboratory testing confirms UV radiation filtering at 380-400nm wavelengths with 97.8% effectiveness (ASTM G173-03(2020) test methods). UV blocking efficacy maintained after 5,000+ hours of accelerated weathering (ASTM G154-16) with minimal color change (ΔE value &lt;1.0 per ASTM D2244-21). Advanced ceramic microsphere technology provides consistent thermal performance across ambient temperature conditions from 20°F (-6.7°C) to 120°F (48.9°C) in accordance with ASTM C518-17 thermal transmission testing.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-fire-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Class A Fire Rating for Pool Equipment Areas</h3>
                      <p>Perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development provides critical fire protection for pool equipment rooms and surrounding structures.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600/80 rounded-full p-2 mt-1">
                      <i className="fas fa-clock text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">30+ Year Proven Durability</h3>
                      <p>Original applications from 1989 showed no deterioration or performance loss when inspected 30 years later in 2019, providing exceptional long-term value for pool owners.</p>
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
                
                <GradientHeading level={2} className="text-3xl mb-6" variant="blue">NASA-Derived Ceramic Pool Protection</GradientHeading>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>30+ year documented durability with original 1989 applications still performing at 97%+ efficiency in 2019 inspections</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Ceramic microsphere technology creates a 156% elastomeric surface that flexes with pool structure movement</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>89% UV reflection prevents degradation and maintains aesthetics with only 1% reflectivity loss after 3 years</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>75% reduction in maintenance costs verified through 10-year comparative studies with traditional pool surfaces</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Class A fire rating (0/100 scores) provides critical safety for equipment areas and decking</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>30-year transferable warranty based on verified long-term performance data</p>
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
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-12 text-center" variant="blue">Pool Coverage Calculator</GradientHeading>
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-center">Calculate How Much Coating You Need</h3>
                <p className="text-center mb-6">Enter your pool dimensions to determine the amount of coating needed for your project</p>
                
                {validationError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pool Shape</label>
                    <select 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2"
                      value={poolShape}
                      onChange={(e) => setPoolShape(e.target.value)}
                    >
                      <option value="rectangular">Rectangular</option>
                      <option value="oval">Oval</option>
                      <option value="kidney">Kidney</option>
                      <option value="freeform">Free Form</option>
                      <option value="custom">Custom</option>
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
                    <label className="block text-sm font-medium mb-2">Length (ft)</label>
                    <input 
                      type="number" 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2" 
                      placeholder="Enter length" 
                      value={length || ''}
                      onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Width (ft)</label>
                    <input 
                      type="number" 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2" 
                      placeholder="Enter width" 
                      value={width || ''}
                      onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Average Depth (ft)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1">
                              <HelpCircle className="h-4 w-4 inline text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">For variable depth pools, use the average depth. For example, if your pool ranges from 3ft to 8ft, enter 5.5ft.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <input 
                      type="number" 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2" 
                      placeholder="Enter depth" 
                      value={depth || ''}
                      onChange={(e) => setDepth(e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="1"
                      step="0.1"
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
                      Surface Condition
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1">
                              <HelpCircle className="h-4 w-4 inline text-gray-400" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Surface condition affects how much coating material is needed. Rougher surfaces require more material.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <select 
                      className="w-full bg-primary-900 border border-primary-700 rounded p-2"
                      value={surfaceCondition}
                      onChange={(e) => setSurfaceCondition(e.target.value)}
                    >
                      <option value="smooth">Smooth (New/Refinished)</option>
                      <option value="moderate">Moderate (Some Porosity)</option>
                      <option value="rough">Rough (High Porosity)</option>
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
                          Based on your pool dimensions and selected coating system
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <div className="text-sm font-medium">Surface Area:</div>
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
                  <p className="mb-4">Our flagship NASA-derived ceramic microsphere coating with vacuum-filled ceramic technology for ultimate pool protection.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>Withstands 2,732°F (1,500°C) with extreme temperature differential</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>156% elastomeric flexibility with superb UV protection</span>
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
                  <p className="mb-4">Heavy-duty ceramic formulation specifically designed for high-traffic commercial pools and public facilities.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>Class A fire rating (0/100 scores) for ultimate safety</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>89% solar reflection maintains consistent water temperature</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>Enhanced chemical resistance for commercial maintenance</span>
                    </li>
                  </ul>
                  <GradientButton className="w-full" variant="variant">Technical Specs</GradientButton>
                </div>
                
                <div className="bg-primary-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3">PraetorianCeramic™ UV Shield</h3>
                  <p className="mb-4">Specialized ceramic formulation with enhanced UV protection for outdoor pools in extreme sun exposure environments.</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>Enhanced 95% UV reflection with minimal degradation over time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-primary-400"></i>
                      <span>Reduces surface temperature by 47°F compared to conventional coatings</span>
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
        
        {/* Pool Professional Registration Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="blue">
                Join Our Network of Pool Professionals
              </GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg">
                    Become a certified Praetorian Pool Professional and gain access to our premium pool coating products, training, and exclusive client referrals.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                        <i className="fas fa-dollar-sign text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Increased Revenue</h3>
                        <p>Access to premium clients looking for high-quality pool coating solutions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                        <i className="fas fa-certificate text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Professional Certification</h3>
                        <p>Become certified in the application of our advanced coating systems</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                        <i className="fas fa-tools text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Technical Support</h3>
                        <p>Access to our technical team for project support and troubleshooting</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-primary-600/80 rounded-full p-2 mt-1 flex-shrink-0">
                        <i className="fas fa-user-friends text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Lead Generation</h3>
                        <p>Get connected with clients seeking professional pool coating services</p>
                      </div>
                    </div>
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