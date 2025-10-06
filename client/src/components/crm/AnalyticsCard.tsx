import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  changePercent?: number | string;
  changeText?: string;
  icon?: ReactNode;
  glowColor?: 'cyan' | 'orange' | 'amber' | 'green' | 'red' | 'blue' | 'purple' | 'indigo' | 'teal' | 'yellow' | 'emerald' | 'lime';
}

export default function AnalyticsCard({ 
  title, 
  value, 
  changePercent, 
  changeText, 
  icon,
  glowColor = 'cyan' 
}: AnalyticsCardProps) {
  const isPositiveChange = Number(changePercent) > 0;
  
  const glowClasses = {
    cyan: 'hover:card-glow-cyan',
    orange: 'hover:card-glow-orange',
    amber: 'hover:card-glow-amber',
    green: 'hover:card-glow-green',
    red: 'hover:card-glow-red',
    blue: 'hover:card-glow-blue',
    purple: 'hover:card-glow-purple',
    indigo: 'hover:card-glow-indigo',
    teal: 'hover:card-glow-teal',
    yellow: 'hover:card-glow-yellow',
    emerald: 'hover:card-glow-emerald',
    lime: 'hover:card-glow-lime'
  };
  
  const iconClasses = {
    cyan: 'bg-cyan-900/30 text-cyan-400',
    orange: 'bg-green-900/30 text-green-400',
    amber: 'bg-amber-900/30 text-amber-400',
    green: 'bg-green-900/30 text-green-400',
    red: 'bg-red-900/30 text-red-400',
    blue: 'bg-blue-900/30 text-blue-400',
    purple: 'bg-purple-900/30 text-purple-400',
    indigo: 'bg-indigo-900/30 text-indigo-400',
    teal: 'bg-teal-900/30 text-teal-400',
    yellow: 'bg-yellow-900/30 text-yellow-400',
    emerald: 'bg-emerald-900/30 text-emerald-400',
    lime: 'bg-lime-900/30 text-lime-400'
  };

  return (
    <div className={cn('card-base p-6 transition-all duration-300', glowClasses[glowColor])}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {icon && (
          <div className={cn('p-2 rounded-lg', iconClasses[glowColor])}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold">{value}</div>
        
        {(changePercent || changeText) && (
          <div className="flex items-center">
            {changePercent && (
              <div 
                className={cn(
                  "flex items-center mr-2 text-xs font-medium",
                  isPositiveChange ? "text-green-400" : "text-red-400"
                )}
              >
                {isPositiveChange ? (
                  <TrendingUp size={14} className="mr-1" />
                ) : (
                  <TrendingDown size={14} className="mr-1" />
                )}
                {changePercent}%
              </div>
            )}
            
            {changeText && (
              <div className="text-xs text-gray-500">{changeText}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}