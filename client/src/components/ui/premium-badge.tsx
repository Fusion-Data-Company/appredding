import React from 'react';

interface PremiumBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

// Default shield icon with half orange, half blue gradient
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2">
    <defs>
      <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path strokeLinecap="round" strokeLinejoin="round" stroke="url(#shield-gradient)" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export function PremiumBadge({ children, icon, className = '' }: PremiumBadgeProps) {
  return (
    <div className="px-3 py-1.5 rounded-full border border-orange-500/40 bg-gradient-to-r from-orange-950/95 via-gray-950/95 to-blue-950/95 text-orange-300 inline-flex items-center shadow-[0_0_15px_rgba(249,115,22,0.4)] relative z-[100] transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]">
      {icon || <ShieldIcon />}
      <span className={`text-sm font-medium ${className}`}>
        {children}
      </span>
    </div>
  );
}

export default PremiumBadge;