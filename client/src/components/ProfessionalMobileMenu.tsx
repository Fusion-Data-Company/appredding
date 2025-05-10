import { useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { 
  ChevronRight, 
  Sun, 
  Moon, 
  Shield, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Users,
  Droplets,
  Waves,
  Flame,
  Building,
  Home,
  Buildings,
  PanelLeft
} from "lucide-react";
import { RomanDivider } from "@/components/ui/roman-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProfessionalMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage?: boolean;
}

const ProfessionalMobileMenu = ({ isOpen, onClose, isHomePage = true }: ProfessionalMobileMenuProps) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Disable body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Application links with icons
  const applications = [
    { label: "Pools", href: "/pools", icon: <Droplets className="h-4 w-4" /> },
    { label: "Marinas", href: "/marinas", icon: <Waves className="h-4 w-4" /> },
    { label: "Fire Prevention", href: "/fire-prevention", icon: <Flame className="h-4 w-4" /> },
    { label: "Construction", href: "/construction", icon: <Building className="h-4 w-4" /> },
    { label: "Mobile Home", href: "/mobile-home", icon: <Home className="h-4 w-4" /> },
    { label: "Municipality", href: "/municipality", icon: <Buildings className="h-4 w-4" /> },
    { label: "Painter Network", href: "/painter-network", icon: <Users className="h-4 w-4" /> },
  ];

  // Access portals
  const accessPortals = [
    { label: "Client Dashboard", href: "/client-dashboard" },
    { label: "Admin Dashboard", href: "/admin-dashboard" },
    { label: "Team CRM", href: "/crm" }
  ];

  // Links with event closure
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div 
        className={cn(
          "absolute top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-900 shadow-xl",
          "flex flex-col overflow-y-auto",
          "border-l border-amber-900/20"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-amber-900/20 bg-amber-50 dark:bg-amber-950/30">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-amber-900 dark:text-amber-300">
              Navigation
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={onClose}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="applications" className="border-amber-900/20">
              <AccordionTrigger className="font-serif text-amber-900 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 py-3">
                Applications
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-2 space-y-1">
                  {applications.map(app => (
                    <Link 
                      key={app.href} 
                      href={app.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                    >
                      <span className="text-amber-700 dark:text-amber-400">{app.icon}</span>
                      <span>{app.label}</span>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resources" className="border-amber-900/20">
              <AccordionTrigger className="font-serif text-amber-900 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 py-3">
                Resources
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-2 space-y-1">
                  <Link 
                    href="/about"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                  >
                    <span>About Us</span>
                  </Link>
                  <Link 
                    href="/team"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                  >
                    <span>Team</span>
                  </Link>
                  {isHomePage ? (
                    <a 
                      href="#contact"
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                    >
                      <span>Contact</span>
                    </a>
                  ) : (
                    <Link 
                      href="/#contact"
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                    >
                      <span>Contact</span>
                    </Link>
                  )}
                  <Link 
                    href="/style-showcase"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                  >
                    <span>Style Showcase</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <RomanDivider className="my-4" />
          
          <div className="space-y-4">
            <h3 className="font-serif text-amber-900 dark:text-amber-300 font-medium px-4">Access Portals</h3>
            <div className="space-y-1.5">
              {accessPortals.map(portal => (
                <Link 
                  key={portal.href}
                  href={portal.href}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md bg-amber-100/30 dark:bg-amber-900/20 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200"
                >
                  <Shield className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <span>{portal.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <Separator className="my-6 bg-amber-900/20" />
          
          <div className="space-y-3 px-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-amber-900 dark:text-amber-300 font-medium">Theme</h3>
              <Button
                variant="outline"
                size="icon"
                className="border-amber-900/20"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-amber-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMobileMenu;