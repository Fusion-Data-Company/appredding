"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ChevronDown,
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

  // Handle scroll effect with Apple-like threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
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
    { label: "Residential Solar", href: "/services/residential-solar", icon: <Home className="w-4 h-4" />, description: "Custom solar solutions for homes", iconColor: "text-orange-400", bgColor: "rgb(249, 115, 22)" },
    { label: "Commercial Solar", href: "/services/commercial-solar", icon: <Building2 className="w-4 h-4" />, description: "Business solar power systems", iconColor: "text-blue-400", bgColor: "rgb(59, 130, 246)" },
    { label: "Hybrid Solar", href: "/services/hybrid-solar", icon: <Zap className="w-4 h-4" />, description: "Solar + battery storage solutions", iconColor: "text-yellow-400", bgColor: "rgb(250, 204, 21)" },
    { label: "Battery Storage", href: "/services/battery-storage", icon: <Battery className="w-4 h-4" />, description: "Energy storage systems", iconColor: "text-green-400", bgColor: "rgb(34, 197, 94)" },
    { label: "Maintenance", href: "/services/maintenance", icon: <Settings className="w-4 h-4" />, description: "Keep your system running optimally", iconColor: "text-purple-400", bgColor: "rgb(168, 85, 247)" },
    { label: "Repairs", href: "/services/repairs", icon: <Wrench className="w-4 h-4" />, description: "Expert repair services", iconColor: "text-red-400", bgColor: "rgb(248, 113, 113)" },
    { label: "Energy Conservation", href: "/services/energy-conservation", icon: <ShieldCheck className="w-4 h-4" />, description: "Energy efficiency solutions", iconColor: "text-teal-400", bgColor: "rgb(45, 212, 191)" },
    { label: "Lithium Battery", href: "/services/lithium-battery", icon: <Battery className="w-4 h-4" />, description: "Advanced lithium battery systems", iconColor: "text-cyan-400", bgColor: "rgb(34, 211, 238)" },
  ];

  // Company dropdown items
  const companyItems = [
    { label: "About", href: "/about", icon: <Info className="w-4 h-4" />, description: "Learn about our company", iconColor: "text-indigo-400", bgColor: "rgb(129, 140, 248)" },
    { label: "Portfolio", href: "/portfolio", icon: <FolderOpen className="w-4 h-4" />, description: "View our projects", iconColor: "text-pink-400", bgColor: "rgb(244, 114, 182)" },
    { label: "Technology", href: "/resources/technology", icon: <Code className="w-4 h-4" />, description: "Our innovative solutions", iconColor: "text-violet-400", bgColor: "rgb(167, 139, 250)" },
    { label: "Team", href: "/team", icon: <Users className="w-4 h-4" />, description: "Meet our experts", iconColor: "text-emerald-400", bgColor: "rgb(52, 211, 153)" },
    { label: "Contact", href: "/contact", icon: <MessageSquare className="w-4 h-4" />, description: "Get in touch", iconColor: "text-amber-400", bgColor: "rgb(251, 191, 36)" },
  ];

  const isActive = (path: string) => location === path;

  const DropdownMenu = ({ items, dropdownKey }: { items: any[], dropdownKey: string }) => (
    <div 
      ref={el => dropdownRefs.current[dropdownKey] = el}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl py-3 overflow-hidden"
      style={{
        position: 'absolute',
        pointerEvents: 'auto',
        zIndex: 10001,
        background: 'rgb(15, 23, 42)',
        border: '2px solid rgb(71, 85, 105)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)'
      }}
    >
      {items.map((item, index) => (
        <Link 
          key={item.href} 
          href={item.href}
          className={cn(
            "flex items-start px-4 py-3 mx-2 rounded-xl transition-all duration-200 cursor-pointer group relative",
            index !== items.length - 1 && "mb-1"
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(75, 85, 99, 0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${item.bgColor}40 0%, rgba(59,130,246,0.2) 100%)`;
            e.currentTarget.style.transform = 'translateX(4px)';
            e.currentTarget.style.borderColor = `${item.bgColor}80`;
            e.currentTarget.style.boxShadow = `0 0 20px ${item.bgColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.3)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%)';
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.4)';
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.2)';
          }}
          onClick={() => {
            setActiveDropdown(null);
            setIsMobileMenuOpen(false);
          }}
        >
          <div 
            className={cn("w-9 h-9 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200 relative", item.iconColor)}
            style={{
              background: `linear-gradient(135deg, rgba(${item.bgColor.match(/\d+/g)?.join(', ')}, 0.25) 0%, rgba(${item.bgColor.match(/\d+/g)?.join(', ')}, 0.15) 100%)`,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: `1.5px solid ${item.bgColor}`,
              boxShadow: `0 0 20px ${item.bgColor}60, 0 0 40px ${item.bgColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.3)`
            }}
          >
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[16px] text-white leading-tight" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>{item.label}</div>
            <div className="text-[13px] text-gray-400 mt-1 leading-tight">{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full transition-all duration-700 ease-out relative",
        isScrolled 
          ? "shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]" 
          : "shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
      )}
      style={{ 
        zIndex: 9999,
        background: isScrolled 
          ? 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.88) 50%, rgba(241,245,249,0.90) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(252,252,253,0.94) 50%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7)'
          : '0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
      }}
    >
      {/* Noise texture overlay for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Top scrolling banner with premium gradient and texture */}
      <div 
        className="text-white py-2 overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #fb923c 25%, #ea580c 50%, #f59e0b 75%, #3b82f6 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
        }}
      >
        {/* Subtle texture overlay on banner */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
          }}
        />
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set of items */}
          <div className="flex items-center space-x-8 px-8 text-[13px] font-medium tracking-wide">
            <a href="tel:5302260701" className="flex items-center hover:text-white/90 transition-colors duration-200">
              <Phone className="w-3.5 h-3.5 mr-2" />
              <span className="font-semibold">(530) 226-0701</span>
            </a>
            <span className="text-white/30">•</span>
            <a href="mailto:info@apredding.net" className="flex items-center hover:text-white/90 transition-colors duration-200">
              <Mail className="w-3.5 h-3.5 mr-2" />
              <span>info@apredding.net</span>
            </a>
            <span className="text-white/30">•</span>
            <span className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>843 N. Market St., Redding, CA</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              Licensed & Insured
            </span>
            <span className="text-white/30">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              25+ Years Experience
            </span>
            <span className="text-white/30">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              Solar Excellence Since 2004
            </span>
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-8 px-8 text-[13px] font-medium tracking-wide">
            <a href="tel:5302260701" className="flex items-center hover:text-white/90 transition-colors duration-200">
              <Phone className="w-3.5 h-3.5 mr-2" />
              <span className="font-semibold">(530) 226-0701</span>
            </a>
            <span className="text-white/30">•</span>
            <a href="mailto:info@apredding.net" className="flex items-center hover:text-white/90 transition-colors duration-200">
              <Mail className="w-3.5 h-3.5 mr-2" />
              <span>info@apredding.net</span>
            </a>
            <span className="text-white/30">•</span>
            <span className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>843 N. Market St., Redding, CA</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              Licensed & Insured
            </span>
            <span className="text-white/30">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              25+ Years Experience
            </span>
            <span className="text-white/30">•</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              Solar Excellence Since 2004
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo - clean and clickable */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/advance-power-logo.jpg" 
              alt="Advance Power Redding" 
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
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
          <nav className="hidden lg:flex items-center space-x-2">
            {/* Products Link */}
            <Link
              href="/shop/products"
              className={cn(
                "px-5 py-2.5 text-[15px] font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group",
                isActive("/shop/products")
                  ? "text-white"
                  : "text-gray-800 hover:text-white"
              )}
              style={{
                background: isActive("/shop/products")
                  ? 'linear-gradient(135deg, rgba(249,115,22,0.95) 0%, rgba(251,146,60,0.9) 50%, rgba(234,88,12,0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: isActive("/shop/products")
                  ? '2px solid rgba(251,146,60,0.6)'
                  : '2px solid rgba(203,213,225,0.4)',
                boxShadow: isActive("/shop/products")
                  ? '0 8px 32px rgba(249,115,22,0.4), 0 4px 16px rgba(234,88,12,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
                  : '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
                textShadow: isActive("/shop/products") ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive("/shop/products")) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.85) 0%, rgba(251,146,60,0.8) 50%, rgba(59,130,246,0.85) 100%)';
                  e.currentTarget.style.borderImage = 'linear-gradient(135deg, rgba(249,115,22,0.8), rgba(59,130,246,0.8)) 1';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.5), 0 6px 20px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.textShadow = '0 2px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/shop/products")) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)';
                  e.currentTarget.style.borderImage = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.textShadow = 'none';
                }
              }}
            >
              <span className="relative z-10">Products</span>
              {!isActive("/shop/products") && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
              )}
            </Link>

            {/* Comparison Link */}
            <Link
              href="/comparison"
              className={cn(
                "px-5 py-2.5 text-[15px] font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group",
                isActive("/comparison")
                  ? "text-white"
                  : "text-gray-800 hover:text-white"
              )}
              style={{
                background: isActive("/comparison")
                  ? 'linear-gradient(135deg, rgba(249,115,22,0.95) 0%, rgba(251,146,60,0.9) 50%, rgba(234,88,12,0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: isActive("/comparison")
                  ? '2px solid rgba(251,146,60,0.6)'
                  : '2px solid rgba(203,213,225,0.4)',
                boxShadow: isActive("/comparison")
                  ? '0 8px 32px rgba(249,115,22,0.4), 0 4px 16px rgba(234,88,12,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
                  : '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
                textShadow: isActive("/comparison") ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive("/comparison")) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.85) 0%, rgba(251,146,60,0.8) 50%, rgba(59,130,246,0.85) 100%)';
                  e.currentTarget.style.borderImage = 'linear-gradient(135deg, rgba(249,115,22,0.8), rgba(59,130,246,0.8)) 1';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.5), 0 6px 20px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.textShadow = '0 2px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/comparison")) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)';
                  e.currentTarget.style.borderImage = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.textShadow = 'none';
                }
              }}
            >
              <span className="relative z-10">Comparison</span>
              {!isActive("/comparison") && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group"
              ref={el => dropdownRefs.current['services'] = el}
              style={{ position: 'relative', zIndex: 10000 }}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className={cn(
                  "flex items-center px-5 py-2.5 text-[15px] font-semibold rounded-xl transition-all duration-300 relative z-10 overflow-hidden",
                  activeDropdown === 'services'
                    ? "text-white"
                    : "text-gray-800 hover:text-white"
                )}
                style={{
                  background: activeDropdown === 'services'
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.95) 0%, rgba(251,146,60,0.9) 50%, rgba(234,88,12,0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: activeDropdown === 'services'
                    ? '2px solid rgba(251,146,60,0.6)'
                    : '2px solid rgba(203,213,225,0.4)',
                  boxShadow: activeDropdown === 'services'
                    ? '0 8px 32px rgba(249,115,22,0.4), 0 4px 16px rgba(234,88,12,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
                    : '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
                  textShadow: activeDropdown === 'services' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeDropdown !== 'services') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.85) 0%, rgba(251,146,60,0.8) 50%, rgba(59,130,246,0.85) 100%)';
                    e.currentTarget.style.borderImage = 'linear-gradient(135deg, rgba(249,115,22,0.8), rgba(59,130,246,0.8)) 1';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.5), 0 6px 20px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    e.currentTarget.style.textShadow = '0 2px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeDropdown !== 'services') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)';
                    e.currentTarget.style.borderImage = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span className="relative z-10">Services</span>
                <ChevronDown className={cn(
                  "ml-1 w-4 h-4 transition-transform duration-200 relative z-10",
                  activeDropdown === 'services' ? "rotate-180" : ""
                )} />
                {activeDropdown !== 'services' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
                )}
              </button>
              {activeDropdown === 'services' && <DropdownMenu items={servicesItems} dropdownKey="services" />}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative group"
              ref={el => dropdownRefs.current['company'] = el}
              style={{ position: 'relative', zIndex: 10000 }}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                className={cn(
                  "flex items-center px-5 py-2.5 text-[15px] font-semibold rounded-xl transition-all duration-300 relative z-10 overflow-hidden",
                  activeDropdown === 'company'
                    ? "text-white"
                    : "text-gray-800 hover:text-white"
                )}
                style={{
                  background: activeDropdown === 'company'
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.95) 0%, rgba(251,146,60,0.9) 50%, rgba(234,88,12,0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: activeDropdown === 'company'
                    ? '2px solid rgba(251,146,60,0.6)'
                    : '2px solid rgba(203,213,225,0.4)',
                  boxShadow: activeDropdown === 'company'
                    ? '0 8px 32px rgba(249,115,22,0.4), 0 4px 16px rgba(234,88,12,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
                    : '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
                  textShadow: activeDropdown === 'company' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeDropdown !== 'company') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.85) 0%, rgba(251,146,60,0.8) 50%, rgba(59,130,246,0.85) 100%)';
                    e.currentTarget.style.borderImage = 'linear-gradient(135deg, rgba(249,115,22,0.8), rgba(59,130,246,0.8)) 1';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.5), 0 6px 20px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    e.currentTarget.style.textShadow = '0 2px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeDropdown !== 'company') {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 100%)';
                    e.currentTarget.style.borderImage = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                <span className="relative z-10">Company</span>
                <ChevronDown className={cn(
                  "ml-1 w-4 h-4 transition-transform duration-200 relative z-10",
                  activeDropdown === 'company' ? "rotate-180" : ""
                )} />
                {activeDropdown !== 'company' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
                )}
              </button>
              {activeDropdown === 'company' && <DropdownMenu items={companyItems} dropdownKey="company" />}
            </div>
          </nav>

          {/* CTA Button - Solid colorful with glass effects via shadows only */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <button
                className="px-5 py-2.5 rounded-lg text-white text-[15px] font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 25%, #ea580c 50%, #f59e0b 75%, #3b82f6 100%)',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.5), 0 2px 10px rgba(59,130,246,0.4), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
              >
                Get Free Quote
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg",
              "text-gray-700 hover:text-gray-900",
              "hover:bg-gray-100/50 transition-all duration-200"
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
            <nav className="flex flex-col space-y-1">
              {/* Mobile Products Link */}
              <Link 
                href="/shop/products"
                className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>

              {/* Mobile Comparison Link */}
              <Link 
                href="/comparison"
                className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comparison
              </Link>

              {/* Mobile Services */}
              <div className="px-4 py-2 mt-2">
                <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Services</div>
                {servicesItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="flex items-center py-2.5 text-[15px] text-gray-700 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-orange-500">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Company */}
              <div className="px-4 py-2 mt-2">
                <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Company</div>
                {companyItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="flex items-center py-2.5 text-[15px] text-gray-700 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-orange-500">{item.icon}</span>
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
                      "text-white text-[15px] font-semibold",
                      "shadow-lg shadow-orange-500/25",
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
