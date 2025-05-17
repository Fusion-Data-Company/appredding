import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import {
  CircleDollarSign,
  DropletIcon,
  HelpCircle,
  ShieldCheck,
  ThermometerIcon,
  TimerIcon,
  BarChart3Icon,
  Loader2,
  Check as CheckIcon
} from "lucide-react";
import poolImage from "@assets/Screenshot 2025-04-22 at 14.04.08.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Constants for pool coating calculator
interface CoatingProduct {
  name: string;
  coverage: number; // Coverage in sq ft per gallon
  price: number; // Price per gallon
}

interface CalculationResult {
  surfaceArea: number;
  gallonsNeeded: number;
  totalCost: number;
  productName: string;
  coatCount: number;
}

// Coating product information
const coatingProducts: Record<string, CoatingProduct> = {
  pebble: {
    name: "PraetorianPebble™",
    coverage: 100,
    price: 75.99
  },
  quartz: {
    name: "PraetorianQuartz™",
    coverage: 125,
    price: 89.99
  },
  epoxy: {
    name: "PraetorianEpoxy™",
    coverage: 150,
    price: 105.99
  }
};

// Surface condition factors
const surfaceFactors = {
  smooth: 1.0,
  moderate: 1.2,
  rough: 1.4
};

// SEO metadata for pool coating solutions
const SEO_TITLE = "Advanced Ceramic Pool Coating Solutions | Praetorian SmartCoat";
const SEO_DESCRIPTION = "Military-grade ceramic pool coatings that reduce maintenance costs by 42%, extend surface life to 20+ years, and lower energy costs by 28.7%. Enterprise solutions for commercial and residential pools.";
const SEO_KEYWORDS = [
  "ceramic pool coating",
  "commercial pool maintenance",
  "energy efficient pool coating",
  "military-grade pool protection",
  "pool resurfacing alternative",
  "pool chemical reduction coating",
  "thermal efficient pool coating",
  "extended pool surface warranty",
  "ROI pool coating",
  "pool maintenance cost reduction"
];

const Pools = () => {
  // SEO Implementation - React Helmet would be better but using meta tags in MainLayout
  React.useEffect(() => {
    // Update page title and meta tags for SEO
    document.title = SEO_TITLE;
    
    // Find existing meta description or create new one
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', SEO_DESCRIPTION);
    
    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', SEO_KEYWORDS.join(', '));
    
    // Clean up function
    return () => {
      // Reset title when component unmounts
      document.title = "Praetorian SmartCoat";
    };
  }, []);
  
  // Lead generation tracking state
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  
  // Calculator state
  const [poolShape, setPoolShape] = useState("rectangular");
  const [coatingType, setCoatingType] = useState("pebble");
  const [length, setLength] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [depth, setDepth] = useState<number | undefined>(undefined);
  const [coats, setCoats] = useState<number>(2);
  const [surfaceCondition, setSurfaceCondition] = useState("moderate");
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calculate surface area based on shape and dimensions
  const calculateSurfaceArea = () => {
    if (!length || !width) {
      return 0;
    }

    // Basic formula for each shape
    let area = 0;
    switch (poolShape) {
      case "rectangular":
        area = length * width;
        break;
      case "oval":
        area = Math.PI * (length / 2) * (width / 2);
        break;
      case "kidney":
        // Approximation for L-shaped area (width * length * 0.85)
        area = length * width * 0.85;
        break;
      case "freeform":
        // Approximation for irregular shapes
        area = length * width * 0.8;
        break;
      case "custom":
        // Add complexity factor for multi-level
        area = length * width * 1.2;
        break;
      default:
        area = length * width;
    }

    // Add percentage for additional areas
    if (depth && depth > 0) {
      area = area * (1 + (depth / 100));
    }

    return area;
  };

  // Main calculation function
  const calculateCoatingNeeded = () => {
    // Validate input
    if (!length || !width) {
      setValidationError("Please enter both length and width measurements");
      setShowResults(false);
      return;
    }

    if (length <= 0 || width <= 0) {
      setValidationError("Measurements must be greater than zero");
      setShowResults(false);
      return;
    }

    setValidationError(null);

    // Calculate base surface area
    const surfaceArea = calculateSurfaceArea();

    // Get product details
    const product = coatingProducts[coatingType];

    // Calculate gallons needed based on coverage rate and surface condition
    const conditionFactor = surfaceFactors[surfaceCondition as keyof typeof surfaceFactors];
    const gallonsPerCoat = (surfaceArea / product.coverage) * conditionFactor;
    const totalGallons = gallonsPerCoat * coats;

    // Calculate total cost
    const totalCost = totalGallons * product.price;

    // Set result and show it
    setCalculationResult({
      surfaceArea,
      gallonsNeeded: totalGallons,
      totalCost,
      productName: product.name,
      coatCount: coats
    });

    setShowResults(true);
  };

  // Reset calculator
  const resetCalculator = () => {
    setPoolShape("rectangular");
    setCoatingType("pebble");
    setLength(undefined);
    setWidth(undefined);
    setDepth(undefined);
    setCoats(2);
    setSurfaceCondition("moderate");
    setCalculationResult(null);
    setShowResults(false);
    setValidationError(null);
  };

  // Lead generation form submission handler - Connects to CRM
  const handleLeadSubmit = (data: any) => {
    // In a real implementation, this would submit to your CRM system
    console.log("Lead data submitted to CRM:", data);
    setLeadSubmitted(true);
    // Track conversion in analytics
    try {
      // @ts-ignore - would use real analytics in production
      if (window.gtag) {
        // @ts-ignore
        window.gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'USD'
        });
      }
    } catch (e) {
      console.error("Analytics error:", e);
    }
  };

  return (
    <MainLayout>
      <div className="relative">
        {/* Structured data for SEO - JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Praetorian SmartCoat Pool Ceramic Coating",
            "description": "Military-grade ceramic pool coating that reduces maintenance costs by 42%, extends surface life to 20+ years, and lowers energy costs by 28.7%.",
            "brand": {
              "@type": "Brand",
              "name": "Praetorian SmartCoat"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "75.99",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })
        }} />
        
        {/* Decorative background elements */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
          style={{
            backgroundImage: `url(${poolImage})`,
            backgroundAttachment: "fixed"
          }}
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90" aria-hidden="true"></div>
        
        {/* Ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        {/* Hero section with semantic HTML5 - SEO optimized */}
        <section className="relative z-10 py-20" aria-labelledby="pool-coating-hero-title">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20 relative">
              {/* Advanced enterprise-grade backdrop with layered effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-orange-600/10 to-blue-600/20 rounded-2xl blur-xl opacity-70"></div>
              
              {/* Premium corner accents - enterprise elite style */}
              <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg"></div>
                <div className="absolute top-1 left-1 w-14 h-14 border-t border-l border-blue-500/40 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/60 rounded-tr-lg"></div>
                <div className="absolute top-1 right-1 w-14 h-14 border-t border-r border-blue-500/40 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-500/60 rounded-bl-lg"></div>
                <div className="absolute bottom-1 left-1 w-14 h-14 border-b border-l border-blue-500/40 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/60 rounded-br-lg"></div>
                <div className="absolute bottom-1 right-1 w-14 h-14 border-b border-r border-blue-500/40 rounded-br-lg"></div>
              </div>
              
              {/* Enhanced main content with premium padding */}
              <div className="relative p-8 md:p-10 backdrop-blur-sm">
                {/* Ultra-premium enterprise header with layered effects */}
                <div className="relative mb-8">
                  {/* Advanced layered glow effects */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-blue-600/20 to-blue-500/30 rounded-full blur-xl opacity-80"></div>
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/10 via-orange-500/5 to-blue-600/10 rounded-full blur-2xl opacity-70 animate-pulse-slow"></div>
                  
                  {/* Premium title with enterprise-grade styling */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white relative z-10 
                    tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_2px_15px_rgba(59,130,246,0.3),0_-1px_35px_rgba(59,130,246,0.2)]">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-50 to-white">
                      371% ROI Pool Protection System
                    </span>
                  </h1>
                  
                  {/* Sophisticated divider accents */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                {/* Enhanced subtitle with advanced typography */}
                <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-medium max-w-4xl mx-auto">
                  Extend pool life by <span className="text-blue-300 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">3x</span> and reduce maintenance costs by <span className="text-blue-300 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">64%</span> with our advanced ceramic coating technology – <span className="text-orange-300 italic">previously only available for advanced commercial applications</span>.
                </p>
              </div>
            </div>
                  
            <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20 relative">
              <div className="relative p-8 md:p-10 backdrop-blur-sm">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]">
                  371% Increased Pool Business Profit
                </h1>
                  
                  {/* Enhanced ROI-focused stats in enterprise grid format */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">328%</span>
                      <span className="text-blue-200 text-xs">Higher Customer ROI</span>
                    </div>
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-blue-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">$14.80</span>
                      <span className="text-blue-200 text-xs">Added profit per sq.ft</span>
                    </div>
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-orange-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">72%</span>
                      <span className="text-blue-200 text-xs">Customer conversion rate</span>
                    </div>
                  </div>
                  
                  <p className="text-xl text-white mb-4">
                    <span className="text-blue-300 font-semibold">While standard coatings only last 3-5 years</span>, our ceramic technology delivers <span className="text-orange-300 font-semibold">20+ year protection</span> with documented 42% maintenance cost reduction and 28.7% energy savings for pool owners.
                  </p>
                  
                  <div className="bg-black/30 border border-blue-600/20 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-100 italic">Previously classified ceramic microsphere technology, now available exclusively to certified pool contractors</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                    <a href="#contractor-registration" className="relative group">
                      <div className="absolute -inset-0.5 bg-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                      <button className="relative px-6 py-3 bg-black text-white font-medium rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200">
                        <span className="flex items-center">
                          <CircleDollarSign className="mr-2 h-5 w-5 text-green-400" />
                          <span>Calculate Your Profit Potential</span>
                        </span>
                      </button>
                    </a>
                    
                    <a href="#profit-calculator" className="relative group">
                      <div className="absolute -inset-0.5 bg-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                      <button className="relative px-6 py-3 bg-black text-white font-medium rounded-lg border border-orange-500/50 hover:border-orange-400 transition duration-200">
                        <span className="flex items-center">
                          <BarChart3Icon className="mr-2 h-5 w-5 text-blue-400" />
                          <span>Get Customer ROI Analysis</span>
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Feature Card 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-lg p-6 border border-blue-500/30 h-full overflow-hidden">
                  {/* Corner accent elements */}
                  <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500/70 rounded-tl-md"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-3 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <ThermometerIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Cool-Touch Technology - Premium Upsell</h3>
                  <p className="text-gray-300">Our ceramic microspheres reflect up to 80% of solar heat, keeping deck surfaces up to 47°F cooler than traditional materials. Contractors report <span className="text-green-400 font-semibold">$6-8 per sq. ft. upsell premiums</span> for this feature that clients readily pay for enhanced comfort.</p>
                </div>
              </div>
              
              {/* Feature Card 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-lg p-6 border border-blue-500/30 h-full overflow-hidden">
                  {/* Corner accent elements */}
                  <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/70 rounded-tr-md"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-3 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Non-Slip Safety - Liability Protection</h3>
                  <p className="text-gray-300">Engineered texture provides crucial traction when wet, exceeding commercial safety standards for pool decking. Clients receive <span className="text-blue-300 font-semibold">7-12% insurance premium discounts</span> and documented liability protection worth <span className="text-green-400 font-semibold">$85K+ in avoided claim risk</span> per facility.</p>
                </div>
              </div>
              
              {/* Feature Card 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 rounded-lg p-6 border border-blue-500/30 h-full overflow-hidden">
                  {/* Corner accent elements */}
                  <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500/70 rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[2px]"></div>
                  </div>
                  
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-3 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <TimerIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Long-Term Durability - Recurring Revenue</h3>
                  <p className="text-gray-300">Enhanced with UV stabilizers and elastomeric properties, our coatings last 3-5× longer than conventional materials. Clients save <span className="text-green-400 font-semibold">$32K-65K in lifetime maintenance costs</span> while contractors earn <span className="text-blue-300 font-semibold">$2,800-4,200 in annual maintenance service contracts</span> per customer.</p>
                </div>
              </div>
            </div>
            
            {/* Pool Contractor Business Opportunity Section */}
            <div id="profit-calculator" className="relative mb-20 scroll-mt-24">
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
                
                <h2 className="text-2xl md:text-3xl mb-4 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  The Praetorian 371% ROI Contractor Program
                </h2>
                <p className="text-center text-blue-100 mb-6 max-w-3xl mx-auto">
                  <span className="text-orange-300 font-semibold">While traditional pool contractors struggle with 18-25% profit margins</span>, our certified partners consistently achieve <span className="text-green-400 font-semibold">65-80% margins on premium ceramic installations</span> with our military-grade technology now available for civilian applications
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Why Pool Professionals Choose Praetorian</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-200">
                          <span className="font-semibold text-white">Premium pricing power</span> - Charge <span className="text-green-400 font-semibold">60-80% more</span> than standard deck resurfacing, adding <span className="text-green-400 font-semibold">$3,800-7,500 profit per job</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-200">
                          <span className="font-semibold text-white">Exclusive territory rights</span> - Secure up to <span className="text-blue-300 font-semibold">85% market share</span> in your region with <span className="text-green-400 font-semibold">$125K-210K annual revenue potential</span> as the only certified installer
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-200">
                          <span className="font-semibold text-white">Direct lead generation</span> - Receive <span className="text-blue-300 font-semibold">12-18 qualified leads monthly</span> with <span className="text-green-400 font-semibold">38% conversion rate</span> and <span className="text-green-400 font-semibold">$4,200 average job value</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-200">
                          <span className="font-semibold text-white">Low startup investment</span> - <span className="text-blue-300 font-semibold">Under $2,500 initial equipment cost</span> with <span className="text-green-400 font-semibold">ROI breakeven in 1-2 jobs</span> using standard application tools
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-200">
                          <span className="font-semibold text-white">Contractor pricing discounts</span> - <span className="text-blue-300 font-semibold">25-35% below retail</span>, adding <span className="text-green-400 font-semibold">$1,800-2,400 profit per job</span> compared to standard distribution margins
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-200">
                          <span className="font-semibold text-white">Year-round revenue stream</span> - <span className="text-blue-300 font-semibold">4-5 more billable months annually</span> with all-weather installation capabilities, adding <span className="text-green-400 font-semibold">$42,000-58,000 additional annual income</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-white">Pool Contractor 371% ROI Example</h3>
                    
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm"></div>
                      </div>
                      
                      <div className="space-y-1 mb-6">
                        <div className="flex justify-between border-b border-gray-700 pb-1">
                          <span className="text-gray-300">Average pool deck size:</span>
                          <span className="text-white font-medium">750 sq ft</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-1">
                          <span className="text-gray-300">Your cost (materials):</span>
                          <span className="text-white font-medium">$8.75/sq ft</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-1">
                          <span className="text-gray-300">Labor cost (your crew):</span>
                          <span className="text-white font-medium">$3.25/sq ft</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-1">
                          <span className="text-gray-300">Your total cost:</span>
                          <span className="text-white font-medium">$12.00/sq ft</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-700 pb-1">
                          <span className="text-gray-300">Retail price to homeowner:</span>
                          <span className="text-white font-medium">$22.00/sq ft</span>
                        </div>
                        <div className="flex justify-between pb-1 text-lg">
                          <span className="text-gray-200 font-medium">Standard industry margin:</span>
                          <span className="text-orange-300 font-semibold">18-25%</span>
                        </div>
                        <div className="flex justify-between pb-1 text-lg">
                          <span className="text-gray-200 font-medium">Your profit margin:</span>
                          <span className="text-green-400 font-semibold">65-80%</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-4">
                        <h4 className="text-lg font-semibold text-white mb-2">371% ROI Per Average Project</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-300 mb-1">Total Project Revenue</p>
                            <p className="text-2xl font-bold text-white">$16,500</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300 mb-1">Standard Industry Profit</p>
                            <p className="text-2xl font-bold text-orange-300">$3,150</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300 mb-1">Your Premium Profit</p>
                            <p className="text-2xl font-bold text-green-400">$11,700</p>
                          </div>
                        </div>
                        <div className="mt-3 bg-gradient-to-r from-blue-900/30 via-green-900/30 to-blue-900/30 p-2 rounded-lg border border-green-500/20">
                          <p className="text-center text-blue-100 text-sm">With <span className="font-semibold text-green-400">$2,500 initial investment</span> and completing just 2 projects per month = <span className="font-semibold text-green-400">$280,800/year profit</span> (<span className="font-semibold text-green-400">11,232% annual ROI</span>)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <a href="#contractor-registration" className="relative inline-block group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <button className="relative px-8 py-4 bg-gradient-to-br from-gray-900 to-black text-white font-medium text-lg rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200">
                      Secure Your 11,232% ROI Territory Now
                    </button>
                  </a>
                </div>
                <p className="text-center text-gray-400 text-sm">Limited territories available - Apply today to secure your region</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] mb-12">
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]">
                <span className="relative inline-block">
                  Pool Profit Maximizer Calculator
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </span>
              </h2>
              
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center justify-center mb-6 gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-2 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <BarChart3Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Calculate Your Profit Potential</h3>
                </div>
                <p className="text-center text-blue-100 mb-4 max-w-2xl mx-auto">Enter your client's pool deck dimensions to determine exact material requirements and calculate your <span className="text-green-400 font-semibold">65-80% profit margin</span> when using our premium ceramic technology</p>
                <p className="text-center text-orange-300 font-semibold mb-8 max-w-2xl mx-auto text-sm">While standard contractors average only 22-35% margins on deck coatings, our certified partners report <span className="text-green-400">$11,700 average profit per project</span></p>
                
                {validationError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-gray-800">
                      <label className="flex items-center gap-2 text-sm font-medium mb-3 text-white">
                        <DropletIcon className="h-4 w-4 text-blue-400" />
                        Deck Length (ft)
                      </label>
                      <input 
                        type="number" 
                        className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                        placeholder="Enter deck length" 
                        value={length || ''}
                        onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : undefined)}
                        min="1"
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-gray-800">
                      <label className="flex items-center gap-2 text-sm font-medium mb-3 text-white">
                        <DropletIcon className="h-4 w-4 text-blue-400" />
                        Deck Width (ft)
                      </label>
                      <input 
                        type="number" 
                        className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                        placeholder="Enter deck width" 
                        value={width || ''}
                        onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : undefined)}
                        min="1"
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-gray-800">
                      <label className="flex items-center gap-2 text-sm font-medium mb-3 text-white">
                        <CircleDollarSign className="h-4 w-4 text-blue-400" />
                        Additional Areas (%)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-block ml-1 cursor-pointer">
                                <HelpCircle className="h-4 w-4 inline text-gray-400 hover:text-blue-400 transition-colors" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border border-blue-900 text-white">
                              <p className="w-60">Account for steps, cutouts, or specialized areas by adding a percentage to the base calculation.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <input 
                        type="number" 
                        className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                        placeholder="Enter percentage (e.g. 10)" 
                        value={depth || ''}
                        onChange={(e) => setDepth(e.target.value ? parseFloat(e.target.value) : undefined)}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-gray-800">
                      <label className="flex items-center gap-2 text-sm font-medium mb-3 text-white">
                        <DropletIcon className="h-4 w-4 text-blue-400" />
                        Deck Area Shape
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-block ml-1 cursor-pointer">
                                <HelpCircle className="h-4 w-4 inline text-gray-400 hover:text-blue-400 transition-colors" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border border-blue-900 text-white">
                              <p className="w-60">Select the layout that best matches your pool deck area to get an accurate estimate.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <select 
                        className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner"
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
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-5 border border-gray-800">
                      <label className="flex items-center gap-2 text-sm font-medium mb-3 text-white">
                        <DropletIcon className="h-4 w-4 text-blue-400" />
                        Coating System
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-block ml-1 cursor-pointer">
                                <HelpCircle className="h-4 w-4 inline text-gray-400 hover:text-blue-400 transition-colors" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border border-blue-900 text-white">
                              <p className="w-60">Different coating systems have different coverage rates and durability. Select the system that best meets your needs.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <select 
                        className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner"
                        value={coatingType}
                        onChange={(e) => setCoatingType(e.target.value)}
                      >
                        <option value="pebble">PraetorianPebble™</option>
                        <option value="quartz">PraetorianQuartz™</option>
                        <option value="epoxy">PraetorianEpoxy™</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {showResults && calculationResult ? (
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-blue-900/20 via-blue-950/20 to-black/20 p-6 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-8">
                    <h4 className="text-xl font-bold mb-4 text-white text-center">Calculation Results</h4>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">Total Surface Area</p>
                        <p className="text-xl font-bold text-white">{calculationResult.surfaceArea.toFixed(1)} sq ft</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">Gallons Needed</p>
                        <p className="text-xl font-bold text-white">{calculationResult.gallonsNeeded.toFixed(1)} gallons</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">Product</p>
                        <p className="text-xl font-bold text-white">{calculationResult.productName}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">Estimated Cost</p>
                        <p className="text-xl font-bold text-white">${calculationResult.totalCost.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <GradientButton onClick={resetCalculator} variant="variant">
                        Reset Calculator
                      </GradientButton>
                    </div>
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
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_60px_rgba(59,130,246,0.2)] mb-12">
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-blue-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-blue-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40 rounded-br-lg"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]">
                <span className="relative inline-block">
                  Ceramic Pool Coating Systems
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-bold mb-3 text-white">PraetorianPebble™</h3>
                    <p className="mb-4 text-gray-300">Our flagship ceramic microsphere coating with cool-touch technology and vacuum-filled ceramic protection for pool decks.</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Cool-Touch Surface:</span> <span className="text-gray-300">Reduces surface temperature by 35°F in direct sunlight</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Elastomeric:</span> <span className="text-gray-300">135% flexibility prevents cracking and peeling</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Lifespan:</span> <span className="text-gray-300">8-10 years with proper maintenance</span></span>
                      </li>
                    </ul>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-md blur-md"></div>
                      <GradientButton className="w-full relative" variant="variant">
                        Learn More
                      </GradientButton>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-bold mb-3 text-white">PraetorianQuartz™</h3>
                    <p className="mb-4 text-gray-300">Premium quartz-infused coating with added durability and enhanced grip for high-traffic pool deck areas.</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Cool-Touch Surface:</span> <span className="text-gray-300">Reduces surface temperature by 42°F in direct sunlight</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Enhanced Grip:</span> <span className="text-gray-300">Slip resistance rating of 0.65 (wet)</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Lifespan:</span> <span className="text-gray-300">10-12 years with proper maintenance</span></span>
                      </li>
                    </ul>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-md blur-md"></div>
                      <GradientButton className="w-full relative" variant="variant">
                        Learn More
                      </GradientButton>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-bold mb-3 text-white">PraetorianEpoxy™</h3>
                    <p className="mb-4 text-gray-300">Industrial-grade ceramic-epoxy hybrid for maximum chemical resistance and extreme durability.</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Cool-Touch Surface:</span> <span className="text-gray-300">Reduces surface temperature by 47°F in direct sunlight</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Chemical Resistance:</span> <span className="text-gray-300">Withstands pool chemicals, salt, and UV exposure</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold text-white">Lifespan:</span> <span className="text-gray-300">12-15 years with proper maintenance</span></span>
                      </li>
                    </ul>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-md blur-md"></div>
                      <GradientButton className="w-full relative" variant="variant">
                        Learn More
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 py-12 px-8 md:px-12 rounded-xl border border-orange-500/40 shadow-[0_10px_50px_rgba(59,130,246,0.2)]">
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
                
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)]">
                    Ready to Transform Your Pool Deck?
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join our network of professional applicators or request a free consultation for your pool project
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-md blur-md"></div>
                      <Button className="w-full relative bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 text-white py-3 text-lg rounded-md">
                        Request Consultation
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500/30 rounded-md blur-md"></div>
                      <Button className="w-full relative bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 text-white py-3 text-lg rounded-md">
                        Become an Applicator
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contractor Registration Section */}
        <section id="contractor-registration" className="py-16 relative z-10 scroll-mt-24">
          <div className="container mx-auto">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/30 via-blue-600/30 to-orange-600/30 rounded-xl blur-xl opacity-70"></div>
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
                
                <h2 className="text-2xl md:text-3xl mb-6 text-center text-white drop-shadow-[0_0px_1px_rgba(59,130,246,0.2)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(59,130,246,0.3)]">
                  Become a Certified Pool Deck Installer
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Exclusive Contractor Benefits</h3>
                    <div className="bg-gradient-to-br from-gray-800/70 via-gray-900/70 to-gray-900/70 p-4 rounded-lg border border-orange-500/20 mb-6">
                      <ul className="grid gap-x-4 gap-y-2">
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Exclusive territory rights in your service area</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Priority lead generation from our marketing efforts</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Wholesale pricing – 25-35% below retail</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Free technical training and certification</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Custom marketing materials with your branding</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Featured listing on our installer locator</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Dedicated technical support hotline</span>
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                          <CheckIcon className="h-4 w-4 text-orange-400 mr-2 shrink-0" />
                          <span>Year-round installation revenue opportunities</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-950/30 rounded-lg border border-blue-500/30 p-4 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Territories Going Fast</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        We limit the number of certified installers in each geographic area to ensure our partners maintain exclusive access to local pool deck projects and maximize their profitability.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Available territories:</span>
                        <span className="text-orange-400 font-bold">73% claimed</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2.5 mt-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-blue-500 h-2.5 rounded-full" style={{ width: "73%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 rounded-lg p-6 border border-blue-500/20">
                    <form className="space-y-4">
                      <h3 className="text-xl font-semibold mb-4 text-white">Register Your Interest</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                          <input 
                            type="text"
                            className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                          <input 
                            type="text"
                            className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                            placeholder="Smith"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                        <input 
                          type="text"
                          className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                          placeholder="Your Pool Business"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                          <input 
                            type="email"
                            className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                          <input 
                            type="tel"
                            className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Service Area (City/State or Zip)</label>
                        <input 
                          type="text"
                          className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                          placeholder="Los Angeles, CA or 90210"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Tell us about your business</label>
                        <textarea
                          rows={3}
                          className="w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-900/50 rounded-md p-2.5 text-white shadow-inner" 
                          placeholder="Years in business, types of customers, current service offerings, etc."
                        ></textarea>
                      </div>
                      
                      <div className="flex items-start">
                        <input 
                          type="checkbox"
                          className="rounded border-gray-600 text-blue-600 mt-1 mr-2" 
                        />
                        <label className="text-sm text-gray-300">
                          I agree to be contacted about the Praetorian Certified Installer program and understand my information will be kept confidential per our <a href="#" className="text-blue-400 hover:underline">privacy policy</a>.
                        </label>
                      </div>
                      
                      <div className="relative group inline-block w-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 w-full"></div>
                        <button 
                          className="relative w-full px-6 py-3 bg-gradient-to-br from-gray-900 to-black text-white font-medium text-lg rounded-lg border border-blue-500/50 hover:border-blue-400 transition duration-200"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="text-center text-gray-400 text-sm">
                  <p>
                    Questions? Contact our Contractor Relations team at <a href="mailto:partners@praetoriansmartcoat.com" className="text-blue-400 hover:underline">partners@praetoriansmartcoat.com</a> or call <a href="tel:9168096619" className="text-blue-400 hover:underline">(916) 809-6619</a>
                  </p>
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