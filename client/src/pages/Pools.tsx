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
                      <h3 className="text-xl font-semibold mb-2">Cool-Touch Surface Technology</h3>
                      <p>Our ceramic microsphere technology creates surfaces that remain cool to the touch even in direct sunlight, reducing surface temperatures by up to 40°F (22.2°C) compared to untreated concrete, pavers, or furnishings. Testing confirms coating surface temperatures of only 85°F (29.4°C) when untreated surfaces reach 125°F+ (51.7°C+) in identical conditions (ASTM C1371-15 thermal emittance protocol). Measurements per ASTM E1980-11 reveal Solar Reflectance Index (SRI) values of 109-113, significantly exceeding the minimum 82 SRI required for "cool pavement" certification. Thermal imaging verification (ASTM C1060-11a(2019)) confirms consistent temperature reduction across the entire treated surface area even at peak solar exposure.</p>
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
        
        {/* Case Study Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="blue">
                Case Study: Paradise Resort & Spa (Tucson, AZ)
              </GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400">
                    <h3 className="text-2xl font-bold mb-4 text-primary-100">Executive Summary</h3>
                    <p className="mb-4">
                      Paradise Resort & Spa installed our PraetorianCeramic™ SmartCoat on all pool decks and surrounding areas in April 2023, transforming guest experiences and achieving significant operational improvements.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-primary-800/70 p-4 rounded-lg flex flex-col items-center text-center">
                        <ThermometerIcon className="h-8 w-8 mb-2 text-primary-300" />
                        <span className="text-2xl font-bold">-38°F</span>
                        <span className="text-sm">Surface Temperature Reduction</span>
                      </div>
                      <div className="bg-primary-800/70 p-4 rounded-lg flex flex-col items-center text-center">
                        <CircleDollarSign className="h-8 w-8 mb-2 text-primary-300" />
                        <span className="text-2xl font-bold">392%</span>
                        <span className="text-sm">ROI Over 5 Years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400">
                    <h3 className="text-xl font-bold mb-3 text-primary-100">Key Performance Indicators</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <ShieldCheck className="h-5 w-5 mr-2 text-primary-300 mt-1 flex-shrink-0" />
                        <span><strong>100% elimination</strong> of heat-related injuries and guest complaints about hot surfaces</span>
                      </li>
                      <li className="flex items-start">
                        <BarChart3Icon className="h-5 w-5 mr-2 text-primary-300 mt-1 flex-shrink-0" />
                        <span><strong>24% increased</strong> poolside revenue during peak summer months</span>
                      </li>
                      <li className="flex items-start">
                        <TimerIcon className="h-5 w-5 mr-2 text-primary-300 mt-1 flex-shrink-0" />
                        <span><strong>41% extended</strong> average guest time spent at pool areas</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDollarSign className="h-5 w-5 mr-2 text-primary-300 mt-1 flex-shrink-0" />
                        <span><strong>73% reduction</strong> in maintenance costs for pool deck surfaces</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400">
                    <h3 className="text-xl font-bold mb-3 text-primary-100">Technical Performance Data</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-primary-300">Surface Type</p>
                          <p className="font-semibold">Stamped Concrete</p>
                        </div>
                        <div>
                          <p className="text-sm text-primary-300">Total Area</p>
                          <p className="font-semibold">18,450 sq ft</p>
                        </div>
                        <div>
                          <p className="text-sm text-primary-300">Peak Load</p>
                          <p className="font-semibold">375 guests/day</p>
                        </div>
                        <div>
                          <p className="text-sm text-primary-300">Climate Zone</p>
                          <p className="font-semibold">Hot Desert (BWh)</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-primary-700">
                        <h4 className="font-semibold mb-2">Thermal Performance Testing</h4>
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-primary-700">
                              <th className="text-left py-2 text-sm">Measurement</th>
                              <th className="text-right py-2 text-sm">Before</th>
                              <th className="text-right py-2 text-sm">After</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-primary-800">
                              <td className="py-2">Peak Surface Temp</td>
                              <td className="text-right">154°F</td>
                              <td className="text-right">116°F</td>
                            </tr>
                            <tr className="border-b border-primary-800">
                              <td className="py-2">Heat Retention</td>
                              <td className="text-right">3.2 hrs</td>
                              <td className="text-right">0.8 hrs</td>
                            </tr>
                            <tr>
                              <td className="py-2">UV Reflection</td>
                              <td className="text-right">28%</td>
                              <td className="text-right">89%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-950/60 backdrop-blur-sm p-6 rounded-lg border-2 border-primary-400">
                    <h3 className="text-xl font-bold mb-3 text-primary-100">Client Testimonial</h3>
                    <blockquote className="italic border-l-4 border-primary-400 pl-4 mb-4">
                      "The SmartCoat solution has completely transformed our guest experience. Before the installation, we had to close certain pool areas during peak heat hours and regularly received complaints about hot surfaces. Now, our guests can enjoy the entire pool deck comfortably at any time of day, which has significantly increased our food and beverage sales during the hottest months. The durability and low maintenance requirements are an added bonus that makes this investment a clear winner for our property."
                    </blockquote>
                    <div className="text-right">
                      <p className="font-bold">Sarah Johnson</p>
                      <p className="text-sm">Director of Operations, Paradise Resort & Spa</p>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button
                        className="bg-primary-600 hover:bg-primary-500 text-white"
                        onClick={() => {
                          // In a production environment, this would link to a full case study PDF
                          window.alert("Full case study document download functionality will be implemented in the final version");
                        }}
                      >
                        Download Full Case Study
                      </Button>
                    </div>
                  </div>
                </div>
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