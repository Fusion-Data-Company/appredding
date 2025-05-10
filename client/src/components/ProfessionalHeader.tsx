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
          ? "py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-amber-900/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]" 
          : "py-4 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b-2 border-amber-800/30",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-amber-500/50 after:to-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-10 group relative">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-500/5 to-amber-400/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
          
          <div className="relative flex items-center">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-amber-700/20 to-amber-300/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <img 
              src={praetorianShield} 
              alt="Praetorian Shield" 
              className="h-11 w-auto relative filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className={cn(
              "font-serif text-2xl font-bold bg-gradient-to-r from-amber-900 via-amber-500 to-amber-800 bg-clip-text text-transparent",
              "border-b border-amber-600/30 leading-tight tracking-wide drop-shadow-sm",
              "group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:via-yellow-500 group-hover:to-amber-700 transition-all duration-300"
            )}>
              PRAETORIAN
            </span>
            <span className="text-[0.7rem] text-amber-800 dark:text-amber-300 font-medium tracking-widest uppercase group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors duration-300">
              SmartCoat Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent hover:bg-gradient-to-br hover:from-amber-100/50 hover:to-amber-200/30 dark:hover:from-amber-900/40 dark:hover:to-amber-800/20 
                  font-serif text-amber-900 dark:text-amber-300 border border-transparent hover:border-amber-600/20 rounded-sm 
                  transition-all duration-300 group"
                >
                  <span className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent group-hover:from-amber-800 group-hover:to-amber-600 dark:group-hover:from-amber-300 dark:group-hover:to-amber-200 transition-all duration-300">
                    Applications
                  </span>
                  <ChevronDown className="h-4 w-4 text-amber-700 dark:text-amber-400 transition-transform group-data-[state=open]:rotate-180" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-1 p-4 md:grid-cols-2 bg-white/95 dark:bg-gray-900/95 border border-amber-600/20 shadow-lg">
                    {applicationCategories.map((category) => (
                      <li key={category.href}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={category.href}
                            className="flex p-3 select-none space-x-2 rounded-sm border border-transparent 
                            hover:border-amber-600/20 hover:bg-gradient-to-r hover:from-amber-50/30 hover:to-amber-100/10 
                            dark:hover:from-amber-900/20 dark:hover:to-amber-800/10 
                            hover:text-amber-800 dark:hover:text-amber-200 transition-all duration-300"
                          >
                            <div className="w-full">
                              <div className="text-sm font-serif font-medium text-amber-900 dark:text-amber-300">
                                {category.label}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
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
                  className="bg-transparent hover:bg-gradient-to-br hover:from-amber-100/50 hover:to-amber-200/30 dark:hover:from-amber-900/40 dark:hover:to-amber-800/20 
                  font-serif text-amber-900 dark:text-amber-300 border border-transparent hover:border-amber-600/20 rounded-sm 
                  transition-all duration-300 group"
                >
                  <span className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent group-hover:from-amber-800 group-hover:to-amber-600 dark:group-hover:from-amber-300 dark:group-hover:to-amber-200 transition-all duration-300">
                    Resources
                  </span>
                  <ChevronDown className="h-4 w-4 text-amber-700 dark:text-amber-400 transition-transform group-data-[state=open]:rotate-180" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-4 bg-white/95 dark:bg-gray-900/95 border border-amber-600/20 shadow-lg">
                    {resources.map((resource) => (
                      <li key={resource.label}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={resource.href}
                            className="flex p-3 select-none space-x-2 rounded-sm border border-transparent
                            hover:border-amber-600/20 hover:bg-gradient-to-r hover:from-amber-50/30 hover:to-amber-100/10
                            dark:hover:from-amber-900/20 dark:hover:to-amber-800/10
                            hover:text-amber-800 dark:hover:text-amber-200 transition-all duration-300"
                          >
                            <div className="w-full">
                              <div className="text-sm font-serif font-medium text-amber-900 dark:text-amber-300">
                                {resource.label}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
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
                  className="rounded-sm bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
                  text-amber-900 dark:text-amber-300 border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
                  hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 transition-all duration-300 relative"
                >
                  <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white/95 dark:bg-gray-900/95 border border-amber-600/20 shadow-lg rounded-sm">
                <DropdownMenuLabel className="font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
                  Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-600/20" />
                <DropdownMenuItem className="focus:bg-amber-50/50 dark:focus:bg-amber-900/30">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-amber-50/50 dark:focus:bg-amber-900/30">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-amber-50/50 dark:focus:bg-amber-900/30">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-amber-600/20" />
                <DropdownMenuItem className="focus:bg-amber-50/50 dark:focus:bg-amber-900/30">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-sm bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
              text-amber-900 dark:text-amber-300 border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
              hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 transition-all duration-300 relative"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
              {mounted && (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-amber-900" />
                )
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 z-10 rounded-sm bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
          text-amber-900 dark:text-amber-300 border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20 
          hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 transition-all duration-300 relative"
        >
          <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
          {mobileMenuOpen ? (
            <X className="h-5 w-5 relative z-10" />
          ) : (
            <MenuIcon className="h-5 w-5 relative z-10" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default ProfessionalHeader;