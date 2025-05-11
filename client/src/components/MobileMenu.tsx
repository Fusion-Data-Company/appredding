import { useEffect } from "react";
import { Link } from "wouter";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";
import { Sun, Moon, ChevronDown } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage?: boolean;
}

const MobileMenu = ({ isOpen, onClose, isHomePage = true }: MobileMenuProps) => {
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
      className={`lg:hidden bg-white/95 dark:bg-gray-900/95 w-full border-t border-amber-800/20 absolute left-0 z-40 transform transition-all duration-300 ease-in-out 
      backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-amber-500/50 after:to-transparent`}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className="relative pl-3 mr-3">
              <Sun size={24} className="absolute -left-8 bottom-2 text-amber-400 drop-shadow" />
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20
                border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
                rounded-md py-2 px-3">
                  <LightPullThemeSwitcher />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <ChevronDown size={18} className="text-amber-800 dark:text-amber-400 animate-bounce" />
                </div>
              </div>
              <Moon size={24} className="absolute -right-8 bottom-2 text-amber-800 dark:text-amber-300 drop-shadow" />
            </div>
          </div>
        </div>
        <ul className="space-y-3 divide-y divide-amber-600/10 dark:divide-amber-700/20">
          <li className="pb-2">
            <Link
              href="/"
              className="mobile-menu-link font-serif text-amber-900 dark:text-amber-300 
              transition-all duration-300 font-medium block py-3 px-4 rounded-sm 
              bg-gradient-to-br from-amber-50/10 to-transparent dark:from-amber-900/10 dark:to-transparent 
              border border-transparent hover:border-amber-600/20 
              hover:bg-gradient-to-r hover:from-amber-50/30 hover:to-amber-100/10
              dark:hover:from-amber-900/20 dark:hover:to-amber-800/10"
            >
              <span className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">Home</span>
            </Link>
          </li>
          
          <li className="py-2">
            <div className="font-serif font-medium text-amber-800 dark:text-amber-400 mb-2 px-4 text-sm uppercase tracking-wider border-l-2 border-amber-600/30">
              Applications
            </div>
            <ul className="space-y-1 pl-2">
              <li>
                <Link
                  href="/pools"
                  className="mobile-menu-link block py-2 px-4 text-amber-800 dark:text-amber-300 rounded-sm hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors text-sm"
                >
                  Pools
                </Link>
              </li>
              <li>
                <Link
                  href="/marinas"
                  className="mobile-menu-link block py-2 px-4 text-amber-800 dark:text-amber-300 rounded-sm hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors text-sm"
                >
                  Marinas
                </Link>
              </li>
              <li>
                <Link
                  href="/fire-prevention"
                  className="mobile-menu-link block py-2 px-4 text-amber-800 dark:text-amber-300 rounded-sm hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors text-sm"
                >
                  Fire Prevention
                </Link>
              </li>
              <li>
                <Link
                  href="/construction"
                  className="mobile-menu-link block py-2 px-4 text-amber-800 dark:text-amber-300 rounded-sm hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors text-sm"
                >
                  Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-home"
                  className="mobile-menu-link block py-2 px-4 text-amber-800 dark:text-amber-300 rounded-sm hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors text-sm"
                >
                  Mobile Home
                </Link>
              </li>
              <li>
                <Link
                  href="/municipality"
                  className="mobile-menu-link block py-2 px-4 text-amber-800 dark:text-amber-300 rounded-sm hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors text-sm"
                >
                  Municipality
                </Link>
              </li>
            </ul>
          </li>
          
          <li className="py-2">
            <Link
              href="/painter-network"
              className="mobile-menu-link font-serif text-amber-900 dark:text-amber-300 
              transition-all duration-300 font-medium block py-3 px-4 rounded-sm 
              bg-gradient-to-br from-amber-50/10 to-transparent dark:from-amber-900/10 dark:to-transparent 
              border border-transparent hover:border-amber-600/20 
              hover:bg-gradient-to-r hover:from-amber-50/30 hover:to-amber-100/10
              dark:hover:from-amber-900/20 dark:hover:to-amber-800/10"
            >
              <span className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">Painter Network</span>
            </Link>
          </li>
          
          {isHomePage && (
            <li className="py-2">
              <a
                href="#contact"
                className="mobile-menu-link font-serif text-amber-900 dark:text-amber-300 
                transition-all duration-300 font-medium block py-3 px-4 rounded-sm 
                bg-gradient-to-br from-amber-50/10 to-transparent dark:from-amber-900/10 dark:to-transparent 
                border border-transparent hover:border-amber-600/20 
                hover:bg-gradient-to-r hover:from-amber-50/30 hover:to-amber-100/10
                dark:hover:from-amber-900/20 dark:hover:to-amber-800/10"
              >
                <span className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">Contact</span>
              </a>
            </li>
          )}
          
          <li className="pt-4 pb-1">
            <div className="font-serif font-medium text-amber-800 dark:text-amber-400 mb-2 px-4 text-sm uppercase tracking-wider border-l-2 border-amber-600/30">
              Access Portals
            </div>
            <Link
              href="/client-dashboard"
              className="mobile-menu-link relative overflow-hidden font-medium block py-3 px-4 
              rounded-sm text-center transition-all duration-300 
              bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
              border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
              hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 mb-2"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
              <span className="relative z-10 font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">Client Dashboard</span>
            </Link>
          </li>
          
          <li className="py-1">
            <Link
              href="/admin-dashboard"
              className="mobile-menu-link relative overflow-hidden font-medium block py-3 px-4 
              rounded-sm text-center transition-all duration-300 
              bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
              border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
              hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 mb-2"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
              <span className="relative z-10 font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">Admin Dashboard</span>
            </Link>
          </li>
          
          <li className="pt-4 pb-1">
            <div className="font-serif font-medium text-amber-800 dark:text-amber-400 mb-2 px-4 text-sm uppercase tracking-wider border-l-2 border-amber-600/30">
              CRM System
            </div>
            <Link
              href="/crm"
              className="mobile-menu-link relative overflow-hidden font-medium block py-3 px-4 
              rounded-sm text-center transition-all duration-300 
              bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
              border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
              hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 mb-2"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
              <span className="relative z-10 font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">CRM Overview</span>
            </Link>
          </li>
          
          <li className="py-1">
            <Link
              href="/crm-dashboard"
              className="mobile-menu-link relative overflow-hidden font-medium block py-3 px-4 
              rounded-sm text-center transition-all duration-300 
              bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
              border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
              hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30 mb-2"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
              <span className="relative z-10 font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">CRM Dashboard</span>
            </Link>
          </li>
          
          <li className="py-1">
            <Link
              href="/crm-login"
              className="mobile-menu-link relative overflow-hidden font-medium block py-3 px-4 
              rounded-sm text-center transition-all duration-300 
              bg-gradient-to-br from-amber-100/70 to-amber-200/50 dark:from-amber-900/40 dark:to-amber-800/20 
              border border-amber-700/20 shadow-inner shadow-amber-100/30 dark:shadow-amber-900/20
              hover:shadow-amber-300/20 dark:hover:shadow-amber-700/30 hover:border-amber-600/30"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-t from-amber-300/10 to-amber-200/5 dark:from-amber-600/20 dark:to-amber-700/10 transition-opacity duration-300" />
              <span className="relative z-10 font-serif bg-gradient-to-r from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">CRM Admin Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
