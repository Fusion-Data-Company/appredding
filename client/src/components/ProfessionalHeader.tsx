import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import praetorianBucketNew from "@/assets_dir/icons/praetorian-bucket-new.png";
import praetorianLogo from "@/assets_dir/logos/praetorian-logo-final.png";
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
import StoneTextureBackground from "@/components/ui/stone-texture-background";


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
    { label: "AI Chat Support", href: "/chat", description: "Get help from our AI assistant" },
    { label: "Style Showcase", href: "/style-showcase", description: "View our design language" },
  ];

  // Access levels
  const accessLevels = [
    { label: "Client Dashboard", href: "/client-dashboard", description: "Access your client portal" },
    { label: "Admin Dashboard", href: "/admin-dashboard", description: "Administrative controls" },
    { label: "Team CRM", href: "/crm", description: "Customer relationship management" },
    { label: "Inventory Management", href: "/inventory", description: "Manage product inventory and orders" },
  ];

  return (
    <header 
      className={cn(
        "fixed w-full border-b transition-all duration-300 h-[110px] flex items-center overflow-hidden",
        scrolled 
          ? "border-slate-400 dark:border-zinc-800 shadow-metal" 
          : "border-slate-400/80 dark:border-zinc-800/80",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-slate-400/40 dark:after:from-zinc-400/30 after:via-slate-400/40 dark:after:via-zinc-400/30 after:to-slate-400/40 dark:after:to-zinc-400/30"
      )}
      style={{ zIndex: 2147483646 }}
    >
      {/* Stone texture background with frosted glass overlay */}
      <StoneTextureBackground 
        className="absolute inset-0" 
        frostGlassOpacity={scrolled ? 0.4 : 0.3}
      />
      
      {/* Light grey to dark grey gradient overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(200, 200, 210, 0.3), rgba(60, 60, 70, 0.5))',
          pointerEvents: 'none',
        }}
      />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets_dir/images/noise.svg')] opacity-[0.04] bg-repeat bg-[length:200px_200px] mix-blend-overlay pointer-events-none animate-subtle-pulse"></div>

      {/* Praetorian logo positioned at far left edge */}
      <Link href="/" className="absolute left-0 top-0 h-full flex items-center z-20">
        <div className="relative">
          {/* No glow effect anymore */}
          <div className="relative">
            <div className="relative">
              <img 
                src={praetorianLogo} 
                alt="Praetorian SmartCoat" 
                className="h-[120px] w-auto relative"
                style={{ 
                  filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3))',
                  transform: 'scale(1)',
                  transformStyle: 'preserve-3d',
                  marginLeft: '-5px',
                  marginTop: '-2px'
                }}
              />
              {/* Add shine/reflection effect */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none" 
                style={{ 
                  background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.25) 40%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)',
                  animation: 'shine 3s infinite ease-in-out',
                }}
              />
            </div>
            

          </div>
        </div>
      </Link>

      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between" style={{ zIndex: 2147483646, position: 'relative' }}>
        {/* Empty space where the logo used to be */}
        <div className="flex-grow"></div>

        {/* Premium Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-end space-x-8 flex-grow" style={{ zIndex: 2147483646, position: 'relative' }}>
          <div className="flex-grow flex justify-end" style={{ zIndex: 2147483646, position: 'relative' }}>
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
            
            {/* Button gradient hover effect - moved 3 inches to the right */}
            <div 
              className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-blue-300/20 to-white/10 dark:from-blue-700/30 dark:to-blue-800/20 transition-opacity duration-300" 
              style={{ transform: 'translateX(3in)' }}
            />
            
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