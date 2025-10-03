"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SolarLogo = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
      <defs>
        <linearGradient id="solarBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1D4ED8", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="lightBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#60A5FA", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="20" fill="url(#solarBlueGradient)" />
      <circle cx="50" cy="20" r="3" fill="url(#lightBlue)" />
      <circle cx="73" cy="30" r="3" fill="url(#lightBlue)" />
      <circle cx="80" cy="50" r="3" fill="url(#lightBlue)" />
      <circle cx="73" cy="70" r="3" fill="url(#lightBlue)" />
      <circle cx="50" cy="80" r="3" fill="url(#lightBlue)" />
      <circle cx="27" cy="70" r="3" fill="url(#lightBlue)" />
      <circle cx="20" cy="50" r="3" fill="url(#lightBlue)" />
      <circle cx="27" cy="30" r="3" fill="url(#lightBlue)" />
      <line x1="50" y1="23" x2="50" y2="30" stroke="#60A5FA" strokeWidth="2" />
      <line x1="70" y1="33" x2="63" y2="40" stroke="#60A5FA" strokeWidth="2" />
      <line x1="77" y1="50" x2="70" y2="50" stroke="#60A5FA" strokeWidth="2" />
      <line x1="70" y1="67" x2="63" y2="60" stroke="#60A5FA" strokeWidth="2" />
      <line x1="50" y1="77" x2="50" y2="70" stroke="#60A5FA" strokeWidth="2" />
      <line x1="30" y1="67" x2="37" y2="60" stroke="#60A5FA" strokeWidth="2" />
      <line x1="23" y1="50" x2="30" y2="50" stroke="#60A5FA" strokeWidth="2" />
      <line x1="30" y1="33" x2="37" y2="40" stroke="#60A5FA" strokeWidth="2" />
      <path
        d="M 45 45 L 50 40 L 55 45 L 55 55 L 45 55 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
};

const SolarCompanyHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Residential', href: '/residential' },
    { label: 'Commercial', href: '/commerce' },
    { label: 'Repairs', href: '/repairs' },
    { label: 'Technical Data', href: '/technical-data' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full",
        "bg-background/95 backdrop-blur-xl",
        "border-b border-border/40",
        "shadow-lg shadow-black/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <SolarLogo />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tight">
                Advance Power
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Redding Solar
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  "text-foreground/80 hover:text-foreground",
                  "rounded-md transition-all duration-200",
                  "hover:bg-accent/50"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="default"
              size="lg"
              className={cn(
                "bg-gradient-to-r from-blue-600 to-blue-700",
                "hover:from-blue-700 hover:to-blue-800",
                "text-white font-semibold",
                "shadow-lg shadow-blue-500/20",
                "transition-all duration-300",
                "border border-blue-500/20"
              )}
            >
              <Phone className="mr-2 h-4 w-4" />
              Emergency: (530) 226-0701
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md",
              "text-foreground/80 hover:text-foreground",
              "hover:bg-accent/50 transition-colors"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium",
                    "text-foreground/80 hover:text-foreground",
                    "rounded-md transition-all duration-200",
                    "hover:bg-accent/50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 px-4">
                <Button
                  variant="default"
                  size="lg"
                  className={cn(
                    "w-full",
                    "bg-gradient-to-r from-blue-600 to-blue-700",
                    "hover:from-blue-700 hover:to-blue-800",
                    "text-white font-semibold",
                    "shadow-lg shadow-blue-500/20",
                    "transition-all duration-300",
                    "border border-blue-500/20"
                  )}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency: (530) 226-0701
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SolarCompanyHeader;
