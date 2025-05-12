import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Droplets, Flame, Leaf, Shield, Sun, ThermometerSnowflake, Waves } from "lucide-react";

const ApplicationDiagram = () => {
  // Define the layers of the coating system
  const layers = [
    {
      name: "Substrate",
      thickness: "Varies",
      color: "from-slate-700 to-slate-800",
      description: "Steel, concrete, wood, or composite substrate surface after proper preparation",
      features: []
    },
    {
      name: "Primer Layer",
      thickness: "1.5-2.5 mils",
      color: "from-blue-700 to-blue-800",
      description: "Specialized primer formulated for specific substrate types and conditions",
      features: [
        { icon: <Shield size={14} />, text: "Anti-corrosion inhibitors" },
        { icon: <Check size={14} />, text: "Enhanced adhesion" }
      ]
    },
    {
      name: "Base Coat",
      thickness: "3.5-4.5 mils",
      color: "from-primary-600 to-primary-700",
      description: "Primary ceramic microsphere-filled layer providing core performance",
      features: [
        { icon: <Flame size={14} />, text: "Class A fire rating (0/0)" },
        { icon: <ThermometerSnowflake size={14} />, text: "Thermal barrier" }
      ]
    },
    {
      name: "Top Coat",
      thickness: "3.0-5.0 mils",
      color: "from-orange-500 to-orange-400",
      description: "Enhanced ceramic microsphere layer for durability and performance",
      features: [
        { icon: <Sun size={14} />, text: "89% UV reflection" },
        { icon: <Droplets size={14} />, text: "Water resistance" }
      ]
    }
  ];

  const applicationsData = [
    {
      title: "Bridges & Infrastructure",
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      benefits: [
        "30+ years verified performance",
        "Prevents corrosion in steel girders",
        "156% elastomeric flexibility",
        "Reduces maintenance cycles"
      ]
    },
    {
      title: "Industrial Facilities",
      icon: <Flame className="h-5 w-5 text-orange-400" />,
      benefits: [
        "Class A fire rating (0/0 flame spread)",
        "Reduces heat transfer through walls",
        "Energy savings up to 40%",
        "High electrical resistance"
      ]
    },
    {
      title: "Maritime Applications",
      icon: <Waves className="h-5 w-5 text-blue-400" />,
      benefits: [
        "ABS Certification #MC-1372",
        "10,000+ hours salt spray resistance",
        "Protects against harsh marine environments",
        "NSF/ANSI 61 certified for water contact"
      ]
    },
    {
      title: "Sustainable Buildings",
      icon: <Leaf className="h-5 w-5 text-green-400" />,
      benefits: [
        "89% solar reflection reduces cooling costs",
        "Near-zero VOC water-based formula",
        "Long lifecycle reduces material waste",
        "Improves indoor comfort"
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Coating System Diagram */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
          NASA Ceramic Coating System Diagram
        </h2>
        <div className="rounded-xl overflow-hidden border border-blue-500/50 shadow-xl">
          <div className="bg-primary-900/50 p-5 border-b border-blue-500/40">
            <h3 className="text-xl text-blue-300 font-semibold text-center">Cross-Section Diagram - Full System</h3>
          </div>
          
          <div className="bg-gradient-to-r from-primary-950 to-blue-950 p-6 md:p-10">
            <div className="relative w-full max-w-4xl mx-auto overflow-visible">
              <div className="flex flex-col">
                {layers.map((layer, index) => (
                  <div key={index} className="group relative">
                    <div 
                      className={cn(
                        "w-full bg-gradient-to-r rounded-sm transition-all duration-300 group-hover:scale-[1.01]",
                        layer.color
                      )}
                      style={{ 
                        height: layer.name === "Substrate" ? "80px" : `${parseInt(layer.thickness.split('-')[1]) * 8}px`,
                        transformOrigin: index === 0 ? "bottom" : "center"
                      }}
                    >
                      <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 bg-primary-950/80 backdrop-blur-sm px-4 py-2 rounded-lg border-2 ml-6 w-56 opacity-90 group-hover:opacity-100 transition-all duration-300 z-10",
                        index % 2 === 0 ? "left-[105%]" : "right-[105%]",
                        layer.name === "Substrate" ? "border-slate-500" : 
                        layer.name === "Primer Layer" ? "border-blue-500" :
                        layer.name === "Base Coat" ? "border-primary-500" : "border-orange-500"
                      )}>
                        <div className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-6 h-6 rotate-45 border-2 border-t-0 border-l-0",
                          index % 2 === 0 ? "-left-3" : "-right-3",
                          layer.name === "Substrate" ? "border-slate-500 bg-primary-950/80" : 
                          layer.name === "Primer Layer" ? "border-blue-500 bg-primary-950/80" :
                          layer.name === "Base Coat" ? "border-primary-500 bg-primary-950/80" : "border-orange-500 bg-primary-950/80"
                        )}></div>
                        <h4 className={cn(
                          "font-semibold mb-1",
                          layer.name === "Substrate" ? "text-slate-300" : 
                          layer.name === "Primer Layer" ? "text-blue-300" :
                          layer.name === "Base Coat" ? "text-primary-300" : "text-orange-300"
                        )}>{layer.name}</h4>
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-2">
                          <span>THICKNESS:</span>
                          <span className="text-gray-300 font-mono">{layer.thickness}</span>
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{layer.description}</p>
                        {layer.features.length > 0 && (
                          <div className="flex flex-col gap-1">
                            {layer.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-center text-xs gap-1">
                                <div className={cn(
                                  "flex items-center justify-center p-1 rounded-full",
                                  layer.name === "Primer Layer" ? "bg-blue-900/30 text-blue-400" :
                                  layer.name === "Base Coat" ? "bg-primary-900/30 text-primary-400" : "bg-orange-900/30 text-orange-400"
                                )} style={{
                                  boxShadow: "0 0 5px rgba(59, 130, 246, 0.15) inset",
                                  filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))"
                                }}>
                                  {feature.icon}
                                </div>
                                <span className="text-gray-300">{feature.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Labels on the right side */}
              <div className="absolute -right-4 top-0 h-full flex flex-col justify-between py-10">
                <div className="relative h-[80px] flex items-center">
                  <div className="h-px w-4 bg-white/30 absolute -left-4"></div>
                  <div className="text-xs text-white/70 whitespace-nowrap rotate-90 absolute -right-10">PREPARED SUBSTRATE</div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="h-px w-4 bg-white/30 absolute -left-4"></div>
                  <div className="text-xs text-white/70 whitespace-nowrap rotate-90 absolute -right-12">PRAETORIAN NASA CERAMIC SYSTEM</div>
                </div>
              </div>
              
              {/* Total thickness information */}
              <div className="absolute -left-32 top-0 h-full flex items-center">
                <div className="bg-primary-950/80 border border-blue-500/40 rounded-lg p-3 backdrop-blur-sm shadow-lg shadow-blue-900/20">
                  <h4 className="text-xs font-semibold text-blue-300 mb-1">TOTAL SYSTEM THICKNESS</h4>
                  <div className="text-xl font-bold text-white font-mono mb-1">8.0-12.0 mils</div>
                  <p className="text-[10px] text-gray-400">Varies by application requirements</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-900/50 border-t border-blue-500/30 p-5">
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="inline-flex items-center gap-2 text-xs bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-400"></div>
                <span className="text-blue-300">Top Coat</span>
              </div>
              
              <div className="inline-flex items-center gap-2 text-xs bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700"></div>
                <span className="text-blue-300">Base Coat</span>
              </div>
              
              <div className="inline-flex items-center gap-2 text-xs bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-800"></div>
                <span className="text-blue-300">Primer</span>
              </div>
              
              <div className="inline-flex items-center gap-2 text-xs bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-700 to-slate-800"></div>
                <span className="text-blue-300">Substrate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Applications Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
          Primary Application Areas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applicationsData.map((app, index) => (
            <div key={index} className="bg-primary-900/30 border border-blue-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="px-6 py-5 flex items-center gap-3 border-b border-blue-800/30">
                <div className="bg-blue-900/50 p-2 rounded-full">
                  {app.icon}
                </div>
                <h3 className="font-semibold text-blue-300">{app.title}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {app.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDiagram;