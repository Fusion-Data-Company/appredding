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
    <AccordionItem value={value} className="border-blue-500/30">
      <AccordionTrigger className="text-white hover:text-blue-300 text-left">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900/50 p-2 rounded-full border border-blue-500/30">
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
    <div className="bg-gradient-to-br from-primary-900/40 to-blue-900/40 backdrop-blur-md rounded-xl p-6 md:p-8 border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-orange-300 via-white to-blue-300 bg-clip-text text-transparent">
        Technical FAQ
      </h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        <span className="bg-gradient-to-r from-orange-300/90 to-blue-300/90 bg-clip-text text-transparent">Scientifically accurate answers to frequently asked questions about Praetorian's NASA-derived ceramic coating technology</span>
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        <FAQItem
          question="How does the ceramic coating achieve Class A fire rating with 0/0 flame spread?"
          answer={
            <div className="space-y-3">
              <p>
                The Class A fire rating (0/0 flame spread and smoke development) is achieved through Praetorian's patented formulation of vacuum-sealed ceramic microspheres in a specialized binding matrix. These ceramic microspheres:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create an inorganic barrier that cannot burn or contribute fuel</li>
                <li>Contain trapped air that acts as an exceptional thermal insulator</li>
                <li>Form a continuous membrane that blocks oxygen access to the substrate</li>
                <li>Dissipate heat laterally rather than allowing penetration</li>
              </ul>
              <p>
                In ASTM E84 testing, the coating received the perfect score of 0 for flame spread (no flame propagation) and 0 for smoke development (no measurable smoke produced). This makes it one of the few liquid-applied coatings to achieve this highest possible safety rating.
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
                <li>Reflect 89% of solar radiation due to their high-albedo ceramic composition</li>
                <li>Emit 89% of absorbed heat back to the environment rather than conducting it inward</li>
                <li>Create a temperature differential of up to 40°F between coated and uncoated surfaces</li>
              </ul>
              <p>
                The thermal performance actually improves as the ambient temperature rises. Field testing has documented installations maintaining internal temperatures below 85°F even when exterior temperatures exceeded 110°F without air conditioning, demonstrating the coating's real-world effectiveness as a thermal barrier.
              </p>
            </div>
          }
          icon={<Thermometer className="h-5 w-5 text-blue-400" />}
          value="thermal-insulation"
        />
        
        <FAQItem
          question="How does the coating maintain 156% elastomeric flexibility while providing fire protection?"
          answer={
            <div className="space-y-3">
              <p>
                The 156% elastomeric flexibility is achieved through Praetorian's proprietary latex acrylic polymer matrix that encapsulates the ceramic microspheres. This carefully engineered matrix:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Creates molecular cross-linking that allows substantial expansion without breaking</li>
                <li>Maintains flexibility across extreme temperature ranges (-40°F to 300°F+)</li>
                <li>Allows the coating to expand and contract with the substrate during thermal cycling</li>
                <li>Bridges and seals hairline cracks that would otherwise allow moisture penetration</li>
              </ul>
              <p>
                During ASTM D2370 testing, the coating demonstrated the ability to stretch to 156% of its original dimension without tearing or losing adhesion. This elastomeric property is critical for maintaining a continuous protective membrane over substrates that expand and contract with temperature changes or structural movement, preventing the cracking that would compromise both the waterproofing and fire-resistant properties.
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
                Praetorian's superior corrosion resistance in marine environments is achieved through multiple protection mechanisms:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Forms an impermeable barrier that prevents oxygen and moisture contact with metal surfaces</li>
                <li>Creates a continuous, pinhole-free membrane that seals the substrate completely</li>
                <li>Maintains its integrity even when subjected to 10,000+ hours of salt spray testing (ASTM B117)</li>
                <li>Combines with specialized primers to form a comprehensive system that blocks electrolytic corrosion</li>
              </ul>
              <p>
                The coating has earned ABS Certification #MC-1372 for marine applications after rigorous testing. Field installations on bridges, ships, and coastal structures have demonstrated superior performance compared to traditional marine coatings, with documented cases showing no corrosion or degradation after decades of exposure to harsh saltwater environments.
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
                U.S. military testing confirmed that properly coated equipment showed thermal signature reductions of up to 93% at distances beyond 800 meters when viewed through standard FLIR systems. This significant reduction in detectability provides tactical advantages for sensitive installations and equipment, enhancing operational security without affecting performance.
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
                The proprietary ceramic microspheres in Praetorian's coating are engineered at the microscopic level:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hollow, vacuum-sealed spheres ranging from 10-100 microns in diameter</li>
                <li>Composed primarily of specially formulated ceramic oxides derived from <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent font-semibold">NASA thermal protection research</span></li>
                <li>Manufactured through a proprietary high-temperature process that creates perfectly spherical particles</li>
                <li>Uniquely structured with a hard ceramic shell surrounding a vacuum or gas-filled core</li>
              </ul>
              <p>
                These microspheres are distributed throughout the coating at densities exceeding thousands per square inch, creating a continuous thermal barrier. The vacuum or gas inside each sphere provides exceptional insulating properties, while the ceramic shell offers fire resistance and durability. The spherical shape ensures maximum packing efficiency and omnidirectional heat reflection, regardless of the incident angle of thermal energy.
              </p>
            </div>
          }
          icon={<Microscope className="h-5 w-5 text-blue-400" />}
          value="ceramic-composition"
        />
        
        <FAQItem
          question="What testing standards has the coating been certified against?"
          answer={
            <div className="space-y-3">
              <p>
                Praetorian's ceramic coating has been certified against numerous industry standards:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>ASTM E84:</strong> Class A fire rating with 0/0 flame spread/smoke development</li>
                <li><strong>ASTM D6695:</strong> 89% UV reflection performance</li>
                <li><strong>ASTM C1371:</strong> 89% thermal emittance</li>
                <li><strong>ASTM D2370:</strong> 156% elastomeric flexibility</li>
                <li><strong>ASTM B117:</strong> 10,000+ hours salt spray resistance</li>
                <li><strong>UL 94 V-0 and 5VA:</strong> Self-extinguishing with no burn-through in composite systems</li>
                <li><strong>NSF/ANSI 61:</strong> Safe for potable water contact</li>
                <li><strong>ISO 14116:</strong> Flame spread resistance for textiles</li>
              </ul>
              <p>
                Additionally, the coating holds ABS Certification #MC-1372 for maritime applications and is compliant with multiple federal and military specifications including certain MIL-PRF standards. The coating also complies with environmental regulations, containing near-zero VOCs and no toxic substances, making it safe for use in occupied spaces and environmentally sensitive areas.
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