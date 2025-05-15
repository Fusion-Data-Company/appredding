import React from 'react';
import { cn } from '@/lib/utils';

interface RomanHeaderProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'gold' | 'platinum' | 'imperial';
  serif?: boolean;
  uppercase?: boolean;
  ornate?: boolean;
}

export const RomanHeader = ({
  children,
  className,
  level = 2,
  variant = 'imperial',
  serif = true,
  uppercase = true,
  ornate = false,
}: RomanHeaderProps) => {
  const variantClasses = {
    gold: 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]',
    platinum: 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]',
    imperial: 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]',
  }
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={cn(
      "font-serif tracking-wide relative",
      serif && "font-serif",
      uppercase && "uppercase",
      variantClasses[variant],
      ornate && "px-8 before:content-['•'] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:text-amber-600 after:content-['•'] after:absolute after:right-1 after:top-1/2 after:-translate-y-1/2 after:text-amber-600",
      className
    )}>
      {children}
    </Tag>
  );
};

export const RomanDivider = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center w-full py-2 group", className)}>
      <div className="relative">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-600/70 to-transparent"></div>
        <div className="absolute inset-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent blur-sm"></div>
      </div>
      <div className="relative mx-3 text-amber-600">
        <span className="relative z-10 inline-block group-hover:rotate-45 transition-transform duration-700">◆</span>
        <span className="absolute left-0 top-0 text-amber-400/40 blur-sm group-hover:text-amber-400/30 transition-colors duration-700">◆</span>
      </div>
      <div className="relative">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-600/70 to-transparent"></div>
        <div className="absolute inset-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent blur-sm"></div>
      </div>
    </div>
  );
};

export const RomanCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(
      "relative border border-amber-800/30 rounded-sm bg-gradient-to-b from-amber-50/5 to-amber-100/10 p-6 backdrop-blur-sm",
      "before:absolute before:inset-0 before:border-2 before:border-amber-600/20 before:rounded-sm before:m-1 before:pointer-events-none",
      className
    )}>
      {children}
    </div>
  );
};