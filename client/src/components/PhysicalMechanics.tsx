import React from "react";
import { Aperture, Boxes, Activity, Brush, Paintbrush, Droplets, Magnet, Sun, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MechanicsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  className?: string;
}

const MechanicsCard: React.FC<MechanicsCardProps> = ({ title, description, icon, iconBg, className }) => {
  return (
    <div className={cn(
      "bg-primary-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 hover:bg-primary-900/30 transition-colors duration-300",
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn("p-3 rounded-full", iconBg)}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

interface ApplicationMethodCardProps {
  method: string;
  description: string;
  icon: React.ReactNode;
}

const ApplicationMethodCard: React.FC<ApplicationMethodCardProps> = ({ method, description, icon }) => {
  return (
    <div className="bg-primary-900/30 backdrop-blur-sm rounded-xl border border-blue-500/20 p-5 flex items-start gap-4">
      <div className="bg-blue-900/50 p-2 rounded-full border border-blue-500/30 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-blue-300 mb-2">{method}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const PhysicalMechanics: React.FC = () => {
  const physicalMechanics = [
    {
      title: "Ceramic Technology",
      description: "NASA-derived hollow vacuum microspheres create billions of microscopic air pockets that dramatically slow heat transfer and provide superior thermal insulation.",
      icon: <Boxes className="h-6 w-6 text-orange-300" />,
      iconBg: "bg-gradient-to-r from-orange-900/50 to-blue-900/50 border border-orange-500/30"
    },
    {
      title: "Thermal Physics",
      description: "Reflects radiation (89% solar reflection), stops conduction (0.00543 W/cm²/K conductivity), and breaks convection pathways for complete thermal protection.",
      icon: <Activity className="h-6 w-6 text-orange-300" />,
      iconBg: "bg-orange-900/50 border border-orange-500/30"
    },
    {
      title: "Layer Membrane",
      description: "Elastomeric waterproof barrier with 156% flexibility allows expansion and contraction with the substrate while maintaining a continuous protective seal.",
      icon: <Droplets className="h-6 w-6 text-blue-300" />,
      iconBg: "bg-blue-900/50 border border-blue-500/30"
    },
    {
      title: "Reflective Components",
      description: "High-density titanium dioxide and specialized reflective elements provide 89-95% solar bounce, verified by the Cool Roof Rating Council.",
      icon: <Sun className="h-6 w-6 text-orange-300" />,
      iconBg: "bg-orange-900/50 border border-orange-500/30"
    },
    {
      title: "Dielectric Properties",
      description: "Non-conductive ceramic membrane provides electrical insulation and thermal/electromagnetic signature reduction for military and sensitive applications.",
      icon: <Magnet className="h-6 w-6 text-blue-300" />,
      iconBg: "bg-blue-900/50 border border-blue-500/30"
    },
    {
      title: "Smart Functionality",
      description: "Temperature-responsive performance increases insulation effectiveness as ambient temperatures rise, creating an adaptive thermal barrier.",
      icon: <Cpu className="h-6 w-6 text-orange-300" />,
      iconBg: "bg-orange-900/50 border border-orange-500/30"
    }
  ];
  
  const applicationMethods = [
    {
      method: "Spraying",
      description: "Airless sprayer with 0.019-0.023\" tip at 2500-3000 PSI with 50% overlap pattern. Ideal for large surface areas and achieving uniform thickness.",
      icon: <Paintbrush className="h-5 w-5 text-blue-400" />
    },
    {
      method: "Rolling",
      description: "3/8\"-1/2\" nap roller with specific cross-rolling technique. Suitable for medium areas with moderate texture requirements.",
      icon: <Aperture className="h-5 w-5 text-blue-400" />
    },
    {
      method: "Brushing",
      description: "High-quality synthetic brushes with proper loading technique. Best for small areas, touch-ups, or detail work in hard-to-reach spaces.",
      icon: <Brush className="h-5 w-5 text-blue-400" />
    }
  ];
  
  const compatibilities = [
    "Compatible with primers for various substrates (metal, concrete, wood)",
    "Can be top-coated with latex paints for custom colors",
    "Integrates with fabric wraps for specialized applications",
    "Layerable into composite systems for enhanced performance",
    "Compatible with most construction materials (ASTM tested)"
  ];
  
  return (
    <div className="space-y-16">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
          Physical Mechanics
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          The science behind Praetorian Smart-Coat's exceptional performance
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicalMechanics.map((mechanic, index) => (
            <MechanicsCard
              key={index}
              title={mechanic.title}
              description={mechanic.description}
              icon={mechanic.icon}
              iconBg={mechanic.iconBg}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-primary-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
          Application Methods
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Professional application techniques for optimal performance
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applicationMethods.map((method, index) => (
            <ApplicationMethodCard
              key={index}
              method={method.method}
              description={method.description}
              icon={method.icon}
            />
          ))}
        </div>
        
        <div className="mt-8 bg-primary-900/30 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
          <h3 className="text-xl font-semibold text-blue-300 mb-4">System Compatibilities</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {compatibilities.map((compatibility, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-white">{compatibility}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-6 border-t border-blue-900/30 text-center">
            <p className="text-gray-400">
              For complete specification sheets and application guides, contact our technical support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalMechanics;