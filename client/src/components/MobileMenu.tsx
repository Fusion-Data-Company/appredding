import { useEffect } from "react";
import { Link } from "wouter";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";

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
      className={`md:hidden dark:bg-[#121212] bg-[#f0ece0] w-full border-t dark:border-t-gray-800 border-t-gray-300 absolute left-0 transform transition-all duration-300 ease-in-out dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-end mb-4">
          <LightPullThemeSwitcher />
        </div>
        <ul className="space-y-5 divide-y dark:divide-gray-800 divide-gray-300">
          <li className="pb-1">
            <Link
              href="/"
              className="mobile-menu-link dark:text-gray-200 text-gray-800 dark:hover:text-orange-500 hover:text-orange-600 transition-colors font-medium block py-2 px-3 dark:hover:bg-gray-800/50 hover:bg-[#e6e1d2]/80 rounded-md"
            >
              <i className="fas fa-home mr-2 dark:text-[#ff6a00] text-orange-500 w-6"></i> Home
            </Link>
          </li>
          <li className="py-1">
            <Link
              href="/applications"
              className="mobile-menu-link dark:text-gray-200 text-gray-800 dark:hover:text-orange-500 hover:text-orange-600 transition-colors font-medium block py-2 px-3 dark:hover:bg-gray-800/50 hover:bg-[#e6e1d2]/80 rounded-md"
            >
              <i className="fas fa-layer-group mr-2 dark:text-[#ff6a00] text-orange-500 w-6"></i> Applications
            </Link>
          </li>
          <li className="py-1">
            <Link
              href="/painter-network"
              className="mobile-menu-link dark:text-gray-200 text-gray-800 dark:hover:text-orange-500 hover:text-orange-600 transition-colors font-medium block py-2 px-3 dark:hover:bg-gray-800/50 hover:bg-[#e6e1d2]/80 rounded-md"
            >
              <i className="fas fa-users mr-2 dark:text-[#ff6a00] text-orange-500 w-6"></i> Painter Network
            </Link>
          </li>
          {isHomePage && (
            <>
              <li className="py-1">
                <a
                  href="#contact"
                  className="mobile-menu-link dark:text-gray-200 text-gray-800 dark:hover:text-orange-500 hover:text-orange-600 transition-colors font-medium block py-2 px-3 dark:hover:bg-gray-800/50 hover:bg-[#e6e1d2]/80 rounded-md"
                >
                  <i className="fas fa-envelope mr-2 dark:text-[#ff6a00] text-orange-500 w-6"></i> Contact
                </a>
              </li>
            </>
          )}
          <li className="pt-4 pb-2">
            <Link
              href="/client-dashboard"
              className="mobile-menu-link bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium block py-3 px-4 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-user-shield mr-2"></i> Client Dashboard
            </Link>
          </li>
          <li className="pt-2 pb-2">
            <Link
              href="/admin-dashboard"
              className="mobile-menu-link bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium block py-3 px-4 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-user-cog mr-2"></i> Admin Dashboard
            </Link>
          </li>
          <li className="pt-2">
            <Link
              href="/crm"
              className="mobile-menu-link bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-medium block py-3 px-4 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-chart-line mr-2"></i> Team CRM
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
