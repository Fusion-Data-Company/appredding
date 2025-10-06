import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface PremiumTabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function PremiumTabs({
  defaultValue,
  className,
  children,
  onValueChange,
  ...props
}: PremiumTabsProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className={cn("w-full", className)}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
    </Tabs>
  );
}

interface PremiumTabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function PremiumTabsList({
  className,
  children,
  ...props
}: PremiumTabsListProps) {
  return (
    <div className="relative mb-8">
      {/* Premium ambient glow behind tabs */}
      <div className="absolute -inset-4 rounded-lg opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-orange-500/20 rounded-lg blur-xl"></div>
      </div>
      
      {/* Border glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 via-transparent to-orange-500/30 rounded-lg opacity-70"></div>
      
      <TabsList
        className={cn(
          "relative z-10 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-800/30",
          "p-1 rounded-lg h-auto flex flex-wrap justify-center gap-1 shadow-[0_4px_16px_rgba(0,0,0,0.5)]",
          className
        )}
        {...props}
      >
        {children}
      </TabsList>
    </div>
  );
}

interface PremiumTabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function PremiumTabsTrigger({
  value,
  className,
  children,
  ...props
}: PremiumTabsTriggerProps) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "relative group px-4 py-2 rounded-md data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-800/80 data-[state=active]:to-gray-900/80",
        "text-gray-200 data-[state=active]:text-white font-medium",
        "border border-transparent data-[state=active]:border-gray-700/50",
        "transition-all duration-300 hover:text-white",
        "data-[state=active]:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        className
      )}
      {...props}
    >
      {/* Active tab styling - orange/blue gradient border */}
      <span className="absolute inset-0 rounded-md opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-500/20 via-transparent to-blue-500/20"></span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-orange-500/70 to-blue-500/70 rounded-full blur-[0.5px]"></span>
      </span>
      
      {/* Hover effect for non-active tabs */}
      <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 data-[state=active]:opacity-0 transition-opacity duration-300 pointer-events-none">
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-800/50 to-gray-800/30"></span>
      </span>
      
      {/* Glass highlight effect */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
      
      <span className="relative z-10">{children}</span>
    </TabsTrigger>
  );
}

interface PremiumTabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function PremiumTabsContent({
  value,
  className,
  children,
  ...props
}: PremiumTabsContentProps) {
  return (
    <TabsContent
      value={value}
      className={cn("relative mt-0 outline-none", className)}
      {...props}
    >
      <div className="relative group">
        {/* Ambient glow behind card */}
        <div className="absolute -inset-4 rounded-xl opacity-70">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-600/20 rounded-full filter blur-[80px] opacity-70"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-600/20 rounded-full filter blur-[80px] opacity-70"></div>
        </div>
        
        {/* Content with premium styling */}
        <div className="relative rounded-xl p-6 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-10">
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-orange-500/20 via-blue-500/30 to-orange-500/20 z-0 opacity-80">
            <div className="absolute inset-px rounded-[10px] bg-black"></div>
          </div>
          
          {/* Animated subtle glow in the border */}
          <div className="absolute inset-0 rounded-xl overflow-hidden z-0">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-orange-500/0 via-blue-500/40 to-orange-500/0 blur-sm animate-pulse-slow"></div>
          </div>
          
          {/* Corner accent points */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-green-500/70 rounded-full blur-[1px]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/70 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500/70 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500/70 rounded-full blur-[1px]"></div>
          
          {/* Actual content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        {/* Bottom reflection */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-sm opacity-50"></div>
      </div>
    </TabsContent>
  );
}