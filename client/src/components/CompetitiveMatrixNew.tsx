import React from "react";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle2, Shield, Thermometer, Flame, Volume2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Define types for our data structure
interface CellData {
  value: string;
  highlight?: boolean;
  description?: string;
}

interface MatrixItem {
  feature: string;
  icon: React.ReactNode;
  praetorian: CellData;
  competitor_a: CellData;
  competitor_b: CellData;
  traditional: CellData;
  standard: CellData;
}

interface CategoryData {
  category: string;
  items: MatrixItem[];
}

interface ColumnDef {
  id: string;
  name: string;
  description?: string;
  className?: string;
}

export const CompetitiveMatrix: React.FC = () => {
  // Defining the column headers and data structure
  const columns: ColumnDef[] = [
    { id: "feature", name: "Feature", className: "text-left" },
    { 
      id: "praetorian", 
      name: "Praetorian Smart-Coat", 
      description: "NASA-derived ceramic coating",
      className: "bg-gradient-to-r from-orange-900/30 to-blue-900/30 border-b-2 border-orange-400" 
    },
    { 
      id: "competitor_a", 
      name: "Competitor A", 
      description: "Ceramic-Based",
      className: "bg-gradient-to-r from-gray-900/20 to-neutral-900/20" 
    },
    { 
      id: "competitor_b", 
      name: "Competitor B", 
      description: "Elastomeric",
      className: "bg-gradient-to-r from-gray-900/20 to-neutral-900/20" 
    },
    { 
      id: "traditional", 
      name: "Traditional Insulation", 
      description: "Conventional",
      className: "bg-gradient-to-r from-gray-900/20 to-neutral-900/20" 
    },
    { 
      id: "standard", 
      name: "Standard Paint", 
      description: "Basic",
      className: "bg-gradient-to-r from-gray-900/20 to-neutral-900/20" 
    },
  ];

  // Define the actual data based on the comparison matrix
  const data: CategoryData[] = [
    {
      category: "Performance Metrics",
      items: [
        {
          feature: "Solar Reflection",
          icon: <Thermometer className="h-4 w-4 text-blue-400 mr-1" />,
          praetorian: { value: "89%", highlight: true },
          competitor_a: { value: "80-85%" },
          competitor_b: { value: "75-80%" },
          traditional: { value: "N/A" },
          standard: { value: "30-80%" },
        },
        {
          feature: "Thermal Emittance",
          icon: <Zap className="h-4 w-4 text-orange-400 mr-1" />,
          praetorian: { value: "89%", highlight: true },
          competitor_a: { value: "75-80%" },
          competitor_b: { value: "70-75%" },
          traditional: { value: "N/A" },
          standard: { value: "60-80%" },
        },
        {
          feature: "Fire Rating",
          icon: <Flame className="h-4 w-4 text-red-400 mr-1" />,
          praetorian: { value: "Class A (0/0)", highlight: true, description: "Perfect score - zero flame spread" },
          competitor_a: { value: "Class B or lower", description: "Moderate flame resistance" },
          competitor_b: { value: "Class C or lower", description: "Minimal flame resistance" },
          traditional: { value: "Varies", description: "Often combustible" },
          standard: { value: "Not rated", description: "No fire protection" },
        },
      ]
    },
    {
      category: "Durability Factors",
      items: [
        {
          feature: "Elastomeric Flexibility",
          icon: <CheckCircle2 className="h-4 w-4 text-green-400 mr-1" />,
          praetorian: { value: "156%", highlight: true, description: "Superior crack bridging" },
          competitor_a: { value: "100-130%" },
          competitor_b: { value: "110-140%" },
          traditional: { value: "0%" },
          standard: { value: "5-15%" },
        },
        {
          feature: "Expected Lifespan",
          icon: <CheckCircle2 className="h-4 w-4 text-green-400 mr-1" />,
          praetorian: { value: "30+ years", highlight: true, description: "Verified performance" },
          competitor_a: { value: "10-15 years" },
          competitor_b: { value: "7-12 years" },
          traditional: { value: "15-25 years" },
          standard: { value: "3-7 years" },
        },
      ]
    }
  ];

  return (
    <div className="relative group transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 hover:z-10">
      {/* Multiple layered background effects - Mixed theme */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10">
        {/* Subtle dots and squares pattern background in mixed colors */}
        <div className="absolute inset-0 opacity-25 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        </div>
        
        {/* Ambient glow effects - positioned away from text */}
        <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
        <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        
        {/* Additional corner accent lines - with mixed theme */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
        </div>
        
        {/* Premium card header styling matching NASA card */}
        <div className="relative h-20 flex items-center justify-center mb-2">
          {/* Animated glow behind heading with mixed colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow-delayed"></div>
          
          {/* Background blur text */}
          <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 opacity-50">
            Competitive Matrix
          </div>
          
          {/* Main text with premium gradient - matching mixed style */}
          <span className="shimmer-mixed-text relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] 
            [text-shadow:0_1px_1px_rgba(0,0,0,0.15)] font-bold relative z-20 text-3xl">
            Competitive Comparison Matrix
          </span>
          
          {/* Multiple text shadows for depth - reduced blur effects */}
          <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
            Competitive Matrix
          </div>
          
          {/* Animated underline with mixed-themed gradient */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-48 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
        </div>
        
        {/* Content with z-index to appear above effects */}
        <div className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              {/* Table Header */}
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th 
                      key={column.id} 
                      className={cn(
                        "px-4 py-3 font-semibold text-sm",
                        column.id === "praetorian" ? "bg-primary-800/30 text-amber-300" : "text-gray-300",
                        column.className
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <span>{column.name}</span>
                        {column.description && (
                          <span className="text-xs opacity-70 mt-1 font-normal">{column.description}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {data.map((categoryData, categoryIndex) => (
                  <React.Fragment key={`category-${categoryIndex}`}>
                    {/* Category Row */}
                    <tr className="bg-primary-950/70">
                      <td 
                        colSpan={columns.length} 
                        className="px-4 py-2 text-sm font-bold text-white border-t border-orange-500/30"
                      >
                        {categoryData.category}
                      </td>
                    </tr>
                    
                    {/* Items in this category */}
                    {categoryData.items.map((item, itemIndex) => (
                      <tr 
                        key={`item-${categoryIndex}-${itemIndex}`}
                        className={itemIndex % 2 === 0 ? "bg-primary-900/20" : "bg-primary-900/10"}
                      >
                        {/* Feature name */}
                        <td className="px-4 py-3 text-sm text-left text-white border-t border-orange-800/30">
                          <div className="flex items-center">
                            {item.icon}
                            <span>{item.feature}</span>
                          </div>
                        </td>
                        
                        {/* Each product column */}
                        {columns.slice(1).map((column) => {
                          const cellKey = column.id as keyof MatrixItem;
                          const cellData = item[cellKey] as CellData;
                          const isHighlighted = column.id === "praetorian" && cellData.highlight;
                          
                          return (
                            <td 
                              key={`cell-${column.id}-${categoryIndex}-${itemIndex}`}
                              className={cn(
                                "px-4 py-3 text-sm text-center border-t border-orange-800/30",
                                column.id === "praetorian" ? "bg-primary-900/40" : "",
                                isHighlighted ? "relative" : ""
                              )}
                            >
                              <div className="flex flex-col items-center justify-center">
                                <span className={cn(
                                  "font-medium",
                                  isHighlighted ? "text-amber-300" : "text-gray-200"
                                )}>
                                  {cellData.value}
                                </span>
                                
                                {cellData.description && (
                                  <span className="text-xs text-gray-400 mt-1">{cellData.description}</span>
                                )}
                                
                                {isHighlighted && (
                                  <Badge 
                                    className="absolute top-1 right-1 bg-gradient-to-r from-amber-600 to-orange-600 text-[9px] py-0 px-2 font-bold"
                                  >
                                    BEST
                                  </Badge>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-primary-950/80 border-t border-orange-800/20 flex items-center justify-center text-xs text-gray-300">
            {/* Icon with mixed glow effect */}
            <div className="relative mr-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-blue-500/30 blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Info className="h-4 w-4 text-orange-400 relative z-20 group-hover:text-amber-300 transition-colors duration-300" />
            </div>
            <span className="font-medium">All data independently verified through laboratory testing. Patent #10,738,214</span>
          </div>
        </div>
          
        {/* Decorative horizontal line - matching NASA card */}
        <div className="absolute left-1/2 bottom-3 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-60 group-hover:w-48 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
        
        {/* Bottom reflection with dual-color gradient */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
        
        {/* Shimmer animation overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-30 -translate-x-full group-hover:translate-x-full transition-all duration-1500 ease-in-out transform rounded-xl overflow-hidden"></div>
      </div>
    </div>
  );
};

export default CompetitiveMatrix;