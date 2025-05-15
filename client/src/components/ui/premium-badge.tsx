import React from 'react';

interface PremiumBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function PremiumBadge({ children, icon, className = '' }: PremiumBadgeProps) {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-700 to-blue-700 border border-orange-500/40 shadow-[0_0_25px_rgba(249,115,22,0.5)] relative transition-all duration-500 hover:scale-105 z-[100]">
      {icon && (
        <div className="mr-2 relative">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[6px] animate-pulse-slow"></div>
          {icon}
        </div>
      )}
      <span className={`text-white text-sm font-medium tracking-wide ${className}`}>
        {children}
      </span>
    </div>
  );
}

export default PremiumBadge;