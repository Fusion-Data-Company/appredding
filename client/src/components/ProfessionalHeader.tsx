import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import praetorianBucketNew from "@/assets_dir/icons/praetorian-bucket-new.png";
import praetorianHeaderImg from "@/assets_dir/images/praetorian-header-no-bg.png";
import { Button } from "@/components/ui/button";
import { 
  Moon, 
  Sun, 
  Menu as MenuIcon, 
  X
} from "lucide-react";
import { useTheme } from "next-themes";
import MobileMenu from "./MobileMenu";
import { PremiumNavbar } from "@/components/ui/premium-navbar";


const ProfessionalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const isHomePage = location === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setMounted(true);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Application categories
  const applicationCategories = [
    { label: "Pools", href: "/pools", description: "Protective coatings for swimming pools" },
    { label: "Marinas", href: "/marinas", description: "Marine-grade protection systems" },
    { label: "Fire Prevention", href: "/fire-prevention", description: "Fire resistant coating solutions" },
    { label: "Construction", href: "/construction", description: "Structural protective coatings" },
    { label: "Mobile Home", href: "/mobile-home", description: "Mobile home protective systems" },
    { label: "Municipality", href: "/municipality", description: "Municipal infrastructure protection" },
    { label: "Painter Network", href: "/painter-network", description: "Professional painter network" },
  ];

  // Resources
  const resources = [
    { label: "About Us", href: "/about", description: "Learn about our company" },
    { label: "Team", href: "/team", description: "Meet our expert team" },
    { label: "Contact", href: isHomePage ? "#contact" : "/#contact", description: "Get in touch with us" },
    { label: "Style Showcase", href: "/style-showcase", description: "View our design language" },
  ];

  // Access levels
  const accessLevels = [
    { label: "Client Dashboard", href: "/client-dashboard", description: "Access your client portal" },
    { label: "Admin Dashboard", href: "/admin-dashboard", description: "Administrative controls" },
    { label: "Team CRM", href: "/crm", description: "Customer relationship management" },
  ];

  return (
    <header 
      className={cn(
        "fixed w-full border-b z-50 transition-all duration-300 h-[144px] flex items-center",
        scrolled 
          ? "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-200 via-zinc-400 to-gray-600 dark:from-zinc-800 dark:via-zinc-900 dark:to-black backdrop-blur-lg border-slate-400 dark:border-zinc-800 shadow-metal" 
          : "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-slate-300 via-zinc-400 to-gray-500 dark:from-zinc-800 dark:via-zinc-900 dark:to-black backdrop-blur-md border-slate-400/80 dark:border-zinc-800/80",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-slate-400/40 dark:after:from-zinc-400/30 after:via-slate-400/40 dark:after:via-zinc-400/30 after:to-slate-400/40 dark:after:to-zinc-400/30",
        "before:absolute before:inset-0 before:bg-[url('/src/assets_dir/images/noise.svg')] before:opacity-[0.04] before:bg-repeat before:bg-[length:200px_200px] before:mix-blend-overlay before:pointer-events-none before:animate-subtle-pulse"
      )}
    >
      {/* Background PRAETORIAN text watermark */}
      <div className="absolute right-[120px] top-[10px] w-[400px] h-[120px] opacity-[0.07] mix-blend-overlay pointer-events-none z-0">
        <img 
          src={praetorianHeaderImg} 
          alt="" 
          className="w-full h-full object-contain"
          style={{
            filter: 'contrast(1.1) brightness(1.2)',
          }}
        />
      </div>
      {/* Bucket logo positioned at far left edge */}
      <Link href="/" className="absolute left-0 top-0 h-full flex items-center z-20">
        <div className="relative">
          {/* Dark drop shadow behind the bucket */}
          <div className="absolute inset-0 rounded-full bg-black/30 blur-md -z-10 scale-91 translate-x-1 translate-y-[0px]"></div>
          <img 
            src={praetorianBucketNew} 
            alt="Praetorian Bucket" 
            className="h-[140px] w-auto relative"
            style={{ 
              filter: 'contrast(1.3) brightness(1.15)',
              transform: 'perspective(800px) rotateY(-5deg) scale(1.6) translateY(0px)',
              transformStyle: 'preserve-3d',
              marginLeft: '-5px',
              marginTop: '-15px'
            }}
          />
        </div>
      </Link>

      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo (text portion) */}
        <div className="flex items-center z-10 group relative max-w-[450px] ml-[120px]">
          <Link href="/" className="flex items-center w-full">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-slate-100/10 to-transparent dark:via-zinc-300/10 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300"></div>
            
            <div className="flex flex-col justify-center relative">
              {/* Shine overlay for metallic effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="h-24 mb-0 relative overflow-hidden">
                {/* Dark drop shadow behind the PRAETORIAN text */}
                <div className="absolute inset-0 bg-black/30 blur-md -z-10 scale-95 translate-y-1"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/5 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer-slow"></div>
                <img 
                  src={praetorianHeaderImg} 
                  alt="PRAETORIAN" 
                  className="h-full object-contain transition-all duration-500 ease-in-out relative"
                  style={{
                    filter: 'contrast(1.3) brightness(1.15) saturate(1.05)',
                    transform: 'scale(1.05)',
                    marginLeft: '-392px',
                  }}
                />
              </div>
              <span className="text-[1.05rem] text-slate-700 dark:text-slate-400 font-medium tracking-widest uppercase group-hover:text-black dark:group-hover:text-white transition-colors duration-300 mt-[-29px] whitespace-nowrap relative z-30" style={{ marginLeft: '-36px', marginTop: '-29px' }}>
                <span className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent group-hover:from-slate-800 group-hover:to-black dark:group-hover:from-gray-200 dark:group-hover:to-white transition-all duration-500 font-semibold">SmartCoat Solutions</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Premium Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-end space-x-8 flex-grow">
          <div className="flex-grow flex justify-end">
            <PremiumNavbar />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-sm bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/60 dark:to-indigo-950/60
            text-blue-800 dark:text-blue-200 border border-blue-400/30 dark:border-blue-700/30 shadow-metal
            hover:shadow-glow-cyan hover:border-blue-500/30 dark:hover:border-blue-600/40 transition-all duration-300 relative overflow-hidden"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent dark:via-blue-500/20 animate-shimmer transition-opacity duration-300" />
            
            {/* Button gradient hover effect */}
            <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-blue-300/20 to-white/10 dark:from-blue-700/30 dark:to-blue-800/20 transition-opacity duration-300" />
            
            {mounted && (
              theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-100 relative z-10" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800 relative z-10" />
              )
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 z-10 rounded-sm bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900
          text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-zinc-700 shadow-metal
          hover:shadow-glow-cyan hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300 relative overflow-hidden"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent dark:via-zinc-500/20 animate-shimmer transition-opacity duration-300" />
          
          {/* Button gradient hover effect */}
          <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-gray-300/20 to-white/10 dark:from-zinc-700/30 dark:to-zinc-800/20 transition-opacity duration-300" />
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-800 dark:text-gray-200 relative z-10" />
          ) : (
            <MenuIcon className="h-5 w-5 text-gray-800 dark:text-gray-200 relative z-10" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default ProfessionalHeader;