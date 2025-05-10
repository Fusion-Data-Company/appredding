import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Moon, 
  Sun, 
  Menu as MenuIcon, 
  X, 
  ChevronDown,
  User,
  Shield,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useTheme } from "next-themes";
import { RomanDivider } from "@/components/ui/roman-header";
import MobileMenu from "./MobileMenu";
import praetorianShield from "@assets/Untitled design (6).png";

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
        "fixed w-full border-b z-50 transition-all duration-300",
        scrolled 
          ? "py-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-300 to-slate-500 dark:from-zinc-800 dark:via-zinc-900 dark:to-black backdrop-blur-lg border-slate-400 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]" 
          : "py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-200 to-slate-400 dark:from-zinc-800 dark:via-zinc-900 dark:to-black backdrop-blur-md border-slate-400/80 dark:border-zinc-800/80",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-slate-400/40 dark:after:via-zinc-400/30 after:to-transparent",
        "before:absolute before:inset-0 before:bg-[url('/src/assets_dir/images/noise.svg')] before:opacity-[0.03] before:bg-repeat before:bg-[length:200px_200px] before:mix-blend-overlay before:pointer-events-none",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-5 z-10 group relative">
          <div className="absolute inset-0 rounded-xl bg-[linear-gradient(110deg,transparent_0%,rgba(0,0,0,0.05)_5%,rgba(0,0,0,0)_10%,rgba(0,0,0,0.05)_15%,rgba(0,0,0,0)_20%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0)_30%,rgba(0,0,0,0.05)_35%,rgba(0,0,0,0)_40%)] dark:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.05)_5%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.05)_15%,rgba(255,255,255,0)_20%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.05)_35%,rgba(255,255,255,0)_40%)] opacity-0 group-hover:opacity-100 animate-shimmer bg-[length:400%_100%] transition-opacity duration-300"></div>
          
          <div className="relative flex items-center">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-slate-300/20 to-slate-600/20 blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            
            {/* Middle glow */}
            <div className="absolute -inset-3 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-400/20 via-slate-500/20 to-slate-600/20 blur-sm opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
            
            {/* Inner glow - metallic effect */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-slate-200/20 to-slate-600/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Highlight reflection */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'rotate(-45deg) translateX(-5px)' }}></div>
            
            {/* Shield image */}
            <img 
              src={praetorianShield} 
              alt="Praetorian Shield" 
              className="h-24 w-auto relative -my-4 filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className={cn(
              "font-serif text-3xl font-bold bg-gradient-to-br from-slate-800 via-slate-400 to-slate-700 dark:from-slate-100 dark:via-white dark:to-slate-300 bg-clip-text text-transparent",
              "border-b border-slate-400/30 dark:border-slate-500/30 leading-tight tracking-wide drop-shadow-sm pb-[2px]",
              "group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:via-slate-500 group-hover:to-slate-800 dark:group-hover:from-white dark:group-hover:via-gray-100 dark:group-hover:to-slate-200 transition-all duration-300"
            )}>
              PRAETORIAN
            </span>
            <span className="text-[0.8rem] text-slate-700 dark:text-slate-400 font-medium tracking-widest uppercase group-hover:text-black dark:group-hover:text-white transition-colors duration-300 mt-[1px]">
              <span className="bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">SmartCoat Solutions</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-200/30 dark:hover:from-gray-800 dark:hover:to-gray-900/80 
                  font-medium text-gray-800 dark:text-gray-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 rounded-sm 
                  transition-all duration-300 group"
                >
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-black group-hover:to-gray-800 dark:group-hover:from-white dark:group-hover:to-gray-100 transition-all duration-300">
                    Applications
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform group-data-[state=open]:rotate-180" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-1 p-4 md:grid-cols-2 bg-white/95 dark:bg-gray-900/95 border border-gray-300 dark:border-gray-700 shadow-lg rounded-sm">
                    {applicationCategories.map((category) => (
                      <li key={category.href}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={category.href}
                            className="flex p-3 select-none space-x-2 rounded-sm border border-transparent 
                            hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 
                            dark:hover:from-gray-800 dark:hover:to-gray-900 
                            hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                          >
                            <div className="w-full">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {category.label}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                                {category.description}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900
                  font-medium text-gray-800 dark:text-gray-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 rounded-sm 
                  transition-all duration-300 group"
                >
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-black group-hover:to-gray-800 dark:group-hover:from-white dark:group-hover:to-gray-100 transition-all duration-300">
                    Resources
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform group-data-[state=open]:rotate-180" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-4 bg-white/95 dark:bg-gray-900/95 border border-gray-300 dark:border-gray-700 shadow-lg rounded-sm">
                    {resources.map((resource) => (
                      <li key={resource.label}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={resource.href}
                            className="flex p-3 select-none space-x-2 rounded-sm border border-transparent
                            hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50
                            dark:hover:from-gray-800 dark:hover:to-gray-900
                            hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                          >
                            <div className="w-full">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {resource.label}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                                {resource.description}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <RomanDivider className="w-[120px]" />
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-sm bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
                  text-amber-900 dark:text-amber-300 border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
                  hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 transition-all duration-300 relative"
                >
                  <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
                  <Shield className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px] bg-white/95 dark:bg-gray-900/95 border border-amber-600/20 shadow-lg rounded-sm">
                <DropdownMenuLabel className="font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
                  Access Portals
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-600/20" />
                {accessLevels.map(access => (
                  <DropdownMenuItem key={access.href} asChild className="focus:bg-amber-50/50 dark:focus:bg-amber-900/30">
                    <Link href={access.href} className="cursor-pointer">
                      <span className="font-medium">{access.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-sm bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 
                  text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 shadow-sm
                  hover:shadow-md hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 relative"
                >
                  <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-gray-200 to-white dark:from-gray-700 dark:to-gray-800 transition-opacity duration-300" />
                  <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white/95 dark:bg-gray-900/95 border border-gray-300 dark:border-gray-700 shadow-lg rounded-sm">
                <DropdownMenuLabel className="font-medium bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-white bg-clip-text text-transparent">
                  Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-300 dark:bg-gray-700" />
                <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-gray-800">
                  <User className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-gray-800">
                  <Settings className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-gray-800">
                  <HelpCircle className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-300 dark:bg-gray-700" />
                <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-gray-800">
                  <LogOut className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-sm bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 
              text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 shadow-sm
              hover:shadow-md hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 relative"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-gray-200 to-white dark:from-gray-700 dark:to-gray-800 transition-opacity duration-300" />
              {mounted && (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gray-100" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-800" />
                )
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 z-10 rounded-sm bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900
          text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 shadow-sm
          hover:shadow-md hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 relative"
        >
          <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-gray-200 to-white dark:from-gray-700 dark:to-gray-800 transition-opacity duration-300" />
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