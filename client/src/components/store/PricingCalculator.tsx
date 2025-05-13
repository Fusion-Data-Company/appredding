import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calculator, Ruler, Building, DollarSign, Sparkles, Shapes, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from '@/contexts/StoreContext';

interface Calculator {
  surfaceArea: number;
  applicationArea: string;
  productType: string;
  coverage: number;
}

const PricingCalculator = () => {
  const { products, addToCart } = useStore();
  const [calculator, setCalculator] = useState<Calculator>({
    surfaceArea: 1000,
    applicationArea: "roof",
    productType: "smart-coat",
    coverage: 1, // 1 = standard, 1.5 = premium, 2 = max protection
  });
  const [gallonsNeeded, setGallonsNeeded] = useState(0);
  const [recommendedProduct, setRecommendedProduct] = useState<any>(null);
  const [savings, setSavings] = useState({
    energy: 0,
    maintenance: 0,
    replacement: 0,
    totalSavings: 0,
    roi: 0
  });

  // Calculate coverage rates based on application area
  const getCoverageRate = () => {
    const baseCoverage = {
      roof: 100, // sq ft per gallon
      wall: 120,
      deck: 80,
      industrial: 70
    }[calculator.applicationArea as keyof typeof baseCoverage] || 100;

    return baseCoverage / calculator.coverage; // Adjust based on coverage level
  };

  // Calculate how many gallons are needed
  useEffect(() => {
    const coverageRate = getCoverageRate();
    const gallons = Math.ceil(calculator.surfaceArea / coverageRate);
    
    // Determine if 1-gallon or 5-gallon is more economical
    const fiveGallonUnits = Math.floor(gallons / 5);
    const remainingGallons = gallons % 5;
    
    setGallonsNeeded(gallons);
    
    // Find recommended product
    let product;
    if (calculator.productType === "smart-coat") {
      if (gallons >= 5) {
        // Recommend 5-gallon with 1-gallon if needed
        product = products.find(p => p.id === 2); // 5-gallon Smart-Coat
      } else {
        product = products.find(p => p.id === 1); // 1-gallon Smart-Coat
      }
    } else {
      if (gallons >= 5) {
        product = products.find(p => p.id === 4); // 5-gallon Stucco
      } else {
        product = products.find(p => p.id === 3); // 1-gallon Stucco
      }
    }
    
    setRecommendedProduct(product);
    
    // Calculate potential savings
    const sqFtRate = calculator.surfaceArea / 1000; // scale based on 1000 sq ft baseline
    
    // These values are based on case studies and industry averages
    const annualEnergySavings = calculator.applicationArea === "roof" ? 
      (1200 * sqFtRate * calculator.coverage) : 
      (800 * sqFtRate * calculator.coverage);
      
    const annualMaintenanceSavings = 
      (300 * sqFtRate * (calculator.coverage / 1.2));
      
    const replacementLifeExtension = 
      (5000 * sqFtRate * (calculator.coverage / 1.5));
      
    const totalCost = gallons * (product?.price || 0);
    const totalSavings = (annualEnergySavings * 10) + (annualMaintenanceSavings * 10) + replacementLifeExtension;
    const roi = totalCost > 0 ? (totalSavings / totalCost).toFixed(1) : 0;
    
    setSavings({
      energy: Math.round(annualEnergySavings),
      maintenance: Math.round(annualMaintenanceSavings),
      replacement: Math.round(replacementLifeExtension),
      totalSavings: Math.round(totalSavings),
      roi: Number(roi)
    });
  }, [calculator, products]);

  const handleAddToCart = () => {
    if (recommendedProduct && gallonsNeeded > 0) {
      const fiveGallonProduct = products.find(p => 
        p.category === recommendedProduct.category && p.size === "5-gallon"
      );
      
      const oneGallonProduct = products.find(p => 
        p.category === recommendedProduct.category && p.size === "1-gallon"
      );
      
      if (gallonsNeeded >= 5 && fiveGallonProduct) {
        const fiveGallonUnits = Math.floor(gallonsNeeded / 5);
        const remainingGallons = gallonsNeeded % 5;
        
        // Add 5-gallon units
        addToCart(fiveGallonProduct, fiveGallonUnits);
        
        // Add remaining 1-gallon units if needed
        if (remainingGallons > 0 && oneGallonProduct) {
          addToCart(oneGallonProduct, remainingGallons);
        }
      } else if (oneGallonProduct) {
        // Add only 1-gallon units
        addToCart(oneGallonProduct, gallonsNeeded);
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-2 px-3 py-1 border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
            ROI Calculator
          </Badge>
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-300 mb-4">
            Calculate Your Coverage & Savings
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See precisely how much product you need and the long-term return on investment for your specific application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-amber-50/60 dark:bg-gray-800 rounded-xl p-6 border border-amber-100 dark:border-amber-900/20 shadow-md"
          >
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              <span>Project Details</span>
            </h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="surface-area" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  Surface Area (sq ft)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    id="surface-area"
                    type="number"
                    value={calculator.surfaceArea}
                    onChange={(e) => setCalculator({...calculator, surfaceArea: Number(e.target.value)})}
                    className="flex-1"
                    min={100}
                    max={100000}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-16">sq ft</span>
                </div>
                <Slider 
                  value={[calculator.surfaceArea]} 
                  min={100} 
                  max={10000} 
                  step={100}
                  onValueChange={(value) => setCalculator({...calculator, surfaceArea: value[0]})}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100 sq ft</span>
                  <span>10,000 sq ft</span>
                </div>
              </div>

              <div>
                <Label htmlFor="application-area" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Building className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  Application Area
                </Label>
                <Select 
                  value={calculator.applicationArea}
                  onValueChange={(value) => setCalculator({...calculator, applicationArea: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select application area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roof">Roof</SelectItem>
                    <SelectItem value="wall">Exterior Walls</SelectItem>
                    <SelectItem value="deck">Deck/Pool Area</SelectItem>
                    <SelectItem value="industrial">Industrial Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="product-type" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Shapes className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  Product Type
                </Label>
                <Select 
                  value={calculator.productType}
                  onValueChange={(value) => setCalculator({...calculator, productType: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smart-coat">Smart-Coat (Smooth Surfaces)</SelectItem>
                    <SelectItem value="stucco">Stucco Formula (Textured Surfaces)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  Protection Level
                </Label>
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-700/30 h-10 rounded-full mt-2 p-1">
                  <div className="grid grid-cols-3 h-full">
                    <button
                      className={`rounded-full h-full text-xs font-medium transition-colors ${
                        calculator.coverage === 1
                          ? "bg-white dark:bg-gray-700 shadow text-amber-900 dark:text-amber-300"
                          : "text-amber-700 dark:text-amber-400"
                      }`}
                      onClick={() => setCalculator({...calculator, coverage: 1})}
                    >
                      Standard
                    </button>
                    <button
                      className={`rounded-full h-full text-xs font-medium transition-colors ${
                        calculator.coverage === 1.5
                          ? "bg-white dark:bg-gray-700 shadow text-amber-900 dark:text-amber-300"
                          : "text-amber-700 dark:text-amber-400"
                      }`}
                      onClick={() => setCalculator({...calculator, coverage: 1.5})}
                    >
                      Premium
                    </button>
                    <button
                      className={`rounded-full h-full text-xs font-medium transition-colors ${
                        calculator.coverage === 2
                          ? "bg-white dark:bg-gray-700 shadow text-amber-900 dark:text-amber-300"
                          : "text-amber-700 dark:text-amber-400"
                      }`}
                      onClick={() => setCalculator({...calculator, coverage: 2})}
                    >
                      Maximum
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {calculator.coverage === 1 && "Standard protection for moderate conditions"}
                  {calculator.coverage === 1.5 && "Premium protection for harsh environments"}
                  {calculator.coverage === 2 && "Maximum protection for extreme conditions"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-amber-500/5 to-amber-600/10 dark:from-amber-800/10 dark:to-amber-700/20 rounded-xl p-6 border border-amber-100 dark:border-amber-900/20 shadow-md"
          >
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <span>Results & Recommendations</span>
            </h3>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Card className="flex-1 bg-white/70 dark:bg-gray-800/50 border-amber-100 dark:border-amber-900/10">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Estimated coverage:</div>
                    <div className="text-3xl font-bold text-amber-900 dark:text-amber-300">
                      {gallonsNeeded} <span className="text-lg">gallons</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {calculator.coverage === 1 && "Standard application"}
                      {calculator.coverage === 1.5 && "Premium application (50% thicker)"}
                      {calculator.coverage === 2 && "Maximum protection (double coat)"}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="flex-1 bg-white/70 dark:bg-gray-800/50 border-amber-100 dark:border-amber-900/10">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Recommended product:</div>
                    {recommendedProduct && (
                      <>
                        <div className="text-xl font-bold text-amber-900 dark:text-amber-300 truncate">
                          {recommendedProduct.name}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-amber-800 dark:text-amber-400 font-semibold">
                            ${recommendedProduct.price.toFixed(2)}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 text-xs"
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/50 rounded-lg p-4 border border-amber-100 dark:border-amber-900/10">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">
                  10-Year Return on Investment
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Annual Energy Savings:
                    </div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      ${savings.energy.toLocaleString()}/year
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      Annual Maintenance Savings:
                    </div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      ${savings.maintenance.toLocaleString()}/year
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      Replacement Cost Avoidance:
                    </div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      ${savings.replacement.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="h-px bg-amber-100 dark:bg-amber-900/20 my-2"></div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-700 dark:text-gray-300 font-medium">
                      Total 10-Year Savings:
                    </div>
                    <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                      ${savings.totalSavings.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-700 dark:text-gray-300 font-medium">
                      Return on Investment:
                    </div>
                    <div className="font-bold text-amber-600 dark:text-amber-400">
                      {savings.roi}x
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-100/50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-500/10 dark:bg-amber-700/20 p-2 rounded-full">
                    <ArrowRight className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-300">
                      Expert Recommendation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {calculator.coverage === 1 && "Consider upgrading to Premium protection for optimal long-term value."}
                      {calculator.coverage === 1.5 && "Premium protection offers the best balance of performance and cost for most applications."}
                      {calculator.coverage === 2 && "Maximum protection is ideal for your high-stress application environment."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;