"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ChevronDown,
  Sun,
  Battery,
  Settings,
  Building2,
  Home,
  ShieldCheck,
  Wrench,
  Zap,
  Users,
  Info,
  FolderOpen,
  Code,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SolarCompanyHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        ref => ref && ref.contains(event.target as Node)
      );
      if (!isClickInsideAnyDropdown) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Services dropdown items
  const servicesItems = [
    { label: "Residential Solar", href: "/services/residential-solar", icon: <Home className="w-4 h-4" />, description: "Custom solar solutions for homes" },
    { label: "Commercial Solar", href: "/services/commercial-solar", icon: <Building2 className="w-4 h-4" />, description: "Business solar power systems" },
    { label: "Hybrid Solar", href: "/services/hybrid-solar", icon: <Zap className="w-4 h-4" />, description: "Solar + battery storage solutions" },
    { label: "Battery Storage", href: "/services/battery-storage", icon: <Battery className="w-4 h-4" />, description: "Energy storage systems" },
    { label: "Maintenance", href: "/services/maintenance", icon: <Settings className="w-4 h-4" />, description: "Keep your system running optimally" },
    { label: "Repairs", href: "/services/repairs", icon: <Wrench className="w-4 h-4" />, description: "Expert repair services" },
    { label: "Energy Conservation", href: "/services/energy-conservation", icon: <ShieldCheck className="w-4 h-4" />, description: "Energy efficiency solutions" },
    { label: "Lithium Battery", href: "/services/lithium-battery", icon: <Battery className="w-4 h-4" />, description: "Advanced lithium battery systems" },
  ];

  // Company dropdown items
  const companyItems = [
    { label: "About", href: "/about", icon: <Info className="w-4 h-4" />, description: "Learn about our company" },
    { label: "Portfolio", href: "/portfolio", icon: <FolderOpen className="w-4 h-4" />, description: "View our projects" },
    { label: "Technology", href: "/resources/technology", icon: <Code className="w-4 h-4" />, description: "Our innovative solutions" },
    { label: "Team", href: "/team", icon: <Users className="w-4 h-4" />, description: "Meet our experts" },
    { label: "Contact", href: "/contact", icon: <MessageSquare className="w-4 h-4" />, description: "Get in touch" },
  ];

  const isActive = (path: string) => location === path;

  const DropdownMenu = ({ items, dropdownKey }: { items: any[], dropdownKey: string }) => (
    <div 
      ref={el => dropdownRefs.current[dropdownKey] = el}
      className={cn(
        "absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 py-2",
        "animate-in fade-in slide-in-from-top-1 duration-200"
      )}
      style={{
        position: 'absolute',
        pointerEvents: 'auto',
        zIndex: 10001
      }}
    >
      {items.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className="flex items-center px-4 py-3 hover:bg-orange-50 transition-colors cursor-pointer block"
          onClick={() => {
            setActiveDropdown(null);
            setIsMobileMenuOpen(false);
          }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg flex items-center justify-center text-orange-600 mr-3 flex-shrink-0">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{item.label}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-100" 
          : "bg-gradient-to-b from-white/95 to-white/85 backdrop-blur-md border-b border-gray-100/50"
      )}
      style={{ zIndex: 9999 }}
    >
      {/* Top scrolling banner */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 text-white py-2.5 overflow-hidden relative" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set of items */}
          <div className="flex items-center space-x-8 px-8 text-sm font-medium tracking-wide">
            <a href="tel:5302260701" className="flex items-center hover:text-orange-100 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">(530) 226-0701</span>
            </a>
            <span className="text-white/40">•</span>
            <a href="mailto:info@apredding.net" className="flex items-center hover:text-orange-100 transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@apredding.net</span>
            </a>
            <span className="text-white/40">•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>843 N. Market St., Redding, CA</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              Licensed & Insured
            </span>
            <span className="text-white/40">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              25+ Years Experience
            </span>
            <span className="text-white/40">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              Solar Excellence Since 2004
            </span>
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-8 px-8 text-sm font-medium tracking-wide">
            <a href="tel:5302260701" className="flex items-center hover:text-orange-100 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">(530) 226-0701</span>
            </a>
            <span className="text-white/40">•</span>
            <a href="mailto:info@apredding.net" className="flex items-center hover:text-orange-100 transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@apredding.net</span>
            </a>
            <span className="text-white/40">•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>843 N. Market St., Redding, CA</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              Licensed & Insured
            </span>
            <span className="text-white/40">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              25+ Years Experience
            </span>
            <span className="text-white/40">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              Solar Excellence Since 2004
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation - Full width with centered content */}
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/advance-power-logo.jpg" 
              alt="Advance Power Redding" 
              className="h-12 w-auto object-contain rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Fallback to a simple text logo if image fails
                target.style.display = 'none';
                const textLogo = document.createElement('div');
                textLogo.className = 'flex flex-col';
                textLogo.innerHTML = `
                  <span class="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                    Advance Power
                  </span>
                  <span class="text-xs text-gray-600 font-medium">
                    Redding Solar Solutions
                  </span>
                `;
                target.parentElement?.appendChild(textLogo);
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className={cn(
              "px-4 py-2 font-medium rounded-lg transition-all duration-200",
              isActive("/") 
                ? "text-orange-600 bg-orange-50" 
                : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
            )}>
              Home
            </Link>

            {/* Products Link */}
            <Link href="/shop/products" className={cn(
              "px-4 py-2 font-medium rounded-lg transition-all duration-200",
              isActive("/shop/products") 
                ? "text-orange-600 bg-orange-50" 
                : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
            )}>
              Products
            </Link>

            {/* Comparison Link */}
            <Link href="/comparison" className={cn(
              "px-4 py-2 font-medium rounded-lg transition-all duration-200",
              isActive("/comparison") 
                ? "text-orange-600 bg-orange-50" 
                : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
            )}>
              Comparison
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative" 
              ref={el => dropdownRefs.current['services'] = el}
              style={{ position: 'relative', zIndex: 10000 }}
            >
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className={cn(
                  "flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-200 relative z-10",
                  activeDropdown === 'services' 
                    ? "text-orange-600 bg-orange-50" 
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                )}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={cn(
                  "ml-1 w-4 h-4 transition-transform",
                  activeDropdown === 'services' ? "rotate-180" : ""
                )} />
              </button>
              {activeDropdown === 'services' && <DropdownMenu items={servicesItems} dropdownKey="services" />}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative" 
              ref={el => dropdownRefs.current['company'] = el}
              style={{ position: 'relative', zIndex: 10000 }}
            >
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                className={cn(
                  "flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-200 relative z-10",
                  activeDropdown === 'company' 
                    ? "text-orange-600 bg-orange-50" 
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                )}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                Company
                <ChevronDown className={cn(
                  "ml-1 w-4 h-4 transition-transform",
                  activeDropdown === 'company' ? "rotate-180" : ""
                )} />
              </button>
              {activeDropdown === 'company' && <DropdownMenu items={companyItems} dropdownKey="company" />}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <Button
                size="lg"
                className={cn(
                  "bg-gradient-to-r from-orange-500 to-blue-600",
                  "hover:from-orange-600 hover:to-blue-700",
                  "text-white font-semibold",
                  "shadow-lg shadow-orange-500/20",
                  "transition-all duration-300"
                )}
              >
                Get Free Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg",
              "text-gray-700 hover:text-orange-600",
              "hover:bg-orange-50 transition-colors"
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/"
                className="px-4 py-3 font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Products Link */}
              <Link 
                href="/shop/products"
                className="px-4 py-3 font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>

              {/* Mobile Comparison Link */}
              <Link 
                href="/comparison"
                className="px-4 py-3 font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comparison
              </Link>

              {/* Mobile Services */}
              <div className="px-4 py-2">
                <div className="font-semibold text-gray-900 mb-2">Services</div>
                {servicesItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="flex items-center py-2 text-gray-600 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Company */}
              <div className="px-4 py-2">
                <div className="font-semibold text-gray-900 mb-2">Company</div>
                {companyItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="flex items-center py-2 text-gray-600 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 px-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full",
                      "bg-gradient-to-r from-orange-500 to-blue-600",
                      "hover:from-orange-600 hover:to-blue-700",
                      "text-white font-semibold",
                      "shadow-lg shadow-orange-500/20",
                      "transition-all duration-300"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Free Quote
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SolarCompanyHeader;
