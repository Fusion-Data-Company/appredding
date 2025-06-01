import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Home, Settings, Phone, Info, Zap, Battery } from 'lucide-react';

export const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/residential-solar', label: 'Solar Systems', icon: Zap },
    { href: '/battery-storage', label: 'Battery Storage', icon: Battery },
    { href: '/energy-conservation', label: 'Energy Solutions', icon: Settings },
    { href: '/contact', label: 'Contact', icon: Phone },
    { href: '/about', label: 'About', icon: Info }
  ];

  return (
    <>
      <nav className="mobile-nav mobile-safe-area">
        <div className="mobile-nav-content">
          <Link href="/" className="mobile-logo" onClick={closeMenu}>
            Solar Pro
          </Link>
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      <div className={`mobile-menu mobile-safe-area ${isMenuOpen ? 'open' : ''}`}>
        <div className="pt-16">
          <div className="mb-8">
            <h2 className="mobile-text-xl font-bold text-white mb-2">Navigation</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded"></div>
          </div>
          
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-menu-item flex items-center gap-3"
                  onClick={closeMenu}
                >
                  <IconComponent size={20} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};