import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, HelpCircle, Sparkles, Shield } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../../assets_dir/imageExports";

const ProductComparison = () => {
  const comparisons = [
    {
      feature: "Thermal Protection",
      praetorian: true,
      praetorianDetails: "0.00543 W/cm²/K thermal conductivity",
      competitors: "limited",
      competitorDetails: "0.231 W/cm²/K average thermal conductivity"
    },
    {
      feature: "Fire Resistance",
      praetorian: true,
      praetorianDetails: "Class A fire rating (0/0 scores)",
      competitors: "varies",
      competitorDetails: "Typically Class B or C fire rating"
    },
    {
      feature: "UV Reflection",
      praetorian: true,
      praetorianDetails: "89% UV reflection",
      competitors: "partial",
      competitorDetails: "40-60% UV reflection"
    },
    {
      feature: "Elastomeric Flexibility",
      praetorian: true,
      praetorianDetails: "156% elasticity",
      competitors: "limited",
      competitorDetails: "30-70% elasticity on average"
    },
    {
      feature: "Waterproofing",
      praetorian: true,
      praetorianDetails: "Complete waterproof seal",
      competitors: "partial",
      competitorDetails: "Water resistant but not fully waterproof"
    },
    {
      feature: "Mold & Mildew Resistance",
      praetorian: true,
      praetorianDetails: "Prevents all mold & mildew growth",
      competitors: "varies",
      competitorDetails: "Limited protection in many products"
    },
    {
      feature: "Marine Grade Certification",
      praetorian: true,
      praetorianDetails: "ABS Certification #MC-1372",
      competitors: false,
      competitorDetails: "Most lack marine certifications"
    },
    {
      feature: "Application Temperature Range",
      praetorian: true,
      praetorianDetails: "40°F to 120°F application range",
      competitors: "limited",
      competitorDetails: "50°F to 90°F typical range"
    },
    {
      feature: "VOC Compliance",
      praetorian: true,
      praetorianDetails: "< 50 g/L, exceeds all regulations",
      competitors: "varies",
      competitorDetails: "Many products at 100-250 g/L"
    },
    {
      feature: "NASA-derived Technology",
      praetorian: true,
      praetorianDetails: "Ceramic-based formula from space program research",
      competitors: false,
      competitorDetails: "Conventional chemical formulations"
    }
  ];

  // Helper function to render status indicators
  const renderStatus = (status: boolean | string) => {
    if (status === true) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (status === false) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    } else if (status === "limited" || status === "partial") {
      return <HelpCircle className="h-6 w-6 text-amber-500" />;
    } else if (status === "varies") {
      return <HelpCircle className="h-6 w-6 text-blue-500" />;
    }
    return null;
  };

  return (
    <section 
      className="py-16 relative z-10"
      style={{ 
        backgroundImage: `url(${PRAETORIAN_HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-10">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_30px_rgba(255,69,0,0.25)] py-8 px-10 mx-auto max-w-4xl mb-8 inline-block">
            <Badge variant="outline" className="mb-2 px-3 py-1 border-amber-800 dark:border-amber-900 bg-amber-900/50 dark:bg-amber-950/70 text-amber-300">
              <Shield className="h-4 w-4 mr-1" /> Competitive Comparison
            </Badge>
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">
              How Praetorian Outperforms the Competition
            </GradientHeading>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See why Praetorian's revolutionary ceramic technology delivers superior performance across all key metrics compared to traditional protective coatings.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
        >
          {/* Headers */}
          <div className="grid grid-cols-12 gap-4 mb-4 px-4 bg-black/90 backdrop-blur-lg rounded-lg p-5 premium-gradient-border shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            <div className="col-span-4 font-bold text-amber-300 text-lg">Feature</div>
            <div className="col-span-4 font-bold text-center text-amber-300 text-lg">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Praetorian
              </div>
            </div>
            <div className="col-span-4 font-bold text-center text-gray-300 text-lg">
              Competitors
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <Card 
                key={index} 
                className={`bg-black/90 backdrop-blur-sm shadow-xl border-0 transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-[0_0_20px_rgba(255,69,0,0.3)]`}
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(20,20,20,0.9), rgba(0,0,0,0.9))',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 0 1px rgba(255,69,0,0.3)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div className="absolute inset-0" style={{
                  content: '""',
                  position: 'absolute',
                  borderRadius: '8px',
                  padding: '1px',
                  background: 'linear-gradient(90deg, rgba(255,69,0,0.5) 0%, rgba(255,140,0,0.3) 50%, rgba(255,69,0,0.5) 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none'
                }}></div>
                <CardContent className="p-5 z-10 relative">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 md:col-span-4 font-medium text-gray-200 text-base">
                      {item.feature}
                    </div>
                    
                    <div className="col-span-6 md:col-span-4">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">{renderStatus(item.praetorian)}</div>
                        <p className="text-sm text-center text-amber-400/90 font-medium">{item.praetorianDetails}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-6 md:col-span-4">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">{renderStatus(item.competitors)}</div>
                        <p className="text-sm text-center text-gray-400">{item.competitorDetails}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-300 backdrop-blur-sm bg-black/50 p-4 rounded-lg inline-block premium-gradient-border shadow-[0_0_15px_rgba(255,69,0,0.3)]">
            Data based on independent laboratory testing comparing Praetorian SmartCoat to leading industry competitors.
            Product performance may vary based on application methods and environmental conditions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;