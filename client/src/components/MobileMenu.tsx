import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useTheme } from "next-themes";
import { 
  Home, 
  Users, 
  Phone, 
  ChevronDown, 
  ChevronRight,
  Sun, 
  Moon,
  Lock, 
  GraduationCap,
  Droplets,
  Anchor,
  Flame,
  Building,
  Home as HomeIcon,
  Building2,
  Battery,
  Settings,
  Wrench,
  Zap,
  ShieldCheck,
  Info,
  FolderOpen,
  Code,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage?: boolean;
}

const MobileMenu = ({ isOpen, onClose, isHomePage = true }: MobileMenuProps) => {
  const { theme, setTheme } = useTheme();
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [portalsMenuOpen, setPortalsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Disable body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset all expanding menus when mobile menu closes
      setServicesMenuOpen(false);
      setCompanyMenuOpen(false);
      setPortalsMenuOpen(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Services menu items matching desktop
  const servicesItems = [
    { label: "Residential Solar", href: "/services/residential-solar", icon: <Home className="h-4 w-4" />, iconColor: "text-orange-400" },
    { label: "Commercial Solar", href: "/services/commercial-solar", icon: <Building2 className="h-4 w-4" />, iconColor: "text-blue-400" },
    { label: "Hybrid Solar", href: "/services/hybrid-solar", icon: <Zap className="h-4 w-4" />, iconColor: "text-yellow-400" },
    { label: "Battery Storage", href: "/services/battery-storage", icon: <Battery className="h-4 w-4" />, iconColor: "text-green-400" },
    { label: "Maintenance", href: "/services/maintenance", icon: <Settings className="h-4 w-4" />, iconColor: "text-purple-400" },
    { label: "Repairs", href: "/services/repairs", icon: <Wrench className="h-4 w-4" />, iconColor: "text-red-400" },
    { label: "Energy Conservation", href: "/services/energy-conservation", icon: <ShieldCheck className="h-4 w-4" />, iconColor: "text-teal-400" },
    { label: "Lithium Battery", href: "/services/lithium-battery", icon: <Battery className="h-4 w-4" />, iconColor: "text-cyan-400" },
  ];

  // Company menu items matching desktop
  const companyItems = [
    { label: "About", href: "/about", icon: <Info className="h-4 w-4" />, iconColor: "text-indigo-400" },
    { label: "Portfolio", href: "/portfolio", icon: <FolderOpen className="h-4 w-4" />, iconColor: "text-pink-400" },
    { label: "Technology", href: "/resources/technology", icon: <Code className="h-4 w-4" />, iconColor: "text-violet-400" },
    { label: "Team", href: "/team", icon: <Users className="h-4 w-4" />, iconColor: "text-emerald-400" },
    { label: "Contact", href: "/contact", icon: <MessageSquare className="h-4 w-4" />, iconColor: "text-amber-400" },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100 z-[9998]" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        style={{
          willChange: isOpen ? 'opacity' : 'auto'
        }}
      />

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed w-full z-[9999] transition-all duration-300 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
        style={{
          top: '112px',
          maxHeight: 'calc(100vh - 112px)',
          background: 'linear-gradient(180deg, rgba(255, 214, 153, 0.98) 0%, rgba(255, 204, 102, 0.98) 30%, rgba(153, 204, 255, 0.98) 100%)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          borderBottom: '1px solid rgba(251, 146, 60, 0.5)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
          willChange: isOpen ? 'transform, opacity' : 'auto',
          transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
        }}
      >
        <div className="h-full overflow-y-auto overscroll-contain" style={{ maxHeight: 'calc(100vh - 112px)' }}>
          <div className="container mx-auto py-4 px-4">
            {/* Theme toggle at the top right */}
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-white" />
                ) : (
                  <Moon size={18} className="text-white" />
                )}
              </button>
            </div>
            
            {/* Main navigation items */}
            <nav className="mt-2">
              <ul className="space-y-2">
                {/* Products Link */}
                <li>
                  <Link
                    href="/shop/products"
                    onClick={handleLinkClick}
                    className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-3 w-full rounded-lg 
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Home className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-900">Products</span>
                  </Link>
                </li>

                {/* Comparison Link */}
                <li>
                  <Link
                    href="/comparison"
                    onClick={handleLinkClick}
                    className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-3 w-full rounded-lg 
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Comparison</span>
                  </Link>
                </li>

                {/* Services with dropdown */}
                <li>
                  <button
                    onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                    className="flex items-center justify-between space-x-3 min-h-[44px] px-4 py-3 w-full rounded-lg 
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-gray-900">Services</span>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 text-gray-900 transition-transform duration-200",
                        servicesMenuOpen ? "rotate-180" : ""
                      )} 
                    />
                  </button>

                  {/* Services submenu */}
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      servicesMenuOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1.5 pl-4">
                      {servicesItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-2.5 rounded-lg 
                            transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                            style={{
                              background: 'rgba(255, 255, 255, 0.4)',
                              border: '1px solid rgba(255, 255, 255, 0.5)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                            }}
                          >
                            <span className={item.iconColor}>{item.icon}</span>
                            <span className="text-gray-900 font-medium text-sm">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Company with dropdown */}
                <li>
                  <button
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                    className="flex items-center justify-between space-x-3 min-h-[44px] px-4 py-3 w-full rounded-lg 
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Info className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Company</span>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 text-gray-900 transition-transform duration-200",
                        companyMenuOpen ? "rotate-180" : ""
                      )} 
                    />
                  </button>

                  {/* Company submenu */}
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      companyMenuOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1.5 pl-4">
                      {companyItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-2.5 rounded-lg 
                            transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                            style={{
                              background: 'rgba(255, 255, 255, 0.4)',
                              border: '1px solid rgba(255, 255, 255, 0.5)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                            }}
                          >
                            <span className={item.iconColor}>{item.icon}</span>
                            <span className="text-gray-900 font-medium text-sm">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Portals with dropdown */}
                <li className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <button
                    onClick={() => setPortalsMenuOpen(!portalsMenuOpen)}
                    className="flex items-center justify-between space-x-3 min-h-[44px] px-4 py-3 w-full rounded-lg 
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-gray-900">Access Portals</span>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 text-gray-900 transition-transform duration-200",
                        portalsMenuOpen ? "rotate-180" : ""
                      )} 
                    />
                  </button>

                  {/* Portals submenu */}
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      portalsMenuOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1.5 pl-4">
                      <li>
                        <Link
                          href="/client-dashboard"
                          onClick={handleLinkClick}
                          className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-2.5 rounded-lg 
                          transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          <span className="text-gray-900 font-medium text-sm">Client Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/admin-dashboard"
                          onClick={handleLinkClick}
                          className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-2.5 rounded-lg 
                          transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          <span className="text-gray-900 font-medium text-sm">Admin Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/crm"
                          onClick={handleLinkClick}
                          className="mobile-menu-link flex items-center space-x-3 min-h-[44px] px-4 py-2.5 rounded-lg 
                          transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          <span className="text-gray-900 font-medium text-sm">CRM Dashboard</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
