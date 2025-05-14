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
  PanelRight,
  GraduationCap,
  Droplets,
  Anchor,
  Flame,
  Building,
  Home as HomeIcon,
  Building2,
  Menu as MenuIcon
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage?: boolean;
}

const MobileMenu = ({ isOpen, onClose, isHomePage = true }: MobileMenuProps) => {
  const { theme, setTheme } = useTheme();
  const [applicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [portalsMenuOpen, setPortalsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Add event listeners to close menu when clicking on links
    const handleLinkClick = () => {
      onClose();
    };

    const links = document.querySelectorAll(".mobile-menu-link");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    // Disable body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset all expanding menus when mobile menu closes
      setApplicationMenuOpen(false);
      setPortalsMenuOpen(false);
    }

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      document.body.style.overflow = "";
    };
  }, [onClose, isOpen]);

  return (
    <div
      id="mobile-menu"
      className={`lg:hidden fixed top-[112px] bg-white/95 dark:bg-gray-900/95 w-full max-h-[85vh] overflow-y-auto z-50 transform transition-all duration-300 ease-in-out
      backdrop-blur-lg shadow-lg ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } border-t border-amber-800/20 dark:border-amber-700/20`}
      style={{ maxHeight: "85vh", overflowY: "auto" }}
    >
      <div className="container mx-auto py-4 px-4">
        {/* Theme toggle at the top right */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        
        {/* Main navigation items */}
        <nav className="mt-2">
          <ul className="space-y-1">
            {/* Home */}
            <li>
              <Link
                href="/"
                className="mobile-menu-link flex items-center space-x-3 py-3 px-4 w-full rounded-md 
                text-amber-900 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/40
                transition-colors duration-150"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
            </li>

            {/* Applications with dropdown */}
            <li>
              <button
                onClick={() => setApplicationMenuOpen(!applicationMenuOpen)}
                className="flex items-center justify-between space-x-3 py-3 px-4 w-full rounded-md 
                text-amber-900 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/40
                transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium">Applications</span>
                </div>
                {applicationMenuOpen ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </button>

              {/* Application submenu */}
              {applicationMenuOpen && (
                <ul className="pl-6 mt-1 space-y-1 border-l-2 border-amber-300/30 dark:border-amber-700/30 ml-5">
                  <li>
                    <Link
                      href="/pools"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-900/30
                      transition-colors duration-150"
                    >
                      <Droplets className="h-4 w-4" />
                      <span>Pools</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marinas"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-900/30
                      transition-colors duration-150"
                    >
                      <Anchor className="h-4 w-4" />
                      <span>Marinas</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fire-prevention"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-900/30
                      transition-colors duration-150"
                    >
                      <Flame className="h-4 w-4" />
                      <span>Fire Prevention</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/construction"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-900/30
                      transition-colors duration-150"
                    >
                      <Building className="h-4 w-4" />
                      <span>Construction</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mobile-home"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-900/30
                      transition-colors duration-150"
                    >
                      <HomeIcon className="h-4 w-4" />
                      <span>Mobile Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/municipality"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-900/30
                      transition-colors duration-150"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>Municipality</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Painter Network */}
            <li>
              <Link
                href="/painter-network"
                className="mobile-menu-link flex items-center space-x-3 py-3 px-4 w-full rounded-md 
                text-amber-900 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/40
                transition-colors duration-150"
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Painter Network</span>
              </Link>
            </li>

            {/* Contact */}
            {isHomePage && (
              <li>
                <a
                  href="#contact"
                  className="mobile-menu-link flex items-center space-x-3 py-3 px-4 w-full rounded-md 
                  text-amber-900 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/40
                  transition-colors duration-150"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">Contact</span>
                </a>
              </li>
            )}

            {/* Portals with dropdown */}
            <li className="mt-2 border-t border-amber-200/30 dark:border-amber-800/30 pt-2">
              <button
                onClick={() => setPortalsMenuOpen(!portalsMenuOpen)}
                className="flex items-center justify-between space-x-3 py-3 px-4 w-full rounded-md 
                text-amber-900 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/40
                transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5" />
                  <span className="font-medium">Access Portals</span>
                </div>
                {portalsMenuOpen ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </button>

              {/* Portals submenu */}
              {portalsMenuOpen && (
                <ul className="pl-6 mt-1 space-y-2 border-l-2 border-amber-300/30 dark:border-amber-700/30 ml-5">
                  <li>
                    <Link
                      href="/client-dashboard"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/40 hover:bg-amber-100/50 dark:hover:bg-amber-800/50
                      transition-colors duration-150"
                    >
                      <span>Client Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-dashboard"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/40 hover:bg-amber-100/50 dark:hover:bg-amber-800/50
                      transition-colors duration-150"
                    >
                      <span>Admin Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/crm"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/40 hover:bg-amber-100/50 dark:hover:bg-amber-800/50
                      transition-colors duration-150"
                    >
                      <span>CRM Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/inventory"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/40 hover:bg-amber-100/50 dark:hover:bg-amber-800/50
                      transition-colors duration-150"
                    >
                      <span>Inventory Management</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/crm-login"
                      className="mobile-menu-link flex items-center space-x-3 py-2 px-4 rounded-md 
                      text-amber-800 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/40 hover:bg-amber-100/50 dark:hover:bg-amber-800/50
                      transition-colors duration-150"
                    >
                      <span>CRM Admin Login</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;