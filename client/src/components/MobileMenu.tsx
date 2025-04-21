import { useEffect } from "react";
import { Link } from "wouter";

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
      className={`md:hidden bg-white w-full border-t absolute left-0 transform transition-all duration-300 ease-in-out shadow-premium-md ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto py-6 px-4">
        <ul className="space-y-5 divide-y divide-gray-100">
          <li className="pb-1">
            <Link
              href="/"
              className="mobile-menu-link text-gray-800 hover:text-primary-700 transition-colors font-medium block py-2 px-3 hover:bg-gray-50 rounded-md"
            >
              <i className="fas fa-home mr-2 text-primary-600 w-6"></i> Home
            </Link>
          </li>
          {isHomePage && (
            <>
              <li className="py-1">
                <a
                  href="#applications"
                  className="mobile-menu-link text-gray-800 hover:text-primary-700 transition-colors font-medium block py-2 px-3 hover:bg-gray-50 rounded-md"
                >
                  <i className="fas fa-layer-group mr-2 text-primary-600 w-6"></i> Applications
                </a>
              </li>
              <li className="py-1">
                <a
                  href="#products"
                  className="mobile-menu-link text-gray-800 hover:text-primary-700 transition-colors font-medium block py-2 px-3 hover:bg-gray-50 rounded-md"
                >
                  <i className="fas fa-paint-roller mr-2 text-primary-600 w-6"></i> Products
                </a>
              </li>
              <li className="py-1">
                <a
                  href="#painters"
                  className="mobile-menu-link text-gray-800 hover:text-primary-700 transition-colors font-medium block py-2 px-3 hover:bg-gray-50 rounded-md"
                >
                  <i className="fas fa-users mr-2 text-primary-600 w-6"></i> Painter Network
                </a>
              </li>
              <li className="py-1">
                <a
                  href="#contact"
                  className="mobile-menu-link text-gray-800 hover:text-primary-700 transition-colors font-medium block py-2 px-3 hover:bg-gray-50 rounded-md"
                >
                  <i className="fas fa-envelope mr-2 text-primary-600 w-6"></i> Contact
                </a>
              </li>
            </>
          )}
          <li className="pt-4">
            <Link
              href="/crm"
              className="mobile-menu-link bg-primary-600 hover:bg-primary-700 text-white font-medium block py-3 px-4 rounded-md text-center transition-colors shadow-sm"
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
