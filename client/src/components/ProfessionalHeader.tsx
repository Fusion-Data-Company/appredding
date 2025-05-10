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
          ? "py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-amber-900/20 shadow-lg" 
          : "py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-amber-900/10",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-10">
          <div className="relative flex items-center">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
            <img 
              src={praetorianShield} 
              alt="Praetorian Shield" 
              className="h-10 w-auto relative filter drop-shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className={cn(
              "font-serif text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-500 to-amber-800 bg-clip-text text-transparent drop-shadow-sm",
              "border-b border-amber-600/20 leading-tight tracking-wide"
            )}>
              PRAETORIAN
            </span>
            <span className="text-[0.7rem] text-amber-800 dark:text-amber-300 font-medium tracking-widest uppercase">
              SmartCoat Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-amber-100/50 dark:hover:bg-amber-900/30 font-serif text-amber-900 dark:text-amber-300">
                  Applications
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-1 p-4 md:grid-cols-2">
                    {applicationCategories.map((category) => (
                      <li key={category.href}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={category.href}
                            className="flex p-3 select-none space-x-2 rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-200"
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
                <NavigationMenuTrigger className="bg-transparent hover:bg-amber-100/50 dark:hover:bg-amber-900/30 font-serif text-amber-900 dark:text-amber-300">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-4">
                    {resources.map((resource) => (
                      <li key={resource.label}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={resource.href}
                            className="flex p-3 select-none space-x-2 rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-200"
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
          
          <RomanDivider className="w-[100px]" />
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300">
                  <Shield className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuLabel className="font-serif">Access Portals</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {accessLevels.map(access => (
                  <DropdownMenuItem key={access.href} asChild>
                    <Link href={access.href} className="cursor-pointer">
                      <span className="font-medium">{access.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel className="font-serif">Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-amber-100/50 dark:bg-amber-900/30"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
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
          className="lg:hidden p-2 rounded-md text-amber-900 dark:text-amber-300 z-10"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default ProfessionalHeader;