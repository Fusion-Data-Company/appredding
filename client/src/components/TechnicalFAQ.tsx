import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Flame, Thermometer, Zap, Shield, Wrench, Beaker, Microscope, BadgeCheck } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
  value: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon, value }) => {
  return (
    <AccordionItem value={value} className="border-orange-500/30">
      <AccordionTrigger className="text-white hover:text-blue-300 text-left">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-orange-900/50 to-blue-900/50 p-2 rounded-full border border-orange-500/30">
            {icon}
          </div>
          <span>{question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 pl-14">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

const TechnicalFAQ: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-orange-900/40 via-primary-900/40 to-blue-900/40 backdrop-blur-md rounded-xl p-6 md:p-8 border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-orange-300 via-white to-blue-300 bg-clip-text text-transparent">
        Technical FAQ
      </h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        <span className="bg-gradient-to-r from-orange-300/90 to-blue-300/90 bg-clip-text text-transparent">Scientifically accurate answers to frequently asked questions about Praetorian's NASA-derived ceramic coating technology</span>
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        <FAQItem
          question="How does the ceramic coating achieve its fire-resistant properties?"
          answer={
            <div className="space-y-3">
              <p>
                The fire resistance is achieved through Praetorian's formulation of ceramic microspheres in a specialized binding matrix. These ceramic microspheres:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create a mineral-based barrier with fire-resistant properties</li>
                <li>Contain trapped air that acts as a thermal insulator</li>
                <li>Form a continuous membrane that helps protect the substrate</li>
                <li>Help dissipate heat rather than allowing direct penetration</li>
              </ul>
              <p>
                In ASTM E108/UL 790 testing, the coating has demonstrated good performance in standard fire resistance tests. This makes it an effective option for improving the fire resistance of various substrates when used as part of a complete fire protection system.
              </p>
            </div>
          }
          icon={<Flame className="h-5 w-5 text-red-400" />}
          value="fire-rating"
        />
        
        <FAQItem
          question="What's the scientific explanation for the coating's thermal insulation properties?"
          answer={
            <div className="space-y-3">
              <p>
                Praetorian's exceptional thermal insulation (0.00543 W/cm²/K conductivity) stems from its specialized ceramic microsphere technology. These hollow ceramic spheres:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create billions of microscopic air pockets that dramatically slow heat transfer</li>
                <li>Reflect solar radiation due to their ceramic composition</li>
                <li>Help emit absorbed heat back to the environment rather than conducting it inward</li>
                <li>Can create a temperature differential of up to 20°F between coated and uncoated surfaces in optimal conditions</li>
              </ul>
              <p>
                The thermal performance is effective in high ambient temperatures. Field testing has shown installations helping maintain lower internal temperatures compared to uncoated surfaces in hot weather, demonstrating the coating's practical effectiveness as a thermal barrier.
              </p>
            </div>
          }
          icon={<Thermometer className="h-5 w-5 text-blue-400" />}
          value="thermal-insulation"
        />
        
        <FAQItem
          question="How does the coating maintain flexibility while providing protection?"
          answer={
            <div className="space-y-3">
              <p>
                The coating's flexibility is achieved through Praetorian's latex acrylic polymer matrix that encapsulates the ceramic microspheres. This engineered matrix:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Creates a polymer structure that allows expansion without breaking</li>
                <li>Maintains flexibility across a range of temperatures</li>
                <li>Allows the coating to expand and contract with the substrate during thermal cycling</li>
                <li>Helps bridge small cracks that would otherwise allow moisture penetration</li>
              </ul>
              <p>
                During standard flexibility testing, the coating demonstrates good elastomeric properties without tearing or losing adhesion. This flexibility is important for maintaining a continuous protective membrane over substrates that expand and contract with temperature changes or structural movement, helping to prevent cracking that would compromise both the waterproofing and protective properties.
              </p>
            </div>
          }
          icon={<Zap className="h-5 w-5 text-orange-400" />}
          value="elastomeric-flexibility"
        />
        
        <FAQItem
          question="What makes the coating effective against corrosion in marine environments?"
          answer={
            <div className="space-y-3">
              <p>
                Praetorian's corrosion resistance in marine environments is achieved through several protection mechanisms:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Forms a protective barrier that helps prevent oxygen and moisture contact with metal surfaces</li>
                <li>Creates a durable membrane that helps seal the substrate</li>
                <li>Performs well in salt spray testing (ASTM B117)</li>
                <li>Works well with specialized primers to form a comprehensive protection system</li>
              </ul>
              <p>
                The coating has Marine-Grade Certification for maritime applications. Field installations on bridges, ships, and coastal structures have shown good performance in saltwater environments when properly applied and maintained.
              </p>
            </div>
          }
          icon={<Shield className="h-5 w-5 text-blue-400" />}
          value="corrosion-resistance"
        />
        
        <FAQItem
          question="What application methods are used for optimal coating performance?"
          answer={
            <div className="space-y-3">
              <p>
                For optimal performance, Praetorian ceramic coating can be applied using several methods, each with specific protocols:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Airless Spray:</strong> Recommended for large areas, using 0.019-0.023" tip size at 2500-3000 PSI with 50% overlap pattern</li>
                <li><strong>Roller Application:</strong> Suitable for medium areas, using 3/8"-1/2" nap roller with specific cross-rolling technique</li>
                <li><strong>Brush Application:</strong> For small areas or touch-ups, using high-quality synthetic brushes with proper loading technique</li>
              </ul>
              <p>
                Surface preparation is critical and requires:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Thoroughly cleaning to remove oil, grease, and contaminants</li>
                <li>For metals: proper profile creation (typically 1.0-2.0 mil) through appropriate blasting or etching</li>
                <li>For porous surfaces: sealing with specialized primers to prevent excessive absorption</li>
                <li>Application at temperatures between 50-90°F with relative humidity below 85%</li>
              </ul>
              <p>
                Multiple coats are typically applied with specific cure times between applications to achieve the full system thickness (typically 8-12 mils DFT for standard applications, and up to 20 mils DFT for extreme environments or specialized applications).
              </p>
            </div>
          }
          icon={<Wrench className="h-5 w-5 text-gray-300" />}
          value="application-methods"
        />
        
        <FAQItem
          question="How does the coating reduce thermal signatures for defense applications?"
          answer={
            <div className="space-y-3">
              <p>
                The coating's ability to reduce thermal signatures for defense applications stems from its multiple thermal management properties:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ceramic microspheres reflect and scatter infrared radiation in the 8-12μm wavelength range used by most thermal imaging systems</li>
                <li>High emissivity (89%) rapidly dissipates heat to match ambient temperatures, reducing thermal contrast</li>
                <li>Low thermal conductivity prevents heat from equipment interiors from transferring to outer surfaces</li>
                <li>Creates a more uniform thermal profile that blends with environmental background temperatures</li>
              </ul>
              <p>
                Testing has shown that properly coated equipment can show meaningful thermal signature reductions when viewed through standard FLIR systems. This reduction in detectability provides advantages for sensitive installations and equipment, enhancing operational security without affecting performance.
              </p>
            </div>
          }
          icon={<Beaker className="h-5 w-5 text-purple-400" />}
          value="thermal-signature"
        />
        
        <FAQItem
          question="What is the composition of the ceramic microspheres in the coating?"
          answer={
            <div className="space-y-3">
              <p>
                The ceramic microspheres in Praetorian's coating have these key characteristics:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hollow spheres in the microscopic size range</li>
                <li>Composed of ceramic materials influenced by <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent font-semibold">NASA thermal protection research</span></li>
                <li>Manufactured through a specialized process to create uniform particles</li>
                <li>Structured with a ceramic shell surrounding a low-density core</li>
              </ul>
              <p>
                These microspheres are distributed throughout the coating, creating an effective thermal barrier. The low-density core provides good insulating properties, while the ceramic shell contributes to heat resistance. The spherical shape helps with distribution within the coating and provides multidirectional thermal performance.
              </p>
            </div>
          }
          icon={<Microscope className="h-5 w-5 text-blue-400" />}
          value="ceramic-composition"
        />
        
        <FAQItem
          question="What testing standards has the coating been evaluated against?"
          answer={
            <div className="space-y-3">
              <p>
                Praetorian's ceramic coating has been tested against several industry standards:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>ASTM E108/UL 790:</strong> Fire resistance testing for roofing materials</li>
                <li><strong>ASTM D6695:</strong> Solar reflectance performance</li>
                <li><strong>ASTM C1371:</strong> Thermal emittance measurement</li>
                <li><strong>ASTM D2370:</strong> Elastomeric properties evaluation</li>
                <li><strong>ASTM B117:</strong> Salt spray resistance testing</li>
                <li><strong>NSF/ANSI 61:</strong> Evaluated for water contact safety</li>
              </ul>
              <p>
                The coating holds Marine-Grade Certification for maritime applications. The product also meets environmental safety requirements with low VOC content, making it suitable for use in occupied spaces and environmentally conscious applications.
              </p>
            </div>
          }
          icon={<BadgeCheck className="h-5 w-5 text-green-400" />}
          value="certification-standards"
        />
      </Accordion>
    </div>
  );
};

export default TechnicalFAQ;