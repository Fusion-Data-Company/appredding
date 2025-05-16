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

const Pools = () => {
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

  return (
    <MainLayout>
      <div className="relative">
        {/* Decorative background elements */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
          style={{
            backgroundImage: `url(${poolImage})`,
            backgroundAttachment: "fixed"
          }}
        ></div>
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/85 to-black/90"></div>
        
        {/* Ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/15 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        {/* Hero section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="relative">
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
                  
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)]">
                    NASA-Derived Ceramic Pool Deck Coatings
                  </h1>
                  <p className="text-xl text-blue-100 mb-6">
                    Protect and enhance your pool deck with cutting-edge ceramic technology that keeps surfaces cool, prevents slips, and lasts for years
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Feature Card 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800">
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-3 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <ThermometerIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Cool-Touch Technology</h3>
                  <p className="text-gray-300">Our ceramic microspheres reflect up to 80% of solar heat, keeping deck surfaces up to 47°F cooler than traditional materials.</p>
                </div>
              </div>
              
              {/* Feature Card 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800">
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-3 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Non-Slip Safety</h3>
                  <p className="text-gray-300">Engineered texture provides crucial traction when wet, exceeding commercial safety standards for pool decking.</p>
                </div>
              </div>
              
              {/* Feature Card 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-orange-600/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border border-gray-800">
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-3 relative border border-blue-400/30 shadow-lg shadow-blue-900/20">
                      <TimerIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Long-Term Durability</h3>
                  <p className="text-gray-300">Enhanced with UV stabilizers and elastomeric properties, our coatings last 3-5× longer than conventional pool deck materials.</p>
                </div>
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
                  Pool Deck Coverage Calculator
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
                  <h3 className="text-2xl font-bold text-white">Calculate How Much Coating You Need</h3>
                </div>
                <p className="text-center text-blue-100 mb-8 max-w-2xl mx-auto">Enter your pool deck dimensions to determine the precise amount of coating needed to protect surrounding surfaces with our enterprise-grade ceramic technology</p>
                
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
      </div>
    </MainLayout>
  );
};

export default Pools;