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

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [onClose]);

  return (
    <div
      id="mobile-menu"
      className={`md:hidden bg-[#1e1e1e] w-full py-4 border-t border-[#333333] absolute left-0 transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${isOpen ? "block" : "hidden"}`}
    >
      <ul className="container mx-auto px-4 space-y-4">
        <li>
          <Link
            href="/"
            className="mobile-menu-link text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium block py-2"
          >
            Home
          </Link>
        </li>
        {isHomePage && (
          <>
            <li>
              <a
                href="#applications"
                className="mobile-menu-link text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium block py-2"
              >
                Applications
              </a>
            </li>
            <li>
              <a
                href="#products"
                className="mobile-menu-link text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium block py-2"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#painters"
                className="mobile-menu-link text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium block py-2"
              >
                Painter Network
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="mobile-menu-link text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium block py-2"
              >
                Contact
              </a>
            </li>
          </>
        )}
        <li>
          <Link
            href="/crm"
            className="mobile-menu-link text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium block py-2"
          >
            Team CRM
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
