import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/ui/gradient-heading";

const TechnicalSpecsTable = () => {
  // Define technical specifications
  const specs = [
    {
      property: "Thermal Conductivity",
      value: "0.00543 W/cm²/K",
      explanation: "Lower thermal conductivity means superior insulating properties, reducing heat transfer through the coating.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "Fire Rating",
      value: "Class A (0/0 scores)",
      explanation: "The highest possible rating in ASTM E84 testing, indicating excellent fire retardant properties.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "UV Reflection",
      value: "89%",
      explanation: "Reflects 89% of ultraviolet radiation, protecting surfaces and preventing degradation from sun exposure.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "Elastomeric Flexibility",
      value: "156%",
      explanation: "Exceptional ability to stretch and recover without cracking, accommodating structural movement.",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      property: "Temperature Differential",
      value: "1,400°F",
      explanation: "The maximum temperature differential the coating can withstand without losing integrity.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      property: "Certifications",
      value: "ABS #MC-1372",
      explanation: "American Bureau of Shipping certification for marine applications.",
      icon: <Award className="h-4 w-4" />
    },
    {
      property: "Patent",
      value: "#10,738,214",
      explanation: "Patented formula exclusive to Praetorian SmartCoat technology.",
      icon: <Award className="h-4 w-4" />
    },
    {
      property: "Chemical Resistance",
      value: "Excellent",
      explanation: "Resistant to a wide range of chemicals including acids, bases, and solvents.",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      property: "Service Life",
      value: "15-20 years",
      explanation: "Expected service life under normal environmental conditions with proper application.",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      property: "VOC Content",
      value: "< 50 g/L",
      explanation: "Extremely low volatile organic compound content, environmentally friendly and safe for use in enclosed spaces.",
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  return (
    <section id="technical-specs" className="py-16 relative z-10">
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex justify-center mb-5">
          <Badge variant="outline" className="px-3 py-1 border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
            Technical Data
          </Badge>
        </div>
        
        <div className="text-center mb-10">
          <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">
            Performance Specifications
          </GradientHeading>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Praetorian's ceramic-based coatings deliver industry-leading performance metrics that exceed traditional protective coatings across all key indicators.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-amber-700/30"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>
                <span className="text-xs text-gray-300 flex items-center justify-center gap-1">
                  <Info className="h-3 w-3" />
                  All specifications certified by independent laboratory testing
                </span>
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-amber-900/70 to-gray-900/90">
                  <TableHead className="font-bold text-amber-300 w-1/4">Property</TableHead>
                  <TableHead className="font-bold text-amber-300 w-1/4">Value</TableHead>
                  <TableHead className="font-bold text-amber-300 w-1/2">Significance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specs.map((spec, index) => (
                  <TableRow 
                    key={index} 
                    className={index % 2 === 0 
                      ? "bg-gray-900/80" 
                      : "bg-gray-800/90"
                    }
                  >
                    <TableCell className="font-medium text-amber-300 flex items-center gap-2">
                      <span className="text-amber-400">
                        {spec.icon}
                      </span>
                      {spec.property}
                    </TableCell>
                    <TableCell className="font-bold text-gray-200">
                      {spec.value}
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      {spec.explanation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-300 backdrop-blur-sm bg-black/30 p-3 rounded-lg inline-block">
            For detailed technical data sheets or certification documentation, please contact our technical support team.
          </p>
        </div>
      </div>
      {/* Dark overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
    </section>
  );
};

export default TechnicalSpecsTable;